import P5 from 'p5';
import params from './params';
import Simulation from './simulation';

const sketch = (p5: P5) => {
    var is_canvas_infocus = false;
    var simulation = new Simulation(p5);

    p5.setup = () => {
        var cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        cnv.mouseOver(() => {
            is_canvas_infocus = true;
        });
        cnv.mouseOut(() => {
            is_canvas_infocus = false;
        });
        cnv.style('display', 'block');
        cnv.parent('sketch-holder');
        for (let i = 0; i < params.InitialPopulation; i++) {
            simulation.addNewParticle();
        }
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.draw = () => {
        p5.background(20, 20, 0);
        simulation.run();
    };
    p5.keyPressed = () => {
        if ((p5.key = ' ')) {
            params.isPaused = !params.isPaused;
        }
    };
};

new P5(sketch);
