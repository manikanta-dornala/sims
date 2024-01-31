import P5 from 'p5';
import { Search, Vertex } from './algorithms/utils';
import RandomSearch from './algorithms/random-search';
import BranchAndBoundSearch from './algorithms/branch-n-bound';

export default class Simulation {
    gridXSize = 100;
    gridYSize = 100;
    worldGrid: Array<Array<Vertex>> = [];
    numVertices = 6;
    vertices = [];
    search?: Search;
    p5: P5;
    algorithmOptions = [
        { value: 'random-search', label: 'RandomSearch' },
        { value: 'branch-n-bound', label: 'Branch and Bound' },
    ];
    isActive = false;
    constructor(props) {
        for (let i = 0; i < this.gridXSize; i++) {
            this.worldGrid.push([]);
            for (let j = 0; j < this.gridYSize; j++) {
                this.worldGrid[i].push(null);
            }
        }
        this.setAlgorithm(this.algorithmOptions[0].value);
    }

    setup(p5: P5) {
        this.p5 = p5;

        this.vertices = [];
        this.createVertexs(10).forEach((node) => this.vertices.push(node));
    }

    run() {
        if (this.isActive) this.search.next();
    }

    createVertexs(num) {
        const newVertexs = [];
        for (let i = 0; i < num; i++) {
            const vertex = new Vertex(this.newRandomPos());
            vertex.name = i;
            newVertexs.push(vertex);
        }
        return newVertexs;
    }
    addVertex(vertex: Vertex) {
        this.vertices.push(vertex);
    }
    addVertexs(vertices: Vertex[]) {
        vertices.forEach((vertex) => this.vertices.push(vertex));
    }

    newRandomPos(): P5.Vector {
        let newPos = new P5.Vector(
            Math.floor(this.p5.random(5, this.gridXSize - 5)),
            Math.floor(this.p5.random(5, this.gridYSize - 5))
        );
        if (this.worldGrid[newPos.x][newPos.y] != null) {
            return this.newRandomPos();
        } else return newPos;
    }

    setAlgorithm(algo: string) {
        switch (algo) {
            case 'random-search':
                this.search = new RandomSearch(this.vertices);
                break;
            case 'branch-n-bound':
                this.search = new BranchAndBoundSearch(this.vertices);
                break;
            default:
                console.l;
                this.search = new RandomSearch(this.vertices);
                break;
        }
        this.isActive = false;
        this.search.reset(this.vertices);
    }

    getMinPathStr() {
        const str = `Minimum ${this.search.min_path
            .map((x) => this.vertices[x].name)
            .join(',')} Length: ${Math.floor(this.search.min_path_length())}`;
        return str;
    }

    getCurrPathStr() {
        return `Current ${this.search.current_path
            .map((x) => this.vertices[x].name)
            .join(',')} Length: ${Math.floor(
            this.search.current_path_length()
        )}`;
    }

    randomize() {
        this.vertices = [];
        this.createVertexs(this.numVertices).forEach((node) =>
            this.vertices.push(node)
        );
        this.isActive = false;
        this.search.reset(this.vertices);
    }
}
