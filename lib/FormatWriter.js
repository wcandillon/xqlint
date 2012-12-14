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

 
  var FormatWriter = exports.FormatWriter = function(indent) {
    this.DEBUG = false;
    this.curLine = "";
    this.result = "";
    this.curLineIndent = "";

    this.indentChange = 0;

    this.newLinesEnabled = true;

    this.pendingNewLines = 0;
    this.flushedLines = 0;

    this.pushIndent = function() {
      while (this.pendingNewLines > 0){
        this.flushLine();
      }
      this.indentChange++;
    }

    this.popIndent = function() {
      // cannot flush here
      //while (this.pendingNewLines > 0){
      //  this.flushLine();
      //}
      this.indentChange--;
    }

    this.flushLine = function(){
      this.result += this.curLine + '\n';
      this.flushedLines++;
      if (this.pendingNewLines > 0){
        this.pendingNewLines--;
        this.curLine = "";
      }
      if (this.pendingNewLines == 0){
        while (this.indentChange < 0 && this.curLineIndent.length > 0){
          this.curLineIndent = this.curLineIndent.substring(0,this.curLineIndent.length - indent.length);
          this.indentChange++;
        }
        if (this.indentChange > 0) {
          this.curLineIndent += indent;
        }
        this.indentChange = 0;
        this.curLine = this.curLineIndent;
      }
    }

    this.getResult = function(){
      var res = this.result;
      if (!this.isEmpty()){
        res += this.curLine;
      }

      return res;
    }

    this.isEmpty = function(){
      return (this.curLine === "" || this.curLine === this.curLineIndent);
    }

    this.postNewLine = function(count){
      if (this.newLinesEnabled){
        this.pendingNewLines = count - this.flushedLines;
        if (count < this.flushedLines){
          this.pendingNewLines = 0;
        }
      }else{
        //this.appendStr(" ");
      }
    }

    this.appendStr = function(str){
      if (str === '\n'){
        return this.flushLine();
      }

      var parts = str.split('\n');
      if (parts.length > 1){
        for (var i = 0; i < parts.length - 1; i++){
          // Check if parts[i] is a blank line
          var ltrimmed = parts[i].replace(/^\s+/,"");
          if (ltrimmed !== ''){
            this.appendStr(parts[i]);
          }
          this.flushLine();
        }
        this.appendStr(parts[parts.length-1]);
      }else {
        // Write pending newLines
        while (this.pendingNewLines > 0){
          this.flushLine(); // (decrements this.pendingNewLines)
        }

        if (this.isEmpty()){

          // Strip off spaces to preserve indentation
          var strip = 0;
          while (strip < str.length && (str.charAt(strip) === ' ' || str.charAt(strip) === '\t')){
            strip++;
          }
          str = str.substring(strip, str.length);

        }

        if (this.DEBUG && str.length > 0){
          console.log(str);
        }

        if (str.length > 0){
          this.curLine += str;
          this.flushedLines = 0;
        }

      } // else

    } // FormatWriter.appendStr

  }; // FormatWriter


}); // define



