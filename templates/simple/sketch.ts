import P5 from 'p5';

const sketch = (p5: P5) => {
    var is_canvas_infocus = false;

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
        p5.background(220, 255, 255);
        p5.fill(0, 0, 0);
        p5.circle(
            Math.random() * p5.windowWidth * 0.9,
            Math.random() * p5.windowHeight * 0.9,
            40
        );
    };
};

new P5(sketch);
