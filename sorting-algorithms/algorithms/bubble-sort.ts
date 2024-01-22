import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class BubbleSort extends SortingAlgorithm {
    next() {
        if (this.iter >= this.N) {
            this.terminate = true;
            return;
        }
        for (var j = 0; j < this.N - this.iter - 1; j++) {
            if (this.numbers[j] > this.numbers[j + 1]) {
                swap(this.numbers, j, j + 1);
            }
        }

        this.iter++;
    }
}
