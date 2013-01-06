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
  
  var XQueryTokenizer = require("./XQueryTokenizer").XQueryTokenizer;
  
  var TokenHandler = function(code) {
      
    var input = code;
    
    this.tokens = [];
 
    this.reset = function(code) {
      input = input;
      this.tokens = [];
    };
    
    this.startNonterminal = function(name, begin) {};

    this.endNonterminal = function(name, end) {};

    this.terminal = function(name, begin, end) {
      this.tokens.push({
        name: name,
        value: input.substring(begin, end)
      });
    };

    this.whitespace = function(begin, end) {
      this.tokens.push({
        name: "WS",
        value: input.substring(begin, end)
      });
    };
  };
    
    var cdata = "support.type";
    var number = "constant";
    var Rules = {
      Start: [
        {
          name: "'(:'",
          token: "comment",
          next: function(stack){ stack.push("Comment"); }
        },
        { name: "Variable",  token: "variable" },
        { name: "'<![CDATA['", token: cdata, next: function(stack){ stack.push("CData"); } },
        { name: "IntegerLiteral", token: number },
        { name: "DecimalLiteral", token: number },
        { name: "DoubleLiteral", token: number }
      ],
      Comment: [
        { name: "CommentContents", token: "comment" },
        { name: "S", token: "comment" },
        { name: "'(:'", token: "comment", next: function(stack){ stack.push("Comment"); } },
        { name: "':)'", token: "comment", next: function(stack){ stack.pop(); } }
      ],
      CData: [
        { name: "CDataSectionContents", token: cdata },
        { name: "']]>'", token: cdata, next: function(stack){ stack.pop(); } }
      ]
    };
    
  exports.getLineTokens = function(line, state) {
    var stack = JSON.parse(state || '["Start"]');
    var h = new TokenHandler(line);
    var tokenizer = new XQueryTokenizer(line, h);
    var tokens = [];
    
    while(true) {
      var currentState = stack[stack.length - 1];
      try {
        h.tokens = [];
        tokenizer["parse_" + currentState]();
        var info = null;
        if(h.tokens.length > 1) {
          for(var i in Rules[currentState]) {
            var rule = Rules[currentState][i];
            if(typeof(rule.name) === "function" && rule.name(h.tokens)) {
              info = rule;
              break;
            }
            for(var j in h.tokens) {
              tokens.push({
                type: info.token[j],
                value: h.tokens[j]
              });
            }
          }
        } else {
          var token = h.tokens[0];
          for(var i in Rules[currentState]) {
            var rule = Rules[currentState][i];
            if((typeof(rule.name) === "function" && rule.name(token)) || rule.name === token.name) {
              info = rule;
              break;
            }
          }
          if(token.name === "EOF") { break; }
          tokens.push({
            type: info.token,
            value: token.value
          });
        }
        if(info.next) {
          info.next(stack);    
        }  
      } catch(e) {
        if(e instanceof tokenizer.ParseException) {
          var message = tokenizer.getErrorMessage(e);
          console.log(stack[stack.length - 1]);
          console.log(line);
          console.log(line.substring(e.getBegin(), e.getEnd()));
          console.log(message);
          tokens.push({ type: "text", value: line.substring(e.getBegin()) });
          break;
        } else {
          throw e;
        }  
      }
    }
    
    return {
      tokens: tokens,
      state: JSON.stringify(stack)
    };
  };
});
