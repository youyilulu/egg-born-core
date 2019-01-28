'use strict';

const isPromise = require('./is_promise');
const promisify = require('./lazy_promisify');

exports.isPromise = isPromise;
exports.promisify = promisify;
