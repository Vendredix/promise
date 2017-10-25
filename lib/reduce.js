"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  function reduce(val, fn, start) {
    assert.equal(typeof fn, 'function');

    val = Array.isArray(val) ? val : [val];

    const length = val.length;

    if (length === 0) {
      return Promise.resolve(start);
    }

    return val.reduce((promise, curr, index, arr) => {
      return promise.then((prev) => {
        if (prev === void 0 && length === 1) {
          return curr;
        }

        return fn(prev, curr, index, arr)
      })
    }, Promise.resolve(start))
  }

  utils.defineHelpers(Promise, "reduce", reduce);

};
