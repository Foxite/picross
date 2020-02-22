// Generates a Picross puzzle.
// Defines a function called "generate" which takes a width and height parameter, both integers, and returns an object:
// {
//     cols: int[][],
//     rows: int[][]
// }
// These jagged 2d arrays contain the spec for each row/column.
//
// It also defines a helper function called "getSpec" which takes a boolean[][] representing the grid, and returns the object described above.
function Generator() {
    this.generate = function(width, height) {
        throw "Called the abstract generate() function, but it has not been implemented!";
    }
    this.getSpec = function(grid) {
        let spec = { rows: [ 0 ], cols: [ 0 ] };
        let specI = 0;

        // Cols
        for (let i = 0; i < width; i++) {
            let inSequence = false;
            for (let j = 0; j < height; j++) {
                if (grid[i][j]) {
                    inSequence = true;
                    spec.cols[specI]++;
                } else if (inSequence) {
                    specI++;
                    spec.cols[specI] = 0;
                    inSequence = false;
                }
            }
        }

        specI = 0;
        // Rows
        for (let i = 0; i < height; i++) {
            let inSequence = false;
            for (let j = 0; j < width; j++) {
                if (grid[j][i]) {
                    inSequence = true;
                    spec.rows[specI]++;
                } else if (inSequence) {
                    specI++;
                    spec.rows[specI] = 0;
                    inSequence = false;
                }
            }
        }

        if (spec.rows[spec.rows.length - 1] == 0) {
            spec.rows = spec.rows.pop();
        }

        if (spec.cols[spec.cols.length - 1] == 0) {
            spec.cols = spec.cols.pop();
        }

        return spec;
    }
}