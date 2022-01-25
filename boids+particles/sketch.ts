import P5 from 'p5';
import Params from './params';
import Simulation from './simulation';
window.params = new Params();
const sketch = (p5: P5) => {
    let is_canvas_infocus = false;
    let simulation = new Simulation(p5);
    window.simulation = simulation;
    p5.setup = () => {
        let cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.mouseOver(() => {
            is_canvas_infocus = true;
        });
        cnv.mouseOut(() => {
            is_canvas_infocus = false;
        });
        cnv.style('display', 'block');
        cnv.parent('sketch-holder');
        for (let i = 0; i < window.params.InitialPopulation; i++) {
            simulation.addNewboid();
        }
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.draw = () => {
        p5.background(0, 0, 0);
        simulation.run();
    };

    p5.keyPressed = () => {
        if ((p5.key = ' ')) {
            window.params.isPaused = !window.params.isPaused;
        }
    };
};
new P5(sketch);
