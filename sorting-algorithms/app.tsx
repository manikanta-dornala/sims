import * as NumericInput from 'react-numeric-input';
import { createRoot } from 'react-dom/client';

import Select from 'react-select';
import Simulation from './simulation';
import P5 from 'p5';
import { Component } from 'react';
import sketch from './sktech';

const algorithmOptions = [
    { value: 'merge-sort', label: 'Merge Sort' },
    { value: 'quick-sort', label: 'Quick Sort' },
    { value: 'heap-sort', label: 'Heap Sort' },
    { value: 'min-selection-sort', label: 'Min Selection Sort' },
    { value: 'max-selection-sort', label: 'Max Selection Sort' },
    { value: 'bubble-sort', label: 'Bubble Sort' },
    { value: 'insertion-sort', label: 'Insertion Sort' },
    { value: 'shell-sort', label: 'Shell Sort' },
];

const simulation = new Simulation();
simulation.setAlgorithm(algorithmOptions[0].value);
function randomize() {
    simulation.shuffle();
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
            simulation.shuffle();
        }}
        label="Array Size"
    />
);

createRoot(document.getElementById('randomize-button')).render(
    <button
        className="btn btn-success"
        disabled={simulation.isActive() == true}
        onClick={(x) => {
            simulation.shuffle();
        }}
    >
        Shuffle
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

new P5(sketch(simulation));
