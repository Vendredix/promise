"use strict";

exports.defineHelpers = defineHelpers;
function defineHelpers(Promise, name, fn, protoFn) {
  defineConstructorHelper(Promise, name, fn);
  definePrototypeHelper(Promise, name, typeof protoFn === 'function' ? protoFn : promiseThenHelper(fn));
}

exports.defineConstructorHelper = defineConstructorHelper;
function defineConstructorHelper(Promise, name, fn) {
  defineFunction(Promise, name, fn);
}

exports.definePrototypeHelper = definePrototypeHelper;
function definePrototypeHelper(Promise, name, fn) {
  defineFunction(Promise.prototype, name, fn);
}

exports.promiseThenHelper = promiseThenHelper;
function promiseThenHelper(fn) {
  return function (...args) {
    return this.then(res => fn(res, ...args));
  };
}

function defineFunction(obj, propName, fn) {
  Object.defineProperty(obj, propName, {
    enumerable: false,
    value: fn,
  });
}
