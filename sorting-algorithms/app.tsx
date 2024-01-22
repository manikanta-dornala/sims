import * as NumericInput from 'react-numeric-input';
import * as React from 'react';
import Select from 'react-select';
import Simulation from './simulation';
import P5 from 'p5';

const simulation = new Simulation();

function randomize() {
    simulation.randomize();
}

const algorithmOptions = [
    { value: 'min-selection-sort', label: 'Min Selection Sort' },
    { value: 'max-selection-sort', label: 'Max Selection Sort' },
];
import * as ReactDOM from 'react-dom';

ReactDOM.render(
    <Select
        defaultValue={algorithmOptions[0]}
        options={algorithmOptions}
        onChange={(x) => {
            simulation.setAlgorithm(x.value);
        }}
    />,
    document.getElementById('algorithm-options')
);

ReactDOM.render(
    <NumericInput
        type="number"
        className="form-control"
        min={50}
        max={1000}
        step={10}
        defaultValue={500}
        onChange={(x) => {
            simulation.N = x;
            simulation.randomize();
        }}
        label="Array Size"
    />,
    document.getElementById('array-size')
);

ReactDOM.render(
    <button
        className="btn btn-success"
        disabled={simulation.isActive() == true}
        onClick={(x) => {
            simulation.randomize();
        }}
    >
        Randomize
    </button>,
    document.getElementById('randomize-button')
);
ReactDOM.render(
    <button
        className="btn btn-primary"
        disabled={simulation.isActive() == true}
        onClick={(x) => {
            simulation.beginSort();
        }}
    >
        Sort
    </button>,
    document.getElementById('sort-button')
);

function sketch(p5: P5) {
    var is_canvas_infocus = false;
    simulation.init(p5);
    p5.setup = () => {
        var cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight * 0.8);
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
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight * 0.8);
    };

    p5.draw = () => {
        p5.background(255, 255, 255);
        p5.push();
        p5.translate(0, p5.height);
        const cellWidth = p5.width / simulation.N;
        for (let i = 0; i < simulation.N; i++) {
            let height = simulation.sorter.numbers[i] * p5.height * -1;
            p5.fill(0, 0, 0);
            p5.stroke(255, 255, 255);
            p5.rect(0, 0, cellWidth, height);
            p5.translate(cellWidth, 0);
        }
        p5.pop();

        if (p5.frameCount % 20) simulation.run();
    };
}

new P5(sketch);