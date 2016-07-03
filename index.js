'use strict';

var midden = require('midden');
var get = require('get-value');

/**
 * inspects the vinyl view to find path to the calling
 * page and the line where the helper was called from
 * @param  {Object} page [an Assemble page with a vinyl view]
 * @param  {Sting} prop [name of the property used in the helper]
 * @return {string}      [path:line helper was called from]
 */
function getCallingTemplate(page, prop){
  var relPath = page.context.view.path;
  var content = page.context.view.orig.split(/\r?\n/);
  var helperName = page.helper.name;
  var likely = "{{" + helperName + " '" + prop + "'}}";
  var helperRe = new RegExp('{{' + helperName + ' \\s*[\'"]' + prop + '[\'"]\\s*}}');
  var line = 0;

  for (var i = 0; i < content.length; i++) {
    if (helperRe.test(content[i])) {
      line = i+1;
      break;
    }
  } 

  return relPath + ':' + line;
}

/**
 * Returns a midden output as a string of HTML, if the `this` object
 * contains a vinyl view, will search view to find the line the 
 * helper was called from and insert the path:line into the midden
 * footer
 * @param  {string} prop [name of the property to inspect]
 * @return {string}      [midden output]
 */
var handlebarsMidden = function handlebarsMidden(prop){
  var pathLine = 3;
  if(this.context.view){
    pathLine = getCallingTemplate(this, prop);
  }
  return midden(get(this, prop), prop, pathLine);
};

/**
 * returns an empty string, used when midden output is
 * not required
 * @param  {String} prop [any string]
 * @return {String}      [an empty string]
 */
var noOutput = function noOutput(prop){
  return '';
};

/**
 * Config function for Assemble-midden.
 * If passed true, will return a working midden helper.
 * If passed false, will return a noop helper.
 * @param  {Boolean} active [pass midden helper to app]
 * @return {Function}        [a helper function]
 */
module.exports = function middenConfig(active){
  if(active){
    return handlebarsMidden;
  }else{
    return noOutput;
  }
  
};