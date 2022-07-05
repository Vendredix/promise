"use strict";
const utils = require("./utils");

function spread(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("fn is not a valid function");
  }

  return this.then(arr => {
    return fn(...utils.toArrayLike(arr));
  });
}

utils.definePrototypeHelper("spread", spread);

