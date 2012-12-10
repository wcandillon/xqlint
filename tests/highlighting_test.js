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
var SyntaxHighlighter = requirejs('../lib/visitors/SyntaxHighlighter').SyntaxHighlighter;

function getTokens(code)
{
  var h = new JSONParseTreeHandler(code);
  var parser = new XQueryParser(code, h);
  parser.parse_XQuery();
  var ast = h.getParseTree();
  var visitor = new SyntaxHighlighter(ast);
  return visitor.getTokens();
}

//TODO: test highlighting of: replace json value of $tweet("created_at") with $dateTime;
//TODO: check highlighting for true, null, false in JSONiq.
module.exports = {
    
    name: "Semantic Highlighter",
    
    "test: simple flwor": function() {
      var code = "for $i in (let, for)\nreturn return";
      var tokens = getTokens(code);
      var reference = {
        "lines":[
          [ {"value":"","type":"text"},{"value":"","type":"text"},{"value":"for","type":"keyword"},{"value":" ","type":"text"},
            {"value":"$i","type":"variable"},{"value":" ","type":"text"},{"value":"in","type":"keyword"},{"value":" ","type":"text"},
            {"value":"(","type":"text"},{"value":"let","type":"support.function"},{"value":"","type":"text"},{"value":",","type":"text"},
            {"value":" ","type":"text"},{"value":"for","type":"support.function"},{"value":"","type":"text"},{"value":")","type":"text"},{"value":"","type":"text"} ],
          [{"value":"","type":"text"},{"value":"return","type":"keyword"},{"value":" ","type":"text"},{"value":"return","type":"support.function"},{"value":"","type":"text"},{"value":"","type":"text"}]
        ],
        "states":["start"]
      };
      assert.equal(JSON.stringify(tokens), JSON.stringify(reference));
    }
};
});

if (typeof module !== "undefined" && module === require.main) {
    require("asyncjs").test.testcase(module.exports).exec()
}
