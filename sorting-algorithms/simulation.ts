import P5 from 'p5';

export default class Simulation {
    p5: P5;
    numbers = [];
    N = 50;
    isSorting = false;
    sorter;
    constructor() {}

    init(p5: P5) {
        this.p5 = p5;
        this.setAlgorithm('');
        this.randomize();
    }

    draw() {
        this.p5.push();
        this.p5.translate(0, this.p5.height);
        const cellWidth = this.p5.width / this.N;

        for (let i = 0; i < this.N; i++) {
            let height = this.numbers[i] * this.p5.height * -1;
            this.p5.fill(0, 0, 0);
            this.p5.stroke(255, 255, 255);
            this.p5.rect(0, 0, cellWidth, height);
            this.p5.translate(cellWidth, 0);
        }
        this.p5.pop();
        if (this.sorter && this.isSorting && this.p5.frameCount % 20) {
            var next = this.sorter.next();
            if (this.sorter.terminate) {
                this.isSorting = false;
            }
            this.numbers = next;
        }
    }

    setAlgorithm(algorithm: string) {
        switch (algorithm) {
            case 'min-selection-sort':
                this.sorter = new MinSelectionSort(this.numbers, this.N);
                break;
            case 'max-selection-sort':
                this.sorter = new MaxSelectionSort(this.numbers, this.N);
                break;
            default:
                this.sorter = new MinSelectionSort(this.numbers, this.N);
                break;
        }
    }

    randomize() {
        this.numbers = [];
        for (var i = 0; i < this.N; i++) {
            this.numbers.push(Math.random());
        }
        this.sorter.reset(this.numbers, this.N);
    }

    beginSort() {
        this.isSorting = true;
    }

    isActive() {
        return this.isSorting;
    }
}

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
    return array;
}

class MinSelectionSort {
    numbers = [];
    iter = 0;
    N;
    terminate;

    constructor(numbers, N) {
        this.reset(numbers, N);
    }

    reset(numbers, N) {
        this.numbers = numbers;
        this.N = N;
        this.iter = 0;
        this.terminate = false;
    }

    next() {
        let front = this.numbers.slice(0, this.iter);
        let back = this.numbers.slice(this.iter);
        if (back.length > 0) {
            let minVal = Math.min(...back);
            let minValIndex = back.indexOf(minVal);
            back = swap(back, 0, minValIndex);
        } else {
            this.terminate = true;
        }
        this.numbers = front.concat(back);
        this.iter++;
        return this.numbers;
    }
}
class MaxSelectionSort {
    numbers = [];
    iter = 0;
    N;
    terminate;

    constructor(numbers, N) {
        this.reset(numbers, N);
    }

    reset(numbers, N) {
        this.numbers = numbers;
        this.N = N;
        this.iter = 0;
        this.terminate = false;
    }

    next() {
        console.log(this.numbers);
        let front = this.numbers.slice(0, this.N - this.iter);
        let back = this.numbers.slice(this.N - this.iter);
        if (front.length > 0) {
            let maxVal = Math.max(...front);
            let maxValIndex = front.indexOf(maxVal);
            front = swap(front, front.length - 1, maxValIndex);
        } else {
            this.terminate = true;
        }
        this.numbers = front.concat(back);
        this.iter++;
        return this.numbers;
    }
}
