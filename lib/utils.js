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

// https://github.com/tc39/proposal-promise-finally/blob/master/polyfill.js
exports.speciesConstructor = speciesConstructor;
function speciesConstructor(O, defaultConstructor) {
  if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
    throw new TypeError('Assertion failed: Type(O) is not Object');
  }
  const C = O.constructor;
  if (typeof C === 'undefined') {
    return defaultConstructor;
  }
  if (!C || (typeof C !== 'object' && typeof C !== 'function')) {
    throw new TypeError('O.constructor is not an Object');
  }
  const S = typeof Symbol === 'function' && typeof Symbol.species === 'symbol' ? C[Symbol.species] : undefined;
  if (S == null) {
    return defaultConstructor;
  }
  if (typeof S === 'function' && S.prototype) {
    return S;
  }
  throw new TypeError('no constructor found');
}
