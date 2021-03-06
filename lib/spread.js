"use strict";
const assert = require("assert");
const utils = require("./utils");

function spread(fn) {
  assert.strictEqual(typeof fn, 'function');

  return this.then(arr => {
    return fn(...utils.toArray(arr));
  });
}

utils.definePrototypeHelper("spread", spread);

