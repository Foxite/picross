// Abstract class which generates a Picross puzzle.
// Child classes must define a function called "generate" which takes a width and height parameter, both integers, and returns an object:
// {
//     cols: int[][],
//     rows: int[][]
// }
// These jagged 2d arrays contain the spec for each row/column.
//
// This class defines a helper function called "getSpec" which takes a boolean[][] representing the grid, and returns the object described above.
class Generator {
    constructor() {
        if (new.target === Generator) {
            throw new TypeError("Generator is an abstract class");
        }
        if (this.generate === undefined) {
            throw new TypeError("Must override method");
        }
    }

    getSpec(grid) {
        let spec = { rows: [0], cols: [0] };
        let specI = 0;
        // Cols
        for (let i = 0; i < width; i++) {
            let inSequence = false;
            for (let j = 0; j < height; j++) {
                if (grid[i][j]) {
                    inSequence = true;
                    spec.cols[specI]++;
                }
                else if (inSequence) {
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
                }
                else if (inSequence) {
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
