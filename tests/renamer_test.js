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

  var assert = require("./assertions");

  var requirejs = require('../r');
  var XQueryParser = requirejs('../lib/XQueryParser').XQueryParser;
  var JSONParseTreeHandler = requirejs('../lib/JSONParseTreeHandler').JSONParseTreeHandler;
  var Renamer = requirejs('lib/visitors/Renamer.js').Renamer;

  var fs = require('fs');
  var path = require('path');

  function astToText(node){
      if (node !== undefined){
        var resText = "";
        if (node.value !== undefined) {
          resText += node.value;
        }
        for (var i = 0; i < node.children.length; i++){
          resText += astToText(node.children[i]);
        }
        return resText;
      }else{
        return "";
      }
    };

  function testRename(code, renamePos, toName, expected){
    var h = new JSONParseTreeHandler(code);
    var parser = new XQueryParser(code, h);
    parser.parse_XQuery();
    var ast = h.getParseTree();
    var renamer = new Renamer(ast);
    console.log("Input:\n" + code);
    var newAst = renamer.rename(renamePos, toName);
    var result = astToText(newAst);
    console.log("Output:\n" + result);
    assert.equal(result, expected);
  }

  function testRenamePrefix(code, renamePos, toPrefix, expected){
    var h = new JSONParseTreeHandler(code);
    var parser = new XQueryParser(code, h);
    parser.parse_XQuery();
    var ast = h.getParseTree();
    var renamer = new Renamer(ast);
    console.log("Input:\n" + code);
    var newAst = renamer.renamePrefix(renamePos, toPrefix);
    var result = astToText(newAst);
    console.log("Output:\n" + result);
    assert.equal(result, expected);
  }


  module.exports = {

    name: "Renamer",

    "test: no action1": function() {
      var code = 'declare namespace test = "test.org";\ntestt:bla();';
      var expected =  code;
      var renamePos = {
        sl: -1,
        el: -1,
        sc: 0,
        ec: 0 
      };
      testRename(code, renamePos, "unused", expected);
    },
    
    "test: no action2": function() {
      var code = 'declare namespace test = "test.org";\ntestt:bla();';
      var expected =  code;
      var renamePos = {
        sl: -1,
        el: -1,
        sc: 0,
        ec: 0 
      };
      testRenamePrefix(code, renamePos, "unused", expected);
    },

   "test: rename1": function() {
      var code = 'declare namespace test = "test.org";\ntestt:bla();';
      var expected = 'declare namespace testt = "test.org";\ntestt:bla();';
      var renamePos = {
        sl: 0,
        el: 0,
        sc: 18,
        ec: 22 
      };
      testRename(code, renamePos, "testt", expected);
   },

   "test: rename2": function() {
      var code = 'declare namespace test = "test.org";\ntestt:bla();';
      var expected = 'declare namespace test = "test.org";\ntest:bla();';
      var renamePos = {
        sl: 1,
        el: 1,
        sc: 0,
        ec: 8
      };
      testRename(code, renamePos, "test:bla", expected);
   },

   "test: rename3": function() {
      var code = 'declare namespace test = "test.org";\ntestt:bla();';
      var expected = 'declare namespace testt = "test.org";\ntestt:bla();';
      var renamePos = {
        sl: 0,
        el: 0,
        sc: 0,
        ec: 35
      };
      testRename(code, renamePos, "testt", expected);
   },

   "test: renamePrefix1": function() {
      var code = 'declare namespace test = "test.org";\ntestt:bla();';
      var expected = 'declare namespace pref:test = "test.org";\ntestt:bla();';
      var renamePos = {
        sl: 0,
        el: 0,
        sc: 18,
        ec: 22 
      };
      testRenamePrefix(code, renamePos, "pref", expected);
   },

   "test: renamePrefix2": function() {
      var code = 'declare namespace test = "test.org";\ntestt:bla();';
      var expected = 'declare namespace test = "test.org";\ntest:bla();';
      var renamePos = {
        sl: 1,
        el: 1,
        sc: 0,
        ec: 8 
      };
      testRenamePrefix(code, renamePos, "test", expected);
   }
  }
});

if (typeof module !== "undefined" && module === require.main) {
  require("asyncjs").test.testcase(module.exports).exec()
}
