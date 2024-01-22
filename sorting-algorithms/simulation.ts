import P5 from 'p5';
import MinSelectionSort from './algorithms/min-selection-sort';
import MaxSelectionSort from './algorithms/max-selection-sort';
import { SortingAlgorithm } from './algorithms/algorithm';

export default class Simulation {
    p5: P5;
    N = 500;
    isSorting = false;
    sorter: SortingAlgorithm;
    constructor() {}

    init(p5: P5) {
        this.p5 = p5;
        this.setAlgorithm('');
        this.randomize();
    }

    run() {
        if (this.isSorting) {
            this.sorter.next();
            if (this.sorter.terminate) {
                this.isSorting = false;
            }
        }
    }

    setAlgorithm(algorithm: string) {
        switch (algorithm) {
            case 'min-selection-sort':
                this.sorter = new MinSelectionSort();
                break;
            case 'max-selection-sort':
                this.sorter = new MaxSelectionSort();
                break;
            default:
                this.sorter = new MinSelectionSort();
                break;
        }
    }

    randomize() {
        const numbers = [];
        for (var i = 0; i < this.N; i++) {
            numbers.push(Math.random());
        }
        this.sorter.reset(numbers);
    }

    beginSort() {
        this.isSorting = true;
    }

    isActive() {
        return this.isSorting;
    }
}
