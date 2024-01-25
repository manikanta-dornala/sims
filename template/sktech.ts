import P5 from 'p5';
import Simulation from './simulation';

export const sketch = (simulation: Simulation) => {
    return (p5: P5) => {
        var is_canvas_infocus = false;
        p5.setup = () => {
            var cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
            cnv.mouseOver(() => {
                is_canvas_infocus = true;
            });
            cnv.mouseOut(() => {
                is_canvas_infocus = false;
            });
            p5.noLoop();
        };

        p5.windowResized = () => {
            p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        };

        p5.draw = () => {
            p5.background(0, 0, 0);
            p5.fill(255, 255, 255);
            p5.circle(
                Math.random() * p5.windowWidth,
                Math.random() * p5.windowHeight,
                40
            );
        };
    };
};