describe("Array methods", function() {
	let ArraySlice = require("../../lib/ArraySlice");

	it("should sort the subset of the array", function() {
		let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		let b = [0, 1, 2, 7, 3, 6, 4, 5, 8, 9];
		let c = ArraySlice(b, 3, 8);

		function compareNumbers(a, b) {
			return a - b;
		}

		c.sort(compareNumbers);

		expect(b).toEqual(a);
	});
});
