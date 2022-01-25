import P5 from 'p5';
export default class Simulation {
    p5: P5;
    constructor(p5: P5) {
        this.p5 = p5;
    }
    run() {
        this.p5.background(220, 255, 255);
        this.p5.fill(0, 0, 0);
        this.p5.circle(
            Math.random() * this.p5.windowWidth,
            Math.random() * this.p5.windowHeight,
            40
        );
    }
}
