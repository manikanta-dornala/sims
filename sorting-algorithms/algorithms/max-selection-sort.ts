import { SortingAlgorithm, maxOfArray, swap } from './algorithm';

export default class MaxSelectionSort extends SortingAlgorithm {
    createSortSteps(numbers: Array<number>) {
        for (let i = 0; i < this.N; i++) {
            let res = maxOfArray(numbers, 0, this.N - i);
            this.steps.push({
                typ: 'find',
                selectSteps: this.N - i,
                selectA: res.index,
            });
            swap(numbers, this.N - i - 1, res.index);
            this.steps.push({ typ: 'swap', swapA: i, swapB: res.index });
        }
    }
}
