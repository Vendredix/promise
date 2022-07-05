"use strict";
const assert = require("assert");
const utils = require("./utils");

async function each(arr, iterator) {
  assert.strictEqual(typeof iterator, "function");

  // Resolve if promise
  if (utils.isPromiseLike(arr)) {
    arr = await arr;
  }
  arr = utils.toArrayLike(arr);

  const length = arr.length;
  const finalResult = new Array(length);

  if (arr.length > 0) {
    arr = await Promise.all(arr);

    // Reduce array of values (mix of promises and values) with given iterator *serially*.
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      // Store the value
      finalResult[i] = item;
      // Apply the iterator
      await iterator(item, i, length);
    }
  }

  return finalResult;
}

utils.defineHelpers("each", each);
