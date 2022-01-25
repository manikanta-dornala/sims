import P5 from 'p5';
export default class FishBoid {
    mass: number;
    color;
    p5: P5;
    constructor(p5: P5) {
        this.p5 = p5;
        this.color = this.p5.color(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
        );
        this.mass = Math.random() + 1.5;
    }

    draw(position: P5.Vector, angle: number) {
        this.p5.push();
        this.p5.translate(position.x, position.y);
        this.p5.rotate(angle);
        var len = 5 * this.mass;
        this.p5.fill(this.color);
        // this.p5.stroke(255, 255, 255);
        this.p5.line(0, 0, -len / 1.2, len / 4);
        this.p5.line(0, 0, -len / 1.2, -len / 4);
        this.p5.ellipse(0, 0, 5 * this.mass, 2 * this.mass);
        this.p5.pop();
    }
}
