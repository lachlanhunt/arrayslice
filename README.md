Array Slice View
====

A library for creating a virtual array slice using a Proxy to re-map array indicies to the orginal array.

Unlike the native `Array.prototype.slice()` method, this method does not copy any elements from the source array.
Instead, the array is wrapped in a proxy that re-maps get and set calls for numeric array indexes to new positions
based on the given start and end indexes for the slice.
