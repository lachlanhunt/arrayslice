// Private properties
let props = new WeakMap();

/**
 * Verify that the the length value is within the permissable range. The value must
 * be within the valid 32 bit unsigned int range permitted for use with JS Arrays
 * when added to the given start value, which must itself be valid.
 *
 * @param start The value given as the starting index.
 * @param length The value given as the length of the array slice.
 * @returns {Array<Number>} The start and length values cast to integers.
 * @throws {RangeError} Will throw if start or length values are not integers between 0 and 2^32-1.
 */
function validateLength(start, length) {
	start = +start;
	length = +length;

	let intStart = start >>> 0;
	let intLen = length >>> 0;

	if (intStart !== start) {
		throw new RangeError("Invalid start index");
	}

	if (intLen !== length ||
		((intLen + start) >>> 0) !== (intLen + start)) {
		throw new RangeError("Invalid array length");
	}

	return [intStart, intLen];
}

/**
 * Implementation of the ECMAScript ToObject abstract operation
 *
 * @param arg Any value
 * @returns {*}
 * @throws TypeError if value of `arg` is null or undefined.
 */
function toObject(arg) {
	if (arg === null || arg === undefined) {
		throw new TypeError(`Can't convert ${arg} to object`);
	}

	switch (typeof arg) {
		case "boolean":
			return new Boolean(arg);
		case "number":
			return new Number(arg);
		case "string":
			return new String(arg);
		default: // "symbol" or "object" or "function"
			return arg;
	}
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

/**
 *
 * @param array
 * @param start
 * @param end
 * @returns {Proxy}
 * @constructor
 */

function ArraySlice(array = [], start = 0, end) {
	let o = toObject(array);
	let len = o.length;

	let relativeStart = toInteger(start);
	let k = (relativeStart < 0) ?
		Math.max((len + relativeStart), 0) :
		Math.min(relativeStart, len);

	let relativeEnd = (end === undefined) ? len : toInteger(end);
	let final = relativeEnd < 0 ?
		Math.max((len + relativeEnd), 0) :
		Math.min(relativeEnd, len);

	let count = Math.abs(final - k);

	let proxy = new Proxy(o, handler);

	props.set(proxy, {
		object: o,
		length: count,
		start: k,
		end: final,
		reverse: k > final
	});

	return proxy;
}

let handler = {
	get(target, property, receiver) {
		let p = props.get(receiver);

		if (typeof property !== "symbol" &&
		    Number.isInteger(+property) && +property >= 0) {

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
				throw new RangeError("Cannot modify original array out of bounds")
			}
		} else if (property === "length") {
			let [, length] = validateLength(p.start, value);
			p.end = Math.min(p.start + length, p.object.length)
			p.length = p.end - p.start;
			return true;
		}

		return Reflect.set(target, property, value, receiver);
	}
};

module.exports = ArraySlice;
//export default ArraySlice;
