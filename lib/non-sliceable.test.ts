import { ArraySlice } from "./ArraySlice";

describe("Slicing non-Array-like types", function () {
    function constructArraySlice(...args) {
        return function () {
            return new ArraySlice(...args);
        };
    }

    it("should throw a TypeError for numbers", function () {
        const values = [0, 1, -1, Infinity, -Infinity, NaN];

        for (const value of values) {
            expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
        }
    });

    it("should throw a TypeError for booleans", function () {
        const values = [true, false];

        for (const value of values) {
            expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
        }
    });

    it("should throw a TypeError for null and undefined", function () {
        const values = [null, undefined];

        for (const value of values) {
            expect(constructArraySlice(value)).toThrowError(TypeError, `Can't convert ${value} to object`);
        }
    });

    it("should throw a TypeError for primitive strings", function () {
        const values = ["", "test"];

        for (const value of values) {
            expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
        }
    });

    it("should throw a TypeError for String objects", function () {
        const values = [new String(""), new String("test")];

        for (const value of values) {
            expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice instances of String");
        }
    });

    it("should throw a TypeError for symbols", function () {
        const values = [Symbol(), Symbol("A")];

        for (const value of values) {
            expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
        }
    });

    it("should throw a TypeError for functions", function () {
        const values = [function (a, b) {}, new Function("a", "b", ""), () => true];

        for (const value of values) {
            expect(constructArraySlice(value)).toThrowError(TypeError, "Cannot slice type " + typeof value);
        }
    });
});
