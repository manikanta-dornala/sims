import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class MergeSort extends SortingAlgorithm {
    createSortSteps(numbers: Array<number>) {
        this.mergeSort(numbers, 0, this.N - 1);
    }

    mergeSort(arr: Array<number>, l: number, r: number) {
        if (l < r) {
            let m = Math.floor(l + (r - l) / 2);
            this.mergeSort(arr, l, m);
            this.mergeSort(arr, m + 1, r);
            this.merge(arr, l, m, r);
        }
    }

    merge(arr: Array<number>, l: number, m: number, r: number) {
        let i, j, k;
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = arr.slice(l, l + n1);
        let R = arr.slice(m + 1, r + 1);
        i = 0;
        j = 0;
        k = l;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                this.steps.push({
                    typ: 'set',
                    setIndex: k,
                    setValue: L[i],
                });
                i++;
            } else {
                arr[k] = R[j];
                this.steps.push({
                    typ: 'set',
                    setIndex: k,
                    setValue: R[j],
                });
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            this.steps.push({
                typ: 'set',
                setIndex: k,
                setValue: L[i],
            });
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            this.steps.push({
                typ: 'set',
                setIndex: k,
                setValue: R[j],
            });
            j++;
            k++;
        }
    }
}
