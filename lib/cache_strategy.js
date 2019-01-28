
'use strict';

const { promisify } = require('util');

const PROMISE_GET = Symbol('EggBorn#CacheStrategy#get');
const PROMISE_SET = Symbol('EggBorn#CacheStrategy#set');
const PROMISE_DEL = Symbol('EggBorn#CacheStrategy#del');

/**
 * 缓存策略
 * 包含get,set,del方法，均返回promise
 */
class CacheStrategy {
  /**
   * 初始化CacheStrategy
   * @param {*} client 必须包含get,set和del方法,否则需要在继承子类中实现对应方法
   */
  constructor(client) {
    this.client = client;
    if (this.client.get) this[PROMISE_GET] = promisify(this.client.get).bind(this.client);
    if (this.client.set) this[PROMISE_SET] = promisify(this.client.set).bind(this.client);
    if (this.client.del) this[PROMISE_DEL] = promisify(this.client.del).bind(this.client);
  }
  get(...args) {
    return this[PROMISE_GET](...args);
  }
  set(...args) {
    return this[PROMISE_SET](...args);
  }
  del(...args) {
    return this[PROMISE_DEL](...args);
  }
}

module.exports = CacheStrategy;
