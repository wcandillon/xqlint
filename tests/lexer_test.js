/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

if (typeof process !== "undefined") {
    require("amd-loader");
}

define(function(require, exports, module) {
"use strict";

var fs = require('fs');
var assert = require("./assertions");

var requirejs = require('../r');
var XQueryLexer = requirejs('../lib/XQueryLexer').XQueryLexer;
var lexer = new XQueryLexer();

module.exports = {
    
    name: "XQuery Lexer",
    
    "test: Comments": function() {
      var code = '(: Hello World (:  \n hello :) world :)';
      var lines = code.split("\n");
      //var state = undefined;
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
      var result = [];
      for(var i in lines) {
        var line = lines[i];
        var tokens = lexer.getLineTokens(line, state);
        var state = tokens.state;
        result.push(tokens);
      }
      console.log(JSON.stringify(result, null, 2));
      console.log("=============================================");
      console.log(JSON.stringify(expected, null, 2));
      console.log("=============================================");
      assert.equal(JSON.stringify(result[0]), JSON.stringify(expected[0]));
      assert.equal(JSON.stringify(result[1]), JSON.stringify(expected[1]));
    },
    
    "test: XML Comments": function() {
      var code = '<!-- Hello\nWorld --> 1\n 1';
      var lines = code.split("\n");
      //var state = undefined;
      var expected = [
        { tokens: 
          [ { type: 'comment', value: '<!--' },
            { type: 'comment', value: ' Hello' } ],
         state: '["start","XMLComment"]' },
       { tokens: 
          [ { type: 'comment', value: 'World ' },
            { type: 'comment', value: '-->' },
            { type: 'text', value: ' ' },
            { type: 'constant', value: '1' } ],
         state: '["start"]' },
       { tokens: 
          [ { type: 'text', value: ' ' },
            { type: 'constant', value: '1' } ],
         state: '["start"]' }
      ];
      var result = [];
      for(var i in lines) {
        var line = lines[i];
        var tokens = lexer.getLineTokens(line, state);
        var state = tokens.state;
        result.push(tokens);
      }
      assert.equal(JSON.stringify(result[0]), JSON.stringify(expected[0]));
      assert.equal(JSON.stringify(result[1]), JSON.stringify(expected[1]));
      assert.equal(JSON.stringify(result[2]), JSON.stringify(expected[2]));
    },
    
    "test: String": function() {
      var code = '"Hello&#160;World \"\"\n&amp;World"';
      var lines = code.split("\n");
      //var state = undefined;
      var expected = [
  {
    "tokens": [
      {
        "type": "string",
        "value": "\""
      },
      {
        "type": "string",
        "value": "Hello"
      },
      {
        "type": "constant.language.escape",
        "value": "&#160;"
      },
      {
        "type": "string",
        "value": "World "
      },
      {
        "type": "text",
        "value": "\"\""
      }
    ],
    "state": "[\"start\",\"QuotString\"]"
  },
  {
    "tokens": [
      {
        "type": "constant.language.escape",
        "value": "&amp;"
      },
      {
        "type": "string",
        "value": "World"
      },
      {
        "type": "string",
        "value": "\""
      }
    ],
    "state": "[\"start\"]"
  }
];
      var result = [];
      for(var i in lines) {
        var line = lines[i];
        var tokens = lexer.getLineTokens(line, state);
        var state = tokens.state;
        result.push(tokens);
      }
      console.log(JSON.stringify(result, null, 2));
      assert.equal(JSON.stringify(result[0]), JSON.stringify(expected[0]));
      assert.equal(JSON.stringify(result[1]), JSON.stringify(expected[1]));
    },
    
    "test: PI": function() {
      var code = '  <?php hello \n ?>    ';
      var lines = code.split("\n");
      //var state = undefined;
      var expected = [
  {
    "tokens": [
      {
        "type": "text",
        "value": "  "
      },
      {
        "type": "xml-pe",
        "value": "<?"
      },
      {
        "type": "xml-pe",
        "value": "php hello "
      }
    ],
    "state": "[\"start\",\"PI\"]"
  },
  {
    "tokens": [
      {
        "type": "xml-pe",
        "value": " "
      },
      {
        "type": "xml-pe",
        "value": "?>"
      },
      {
        "type": "text",
        "value": "    "
      }
    ],
    "state": "[\"start\"]"
  }
];
      var result = [];
      for(var i in lines) {
        var line = lines[i];
        var tokens = lexer.getLineTokens(line, state);
        var state = tokens.state;
        result.push(tokens);
      }
      assert.equal(JSON.stringify(result[0]), JSON.stringify(expected[0]));
      assert.equal(JSON.stringify(result[1]), JSON.stringify(expected[1]));
    },
    
    "test: XML ": function() {
      var code = 'xquery version "1.0";\n\nlet $message := "Hello World!"\nreturn <results>\n  <message>{$message}</message>\n</results>\n';
      code = "declare namespace namespace = 'http://www.example.com/'; 1";
      var lines = code.split("\n");
      //var state = undefined;
      var expected = [
      
    ];
      var result = [];
      
      for(var i in lines) {
        var line = lines[i];
        result[i] = [];
        var tokens = lexer.getLineTokens(line, state);
        var state = tokens.state;
        result[i].push(state);
        for(var j in tokens.tokens) {
          var token = tokens.tokens[j];
          result[i].push([token.type, token.value]);
        };
        //result.push(tokens);
      }

      console.log(JSON.stringify(result, null, 2));
      //assert.equal(JSON.stringify(result[0]), JSON.stringify(expected[0]));
      //assert.equal(JSON.stringify(result[1]), JSON.stringify(expected[1]));
    }
  };
});

if (typeof module !== "undefined" && module === require.main) {
    require("asyncjs").test.testcase(module.exports).exec()
}
