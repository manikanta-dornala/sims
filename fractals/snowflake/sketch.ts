import P5 from 'p5';

const sketch = (p5: P5) => {
    var is_canvas_infocus = false;
    let points = [];
    let numSegments = 8;
    let rotationAngle = 0;
    p5.setup = () => {
        var cnv = p5.createCanvas(p5.windowWidth * 0.9, p5.windowHeight * 0.9);
        cnv.mouseOver(() => {
            is_canvas_infocus = true;
        });
        cnv.mouseOut(() => {
            is_canvas_infocus = false;
        });
        cnv.style('display', 'block');
        cnv.parent('sketch-holder');
        points = generateSnowflake(numSegments, p5.height / 3);
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth * 0.9, p5.windowHeight * 0.9);
    };

    function drawPoints(points, x, y) {
        p5.beginShape();
        p5.strokeWeight(8);
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            p5.vertex(x + point.x, y + point.y);
        }
        p5.endShape(p5.CLOSE);
    }

    function pointsForSegment(numSegments: number, radius: number) {
        const numPointsInSeg = p5.int(p5.random(4, 10));
        const segmentPoints = [];

        const segmentAngle = p5.PI / numSegments;

        for (let i = 0; i < numPointsInSeg; i++) {
            const a = p5.random(segmentAngle);
            const r = p5.random(radius);
            segmentPoints.push(p5.createVector(r * p5.cos(a), r * p5.sin(a)));
        }

        // Reflect the points by flipping the angle
        for (let i = numPointsInSeg - 1; i >= 0; i--) {
            const point = segmentPoints[i];
            segmentPoints.push(p5.createVector(point.x, -point.y));
        }

        return segmentPoints;
    }

    function snowflakeFromSegment(numSegments, segmentPoints) {
        const points = [];
        for (let i = 0; i < numSegments; i++) {
            let ang = (i * p5.TWO_PI) / numSegments;

            for (let j = 0; j < segmentPoints.length; j++) {
                const point = segmentPoints[j];
                const r = point.mag();
                const a = p5.atan2(point.y, point.x) + ang;
                const x = p5.cos(a) * r;
                const y = p5.sin(a) * r;
                points.push(p5.createVector(x, y));
            }
        }
        return points;
    }

    function generateSnowflake(numSegments, radius) {
        const segmentPoints = pointsForSegment(numSegments, radius);
        return snowflakeFromSegment(numSegments, segmentPoints);
    }

    p5.draw = () => {
        p5.background(255);
        p5.fill(255, 255, 255);
        rotationAngle += p5.PI / 10;
        drawPoints(points, p5.width / 2, p5.height / 2);
        if (p5.frameCount % 90 == 0) {
            points = generateSnowflake(numSegments, p5.height / 3);
        }
    };
};

new P5(sketch);
