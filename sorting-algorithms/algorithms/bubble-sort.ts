import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class BubbleSort extends SortingAlgorithm {
    createSortSteps(numbers: Array<number>) {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.N - i - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    swap(numbers, j, j + 1);
                    this.steps.push({ typ: 'swap', swapA: j, swapB: j + 1 });
                }
            }
        }
    }
}
