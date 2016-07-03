//regex-test.js

var colors = require('ansi-colors');

/**
 * Tests to find an RE for matching helper calls
 */

var helperName = 'midden';
var prop = 'view';

var simpleRE = new RegExp('{{midden *"view"}}');

var varRE = new RegExp('{{midden \\s*[\'"]view[\'"]\\s*}}');

var helperRE =  new RegExp('{{.' + helperName + '.' + prop + '.}}');

var genericRE = new RegExp('{{' + helperName + ' \\s*[\'"]' + prop + '[\'"]\\s*}}');


var variants = [
  '{{midden "view"}}',
  '{{midden  "view"}}',
  '{{midden  "view" }}',
  '{{midden \'view\'}}',
  '{{middenHelper \'view\'}}',
  '{{midden "context"}}'
];

console.log('varRE');
for (var i = 0; i < variants.length; i++) {
  if(varRE.test(variants[i])){
    console.log(colors.green(variants[i]));
  }else{
    console.log(colors.red(variants[i]));
  }
}

console.log('\ngenericRE');
for (var i = 0; i < variants.length; i++) {
  if(genericRE.test(variants[i])){
    console.log(colors.green(variants[i]));
  }else{
    console.log(colors.red(variants[i]));
  }
}