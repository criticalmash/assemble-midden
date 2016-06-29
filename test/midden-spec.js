'use strict';
/*eslint-env mocha*/
/*jshint expr: true*/
/*jshint multistr: true*/
var chai = require('chai');
var expect = chai.expect;

// code to be tested
var midden = require('../');

describe('Midden', function() {
    it('should exist', function() {
        expect(require('../')).to.be.defined;
    });

    describe('Midden helper', function(){
      // code to be tested
      var midden = require('../');

      var rawData = {
        'property1': 'some value',
        'property2': 'another value'
      };
      var html = "<div>Something</div> {{midden 'contextValue'}}";
      var testObj = {
        context: rawData
      };

      it('should return a midden output', function(){
        var actual = midden.call(testObj, 'property1');
        //console.log(actual);
        expect(actual).to.contain('some value', 'missing requested value');
      });
    });
});