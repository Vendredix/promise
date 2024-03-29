"use strict";

exports.defineHelpers = defineHelpers;
function defineHelpers(name, fn, protoFn) {
  defineConstructorHelper(name, fn);
  definePrototypeHelper(name, typeof protoFn === 'function' ? protoFn : promiseThenHelper(fn));
}

exports.defineConstructorHelper = defineConstructorHelper;
function defineConstructorHelper(name, fn) {
  defineFunction(Promise, name, fn);
}

exports.definePrototypeHelper = definePrototypeHelper;
function definePrototypeHelper(name, fn) {
  defineFunction(Promise.prototype, name, fn);
}

exports.promiseThenHelper = promiseThenHelper;
function promiseThenHelper(fn) {
  return function (...args) {
    return this.then(res => fn.bind(this)(res, ...args));
  };
}

function defineFunction(obj, propName, fn) {
  if (typeof obj[propName] === 'function') {
    return;
  }

  Object.defineProperty(obj, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
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

exports.isPromiseLike = isPromiseLike;
function isPromiseLike(value) {
  return value !== null && typeof value === "object" && typeof value["then"] === "function";
}

exports.isArrayLike = isArrayLike;
function isArrayLike(arr) {
  return Array.isArray(arr) || (typeof arr === "object" && arr !== null && typeof arr.length === "number");
}

exports.toArrayLike = toArrayLike;
function toArrayLike(arr) {
  if (isArrayLike(arr)) {
    return arr;
  }

  // Transform to array
  if (arr !== undefined) {
    return [arr];
  }
  return [];
}
