module.exports = function Md5CryptonError(err) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 500;
  this.message = err.message || 'Error while generating md5 hash';
};

require('util').inherits(module.exports, Error);
