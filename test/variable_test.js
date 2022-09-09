'use strict';

var vows = require('vows');
var assert = require('assert');
var fs = require('fs');

var XQLint = require('../lib/xqlint').XQLint;

vows.describe('Test Variable declarations').addBatch({
    'XPST0081 (1)': function(){
        var linter = new XQLint('let $bar:hello := 1 return 1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XPST0081]'), 0, 'Is Error [XPST0081]');
    },
    
    'XPST0081 (2)': function(){
        var linter = new XQLint('declare namespace bar = "http://www.example.com"; let $bar:hello := 1 return 1');
        var markers = linter.getErrors();
        assert.equal(markers.length, 0, 'Number of markers');
        markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
    },
    
    'XPST0081 (3)': function(){
        var linter = new XQLint('let $Q{http://www.example.com}hello := 1 return 1');
        var markers = linter.getErrors();
        assert.equal(markers.length, 0, 'Number of markers');
        markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
    },
    
    'XPST0081 (5)': function(){
        var linter = new XQLint('let $foo := 1 return $foo');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'XPST0081 (6)': function(){
        var linter = new XQLint('declare function local:foo($ex:foo as xs:integer) as xs:integer {  $ex:foo }; local:foo(1)');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 2, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XPST0081]'), 0, 'Is Error [XPST0081]');
        error = markers[1];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XPST0081]'), 0, 'Is Error [XPST0081]');
    },
    
    'XPST0081 (7)': function(){
        var linter = new XQLint('declare namespace ex = "http://example.com"; declare function local:foo($ex:foo as xs:integer) as xs:integer {  $ex:foo }; local:foo(1)');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'XPST0008 (1)': function(){
        var linter = new XQLint('let $foo := 1 return $bar');
        var markers = linter.getErrors();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XPST0008]'), 0, 'Is Error [XPST0008]');
    },

    'XPST0008 (2)': function(){
        var linter = new XQLint('for $hello in 1 group by $var := 2 return $var');
        var markers = linter.getErrors();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'XPST0008 (3)': function(){
        var linter = new XQLint('for $var in 1 return $var');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'XPST0008 (4)': function(){
        var linter = new XQLint('for $var in 1 return $var');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
        
    },

    'XPST0008 (5)': function(){
        var linter = new XQLint('for $var in $var return $var');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        var error = markers[0];
        assert.equal(error.type, 'error', 'Type of marker');
        assert.equal(error.message.indexOf('[XPST0008]'), 0, 'Is Error [XPST0008]');
    },

    'XPST0008 (6)': function(){
        var linter = new XQLint('for $hello in 1 group by $var := $var return $var');
        var markers = linter.getErrors();
        assert.equal(markers.length, 1, 'Number of markers');
        assert.equal(markers[0].message.indexOf('[XPST0008]'), 0, 'Is Error [XPST0008]');
    },
    
    'Inline function parameters': function(){
        var linter = new XQLint(fs.readFileSync('test/xqlint_queries/variables/1.xq', 'utf-8'));
        var markers = linter.getErrors();
        assert.equal(markers.length, 0, 'Number of errors');
        markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of warnings');
    },
    
    'XQST0048 (1)': function(){
        var linter = new XQLint('module namespace foo = "http://www.example.com"; declare namespace ex = "http://28msec.com"; declare variable $ex:bar := 1;');
        var markers = linter.getErrors();
        assert.equal(markers.length, 1, 'Number of markers');
        assert.equal(markers[0].message.indexOf('[XQST0048]'), 0, 'Is Error [XQST0048]');
    },
    
    'XQST0048 (2)': function(){
        var linter = new XQLint('module namespace foo = "http://www.example.com"; declare namespace ex = "http://28msec.com"; declare function ex:bar(){ 1 };');
        var markers = linter.getErrors();
        assert.equal(markers.length, 1, 'Number of markers');
        assert.equal(markers[0].message.indexOf('[XQST0048]'), 0, 'Is Error [XQST0048]');
    },
    
    'XQST0048 (3)': function(){
        var linter = new XQLint('module namespace foo = "http://www.example.com"; declare namespace ex = "http://28msec.com"; declare function foo:bar($ex:hello){ 1 };');
        var markers = linter.getErrors();
        assert.equal(markers.length, 0, 'Number of markers');
    },
    
    'unused variable (1)': function(){
        var linter = new XQLint('let $foo := 1 return 1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
        assert.equal(markers[0].type, 'warning', 'Type of marker');
    },
    
    'unused variable (2)': function(){
        var linter = new XQLint('let $foo := 2\nlet $foo := 1\nlet $bar := $foo\nreturn $foo');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 2, 'Number of markers');
        assert.equal(markers[0].type, 'warning', 'Type of marker');
        assert.equal(markers[1].type, 'warning', 'Type of marker');
    },

    'unused variable (3)': function(){
        var linter = new XQLint('module namespace foo = "http://www.example.com"; declare variable $foo:bar as xs:integer := 1;');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (4)': function(){
        var linter = new XQLint('module namespace foo = "http://www.example.com"; declare %fn:private variable $foo:bar as xs:integer := 1;');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
    },

    'unused variable (5)': function(){
        var linter = new XQLint('declare variable $foo:bar as xs:integer := 1; 1 + 1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
    },

    'unused variable (6)': function(){
        var linter = new XQLint('declare variable $bar as xs:integer := 1; 1 + 1');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
    },

    'unused variable (7)': function(){
        var linter = new XQLint('declare variable $bar as xs:integer := 1; let $foo := 1 let $foo := $foo + $bar return $foo');
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (8)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/rendering.jq', 'utf-8'), { styleCheck: false });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (9)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/update-report-schema.jq', 'utf-8'), { styleCheck: false, fileName: 'report.jq' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (10)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/eval.jq', 'utf-8'), { styleCheck: false, fileName: 'report.jq', processor: '28msec' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (11)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/quantifier.jq', 'utf-8'), { styleCheck: false, fileName: 'report.jq', processor: '28msec' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (12)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/quantifier2.jq', 'utf-8'), { styleCheck: false, fileName: 'report.jq', processor: '28msec' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (13)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/components.jq', 'utf-8'), { styleCheck: false, fileName: 'report.jq', processor: '28msec' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (14)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/modelstructure-for-component.jq', 'utf-8'), { styleCheck: false, fileName: 'report.jq', processor: '28msec' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    },

    'unused variable (15)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/unused-local-function.jq', 'utf-8'), { styleCheck: false, fileName: 'report.jq' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 1, 'Number of markers');
    },

    'unused variable (16)': function(){
        var linter = new XQLint(fs.readFileSync('test/queries/28msec/function-item.jq', 'utf-8'), { styleCheck: false, fileName: 'report.jq' });
        var markers = linter.getMarkers();
        assert.equal(markers.length, 0, 'Number of markers');
    }

    //Test private fn decl
    //Test complex expressions
    //Test scripting
}).export(module);
