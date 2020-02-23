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

        let getSpecHalf = function(vertical, array) {
            for (let x = 0; x < (vertical ? grid : grid[0]).length; x++) {
                let inSequence = false;
                array[x] = [ 0 ];
                for (let y = 0; y < (vertical ? grid[x] : grid).length; y++) {
                    if (vertical ? grid[x][y] : grid[y][x]) {
                        inSequence = true;
                        array[x][array[x].length - 1]++;
                    } else if (inSequence) {
                        inSequence = false;
                        array[x][array[x].length] = 0;
                    }
                }
    
                if (array[x][array[x].length - 1] == 0 && array[x].length != 1) {
                    array[x].pop();
                }
            }
        };

        getSpecHalf(true, spec.cols);
        getSpecHalf(false, spec.rows);

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
