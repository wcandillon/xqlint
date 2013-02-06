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

module.exports = {
    
    name: "Unused variables",
    
    "test: simple flwor": function() {
      var code = "for $i in (1 to 10)\nreturn $i";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 0);
    },
    
    "test: simple flwor with unused let": function() {
      var code = "for $i in (1 to 10)\nlet $a := $i\nreturn $i";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 1);
      var marker = markers[0];
      assert.equal(marker.pos.sl, 1);
      assert.equal(marker.pos.sc, 5);
      assert.equal(marker.pos.el, 1);
      assert.equal(marker.pos.ec, 6);
      assert.equal(marker.type, "warning");
      assert.equal(marker.level, "warning");
      assert.equal(marker.message, "$a: unused variable.");
    },
    
    "test: complex flwor with unused let": function() {
      var code = "let $a := 1\nlet $b := $a\nlet $b := $b + 1\nlet $b := 2\nreturn $b";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 1);
      var marker = markers[0];
      assert.equal(marker.pos.sl, 2);
    },

    "test: complex flwor with no unused var": function() {
      var code = "let $items := ()\nlet $item := $items[1]\nlet $item := $item\nreturn $item";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 0);
    },

    "test: for binding with no unused var": function() {
      var code = "let $zips := ()\nfor $zip in tokenize($zips, \"\\n\")\nlet $zip := jn:parse-json($zip)\nreturn $zip";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 0);
    },

    "test: functx module": function() {
      var path = "./tests/queries/zorba/functx/functx1.xqlib";
      var code = fs.readFileSync(path, "UTF-8");
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 2);
      assert.equal(markers[0].pos.sl, 1780);
      assert.equal(markers[1].pos.sl, 1979);
    },
    
    "test: undeclared variable reference in module variable": function() {
      var code = "declare variable $test := $test;";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      //TODO: preprocess all prolog variable before and throw "static error [err:XQST0054]: variable must not depend on itself" if necessary
      //assert.equal(markers.length, 1);
      //assert.equal(markers[0].message.substring(0, 10), "[XPST0008]");
    },
    
    "test: undeclared variable reference in local variable (1)": function() {
      var code = "declare function local:test() {\nvariable $foo := $foo;\n$foo;\n};\nlocal:test()";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 1);
      assert.equal(markers[0].message.substring(0, 10), "[XPST0008]");
    },
    
    "test: undeclared variable reference in local variable (2)": function() {
      var code = "variable $foo := $foo;\n$foo";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 1);
      assert.equal(markers[0].message.substring(0, 10), "[XPST0008]");
    },
    
    "test: scripting statements (1)": function() {
      var code = "$a;\nvariable $a := 1;";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 2);
      assert.equal(markers[0].message.substring(0, 10), "$a: unused");
      assert.equal(markers[1].message.substring(0, 10), "[XPST0008]");
    },

    "test: scripting statements (2)": function() {
      var code = "variable $a := 1;$a;";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 0);
    }, 

    "test: module variable (1)": function() {
      var code = "declare variable $a := 1; $a;";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 0);
    }, 

    "test: module variable (2)": function() {
      var code = "import module namespace res = 'http://www.28msec.com/modules/http/response'; $res:bad-request;";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      //TODO: implement URI resolving
      assert.equal(markers.length, 0);
    },

    "test: group-by var decl": function() {
      var code = 'import module namespace c = "http://www.example.com/lib/collections";\n' +
                 '(: Contribution timeframe :)\n' +
                 'for $anwsers in db:collection($c:answers)\n' +
                 'group by $user := $anwsers("owner")("user_id")\n' + 
                 '(: Can be rewritten with ! :)\n' +
                 'let $last-activity := max(for $anwser in $anwsers return $anwser("last_activity_date"))\n' +
                 'where exists($user)\n' +
                 'order by $last-activity descending\n' + 
                 'return {\n' + 
                 '"user": $user,\n' +
                 '"last_activity": $last-activity\n' +  '}';
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 0);
    },

    "test: group-by": function(){
      var code = "for $token in ()\nlet $lc := $token\ngroup by $lc\nreturn 1";
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 0);
    },

    "test: undeclared variable": function() {
      var code = 'import module namespace http = "http://expath.org/ns/http-client";\n\nhttp:send-request($request)\n';
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 1);
    },

    "test: group by warning (1)": function() {
      var code = 'for $item in ()\ngroup by $item\nlet $count := count($item)\nreturn $count';
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 1);
      assert.equal(markers[0].message, "Count on grouping variable ($item) always returns 1.");
    },

    "test: group by warning (2)": function() {
      var code = 'declare default function namespace "http://www.example.com/"; for $item in ()\ngroup by $item\nlet $count := count($item)\nreturn $count';
      var compiler = new Compiler();
      var sctx = compiler.compile(code);
      var markers = sctx.markers;
      assert.equal(markers.length, 0);
    }
};
});

if (typeof module !== "undefined" && module === require.main) {
    require("asyncjs").test.testcase(module.exports).exec()
}
