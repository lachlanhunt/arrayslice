import { ArraySlice } from "./ArraySlice";

describe("Array prototype method", () => {
    it(".concat() should create a new array beginning with elements from the slice", () => {
        const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = [0, 0, 0, 0, 1, 2, 3, 4, 0, 0];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.concat([5, 6, 7, 8, 9]);

        expect(result).toEqual(expected);
    });

    it(".copyWithin() should not copy past the end of the slice", () => {
        const expected = [0, 1, 2, 3, 4, 5, 3, 4, 8, 9];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        slice.copyWithin(3, 0);

        expect(target).toEqual(expected);
    });

    it(".every() should invoke the callback only for elements within the slice", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        function callback(value: number, index: number, array: number[]) {
            return index === value - 3 && value >= 0 && value < 8 && array === slice;
        }

        expect(slice.every(callback)).toBe(true);
    });

    it(".fill() should set values only within the slice", () => {
        const expected = [0, 1, 2, 0, 0, 0, 0, 0, 8, 9];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        slice.fill(0);

        expect(target).toEqual(expected);
    });

    it(".filter() should only return matching values within the slice", () => {
        function isOdd(n: number) {
            return !!(n % 2);
        }

        const expected = [3, 5, 7];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);
        const result = slice.filter(isOdd);

        expect(result).toEqual(expected);
    });

    it(".find() should search for a value only within the slice", () => {
        const target = [7, 0, 5, 1, 4, 2, 8, 3, 6, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.find(function (n) {
            return n >= 3 && n <= 5;
        });

        expect(result).toBe(4);
    });

    it(".findIndex() should only find the item within the slice", () => {
        const target = [5, 1, 2, 3, 4, 5, 6, 7, 8, 5];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.findIndex(function (n) {
            return n === 5;
        });
        const result2 = slice.findIndex(function (n) {
            return n === 8;
        });

        expect(result).toBe(2);
        expect(result2).toBe(-1);
    });

    it(".forEach() should ", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);
        const callback = vi.fn();

        slice.forEach(callback);

        expect(callback).toHaveBeenCalledTimes(5);
        expect(callback).toHaveBeenCalledWith(3, 0, slice);
        expect(callback).toHaveBeenCalledWith(4, 1, slice);
        expect(callback).toHaveBeenCalledWith(5, 2, slice);
        expect(callback).toHaveBeenCalledWith(6, 3, slice);
        expect(callback).toHaveBeenCalledWith(7, 4, slice);
    });

    it(".includes() should ", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        expect(slice.includes(2)).toBe(false);
        expect(slice.includes(4)).toBe(true);
        expect(slice.includes(8)).toBe(false);
    });

    it(".indexOf() should only find the index of items within the slice", () => {
        const target = [5, 1, 2, 3, 4, 5, 6, 7, 8, 5];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.indexOf(5);
        const result2 = slice.indexOf(8);

        expect(result).toBe(2);
        expect(result2).toBe(-1);
    });

    it(".join() should create a string with elements from the slice", () => {
        const expected = [1, 2, 3, 4, 5].join(",");
        const target = [0, 0, 0, 1, 2, 3, 4, 5, 0, 0];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.join(",");

        expect(result).toEqual(expected);
    });

    it(".keys() should iterate over the keys for the slice", () => {
        const expected = [0, 1, 2, 3, 4];
        const target = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        const slice = ArraySlice(target, 3, 8);

        const result = [...slice.keys()];

        expect(result).toEqual(expected);
    });

    it(".lastIndexOf() should find the last index within the slice", () => {
        const expected = 4;
        const target = [1, 0, 1, 0, 2, 1, 0, 1, 1, 0];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.lastIndexOf(1);

        expect(result).toEqual(expected);
    });

    it(".map() should create a new array based on the slice", () => {
        const expected = [30, 40, 50, 60, 70];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.map((value) => value * 10);

        expect(result).toEqual(expected);
    });

    it(".pop() should throw TypeError", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        expect(() => slice.pop()).toThrow(new TypeError("Cannot call pop method on ArraySlice instances"));
    });

    it(".push() should throw a TypeError", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        expect(() => slice.push()).toThrow(new TypeError("Cannot call push method on ArraySlice instances"));
    });
    it(".reduce() should sum the result of elements in the slice", function () {
        const expected = 25;
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.reduce((acc, val) => acc + val, 0);

        expect(result).toEqual(expected);
    });

    it(".reduceRight() should sum the result of elements in the slice", function () {
        const expected = 25;
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.reduceRight((acc, val) => acc + val, 0);

        expect(result).toEqual(expected);
    });

    it(".reverse() should reverse elements in place within the slice", function () {
        const expected = [0, 1, 2, 7, 6, 5, 4, 3, 8, 9];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        slice.reverse();

        expect(target).toEqual(expected);
    });

    it(".shift() should throw a TypeError", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        expect(() => slice.shift()).toThrow(new TypeError("Cannot call shift method on ArraySlice instances"));
    });

    it(".slice() should create a new array from a section of the slice", function () {
        const expected = [4, 5, 6];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.slice(1, 4);

        expect(result).toEqual(expected);
    });

    it(".some() should only test elements in the slice", function () {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.some((n) => n === 5);
        const result2 = slice.some((n) => n === 8);

        expect(result).toEqual(true);
        expect(result2).toEqual(false);
    });

    it(".sort() should sort the subset of the array", () => {
        const expected = [8, 9, 6, 0, 1, 2, 5, 7, 4, 3];
        const target = [8, 9, 6, 1, 5, 7, 0, 2, 4, 3];
        const slice = ArraySlice(target, 3, 8);

        slice.sort((a, b) => {
            return a - b;
        });

        expect(target).toEqual(expected);
    });

    it(".splice() should throw a TypeError", function () {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        expect(() => slice.splice(1, 0, 10, 11)).toThrow(
            new TypeError("Cannot call splice method on ArraySlice instances"),
        );
    });

    it(".toLocaleString() should format the numbers in the slice according to the specified locale and options", function () {
        const options = {
            style: "currency",
            currency: "AUD",
        } satisfies Intl.NumberFormatOptions;

        const expected = [3, 4, 5, 6, 7].toLocaleString("en-AU", options);
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.toLocaleString("en-AU", options);

        expect(result).toEqual(expected);
    });

    it(".toString() should convert the slice to a string", function () {
        const expected = [3, 4, 5, 6, 7].toString();
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.toString();

        expect(result).toEqual(expected);
    });

    it(".unshift() should throw a TypeError", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        expect(() => slice.unshift()).toThrow("Cannot call unshift method on ArraySlice instances");
    });

    it(".entries() should return an iterator with the entries from the slice", function () {
        const expected = [...[3, 4, 5, 6, 7].entries()];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = [...slice.entries()];

        expect(result).toEqual(expected);
    });

    it(".values() should return an iterator with the values from the slice", function () {
        const expected = [...[3, 4, 5, 6, 7].values()];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = [...slice.values()];

        expect(result).toEqual(expected);
    });

    it("[@@iterator]() should return an iterator with the values from the slice", function () {
        const expected = [...[3, 4, 5, 6, 7][Symbol.iterator]()];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = [...slice[Symbol.iterator]()];

        expect(result).toEqual(expected);
    });

    it(".at() should return the value at the specified index", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        expect(slice.at(0)).toBe(3);
        expect(slice.at(4)).toBe(7);
    });

    it(".findLast() should return the last value that satisfies the callback", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.findLast((n) => n % 2 === 0);

        expect(result).toBe(6);
    });

    it(".findLastIndex() should return the last index that satisfies the callback", () => {
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.findLastIndex((n) => n % 2 === 0);

        expect(result).toBe(3);
    });

    it(".flat() should flatten the slice by one level", () => {
        const expected = [3, 4, 5, 6, 7, 8, 9];
        const target = [0, 1, 2, [3, 4], [5, 6], 7, [8], 9, 10];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.flat();

        expect(result).toEqual(expected);
    });

    it(".flatMap() should map and flatten the slice", () => {
        const expected = [6, 5, 8, 6, 10, 7, 12, 8, 14, 9];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.flatMap((n) => [n * 2, n + 2]);

        expect(result).toEqual(expected);
    });

    it(".toReversed() should return a new slice with the elements in reverse order", () => {
        const expected = [7, 6, 5, 4, 3];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.toReversed();

        expect(result).toEqual(expected);
    });

    it(".toSorted() should return a new slice with the elements sorted", () => {
        const expected = [3, 4, 5, 6, 7];
        const target = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.toSorted((a, b) => a - b);

        expect(result).toEqual(expected);
    });

    it(".toSpliced() should return a new slice with the elements spliced", () => {
        const expected = [3, 40, 50, 60, 7];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.toSpliced(1, 3, 40, 50, 60);

        expect(result).toEqual(expected);
    });

    it(".with() should return a new slice with the elements from the callback", () => {
        const expected = [3, 4, 50, 6, 7];
        const target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const slice = ArraySlice(target, 3, 8);

        const result = slice.with(2, 50);

        expect(result).toEqual(expected);
    });
});
