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


  var Positioner = exports.Positioner = function(ast)
{

  this.ptr = {
    l: 0,
    c: 0
  };

  this.addToPtr = function(value){
    if (value){
      var parts = value.split('\n');
      if (parts.length > 1){
        this.ptr.l += parts.length - 1;
        this.ptr.c = 0;
      }
      this.ptr.c += parts[parts.length-1].length;
    }
  };

  this.fromNode = function(node, handler){
    var ret = {};
    ret.name = node.name;
    ret.pos = {
      sl: this.ptr.l,
      sc: this.ptr.c
    }
    ret.children = this.visitChildren(node, handler);
    ret.value = node.value;
    this.addToPtr(ret.value);
    ret.pos.el = this.ptr.l;
    ret.pos.ec = this.ptr.c;
    return ret;
  };

  this.everythingElse = function(node)
  {
    return this.fromNode(node);
  };
  
  this.visit = function(node) {
    var name = node.name;
    if(typeof this[name] === "function")
      return this[name](node);
    else
      return this.everythingElse(node);
  };


  this.visitChildren = function(node, handler) {
    var ret = [];
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      if (handler !== undefined && typeof handler[child.name] === "function") {
        ret.push(handler[child.name](child));
      } else {
        ret.push(this.visit(child));
      }
    }
    return ret;
  };

  this.computePos = function(){
    return this.visit(ast);
  };

};

});
