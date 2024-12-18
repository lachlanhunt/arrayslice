import { ArraySlice } from "./ArraySlice";

describe("ArraySlice length", function () {
    it("should be the difference between start and end", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        expect(b.length).toBe(5);
    });

    it("should be positive, even for reversed arrays", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        expect(b.length).toBeGreaterThan(0);
        expect(b.length).toBe(5);
    });

    it("should not exceed the length of the source array", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        expect(ArraySlice(a, 0, a.length + 1).length).toBe(a.length);
        expect(ArraySlice(a, a.length, 0).length).toBe(a.length);
    });

    it("should not extend past the end of an array when setting", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        b.length += a.length;
        expect(b.length).toBe(7);

        b.length = Math.pow(2, 32) - 1;
        expect(b.length).toBe(7);
    });

    it("should not extend past the beginning of a reversed array when setting", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        b.length += a.length;
        expect(b.length).toBe(8);

        b.length = Math.pow(2, 32) - 1;
        expect(b.length).toBe(8);
    });

    it("should throw a RangeError when not setting to a 32 bit unsigned Int", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        expect(() => (b.length = -1)).toThrowError(RangeError);
        expect(() => (b.length = 5.2)).toThrowError(RangeError);
        expect(() => (b.length = Math.pow(2, 53))).toThrowError(RangeError);
        expect(() => (b.length = Infinity)).toThrowError(RangeError);
        expect(() => (b.length = NaN)).toThrowError(RangeError);
        expect(() => (b.length = "a")).toThrowError(RangeError);
        expect(() => (b.length = undefined)).toThrowError(RangeError);
    });

    it("should allow access to previously inaccessible indexes after extending the length", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        expect(b[5]).toBeUndefined();
        b.length += 1;
        expect(b[5]).toBe(a[8]);
    });

    it("should allow access to previously inaccessible indexes after extending the length for reversed arrays", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        expect(b[5]).toBeUndefined();
        b.length += 1;
        expect(b[5]).toBe(a[2]);
    });

    it("should prevent access to previously accessible indexes after reducing the length", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        expect(b[4]).toBe(a[7]);
        b.length -= 1;
        expect(b[4]).toBeUndefined();
    });

    it("should prevent access to previously accessible indexes after reducing the length for reversed arrays", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        expect(b[4]).toBe(a[3]);
        b.length -= 1;
        expect(b[4]).toBeUndefined();
    });

    it("should return no items when the length is set to 0;", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        expect(b[0]).toBe(a[3]);
        b.length = 0;
        expect(b[0]).toBeUndefined();
    });

    it("should default to a forward sequence when created with 0 length", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 4, 4);

        expect(b[0]).toBeUndefined();
        b.length = 5;
        expect(b[0]).toBe(a[4]);
        expect(b[4]).toBe(a[8]);
    });

    it("should not be less than 0", function () {
        const a = { length: -1 };
        const b = ArraySlice(a, 0, a.length);
        const c = { length: -Infinity };
        const d = ArraySlice(c, 0, c.length);

        expect(b.length).toBe(0);
        expect(d.length).toBe(0);
    });

    it("should be limited to the maximum of 2^53-1", function () {
        const a = { length: Math.pow(2, 53) };
        const b = ArraySlice(a, 0, a.length);
        const c = { length: Infinity };
        const d = ArraySlice(c, 0, c.length);

        expect(b.length).toBe(Math.pow(2, 53) - 1);
        expect(d.length).toBe(Math.pow(2, 53) - 1);
    });

    it("should treat a length of null as 0", function () {
        const a = { length: null };
        const b = ArraySlice(a, 0, 1);

        expect(b.length).toBe(0);
    });

    it("should treat a length of undefined as 0", function () {
        const a = { length: undefined };
        const b = ArraySlice(a, 0, 1);

        expect(b.length).toBe(0);
    });

    it("should treat a length of NaN as 0", function () {
        const a = { length: NaN };
        const b = ArraySlice(a, 0, 1);

        expect(b.length).toBe(0);
    });
});
