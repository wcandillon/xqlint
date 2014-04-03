'use strict';

var vows = require('vows');
var assert = require('assert');
var fs = require('fs');

var XQLint = require('../lib/xqlint').XQLint;

vows.describe('Test Code Formatting').addBatch({
    'test style check (1)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/zorba/merry.xq', 'utf-8'), { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'test style check (2)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/zorba/merry.xq', 'utf-8'), { styleCheck: true });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 3, 'Number of markers');
    },
    
    'test style check (3)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/zorba/merry.xq', 'utf-8'));
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    }
}).export(module);