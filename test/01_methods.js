var cheerio = require('cheerio')
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var Crypton = require('../').Crypton;
var Promise = require('bluebird');

var text = 'example';
var ciphered = null;
var crypted = null;
var options = {
  crypto: {
    secretKey: 'o!rDE(Qbrq7u4OV',
    algorithm: 'AES-256-CBC',
    inputEncoding: 'utf8',
    outputEncoding: 'base64'
  },
  bcrypt: {
    saltRounds: 5
  }
};

var cryptoManager = new Crypton(options);

// Cipher method
describe('Call Crypton cipher method', function() {
  it('should return a ciphered text', function() {
    return cryptoManager.cipher(text)
    .then(function(res) {
      ciphered = res;
      expect(res).to.exist;
    });
  });
  it('should return a CipherCryptonError exception', function() {
    return cryptoManager.cipher(null)
    .catch(function(err) {
      expect(err.name).to.be.equal('CipherCryptonError');
    });
  });
});

// Decipher method
describe('Call Crypton decipher method', function() {
  it('should return a deciphered text', function() {
    return cryptoManager.decipher(ciphered)
    .then(function(res) {
      expect(res).to.be.equal(text);
    });
  });
  it('should return a DecipherCryptonError exception', function() {
    return cryptoManager.decipher(null)
    .catch(function(err) {
      expect(err.name).to.be.equal('DecipherCryptonError');
    });
  });
});

// Compare method
describe('Call Crypton compare method', function() {
  it('should return a true value', function() {
    return cryptoManager.compare(text, ciphered)
    .then(function(res) {
      expect(res).to.be.equal(true);
    });
  });
  it('should return a false value', function() {
    return cryptoManager.compare('fake', ciphered)
    .then(function(res) {
      expect(res).to.be.equal(false);
    });
  });
  it('should return a CompareCryptonError exception', function() {
    return cryptoManager.compare(null, ciphered)
    .catch(function(err) {
      expect(err.name).to.be.equal('CompareCryptonError');
    });
  });
});

// Crypt method
describe('Call Crypton encrypt method', function() {
  it('should return a crypted text', function() {
    return cryptoManager.crypt(text)
    .then(function(res) {
      crypted = res;
      expect(res).to.exist;
    });
  });
  it('should return a EncryptCryptonError exception', function() {
    return cryptoManager.crypt(null)
    .catch(function(err) {
      expect(err.name).to.be.equal('EncryptCryptonError');
    });
  });
});

// Verify method
describe('Call Crypton verify method', function() {
  it('should return a true value', function() {
    return cryptoManager.verify(text, crypted)
    .then(function(res) {
      expect(res).to.be.equal(true);
    });
  });
  it('should return a false value', function() {
    return cryptoManager.verify('fake', crypted)
    .then(function(res) {
      expect(res).to.be.equal(false);
    });
  });
  it('should return a VerifyCryptonError exception', function() {
    return cryptoManager.verify(null, ciphered)
    .catch(function(err) {
      expect(err.name).to.be.equal('VerifyCryptonError');
    });
  });
});

// Random bytes method
describe('Call Crypton random bytes method', function() {
  it('should return random bytes', function() {
    return cryptoManager.randomBytes(20)
    .then(function(res) {
      expect(res).to.exist;
    });
  });
  it('should return a RandomBytesCryptonError exception', function() {
    return cryptoManager.randomBytes(null)
    .catch(function(err) {
      expect(err.name).to.be.equal('RandomBytesCryptonError');
    });
  });
});

// Md5 hash method
describe('Call Crypton md5 method', function() {
  it('should return md5 hash', function() {
    return cryptoManager.md5('password')
    .then(function(res) {
      expect(res).to.exist;
    });
  });
  it('should return a Md5CryptonError exception', function() {
    return cryptoManager.md5(null)
    .catch(function(err) {
      expect(err.name).to.be.equal('Md5CryptonError');
    });
  });
});
