import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class QuickSort extends SortingAlgorithm {
    createSortSteps(numbers: Array<number>) {
        this.quickSort(numbers, 0, this.N - 1);
    }

    quickSort(arr: Array<number>, l: number, r: number) {
        if (l < r) {
            let pi = this.partition(arr, l, r);
            this.quickSort(arr, l, pi - 1);
            this.quickSort(arr, pi + 1, r);
        }
    }

    partition(arr: Array<number>, l: number, r: number) {
        let pivot = arr[r];
        let i = l - 1;

        for (let j = l; j < r; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
                this.steps.push({
                    typ: 'swap',
                    swapA: i,
                    swapB: j,
                });
            }
        }

        swap(arr, i + 1, r);
        this.steps.push({
            typ: 'swap',
            swapA: i + 1,
            swapB: r,
        });
        return i + 1;
    }
}
