
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

  var DEBUG = false;

  var assert = require("./assertions");

  var requirejs = require('../r');
  var FormatWriter = requirejs('../lib/FormatWriter').FormatWriter;

  var indent = "  ";

  function testResult(writer, expected){
    var formatted = writer.getResult();
    if (formatted !== expected){
      console.log("Expected:\n" + expected);
      console.log("Formatted:\n" + formatted);
    }
    assert.equal(formatted, expected);
  }

  module.exports = {

    name: "FormatWriter",

  "test: empty": function() {
    var w = new FormatWriter();
    w.DEBUG = DEBUG;
    assert.equal(w.getResult(), "");
  },
  "test: single space": function() {
    var w = new FormatWriter();
    w.DEBUG = DEBUG;
    w.appendStr(" ");
    assert.equal(w.getResult(), "");
  },
  "test: blank line": function() {
    var w = new FormatWriter();
    w.DEBUG = DEBUG;
    w.postNewLine();
    assert.equal(w.getResult(), "\n");
  },
  "test: blank lines with WS": function() {
    var w = new FormatWriter();
    w.DEBUG = DEBUG;
    w.appendStr("\n   \n");
    assert.equal(w.getResult(), "\n\n");
  },
  "test: text": function() {
    var w = new FormatWriter();
    w.DEBUG = DEBUG; 
    w.appendStr("text");
    assert.equal(w.getResult(), "text");
  },
  "test: text with spaces": function() {
    var w = new FormatWriter();
    w.DEBUG = DEBUG; 
    w.appendStr(" text with spaces  ");
    assert.equal(w.getResult(), "text with spaces  ");
  },
  "test: text on several lines": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.appendStr("text\non\nseveral\nlines\n");
    testResult(w, "text\non\nseveral\nlines\n");
  },
  "test: indentation 1": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.appendStr("level 1");
    w.pushIndent();
    w.postNewLine();
    w.appendStr("level 2");
    w.popIndent();
    testResult(w, "level 1\n  level 2");
  },
  "test: indentation 2": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.appendStr("level 1 ");
    w.pushIndent();
    w.appendStr(" \n ");
    w.appendStr("level 2");
    testResult(w,  "level 1  \n  level 2");
  },
  "test: indentation 3": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.appendStr("level 1\n");
    w.pushIndent();
    w.appendStr("    level 1");
    testResult(w, "level 1\nlevel 1");
  },
  "test: indentation 4": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.appendStr("level 1");
    w.pushIndent();
    w.postNewLine();
    w.appendStr("level 2");
    w.pushIndent();
    w.postNewLine();
    w.appendStr("level 3");
    w.popIndent();
    w.postNewLine();
    w.appendStr("level 2");
    w.popIndent();
    w.postNewLine();
    w.appendStr("level 1");
    w.pushIndent();
    w.postNewLine();
    w.appendStr("level 2");
    w.popIndent();
    w.postNewLine();
    testResult(w, "level 1\n  level 2\n    level 3\n  level 2\nlevel 1\n  level 2\n");
  },
  "test: 3xpostNewLine": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.postNewLine();
    w.postNewLine();
    w.postNewLine();
    testResult(w, "\n");
  },
  "test: postNewLine(3)": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.postNewLine(3);
    testResult(w, "\n\n\n");
  },
  "test: postNewLine(1) postNewLine(3)": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.postNewLine(1);
    w.postNewLine(3);
    testResult(w, "\n\n\n");
  },
  "test: postNewLine(3) postNewLine(1)": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.postNewLine(3);
    w.postNewLine(1);
    testResult(w, "\n\n\n");
  },

  "test: postNewLine(1) postNewLine(3) postNewLine(1)": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.postNewLine(1);
    w.postNewLine(3);
    w.postNewLine(1);
    testResult(w, "\n\n\n");
  },
  "test: newlines 4": function() {
    var w = new FormatWriter(indent);
    w.DEBUG = DEBUG; 
    w.postNewLine();
    w.postNewLine();
    w.postNewLine();
    testResult(w, "\n");
  }

};

});

if (typeof module !== "undefined" && module === require.main) {
  require("asyncjs").test.testcase(module.exports).exec()
}
