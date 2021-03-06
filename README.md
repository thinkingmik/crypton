Crypton 1.x
================
Node module that provides cryptographic functionalities using [`crypto`](https://nodejs.org/api/crypto.html) for ciphering and [`bcrypt`](https://github.com/kelektiv/node.bcrypt.js) for encryption.

* [Installation](#install)
* [Example](#usage)
* [Documentation](#documentation)
  * [Construction](#construction)
  * [Methods](#methods)
    * [cipher](#cipher)
    * [decipher](#decipher)
    * [crypt](#crypt)
    * [compare](#compare)
    * [verify](#verify)
    * [md5](#md5)
    * [randomBytes](#randomBytes)
* [License](#license)

# <a name="install"></a>Installation
In your project root run from command line:
```
$ npm install -save crypton
```

# <a name="usage"></a>Example
Let's start! Include in your node application `crypton` module:

```javascript
//require object
var Crypton = require('crypton').Crypton;
//or require factory
var factory = require('crypton');

//create options
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

//create an instance
var cryptoManager1 = new Crypton(options);
//or use factory
var cryptoManager2 = factory.create(options);

cryptoManager1.cipher('mytext')
.then(function(res) {
  console.log(res);
});
```

# <a name="documentation"></a>Documentation
# <a name="construction"></a>Construction
A `Crypton` instance can be created using factory or using the `new` keyword.
```javascript
var factory = require('crypton');
var cryptonManager1 = factory.create();
//or
var Crypton = require('crypton').Crypton;
var cryptonManager2 = new Crypton();
```

### <a name="require"/>new Crypton( [options] ) : Object
The `crypton` module can be initialized with a configuration object.

__Arguments__

```javascript
[options] {Object} Optional configuration
```

__Returns__

```javascript
{Object} Get an instance
```

The configuration object allows you to overrides default values. If you don't specify any configuration, it uses a default object:
```javascript
{
  crypto: {
    secretKey: 'o!rDE(Qbrq7u4OV',
    algorithm: 'AES-256-CBC',
    inputEncoding: 'utf8', //utf8|base64|hex
    outputEncoding: 'base64' //utf8|base64|hex
  },
  bcrypt: {
    saltRounds: 5 //the cost of processing the data
  }
}
```

## <a name="methods"></a>Methods
### <a name="cipher"/>cipher( text, [options] ) : Promise( string )
Cipher a text with crypto. The operation is reversible. Options param could be the entire crypto configuration or only an attribute:
```javascript
{
  secretKey: 'o!rDE(Qbrq7u4OV'
}
```

__Arguments__

```code
text      {string} Text to cipher
[options] {object} Overrides configuration
```

__Returns__

```code
{string} Returns the ciphered text
```

__Throws__

```code
{CipherCryptonError}
```
---------------------------------------

### <a name="cipher"/>decipher( text, [options] ) : Promise( string )
Decipher a ciphered text with crypto. Options param could the entire crypto configuration or only an attribute:
```javascript
{
  secretKey: 'o!rDE(Qbrq7u4OV'
}
```

__Arguments__

```code
text      {string} Text to decipher
[options] {object} Overrides configuration
```

__Returns__

```code
{string} Returns the deciphered text
```

__Throws__

```code
{DecipherCryptonError}
```
---------------------------------------

### <a name="crypt"/>crypt( text, [options] ) : Promise( string )
Crypt a text with bcrypt. The operation is not reversible. Options param could the entire bcrypt configuration or only an attribute:
```javascript
{
  saltRound: 10
}
```

__Arguments__

```code
text      {string} Text to crypt
[options] {object} Overrides configuration
```

__Returns__

```code
{string} Returns the crypted text
```

__Throws__
```code
{EncryptCryptonError}
```
---------------------------------------

### <a name="compare"/>compare( text, ciphered, force, [options] ) : Promise( bool )
Check if the clear text matches with the ciphered text. If force is specified it accepts two ciphered strings to compare. Use this method only with ciphered text. Options param could the entire crypto configuration or only an attribute:
```javascript
{
  secretKey: 'o!rDE(Qbrq7u4OV'
}
```

__Arguments__

```code
text      {string}  Text to compare with ciphered
ciphered  {string}  Ciphered text
force     {bool}    Force the compare
[options] {object}  Overrides configuration
```

__Returns__

```code
{bool} Returns the result of the match
```

__Throws__
```code
{CompareCryptonError}
```
---------------------------------------

### <a name="verify"/>verify( text, crypted ) : Promise( bool )
Check if the clear text matches with the crypted text. Use this method only with crypted text.

__Arguments__

```code
text     {string}  Text to compare with crypted
crypted  {string}  Crypted text
```

__Returns__

```code
{bool} Returns the result of the match
```

__Throws__
```code
{VerifyCryptonError}
```
---------------------------------------

### <a name="md5"/>md5( text ) : Promise( string )
Get md5 hash of a given string.

__Arguments__

```code
text  {string} Text to hash
```

__Returns__

```code
{string} Returns md5sum in hex format
```

__Throws__
```code
{Md5CryptonError}
```

---------------------------------------

### <a name="randomBytes"/>randomBytes( len ) : Promise( string )
Get random bytes.

__Arguments__

```code
len  {int} Bytes length
```

__Returns__

```code
{string} Returns bytes in hex format
```

__Throws__
```code
{RandomBytesCryptonError}
```

# <a name="license"></a>License
The [MIT License](https://github.com/thinkingmik/crypton/blob/master/LICENSE)

Copyright (c) 2017 Michele Andreoli <http://thinkingmik.com>
