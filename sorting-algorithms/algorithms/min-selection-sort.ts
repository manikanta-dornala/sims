import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class MinSelectionSort extends SortingAlgorithm {
    next() {
        if (this.iter >= this.N) {
            this.terminate = true;
            return;
        }
        let res = minOfArray(this.numbers, this.iter);
        swap(this.numbers, this.iter, res.index);
        this.iter++;
    }
}
