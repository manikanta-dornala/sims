import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class BubbleSort extends SortingAlgorithm {
    results = [];

    next() {
        if (this.iter == 0) {
            this.performSort();
        }
        this.updateNumbers();
    }

    performSort() {}

    mergeSort() {}

    merge(arrA, arrB) {
        let nA = arrA.length,
            nB = arrB.length;
        let iterA = 0,
            iterB = 0;
    }

    updateNumbers() {}
}
