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
var Compiler = requirejs('../lib/Compiler').Compiler;


function stringifyNoParents(json){
  return stringify(json, ['parent']);
}

function stringify(json, ignoreKeys){
return JSON.stringify(json, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (ignoreKeys.indexOf(key) !== -1) {
        return;
      }
    }
    return value;
  }, 2);
}

module.exports = {
    
    name: "Compiler/Translator",
    
    "test: functiondecl, vardecl, annotations, types": function() {
      var code = 'declare function local:foo($p1 as xs:string, $p2 as xs:integer) as xs:string {1};\ndeclare %private variable $var as xs:string external := "3";\n{%public(1, "2") variable $a as xs:integer := 2, $b as xs:string; $a}';
      var compiler = new Compiler();
      var compiled = compiler.compile(code);
      var sctx = compiled.sctx;

      // Test public VarDecls
      assert.equal(Object.keys(sctx.varDecls).length, 1);
      var varDecl = sctx.varDecls["var"];
      assert.ok(varDecl);
      assert.equal(varDecl.kind, "VarDecl");
      assert.ok(varDecl.isExternal);
      assert.equal(varDecl.type, "xs:string");
      assert.equal(Object.keys(varDecl.annotations).length, 1); 
      var anno = varDecl.annotations["private"];
      assert.ok(anno);
      assert.equal(anno.literals.length, 0);
      assert.ok(!anno.prefix);
      assert.equal(anno.name, "private");

      // Test FunctionDecls
      assert.equal(Object.keys(sctx.declaredFunctions).length, 1);
      assert.equal(Object.keys(sctx.declaredFunctions["local:foo"]).length, 1);
      var funDecl = sctx.declaredFunctions["local:foo"]["2"];
      assert.ok(funDecl);
      assert.ok(!Object.keys(funDecl.annotations).length);
      assert.ok(!funDecl.isExternal);            
      assert.equal(funDecl.type, "xs:string");
      assert.equal(funDecl.params.length, 2);
      assert.equal(funDecl.params[0].name, "$p1");
      assert.equal(funDecl.params[0].type, "xs:string");
      assert.equal(funDecl.params[1].name, "$p2");
      assert.equal(funDecl.params[1].type, "xs:integer");

      // Test outline
      var outline = compiled.outline;
      assert.equal(outline.length, 2);
      assert.equal(outline[0].name, "local:foo($p1, $p2)");
      assert.equal(outline[1].name, "$var");
    },
   
   "test: undeclared variable in assignment": function() {
      var code = "declare function local:test() {\nvariable $foo := $foo;\n$foo;\n};\nlocal:test()";
      var compiler = new Compiler();
      var compiled = compiler.compile(code);
      var sctx = compiled.sctx;
      var markers = sctx.markers;
      
      assert.equal(Object.keys(sctx.declaredFunctions).length,1);
      assert.ok(sctx.declaredFunctions["local:test"]["0"]);
      assert.ok(!Object.keys(sctx.varDecls).length);
    },
   
   "test: module variable": function() {
      var code = "declare variable $a := 1; $a";
      var compiler = new Compiler();
      var compiled = compiler.compile(code);
      var sctx = compiled.sctx;
      var markers = sctx.markers;

      assert.ok(!Object.keys(sctx.declaredFunctions).length);
      assert.equal(Object.keys(sctx.varDecls).length, 1);
      assert.ok(sctx.varDecls.a);
    },
   
   "test: xqdoc": function() {
      var code = "(: some comment :)\n(:~\n : This function has a\nsomewhat ill-formatted\n:   documentation\n :)\ndeclare function local:foo(){1};declare function local:foo2(){1}\n1";
      var compiler = new Compiler();
      var compiled = compiler.compile(code);
      var sctx = compiled.sctx;
      var markers = sctx.markers;
      
      assert.ok(!Object.keys(sctx.varDecls).length);
      assert.equal(Object.keys(sctx.declaredFunctions).length, 2);
      assert.equal(sctx.declaredFunctions["local:foo"]["0"]["doc"], "This function has a\nsomewhat ill-formatted\n  documentation");
      assert.ok(!sctx.declaredFunctions["local:foo2"]["0"]["doc"]);
    }

};
});

if (typeof module !== "undefined" && module === require.main) {
    require("asyncjs").test.testcase(module.exports).exec()
}
