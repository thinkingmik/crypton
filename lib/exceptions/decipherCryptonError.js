module.exports = function DecipherCryptonError(err) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 500;
  this.message = err.message || 'Error while deciphering text';
};

require('util').inherits(module.exports, Error);
