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
  var indent = "    ";
  var currentIndent = "";
  var code = "";

  // NOTE This stuff is from my 1. approach/idea which is not generic enough, will likely be substituted by handler functions later.
  var newLineAfter = ['LetClause', 'Separator', 'ForClause'];
  var noSpaceRight = ['$', '('];
  var noSpaceLeft = [',', ')'];

  var MAX_LINE_LENGTH = 80;    // The maximal desired length of one line of code
  var MAX_IF_LENGTH = 60;      // The maximal length of an if-then-else statement without wrapping lines
  var MAX_RETURN_LENGTH = 20;  // The maximal length of a return statement without wrapping lines

  function pushIndent(amount) {
    if (amount === undefined) { amount = 1; }
    for (var i = 0; i < amount; i++) {
      currentIndent += indent;
    }
  }

  function popIndent(amount) {
    if (amount === undefined) { amount = 1; }
    for (var i = 0; i < amount; i++) {
      currentIndent = currentIndent.substring(0, currentIndent.length - indent.length);
    }
  }

  var newLinesEnabled = true;
  function enableNewLines(b){
    newLinesEnabled = b;
  }

  /**
   * Append 'count' postChars to code, after
   * removing all of delChars from the end of code.
   */
  function post(postChar, delChars, count){
    if (delChars === undefined){
      delChars = [];
    }
    if (count === undefined){
      count = 1;
    }
    var endIndex = code.length - 1;
    while (endIndex > 0)
    {
      var c = code.charAt(endIndex);
      if (delChars.indexOf(c) !== -1){
        endIndex--;
      }else{
        break;
      }
    }
    if (endIndex < code.length - 1){
      code = code.substring(0, endIndex+1);
    }
    if (count === undefined){ count = 1; }
    for (var i = 0; i < count; i++){
      code += postChar;
    }
  }

  function postSpace(count){
    post(' ', [' '], count);
  }

  function postNewLine(count){
    if (!newLinesEnabled){
      postSpace();
      return;
    }
    post('\n', ['\n', ' '], count);
    code += currentIndent;    
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
      postSpace();
    }else{
      this.visitChildren(node);
      if (newLineAfter.indexOf(node.name) !== -1){
        postNewLine();
      }
    }
    return true;
  };

  this.ExprSingle = function(node) {
    return this.everythingElse(node);
  };

  this.FunctionName = function(node) {
    return this.everythingElse(node);
  };

  this.SequenceTypeUnion = function(node) {
    return this.everythingElse(node);
  };

  this.ReturnClause = function(node) {
    var oneLine = this.FormatOneLine(node, MAX_RETURN_LENGTH);
    if (oneLine !== undefined){
      code += oneLine;
      postNewLine();
    }else{
      var Handler = function(superHandler) {
        this.TOKEN = function(node){
          if (node.value === 'return'){
            superHandler[node.name](node);
            pushIndent();
            postNewLine();
          }
        };
        this.ExprSingle = function(node){
          superHandler[node.name](node);
          popIndent();
          postNewLine();
        };
      };
      this.visitChildren(node, new Handler(this));
    } 
    return true;
  };

  this.WS = function(node) {
    code += node.value;
    return true;
  };

  this.TOKEN = function(node) {
    if (noSpaceLeft.indexOf(node.value) !== -1){
      // Delete space on the left, if any
      if (code.length > 0 && code.charAt(code.length - 1) === ' '){
        code = code.substring(0, code.length - 1);
      }
    }
    code += node.value;
    if (noSpaceRight.indexOf(node.value) === -1){
      postSpace();
    }
    return false;
  };

  this.IfExpr = function(node){
    var oneLine = this.FormatOneLine(node, MAX_IF_LENGTH - currentIndent.length);
    if (oneLine !== undefined){
      code += oneLine;
      postNewLine();
      return true;
    }
    var Handler = function(superHandler) {
      this.ExprSingle = function(node){
        pushIndent();
        postNewLine();
        superHandler[node.name](node);
        popIndent();
        postNewLine();
        return true;
      };
    }; 

    this.visitChildren(node, new Handler(this));
    return true;
  };

  this.TypeswitchExpr = function(node) {
    var Handler = function(superHandler) {
      this.CaseClause = function(node) {
        pushIndent();
        postNewLine();
        superHandler[node.name](node);
        popIndent();
      };

      this.TOKEN = function(node) {
        if (node.value === 'default' || node.value === 'return'){
          var indentAmount = node.value === 'default' ? 1 : 2;
          pushIndent(indentAmount);
          postNewLine();
          superHandler[node.name](node);
          popIndent(indentAmount);
        }else{
          superHandler[node.name](node);
        }
      };

    };

    this.visitChildren(node, new Handler(this));
    postNewLine();
    return true;
  };

  this.CaseClause = function(node) {
    var Handler = function(superHandler) {
      this.SequenceTypeUnion = function(node) {
        superHandler[node.name](node);
        pushIndent();
        postNewLine();
      };

      this.ExprSingle = function(node) {
        superHandler[node.name](node);
        popIndent();
      };
    };

    this.visitChildren(node, new Handler(this));
    return true;
  };

  this.FunctionCall = function(node){
    var Handler = function(superHandler) {
      this.FunctionName = function(node) {
        superHandler[node.name](node);
        postSpace(0); // No space between function name and arglist
      };
    };
    this.visitChildren(node, new Handler(this));
    return true;
  };

  this.FunctionDecl = function(node) {
    var Handler = function(superHandler) {
      this.EQName = function(node){
        // Skip the space between function name and argument list
        code += getNodeValue(node);
      };

      this.TOKEN = function(node){
        var val = node.value; 
        if (val === 'as'){
          // Return type on new line, align with function decl
          postNewLine();
          superHandler.TOKEN(node);
        } 
        else if (val === '{'){
          // Opening function bracket
          postNewLine();
          code += val;
          pushIndent();
          postNewLine();
        } else if (val === '}'){
          // Closing function bracket
          popIndent();
          postNewLine();
          code += val;
        }else{
          superHandler.TOKEN(node);
        }
        return true;
      };
    }; 

    this.visitChildren(node, new Handler(this));
    return true;
  };

  this.DirElemContent = function(node) {
    code += getNodeValue(node);
    return true;    
  };

  /**
   * Try to format node on one line. Return undefined if already in 
   * oneline-mode (!newLinesEnabled) or if formatting the node on one
   * line would result in a string which is longer than maxLength.
   */
  this.FormatOneLine = function(node, maxLength){
    if (!newLinesEnabled){
      return undefined;
    }
    if (maxLength === undefined){
      maxLength = MAX_LINE_LENGTH;
    }
    newLinesEnabled = false;
    var tmpCode = code;
    code = "";

    this.visit(node);

    newLinesEnabled = true;
    var resCode = code;
    code = tmpCode;

    if (resCode.length <= maxLength){
      return resCode;
    }else{
      return undefined;
    }
  }



  this.visit = function(node) {
    //console.log("visit " + node.name);
    var name = node.name;
    var skip = false;

    if(typeof this[name] === "function")
      skip = this[name](node) === true ? true : false ;
    else
      skip = this.everythingElse(node) === true? true : false ; 
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

  this.astToText = function(node){
    if (node !== undefined){
      var resText = "";
      if (node.value !== undefined) {
        resText += node.value;
      }
      for (var i = 0; i < node.children.length; i++){
        resText += this.astToText(node.children[i]);
      }
      return resText;
    }else{
      return "";
    }
  };

  this.removeWS = function(node){
    for (var i = 0; i < node.children.length; i++){
      if (node.children[i].name === "WS"){
        delete node.children[i];
      }else{
        this.removeWS(node.children[i]);
      }
    }
    node.children = node.children.filter(function(a){return typeof a !== 'undefined';}); 
  };

  this.format = function(opts) {
    //    console.log('Formatting the following xquery code: ' + this.astToText(ast));
    this.removeWS(ast);
    //    console.log('After removeWS: ' + this.astToText(ast));
    this.visit(ast);
    return code;
  };
};

});
