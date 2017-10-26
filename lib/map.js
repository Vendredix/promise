"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  function map(val, fn, ctx) {
    assert.strictEqual(typeof fn, 'function');

    val = Array.isArray(val) ? val : [val];
    return Promise.all(val.map(fn, ctx))
  }

  utils.defineHelpers(Promise, "map", map);

};
