import P5 from 'p5';
const sketch = (p5: P5) => {
    var is_canvas_infocus = false;
    let myShader;

    p5.preload = () => {
        myShader = p5.loadShader('shader.vert', 'shader.frag');
    };

    p5.setup = () => {
        var cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
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
        myShader.setUniform('u_aspect', p5.width / p5.height);
        myShader.setUniform('u_framecount', p5.millis() * 0.001);
        p5.shader(myShader);
        p5.rect(0, 0, p5.width, p5.height);
    };
};

new P5(sketch);
