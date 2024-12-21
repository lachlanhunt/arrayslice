import { ArraySlice } from "./ArraySlice";

describe("ArraySlice", function () {
    it("should re-map array indexes on get", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        expect(b[0]).toBe(a[3]);
        expect(b[1]).toBe(a[4]);
        expect(b[2]).toBe(a[5]);
        expect(b[3]).toBe(a[6]);
        expect(b[4]).toBe(a[7]);
    });

    it("should re-map array indexes on get for reverse arrays", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        expect(b[0]).toBe(a[7]);
        expect(b[1]).toBe(a[6]);
        expect(b[2]).toBe(a[5]);
        expect(b[3]).toBe(a[4]);
        expect(b[4]).toBe(a[3]);
    });

    it("should alter the original array on setting", function () {
        const a = [0, 1, 2, 3, 4];
        const b = ArraySlice(a, 0, a.length);

        b[0] = 5;
        b[1] = 6;
        b[2] = 7;
        b[3] = 8;
        b[4] = 9;

        expect(a[0]).toBe(5);
        expect(a[1]).toBe(6);
        expect(a[2]).toBe(7);
        expect(a[3]).toBe(8);
        expect(a[4]).toBe(9);
    });

    it("should reflect changes to the original array", function () {
        const a = [0, 1, 2, 3, 4];
        const b = ArraySlice(a, 0, a.length);

        a[0] = 5;
        a[1] = 6;
        a[2] = 7;
        a[3] = 8;
        a[4] = 9;

        expect(b[0]).toBe(5);
        expect(b[1]).toBe(6);
        expect(b[2]).toBe(7);
        expect(b[3]).toBe(8);
        expect(b[4]).toBe(9);
    });

    it("should re-map array indexes on set", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        b[0] = 10;
        b[1] = 20;
        b[2] = 30;
        b[3] = 40;
        b[4] = 50;

        expect(b[0]).toBe(a[3]);
        expect(b[0]).toBe(10);
        expect(b[1]).toBe(a[4]);
        expect(b[1]).toBe(20);
        expect(b[2]).toBe(a[5]);
        expect(b[2]).toBe(30);
        expect(b[3]).toBe(a[6]);
        expect(b[3]).toBe(40);
        expect(b[4]).toBe(a[7]);
        expect(b[4]).toBe(50);
    });

    it("should re-map array indexes on set for reverse arrays", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        b[0] = 10;
        b[1] = 20;
        b[2] = 30;
        b[3] = 40;
        b[4] = 50;

        expect(b[0]).toBe(a[7]);
        expect(b[0]).toBe(10);
        expect(b[1]).toBe(a[6]);
        expect(b[1]).toBe(20);
        expect(b[2]).toBe(a[5]);
        expect(b[2]).toBe(30);
        expect(b[3]).toBe(a[4]);
        expect(b[3]).toBe(40);
        expect(b[4]).toBe(a[3]);
        expect(b[4]).toBe(50);
    });

    it("should return undefined when accessing out of bounds indexes", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);
        const c = ArraySlice(a, 8, 3);

        expect(b[8]).toBeUndefined();
        expect(c[8]).toBeUndefined();
    });

    it("should throw a RangeError when setting out of bounds indexes", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        function setOutOfBounds() {
            b[8] = 1;
        }

        expect(setOutOfBounds).toThrowError(RangeError);
    });

    it("should throw a RangeError when setting out of bounds indexes for reversed arrays", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        function setOutOfBounds() {
            b[8] = 1;
        }

        expect(setOutOfBounds).toThrowError(RangeError);
    });

    it("should support negative indexes as offsets from the end", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, -7, -2);

        expect(b[0]).toBe(a[3]);
        expect(b[1]).toBe(a[4]);
        expect(b[2]).toBe(a[5]);
        expect(b[3]).toBe(a[6]);
        expect(b[4]).toBe(a[7]);
    });

    it("should support negative indexes as offsets from the end for reverse arrays", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, -2, -7);

        expect(b[0]).toBe(a[7]);
        expect(b[1]).toBe(a[6]);
        expect(b[2]).toBe(a[5]);
        expect(b[3]).toBe(a[4]);
        expect(b[4]).toBe(a[3]);
    });

    it("should include the start and exclude the end index", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 3, 8);

        expect(b[0]).toBe(a[3]);
        expect(b[5]).toBeUndefined();
    });

    it("should exclude the start and include the end index for reverse arrays", function () {
        const a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = ArraySlice(a, 8, 3);

        expect(b[0]).toBe(a[7]);
        expect(b[4]).toBe(a[3]);
        expect(b[5]).toBeUndefined();
    });

    it("should support setting symbol properties", function () {
        const a = [0, 1, 2, 3, 4];
        const b = ArraySlice(a, 0, a.length);

        const prop = Symbol("test");
        // @ts-expect-error - Testing symbol properties
        b[prop] = 5;

        // @ts-expect-error - Testing symbol properties
        expect(b[prop]).toBe(5);
    });
});
