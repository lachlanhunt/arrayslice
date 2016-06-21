describe("Array methods", function() {
	let ArraySlice = require("../../lib/ArraySlice");

	it("should sort the subset of the array", function() {
		let a = [8, 9, 6, 0, 1, 2, 5, 7, 4, 3];
		let b = [8, 9, 6, 1, 5, 7, 0, 2, 4, 3];
		let c = ArraySlice(b, 3, 8);

		function compareNumbers(a, b) {
			return a - b;
		}

		c.sort(compareNumbers);

		expect(b).toEqual(a);
	});
});
