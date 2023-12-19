import P5 from 'p5';

const sketch = (p5: P5) => {
    var is_canvas_infocus = false;

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
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.draw = () => {
        p5.background(0, 0, 0);
    };
};

new P5(sketch);
