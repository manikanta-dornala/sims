export class SortingAlgorithm {
    numbers: Array<number> = [];
    iter = 0;
    N = 0;
    terminate = false;

    constructor() {}

    reset(numbers: Array<number>) {
        this.numbers = numbers;
        this.N = numbers.length;
        this.iter = 0;
        this.terminate = false;
    }

    next() {}
}

export function minOfArray(
    numbers: Array<number>,
    start: number = 0,
    end: number = null
): { value: number; index: number } {
    if (end == null) {
        end = numbers.length;
    }
    if (start > end) {
        throw `minOfArray: start ${start} greater than end ${end}`;
    }

    let value = Infinity;
    let index = -1;
    for (let i = start; i < end; i++) {
        if (numbers[i] <= value) {
            value = numbers[i];
            index = i;
        }
    }
    return { value: value, index: index };
}

export function maxOfArray(
    numbers: Array<number>,
    start: number = 0,
    end: number = null
): { value: number; index: number } {
    if (end == null) {
        end = numbers.length;
    }
    if (start > end) {
        throw `minOfArray: start ${start} greater than end ${end}`;
    }

    let value = -Infinity;
    let index = -1;
    for (let i = start; i < end; i++) {
        if (numbers[i] >= value) {
            value = numbers[i];
            index = i;
        }
    }
    return { value: value, index: index };
}

export function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
    return array;
}
