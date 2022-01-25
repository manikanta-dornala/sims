import P5 from 'p5';
export default class CircleBoid {
    mass: number;
    color;
    p5: P5;
    sizeMultiplier = 5;
    constructor(p5: P5) {
        this.p5 = p5;
        this.color = this.p5.color(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
        );
        this.mass = this.p5.map(Math.random(), 0, 1, 1, 2);
    }

    draw(position: P5.Vector, angle: number) {
        this.p5.push();
        this.p5.translate(position.x, position.y);
        this.p5.rotate(angle);
        var len = this.p5.map(this.mass, 1, 2, 1, this.sizeMultiplier);
        this.p5.fill(this.color);
        this.p5.stroke(255, 255, 255);
        // this.p5.line(0, 0, -len / 1.2, len / 4);
        // this.p5.line(0, 0, -len / 1.2, -len / 4);
        this.p5.ellipse(
            0,
            0,
            this.sizeMultiplier * this.mass,
            this.sizeMultiplier * this.mass
        );
        this.p5.fill(this.color);

        this.p5.pop();
    }
}
