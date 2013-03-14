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
  var CommentHandler = exports.CommentHandler = function(code) {

    var ast = null;
    var ptr = null;
    var remains = code;
    var cursor = 0;
    var lineCursor = 0;
    var line = 0;
    var col = 0;

    function createNode(name){
      return { name: name, children: [], getParent: null, pos: { sl: 0, sc: 0, el: 0, ec: 0 } };
    }
  
    function pushNode(name, begin){
      var node = createNode(name);
      if(ast === null) {
        ast = node;
        ptr = node;
      } else {
        node.getParent = ptr;
        ptr.children.push(node);
        ptr = ptr.children[ptr.children.length - 1];
      }
    }
    
    function popNode(name, end){
     
      if(ptr.children.length > 0) {
        var s = ptr.children[0];
        var e = ptr.children[ptr.children.length - 1];
        ptr.pos.sl = s.pos.sl;
        ptr.pos.sc = s.pos.sc;
        ptr.pos.el = e.pos.el;
        ptr.pos.ec = e.pos.ec;
      }
      
      if(ptr.getParent !== null) {
        ptr = ptr.getParent;
        for(var i in ptr.children) {
          delete ptr.children[i].getParent;
        }
      } else {
        delete ptr.getParent;
      }
    }
 
    this.peek = function() {
      return ptr;    
    };
    
    this.getParseTree = function() {
      return ast;
    };
 
    this.reset = function(input) {};

    this.startNonterminal = function(name, begin) {
      pushNode(name, begin);
    };

    this.endNonterminal = function(name, end) {
      popNode(name, end);
    };

    this.terminal = function(name, begin, end) {
      name = (name.substring(0, 1) === "'" && name.substring(name.length - 1) === "'") ? "TOKEN" : name;
      pushNode(name, begin); 
      setValue(ptr, begin, end);
      popNode(name, end);
    };

    this.whitespace = function(begin, end) {
      var name = "WS";
      pushNode(name, begin);
      setValue(ptr, begin, end);
      popNode(name, end);
    };

    function setValue(node, begin, end) {
      var e = end - cursor;
      ptr.value = remains.substring(0, e); 
      var sl = line;
      var sc = line === 0 ? lineCursor : lineCursor - 1;
      var el = sl + ptr.value.split("\n").length - 1;
      var lastIdx = ptr.value.lastIndexOf("\n");
      var ec = lastIdx === -1 ? sc + ptr.value.length : ptr.value.substring(lastIdx).length;
      remains = remains.substring(e);
      cursor = end;
      lineCursor = lastIdx === -1 ? lineCursor + (ptr.value.length) : ec; 
      line = el; 
      ptr.pos.sl = sl; 
      ptr.pos.sc = sc; 
      ptr.pos.el = el; 
      ptr.pos.ec = ec; 
    } 

 
    // Ensure ': ' before content for all non-WS lines
    // Ensure all lines start with a space
    this.normalizeComment = function(commentStr){
      var lines = commentStr.split('\n');
      for (var i = 0; i < lines.length; i++){
        var curLine = lines[i];
        if (curLine.isWS()){
          // Line is WS, skip
          lines[i] = "";
          continue;
        }else if (curLine[0] === ':'){
          // Line starts with ':' at first char, prepend space
          curLine = ' ' + curLine;
        }else{
          var lTrimmed = curLine.ltrimSpaces();
          // Index of the first non-WS char
          var contentIndex = curLine.length - lTrimmed.length;
          if (lTrimmed[0] != ':'){
            // Have to add ':'
            if (contentIndex <= 2){
              curLine = ' : ' + lTrimmed; 
            }else{
              // Content started at contentIndex >= 2
              curLine[contentIndex - 2] = ':';
            }
          }else if (lTrimmed.length == 1){
            // Line starts with WS* and ends with ':'
            curLine = curLine + ' ';
          }
        }
        lines[i] = curLine;
      }
      return lines.join('\n');
    }

    // Align to the left, remove leading ':', remove trailing and leading
    // empty lines, remove trailing ws on lines
    this.trimComment = function(normalizedComment){
      var lines = normalizedComment.split('\n');
      
      var startLine = 0;
      var endLine = 0;     

      // Find minIndent
      var minIndent = Number.MAX_VALUE; 
      for (var i = 0; i < lines.length; i++){
        if (lines[i].isWS()){ 
          if (startLine === i){
            startLine++;
          }
          continue; 
        }else{
          endLine = i + 1;
        }
        var colonIndex = lines[i].indexOf(': ');
        if (colonIndex === -1) {
          // Non-normalized line, ignore
          console.log(
              "Warning: trimComment: Non-normalized comment line \"" + lines[i] + '"');
          continue;
        }
        // Substitute ':'
        lines[i][colonIndex] = ' ';
        if (minIndent > colonIndex) { minIndent = colonIndex; }
      }

      // Remove minIndent + 2 spaces from all lines
      if (minIndent != Number.MAX_VALUE){
        for (var i = 0; i < lines.length; i++){
          lines[i] = lines[i].substring(minIndent+2).rtrimSpaces(); 
        }
      }

      return lines.slice(startLine, endLine).join('\n');
    }

    this.commentToDocString = function(commentStr){
      return this.trimComment(this.normalizeComment(commentStr));
    }


    if (String.prototype.isWS != 'function'){
      String.prototype.isWS = function(){
        return this.trim() === '';
      }
    }

    if (String.prototype.rtrimSpaces != 'function'){
      String.prototype.rtrimSpaces = function(s) { 
        return this.replace(/[ \t]+$/, '');
      }
    }

    if (String.prototype.ltrimSpaces != 'function'){
      String.prototype.ltrimSpaces = function(s) { 
        return this.replace(/^[ \t]+/, '');
      }
    }   

    if (String.prototype.fromChar != 'function'){
      String.prototype.fromChar = function(c, n) { 
        if (!n || n < 1){
          n = 1;
        }
        var arr = new Array(n+1);
        return arr.join(c);        
      }
    }
  };
});
