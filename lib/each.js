"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  function each(arr, iterator) {
    assert.strictEqual(typeof iterator, 'function');

    // Resolve if promise
    if (arr instanceof Promise) {
      return arr.each(iterator);
    }

    const finalResult = new Array(arr.length);

    // Base case
    if (!Array.isArray(arr) || arr.length === 1) {
      const item = Array.isArray(arr) ? arr[0] : arr;
      return utils.resolvePromise(Promise, this,
        handleSingleValue(item, 0, 1, iterator, finalResult)
      ).return(finalResult);
    }
    if (arr.length === 0) {
      return utils.resolvePromise(Promise, this, []);
    }

    // Reduce array of values (mix of promises and values) with given iterator *serially*.
    return arr.reduce((prev, curr, i) =>
        prev.then(() => handleSingleValue(curr, i, arr.length, iterator, finalResult)),
      Promise.resolve()
    ).return(finalResult);
  }

  function handleSingleValue(item, index, length, iterator, finalResult) {
    return utils.resolvePromiseChain(Promise, item, item => {
      // Store the value
      finalResult[index] = item;
      // Apply the iterator
      return iterator(item, index, length);
    });
  }

  utils.defineHelpers(Promise, "each", each);

};
