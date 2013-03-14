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
 
define(function(require, exports, module){
  
  var XQueryParser = require('lib/XQueryParser.js').XQueryParser;
  var JSONParseTreeHandler = require('lib/JSONParseTreeHandler.js').JSONParseTreeHandler;
  var Utils = require('lib/utils.js').Utils;  
  var Translator = require('lib/Translator.js').Translator;

  var uriResolver;
  
  var Compiler = exports.Compiler = function() {

    this.setUriResolver = function(aResolver){
      uriResolver = aResolver;
    };

    this.compile = function(code) {
      var h = new JSONParseTreeHandler(code);
      var parser = new XQueryParser(code, h);
      var ast = null;
      var error = null;
      try {
        parser.parse_XQuery();
     } catch(e) {
        if(e instanceof parser.ParseException) {
          h.closeParseTree();
          var pos = Utils.convertPosition(code, e.getBegin(), e.getEnd());
          var message = parser.getErrorMessage(e);
          if(pos.sc === pos.ec) {
            pos.ec++;
          }
          error = {
            pos: pos,
            type: "error",
            level: "error",
            rexError: true,
            message: message
          };
        } else {
          throw e;
        }
      }
      ast = h.getParseTree();
      if (this.showAST !== undefined){
        Utils.removeParentPtr(ast);
        console.log(JSON.stringify(ast, null, 2));
      }
      var translator = new Translator(ast);
      if (uriResolver){
        translator.setUriResolver(uriResolver);
      }
      ast = translator.translate();
      this.compileImports(ast); 
      if(error !== null) {
        ast.markers.push(error);  
        ast.error = true;
      }
      return ast;
    };


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

    this.compileImports = function(ast){
      if (!uriResolver){
        return;
      }
      // TODO do we need to check for duplicate imports?
      for (var i = 0; ast.imports && i < ast.imports.length; i++){
        var curImport = ast.imports[i];
        uriResolver.setWorkingDir(curImport.workingDir);
        var compiler = new Compiler(uriResolver);
       
        var sctx = compiler.compile(curImport.content).sctx;
        //console.log(JSON.stringify(curImport,null,2));
        //console.log(stringifyNoParents(sctx));
        // TODO copy public vardecls/functiondecls (check for duplicates?)
        // from import sctx to our main ast         
        // TODO add static error if import could not be found / compiled
      }
    };
  }
});
