import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class InsertionSort extends SortingAlgorithm {
    i = 0;
    key = 0;
    j = 0;
    next() {
        if (this.iter >= this.N) {
            this.terminate = true;
            return;
        }
        if (this.iter == 0) {
            this.iter++;
            return;
        }
        this.key = this.numbers[this.iter];
        this.j = this.iter - 1;

        while (this.j >= 0 && this.numbers[this.j] > this.key) {
            this.numbers[this.j + 1] = this.numbers[this.j];
            this.j = this.j - 1;
        }
        this.numbers[this.j + 1] = this.key;

        this.iter++;
    }
}
