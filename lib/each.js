"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  // TODO: return awaited values?

  function each(arr, iterator) {
    assert.strictEqual(typeof iterator, 'function');

    // Resolve if promise
    if (arr instanceof Promise) {
      return arr.each(iterator);
    }

    // Base case
    if (!Array.isArray(arr) || arr.length === 1) {
      return handleSingleValue(arr, 0, 1, iterator)
        .return(arr); // Resolve with original array unmodified
    }

    // Reduce array of values (mix of promises and values) with given iterator *serially*.
    return arr.reduce((prev, curr, i) =>
        prev.then(() => handleSingleValue(curr, i, arr.length, iterator)),
      Promise.resolve()
    ).return(arr); // Resolve with original array unmodified
  }

  function handleSingleValue(item, index, length, iterator) {
    // Await if it is a promise and recurse
    if (item instanceof Promise) {
      return item
        .then((value) => handleSingleValue(value, index, length, iterator));
    }

    // Apply iterator otherwise
    return iterator(item, index, length);
  }

  utils.defineHelpers(Promise, "each", each);

};
