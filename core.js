var puzzleWidth = undefined;
var puzzleHeight = undefined;
var puzzle = undefined;

function coreSetup() {
	puzzle = document.getElementById("puzzle");
	puzzleWidth = puzzle.rows.length - 1;
	puzzleHeight = puzzle.rows[0].cells.length - 1;
}

function forAllCells(callback) {
	for (let i = 0; i < puzzleWidth; i++) {
		for (let j = 0; j < puzzleHeight; j++) {
			callback(puzzle.rows[i + 1].cells[j + 1]);
		}
	}
}

function forRow(row, callback) {
	for (let i = 0; i < puzzleWidth; i++) {
		callback(puzzle.rows[row + 1].cells[i + 1]);
	}
}

function forColumn(column, callback) {
	for (let i = 0; i < puzzleHeight; i++) {
		callback(puzzle.rows[i + 1].cells[column + 1]);
	}
}
