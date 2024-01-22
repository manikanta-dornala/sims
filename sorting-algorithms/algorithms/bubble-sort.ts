import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class BubbleSort extends SortingAlgorithm {
    next() {
        if (this.iter >= this.N) {
            this.terminate = true;
            return;
        }
        // let res = minOfArray(this.numbers, this.iter);
        // swap(this.numbers, this.iter, res.index);

        let swapped = false;
        for (var j = 0; j < this.N - this.iter - 1; j++) {
            if (this.numbers[j] > this.numbers[j + 1]) {
                // Swap arr[j] and arr[j+1]
                swap(this.numbers, j, j + 1);
                swapped = true;
            }
        }

        this.iter++;
    }
}
