"use strict";
require("../index");

const assert = require('assert');

describe('promise-reduce', function () {


  // TODO: test reduce

  describe('.reduce()', function () {
    it('should sum without initial value', async function () {
      let called = 0;
      const total = await Promise.reduce([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
      ], (acc, value) => {
        called++;
        return (acc || 0) + value;
      });

      assert.strictEqual(total, 1+2+3, "Sum does not match");
      assert.strictEqual(called, 3, "Reducer method must be used");
    });

    it('should concat without initial value', async function () {
      let called = 0;
      const total = await Promise.reduce([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
      ], (acc, value) => {
        called++;

        if (!acc) return [value];
        return acc.concat(value);
      });

      assert.deepStrictEqual(total, [1,2,3], "Sum does not match");
      assert.strictEqual(called, 3, "Reducer method must be used");
    });


    it('should sum with initial value', async function () {
      let called = 0;
      const total = await Promise.reduce([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
      ], (acc, value) => {
        called++;
        return acc + value;
      }, 10);

      assert.strictEqual(total, 10+1+2+3, "Sum does not match");
      assert.strictEqual(called, 3, "Reducer method must be used");
    });

    it('should concat with initial value', async function () {
      let called = 0;
      const total = await Promise.reduce([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
      ], (acc, value) => {
        called++;
        assert.strictEqual(Array.isArray(acc), true, "Accumulator should be an array");

        return acc.concat(value);
      }, []);

      assert.deepStrictEqual(total, [1,2,3], "Sum does not match");
      assert.strictEqual(called, 3, "Reducer method must be used");
    });
  });
});

