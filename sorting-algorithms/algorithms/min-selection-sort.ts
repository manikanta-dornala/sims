import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class MinSelectionSort extends SortingAlgorithm {
    createSortSteps(numbers: Array<number>) {
        for (let i = 0; i < this.N; i++) {
            let res = minOfArray(numbers, i);
            this.steps.push({
                typ: 'find',
                selectSteps: this.N - i,
                selectA: res.index,
            });
            swap(numbers, i, res.index);
            this.steps.push({ typ: 'swap', swapA: i, swapB: res.index });
        }
    }
}
