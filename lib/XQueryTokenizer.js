// This file was generated on Sun Jan 13, 2013 15:43 (UTC+01) by REx v5.21 which is Copyright (c) 1979-2012 by Gunther Rademacher <grd@gmx.net>
// REx command line: XQueryTokenizer.ebnf -ll 2 -backtrack -tree -javascript -a xqlint

                                                            // line 2 "XQueryTokenizer.ebnf"
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
                                                            var XQueryTokenizer = exports.XQueryTokenizer = function XQueryTokenizer(string, parsingEventHandler)
                                                            {
                                                              init(string, parsingEventHandler);
                                                            // line 40 "XQueryTokenizer.js"
  var self = this;

  this.ParseException = function(b, e, s, o, x)
  {
    var
      begin = b,
      end = e,
      state = s,
      offending = o,
      expected = x;

    this.getBegin = function() {return begin;};
    this.getEnd = function() {return end;};
    this.getState = function() {return state;};
    this.getExpected = function() {return expected;};
    this.getOffending = function() {return offending;};

    this.getMessage = function()
    {
      return offending < 0 ? "lexical analysis failed" : "syntax error";
    };
  };

  function init(string, parsingEventHandler)
  {
    eventHandler = parsingEventHandler;
    input = string;
    size = string.length;
    reset(0, 0, 0);
  }

  this.getInput = function()
  {
    return input;
  };

  function reset(l, b, e)
  {
                 b0 = b; e0 = b;
    l1 = l; b1 = b; e1 = e;
    end = e;
    eventHandler.reset(input);
  }

  this.reset = function(l, b, e) {reset(l, b, e);};

  this.getOffendingToken = function(e)
  {
    var o = e.getOffending();
    return o >= 0 ? XQueryTokenizer.TOKEN[o] : null;
  };

  this.getExpectedTokenSet = function(e)
  {
    var expected;
    if (e.getExpected() < 0)
    {
      expected = getExpectedTokenSet(e.getState());
    }
    else
    {
      expected = [XQueryTokenizer.TOKEN[e.getExpected()]];
    }
    return expected;
  };

  this.getErrorMessage = function(e)
  {
    var tokenSet = this.getExpectedTokenSet(e);
    var found = this.getOffendingToken(e);
    var prefix = input.substring(0, e.getBegin());
    var lines = prefix.split("\n");
    var line = lines.length;
    var column = lines[line - 1].length + 1;
    var size = e.getEnd() - e.getBegin();
    return e.getMessage()
         + (found == null ? "" : ", found " + found)
         + "\nwhile expecting "
         + (tokenSet.length == 1 ? tokenSet[0] : ("[" + tokenSet.join(", ") + "]"))
         + "\n"
         + (size == 0 ? "" : "after successfully scanning " + size + " characters beginning ")
         + "at line " + line + ", column " + column + ":\n..."
         + input.substring(e.getBegin(), Math.min(input.length, e.getBegin() + 64))
         + "...";
  };

  this.parse_start = function()
  {
    eventHandler.startNonterminal("start", e0);
    lookahead1W(15);                // Operator | Variable | Tag | Wildcard | IntegerLiteral | DecimalLiteral |
                                    // DoubleLiteral | QName | S^WS | EOF | '"' | "'" | '(' | '(#' | '(:' | '(:~' |
                                    // ')' | '<!--' | '<![CDATA[' | '<?' | '{' | '}'
    switch (l1)
    {
    case 46:                        // '<![CDATA['
      shift(46);                    // '<![CDATA['
      break;
    case 45:                        // '<!--'
      shift(45);                    // '<!--'
      break;
    case 47:                        // '<?'
      shift(47);                    // '<?'
      break;
    case 36:                        // '(#'
      shift(36);                    // '(#'
      break;
    case 38:                        // '(:~'
      shift(38);                    // '(:~'
      break;
    case 37:                        // '(:'
      shift(37);                    // '(:'
      break;
    case 32:                        // '"'
      shift(32);                    // '"'
      break;
    case 34:                        // "'"
      shift(34);                    // "'"
      break;
    case 261:                       // '}'
      shift(261);                   // '}'
      break;
    case 259:                       // '{'
      shift(259);                   // '{'
      break;
    case 35:                        // '('
      shift(35);                    // '('
      break;
    case 39:                        // ')'
      shift(39);                    // ')'
      break;
    case 9:                         // Wildcard
      shift(9);                     // Wildcard
      break;
    case 11:                        // IntegerLiteral
      shift(11);                    // IntegerLiteral
      break;
    case 12:                        // DecimalLiteral
      shift(12);                    // DecimalLiteral
      break;
    case 13:                        // DoubleLiteral
      shift(13);                    // DoubleLiteral
      break;
    case 2:                         // Variable
      shift(2);                     // Variable
      break;
    case 24:                        // QName
      shift(24);                    // QName
      break;
    case 3:                         // Tag
      shift(3);                     // Tag
      break;
    case 1:                         // Operator
      shift(1);                     // Operator
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("start", e0);
  };

  this.parse_StartTag = function()
  {
    eventHandler.startNonterminal("StartTag", e0);
    lookahead1W(11);                // QName | S^WS | EOF | '"' | "'" | '/>' | '=' | '>'
    switch (l1)
    {
    case 49:                        // '>'
      shift(49);                    // '>'
      break;
    case 43:                        // '/>'
      shift(43);                    // '/>'
      break;
    case 24:                        // QName
      shift(24);                    // QName
      break;
    case 48:                        // '='
      shift(48);                    // '='
      break;
    case 32:                        // '"'
      shift(32);                    // '"'
      break;
    case 34:                        // "'"
      shift(34);                    // "'"
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("StartTag", e0);
  };

  this.parse_TagContent = function()
  {
    eventHandler.startNonterminal("TagContent", e0);
    lookahead1(14);                 // Tag | EndTag | PredefinedEntityRef | ElementContentChar | CharRef | EOF |
                                    // '<!--' | '<![CDATA[' | '{' | '{{' | '}}'
    switch (l1)
    {
    case 19:                        // ElementContentChar
      shift(19);                    // ElementContentChar
      break;
    case 3:                         // Tag
      shift(3);                     // Tag
      break;
    case 4:                         // EndTag
      shift(4);                     // EndTag
      break;
    case 46:                        // '<![CDATA['
      shift(46);                    // '<![CDATA['
      break;
    case 45:                        // '<!--'
      shift(45);                    // '<!--'
      break;
    case 14:                        // PredefinedEntityRef
      shift(14);                    // PredefinedEntityRef
      break;
    case 27:                        // CharRef
      shift(27);                    // CharRef
      break;
    case 260:                       // '{{'
      shift(260);                   // '{{'
      break;
    case 262:                       // '}}'
      shift(262);                   // '}}'
      break;
    case 259:                       // '{'
      shift(259);                   // '{'
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("TagContent", e0);
  };

  this.parse_AposAttr = function()
  {
    eventHandler.startNonterminal("AposAttr", e0);
    lookahead1(13);                 // PredefinedEntityRef | EscapeApos | AposAttrContentChar | CharRef | EOF | "'" |
                                    // '{' | '{{' | '}}'
    switch (l1)
    {
    case 16:                        // EscapeApos
      shift(16);                    // EscapeApos
      break;
    case 21:                        // AposAttrContentChar
      shift(21);                    // AposAttrContentChar
      break;
    case 14:                        // PredefinedEntityRef
      shift(14);                    // PredefinedEntityRef
      break;
    case 27:                        // CharRef
      shift(27);                    // CharRef
      break;
    case 260:                       // '{{'
      shift(260);                   // '{{'
      break;
    case 262:                       // '}}'
      shift(262);                   // '}}'
      break;
    case 259:                       // '{'
      shift(259);                   // '{'
      break;
    case 34:                        // "'"
      shift(34);                    // "'"
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("AposAttr", e0);
  };

  this.parse_QuotAttr = function()
  {
    eventHandler.startNonterminal("QuotAttr", e0);
    lookahead1(12);                 // PredefinedEntityRef | EscapeQuot | QuotAttrContentChar | CharRef | EOF | '"' |
                                    // '{' | '{{' | '}}'
    switch (l1)
    {
    case 15:                        // EscapeQuot
      shift(15);                    // EscapeQuot
      break;
    case 20:                        // QuotAttrContentChar
      shift(20);                    // QuotAttrContentChar
      break;
    case 14:                        // PredefinedEntityRef
      shift(14);                    // PredefinedEntityRef
      break;
    case 27:                        // CharRef
      shift(27);                    // CharRef
      break;
    case 260:                       // '{{'
      shift(260);                   // '{{'
      break;
    case 262:                       // '}}'
      shift(262);                   // '}}'
      break;
    case 259:                       // '{'
      shift(259);                   // '{'
      break;
    case 32:                        // '"'
      shift(32);                    // '"'
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("QuotAttr", e0);
  };

  this.parse_CData = function()
  {
    eventHandler.startNonterminal("CData", e0);
    lookahead1(5);                  // CDataSectionContents | EOF | ']]>'
    switch (l1)
    {
    case 8:                         // CDataSectionContents
      shift(8);                     // CDataSectionContents
      break;
    case 52:                        // ']]>'
      shift(52);                    // ']]>'
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("CData", e0);
  };

  this.parse_XMLComment = function()
  {
    eventHandler.startNonterminal("XMLComment", e0);
    lookahead1(4);                  // DirCommentContents | EOF | '-->'
    switch (l1)
    {
    case 6:                         // DirCommentContents
      shift(6);                     // DirCommentContents
      break;
    case 42:                        // '-->'
      shift(42);                    // '-->'
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("XMLComment", e0);
  };

  this.parse_PI = function()
  {
    eventHandler.startNonterminal("PI", e0);
    lookahead1(6);                  // DirPIContents | PITarget | S | EOF | '?>'
    switch (l1)
    {
    case 22:                        // PITarget
      shift(22);                    // PITarget
      break;
    case 25:                        // S
      shift(25);                    // S
      break;
    case 7:                         // DirPIContents
      shift(7);                     // DirPIContents
      break;
    case 50:                        // '?>'
      shift(50);                    // '?>'
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("PI", e0);
  };

  this.parse_Pragma = function()
  {
    eventHandler.startNonterminal("Pragma", e0);
    lookahead1(2);                  // '(#'
    shift(36);                      // '(#'
    lookahead1(17);                 // EQName^Token | S | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
                                    // 'and' | 'as' | 'ascending' | 'at' | 'attribute' | 'base-uri' | 'before' |
                                    // 'boundary-space' | 'break' | 'case' | 'cast' | 'castable' | 'catch' | 'child' |
                                    // 'collation' | 'comment' | 'constraint' | 'construction' | 'context' |
                                    // 'continue' | 'copy' | 'copy-namespaces' | 'count' | 'decimal-format' |
                                    // 'declare' | 'default' | 'delete' | 'descendant' | 'descendant-or-self' |
                                    // 'descending' | 'div' | 'document' | 'document-node' | 'element' | 'else' |
                                    // 'empty' | 'empty-sequence' | 'encoding' | 'end' | 'eq' | 'every' | 'except' |
                                    // 'exit' | 'external' | 'first' | 'following' | 'following-sibling' | 'for' |
                                    // 'ft-option' | 'function' | 'ge' | 'group' | 'gt' | 'idiv' | 'if' | 'import' |
                                    // 'in' | 'index' | 'insert' | 'instance' | 'integrity' | 'intersect' | 'into' |
                                    // 'is' | 'item' | 'last' | 'lax' | 'le' | 'let' | 'loop' | 'lt' | 'mod' |
                                    // 'modify' | 'module' | 'namespace' | 'namespace-node' | 'ne' | 'node' | 'nodes' |
                                    // 'only' | 'option' | 'or' | 'order' | 'ordered' | 'ordering' | 'parent' |
                                    // 'preceding' | 'preceding-sibling' | 'processing-instruction' | 'rename' |
                                    // 'replace' | 'return' | 'returning' | 'revalidation' | 'satisfies' | 'schema' |
                                    // 'schema-attribute' | 'schema-element' | 'score' | 'self' | 'sliding' | 'some' |
                                    // 'stable' | 'start' | 'strict' | 'switch' | 'text' | 'to' | 'treat' | 'try' |
                                    // 'tumbling' | 'type' | 'typeswitch' | 'union' | 'unordered' | 'updating' |
                                    // 'validate' | 'value' | 'variable' | 'version' | 'where' | 'while' | 'with' |
                                    // 'xquery'
    if (l1 == 25)                   // S
    {
      shift(25);                    // S
    }
    parse_EQName();
    lookahead1(3);                  // S | '#)'
    if (l1 == 25)                   // S
    {
      shift(25);                    // S
      lookahead1(0);                // PragmaContents
      shift(5);                     // PragmaContents
    }
    lookahead1(1);                  // '#)'
    shift(33);                      // '#)'
    eventHandler.endNonterminal("Pragma", e0);
  };

  this.parse_Comment = function()
  {
    eventHandler.startNonterminal("Comment", e0);
    lookahead1W(7);                 // S^WS | CommentContents | EOF | '(:' | ':)'
    switch (l1)
    {
    case 28:                        // CommentContents
      shift(28);                    // CommentContents
      break;
    case 44:                        // ':)'
      shift(44);                    // ':)'
      break;
    case 37:                        // '(:'
      shift(37);                    // '(:'
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("Comment", e0);
  };

  this.parse_CommentDoc = function()
  {
    eventHandler.startNonterminal("CommentDoc", e0);
    lookahead1(8);                  // DocTag | DocCommentContents | EOF | '(:' | ':)'
    switch (l1)
    {
    case 29:                        // DocTag
      shift(29);                    // DocTag
      break;
    case 30:                        // DocCommentContents
      shift(30);                    // DocCommentContents
      break;
    case 44:                        // ':)'
      shift(44);                    // ':)'
      break;
    case 37:                        // '(:'
      shift(37);                    // '(:'
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("CommentDoc", e0);
  };

  this.parse_QuotString = function()
  {
    eventHandler.startNonterminal("QuotString", e0);
    lookahead1(9);                  // PredefinedEntityRef | EscapeQuot | QuotChar | CharRef | EOF | '"'
    switch (l1)
    {
    case 14:                        // PredefinedEntityRef
      shift(14);                    // PredefinedEntityRef
      break;
    case 27:                        // CharRef
      shift(27);                    // CharRef
      break;
    case 15:                        // EscapeQuot
      shift(15);                    // EscapeQuot
      break;
    case 17:                        // QuotChar
      shift(17);                    // QuotChar
      break;
    case 32:                        // '"'
      shift(32);                    // '"'
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("QuotString", e0);
  };

  this.parse_AposString = function()
  {
    eventHandler.startNonterminal("AposString", e0);
    lookahead1(10);                 // PredefinedEntityRef | EscapeApos | AposChar | CharRef | EOF | "'"
    switch (l1)
    {
    case 14:                        // PredefinedEntityRef
      shift(14);                    // PredefinedEntityRef
      break;
    case 27:                        // CharRef
      shift(27);                    // CharRef
      break;
    case 16:                        // EscapeApos
      shift(16);                    // EscapeApos
      break;
    case 18:                        // AposChar
      shift(18);                    // AposChar
      break;
    case 34:                        // "'"
      shift(34);                    // "'"
      break;
    default:
      shift(31);                    // EOF
    }
    eventHandler.endNonterminal("AposString", e0);
  };

  this.parse_NCName = function()
  {
    eventHandler.startNonterminal("NCName", e0);
    lookahead1W(18);                // NCName^Token | S^WS | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
                                    // 'and' | 'as' | 'ascending' | 'at' | 'attribute' | 'base-uri' | 'before' |
                                    // 'boundary-space' | 'break' | 'case' | 'cast' | 'castable' | 'catch' | 'child' |
                                    // 'collation' | 'comment' | 'constraint' | 'construction' | 'context' |
                                    // 'continue' | 'copy' | 'copy-namespaces' | 'count' | 'decimal-format' |
                                    // 'declare' | 'default' | 'delete' | 'descendant' | 'descendant-or-self' |
                                    // 'descending' | 'div' | 'document' | 'document-node' | 'element' | 'else' |
                                    // 'empty' | 'empty-sequence' | 'encoding' | 'end' | 'eq' | 'every' | 'except' |
                                    // 'exit' | 'external' | 'first' | 'following' | 'following-sibling' | 'for' |
                                    // 'ft-option' | 'function' | 'ge' | 'group' | 'gt' | 'idiv' | 'if' | 'import' |
                                    // 'in' | 'index' | 'insert' | 'instance' | 'integrity' | 'intersect' | 'into' |
                                    // 'is' | 'item' | 'last' | 'lax' | 'le' | 'let' | 'loop' | 'lt' | 'mod' |
                                    // 'modify' | 'module' | 'namespace' | 'namespace-node' | 'ne' | 'node' | 'nodes' |
                                    // 'only' | 'option' | 'or' | 'order' | 'ordered' | 'ordering' | 'parent' |
                                    // 'preceding' | 'preceding-sibling' | 'processing-instruction' | 'rename' |
                                    // 'replace' | 'return' | 'returning' | 'revalidation' | 'satisfies' | 'schema' |
                                    // 'schema-attribute' | 'schema-element' | 'score' | 'self' | 'sliding' | 'some' |
                                    // 'stable' | 'start' | 'strict' | 'switch' | 'text' | 'to' | 'treat' | 'try' |
                                    // 'tumbling' | 'type' | 'typeswitch' | 'union' | 'unordered' | 'updating' |
                                    // 'validate' | 'value' | 'variable' | 'version' | 'where' | 'while' | 'with' |
                                    // 'xquery'
    switch (l1)
    {
    case 23:                        // NCName^Token
      shift(23);                    // NCName^Token
      break;
    case 53:                        // 'after'
      shift(53);                    // 'after'
      break;
    case 58:                        // 'and'
      shift(58);                    // 'and'
      break;
    case 62:                        // 'as'
      shift(62);                    // 'as'
      break;
    case 63:                        // 'ascending'
      shift(63);                    // 'ascending'
      break;
    case 67:                        // 'before'
      shift(67);                    // 'before'
      break;
    case 71:                        // 'case'
      shift(71);                    // 'case'
      break;
    case 72:                        // 'cast'
      shift(72);                    // 'cast'
      break;
    case 73:                        // 'castable'
      shift(73);                    // 'castable'
      break;
    case 77:                        // 'collation'
      shift(77);                    // 'collation'
      break;
    case 88:                        // 'count'
      shift(88);                    // 'count'
      break;
    case 92:                        // 'default'
      shift(92);                    // 'default'
      break;
    case 96:                        // 'descending'
      shift(96);                    // 'descending'
      break;
    case 101:                       // 'div'
      shift(101);                   // 'div'
      break;
    case 105:                       // 'else'
      shift(105);                   // 'else'
      break;
    case 106:                       // 'empty'
      shift(106);                   // 'empty'
      break;
    case 109:                       // 'end'
      shift(109);                   // 'end'
      break;
    case 111:                       // 'eq'
      shift(111);                   // 'eq'
      break;
    case 114:                       // 'except'
      shift(114);                   // 'except'
      break;
    case 120:                       // 'for'
      shift(120);                   // 'for'
      break;
    case 129:                       // 'ge'
      shift(129);                   // 'ge'
      break;
    case 131:                       // 'group'
      shift(131);                   // 'group'
      break;
    case 133:                       // 'gt'
      shift(133);                   // 'gt'
      break;
    case 134:                       // 'idiv'
      shift(134);                   // 'idiv'
      break;
    case 143:                       // 'instance'
      shift(143);                   // 'instance'
      break;
    case 145:                       // 'intersect'
      shift(145);                   // 'intersect'
      break;
    case 146:                       // 'into'
      shift(146);                   // 'into'
      break;
    case 147:                       // 'is'
      shift(147);                   // 'is'
      break;
    case 155:                       // 'le'
      shift(155);                   // 'le'
      break;
    case 157:                       // 'let'
      shift(157);                   // 'let'
      break;
    case 161:                       // 'lt'
      shift(161);                   // 'lt'
      break;
    case 163:                       // 'mod'
      shift(163);                   // 'mod'
      break;
    case 164:                       // 'modify'
      shift(164);                   // 'modify'
      break;
    case 169:                       // 'ne'
      shift(169);                   // 'ne'
      break;
    case 181:                       // 'only'
      shift(181);                   // 'only'
      break;
    case 183:                       // 'or'
      shift(183);                   // 'or'
      break;
    case 184:                       // 'order'
      shift(184);                   // 'order'
      break;
    case 203:                       // 'return'
      shift(203);                   // 'return'
      break;
    case 207:                       // 'satisfies'
      shift(207);                   // 'satisfies'
      break;
    case 219:                       // 'stable'
      shift(219);                   // 'stable'
      break;
    case 220:                       // 'start'
      shift(220);                   // 'start'
      break;
    case 231:                       // 'to'
      shift(231);                   // 'to'
      break;
    case 232:                       // 'treat'
      shift(232);                   // 'treat'
      break;
    case 237:                       // 'union'
      shift(237);                   // 'union'
      break;
    case 249:                       // 'where'
      shift(249);                   // 'where'
      break;
    case 253:                       // 'with'
      shift(253);                   // 'with'
      break;
    case 56:                        // 'ancestor'
      shift(56);                    // 'ancestor'
      break;
    case 57:                        // 'ancestor-or-self'
      shift(57);                    // 'ancestor-or-self'
      break;
    case 65:                        // 'attribute'
      shift(65);                    // 'attribute'
      break;
    case 76:                        // 'child'
      shift(76);                    // 'child'
      break;
    case 79:                        // 'comment'
      shift(79);                    // 'comment'
      break;
    case 86:                        // 'copy'
      shift(86);                    // 'copy'
      break;
    case 91:                        // 'declare'
      shift(91);                    // 'declare'
      break;
    case 93:                        // 'delete'
      shift(93);                    // 'delete'
      break;
    case 94:                        // 'descendant'
      shift(94);                    // 'descendant'
      break;
    case 95:                        // 'descendant-or-self'
      shift(95);                    // 'descendant-or-self'
      break;
    case 102:                       // 'document'
      shift(102);                   // 'document'
      break;
    case 103:                       // 'document-node'
      shift(103);                   // 'document-node'
      break;
    case 104:                       // 'element'
      shift(104);                   // 'element'
      break;
    case 107:                       // 'empty-sequence'
      shift(107);                   // 'empty-sequence'
      break;
    case 112:                       // 'every'
      shift(112);                   // 'every'
      break;
    case 117:                       // 'first'
      shift(117);                   // 'first'
      break;
    case 118:                       // 'following'
      shift(118);                   // 'following'
      break;
    case 119:                       // 'following-sibling'
      shift(119);                   // 'following-sibling'
      break;
    case 128:                       // 'function'
      shift(128);                   // 'function'
      break;
    case 135:                       // 'if'
      shift(135);                   // 'if'
      break;
    case 136:                       // 'import'
      shift(136);                   // 'import'
      break;
    case 142:                       // 'insert'
      shift(142);                   // 'insert'
      break;
    case 148:                       // 'item'
      shift(148);                   // 'item'
      break;
    case 153:                       // 'last'
      shift(153);                   // 'last'
      break;
    case 165:                       // 'module'
      shift(165);                   // 'module'
      break;
    case 167:                       // 'namespace'
      shift(167);                   // 'namespace'
      break;
    case 168:                       // 'namespace-node'
      shift(168);                   // 'namespace-node'
      break;
    case 174:                       // 'node'
      shift(174);                   // 'node'
      break;
    case 185:                       // 'ordered'
      shift(185);                   // 'ordered'
      break;
    case 189:                       // 'parent'
      shift(189);                   // 'parent'
      break;
    case 195:                       // 'preceding'
      shift(195);                   // 'preceding'
      break;
    case 196:                       // 'preceding-sibling'
      shift(196);                   // 'preceding-sibling'
      break;
    case 199:                       // 'processing-instruction'
      shift(199);                   // 'processing-instruction'
      break;
    case 201:                       // 'rename'
      shift(201);                   // 'rename'
      break;
    case 202:                       // 'replace'
      shift(202);                   // 'replace'
      break;
    case 209:                       // 'schema-attribute'
      shift(209);                   // 'schema-attribute'
      break;
    case 210:                       // 'schema-element'
      shift(210);                   // 'schema-element'
      break;
    case 212:                       // 'self'
      shift(212);                   // 'self'
      break;
    case 218:                       // 'some'
      shift(218);                   // 'some'
      break;
    case 226:                       // 'switch'
      shift(226);                   // 'switch'
      break;
    case 227:                       // 'text'
      shift(227);                   // 'text'
      break;
    case 233:                       // 'try'
      shift(233);                   // 'try'
      break;
    case 236:                       // 'typeswitch'
      shift(236);                   // 'typeswitch'
      break;
    case 239:                       // 'unordered'
      shift(239);                   // 'unordered'
      break;
    case 243:                       // 'validate'
      shift(243);                   // 'validate'
      break;
    case 245:                       // 'variable'
      shift(245);                   // 'variable'
      break;
    case 257:                       // 'xquery'
      shift(257);                   // 'xquery'
      break;
    case 55:                        // 'allowing'
      shift(55);                    // 'allowing'
      break;
    case 64:                        // 'at'
      shift(64);                    // 'at'
      break;
    case 66:                        // 'base-uri'
      shift(66);                    // 'base-uri'
      break;
    case 68:                        // 'boundary-space'
      shift(68);                    // 'boundary-space'
      break;
    case 69:                        // 'break'
      shift(69);                    // 'break'
      break;
    case 74:                        // 'catch'
      shift(74);                    // 'catch'
      break;
    case 81:                        // 'construction'
      shift(81);                    // 'construction'
      break;
    case 84:                        // 'context'
      shift(84);                    // 'context'
      break;
    case 85:                        // 'continue'
      shift(85);                    // 'continue'
      break;
    case 87:                        // 'copy-namespaces'
      shift(87);                    // 'copy-namespaces'
      break;
    case 89:                        // 'decimal-format'
      shift(89);                    // 'decimal-format'
      break;
    case 108:                       // 'encoding'
      shift(108);                   // 'encoding'
      break;
    case 115:                       // 'exit'
      shift(115);                   // 'exit'
      break;
    case 116:                       // 'external'
      shift(116);                   // 'external'
      break;
    case 124:                       // 'ft-option'
      shift(124);                   // 'ft-option'
      break;
    case 137:                       // 'in'
      shift(137);                   // 'in'
      break;
    case 138:                       // 'index'
      shift(138);                   // 'index'
      break;
    case 144:                       // 'integrity'
      shift(144);                   // 'integrity'
      break;
    case 154:                       // 'lax'
      shift(154);                   // 'lax'
      break;
    case 175:                       // 'nodes'
      shift(175);                   // 'nodes'
      break;
    case 182:                       // 'option'
      shift(182);                   // 'option'
      break;
    case 186:                       // 'ordering'
      shift(186);                   // 'ordering'
      break;
    case 205:                       // 'revalidation'
      shift(205);                   // 'revalidation'
      break;
    case 208:                       // 'schema'
      shift(208);                   // 'schema'
      break;
    case 211:                       // 'score'
      shift(211);                   // 'score'
      break;
    case 217:                       // 'sliding'
      shift(217);                   // 'sliding'
      break;
    case 223:                       // 'strict'
      shift(223);                   // 'strict'
      break;
    case 234:                       // 'tumbling'
      shift(234);                   // 'tumbling'
      break;
    case 235:                       // 'type'
      shift(235);                   // 'type'
      break;
    case 240:                       // 'updating'
      shift(240);                   // 'updating'
      break;
    case 244:                       // 'value'
      shift(244);                   // 'value'
      break;
    case 246:                       // 'version'
      shift(246);                   // 'version'
      break;
    case 250:                       // 'while'
      shift(250);                   // 'while'
      break;
    case 80:                        // 'constraint'
      shift(80);                    // 'constraint'
      break;
    case 159:                       // 'loop'
      shift(159);                   // 'loop'
      break;
    default:
      shift(204);                   // 'returning'
    }
    eventHandler.endNonterminal("NCName", e0);
  };

  function parse_EQName()
  {
    eventHandler.startNonterminal("EQName", e0);
    lookahead1(16);                 // EQName^Token | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' | 'and' |
                                    // 'as' | 'ascending' | 'at' | 'attribute' | 'base-uri' | 'before' |
                                    // 'boundary-space' | 'break' | 'case' | 'cast' | 'castable' | 'catch' | 'child' |
                                    // 'collation' | 'comment' | 'constraint' | 'construction' | 'context' |
                                    // 'continue' | 'copy' | 'copy-namespaces' | 'count' | 'decimal-format' |
                                    // 'declare' | 'default' | 'delete' | 'descendant' | 'descendant-or-self' |
                                    // 'descending' | 'div' | 'document' | 'document-node' | 'element' | 'else' |
                                    // 'empty' | 'empty-sequence' | 'encoding' | 'end' | 'eq' | 'every' | 'except' |
                                    // 'exit' | 'external' | 'first' | 'following' | 'following-sibling' | 'for' |
                                    // 'ft-option' | 'function' | 'ge' | 'group' | 'gt' | 'idiv' | 'if' | 'import' |
                                    // 'in' | 'index' | 'insert' | 'instance' | 'integrity' | 'intersect' | 'into' |
                                    // 'is' | 'item' | 'last' | 'lax' | 'le' | 'let' | 'loop' | 'lt' | 'mod' |
                                    // 'modify' | 'module' | 'namespace' | 'namespace-node' | 'ne' | 'node' | 'nodes' |
                                    // 'only' | 'option' | 'or' | 'order' | 'ordered' | 'ordering' | 'parent' |
                                    // 'preceding' | 'preceding-sibling' | 'processing-instruction' | 'rename' |
                                    // 'replace' | 'return' | 'returning' | 'revalidation' | 'satisfies' | 'schema' |
                                    // 'schema-attribute' | 'schema-element' | 'score' | 'self' | 'sliding' | 'some' |
                                    // 'stable' | 'start' | 'strict' | 'switch' | 'text' | 'to' | 'treat' | 'try' |
                                    // 'tumbling' | 'type' | 'typeswitch' | 'union' | 'unordered' | 'updating' |
                                    // 'validate' | 'value' | 'variable' | 'version' | 'where' | 'while' | 'with' |
                                    // 'xquery'
    switch (l1)
    {
    case 65:                        // 'attribute'
      shift(65);                    // 'attribute'
      break;
    case 79:                        // 'comment'
      shift(79);                    // 'comment'
      break;
    case 103:                       // 'document-node'
      shift(103);                   // 'document-node'
      break;
    case 104:                       // 'element'
      shift(104);                   // 'element'
      break;
    case 107:                       // 'empty-sequence'
      shift(107);                   // 'empty-sequence'
      break;
    case 128:                       // 'function'
      shift(128);                   // 'function'
      break;
    case 135:                       // 'if'
      shift(135);                   // 'if'
      break;
    case 148:                       // 'item'
      shift(148);                   // 'item'
      break;
    case 168:                       // 'namespace-node'
      shift(168);                   // 'namespace-node'
      break;
    case 174:                       // 'node'
      shift(174);                   // 'node'
      break;
    case 199:                       // 'processing-instruction'
      shift(199);                   // 'processing-instruction'
      break;
    case 209:                       // 'schema-attribute'
      shift(209);                   // 'schema-attribute'
      break;
    case 210:                       // 'schema-element'
      shift(210);                   // 'schema-element'
      break;
    case 226:                       // 'switch'
      shift(226);                   // 'switch'
      break;
    case 227:                       // 'text'
      shift(227);                   // 'text'
      break;
    case 236:                       // 'typeswitch'
      shift(236);                   // 'typeswitch'
      break;
    default:
      parse_FunctionName();
    }
    eventHandler.endNonterminal("EQName", e0);
  }

  function parse_FunctionName()
  {
    eventHandler.startNonterminal("FunctionName", e0);
    switch (l1)
    {
    case 10:                        // EQName^Token
      shift(10);                    // EQName^Token
      break;
    case 53:                        // 'after'
      shift(53);                    // 'after'
      break;
    case 56:                        // 'ancestor'
      shift(56);                    // 'ancestor'
      break;
    case 57:                        // 'ancestor-or-self'
      shift(57);                    // 'ancestor-or-self'
      break;
    case 58:                        // 'and'
      shift(58);                    // 'and'
      break;
    case 62:                        // 'as'
      shift(62);                    // 'as'
      break;
    case 63:                        // 'ascending'
      shift(63);                    // 'ascending'
      break;
    case 67:                        // 'before'
      shift(67);                    // 'before'
      break;
    case 71:                        // 'case'
      shift(71);                    // 'case'
      break;
    case 72:                        // 'cast'
      shift(72);                    // 'cast'
      break;
    case 73:                        // 'castable'
      shift(73);                    // 'castable'
      break;
    case 76:                        // 'child'
      shift(76);                    // 'child'
      break;
    case 77:                        // 'collation'
      shift(77);                    // 'collation'
      break;
    case 86:                        // 'copy'
      shift(86);                    // 'copy'
      break;
    case 88:                        // 'count'
      shift(88);                    // 'count'
      break;
    case 91:                        // 'declare'
      shift(91);                    // 'declare'
      break;
    case 92:                        // 'default'
      shift(92);                    // 'default'
      break;
    case 93:                        // 'delete'
      shift(93);                    // 'delete'
      break;
    case 94:                        // 'descendant'
      shift(94);                    // 'descendant'
      break;
    case 95:                        // 'descendant-or-self'
      shift(95);                    // 'descendant-or-self'
      break;
    case 96:                        // 'descending'
      shift(96);                    // 'descending'
      break;
    case 101:                       // 'div'
      shift(101);                   // 'div'
      break;
    case 102:                       // 'document'
      shift(102);                   // 'document'
      break;
    case 105:                       // 'else'
      shift(105);                   // 'else'
      break;
    case 106:                       // 'empty'
      shift(106);                   // 'empty'
      break;
    case 109:                       // 'end'
      shift(109);                   // 'end'
      break;
    case 111:                       // 'eq'
      shift(111);                   // 'eq'
      break;
    case 112:                       // 'every'
      shift(112);                   // 'every'
      break;
    case 114:                       // 'except'
      shift(114);                   // 'except'
      break;
    case 117:                       // 'first'
      shift(117);                   // 'first'
      break;
    case 118:                       // 'following'
      shift(118);                   // 'following'
      break;
    case 119:                       // 'following-sibling'
      shift(119);                   // 'following-sibling'
      break;
    case 120:                       // 'for'
      shift(120);                   // 'for'
      break;
    case 129:                       // 'ge'
      shift(129);                   // 'ge'
      break;
    case 131:                       // 'group'
      shift(131);                   // 'group'
      break;
    case 133:                       // 'gt'
      shift(133);                   // 'gt'
      break;
    case 134:                       // 'idiv'
      shift(134);                   // 'idiv'
      break;
    case 136:                       // 'import'
      shift(136);                   // 'import'
      break;
    case 142:                       // 'insert'
      shift(142);                   // 'insert'
      break;
    case 143:                       // 'instance'
      shift(143);                   // 'instance'
      break;
    case 145:                       // 'intersect'
      shift(145);                   // 'intersect'
      break;
    case 146:                       // 'into'
      shift(146);                   // 'into'
      break;
    case 147:                       // 'is'
      shift(147);                   // 'is'
      break;
    case 153:                       // 'last'
      shift(153);                   // 'last'
      break;
    case 155:                       // 'le'
      shift(155);                   // 'le'
      break;
    case 157:                       // 'let'
      shift(157);                   // 'let'
      break;
    case 161:                       // 'lt'
      shift(161);                   // 'lt'
      break;
    case 163:                       // 'mod'
      shift(163);                   // 'mod'
      break;
    case 164:                       // 'modify'
      shift(164);                   // 'modify'
      break;
    case 165:                       // 'module'
      shift(165);                   // 'module'
      break;
    case 167:                       // 'namespace'
      shift(167);                   // 'namespace'
      break;
    case 169:                       // 'ne'
      shift(169);                   // 'ne'
      break;
    case 181:                       // 'only'
      shift(181);                   // 'only'
      break;
    case 183:                       // 'or'
      shift(183);                   // 'or'
      break;
    case 184:                       // 'order'
      shift(184);                   // 'order'
      break;
    case 185:                       // 'ordered'
      shift(185);                   // 'ordered'
      break;
    case 189:                       // 'parent'
      shift(189);                   // 'parent'
      break;
    case 195:                       // 'preceding'
      shift(195);                   // 'preceding'
      break;
    case 196:                       // 'preceding-sibling'
      shift(196);                   // 'preceding-sibling'
      break;
    case 201:                       // 'rename'
      shift(201);                   // 'rename'
      break;
    case 202:                       // 'replace'
      shift(202);                   // 'replace'
      break;
    case 203:                       // 'return'
      shift(203);                   // 'return'
      break;
    case 207:                       // 'satisfies'
      shift(207);                   // 'satisfies'
      break;
    case 212:                       // 'self'
      shift(212);                   // 'self'
      break;
    case 218:                       // 'some'
      shift(218);                   // 'some'
      break;
    case 219:                       // 'stable'
      shift(219);                   // 'stable'
      break;
    case 220:                       // 'start'
      shift(220);                   // 'start'
      break;
    case 231:                       // 'to'
      shift(231);                   // 'to'
      break;
    case 232:                       // 'treat'
      shift(232);                   // 'treat'
      break;
    case 233:                       // 'try'
      shift(233);                   // 'try'
      break;
    case 237:                       // 'union'
      shift(237);                   // 'union'
      break;
    case 239:                       // 'unordered'
      shift(239);                   // 'unordered'
      break;
    case 243:                       // 'validate'
      shift(243);                   // 'validate'
      break;
    case 249:                       // 'where'
      shift(249);                   // 'where'
      break;
    case 253:                       // 'with'
      shift(253);                   // 'with'
      break;
    case 257:                       // 'xquery'
      shift(257);                   // 'xquery'
      break;
    case 55:                        // 'allowing'
      shift(55);                    // 'allowing'
      break;
    case 64:                        // 'at'
      shift(64);                    // 'at'
      break;
    case 66:                        // 'base-uri'
      shift(66);                    // 'base-uri'
      break;
    case 68:                        // 'boundary-space'
      shift(68);                    // 'boundary-space'
      break;
    case 69:                        // 'break'
      shift(69);                    // 'break'
      break;
    case 74:                        // 'catch'
      shift(74);                    // 'catch'
      break;
    case 81:                        // 'construction'
      shift(81);                    // 'construction'
      break;
    case 84:                        // 'context'
      shift(84);                    // 'context'
      break;
    case 85:                        // 'continue'
      shift(85);                    // 'continue'
      break;
    case 87:                        // 'copy-namespaces'
      shift(87);                    // 'copy-namespaces'
      break;
    case 89:                        // 'decimal-format'
      shift(89);                    // 'decimal-format'
      break;
    case 108:                       // 'encoding'
      shift(108);                   // 'encoding'
      break;
    case 115:                       // 'exit'
      shift(115);                   // 'exit'
      break;
    case 116:                       // 'external'
      shift(116);                   // 'external'
      break;
    case 124:                       // 'ft-option'
      shift(124);                   // 'ft-option'
      break;
    case 137:                       // 'in'
      shift(137);                   // 'in'
      break;
    case 138:                       // 'index'
      shift(138);                   // 'index'
      break;
    case 144:                       // 'integrity'
      shift(144);                   // 'integrity'
      break;
    case 154:                       // 'lax'
      shift(154);                   // 'lax'
      break;
    case 175:                       // 'nodes'
      shift(175);                   // 'nodes'
      break;
    case 182:                       // 'option'
      shift(182);                   // 'option'
      break;
    case 186:                       // 'ordering'
      shift(186);                   // 'ordering'
      break;
    case 205:                       // 'revalidation'
      shift(205);                   // 'revalidation'
      break;
    case 208:                       // 'schema'
      shift(208);                   // 'schema'
      break;
    case 211:                       // 'score'
      shift(211);                   // 'score'
      break;
    case 217:                       // 'sliding'
      shift(217);                   // 'sliding'
      break;
    case 223:                       // 'strict'
      shift(223);                   // 'strict'
      break;
    case 234:                       // 'tumbling'
      shift(234);                   // 'tumbling'
      break;
    case 235:                       // 'type'
      shift(235);                   // 'type'
      break;
    case 240:                       // 'updating'
      shift(240);                   // 'updating'
      break;
    case 244:                       // 'value'
      shift(244);                   // 'value'
      break;
    case 245:                       // 'variable'
      shift(245);                   // 'variable'
      break;
    case 246:                       // 'version'
      shift(246);                   // 'version'
      break;
    case 250:                       // 'while'
      shift(250);                   // 'while'
      break;
    case 80:                        // 'constraint'
      shift(80);                    // 'constraint'
      break;
    case 159:                       // 'loop'
      shift(159);                   // 'loop'
      break;
    default:
      shift(204);                   // 'returning'
    }
    eventHandler.endNonterminal("FunctionName", e0);
  }

  var lk, b0, e0;
  var l1, b1, e1;
  var eventHandler;

  function error(b, e, s, l, t)
  {
    throw new self.ParseException(b, e, s, l, t);
  }

  function shift(t)
  {
    if (l1 == t)
    {
      whitespace();
      eventHandler.terminal(XQueryTokenizer.TOKEN[l1], b1, e1 > size ? size : e1);
      b0 = b1; e0 = e1; l1 = 0;
    }
    else
    {
      error(b1, e1, 0, l1, t);
    }
  }

  function whitespace()
  {
    if (e0 != b1)
    {
      b0 = e0;
      e0 = b1;
      eventHandler.whitespace(b0, e0);
    }
  }

  function matchW(set)
  {
    var code;
    for (;;)
    {
      code = match(set);
      if (code != 26)               // S^WS
      {
        break;
      }
    }
    return code;
  }

  function lookahead1W(set)
  {
    if (l1 == 0)
    {
      l1 = matchW(set);
      b1 = begin;
      e1 = end;
    }
  }

  function lookahead1(set)
  {
    if (l1 == 0)
    {
      l1 = match(set);
      b1 = begin;
      e1 = end;
    }
  }

  var input;
  var size;
  var begin;
  var end;
  var state;

  function match(tokenset)
  {
    var nonbmp = false;
    begin = end;
    var current = end;
    var result = XQueryTokenizer.INITIAL[tokenset];

    for (var code = result & 2047; code != 0; )
    {
      var charclass;
      var c0 = current < size ? input.charCodeAt(current) : 0;
      ++current;
      if (c0 < 0x80)
      {
        charclass = XQueryTokenizer.MAP0[c0];
      }
      else if (c0 < 0xd800)
      {
        var c1 = c0 >> 4;
        charclass = XQueryTokenizer.MAP1[(c0 & 15) + XQueryTokenizer.MAP1[(c1 & 31) + XQueryTokenizer.MAP1[c1 >> 5]]];
      }
      else
      {
        if (c0 < 0xdc00)
        {
          var c1 = current < size ? input.charCodeAt(current) : 0;
          if (c1 >= 0xdc00 && c1 < 0xe000)
          {
            ++current;
            c0 = ((c0 & 0x3ff) << 10) + (c1 & 0x3ff) + 0x10000;
            nonbmp = true;
          }
        }
        var lo = 0, hi = 5;
        for (var m = 3; ; m = (hi + lo) >> 1)
        {
          if (XQueryTokenizer.MAP2[m] > c0) hi = m - 1;
          else if (XQueryTokenizer.MAP2[6 + m] < c0) lo = m + 1;
          else {charclass = XQueryTokenizer.MAP2[12 + m]; break;}
          if (lo > hi) {charclass = 0; break;}
        }
      }

      state = code;
      var i0 = (charclass << 11) + code - 1;
      code = XQueryTokenizer.TRANSITION[(i0 & 15) + XQueryTokenizer.TRANSITION[i0 >> 4]];

      if (code > 2047)
      {
        result = code;
        code &= 2047;
        end = current;
      }
    }

    result >>= 11;
    if (result == 0)
    {
      end = current - 1;
      var c1 = end < size ? input.charCodeAt(end) : 0;
      if (c1 >= 0xdc00 && c1 < 0xe000) --end;
      return error(begin, end, state, -1, -1);
    }

    if (nonbmp)
    {
      for (var i = result >> 9; i > 0; --i)
      {
        --end;
        var c1 = end < size ? input.charCodeAt(end) : 0;
        if (c1 >= 0xdc00 && c1 < 0xe000) --end;
      }
    }
    else
    {
      end -= result >> 9;
    }

    return (result & 511) - 1;
  }

  function getExpectedTokenSet(s)
  {
    var set = [];
    if (s > 0)
    {
      for (var i = 0; i < 263; i += 32)
      {
        var j = i;
        for (var f = ec(i >>> 5, s); f != 0; f >>>= 1, ++j)
        {
          if ((f & 1) != 0)
          {
            set[set.length] = XQueryTokenizer.TOKEN[j];
          }
        }
      }
    }
    return set;
  }

  function ec(t, s)
  {
    var i0 = t * 1385 + s - 1;
    var i1 = i0 >> 1;
    var i2 = i1 >> 2;
    return XQueryTokenizer.EXPECTED[(i0 & 1) + XQueryTokenizer.EXPECTED[(i1 & 3) + XQueryTokenizer.EXPECTED[(i2 & 3) + XQueryTokenizer.EXPECTED[i2 >> 2]]]];
  }
}

XQueryTokenizer.MAP0 =
[
  /*   0 */ 66, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 5,
  /*  36 */ 6, 7, 8, 9, 10, 11, 12, 13, 7, 14, 15, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 19, 20, 21, 22, 23,
  /*  64 */ 24, 25, 26, 27, 28, 29, 26, 30, 30, 30, 30, 30, 31, 32, 30, 30, 30, 33, 30, 30, 34, 30, 30, 30, 35, 30, 30,
  /*  91 */ 36, 7, 37, 7, 30, 7, 38, 39, 40, 41, 42, 43, 44, 45, 46, 30, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
  /* 119 */ 59, 60, 61, 30, 62, 7, 63, 64, 7
];

XQueryTokenizer.MAP1 =
[
  /*   0 */ 108, 124, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 156, 181, 181, 181, 181,
  /*  21 */ 181, 214, 215, 213, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  42 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  63 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  84 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /* 105 */ 214, 214, 214, 247, 261, 277, 293, 309, 354, 370, 386, 423, 423, 423, 415, 338, 330, 338, 330, 338, 338,
  /* 126 */ 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 440, 440, 440, 440, 440, 440, 440,
  /* 147 */ 323, 338, 338, 338, 338, 338, 338, 338, 338, 401, 423, 423, 424, 422, 423, 423, 338, 338, 338, 338, 338,
  /* 168 */ 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 423, 423, 423, 423, 423, 423, 423, 423,
  /* 189 */ 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423,
  /* 210 */ 423, 423, 423, 337, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338,
  /* 231 */ 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 423, 66, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 256 */ 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 7,
  /* 290 */ 14, 15, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 26, 30,
  /* 317 */ 30, 30, 30, 30, 31, 32, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 7, 30, 30, 30, 30, 30, 30,
  /* 344 */ 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 33, 30, 30, 34, 30, 30, 30, 35, 30, 30, 36, 7, 37, 7, 30, 7, 38,
  /* 372 */ 39, 40, 41, 42, 43, 44, 45, 46, 30, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 30, 62, 7,
  /* 399 */ 63, 64, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 30, 30, 7, 7, 7, 7, 7, 7, 7, 65, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
  /* 433 */ 7, 7, 7, 7, 7, 7, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65
];

XQueryTokenizer.MAP2 =
[
  /*  0 */ 57344, 63744, 64976, 65008, 65536, 983040, 63743, 64975, 65007, 65533, 983039, 1114111, 7, 30, 7, 30, 30, 7
];

XQueryTokenizer.INITIAL =
[
  /*  0 */ 1, 2, 3, 4, 5, 18438, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
];

XQueryTokenizer.TRANSITION =
[
  /*     0 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*    15 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*    30 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*    45 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*    60 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*    75 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*    90 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   105 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   120 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 8576, 8592, 8633, 11316, 8670, 8995, 8970, 8687,
  /*   136 */ 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9672, 13087, 8671, 8827, 21697, 8671, 9499, 8901,
  /*   153 */ 8921, 8950, 8966, 9132, 11812, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 9148,
  /*   170 */ 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521,
  /*   187 */ 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787,
  /*   204 */ 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145,
  /*   220 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   235 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   250 */ 10145, 10145, 10145, 10145, 10145, 10145, 9952, 8592, 9968, 11316, 8670, 8995, 8970, 10010, 10360, 8737,
  /*   266 */ 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9672, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950,
  /*   283 */ 8966, 9132, 11812, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 9148, 12435, 9174,
  /*   300 */ 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562,
  /*   317 */ 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741,
  /*   334 */ 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   350 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   365 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   380 */ 10145, 10145, 10145, 10145, 10045, 10125, 10112, 11286, 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844,
  /*   396 */ 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132,
  /*   413 */ 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212,
  /*   430 */ 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456,
  /*   447 */ 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183,
  /*   464 */ 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   480 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   495 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   510 */ 10145, 10145, 10161, 10125, 10177, 9813, 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844, 21689, 9898,
  /*   526 */ 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617,
  /*   543 */ 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228,
  /*   560 */ 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578,
  /*   577 */ 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728,
  /*   594 */ 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   609 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   624 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   639 */ 10145, 10206, 11865, 10256, 11241, 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844, 21689, 9898, 8757,
  /*   655 */ 8797, 11710, 9242, 15688, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 9612, 8617, 8986,
  /*   672 */ 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270,
  /*   689 */ 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601,
  /*   706 */ 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934,
  /*   723 */ 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   738 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   753 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   768 */ 10285, 10125, 10112, 11316, 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797,
  /*   784 */ 11710, 9242, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018,
  /*   801 */ 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325,
  /*   818 */ 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628,
  /*   835 */ 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920,
  /*   852 */ 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   867 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   882 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10045,
  /*   897 */ 10125, 10112, 11316, 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710,
  /*   913 */ 9242, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855,
  /*   930 */ 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341,
  /*   947 */ 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841,
  /*   964 */ 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101,
  /*   981 */ 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*   996 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1011 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10301, 10125,
  /*  1026 */ 10351, 9254, 8670, 8995, 8970, 8687, 11057, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 18957,
  /*  1043 */ 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886,
  /*  1060 */ 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427,
  /*  1077 */ 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658,
  /*  1094 */ 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772,
  /*  1111 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1126 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1141 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10376, 10125, 10392, 11301,
  /*  1156 */ 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827,
  /*  1173 */ 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546,
  /*  1190 */ 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442,
  /*  1207 */ 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718,
  /*  1224 */ 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145,
  /*  1241 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1256 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1271 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10422, 10125, 10438, 11316, 8670, 8995,
  /*  1286 */ 8970, 10467, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697,
  /*  1302 */ 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056,
  /*  1319 */ 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486,
  /*  1336 */ 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755,
  /*  1353 */ 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145,
  /*  1370 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1385 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1400 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10511, 14956, 10527, 11316, 8670, 8995, 8970,
  /*  1415 */ 10556, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697, 8671,
  /*  1431 */ 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085,
  /*  1448 */ 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867,
  /*  1465 */ 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744,
  /*  1482 */ 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145,
  /*  1499 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1514 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1529 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10582, 10125, 10112, 11316, 8670, 8995, 8970, 8687,
  /*  1544 */ 16850, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 14852, 8671, 8827, 21697, 8671, 9499, 8901,
  /*  1561 */ 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141,
  /*  1578 */ 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521,
  /*  1595 */ 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787,
  /*  1612 */ 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145,
  /*  1628 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1643 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1658 */ 10145, 10145, 10145, 10145, 10145, 10145, 10598, 10125, 10112, 11316, 8670, 8995, 8970, 8687, 17857, 8737,
  /*  1674 */ 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950,
  /*  1691 */ 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174,
  /*  1708 */ 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562,
  /*  1725 */ 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741,
  /*  1742 */ 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1758 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1773 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1788 */ 10145, 10145, 10145, 10145, 10614, 9382, 10112, 10630, 10645, 15359, 10910, 10663, 10690, 10646, 14400,
  /*  1803 */ 10646, 10646, 15428, 13152, 15429, 15429, 10738, 16339, 10646, 10646, 10646, 10646, 10646, 15429, 15429,
  /*  1818 */ 15429, 15429, 15429, 16683, 10566, 15288, 10646, 10646, 10646, 13336, 10814, 15429, 15429, 15429, 15429,
  /*  1833 */ 19569, 9158, 10646, 10849, 10646, 10646, 15427, 20237, 15429, 15429, 10908, 9155, 10646, 10646, 15800,
  /*  1848 */ 15361, 15429, 15429, 10866, 10829, 10887, 10646, 15426, 10906, 15429, 15553, 10926, 14293, 10945, 15429,
  /*  1863 */ 13913, 10972, 13721, 10997, 11404, 11013, 18582, 14005, 13339, 16190, 14601, 14289, 14005, 15991, 15340,
  /*  1878 */ 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1893 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  1908 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 11073, 10190, 10112,
  /*  1923 */ 11089, 10645, 15359, 19710, 10663, 10316, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 11154,
  /*  1938 */ 16339, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429, 16683, 9158, 10646, 10646,
  /*  1953 */ 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429, 19569, 9158, 10646, 10646, 10646, 10646, 15427,
  /*  1968 */ 15429, 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646,
  /*  1983 */ 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337,
  /*  1998 */ 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2013 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2028 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2043 */ 10145, 10145, 10145, 10145, 10145, 11184, 10125, 10112, 11226, 8670, 8995, 8970, 8687, 10360, 8737, 8722,
  /*  2059 */ 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966,
  /*  2076 */ 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199,
  /*  2093 */ 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031,
  /*  2110 */ 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904,
  /*  2127 */ 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2143 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2158 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2173 */ 10145, 10145, 10145, 11362, 10190, 10112, 11378, 10645, 15359, 19710, 11428, 10221, 10646, 10646, 10646,
  /*  2188 */ 10646, 15428, 15429, 15429, 15429, 11456, 17152, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429,
  /*  2203 */ 15429, 15429, 16379, 19216, 10646, 10646, 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429, 19808,
  /*  2218 */ 11486, 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429, 13357, 11508, 10646, 10646, 10646, 15361,
  /*  2233 */ 15429, 15429, 15429, 20513, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913,
  /*  2248 */ 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048,
  /*  2263 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2278 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2293 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 11533, 10125, 11549, 11578,
  /*  2308 */ 11593, 11703, 8970, 8606, 9412, 11625, 11610, 12099, 12110, 12161, 8757, 8797, 11710, 9702, 17029, 11594,
  /*  2324 */ 11645, 12118, 11594, 11672, 8901, 8921, 8950, 8966, 9132, 8878, 11210, 11694, 11726, 17057, 11748, 12149,
  /*  2340 */ 9285, 9546, 9056, 9085, 9123, 10141, 12542, 11764, 11789, 11924, 11895, 11838, 9270, 9325, 9341, 9398,
  /*  2356 */ 20463, 11678, 11881, 11911, 11801, 9356, 9521, 9537, 11940, 11739, 11659, 11970, 9578, 9601, 11956, 17043,
  /*  2372 */ 17068, 9658, 9688, 11986, 12012, 9744, 12028, 12044, 12084, 11629, 12167, 11773, 12134, 11996, 9069,
  /*  2387 */ 12183, 9426, 12199, 9300, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2402 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2417 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2432 */ 10045, 10125, 10112, 11316, 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797,
  /*  2448 */ 11710, 9801, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 9100, 8617, 8986, 9018,
  /*  2465 */ 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 12215, 12252, 9174, 9199, 9212, 9470, 9228, 9270, 9325,
  /*  2482 */ 9341, 12268, 11562, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 12284, 9031, 9456, 9642, 9578, 9601, 9628,
  /*  2499 */ 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920,
  /*  2516 */ 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2531 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2546 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12300,
  /*  2561 */ 10125, 10112, 9254, 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242,
  /*  2578 */ 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040,
  /*  2595 */ 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398,
  /*  2612 */ 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855,
  /*  2629 */ 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936,
  /*  2646 */ 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2661 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2676 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12316, 10125, 10112,
  /*  2691 */ 11271, 8670, 8995, 8970, 8687, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671,
  /*  2708 */ 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285,
  /*  2725 */ 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505,
  /*  2742 */ 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688,
  /*  2759 */ 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145,
  /*  2776 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2791 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2806 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12332, 10269, 12348, 11316, 8670,
  /*  2821 */ 8995, 9585, 11199, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 8811, 13087, 8671, 8827,
  /*  2837 */ 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 12058, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546,
  /*  2854 */ 9056, 9085, 9123, 12364, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442,
  /*  2871 */ 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718,
  /*  2888 */ 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145,
  /*  2905 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2920 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  2935 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12387, 10451, 10112, 11256, 8670, 8995,
  /*  2950 */ 8970, 12424, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697,
  /*  2966 */ 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056,
  /*  2983 */ 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486,
  /*  3000 */ 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755,
  /*  3017 */ 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145,
  /*  3034 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3049 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3064 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12451, 10125, 12496, 11316, 8670, 8995, 8970,
  /*  3079 */ 12531, 10360, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697, 8671,
  /*  3095 */ 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085,
  /*  3112 */ 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867,
  /*  3129 */ 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744,
  /*  3146 */ 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145,
  /*  3163 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3178 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3193 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 15642, 10112, 12599, 10645, 15359, 19710, 12641,
  /*  3208 */ 10752, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 12657, 12709, 10646, 10646, 10646, 10646,
  /*  3223 */ 10646, 15429, 15429, 15429, 15429, 15429, 16629, 9158, 10646, 10646, 10646, 10646, 13336, 15429, 15429,
  /*  3238 */ 15429, 15429, 15429, 12742, 12402, 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429, 10908, 11508,
  /*  3253 */ 10646, 10646, 10646, 15361, 15429, 15429, 15429, 12770, 10646, 10646, 15426, 15429, 15429, 13446, 10646,
  /*  3268 */ 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289,
  /*  3283 */ 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3298 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3313 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3328 */ 12558, 15642, 10112, 12599, 10645, 15359, 19710, 12641, 10752, 10646, 10646, 10646, 10646, 15428, 15429,
  /*  3343 */ 15429, 15429, 12657, 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429, 16629,
  /*  3358 */ 9158, 10646, 10646, 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429, 14810, 12402, 10646, 10646,
  /*  3373 */ 10646, 10646, 15427, 15429, 15429, 15429, 10908, 11508, 10646, 10646, 10646, 15361, 15429, 15429, 15429,
  /*  3388 */ 20513, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007,
  /*  3403 */ 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145,
  /*  3418 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3433 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3448 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 15642, 10112, 12599, 10645, 15359, 19710,
  /*  3463 */ 12641, 10752, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 12790, 12709, 10646, 10646, 10646,
  /*  3478 */ 10646, 10646, 15429, 15429, 15429, 15429, 15429, 16629, 9158, 10646, 10646, 10646, 10646, 13336, 15429,
  /*  3493 */ 15429, 15429, 15429, 15429, 14810, 12402, 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429, 10908,
  /*  3508 */ 11508, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 20513, 10646, 10646, 15426, 15429, 15429, 13446,
  /*  3523 */ 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360,
  /*  3538 */ 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3553 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3568 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3583 */ 10145, 12558, 15642, 10112, 12599, 10645, 15359, 19710, 12641, 10752, 10646, 10646, 10646, 10646, 15428,
  /*  3598 */ 15429, 15429, 15429, 12657, 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429,
  /*  3613 */ 18237, 9158, 10646, 10646, 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429, 14810, 12402, 10646,
  /*  3628 */ 10646, 10646, 10646, 15427, 15429, 15429, 15429, 10908, 11508, 10646, 10646, 10646, 15361, 15429, 15429,
  /*  3643 */ 15429, 20513, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429,
  /*  3658 */ 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145,
  /*  3673 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3688 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3703 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 15642, 10112, 12806, 10645, 15359,
  /*  3718 */ 19710, 12641, 14540, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 12657, 12709, 10646, 10646,
  /*  3733 */ 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429, 16629, 9158, 10646, 10646, 10646, 10646, 13336,
  /*  3748 */ 15429, 15429, 15429, 15429, 15429, 14810, 12402, 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429,
  /*  3763 */ 10908, 11508, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 20513, 10646, 10646, 15426, 15429, 15429,
  /*  3778 */ 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007,
  /*  3793 */ 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3808 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3823 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3838 */ 10145, 10145, 12558, 15642, 10112, 12599, 10645, 15359, 19710, 12641, 10752, 10646, 10646, 10646, 10646,
  /*  3853 */ 15428, 15429, 15429, 15429, 11154, 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429,
  /*  3868 */ 15429, 15082, 9158, 10646, 10646, 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429, 19569, 9158,
  /*  3883 */ 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429,
  /*  3898 */ 15429, 15429, 10829, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335,
  /*  3913 */ 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145,
  /*  3928 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3943 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  3958 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 15642, 10112, 12599, 10645,
  /*  3973 */ 15359, 19710, 12845, 10752, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 11154, 12709, 10646,
  /*  3988 */ 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429, 15082, 9158, 10646, 10646, 10646, 10646,
  /*  4003 */ 13336, 15429, 15429, 15429, 15429, 15429, 19569, 9158, 10646, 10646, 10646, 10646, 15427, 15429, 15429,
  /*  4018 */ 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646, 15426, 15429,
  /*  4033 */ 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339,
  /*  4048 */ 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4063 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4078 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4093 */ 10145, 10145, 10145, 12558, 15923, 10112, 12599, 10645, 15359, 19710, 12641, 10752, 10646, 10646, 10646,
  /*  4108 */ 10646, 15428, 15429, 15429, 15429, 11154, 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429,
  /*  4123 */ 15429, 15429, 15082, 9158, 10646, 10646, 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429, 19569,
  /*  4138 */ 9158, 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361,
  /*  4153 */ 15429, 15429, 15429, 10829, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913,
  /*  4168 */ 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048,
  /*  4183 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4198 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4213 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12861, 12877, 10112, 12893,
  /*  4228 */ 10645, 15359, 19710, 12641, 10752, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 11154, 12709,
  /*  4243 */ 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429, 15082, 9158, 10646, 10646, 10646,
  /*  4258 */ 10646, 13336, 15429, 15429, 15429, 15429, 15429, 19569, 9158, 10646, 10646, 10646, 10646, 15427, 15429,
  /*  4273 */ 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646, 15426,
  /*  4288 */ 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005,
  /*  4303 */ 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4318 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4333 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4348 */ 10145, 10145, 10145, 10145, 12558, 15642, 10112, 12599, 10645, 15359, 19710, 12641, 10752, 10646, 10646,
  /*  4363 */ 10646, 10646, 15428, 15429, 15429, 15429, 11154, 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429,
  /*  4378 */ 15429, 15429, 15429, 15082, 9158, 10646, 10646, 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429,
  /*  4393 */ 19569, 9158, 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429, 21304, 9155, 10646, 10646, 10646,
  /*  4408 */ 15361, 15429, 15429, 15429, 10829, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429,
  /*  4423 */ 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340,
  /*  4438 */ 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4453 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4468 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12932, 15642, 10112,
  /*  4483 */ 12599, 10645, 15359, 19710, 12641, 10752, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 11154,
  /*  4498 */ 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429, 15082, 9158, 10646, 10646,
  /*  4513 */ 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429, 19569, 9158, 10646, 10646, 10646, 10646, 15427,
  /*  4528 */ 15429, 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646,
  /*  4543 */ 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337,
  /*  4558 */ 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4573 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4588 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4603 */ 10145, 10145, 10145, 10145, 10145, 10045, 10125, 10112, 11316, 8670, 8995, 8970, 8687, 12973, 8737, 8722,
  /*  4619 */ 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966,
  /*  4636 */ 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199,
  /*  4653 */ 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031,
  /*  4670 */ 9456, 9642, 9578, 9601, 12989, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904,
  /*  4687 */ 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4703 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4718 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4733 */ 10145, 10145, 10145, 13005, 10540, 10112, 11316, 8670, 8995, 9002, 8687, 10360, 8737, 8722, 9844, 21689,
  /*  4749 */ 9898, 8757, 8797, 11710, 11852, 13087, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878,
  /*  4766 */ 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470,
  /*  4783 */ 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642,
  /*  4800 */ 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871,
  /*  4817 */ 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4833 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4848 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4863 */ 10145, 12558, 13057, 13073, 12599, 13117, 13133, 13168, 12641, 10752, 10646, 10646, 10646, 20198, 15428,
  /*  4878 */ 15429, 15429, 16183, 12657, 13184, 20588, 10646, 10646, 13033, 13210, 17204, 13252, 15429, 19902, 16487,
  /*  4893 */ 17015, 9158, 13272, 10646, 13316, 13333, 16404, 13529, 13355, 13540, 19333, 20428, 14810, 12466, 20928,
  /*  4908 */ 10646, 20375, 10798, 19927, 13373, 15429, 15463, 16675, 11508, 16146, 13395, 10646, 13648, 13432, 16478,
  /*  4923 */ 15429, 20513, 20022, 12916, 15426, 13465, 16941, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429,
  /*  4938 */ 14007, 13338, 14086, 13486, 10871, 17583, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145,
  /*  4953 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4968 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  4983 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 13502, 10112, 12599, 10645, 15359,
  /*  4998 */ 19710, 12641, 10752, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 12657, 12709, 10646, 10646,
  /*  5013 */ 10646, 15739, 16980, 15429, 15429, 15429, 15429, 13518, 16629, 9158, 10646, 10646, 10646, 10646, 13336,
  /*  5028 */ 15429, 15429, 15429, 15429, 15429, 14810, 13564, 10646, 10646, 10646, 19860, 19557, 15429, 15429, 15429,
  /*  5043 */ 15838, 11508, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 20513, 10646, 10646, 15426, 15429, 15429,
  /*  5058 */ 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13580, 13605,
  /*  5073 */ 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5088 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5103 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5118 */ 10145, 10145, 12558, 13630, 10112, 12599, 10645, 13646, 20323, 12641, 10752, 13664, 13680, 10646, 10646,
  /*  5133 */ 13699, 13715, 15429, 15429, 12657, 12709, 20668, 13317, 10646, 13737, 10646, 16704, 13757, 13779, 19378,
  /*  5148 */ 15429, 16629, 9158, 10646, 10646, 10646, 20410, 13336, 15429, 15429, 15429, 15429, 13801, 14810, 12402,
  /*  5163 */ 10646, 10646, 18513, 10646, 15427, 15429, 15429, 19666, 10908, 11508, 10646, 18071, 10646, 15361, 15429,
  /*  5178 */ 13822, 15429, 20642, 10646, 13842, 21358, 18889, 13860, 13446, 10646, 15982, 15429, 15942, 13913, 13335,
  /*  5193 */ 15429, 14007, 13338, 14003, 13337, 14494, 13877, 13907, 15360, 14289, 14005, 15991, 10956, 11048, 10145,
  /*  5208 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5223 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5238 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 13932, 13948, 10112, 12599, 11393,
  /*  5253 */ 15316, 19710, 12641, 10752, 13964, 13916, 19491, 15191, 13980, 14000, 14023, 17739, 12657, 12709, 10646,
  /*  5268 */ 10646, 10646, 19010, 10646, 15429, 15429, 15429, 15429, 14083, 16629, 11822, 14102, 14121, 10646, 10646,
  /*  5283 */ 14594, 14140, 14697, 15429, 15429, 21493, 14810, 14166, 10646, 10646, 16554, 10646, 21264, 15429, 15429,
  /*  5298 */ 14199, 10908, 11508, 18046, 21610, 15516, 15361, 20264, 14067, 14219, 20513, 10646, 10646, 15426, 15429,
  /*  5313 */ 15429, 13446, 10646, 20963, 15429, 19690, 13913, 13335, 15429, 14007, 13338, 14003, 14238, 14259, 14339,
  /*  5328 */ 14283, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5343 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5358 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5373 */ 10145, 10145, 10145, 12558, 14309, 10112, 12806, 14325, 14362, 14422, 12641, 14540, 17162, 14438, 12774,
  /*  5388 */ 11517, 14454, 14489, 14510, 16872, 14526, 14579, 14617, 10074, 11119, 14648, 9994, 14678, 14713, 14754,
  /*  5403 */ 14782, 14798, 14838, 9158, 19251, 10646, 17548, 10488, 20082, 17803, 14868, 15429, 14891, 18532, 14944,
  /*  5418 */ 13020, 21592, 10646, 14972, 15005, 17346, 15872, 21197, 15038, 15074, 11508, 13416, 14989, 10235, 15361,
  /*  5433 */ 15098, 15119, 15141, 20733, 15158, 15296, 15207, 20813, 20542, 15223, 19078, 17180, 21018, 15258, 13913,
  /*  5448 */ 17508, 15429, 15279, 15312, 15332, 18443, 17265, 15356, 15377, 15393, 14289, 13806, 15446, 15340, 11048,
  /*  5463 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5478 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5493 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 15479, 10112, 12599,
  /*  5508 */ 15495, 19995, 19710, 12641, 10752, 14389, 10646, 10646, 10646, 15539, 15429, 15429, 15429, 12657, 12709,
  /*  5523 */ 10646, 10646, 10646, 11492, 10646, 15429, 15429, 15429, 15429, 15578, 16629, 9158, 10646, 10646, 18983,
  /*  5538 */ 10646, 13336, 15429, 15429, 17122, 15429, 15429, 14810, 12402, 10646, 10646, 19270, 10646, 15427, 15429,
  /*  5553 */ 15429, 18467, 10908, 11508, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 20513, 10646, 10646, 15426,
  /*  5568 */ 15429, 15429, 13891, 10646, 13338, 17257, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005,
  /*  5583 */ 13339, 14007, 15360, 14289, 21270, 15596, 15629, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5598 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5613 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5628 */ 10145, 10145, 10145, 10145, 12558, 15658, 15674, 12599, 10645, 15359, 19710, 12641, 10752, 10646, 10646,
  /*  5643 */ 10646, 10646, 15428, 15429, 15429, 15429, 11154, 15704, 10646, 10646, 10646, 10646, 10646, 15429, 15429,
  /*  5658 */ 15429, 15429, 15429, 16951, 9158, 10646, 10646, 15737, 10646, 13336, 15429, 15429, 19324, 15429, 15429,
  /*  5673 */ 19569, 9158, 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429, 10908, 9155, 10646, 10646, 21149,
  /*  5688 */ 15361, 15429, 15429, 15755, 19073, 10722, 17654, 20233, 19315, 15777, 15052, 14738, 15816, 14222, 15854,
  /*  5703 */ 20859, 13283, 14464, 15888, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 14563, 15910,
  /*  5718 */ 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5733 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5748 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 15642, 10112,
  /*  5763 */ 12599, 21744, 10085, 15125, 12641, 10752, 10646, 10646, 10647, 10646, 15428, 15429, 15429, 15939, 11154,
  /*  5778 */ 12709, 10646, 10646, 10646, 10646, 16009, 15429, 15429, 15429, 15429, 15429, 15958, 9158, 16007, 10646,
  /*  5793 */ 10646, 10646, 13336, 17355, 15429, 15429, 15429, 15429, 19569, 9158, 10646, 10646, 10646, 11027, 15427,
  /*  5808 */ 15429, 15429, 15429, 16025, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646,
  /*  5823 */ 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 11032, 15429, 18847, 13338, 14003, 13337,
  /*  5838 */ 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5853 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5868 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5883 */ 10145, 10145, 10145, 10145, 10145, 12558, 16049, 10112, 12599, 16065, 20744, 15761, 12641, 10752, 18079,
  /*  5898 */ 16098, 10646, 16131, 20889, 16169, 15429, 16206, 16236, 12709, 20202, 10646, 19222, 16082, 12726, 15429,
  /*  5913 */ 16252, 15429, 16271, 16309, 16325, 18142, 15714, 10646, 10646, 12829, 13236, 16365, 15429, 15429, 17687,
  /*  5928 */ 17782, 19569, 10021, 10646, 16395, 19619, 12583, 16428, 18908, 16448, 16469, 16503, 9107, 16527, 16545,
  /*  5943 */ 16578, 10981, 21511, 16615, 16664, 15408, 17715, 10792, 17765, 16699, 16720, 13446, 10646, 13338, 15429,
  /*  5958 */ 15429, 14267, 8706, 16741, 16762, 13338, 14003, 14917, 16784, 13339, 14007, 15360, 16825, 16817, 15991,
  /*  5973 */ 15340, 16841, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  5988 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6003 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 15642,
  /*  6018 */ 10112, 12599, 10645, 15359, 19710, 12641, 10752, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429,
  /*  6033 */ 11154, 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429, 15082, 17467, 10646,
  /*  6048 */ 10646, 10646, 10646, 13336, 16866, 15429, 15429, 15429, 15429, 19569, 9158, 10646, 10646, 10646, 10646,
  /*  6063 */ 15427, 15429, 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646,
  /*  6078 */ 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003,
  /*  6093 */ 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145,
  /*  6108 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6123 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6138 */ 10145, 10145, 10145, 10145, 10145, 10145, 12558, 16888, 15674, 12599, 16904, 16928, 21070, 12845, 11168,
  /*  6153 */ 16153, 18577, 10029, 16967, 17001, 20694, 16453, 17084, 11154, 15704, 13194, 13741, 10646, 18040, 17486,
  /*  6168 */ 13256, 17100, 17119, 16746, 15429, 17138, 9158, 10646, 10646, 16074, 20657, 17178, 15429, 15429, 20341,
  /*  6183 */ 20294, 17196, 19569, 9158, 17721, 10646, 10646, 10646, 15427, 14689, 15429, 15429, 10908, 9155, 17220,
  /*  6198 */ 10646, 10646, 17244, 17281, 15429, 21628, 10829, 12236, 10646, 15426, 20837, 15429, 13446, 10646, 14554,
  /*  6213 */ 15429, 19290, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 17301, 17317, 14005,
  /*  6228 */ 20611, 17333, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6243 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6258 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558,
  /*  6273 */ 17380, 10112, 12599, 12614, 19880, 19710, 17396, 10752, 15523, 10646, 16109, 17412, 21533, 15429, 19342,
  /*  6288 */ 17445, 11154, 12709, 16912, 17483, 14176, 10646, 10646, 19728, 19369, 13826, 15429, 15429, 16033, 12509,
  /*  6303 */ 15022, 10646, 10646, 17502, 13336, 15429, 17524, 15429, 10096, 15429, 17848, 9158, 10646, 10646, 10646,
  /*  6318 */ 10646, 15427, 15429, 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829,
  /*  6333 */ 17546, 10646, 15426, 17564, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13041,
  /*  6348 */ 13763, 17581, 17599, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145,
  /*  6363 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6378 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6393 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 17623, 10112, 12599, 17639, 14662, 17670, 12641,
  /*  6408 */ 10752, 10495, 12719, 13683, 10646, 13589, 20702, 15429, 17686, 11154, 12709, 17703, 10646, 10646, 10646,
  /*  6423 */ 10646, 19360, 17737, 15429, 15429, 15429, 15082, 18744, 10646, 10646, 18927, 10646, 17755, 17781, 15429,
  /*  6438 */ 15429, 17798, 17920, 19569, 9158, 14632, 10766, 10780, 17819, 19971, 17836, 17873, 17899, 10908, 12371,
  /*  6453 */ 16985, 19636, 20482, 17936, 14473, 20785, 19186, 16286, 16115, 12685, 13294, 18341, 17958, 14905, 17981,
  /*  6468 */ 13338, 17997, 17912, 16768, 13335, 18403, 14007, 20602, 18013, 12480, 18029, 19502, 18062, 15360, 14289,
  /*  6483 */ 13470, 18095, 15340, 18132, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6498 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6513 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6528 */ 12558, 18158, 10112, 12599, 18174, 18223, 18272, 12641, 10752, 10646, 16562, 18288, 18256, 15428, 15263,
  /*  6543 */ 18304, 18320, 18357, 18373, 18419, 12625, 18437, 10646, 15015, 18459, 16725, 18483, 15429, 13984, 15082,
  /*  6558 */ 9158, 10646, 17228, 15058, 10646, 13336, 15429, 15142, 15429, 18529, 15429, 14766, 18250, 10646, 10646,
  /*  6573 */ 10646, 21104, 15427, 15429, 15429, 15429, 18605, 9983, 10646, 10330, 10646, 15456, 15429, 18548, 15429,
  /*  6588 */ 14377, 10240, 10646, 14346, 21572, 15429, 13446, 10646, 13338, 15429, 15429, 18565, 10890, 18598, 19673,
  /*  6603 */ 18621, 18658, 18684, 18707, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 18734, 10145, 10145, 10145,
  /*  6618 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6633 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6648 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 18770, 10112, 12599, 11104, 15422, 18786,
  /*  6663 */ 18802, 10752, 18990, 20517, 14105, 15721, 14928, 18818, 15429, 18834, 18872, 12709, 10646, 10646, 8654,
  /*  6678 */ 10646, 10646, 15429, 15429, 15429, 18888, 15429, 16511, 16642, 10646, 19479, 10646, 10646, 13336, 15429,
  /*  6693 */ 15613, 18905, 15429, 15429, 18495, 8648, 10646, 10646, 18924, 10646, 15427, 15429, 21215, 15429, 10908,
  /*  6708 */ 17464, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646, 15426, 15429, 15429, 13446,
  /*  6723 */ 10646, 13338, 15429, 15429, 13913, 13335, 15429, 21025, 21235, 14003, 13337, 14005, 13339, 14007, 15360,
  /*  6738 */ 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6753 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6768 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6783 */ 10145, 12558, 15642, 18943, 12599, 12821, 16349, 15103, 12641, 10752, 10646, 10646, 10646, 10646, 15428,
  /*  6798 */ 15429, 15429, 15429, 11154, 18973, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429,
  /*  6813 */ 14150, 9158, 10646, 10646, 10646, 10646, 13336, 15429, 15429, 15429, 15429, 15429, 19569, 9158, 10646,
  /*  6828 */ 10646, 10646, 10646, 15427, 15429, 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429,
  /*  6843 */ 15429, 10829, 10646, 10646, 15426, 15429, 15429, 13446, 19006, 13338, 13379, 15429, 13913, 13335, 15429,
  /*  6858 */ 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145,
  /*  6873 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6888 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  6903 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 19026, 10112, 12599, 19042, 19058,
  /*  6918 */ 19094, 12641, 10752, 10646, 18202, 18207, 20184, 15428, 15830, 15580, 16220, 19110, 19126, 10646, 13228,
  /*  6933 */ 10646, 18642, 13614, 19142, 16255, 15429, 15429, 19164, 19202, 10674, 10646, 18754, 19238, 19267, 15242,
  /*  6948 */ 19286, 17103, 19306, 19394, 15429, 19420, 9158, 10704, 18421, 10646, 10646, 15427, 19443, 17965, 15429,
  /*  6963 */ 10908, 8885, 10646, 10646, 21450, 18691, 15429, 15429, 21471, 18636, 10646, 10646, 15608, 15429, 15429,
  /*  6978 */ 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 18116, 17429, 19466, 13337, 14005, 19528, 14007,
  /*  6993 */ 15360, 14289, 14005, 19544, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7008 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7023 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7038 */ 10145, 10145, 12558, 19592, 10112, 12599, 19608, 15562, 19710, 12641, 10752, 18188, 13449, 19635, 10646,
  /*  7053 */ 19652, 19689, 19706, 15429, 11154, 12709, 14183, 14406, 10646, 10646, 12408, 15430, 15429, 19726, 15429,
  /*  7068 */ 15429, 19744, 20954, 10646, 10646, 12693, 15186, 19780, 15429, 15429, 17565, 19796, 15863, 19569, 9158,
  /*  7083 */ 10646, 17820, 20154, 10646, 15427, 15429, 19841, 19836, 10908, 10478, 21322, 10646, 19857, 15361, 19450,
  /*  7098 */ 21551, 15429, 20406, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 19876, 15429, 13548, 18668, 13335,
  /*  7113 */ 19896, 14007, 19918, 19943, 13337, 13785, 19764, 14007, 19967, 19987, 20011, 15991, 15340, 11048, 10145,
  /*  7128 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7143 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7158 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 20044, 10112, 12599, 20060,
  /*  7173 */ 20098, 20114, 20130, 11470, 20146, 20170, 20218, 10850, 20253, 20288, 20310, 20339, 20357, 12709, 20072,
  /*  7188 */ 21132, 13408, 10646, 20373, 17942, 13300, 19148, 15429, 19178, 15082, 18507, 18718, 18856, 10646, 21750,
  /*  7203 */ 14050, 14203, 20391, 20426, 15429, 20444, 17457, 20911, 20479, 15173, 20921, 15238, 20498, 18549, 20533,
  /*  7218 */ 20558, 10908, 9155, 20574, 10646, 10646, 20627, 20684, 15429, 21647, 15792, 12957, 10833, 14060, 20718,
  /*  7233 */ 17285, 14037, 12515, 20760, 20780, 20801, 17607, 16801, 20829, 20853, 13338, 14003, 13337, 14005, 13339,
  /*  7248 */ 14875, 18385, 20875, 17883, 15991, 19951, 20944, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7263 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7278 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7293 */ 10145, 10145, 10145, 12558, 20988, 10112, 12599, 12573, 21004, 19512, 21041, 10752, 15506, 10646, 10646,
  /*  7308 */ 10646, 21057, 15429, 15429, 15429, 21086, 12709, 10646, 21102, 21120, 14982, 16293, 15429, 18395, 18334,
  /*  7323 */ 21165, 13861, 15082, 12230, 20028, 10646, 10646, 10646, 13336, 15429, 21194, 15429, 15429, 15429, 20901,
  /*  7338 */ 12068, 10646, 10646, 10646, 10646, 18108, 15429, 15429, 15429, 10908, 19576, 16593, 10646, 10646, 16412,
  /*  7353 */ 21213, 15429, 15429, 10829, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 15894,
  /*  7368 */ 13335, 20272, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 11133, 21231, 14005, 20972, 21251, 11048,
  /*  7383 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7398 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7413 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12558, 21286, 10112, 12599,
  /*  7428 */ 12908, 20764, 19710, 12641, 12671, 10335, 10646, 14124, 10646, 11138, 15429, 15429, 21302, 11154, 12709,
  /*  7443 */ 10646, 10646, 21320, 10646, 10646, 15429, 15429, 13144, 15429, 15429, 15082, 9158, 10646, 10646, 10646,
  /*  7458 */ 10646, 13336, 15429, 15429, 15429, 15429, 15429, 19569, 9158, 10646, 10646, 10646, 10646, 15427, 15429,
  /*  7473 */ 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646, 15426,
  /*  7488 */ 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005,
  /*  7503 */ 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7518 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7533 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7548 */ 10145, 10145, 10145, 10145, 12558, 21338, 10112, 12599, 10645, 21354, 21178, 12641, 10752, 10646, 10646,
  /*  7563 */ 10646, 10646, 15428, 15429, 15429, 15429, 11154, 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429,
  /*  7578 */ 15429, 15429, 15429, 15082, 8698, 10646, 10646, 10646, 10646, 10929, 15429, 15429, 15429, 15429, 15429,
  /*  7593 */ 19569, 9158, 10646, 21142, 10646, 17421, 15427, 15429, 21374, 15429, 21393, 9155, 10646, 10646, 10646,
  /*  7608 */ 15361, 15429, 15429, 15429, 10829, 10646, 10646, 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429,
  /*  7623 */ 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340,
  /*  7638 */ 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7653 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7668 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 12932, 21417, 10112,
  /*  7683 */ 12599, 12947, 14243, 19710, 21433, 10752, 10646, 10646, 21449, 16795, 15428, 15429, 21466, 19351, 11154,
  /*  7698 */ 12709, 10646, 10646, 10646, 10646, 10646, 15429, 15429, 15429, 15429, 15429, 21401, 19758, 10646, 16529,
  /*  7713 */ 10646, 10646, 13336, 15429, 15429, 21487, 15429, 15429, 20456, 9158, 10715, 10646, 10646, 10646, 15427,
  /*  7728 */ 21509, 15429, 15429, 10908, 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646,
  /*  7743 */ 15426, 15429, 15429, 13446, 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337,
  /*  7758 */ 14005, 13339, 14007, 15360, 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7773 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7788 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7803 */ 10145, 10145, 10145, 10145, 10145, 12558, 15642, 10112, 12599, 10645, 21527, 19404, 12641, 10752, 10646,
  /*  7818 */ 10646, 10646, 13219, 15428, 15429, 15429, 17530, 11154, 12709, 16648, 10646, 13844, 10646, 10646, 15429,
  /*  7833 */ 21549, 15429, 21567, 15429, 15082, 9158, 10646, 21588, 10646, 10646, 13336, 15429, 17364, 15429, 15429,
  /*  7848 */ 15429, 19569, 9158, 10646, 10646, 21608, 10646, 21626, 15429, 16432, 15429, 21377, 9155, 10646, 10646,
  /*  7863 */ 10646, 15361, 15429, 15429, 15429, 14728, 10646, 10646, 11412, 15429, 15429, 13446, 16599, 13338, 15429,
  /*  7878 */ 21644, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360, 14289, 14005, 15991,
  /*  7893 */ 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7908 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  7923 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 21663, 10125,
  /*  7938 */ 10112, 11346, 21679, 8995, 8970, 8687, 12754, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242,
  /*  7954 */ 19820, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040,
  /*  7971 */ 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398,
  /*  7988 */ 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855,
  /*  8005 */ 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936,
  /*  8022 */ 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8037 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8052 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 21713, 10125, 10112,
  /*  8067 */ 11331, 8670, 8995, 8970, 8687, 9309, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 10406, 8671,
  /*  8084 */ 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285,
  /*  8101 */ 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505,
  /*  8118 */ 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688,
  /*  8135 */ 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145,
  /*  8152 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8167 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8182 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10045, 10125, 10112, 11316, 8670,
  /*  8197 */ 8995, 8970, 8687, 11440, 8737, 8722, 9844, 21689, 9898, 8757, 8797, 11710, 9242, 13087, 8671, 8827, 21697,
  /*  8214 */ 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986, 9018, 8855, 9040, 9886, 9285, 9546, 9056,
  /*  8231 */ 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270, 9325, 9341, 9398, 19427, 9505, 9442, 9486,
  /*  8248 */ 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601, 9628, 8841, 9855, 9658, 9688, 9718, 9755,
  /*  8265 */ 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934, 9920, 13101, 9936, 8772, 10145, 10145, 10145,
  /*  8282 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8297 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8312 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10045, 10190, 10112, 21729, 10645, 15359, 19710,
  /*  8327 */ 10663, 10060, 10646, 10646, 10646, 10646, 15428, 15429, 15429, 15429, 11154, 15972, 10646, 10646, 10646,
  /*  8342 */ 10646, 10646, 15429, 15429, 15429, 15429, 15429, 16683, 9158, 10646, 10646, 10646, 10646, 13336, 15429,
  /*  8357 */ 15429, 15429, 15429, 15429, 19569, 9158, 10646, 10646, 10646, 10646, 15427, 15429, 15429, 15429, 10908,
  /*  8372 */ 9155, 10646, 10646, 10646, 15361, 15429, 15429, 15429, 10829, 10646, 10646, 15426, 15429, 15429, 13446,
  /*  8387 */ 10646, 13338, 15429, 15429, 13913, 13335, 15429, 14007, 13338, 14003, 13337, 14005, 13339, 14007, 15360,
  /*  8402 */ 14289, 14005, 15991, 15340, 11048, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8417 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8432 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8447 */ 10145, 14822, 10145, 10145, 9254, 8670, 8995, 8905, 10145, 8781, 8737, 8722, 9844, 21689, 9898, 8757,
  /*  8463 */ 8797, 11710, 9369, 19820, 8671, 8827, 21697, 8671, 9499, 8901, 8921, 8950, 8966, 9132, 8878, 8617, 8986,
  /*  8480 */ 9018, 8855, 9040, 9886, 9285, 9546, 9056, 9085, 9123, 10141, 12435, 9174, 9199, 9212, 9470, 9228, 9270,
  /*  8497 */ 9325, 9341, 9398, 19427, 9505, 9442, 9486, 8867, 9356, 9521, 9537, 9562, 9031, 9456, 9642, 9578, 9601,
  /*  8514 */ 9628, 8841, 9855, 9658, 9688, 9718, 9755, 9744, 9771, 9787, 9829, 8741, 9904, 9183, 9871, 9728, 8934,
  /*  8531 */ 9920, 13101, 9936, 8772, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8546 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8561 */ 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145, 10145,
  /*  8576 */ 1, 0, 0, 53271, 14360, 18458, 53276, 55329, 37, 36906, 38957, 55343, 43058, 45109, 41014, 55343, 0, 53271,
  /*  8594 */ 55343, 1, 0, 0, 53271, 14360, 14360, 18458, 18458, 53276, 29, 29, 29, 29, 0, 1108084, 1112183, 0, 1112183,
  /*  8613 */ 0, 123, 0, 123, 0, 0, 0, 0, 0, 0, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8631 */ 1071104, 1196032, 55329, 34, 34, 34, 37, 37, 37, 37, 41, 36906, 0, 0, 38957, 0, 55343, 0, 0, 677, 0, 0, 0,
  /*  8654 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 534, 66, 66, 66, 66, 66, 1099776, 1071104, 1071104, 1071104,
  /*  8674 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8685 */ 1071104, 1071104, 29, 29, 34, 34, 37, 37, 37, 0, 41, 41, 41, 0, 0, 0, 0, 0, 0, 66, 680, 66, 66, 66, 66,
  /*  8710 */ 66, 66, 66, 66, 1208, 66, 66, 66, 66, 66, 88, 88, 1277952, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8728 */ 1071104, 1314816, 1071104, 1323008, 1071104, 1327104, 1071104, 1331200, 1351680, 1071104, 1177600,
  /*  8739 */ 1181696, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8750 */ 1071104, 1071104, 1071104, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1277952,
  /*  8761 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1314816, 1097728, 1323008, 1097728, 1327104,
  /*  8772 */ 1097728, 1071104, 1097728, 1071104, 1097728, 1071104, 1097728, 1458176, 1458176, 0, 0, 0, 0, 0, 0, 0,
  /*  8788 */ 1075200, 0, 0, 0, 1099776, 0, 0, 1071104, 1071104, 1331200, 1351680, 1097728, 1097728, 1368064, 1097728,
  /*  8803 */ 1380352, 1097728, 1097728, 1396736, 1097728, 1097728, 1097728, 1425408, 1097728, 1097728, 1097728,
  /*  8814 */ 1097728, 0, 0, 0, 0, 0, 0, 0, 0, 1099776, 0, 0, 10240, 1257472, 1071104, 1071104, 1071104, 1071104,
  /*  8832 */ 1071104, 1273856, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1296384, 1071104, 1071104,
  /*  8843 */ 1259520, 1071104, 1271808, 1288192, 1071104, 1071104, 1312768, 1343488, 1071104, 1071104, 1071104,
  /*  8854 */ 1431552, 1071104, 1071104, 1349632, 1353728, 1363968, 1376256, 1071104, 1071104, 1071104, 1406976,
  /*  8865 */ 1421312, 1071104, 1071104, 1071104, 1071104, 1071104, 1576960, 1097728, 1097728, 1097728, 1097728,
  /*  8876 */ 1097728, 1187840, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66,
  /*  8895 */ 66, 66, 66, 969, 66, 970, 1097728, 1097728, 1097728, 1169408, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  8910 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 0, 0, 0, 0, 1097728, 1097728, 1097728,
  /*  8924 */ 1097728, 1097728, 1097728, 1257472, 1097728, 1097728, 1097728, 1097728, 1097728, 1273856, 1097728,
  /*  8935 */ 1097728, 1097728, 1071104, 1189888, 1071104, 1232896, 1071104, 1269760, 1071104, 1394688, 1071104,
  /*  8946 */ 1071104, 1071104, 1480704, 1097728, 1097728, 1097728, 1097728, 1296384, 1097728, 1097728, 1097728,
  /*  8957 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1366016, 1372160, 1097728, 1384448,
  /*  8968 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  8979 */ 1097728, 1097728, 1097728, 14360, 0, 18458, 18458, 1198080, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8992 */ 1071104, 1226752, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1097728,
  /*  9003 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 14360,
  /*  9015 */ 0, 18709, 18709, 1265664, 1071104, 1071104, 1071104, 1071104, 1286144, 1071104, 1071104, 1071104, 1071104,
  /*  9028 */ 1071104, 1071104, 1325056, 1071104, 1071104, 1071104, 1236992, 1239040, 1071104, 1071104, 1263616,
  /*  9039 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1484800, 1071104, 1497088,
  /*  9050 */ 1071104, 1071104, 1071104, 1071104, 1515520, 1071104, 1097728, 1097728, 1097728, 1325056, 1097728,
  /*  9061 */ 1097728, 1097728, 1097728, 1097728, 1349632, 1353728, 1363968, 1376256, 1097728, 1097728, 1097728,
  /*  9072 */ 1071245, 1190029, 1071245, 1233037, 1071245, 1269901, 1071245, 1394829, 1071245, 1071245, 1071245,
  /*  9083 */ 1480845, 1097728, 1406976, 1421312, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9094 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1484800, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9105 */ 1097728, 57344, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 967, 66, 66, 66, 66, 1497088, 1097728, 1097728,
  /*  9126 */ 1097728, 1097728, 1515520, 1097728, 1097728, 1531904, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9137 */ 1097728, 1097728, 1097728, 1097728, 1527808, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9148 */ 1097728, 1097728, 1568768, 1097728, 0, 474, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 66,
  /*  9172 */ 66, 66, 1202176, 1206272, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1230848, 1071104, 1071104,
  /*  9185 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1470464, 1071104, 1071104, 1097728, 1097728, 1216512,
  /*  9196 */ 1097728, 1097728, 1097728, 1267712, 1071104, 1280000, 1071104, 1071104, 1290240, 1071104, 1071104,
  /*  9207 */ 1071104, 1318912, 1071104, 1333248, 1071104, 1071104, 1071104, 1071104, 1409024, 1071104, 1427456,
  /*  9218 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1482752, 1562624,
  /*  9229 */ 1071104, 1159168, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1191936, 1097728,
  /*  9240 */ 1202176, 1206272, 1097728, 1097728, 1097728, 1097728, 18458, 0, 0, 0, 0, 0, 0, 0, 1099776, 0, 0, 0, 0, 0,
  /*  9260 */ 0, 0, 0, 0, 0, 1073152, 0, 0, 1099776, 1099776, 1097728, 1097728, 1097728, 1097728, 1230848, 1097728,
  /*  9276 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1267712, 1097728, 1280000, 1097728, 1097728,
  /*  9287 */ 1097728, 1097728, 1097728, 1097728, 1196032, 1198080, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9298 */ 1097728, 1226752, 1097728, 1071245, 1097728, 1071245, 1097728, 1071245, 1097728, 1458317, 1458176, 0, 0,
  /*  9311 */ 0, 0, 0, 0, 0, 1075200, 0, 0, 296, 1099776, 0, 141, 1071104, 1071104, 1097728, 1290240, 1097728, 1097728,
  /*  9329 */ 1097728, 1318912, 1097728, 1333248, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9340 */ 1409024, 1097728, 1427456, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9351 */ 1097728, 1482752, 1097728, 1097728, 1501184, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9362 */ 1241088, 1097728, 1097728, 1097728, 1097728, 1097728, 1284096, 1097728, 1097728, 1097728, 1097728, 0, 0,
  /*  9375 */ 0, 0, 0, 0, 0, 0, 1099776, 0, 0, 0, 1, 0, 0, 0, 109, 110, 18458, 18458, 29, 29, 29, 47135, 47135, 1097728,
  /*  9399 */ 1525760, 1097728, 1097728, 1536000, 1097728, 1097728, 1097728, 1550336, 1097728, 1097728, 1560576,
  /*  9410 */ 1562624, 1097728, 0, 0, 289, 290, 290, 0, 0, 1075200, 0, 0, 139, 1099914, 0, 142, 1071245, 1071245,
  /*  9428 */ 1097728, 1228800, 1097728, 1097728, 1097728, 1097728, 1097728, 1167501, 1071245, 1071245, 1071245,
  /*  9439 */ 1071245, 1478797, 1167360, 1284096, 1071104, 1071104, 1071104, 1071104, 1329152, 1341440, 1071104,
  /*  9450 */ 1071104, 1071104, 1386496, 1388544, 1071104, 1423360, 1071104, 1071104, 1429504, 1071104, 1071104,
  /*  9461 */ 1071104, 1464320, 1071104, 1071104, 1071104, 1071104, 1495040, 1071104, 1071104, 1071104, 1071104,
  /*  9472 */ 1501184, 1071104, 1071104, 1525760, 1071104, 1071104, 1536000, 1071104, 1071104, 1071104, 1550336,
  /*  9483 */ 1071104, 1071104, 1560576, 1437696, 1071104, 1071104, 1462272, 1071104, 1466368, 1071104, 1071104,
  /*  9494 */ 1476608, 1071104, 1499136, 1507328, 1513472, 1071104, 1071104, 1071104, 1527808, 1071104, 1071104,
  /*  9505 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1241088,
  /*  9516 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1097728, 1329152, 1341440, 1097728, 1097728, 1097728,
  /*  9527 */ 1386496, 1388544, 1097728, 1423360, 1097728, 1097728, 1437696, 1097728, 1097728, 1462272, 1097728,
  /*  9538 */ 1466368, 1097728, 1097728, 1476608, 1097728, 1499136, 1507328, 1513472, 1097728, 1097728, 1097728,
  /*  9549 */ 1097728, 1097728, 1097728, 1097728, 1265664, 1097728, 1097728, 1097728, 1097728, 1286144, 1097728,
  /*  9560 */ 1097728, 1097728, 1576960, 0, 0, 0, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  9573 */ 1071104, 1212416, 1071104, 1071104, 1222656, 1097728, 1097728, 1236992, 1239040, 1097728, 1097728,
  /*  9584 */ 1263616, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9595 */ 1097728, 1097728, 14360, 88064, 18458, 108544, 1097728, 1429504, 1097728, 1097728, 1097728, 1464320,
  /*  9607 */ 1097728, 1097728, 1097728, 1097728, 1495040, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 0, 0,
  /*  9620 */ 0, 0, 0, 0, 0, 663, 0, 0, 1097728, 1554432, 0, 1163264, 1165312, 1071104, 1071104, 1185792, 1071104,
  /*  9637 */ 1200128, 1071104, 1071104, 1071104, 1224704, 1071104, 1071104, 1554432, 1097728, 1097728, 1097728,
  /*  9648 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1212416, 1097728, 1097728, 1222656, 1097728, 1097728,
  /*  9659 */ 1200128, 1097728, 1097728, 1097728, 1224704, 1097728, 1097728, 1097728, 1097728, 1259520, 1097728,
  /*  9670 */ 1271808, 1288192, 1097728, 1097728, 1097728, 1097728, 18458, 0, 0, 0, 0, 0, 0, 0, 1099776, 0, 0, 474,
  /*  9688 */ 1312768, 1343488, 1097728, 1097728, 1097728, 1431552, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9699 */ 1097728, 1097728, 1529856, 1097728, 1097728, 1097728, 1097728, 18458, 0, 0, 0, 0, 0, 0, 0, 1099776, 0, 0,
  /*  9717 */ 475, 1542144, 1548288, 1552384, 1071104, 1179648, 1183744, 1071104, 1208320, 1071104, 1071104, 1071104,
  /*  9729 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1097728, 1097728, 1097728, 1097728, 1097728, 1261568,
  /*  9740 */ 1097728, 1097728, 1097728, 1097728, 1183744, 1097728, 1208320, 1097728, 1097728, 1097728, 1097728,
  /*  9751 */ 1097728, 1097728, 1097728, 1097728, 1292288, 1304576, 1345536, 1347584, 1392640, 1449984, 1071104,
  /*  9762 */ 1468416, 1071104, 1474560, 1071104, 1071104, 1071104, 1540096, 1097728, 1179648, 1449984, 1097728,
  /*  9773 */ 1468416, 1097728, 1474560, 1097728, 1097728, 1097728, 1540096, 1071104, 1071104, 1214464, 1071104,
  /*  9784 */ 1071104, 1071104, 1243136, 1247232, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  9795 */ 1071104, 1071104, 1533952, 1097728, 1097728, 1214464, 1097728, 1097728, 1097728, 1097728, 18458, 0, 57344,
  /*  9808 */ 0, 0, 0, 30720, 0, 1099776, 0, 0, 0, 45109, 41014, 0, 0, 0, 0, 0, 1073152, 0, 0, 1099776, 1099776,
  /*  9829 */ 1097728, 1243136, 1247232, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /*  9840 */ 1097728, 1533952, 1071104, 1071104, 1071104, 1368064, 1071104, 1380352, 1071104, 1071104, 1396736,
  /*  9851 */ 1071104, 1071104, 1071104, 1425408, 1071104, 1071104, 1071104, 1071104, 1071104, 1529856, 1071104,
  /*  9862 */ 1071104, 1542144, 1548288, 1552384, 1163264, 1165312, 1097728, 1097728, 1185792, 1097728, 1097728,
  /*  9873 */ 1097728, 1097728, 1097728, 1097728, 1470464, 1097728, 1097728, 1071104, 1071104, 1071104, 1071104,
  /*  9884 */ 1071104, 1261568, 1071104, 1531904, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  9895 */ 1071104, 1071104, 1568768, 1071104, 1097728, 1097728, 1097728, 1177600, 1181696, 1097728, 1097728,
  /*  9906 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1071104, 1071104,
  /*  9917 */ 1216512, 1071104, 1071104, 1189888, 1097728, 1232896, 1097728, 1269760, 1097728, 1394688, 1097728,
  /*  9928 */ 1097728, 1097728, 1480704, 1071104, 1228800, 1071104, 1071104, 1071104, 1097728, 1097728, 1097728,
  /*  9939 */ 1097728, 1478656, 1071104, 1294336, 1452032, 1071104, 1097728, 1294336, 1452032, 1097728, 1245184,
  /*  9950 */ 1071104, 1245184, 1, 0, 0, 53271, 14360, 18458, 53276, 55329, 38, 36906, 38957, 55343, 43058, 45109,
  /*  9966 */ 41014, 55343, 55329, 34, 34, 34, 117, 117, 117, 117, 121, 36906, 0, 0, 38957, 0, 55343, 0, 0, 964, 0, 665,
  /*  9988 */ 0, 0, 0, 0, 66, 966, 66, 66, 66, 66, 66, 562, 66, 66, 66, 66, 66, 66, 66, 66, 66, 573, 29, 29, 34, 34,
  /* 10014 */ 117, 117, 117, 0, 121, 121, 121, 0, 0, 0, 0, 0, 0, 66, 842, 66, 66, 66, 66, 66, 66, 66, 66, 351, 66, 66,
  /* 10040 */ 66, 66, 66, 66, 66, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957, 0, 43058, 45109, 41014, 0, 0,
  /* 10062 */ 8323, 6276, 6276, 0, 0, 0, 0, 0, 139, 63, 0, 142, 66, 66, 66, 513, 66, 66, 66, 66, 517, 66, 519, 66, 66,
  /* 10087 */ 66, 66, 66, 207, 66, 88, 88, 88, 220, 88, 88, 88, 88, 88, 88, 88, 806, 88, 88, 88, 88, 811, 88, 88, 88,
  /* 10112 */ 34, 34, 34, 34, 37, 37, 37, 37, 41, 36906, 0, 0, 38957, 0, 0, 0, 1, 0, 0, 0, 14360, 14360, 18458, 18458,
  /* 10136 */ 29, 29, 29, 29, 29, 1097728, 1097728, 1568768, 1097728, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  /* 10162 */ 0, 0, 0, 14360, 18458, 29, 34, 37, 67627, 38957, 67584, 67627, 45109, 41014, 67584, 34, 34, 34, 34, 37,
  /* 10182 */ 37, 37, 37, 41, 0, 32768, 0, 38957, 0, 0, 0, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135,
  /* 10205 */ 47135, 1060884, 21, 0, 21, 14360, 18458, 29, 34, 37, 36906, 38957, 0, 43058, 45109, 41014, 0, 0, 8323,
  /* 10224 */ 6276, 6276, 0, 0, 136, 294, 0, 139, 63, 0, 142, 66, 66, 66, 66, 999, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 10249 */ 66, 66, 66, 1080, 66, 66, 66, 34, 34, 34, 34, 37, 37, 37, 37, 41, 36906, 0, 124, 38957, 0, 0, 0, 1, 0, 0,
  /* 10275 */ 0, 14360, 14360, 18458, 18458, 29, 29, 104448, 29, 29, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957,
  /* 10296 */ 0, 43058, 45109, 41014, 56, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 44, 44, 0, 44, 44, 44, 0, 0, 8323, 6276,
  /* 10320 */ 6276, 0, 0, 1075200, 0, 0, 139, 63, 0, 142, 66, 66, 66, 66, 990, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 10345 */ 66, 321, 66, 66, 66, 66, 34, 34, 34, 34, 37, 37, 37, 37, 41, 0, 0, 0, 0, 0, 0, 0, 1075200, 0, 0, 139,
  /* 10371 */ 1099776, 0, 142, 1071104, 1071104, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906, 71726, 71680, 43058,
  /* 10389 */ 71726, 41014, 71680, 34, 34, 34, 34, 37, 37, 37, 37, 41, 36906, 0, 0, 0, 34816, 0, 0, 290, 0, 0, 1077248,
  /* 10412 */ 0, 0, 1071104, 0, 1071104, 1071104, 1071104, 1169408, 1071104, 1071104, 1, 0, 22, 0, 14360, 18458, 29, 35,
  /* 10430 */ 39, 36906, 38957, 0, 43058, 45109, 41014, 73785, 1108083, 1108083, 1108083, 1108083, 1112182, 1112182,
  /* 10444 */ 1112182, 1112182, 122, 36906, 0, 0, 38957, 0, 0, 0, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 1065073,
  /* 10463 */ 1065073, 1065073, 1065073, 1065073, 29, 29, 1108083, 1108083, 1112182, 1112182, 1112182, 0, 122, 122, 122,
  /* 10478 */ 0, 0, 0, 0, 0, 0, 671, 0, 677, 66, 66, 66, 66, 66, 66, 66, 736, 66, 66, 66, 66, 66, 66, 66, 66, 66, 314,
  /* 10505 */ 66, 66, 66, 66, 66, 66, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957, 0, 43058, 45109, 41014, 81920,
  /* 10527 */ 34, 34, 34, 92160, 37, 37, 37, 92160, 41, 36906, 0, 0, 38957, 0, 0, 0, 1, 0, 0, 0, 14360, 14360, 18543,
  /* 10550 */ 18544, 29, 29, 29, 29, 29, 29, 29, 34, 0, 37, 37, 0, 0, 41, 41, 0, 0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 684,
  /* 10578 */ 66, 66, 66, 66, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957, 0, 43058, 45109, 41014, 20538, 1, 0,
  /* 10600 */ 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957, 0, 43058, 45109, 41014, 4096, 1, 0, 0, 0, 25, 18458, 29, 34,
  /* 10622 */ 37, 36906, 38957, 0, 43058, 45109, 41014, 4096, 49, 43058, 0, 0, 45109, 41014, 0, 0, 0, 0, 0, 1073152, 0,
  /* 10643 */ 0, 63, 63, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 362, 29, 47135, 34, 34, 37, 37,
  /* 10669 */ 37, 0, 41, 41, 41, 0, 0, 0, 0, 0, 0, 679, 66, 66, 66, 66, 66, 685, 66, 66, 66, 286, 0, 8323, 6276, 6276,
  /* 10695 */ 0, 0, 1075200, 293, 0, 139, 63, 0, 142, 66, 66, 66, 66, 852, 66, 66, 66, 66, 66, 857, 66, 66, 66, 66, 66,
  /* 10720 */ 853, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1077, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 18458, 61718,
  /* 10744 */ 0, 0, 0, 0, 0, 0, 285, 94208, 0, 288, 8323, 6276, 6276, 0, 20772, 0, 0, 285, 139, 63, 297, 142, 66, 66,
  /* 10768 */ 66, 66, 866, 66, 66, 66, 66, 66, 66, 66, 66, 872, 66, 66, 66, 66, 878, 66, 66, 66, 66, 66, 66, 886, 66,
  /* 10793 */ 66, 66, 66, 66, 1088, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 898, 66, 66, 66, 66, 88, 88, 760, 88,
  /* 10818 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 772, 88, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 10845 */ 66, 1095, 66, 66, 863, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 383, 88, 88, 88, 88,
  /* 10870 */ 1050, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 1293, 66, 66, 1072, 66, 66, 66, 66, 66,
  /* 10895 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 1212, 88, 88, 1112, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 10920 */ 88, 88, 0, 0, 18458, 18458, 66, 66, 1151, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 756, 88,
  /* 10945 */ 1170, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1178, 88, 88, 88, 88, 88, 66, 66, 66, 1375, 88, 88, 88, 1377,
  /* 10969 */ 66, 66, 88, 1204, 66, 66, 66, 1205, 1206, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 1014, 88, 88, 88, 88,
  /* 10993 */ 88, 1019, 88, 88, 1224, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 66, 1235, 88, 1250, 88, 88,
  /* 11017 */ 88, 88, 88, 88, 1256, 88, 88, 88, 88, 1260, 66, 66, 66, 66, 893, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 11042 */ 66, 66, 1211, 66, 88, 88, 88, 66, 88, 66, 88, 66, 88, 66, 88, 0, 0, 0, 0, 0, 0, 0, 1075200, 0, 0, 295,
  /* 11068 */ 1099776, 0, 298, 1071104, 1071104, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957, 0, 43058, 45109,
  /* 11087 */ 41014, 59, 49, 43058, 0, 0, 45109, 41014, 0, 0, 0, 0, 0, 1073288, 0, 0, 63, 63, 66, 66, 66, 66, 66, 66,
  /* 11111 */ 66, 66, 66, 66, 66, 66, 66, 186, 66, 66, 66, 527, 528, 530, 66, 66, 66, 66, 66, 66, 537, 538, 66, 66, 66,
  /* 11136 */ 66, 1326, 66, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 407, 88, 88, 88, 88, 88, 18458, 61718,
  /* 11160 */ 0, 0, 0, 0, 0, 0, 285, 0, 0, 288, 8323, 6276, 6276, 0, 20772, 0, 0, 285, 139, 63, 297, 142, 66, 300, 1, 0,
  /* 11186 */ 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957, 48, 43058, 45109, 41014, 0, 29, 34, 34, 37, 37, 37, 0, 41,
  /* 11208 */ 41, 41, 0, 0, 0, 0, 0, 0, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245,
  /* 11225 */ 1196173, 1099776, 43058, 0, 0, 45109, 41014, 130, 0, 0, 0, 0, 1073152, 0, 0, 1099776, 1099776, 43058, 0,
  /* 11244 */ 0, 45109, 41014, 0, 0, 75776, 0, 0, 1073152, 0, 0, 1099776, 1099776, 43058, 0, 0, 45109, 41014, 0, 0, 0,
  /* 11265 */ 0, 0, 1073152, 0, 98304, 1099776, 1099776, 43058, 0, 0, 45109, 41014, 0, 0, 0, 0, 0, 1073152, 4096, 0,
  /* 11285 */ 1099776, 1099776, 43058, 0, 0, 45109, 41014, 129, 0, 0, 0, 0, 1073152, 0, 129, 1099776, 1099776, 43058, 0,
  /* 11304 */ 0, 0, 41014, 0, 0, 0, 0, 0, 1073152, 0, 0, 1099776, 1099776, 43058, 0, 0, 45109, 41014, 0, 0, 0, 0, 0,
  /* 11327 */ 1073152, 0, 0, 1099776, 1099776, 0, 0, 538624, 0, 0, 0, 0, 0, 0, 0, 1073152, 0, 0, 1099776, 1099776, 0,
  /* 11348 */ 534528, 0, 0, 0, 0, 0, 0, 0, 0, 1073152, 0, 0, 1099776, 1099915, 1, 0, 0, 0, 14360, 18458, 29, 34, 37,
  /* 11371 */ 36906, 38957, 0, 43058, 45109, 41014, 60, 49, 43058, 0, 0, 45109, 41014, 0, 0, 0, 0, 136, 60, 0, 0, 63,
  /* 11393 */ 63, 66, 66, 66, 66, 66, 66, 66, 66, 66, 171, 66, 66, 66, 66, 66, 66, 1241, 66, 66, 66, 66, 88, 88, 88, 88,
  /* 11419 */ 88, 1105, 88, 88, 88, 88, 88, 88, 88, 29, 47135, 34, 34, 37, 37, 37, 0, 41, 41, 41, 279, 0, 0, 0, 0, 0,
  /* 11445 */ 79872, 0, 1075200, 0, 0, 139, 1099776, 0, 142, 1071104, 1071104, 88, 88, 88, 88, 18458, 61718, 279, 471,
  /* 11464 */ 0, 0, 0, 0, 285, 0, 0, 288, 8323, 6276, 6276, 0, 20772, 0, 0, 285, 139, 63, 297, 142, 299, 66, 673, 840,
  /* 11488 */ 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 552, 66, 66, 66, 66, 963, 0, 0, 0, 0, 838, 0, 840,
  /* 11516 */ 0, 66, 66, 66, 66, 66, 66, 66, 371, 66, 66, 66, 66, 66, 66, 381, 66, 1, 0, 0, 0, 14360, 18458, 29, 36, 40,
  /* 11542 */ 36906, 38957, 0, 43058, 45109, 41014, 61, 1108084, 1108084, 77824, 1108084, 1112183, 1112183, 77824,
  /* 11556 */ 1112183, 123, 36906, 0, 0, 38957, 0, 0, 0, 291, 0, 139, 0, 142, 0, 1071104, 1071104, 1071104, 1071104,
  /* 11575 */ 1071104, 1187840, 1071104, 1099904, 43058, 0, 0, 45109, 41014, 0, 0, 77958, 135, 0, 1073152, 0, 0,
  /* 11592 */ 1099914, 1099914, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245,
  /* 11603 */ 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1278093, 1071245, 1071245, 1071245,
  /* 11614 */ 1071245, 1071245, 1071245, 1314957, 1071245, 1323149, 1071245, 1327245, 1071245, 1331341, 1351821,
  /* 11625 */ 1071245, 1177741, 1181837, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245,
  /* 11636 */ 1071245, 1071245, 1071245, 1071245, 1071245, 1097728, 1097728, 1097728, 1097728, 1257613, 1071245,
  /* 11647 */ 1071245, 1071245, 1071245, 1071245, 1273997, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245,
  /* 11658 */ 1296525, 1071245, 1071245, 1429645, 1071245, 1071245, 1071245, 1464461, 1071245, 1071245, 1071245,
  /* 11669 */ 1071245, 1495181, 1071245, 1071245, 1071245, 1071245, 1527949, 1071245, 1071245, 1071245, 1071245,
  /* 11680 */ 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1241229, 1071245, 1071245,
  /* 11691 */ 1071245, 1071245, 1071245, 1198221, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1226893,
  /* 11702 */ 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1097728, 1097728, 1097728,
  /* 11713 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1523712, 1097728, 1097728, 1097728, 1097728,
  /* 11724 */ 1097728, 1097728, 1265805, 1071245, 1071245, 1071245, 1071245, 1286285, 1071245, 1071245, 1071245,
  /* 11735 */ 1071245, 1071245, 1071245, 1325197, 1071245, 1071245, 1071245, 1237133, 1239181, 1071245, 1071245,
  /* 11746 */ 1263757, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1484941, 1071245,
  /* 11757 */ 1497229, 1071245, 1071245, 1071245, 1071245, 1515661, 1071245, 1202317, 1206413, 1071245, 1071245,
  /* 11768 */ 1071245, 1071245, 1071245, 1071245, 1230989, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245,
  /* 11779 */ 1071245, 1470605, 1071245, 1071245, 1097728, 1097728, 1216512, 1097728, 1097728, 1097728, 1267853,
  /* 11790 */ 1071245, 1280141, 1071245, 1071245, 1290381, 1071245, 1071245, 1071245, 1319053, 1071245, 1333389,
  /* 11801 */ 1071245, 1071245, 1071245, 1071245, 1577101, 1097728, 1097728, 1097728, 1097728, 1097728, 1187840,
  /* 11812 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 0, 0, 0, 474, 0, 0, 0, 0, 0, 0, 66, 66, 66, 66, 66,
  /* 11833 */ 66, 66, 686, 66, 66, 1562765, 1071245, 1159168, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /* 11847 */ 1097728, 1191936, 1097728, 1202176, 1206272, 1097728, 1097728, 1097728, 1097728, 18709, 0, 0, 0, 0, 0, 0,
  /* 11863 */ 0, 1099776, 0, 0, 0, 1060884, 0, 75776, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 29, 29, 1284237,
  /* 11882 */ 1071245, 1071245, 1071245, 1071245, 1329293, 1341581, 1071245, 1071245, 1071245, 1386637, 1388685,
  /* 11893 */ 1071245, 1423501, 1071245, 1071245, 1501325, 1071245, 1071245, 1525901, 1071245, 1071245, 1536141,
  /* 11904 */ 1071245, 1071245, 1071245, 1550477, 1071245, 1071245, 1560717, 1437837, 1071245, 1071245, 1462413,
  /* 11915 */ 1071245, 1466509, 1071245, 1071245, 1476749, 1071245, 1499277, 1507469, 1513613, 1071245, 1071245,
  /* 11926 */ 1071245, 1409165, 1071245, 1427597, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245,
  /* 11937 */ 1071245, 1071245, 1482893, 1576960, 0, 0, 0, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245,
  /* 11950 */ 1071245, 1071245, 1212557, 1071245, 1071245, 1222797, 1097728, 1554432, 0, 1163405, 1165453, 1071245,
  /* 11962 */ 1071245, 1185933, 1071245, 1200269, 1071245, 1071245, 1071245, 1224845, 1071245, 1071245, 1554573,
  /* 11973 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1212416, 1097728, 1097728,
  /* 11984 */ 1222656, 1097728, 1542144, 1548288, 1552384, 1071245, 1179789, 1183885, 1071245, 1208461, 1071245,
  /* 11995 */ 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1097728, 1097728, 1097728, 1097728,
  /* 12006 */ 1097728, 1261568, 1097728, 1097728, 1097728, 1097728, 1292429, 1304717, 1345677, 1347725, 1392781,
  /* 12017 */ 1450125, 1071245, 1468557, 1071245, 1474701, 1071245, 1071245, 1071245, 1540237, 1097728, 1179648,
  /* 12028 */ 1449984, 1097728, 1468416, 1097728, 1474560, 1097728, 1097728, 1097728, 1540096, 1071245, 1071245,
  /* 12039 */ 1214605, 1071245, 1071245, 1071245, 1243277, 1247373, 1071245, 1071245, 1071245, 1071245, 1071245,
  /* 12050 */ 1071245, 1071245, 1071245, 1071245, 1534093, 1097728, 1097728, 1214464, 1097728, 1097728, 1097728,
  /* 12061 */ 1097728, 1097728, 1097728, 0, 0, 0, 10240, 0, 0, 0, 0, 0, 0, 66, 66, 66, 66, 66, 846, 66, 66, 66, 66,
  /* 12084 */ 1097728, 1243136, 1247232, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1097728,
  /* 12095 */ 1097728, 1533952, 1071245, 1071245, 1071245, 1368205, 1071245, 1380493, 1071245, 1071245, 1396877,
  /* 12106 */ 1071245, 1071245, 1071245, 1425549, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1523853,
  /* 12117 */ 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1366157, 1372301,
  /* 12128 */ 1071245, 1384589, 1071245, 1071245, 1071245, 1071245, 1097728, 1097728, 1097728, 1097728, 1097728,
  /* 12139 */ 1097728, 1470464, 1097728, 1097728, 1071245, 1071245, 1071245, 1071245, 1071245, 1261709, 1071245,
  /* 12150 */ 1532045, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1568909,
  /* 12161 */ 1071245, 1097728, 1097728, 1097728, 1177600, 1181696, 1097728, 1097728, 1097728, 1097728, 1097728,
  /* 12172 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1097728, 1071245, 1071245, 1216653, 1071245, 1071245,
  /* 12183 */ 1189888, 1097728, 1232896, 1097728, 1269760, 1097728, 1394688, 1097728, 1097728, 1097728, 1480704,
  /* 12194 */ 1071245, 1228941, 1071245, 1071245, 1071245, 1097728, 1097728, 1097728, 1097728, 1478656, 1071245,
  /* 12205 */ 1294477, 1452173, 1071245, 1097728, 1294336, 1452032, 1097728, 1245325, 1071245, 1245184, 1097728,
  /* 12216 */ 1097728, 1568768, 1097728, 0, 0, 0, 0, 0, 0, 139, 0, 0, 0, 139, 0, 672, 0, 0, 0, 678, 66, 66, 66, 66, 66,
  /* 12241 */ 66, 66, 66, 66, 66, 1078, 66, 66, 66, 66, 66, 142, 0, 0, 0, 142, 0, 1159168, 1071104, 1071104, 1071104,
  /* 12262 */ 1071104, 1071104, 1071104, 1071104, 1191936, 1071104, 1097728, 1525760, 1097728, 1097728, 1536000,
  /* 12273 */ 1097728, 1097728, 1097728, 1550336, 1097728, 1097728, 1560576, 1562624, 1097728, 0, 291, 1576960, 0, 291,
  /* 12287 */ 0, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1212416, 1071104, 1071104,
  /* 12299 */ 1222656, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957, 0, 0, 0, 55, 4158, 1, 0, 0, 0, 14360, 18458,
  /* 12322 */ 29, 34, 37, 36906, 38957, 100352, 43058, 45109, 41014, 4096, 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906,
  /* 12342 */ 38957, 102400, 43058, 45109, 41014, 4096, 34, 34, 34, 34, 37, 37, 37, 37, 41, 36906, 0, 0, 38957, 0, 0,
  /* 12363 */ 90112, 1097728, 1097728, 1568768, 1097728, 0, 10240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 965, 66, 66, 66, 66,
  /* 12385 */ 66, 66, 1, 0, 0, 0, 14360, 18458, 1064990, 34, 37, 36906, 38957, 0, 43058, 45109, 41014, 0, 840, 0, 0, 0,
  /* 12407 */ 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 569, 66, 66, 66, 66, 1065073, 1065073, 34, 34, 37, 37, 37,
  /* 12431 */ 0, 41, 41, 41, 0, 0, 0, 0, 0, 0, 1159168, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 12449 */ 1191936, 1071104, 1, 0, 0, 0, 14360, 18458, 29, 34, 41, 36906, 38957, 0, 43058, 45109, 41014, 0, 840, 0,
  /* 12469 */ 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 848, 66, 66, 66, 66, 1267, 66, 66, 66, 66, 1272, 66, 66, 88, 88,
  /* 12494 */ 1277, 88, 34, 34, 34, 34, 41, 120, 41, 41, 41, 36906, 0, 0, 38957, 0, 0, 0, 675, 0, 0, 66, 66, 66, 66, 66,
  /* 12520 */ 66, 66, 66, 66, 66, 66, 1156, 66, 66, 66, 66, 29, 29, 34, 34, 2160640, 41, 41, 0, 2160640, 41, 41, 0, 0,
  /* 12544 */ 0, 0, 0, 0, 1159309, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1071245, 1192077, 1071245, 1,
  /* 12559 */ 0, 0, 0, 14360, 18458, 47135, 34, 37, 36906, 38957, 49, 43058, 45109, 41014, 63, 66, 66, 66, 66, 66, 66,
  /* 12580 */ 66, 167, 66, 66, 66, 66, 66, 66, 66, 894, 66, 66, 66, 897, 66, 66, 66, 66, 66, 49, 43058, 0, 0, 45109,
  /* 12604 */ 41014, 8323, 6276, 0, 0, 0, 0, 0, 8323, 63, 63, 66, 66, 66, 66, 66, 66, 159, 66, 66, 173, 66, 66, 66, 66,
  /* 12629 */ 66, 515, 66, 66, 66, 66, 66, 66, 66, 66, 522, 66, 29, 47135, 34, 34, 37, 37, 37, 61718, 41, 41, 41, 0, 0,
  /* 12654 */ 0, 0, 285, 88, 88, 88, 88, 18458, 61718, 0, 471, 0, 0, 0, 0, 285, 0, 0, 288, 8323, 6276, 6276, 0, 20772,
  /* 12678 */ 0, 0, 285, 139, 4159, 297, 142, 66, 66, 66, 66, 1087, 66, 66, 1089, 66, 66, 66, 66, 66, 66, 66, 66, 723,
  /* 12702 */ 724, 66, 66, 66, 66, 66, 66, 8668, 6621, 291, 20772, 0, 0, 0, 0, 297, 0, 66, 66, 66, 66, 66, 66, 336, 66,
  /* 12727 */ 66, 66, 66, 66, 66, 66, 66, 66, 566, 568, 66, 66, 66, 66, 66, 88, 88, 88, 88, 831, 662, 0, 0, 0, 0, 0,
  /* 12753 */ 838, 0, 0, 0, 0, 291, 0, 0, 1075200, 0, 0, 0, 1099776, 0, 0, 1071104, 1071104, 88, 1059, 963, 0, 66, 66,
  /* 12776 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 355, 66, 66, 66, 88, 88, 88, 88, 18458, 61718, 0, 471, 0, 0, 0, 0,
  /* 12802 */ 285, 0, 473, 288, 49, 43058, 0, 0, 45109, 41014, 8323, 6276, 0, 0, 0, 137, 0, 8323, 63, 63, 66, 66, 66,
  /* 12825 */ 66, 66, 66, 161, 66, 66, 66, 66, 66, 66, 66, 66, 737, 66, 66, 66, 66, 66, 66, 66, 29, 31, 34, 34, 37, 37,
  /* 12851 */ 37, 61718, 41, 41, 41, 0, 0, 0, 0, 285, 1, 0, 0, 0, 14360, 18458, 47135, 34, 37, 36906, 38957, 49, 43058,
  /* 12874 */ 45109, 41014, 64, 67, 67, 88, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 49, 43058,
  /* 12895 */ 0, 0, 45109, 41014, 8323, 6277, 0, 0, 0, 0, 0, 8323, 63, 63, 66, 66, 66, 66, 66, 66, 162, 66, 66, 66, 66,
  /* 12920 */ 66, 66, 66, 66, 1090, 66, 1092, 66, 66, 66, 66, 66, 1, 0, 0, 0, 14360, 18458, 47136, 34, 37, 36906, 38957,
  /* 12943 */ 49, 43058, 45109, 41014, 63, 66, 66, 66, 66, 66, 66, 163, 66, 66, 66, 66, 66, 66, 66, 66, 1075, 66, 66,
  /* 12966 */ 66, 66, 66, 66, 66, 66, 1083, 287, 0, 0, 0, 0, 0, 0, 1075200, 0, 0, 139, 1099776, 0, 142, 1071104,
  /* 12988 */ 1071104, 1097728, 1554432, 96256, 1163264, 1165312, 1071104, 1071104, 1185792, 1071104, 1200128, 1071104,
  /* 13000 */ 1071104, 1071104, 1224704, 1071104, 1071104, 1, 0, 0, 0, 14360, 18459, 29, 34, 37, 36906, 38957, 0, 43058,
  /* 13018 */ 45109, 41014, 0, 840, 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 847, 66, 66, 66, 66, 545, 66, 66, 548, 66, 66,
  /* 13043 */ 66, 66, 66, 66, 66, 66, 66, 1244, 66, 88, 88, 88, 88, 88, 68, 68, 89, 1, 0, 0, 0, 14360, 14360, 18458,
  /* 13067 */ 18458, 29, 29, 29, 47135, 47135, 34, 34, 34, 34, 37, 37, 37, 37, 41, 36906, 0, 125, 38957, 0, 0, 0, 291,
  /* 13090 */ 0, 0, 1077248, 0, 0, 1071104, 0, 1071104, 1071104, 1071104, 1169408, 1071104, 1071104, 1097728, 1228800,
  /* 13105 */ 1097728, 1097728, 1097728, 1097728, 1097728, 1167360, 1071104, 1071104, 1071104, 1071104, 1478656,
  /* 13116 */ 1167360, 63, 66, 66, 66, 148, 152, 66, 66, 66, 66, 66, 177, 66, 182, 66, 188, 66, 191, 66, 66, 205, 66,
  /* 13139 */ 66, 88, 88, 215, 219, 88, 88, 88, 88, 88, 88, 88, 612, 88, 88, 88, 88, 88, 88, 88, 88, 421, 88, 88, 88,
  /* 13164 */ 88, 88, 88, 88, 244, 88, 249, 88, 255, 88, 258, 88, 88, 272, 88, 88, 14360, 0, 18458, 18458, 8668, 6621,
  /* 13186 */ 291, 20772, 0, 0, 480, 0, 297, 484, 66, 66, 66, 66, 66, 66, 499, 500, 66, 66, 66, 66, 507, 66, 66, 66, 66,
  /* 13211 */ 66, 560, 66, 66, 66, 66, 66, 565, 66, 66, 66, 66, 66, 66, 66, 372, 66, 66, 66, 66, 66, 66, 66, 66, 516,
  /* 13236 */ 66, 66, 66, 66, 66, 66, 66, 66, 751, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 595, 88, 88, 88, 88, 88, 88,
  /* 13262 */ 88, 88, 88, 88, 88, 88, 586, 587, 88, 88, 688, 66, 66, 691, 66, 66, 66, 66, 66, 66, 699, 66, 66, 66, 66,
  /* 13287 */ 66, 66, 1207, 66, 66, 66, 66, 66, 66, 66, 88, 88, 1102, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 601, 88,
  /* 13312 */ 88, 88, 88, 605, 718, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 523, 66, 731, 66, 66,
  /* 13337 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88, 775, 88, 88, 88, 88, 88, 88,
  /* 13363 */ 88, 88, 88, 88, 88, 88, 88, 88, 0, 832, 88, 88, 88, 88, 88, 916, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 13389 */ 88, 1179, 88, 88, 88, 88, 66, 987, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 994, 66, 66, 66, 66, 529, 66,
  /* 13414 */ 66, 533, 66, 66, 66, 66, 66, 66, 66, 66, 980, 66, 66, 66, 66, 66, 66, 66, 88, 88, 1025, 88, 88, 88, 88,
  /* 13439 */ 88, 88, 88, 88, 88, 88, 1034, 88, 88, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 341, 66, 66,
  /* 13465 */ 88, 88, 88, 88, 1113, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 1356, 1357, 1263, 66, 66,
  /* 13489 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 1276, 88, 1278, 69, 69, 90, 1, 0, 0, 0, 14360, 14360, 18458,
  /* 13512 */ 18458, 29, 29, 29, 47135, 47135, 88, 88, 88, 88, 642, 88, 88, 88, 88, 88, 648, 88, 88, 88, 88, 88, 88, 88,
  /* 13536 */ 764, 88, 88, 767, 88, 88, 88, 88, 88, 88, 88, 794, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1189, 88, 88,
  /* 13561 */ 88, 88, 88, 0, 840, 0, 0, 0, 0, 66, 66, 66, 66, 845, 66, 66, 66, 66, 849, 66, 66, 66, 1297, 66, 1299, 66,
  /* 13587 */ 66, 1301, 66, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 400, 88, 88, 88, 88, 88, 1310, 88, 1312, 88, 88,
  /* 13612 */ 1314, 88, 66, 66, 66, 66, 66, 66, 66, 564, 66, 66, 66, 66, 570, 66, 66, 66, 70, 70, 91, 1, 0, 0, 0, 14360,
  /* 13638 */ 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 66, 192, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88,
  /* 13660 */ 88, 88, 88, 1021, 301, 303, 66, 66, 66, 66, 66, 66, 66, 66, 317, 66, 322, 66, 66, 326, 66, 66, 329, 66,
  /* 13684 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 357, 66, 66, 66, 88, 88, 387, 389, 88, 88, 88, 88, 88, 88,
  /* 13710 */ 88, 88, 403, 88, 408, 88, 88, 412, 88, 88, 415, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1222, 88, 88,
  /* 13735 */ 88, 1223, 66, 66, 543, 544, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 521, 66, 66, 66, 88, 88, 88,
  /* 13760 */ 88, 88, 597, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1259, 88, 66, 66, 66, 88, 88, 88, 88, 88, 610,
  /* 13785 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1290, 66, 66, 66, 66, 88, 88, 88, 816, 817, 88, 88, 88, 88,
  /* 13810 */ 88, 88, 88, 88, 88, 88, 88, 66, 66, 1355, 66, 66, 88, 88, 88, 1038, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 13835 */ 88, 88, 88, 619, 88, 88, 88, 1084, 1085, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 539, 66,
  /* 13860 */ 1125, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 654, 66, 66, 1296, 66, 66, 66, 66, 66,
  /* 13885 */ 66, 66, 88, 1304, 88, 1305, 88, 88, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1148, 88, 1309, 88,
  /* 13910 */ 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 340, 66, 66, 1, 0, 0, 0,
  /* 13936 */ 14360, 18458, 47135, 34, 37, 36906, 38957, 49, 43058, 45109, 41014, 65, 71, 71, 92, 1, 0, 0, 0, 14360,
  /* 13956 */ 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 302, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 13978 */ 66, 327, 66, 88, 88, 388, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 650, 88, 88, 88, 88, 88, 413,
  /* 14003 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 66, 66, 426, 88, 88, 88, 88, 88,
  /* 14029 */ 88, 434, 88, 88, 436, 88, 88, 439, 88, 88, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1146, 66, 66, 66, 66,
  /* 14054 */ 747, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 1103, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1042, 88,
  /* 14079 */ 88, 88, 88, 88, 88, 88, 640, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66, 1261, 66, 66, 66,
  /* 14104 */ 690, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 358, 66, 66, 66, 66, 706, 66, 66, 66, 66, 66, 66,
  /* 14130 */ 66, 66, 66, 66, 66, 66, 66, 360, 66, 66, 88, 88, 88, 88, 762, 88, 88, 88, 88, 766, 88, 88, 88, 88, 88, 88,
  /* 14156 */ 0, 0, 0, 0, 662, 8668, 6621, 666, 0, 0, 0, 840, 0, 0, 0, 0, 66, 66, 66, 844, 66, 66, 66, 66, 66, 66, 532,
  /* 14183 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 502, 66, 66, 66, 66, 66, 66, 88, 88, 88, 942, 88, 88, 88, 88, 88, 88,
  /* 14209 */ 88, 88, 88, 88, 88, 88, 769, 88, 88, 773, 88, 88, 1048, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 14234 */ 88, 88, 1180, 88, 66, 66, 66, 1266, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 230, 88, 88, 88,
  /* 14259 */ 88, 88, 1281, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 66, 1197, 66, 66, 66, 66, 66, 66, 88,
  /* 14284 */ 88, 88, 1311, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 1167, 88, 88, 88,
  /* 14309 */ 72, 72, 93, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 63, 66, 66, 66, 149, 66,
  /* 14331 */ 155, 66, 66, 168, 66, 178, 66, 183, 66, 66, 66, 66, 1298, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88,
  /* 14356 */ 1107, 88, 88, 88, 88, 88, 190, 193, 198, 66, 206, 66, 66, 88, 88, 216, 88, 222, 88, 88, 235, 88, 0, 0, 0,
  /* 14381 */ 66, 66, 66, 66, 66, 66, 66, 1067, 66, 66, 66, 66, 306, 66, 66, 66, 66, 66, 318, 66, 66, 66, 66, 66, 335,
  /* 14406 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 520, 66, 66, 66, 66, 245, 88, 250, 88, 88, 257, 260, 265, 88,
  /* 14431 */ 273, 88, 88, 14360, 0, 18458, 18458, 66, 328, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 343, 66,
  /* 14455 */ 88, 88, 88, 88, 88, 88, 88, 88, 394, 88, 88, 88, 88, 88, 88, 88, 88, 1219, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 14481 */ 1030, 88, 88, 1033, 88, 88, 88, 88, 409, 88, 88, 88, 414, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66,
  /* 14506 */ 1291, 66, 1292, 66, 88, 88, 429, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 441, 88, 467, 88, 88,
  /* 14530 */ 18458, 61718, 0, 471, 0, 0, 0, 0, 285, 0, 0, 288, 8323, 6276, 6276, 0, 20772, 137, 0, 285, 139, 63, 297,
  /* 14553 */ 142, 66, 66, 66, 66, 1164, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88, 66, 66, 1367, 1368, 66, 66,
  /* 14578 */ 88, 8668, 6621, 291, 20772, 0, 0, 0, 0, 297, 0, 487, 66, 489, 66, 490, 66, 66, 66, 746, 66, 748, 66, 66,
  /* 14602 */ 66, 66, 66, 66, 66, 88, 88, 88, 88, 1332, 88, 88, 88, 88, 88, 492, 66, 66, 66, 496, 66, 66, 66, 66, 66,
  /* 14627 */ 66, 66, 66, 66, 509, 66, 66, 66, 851, 66, 66, 854, 855, 66, 66, 66, 66, 66, 860, 66, 862, 541, 542, 66,
  /* 14651 */ 66, 66, 66, 66, 66, 66, 550, 66, 66, 66, 554, 66, 66, 66, 203, 66, 66, 66, 88, 212, 88, 88, 88, 227, 88,
  /* 14676 */ 88, 241, 574, 88, 576, 88, 577, 88, 579, 88, 88, 88, 583, 88, 88, 88, 88, 88, 88, 88, 918, 88, 88, 88, 88,
  /* 14701 */ 88, 88, 88, 88, 88, 782, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 596, 88, 88, 88, 88, 600, 88, 88, 88, 88,
  /* 14727 */ 604, 88, 0, 0, 0, 66, 66, 66, 66, 66, 1065, 66, 66, 66, 66, 66, 66, 1153, 66, 66, 66, 66, 66, 66, 66,
  /* 14752 */ 1158, 66, 606, 88, 88, 88, 88, 88, 88, 88, 88, 614, 615, 617, 88, 88, 88, 88, 0, 662, 0, 0, 0, 0, 0, 0, 0,
  /* 14779 */ 839, 0, 481, 88, 88, 624, 625, 88, 88, 628, 629, 88, 88, 88, 88, 88, 88, 88, 637, 88, 88, 88, 641, 88, 88,
  /* 14804 */ 88, 88, 88, 88, 88, 649, 88, 88, 88, 88, 0, 662, 0, 0, 0, 0, 0, 838, 0, 0, 0, 0, 65536, 65536, 65536,
  /* 14829 */ 65536, 65536, 65536, 65536, 65536, 65536, 65536, 65536, 65536, 88, 88, 88, 88, 88, 660, 471, 0, 0, 0, 662,
  /* 14849 */ 8668, 6621, 0, 0, 0, 291, 0, 0, 1077248, 0, 20480, 1071104, 0, 1071104, 1071104, 1071104, 1169408,
  /* 14866 */ 1071104, 1071104, 88, 88, 88, 88, 778, 88, 780, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 1319, 66,
  /* 14889 */ 66, 66, 88, 88, 88, 88, 88, 804, 805, 88, 88, 88, 88, 88, 88, 812, 88, 88, 0, 66, 66, 66, 66, 66, 66, 66,
  /* 14915 */ 1144, 1145, 66, 66, 66, 66, 66, 1268, 66, 1270, 1271, 66, 1273, 66, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 14938 */ 88, 88, 401, 88, 88, 88, 828, 829, 88, 88, 0, 662, 0, 0, 0, 0, 0, 838, 0, 0, 0, 0, 69632, 0, 0, 14360,
  /* 14964 */ 14360, 18458, 18458, 29, 29, 29, 29, 29, 66, 876, 66, 66, 66, 879, 66, 66, 66, 884, 66, 66, 66, 66, 66,
  /* 14987 */ 66, 547, 66, 66, 66, 66, 66, 66, 66, 66, 66, 993, 66, 66, 66, 66, 66, 66, 66, 891, 66, 66, 66, 66, 66, 66,
  /* 15013 */ 66, 896, 66, 66, 66, 66, 66, 66, 563, 66, 66, 66, 66, 66, 66, 66, 66, 66, 698, 66, 66, 66, 66, 703, 66,
  /* 15038 */ 88, 939, 88, 88, 88, 944, 88, 88, 88, 88, 88, 88, 88, 951, 88, 88, 0, 66, 66, 1141, 66, 66, 66, 66, 66,
  /* 15063 */ 66, 66, 66, 66, 66, 66, 725, 66, 66, 66, 66, 88, 88, 88, 88, 88, 956, 88, 88, 88, 88, 88, 88, 88, 88, 0,
  /* 15089 */ 0, 0, 0, 662, 8668, 6621, 0, 0, 0, 88, 88, 88, 88, 1027, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 276,
  /* 15115 */ 14360, 0, 18458, 18458, 88, 88, 88, 88, 88, 1040, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 274, 88, 14360,
  /* 15138 */ 0, 18458, 18458, 1046, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 787, 1070, 66, 66, 66,
  /* 15162 */ 66, 66, 66, 66, 1076, 66, 66, 66, 66, 66, 1082, 66, 66, 66, 865, 66, 66, 66, 868, 66, 66, 870, 66, 871,
  /* 15186 */ 66, 66, 66, 66, 734, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 377, 66, 66, 66, 66, 1098, 1099, 66, 88,
  /* 15211 */ 88, 88, 88, 88, 88, 1106, 88, 88, 88, 88, 88, 1110, 1139, 88, 0, 66, 66, 66, 1142, 66, 66, 66, 66, 66, 66,
  /* 15236 */ 66, 1147, 66, 66, 66, 892, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 754, 755, 88, 88, 88, 88, 88,
  /* 15261 */ 88, 1184, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 423, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1228,
  /* 15286 */ 88, 88, 66, 66, 66, 66, 66, 66, 66, 696, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1091, 1093, 66, 66, 66, 1096,
  /* 15311 */ 66, 66, 66, 1237, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88, 88, 238, 88, 88, 88, 88,
  /* 15336 */ 1252, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 88, 88, 88, 88, 66, 66, 88, 66, 1295, 66, 66, 66,
  /* 15361 */ 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1308, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 15386 */ 1316, 1317, 1318, 66, 66, 66, 1321, 66, 1323, 66, 66, 66, 66, 1328, 1329, 1330, 88, 88, 88, 1333, 88,
  /* 15407 */ 1335, 88, 0, 0, 0, 66, 66, 66, 66, 1064, 66, 66, 66, 66, 1068, 66, 66, 66, 204, 66, 66, 66, 88, 88, 88,
  /* 15432 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 589, 66, 1359, 88, 88, 1361, 88, 88, 88, 1365, 66, 66,
  /* 15457 */ 66, 66, 66, 66, 88, 1013, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 949, 88, 88, 88, 88, 88, 73, 73, 94, 1,
  /* 15483 */ 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 63, 66, 66, 143, 66, 66, 66, 66, 66, 66,
  /* 15505 */ 172, 66, 66, 66, 66, 66, 307, 66, 66, 66, 316, 66, 66, 66, 66, 66, 66, 1001, 66, 66, 66, 66, 66, 66, 66,
  /* 15530 */ 66, 66, 313, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 392, 88, 88, 88, 88, 88, 404, 88, 88, 0,
  /* 15556 */ 66, 1140, 66, 66, 66, 1143, 66, 66, 66, 66, 66, 66, 66, 88, 213, 88, 88, 88, 88, 88, 88, 242, 88, 639, 88,
  /* 15581 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 440, 88, 66, 66, 1360, 88, 88, 88, 88, 88, 88, 66, 66,
  /* 15607 */ 66, 66, 66, 66, 88, 1101, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 784, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 15633 */ 88, 1374, 66, 66, 66, 1376, 88, 88, 88, 66, 66, 88, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29,
  /* 15656 */ 47135, 47135, 74, 74, 95, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 34, 34, 34,
  /* 15677 */ 34, 37, 37, 37, 37, 41, 36906, 0, 126, 38957, 0, 0, 0, 291, 0, 0, 1077248, 479, 0, 1071104, 483, 1071104,
  /* 15699 */ 1071104, 1071104, 1169408, 1071104, 1071104, 8668, 6621, 291, 20772, 0, 0, 481, 0, 297, 485, 66, 66, 66,
  /* 15717 */ 66, 66, 66, 695, 66, 66, 66, 66, 66, 66, 66, 66, 66, 374, 66, 66, 66, 66, 66, 66, 66, 719, 66, 66, 66, 66,
  /* 15743 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 555, 66, 88, 88, 88, 88, 88, 1051, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 15769 */ 88, 88, 275, 88, 14360, 0, 18458, 18458, 88, 88, 1126, 88, 88, 88, 88, 88, 88, 88, 88, 1134, 88, 88, 1137,
  /* 15792 */ 88, 0, 0, 0, 66, 66, 66, 1063, 66, 66, 66, 66, 66, 66, 66, 66, 1003, 66, 66, 66, 66, 66, 66, 66, 1160, 66,
  /* 15818 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 1168, 88, 88, 88, 88, 88, 88, 418, 420, 88, 88, 88, 88, 88,
  /* 15843 */ 88, 88, 88, 88, 959, 88, 88, 88, 88, 0, 0, 88, 88, 88, 88, 88, 88, 1185, 88, 1187, 88, 88, 88, 88, 88, 88,
  /* 15869 */ 88, 88, 820, 88, 88, 88, 88, 88, 88, 88, 88, 919, 88, 921, 88, 88, 88, 88, 88, 88, 1225, 88, 88, 88, 88,
  /* 15894 */ 88, 88, 88, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1203, 88, 1371, 1372, 88, 88, 66, 66, 66, 66,
  /* 15919 */ 88, 88, 88, 88, 66, 66, 88, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47218, 88, 88, 448,
  /* 15942 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1192, 88, 88, 88, 88, 88, 659, 88, 0, 0, 0, 0,
  /* 15968 */ 662, 8668, 6621, 0, 0, 0, 291, 20772, 0, 0, 0, 0, 297, 0, 66, 66, 66, 66, 66, 66, 1165, 66, 66, 66, 66,
  /* 15993 */ 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 66, 88, 66, 689, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 16019 */ 66, 66, 66, 66, 572, 66, 953, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 0, 0, 0, 0, 662, 8668,
  /* 16045 */ 6621, 0, 0, 669, 75, 75, 96, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 140, 66,
  /* 16067 */ 66, 66, 66, 66, 156, 66, 164, 66, 66, 66, 66, 66, 66, 66, 722, 66, 66, 66, 66, 66, 66, 66, 66, 549, 66,
  /* 16092 */ 66, 66, 66, 66, 66, 557, 66, 66, 330, 66, 66, 66, 66, 66, 66, 66, 338, 66, 66, 66, 66, 66, 349, 66, 66,
  /* 16117 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 1079, 66, 1081, 66, 66, 66, 365, 66, 66, 369, 66, 66, 66, 66, 66, 375,
  /* 16142 */ 66, 66, 66, 382, 66, 66, 66, 974, 66, 66, 978, 66, 66, 66, 66, 66, 66, 66, 66, 66, 312, 319, 66, 66, 66,
  /* 16167 */ 66, 66, 88, 88, 88, 88, 88, 416, 88, 88, 88, 88, 88, 88, 88, 424, 88, 88, 88, 88, 88, 88, 453, 88, 88, 88,
  /* 16193 */ 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 1320, 66, 66, 88, 88, 88, 88, 451, 88, 88, 455, 88, 88, 88, 88,
  /* 16218 */ 88, 461, 88, 88, 88, 88, 88, 88, 454, 88, 88, 88, 88, 88, 88, 88, 88, 465, 88, 468, 88, 88, 18458, 61718,
  /* 16242 */ 0, 0, 0, 0, 0, 0, 285, 0, 0, 288, 88, 88, 593, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 603,
  /* 16269 */ 88, 88, 88, 622, 88, 88, 88, 627, 88, 88, 88, 88, 88, 88, 88, 88, 636, 88, 0, 0, 0, 66, 66, 1062, 66, 66,
  /* 16295 */ 66, 66, 66, 66, 66, 66, 66, 567, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 644, 88, 88, 88, 88, 88, 88,
  /* 16321 */ 88, 88, 88, 653, 655, 88, 88, 88, 88, 88, 0, 0, 0, 0, 662, 8668, 6621, 0, 0, 0, 291, 20772, 0, 1077248, 0,
  /* 16346 */ 0, 297, 0, 66, 66, 66, 66, 66, 66, 209, 88, 88, 88, 88, 88, 228, 88, 88, 88, 88, 759, 88, 88, 88, 88, 88,
  /* 16372 */ 88, 88, 88, 88, 88, 88, 771, 88, 88, 88, 88, 88, 88, 471, 0, 0, 0, 0, 8668, 6621, 0, 667, 0, 66, 864, 66,
  /* 16398 */ 66, 66, 66, 66, 66, 869, 66, 66, 66, 66, 66, 66, 66, 750, 66, 66, 66, 66, 66, 88, 88, 88, 1015, 88, 88,
  /* 16423 */ 88, 88, 88, 88, 1022, 66, 66, 88, 902, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 935, 88, 88, 88,
  /* 16448 */ 88, 88, 88, 88, 929, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 437, 88, 88, 88, 88, 88, 940, 88, 88, 88,
  /* 16474 */ 88, 88, 88, 947, 88, 88, 88, 88, 88, 88, 88, 88, 1041, 88, 88, 88, 88, 88, 88, 88, 88, 647, 88, 88, 88,
  /* 16499 */ 88, 88, 652, 88, 88, 88, 954, 88, 88, 88, 957, 88, 88, 88, 88, 88, 88, 88, 0, 0, 0, 0, 662, 8668, 6621, 0,
  /* 16525 */ 0, 670, 66, 972, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 716, 66, 66, 66, 988, 989, 66,
  /* 16550 */ 66, 66, 66, 992, 66, 66, 66, 66, 66, 66, 66, 882, 66, 66, 66, 66, 66, 66, 66, 66, 337, 66, 66, 66, 66, 66,
  /* 16576 */ 66, 66, 66, 997, 66, 66, 66, 1000, 66, 1002, 66, 66, 66, 66, 66, 66, 1006, 66, 66, 66, 975, 66, 977, 66,
  /* 16600 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 1155, 66, 66, 66, 66, 66, 88, 88, 88, 88, 1039, 88, 88, 88, 88, 88,
  /* 16625 */ 88, 88, 88, 1044, 88, 88, 88, 88, 88, 88, 471, 0, 0, 0, 662, 8668, 6621, 0, 0, 0, 676, 0, 0, 66, 66, 66,
  /* 16651 */ 66, 66, 66, 66, 66, 66, 66, 504, 66, 66, 66, 66, 66, 88, 1047, 88, 1049, 88, 88, 88, 88, 88, 88, 1053, 88,
  /* 16676 */ 88, 88, 88, 88, 88, 88, 958, 88, 88, 88, 88, 88, 88, 0, 0, 0, 0, 0, 8668, 6621, 0, 0, 0, 88, 88, 88, 88,
  /* 16703 */ 1114, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 585, 88, 88, 88, 88, 88, 88, 88, 88, 1128, 88, 88, 88,
  /* 16728 */ 88, 88, 88, 88, 88, 88, 88, 88, 602, 88, 88, 88, 88, 88, 88, 88, 88, 1215, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 16754 */ 88, 88, 88, 633, 88, 88, 88, 88, 88, 88, 88, 1226, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 16780 */ 66, 66, 1202, 66, 88, 88, 88, 88, 1283, 88, 1285, 1286, 88, 1288, 88, 66, 66, 66, 66, 66, 370, 66, 66, 66,
  /* 16804 */ 66, 66, 66, 66, 66, 66, 66, 1209, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88, 1350, 88, 1351, 88, 88, 88, 66,
  /* 16829 */ 66, 66, 66, 66, 66, 1343, 66, 1344, 66, 66, 66, 88, 88, 1380, 1381, 66, 88, 66, 88, 66, 88, 0, 0, 0, 0, 0,
  /* 16855 */ 0, 0, 1075200, 0, 20480, 139, 1099776, 0, 142, 1071104, 1071104, 88, 88, 88, 88, 88, 763, 88, 88, 88, 88,
  /* 16876 */ 88, 88, 88, 88, 88, 88, 457, 88, 88, 88, 88, 88, 76, 76, 97, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29,
  /* 16900 */ 29, 29, 47135, 47135, 63, 66, 66, 144, 66, 66, 66, 158, 66, 66, 66, 66, 66, 66, 66, 66, 501, 66, 66, 66,
  /* 16924 */ 66, 66, 66, 66, 66, 194, 66, 66, 66, 66, 66, 88, 211, 88, 88, 88, 225, 88, 88, 88, 88, 88, 88, 88, 1130,
  /* 16949 */ 88, 1132, 88, 88, 88, 88, 88, 88, 0, 0, 0, 0, 662, 8668, 6621, 665, 0, 0, 364, 66, 66, 66, 66, 66, 66, 66,
  /* 16975 */ 66, 66, 66, 66, 378, 66, 66, 66, 66, 561, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 983, 66, 66,
  /* 17000 */ 986, 66, 88, 386, 88, 88, 88, 88, 88, 88, 88, 88, 88, 398, 405, 88, 88, 88, 88, 88, 88, 471, 0, 0, 0, 662,
  /* 17026 */ 8668, 6621, 664, 0, 0, 291, 0, 0, 1077248, 0, 0, 1071104, 0, 1071245, 1071245, 1071245, 1169549, 1071245,
  /* 17044 */ 1071245, 1259661, 1071245, 1271949, 1288333, 1071245, 1071245, 1312909, 1343629, 1071245, 1071245,
  /* 17055 */ 1071245, 1431693, 1071245, 1071245, 1349773, 1353869, 1364109, 1376397, 1071245, 1071245, 1071245,
  /* 17066 */ 1407117, 1421453, 1071245, 1071245, 1071245, 1071245, 1071245, 1529997, 1071245, 1071245, 1542285,
  /* 17077 */ 1548429, 1552525, 1163264, 1165312, 1097728, 1097728, 1185792, 88, 88, 88, 450, 88, 88, 88, 88, 88, 88,
  /* 17094 */ 88, 88, 88, 88, 88, 464, 88, 88, 594, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 785, 88, 88, 88,
  /* 17120 */ 88, 608, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 797, 88, 88, 88, 88, 88, 658, 88, 88, 0, 0,
  /* 17146 */ 0, 0, 662, 8668, 6621, 665, 0, 0, 291, 20772, 294, 294, 0, 0, 297, 0, 66, 66, 66, 66, 66, 66, 308, 66, 66,
  /* 17171 */ 66, 66, 66, 66, 323, 66, 66, 743, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 1169, 88,
  /* 17196 */ 88, 814, 88, 88, 88, 88, 88, 819, 88, 88, 88, 88, 88, 88, 88, 88, 88, 582, 88, 88, 88, 88, 88, 88, 971,
  /* 17221 */ 66, 66, 66, 66, 66, 66, 979, 66, 66, 66, 66, 66, 66, 66, 66, 711, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 17246 */ 1010, 66, 66, 88, 88, 88, 88, 88, 88, 88, 1018, 88, 88, 88, 88, 88, 88, 88, 1175, 88, 88, 88, 88, 88, 88,
  /* 17271 */ 88, 88, 88, 88, 1289, 66, 66, 66, 66, 66, 88, 88, 88, 1026, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 17296 */ 88, 1135, 88, 88, 88, 1322, 66, 1324, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88, 1334, 88, 1336, 88, 88, 88,
  /* 17320 */ 1340, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1347, 1370, 88, 88, 88, 88, 66, 66, 66, 66, 88, 88, 88,
  /* 17345 */ 88, 66, 66, 88, 88, 88, 88, 88, 88, 907, 88, 88, 88, 88, 88, 88, 88, 88, 765, 88, 88, 88, 88, 88, 88, 88,
  /* 17371 */ 88, 781, 88, 783, 88, 88, 88, 88, 88, 77, 77, 98, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29,
  /* 17394 */ 47135, 47218, 29, 47135, 34, 34, 37, 37, 37, 61718, 41, 41, 41, 0, 281, 0, 0, 285, 66, 66, 366, 66, 66,
  /* 17417 */ 66, 66, 66, 373, 66, 66, 66, 66, 66, 66, 66, 895, 66, 66, 66, 66, 66, 66, 66, 66, 1243, 66, 66, 1245, 88,
  /* 17442 */ 88, 88, 88, 88, 88, 88, 88, 88, 452, 88, 88, 88, 88, 88, 459, 88, 88, 88, 88, 0, 662, 0, 0, 836, 0, 0, 0,
  /* 17469 */ 0, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 66, 687, 66, 66, 66, 512, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 17496 */ 66, 66, 66, 571, 66, 66, 730, 66, 66, 66, 66, 735, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1210, 66,
  /* 17521 */ 66, 88, 88, 774, 88, 88, 88, 88, 779, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 458, 88, 88, 88, 88, 88, 66,
  /* 17547 */ 1071, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 728, 729, 1111, 88, 88, 88, 88, 88, 88, 88,
  /* 17572 */ 88, 88, 88, 88, 88, 88, 88, 88, 799, 66, 1264, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88,
  /* 17597 */ 1306, 88, 1279, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 1196, 66, 66, 66, 1200, 66,
  /* 17621 */ 66, 66, 78, 78, 99, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 63, 66, 66, 145, 66,
  /* 17644 */ 66, 66, 160, 66, 66, 174, 66, 66, 66, 185, 66, 66, 66, 1086, 66, 66, 66, 66, 66, 66, 66, 66, 1094, 66, 66,
  /* 17669 */ 1097, 88, 88, 88, 252, 88, 88, 88, 88, 270, 88, 88, 88, 14360, 0, 18458, 18458, 443, 88, 88, 88, 88, 88,
  /* 17692 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 813, 66, 66, 494, 66, 66, 66, 66, 66, 66, 66, 66, 505, 66, 66, 66,
  /* 17718 */ 66, 66, 1074, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 858, 66, 66, 66, 66, 88, 592, 88, 88, 88, 88,
  /* 17743 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 463, 88, 66, 66, 745, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88,
  /* 17769 */ 88, 88, 88, 1104, 88, 88, 88, 88, 1108, 88, 88, 88, 758, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 17794 */ 88, 88, 88, 827, 88, 88, 88, 88, 803, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 768, 88, 770, 88, 88,
  /* 17819 */ 890, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 874, 88, 88, 914, 915, 88, 88, 88, 88,
  /* 17844 */ 88, 920, 88, 922, 88, 88, 88, 88, 0, 662, 0, 834, 0, 0, 0, 0, 0, 0, 0, 0, 1075200, 293, 0, 139, 1099776,
  /* 17869 */ 0, 142, 1071104, 1071104, 926, 88, 88, 88, 88, 88, 88, 88, 88, 932, 88, 88, 88, 88, 88, 88, 88, 88, 1352,
  /* 17892 */ 1353, 88, 66, 66, 66, 66, 66, 938, 88, 88, 88, 88, 88, 88, 946, 88, 88, 88, 88, 950, 88, 88, 88, 88, 88,
  /* 17917 */ 88, 88, 1186, 88, 88, 88, 88, 88, 88, 88, 88, 88, 821, 88, 88, 88, 88, 88, 88, 1008, 66, 66, 1011, 66,
  /* 17941 */ 1012, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 584, 88, 88, 88, 88, 590, 88, 88, 88, 1127, 88, 88, 1129,
  /* 17965 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 933, 88, 88, 88, 88, 88, 1149, 1150, 66, 66, 66, 66, 66, 1154, 66,
  /* 17990 */ 66, 66, 66, 66, 66, 66, 1159, 88, 88, 1171, 1172, 88, 88, 88, 88, 1176, 1177, 88, 88, 88, 88, 88, 1181,
  /* 18013 */ 88, 88, 88, 88, 88, 88, 1254, 88, 88, 88, 88, 88, 88, 66, 66, 1262, 88, 88, 88, 1282, 88, 88, 88, 88,
  /* 18037 */ 1287, 88, 88, 66, 66, 66, 66, 66, 546, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 982, 66, 66, 66, 66,
  /* 18062 */ 88, 88, 88, 88, 88, 1313, 88, 88, 1315, 66, 66, 66, 66, 66, 66, 66, 991, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 18087 */ 311, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 1362, 1363, 88, 88, 66, 66, 66, 66, 66, 66, 88, 88,
  /* 18112 */ 88, 88, 88, 906, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1230, 66, 66, 66, 66, 1234, 66, 88, 66, 88, 66, 88,
  /* 18137 */ 1384, 1385, 66, 88, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 66, 683, 66, 66, 66, 66, 66, 79, 79, 100, 1, 0, 0, 0,
  /* 18165 */ 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 63, 66, 66, 66, 150, 154, 157, 66, 165, 66, 66, 179,
  /* 18186 */ 181, 184, 66, 66, 66, 305, 66, 66, 66, 309, 66, 66, 320, 66, 66, 324, 66, 66, 66, 332, 334, 66, 66, 66,
  /* 18210 */ 66, 66, 66, 66, 66, 66, 66, 66, 354, 66, 66, 66, 66, 66, 195, 199, 66, 66, 66, 66, 88, 88, 217, 221, 224,
  /* 18235 */ 88, 232, 88, 88, 88, 88, 88, 88, 471, 0, 661, 0, 662, 8668, 6621, 0, 0, 0, 841, 0, 485, 66, 66, 66, 66,
  /* 18260 */ 66, 66, 66, 66, 66, 66, 376, 66, 66, 66, 66, 66, 246, 248, 251, 88, 88, 88, 262, 266, 88, 88, 88, 88,
  /* 18284 */ 14360, 0, 18458, 18458, 66, 66, 347, 66, 66, 66, 66, 66, 66, 66, 66, 66, 356, 66, 66, 363, 88, 88, 88, 88,
  /* 18308 */ 88, 433, 88, 88, 88, 88, 88, 88, 88, 88, 88, 442, 88, 88, 449, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 18333 */ 462, 88, 88, 88, 88, 88, 88, 611, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1119, 88, 1121, 88, 88, 88, 88,
  /* 18358 */ 88, 88, 88, 18458, 61718, 0, 0, 0, 472, 0, 126, 285, 0, 0, 288, 8668, 6621, 291, 20772, 0, 0, 0, 0, 297,
  /* 18382 */ 0, 66, 488, 66, 66, 66, 66, 66, 1327, 88, 88, 88, 1331, 88, 88, 88, 88, 88, 88, 88, 598, 88, 88, 88, 88,
  /* 18407 */ 88, 88, 88, 88, 88, 1220, 88, 88, 88, 88, 88, 88, 66, 493, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 18433 */ 66, 66, 873, 66, 66, 66, 526, 66, 66, 531, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1274, 88, 88, 88,
  /* 18458 */ 88, 88, 575, 88, 88, 88, 88, 88, 580, 88, 88, 88, 88, 88, 88, 88, 88, 88, 948, 88, 88, 88, 88, 88, 88, 88,
  /* 18484 */ 88, 88, 88, 609, 88, 88, 88, 613, 88, 88, 618, 88, 88, 88, 88, 0, 662, 0, 835, 0, 0, 0, 0, 671, 0, 0, 0,
  /* 18511 */ 677, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 885, 66, 66, 66, 66, 66, 88, 88, 801, 88, 88, 88, 88, 88,
  /* 18537 */ 88, 88, 88, 88, 88, 88, 88, 88, 825, 88, 88, 1037, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 18563 */ 88, 925, 88, 88, 88, 1194, 66, 66, 66, 66, 66, 66, 66, 1199, 66, 66, 66, 66, 333, 66, 66, 66, 66, 66, 66,
  /* 18588 */ 66, 66, 66, 66, 66, 66, 1275, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1217, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 18613 */ 88, 88, 960, 88, 88, 88, 0, 0, 66, 1236, 66, 66, 66, 66, 66, 1242, 66, 66, 66, 88, 88, 88, 1247, 88, 0, 0,
  /* 18639 */ 0, 66, 1061, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 551, 66, 66, 66, 556, 66, 88, 88, 88, 1251, 88, 88,
  /* 18664 */ 88, 88, 88, 1257, 88, 88, 88, 66, 66, 66, 1195, 66, 66, 66, 1198, 66, 66, 66, 66, 66, 66, 66, 1265, 66,
  /* 18688 */ 66, 66, 1269, 66, 66, 66, 66, 66, 88, 88, 88, 88, 1016, 88, 1017, 88, 88, 88, 88, 88, 1280, 88, 88, 88,
  /* 18712 */ 1284, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 693, 66, 66, 697, 66, 66, 66, 701, 66, 66, 66, 88, 66, 88,
  /* 18737 */ 1382, 1383, 66, 88, 66, 88, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 682, 66, 66, 66, 66, 66, 66, 709, 66, 66, 66,
  /* 18764 */ 66, 66, 66, 715, 66, 717, 80, 80, 101, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135,
  /* 18786 */ 88, 88, 88, 253, 88, 88, 88, 88, 271, 88, 88, 88, 14360, 0, 18458, 18458, 29, 47135, 34, 34, 37, 37, 37,
  /* 18809 */ 61718, 41, 41, 41, 0, 282, 0, 0, 285, 88, 411, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 425,
  /* 18834 */ 444, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 460, 88, 88, 88, 88, 88, 88, 88, 1229, 88, 66, 66, 66,
  /* 18859 */ 66, 66, 66, 66, 710, 66, 66, 713, 66, 66, 66, 66, 66, 88, 88, 88, 88, 18458, 61718, 0, 0, 283, 0, 0, 0,
  /* 18884 */ 285, 0, 0, 288, 621, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1124, 788, 88, 790, 88,
  /* 18909 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 924, 88, 88, 66, 66, 877, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 18935 */ 66, 66, 66, 66, 66, 727, 66, 66, 34, 34, 34, 34, 37, 37, 37, 37, 41, 36906, 0, 127, 38957, 0, 0, 0, 478,
  /* 18960 */ 0, 0, 1077248, 0, 0, 1071104, 0, 1071104, 1071104, 1071104, 1169408, 1071104, 1071104, 8668, 6621, 291,
  /* 18976 */ 20772, 0, 0, 482, 0, 297, 486, 66, 66, 66, 66, 66, 66, 721, 66, 66, 66, 66, 66, 66, 66, 66, 66, 315, 66,
  /* 19001 */ 66, 66, 66, 325, 66, 66, 66, 66, 1152, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 553, 66, 66, 66,
  /* 19026 */ 81, 81, 102, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 63, 66, 66, 66, 151, 66,
  /* 19048 */ 66, 66, 66, 169, 66, 66, 66, 66, 187, 189, 66, 66, 200, 66, 66, 66, 66, 88, 88, 218, 88, 88, 88, 88, 236,
  /* 19073 */ 88, 0, 0, 0, 1060, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1157, 66, 66, 66, 88, 88, 88, 254, 256,
  /* 19099 */ 88, 88, 267, 88, 88, 88, 88, 14360, 0, 18458, 18458, 466, 88, 88, 88, 18458, 61718, 0, 0, 0, 0, 0, 0, 285,
  /* 19123 */ 0, 0, 288, 8668, 6621, 291, 20772, 0, 0, 0, 0, 297, 0, 66, 66, 66, 66, 66, 491, 88, 88, 88, 88, 88, 578,
  /* 19148 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 616, 88, 88, 620, 88, 88, 638, 88, 88, 88, 643, 88, 88, 88, 88,
  /* 19173 */ 88, 88, 88, 88, 651, 88, 88, 88, 88, 88, 88, 645, 646, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1052, 88, 88,
  /* 19198 */ 1055, 88, 88, 1058, 88, 88, 657, 88, 88, 88, 0, 0, 0, 0, 662, 8668, 6621, 0, 0, 0, 673, 0, 0, 0, 66, 66,
  /* 19224 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 535, 66, 66, 66, 540, 66, 720, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 19250 */ 726, 66, 66, 66, 66, 692, 66, 694, 66, 66, 66, 66, 66, 66, 702, 66, 704, 66, 66, 732, 66, 66, 66, 66, 66,
  /* 19275 */ 66, 66, 66, 66, 66, 66, 66, 66, 888, 66, 66, 88, 88, 88, 761, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 19301 */ 88, 1191, 88, 88, 88, 88, 88, 88, 88, 791, 88, 793, 88, 796, 88, 88, 88, 88, 88, 88, 88, 88, 1117, 88, 88,
  /* 19326 */ 88, 88, 88, 88, 88, 88, 795, 88, 88, 88, 88, 88, 88, 88, 88, 807, 88, 88, 88, 88, 88, 88, 88, 88, 435, 88,
  /* 19352 */ 88, 88, 88, 88, 88, 88, 88, 456, 88, 88, 88, 88, 88, 88, 88, 88, 581, 88, 88, 88, 88, 88, 88, 88, 88, 599,
  /* 19378 */ 88, 88, 88, 88, 88, 88, 88, 88, 630, 631, 88, 88, 88, 88, 88, 88, 88, 88, 88, 802, 88, 88, 88, 88, 88,
  /* 19403 */ 808, 88, 88, 88, 88, 88, 88, 88, 269, 88, 88, 88, 88, 14360, 0, 18458, 18458, 88, 88, 88, 830, 0, 662, 0,
  /* 19427 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1071104, 1071104, 1071104, 1071104, 1071104, 1187840, 1071104, 912, 88, 88, 88,
  /* 19447 */ 88, 88, 917, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1032, 88, 88, 88, 88, 88, 1249, 88, 88, 88, 88, 88,
  /* 19472 */ 88, 88, 88, 88, 1258, 88, 88, 66, 66, 66, 66, 708, 66, 66, 66, 66, 712, 66, 714, 66, 66, 66, 66, 348, 66,
  /* 19497 */ 66, 350, 66, 66, 353, 66, 66, 66, 66, 66, 66, 1300, 66, 66, 1302, 88, 88, 88, 88, 88, 88, 88, 268, 88, 88,
  /* 19522 */ 88, 88, 14360, 0, 18458, 18458, 1294, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 1307, 1358,
  /* 19545 */ 66, 88, 88, 88, 88, 88, 1364, 88, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 905, 88, 88, 88, 88, 909, 88,
  /* 19570 */ 88, 88, 88, 0, 662, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 968, 66, 66, 66, 82, 82, 103, 1, 0, 0, 0,
  /* 19599 */ 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 63, 66, 66, 146, 66, 66, 66, 66, 66, 66, 175, 66,
  /* 19620 */ 66, 66, 66, 66, 880, 66, 66, 66, 66, 66, 66, 887, 66, 66, 66, 344, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 19646 */ 66, 66, 66, 66, 66, 996, 66, 88, 88, 88, 88, 88, 391, 88, 88, 88, 395, 88, 88, 406, 88, 88, 88, 88, 88,
  /* 19671 */ 88, 945, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 1232, 66, 66, 66, 410, 88, 88, 88, 88, 88, 88,
  /* 19696 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 1193, 427, 88, 88, 430, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 19721 */ 88, 14360, 0, 18458, 18458, 88, 607, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 588, 88, 88,
  /* 19745 */ 656, 88, 88, 88, 88, 0, 283, 0, 0, 662, 8668, 6621, 0, 0, 0, 674, 0, 0, 0, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 19772 */ 66, 66, 1303, 88, 88, 88, 88, 88, 66, 744, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 757, 800,
  /* 19797 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 810, 88, 88, 88, 88, 0, 662, 832, 0, 0, 0, 667, 838, 0, 0, 0, 0,
  /* 19824 */ 0, 1077248, 0, 0, 1071104, 0, 1071104, 1071104, 1071104, 1169408, 1071104, 1071104, 88, 88, 88, 88, 943,
  /* 19841 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 934, 88, 88, 88, 88, 66, 66, 998, 66, 66, 66, 66, 66, 66, 66,
  /* 19867 */ 66, 66, 66, 66, 66, 66, 899, 66, 66, 66, 66, 1162, 66, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88,
  /* 19892 */ 226, 88, 88, 240, 88, 1213, 88, 88, 88, 1216, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 632, 88, 88, 635,
  /* 19916 */ 88, 88, 66, 66, 66, 1238, 66, 1240, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88, 908, 88, 88, 88, 88,
  /* 19941 */ 88, 88, 88, 88, 88, 88, 88, 1253, 88, 1255, 88, 88, 88, 88, 88, 66, 66, 66, 66, 88, 88, 88, 88, 66, 1378,
  /* 19966 */ 88, 66, 66, 66, 1325, 66, 66, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 911, 1337, 88, 88, 66,
  /* 19991 */ 66, 1341, 66, 1342, 66, 66, 66, 66, 66, 66, 66, 88, 210, 88, 88, 88, 88, 88, 88, 239, 88, 1348, 88, 1349,
  /* 20015 */ 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 66, 1073, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 700, 66,
  /* 20041 */ 66, 66, 66, 83, 83, 104, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 63, 66, 66,
  /* 20063 */ 147, 66, 66, 66, 66, 166, 170, 176, 180, 66, 66, 66, 66, 497, 66, 66, 66, 66, 503, 66, 66, 66, 66, 66, 66,
  /* 20088 */ 749, 66, 66, 752, 753, 66, 66, 88, 88, 88, 66, 196, 66, 66, 66, 66, 66, 88, 214, 88, 88, 88, 88, 233, 237,
  /* 20113 */ 243, 247, 88, 88, 88, 88, 88, 263, 88, 88, 88, 88, 88, 14360, 0, 18458, 18458, 29, 47135, 34, 34, 37, 37,
  /* 20136 */ 37, 61718, 41, 41, 41, 0, 0, 283, 0, 285, 66, 66, 304, 66, 66, 66, 66, 310, 66, 66, 66, 66, 66, 66, 66,
  /* 20161 */ 66, 883, 66, 66, 66, 66, 66, 66, 66, 66, 66, 331, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 342, 66, 66, 66,
  /* 20187 */ 368, 66, 66, 66, 66, 66, 66, 66, 66, 379, 380, 66, 66, 66, 367, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 20212 */ 66, 66, 506, 66, 66, 66, 66, 346, 66, 66, 66, 66, 66, 66, 66, 352, 66, 66, 66, 359, 361, 66, 66, 66, 1100,
  /* 20237 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 923, 88, 88, 88, 66, 385, 88, 88, 88, 390, 88, 88, 88, 88,
  /* 20263 */ 396, 88, 88, 88, 88, 88, 88, 88, 1029, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1221, 88, 88, 88, 88, 88,
  /* 20288 */ 88, 88, 88, 88, 88, 417, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 809, 88, 88, 88, 88, 88, 428, 88, 88, 88,
  /* 20314 */ 432, 88, 88, 88, 88, 88, 88, 88, 438, 88, 88, 88, 88, 88, 88, 259, 88, 88, 88, 88, 88, 14360, 0, 18458,
  /* 20338 */ 18458, 445, 447, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 798, 88, 88, 88, 469, 88, 18458,
  /* 20362 */ 61718, 0, 0, 0, 0, 0, 0, 285, 0, 0, 288, 558, 559, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 20389 */ 889, 66, 88, 88, 88, 777, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 786, 88, 0, 0, 836, 66, 66, 66, 66, 66,
  /* 20415 */ 66, 66, 66, 66, 66, 66, 66, 740, 741, 66, 66, 88, 789, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 20441 */ 88, 826, 88, 88, 88, 815, 88, 88, 88, 818, 88, 88, 88, 88, 823, 88, 88, 88, 88, 0, 662, 833, 0, 0, 0, 0,
  /* 20467 */ 0, 0, 0, 0, 0, 1071245, 1071245, 1071245, 1071245, 1071245, 1187981, 1071245, 66, 66, 850, 66, 66, 66, 66,
  /* 20486 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 1005, 66, 66, 66, 66, 88, 88, 903, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 20512 */ 910, 88, 0, 963, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 339, 66, 66, 66, 88, 88, 88, 928, 88,
  /* 20538 */ 88, 930, 88, 931, 88, 88, 88, 88, 88, 88, 88, 88, 1131, 1133, 88, 88, 88, 1136, 88, 1138, 88, 88, 941, 88,
  /* 20562 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 952, 66, 66, 973, 66, 976, 66, 66, 66, 66, 981, 66, 66, 66,
  /* 20587 */ 984, 66, 66, 66, 495, 66, 66, 66, 66, 66, 66, 66, 66, 66, 508, 66, 66, 66, 66, 1239, 66, 66, 66, 66, 66,
  /* 20612 */ 66, 88, 88, 88, 88, 88, 88, 88, 66, 1366, 66, 66, 66, 66, 88, 66, 1009, 66, 66, 66, 88, 88, 88, 88, 88,
  /* 20637 */ 88, 88, 88, 88, 1020, 88, 0, 963, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1069, 66, 66, 66, 733, 66,
  /* 20662 */ 66, 66, 66, 66, 66, 738, 66, 66, 66, 66, 66, 498, 66, 66, 66, 66, 66, 66, 66, 66, 66, 510, 1023, 88, 88,
  /* 20687 */ 88, 88, 1028, 88, 88, 88, 1031, 88, 88, 88, 88, 88, 88, 88, 419, 88, 88, 88, 88, 88, 88, 88, 88, 88, 422,
  /* 20712 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1115, 88, 88, 88, 88, 88, 88, 88, 88, 1123, 88, 0, 963, 0, 66,
  /* 20738 */ 66, 66, 66, 66, 66, 1066, 66, 66, 66, 66, 66, 208, 66, 88, 88, 88, 88, 223, 88, 231, 88, 88, 66, 1161, 66,
  /* 20763 */ 1163, 66, 66, 66, 66, 66, 66, 66, 88, 88, 88, 88, 88, 229, 88, 88, 88, 88, 88, 88, 88, 1173, 88, 88, 88,
  /* 20788 */ 88, 88, 88, 88, 88, 88, 88, 88, 1043, 88, 88, 88, 88, 88, 88, 88, 1183, 88, 88, 88, 88, 88, 1188, 88,
  /* 20812 */ 1190, 88, 88, 88, 88, 88, 88, 88, 1116, 88, 88, 88, 88, 88, 1122, 88, 88, 88, 88, 88, 1214, 88, 88, 88,
  /* 20836 */ 1218, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1118, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1227, 88, 88,
  /* 20861 */ 88, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1201, 66, 66, 88, 88, 1339, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 20886 */ 66, 1345, 1346, 66, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 397, 88, 88, 88, 88, 0, 662, 0, 0, 0, 837, 0,
  /* 20912 */ 0, 0, 0, 0, 0, 66, 66, 843, 66, 66, 66, 66, 66, 66, 66, 881, 66, 66, 66, 66, 66, 66, 66, 66, 66, 856, 66,
  /* 20939 */ 66, 66, 66, 66, 66, 1379, 66, 88, 66, 88, 66, 88, 66, 88, 0, 0, 0, 0, 0, 0, 0, 66, 66, 681, 66, 66, 66,
  /* 20966 */ 66, 66, 66, 66, 1166, 66, 66, 66, 88, 88, 88, 88, 88, 88, 88, 66, 66, 66, 66, 1369, 66, 88, 84, 84, 105,
  /* 20991 */ 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 66, 66, 201, 66, 66, 66, 66, 88, 88, 88,
  /* 21014 */ 88, 88, 88, 234, 88, 88, 88, 88, 88, 88, 1174, 88, 88, 88, 88, 88, 88, 88, 88, 88, 66, 1231, 66, 66, 1233,
  /* 21039 */ 66, 66, 29, 47135, 34, 34, 37, 37, 37, 61718, 41, 41, 41, 0, 0, 0, 284, 285, 384, 88, 88, 88, 88, 88, 88,
  /* 21064 */ 88, 393, 88, 88, 88, 402, 88, 88, 88, 88, 88, 88, 261, 88, 88, 88, 88, 88, 14360, 0, 18458, 18458, 88, 88,
  /* 21088 */ 88, 470, 18458, 61718, 0, 0, 0, 0, 0, 0, 285, 0, 0, 288, 66, 511, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 21114 */ 66, 66, 66, 66, 900, 66, 524, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 536, 66, 66, 66, 66, 514, 66, 66,
  /* 21139 */ 66, 66, 518, 66, 66, 66, 66, 66, 66, 867, 66, 66, 66, 66, 66, 66, 66, 66, 66, 1004, 66, 66, 66, 66, 66,
  /* 21164 */ 66, 88, 623, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 634, 88, 88, 88, 88, 88, 88, 264, 88, 88, 88, 88, 88,
  /* 21190 */ 14360, 0, 18458, 18458, 88, 88, 776, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 936, 88, 88, 88,
  /* 21214 */ 1024, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 937, 88, 88, 1338, 88, 66, 66, 66, 66, 66,
  /* 21239 */ 66, 66, 66, 66, 66, 66, 66, 88, 1246, 88, 88, 1248, 88, 88, 88, 1373, 88, 66, 66, 66, 66, 88, 88, 88, 88,
  /* 21264 */ 66, 66, 88, 88, 88, 904, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1354, 66, 66, 66, 66, 85, 85, 106, 1,
  /* 21290 */ 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 446, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 21312 */ 88, 88, 88, 88, 88, 88, 962, 0, 66, 525, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 985, 66,
  /* 21338 */ 86, 86, 107, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 66, 197, 66, 66, 66, 66,
  /* 21360 */ 66, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1109, 88, 88, 88, 88, 927, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 21386 */ 88, 88, 88, 88, 961, 0, 0, 88, 88, 88, 955, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 0, 0, 0, 0, 662, 8668,
  /* 21413 */ 6621, 0, 668, 0, 87, 87, 108, 1, 0, 0, 0, 14360, 14360, 18458, 18458, 29, 29, 29, 47135, 47135, 29, 47135,
  /* 21435 */ 34, 34, 37, 37, 37, 61718, 41, 41, 41, 280, 0, 0, 0, 285, 345, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66,
  /* 21461 */ 66, 66, 66, 66, 1007, 88, 88, 88, 431, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1054, 88, 88, 88,
  /* 21486 */ 88, 88, 88, 88, 88, 88, 792, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 822, 88, 824, 88, 88, 88, 88, 913,
  /* 21511 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1035, 1036, 66, 66, 202, 66, 66, 66, 66, 88, 88,
  /* 21536 */ 88, 88, 88, 88, 88, 88, 88, 88, 88, 399, 88, 88, 88, 591, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 21562 */ 88, 88, 88, 1045, 88, 88, 88, 88, 88, 626, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1120, 88, 88, 88,
  /* 21587 */ 88, 66, 705, 66, 707, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 859, 66, 861, 66, 875, 66, 66, 66,
  /* 21612 */ 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 995, 66, 66, 901, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88,
  /* 21638 */ 88, 88, 88, 88, 1057, 88, 88, 88, 1182, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 1056, 88, 88,
  /* 21663 */ 1, 0, 0, 0, 14360, 18458, 29, 34, 37, 36906, 38957, 0, 532531, 532531, 532531, 532480, 1099776, 1071104,
  /* 21681 */ 1071246, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 21692 */ 1071104, 1071104, 1071104, 1523712, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 21703 */ 1071104, 1071104, 1366016, 1372160, 1071104, 1384448, 1071104, 1071104, 1071104, 1071104, 1, 0, 0, 0,
  /* 21717 */ 14360, 18458, 29, 34, 37, 36906, 38957, 0, 52, 52, 52, 536576, 49, 43058, 0, 0, 45109, 41014, 0, 0, 0, 0,
  /* 21739 */ 0, 0, 0, 0, 63, 63, 66, 66, 66, 66, 153, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 739, 66, 66, 66, 742
];

XQueryTokenizer.EXPECTED =
[
  /*    0 */ 390, 394, 398, 401, 405, 413, 420, 435, 445, 412, 413, 413, 435, 435, 469, 418, 413, 414, 435, 435, 424,
  /*   21 */ 413, 413, 430, 435, 436, 428, 413, 434, 435, 440, 407, 435, 449, 408, 453, 443, 458, 462, 454, 466, 473,
  /*   42 */ 477, 481, 485, 489, 495, 522, 559, 696, 559, 559, 499, 559, 559, 583, 559, 559, 506, 559, 559, 513, 559,
  /*   63 */ 885, 538, 559, 707, 559, 559, 519, 559, 526, 559, 831, 1063, 559, 722, 1064, 833, 686, 805, 535, 545, 550,
  /*   84 */ 546, 554, 559, 558, 606, 736, 559, 564, 559, 574, 559, 559, 580, 559, 576, 589, 559, 680, 594, 559, 1053,
  /*  105 */ 599, 559, 680, 604, 559, 749, 559, 675, 610, 691, 616, 782, 622, 828, 799, 629, 628, 634, 640, 644, 651,
  /*  126 */ 655, 847, 659, 663, 858, 559, 670, 559, 860, 674, 810, 679, 559, 815, 684, 559, 899, 559, 559, 840, 690,
  /*  147 */ 559, 509, 559, 559, 772, 695, 559, 700, 559, 922, 559, 991, 559, 762, 560, 706, 867, 866, 876, 1043, 960,
  /*  168 */ 1027, 711, 1024, 715, 719, 636, 559, 897, 728, 559, 733, 559, 541, 559, 559, 702, 559, 559, 917, 559, 559,
  /*  189 */ 742, 559, 559, 746, 559, 559, 753, 559, 910, 559, 559, 989, 559, 760, 559, 766, 788, 890, 559, 771, 776,
  /*  210 */ 781, 559, 559, 559, 559, 559, 767, 559, 1032, 979, 559, 559, 786, 559, 792, 559, 559, 1002, 559, 585, 798,
  /*  231 */ 559, 559, 803, 559, 531, 809, 559, 1058, 814, 559, 819, 559, 618, 559, 794, 559, 825, 729, 559, 1005, 1004,
  /*  252 */ 821, 920, 837, 844, 851, 855, 839, 559, 864, 559, 871, 559, 559, 905, 559, 502, 559, 559, 491, 875, 559,
  /*  273 */ 880, 559, 559, 972, 884, 559, 982, 559, 559, 756, 559, 777, 889, 559, 894, 559, 903, 515, 909, 914, 1017,
  /*  294 */ 1016, 926, 930, 934, 938, 945, 942, 949, 953, 957, 559, 1011, 964, 559, 559, 970, 559, 976, 559, 559, 647,
  /*  315 */ 559, 559, 986, 559, 559, 995, 559, 559, 999, 559, 559, 1009, 559, 666, 559, 738, 1015, 612, 559, 1021, 724,
  /*  336 */ 1031, 1037, 1036, 1041, 1047, 1051, 559, 559, 559, 559, 966, 570, 590, 624, 559, 559, 566, 559, 623, 559,
  /*  356 */ 559, 559, 1057, 559, 600, 559, 559, 559, 530, 559, 623, 559, 559, 630, 559, 559, 1062, 559, 529, 559, 568,
  /*  377 */ 559, 559, 559, 559, 559, 559, 559, 559, 559, 559, 559, 559, 596, 1068, 1072, 1076, 1080, 1084, 1091, 1095,
  /*  397 */ 1099, 1103, 1104, 1105, 1143, 1113, 1117, 1087, 1132, 1121, 1104, 1104, 1107, 1143, 1143, 1136, 1104, 1104,
  /*  415 */ 1104, 1104, 1106, 1139, 1104, 1104, 1104, 1108, 1143, 1143, 1143, 1154, 1150, 1157, 1104, 1104, 1104, 1142,
  /*  433 */ 1143, 1106, 1143, 1143, 1143, 1143, 1109, 1161, 1104, 1104, 1104, 1140, 1143, 1143, 1125, 1129, 1165, 1104,
  /*  451 */ 1104, 1104, 1143, 1143, 1170, 1104, 1142, 1143, 1171, 1104, 1107, 1143, 1169, 1104, 1141, 1143, 1171, 1140,
  /*  469 */ 1143, 1143, 1144, 1148, 1170, 1105, 1143, 1170, 1142, 1178, 1169, 1181, 1175, 1185, 1189, 1193, 1197, 1201,
  /*  487 */ 1205, 1212, 1219, 1393, 1206, 1206, 1206, 1734, 1223, 1206, 1674, 1229, 1633, 1206, 1258, 1206, 1206, 1928,
  /*  505 */ 1727, 1263, 1254, 1696, 1206, 1207, 1481, 1485, 1408, 1276, 1206, 1206, 1206, 1768, 1537, 1206, 1695, 1206,
  /*  523 */ 1215, 1254, 1240, 1206, 1693, 1697, 1206, 1225, 1206, 1206, 1206, 1641, 1671, 1206, 1670, 1206, 1254, 1696,
  /*  541 */ 1206, 1208, 1557, 1561, 1439, 1206, 1671, 1206, 1673, 1440, 1206, 1672, 1438, 1671, 1440, 1672, 1673, 1286,
  /*  559 */ 1206, 1206, 1206, 1206, 1207, 1549, 1312, 1206, 1206, 1206, 1922, 1206, 1206, 1206, 1926, 1264, 1320, 1206,
  /*  577 */ 1206, 1230, 1912, 1911, 1324, 1364, 1206, 1259, 1206, 1206, 1206, 1757, 1325, 1206, 1206, 1206, 1224, 1329,
  /*  595 */ 1333, 1206, 1206, 1253, 1341, 1206, 1206, 1206, 1231, 1347, 1351, 1206, 1206, 1265, 1314, 1355, 1362, 1206,
  /*  613 */ 1206, 1277, 1884, 1357, 1364, 1206, 1206, 1315, 1661, 1377, 1206, 1206, 1206, 1232, 1206, 1385, 1391, 1206,
  /*  631 */ 1206, 1206, 1233, 1230, 1389, 1206, 1206, 1420, 1206, 1397, 1407, 1206, 1657, 1407, 1656, 1406, 1206, 1277,
  /*  649 */ 1857, 1862, 1412, 1315, 1400, 1664, 1413, 1316, 1401, 1686, 1687, 1402, 1835, 1242, 1243, 1250, 1253, 1206,
  /*  667 */ 1277, 1876, 1880, 1431, 1206, 1518, 1437, 1476, 1206, 1206, 1206, 1234, 1452, 1206, 1206, 1206, 1235, 1589,
  /*  685 */ 1465, 1206, 1206, 1438, 1697, 1474, 1206, 1206, 1206, 1236, 1475, 1206, 1206, 1206, 1247, 1304, 1308, 1206,
  /*  703 */ 1206, 1455, 1566, 1506, 1206, 1206, 1206, 1269, 1206, 1802, 1206, 1647, 1522, 1466, 1524, 1536, 1529, 1530,
  /*  721 */ 1534, 1206, 1282, 1206, 1206, 1206, 1883, 1542, 1206, 1206, 1206, 1289, 1206, 1865, 1553, 1206, 1298, 1206,
  /*  739 */ 1206, 1206, 1888, 1206, 1722, 1571, 1401, 1454, 1575, 1697, 1206, 1345, 1349, 1363, 1206, 1723, 1516, 1206,
  /*  757 */ 1366, 1752, 1756, 1513, 1517, 1206, 1206, 1502, 1206, 1583, 1206, 1206, 1206, 1294, 1545, 1206, 1206, 1206,
  /*  775 */ 1306, 1477, 1206, 1206, 1206, 1368, 1594, 1206, 1206, 1206, 1373, 1614, 1632, 1206, 1206, 1547, 1206, 1618,
  /*  793 */ 1622, 1206, 1206, 1625, 1663, 1630, 1206, 1206, 1206, 1385, 1637, 1631, 1206, 1206, 1672, 1206, 1655, 1206,
  /*  811 */ 1206, 1206, 1448, 1654, 1206, 1206, 1206, 1460, 1206, 1652, 1206, 1206, 1678, 1206, 1206, 1764, 1669, 1206,
  /*  829 */ 1381, 1358, 1206, 1273, 1206, 1206, 1206, 1853, 1684, 1206, 1683, 1206, 1206, 1206, 1470, 1683, 1206, 1691,
  /*  847 */ 1206, 1417, 1685, 1401, 1684, 1206, 1692, 1562, 1206, 1683, 1610, 1206, 1424, 1206, 1206, 1433, 1444, 1776,
  /*  865 */ 1703, 1206, 1206, 1705, 1496, 1206, 1903, 1206, 1206, 1709, 1740, 1206, 1206, 1206, 1510, 1206, 1794, 1735,
  /*  883 */ 1741, 1745, 1206, 1206, 1206, 1538, 1754, 1206, 1206, 1206, 1545, 1365, 1369, 1763, 1206, 1427, 1206, 1206,
  /*  901 */ 1461, 1590, 1367, 1761, 1206, 1206, 1717, 1721, 1775, 1206, 1206, 1206, 1579, 1206, 1780, 1673, 1206, 1456,
  /*  919 */ 1567, 1206, 1301, 1206, 1206, 1704, 1494, 1792, 1206, 1206, 1784, 1800, 1206, 1794, 1791, 1206, 1748, 1206,
  /*  937 */ 1747, 1800, 1747, 1800, 1712, 1206, 1799, 1818, 1793, 1748, 1206, 1713, 1820, 1818, 1822, 1604, 1605, 1806,
  /*  955 */ 1808, 1812, 1206, 1679, 1816, 1206, 1488, 1206, 1487, 1278, 1833, 1206, 1206, 1730, 1921, 1839, 1843, 1206,
  /*  973 */ 1206, 1795, 1736, 1698, 1847, 1851, 1206, 1498, 1609, 1206, 1367, 1787, 1756, 1596, 1858, 1662, 1206, 1515,
  /*  991 */ 1206, 1206, 1492, 1496, 1206, 1699, 1869, 1292, 1597, 1771, 1663, 1206, 1629, 1206, 1206, 1668, 1206, 1206,
  /* 1009 */ 1874, 1870, 1206, 1206, 1826, 1206, 1892, 1206, 1206, 1206, 1586, 1792, 1206, 1897, 1644, 1206, 1648, 1801,
  /* 1027 */ 1524, 1801, 1524, 1646, 1893, 1206, 1206, 1206, 1601, 1206, 1882, 1901, 1206, 1206, 1206, 1907, 1206, 1206,
  /* 1045 */ 1829, 1206, 1525, 1206, 1206, 1917, 1206, 1916, 1206, 1206, 1910, 1337, 1230, 1206, 1206, 1206, 1624, 1231,
  /* 1063 */ 1206, 1206, 1206, 1694, 1206, 1945, 2012, 1932, 1934, 1936, 1938, 1940, 1942, 2077, 1944, 1951, 2102, 2043,
  /* 1081 */ 1989, 2104, 2028, 1991, 2141, 1994, 1996, 2033, 2064, 2175, 1997, 2003, 2068, 2005, 2176, 1951, 2147, 1978,
  /* 1099 */ 2129, 2131, 2015, 2292, 2173, 2045, 2045, 2045, 2045, 2075, 2193, 2193, 2193, 1966, 2193, 2193, 1976, 2121,
  /* 1117 */ 2027, 2141, 1996, 2030, 2291, 2172, 2045, 2045, 2193, 2193, 2036, 2243, 2064, 2064, 2009, 1971, 1963, 1958,
  /* 1135 */ 2130, 1963, 1967, 2124, 1968, 2045, 2045, 2045, 2193, 2193, 2193, 2193, 2244, 1971, 1972, 1961, 1968, 1968,
  /* 1153 */ 1968, 2193, 2193, 1971, 1961, 1961, 1967, 1969, 2011, 1961, 2045, 2045, 2193, 2050, 2045, 2045, 2193, 2193,
  /* 1171 */ 2076, 2045, 2045, 2045, 2076, 2076, 2076, 2076, 2045, 2045, 2075, 2193, 2076, 2075, 2011, 2041, 2074, 2152,
  /* 1189 */ 2079, 2082, 2081, 2083, 2085, 1949, 1955, 1965, 2050, 2151, 1951, 2062, 1951, 1984, 2111, 1984, 2111, 1951,
  /* 1207 */ 1951, 1951, 1951, 1952, 2015, 2057, 1951, 1951, 2072, 1951, 1951, 1976, 1987, 1951, 1951, 2087, 1948, 1951,
  /* 1225 */ 1951, 1951, 1954, 1951, 2071, 1951, 1951, 1951, 1955, 1951, 1951, 1951, 1957, 1973, 2123, 2297, 2143, 1951,
  /* 1243 */ 1951, 1947, 1951, 1946, 1951, 2000, 2298, 1951, 1946, 1951, 1946, 1951, 1951, 1951, 2006, 1951, 2006, 2200,
  /* 1261 */ 2157, 1951, 2063, 1951, 1951, 1951, 1959, 2093, 1951, 2006, 2200, 1947, 1951, 2126, 2010, 2201, 1951, 1951,
  /* 1279 */ 1951, 1966, 1980, 1951, 2063, 2200, 1947, 1951, 2089, 2090, 1951, 1951, 2127, 2156, 2037, 1951, 1951, 2038,
  /* 1297 */ 2039, 1951, 2092, 2094, 1951, 1951, 2128, 1951, 1951, 2209, 2237, 2021, 2100, 2007, 2179, 2097, 2133, 2095,
  /* 1315 */ 1951, 1951, 1951, 1971, 2192, 1962, 1974, 2098, 2134, 2047, 2138, 2008, 2140, 2031, 1985, 2219, 2047, 2214,
  /* 1333 */ 2160, 2155, 2287, 2031, 2218, 2046, 2048, 2159, 2008, 2242, 2288, 2143, 1957, 1973, 2162, 2046, 2048, 2167,
  /* 1351 */ 2000, 2155, 2287, 2031, 1973, 2123, 2214, 1999, 2194, 2287, 2143, 2194, 2287, 2031, 1951, 1951, 1951, 1977,
  /* 1369 */ 2108, 2051, 2048, 2279, 1955, 1964, 2123, 2060, 1998, 2000, 2242, 2142, 1957, 2171, 2048, 2054, 1957, 2171,
  /* 1387 */ 2053, 2185, 2183, 2054, 2194, 2143, 1951, 1951, 1950, 1951, 1951, 2041, 2053, 2192, 2013, 1951, 1951, 1951,
  /* 1405 */ 2001, 2192, 2025, 1951, 1951, 1951, 2000, 2191, 2194, 1947, 1951, 1951, 1971, 2194, 1947, 1951, 1951, 2223,
  /* 1423 */ 2224, 1951, 2180, 2181, 1951, 1951, 2226, 2228, 2116, 2118, 1951, 1951, 1952, 2017, 2119, 1951, 1951, 1951,
  /* 1441 */ 2012, 1951, 1951, 2211, 2213, 2145, 2186, 2203, 2210, 2212, 2060, 2146, 2187, 1951, 1951, 1952, 2234, 2044,
  /* 1459 */ 2164, 1951, 2203, 2018, 2109, 2047, 2207, 1951, 1951, 1951, 2056, 2209, 2122, 2110, 2061, 2070, 2007, 2179,
  /* 1477 */ 1951, 1951, 1951, 2054, 2018, 2109, 2021, 2153, 1999, 2178, 1951, 1951, 1952, 2295, 2011, 1951, 2209, 2019,
  /* 1495 */ 2099, 2177, 2179, 1951, 1951, 1955, 2251, 2209, 2019, 2304, 2178, 2018, 2020, 2177, 2179, 2217, 2221, 2179,
  /* 1513 */ 1951, 1951, 2236, 2065, 2054, 1951, 1951, 1951, 2117, 1951, 2056, 2011, 1951, 1951, 1951, 2059, 2011, 1951,
  /* 1531 */ 1951, 2011, 1951, 2010, 1951, 2010, 1951, 1951, 1951, 2063, 1951, 1952, 2227, 2229, 1951, 1951, 2239, 2054,
  /* 1549 */ 1951, 1951, 1960, 1973, 2310, 2070, 2263, 1947, 1975, 2105, 2311, 2168, 2264, 1951, 1951, 1951, 2106, 2164,
  /* 1567 */ 2101, 2231, 1947, 1951, 2043, 2174, 2214, 2100, 2044, 2065, 2215, 2101, 2233, 2044, 2065, 2054, 1952, 2060,
  /* 1585 */ 2055, 1951, 1951, 2281, 2047, 2061, 2070, 2007, 2207, 2144, 2055, 1951, 1951, 1966, 2309, 2051, 2246, 2252,
  /* 1603 */ 2037, 1951, 1951, 2294, 2055, 1951, 2253, 1951, 1951, 1951, 2120, 2246, 2205, 2249, 2255, 1951, 1955, 2247,
  /* 1621 */ 2163, 2149, 2256, 1951, 1951, 1971, 2204, 2024, 2247, 2249, 2258, 2037, 1951, 1951, 1951, 2125, 1951, 1971,
  /* 1639 */ 2204, 2249, 1951, 1974, 2248, 2149, 1951, 1951, 1951, 2107, 2296, 1951, 1951, 1971, 2204, 2261, 2259, 1951,
  /* 1657 */ 1951, 1951, 2189, 2192, 2204, 2024, 2231, 1951, 1951, 1951, 2191, 2127, 2005, 1951, 1951, 1951, 2195, 1951,
  /* 1675 */ 1951, 1951, 1970, 2127, 1951, 1951, 1951, 2196, 1951, 2120, 1951, 1951, 1951, 2199, 2013, 1951, 1951, 2106,
  /* 1693 */ 1951, 1951, 1951, 2200, 1947, 1951, 1951, 1951, 1962, 2044, 2269, 1951, 1951, 1951, 2209, 2020, 1951, 2113,
  /* 1711 */ 2115, 1951, 1951, 2294, 2184, 2062, 1951, 2113, 2271, 2101, 2274, 1951, 1951, 1951, 2233, 2044, 2272, 2156,
  /* 1729 */ 2275, 1951, 1951, 2315, 2316, 2281, 1969, 2052, 2278, 2070, 2156, 2070, 2156, 2284, 1951, 1951, 2287, 1947,
  /* 1747 */ 1951, 1951, 1971, 2290, 2067, 2051, 2048, 2165, 2242, 1992, 1951, 1951, 1951, 2247, 2048, 2279, 2034, 1951,
  /* 1765 */ 1951, 1951, 2266, 1951, 2281, 2046, 2048, 2069, 1999, 2024, 2241, 1951, 1951, 1951, 2268, 1977, 2282, 2047,
  /* 1783 */ 2240, 1951, 1977, 2303, 2048, 2165, 2101, 2286, 2047, 2066, 2062, 1951, 1951, 1951, 2281, 1969, 2294, 2067,
  /* 1801 */ 1951, 1951, 1951, 2295, 2011, 2294, 2055, 1971, 1986, 1986, 2104, 2104, 2104, 2104, 1986, 2197, 1951, 1951,
  /* 1819 */ 1951, 1971, 2300, 2062, 1951, 1971, 2300, 1979, 1981, 1983, 1951, 1952, 2295, 2178, 1982, 1951, 1951, 1951,
  /* 1837 */ 2010, 1947, 1951, 1966, 2302, 2219, 2306, 2022, 2262, 2037, 2218, 2051, 2307, 2023, 2169, 1951, 1951, 1951,
  /* 1855 */ 2013, 1951, 2309, 1969, 2052, 2060, 2313, 2313, 2024, 2231, 1951, 1953, 2016, 2103, 2052, 2060, 2070, 2149,
  /* 1873 */ 2156, 1951, 1966, 2044, 2047, 2060, 2070, 2149, 2156, 1951, 1951, 2046, 2060, 2148, 2150, 1951, 1966, 2046,
  /* 1891 */ 2060, 2148, 2150, 1951, 1951, 1951, 1951, 2050, 2059, 2069, 2148, 1951, 1951, 1951, 2112, 2114, 1951, 2058,
  /* 1909 */ 2049, 1951, 1955, 1962, 1974, 2136, 2047, 1951, 2058, 1951, 1951, 1951, 1956, 1954, 1951, 1951, 1951, 1951,
  /* 1927 */ 2042, 1951, 1951, 2112, 2277, -2147483584, -2147483392, -2109734784, -1811939328, -536870912, -2013085696,
  /* 1938 */ -2012921856, -2063597568, -2012168192, -2011086848, -2012725224, -2063582706, 75497472, 32, 0, 0x80000000,
  /* 1948 */ 0, -945815552, -945815552, 0, 0, 1, 2, 0, 2, 2, 4, 0, 3, 4, 4, 8, 4, 16, 0, 4, 512, 512, 1024, 0, 16, 8,
  /* 1974 */ 16, 32, 64, 0, 24, 4, 8072, 106496, 7864320, 637534208, 0, 32, 128, 0, 112, 256, 33554560, 335544320,
  /* 1992 */ 268435456, 0x80000000, 1073741824, 1610612736, 1073741824, 1073741824, 131072, 1048576, 2097152, 8388608,
  /* 2002 */ 0x80000000, 32768, 134234112, 67108864, 0, 2097152, 12582912, 16777216, 0, 8388608, 0, 33554432,
  /* 2014 */ 0x80000000, 2, 8, 32, 192, 256, 2048, 4096, 65536, 3670016, 4194304, 33554432, -1073741824, 128, 4194432,
  /* 2029 */ 4194432, 1073741824, 536870912, -1073741824, 1073741824, 134217728, 0x80000000, 256, 536870912, 0,
  /* 2039 */ 669041594, 669041594, 2, 16, 64, 256, 1024, 1024, 4096, 8192, 32768, 0, 1024, 6144, 8192, 65536, 131072, 0,
  /* 2057 */ 2048, 0, 4096, 32768, 65536, 262144, 0, 16384, 16384, 32768, 131072, 262144, 65536, 524288, 1048576, 0,
  /* 2073 */ 24576, 2, 1024, 8388608, 1024, 33555456, 4128, 4128, 198661, 1, 4, 24576, 57597, -945815552, 57344, 0,
  /* 2089 */ -67913793, -67913793, 0, 3, 60, 32749440, -100663296, 0, 32, 1920, 4096, 262144, 1048576, 33554432, 64,
  /* 2104 */ 128, 128, 256, 0, 128, 512, 3072, 4096, 0, 152, 15872, -1642102784, 0, 225, 1949440, 299892736, 0, 256,
  /* 2122 */ 256, 512, 8192, 8192, 16384, 0, 384, 0, 512, 12288, 14336, 4096, 32743424, -100663296, 896, 1024, 32768,
  /* 2139 */ 3342336, 167772160, 268435456, 268435456, -1073741824, 0, 65536, 1835008, 2097152, 524288, 2097152,
  /* 2150 */ 4194304, 0, 1048576, 262144, 524288, 16777216, 33554432, 67108864, 0x80000000, 196608, 3145728, 12582912,
  /* 2162 */ 32, 512, 49152, 458752, 524288, 196608, 1048576, 100663296, 536870912, 16, 512, 16777730, 1024, 16384,
  /* 2176 */ 16777216, 1048576, 12582912, 268435456, 0, 301842401, 301842401, 16, 8192, 131072, 2097152, 29360128,
  /* 2188 */ 268435456, 16, 65536, 16, 131072, 8388608, 8388608, 33554432, 0, 645513100, 645513100, 16, 8388608,
  /* 2201 */ 50331648, 0x80000000, 1, 32, 384, 512, 16777216, 268435456, 1, 192, 768, 3072, 12288, 32768, 196608,
  /* 2216 */ 262144, 1, 128, 768, 1024, 2048, 12582912, -1373648917, -1373648917, 0, 1, 42, 2082752, -1375731712, 0,
  /* 2231 */ 67108864, 536870912, 1, 8, 64, 1, 256, 3072, 1, 32768, 393216, 33554432, 134217728, 134217728, 16384, 2,
  /* 2247 */ 56, 384, 49152, 2097152, 56, 50048, 132120576, 536870912, 4194304, 125829120, 536870912, 4194304,
  /* 2259 */ 117440512, 536870912, 32768, 4194304, 100663296, 671088640, 0x80000000, 384, 33554432, -1642086760,
  /* 2269 */ -1642086760, 0, 32768, 983040, 1048576, 67108864, -1744830464, 0, 15872, 32768, 458752, 33554432, 24, 128,
  /* 2283 */ 1024, 402653184, 0x80000000, 67108864, 134217728, 268435456, 536870912, 128, 8192, 16777728, 16777728, 16,
  /* 2295 */ 128, 2048, 8388608, 117440512, -1073741824, 128, 131072, 8, 128, 4096, 1048576, 6144, 40960, 65536, 8, 256,
  /* 2311 */ 509440, 524288, 1572864, 2097152, 88, 88, 40
];

XQueryTokenizer.TOKEN =
[
  "(0)",
  "Operator",
  "Variable",
  "Tag",
  "EndTag",
  "PragmaContents",
  "DirCommentContents",
  "DirPIContents",
  "CDataSectionContents",
  "Wildcard",
  "EQName",
  "IntegerLiteral",
  "DecimalLiteral",
  "DoubleLiteral",
  "PredefinedEntityRef",
  "'\"\"'",
  "EscapeApos",
  "QuotChar",
  "AposChar",
  "ElementContentChar",
  "QuotAttrContentChar",
  "AposAttrContentChar",
  "PITarget",
  "NCName",
  "QName",
  "S",
  "S",
  "CharRef",
  "CommentContents",
  "DocTag",
  "DocCommentContents",
  "EOF",
  "'\"'",
  "'#)'",
  "''''",
  "'('",
  "'(#'",
  "'(:'",
  "'(:~'",
  "')'",
  "'*'",
  "'*'",
  "'-->'",
  "'/>'",
  "':)'",
  "'<!--'",
  "'<![CDATA['",
  "'<?'",
  "'='",
  "'>'",
  "'?>'",
  "'NaN'",
  "']]>'",
  "'after'",
  "'all'",
  "'allowing'",
  "'ancestor'",
  "'ancestor-or-self'",
  "'and'",
  "'any'",
  "'append'",
  "'array'",
  "'as'",
  "'ascending'",
  "'at'",
  "'attribute'",
  "'base-uri'",
  "'before'",
  "'boundary-space'",
  "'break'",
  "'by'",
  "'case'",
  "'cast'",
  "'castable'",
  "'catch'",
  "'check'",
  "'child'",
  "'collation'",
  "'collection'",
  "'comment'",
  "'constraint'",
  "'construction'",
  "'contains'",
  "'content'",
  "'context'",
  "'continue'",
  "'copy'",
  "'copy-namespaces'",
  "'count'",
  "'decimal-format'",
  "'decimal-separator'",
  "'declare'",
  "'default'",
  "'delete'",
  "'descendant'",
  "'descendant-or-self'",
  "'descending'",
  "'diacritics'",
  "'different'",
  "'digit'",
  "'distance'",
  "'div'",
  "'document'",
  "'document-node'",
  "'element'",
  "'else'",
  "'empty'",
  "'empty-sequence'",
  "'encoding'",
  "'end'",
  "'entire'",
  "'eq'",
  "'every'",
  "'exactly'",
  "'except'",
  "'exit'",
  "'external'",
  "'first'",
  "'following'",
  "'following-sibling'",
  "'for'",
  "'foreach'",
  "'foreign'",
  "'from'",
  "'ft-option'",
  "'ftand'",
  "'ftnot'",
  "'ftor'",
  "'function'",
  "'ge'",
  "'greatest'",
  "'group'",
  "'grouping-separator'",
  "'gt'",
  "'idiv'",
  "'if'",
  "'import'",
  "'in'",
  "'index'",
  "'infinity'",
  "'inherit'",
  "'insensitive'",
  "'insert'",
  "'instance'",
  "'integrity'",
  "'intersect'",
  "'into'",
  "'is'",
  "'item'",
  "'json'",
  "'json-item'",
  "'key'",
  "'language'",
  "'last'",
  "'lax'",
  "'le'",
  "'least'",
  "'let'",
  "'levels'",
  "'loop'",
  "'lowercase'",
  "'lt'",
  "'minus-sign'",
  "'mod'",
  "'modify'",
  "'module'",
  "'most'",
  "'namespace'",
  "'namespace-node'",
  "'ne'",
  "'next'",
  "'no'",
  "'no-inherit'",
  "'no-preserve'",
  "'node'",
  "'nodes'",
  "'not'",
  "'object'",
  "'occurs'",
  "'of'",
  "'on'",
  "'only'",
  "'option'",
  "'or'",
  "'order'",
  "'ordered'",
  "'ordering'",
  "'paragraph'",
  "'paragraphs'",
  "'parent'",
  "'pattern-separator'",
  "'per-mille'",
  "'percent'",
  "'phrase'",
  "'position'",
  "'preceding'",
  "'preceding-sibling'",
  "'preserve'",
  "'previous'",
  "'processing-instruction'",
  "'relationship'",
  "'rename'",
  "'replace'",
  "'return'",
  "'returning'",
  "'revalidation'",
  "'same'",
  "'satisfies'",
  "'schema'",
  "'schema-attribute'",
  "'schema-element'",
  "'score'",
  "'self'",
  "'sensitive'",
  "'sentence'",
  "'sentences'",
  "'skip'",
  "'sliding'",
  "'some'",
  "'stable'",
  "'start'",
  "'stemming'",
  "'stop'",
  "'strict'",
  "'strip'",
  "'structured-item'",
  "'switch'",
  "'text'",
  "'then'",
  "'thesaurus'",
  "'times'",
  "'to'",
  "'treat'",
  "'try'",
  "'tumbling'",
  "'type'",
  "'typeswitch'",
  "'union'",
  "'unique'",
  "'unordered'",
  "'updating'",
  "'uppercase'",
  "'using'",
  "'validate'",
  "'value'",
  "'variable'",
  "'version'",
  "'weight'",
  "'when'",
  "'where'",
  "'while'",
  "'wildcards'",
  "'window'",
  "'with'",
  "'without'",
  "'word'",
  "'words'",
  "'xquery'",
  "'zero-digit'",
  "'{'",
  "'{{'",
  "'}'",
  "'}}'"
];

                                                            // line 514 "XQueryTokenizer.ebnf"
                                                            });
                                                            // line 3208 "XQueryTokenizer.js"
// End
