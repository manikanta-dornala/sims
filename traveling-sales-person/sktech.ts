import P5 from 'p5';
import Simulation from './simulation';
import { Vertex } from './algorithms/utils';

export const sketch = (simulation: Simulation) => {
    return (p5: P5) => {
        let is_canvas_infocus = false;
        let ygap = 0;
        p5.setup = () => {
            const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight * 0.8);
            cnv.mouseOver(() => {
                is_canvas_infocus = true;
            });
            cnv.mouseOut(() => {
                is_canvas_infocus = false;
            });
            simulation.setup(p5);
            simulation.randomize();
        };

        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight * 0.8);
        };

        p5.draw = () => {
            p5.background(0, 0, 0);
            drawGrid();
            simulation.vertices.map(drawVertex);
            drawPath(simulation.search.current_path, [255, 255, 255, 100]);
            drawPath(simulation.search.min_path, [0, 255, 150]);
            p5.fill(255, 255, 255);
            p5.textSize(20);
            p5.text(simulation.getCurrPathStr(), 20, 20);
            p5.fill(0, 255, 150);
            p5.textSize(20);
            p5.text(simulation.getMinPathStr(), 20, 50);
            simulation.run();
        };

        function drawGrid() {
            p5.beginShape();
            for (let i = 0; i < simulation.gridXSize; i++) {
                p5.stroke(255, 255, 255, 10);
                p5.line(
                    (i * p5.width) / simulation.gridXSize,
                    0,
                    (i * p5.width) / simulation.gridXSize,
                    p5.height
                );
            }
            for (let i = 0; i < simulation.gridYSize; i++) {
                p5.stroke(255, 255, 255, 10);
                p5.line(
                    0,
                    (i * p5.height) / simulation.gridYSize,
                    p5.width,
                    (i * p5.height) / simulation.gridYSize
                );
            }
            p5.endShape();
        }

        function drawVertex(vertex: Vertex) {
            p5.beginShape();
            p5.fill(255, 255, 255);
            p5.circle(
                ((vertex.position.x + 0.5) * p5.width) / simulation.gridXSize,
                ((vertex.position.y + 0.5) * p5.height) / simulation.gridYSize,
                15
            );

            p5.text(
                vertex.name,
                ((vertex.position.x + 1) * p5.width) / simulation.gridXSize,
                ((vertex.position.y + 1) * p5.height) / simulation.gridYSize
            );
            p5.endShape();
        }

        function drawPath(path: number[], color = [255, 255, 255]) {
            p5.push();
            p5.beginShape();
            p5.stroke(color);
            p5.strokeWeight(2);
            p5.noFill();
            for (let i = 0; i < path.length; i++) {
                const vertex = simulation.vertices[path[i]];
                p5.vertex(
                    ((vertex.position.x + 0.5) * p5.width) /
                        simulation.gridXSize,
                    ((vertex.position.y + 0.5) * p5.height) /
                        simulation.gridYSize
                );
            }
            p5.endShape();
            p5.pop();
        }
    };
};
