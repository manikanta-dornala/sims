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

            for (let i = 0; i < num; i++) {
                molds[i] = new Mold(
                    p5.random(p5.width),
                    p5.random(p5.height),
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
            p5.background(0, 3);
            p5.loadPixels();

            for (let i = 0; i < num; i++) {
                molds[i].update();
                molds[i].display();
            }
        };
    };
};

class Mold {
    x: number = Math.random();
    y: number = Math.random();
    r: number = 0.8;
    heading: number = 360 * Math.random();
    rotAngle: number;
    vx: number = Math.random();
    vy: number = Math.random();

    sensorAngle = 45;
    sensorDist = 50;

    p5: P5;
    constructor(x, y, p5) {
        this.x = x;
        this.y = y;
        this.p5 = p5;
        this.vx = this.p5.cos(this.heading);
        this.vy = this.p5.sin(this.heading);
        this.rotAngle = 45;
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
        this.vx = this.p5.cos(this.heading);
        this.vy = this.p5.sin(this.heading);

        // Using % Modulo expression to wrap around the canvas
        this.x = (this.x + this.vx + this.p5.width) % this.p5.width;
        this.y = (this.y + this.vy + this.p5.height) % this.p5.height;
    }

    updateHeading() {
        let r = this.getValue(this.sensorAngle);
        let l = this.getValue(-this.sensorAngle);
        let f = this.getValue(0);

        let rotAngle = this.p5.random(this.rotAngle - 10, this.rotAngle + 10);
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
