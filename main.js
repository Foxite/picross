function setup() {
	var puzzle = document.getElementById("puzzle");
	for (var i = 0; i < puzzle.rows.length; i++) {
		for (var j = 0; j < puzzle.rows[i].cells.length; j++) {
			if (puzzle.rows[i].cells[j].classList.contains("cell")) {
				puzzle.rows[i].cells[j].onclick = onCellClick;
			}
		}
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
}