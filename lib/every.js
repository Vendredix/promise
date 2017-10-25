"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  function every(val, fn, ctx) {
    assert.equal(typeof fn, 'function');

    val = Array.isArray(val) ? val : [val];
    return Promise.resolve(val.every(fn, ctx));
  }

  utils.defineHelpers(Promise, "every", every);

};
