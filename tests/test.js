"use strict";
require("../lib/index");

const assert = require('assert');

describe('Promise', function () {
  describe('.delay(1000)', function () {
    it('should resolve after 1000 milliseconds', async function () {
      const start = Date.now();
      const result = await Promise.delay(1000);

      assert.equal(true, Date.now() - start > 1000, "Date.now() should be at least 1sec later");
      assert.equal(void 0, result, "result should be undefined");
    });
  });


  describe('#return()', function () {
    it('should resolve with given value', async function () {
      const promise = Promise.resolve("test");

      assert.equal("test", await promise);
      assert.equal("returned", await promise.return("returned"));
    });
    it('should resolve with given value (with thenReturn)', async function () {
      const promise = Promise.resolve("test");

      assert.equal("test", await promise);
      assert.equal("returned", await promise.thenReturn("returned"));
    });
  });

  describe('#throw()', function () {
    it('should reject with given reason', async function () {
      const promise = Promise.resolve("test");

      assert.equal("test", await promise);
      const throwErr = new Error("THROW_ERROR");
      try {
        await promise.throw(throwErr);
        assert.notEqual(true, true, "promise should throw error");
      } catch (err) {
        assert.equal(throwErr, err, "error should be equal");
      }
    });
    it('should reject with given reason (with thenThrow)', async function () {
      const promise = Promise.resolve("test");

      assert.equal("test", await promise);
      const throwErr = new Error("THROW_ERROR");
      try {
        await promise.thenThrow(throwErr);
        assert.notEqual(true, true, "promise should throw error");
      } catch (err) {
        assert.equal(throwErr, err, "error should be equal");
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

      assert.equal(true, called, "finally should have been called");
      assert.equal("ORG_RESULT", result, "result should be equal");
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
        assert.equal(true, called, "finally should have been called");
        assert.equal(throwErr, err, "error should be equal");
        assert.equal(void 0, result, "result should be undefined");
      }
    });
  });

});
