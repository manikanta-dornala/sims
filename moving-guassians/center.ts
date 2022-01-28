import P5 from 'p5';
import params from './params';
export default class GuassianCenter {
    amplitude: number;
    sigma: P5.Vector;
    mass: number;
    color: P5.Color;
    position: P5.Vector;
    velocity: P5.Vector;
    size: number;
    heading: number;
    p5: P5;
    constructor(p5: P5) {
        this.p5 = p5;
        this.position = this.p5.createVector(
            Math.random() * p5.windowWidth,
            Math.random() * p5.windowHeight
        );
        this.heading = Math.random() * 2 * this.p5.PI;
        this.velocity = this.p5
            .createVector(this.p5.cos(this.heading), this.p5.sin(this.heading))
            .normalize()
            .mult(window.params.MaxSpeed * Math.random());
        this.color = this.p5.color(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
        );
        this.size = 5;
        this.mass = 1;
        this.sigma = this.p5.createVector(this.p5.random(30, 50));
        this.amplitude = this.p5.random(4,5)
    }

    draw() {
        this.p5.push();
        this.p5.translate(this.position.x, this.position.y);
        this.p5.fill(this.color);
        this.p5.ellipse(0, 0, this.size, this.size);
        this.p5.fill(0, 0, 0);
        this.p5.pop();
    }

    step(force: P5.Vector) {
        var acceleration = P5.Vector.mult(force, this.mass);
        this.velocity.add(acceleration);
        if (this.velocity.mag() < window.params.MinSpeed) {
            this.velocity.normalize();
            this.velocity.mult(window.params.MinSpeed);
        }
        this.velocity.limit(window.params.MaxSpeed);
        this.position.add(this.velocity);
        this.warpWorld();
    }

    warpWorld() {
        var wx = this.p5.windowWidth;
        var wy = this.p5.windowHeight;
        var b = window.params.WallBuffer;
        if (this.position.x < b) {
            this.position.x = wx - 1.1 * b;
        } else if (this.position.x > wx - b) {
            this.position.x = 1.1 * b;
        }

        if (this.position.y < b) {
            this.position.y = wy - 1.1 * b;
        } else if (this.position.y > wy - b) {
            this.position.y = 1.1 * b;
        }
    }
}
