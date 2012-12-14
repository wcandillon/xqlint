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

    this.curIndent = 0;
    this.nextIndent = 0;
    this.afterNextIndent = undefined;

    this.newLinesEnabled = true;

    this.pendingNewLines = 0;

    // Start line with indentation
    this.initLine = function() {
      if (this.curLine !== ""){
        throw "initLine call on nonempty line";
      }
      
      var effectiveIndent = this.nextIndent > this.curIndent + 1 ? 
                              this.curIndent + 1 : this.nextIndent;
      for (var i = 0; i < effectiveIndent; i++){
        this.curLine += indent;
      }
      if (this.afterNextIndent !== undefined){
        this.nextIndent += this.afterNextIndent;
        this.afterNextIndent = undefined;
      }
      this.curIndent = this.nextIndent;
    }

    this.pushIndent = function() {
      if (this.pendingNewLines === 0){
        this.nextIndent++;
      }else{
        // We have pending newlines - the nextIndent needs to be used for those
        if (this.afterNextIndent === undefined){
          this.afterNextIndent = 1;
        }else{
          this.afterNextIndent++;
        }
      }
    }

    this.popIndent = function() {
      if (this.pendingNewLines === 0){
        if (this.nextIndent < 1){
          console.log("Warning: popIndent() called on 0 indent");
        }else{ 
          this.nextIndent--;
        }
      }else{    
        if (this.afterNextIndent === undefined){
          this.afterNextIndent = -1;
        }else{
          this.afterNextIndent--;
        }
      }
    }

    this.flushLine = function(){
      if (!(/\S/.test(this.curLine))){
        // Write blanks as empty blanks without WS
        this.curLine = "";
      }
      this.result += this.curLine + '\n';
      
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
        res += this.curLine;
      }

      return res;
    }

    this.isEmpty = function(){
      return (this.curLine === "" || (/^\s+$/.test(this.curLine) && this.curLine.length === this.curIndent * indent.length));
    }

    this.postNewLine = function(count){
      if (count === undefined) {
        count = 1;
      }
      if (this.newLinesEnabled){
        this.pendingNewLines = this.pendingNewLines < count?  count : this.pendingNewLines;
      }
    }

    this.appendStr = function(str){
      if (str === '\n'){
        return this.flushLine();
      }

      var parts = str.split('\n');
      if (parts.length > 1){
        for (var i = 0; i < parts.length - 1; i++){
          this.appendStr(parts[i]);
          this.flushLine();
        }
        // Last part doesn't flush line
        this.appendStr(parts[parts.length-1]);
      }else {
        // Write pending newLines
        while (this.pendingNewLines > 0){
        this.flushLine(); 
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
        }

      } // else

    } // FormatWriter.appendStr

  }; // FormatWriter


}); // define



