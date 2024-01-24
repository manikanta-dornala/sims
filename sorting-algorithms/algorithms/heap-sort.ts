import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class HeapSort extends SortingAlgorithm {
    createSortSteps(numbers: Array<number>) {
        this.heapSort(numbers, this.N);
    }

    heapify(arr: Array<number>, n: number, i: number) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;

        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            swap(arr, i, largest);
            this.steps.push({
                typ: 'swap',
                swapA: i,
                swapB: largest,
            });
            this.heapify(arr, n, largest);
        }
    }

    heapSort(arr: Array<number>, n: number) {
        for (let i = n / 2 - 1; i >= 0; i--) this.heapify(arr, n, i);

        for (let i = n - 1; i >= 0; i--) {
            swap(arr, 0, i);
            this.steps.push({
                typ: 'swap',
                swapA: 0,
                swapB: i,
            });
            this.heapify(arr, i, 0);
        }
    }
}
