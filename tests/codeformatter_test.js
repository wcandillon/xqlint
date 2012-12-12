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

  function testFormat(code, expected){
    var h = new JSONParseTreeHandler(code);
    var parser = new XQueryParser(code, h);
    parser.parse_XQuery();
    var ast = h.getParseTree();
    var codeFormatter = new CodeFormatter(ast);
    var formatted = codeFormatter.format();
    if (expected.trim() != formatted.trim()){
      console.log("Expected:\n" + expected.trim());
      console.log("Formatted:\n" + formatted.trim());
    }
    assert.equal(expected.trim(), formatted.trim());
  }


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
      var expected = code;
      testFormat(code, expected);
    },

    "test: simple FLWOR": function() {
      var code = "let $a := let $b := 1 return $b return $a";
      var expected = "let $a := let $b := 1\n    return $b\nreturn $b";
      testFormat(code, expected);    
    },


    "test: simple FLWOR 2": function() {
      var code ="let $set1:=(3,2,1) let $set2 := (1,2,3) for $x in $set2 for $y in $set1 return if ($x = $y) then true() else false()";
      var expected = "let $set1 := (3, 2, 1)\nlet $set2 := (1, 2, 3)\nfor $x in $set2\nfor $y in $set1\nreturn\n    if ($x = $y) then true() else false()";
      testFormat(code, expected);
    },

    "test: sequence": function() {
      var code = "( 1,   2,3, 4  )";
      var expected = "(1, 2, 3, 4)";
      testFormat(code, expected);
    },

    "test: arithmetic expression": function() {
      var code = "1+2 -(3   * 4)/5";
      var expected = "1 + 2 - (3 * 4) / 5";
      testFormat(code, expected);
    },

    "test: if-then-else one line": function() {
      var code = "if (true()) then 1 else 2";
      var expected = code;
      testFormat(code, expected);
    },

    "test: if-then-else wrapping": function() {
      var code = "if (true()) then \"looooooooooooooooooooooooooooooooong\" else 1";
      var expected = "if (true()) then\n    \"looooooooooooooooooooooooooooooooong\"\nelse\n    1";
      testFormat(code, expected);
    },

    "test: functiondecl and call": function() {
      var code = "declare function local:fun ($d as xs:decimal) as xs:decimal {$d}; local:fun(10)";
      var expected = "declare function local:fun($d as xs:decimal)\nas xs:decimal\n{\n    $d\n};\nlocal:fun(10)";
      testFormat(code, expected);
    },

    "test: typeswitch": function() {
      var code = "typeswitch ((1)) case text() return 1 case element (a) return 2 default return 3";
      var expected = "typeswitch ((1))\n    case text()\n        return 1\n    case element(a)\n        return 2\n    default\n        return 3";
      testFormat(code, expected);
    }

  };
});

if (typeof module !== "undefined" && module === require.main) {
  require("asyncjs").test.testcase(module.exports).exec()
}
