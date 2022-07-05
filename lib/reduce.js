"use strict";
const utils = require("./utils");

async function reduce(arr, reducer, initialValue) {
  if (typeof reducer !== "function") {
    throw new TypeError("reducer is not a valid function");
  }

  // Resolve if promise
  const arrIsPromise = utils.isPromiseLike(arr);
  const valueIsPromise = utils.isPromiseLike(initialValue);
  let finalResult = initialValue;
  if (arrIsPromise && valueIsPromise) {
    [arr, finalResult] = await Promise.all([
      arr,
      finalResult,
    ]);
  } else if (arrIsPromise) {
    arr = await arr;
  } else if (valueIsPromise) {
    finalResult = await finalResult;
  }
  arr = utils.toArrayLike(arr);

  // Base case
  if (arr.length === 0) {
    return finalResult;
  }

  const length = arr.length;
  arr = await Promise.all(arr);

  // Reduce array of values (mix of promises and values) with given reducer *serially*.
  for (let i = 0; i < arr.length; i++) {
    finalResult = await reducer(finalResult, arr[i], i, length);
  }

  return finalResult;
}

utils.defineHelpers("reduce", reduce);

