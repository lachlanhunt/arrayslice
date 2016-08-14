describe("Array prototype method", function() {
	let ArraySlice = require("../../lib/ArraySlice");

	function callMethod(method) {
		this[method]();
	}

	it(".concat() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,0,0,0,1,2,3,4,8,9];
		let c = ArraySlice(b, 3, 8);

		let d = c.concat([5,6,7,8,9]);

		expect(d).toEqual(a);
	});

	it(".copyWithin() should not copy past the end of the slice", function() {
		let a = [0,1,2,3,4,5,3,4,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.copyWithin(3, 0);

		expect(b).toEqual(a);
	});

	it(".every() should invoke the callback only for elements within the slice", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		function callback(value, index, array) {
			return index === value - 3 && value >=0 && value < 8 && array === b;
		}

		expect(b.every(callback)).toBe(true);
	});

	it(".fill() should set values only within the slice", function() {
		let a = [0,1,2,0,0,0,0,0,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.fill(0);

		expect(b).toEqual(a);
	});

	it(".filter() should only return matching values within the slice", function() {
		function isOdd(n) {
			return !!(n % 2);
		}

		let a = [3,5,7];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);
		let d = c.filter(isOdd);

		expect(d).toEqual(a);
	});

	it(".find() should search for a value only within the slice", function() {
		let a = [7,0,5,1,4,2,8,3,6,9];
		let b = ArraySlice(a, 3, 8);

		let c = b.find(function(n) {
			return n >= 3 && n <= 5;
		});

		expect(c).toBe(4);
	});

	it(".findIndex() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		let c = b.findIndex(function(n) {
			return n === 5;
		});

		expect(c).toBe(2);
	});

	 /*
	it(".forEach() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.forEach();

		expect(b).toEqual(a);
	});

	it(".includes() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.includes();

		expect(b).toEqual(a);
	});
*/
	it(".indexOf() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		let c = b.indexOf(5);

		expect(c).toBe(2);
	});
/*
	it(".join() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.join();

		expect(b).toEqual(a);
	});
*/
	it(".keys() should ", function() {
		let a = [0,1,2,3,4];
		let b = [9,8,7,6,5,4,3,2,1,0];
		let c = ArraySlice(b, 3, 8);

		let d = [...c.keys()];

		expect(d).toEqual(a);
	});
/*
	it(".lastIndexOf() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.lastIndexOf();

		expect(b).toEqual(a);
	});

	it(".map() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.map();

		expect(b).toEqual(a);
	});
 */

	it(".pop() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(callMethod.bind(b, "pop")).toThrowError(TypeError, "Cannot call pop method on ArraySlice instances");
	});

	it(".push() should throw a TypeError", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(callMethod.bind(b, "push")).toThrowError(TypeError, "Cannot call push method on ArraySlice instances");
	});
/*
	it(".reduce() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.reduce();

		expect(b).toEqual(a);
	});

	it(".reduceRight() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.reduceRight();

		expect(b).toEqual(a);
	});

	it(".reverse() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.reverse();

		expect(b).toEqual(a);
	});
*/
	it(".shift() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(callMethod.bind(b, "shift")).toThrowError(TypeError, "Cannot call shift method on ArraySlice instances");
	});
/*
	it(".slice() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.slice();

		expect(b).toEqual(a);
	});

	it(".some() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.some();

		expect(b).toEqual(a);
	});
*/
	it(".sort() should sort the subset of the array", function() {
		let a = [8, 9, 6, 0, 1, 2, 5, 7, 4, 3];
		let b = [8, 9, 6, 1, 5, 7, 0, 2, 4, 3];
		let c = ArraySlice(b, 3, 8);

		function compareNumbers(a, b) {
			return a - b;
		}

		c.sort(compareNumbers);

		expect(b).toEqual(a);
	});
/*
	it(".splice() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.splice();

		expect(b).toEqual(a);
	});

	it(".toLocaleString() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.toLocaleString();

		expect(b).toEqual(a);
	});

	it(".toSource() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.toSource();

		expect(b).toEqual(a);
	});

	it(".toString() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.toString();

		expect(b).toEqual(a);
	});
*/
	it(".unshift() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(callMethod.bind(b, "unshift")).toThrowError(TypeError, "Cannot call unshift method on ArraySlice instances");
	});
/*
	it(".entries() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.entries();

		expect(b).toEqual(a);
	});

	it(".values() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c.values();

		expect(b).toEqual(a);
	});

	it("[@@iterator]() should ", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = [0,1,2,3,4,5,6,7,8,9];
		let c = ArraySlice(b, 3, 8);

		c[Symbol.iterator]();

		expect(b).toEqual(a);
	});
*/
});
