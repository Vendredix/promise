"use strict";
const utils = require("./utils");

async function some(arr, count = 1) {
  if (typeof count !== "number") {
    throw new TypeError("count is not a valid number");
  }

  // Resolve if promise
  if (utils.isPromiseLike(arr)) {
    arr = await arr;
  }
  arr = utils.toArrayLike(arr);

  if (arr.length < count) {
    throw new Error(`There are not enough items to be resolved. Got ${arr.length} but need ${count}`);
  }
  if (arr.length === 0) {
    return [];
  }

  const length = arr.length;
  const finalResult = [];
  let deferred;
  let failed = 0;

  for (let i = 0; i < length; i++) {
    if (!utils.isPromiseLike(arr[i])) {
      // Add the result and check whether we are done.
      if (finalizeTrack(arr[i])) {
        return deferred ? deferred.promise : finalResult;
      }
    }
    else {
      // Create a new deferred promise.
      if (!deferred) deferred = Promise.defer();
      // Bind finalizeTrack and an error incrementer handler
      arr[i].then(finalizeTrack, () => {
        failed++;
        if (count > length - failed) {
          deferred.reject(new Error("Too many items have failed"));
        }
      })
    }
  }

  return deferred ? deferred.promise : finalResult;

  function finalizeTrack(item) {
    if (finalResult.length >= count || (deferred && deferred.isFulfilled())) {
      return;
    }

    finalResult.push(item);

    if (finalResult.length >= count) {
      if (deferred) deferred.resolve(finalResult);
      return true;
    }
  }
}


utils.defineHelpers("some", some);

