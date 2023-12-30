import P5 from 'p5';
export default class Simulation {
    p5: P5;
    shrink = 0.76;
    angle = 30;
    minLength = 12;
    branches = 2;
    randomSeed = 42;
    startLengthheightRatio = 0.18;
    constructor(p5: P5) {
        this.p5 = p5;
        this.p5.angleMode(this.p5.DEGREES);
        this.randomSeed = Math.random() * 1000;
    }

    run() {
        this.p5.randomSeed(this.randomSeed);
        if (this.p5.frameCount % 10 == 0) {
            this.p5.background(255);
            this.p5.translate(this.p5.width * 0.5, this.p5.height * 0.9);
            this.branch(this.p5.height * this.startLengthheightRatio);
        }
    }

    branch(len) {
        if (
            this.p5.random() <
            this.p5.map(
                len,
                this.minLength,
                this.p5.height * this.startLengthheightRatio,
                0.05,
                0.1
            )
        ) {
            len = this.minLength;
        } else {
            this.p5.strokeWeight(
                this.p5.map(len, 10, this.p5.width * 0.3, 1, 10)
            );
            this.p5.stroke(150, 150, 100, 255);
            this.p5.line(0, 0, 0, -len);
            this.p5.translate(0, -len);
            if (len <= this.minLength) {
                this.leaf();
                return;
            }
            len = len * this.shrink;
        }

        for (var i = 0; i < this.branches; i++) {
            var angle =
                this.angle *
                this.p5.map(
                    i,
                    0,
                    this.branches - 1,
                    -Math.ceil(this.branches / 2),
                    Math.ceil(this.branches / 2)
                );
            console.log(angle);
            this.p5.push();
            this.p5.rotate(angle);
            this.branch(len);
            this.p5.pop();
        }
    }

    leaf() {
        this.p5.beginShape();
        this.p5.noStroke();
        const r = 0;
        const g = 255;
        const b = 0;
        const alpha = 100;
        this.p5.fill(r, g, b, alpha);
        this.p5.ellipse(0, 0, 10);
        this.p5.endShape();
    }
}
