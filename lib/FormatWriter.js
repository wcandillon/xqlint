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

    this.indentAmount = 0;
    this.indentAmountCache = undefined;

    this.newLinesEnabled = true;

    this.pendingNewLines = 0;

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


    // Start line with indentation
    this.initLine = function() {
      if (this.curLine !== ""){
        throw "initLine call on nonempty line";
      }

      if (this.indentAmountCache === undefined){
        this.indentAmountCache = this.indentAmount;
      }
      for (var i = 0; i < this.indentAmountCache; i++){
        this.curLine += indent;
      }
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
      if (this.isEmpty()){
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

    this.getResult = function(){
      while (this.pendingNewLines > 0){
        this.flushLine();
      }
      var res = this.result;
      if (!this.isEmpty()){
        res += trimRight(this.curLine);
      }

      return res;
    }

    this.isEmpty = function(){
      return (!(/\S/.test(this.curLine)));
    }

    this.postNewLine = function(count){
      if (count === undefined) {
        count = 1;
      }
      if (this.newLinesEnabled){
        this.pendingNewLines = this.pendingNewLines < count?  count : this.pendingNewLines;
        this.indentAmountCache = this.indentAmount;
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
        
        if (this.isEmpty()){

          // Strip off spaces to preserve indentation
          str = trimLeft(str);

        }

        if (this.DEBUG && str.length > 0){
          console.log(str);
        }
        if (this.pendingNewLines > 0 && str.length > 0 && /\S/.test(str)){
          // Write pending newLines
          while (this.pendingNewLines > 0){
            this.flushLine(); 
          }
          return this.appendStr(str);
        }

        this.curLine += str;

      } // else

    } // FormatWriter.appendStr

  }; // FormatWriter


}); // define



