"use strict";
const assert = require("assert");
const utils = require("./utils");

async function map(arr, mapper) {
  assert.strictEqual(typeof mapper, 'function');

  // Resolve if promise
  if (utils.isPromiseLike(arr)) {
    arr = await arr;
  }
  arr = utils.toArray(arr);

  const length = arr.length;
  const finalResult = new Array(length);

  if (arr.length > 0) {
    // Reduce array of values (mix of promises and values) with given mapper *serially*.
    for (let i = 0; i < arr.length; i++) {
      finalResult[i] = await mapper(await arr[i], i, length);
    }
  }

  return finalResult;
}

utils.defineHelpers("map", map);

