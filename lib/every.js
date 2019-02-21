"use strict";
const assert = require("assert");
const utils = require("./utils");

function every(arr, guard) {
  assert.strictEqual(typeof guard, "function");

  // Resolve if promise
  if (arr instanceof Promise) {
    return arr.every(guard);
  }

  const isArray = Array.isArray(arr);

  // Base case
  if (!isArray || arr.length === 1) {
    const item = isArray ? arr[0] : arr;
    return utils.resolvePromise(this,
      handleSingleValue(item, 0, 1, guard)
    );
  }
  if (arr.length === 0) {
    return utils.resolvePromise(this, true);
  }

  // Reduce array of values (mix of promises and values) with given guard *serially*.
  return utils.resolvePromise(this, smartReduce(arr, 0, guard));
}

function smartReduce(arr, index, guard) {
  const val = handleSingleValue(arr[index], index, arr.length, guard);
  if (val instanceof Promise) {
    return val.then(val => smartReduceStep(arr, index + 1, guard, val));
  }

  return smartReduceStep(arr, index + 1, guard, val);
}

function smartReduceStep(arr, nextIndex, guard, value) {
  if (value !== true || nextIndex >= arr.length) {
    return !!value;
  }
  return smartReduce(arr, nextIndex, guard);
}

function handleSingleValue(item, index, length, guard) {
  return utils.resolvePromiseChain(item, item => {
    // Apply the guard
    return guard(item, index, length);
  });
}


utils.defineHelpers("every", every);
