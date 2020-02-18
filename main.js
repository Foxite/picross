function forAllCells(callback) {
	var puzzle = document.getElementById("puzzle");
	for (var i = 1; i < puzzle.rows.length; i++) {
		for (var j = 1; j < puzzle.rows[i].cells.length; j++) {
			callback(puzzle.rows[i].cells[j]);
		}
	}
}

function forRow(row, callback) {
	var puzzle = document.getElementById("puzzle");
	for (var i = 1; i < puzzle.rows[row].cells.length; i++) {
		callback(puzzle.rows[row].cells[i]);
	}
}

function forColumn(column, callback) {
	var puzzle = document.getElementById("puzzle");
	for (var i = 1; i < puzzle.rows.length; i++) {
		callback(puzzle.rows[i].cells[column]);
	}
}

function setup() {
	forAllCells(function(cell) {
		if (cell.classList.contains("cell")) {
			cell.onclick = onCellClick;
		}
	});
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
}
