"use strict";
const assert = require("assert");
const utils = require("./utils");

async function props(map) {
  if (utils.isPromiseLike(map)) {
    map = await map;
  }

  if (map instanceof Map) {
    const result = new Map();
    for (const entry of map.entries()) {
      result.set(entry, await entry[1]);
    }

    return result;
  }

  const result = {};
  if (map !== null && typeof map === "object" && !Array.isArray(map)) {
    const keys = Object.keys(map);
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = await map[keys[i]];
    }
  }

  return result;
}

utils.defineHelpers("props", props);

