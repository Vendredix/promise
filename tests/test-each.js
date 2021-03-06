"use strict";
require("../index");

const assert = require('assert');

describe('promise-each', function () {

  describe('#each()', function () {
    it('should be executed for each entry', function () {
      return testEach((items, iterator) => Promise.resolve(items).each(iterator))
    });

    // TODO: test rejection
  });

  describe('.each()', function () {
    it('should be executed for each entry', function () {
      return testEach((items, iterator) => Promise.each(items, iterator));
    });

    it('should return a promise on an empty array', async function () {
      const promise = Promise.each([], (item, index, length) => 0);

      assert.strictEqual(promise instanceof Promise, true, "should result with a promise");
      const result = await promise;
      assert.strictEqual(result instanceof Array && result.length === 0, true, "result should be an empty array");
    });

    it('should return a promise on a single element', async function () {
      const promise = Promise.each([Promise.resolve(1)], (item, index, length) => 0);

      assert.strictEqual(promise instanceof Promise, true, "should result with a promise");
      const result = await promise;
      assert.strictEqual(result instanceof Array && result.length === 1, true, "result should be an array");
      assert.strictEqual(result[0], 1, "result values should match");
    });

    it('should support non arrays', async function () {
      const promise = Promise.each(Promise.resolve(1), (item, index, length) => 0);

      assert.strictEqual(promise instanceof Promise, true, "should result with a promise");
      const result = await promise;
      assert.strictEqual(result instanceof Array && result.length === 1, true, "result should be an array");
      assert.strictEqual(result[0], 1, "result values should match");
    });
  });

});

async function testEach(eachHandler) {
  function Constructor(nr) {
    this.nr = nr;
    this.called = false;
  }

  const items = [];
  const orgItems = [];
  for (let i = 0; i < 42; i++) {
    let val = new Constructor(i);
    if (i % 4 > 0) val = Promise.resolve(val);
    if (i % 4 > 1) val = Promise.resolve(val);
    if (i % 4 > 2) val = Promise.resolve(val);
    items.push(val);
    orgItems.push(val);
  }

  let index = 0
    , isRunning = false;

  const result = await eachHandler(items, (item, i, len) => {
    item.called = true;

    assert.strictEqual(isRunning, false, "should have awaited promise serially");
    assert.strictEqual(len, items.length, "length should be equal");
    assert.strictEqual(i, index++, "index should be equal");
    assert.strictEqual(item instanceof Constructor, true, "item should be resolved and an instance of Constructor");

    isRunning = true;

    return Promise.resolve()
      .then(() => {
        isRunning = false;
        return "SOME_VALUE" + i;
      });
  });

  assert.strictEqual(index, items.length, "should have handled each item");
  assert.strictEqual(isRunning, false, "should have handled each item");

  items.forEach((item, i) => {
    assert.strictEqual(item, orgItems[i], "should not have touched array of items");
  });

  result.forEach((item, i) => {
    assert.strictEqual(item instanceof Constructor && item.nr === i, true, "should return with resolved but original array item" + i);
    assert.strictEqual(item.called, true, "should have handled item" + i);
  });
}
