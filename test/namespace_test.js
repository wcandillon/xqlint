'use strict';

var vows = require('vows');
var assert = require('assert');
var fs = require('fs');

var XQLint = require('../lib/XQLint').XQLint;

vows.describe('Test Namespace declarations').addBatch({
    'test XQST0047 (1)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/1.xq', 'utf-8'));
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0047]'), 0, 'Is Error [XQST0047]');
    },
    
    'test XQST0047 (2)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/mainModule6.xq', 'utf-8'));
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0047]'), 0, 'Is Error [XQST0047]');
    }
}).export(module);
