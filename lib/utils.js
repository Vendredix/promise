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

exports.resolvePromiseChain = resolveSingleValue;
function resolveSingleValue(Promise, item, callback) {
  // Await if it is a promise and recurse
  if (item instanceof Promise) {
    return item
      .then((value) => resolveSingleValue(Promise, value, callback));
  }

  // Apply callback otherwise
  return callback(item);
}

exports.resolvePromise = resolvePromise;
function resolvePromise(Promise, that, result) {
  if (that instanceof Promise) {
    return result;
  }
  return Promise.resolve(result);
}
