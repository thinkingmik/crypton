module.exports = function RandomBytesCryptonError(err) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 500;
  this.message = err.message || 'Error while generating random bytes';
};

require('util').inherits(module.exports, Error);
