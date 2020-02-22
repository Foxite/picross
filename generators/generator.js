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

function generatePuzzle(width, height, generator) {
    let spec = generator.generate(width, height);
	clearNode(puzzle);
	
    // Top row
	let firstRow = puzzle.insertRow(0);
	
	// Topleft cell
    let topLeft = firstRow.insertCell(0);
    topLeft.classList.add("topleft");

	// Hints
    for (let i = 0; i < width; i++) {
        let cell = firstRow.insertCell(i + 1);
        cell.classList.add("hint");
        cell.classList.add("vert");
        for (let j = 0; j < spec.cols[i].length; j++) {
            let hint = document.createElement("div");
            hint.classList.add("number");
            hint.textContent = spec.cols[i][j].toString();
        }
    }

    // Other rows
    for (let i = 0; i < height; i++) {
		let row = puzzle.insertRow(i + 1);
		
		// Hint
        let hintCell = row.insertCell(0);
        hintCell.classList.add("hint");
		hintCell.classList.add("horiz");
        for (let j = 0; j < spec.cols[i].length; j++) {
            let hint = document.createElement("div");
            hint.classList.add("number");
            hint.textContent = spec.cols[i][j].toString();
		}

		// Cells
		for (let j = 0; j < width; j++) {
            let cell = row.insertCell(j + 1);
            cell.classList.add("cell");
			cell.classList.add("empty");
		}
    }
}
