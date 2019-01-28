'use strict';

const utilTypes = require('util').types

/**
 * node version >= 10, use utils.types.isPromise
 */
module.exports = (fn) => {
  if (utilTypes && utilTypes.isPromise) {
    return utilTypes.isPromise(fn);
  }
  return !!fn && (typeof fn === 'object' || typeof fn === 'function') && typeof fn.then === 'function';
}
