class CircularArray {
	constructor(array) {
		this._array = array;
		this.length = this._array.length;
		this.contains = this._array.contains;
	}

	get(index) {
		return this._array[((index % this.length) + this.length) % this.length]; // https://stackoverflow.com/a/4467559
	}

	set(index, item) {
		this._array[((index % this.length) + this.length) % this.length] = item;
	}
}
