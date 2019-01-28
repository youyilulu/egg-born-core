
'use strict';

const NotImplementedError = require('./error/not_implemented_error');

const NOT_IMPLEMENT_ERROR = Symbol('EggBorn#CacheStrategy#notImplement');

/**
 * 缓存策略
 * 包含get,set,delete(del)方法，均返回promise
 */
class CacheStrategy {
  /**
   * 初始化CacheStrategy
   * 
   * 默认识别client的get,set和delete(del)方法，异步调用后只支持promise，如果client提供的是非promise的异步方法，请自行封装成promise
   * 如果client不包含以上方法，请自行实现get,set和delete(del)
   * 
   * @param {*} client 缓存实际的客户端
   */
  constructor(client) {
    this.client = client;
  }
  [NOT_IMPLEMENT_ERROR]() {
    throw new NotImplementedError();
  }
  async get(...args) {
    return this.client.get ? this.client.get(...args) : this[NOT_IMPLEMENT_ERROR]('CacheStrategy.get');
  }
  async set(...args) {
    return this.client.set ? this.client.set(...args) : this[NOT_IMPLEMENT_ERROR]('CacheStrategy.set');
  }
  async delete(...args) {
    const fnDel = this.client.delete || this.client.del;
    return fnDel ? fnDel.call(this.client, ...args) : this[NOT_IMPLEMENT_ERROR]('CacheStrategy.delete');
  }
}

module.exports = CacheStrategy;
