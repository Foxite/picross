function setup() {
	coreSetup(); 

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
		console.log("this should never appear. the classlist was " + element.classList.join(", "));
		element.classList.add(rotation.get(0));
	}
	validate();
}

function validate() {
	Array.from(puzzle.getElementsByClassName("crossed")).map(function(item) {
		item.classList.remove("crossed");
		return 0;
	});
	// TODO find a way to merge this and the next code block, preferably without it becoming a mess
	// Validate rows
	for (let i = 0; i < puzzleHeight; i++) {
		puzzle.rows[i + 1].cells[0].classList.remove("incorrect");
		Array.from(puzzle.rows[i + 1].cells[0].getElementsByClassName("number")).forEach(function(number) {
			number.classList.remove("crossed");
		});
		let spec = puzzle.rows[i + 1].cells[0].textContent.split(" ").map(function(item) {
			return parseInt(item);
		});
		let specI = 0;
		let inSequence = false;
		forRow(i, function(cell) {
			if (cell.classList.contains("filled")) {
				if (specI >= spec.length) {
					puzzle.rows[i + 1].cells[0].classList.add("incorrect");
				} else {
					inSequence = true;
					spec[specI] = spec[specI] - 1;
					if (spec[specI] < 0) {
						puzzle.rows[i + 1].cells[0].classList.add("incorrect");
					}
				}
			} else if (inSequence) {
				if (spec[specI] == 0) {
					puzzle.rows[i + 1].cells[0].getElementsByClassName("number")[specI].classList.add("crossed");
				} else if (spec[specI] < 0) {
					puzzle.rows[i + 1].cells[0].classList.add("incorrect");
				}
				specI++;
				inSequence = false;
			}
		});
		if (puzzle.rows[i + 1].cells[0].classList.contains("incorrect")) {
			// if it's incorrect, uncross all crossed hints
			Array.from(puzzle.rows[i + 1].cells[0].getElementsByClassName("number")).forEach(function(number) {
				number.classList.remove("crossed");
			});
		} else if (spec[spec.length - 1] == 0) {
			// cross off the last hint, it won't get crossed by the code in the loop
			puzzle.rows[i + 1].cells[0].getElementsByClassName("number")[spec.length - 1].classList.add("crossed");
		}
	}
	
	// Validate columns
	for (let i = 0; i < puzzleWidth; i++) {
		puzzle.rows[0].cells[i + 1].classList.remove("incorrect");
		Array.from(puzzle.rows[0].cells[i + 1].getElementsByClassName("number")).forEach(function(number) {
			number.classList.remove("crossed");
		});
		let spec = puzzle.rows[0].cells[i + 1].textContent.split(" ").map(function(item) {
			return parseInt(item);
		});
		let specI = 0;
		let inSequence = false;
		forColumn(i, function(cell) {
			if (cell.classList.contains("filled")) {
				if (specI >= spec.length) {
					puzzle.rows[0].cells[i + 1].classList.add("incorrect");
				} else {
					inSequence = true;
					spec[specI] = spec[specI] - 1;
					if (spec[specI] < 0) {
						puzzle.rows[0].cells[i + 1].classList.add("incorrect");
					}
				}
			} else if (inSequence) {
				if (spec[specI] == 0) {
					puzzle.rows[0].cells[i + 1].getElementsByClassName("number")[specI].classList.add("crossed");
				} else if (spec[specI] < 0) {
					puzzle.rows[0].cells[i + 1].classList.add("incorrect");
				}
				specI++;
				inSequence = false;
			}
		});
		if (puzzle.rows[0].cells[i + 1].classList.contains("incorrect")) {
			// if it's incorrect, uncross all crossed hints
			Array.from(puzzle.rows[0].cells[i + 1].getElementsByClassName("number")).forEach(function(number) {
				number.classList.remove("crossed");
			});
		} else if (spec[spec.length - 1] == 0) {
			// cross off the last hint, it won't get crossed by the code in the loop
			puzzle.rows[0].cells[i + 1].getElementsByClassName("number")[spec.length - 1].classList.add("crossed");
		}
	}
}
