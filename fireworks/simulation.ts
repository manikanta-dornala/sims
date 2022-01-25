import P5 from 'p5';
import params from './params';
import Particle from './particle';
export default class Simulation {
    particles: Array<Particle> = [];
    explosionParticles: Array<Particle> = [];
    p5: P5;
    groundHeight: number;
    g: P5.Vector;
    constructor(p5: P5) {
        this.p5 = p5;
        this.groundHeight = this.p5.windowHeight - params.WallBuffer;
        this.g = this.p5.createVector(0, params.g);
    }

    run() {
        this.drawGround();
        if (Math.random() > 0.975) this.addNewParticle();
        this.particles.forEach((particle: Particle) => {
            if (particle.isVisible) {
                if (!params.isPaused) {
                    // apply physics
                    let force = P5.Vector.mult(this.g, particle.mass);
                    particle.step(force);
                    if (particle.velocity.mag() < 0.2) {
                        this.explosionParticles.push(...particle.explode());
                    }
                    if (particle.velocity.mag() < 0.05) {
                        particle.isVisible = false;
                    }
                }
                // Draw things
                particle.draw();
            }
        });
        this.particles = this.particles.filter(
            (particle) => particle.isVisible
        );
        this.explosionParticles.forEach((particle: Particle) => {
            if (particle.isVisible) {
                if (!params.isPaused) {
                    // apply physics
                    let force = P5.Vector.mult(this.g, particle.mass);
                    particle.step(force);
                    if (particle.position.y > this.groundHeight) {
                        particle.isVisible = false;
                    }
                }
                particle.draw();
            }
        });
        this.explosionParticles = this.explosionParticles.filter(
            (particle) => particle.isVisible
        );
    }

    drawGround() {
        this.p5.stroke(255, 255, 255);
        this.p5.line(
            0,
            this.groundHeight,
            this.p5.windowWidth,
            this.groundHeight
        );
    }

    addNewParticle() {
        let particle = new Particle(this.p5);
        particle.velocity = this.p5.createVector(
            0,
            -1 *
                this.p5.map(
                    Math.random(),
                    0,
                    1,
                    params.MinSpeed,
                    params.MaxSpeed
                )
        );
        particle.position = this.p5.createVector(
            this.p5.map(
                Math.random(),
                0,
                1,
                2 * params.WallBuffer,
                this.p5.windowWidth - 2 * params.WallBuffer
            ),
            this.groundHeight
        );
        this.particles.push(particle);
    }
}
