var _ = require('lodash');
var Promise = require('bluebird');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var EncryptCryptonError = require('./exceptions/encryptCryptonError');
var CipherCryptonError = require('./exceptions/cipherCryptonError');
var DecipherCryptonError = require('./exceptions/decipherCryptonError');
var CompareCryptonError = require('./exceptions/compareCryptonError');
var VerifyCryptonError = require('./exceptions/verifyCryptonError');
var RandomBytesCryptonError = require('./exceptions/randomBytesCryptonError');
var Md5CryptonError = require('./exceptions/md5CryptonError');

/**
* Cipher a text with crypto. The operation is reversible
* @param {string} text
* @param {object} [options]
* @param {object} appconfig
* @return {Promise<string>}
* @throws CipherCryptonError
*/
var cipherText = function(text, options, appconfig) {
  return new Promise(function(resolve, reject) {
    try {
      var settings = getCryptoOverrideOptions(options, appconfig);
      var cipher = crypto.createCipher(settings.algorithm, settings.secretKey);
      var crypted = cipher.update(text, settings.inputEncoding, settings.outputEncoding);
      crypted += cipher.final(settings.outputEncoding);

      return resolve(crypted);
    }
    catch (err) {
      return reject(new CipherCryptonError(err));
    }
  });
}

/**
* Decipher a ciphered text with crypto
* @param {string} text
* @param {object} [options]
* @param {object} appconfig
* @return {Promise<string>}
* @throws DecipherCryptonError
*/
var decipherText = function(text, options, appconfig) {
  return new Promise(function(resolve, reject) {
    try {
      var settings = getCryptoOverrideOptions(options, appconfig);
      var decipher = crypto.createDecipher(settings.algorithm, settings.secretKey);
      var decrypted = decipher.update(text, settings.outputEncoding, settings.inputEncoding);
      decrypted += decipher.final(settings.inputEncoding);

      return resolve(decrypted);
    }
    catch (err) {
      return reject(new DecipherCryptonError(err));
    }
  });
}

/**
* Check if the clear text matches with the ciphered text. If force is specified
* it accepts two ciphered strings to compare
* @param {string} text
* @param {string} ciphered
* @param {bool} force
* @param {object} [options]
* @param {object} appconfig
* @return {Promise<bool>}
* @throws CompareCryptonError
*/
var compareText = function(text, cipher, force, options, appconfig) {
  return new Promise(function(resolve, reject) {
    var promise = Promise.resolve(text);
    if (force === true) {
      promise = decipherText(text, options, appconfig)
      .then(function(dec) {
        return dec;
      })
      .catch(function(err) {
        return text;
      });
    }

    return promise.then(function(text) {
      return cipherText(text, options, appconfig);
    })
    .then(function(hash) {
      if (hash === cipher) {
        return resolve(true);
      }
      return resolve(false);
    })
    .catch(function(err) {
      return reject(new CompareCryptonError(err));
    });
  });
}

/**
* Crypt a text with bcrypt. The operation is not reversible
* @param {string} text
* @param {object} [options]
* @param {object} appconfig
* @return {Promise<string>}
* @throws EncryptCryptonError
*/
var cryptText = function(text, options, appconfig) {
  var settings = getBcryptOverrideOptions(options, appconfig);

  return bcrypt.genSalt(settings.saltRounds)
  .then(function (salt) {
    return bcrypt.hash(text, salt, null);
  })
  .then(function (hash) {
    return hash;
  })
  .catch(function(err) {
    throw new EncryptCryptonError(err);
  });
}

/**
* Check if the clear text matches with the crypted text
* @param {string} text
* @param {string} crypted
* @param {object} appconfig
* @return {Promise<bool>}
* @throws VerifyCryptonError
*/
var verifyText = function(text, crypted, appconfig) {
  return bcrypt.compare(text, crypted)
  .catch(function(err) {
    throw new VerifyCryptonError(err);
  });
}

var getCryptoOverrideOptions = function(options, appconfig) {
  if (_.isNull(options) || _.isUndefined(options)) {
    return appconfig.crypto;
  }
  var settings = {
    secretKey: selectConfigValue(options['secretKey'], appconfig.crypto['secretKey']),
    algorithm: selectConfigValue(options['algorithm'], appconfig.crypto['algorithm']),
    inputEncoding: selectConfigValue(options['inputEncoding'], appconfig.crypto['inputEncoding']),
    outputEncoding: selectConfigValue(options['outputEncoding'], appconfig.crypto['outputEncoding'])
  };
  return settings;
}

/**
* Get random bytes of a given length
* @param {int} length
* @param {string} [outputEncoding]
* @param {object} appconfig
* @return {Promise<string>}
* @throws RandomBytesCryptonError
*/
var randomBytes = function(len, outputEncoding, appconfig) {
  return new Promise(function(resolve, reject) {
    var out = selectConfigValue(outputEncoding, 'hex');

    try {
      crypto.randomBytes(len, function(err, buf) {
        if (err) {
          return reject(new RandomBytesCryptonError(err));
        }
        return resolve(buf.toString(out));
      });
    }
    catch (err) {
      return reject(new RandomBytesCryptonError(err));
    }
  });
}

/**
* Get md5sum of a given string
* @param {string} data
* @param {string} [outputEncoding]
* @param {object} appconfig
* @return {Promise<string>}
* @throws Md5CryptonError
*/
var md5Hash = function(data, outputEncoding, appconfig) {
  return new Promise(function(resolve, reject) {
    var out = selectConfigValue(outputEncoding, 'hex');

    try {
      var md5sum = crypto.createHash('md5');
      md5sum.update(data);
      return resolve(md5sum.digest(out));
    }
    catch (err) {
      return reject(new Md5CryptonError(err));
    }
  });
}

var getBcryptOverrideOptions = function(options, appconfig) {
  if (_.isNull(options) || _.isUndefined(options)) {
    return appconfig.bcrypt;
  }
  var settings = {
    saltRounds: selectConfigValue(options['saltRounds'], appconfig.bcrypt['saltRounds'])
  };
  return settings;
}

var selectConfigValue = function(custom, def) {
  if (_.isNull(custom) || _.isUndefined(custom) || (_.isArray(custom) && custom.length <= 0)) {
    return def;
  }
  return custom;
}

/* Public methods */
module.exports.cipher = cipherText;
module.exports.decipher = decipherText;
module.exports.compare = compareText;
module.exports.crypt = cryptText;
module.exports.verify = verifyText;
module.exports.randomBytes = randomBytes;
module.exports.md5 = md5Hash;
