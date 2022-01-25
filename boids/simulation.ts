import P5 from 'p5';
import params from './params';
import Boid from './boid';
export default class Simulation {
    boids: Array<Boid> = [];
    p5: P5;

    constructor(p5: P5) {
        this.p5 = p5;
    }

    run() {
        this.boids.forEach((boid) => {
            // apply physics
            let force = boid.GetSteeringForces(this.boids);
            boid.step(force);
            // Draw things
            boid.draw();
        });
    }

    drawLines(boid: Boid, boids: Array<Boid>) {
        boids.forEach((otherboid) => {
            let d = P5.Vector.dist(otherboid.position, boid.position);
            if (d < window.params.lineMaxDist) {
                this.p5.stroke(
                    this.p5.color(
                        0,
                        255,
                        0,
                        this.p5.map(d, 0, window.params.lineMaxDist, 255, 0)
                    )
                );
                this.p5.strokeWeight(
                    this.p5.map(d, 0, window.params.lineMaxDist, 2, 0)
                );
                this.p5.line(
                    boid.position.x,
                    boid.position.y,
                    otherboid.position.x,
                    otherboid.position.y
                );
            }
        });
    }

    addNewboid() {
        if (this.boids.length < window.params.MaxPopulation) {
            let boid = new Boid(this.p5);
            this.boids.push(boid);
        }
    }
}
