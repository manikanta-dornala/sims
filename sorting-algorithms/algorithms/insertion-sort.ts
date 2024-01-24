import { SortingAlgorithm, minOfArray, swap } from './algorithm';

export default class InsertionSort extends SortingAlgorithm {
    i = 0;
    key = 0;
    j = 0;

    createSortSteps(numbers: number[]): void {
        let key = 0,
            j = 0;
        for (let i = 1; i < this.N; i++) {
            key = numbers[i];
            this.steps.push({ typ: 'step' });
            j = i - 1;
            while (j >= 0 && numbers[j] > key) {
                numbers[j + 1] = numbers[j];
                this.steps.push({
                    typ: 'set',
                    setIndex: j + 1,
                    setValue: numbers[j],
                });
                j = j - 1;
            }
            numbers[j + 1] = key;
            this.steps.push({ typ: 'set', setIndex: j + 1, setValue: key });
        }
    }
}
