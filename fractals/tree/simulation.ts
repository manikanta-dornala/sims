import P5 from 'p5';
export default class Simulation {
    p5: P5;
    shrink = 0.66;
    angle = 30;
    minLength = 12;
    branches = 5;
    randomSeed = 42;
    startLength;
    constructor(p5: P5) {
        this.p5 = p5;
        this.p5.angleMode(this.p5.DEGREES);
        this.randomSeed = Math.random() * 1000;
    }

    run() {
        this.p5.randomSeed(this.randomSeed);
        if (this.p5.frameCount % 10 == 0) {
            this.p5.background(255);
            this.p5.translate(this.p5.width * 0.5, this.p5.height * 0.7);
            this.startLength = Math.min(this.p5.height, this.p5.width) * 0.2;
            this.branch(this.startLength);
        }
    }

    branch(len) {
        if (
            this.p5.random() <
            this.p5.map(len, this.minLength, this.startLength, 0.05, 0.1)
        ) {
            len = this.minLength;
        } else {
            this.drawBranch(len);
            if (len <= this.minLength) {
                this.drawLeaf();
                return;
            }
            len = len * this.shrink;
        }
        var branches = Math.ceil(
            this.p5.map(len, this.minLength, this.startLength, 2, this.branches)
        );
        for (var i = 0; i < branches; i++) {
            var angle =
                this.angle *
                this.p5.map(
                    i,
                    0,
                    branches - 1,
                    -Math.ceil(branches / 2),
                    Math.ceil(branches / 2)
                );
            angle =
                angle + this.angle * this.p5.map(this.p5.random(), 0, 1, -1, 1);
            this.p5.push();
            this.p5.rotate(angle);
            this.branch(len);
            this.p5.pop();
        }
        if (len > 2 * this.minLength) {
            for (var k = 0; k < 5; k++) {
                this.p5.push();
                this.p5.rotate(
                    this.angle * this.p5.map(this.p5.random(), 0, 1, 1, 10)
                );
                this.drawBranch(this.minLength * 0.8);
                this.drawLeaf(5);
                this.p5.pop();
            }
        }
    }

    drawBranch(len) {
        len = len * this.p5.map(this.p5.random(), 0, 1, 0.9, 1.08);
        this.p5.strokeWeight(
            this.p5.map(len, this.minLength, this.startLength, 1, 9)
        );
        const alpha = this.p5.map(
            len,
            this.minLength,
            this.startLength,
            150,
            255
        );
        this.p5.stroke(150, 150, 100, alpha);
        this.p5.line(0, 0, 0, -len);
        this.p5.translate(0, -len);
    }

    drawLeaf(size = 10) {
        this.p5.beginShape();
        this.p5.noStroke();
        const r = 0;
        const g = this.p5.map(this.p5.random(), 0, 1, 200, 255);
        const b = 0;
        const alpha = 255 * this.p5.map(this.p5.random(), 0, 1, 0.9, 1.8);
        this.p5.fill(r, g, b, alpha);
        size = size * this.p5.map(this.p5.random(), 0, 1, 0.5, 2);
        this.p5.ellipse(0, 0, size * 0.7, size);
        this.p5.endShape();
    }
}
