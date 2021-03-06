"use strict";
const assert = require("assert");
const utils = require("./utils");

async function filter(arr, filterer) {
  assert.strictEqual(typeof filterer, 'function');

  // Resolve if promise
  if (utils.isPromiseLike(arr)) {
    arr = await arr;
  }
  arr = utils.toArray(arr);

  const length = arr.length;
  const finalResult = [];

  if (arr.length > 0) {
    // Reduce array of values (mix of promises and values) with given iterator *serially*.
    for (let i = 0; i < arr.length; i++) {
      const item = await arr[i];
      // Check the filterer
      if (await filterer(item, i, length)) {
        finalResult.push(item);
      }
    }
  }

  return finalResult;
}

utils.defineHelpers("filter", filter);
