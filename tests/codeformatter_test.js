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

  var fs = require('fs');
  var path = require('path');

  function testFormat(code, expected){
    var h = new JSONParseTreeHandler(code);
    var parser = new XQueryParser(code, h);
    parser.parse_XQuery();
    var ast = h.getParseTree();
    var codeFormatter = new CodeFormatter(ast);
    var formatted = codeFormatter.format();
    if (expected.trim() != formatted.trim()){
      console.log("Input:\n" + code.trim());
      console.log("Expected:\n" + expected.trim());
      console.log("Formatted:\n" + formatted.trim());
    }
    assert.equal(expected.trim(), formatted.trim());
  }


  module.exports = {

    name: "Code Formatter"

  };

  var testFiles = fs.readdirSync(path.resolve(__dirname, "queries/xqlint")).sort();
  
  console.log("Parsing tests...");
  for (var i = 0; i < testFiles.length; i++){

    var testFile = path.resolve(__dirname, "queries/xqlint/" + testFiles[i]);
    if (testFile.indexOf(".xq", testFile.length - 3) === -1){
      continue;
    }
    var solFile = testFile.substring(0, testFile.length - 3) + ".txt";

    var testFileContent = fs.readFileSync(testFile, "utf8");
    var solFileContent = fs.readFileSync(solFile, "utf8");

    var testName = "test: " + testFiles[i].substring(0, testFiles[i].length - 3);

    console.log(testFile);

    addTestCase(testName, testFileContent, solFileContent);
  }

  function addTestCase(name, code, expected){
    module.exports[name] = function(){
      testFormat(code,expected);
    }
  };

});

if (typeof module !== "undefined" && module === require.main) {
  require("asyncjs").test.testcase(module.exports).exec()
}
