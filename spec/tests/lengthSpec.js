describe("ArraySlice length", function() {
	let ArraySlice = require("../../lib/ArraySlice");

	it("should be the difference between start and end", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(b.length).toBe(5);
	});

	it("should be positive, even for reversed arrays", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 8, 3);

		expect(b.length).toBeGreaterThan(0);
		expect(b.length).toBe(5);
	});

	it("should not exceed the length of the source array", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];

		expect(ArraySlice(a, 0, a.length + 1).length).toBe(a.length);
		expect(ArraySlice(a, a.length, 0).length).toBe(a.length);
	});

	it("should not extend past the end of an array when setting", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		b.length += a.length;
		expect(b.length).toBe(7);

		b.length = Math.pow(2, 32) - 1;
		expect(b.length).toBe(7);
	});

	it("should not extend past the beginning of a reversed array when setting", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 8, 3);

		b.length += a.length;
		expect(b.length).toBe(8);

		b.length = Math.pow(2, 32) - 1;
		expect(b.length).toBe(8);
	});

	it("should throw a RangeError when not setting to a 32 bit unsigned Int", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 8, 3);

		expect(() => b.length = -1).toThrowError(RangeError);
		expect(() => b.length = 5.2).toThrowError(RangeError);
		expect(() => b.length = Math.pow(2, 53)).toThrowError(RangeError);
		expect(() => b.length = Infinity).toThrowError(RangeError);
		expect(() => b.length = NaN).toThrowError(RangeError);
		expect(() => b.length = "a").toThrowError(RangeError);
		expect(() => b.length = undefined).toThrowError(RangeError);
	});

	it("should allow access to previously inaccessible indexes after extending the length", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(b[5]).toBeUndefined();
		b.length += 1;
		expect(b[5]).toBe(a[8]);
	});

	it("should allow access to previously inaccessible indexes after extending the length for reversed arrays", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 8, 3);

		expect(b[5]).toBeUndefined();
		b.length += 1;
		expect(b[5]).toBe(a[2]);
	});

	it("should prevent access to previously accessible indexes after reducing the length", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(b[4]).toBe(a[7]);
		b.length -= 1;
		expect(b[4]).toBeUndefined();
	});

	it("should prevent access to previously accessible indexes after reducing the length for reversed arrays", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 8, 3);

		expect(b[4]).toBe(a[3]);
		b.length -= 1;
		expect(b[4]).toBeUndefined();
	});

	it("should return no items when the length is set to 0;", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(b[0]).toBe(a[3]);
		b.length = 0;
		expect(b[0]).toBeUndefined();
	});

	it("should default to a forward sequence when created with 0 length", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 4, 4);

		expect(b[0]).toBeUndefined();
		b.length = 5;
		expect(b[0]).toBe(a[4]);
		expect(b[4]).toBe(a[8]);
	});
});
