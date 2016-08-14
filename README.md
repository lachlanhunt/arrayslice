Array Slice View
====

A library for creating a virtual array slice using a Proxy to re-map array indicies to the orginal array.

Unlike the native `Array.prototype.slice()` method, this method does not copy any elements from the source array.
Instead, the array is wrapped in a proxy that re-maps get and set calls for numeric array indexes to new positions
based on the given start and end indexes for the slice.


    let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let b = ArraySlice(a, 3, 7);
    console.log([...b]); // 3, 4, 5, 6

    b[0] = 30
    console.log(a); // [0, 1, 2, 30, 4, 5, 6, 7, 8, 9, 10];
    console.log([...b]); // 30, 4, 5, 6

    a.indexOf(4); // 4
    b.indexOf(4); // 1

Warning: You cannot use the methods `push()`, `pop()`, `shift()` and `unshift()` on ArraySlice instances. 
