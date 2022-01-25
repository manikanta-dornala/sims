import P5, { Color } from 'p5';
import Center from './center';
var startTime, endTime;

function start() {
    startTime = new Date();
}

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff);
    console.log(timeDiff + ' seconds');
}
export default class Simulation {
    p5: P5;
    img: P5.Image;
    centers: Array<Center> = [];
    constructor(p5: P5) {
        this.p5 = p5;
        for (let i = 0; i < 5; i++) {
            let particle = new Center(this.p5);
            particle.amplitude = 5;
            particle.sigma = p5.createVector(20, 20);
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
            if (this.p5.frameCount % 2 != 0) center.draw();
            center.step(this.p5.createVector(Math.random(), Math.random()));
        });
        if (this.p5.frameCount % 2 != 0) this.updateBackground();
    }

    updateBackground() {
        // this.p5.createCanvas(this.p5.windowWidth, this.p5.windowHeight);
        // this.p5.background(220, 255, 220);
        // helper for writing color to array
        function writeColor(
            image: P5.Image,
            position: { x; y },
            color: { r; g; b; a }
        ) {
            let index = (position.x + position.y * image.width) * 4;
            image.pixels[index] = color.r;
            image.pixels[index + 1] = color.g;
            image.pixels[index + 2] = color.b;
            image.pixels[index + 3] = color.a;
        }

        let x, y;
        start();
        // fill with random colors
        for (y = 0; y < this.img.height; y++) {
            for (x = 0; x < this.img.width; x++) {
                let c = this.p5.map(this.getColor({ x, y }), 0, 1, 0, 255);
                writeColor(this.img, { x, y }, { r: 255, g: c, b: c, a: 255 });
            }
        }
        end();

        this.img.updatePixels();
        this.p5.image(this.img, 0, 0);
    }

    getColor(position: { x; y }) {
        function f(point: P5.Vector, guassian: Center) {
            return (
                guassian.amplitude *
                Math.exp(
                    (-0.5 * point.dist(guassian.position) ** 2) /
                        guassian.sigma.x ** 2
                )
            );
        }

        let result = 0;
        let p = this.p5.createVector(position.x, position.y);
        this.centers.forEach((center) => {
            result += f(p, center);
        });
        return result / this.centers.length;
    }
}
