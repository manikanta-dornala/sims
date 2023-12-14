import P5 from 'p5';

const sketch = (p5: P5) => {
    var is_canvas_infocus = false;
    const game = new GameOfLife();
    p5.setup = () => {
        var cnv = p5.createCanvas(p5.windowWidth * 0.9, p5.windowHeight * 0.9);
        cnv.mouseOver(() => {
            is_canvas_infocus = true;
        });
        cnv.mouseOut(() => {
            is_canvas_infocus = false;
        });
        cnv.style('display', 'block');
        cnv.parent('sketch-holder');
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth * 0.9, p5.windowHeight * 0.9);
    };

    p5.draw = () => {
        p5.background(0, 0, 0);
        drawCells(game);
        if (p5.frameCount % 2 == 0) {
            game.simulateLife();
        }
    };

    function drawCells(game: GameOfLife) {
        let cells = game.cells;
        const cellXWidth = p5.max(p5.width / game.gridXSize, 1);
        const cellYWidth = p5.max(p5.height / game.gridYSize, 1);
        for (var i = 0; i < game.gridXSize; i++) {
            for (var j = 0; j < game.gridYSize; j++) {
                if (game.cells[i][j] == 1) {
                    const num_neighbors = game.retrieveLiveNeighbors(i, j);
                    p5.fill(
                        100 * num_neighbors * Math.random(),
                        100 * num_neighbors * Math.random(),
                        100 * num_neighbors * Math.random()
                    );
                    p5.strokeWeight(0);
                    p5.rect(
                        i * cellXWidth,
                        j * cellYWidth,
                        cellXWidth,
                        cellYWidth
                    );
                }
            }
        }
    }
};

class GameOfLife {
    gridXSize = 300;
    gridYSize = 300;
    cells = [];

    constructor() {
        for (var i = 0; i < this.gridXSize; i++) {
            var arr = [0];
            for (var j = 0; j < this.gridYSize; j++) arr.push(0);
            this.cells.push(arr);
        }
        this.randomizeWorld();
    }

    randomizeWorld() {
        for (var i = 0; i < this.gridXSize; i++) {
            for (var j = 0; j < this.gridYSize; j++) {
                this.cells[i][j] = 0;
                if (Math.random() < 0.1) {
                    this.cells[i][j] = 1;
                }
            }
        }
    }

    retrieveLiveNeighbors(X, Y) {
        var count = 0;
        for (var i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                // This is to ensure the world wraps around corners
                const x = (this.gridXSize + X + i) % this.gridXSize;
                const y = (this.gridYSize + Y + j) % this.gridYSize;
                count += this.cells[x][y];
            }
        }
        return count;
    }

    simulateLife() {
        // Simulates the life according to Conway's Four rules
        const neighbors = [];
        for (var i = 0; i < this.gridXSize; i++) {
            neighbors.push([]);
            for (var j = 0; j < this.gridYSize; j++) {
                neighbors[i].push(this.retrieveLiveNeighbors(i, j));
            }
        }
        for (var i = 0; i < this.gridXSize; i++) {
            for (var j = 0; j < this.gridYSize; j++) {
                const k = neighbors[i][j];
                if (this.cells[i][j] == 1) {
                    if (k < 2) {
                        // Rule 1
                        // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
                        this.cells[i][j] = 0;
                    }
                    if (k == 2 || k == 3) {
                        // Rule 2
                        // Any live cell with two or three live neighbors lives on to the next generation.
                        this.cells[i][j] = 1;
                    }
                    if (k > 3) {
                        // Rule 3
                        // Any live cell with more than three live neighbors dies, as if by overpopulation.
                        this.cells[i][j] = 0;
                    }
                } else {
                    if (k == 3) {
                        // Rule 4
                        // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                        this.cells[i][j] = 1;
                    }
                }
            }
        }

    }
}

new P5(sketch);
