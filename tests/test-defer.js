"use strict";
require("../index");

const assert = require('assert');

describe('promise-defer', function () {

  describe('.defer()', function () {
    it('should be able to resolve promise', function () {
      const deferred = Promise.defer();

      assert.strictEqual(deferred.isPending(), true, "should be pending");
      assert.strictEqual(deferred.isFulfilled(), false, "should not be fulfilled");
      assert.strictEqual(deferred.isResolved(), false, "should not be resolved");
      assert.strictEqual(deferred.isRejected(), false, "should not be rejected");
      assert.strictEqual(deferred.promise instanceof Promise, true, "should be an instance of Promise");

      const promise = deferred.promise
        .then(result => {
          assert.strictEqual(result, "SOME_VALUE", "should have resolved value");

          assert.strictEqual(deferred.isPending(), false, "should not be pending");
          assert.strictEqual(deferred.isFulfilled(), true, "should be fulfilled");
          assert.strictEqual(deferred.isResolved(), true, "should be resolved");
          assert.strictEqual(deferred.isRejected(), false, "should not be rejected");
        })
        .catch(err => {
          assert.strictEqual(true, false, "should not catch any errors");
          throw err;
        });

      process.nextTick(() => deferred.resolve("SOME_VALUE"));

      return promise;
    });


    it('should be able to reject promise', function () {
      const deferred = Promise.defer();

      const throwErr = new Error("ERROR01");

      const promise = deferred.promise
        .then(() => {
          assert.strictEqual(true, false, "chain should not be executed");
        })
        .catch(err => {
          assert.strictEqual(err, throwErr, "should catch the error");

          assert.strictEqual(deferred.isPending(), false, "should not be pending");
          assert.strictEqual(deferred.isFulfilled(), true, "should be fulfilled");
          assert.strictEqual(deferred.isResolved(), false, "should not be resolved");
          assert.strictEqual(deferred.isRejected(), true, "should be rejected");
        });

      process.nextTick(() => deferred.reject(throwErr));

      return promise;
    });
  });

});
