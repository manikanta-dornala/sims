import P5 from 'p5';
let buffer = 60;
export const sketch = () => {
    return (p5: P5) => {
        var is_canvas_infocus = false;
        let num = 5000;
        let molds: Array<Mold> = [];
        p5.setup = () => {
            var cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight - buffer);

            p5.angleMode(p5.DEGREES);

            // p5.randomSeed(42);

            for (let i = 0; i < num; i++) {
                molds[i] = new Mold(
                    p5.random(0.1 * p5.width, 0.9 * p5.width),
                    p5.random(0.1 * p5.height, 0.9 * p5.height),
                    p5
                );
            }

            cnv.style('display', 'block');
            cnv.parent('sketch-holder');
        };

        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight - buffer);
        };

        p5.draw = () => {
            p5.background(0, 5);
            p5.loadPixels();
            for (let c = 0; c < 5; c++) {
                for (let i = 0; i < num; i++) {
                    molds[i].update();
                    molds[i].display();
                }
            }
        };
    };
};

class Mold {
    x: number;
    y: number;
    r: number = 1;
    heading: number;
    rotAngle: number;
    vx: number;
    vy: number;

    sensorAngle = 60;
    sensorDist = 20;

    p5: P5;
    constructor(x, y, p5) {
        this.x = x;
        this.y = y;
        this.p5 = p5;
        this.vx = this.p5.cos(this.heading);
        this.vy = this.p5.sin(this.heading);
        this.heading = this.p5.random() * 360;
        this.rotAngle = 30;
    }

    display() {
        this.p5.noStroke();
        this.p5.fill(255);
        this.p5.ellipse(this.x, this.y, this.r, this.r);
    }

    update() {
        this.updatePos();
        this.updateHeading();
    }

    updatePos() {
        let randomheading = this.p5.random(-0.1, 0.1);
        let heading = this.heading * (1 + randomheading);
        this.vx = this.p5.cos(heading);
        this.vy = this.p5.sin(heading);

        // Using % Modulo expression to wrap around the canvas
        this.x = (this.x + this.vx + this.p5.width) % this.p5.width;
        this.y = (this.y + this.vy + this.p5.height) % this.p5.height;
    }

    updateHeading() {
        let r = this.getValue(this.sensorAngle);
        let l = this.getValue(-this.sensorAngle);
        let f = this.getValue(0);

        let rotAngleRandom = 5;
        let rotAngle = this.p5.random(
            this.rotAngle - rotAngleRandom,
            this.rotAngle + rotAngleRandom
        );
        if (f > l && f > r) {
            this.heading += 0;
        } else if (f < l && f < r) {
            if (this.p5.random(1) < 0.5) {
                this.heading += rotAngle;
            } else {
                this.heading -= rotAngle;
            }
        } else if (l > r) {
            this.heading += -rotAngle;
        } else if (r > l) {
            this.heading += rotAngle;
        }
    }

    getValue(sensorHead) {
        let sensorX =
            (this.x +
                this.sensorDist * this.p5.cos(this.heading + sensorHead)) %
            this.p5.width;
        let sensorY =
            (this.y +
                this.p5.height +
                this.sensorDist * this.p5.sin(this.heading + sensorHead)) %
            this.p5.height;

        let d = this.p5.pixelDensity();
        let index =
            4 * (d * this.p5.floor(sensorY)) * (d * this.p5.width) +
            4 * (d * this.p5.floor(sensorX));
        let value = this.p5.pixels[index];
        return value;
    }
}
