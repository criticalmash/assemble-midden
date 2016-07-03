'use strict';
/*eslint-env mocha*/
/*jshint expr: true*/
/*jshint multistr: true*/
var chai = require('chai');
var expect = chai.expect;
var assemble = require('assemble');
var File = require('vinyl');
var jsdom = require("jsdom");

var middenConfig = require('../');

describe('Midden', function() {
  it('should exist', function() {
      expect(require('../')).to.be.defined;
  });

  describe('middenConfig', function(){
    // code to be tested
    //var middenConfig = require('../');

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
      var actual = midden.call(testObj, 'context.property1');
      //console.log(actual);
      expect(actual).to.contain('some value', 'missing requested value');
    });

    it('should return an empty string when configured false', function(){
      var midden = middenConfig(false);
      var actual = midden.call(testObj, 'context.property1');
      //console.log(actual);
      expect(actual).to.have.length(0);
    });

    it('should return an empty string when configured is not set', function(){
      var midden = middenConfig();
      var actual = midden.call(testObj, 'context.property1');
      //console.log(actual);
      expect(actual).to.have.length(0);
    });
  });
  
  describe('Find calling template', function(){
    var objectHtml = '';
    var app = assemble();
    var pages = app.create('pages');
    app.helper('midden', middenConfig(true));

    app.engine('hbs', require('engine-handlebars'));
    pages.engine('hbs', require('engine-handlebars'));
    pages.helper('midden', app._.helpers.sync.midden);
    
    app.page("page.hbs", {
      path: "/test/path/to/page.hbs",
      contents: new Buffer('<p>Midden output</p>\n{{midden \'view\'}}'),
      data: {prop1: 'first property'}
    });
    var page = pages.getView('page.hbs');

    pages.render(page, function(err, res) {
      if (err){ 
        console.log('error', err);
        return err;
      }
      //console.log('page.content', res.content);
      //assert.equal(res.content, 'a HALLEapp b');
      objectHtml = res.content;
    });

    it('should find the template it was called from and return the path & line number', function(){
      var objDom = jsdom.jsdom(objectHtml);
      var stackEl = objDom.querySelector('.midden-stack');
      //console.log('stack info: ', stackEl.textContent);
      expect(stackEl.textContent).to.contain('/test/path/to/page.hbs:2');
    });
  });

  // describe('works with `this` object', function(){
  //   var objectHtml = '';
  //   var app = assemble();
  //   var pages = app.create('pages');
  //   app.helper('midden', middenConfig(true));

  //   app.engine('hbs', require('engine-handlebars'));
  //   pages.engine('hbs', require('engine-handlebars'));
  //   pages.helper('midden', app._.helpers.sync.midden);
    
  //   app.page("page.hbs", {
  //     path: "/test/path/to/page.hbs",
  //     contents: new Buffer('<p>Midden output</p>\n{{midden}}'),
  //     data: {prop1: 'first property'}
  //   });
  //   var page = pages.getView('page.hbs');

  //   pages.render(page, function(err, res) {
  //     if (err){ 
  //       console.log('error', err);
  //       return err;
  //     }
  //     //console.log('page.content', res.content);
  //     //assert.equal(res.content, 'a HALLEapp b');
  //     objectHtml = res.content;
  //   });

  //   it('should print the `this` variable when not passed a path');
  // });
  
});