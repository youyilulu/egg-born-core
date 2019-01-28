const isPromise = require('./is_promise');

module.exports = (fn) => {
  if (isPromise(fn)) {
    return fn;
  }
  return function (...args) {
    return new Promise((resolve, reject) => {
      try {
        fn.call(this, ...args, (err, ...data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data[0]);
          }
        });
      } catch (err) {
        reject(err);
      }
    })
  }
}

