'use strict';

var vows = require('vows');
var assert = require('assert');
//var fs = require('fs');

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
    }
}).export(module);