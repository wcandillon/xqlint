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


  var NamespaceRemover = exports.NamespaceRemover = function(ast)
{

  function containsPos(a, b){
    var slDiff = b.sl - a.sl;
    var elDiff = a.el - b.el;
    var scDiff = b.sc - a.sc;
    var ecDiff = a.ec - b.ec;

    return (slDiff > 0 || !slDiff && scDiff >= 0) 
  && (elDiff > 0 || !elDiff && ecDiff >= 0);
  }

  function emptyNode(){
    return {
      name: "WS",
      value: "",
      children: []
    };
  }

  function isWS(str){
    return !(/\S/.test(str));
  }

  function getNodeValue(node) {
    var value = "";
    if(node.value === undefined) {
      for(var i = 0; i < node.children.length; i++)
      {
        var child = node.children[i];
        value += getNodeValue(child);
      }
    } else {
      value += node.value;
    }
    return value;
  }

  this.removedStr = "";

  this.Prolog = function(node){
    var _self = this;

    var Handler = function(){
      deleted = false;

      this.Import = 
      this.NamespaceDecl = function(node){
        if (!containsPos(node.pos, _self.removePos)){
          return _self[node.name](node);
        }else{
          deleted = true;
          _self.removedStr = getNodeValue(node);
          return emptyNode();
        }
      };

      this.Separator = function(node){
        if (deleted){
          deleted = false;
          _self.removedStr += ";";
          return emptyNode();
        }else{
          return _self.Separator(node);
        }
      };
    };

    return this.fromNode(node, new Handler());
  };

  this.fromNode = function(node, handler){
    var ret = {};
    ret.name = node.name;
    ret.children = this.visitChildren(node, handler);
    ret.value = node.value;
    ret.pos = node.pos;
    return ret;
  };

  this.everythingElse = function(node)
  {
    return this.fromNode(node);
  };

  // Stubs used in Handlers
  this.Import = this.everythingElse;                     
  this.NamespaceDecl = this.everythingElse;
  this.Separator = this.everythingElse;


  this.visit = function(node) {
    var name = node.name;

    if(typeof this[name] === "function")
      return this[name](node);
    else
      return this.everythingElse(node);
  };


  this.visitChildren = function(node, handler) {
    var ret = [];
    for(var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      if(handler !== undefined && typeof handler[child.name] === "function") {
        ret.push(handler[child.name](child));
      } else {
        ret.push(this.visit(child));
      }
    }
    return ret;
  };

  /**
   * Remove the namespace with its prefix being at 'pos' and return the resulting
   * ast
   */
  this.removeNs = function(pos){
    this.removePos = pos;
    return this.visit(ast);
  };

  this.getRemovedString = function(){
    return this.removedStr;
  };

};

});
