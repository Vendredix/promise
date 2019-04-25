"use strict";
require("../index");

const assert = require('assert');

describe('promise-thens', function () {

  describe('#return()', function () {
    it('should resolve with given value', async function () {
      const promise = Promise.resolve("test");

      assert.strictEqual("test", await promise);
      assert.strictEqual("returned", await promise.return("returned"));
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
});

