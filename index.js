'use strict';

var midden = require('midden');
var get = require('get-value');

var handlebarsMidden = function handlebarsMidden(prop){
  return midden(get(this.context, prop));
};

var noOutput = function noOutput(prop){
  return '';
};

module.exports = function middenConfig(active){
  if(active){
    return handlebarsMidden;
  }else{
    return noOutput;
  }
  
};