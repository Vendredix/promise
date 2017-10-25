"use strict";

const assert = require("assert");
const utils = require("./utils");

function promiseReturn(val) {
  return this.then(() => val);
}
function promiseThrow(val) {
  return this.then(() => Promise.reject(val));
}
function promiseFinally(onFinally) {
  assert.equal(typeof onFinally, "function");

  const C = utils.speciesConstructor(this, Promise);

  // https://github.com/tc39/proposal-promise-finally/blob/master/polyfill.js
  return Promise.prototype.then.call(
    this,
    x => new C(resolve => resolve(onFinally())).return(x),
    e => new C(resolve => resolve(onFinally())).throw(e),
  )
}

utils.definePrototypeHelper(Promise, "return", promiseReturn);
utils.definePrototypeHelper(Promise, "thenReturn", promiseReturn); // TODO: Remove
utils.definePrototypeHelper(Promise, "throw", promiseThrow);
utils.definePrototypeHelper(Promise, "thenThrow", promiseThrow); // TODO: Remove
utils.definePrototypeHelper(Promise, "finally", promiseFinally);
