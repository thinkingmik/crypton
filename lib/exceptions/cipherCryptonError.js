module.exports = function CipherCryptonError(err) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.status = 500;
  this.message = err.message || 'Error while ciphering text';
};

require('util').inherits(module.exports, Error);
