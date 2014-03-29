'use strict';

var vows = require('vows');
var assert = require('assert');
//var fs = require('fs');

var StaticContext = require('../lib/compiler/static_context').StaticContext;
var XQLint = require('../lib/xqlint').XQLint;

vows.describe('Test Code Completion').addBatch({
    'test var (1)': function(){
        var source = 'let $bar := 1 return $bar, let $foo := 1 return $';
        var linter = new XQLint(source);
        var pos = { line: 0, col: source.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 1, 'Number of proposals');
        assert.equal(proposals[0].name, '$foo', '$foo variable');
    },
    
    'test var (2)': function(){
        var source = 'let $foo := 1 return $f';
        var linter = new XQLint(source);
        var pos = { line: 0, col: source.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 1, 'Number of proposals');
        assert.equal(proposals[0].name, '$foo', '$foo variable');

    },

    'test var (3)': function(){
        var source = 'declare namespace ex = "http://www.example.com"; declare variable $ex:hello := 1; $';
        var linter = new XQLint(source);
        var pos = { line: 0, col: source.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 1, 'Number of proposals');
        assert.equal(proposals[0].name, '$ex:hello', '$ex:hello variable');

    },
    
    'test expr (1)': function(){
        var source = 'declare function local:test($hello){ $hello }; l';
        var linter = new XQLint(source);
        var pos = { line: 0, col: source.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 1, 'Number of proposals');
        assert.equal(proposals[0].name, 'local:test($hello)', 'Prefix');
    },
    
    'test expr (2)': function(){
        var source = 'declare function local:test($hello){ $hello }; local:';
        var linter = new XQLint(source);
        var pos = { line: 0, col: source.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 1, 'Number of proposals');
        assert.equal(proposals[0].name, 'local:test($hello)', 'test function');
    },
    
    'test expr (3)': function(){
        var source = '';
        var linter = new XQLint(source);
        var pos = { line: 0, col: source.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 2, 'Number of proposals');
    },
    
    'test namespaces (1)': function(){
        var p1 = 'import module namespace ns="';
        var p2 = '";';
        var sctx = new StaticContext();
        sctx.availableModuleNamespaces.push('http://www.28msec.com/modules/http-reponse');
        var linter = new XQLint(p1 + p2, { staticContext: sctx });
        var pos = { line: 0, col: p1.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 1, 'Number of proposals');
        assert.equal(proposals[0].name, 'http://www.28msec.com/modules/http-reponse', 'module list');
    },
    
    'test namespaces (2)': function(){
        var p1 = 'import module namespace ns="http://28msec.com/modules';
        var p2 = '";';
        var sctx = new StaticContext();
        sctx.availableModuleNamespaces.push('http://www.28msec.com/modules/http-reponse');
        sctx.availableModuleNamespaces.push('http://zorba.io/modules/reflection');
        var linter = new XQLint(p1 + p2, { staticContext: sctx });
        var pos = { line: 0, col: p1.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 0, 'Number of proposals');
    },
    
    'test namespaces (3)': function(){
        var p1 = 'import module namespace ns="http://www.28msec.com/modules';
        var p2 = '";';
        var sctx = new StaticContext();
        sctx.availableModuleNamespaces.push('http://www.28msec.com/modules/http-reponse');
        sctx.availableModuleNamespaces.push('http://zorba.io/modules/reflection');
        var linter = new XQLint(p1 + p2, { staticContext: sctx });
        var pos = { line: 0, col: p1.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 1, 'Number of proposals');
        assert.equal(proposals[0].name, 'http://www.28msec.com/modules/http-reponse', 'module list');
    }
}).export(module);