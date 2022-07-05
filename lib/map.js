"use strict";
const utils = require("./utils");

async function map(arr, mapper) {
  if (typeof mapper !== "function") {
    throw new TypeError("mapper is not a valid function");
  }

  // Resolve if promise
  if (utils.isPromiseLike(arr)) {
    arr = await arr;
  }
  arr = utils.toArrayLike(arr);

  const length = arr.length;
  const finalResult = new Array(length);

  if (arr.length > 0) {
    arr = await Promise.all(arr);

    // Reduce array of values (mix of promises and values) with given mapper *serially*.
    for (let i = 0; i < arr.length; i++) {
      finalResult[i] = await mapper(arr[i], i, length);
    }
  }

  return finalResult;
}

utils.defineHelpers("map", map);

