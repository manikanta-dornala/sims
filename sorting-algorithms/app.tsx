import * as NumericInput from 'react-numeric-input';
import { createRoot } from 'react-dom/client';

import Select from 'react-select';
import Simulation from './simulation';
import P5 from 'p5';
import { Component } from 'react';

const algorithmOptions = [
    { value: 'merge-sort', label: 'Merge Sort' },
    { value: 'quick-sort', label: 'Quick Sort' },
    { value: 'min-selection-sort', label: 'Min Selection Sort' },
    { value: 'max-selection-sort', label: 'Max Selection Sort' },
    { value: 'bubble-sort', label: 'Bubble Sort' },
    { value: 'insertion-sort', label: 'Insertion Sort' },
];

const simulation = new Simulation();
simulation.setAlgorithm(algorithmOptions[0].value);
function randomize() {
    simulation.randomize();
}

createRoot(document.getElementById('algorithm-options')).render(
    <Select
        defaultValue={algorithmOptions[0]}
        options={algorithmOptions}
        onChange={(x) => {
            simulation.setAlgorithm(x.value);
        }}
    />
);

createRoot(document.getElementById('array-size')).render(
    <NumericInput
        type="number"
        className="form-control"
        min={50}
        max={1000}
        step={10}
        defaultValue={simulation.N}
        onChange={(x) => {
            simulation.N = x;
            simulation.randomize();
        }}
        label="Array Size"
    />
);

createRoot(document.getElementById('randomize-button')).render(
    <button
        className="btn btn-success"
        disabled={simulation.isActive() == true}
        onClick={(x) => {
            simulation.randomize();
        }}
    >
        Randomize
    </button>
);
createRoot(document.getElementById('sort-button')).render(
    <button
        className="btn btn-primary"
        disabled={simulation.isActive() == true}
        onClick={(x) => {
            simulation.sorter.numSteps = simulation.sorter.getNumSteps();
            simulation.beginSort();
        }}
    >
        Sort
    </button>
);

function sketch(p5: P5) {
    var is_canvas_infocus = false;
    p5.setup = () => {
        var cnv = p5.createCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.8);
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
        p5.resizeCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.8);
    };

    p5.draw = () => {
        p5.background(255, 255, 255);
        p5.push();
        p5.translate(0, p5.height);
        const cellWidth = p5.width / simulation.N;
        for (let i = 0; i < simulation.N; i++) {
            let height =
                (simulation.sorter.numbers[i] * p5.height * -0.8) /
                simulation.N;
            height -= p5.height * 0.1;
            p5.fill(0, 0, 0);
            p5.stroke(255, 255, 255);
            p5.rect(0, 0, cellWidth, height);
            p5.translate(cellWidth, 0);
        }
        p5.pop();
        p5.textSize(24);
        p5.text(
            `Progress ${simulation.sorter.currStep}/ ${simulation.sorter.numSteps} steps`,
            0,
            50
        );
        simulation.run();
    };
}

new P5(sketch);
