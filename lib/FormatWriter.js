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
    this.curLine = "";          // The current line
    
    this.curLineIndent = "";    // The indentation that is used on the current line
                                // If curLine starts with WS after the indentation, this WS 
                                // is not part of the indentation.
   
    this.result = "";           // The result - contains all content apart from the current line.
                                // Use getResult() to get the end result.


    this.indentAmount = 0;                // The amount of indentation. The length of the indentation
                                          // On the next line will be this.indentAmount * indent.length
    
    this.indentAmountCache = undefined;   // 
    this.indentBase = []; 
    this.preIndentAmount = [];

    this.lineStartStr = []; // The last element in this array is the string to be 
                             // added on the beginning of each line (after indentation)

    this.newLinesEnabled = true;
    this.doIndent = true;
    this.ignoreWSIndent = true;     // Ignore incoming WS at the beginning of a line 
    this.clearBlankLines = true;    // Ignore WS and lineStartStr on "blank" lines (write them as "\n")

  
    // If the last written content was a newline, this variable holds
    // how many successive newlines were written after the last non-newline
    // content, how many were issued by WS and how many by postNewLine().
    this.lastNewLines ={
      written: 0, fromPost: 0, fromWS: 0
    }


    this.spacePosted = 0;     // This variable is 1 if the last written content
                              // is a space due to postSpace(). 

    this.state = function() {
    }

    this.saveState = function() {
      this.state.DEBUG = this.DEBUG;
      this.state.curLine = this.curLine;
      this.state.curLineIndent = this.curLineIndent;
      this.state.result = this.result;
      this.state.indentAmount = this.indentAmount;
      this.state.indentAmountCache = this.indentAmountCache;
      this.state.indentBase = this.indentBase;
      this.state.preIndentAmount = this.preIndentAmount;
      this.state.lineStartStr = this.lineStartStr;
      this.state.newLinesEnabled = this.newLinesEnabled;
      this.state.doIndent = this.doIndent;
      this.state.ignoreWSIndent = this.ignoreWSIndent;
      this.state.clearBlankLines = this.clearBlankLines;
      this.state.lastNewLines = this.lastNewLines;
      this.state.noWrap = this.noWrap;
    }

    this.loadState = function() {
      this.DEBUG = this.state.DEBUG;
      this.curLine = this.state.curLine;
      this.curLineIndent = this.state.curLineIndent;
      this.result = this.state.result;
      this.indentAmount = this.state.indentAmount;
      this.indentAmountCache = this.state.indentAmountCache;
      this.indentBase = this.state.indentBase;
      this.preIndentAmount = this.state.preIndentAmount;
      this.lineStartStr = this.state.lineStartStr;
      this.newLinesEnabled = this.state.newLinesEnabled;
      this.doIndent = this.state.doIndent;
      this.ignoreWSIndent = this.state.ignoreWSIndent;
      this.clearBlankLines = this.state.clearBlankLines;
      this.lastNewLines = this.state.lastNewLines;
      this.noWrap = this.state.noWrap;
    }

    // Set the base indentation to the position after the last char 
    // This indentation is applied to all following content before applying
    // this.indentAmount * indent.
    this.pushIndentBase = function() {
      var base = {
        amount: this.curLine.length,
        line: this.lineCount(),
      }

      //console.log("pushIndentbase: amount=" + base.amount + ", line="
          //+ base.line);
      this.indentBase.push(base);
      this.preIndentAmount.push(this.indentAmount);
      this.indentAmount = 0;
      
      if (!(this.preIndentAmount.length == this.indentBase.length)){
        throw "indentBase/preIndentAmount don't match in size";
      }
    }

    // Pop the previous indentBase and apply the now most recent indentBase,
    // if any.
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

    this.pushLineStartStr = function(str){
      this.lineStartStr.push(str);
    }

    this.popLineStartStr = function() {
      if (this.lineStartStr.length === 0){
        throw "lineStartStr.pop() on empty array";
      }
      this.lineStartStr.pop();
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

    function endsWith(src, end){
      if (src.length < end.length){
        return false;
      }
      for (var i = 1; i <= end.length; i++){
         if (src[src.length - i] != end[end.length - i]){
           return false;
         }
      }
      return true;
    }

    function isWS(str){
      return !(/\S/.test(str));
    }

    function min(a,b){
      if (a < b){
        return a;
      } else {
        return b;
      }
    }

    // Returns true iff this.curLine contains a '\n'.
    this.isCurLineWrapping = function() {
      return this.curLine.indexOf('\n') !== -1;
    }

    // Wrap the current line.
    // This call introduces a '\n' into this.curLine.
    this.wrapCurLine = function() {
      var wrapIndent;
      if (this.indentBase.length > 0){
        wrapIndent = "";
        var numSpaces = this.indentBase[this.indentBase.length - 1].amount;
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

    // Return true iff appending 'str' to this writer would increase the 
    // number of lines in the end result.
    this.wouldIncreaseLines = function(str) {
      this.saveState();
      var numLines = this.getResult().split('\n').length;
      this.appendStr(str);
      var ret = this.getResult().split('\n').length > numLines;
      this.loadState();
      return ret;
    }


    // Reset the current line: empty all content, apply indentation and 
    // lineStartStr.
    this.resetLine = function() {
      this.curLine = "";
      this.initLine();
    }

    // Start line with indentation and lineStartStr.
    this.initLine = function() {
      if (this.curLine !== ""){
        throw "initLine call on nonempty line";
      }

      if (this.indentBase.length > 0){
        var base = this.indentBase[this.indentBase.length - 1].amount;
        for (var i = 0; i < base; i++){
          this.curLine += " ";
        }
      }

      if (this.doIndent){
        if (this.indentAmountCache === undefined){
          this.indentAmountCache = this.indentAmount;
        }
        for (var i = 0; i < this.indentAmountCache; i++){
          this.curLine += indent;
        }
        
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
      if (this.isEmpty()){
        // Required because of the following scenario:
        // Node B is child of node A. Both node A and B pushIndent() on enter
        // and popIndent() on leave.
        // Node B posts a new line after being formatted. This new line
        // still has the indentation from A's push. All A does after B's content
        // was written is popIndent() -> the new line has a wrong indentation.
        // This is the scenario in tests/queries/xqlint/flwor/flwor3-multiline.xq
        this.resetLine();
      }
    }

    // Flush this.curLine to this.result and reset this.curLine.
    this.flushLine = function(){
      if (this.isEmpty() && this.clearBlankLines){
        // Write blank lines as "" (without WS)
        this.curLine = "";
      }

      this.result += trimRight(this.curLine) + '\n';

      this.resetLine();

      this.spacePosted = 0;

      this.lastNewLines.written++;
    }

    // Retrieve the most recently written char. Ignores indentation.
    this.lastChar = function(){
      if (this.lastNewLines.written > 0){
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

    // On the current line, starting from the right, delete one word (if any)
    // and return the string that was deleted. Returns "" if the line was empty.
    this.backOneWord = function(){
      if (this.lastNewLines.written > 0 || this.isEmpty()){
        return "";
      }
      var inWord = false;
      for (var i = this.curLine.length; i >= 0; i--){
        if (isWS((this.curLine[i-1]))){
          if (inWord){
            break;
          }
        }else {
          inWord = true;
        } 
      }
      var res = this.curLine.substring(i);
      this.curLine = this.curLine.substring(0,i);
      return res;
    }

    // Remove all WS (including newlines) from the end until 
    // encountering the first non-WS char or until the writer is empty.
    this.trimRight = function() {
      if (this.isEmpty() && this.result === ""){
        return;
      }

      this.lastNewLines.written = 0;
      this.lastNewLines.fromWS = 0;
      this.lastNewLines.fromPost = 0;

      if (this.isEmpty()){
        if (this.result[this.result.length-1] !== '\n'){
          throw "Invalid FormatWriter state: non-empty result doesn't end with \\n"
        }
        lines = this.result.split('\n');
        this.curLine = lines[lines.length-2];
        var resultEnd = this.result.length - 2;
        if (lines.length == 2){
          // Result only had one line
          this.result = "";
        }else{
          // Result had >= 2 lines, just remove the last line including the \n
          this.result = 
            this.result.substring(0, this.result.length - this.curLine.length - 1);
        }
        return this.trimRight();
      } else{
        for (var i = this.curLine.length - 1; i > 0; i--){
          if (!isWS(this.curLine[i])){
            break;
          }
        }
        this.curLine = this.curLine.substring(0, i+1);
      }
    }

    // Get the end result. Side-effect free.
    this.getResult = function(){
      var res = this.result;
      if (!this.isEmpty()){
        res += trimRight(this.curLine);
      }
      return trimRight(res);
    }

    this.lineCount = function(){
      var res = this.result.split('\n').length;
      if (!this.isEmpty()){
        res += this.curLine.split('\n').length - 1;
      }
      return res;
    }

    // Returns true iff this.curLine is completely empty or contains only 
    // indentation and lineStartStr.
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

    // Ensure that at least 'count' newLines follow the previous non-WS
    // content.
    this.postNewLine = function(count){
      if (count === undefined) {
        count = 1;
      }
      if (this.newLinesEnabled){
        if (this.lastNewLines.fromPost < count){
          this.lastNewLines.fromPost = count;
          this.writeNewLines();
        } 
      }else{
        // One-line mode
        this.postSpace();
      }
    }

    // Ensure that at least one space follows the previous non-WS content
    // on the current line.
    this.postSpace = function() {
      if (!this.isEmpty()){
        if (!isWS(this.curLine[this.curLine.length - 1])){
          this.appendStr(" ");          
          this.spacePosted = 1;
        }
      }
    }

    // Write out pending newlines according to this.lastNewLines
    this.writeNewLines = function() {
      var toWrite = -this.lastNewLines.written; 
      if (this.lastNewLines.fromPost > this.lastNewLines.fromWS){
        toWrite += this.lastNewLines.fromPost;
      }else{
        toWrite += this.lastNewLines.fromWS;
      } 
      while (toWrite > 0){
        this.flushLine();
        toWrite--;
      }
    }


    this.appendStr = function(str){
      str = str.replace('\t', indent);
      if (str === '\n'){
        this.lastNewLines.fromWS++;
        return this.writeNewLines();
      }

      var parts = str.split('\n');
      if (parts.length > 1){
        // str contains newlines, write each part and flush if needed
        for (var i = 0; i < parts.length - 1; i++){
          this.appendStr(parts[i]);
          this.lastNewLines.fromWS++;
          this.writeNewLines();
        }
        // Last part doesn't flush line
        this.appendStr(parts[parts.length-1]);
      }else {
        // str contains no newlines

        if (str !== ' '){
          var words = str.split(' ');
          if (words.length > 1){
            // Write each word separately in order to ensure correct wrapping
            for (var i = 0; i < words.length - 1; i++){
              this.appendStr(words[i]);
              this.appendStr(' ');
            }
            this.appendStr(words[words.length - 1]);      
            return;
          }
        }

        if (this.isEmpty()){
          // We are writing the first content of a new line
          
          if (this.ignoreWSIndent){
            // Strip off spaces at the beginning of the string to preserve
            // indentation
            str = trimLeft(str);
          }

          if (!isWS(str)){
            // Reset this.lastNewLines
            this.lastNewLines.written = 0;
            this.lastNewLines.fromPost = 0;
            this.lastNewLines.fromWS = 0;
          }
        }


        if (this.spacePosted > 0){
          // Spaces were previously posted - ensure we don't write too many
          // by stripping the posted ones off the beginning of 'str'
          for (var i = 0; i < min(this.spacePosted, str.length); i++){
            if (str[i] !== ' '){
              break;
            } 
          }
          str = str.substring(i);
        } 

        if (!isWS(str)){
          this.spacePosted = 0;
        }


        if (this.DEBUG && str.length > 0){
          console.log(str);
        }


        var lastLineLength = this.curLine.length - this.curLine.lastIndexOf('\n') - 1; 
        if (lastLineLength + trimRight(str).length > maxLineLength
            && !this.isEmpty()){
          // Wrap the line, if:
          // 1. Appending str to curLine would make curLine exceed maxLineLength
          // 2. curLine is not empty 
          
          var wrap = true;

          var wrapAllowLeft = [' ', '{', '('];
          var wrapAllowRight = [' ', '}', ')'];

          // Check if curline ends with a wrapAllowLeft or what we are about to
          // write starts with a wrapAllowRight - if not, we need to bring the 
          // previous content to the wrapped line as well
          var curEnd = this.curLine[this.curLine.length - 1];
          var strStart = str[0];
          var indentBaseBackup = [];
          if (wrapAllowLeft.indexOf(curEnd) == -1 &&
              wrapAllowRight.indexOf(strStart) == -1){
            var prevWord = this.backOneWord();
            
            // Make sure we don't mess up indentBase - if within the word we
            // just deleted indentBase was pushed, we need to remove it 
            // before writing the word on the newline, and afterwards push the 
            // correct version back
            var lastLine = this.lineCount();
            var lastChar = this.curLine.length - 1;
            while (this.indentBase.length > 0){
              var curBase = this.indentBase.pop();
              if (curBase.line == lastLine && 
                  curBase.amount > lastChar + 1){
                // This base was pushed within prevWord
                
                var pos = {
                  amountInWord: curBase.amount - this.curLine.length,
                  line: lastLine + 1
                }
                //console.log("Backup indentBase: amountInWord=" + 
                //    pos.amountInWord + ", line=" + pos.line);
                indentBaseBackup.push(pos);
              }else{
                this.indentBase.push(curBase);
                break;
              }
            }

            str = prevWord + str;

            if (this.isEmpty()){
              // The currently written word is so long that it exceeds max line length
              // Don't wrap, otherwise we'd wrap indefinitely here
              wrap = false;
            }
          }

          if (wrap){
            this.wrapCurLine();
          }

          // Restore indentBase
          while (indentBaseBackup.length > 0){
            var curBak = indentBaseBackup.pop();
            var curBase = {
              amount: this.curLine.substring(this.curLine.lastIndexOf('\n')).length
                + curBak.amountInWord,
              line: curBak.line
            }
                //console.log("Restore indentBase: amount=" + 
                //    curBase.amount + ", line=" + curBase.line);
            this.indentBase.push(curBase);
          }
          

        }
        this.curLine += str;

      } // else

    } // FormatWriter.appendStr

  }; // FormatWriter


}); // define



