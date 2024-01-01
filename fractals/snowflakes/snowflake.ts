import * as P5 from 'p5';

export default class Snowflake {
    p5: P5;
    num_segments: number;
    radius: number;
    seed: number;
    randomAngle: number;
    constructor(p5: P5, num_segments: number) {
        this.p5 = p5;
        this.num_segments = num_segments;
        this.radius = 0;
        this.seed = Math.random() * 1000;
        this.p5.randomSeed(this.seed);
        this.randomAngle = this.p5.random(0, this.p5.TWO_PI);
    }

    run() {
        this.p5.randomSeed(this.seed);
        const segmentPoints = this.pointsForSegment(
            this.num_segments,
            this.radius
        );
        const points = this.snowflakeFromSegment(
            this.num_segments,
            segmentPoints
        );
        this.drawPoints(points, this.p5.width / 2, this.p5.height / 2);
        this.radius += 2;
        this.randomAngle += this.p5.PI / 360;
    }

    drawPoints(points, x, y) {
        this.p5.beginShape();
        this.p5.stroke(
            255,
            255,
            255,
            this.p5.map(this.radius, 0, this.p5.width / 1.5, 255, 0)
        );
        this.p5.strokeWeight(4);
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            this.p5.vertex(x + point.x, y + point.y);
        }
        this.p5.endShape(this.p5.CLOSE);
    }

    pointsForSegment(numSegments, radius) {
        const numPointsInSeg = this.p5.int(this.p5.random(4, 10));
        const segmentPoints = [];

        const segmentAngle = this.p5.PI / numSegments;

        // Generate random points in half of the segment
        // These are stored in polar coordinates
        for (let i = 0; i < numPointsInSeg; i++) {
            const a = this.p5.random(segmentAngle);
            const r = this.p5.random(0, radius * 2);
            segmentPoints.push(this.p5.createVector(a, r));
        }

        // Reflect the points by flipping the angle
        for (let i = numPointsInSeg - 1; i >= 0; i--) {
            const point = segmentPoints[i];
            segmentPoints.push(this.p5.createVector(-point.x, point.y));
        }

        return segmentPoints;
    }

    snowflakeFromSegment(numSegments, segmentPoints) {
        const points = [];
        for (let i = 0; i < numSegments; i++) {
            const ang = (i * this.p5.TWO_PI) / numSegments;

            for (let j = 0; j < segmentPoints.length; j++) {
                const point = segmentPoints[j];
                const x =
                    this.p5.cos(point.x + ang + this.randomAngle) * point.y;
                const y =
                    this.p5.sin(point.x + ang + this.randomAngle) * point.y;

                points.push(this.p5.createVector(x, y));
            }
        }

        return points;
    }
}
