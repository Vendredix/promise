"use strict";
const assert = require("assert");
const utils = require("./utils");

async function reduce(arr, reducer, initialValue) {
  assert.strictEqual(typeof reducer, 'function');

  // Resolve if promise
  if (utils.isPromiseLike(arr)) {
    arr = await arr;
  }
  arr = utils.toArrayLike(arr);

  // Base case
  if (arr.length === 0) {
    return initialValue;
  }

  const length = arr.length;
  let finalResult = await initialValue;

  // Reduce array of values (mix of promises and values) with given reducer *serially*.
  for (let i = 0; i < arr.length; i++) {
    finalResult = await reducer(finalResult, await arr[i], i, length);
  }

  return finalResult;
}

utils.defineHelpers("reduce", reduce);

