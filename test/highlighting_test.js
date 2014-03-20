'use strict';

var vows = require('vows');
var assert = require('assert');
var fs = require('fs');

var XQueryLexer = require('../lib/lexers/XQueryLexer').XQueryLexer;
var JSONiqLexer = require('../lib/lexers/JSONiqLexer').JSONiqLexer;


vows.describe('Test Syntax Highlighting').addBatch({
    'test: JSONiq context item': function(){
        var code = fs.readFileSync('test/highlighting_tests/1.jq', 'utf-8');
        var expected = JSON.parse(fs.readFileSync('test/highlighting_tests/1.json', 'utf-8'));
        var lines = code.split('\n');
        var lexer = new JSONiqLexer();
        var result = [];
        var line, tokens, state;
        for(var i in lines) {
            line = lines[i];
            tokens = lexer.getLineTokens(line, state);
            state = tokens.state;
            result.push(tokens);
        }
        assert.deepEqual(result, expected, 'Check result');
    },
    
    'test: Comments': function() {
        var code = '(: Hello World (:  \n hello :) world :)';
        var lines = code.split('\n');
        var expected = [
            { tokens:
                [ { type: 'comment', value: '(:' },
                { type: 'comment', value: ' Hello World ' },
                { type: 'comment', value: '(:' },
                { type: 'comment', value: '  ' } ],
            state: '["start","Comment","Comment"]' },
            { tokens:
                [ { type: 'comment', value: ' hello ' },
                { type: 'comment', value: ':)' },
                { type: 'comment', value: ' world ' },
                { type: 'comment', value: ':)' } ],
            state: '["start"]' }
        ];
        var lexer = new XQueryLexer();
        var result = [];
        var line, tokens, state;
        for(var i in lines) {
            line = lines[i];
            tokens = lexer.getLineTokens(line, state);
            state = tokens.state;
            result.push(tokens);
        }
        assert.equal(JSON.stringify(result[0]), JSON.stringify(expected[0]));
        assert.equal(JSON.stringify(result[1]), JSON.stringify(expected[1]));
    }
}).export(module);