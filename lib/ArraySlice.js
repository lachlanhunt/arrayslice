// Private properties
let props = new WeakMap();

/**
 * Check if the given object is supported
 *
 * @param arg Any value
 * @returns {*}
 * @throws TypeError if value of `arg` is `null`, `undefined`, an instance of `String`, or a primitive type
 *         boolean, number or string.
 */
function checkObject(arg) {
	if (arg === null || arg === undefined) {
		throw new TypeError(`Can't convert ${arg} to object`);
	} else if (arg instanceof String) {
		throw new TypeError("Cannot slice instances of String");
	} else if (typeof arg === "object") {
		return arg;
	}

	throw new TypeError("Cannot slice type " + typeof arg);
}

/**
 * Implementation of the ECMAScript ToInteger abstract operation
 *
 * @param arg Any value
 * @returns {*}
 * @throws TypeError if value of `arg` is null or undefined.
 */
function toInteger(arg) {
	let number = +arg;
	if (Object.is(number, NaN)) {
		return 0;
	} else if (number === 0 || number === Infinity || number === -Infinity) {
		return number;
	} else {
		return Math.sign(number) * Math.floor(Math.abs(number));
	}
}

function toLength(arg) {
	let len = toInteger(arg);
	if (len <= 0) {
		return 0;
	}
	return Math.min(len, Math.pow(2, 53) - 1);
}

/**
 * Create a Proxy that wraps the given numerically indexed object (Array or Array-like objects) and represents
 * a virtual slice of array indexes.
 *
 * The returned object behaves similarly to the native `Array.prototype.slice` method, except that this does
 * not copy any values from the given object. Instead, all operations (including getting or setting
 * properties, or invoking methods) will be applied to the original object.
 *
 * Numeric indexes are re-mapped to properties of the original object by offsetting them relative to the given
 * `start` and `end` values.
 *
 * If either `start` or `end` are negative, they are treated as offsets from the end of the array. Both values
 * may only refer to indexes between 0 and the given length of the source object.
 *
 * If index referenced by `start` is greater than the index referenced by `end`, then the iterable sequence
 * will be reversed relative to the original object.
 *
 * For forward sequences, the `start` index will be included in the result and the `end` index will be
 * excluded. For reverse sequences, the `start` index will be excluded from the result and the `end` index
 * will be included. (See note below.)
 *
 * Attempting to get an array index beyond the range given by `start` and `end` will return undefined.
 * Attempting to set the value of an array index beyond the range given by `start` and `end` will throw
 * a RangeError exception.
 *
 * The `length` property of the created Proxy object will represent the absolute difference between the
 * `start` and `end` indexes. The length property may be changed to extend or shorten the sequence. The
 * value must be a positive integer, not exceeding 2^53 - 1. Upon setting, the resulting length will be
 * determined such that the new `end` index does not exceed the length of the source array for forward
 * sequences, and does not extend past 0 for reverse sequences.  Changes to the length will have no effect
 * on whether the ArraySlice represents a forward or reverse sequence.
 *
 * It is not possible to shift the `start` index after creation.
 *
 * e.g.
 *     let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *     let b = ArraySlice(a, 3, 8); // Forward sequence
 *
 *     b[0]; // 3, --> a[3]  (`start` index (3) included in forward sequence)
 *     b[4]; // 7, --> a[7]
 *     b[5]; // undefined (`end` index (8) is excluded from range)
 *
 *     b[0] = 10; // Sets a[3] to 10
 *     b[4] = 40; // Sets a[7] to 40
 *     b[5] = 50; // Throws RangeError (out of bounds)
 *
 *     b.length; // 5
 *     b.length = 7;
 *
 *     let c = ArraySlice(a, 8, 3); // Reverse sequence
 *
 *     c[0]; // 7, --> a[7] (`start` index (8) excluded from reverse sequence)
 *     c[4]; // 3, --> a[3] (`end` index (3) included in reverse sequence)
 *     c[5]; // undefined
 *
 *     c[0] = 10; // Sets a[3] to 10
 *     c[4] = 40; // Sets a[7] to 40
 *     c[5] = 50; // Throws RangeError (out of bounds)
 *
 *     c.length; // 5 (Value is positive for reverse sequences)
 *
 *     c.length = 10; // 10 exceeds available capacity
 *     c.length; // Resulting value is 8
 *
 *     c[7] // 0, --> a[0]
 *
 * Note that given any 2 indexes, the values included in the resulting sequence are the same. The direction of
 * the sequence is determined by the relative positions of `start` and `end`. This is done so that the following
 * works:
 *
 *     let d = ArraySlice(a, 0, a.length); // Forward sequence from a[0] to a[9]
 *     let e = ArraySlice(a, a.length, 0); // Reverse sequence from a[9] to a[0]
 *
 * @param array An Array or Array-like custom object that is not a string primitive or an instance of String.
 * @param start The starting index for the slice. If the value is negative, it is treated as an offset from the
 *              end of the array.
 * @param end   The ending index for the slice. If the value is negative, it is treated as an offset from the
 *              end of the array.
 * @returns {Proxy}
 */
function ArraySlice(array, start, end) {
	let o = checkObject(array);

	// The following partially implements steps 2 to 6 of the ECMAScript Array.prototype.slice algorithm
	// for determing the starting and ending indexes.
	let len = toLength(o.length);

	let relativeStart = toInteger(start);
	let k = (relativeStart < 0) ?
		Math.max((len + relativeStart), 0) :
		Math.min(relativeStart, len);

	let relativeEnd = (end === undefined) ? len : toInteger(end);
	let final = relativeEnd < 0 ?
		Math.max((len + relativeEnd), 0) :
		Math.min(relativeEnd, len);

	// Take the absolute value of the difference in order to support reverse sequences
	let length = Math.abs(final - k);

	let proxy = new Proxy(o, handler);

	props.set(proxy, {
		object: o,
		length: length,
		start: k,
		end: final,
		reverse: k > final
	});

	return proxy;
}

let handler = {
	get(target, property, receiver) {
		let p = props.get(receiver);

		if (typeof property !== "symbol" && Number.isInteger(+property) && +property >= 0) {

			property = p.reverse ? p.start - (+property) - 1 : p.start + (+property);

			if (p.reverse ? property < p.end : property >= p.end) {
				return undefined;
			}
		} else if (property === "length") {
			return p.length;
		}

		return Reflect.get(target, property, receiver);
	},

	set(target, property, value, receiver) {
		let p = props.get(receiver);

		if (typeof property !== "symbol" &&
			Number.isInteger(+property) && +property >= 0) {

			property = p.reverse ? p.start - (+property) - 1 : p.start + (+property);

			if (p.reverse ? property < p.end : property >= p.end) {
				throw new RangeError("Cannot modify original array out of bounds");
			}
		} else if (property === "length") {
			let intLen = toLength(value);

			if (intLen !== +value) {
				throw new RangeError("Invalid array length");
			}

			if (p.reverse) {
				let relativeEnd = p.start - intLen;
				p.end = Math.max(relativeEnd, 0);
			} else {
				let relativeEnd = p.start + intLen;
				p.end = Math.min(relativeEnd, p.object.length);
			}

			p.length = Math.abs(p.end - p.start);
			return true;
		}

		return Reflect.set(target, property, value, receiver);
	}
};

module.exports = ArraySlice;
// export default ArraySlice;
