"use strict";
const assert = require("assert");
const utils = require("./utils");

module.exports = function (Promise) {

  function props(map) {
    if (map instanceof Promise) {
      return map.then(map => props(map));
    }

    let result;
    const promises = [];

    if (map instanceof Map) {
      result = new Map();
      for (const entry of map.entries()) {
        if (entry[1] instanceof Promise) {
          promises.push(utils.resolvePromiseChain(Promise, entry[1], item => result.set(entry[0], item)));
        } else {
          result.set(entry, entry[1]);
        }
      }
    } else {
      // TODO: assert map is a obj

      result = Object.assign({}, map);

      const keys = Object.keys(map);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const item = map[key];
        if (item instanceof Promise) {
          promises.push(utils.resolvePromiseChain(Promise, item, item => result[key] = item));
        }
      }
    }

    if (promises.length === 0) {
      return utils.resolvePromise(Promise, this, result);
    }

    return Promise.all(promises)
      .thenReturn(result);
  }

  utils.defineHelpers(Promise, "props", props);

};
