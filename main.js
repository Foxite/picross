var puzzleWidth = 5;
var puzzleHeight = 5;
var puzzle = undefined;

function setup() {
	puzzle = document.getElementById("puzzle");
	forAllCells(function(cell) {
		cell.onclick = onCellClick;
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

function onCellClick() {
	if (this.classList.contains("empty")) {
		this.classList.remove("empty");
		this.classList.add("filled");
	} else if (this.classList.contains("filled")) {
		this.classList.remove("filled");
		this.classList.add("marked");
	} else if (this.classList.contains("marked")) {
		this.classList.remove("marked");
		this.classList.add("empty");
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
