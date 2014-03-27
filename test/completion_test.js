'use strict';

var vows = require('vows');
var assert = require('assert');
var fs = require('fs');

var XQLint = require('../lib/xqlint').XQLint;

vows.describe('Test Code Completion').addBatch({
    'test var (1)': function(){
        var source = 'let $foo := 1 return $';
        var linter = new XQLint('test', 'let $foo := 1 return $');
        var pos = { sl: 0, el: 0, sc: source.length-1, ec: source.length-1};
        var result = linter.getCompletions(pos);
        console.log(result);
    }
}).export(module);