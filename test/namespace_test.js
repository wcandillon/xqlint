'use strict';

var vows = require('vows');
var assert = require('assert');
var fs = require('fs');

var XQLint = require('../lib/xqlint').XQLint;

vows.describe('Test Namespace declarations').addBatch({
    'test XQST0047 (1)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/1.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 2, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0047]'), 0, 'Is Error [XQST0047]');
        assert.deepEqual(error.pos, { sl: 1, sc: 0, el: 1, ec: 50 }, 'Marker Position');
        var warning = markers[1];
        assert.equal(warning.type, 'warning', 'Type of marker');
    },
    
    'test XQST0047 (2)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/2.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0047]'), 0, 'Is Error [XQST0047]');
    },

    'test XQST0047 (3)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/mainModule6.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0047]'), 0, 'Is Error [XQST0047]');
    },
    
    'test XQST0047 (4)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/5.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 2, 'Number of markers');
        assert.equal(markers[0].type, 'warning', 'Type of marker');
        assert.equal(markers[1].type, 'warning', 'Type of marker');
    },
    
    'test XQST0049 (4)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/7.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getErrors();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0049]'), 0, 'Is Error [XQST0049]');
    },
    
    'test XQST0033  (1)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/3.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0033]'), 0, 'Is Error [XQST0033]');
    },
    
    'test XQST0033  (2)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/4.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0033]'), 0, 'Is Error [XQST0033]');
    },
    
    'test XQST0033  (3)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/6.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0033]'), 0, 'Is Error [XQST0033]');
    },
    
    'test XQST0088  (1)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/mainModule7.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        //assert.equal(markers.length, 2, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0088]'), 0, 'Is Error [XQST0088]');
        //error = markers[1];
        //assert.equal(error.type, 'error', 'Type of marker');
    },
    
    'test XQST0088  (2)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/noTns.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0088]'), 0, 'Is Error [XQST0088]');
    },
    
    
    'test Module Declaration': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/8.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XQST0048]'), 0, 'Is Error [XQST0048]');
    },
    
    'test Function Declaration': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/9.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        //assert.equal(error.message.indexOf('[XQST0088]'), 0, 'Is Error [XQST0088]');
    },
    
    'test unused namespace (1)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/10.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var warning = markers[0];
        assert.equal(warning.type, 'warning', 'Type of marker');
        //assert.equal(error.message.indexOf('[XQST0088]'), 0, 'Is Error [XQST0088]');
    },
    
    'test unused namespace (2)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/11.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var warning = markers[0];
        assert.equal(warning.type, 'warning', 'Type of marker');
        //assert.equal(error.message.indexOf('[XQST0088]'), 0, 'Is Error [XQST0088]');
    },
    
    'test unused namespace (3)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/12.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getErrors();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'test unused namespace (4)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/xqlint_queries/namespaces/13.xq', 'utf-8'), undefined, { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 2, 'Number of markers');
        var warning = markers[0];
        assert.equal(warning.type, 'warning', 'Type of marker');
        warning = markers[1];
        assert.equal(warning.type, 'warning', 'Type of marker');
    },

    'test resolution': function(){
        var linter = new XQLint('test', 'declare variable $foo:bar as xs:integer := 1; 1 + 1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
    },

    'test module function names (1)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/queries/rbtree.xq/map.xq', 'utf-8'), undefined, { styleCheck: false });
        var errors = linter.getErrors();
        assert.equal(errors.length, 0, 'Number of errors');
    },
    
    'test module function names (2)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/queries/rbtree.xq/rbtree.xq', 'utf-8'), undefined, { styleCheck: false });
        var errors = linter.getErrors();
        assert.equal(errors.length, 0, 'Number of errors');
    },

    'test module function names (3)': function(){
        var linter = new XQLint('test', fs.readFileSync('test/queries/rbtree.xq/rbtree2.xq', 'utf-8'), undefined, { styleCheck: false });
        var errors = linter.getErrors();
        var error = errors[1];
        assert.equal(error.message.indexOf('[XQST0048]'), 0, 'Is Error [XQST0048]');
    }


}).export(module);
