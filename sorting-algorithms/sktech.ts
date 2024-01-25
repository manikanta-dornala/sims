import P5 from 'p5';
import simulation from './simulation';
import Simulation from './simulation';

export default function sketch(simulation: Simulation) {
    return (p5: P5) => {
        var is_canvas_infocus = false;
        p5.setup = () => {
            var cnv = p5.createCanvas(
                p5.windowWidth * 0.95,
                p5.windowHeight * 0.8
            );
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
            p5.resizeCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.8);
        };

        p5.draw = () => {
            p5.background(255, 255, 255);
            p5.push();
            p5.translate(0, p5.height);
            const cellWidth = p5.width / simulation.N;
            for (let i = 0; i < simulation.N; i++) {
                let height =
                    (simulation.sorter.numbers[i] * p5.height * -0.8) /
                    simulation.N;
                height -= p5.height * 0.1;
                p5.fill(0, 0, 0);
                p5.stroke(255, 255, 255);
                p5.rect(0, 0, cellWidth, height);
                p5.translate(cellWidth, 0);
            }
            p5.pop();
            p5.textSize(24);
            p5.text(
                `Progress ${simulation.sorter.currStep}/ ${simulation.sorter.numSteps} steps`,
                p5.width - 300,
                50
            );
            simulation.run();
        };
    };
}
