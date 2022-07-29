import p5 from 'p5';
import P5 from 'p5';

const sketch = (p5: P5) => {
    var is_canvas_infocus = false;

    p5.setup = () => {
        var cnv = p5.createCanvas(
            p5.windowWidth * 0.95,
            p5.windowHeight * 0.95
        );
        // cnv.mouseOver(() => {
        //     is_canvas_infocus = true;
        // });
        // cnv.mouseOut(() => {
        //     is_canvas_infocus = false;
        // });
        // cnv.style('display', 'block');
        // cnv.parent('sketch-holder');
        draw_set();
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.95);
    };

    p5.draw = () => {
        p5.background(220, 255, 255);
    };
};

new P5(sketch);

function draw_set() {
    p5.pixelDensity(1);
    loadPixels();
}
