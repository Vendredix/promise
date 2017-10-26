"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  function spread(fn) {
    assert.strictEqual(typeof fn, 'function');

    return this.then(arr => {
      arr = Array.isArray(arr) ? arr : [arr];
      return fn(...arr);
    });
  }

  utils.definePrototypeHelper(Promise, "spread", spread);

};
