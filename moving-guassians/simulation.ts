import P5, { Color } from 'p5';
import GuassianCenter from './center';
var startTime, endTime;

function start() {
    startTime = new Date();
}

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    timeDiff /= 1000;
    // console.log(timeDiff + ' seconds');
}
export default class Simulation {
    p5: P5;
    img: P5.Image;
    centers: Array<GuassianCenter> = [];
    constructor(p5: P5) {
        this.p5 = p5;
        for (let i = 0; i < 5; i++) {
            let particle = new GuassianCenter(this.p5);
            this.centers.push(particle);
        }
        this.img = this.p5.createImage(
            this.p5.windowWidth,
            this.p5.windowHeight
        );
        this.img.loadPixels();
    }
    run() {
        this.centers.forEach((center) => {
            center.draw();
            center.step(this.p5.createVector(Math.random(), Math.random()));
        });
        this.updateBackground();
    }

    updateBackground() {
        let x, y;
        start();
        for (y = 0; y < this.img.height; y++) {
            for (x = 0; x < this.img.width; x++) {
                let c = this.p5.map(this.getColor(x, y), 0, 1, 0, 255);
                let index = (x + y * this.img.width) * 4;
                this.img.pixels[index] = 255;
                this.img.pixels[index + 1] = c;
                this.img.pixels[index + 2] = c;
                this.img.pixels[index + 3] = 255;
            }
        }
        end();

        this.img.updatePixels();
        this.p5.image(this.img, 0, 0);
    }

    getColor(x, y) {
        let result = 0;
        this.centers.forEach((center) => {
            result +=
                center.amplitude *
                Math.exp(
                    ((-0.5 * 1) / center.sigma.x ** 2) *
                        ((x - center.position.x) ** 2 +
                            (y - center.position.y) ** 2)
                );
        });
        return result / this.centers.length;
    }
}
