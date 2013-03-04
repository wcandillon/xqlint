
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

  var Positioner = require("./Positioner.js").Positioner;
  //var Positioner = require("/ext/xquery/lib/visitors/Positioner").Positioner;


  var CountAssignmentReplacer = exports.CountAssignmentReplacer = function(ast)
{

  this.addedStr = "";
  this.removedStr = "";
  this.replacePos = {sl: -1, el: -1, sc: -1, ec: -1};

  function containsPos(a, b){
    var slDiff = b.sl - a.sl;
    var elDiff = a.el - b.el;
    var scDiff = b.sc - a.sc;
    var ecDiff = a.ec - b.ec;

    return (slDiff > 0 || !slDiff && scDiff >= 0) 
  && (elDiff > 0 || !elDiff && ecDiff >= 0);
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


  this.FLWORExpr = function(flworExprNode){
    var _self = this;
    
    if (containsPos(flworExprNode.pos, _self.replacePos)){
     // We have to replace a count assignment in this FLWORExpr 
     // I.e. we need to change:   IntermediateClause -> InitialClause -> LetClause
     //                     to:   IntermediateClause -> CountClause
     for (var i = 1; i < flworExprNode.children.length - 1; i++){
       var icNode = flworExprNode.children[i];
       if (containsPos(icNode.pos, _self.replacePos)){
         // This is the IntermediateClause we have to change
         var countIndex = 0;
         for (; icNode.children[countIndex].name !== 'InitialClause'; countIndex++){}

         // The VarName to be used
         var varName = 
           getNodeValue(icNode.children[countIndex].children[0].children[2].children[1]);
          _self.addedStr = "count $" + varName;
        
         // Replace
         _self.removedStr = getNodeValue(icNode.children[countIndex]);
         icNode.children[countIndex] = _self.nodeCountClause(varName);

         break;
       }
     }
    }

    return _self.everythingElse(flworExprNode);
  };

  this.nodeWithValue = function(name, value){
    return {
      name: name,
      value: value,
      children: []
    };
  };

  this.nodeTOKEN = function(val){
    return this.nodeWithValue("TOKEN", val);
  };

  this.nodeVarName = function(val){
    var eqName = this.nodeWithValue("EQName", val); 
    return {
      name: "VarName",      
      children: [eqName]
    };
  };
 
  this.nodeWS = function(val){
    return this.nodeWithValue("WS", val);
  }; 
  
  this.nodeCountClause = function(varName){
    var ret = {
      name: "CountClause",
      children: []
    };
    ret.children.push(this.nodeTOKEN("count"));
    ret.children.push(this.nodeWS(" "));
    ret.children.push(this.nodeTOKEN("$"));
    ret.children.push(this.nodeVarName(varName));

    return ret;
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

  this.copyAst = function(node){
    var newNode = {
      name: node.name,
      children: [],
      value: node.value,
      pos: node.pos,
      getParent: node.getParent
    };

    for (var i = 0; i < node.children.length; i++){
      newNode.children.push(this.copyAst(node.children[i]));
    }
    return newNode;
  };

  this.replaceCountAssignment = function(pos){
    this.addedStr = "";
    this.removedStr = "";
    this.replacePos = pos;
    var newAst = this.copyAst(ast);
    var replacedAst = this.visit(newAst);
    var positioner = new Positioner(replacedAst);
    replacedAst = positioner.computePos();
    replacedAst.cursorTarget = this.cursorTarget; 
    return replacedAst;
  };

    
  this.getAddedString = function(){
    return this.addedStr;
  };

  this.getRemovedString = function(){
    return this.removedStr;
  };

};

});
