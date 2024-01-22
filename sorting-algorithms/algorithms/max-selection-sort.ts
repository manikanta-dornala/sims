import { SortingAlgorithm, maxOfArray, swap } from './algorithm';

export default class MaxSelectionSort extends SortingAlgorithm {
    next() {
        if (this.iter >= this.N) {
            this.terminate = true;
            return;
        }
        let res = maxOfArray(this.numbers, 0, this.N - this.iter);
        swap(this.numbers, this.N - this.iter - 1, res.index);
        this.iter++;
    }
}
