'use strict';

var vows = require('vows');
var assert = require('assert');
var fs = require('fs');

var XQLint = require('../lib/xqlint').XQLint;

vows.describe('Test Function declarations').addBatch({
    'functions (1)': function(){
        var linter = new XQLint('declare function local:foo() as xs:string { local:bar() }; declare function local:bar() as xs:string { "h" };  1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'functions (2)': function(){
        var linter = new XQLint('declare function local:foo() as xs:string { local:bar() };  1');
        var markers = linter.getErrors();
        assert.equal(markers.length, 1, 'Number of markers');
    },
    
    'functions (3)': function(){
        var linter = new XQLint('declare function local:foo() as xs:string { ns:bar() };  1');
        var markers = linter.getErrors();
        assert.equal(markers.length, 1, 'Number of markers');
    },
    
    'functions (4)': function(){
        var linter = new XQLint('declare default function namespace "http://www.w3.org/2005/xquery-local-functions"; declare function local:bar() as xs:string { "h" }; bar()');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'updating function (1)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/update.jq', 'utf-8'), { styleCheck: false, fileName: 'update.jq' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    }
}).export(module);
