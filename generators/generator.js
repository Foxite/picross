// Abstract class which generates a Picross puzzle.
// Child classes must define a function called "generate" which takes a width and height parameter, both integers, and returns an object:
// {
//     cols: int[][],
//     rows: int[][]
// }
// These jagged 2d arrays contain the spec for each row/column.
//
// This class defines a helper function called "getSpec" which takes a boolean[col][row] representing the grid, and returns the object described above.
class Generator {
    constructor() {
        if (new.target === Generator) {
            throw new TypeError("Generator is an abstract class");
        }
    }

    getSpec(grid) {
        let spec = { rows: [], cols: [] };
        
        // Cols
        for (let col = 0; col < grid.length; col++) {
            let specI = 0;
            let inSequence = false;
            spec.cols[col] = [ 0 ];
            for (let cell = 0; cell < grid[col].length; cell++) {
                if (grid[col][cell]) {
                    inSequence = true;
                    spec.cols[col][specI]++;
                } else if (inSequence) {
                    inSequence = false;
                    specI++;
                    spec.cols[col][specI] = 0;
                }
            }

            if (spec.cols[col][spec.cols[col].length - 1] == 0 && spec.cols[col].length != 1) {
                spec.cols[col].pop();
            }
        }

        // Rows
        for (let row = 0; row < grid[0].length; row++) {
            let specI = 0;
            let inSequence = false;
            spec.rows[row] = [ 0 ];
            for (let cell = 0; cell < grid.length; cell++) {
                if (grid[cell][row]) {
                    inSequence = true;
                    spec.rows[row][specI]++;
                } else if (inSequence) {
                    inSequence = false;
                    specI++;
                    spec.rows[row][specI] = 0;
                }
            }

            if (spec.rows[row][spec.rows[row].length - 1] == 0 && spec.rows[row].length != 1) {
                spec.rows[row].pop();
            }
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
        let notFirst = false;
        for (let j = 0; j < spec.cols[i].length; j++) {
            if (notFirst) {
                cell.appendChild(document.createTextNode(" "));
            }
            notFirst = true;

            let hint = document.createElement("div");
            hint.classList.add("number");
            hint.textContent = spec.cols[i][j].toString();
            cell.appendChild(hint);
        }
    }

    // Other rows
    for (let i = 0; i < height; i++) {
		let row = puzzle.insertRow(i + 1);
		
		// Hint
        let hintCell = row.insertCell(0);
        hintCell.classList.add("hint");
		hintCell.classList.add("horiz");
        let notFirst = false;
        for (let j = 0; j < spec.rows[i].length; j++) {
            if (notFirst) {
                hintCell.appendChild(document.createTextNode(" "));
            }
            notFirst = true;
            let hint = document.createElement("div");
            hint.classList.add("number");
            hint.textContent = spec.rows[i][j].toString();
            hintCell.appendChild(hint);
		}

		// Cells
		for (let j = 0; j < width; j++) {
            let cell = row.insertCell(j + 1);
            cell.classList.add("cell");
			cell.classList.add("empty");
		}
    }
}
