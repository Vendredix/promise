"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  function delay(ms) {
    // assert.equal(typeof fn, 'function');

    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  utils.defineConstructorHelper(Promise, "delay", delay);

};
