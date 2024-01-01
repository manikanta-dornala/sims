import P5 from 'p5';
import Params from './params';
import Snowflake from './snowflake';
const sketch = (p5: P5) => {
    var is_canvas_infocus = false;
    let points = [];
    let rotationAngle = 0;
    let params = new Params();
    window.params = params;
    let snowflakes: [Snowflake];
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
        snowflakes = [new Snowflake(p5, params.Segments)];
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth * 0.9, p5.windowHeight * 0.9);
    };

    p5.draw = () => {
        p5.background(0);
        p5.fill(0, 0, 0);
        let remove_first = false;
        snowflakes.forEach((snowflake) => {
            snowflake.run();
            if (snowflake.radius > p5.width / 1.5) {
                remove_first = true;
            }
        });
        if (remove_first) {
            snowflakes.splice(0, 1);
        }
        if (p5.frameCount % 200 == 199) {
            snowflakes.push(new Snowflake(p5, params.Segments));
        }
    };
};

new P5(sketch);
