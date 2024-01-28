import P5 from 'p5';

export class Search {
    iter = 0;
    max_iter = 1000;
    terminate = false;
    vertices: Array<Vertex>;
    current_path: Array<number> = [];
    current_path_length = () => {
        return path_length(this.current_path, this.vertices);
    };
    min_path: Array<number> = [];
    min_path_length = () => {
        return path_length(this.min_path, this.vertices);
    };

    constructor(vertices: Array<Vertex>) {
        this.reset(vertices);
    }

    init() {}

    next() {}

    reset(vertices) {
        this.vertices = vertices;
        this.current_path = [];
        this.min_path = [];
        this.terminate = false;
        this.init();
    }
}

export class Vertex {
    name: string | number = Math.ceil(Math.random() * 20);
    position: P5.Vector;
    constructor(position: P5.Vector = null) {
        if (position) {
            this.position = position;
        }
    }
}

export function path_length(
    path: Array<number>,
    vertices: Array<Vertex>
): number {
    if (path.length <= 1) return 0;
    let length = 0;
    for (let i = 0; i < path.length - 1; i++) {
        length += distance(vertices[path[i]], vertices[path[i + 1]]);
    }
    return length;
}

export function distance(A: Vertex, B: Vertex): number {
    return A.position.dist(B.position);
}

export function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
    return array;
}

export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        swap(array, i, j);
    }
}
