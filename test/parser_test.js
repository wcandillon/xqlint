'use strict';

var vows = require('vows');
var assert = require('assert');

var fs = require('fs');
var ffs = require('final-fs');

var XQLint = require('../lib/XQLint').XQLint;

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var batch = {};
var files = ffs.readdirRecursiveSync('test/queries', true);
files.forEach(function(file){
    batch[file] = function(){
        var linter = new XQLint(file, fs.readFileSync('test/queries/' + file, 'UTF-8'));
        var syntaxError = linter.hasSyntaxError();
        assert.equal(syntaxError, false);
        if(syntaxError) {
            console.error(linter.getMarkers()[0].message);   
        }
    };
});
vows.describe('Test Parser').addBatch(batch).export(module);
