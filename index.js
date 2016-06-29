'use strict';

var midden = require('midden');
var get = require('get-value');

module.exports = function handlebarsMidden(prop){
  return midden(get(this.context, prop));
};