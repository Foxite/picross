function CircularArray(array) {
	this._array = array;
	this.length = this._array.length;
	this.contains = this._array.contains;
	this.get = function(index) {
		return this._array[((index % this.length) + this.length) % this.length]; // // https://stackoverflow.com/a/4467559
	}
	this.set = function(index, item) {
		this._array[((index % this.length) + this.length) % this.length] = item;
	}
}

var puzzleWidth = undefined;
var puzzleHeight = undefined;
var puzzle = undefined;

function setup() {
	puzzle = document.getElementById("puzzle");
	puzzleWidth = puzzle.rows.length - 1;
	puzzleHeight = puzzle.rows[0].cells.length - 1;
	
	forAllCells(function(cell) {
		cell.onclick = function() {
			rotateCellContent(this, 1);
		};
		cell.oncontextmenu = function() {
			rotateCellContent(this, -1);
			return false; // prevent context menu
		};
	});
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

function rotateCellContent(element, direction) {
	let rotation = new CircularArray([ "empty", "filled", "marked" ]);
	var notRotated = true;
	for (let i = 0; i < rotation.length; i++) {
		if (element.classList.contains(rotation.get(i))) {
			notRotated = false;
			element.classList.remove(rotation.get(i));
			element.classList.add(rotation.get(i + direction));
			break;
		}
	}
	if (notRotated) {
		// Not sure how it happened, but fix it.
		element.classList.add(rotation.get(0));
	}
	validate();
}

function validate() {
	Array.from(puzzle.getElementsByClassName("crossed")).map(function(item) {
		item.classList.remove("crossed");
		return 0;
	});
	// Validate rows
	for (let i = 0; i < puzzleHeight; i++) {
		puzzle.rows[i + 1].cells[0].classList.remove("incorrect");
		let spec = puzzle.rows[i + 1].cells[0].textContent.split(" ").map(function(item) {
			return parseInt(item);
		});
		let specI = 0;
		let inSequence = false;
		forRow(i, function(cell) {
			if (cell.classList.contains("filled")) {
				inSequence = true;
				spec[specI] = spec[specI] - 1;
				if (spec[specI] < 0) {
					puzzle.rows[i + 1].cells[0].classList.add("incorrect");
				}
			} else {
				if (inSequence) {
					if (spec[specI] == 0) {
						puzzle.rows[i + 1].cells[0].getElementsByClassName("number")[specI].classList.add("crossed");
					}
					specI++;
					inSequence = false;
				}
			}
		});
		if (spec[spec.length - 1] == 0) {
			puzzle.rows[i + 1].cells[0].getElementsByClassName("number")[spec.length - 1].classList.add("crossed");
		}
	}
	
	// Validate columns
	for (let i = 0; i < puzzleWidth; i++) {
		
	}
}
