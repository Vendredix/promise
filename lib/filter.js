"use strict";
const assert = require("assert");
const utils = require("./utils");

function filter(val, fn, ctx) {
  assert.equal(typeof fn, 'function');

  val = Array.isArray(val) ? val : [val];
  return Promise.resolve(val.filter(fn, ctx));
}

utils.defineHelpers(Promise, "filter", filter);
