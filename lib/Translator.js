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
  var Translator = exports.Translator = function(ast, sctx){
    
    var markers = [];
    var outline = [];
    
    var isMainModule = true;
    
    var defaultFnNs = "http://www.w3.org/2005/xpath-functions";
    
    var namespaces = {
      "local": "http://www.w3.org/2005/xquery-local-functions",
      "xs": "http://www.w3.org/2001/XMLSchema",
      "fn": "http://www.w3.org/2005/xpath-functions",
      "an": "http://www.zorba-xquery.com/annotations",
      "db": "http://www.zorba-xquery.com/modules/store/static/collections/dml",
      "idx": "http://www.zorba-xquery.com/modules/store/static/indexes/dml",
      "zerr": "http://www.zorba-xquery.com/errors",
      "err": "http://www.w3.org/2005/xqt-error"
    };

    this.ModuleDecl = function(node) {
      isMainModule = false;
      var prefix = "";
      var ns = "";

      for(i in node.children) {
        var child = node.children[i];
        if(child.name === "NCName") {
          prefix = getNodeValue(child);
        } else if(child.name === "URILiteral") {
          ns = getNodeValue(child);
          ns = ns.substring(1, ns.length - 1);
        }
      }
     
      namespaces[prefix] = ns;
      return true;
    };

    function getNodeValue(node) {
      var value = "";
      if(node.value === undefined) {
        for(var i in node.children)
        {
          var child = node.children[i];
          value += getNodeValue(child);
        }
      } else {
        value += node.value;
      }
      return value;
    }
    
    this.visit = function(node) {
      var name = node.name;
      var skip = false;
     
     if(typeof this[name] === "function")
       skip = this[name](node) === true ? true : false ;
     
     if(!skip) {
       for(var i = 0; i < node.children.length; i++) {
         var child = node.children[i];   
         this.visit(child);
       }
     }
    };
    
    this.translate = function() {
      this.visit(ast);
      ast.markers = markers;
      ast.outline = outline;
      return ast;
    };
  };
});
