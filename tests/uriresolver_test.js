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

var path = require('path');
var fs = require('fs');
var assert = require("./assertions");

var requirejs = require('../r');

var C9Resolver = requirejs('../lib/C9URIResolver').C9URIResolver;
var DefaultResolver = requirejs('../lib/DefaultURIResolver').DefaultURIResolver;
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
    
    name: "URIResolver",
    
    "test: local": function() {
      var filePath = 'lib/mylib.xq';

      var code = 'import module namespace mylib = "http://www.example.com/mylib" at "'
         + filePath + '";\nmylib:foo()';
      
      var compiler = new Compiler();
      compiler.setUriResolver(new DefaultResolver(__dirname));
      var compiled = compiler.compile(code);
      var sctx = compiled.sctx;
    },

    "test: local with 'file://'": function() {
      var code = 'import module namespace mylib = "http://www.example.com/mylib" at "file:///home/luchin/workspace/28msec/xqlint/tests/lib/mylib.xq";\nmylib:foo()';

      var compiler = new Compiler();
      compiler.setUriResolver(new DefaultResolver(__dirname));
      var compiled = compiler.compile(code);
      var sctx = compiled.sctx;
    },

    "test: erroneous path": function() {
      var code = 'import module namespace mylib = "http://www.example.com/mylib" at ":/home/l/mylib.xq";\nmylib:foo()';

      var compiler = new Compiler();
      compiler.setUriResolver(new DefaultResolver(__dirname));
      var compiled = compiler.compile(code);
      var sctx = compiled.sctx;
    },
    
    "test: local nonexisting": function() {
      var code = 'import module namespace mylib = "http://www.example.com/mylib" at "lib/nonexisting.xq";\nmylib:foo()';

      var compiler = new Compiler();
      compiler.setUriResolver(new DefaultResolver(__dirname));
      var compiled = compiler.compile(code);
      var sctx = compiled.sctx;
    }
};
});

if (typeof module !== "undefined" && module === require.main) {
    require("asyncjs").test.testcase(module.exports).exec()
}
