'use strict';

var vows = require('vows');
var assert = require('assert');

var fs = require('fs');
var ffs = require('final-fs');

var JSONiqParser = require('../lib/parsers/JSONiqParser.js').JSONiqParser;
var XQueryParser = require('../lib/parsers/XQueryParser.js').XQueryParser;
var JSONParseTreeHandler = require('../lib/parsers/JSONParseTreeHandler.js').JSONParseTreeHandler;

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var batch = {};
var files = ffs.readdirRecursiveSync('test/queries', true);
files.forEach(function(file){
    batch[file] = function(){
        var source = fs.readFileSync('test/queries/' + file, 'UTF-8');
        assert(typeof(source), 'string');
        var h = new JSONParseTreeHandler(source);
        var parser = ((file.endsWith('.jq') && source.indexOf('xquery version') !== 0) || source.indexOf('jsoniq version') === 0) ? new JSONiqParser(source, h) : new XQueryParser(source, h);
        try {
            parser.parse_XQuery();
        } catch(e) {
            assert.equal(e.getMessage(), false);
        }
    };
});
vows.describe('Test Parser').addBatch(batch).export(module);
