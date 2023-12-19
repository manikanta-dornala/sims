import P5 from 'p5';
import Params from './params';
window.params = new Params();
function sketch(p5: P5) {
    let centerX = -0.7;
    let centerY = 0;
    let gridLength = 1.3;
    p5.setup = () => {
        const width = Math.floor(Math.min(p5.windowHeight, p5.windowWidth));
        p5.createCanvas(width, width);
        draw_set(p5, centerX, centerY);
    };
    p5.windowResized = () => {
        const width = Math.floor(Math.min(p5.windowHeight, p5.windowWidth));
        p5.resizeCanvas(width, width);
    };
    const drag = () => {
        if (p5.mouseIsPressed) {
            // Scale the difference in previous mouse
            // and current mouse pos by the sideLength
            let dx = ((p5.pmouseX - p5.mouseX) / p5.height) * gridLength;
            let dy = ((p5.pmouseY - p5.mouseY) / p5.height) * gridLength;

            // Update the centre pos with the mouse movement
            centerX += dx;
            centerY += dy;
        }
    };
    p5.draw = () => {
        draw_set(p5, centerX, centerY, gridLength);
        drag();
    };
    p5.mouseWheel = (event) => {
        if (event.delta < 0) {
            // Zoom in
            gridLength *= 10 / 11;
        } else {
            // Zoom out
            gridLength *= 11 / 10;
        }

        // Make sure we're not getting crazy values
        gridLength = p5.constrain(gridLength, 0, 3);
    };
}

new P5(sketch);

function iterate_mandelbrot(a: number, b: number): number {
    /*
        Returns the number of iterations in which the complex number converges
    */
    const curr_a = a;
    const curr_b = b;
    let n = 0;
    while (n < window.params.MaxIterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + curr_a;
        b = bb + curr_b;
        if (Math.abs(a + b) > 100) {
            break;
            // Its diverging at this point
        }
        n++;
    }
    return n;
}

function draw_set(p5: P5, centerX = -0.7, centerY = 0, gridLength = 1.3) {
    p5.pixelDensity(1);
    p5.colorMode(p5.HSB);
    p5.loadPixels();
    const width = Math.min(p5.width, p5.height);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            let a = p5.map(
                x,
                0,
                width,
                centerX - gridLength,
                centerX + gridLength
            );
            let b = p5.map(
                y,
                0,
                width,
                centerY - gridLength,
                centerY + gridLength
            );
            const n = iterate_mandelbrot(a, b);
            let bright = p5.map(n, 0, window.params.MaxIterations, 0, 255);
            let saturation = p5.map(n, 0, window.params.MaxIterations, 0, 50);
            let lum = p5.map(n, 0, window.params.MaxIterations, 0, 255);

            let pix = (x + y * p5.height) * 4;
            p5.pixels[pix + 0] = bright;
            p5.pixels[pix + 1] = saturation;
            p5.pixels[pix + 2] = lum;
            p5.pixels[pix + 3] = 255;
        }
    }
    p5.updatePixels();
}
