import P5 from 'p5';
import params from './params';
import Particle from './particle';
export default class Simulation {
    particles: Array<Particle> = [];
    p5: P5;

    constructor(p5: P5) {
        this.p5 = p5;
    }

    run() {
        this.particles.forEach((particle) => {
            // Draw things
            particle.draw();
            this.drawLines(particle, this.particles);

            // apply physics
            // Here, every particle gets hit by some random force
            let heading = Math.random() * 2 * this.p5.PI;
            let force = this.p5
                .createVector(this.p5.cos(heading), this.p5.sin(heading))
                .normalize()
                .mult(0.1 * params.MaxSpeed * Math.random());
            particle.step(force);
        });
    }

    drawLines(particle: Particle, particles: Array<Particle>) {
        particles.forEach((otherParticle) => {
            let d = P5.Vector.dist(otherParticle.position, particle.position);
            if (d < params.lineMaxDist) {
                this.p5.stroke(
                    this.p5.color(
                        0,
                        255,
                        0,
                        this.p5.map(d, 0, params.lineMaxDist, 255, 0)
                    )
                );
                this.p5.strokeWeight(
                    this.p5.map(d, 0, params.lineMaxDist, 2, 0)
                );
                this.p5.line(
                    particle.position.x,
                    particle.position.y,
                    otherParticle.position.x,
                    otherParticle.position.y
                );
            }
        });
    }

    addNewParticle() {
        let particle = new Particle(this.p5);
        particle.size = params.particleSize;
        this.particles.push(particle);
    }
}
