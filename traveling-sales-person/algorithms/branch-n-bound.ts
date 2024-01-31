import { Search, Vertex, path_length, shuffleArray } from './utils';

export default class BranchAndBoundSearch extends Search {
    frontier: Array<Array<number>> = [];
    bestPath: number[];
    bestPathLength = Infinity;
    init() {
        this.frontier = [[0]];
        this.current_path = [0];
        this.min_path = [0];
        this.bestPath = [];
        this.bestPathLength = Infinity;
    }

    next() {
        if (this.terminate) return;
        let bestPathSoFar = this.choose();
        let newPaths = this.expand(bestPathSoFar);
        newPaths.forEach((newPath) => {
            let newPathLength = path_length(newPath, this.vertices);
            if (newPath.length == this.vertices.length) {
                if (newPathLength < this.bestPathLength) {
                    this.bestPath = [...newPath];
                    this.bestPathLength = newPathLength;
                }
            }
            this.current_path = [...newPath];
            this.min_path = [...this.bestPath];
            this.frontier.push(newPath);
        });

        if (this.max_iter <= this.iter || this.frontier.length <= 0) {
            this.terminate = true;
        }
    }

    choose(): number[] {
        let best = this.frontier[0].length;
        let bestPathIndex = 0;
        let bestPath = this.frontier[0];
        for (let i = 0; i < this.frontier.length; i++) {
            let path = this.frontier[i];
            let len = path.length;
            if (len < best) {
                best = len;
                bestPathIndex = i;
                bestPath = [...path];
            }
        }
        this.frontier.splice(bestPathIndex, 1);
        return bestPath;
    }

    expand(path: Array<number>) {
        let newPaths: number[][] = [];
        let nextVertices = Array.from(
            { length: this.vertices.length },
            (x, i) => i
        ).filter((v) => !path.includes(v));
        nextVertices.forEach((vertex) => {
            newPaths.push(path.concat([vertex]));
        });
        return newPaths;
    }
}
