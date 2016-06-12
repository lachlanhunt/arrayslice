/**
 * Created by lachlanhunt on 2016-06-13.
 */
describe("ArraySlice", function() {
	let ArraySlice = require("../../lib/ArraySlice");

	it("should re-map array indexes on get", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 3, 8);

		expect(b[0]).toEqual(a[3]);
		expect(b[1]).toEqual(a[4]);
		expect(b[2]).toEqual(a[5]);
		expect(b[3]).toEqual(a[6]);
		expect(b[4]).toEqual(a[7]);
	});

	it("should re-map array indexes on get for reverse arrays", function() {
		let a = [0,1,2,3,4,5,6,7,8,9];
		let b = ArraySlice(a, 8, 3);

		expect(b[0]).toEqual(a[7]);
		expect(b[1]).toEqual(a[6]);
		expect(b[2]).toEqual(a[5]);
		expect(b[3]).toEqual(a[4]);
		expect(b[4]).toEqual(a[3]);
	});
});
