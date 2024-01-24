import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class ShellSort extends SortingAlgorithm {
    createSortSteps(numbers: Array<number>) {
        for (let i = Math.floor(this.N / 2); i > 0; i = Math.floor(i / 2)) {
            for (let j = i; j < this.N; j++) {
                for (let k = j - i; k >= 0; k = k - i) {
                    if (numbers[k + i] >= numbers[k]) break;
                    else {
                        swap(numbers, k, k + i);
                        this.steps.push({
                            typ: 'swap',
                            swapA: k,
                            swapB: k + i,
                        });
                    }
                }
            }
        }
    }
}
