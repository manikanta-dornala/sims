import { Search, Vertex, shuffleArray } from './utils';

export default class RandomSearch extends Search {
    init() {
        for (let i = 0; i < this.vertices.length; i++) {
            this.current_path.push(i);
            this.min_path.push(i);
        }
    }

    next() {
        if (this.terminate) return;
        const curr_length = this.current_path_length();
        shuffleArray(this.current_path);
        const new_path_length = this.current_path_length();
        if (new_path_length < this.min_path_length()) {
            this.min_path = [...this.current_path];
        }
        this.iter++;
        if (this.max_iter <= this.iter) {
            this.terminate = true;
        }
    }
}
