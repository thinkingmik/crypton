var _ = require('lodash');
var Configuration = require('./configuration');
var cryptoManager = require('./cryptoManager');
var settings = require('./configs/appconfig');

function Crypton(options) {
  this._config = new Configuration(options, settings);
}

//Expose crypton public functions
Crypton.prototype.getConfig = function() {
  return this._config.getOptions();
}

Crypton.prototype.init = function(options) {
  this._config = new Configuration(options, settings);
}

/**
* Cipher a text with crypto. The operation is reversible
* @param {string} text
* @param {object} [options]
* @return {Promise<string>}
* @throws CipherCryptonError
*/
Crypton.prototype.cipher = function(text, options) {
    return cryptoManager.cipher(text, options, this._config.getOptions());
}

/**
* Decipher a ciphered text with crypto
* @param {string} text
* @param {object} [options]
* @return {Promise<string>}
* @throws DecipherCryptonError
*/
Crypton.prototype.decipher = function(text, options) {
    return cryptoManager.decipher(text, options, this._config.getOptions());
}

/**
* Check if the clear text matches with the ciphered text. If force is specified
* it accepts two ciphered strings to compare
* @param {string} text
* @param {string} ciphered
* @param {bool} force
* @param {options} [options]
* @return {Promise<bool>}
* @throws CompareCryptonError
*/
Crypton.prototype.compare = function(text, cipher, force, options) {
  return cryptoManager.compare(text, cipher, force, options, this._config.getOptions());
}

/**
* Crypt a text with bcrypt. The operation is not reversible
* @param {string} text
* @param {object} [options]
* @return {Promise<string>}
* @throws EncryptCryptonError
*/
Crypton.prototype.crypt = function(text, options) {
  return cryptoManager.crypt(text, options, this._config.getOptions());
}

/**
* Check if the clear text matches with the crypted text
* @param {string} text
* @param {string} crypted
* @return {Promise<bool>}
* @throws VerifyCryptonError
*/
Crypton.prototype.verify = function(text, crypted) {
  return cryptoManager.verify(text, crypted, this._config.getOptions());
}

/**
* Get random bytes of a given length
* @param {int} length
* @param {string} [outputEncoding]
* @return {Promise<string>}
* @throws RandomBytesCryptonError
*/
Crypton.prototype.randomBytes = function(len, outputEncoding) {
  return cryptoManager.randomBytes(len, outputEncoding, this._config.getOptions());
}

/**
* Get md5sum of a given string
* @param {string} data
* @param {string} [outputEncoding]
* @return {Promise<string>}
* @throws Md5CryptonError
*/
Crypton.prototype.md5 = function(data, outputEncoding) {
  return cryptoManager.md5(data, outputEncoding, this._config.getOptions());
}

exports = module.exports.Crypton = Crypton;
exports = module.exports.create = function(options) {
  return new Crypton(options);
};
