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
var CodeFormatter = requirejs('../lib/visitors/CodeFormatter').CodeFormatter;

module.exports = {
    
    name: "Code Formatter",
    
    "test: simple code formatting": function() {
      var code = "for $i in (let, for) return return";
      var h = new JSONParseTreeHandler(code);
      var parser = new XQueryParser(code, h);
      parser.parse_XQuery();
      var ast = h.getParseTree();
      var codeFormatter = new CodeFormatter(ast);
      var formatted = codeFormatter.format();
      //console.log(formatted);
    },

    "test: simple enclosed expr": function() {
      var code = "<foo foo='{for $i in (1 to 10) return $i}' />";
      var h = new JSONParseTreeHandler(code);
      var parser = new XQueryParser(code, h);
      parser.parse_XQuery();
      var ast = h.getParseTree();
      var codeFormatter = new CodeFormatter(ast);
      var formatted = codeFormatter.format();
      assert.equal(code, formatted); 
    },

    "test: simple FLWOR": function() {
      var code = "let $a := let $b := 1 return $b return $a";
      var expected = "let $a := let $b := 1\n          return $b\nreturn $b";
      var h = new JSONParseTreeHandler(code);
      var parser = new XQueryParser(code, h);
      parser.parse_XQuery();
      var ast = h.getParseTree();
      var codeFormatter = new CodeFormatter(ast);
      var formatted = codeFormatter.format();
      assert.equal(code, formatted); 
    },

    "test: operators (1)": function() {
      var code = "1\t+1";
      var expected = "1 + 1";
      var h = new JSONParseTreeHandler(code);
      var parser = new XQueryParser(code, h);
      parser.parse_XQuery();
      var ast = h.getParseTree();
      var codeFormatter = new CodeFormatter(ast);
      var formatted = codeFormatter.format();
      assert.equal(code, formatted); 
    }

};
});

if (typeof module !== "undefined" && module === require.main) {
    require("asyncjs").test.testcase(module.exports).exec()
}
