"use strict";

Promise.prototype.return = Promise.prototype.thenReturn = function (val) {
  return this.then(() => val);
};
Promise.prototype.throw = Promise.prototype.thenThrow = function (val) {
  return this.then(() => Promise.reject(val));
};
// Promise.prototype.finally = function(cb) {
//   // TODO: Implement
// };
