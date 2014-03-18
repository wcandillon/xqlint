'use strict';

var vows = require('vows');
var assert = require('assert');
//var fs = require('fs');

var XQLint = require('../lib/xqlint').XQLint;
var StaticContext = require('../lib/compiler/static_context').StaticContext;

vows.describe('Test Module URI Resolver').addBatch({

    'test 1': function(){
        var linter = new XQLint('test', 'import module namespace foo = "http://www.example.com"; $foo:bar');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'test 2': function(){
        var sctx = new StaticContext();
        sctx.setModuleResolver(function(){//uri, hints
            return {
                functions: {},
                variables: {
                    'http://www.example.com#bar': { type: 'VarDecl', pos: { sl:0, el:0, sc:0, ec:0 } }
                }
            };
        });
        var linter = new XQLint('test', 'import module namespace foo = "http://www.example.com"; $foo:bar', sctx);
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    }
}).export(module);