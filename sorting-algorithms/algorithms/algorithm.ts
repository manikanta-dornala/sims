export class SortingAlgorithm {
    numbers: Array<number> = [];
    iter = 0;
    N = 0;
    terminate = false;
    steps: Array<{
        typ: string;
        swapA?: number;
        swapB?: number;
        selectA?: number;
        selectSteps?: number;
        setIndex?: number;
        setValue?: number;
    }>;
    numSteps: number = 0;
    constructor() {}

    reset(numbers: Array<number>) {
        this.numbers = numbers;
        this.N = numbers.length;
        this.iter = 0;
        this.terminate = false;
        this.steps = [];
        this.createSortSteps([...this.numbers]);
        this.numSteps = this.getNumSteps();
        console.log(this.steps);
    }

    createSortSteps(numbers: Array<number>) {}

    getNumSteps() {
        let numSteps = 0;
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            switch (step.typ) {
                case 'swap':
                    numSteps++;
                    break;
                case 'find':
                    numSteps += step.selectSteps;
                    break;
                case 'set':
                    numSteps++;
                    break;
                default:
                    break;
            }
        }
        return numSteps;
    }

    next() {
        if (this.iter >= this.steps.length) {
            this.terminate = true;
            return;
        }
        const step = this.steps[this.iter];
        switch (step.typ) {
            case 'swap':
                swap(this.numbers, step.swapA, step.swapB);
                this.iter++;
                break;
            case 'find':
                if (step.selectSteps > 0) {
                    step.selectSteps--;
                } else {
                    this.iter++;
                }
                break;
            case 'set':
                this.numbers[step.setIndex] = step.setValue;
                this.iter++;
                break;
            default:
                break;
        }
    }
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
