import P5 from 'p5';
import CircleBoid from './shapes/circle';
import FishBoid from './shapes/fish';
export default class Boid {
    // mass: number;
    color: P5.Color;
    position: P5.Vector;
    velocity: P5.Vector;
    heading: number;
    p5: P5;
    shape;
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
        this.shape = new CircleBoid(this.p5);
        this.shape.sizeMultiplier = 2;
    }

    set mass(value) {
        this.shape.mass = value;
    }

    get mass() {
        return this.shape.mass;
    }

    draw() {
        this.shape.draw(this.position, this.velocity.heading());
    }

    step(force: P5.Vector) {
        var acceleration = this.p5.createVector(force.x, force.y);
        acceleration = acceleration.mult(this.mass);
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

    getDistanceFrom(target: P5.Vector) {
        var distance = P5.Vector.dist(this.position, target);
        var p2 = this.p5.createVector(target.x, target.y);
        if (
            this.position.y < window.params.WallBuffer ||
            this.position.y > this.p5.windowHeight - window.params.WallBuffer
        ) {
            // Toroidal warping
            p2.y = -target.y + this.p5.windowHeight - window.params.WallBuffer;
        }
        if (
            this.position.x < window.params.WallBuffer ||
            this.position.x > this.p5.windowWidth - window.params.WallBuffer
        ) {
            // Toroidal warping
            p2.x = -target.x + this.p5.windowWidth - window.params.WallBuffer;
        }
        var distance2 = P5.Vector.dist(this.position, p2);
        distance = this.p5.min(distance, distance2);
        return distance;
    }

    AlignmentForce(boids: Array<Boid>) {
        var averageVelocity = this.p5.createVector(0, 0);
        var count = 0;
        boids?.forEach((boid) => {
            var d = this.getDistanceFrom(boid.position);
            if (d > 0 && d < window.params.SphereOfInfluence) {
                averageVelocity.add(boid.velocity);
                count++;
            }
        });

        if (count > 0) {
            averageVelocity.div(count);
            var steer = P5.Vector.sub(averageVelocity, this.velocity);
            steer.limit(window.params.MaxForce);
            steer.mult(window.params.AlignmentWeight);
            return steer;
        }
        return this.p5.createVector(0, 0);
    }

    CohesionForce(boids: Array<Boid>) {
        var centerOfGravity = this.p5.createVector(0, 0);
        var count = 0;
        boids?.forEach((boid) => {
            var d = this.getDistanceFrom(boid.position);
            if (d > 0 && d < window.params.CohesionNeighborhood) {
                var v = this.p5.createVector();
                v.x = boid.position.x;
                v.y = boid.position.y;
                centerOfGravity.add(boid.position);
                count++;
            }
        });
        if (count > 0) {
            centerOfGravity.mult(1 / count);
            var steer = this.Seek(centerOfGravity);
            steer.mult(window.params.CohesionWeight);
            return steer;
        }
        return this.p5.createVector(0, 0);
    }

    RepulsionForce(boids: Array<Boid>) {
        var count = 0;
        var steer = this.p5.createVector(0, 0);
        boids?.forEach((boid) => {
            var d = this.getDistanceFrom(boid.position);
            if (d > 0 && d < window.params.DesiredSeperation) {
                count++;
                var away = P5.Vector.sub(this.position, boid.position);
                away.mult(1 / d);
                steer.add(away);
            }
        });
        if (steer.mag() > 0 && count > 0) {
            steer.limit(window.params.MaxForce);
        }
        steer.mult(window.params.SeperationWeight);
        return steer;
    }

    Seek(target: P5.Vector) {
        var desired = P5.Vector.sub(target, this.position);
        desired.normalize();
        desired.mult(window.params.MaxSpeed);
        var steer = P5.Vector.sub(desired, this.velocity);
        steer.limit(window.params.MaxForce);
        return steer;
    }

    Flee(target: P5.Vector) {
        var desired = P5.Vector.sub(this.position, target);
        desired.normalize();
        desired.mult(window.params.MaxSpeed);
        var steer = P5.Vector.sub(desired, this.velocity);
        steer.limit(window.params.MaxForce);
        return steer;
    }

    GetSteeringForces(boids: Array<Boid>) {
        var align = this.AlignmentForce(boids);
        var repulsion = this.RepulsionForce(boids);
        var cohesion = this.CohesionForce(boids);
        var force = this.p5.createVector(0, 0);
        force.add(align);
        force.add(repulsion);
        force.add(cohesion);
        return force;
    }
}
