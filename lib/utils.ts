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
    const len = toInteger(arg);
    if (len <= 0) {
        return 0;
    }
    return Math.min(len, Math.pow(2, 53) - 1);
};
