import P5 from 'p5';
import MinSelectionSort from './algorithms/min-selection-sort';
import MaxSelectionSort from './algorithms/max-selection-sort';
import { SortingAlgorithm } from './algorithms/algorithm';
import BubbleSort from './algorithms/bubble-sort';
import InsertionSort from './algorithms/insertion-sort';
import MergeSort from './algorithms/merge-sort';

export default class Simulation {
    N = 50;
    isSorting = false;
    sorter: SortingAlgorithm;
    constructor() {
        this.setAlgorithm('');
    }

    run() {
        if (this.isSorting) {
            for (var i = 0; i < 1; i++) {
                this.sorter.next();
                if (this.sorter.terminate) {
                    this.isSorting = false;
                    break;
                }
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
            case 'bubble-sort':
                this.sorter = new BubbleSort();
                break;
            case 'insertion-sort':
                this.sorter = new InsertionSort();
                break;
            case 'merge-sort':
                this.sorter = new MergeSort();
                break;
            default:
                this.sorter = new MinSelectionSort();
                break;
        }
        this.randomize();
    }

    randomize() {
        const numbers = [];
        for (var i = 0; i < this.N; i++) {
            numbers.push(i);
        }
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        shuffleArray(numbers);
        this.isSorting = false;
        this.sorter.reset(numbers);
    }

    beginSort() {
        this.isSorting = true;
    }

    isActive() {
        return this.isSorting;
    }
}
