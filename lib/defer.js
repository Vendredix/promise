"use strict";
const assert = require("assert");
const utils = require("./utils");

const STATUS = Symbol("status");

module.exports = function (Promise) {

  function defer() {
    let reject, resolve;
    const promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    assert.notStrictEqual(resolve, void 0, "Unable to obtain resolve in Promise.defer");
    assert.notStrictEqual(reject, void 0, "Unable to obtain reject in Promise.defer");

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


  utils.defineConstructorHelper(Promise, "defer", defer);

};
