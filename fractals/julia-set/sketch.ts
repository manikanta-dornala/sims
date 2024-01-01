import P5 from 'p5';
const sketch = (p5: P5) => {
    var is_canvas_infocus = false;
    let myShader;

    let centerX = 0;
    let centerY = 0;
    let gridLength = 3;
    p5.preload = () => {
        myShader = p5.loadShader('shader.vert', 'shader.frag');
    };

    p5.setup = () => {
        p5.createCanvas(
            Math.ceil(p5.windowWidth) + 10,
            Math.ceil(p5.windowHeight) + 10,
            p5.WEBGL
        );
    };
    p5.windowResized = () => {
        p5.resizeCanvas(
            Math.ceil(p5.windowWidth) + 10,
            Math.ceil(p5.windowHeight) + 10
        );
    };
    const drag = () => {
        if (p5.mouseIsPressed) {
            // Scale the difference in previous mouse
            // and current mouse pos by the sideLength
            let dx = ((p5.pmouseX - p5.mouseX) / p5.width) * gridLength;
            let dy = ((p5.pmouseY - p5.mouseY) / p5.height) * gridLength;

            // Update the centre pos with the mouse movement
            centerX += dx;
            centerY -= dy;
        }
    };
    p5.draw = () => {
        p5.background(0, 0, 0);
        myShader.setUniform('u_aspect', p5.width / p5.height);
        myShader.setUniform('u_center_x', centerX);
        myShader.setUniform('u_center_y', centerY);
        myShader.setUniform('u_grid_length', gridLength);
        myShader.setUniform('u_aspect', p5.width / p5.height);
        myShader.setUniform('u_framecount', p5.millis() * 0.001);

        myShader.setUniform(
            'minx',
            centerX - ((gridLength / 2) * p5.width) / p5.height
        );
        myShader.setUniform(
            'maxx',
            centerX + ((gridLength / 2) * p5.width) / p5.height
        );
        myShader.setUniform('miny', centerY - gridLength / 2);
        myShader.setUniform('maxy', centerY + gridLength / 2);
        myShader.setUniform('currentX', p5.map(p5.mouseX, 0, p5.width, -3, 2));
        myShader.setUniform(
            'currentY',
            p5.map(p5.mouseY, 0, p5.height, -1 / 2, 1 / 2)
        );
        console.log(gridLength);
        p5.shader(myShader);
        p5.rect(0, 0, p5.width, p5.height);
        drag();
    };

    p5.mouseWheel = (event) => {
        var ratio = 0.99;
        if (event.delta < 0) {
            // Zoom in
            gridLength *= ratio;
        } else {
            // Zoom out
            gridLength *= 1 / ratio;
        }

        // Make sure we're not getting crazy values
        gridLength = p5.constrain(gridLength, 0, 4);
    };
};

new P5(sketch);
