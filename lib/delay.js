"use strict";
const assert = require("assert");
const utils = require("./utils");

function delay(ms) {
  assert.strictEqual(typeof ms, "number");

  return new Promise((resolve) => setTimeout(resolve, ms));
}

utils.defineConstructorHelper("delay", delay);
