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
    expected = expected.trim();
    formatted = formatted.trim();
    code = code.trim();
    
    var green = '\x1b[32m';
    var red = '\x1b[31m';
    var reset = '\x1b[0m';
    var yellow = '\x1b[33m';
    var blue = '\x1b[34m';

    if (expected != formatted){
      console.log("Input:\n" + blue + code + reset);
      console.log("Expected:\n" + green + expected + reset);
      console.log("Formatted:\n" + red + formatted + reset);
      var parts1 = expected.split('\n');
      var parts2 = formatted.split('\n');
      for (var i = 0; i < parts1.length && i < parts2.length; i++){ 
        var printed = false;
        var ex = parts1[i];
        var fo = parts2[i];
        for (var j = 0; !printed && j < ex.length && j < fo.length; j++){
          if (ex[j] !== fo[j]){
            printed = true;
            console.log(yellow + "Line " + (i+1) + ", first diff @char" + (j+1) + reset);
            console.log(green + ex + reset);
            console.log(red + fo + reset); 
          }
        }
        if (ex.length !== fo.length && !printed){
          console.log(yellow + "Line " + (i+1) + " differs in length" + reset);
          printed = true;
          console.log(green + ex + reset);
          console.log(red + fo + reset);           
        }
      }
      if (parts1.length !== parts2.length){
        console.log(yellow + "Different #lines" + reset);
      }
   }
    assert.equal(expected, formatted);
  }


  module.exports = {

    name: "Code Formatter"

  };

  function parseTestFiles(dir, recursive){
    if (dir.charAt(dir.length - 1) !== '/'){
      dir += '/';
    }
    var testFiles = fs.readdirSync(path.resolve(__dirname, dir)).sort();

    
    var childDirs = [];

    for (var i = 0; i < testFiles.length; i++){

      var testFile = path.resolve(__dirname, dir + testFiles[i]);
      
      var stats = fs.statSync(testFile);
      if (stats.isDirectory()){
        childDirs.push(testFile);
        continue;
      }

      if (testFile.indexOf(".xq", testFile.length - 3) === -1){
        continue;
      }
      var solFile = testFile.substring(0, testFile.length - 3) + ".txt";

      if (!fs.existsSync(solFile)){
        continue;
      }

      var testFileContent = fs.readFileSync(testFile, "utf8");
      var solFileContent = fs.readFileSync(solFile, "utf8");

      var testName = "test: " + dir.substring(dir.lastIndexOf('xqlint') + 7 )+ testFiles[i].substring(0, testFiles[i].length - 3);

      console.log(testFile);

      addTestCase(testName, testFileContent, solFileContent);
    }


    for (var i = 0; i < childDirs.length; i++){
      parseTestFiles(childDirs[i], true);
    }
  }


  var expectFail = ['zorba/block/block_and_type', 'zorba/bang/8',
      'zorba/bang/7', 'zorba/bang/6', 'zorba/bang/13',
      'zorba/annotations/annot-unknown-03', 'window/sliding01',
      'rest/simpleformat', 'comments/comment13', 'comments/comment12',
      'comments/comment11', 'comments/comment10', 'comments/comment09'
        ];

  function addTestCase(name, code, expected){
    module.exports[name] = function(){
      if (expectFail.indexOf(name.substring(6)) == -1){
      testFormat(code,expected);
      }
    }
  };

  console.log("Parsing tests...");
  var args = process.argv;
  var dir = args.indexOf("-d");
  if (dir != -1){
    var dirPath = args[dir + 1];
    if (dirPath.substring(0, 6) === 'tests/'){
      dirPath = dirPath.substring(6);
    }
  } else{
    var dirPath = "queries/xqlint";
  }
  parseTestFiles(dirPath, true);

});

if (typeof module !== "undefined" && module === require.main) {
  require("asyncjs").test.testcase(module.exports).exec()
}
