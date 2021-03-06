var _ = require('lodash');

function Configuration(options, settings) {
  this._config = _.clone(settings, true);
  if (_.isNull(options) || _.isUndefined(options)) {
    return;
  }

  if (!_.isNull(options.crypto) && !_.isUndefined(options.crypto)) {
    this._config.crypto['secretKey'] = selectConfigValue(options.crypto['secretKey'], this._config.crypto['secretKey']);
    this._config.crypto['algorithm'] = selectConfigValue(options.crypto['algorithm'], this._config.crypto['algorithm']);
    this._config.crypto['inputEncoding'] = selectConfigValue(options.crypto['inputEncoding'], this._config.crypto['inputEncoding']);
    this._config.crypto['outputEncoding'] = selectConfigValue(options.crypto['outputEncoding'], this._config.crypto['outputEncoding']);
  }

  if (!_.isNull(options.bcrypt) && !_.isUndefined(options.bcrypt)) {
    this._config.bcrypt['saltRounds'] = selectConfigValue(options.bcrypt['saltRounds'], this._config.bcrypt['saltRounds']);
  }
}

Configuration.prototype.getOptions = function() {
  return this._config;
}

var selectConfigValue = function(custom, def) {
  if (_.isNull(custom) || _.isUndefined(custom) || (_.isArray(custom) && custom.length <= 0)) {
    return def;
  }
  return custom;
}

exports = module.exports = Configuration;
