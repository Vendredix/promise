"use strict";
const assert = require("assert");
const utils = require("./utils");

function map(val, fn, ctx) {
  assert.equal(typeof fn, 'function');

  val = Array.isArray(val) ? val : [val];
  return Promise.all(val.map(fn, ctx))
}

utils.defineHelpers(Promise, "map", map);

