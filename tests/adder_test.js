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
  var Adder = requirejs('lib/visitors/Adder.js').Adder;

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

  function testAddNamespaceDecl(code, namespaceDecl, expected){
    var h = new JSONParseTreeHandler(code);
    var parser = new XQueryParser(code, h);
    parser.parse_XQuery();
    var ast = h.getParseTree();
    var adder = new Adder(ast);
    console.log("Input:\n" + code);
    var newAst = adder.addNamespaceDecl(namespaceDecl);
    var result = astToText(newAst);
    console.log("Output:\n" + result);
    console.log("Expected:\n" + expected);
    //console.log("OutputAST:\n" + JSON.stringify(newAst, null, 2));
    assert.equal(result, expected);
  }

  function testAddModuleImport(code, imp, expected){
    var h = new JSONParseTreeHandler(code);
    var parser = new XQueryParser(code, h);
    parser.parse_XQuery();
    var ast = h.getParseTree();
    var adder = new Adder(ast);
    console.log("Input:\n" + code);
    var newAst = adder.addModuleImport(imp);
    var result = astToText(newAst);
    console.log("Output:\n" + result);
    //console.log("OutputAST:\n" + JSON.stringify(newAst, null, 2));
    assert.equal(result, expected);
  }

  module.exports = {

    name: "Adder",

    "test: addNamespaceDecl1": function() {
      var code = 'declare namespace exmpl = "exmpl.org";\n1';
      var expected = 'declare namespace exmpl = "exmpl.org";\ndeclare namespace newNs = "new.org";\n1';

      var decl = {
        NCName: "newNs",
        URILiteral: "new.org"
      };
      testAddNamespaceDecl(code, decl, expected);
    },
    
    "test: addNamespaceDecl2": function() {
      var code = '1';
      var expected = 'declare namespace newNs = "new.org";\n1';

      var decl = {
        NCName: "newNs",
        URILiteral: "new.org"
      };
      testAddNamespaceDecl(code, decl, expected);
    },
    
    "test: addNamespaceDecl3": function() {
      var code = '\n\ntst:bla();';
      var expected = 'declare namespace tst = "";\n\ntst:bla();';

      var decl = {
        NCName: "tst",
        URILiteral: ""
      };
      testAddNamespaceDecl(code, decl, expected);
    },
    
    "test: addModuleImport1": function() {
      var code = 'tst:bla();';
      var expected = 'import module namespace tst = "";\ntst:bla();';

      var imp = {
        NCName: "tst",
      };
      testAddModuleImport(code, imp, expected);
    },
    
    "test: addModuleImport2": function() {
      var code = 'tst:bla();';
      var expected = 'import module namespace tst = "tst.org";\ntst:bla();';

      var imp = {
        NCName: "tst",
        URILiterals: "tst.org"
      };
      testAddModuleImport(code, imp, expected);
    },
    
    "test: addModuleImport3": function() {
      var code = 'tst:bla();';
      var expected = 'import module namespace tst = "tst.org" at "tst2.org";\ntst:bla();';

      var imp = {
        NCName: "tst",
        URILiterals: ["tst.org", "tst2.org"]
      };
      testAddModuleImport(code, imp, expected);
    },
    
    "test: addModuleImport4": function() {
      var code = 'tst:bla();';
      var expected = 'import module namespace tst = "tst.org" at "tst2.org", "tst3.org";\ntst:bla();';
      
      var imp = {
        NCName: "tst",
        URILiterals: ["tst.org", "tst2.org", "tst3.org"]
      };
      testAddModuleImport(code, imp, expected);
    }



  };

});

if (typeof module !== "undefined" && module === require.main) {
  require("asyncjs").test.testcase(module.exports).exec()
}
