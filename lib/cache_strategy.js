
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
   * 
   * client如果包含get,set和delete方法,则会通过promisify封装成promise进行调用；否则需要在继承子类中实现对应方法，同样必须返回promise
   * 
   * @param {*} client 缓存实际的客户端
   */
  constructor(client) {
    this.client = client;
    if (this.client.get) this[PROMISE_GET] = promisify(this.client.get).bind(this.client);
    if (this.client.set) this[PROMISE_SET] = promisify(this.client.set).bind(this.client);
    if (this.client.delete) this[PROMISE_DEL] = promisify(this.client.delete).bind(this.client);
  }
  get(...args) {
    return this[PROMISE_GET](...args);
  }
  set(...args) {
    return this[PROMISE_SET](...args);
  }
  delete(...args) {
    return this[PROMISE_DEL](...args);
  }
}

module.exports = CacheStrategy;
