'use strict';
/*eslint-env mocha*/
/*jshint expr: true*/
/*jshint multistr: true*/
var chai = require('chai');
var expect = chai.expect;

describe('Midden', function() {
    it('should exist', function() {
        expect(require('../')).to.be.defined;
    });

    describe('middenConfig', function(){
      // code to be tested
      var middenConfig = require('../');

      var rawData = {
        'property1': 'some value',
        'property2': 'another value'
      };
      var html = "<div>Something</div> {{midden 'contextValue'}}";
      var testObj = {
        context: rawData
      };

      it('should return a midden output', function(){
        var midden = middenConfig(true);
        var actual = midden.call(testObj, 'property1');
        //console.log(actual);
        expect(actual).to.contain('some value', 'missing requested value');
      });

      it('should return an empty string when configured false', function(){
        var midden = middenConfig(false);
        var actual = midden.call(testObj, 'property1');
        //console.log(actual);
        expect(actual).to.have.length(0);
      });

      it('should return an empty string when configured is not set', function(){
        var midden = middenConfig();
        var actual = midden.call(testObj, 'property1');
        //console.log(actual);
        expect(actual).to.have.length(0);
      });
    });
});