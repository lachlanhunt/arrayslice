import type { Tagged } from "./types";

/**
 * Checks if a value is an array-like object
 * @param o The object to check
 * @returns True if the object is an array-like object, false otherwise
 */
export const isArrayLike = <T>(o: unknown): o is ArrayLike<T> => typeof o === "object" && o !== null && "length" in o;

export const isArray = <T>(o: unknown): o is T[] => Array.isArray(o);

/**
 * Implementation of the ECMAScript ToInteger abstract operation
 *
 * @param arg Any value
 * @returns {*}
 * @throws TypeError if value of `arg` is null or undefined.
 */
export const toInteger = (n: number) => {
    if (Object.is(n, NaN)) {
        return 0;
    } else if (n === 0 || n === Infinity || n === -Infinity) {
        return n;
    } else {
        return Math.sign(n) * Math.floor(Math.abs(n));
    }
};

export const toLength = (arg: number) => {
    const len = toInteger(+arg);
    if (len <= 0) {
        return 0;
    }
    return Math.min(len, Math.pow(2, 53) - 1);
};

export const unsupportedProperties = ["push", "pop", "shift", "unshift", "splice"] as const;
export type UnsupportedProperty = (typeof unsupportedProperties)[number];

export const isUnsupported = (property: string | symbol): property is UnsupportedProperty => {
    return typeof property === "string" && (unsupportedProperties as readonly string[]).includes(property);
};

export const isNumericIndex = (index: number | null): index is Tagged<number, "index"> => {
    return index !== null && Number.isInteger(index) && index >= 0;
};

export const toRelativeIndex = (index: number, len: number) => {
    const initialIndex = toInteger(index);
    const relativeIndex = initialIndex < 0 ? Math.max(len + initialIndex, 0) : Math.min(initialIndex, len);
    return relativeIndex;
};

export const resolveIndex = (isReverse: boolean, start: number, end: number, index: number) => {
    const mappedIndex = isReverse ? start - index - 1 : start + index;

    const isInRange = isReverse ? mappedIndex < end : mappedIndex >= end;

    return isInRange ? Symbol("out of bounds") : `${mappedIndex}`;
};
