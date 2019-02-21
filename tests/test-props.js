"use strict";
require("../index");

const assert = require('assert');

describe('promise-props', function () {

  describe('#props()', function () {
    it('should be executed for each entry', function () {
      return testProps((props) => Promise.resolve(props).props())
    });

    // TODO: test rejection
  });

  describe('.props()', function () {
    it('should be executed for each entry', function () {
      return testProps((props) => Promise.props(props));
    });
  });

});

async function testProps(propsHandler) {
  const props = {
    x: test(0),
    y: test(1),
  };

  const result = await propsHandler(props);

  assert.strictEqual(typeof result, "object");
  assert.notStrictEqual(result, null);
  assert.strictEqual(Object.keys(props).length, Object.keys(result).length);
  Object.keys(props).forEach(key => assert.ok(Object.keys(result).some(other => other === key)));

  assert.strictEqual(result.x, 1);
  assert.strictEqual(result.y, null);

  async function test(i) {
    if (i === 1) {
      return null;
    }

    await Promise.delay(0);

    return i + 1;
  }
}
