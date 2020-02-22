// Randomly fills in squares and produces a spec for each row/column, with no further intelligence or difficulty parameter other than the probability of a square getting filled.
// This can easily produce ridiculously easy puzzles or completely impossible ones, as well as eveything in-between. This is not meant to be used in the final product.
// probability is a number between 0 and 1. A random number is generated for each square; if it is less than this value, it gets filled.
function RandomGenerator(probability) {
    Generator.call(this);
    this.generate = function(width, height) {
        let grid = [];
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                grid[i][j] = Math.random() < probability ? true : false;
            }
        }
        return this.getSpec(grid);
    }
}
