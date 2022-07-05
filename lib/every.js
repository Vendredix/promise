"use strict";
const assert = require("assert");
const utils = require("./utils");

async function every(arr, guard) {
  assert.strictEqual(typeof guard, "function");

  // Resolve if promise
  if (utils.isPromiseLike(arr)) {
    arr = await arr;
  }

  const isArray = Array.isArray(arr);

  // Base case
  if (!isArray || arr.length === 1) {
    const item = isArray ? arr[0] : arr;
    return !!guard(await item, 0, 1);
  }
  if (arr.length === 0) {
    return true;
  }

  arr = Promise.all(arr);

  // Reduce array of values (mix of promises and values) with given guard *serially*.
  for (let i = 0; i < arr.length; i++) {
    if (await guard(arr[i], i, arr.length) !== true) {
      return false;
    }
  }

  return true;
}

utils.defineHelpers("every", every);
