"use strict";
require("../index");

const assert = require('assert');

describe('promise-delay', function () {
  describe('.delay(1000)', function () {
    it('should resolve after 1000 milliseconds', async function () {
      const start = Date.now();
      const result = await Promise.delay(1000);

      assert.strictEqual(Date.now() - start > 1000, true, "Date.now() should be at least 1sec later");
      assert.strictEqual(result, void 0, "result should be undefined");
    });
  });
});
