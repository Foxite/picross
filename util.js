function CircularArray(array) {
	this._array = array;
	this.length = this._array.length;
	this.contains = this._array.contains;
	this.get = function(index) {
		return this._array[((index % this.length) + this.length) % this.length]; // https://stackoverflow.com/a/4467559
	}
	this.set = function(index, item) {
		this._array[((index % this.length) + this.length) % this.length] = item;
	}
}
