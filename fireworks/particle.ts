import P5 from 'p5';
import params from './params';
export default class Particle {
    mass: number;
    color: P5.Color;
    position: P5.Vector;
    velocity: P5.Vector;
    size: number;
    heading: number;
    p5: P5;
    isVisible = true;
    frameCount = 0;
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
            .mult(
                this.p5.map(
                    Math.random(),
                    0,
                    1,
                    params.MinSpeed,
                    params.MaxSpeed
                )
            );
        this.color = this.p5.color(
            (parseInt((Math.random() * 5).toFixed()) * 255) / 5,
            (parseInt((Math.random() * 5).toFixed()) * 255) / 5,
            (parseInt((Math.random() * 5).toFixed()) * 255) / 5
        );
        this.size = params.particleSize;
        this.mass = params.particleSize;
    }

    draw() {
        if (this.isVisible) {
            this.p5.push();
            this.p5.translate(this.position.x, this.position.y);
            this.p5.stroke(this.color);
            this.p5.ellipse(0, 0, this.size);
            this.p5.fill(this.color);
            this.p5.pop();
            if (!params.isPaused) {
                this.frameCount++;
            }
            if (this.frameCount > 300) {
                this.isVisible = false;
            }
        }
    }

    step(force: P5.Vector) {
        var acceleration = this.p5.createVector(force.x, force.y);
        acceleration = acceleration.mult(1 / this.mass);
        this.velocity.add(acceleration);
        this.position.add(this.velocity);
        this.warpWorld();
    }

    warpWorld() {
        if (
            this.position.x < params.WallBuffer ||
            this.position.x > this.p5.windowWidth - params.WallBuffer ||
            this.position.y < params.WallBuffer ||
            this.position.y > this.p5.windowHeight - params.WallBuffer
        ) {
            this.isVisible = false;
        }
    }

    explode(): Particle[] {
        let result = [];
        for (let i = 0; i < 300; i++) {
            let particle = new Particle(this.p5);
            particle.position = this.position.copy();
            particle.size = this.p5.map(Math.random(), 0, 1, 1, 1.5);
            particle.mass = this.p5.map(Math.random(), 0, 1, 1, 2);
            particle.color = this.color;
            particle.frameCount = this.p5.map(Math.random(), 0, 1, 250, 280);
            particle.velocity
                .normalize()
                .mult(this.p5.map(Math.random(), 0, 1, 0.1, 2))
                .add(this.p5.createVector(0, -2));
            result.push(particle);
        }
        return result;
    }
}
