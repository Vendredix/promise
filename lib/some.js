"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  function some(arr, fn) {
    assert.equal(typeof fn, 'function');

    arr = Array.isArray(arr) ? arr : [arr];

    return arr.reduce((prev, curr, i) =>
        prev.then(() => fn(curr, i, arr.length)),
      Promise.resolve()
    ).then(() => arr);
  }

  utils.defineHelpers(Promise, "some", some);

};
