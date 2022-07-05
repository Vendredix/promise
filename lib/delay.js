"use strict";
const utils = require("./utils");

function delay(ms) {
  if (typeof ms !== "number") {
    throw new TypeError("ms is not a valid number");
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
}

utils.defineConstructorHelper("delay", delay);
