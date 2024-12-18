import { ArraySlice } from "./ArraySlice";

describe("Slicing non-Array-like types", function () {
    function constructArraySlice(...args: Parameters<typeof ArraySlice>) {
        return function () {
            return ArraySlice(...args);
        };
    }

    it("should throw a TypeError for primitive strings", function () {
        const values = ["", "test"];

        for (const value of values) {
            expect(constructArraySlice(value)).toThrowError(
                "Cannot create proxy with a non-object as target or handler",
            );
        }
    });
});
