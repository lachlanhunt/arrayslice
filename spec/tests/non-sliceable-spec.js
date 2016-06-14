describe("Slicing non-Array-like types", function() {
	let ArraySlice = require("../../lib/ArraySlice");

	function constructArraySlice(...args) {
		return function() {
			return new ArraySlice(...args);
		};
	}

	it("should throw a TypeError for numbers", function() {
		let values = [0, 1, -1, Infinity, -Infinity, NaN];

		for (let value of values) {
			expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
		}
	});

	it("should throw a TypeError for booleans", function() {
		let values = [true, false];

		for (let value of values) {
			expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
		}
	});

	it("should throw a TypeError for null and undefined", function() {
		let values = [null, undefined];

		for (let value of values) {
			expect(constructArraySlice(value)).toThrowError(TypeError, `Can't convert ${value} to object`);
		}
	});

	it("should throw a TypeError for primitive strings", function() {
		let values = ["", "test"];

		for (let value of values) {
			expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
		}
	});

	it("should throw a TypeError for String objects", function() {
		let values = [new String(""), new String("test")];

		for (let value of values) {
			expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice instances of String");
		}
	});

	it("should throw a TypeError for symbols", function() {
		let values = [Symbol(), Symbol("A")];

		for (let value of values) {
			expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
		}
	});

	it("should throw a TypeError for functions", function() {
		let values = [function(a, b){}, new Function("a", "b", ""), () => true];

		for (let value of values) {
			expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
		}
	});
});
