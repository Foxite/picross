var puzzleWidth = undefined;
var puzzleHeight = undefined;
var puzzle = undefined;

function coreSetup(width, height, generator) {
	puzzle = document.getElementById("puzzle");
	
	puzzleWidth = width;
	puzzleHeight = height;
	
	generatePuzzle(width, height, generator);
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
