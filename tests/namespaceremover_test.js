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
  var NamespaceRemover = requirejs('lib/visitors/NamespaceRemover.js').NamespaceRemover;

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

  function testRemover(code, removePos, expected, expectedRem){
    var h = new JSONParseTreeHandler(code);
    var parser = new XQueryParser(code, h);
    parser.parse_XQuery();
    var ast = h.getParseTree();
    var remover = new NamespaceRemover(ast);
    console.log("Input:\n" + code);
    var removedAst = remover.removeNs(removePos);
    var result = astToText(removedAst);
    console.log("Output:\n" + result);
    assert.equal(result, expected);
    assert.equal(remover.getRemovedString(), expectedRem);
  }


  module.exports = {

    name: "NamespaceRemover",

    "test: no action": function() {
      var code = 'declare namespace bla = "example.org";\nimport module "http://expath.org/ns/http-client";\n1';
      var expected = code;
      var expectedRem = "";
      var removePos = {
        sl: -1,
        el: -1,
        sc: -1,
        ec: -1
      };
      testRemover(code, removePos, expected, expectedRem);
    },

   "test: remove1": function() {
      var code = 'declare namespace bla = "example.org";\nimport module "http://expath.org/ns/http-client";\n1';
      var expected = '\nimport module "http://expath.org/ns/http-client";\n1';
      var expectedRem =  'declare namespace bla = "example.org";';
      var removePos = {
        sl: 0,
        el: 0,
        sc: 0,
        ec: 36
      };
      testRemover(code, removePos, expected, expectedRem);
    },
   
   "test: remove2": function() {
      var code = 'declare namespace bla = "example.org";\nimport module "http://expath.org/ns/http-client";\n1';
      var expected = 'declare namespace bla = "example.org";\n\n1';
      var expectedRem = 'import module "http://expath.org/ns/http-client";';
      var removePos = {
        sl: 1,
        el: 1,
        sc: 0,
        ec: 47
      };
      testRemover(code, removePos, expected, expectedRem);
    }
  
  };

});

if (typeof module !== "undefined" && module === require.main) {
  require("asyncjs").test.testcase(module.exports).exec()
}
