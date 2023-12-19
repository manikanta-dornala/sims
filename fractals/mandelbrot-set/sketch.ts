import P5 from 'p5';
import Params from './params';
window.params = new Params();
function sketch(p5: P5) {
    p5.setup = () => {
        p5.createCanvas(
            Math.floor(p5.windowHeight * 0.75),
            Math.floor(p5.windowHeight * 0.75)
        );
        draw_set(p5);
    };
    p5.windowResized = () => {
        p5.resizeCanvas(
            Math.floor(p5.windowHeight * 0.75),
            Math.floor(p5.windowHeight * 0.75)
        );
    };
    p5.draw = () => {
        if (p5.frameCount % 10 == 0) draw_set(p5);
    };
}

new P5(sketch);

function draw_set(p5: P5) {
    console.log(window.params.MaxIterations);
    p5.pixelDensity(1);
    p5.loadPixels();

    for (let x = 0; x < p5.height; x++) {
        for (let y = 0; y < p5.height; y++) {
            let a = p5.map(x, 0, p5.height, -2, 0.5);
            let b = p5.map(y, 0, p5.height, -1.25, 1.25);
            const ca = a;
            const cb = b;
            let n = 0;
            let z = 0;
            while (n < window.params.MaxIterations) {
                let aa = a * a - b * b;
                let bb = 2 * a * b;
                a = aa + ca;
                b = bb + cb;

                if (p5.abs(a + b) > 20000) {
                    break;
                }
                n++;
            }
            let bright = p5.map(n, 0, window.params.MaxIterations, 100, 255);
            if (n == window.params.MaxIterations) {
                bright = 255;
            }

            let pix = (x + y * p5.height) * 4;
            p5.pixels[pix + 0] = 0;
            p5.pixels[pix + 1] = 0;
            p5.pixels[pix + 2] = 0;
            p5.pixels[pix + 3] = bright;
        }
    }
    p5.updatePixels();
}
