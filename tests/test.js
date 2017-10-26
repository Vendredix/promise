"use strict";
require("../index");

const assert = require('assert');

describe('Promise', function () {
  describe('.delay(1000)', function () {
    it('should resolve after 1000 milliseconds', async function () {
      const start = Date.now();
      const result = await Promise.delay(1000);

      assert.strictEqual(Date.now() - start > 1000, true, "Date.now() should be at least 1sec later");
      assert.strictEqual(result, void 0, "result should be undefined");
    });
  });


  describe('#return()', function () {
    it('should resolve with given value', async function () {
      const promise = Promise.resolve("test");

      assert.strictEqual("test", await promise);
      assert.strictEqual("returned", await promise.return("returned"));
    });
    it('should resolve with given value (with thenReturn)', async function () {
      const promise = Promise.resolve("test");

      assert.strictEqual(await promise, "test");
      assert.strictEqual(await promise.thenReturn("returned"), "returned");
    });
  });

  describe('#throw()', function () {
    it('should reject with given reason', async function () {
      const promise = Promise.resolve("test");

      assert.strictEqual("test", await promise);
      const throwErr = new Error("THROW_ERROR");
      try {
        await promise.throw(throwErr);
        assert.notEqual(true, true, "promise should throw error");
      } catch (err) {
        assert.strictEqual(err, throwErr, "error should be equal");
      }
    });
    it('should reject with given reason (with thenThrow)', async function () {
      const promise = Promise.resolve("test");

      assert.strictEqual("test", await promise);
      const throwErr = new Error("THROW_ERROR");
      try {
        await promise.thenThrow(throwErr);
        assert.notEqual(true, true, "promise should throw error");
      } catch (err) {
        assert.strictEqual(err, throwErr, "error should be equal");
      }
    });
  });


  describe('#finally()', function () {
    it('should be called if resolved', async function () {
      let called = false;
      const result = await Promise.resolve("ORG_RESULT")
        .finally(() => {
          called = true;
          return "FINALLY_RESULT";
        });

      assert.strictEqual(called, true, "finally should have been called");
      assert.strictEqual(result, "ORG_RESULT", "result should be equal");
    });

    it('should be called if rejected', async function () {
      let called = false;
      const throwErr = new Error("SOME_ERROR");
      let result;

      try {
        result = await Promise.resolve("ORG_RESULT")
          .throw(throwErr)
          .finally(() => {
            called = true;
            return "FINALLY_RESULT";
          });
      } catch (err) {
        assert.strictEqual(called, true, "finally should have been called");
        assert.strictEqual(err, throwErr, "error should be equal");
        assert.strictEqual(result, void 0, "result should be undefined");
      }
    });
  });

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
