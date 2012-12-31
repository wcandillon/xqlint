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


  var FormatWriter = exports.FormatWriter = function(indent, maxLineLength) {
    this.DEBUG = false;
    this.curLine = "";
    this.curLineIndent = "";
    this.result = "";

    this.indentAmount = 0;
    this.indentAmountCache = undefined;
    this.indentBase = []; 
    this.preIndentAmount = [];

    this.lineStartStr = []; // The last element in this array is the string to be 
                             // added on the beginning of each line (after indentation)

    this.newLinesEnabled = true;
    this.ignoreWSIndent = true;     // Ignore incoming WS at the beginning of a line 
    this.clearBlankLines = true;    // Ignore WS and lineStartStr on "blank" lines (write them as "\n")

    this.pendingNewLines = 0;

    this.noWrap = [',', ';'];

    this.pushIndentBase = function(amount) {
      if (amount === undefined) {
        // Set custom indent to current position
        amount = this.curLine.length;
      }
      this.indentBase.push(amount);
      this.preIndentAmount.push(this.indentAmount); 
      this.indentAmount = 0;
      
      if (!(this.preIndentAmount.length == this.indentBase.length)){
        throw "indentBase/preIndentAmount don't match in size";
      }
    }

    this.pushLineStartStr = function(str){
      this.lineStartStr.push(str);
    }

    this.popLineStartStr = function() {
      if (this.lineStartStr.length === 0){
        throw "lineStartStr.pop() on empty array";
      }
      this.lineStartStr.pop();
    }

    this.popIndentBase = function() {
      if (this.indentBase.length === 0){
        throw "removeCustomIndent() without preceding setCustomIndent()";
      }
      this.indentBase.pop();
      this.indentAmount += this.preIndentAmount.pop();
      
      if (!(this.preIndentAmount.length == this.indentBase.length)){
        throw "indentBase/preIndentAmount don't match in size";
      }
    }

    function trimRight(str){
      var strip = str.length - 1;
      while (strip >= 0 && (str.charAt(strip) === ' ' || str.charAt(strip) === '\t')){
        strip--;
      }
      return str.substring(0, strip + 1);
    }

    function trimLeft(str){
      var strip = 0;
      while (strip < str.length && (str.charAt(strip) === ' ' || str.charAt(strip) === '\t')){
        strip++;
      }
      return str.substring(strip, str.length);
    }

    this.isCurLineWrapping = function() {
      return this.pendingNewLines === 0 && this.curLine.indexOf('\n') !== -1;
    }

    this.wrapCurLine = function() {
      var wrapIndent;
      if (this.indentBase.length > 0){
        wrapIndent = "";
        var numSpaces = this.indentBase[this.indentBase.length - 1];
        for (var i = 0; i < numSpaces; i++){
          wrapIndent += " ";
        }
      } else{
        wrapIndent = this.curLineIndent + indent;
      }
     this.curLine = trimRight(this.curLine);
     this.curLine += '\n' + wrapIndent; 
     if (this.lineStartStr.length > 0){
       this.curLine += this.lineStartStr[this.lineStartStr.length - 1];
     }
    }

    // Start line with indentation
    this.initLine = function() {
      if (this.curLine !== ""){
        throw "initLine call on nonempty line";
      }

      if (this.indentBase.length > 0){
        var base = this.indentBase[this.indentBase.length - 1];
        for (var i = 0; i < base; i++){
          this.curLine += " ";
        }
      }

      if (this.indentAmountCache === undefined){
        this.indentAmountCache = this.indentAmount;
      }
      for (var i = 0; i < this.indentAmountCache; i++){
        this.curLine += indent;
      }
      if (this.lineStartStr.length > 0){
        this.curLine += this.lineStartStr[this.lineStartStr.length - 1];
      }
      this.curLineIndent = this.curLine;
      this.indentAmountCache = undefined;
      
    }

    this.pushIndent = function() {
      this.indentAmount++;
    }

    this.popIndent = function() {
      if (this.indentAmount === 0){
        throw "popIndent on 0 indentAmount";
      } 
      this.indentAmount--;
    }

    this.flushLine = function(){
      if (this.isEmpty() && this.clearBlankLines){
        // Write blanks as empty blanks without WS
        this.curLine = "";
      }

      this.result += trimRight(this.curLine) + '\n';

      // Reset curLine and initialize it
      this.curLine = "";
      this.initLine();

      if (this.pendingNewLines > 0){
        this.pendingNewLines--;
      }

    }

    this.lastChar = function(){
      if (this.pendingNewLines > 0){
        if (this.newLinesEnabled){
          return '\n';
        } else {
          return ' ';
        }
      } else if (!this.isEmpty()){
        return this.curLine.charAt(this.curLine.length - 1);
      } else {
        if (this.result.length > 0){
          return this.result.charAt(this.result.length - 1);
        }else {
          return "";
        }
      }
    }

    this.backTo = function(str) {
      if (this.pendingNewLines > 0){
        return false;
      } else {
        var l = this.curLine;
        for(i = l.length; i >= str.length - 1; i--){
          if (l.substring(i - str.length, i) === str){
            this.curLine = this.curLine.substring(0, i);
            return true;
          } else if (/\S/.test(l[i-1])){
            return false;
          } 
        } 
        return false;       
      }
    }

    this.backOneWord = function(){
      if (this.pendingNewLines > 0 || this.isEmpty()){
        return "";
      }
      var inWord = false;
      for (var i = this.curLine.length; i >= 0; i--){
        if (/\s/.test(this.curLine[i])){
          if (inWord){
            break;
          }
        }else {
          inWord = true;
        } 
      }
      var res = this.curLine.substring(i+1);
      this.curLine = this.curLine.substring(0,i+1);
      return res;
    }

    this.getResult = function(){
      if (this.newLinesEnabled){
        while (this.pendingNewLines > 0){
          this.flushLine();
        }
      }else{
        this.appendStr(" ");
      }
      var res = this.result;
      if (!this.isEmpty()){
        res += trimRight(this.curLine);
      }

      return trimRight(res);
    }

    this.isEmpty = function(){
      if (this.lineStartStr.length > 0){
        var lineStart = this.lineStartStr[this.lineStartStr.length - 1];
        var idx = this.curLine.indexOf(lineStart);
        if (idx > -1){
          var sub = this.curLine.substring(idx);
          if (sub === lineStart) {
            return !(/\S/.test(this.curLine.substring(0,idx)));
          }else {
            return false;
          }
        }
      }
      return (!(/\S/.test(this.curLine)));
    }

    this.postNewLine = function(count){
      if (count === undefined) {
        count = 1;
      }
      if (this.newLinesEnabled){
        this.pendingNewLines = this.pendingNewLines < count?  count : this.pendingNewLines;
        this.indentAmountCache = this.indentAmount;
      }else{
        // One-line mode - the pending newline will be interpreted as a space
        this.pendingNewLines = 1;
      }
    }

    this.appendStr = function(str){
      if (str === '\n'){
        return this.flushLine();
      }

      var parts = str.split('\n');
      if (parts.length > 1){
        // str contains newlines, write each part and flush
        for (var i = 0; i < parts.length - 1; i++){
          this.appendStr(parts[i]);
          this.flushLine();
        }
        // Last part doesn't flush line
        this.appendStr(parts[parts.length-1]);
      }else {
        // str contains no newlines
        
        if (this.isEmpty() && this.ignoreWSIndent){

          // Strip off spaces to preserve indentation
          str = trimLeft(str);

        }

        if (this.DEBUG && str.length > 0){
          console.log(str);
        }
        if (this.pendingNewLines > 0 && str.length > 0 && /\S/.test(str)){

          if (this.newLinesEnabled){
            // Write pending newLines
            while (this.pendingNewLines > 0){
              this.flushLine(); 
            }
          }else{
            this.pendingNewLines = 0;
            if (str.charAt(0) !== ' ' &&
                this.curLine.length > 0 && 
                this.curLine.charAt(this.curLine.length - 1) !== ' '){
              this.appendStr(' ');
            }
          }

          return this.appendStr(str);
        }


        var lastLineLength = this.curLine.length - this.curLine.lastIndexOf('\n') - 1; 
        if (lastLineLength + trimRight(str).length > maxLineLength
            && !(this.result === "" && this.isEmpty())){
          // Wrap the line, if all of the following is true:
          // 1. Appending str to curLine would make curLine exceed maxLineLength
          // 2. We are not currently writing the first content on the first line
          
          // Check if what we are about to write doesn't allow wrapping
          // and write the previous word to the next line if necessary
          if (this.noWrap.indexOf(str) !== -1){
            var lw = this.backOneWord();
            str = lw + str;
          }

          this.wrapCurLine();
        }
        this.curLine += str;

      } // else

    } // FormatWriter.appendStr

  }; // FormatWriter


}); // define



