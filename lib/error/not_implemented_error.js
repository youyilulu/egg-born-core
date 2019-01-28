/* eslint-disable no-unused-vars */
'use strict';

/**
 * 方法未实现异常
 * Error.name is 'NotImplementedError'
 */
class NotImplementedError extends Error {
  /**
   * 易于识别的方法名，建议<ClassName>.<MethodName>
   * @param {String} message 
   */
  constructor(message) {
    super(message);
    this.name = 'NotImplementedError';
    this.message = `[egg-born-core] ${message} not implemented`
  }
}
