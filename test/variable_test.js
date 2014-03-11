'use strict';

var vows = require('vows');
var assert = require('assert');
var fs = require('fs');

var XQLint = require('../lib/xqlint').XQLint;

vows.describe('Test Variable declarations').addBatch({
    'XPST0081 (1)': function(){
        var linter = new XQLint('test', 'let $bar:hello := 1 return 1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XPST0081]'), 0, 'Is Error [XPST0081]');
    },
    
    'XPST0081 (2)': function(){
        var linter = new XQLint('test', 'declare namespace bar = "http://www.example.com"; let $bar:hello := 1 return 1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'XPST0081 (3)': function(){
        var linter = new XQLint('test', 'let $Q{http://www.example.com}hello := 1 return 1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'XPST0081 (5)': function(){
        var linter = new XQLint('test', 'let $foo := 1 return $foo');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'XPST0008 (1)': function(){
        var linter = new XQLint('test', 'let $foo := 1 return $bar');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XPST0008]'), 0, 'Is Error [XPST0008]');
    },

    'XPST0008 (2)': function(){
        var linter = new XQLint('test', 'for $hello in 1 group by $var := 2 return $var');
        var markers = linter.getMarkers();
        console.log(markers);
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'XPST0008 (3)': function(){
        var linter = new XQLint('test', 'for $var in 1 return $var');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'XPST0008 (4)': function(){
        var linter = new XQLint('test', 'for $var in 1 return $var');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
        
    },

    'XPST0008 (5)': function(){
        var linter = new XQLint('test', 'for $var in $var return $var');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XPST0008]'), 0, 'Is Error [XPST0008]');
    },

    'XPST0008 (6)': function(){
        var linter = new XQLint('test', 'for $hello in 1 group by $var := $var return $var');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        assert.equal(markers[0].message.indexOf('[XPST0008]'), 0, 'Is Error [XPST0008]');
    },
    
    'Inline function parameters': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/variables/1.xq', 'utf-8'));
        var markers = linter.getMarkers();
        console.log(markers);
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'test': function(){
        var linter = new XQLint('test', fs.readFileSync('test/queries/zorba/xqxq/url-schema-resolver3.xq', 'utf-8'));
        var markers = linter.getMarkers();
        console.log(markers);
        assert.equal(markers.length, 0, 'Number of markers');
        //test/queries/zorba/xqxq/url-schema-resolver3.xq
    }
}).export(module);
