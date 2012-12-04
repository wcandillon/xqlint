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

var CodeFormatter = exports.CodeFormatter = function(ast)
{
  var indent = "  ";
  var currentIdent = "";
  var code = "";
  
  function pushIndent() {
    currentIdent += indent;
  }

  function popIndent() {
    currentIdent = currentIdent.substring(0, currentIdent.length - indent.length);
  }

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

  this.everythingElse = function(node) {
    if(node.value !== undefined) {
      code += node.value;
      return true;
    }
  };

  this.WS = function(node) {
    return true;
  };

  this.visit = function(node) {
      var name = node.name;
      var skip = false;
     
     if(typeof this[name] === "function")
       skip = this[name](node) === true ? true : false ;
     else
       skip = this.everythingElse(node) === true ? true : false;

     if(!skip) {
       this.visitChildren(node);
     }
  };
 
  this.visitChildren = function(node, handler) {
    for(var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      if(handler !== undefined && typeof handler[child.name] === "function") {
          handler[child.name](child);
      } else {
        this.visit(child);
      }
    }
  };
 
  this.format = function(opts) {
    this.visit(ast);
    return code;
  };
};

});
