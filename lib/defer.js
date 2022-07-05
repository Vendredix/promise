"use strict";
const utils = require("./utils");

const STATUS = Symbol("status");

function defer() {
  let reject, resolve;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  if (typeof resolve !== "function") {
    throw new Error("Unable to obtain resolve in Promise.defer")
  }
  if (typeof reject !== "function") {
    throw new Error("Unable to obtain reject in Promise.defer")
  }

  const deferred = {promise, isPending, isFulfilled, isResolved, isRejected};
  deferred.resolve = fulfillPromise.bind(deferred, resolve, 1);
  deferred.reject = fulfillPromise.bind(deferred, reject, -1);
  return deferred;
}

function fulfillPromise(cb, status, val) {
  this[STATUS] = status;
  return cb(val);
}

function isPending() {
  return this[STATUS] === void 0;
}

function isFulfilled() {
  return this[STATUS] !== void 0;
}

function isResolved() {
  return this[STATUS] === 1;
}

function isRejected() {
  return this[STATUS] === -1;
}


utils.defineConstructorHelper("defer", defer);
