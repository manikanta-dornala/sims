import P5 from 'p5';
import Params from './params';
import Simulation from './simulation';
const sketch = (p5: P5) => {
    let is_canvas_infocus = false;
    let params = new Params();
    window.params = params;
    let simulation = new Simulation(p5);
    window.simulation = simulation;

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
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth * 0.9, p5.windowHeight * 0.9);
    };

    p5.draw = () => {
        simulation.run();
    };

    p5.keyIsPressed = (keyPressed) => {
        if (keyPressed == ' ') {
            
        }
    }
};

new P5(sketch);
