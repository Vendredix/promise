"use strict";
const assert = require("assert");
const utils = require("./utils");

async function props(map) {
  if (utils.isPromiseLike(map)) {
    map = await map;
  }

  if (map instanceof Map) {
    const result = new Map();
    const promises = [];

    for (const entry of map.entries()) {
      if (utils.isPromiseLike(entry[1])) {
        promises.push(entry[1].then(val => {
          result.set(entry, val);
        }));
      }
      else {
        result.set(entry, entry[1]);
      }
    }
    await Promise.all(promises);

    return result;
  }

  const result = {};
  if (map !== null && typeof map === "object" && !Array.isArray(map)) {
    const keys = Object.keys(map);
    const promises = [];

    for (let i = 0; i < keys.length; i++) {
      if (utils.isPromiseLike(map[keys[i]])) {
        promises.push(map[keys[i]].then(val => {
          result[keys[i]] = val;
        }));
      }
      else {
        result[keys[i]] = map[keys[i]];
      }
    }
    await Promise.all(promises);
  }

  return result;
}

utils.defineHelpers("props", props);

