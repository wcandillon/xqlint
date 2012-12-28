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
var XQueryParser = requirejs('../lib/XQueryParser').XQueryParser;
var JSONParseTreeHandler = requirejs('../lib/JSONParseTreeHandler').JSONParseTreeHandler;
var Compiler = requirejs('../lib/Compiler').Compiler;
var Utils = require('../lib/utils').Utils;  

var findNodes = function(ast, name) {
  var results = [];
  if(ast.name === name) {
    results.push(ast);
  }
  for(var i in ast.children)
  {
    var child = ast.children[i];
    var r = findNodes(child, name);
    results = results.concat(r);
  }
  return results;
};

module.exports = {
    
    name: "Variable Positions",
    
    "test: simple variable analysis": function() {
      var code = "declare function local:test() { variable $a := 1; $a := $a + 1; $a; $a }; local:test()";
      var compiler = new Compiler();
      var ast = compiler.compile(code);
      var sctx = ast.sctx;
      var nodes = findNodes(ast, "VarRef");
      var ref = nodes[nodes.length - 1];
      var currentSctx = Utils.findNode(sctx, { line: ref.pos.sl, col: ref.pos.sc });
      var varRefs = currentSctx.getVarRefs("a");
      var varDecl = currentSctx.getVarDecl("a");
      
      //{ sl: 0, sc: 56, el: 0, ec: 58 }
      assert.equal(varRefs[0].pos.sl, 0);
      assert.equal(varRefs[0].pos.sc, 57);
      assert.equal(varRefs[0].pos.el, 0);
      assert.equal(varRefs[0].pos.ec, 58);
      //{ sl: 0, sc: 64, el: 0, ec: 66 }
      assert.equal(varRefs[1].pos.sl, 0);
      assert.equal(varRefs[1].pos.sc, 65);
      assert.equal(varRefs[1].pos.el, 0);
      assert.equal(varRefs[1].pos.ec, 66);
      //{ sl: 0, sc: 68, el: 0, ec: 70 }
      assert.equal(varRefs[2].pos.sl, 0);
      assert.equal(varRefs[2].pos.sc, 69);
      assert.equal(varRefs[2].pos.el, 0);
      assert.equal(varRefs[2].pos.ec, 70);
     
      //{ sl: 0, sc: 41, el: 0, ec: 43 }
      assert.equal(varDecl.pos.sl, 0);
      assert.equal(varDecl.pos.sc, 42);
      assert.equal(varDecl.pos.el, 0);
      assert.equal(varDecl.pos.ec, 43);
    } 
};
});

if (typeof module !== "undefined" && module === require.main) {
    require("asyncjs").test.testcase(module.exports).exec()
}
