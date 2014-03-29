'use strict';

var vows = require('vows');
var assert = require('assert');
//var fs = require('fs');

var XQLint = require('../lib/xqlint').XQLint;

vows.describe('Test Code Completion').addBatch({
    'test var (1)': function(){
        var source = 'let $foo := 1 return $f';
        var linter = new XQLint(source);
        var pos = { line: 0, col: source.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 1, 'Number of proposals');
        assert.equal(proposals[0].name, '$foo', '$foo var');

    },

    'test expr (1)': function(){
        var source = 'declare function local:test($hello){ $hello }; l';
        var linter = new XQLint(source);
        var pos = { line: 0, col: source.length };
        var proposals = linter.getCompletions(pos);
        assert.equal(proposals.length, 2, 'Number of proposals');
        console.log(proposals);
        
        //assert.equal(proposals[0].name, 'local:', 'Prefix');
    }
}).export(module);