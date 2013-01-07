// This file was generated on Mon Jan 7, 2013 21:50 (UTC+01) by REx v5.21 which is Copyright (c) 1979-2012 by Gunther Rademacher <grd@gmx.net>
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

  this.parse_Start = function()
  {
    eventHandler.startNonterminal("Start", e0);
    lookahead1W(12);                // Operator | Variable | Tag | Wildcard | IntegerLiteral | DecimalLiteral |
                                    // DoubleLiteral | QName | S^WS | EOF | '"' | "'" | '(#' | '(:' | '(:~' | '<!--' |
                                    // '<![CDATA[' | '<?' | '}'
    switch (l1)
    {
    case 40:                        // '<![CDATA['
      shift(40);                    // '<![CDATA['
      break;
    case 39:                        // '<!--'
      shift(39);                    // '<!--'
      break;
    case 41:                        // '<?'
      shift(41);                    // '<?'
      break;
    case 31:                        // '(#'
      shift(31);                    // '(#'
      break;
    case 33:                        // '(:~'
      shift(33);                    // '(:~'
      break;
    case 32:                        // '(:'
      shift(32);                    // '(:'
      break;
    case 28:                        // '"'
      shift(28);                    // '"'
      break;
    case 30:                        // "'"
      shift(30);                    // "'"
      break;
    case 254:                       // '}'
      shift(254);                   // '}'
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
    case 22:                        // QName
      shift(22);                    // QName
      break;
    case 3:                         // Tag
      shift(3);                     // Tag
      break;
    case 1:                         // Operator
      shift(1);                     // Operator
      break;
    default:
      shift(27);                    // EOF
    }
    eventHandler.endNonterminal("Start", e0);
  };

  this.parse_StartTag = function()
  {
    eventHandler.startNonterminal("StartTag", e0);
    lookahead1W(6);                 // S^WS | EOF | '/>' | '>'
    switch (l1)
    {
    case 42:                        // '>'
      shift(42);                    // '>'
      break;
    case 37:                        // '/>'
      shift(37);                    // '/>'
      break;
    default:
      shift(27);                    // EOF
    }
    eventHandler.endNonterminal("StartTag", e0);
  };

  this.parse_TagContent = function()
  {
    eventHandler.startNonterminal("TagContent", e0);
    lookahead1(11);                 // Tag | EndTag | PredefinedEntityRef | ElementContentChar | CharRef | EOF |
                                    // '<![CDATA[' | '{' | '{{' | '}}'
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
    case 40:                        // '<![CDATA['
      shift(40);                    // '<![CDATA['
      break;
    case 14:                        // PredefinedEntityRef
      shift(14);                    // PredefinedEntityRef
      break;
    case 25:                        // CharRef
      shift(25);                    // CharRef
      break;
    case 253:                       // '{{'
      shift(253);                   // '{{'
      break;
    case 255:                       // '}}'
      shift(255);                   // '}}'
      break;
    case 252:                       // '{'
      shift(252);                   // '{'
      break;
    default:
      shift(27);                    // EOF
    }
    eventHandler.endNonterminal("TagContent", e0);
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
    case 45:                        // ']]>'
      shift(45);                    // ']]>'
      break;
    default:
      shift(27);                    // EOF
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
    case 36:                        // '-->'
      shift(36);                    // '-->'
      break;
    default:
      shift(27);                    // EOF
    }
    eventHandler.endNonterminal("XMLComment", e0);
  };

  this.parse_PI = function()
  {
    eventHandler.startNonterminal("PI", e0);
    lookahead1(7);                  // DirPIContents | PITarget | S | EOF | '?>'
    switch (l1)
    {
    case 20:                        // PITarget
      shift(20);                    // PITarget
      break;
    case 23:                        // S
      shift(23);                    // S
      break;
    case 7:                         // DirPIContents
      shift(7);                     // DirPIContents
      break;
    case 43:                        // '?>'
      shift(43);                    // '?>'
      break;
    default:
      shift(27);                    // EOF
    }
    eventHandler.endNonterminal("PI", e0);
  };

  this.parse_Pragma = function()
  {
    eventHandler.startNonterminal("Pragma", e0);
    lookahead1(2);                  // '(#'
    shift(31);                      // '(#'
    lookahead1(14);                 // EQName^Token | S | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
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
    if (l1 == 23)                   // S
    {
      shift(23);                    // S
    }
    parse_EQName();
    lookahead1(3);                  // S | '#)'
    if (l1 == 23)                   // S
    {
      shift(23);                    // S
      lookahead1(0);                // PragmaContents
      shift(5);                     // PragmaContents
    }
    lookahead1(1);                  // '#)'
    shift(29);                      // '#)'
    eventHandler.endNonterminal("Pragma", e0);
  };

  this.parse_Comment = function()
  {
    eventHandler.startNonterminal("Comment", e0);
    lookahead1W(8);                 // S^WS | CommentContents | EOF | '(:' | ':)'
    switch (l1)
    {
    case 26:                        // CommentContents
      shift(26);                    // CommentContents
      break;
    case 38:                        // ':)'
      shift(38);                    // ':)'
      break;
    case 32:                        // '(:'
      shift(32);                    // '(:'
      break;
    default:
      shift(27);                    // EOF
    }
    eventHandler.endNonterminal("Comment", e0);
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
    case 25:                        // CharRef
      shift(25);                    // CharRef
      break;
    case 15:                        // EscapeQuot
      shift(15);                    // EscapeQuot
      break;
    case 17:                        // QuotChar
      shift(17);                    // QuotChar
      break;
    case 28:                        // '"'
      shift(28);                    // '"'
      break;
    default:
      shift(27);                    // EOF
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
    case 25:                        // CharRef
      shift(25);                    // CharRef
      break;
    case 16:                        // EscapeApos
      shift(16);                    // EscapeApos
      break;
    case 18:                        // AposChar
      shift(18);                    // AposChar
      break;
    case 30:                        // "'"
      shift(30);                    // "'"
      break;
    default:
      shift(27);                    // EOF
    }
    eventHandler.endNonterminal("AposString", e0);
  };

  this.parse_NCName = function()
  {
    eventHandler.startNonterminal("NCName", e0);
    lookahead1W(15);                // NCName^Token | S^WS | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
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
    case 21:                        // NCName^Token
      shift(21);                    // NCName^Token
      break;
    case 46:                        // 'after'
      shift(46);                    // 'after'
      break;
    case 51:                        // 'and'
      shift(51);                    // 'and'
      break;
    case 55:                        // 'as'
      shift(55);                    // 'as'
      break;
    case 56:                        // 'ascending'
      shift(56);                    // 'ascending'
      break;
    case 60:                        // 'before'
      shift(60);                    // 'before'
      break;
    case 64:                        // 'case'
      shift(64);                    // 'case'
      break;
    case 65:                        // 'cast'
      shift(65);                    // 'cast'
      break;
    case 66:                        // 'castable'
      shift(66);                    // 'castable'
      break;
    case 70:                        // 'collation'
      shift(70);                    // 'collation'
      break;
    case 81:                        // 'count'
      shift(81);                    // 'count'
      break;
    case 85:                        // 'default'
      shift(85);                    // 'default'
      break;
    case 89:                        // 'descending'
      shift(89);                    // 'descending'
      break;
    case 94:                        // 'div'
      shift(94);                    // 'div'
      break;
    case 98:                        // 'else'
      shift(98);                    // 'else'
      break;
    case 99:                        // 'empty'
      shift(99);                    // 'empty'
      break;
    case 102:                       // 'end'
      shift(102);                   // 'end'
      break;
    case 104:                       // 'eq'
      shift(104);                   // 'eq'
      break;
    case 107:                       // 'except'
      shift(107);                   // 'except'
      break;
    case 113:                       // 'for'
      shift(113);                   // 'for'
      break;
    case 122:                       // 'ge'
      shift(122);                   // 'ge'
      break;
    case 124:                       // 'group'
      shift(124);                   // 'group'
      break;
    case 126:                       // 'gt'
      shift(126);                   // 'gt'
      break;
    case 127:                       // 'idiv'
      shift(127);                   // 'idiv'
      break;
    case 136:                       // 'instance'
      shift(136);                   // 'instance'
      break;
    case 138:                       // 'intersect'
      shift(138);                   // 'intersect'
      break;
    case 139:                       // 'into'
      shift(139);                   // 'into'
      break;
    case 140:                       // 'is'
      shift(140);                   // 'is'
      break;
    case 148:                       // 'le'
      shift(148);                   // 'le'
      break;
    case 150:                       // 'let'
      shift(150);                   // 'let'
      break;
    case 154:                       // 'lt'
      shift(154);                   // 'lt'
      break;
    case 156:                       // 'mod'
      shift(156);                   // 'mod'
      break;
    case 157:                       // 'modify'
      shift(157);                   // 'modify'
      break;
    case 162:                       // 'ne'
      shift(162);                   // 'ne'
      break;
    case 174:                       // 'only'
      shift(174);                   // 'only'
      break;
    case 176:                       // 'or'
      shift(176);                   // 'or'
      break;
    case 177:                       // 'order'
      shift(177);                   // 'order'
      break;
    case 196:                       // 'return'
      shift(196);                   // 'return'
      break;
    case 200:                       // 'satisfies'
      shift(200);                   // 'satisfies'
      break;
    case 212:                       // 'stable'
      shift(212);                   // 'stable'
      break;
    case 213:                       // 'start'
      shift(213);                   // 'start'
      break;
    case 224:                       // 'to'
      shift(224);                   // 'to'
      break;
    case 225:                       // 'treat'
      shift(225);                   // 'treat'
      break;
    case 230:                       // 'union'
      shift(230);                   // 'union'
      break;
    case 242:                       // 'where'
      shift(242);                   // 'where'
      break;
    case 246:                       // 'with'
      shift(246);                   // 'with'
      break;
    case 49:                        // 'ancestor'
      shift(49);                    // 'ancestor'
      break;
    case 50:                        // 'ancestor-or-self'
      shift(50);                    // 'ancestor-or-self'
      break;
    case 58:                        // 'attribute'
      shift(58);                    // 'attribute'
      break;
    case 69:                        // 'child'
      shift(69);                    // 'child'
      break;
    case 72:                        // 'comment'
      shift(72);                    // 'comment'
      break;
    case 79:                        // 'copy'
      shift(79);                    // 'copy'
      break;
    case 84:                        // 'declare'
      shift(84);                    // 'declare'
      break;
    case 86:                        // 'delete'
      shift(86);                    // 'delete'
      break;
    case 87:                        // 'descendant'
      shift(87);                    // 'descendant'
      break;
    case 88:                        // 'descendant-or-self'
      shift(88);                    // 'descendant-or-self'
      break;
    case 95:                        // 'document'
      shift(95);                    // 'document'
      break;
    case 96:                        // 'document-node'
      shift(96);                    // 'document-node'
      break;
    case 97:                        // 'element'
      shift(97);                    // 'element'
      break;
    case 100:                       // 'empty-sequence'
      shift(100);                   // 'empty-sequence'
      break;
    case 105:                       // 'every'
      shift(105);                   // 'every'
      break;
    case 110:                       // 'first'
      shift(110);                   // 'first'
      break;
    case 111:                       // 'following'
      shift(111);                   // 'following'
      break;
    case 112:                       // 'following-sibling'
      shift(112);                   // 'following-sibling'
      break;
    case 121:                       // 'function'
      shift(121);                   // 'function'
      break;
    case 128:                       // 'if'
      shift(128);                   // 'if'
      break;
    case 129:                       // 'import'
      shift(129);                   // 'import'
      break;
    case 135:                       // 'insert'
      shift(135);                   // 'insert'
      break;
    case 141:                       // 'item'
      shift(141);                   // 'item'
      break;
    case 146:                       // 'last'
      shift(146);                   // 'last'
      break;
    case 158:                       // 'module'
      shift(158);                   // 'module'
      break;
    case 160:                       // 'namespace'
      shift(160);                   // 'namespace'
      break;
    case 161:                       // 'namespace-node'
      shift(161);                   // 'namespace-node'
      break;
    case 167:                       // 'node'
      shift(167);                   // 'node'
      break;
    case 178:                       // 'ordered'
      shift(178);                   // 'ordered'
      break;
    case 182:                       // 'parent'
      shift(182);                   // 'parent'
      break;
    case 188:                       // 'preceding'
      shift(188);                   // 'preceding'
      break;
    case 189:                       // 'preceding-sibling'
      shift(189);                   // 'preceding-sibling'
      break;
    case 192:                       // 'processing-instruction'
      shift(192);                   // 'processing-instruction'
      break;
    case 194:                       // 'rename'
      shift(194);                   // 'rename'
      break;
    case 195:                       // 'replace'
      shift(195);                   // 'replace'
      break;
    case 202:                       // 'schema-attribute'
      shift(202);                   // 'schema-attribute'
      break;
    case 203:                       // 'schema-element'
      shift(203);                   // 'schema-element'
      break;
    case 205:                       // 'self'
      shift(205);                   // 'self'
      break;
    case 211:                       // 'some'
      shift(211);                   // 'some'
      break;
    case 219:                       // 'switch'
      shift(219);                   // 'switch'
      break;
    case 220:                       // 'text'
      shift(220);                   // 'text'
      break;
    case 226:                       // 'try'
      shift(226);                   // 'try'
      break;
    case 229:                       // 'typeswitch'
      shift(229);                   // 'typeswitch'
      break;
    case 232:                       // 'unordered'
      shift(232);                   // 'unordered'
      break;
    case 236:                       // 'validate'
      shift(236);                   // 'validate'
      break;
    case 238:                       // 'variable'
      shift(238);                   // 'variable'
      break;
    case 250:                       // 'xquery'
      shift(250);                   // 'xquery'
      break;
    case 48:                        // 'allowing'
      shift(48);                    // 'allowing'
      break;
    case 57:                        // 'at'
      shift(57);                    // 'at'
      break;
    case 59:                        // 'base-uri'
      shift(59);                    // 'base-uri'
      break;
    case 61:                        // 'boundary-space'
      shift(61);                    // 'boundary-space'
      break;
    case 62:                        // 'break'
      shift(62);                    // 'break'
      break;
    case 67:                        // 'catch'
      shift(67);                    // 'catch'
      break;
    case 74:                        // 'construction'
      shift(74);                    // 'construction'
      break;
    case 77:                        // 'context'
      shift(77);                    // 'context'
      break;
    case 78:                        // 'continue'
      shift(78);                    // 'continue'
      break;
    case 80:                        // 'copy-namespaces'
      shift(80);                    // 'copy-namespaces'
      break;
    case 82:                        // 'decimal-format'
      shift(82);                    // 'decimal-format'
      break;
    case 101:                       // 'encoding'
      shift(101);                   // 'encoding'
      break;
    case 108:                       // 'exit'
      shift(108);                   // 'exit'
      break;
    case 109:                       // 'external'
      shift(109);                   // 'external'
      break;
    case 117:                       // 'ft-option'
      shift(117);                   // 'ft-option'
      break;
    case 130:                       // 'in'
      shift(130);                   // 'in'
      break;
    case 131:                       // 'index'
      shift(131);                   // 'index'
      break;
    case 137:                       // 'integrity'
      shift(137);                   // 'integrity'
      break;
    case 147:                       // 'lax'
      shift(147);                   // 'lax'
      break;
    case 168:                       // 'nodes'
      shift(168);                   // 'nodes'
      break;
    case 175:                       // 'option'
      shift(175);                   // 'option'
      break;
    case 179:                       // 'ordering'
      shift(179);                   // 'ordering'
      break;
    case 198:                       // 'revalidation'
      shift(198);                   // 'revalidation'
      break;
    case 201:                       // 'schema'
      shift(201);                   // 'schema'
      break;
    case 204:                       // 'score'
      shift(204);                   // 'score'
      break;
    case 210:                       // 'sliding'
      shift(210);                   // 'sliding'
      break;
    case 216:                       // 'strict'
      shift(216);                   // 'strict'
      break;
    case 227:                       // 'tumbling'
      shift(227);                   // 'tumbling'
      break;
    case 228:                       // 'type'
      shift(228);                   // 'type'
      break;
    case 233:                       // 'updating'
      shift(233);                   // 'updating'
      break;
    case 237:                       // 'value'
      shift(237);                   // 'value'
      break;
    case 239:                       // 'version'
      shift(239);                   // 'version'
      break;
    case 243:                       // 'while'
      shift(243);                   // 'while'
      break;
    case 73:                        // 'constraint'
      shift(73);                    // 'constraint'
      break;
    case 152:                       // 'loop'
      shift(152);                   // 'loop'
      break;
    default:
      shift(197);                   // 'returning'
    }
    eventHandler.endNonterminal("NCName", e0);
  };

  function parse_EQName()
  {
    eventHandler.startNonterminal("EQName", e0);
    lookahead1(13);                 // EQName^Token | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' | 'and' |
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
    case 58:                        // 'attribute'
      shift(58);                    // 'attribute'
      break;
    case 72:                        // 'comment'
      shift(72);                    // 'comment'
      break;
    case 96:                        // 'document-node'
      shift(96);                    // 'document-node'
      break;
    case 97:                        // 'element'
      shift(97);                    // 'element'
      break;
    case 100:                       // 'empty-sequence'
      shift(100);                   // 'empty-sequence'
      break;
    case 121:                       // 'function'
      shift(121);                   // 'function'
      break;
    case 128:                       // 'if'
      shift(128);                   // 'if'
      break;
    case 141:                       // 'item'
      shift(141);                   // 'item'
      break;
    case 161:                       // 'namespace-node'
      shift(161);                   // 'namespace-node'
      break;
    case 167:                       // 'node'
      shift(167);                   // 'node'
      break;
    case 192:                       // 'processing-instruction'
      shift(192);                   // 'processing-instruction'
      break;
    case 202:                       // 'schema-attribute'
      shift(202);                   // 'schema-attribute'
      break;
    case 203:                       // 'schema-element'
      shift(203);                   // 'schema-element'
      break;
    case 219:                       // 'switch'
      shift(219);                   // 'switch'
      break;
    case 220:                       // 'text'
      shift(220);                   // 'text'
      break;
    case 229:                       // 'typeswitch'
      shift(229);                   // 'typeswitch'
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
    case 46:                        // 'after'
      shift(46);                    // 'after'
      break;
    case 49:                        // 'ancestor'
      shift(49);                    // 'ancestor'
      break;
    case 50:                        // 'ancestor-or-self'
      shift(50);                    // 'ancestor-or-self'
      break;
    case 51:                        // 'and'
      shift(51);                    // 'and'
      break;
    case 55:                        // 'as'
      shift(55);                    // 'as'
      break;
    case 56:                        // 'ascending'
      shift(56);                    // 'ascending'
      break;
    case 60:                        // 'before'
      shift(60);                    // 'before'
      break;
    case 64:                        // 'case'
      shift(64);                    // 'case'
      break;
    case 65:                        // 'cast'
      shift(65);                    // 'cast'
      break;
    case 66:                        // 'castable'
      shift(66);                    // 'castable'
      break;
    case 69:                        // 'child'
      shift(69);                    // 'child'
      break;
    case 70:                        // 'collation'
      shift(70);                    // 'collation'
      break;
    case 79:                        // 'copy'
      shift(79);                    // 'copy'
      break;
    case 81:                        // 'count'
      shift(81);                    // 'count'
      break;
    case 84:                        // 'declare'
      shift(84);                    // 'declare'
      break;
    case 85:                        // 'default'
      shift(85);                    // 'default'
      break;
    case 86:                        // 'delete'
      shift(86);                    // 'delete'
      break;
    case 87:                        // 'descendant'
      shift(87);                    // 'descendant'
      break;
    case 88:                        // 'descendant-or-self'
      shift(88);                    // 'descendant-or-self'
      break;
    case 89:                        // 'descending'
      shift(89);                    // 'descending'
      break;
    case 94:                        // 'div'
      shift(94);                    // 'div'
      break;
    case 95:                        // 'document'
      shift(95);                    // 'document'
      break;
    case 98:                        // 'else'
      shift(98);                    // 'else'
      break;
    case 99:                        // 'empty'
      shift(99);                    // 'empty'
      break;
    case 102:                       // 'end'
      shift(102);                   // 'end'
      break;
    case 104:                       // 'eq'
      shift(104);                   // 'eq'
      break;
    case 105:                       // 'every'
      shift(105);                   // 'every'
      break;
    case 107:                       // 'except'
      shift(107);                   // 'except'
      break;
    case 110:                       // 'first'
      shift(110);                   // 'first'
      break;
    case 111:                       // 'following'
      shift(111);                   // 'following'
      break;
    case 112:                       // 'following-sibling'
      shift(112);                   // 'following-sibling'
      break;
    case 113:                       // 'for'
      shift(113);                   // 'for'
      break;
    case 122:                       // 'ge'
      shift(122);                   // 'ge'
      break;
    case 124:                       // 'group'
      shift(124);                   // 'group'
      break;
    case 126:                       // 'gt'
      shift(126);                   // 'gt'
      break;
    case 127:                       // 'idiv'
      shift(127);                   // 'idiv'
      break;
    case 129:                       // 'import'
      shift(129);                   // 'import'
      break;
    case 135:                       // 'insert'
      shift(135);                   // 'insert'
      break;
    case 136:                       // 'instance'
      shift(136);                   // 'instance'
      break;
    case 138:                       // 'intersect'
      shift(138);                   // 'intersect'
      break;
    case 139:                       // 'into'
      shift(139);                   // 'into'
      break;
    case 140:                       // 'is'
      shift(140);                   // 'is'
      break;
    case 146:                       // 'last'
      shift(146);                   // 'last'
      break;
    case 148:                       // 'le'
      shift(148);                   // 'le'
      break;
    case 150:                       // 'let'
      shift(150);                   // 'let'
      break;
    case 154:                       // 'lt'
      shift(154);                   // 'lt'
      break;
    case 156:                       // 'mod'
      shift(156);                   // 'mod'
      break;
    case 157:                       // 'modify'
      shift(157);                   // 'modify'
      break;
    case 158:                       // 'module'
      shift(158);                   // 'module'
      break;
    case 160:                       // 'namespace'
      shift(160);                   // 'namespace'
      break;
    case 162:                       // 'ne'
      shift(162);                   // 'ne'
      break;
    case 174:                       // 'only'
      shift(174);                   // 'only'
      break;
    case 176:                       // 'or'
      shift(176);                   // 'or'
      break;
    case 177:                       // 'order'
      shift(177);                   // 'order'
      break;
    case 178:                       // 'ordered'
      shift(178);                   // 'ordered'
      break;
    case 182:                       // 'parent'
      shift(182);                   // 'parent'
      break;
    case 188:                       // 'preceding'
      shift(188);                   // 'preceding'
      break;
    case 189:                       // 'preceding-sibling'
      shift(189);                   // 'preceding-sibling'
      break;
    case 194:                       // 'rename'
      shift(194);                   // 'rename'
      break;
    case 195:                       // 'replace'
      shift(195);                   // 'replace'
      break;
    case 196:                       // 'return'
      shift(196);                   // 'return'
      break;
    case 200:                       // 'satisfies'
      shift(200);                   // 'satisfies'
      break;
    case 205:                       // 'self'
      shift(205);                   // 'self'
      break;
    case 211:                       // 'some'
      shift(211);                   // 'some'
      break;
    case 212:                       // 'stable'
      shift(212);                   // 'stable'
      break;
    case 213:                       // 'start'
      shift(213);                   // 'start'
      break;
    case 224:                       // 'to'
      shift(224);                   // 'to'
      break;
    case 225:                       // 'treat'
      shift(225);                   // 'treat'
      break;
    case 226:                       // 'try'
      shift(226);                   // 'try'
      break;
    case 230:                       // 'union'
      shift(230);                   // 'union'
      break;
    case 232:                       // 'unordered'
      shift(232);                   // 'unordered'
      break;
    case 236:                       // 'validate'
      shift(236);                   // 'validate'
      break;
    case 242:                       // 'where'
      shift(242);                   // 'where'
      break;
    case 246:                       // 'with'
      shift(246);                   // 'with'
      break;
    case 250:                       // 'xquery'
      shift(250);                   // 'xquery'
      break;
    case 48:                        // 'allowing'
      shift(48);                    // 'allowing'
      break;
    case 57:                        // 'at'
      shift(57);                    // 'at'
      break;
    case 59:                        // 'base-uri'
      shift(59);                    // 'base-uri'
      break;
    case 61:                        // 'boundary-space'
      shift(61);                    // 'boundary-space'
      break;
    case 62:                        // 'break'
      shift(62);                    // 'break'
      break;
    case 67:                        // 'catch'
      shift(67);                    // 'catch'
      break;
    case 74:                        // 'construction'
      shift(74);                    // 'construction'
      break;
    case 77:                        // 'context'
      shift(77);                    // 'context'
      break;
    case 78:                        // 'continue'
      shift(78);                    // 'continue'
      break;
    case 80:                        // 'copy-namespaces'
      shift(80);                    // 'copy-namespaces'
      break;
    case 82:                        // 'decimal-format'
      shift(82);                    // 'decimal-format'
      break;
    case 101:                       // 'encoding'
      shift(101);                   // 'encoding'
      break;
    case 108:                       // 'exit'
      shift(108);                   // 'exit'
      break;
    case 109:                       // 'external'
      shift(109);                   // 'external'
      break;
    case 117:                       // 'ft-option'
      shift(117);                   // 'ft-option'
      break;
    case 130:                       // 'in'
      shift(130);                   // 'in'
      break;
    case 131:                       // 'index'
      shift(131);                   // 'index'
      break;
    case 137:                       // 'integrity'
      shift(137);                   // 'integrity'
      break;
    case 147:                       // 'lax'
      shift(147);                   // 'lax'
      break;
    case 168:                       // 'nodes'
      shift(168);                   // 'nodes'
      break;
    case 175:                       // 'option'
      shift(175);                   // 'option'
      break;
    case 179:                       // 'ordering'
      shift(179);                   // 'ordering'
      break;
    case 198:                       // 'revalidation'
      shift(198);                   // 'revalidation'
      break;
    case 201:                       // 'schema'
      shift(201);                   // 'schema'
      break;
    case 204:                       // 'score'
      shift(204);                   // 'score'
      break;
    case 210:                       // 'sliding'
      shift(210);                   // 'sliding'
      break;
    case 216:                       // 'strict'
      shift(216);                   // 'strict'
      break;
    case 227:                       // 'tumbling'
      shift(227);                   // 'tumbling'
      break;
    case 228:                       // 'type'
      shift(228);                   // 'type'
      break;
    case 233:                       // 'updating'
      shift(233);                   // 'updating'
      break;
    case 237:                       // 'value'
      shift(237);                   // 'value'
      break;
    case 238:                       // 'variable'
      shift(238);                   // 'variable'
      break;
    case 239:                       // 'version'
      shift(239);                   // 'version'
      break;
    case 243:                       // 'while'
      shift(243);                   // 'while'
      break;
    case 73:                        // 'constraint'
      shift(73);                    // 'constraint'
      break;
    case 152:                       // 'loop'
      shift(152);                   // 'loop'
      break;
    default:
      shift(197);                   // 'returning'
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
      if (code != 24)               // S^WS
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
      for (var i = 0; i < 256; i += 32)
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
    var i0 = t * 1366 + s - 1;
    var i1 = i0 >> 2;
    var i2 = i1 >> 2;
    return XQueryTokenizer.EXPECTED[(i0 & 3) + XQueryTokenizer.EXPECTED[(i1 & 3) + XQueryTokenizer.EXPECTED[(i2 & 3) + XQueryTokenizer.EXPECTED[i2 >> 2]]]];
  }
}

XQueryTokenizer.MAP0 =
[
  /*   0 */ 64, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4,
  /*  36 */ 5, 6, 7, 8, 9, 10, 11, 12, 6, 13, 14, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 18, 19, 20, 21, 22, 6,
  /*  65 */ 23, 24, 25, 26, 27, 24, 28, 28, 28, 28, 28, 29, 30, 28, 28, 28, 31, 28, 28, 32, 28, 28, 28, 33, 28, 28, 34,
  /*  92 */ 6, 35, 6, 28, 6, 36, 37, 38, 39, 40, 41, 42, 43, 44, 28, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
  /* 120 */ 58, 59, 28, 60, 6, 61, 62, 6
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
  /* 231 */ 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 338, 423, 64, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 256 */ 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 6, 13,
  /* 291 */ 14, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 18, 19, 20, 21, 22, 6, 23, 24, 25, 26, 27, 24, 28, 28,
  /* 318 */ 28, 28, 28, 29, 30, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 6, 28, 28, 28, 28, 28, 28, 28,
  /* 345 */ 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 31, 28, 28, 32, 28, 28, 28, 33, 28, 28, 34, 6, 35, 6, 28, 6, 36, 37,
  /* 373 */ 38, 39, 40, 41, 42, 43, 44, 28, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 28, 60, 6, 61,
  /* 400 */ 62, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 28, 28, 6, 6, 6, 6, 6, 6, 6, 63, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  /* 435 */ 6, 6, 6, 6, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63
];

XQueryTokenizer.MAP2 =
[
  /*  0 */ 57344, 63744, 64976, 65008, 65536, 983040, 63743, 64975, 65007, 65533, 983039, 1114111, 6, 28, 6, 28, 28, 6
];

XQueryTokenizer.INITIAL =
[
  /*  0 */ 1, 2, 3, 4, 14341, 18438, 7, 8, 9, 10, 11, 40972, 13, 14, 15, 16
];

XQueryTokenizer.TRANSITION =
[
  /*     0 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*    17 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*    34 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*    51 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*    68 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*    85 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   102 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   119 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8320, 8336, 12212, 8352, 8539, 8556, 8954, 9367,
  /*   136 */ 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 8483, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572,
  /*   153 */ 8598, 8556, 11476, 11703, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8613, 12144,
  /*   170 */ 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980,
  /*   187 */ 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483,
  /*   204 */ 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   221 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   238 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   255 */ 8679, 9441, 9469, 13009, 9510, 8539, 8556, 8954, 9367, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282,
  /*   272 */ 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639,
  /*   289 */ 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582,
  /*   306 */ 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260,
  /*   323 */ 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305,
  /*   339 */ 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   356 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   373 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 9574, 9469, 9652, 8352, 8539, 8556,
  /*   390 */ 8954, 9367, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252, 8358, 8538,
  /*   407 */ 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739,
  /*   424 */ 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923,
  /*   441 */ 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227,
  /*   458 */ 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679,
  /*   475 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   492 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   509 */ 8679, 8679, 8679, 9609, 9637, 9685, 8352, 8539, 8556, 8954, 9367, 8377, 12745, 21109, 9522, 8408, 8429,
  /*   526 */ 8445, 12282, 9544, 9749, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 9355, 12000, 8883,
  /*   543 */ 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771,
  /*   560 */ 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096,
  /*   577 */ 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317,
  /*   593 */ 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   610 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   627 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 9778, 9469, 12212, 8352,
  /*   644 */ 8539, 8556, 8954, 9367, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252,
  /*   661 */ 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695,
  /*   678 */ 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871,
  /*   695 */ 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211,
  /*   712 */ 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679,
  /*   729 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   746 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   763 */ 8679, 8679, 8679, 8679, 8679, 9441, 9469, 12212, 8352, 8539, 8556, 8954, 9367, 8377, 12745, 21109, 9522,
  /*   780 */ 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676,
  /*   797 */ 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906,
  /*   814 */ 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326,
  /*   831 */ 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272,
  /*   847 */ 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   864 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*   881 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 9807, 9469,
  /*   898 */ 9484, 8352, 8539, 8556, 8954, 9819, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9835, 8511, 8361,
  /*   915 */ 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663,
  /*   932 */ 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118,
  /*   949 */ 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195,
  /*   966 */ 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679,
  /*   983 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1000 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1017 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 9865, 9469, 12570, 8352, 8539, 8556, 8954, 9367, 8377, 12745,
  /*  1034 */ 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556,
  /*  1051 */ 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241,
  /*  1068 */ 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017,
  /*  1085 */ 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290,
  /*  1102 */ 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1119 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1136 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 9894,
  /*  1153 */ 9935, 9950, 8352, 8539, 8556, 9167, 9367, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511,
  /*  1170 */ 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647,
  /*  1187 */ 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494,
  /*  1204 */ 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152,
  /*  1221 */ 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397,
  /*  1238 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1255 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1272 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 9441, 12555, 9978, 8352, 8539, 8556, 8817, 9367, 8377,
  /*  1289 */ 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598,
  /*  1306 */ 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522,
  /*  1323 */ 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721,
  /*  1340 */ 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528,
  /*  1357 */ 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1374 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1391 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1408 */ 10006, 9469, 12212, 8352, 8539, 8556, 8954, 9179, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544,
  /*  1425 */ 10035, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289,
  /*  1442 */ 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845,
  /*  1459 */ 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971,
  /*  1476 */ 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383,
  /*  1493 */ 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1510 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1527 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 10079, 9469, 12212, 8352, 8539, 8556, 8954, 8829,
  /*  1544 */ 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572,
  /*  1561 */ 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144,
  /*  1578 */ 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980,
  /*  1595 */ 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483,
  /*  1612 */ 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1629 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1646 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1663 */ 8679, 10126, 10165, 12212, 10219, 13197, 13283, 14683, 10241, 12228, 19339, 12228, 12229, 13283, 18270,
  /*  1678 */ 13283, 13283, 10276, 10326, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283, 16459,
  /*  1693 */ 15328, 13111, 12228, 12228, 12228, 17195, 15556, 13283, 13283, 13283, 13283, 15315, 12225, 17380, 12228,
  /*  1708 */ 12228, 12229, 13283, 18242, 13283, 13283, 10352, 12222, 12228, 12228, 17637, 14329, 13283, 13283, 10349,
  /*  1723 */ 17467, 12228, 12228, 20785, 13283, 13284, 10368, 12228, 13339, 16192, 13283, 20102, 10384, 15355, 17429,
  /*  1738 */ 10404, 10457, 19887, 19288, 13202, 17531, 16703, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679,
  /*  1753 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1770 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1787 */ 8679, 8679, 8679, 8679, 8679, 10491, 10528, 12212, 10585, 13197, 13283, 10607, 10636, 12228, 12228, 12228,
  /*  1803 */ 12229, 13283, 13283, 13283, 13283, 10276, 10671, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283,
  /*  1818 */ 13283, 13283, 16459, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 15315,
  /*  1833 */ 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222, 12228, 12228, 12228, 14329,
  /*  1848 */ 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228,
  /*  1863 */ 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814,
  /*  1878 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1895 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  1912 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 10694, 9469, 10742, 8352, 8539, 8556, 8954, 9367, 8377,
  /*  1929 */ 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598,
  /*  1946 */ 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522,
  /*  1963 */ 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721,
  /*  1980 */ 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528,
  /*  1997 */ 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2014 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2031 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2048 */ 10778, 10528, 12792, 10814, 13197, 13283, 10836, 10865, 12228, 12228, 12228, 12229, 13283, 13283, 13283,
  /*  2063 */ 13283, 10900, 10915, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283, 10938, 12225,
  /*  2078 */ 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 14496, 12225, 12228, 12228, 12228,
  /*  2093 */ 12229, 13283, 13283, 13283, 13283, 17854, 12360, 12228, 12228, 12228, 14329, 13283, 13283, 13572, 12227,
  /*  2108 */ 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201,
  /*  2123 */ 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679,
  /*  2139 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2156 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2173 */ 8679, 8679, 8679, 10954, 10989, 11004, 11039, 11221, 8556, 8786, 11064, 11080, 11354, 11111, 15966, 8408,
  /*  2189 */ 8429, 8445, 12282, 11136, 11193, 11048, 11343, 11272, 11045, 11220, 8555, 8572, 8598, 8556, 11476, 8676,
  /*  2205 */ 12078, 11382, 11095, 11237, 11621, 11245, 8663, 8457, 8695, 8413, 8739, 8678, 8723, 11204, 11261, 11297,
  /*  2221 */ 11313, 8467, 8771, 8802, 8582, 8845, 12580, 11120, 11329, 11370, 11398, 8923, 8939, 8980, 15953, 11422,
  /*  2237 */ 11593, 9326, 9033, 9096, 11438, 11454, 11499, 9152, 9195, 11547, 11563, 11674, 11579, 11281, 11406, 15972,
  /*  2253 */ 8907, 11466, 11609, 11665, 11637, 11653, 11690, 11729, 11743, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2269 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2286 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2303 */ 8679, 9441, 9469, 12212, 8352, 8539, 8556, 8954, 9367, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282,
  /*  2320 */ 11772, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 11809, 12000, 8883, 10063,
  /*  2336 */ 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8855, 12440, 8522, 9241, 8755, 11906, 8467, 8771, 8802,
  /*  2353 */ 8582, 11843, 11892, 21118, 10049, 8871, 8899, 8923, 8939, 11877, 12721, 9017, 9762, 9326, 9033, 9096,
  /*  2369 */ 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317,
  /*  2385 */ 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2402 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2419 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 11922, 9469, 10180, 8352,
  /*  2436 */ 8539, 8556, 8954, 9367, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252,
  /*  2453 */ 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695,
  /*  2470 */ 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871,
  /*  2487 */ 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211,
  /*  2504 */ 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679,
  /*  2521 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2538 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2555 */ 8679, 8679, 8679, 8679, 8679, 10079, 9469, 12212, 11957, 8539, 8556, 8954, 9367, 8377, 12745, 21109, 9522,
  /*  2572 */ 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676,
  /*  2589 */ 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906,
  /*  2606 */ 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326,
  /*  2623 */ 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272,
  /*  2639 */ 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2656 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2673 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 11987, 12016,
  /*  2690 */ 12212, 8352, 8539, 8556, 12065, 9367, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 12094, 8511,
  /*  2706 */ 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 12131, 12000, 8883, 10063, 8639, 9289, 8647,
  /*  2723 */ 8663, 8457, 8695, 8413, 8739, 8710, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494,
  /*  2740 */ 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152,
  /*  2757 */ 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397,
  /*  2774 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2791 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2808 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12160, 12197, 12212, 12245, 8539, 8556, 11514, 9367, 8377,
  /*  2825 */ 12745, 21109, 9522, 8408, 8429, 8445, 12282, 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598,
  /*  2842 */ 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522,
  /*  2859 */ 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721,
  /*  2876 */ 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528,
  /*  2893 */ 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2910 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2927 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  2944 */ 12306, 10528, 12346, 14696, 13197, 13283, 12381, 12397, 12228, 12228, 12228, 12229, 13283, 13283, 13283,
  /*  2959 */ 13283, 12425, 8994, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283, 12471, 12225,
  /*  2974 */ 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 12501, 12225, 12228, 12228, 12228,
  /*  2989 */ 12229, 13283, 13283, 13283, 13283, 16749, 12360, 12228, 12228, 12228, 14329, 13283, 13283, 20355, 12227,
  /*  3004 */ 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201,
  /*  3019 */ 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679,
  /*  3035 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3052 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3069 */ 8679, 8679, 8679, 12306, 10528, 12346, 14696, 13197, 13283, 12381, 12397, 12228, 12228, 12228, 12229,
  /*  3084 */ 13283, 13283, 13283, 13283, 12425, 8994, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283,
  /*  3099 */ 13283, 12471, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 12823, 12225,
  /*  3114 */ 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 16749, 12360, 12228, 12228, 12228, 14329, 13283,
  /*  3129 */ 13283, 13572, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198,
  /*  3144 */ 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679,
  /*  3159 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3176 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3193 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12306, 10528, 12346, 14696, 13197, 13283, 12381, 12397, 12228,
  /*  3209 */ 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12540, 8994, 12228, 12228, 12228, 12228, 13196, 13283,
  /*  3224 */ 13283, 13283, 13283, 13283, 12471, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283,
  /*  3239 */ 13283, 12823, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 16749, 12360, 12228, 12228,
  /*  3254 */ 12228, 14329, 13283, 13283, 13572, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283,
  /*  3269 */ 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694,
  /*  3284 */ 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3301 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3318 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12306, 10528, 12346, 14696, 13197, 13283,
  /*  3334 */ 12381, 12397, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12425, 8994, 12228, 12228, 12228,
  /*  3349 */ 12228, 13196, 13283, 13283, 13283, 13283, 13283, 12596, 12225, 12228, 12228, 12228, 12228, 13199, 13283,
  /*  3364 */ 13283, 13283, 13283, 13283, 12823, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 16749,
  /*  3379 */ 12360, 12228, 12228, 12228, 14329, 13283, 13283, 13572, 12227, 12228, 12228, 13283, 13283, 13284, 12228,
  /*  3394 */ 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328,
  /*  3409 */ 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3426 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3443 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12306, 10528, 12346, 12649,
  /*  3460 */ 13197, 13283, 12381, 12671, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12425, 8994, 12228,
  /*  3475 */ 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283, 12471, 12225, 12228, 12228, 12228, 12228,
  /*  3490 */ 13199, 13283, 13283, 13283, 13283, 13283, 12823, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283,
  /*  3505 */ 13283, 16749, 12360, 12228, 12228, 12228, 14329, 13283, 13283, 13572, 12227, 12228, 12228, 13283, 13283,
  /*  3520 */ 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202,
  /*  3535 */ 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3551 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3568 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12306,
  /*  3585 */ 10528, 12346, 14696, 13197, 13283, 12381, 12397, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283,
  /*  3600 */ 12706, 8994, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283, 16630, 12225, 12228,
  /*  3615 */ 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 15315, 12225, 12228, 12228, 12228, 12229,
  /*  3630 */ 13283, 13283, 13283, 13283, 10352, 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285, 12227, 12228,
  /*  3645 */ 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286,
  /*  3660 */ 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3676 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3693 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3710 */ 8679, 8679, 12306, 10528, 12346, 14696, 13197, 13283, 12761, 12397, 12228, 12228, 12228, 12229, 13283,
  /*  3725 */ 13283, 13283, 13283, 12706, 8994, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283,
  /*  3740 */ 16630, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 15315, 12225, 12228,
  /*  3755 */ 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222, 12228, 12228, 12228, 14329, 13283, 13283,
  /*  3770 */ 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283,
  /*  3785 */ 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679,
  /*  3800 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3817 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3834 */ 8679, 8679, 8679, 8679, 8679, 8679, 12306, 12777, 12346, 14696, 13197, 13283, 12381, 12397, 12228, 12228,
  /*  3850 */ 12228, 12229, 13283, 13283, 13283, 13283, 12706, 8994, 12228, 12228, 12228, 12228, 13196, 13283, 13283,
  /*  3865 */ 13283, 13283, 13283, 16630, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283,
  /*  3880 */ 15315, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222, 12228, 12228, 12228,
  /*  3895 */ 14329, 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283,
  /*  3910 */ 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800,
  /*  3925 */ 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3942 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  3959 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12808, 10528, 12856, 14696, 13197, 13283, 12381,
  /*  3975 */ 12397, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12706, 8994, 12228, 12228, 12228, 12228,
  /*  3990 */ 13196, 13283, 13283, 13283, 13283, 13283, 16630, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283,
  /*  4005 */ 13283, 13283, 13283, 15315, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222,
  /*  4020 */ 12228, 12228, 12228, 14329, 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228,
  /*  4035 */ 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197,
  /*  4050 */ 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4067 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4084 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12306, 10528, 12346, 14696, 13197,
  /*  4101 */ 13283, 12381, 12397, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12706, 8994, 12228, 12228,
  /*  4116 */ 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283, 16630, 12225, 12228, 12228, 12228, 12228, 13199,
  /*  4131 */ 13283, 13283, 13283, 13283, 13283, 15315, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283,
  /*  4146 */ 17344, 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284,
  /*  4161 */ 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290,
  /*  4176 */ 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4192 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4209 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12904, 10528,
  /*  4226 */ 12346, 14696, 13197, 13283, 12381, 12397, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12706,
  /*  4241 */ 8994, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283, 16630, 12225, 12228, 12228,
  /*  4256 */ 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 15315, 12225, 12228, 12228, 12228, 12229, 13283,
  /*  4271 */ 13283, 13283, 13283, 10352, 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285, 12227, 12228, 12228,
  /*  4286 */ 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200,
  /*  4301 */ 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4317 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4334 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4351 */ 8679, 9441, 9469, 12212, 8352, 8539, 8556, 9048, 9990, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282,
  /*  4368 */ 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639,
  /*  4385 */ 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582,
  /*  4402 */ 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 12937, 9136, 12260,
  /*  4419 */ 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305,
  /*  4435 */ 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4452 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4469 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12953, 12994, 12212, 8352, 8539, 8556,
  /*  4486 */ 13035, 9367, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 13083, 8511, 8361, 12734, 9252, 8358,
  /*  4502 */ 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413,
  /*  4519 */ 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899,
  /*  4536 */ 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674,
  /*  4553 */ 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679,
  /*  4570 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4587 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4604 */ 8679, 8679, 8679, 8679, 13132, 10528, 13148, 13049, 13178, 15923, 12381, 12397, 12228, 12228, 12228,
  /*  4619 */ 13194, 13283, 13283, 13283, 13218, 12425, 11786, 13239, 12228, 12228, 13266, 19243, 19171, 13282, 13283,
  /*  4634 */ 20380, 18359, 13301, 9878, 13331, 15618, 18328, 12228, 15836, 13355, 13283, 13386, 19280, 17216, 12823,
  /*  4649 */ 10092, 17670, 12228, 14702, 19402, 20524, 13407, 13283, 18371, 13426, 12360, 13475, 13067, 12228, 14025,
  /*  4664 */ 20720, 20636, 13572, 12227, 13551, 17957, 13283, 13570, 13588, 12228, 12228, 13201, 13283, 13283, 12228,
  /*  4679 */ 13198, 13283, 19290, 13201, 20642, 9001, 18379, 19249, 19290, 14328, 13197, 15455, 16694, 13800, 13814,
  /*  4694 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4711 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4728 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 13616, 10528, 12346, 14696, 13197, 13283, 12381, 12397,
  /*  4744 */ 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12425, 8994, 12228, 12228, 12228, 11827, 13632,
  /*  4759 */ 13283, 13283, 13283, 13283, 13650, 12471, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283,
  /*  4774 */ 13283, 13283, 12823, 10707, 12228, 12228, 12228, 9593, 13674, 13283, 13283, 13283, 17077, 12360, 12228,
  /*  4789 */ 12228, 12228, 14329, 13283, 13283, 13572, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201,
  /*  4804 */ 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13699, 13715, 14328, 13197, 15455,
  /*  4819 */ 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4836 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4853 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 13737, 10528, 12346, 14696, 20063,
  /*  4869 */ 13391, 12381, 13753, 16357, 13769, 12228, 12229, 13786, 13860, 13283, 13283, 12425, 8994, 13880, 20583,
  /*  4884 */ 13910, 13909, 13196, 17928, 13926, 13945, 16869, 13283, 12471, 12225, 12228, 12228, 12228, 10475, 13199,
  /*  4899 */ 13283, 13283, 13283, 13283, 13964, 12823, 12225, 12228, 12228, 16349, 12229, 13283, 13283, 13283, 13982,
  /*  4914 */ 16749, 12360, 12228, 18200, 12228, 14329, 13283, 14002, 13572, 12365, 11023, 12228, 19178, 21045, 13284,
  /*  4929 */ 12228, 12228, 14019, 13283, 20401, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19809, 16381, 19290,
  /*  4944 */ 14328, 13197, 15455, 16694, 15197, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4960 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  4977 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 14041, 10528,
  /*  4994 */ 12346, 10620, 13197, 14057, 12381, 14078, 11531, 17712, 14115, 10798, 14140, 14158, 16505, 15403, 12425,
  /*  5009 */ 8994, 12228, 12228, 12228, 10655, 13196, 13283, 13283, 13283, 15989, 13283, 12471, 10019, 18766, 12228,
  /*  5024 */ 12228, 12228, 14189, 14208, 20149, 13283, 13283, 9723, 12823, 10791, 12228, 12228, 16977, 12229, 14231,
  /*  5039 */ 13283, 13283, 14250, 16749, 12360, 15131, 14351, 14267, 14329, 14287, 15483, 13572, 12227, 12228, 12228,
  /*  5054 */ 13283, 13283, 13284, 12228, 12228, 14093, 13283, 13223, 12228, 13198, 13283, 19290, 13201, 19286, 14308,
  /*  5069 */ 19288, 14324, 14345, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5085 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5102 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5119 */ 8679, 14367, 10528, 12346, 14383, 14433, 14481, 12381, 12671, 20258, 20683, 10973, 15383, 20479, 14532,
  /*  5134 */ 14551, 14601, 12425, 11150, 14581, 14617, 14641, 15263, 14718, 14734, 14758, 19662, 14788, 14817, 14851,
  /*  5149 */ 12225, 14881, 12228, 10591, 14916, 14936, 13535, 14960, 13283, 14980, 19551, 12823, 10139, 10762, 18830,
  /*  5164 */ 15017, 20199, 19582, 19801, 20664, 15068, 15095, 12360, 13453, 10253, 15147, 14329, 15165, 15183, 13572,
  /*  5179 */ 10291, 13503, 12409, 17577, 15241, 15301, 15371, 21201, 20206, 15399, 15419, 12228, 17047, 13283, 15437,
  /*  5194 */ 13201, 15453, 15337, 17993, 14192, 19634, 15471, 13197, 14742, 15499, 13800, 13814, 8679, 8679, 8679,
  /*  5209 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5226 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5243 */ 8679, 8679, 8679, 8679, 8679, 15535, 10528, 12346, 13315, 16024, 15551, 12381, 12397, 15572, 12228, 12228,
  /*  5259 */ 12229, 16142, 13283, 13283, 13283, 12425, 8994, 12228, 12228, 12228, 16111, 13196, 13283, 13283, 13283,
  /*  5274 */ 19143, 13283, 12471, 12225, 12228, 12228, 15614, 12228, 13199, 13283, 13283, 19042, 13283, 13283, 12823,
  /*  5289 */ 12225, 12228, 12228, 20423, 12229, 13283, 13283, 13283, 16296, 16749, 12360, 12228, 12228, 12228, 14329,
  /*  5304 */ 13283, 13283, 13572, 12227, 12228, 12228, 13283, 13283, 13284, 16982, 12228, 13201, 15634, 13283, 12228,
  /*  5319 */ 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 16814, 16694, 15655, 13814,
  /*  5334 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5351 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5368 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 15686, 10528, 15702, 14696, 13197, 13283, 12381, 12397,
  /*  5384 */ 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12706, 12108, 12228, 12228, 12228, 12228, 13196,
  /*  5399 */ 13283, 13283, 13283, 13283, 13283, 18170, 12225, 12228, 17486, 12228, 12228, 13199, 13283, 13283, 18922,
  /*  5414 */ 13283, 13283, 15315, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222, 12228,
  /*  5429 */ 12228, 10648, 14329, 13283, 13283, 15732, 12838, 10877, 15751, 15786, 20751, 18869, 15803, 15822, 17403,
  /*  5444 */ 19929, 15859, 10922, 15881, 15908, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455,
  /*  5459 */ 15079, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5476 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5493 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12306, 10528, 12346, 12967, 16789,
  /*  5509 */ 14003, 12381, 12397, 12228, 12228, 21025, 12229, 13283, 13283, 13283, 15988, 12706, 8994, 12228, 12228,
  /*  5524 */ 12228, 12228, 10225, 13283, 13283, 13283, 13283, 13283, 16005, 9791, 12228, 12228, 12228, 12228, 13199,
  /*  5539 */ 18562, 13283, 13283, 13283, 13283, 15315, 12225, 12228, 12228, 12228, 16021, 13283, 13283, 13283, 17505,
  /*  5554 */ 10352, 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284,
  /*  5569 */ 12228, 12228, 13201, 13283, 13283, 12228, 19864, 13283, 16040, 13201, 19286, 13200, 19288, 13202, 19290,
  /*  5584 */ 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5600 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5617 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 16062, 10528,
  /*  5634 */ 12346, 15109, 18062, 16078, 12381, 12397, 10468, 16094, 13770, 16127, 20531, 16180, 13283, 16216, 12706,
  /*  5649 */ 8994, 10260, 12228, 17125, 19514, 15274, 14251, 13283, 18733, 16232, 16268, 16630, 10504, 16319, 12228,
  /*  5664 */ 12228, 10720, 13893, 16603, 13283, 13283, 19422, 20278, 15315, 11856, 18452, 14894, 16339, 16373, 16397,
  /*  5679 */ 20605, 16414, 20012, 16451, 13019, 15149, 16475, 16533, 12319, 17904, 16567, 16619, 10558, 16646, 16665,
  /*  5694 */ 16684, 16727, 16745, 12228, 12228, 13201, 13283, 13283, 12683, 9712, 16765, 16783, 13201, 19286, 16805,
  /*  5709 */ 16830, 13202, 19290, 14328, 13515, 16854, 16694, 14565, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5725 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5742 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5759 */ 8679, 12306, 10528, 12346, 14696, 13197, 13283, 12381, 12397, 12228, 12228, 12228, 12229, 13283, 13283,
  /*  5774 */ 13283, 13283, 12706, 8994, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283, 13283, 13283, 16630,
  /*  5789 */ 9907, 12228, 12228, 12228, 12228, 13199, 16892, 13283, 13283, 13283, 13283, 15315, 12225, 12228, 12228,
  /*  5804 */ 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285,
  /*  5819 */ 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290,
  /*  5834 */ 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679,
  /*  5849 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5866 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5883 */ 8679, 8679, 8679, 8679, 8679, 16911, 10528, 15702, 13440, 12633, 16927, 12761, 16963, 15581, 16998, 13250,
  /*  5899 */ 15770, 17017, 16429, 14215, 17063, 12706, 12108, 17107, 12115, 12228, 17141, 11941, 20156, 15787, 13283,
  /*  5914 */ 18109, 13283, 17160, 12225, 12228, 12228, 10305, 17176, 13199, 13283, 13283, 15639, 12330, 17211, 15315,
  /*  5929 */ 12225, 19105, 12228, 12228, 12229, 13283, 17232, 13283, 13283, 10352, 11713, 17707, 12228, 18470, 14944,
  /*  5944 */ 17253, 13283, 19215, 12227, 17117, 12228, 13283, 17742, 13284, 12228, 12228, 17270, 13283, 20229, 12228,
  /*  5959 */ 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 9733, 15843, 17294, 15455, 15892, 13800, 13814,
  /*  5974 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  5991 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6008 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 17323, 12777, 12346, 12485, 13197, 17339, 17360, 12397,
  /*  6024 */ 15590, 12228, 17376, 17396, 19588, 13283, 14410, 17419, 12706, 8994, 9919, 12228, 17445, 12228, 13196,
  /*  6039 */ 14292, 16597, 16303, 13283, 13283, 17590, 17465, 10569, 12228, 16323, 17483, 13199, 14535, 17502, 13283,
  /*  6054 */ 17521, 13283, 14173, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222, 12228,
  /*  6069 */ 12228, 12228, 14329, 13283, 13283, 13285, 18674, 12228, 12228, 17834, 13283, 13284, 12228, 12228, 13201,
  /*  6084 */ 13283, 13283, 12228, 13198, 13283, 19290, 14593, 13683, 16551, 19288, 13202, 19290, 14328, 13197, 15455,
  /*  6099 */ 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6116 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6133 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 17547, 10528, 12346, 17091, 14656,
  /*  6149 */ 17563, 12381, 12397, 16103, 12883, 17815, 12229, 18928, 18425, 15421, 13283, 12706, 9558, 10512, 12228,
  /*  6164 */ 12228, 12228, 13196, 16582, 13283, 13283, 13283, 13283, 16630, 10755, 12228, 12228, 19729, 19378, 20966,
  /*  6179 */ 13283, 13283, 13283, 17606, 20306, 15315, 12225, 17624, 17659, 17693, 12229, 20929, 17728, 16282, 17765,
  /*  6194 */ 10352, 9662, 9669, 13116, 10333, 17791, 20470, 20337, 14670, 11019, 19003, 17810, 17831, 16154, 17850,
  /*  6209 */ 10203, 13490, 19981, 17870, 17899, 13459, 13198, 18235, 19290, 17920, 17944, 17981, 18009, 18033, 18056,
  /*  6224 */ 14328, 13197, 13658, 18078, 13800, 15211, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6240 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6257 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 18125, 10528,
  /*  6274 */ 12346, 13097, 18141, 18157, 12381, 12397, 12228, 13060, 18186, 14625, 13283, 16876, 18221, 18258, 18293,
  /*  6289 */ 9849, 12228, 18309, 18325, 12228, 18344, 18395, 15519, 18416, 13283, 14417, 16630, 12225, 12228, 20813,
  /*  6304 */ 18592, 12228, 13199, 13283, 18948, 17254, 13283, 13283, 10419, 18449, 12228, 12228, 12228, 12655, 13283,
  /*  6319 */ 13283, 13283, 13283, 16517, 12516, 12228, 18468, 12228, 12917, 17794, 13283, 13285, 9111, 12181, 12228,
  /*  6334 */ 15511, 15052, 13284, 12228, 12228, 13201, 13283, 13283, 18486, 16046, 18511, 16164, 14398, 18531, 18547,
  /*  6349 */ 18584, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 18608, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6365 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6382 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6399 */ 8679, 18624, 10528, 12346, 14696, 15032, 17278, 18640, 12397, 9120, 20819, 9080, 18699, 15865, 13410,
  /*  6414 */ 16729, 18568, 18656, 8994, 12228, 12228, 9417, 12228, 13196, 13283, 13283, 13948, 13283, 13283, 17307,
  /*  6429 */ 18672, 12228, 18690, 12228, 12228, 13199, 13283, 16252, 13283, 13283, 13283, 14448, 12225, 12228, 21062,
  /*  6444 */ 12228, 12229, 13283, 13283, 17237, 13283, 15735, 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285,
  /*  6459 */ 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228, 13198, 13283, 15252,
  /*  6474 */ 17965, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679,
  /*  6489 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6506 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6523 */ 8679, 8679, 8679, 8679, 8679, 12306, 10528, 18715, 12610, 10310, 18731, 18749, 12397, 12228, 12228, 12228,
  /*  6539 */ 12229, 13283, 13283, 13283, 13283, 12706, 12174, 12228, 12228, 12228, 12228, 13196, 13283, 13283, 13283,
  /*  6554 */ 13283, 13283, 18811, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 15315,
  /*  6569 */ 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222, 12228, 12228, 12228, 14329,
  /*  6584 */ 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 18765, 13201, 15346, 13283, 12228,
  /*  6599 */ 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814,
  /*  6614 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6631 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6648 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 18782, 10528, 12346, 13162, 16490, 18798, 12381, 12397,
  /*  6664 */ 12228, 18827, 17677, 18846, 13283, 18885, 14964, 18907, 12706, 9699, 12228, 9075, 12228, 10149, 11164,
  /*  6679 */ 18944, 16435, 13283, 14234, 18964, 16630, 10193, 12228, 18980, 10884, 12228, 12690, 19019, 18891, 19036,
  /*  6694 */ 19058, 13283, 19081, 12225, 19097, 10820, 12228, 12229, 16895, 19121, 18101, 13283, 10352, 8623, 12228,
  /*  6709 */ 12228, 18205, 20073, 13283, 13283, 16947, 12046, 12228, 12228, 19141, 13283, 13284, 12228, 12228, 13201,
  /*  6724 */ 13283, 13283, 12228, 13198, 13283, 19502, 19707, 17029, 13200, 16200, 10388, 19290, 14328, 13197, 16711,
  /*  6739 */ 19159, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6756 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6773 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 19194, 10528, 12346, 15225, 20121,
  /*  6789 */ 19210, 12381, 12397, 19231, 12888, 12228, 12229, 19265, 15167, 19306, 13283, 12706, 8994, 10103, 16838,
  /*  6804 */ 12228, 12228, 18017, 12921, 17608, 13283, 13283, 19308, 11177, 10967, 12228, 12228, 21194, 19324, 10726,
  /*  6819 */ 13283, 13283, 19125, 19446, 19545, 15315, 12225, 12228, 20877, 15764, 12229, 13283, 13283, 19963, 19359,
  /*  6834 */ 10352, 11935, 13721, 12840, 12228, 14329, 13527, 18400, 13285, 19377, 12228, 12228, 13283, 13283, 13284,
  /*  6849 */ 12228, 13554, 13201, 13283, 16244, 19394, 13634, 19418, 19290, 19438, 19462, 13200, 14826, 19955, 19290,
  /*  6864 */ 19488, 19530, 19567, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6880 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  6897 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 19604, 10528,
  /*  6914 */ 12346, 14865, 19620, 19650, 19678, 19694, 19723, 19745, 18495, 19343, 19761, 19786, 19825, 13283, 19841,
  /*  6929 */ 8994, 19857, 19880, 19903, 14920, 13196, 20082, 19770, 20037, 13283, 19924, 14801, 14462, 19945, 15123,
  /*  6944 */ 12228, 9425, 19979, 20313, 19997, 13283, 19020, 20028, 13370, 11756, 12228, 20053, 20098, 20118, 20137,
  /*  6959 */ 20986, 20172, 21006, 10352, 8964, 20188, 12228, 14465, 14099, 20222, 13283, 18277, 14511, 20245, 10678,
  /*  6974 */ 20274, 20294, 19065, 10110, 13844, 20329, 20353, 20371, 12623, 19472, 20396, 20417, 13201, 19286, 13200,
  /*  6989 */ 19288, 13202, 14991, 20439, 10441, 20455, 16694, 14772, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7005 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7022 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7039 */ 8679, 20495, 10528, 12346, 10849, 14124, 20511, 20547, 12397, 18995, 12228, 12228, 16649, 18090, 13283,
  /*  7054 */ 13283, 13283, 20563, 8994, 16668, 14271, 15598, 20579, 12978, 13283, 20599, 20621, 17749, 18515, 13600,
  /*  7069 */ 11528, 12524, 12228, 12228, 12228, 13199, 16398, 13283, 13283, 13283, 13283, 15938, 13827, 12228, 12228,
  /*  7084 */ 12228, 12229, 20658, 13283, 13283, 13283, 10352, 9407, 20680, 12228, 12228, 15285, 13283, 13283, 13285,
  /*  7099 */ 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 11861, 13198, 16939, 19290,
  /*  7114 */ 13201, 19286, 13200, 19288, 13202, 19290, 20699, 13197, 15455, 17775, 20736, 13814, 8679, 8679, 8679,
  /*  7129 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7146 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7163 */ 8679, 8679, 8679, 8679, 8679, 20767, 10528, 12346, 12870, 13197, 20783, 12381, 20801, 11793, 12228, 19908,
  /*  7179 */ 12229, 13986, 13283, 16767, 13283, 12706, 8994, 12228, 17001, 12228, 12228, 13196, 13283, 13283, 20835,
  /*  7194 */ 13283, 13283, 16630, 12225, 12228, 12228, 12228, 12228, 13199, 13283, 13283, 13283, 13283, 13283, 15315,
  /*  7209 */ 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352, 12222, 12228, 12228, 12228, 14329,
  /*  7224 */ 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201, 13283, 13283, 12228,
  /*  7239 */ 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455, 16694, 13800, 13814,
  /*  7254 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7271 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7288 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 20857, 10528, 12346, 14696, 15001, 14062, 12381, 12397,
  /*  7304 */ 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 12706, 8994, 12228, 12228, 12228, 12228, 13196,
  /*  7319 */ 13283, 13283, 13283, 13283, 13283, 16630, 11822, 12228, 12228, 12228, 12228, 14900, 13283, 13283, 13283,
  /*  7334 */ 13283, 13283, 15315, 12225, 12228, 20873, 12228, 17190, 13283, 13966, 13283, 13283, 20893, 12222, 12228,
  /*  7349 */ 12228, 12228, 14329, 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228, 12228, 13201,
  /*  7364 */ 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328, 13197, 15455,
  /*  7379 */ 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7396 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7413 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 20909, 10528, 12346, 9062, 13197, 20925,
  /*  7430 */ 20945, 12397, 12228, 15806, 12228, 20961, 13283, 13283, 20982, 15044, 12706, 8994, 12228, 12228, 12228,
  /*  7445 */ 12228, 13196, 13283, 13283, 13283, 13283, 13283, 17883, 12225, 12228, 17643, 12228, 12228, 13199, 13283,
  /*  7460 */ 13283, 21002, 13283, 13283, 15670, 12225, 21022, 12228, 12228, 12229, 19361, 13283, 13283, 13283, 10352,
  /*  7475 */ 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228,
  /*  7490 */ 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328,
  /*  7505 */ 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7522 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7539 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 12306, 10528, 12346, 14696,
  /*  7556 */ 14835, 13864, 12381, 12397, 12228, 12228, 12228, 16545, 13283, 13283, 13283, 18433, 12706, 8994, 13836,
  /*  7571 */ 12228, 14516, 12228, 13196, 13929, 13283, 13283, 21041, 13283, 16630, 12225, 17144, 21061, 12228, 12228,
  /*  7586 */ 13199, 13283, 18861, 13283, 13283, 13283, 15315, 12225, 12228, 17449, 12228, 12049, 13283, 13283, 18040,
  /*  7601 */ 13283, 20841, 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285, 10434, 12228, 12228, 20714, 13283,
  /*  7616 */ 13284, 12228, 17039, 13201, 14142, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202,
  /*  7631 */ 19290, 14328, 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7647 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7664 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 21078,
  /*  7681 */ 9469, 12031, 21094, 8539, 8556, 8954, 8495, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 21134,
  /*  7697 */ 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289,
  /*  7714 */ 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845,
  /*  7731 */ 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971,
  /*  7748 */ 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383,
  /*  7765 */ 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7782 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7799 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 21150, 9469, 10543, 8352, 8539, 8556, 8954, 9962,
  /*  7816 */ 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 21166, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572,
  /*  7833 */ 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144,
  /*  7850 */ 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980,
  /*  7867 */ 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483,
  /*  7884 */ 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7901 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7918 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  7935 */ 8679, 9441, 9469, 12212, 8352, 8539, 8556, 8954, 15716, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282,
  /*  7952 */ 9544, 8511, 8361, 12734, 9252, 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639,
  /*  7969 */ 9289, 8647, 8663, 8457, 8695, 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582,
  /*  7986 */ 8845, 9494, 21118, 10049, 8871, 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260,
  /*  8003 */ 11971, 9152, 9195, 8392, 9211, 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305,
  /*  8019 */ 9342, 9383, 9397, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  8036 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  8053 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 9441, 10528, 12212, 9587, 13197, 13283,
  /*  8070 */ 10607, 21182, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10276, 8994, 12228, 12228, 12228,
  /*  8085 */ 12228, 13196, 13283, 13283, 13283, 13283, 13283, 16459, 12225, 12228, 12228, 12228, 12228, 13199, 13283,
  /*  8100 */ 13283, 13283, 13283, 13283, 15315, 12225, 12228, 12228, 12228, 12229, 13283, 13283, 13283, 13283, 10352,
  /*  8115 */ 12222, 12228, 12228, 12228, 14329, 13283, 13283, 13285, 12227, 12228, 12228, 13283, 13283, 13284, 12228,
  /*  8130 */ 12228, 13201, 13283, 13283, 12228, 13198, 13283, 19290, 13201, 19286, 13200, 19288, 13202, 19290, 14328,
  /*  8145 */ 13197, 15455, 16694, 13800, 13814, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  8162 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  8179 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 9453, 8679, 8679, 8352,
  /*  8196 */ 8539, 8556, 8678, 9621, 8377, 12745, 21109, 9522, 8408, 8429, 8445, 12282, 8677, 8511, 8361, 12734, 9252,
  /*  8213 */ 8358, 8538, 8555, 8572, 8598, 8556, 11476, 8676, 12000, 8883, 10063, 8639, 9289, 8647, 8663, 8457, 8695,
  /*  8230 */ 8413, 8739, 8678, 12144, 8522, 9241, 8755, 11906, 8467, 8771, 8802, 8582, 8845, 9494, 21118, 10049, 8871,
  /*  8247 */ 8899, 8923, 8939, 8980, 12721, 9017, 9762, 9326, 9033, 9096, 9136, 12260, 11971, 9152, 9195, 8392, 9211,
  /*  8264 */ 11674, 9227, 9261, 11483, 9528, 12290, 12272, 9277, 9317, 12455, 9305, 9342, 9383, 9397, 8679, 8679, 8679,
  /*  8281 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  8298 */ 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679, 8679,
  /*  8315 */ 8679, 8679, 8679, 8679, 8679, 1, 0, 0, 49172, 14357, 18455, 51225, 49179, 51232, 36900, 38951, 41001,
  /*  8332 */ 51225, 0, 49172, 51225, 1, 0, 0, 49172, 14357, 14357, 18455, 18455, 51225, 0, 49179, 28, 28, 28, 28,
  /*  8351 */ 51232, 1073152, 0, 0, 1095680, 1095680, 1095680, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8364 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1243136,
  /*  8375 */ 1071104, 1071104, 1167360, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8386 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1263616, 1071104, 1165312, 1169408, 1071104, 1193984,
  /*  8397 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1277952, 1290240, 1331200,
  /*  8408 */ 1093632, 1093632, 1163264, 1167360, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /*  8419 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1470464, 1093632, 1482752, 1093632, 1093632, 1093632,
  /*  8430 */ 1263616, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1300480, 1093632, 1308672, 1093632,
  /*  8441 */ 1312768, 1093632, 1316864, 1337344, 1093632, 1093632, 1353728, 1093632, 1366016, 1093632, 1093632,
  /*  8452 */ 1382400, 1093632, 1093632, 1093632, 1411072, 1093632, 1093632, 1093632, 1093632, 1251328, 1093632,
  /*  8463 */ 1093632, 1093632, 1093632, 1271808, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /*  8474 */ 1177600, 1093632, 1187840, 1191936, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 18455,
  /*  8486 */ 0, 0, 0, 0, 0, 0, 0, 455, 0, 0, 270, 0, 0, 1075200, 0, 0, 0, 0, 1095680, 0, 0, 1071104, 1071104, 1071104,
  /*  8510 */ 1163264, 1077248, 0, 1095680, 0, 0, 1071104, 0, 1071104, 1071104, 1071104, 1155072, 1071104, 1071104,
  /*  8524 */ 1071104, 1071104, 1071104, 1216512, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8535 */ 1253376, 1071104, 1265664, 1513472, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  8546 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1093632, 1093632, 1093632, 1093632, 1155072, 1093632,
  /*  8557 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /*  8568 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1243136, 1093632, 1093632, 1093632,
  /*  8579 */ 1093632, 1093632, 1259520, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /*  8590 */ 1468416, 1093632, 1093632, 1486848, 1093632, 1093632, 1511424, 1093632, 1282048, 1093632, 1093632,
  /*  8601 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1351680, 1357824, 1093632,
  /*  8612 */ 1370112, 1093632, 0, 455, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 55, 55, 55, 950, 55, 951, 55, 55, 55,
  /*  8639 */ 1339392, 1349632, 1361920, 1071104, 1071104, 1071104, 1392640, 1406976, 1071104, 1071104, 1071104,
  /*  8650 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1554432, 1071104, 1093632, 1093632, 1093632, 1093632,
  /*  8661 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1181696, 1183744, 1093632, 1093632, 1093632, 1093632,
  /*  8672 */ 1093632, 1093632, 1212416, 1093632, 1093632, 1093632, 1093632, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /*  8693 */ 0, 0, 1310720, 1093632, 1093632, 1093632, 1093632, 1093632, 1335296, 1339392, 1349632, 1361920, 1093632,
  /*  8706 */ 1093632, 1093632, 1392640, 1406976, 1093632, 0, 10240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1144955,
  /*  8727 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1177723, 1071227, 1187963, 1192059,
  /*  8738 */ 1071227, 1093632, 1093632, 1501184, 1093632, 1093632, 1517568, 1093632, 1093632, 1093632, 1093632,
  /*  8749 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1554432, 1394688, 1071104, 1413120, 1071104, 1071104,
  /*  8760 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1468416, 1071104, 1071104, 1486848,
  /*  8771 */ 1093632, 1216512, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1253376, 1093632,
  /*  8782 */ 1265664, 1093632, 1093632, 1275904, 1093632, 14357, 0, 18455, 18455, 28, 28, 0, 1103977, 0, 0, 0, 0, 0, 0,
  /*  8801 */ 268, 1093632, 1093632, 1304576, 1093632, 1318912, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /*  8813 */ 1093632, 1394688, 1093632, 1413120, 1093632, 14357, 0, 18455, 18455, 28, 28, 33, 0, 0, 0, 0, 0, 0, 0, 0,
  /*  8833 */ 1075200, 272, 0, 0, 121, 1095680, 0, 124, 1071104, 1071104, 1071104, 1163264, 1093632, 1521664, 1093632,
  /*  8848 */ 1093632, 1093632, 1536000, 1093632, 1093632, 1546240, 1548288, 1093632, 0, 0, 0, 0, 0, 0, 121, 0, 0, 0,
  /*  8866 */ 121, 0, 124, 0, 0, 1447936, 1071104, 1452032, 1071104, 1071104, 1462272, 1071104, 1484800, 1492992,
  /*  8880 */ 1499136, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1212416, 1071104, 1071104, 1071104,
  /*  8891 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1251328, 1071104, 1071104, 1071104, 1562624, 1093632,
  /*  8902 */ 1093632, 1093632, 1093632, 1093632, 1173504, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /*  8913 */ 1093632, 1093632, 1071227, 1071227, 1202299, 1071227, 1071227, 1071227, 1071227, 1071227, 1093632,
  /*  8924 */ 1093632, 1093632, 1226752, 1093632, 1093632, 1093632, 1093632, 1093632, 1269760, 1093632, 1093632,
  /*  8935 */ 1093632, 1093632, 1314816, 1327104, 1093632, 1093632, 1093632, 1372160, 1374208, 1093632, 1409024,
  /*  8946 */ 1093632, 1093632, 1423360, 1093632, 1093632, 1447936, 1093632, 1452032, 1093632, 14357, 0, 18455, 18455,
  /*  8959 */ 28, 28, 33, 33, 0, 0, 0, 0, 0, 0, 0, 55, 55, 55, 55, 55, 55, 55, 55, 55, 954, 1093632, 1462272, 1093632,
  /*  8983 */ 1484800, 1492992, 1499136, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1562624, 0, 0,
  /*  8996 */ 275, 0, 0, 278, 0, 55, 55, 55, 55, 55, 55, 55, 55, 55, 77, 1257, 77, 1259, 77, 77, 77, 1222656, 1224704,
  /*  9019 */ 1071104, 1071104, 1249280, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /*  9030 */ 1071104, 1071104, 1415168, 1224704, 1093632, 1093632, 1249280, 1093632, 1093632, 1093632, 1093632,
  /*  9041 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1415168, 1093632, 14357, 0, 18455, 18455, 28, 28,
  /*  9055 */ 33, 33, 0, 0, 0, 0, 266, 0, 0, 8304, 52, 52, 52, 55, 55, 55, 55, 55, 55, 145, 55, 55, 55, 55, 497, 55, 55,
  /*  9082 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 339, 55, 55, 55, 55, 1093632, 1093632, 1449984, 1093632, 1093632,
  /*  9101 */ 1093632, 1093632, 1480704, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1540096, 0, 55, 55, 55,
  /*  9115 */ 55, 55, 55, 55, 1048, 55, 55, 55, 55, 55, 55, 55, 296, 55, 55, 55, 55, 306, 55, 55, 55, 1148928, 1150976,
  /*  9138 */ 1071104, 1071104, 1171456, 1071104, 1185792, 1071104, 1071104, 1071104, 1210368, 1071104, 1071104,
  /*  9149 */ 1071104, 1071104, 1245184, 1093632, 1093632, 1210368, 1093632, 1093632, 1093632, 1093632, 1245184,
  /*  9160 */ 1093632, 1257472, 1273856, 1093632, 1093632, 1298432, 1329152, 1093632, 14357, 0, 18455, 18455, 28, 28,
  /*  9174 */ 1103976, 1103976, 0, 0, 0, 0, 0, 0, 0, 1075200, 0, 0, 20480, 121, 1095680, 0, 124, 1071104, 1071104,
  /*  9193 */ 1071104, 1163264, 1093632, 1093632, 1417216, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /*  9204 */ 1093632, 1515520, 1093632, 1093632, 1527808, 1533952, 1538048, 1333248, 1378304, 1435648, 1071104,
  /*  9215 */ 1454080, 1071104, 1460224, 1071104, 1071104, 1071104, 1525760, 1093632, 1165312, 1169408, 1093632,
  /*  9226 */ 1193984, 1093632, 1460224, 1093632, 1093632, 1093632, 1525760, 1071104, 1071104, 1200128, 1071104,
  /*  9237 */ 1071104, 1071104, 1228800, 1232896, 1071104, 1071104, 1275904, 1071104, 1071104, 1071104, 1304576,
  /*  9248 */ 1071104, 1318912, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1351680, 1357824,
  /*  9259 */ 1071104, 1370112, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1519616, 1093632,
  /*  9270 */ 1093632, 1200128, 1093632, 1093632, 1093632, 1228800, 1232896, 1093632, 1093632, 1093632, 1456128,
  /*  9281 */ 1093632, 1093632, 1071104, 1071104, 1071104, 1071104, 1071104, 1247232, 1071104, 1071104, 1071104,
  /*  9292 */ 1071104, 1470464, 1071104, 1482752, 1071104, 1071104, 1071104, 1071104, 1501184, 1071104, 1071104,
  /*  9303 */ 1517568, 1071104, 1093632, 1255424, 1093632, 1380352, 1093632, 1093632, 1093632, 1466368, 1071104,
  /*  9314 */ 1214464, 1071104, 1071104, 1071104, 1071104, 1071104, 1093632, 1093632, 1093632, 1093632, 1093632,
  /*  9325 */ 1247232, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1198080, 1093632,
  /*  9336 */ 1093632, 1208320, 1093632, 1093632, 1093632, 1222656, 1214464, 1093632, 1093632, 1093632, 1093632,
  /*  9347 */ 1093632, 1153024, 1071104, 1071104, 1071104, 1071104, 1464320, 1153024, 1093632, 1093632, 1093632, 0, 0,
  /*  9360 */ 0, 0, 0, 0, 0, 644, 0, 0, 0, 0, 0, 1075200, 0, 0, 0, 121, 1095680, 0, 124, 1071104, 1071104, 1071104,
  /*  9382 */ 1163264, 1093632, 1464320, 1071104, 1280000, 1437696, 1071104, 1093632, 1280000, 1437696, 1093632,
  /*  9393 */ 1230848, 1071104, 1230848, 1093632, 1071104, 1093632, 1071104, 1093632, 1443840, 1443840, 0, 0, 0, 0, 0,
  /*  9408 */ 0, 0, 0, 0, 0, 55, 55, 55, 949, 55, 55, 55, 55, 55, 55, 55, 515, 55, 55, 55, 55, 55, 55, 55, 55, 720, 55,
  /*  9435 */ 55, 55, 723, 55, 55, 55, 1, 0, 0, 0, 14357, 18455, 0, 28, 33, 36900, 38951, 41001, 0, 0, 0, 0, 57344,
  /*  9458 */ 57344, 57344, 57344, 57344, 57344, 57344, 57344, 57344, 0, 0, 0, 1, 0, 0, 0, 14357, 14357, 18455, 18455,
  /*  9477 */ 0, 0, 28, 28, 28, 28, 28, 33, 33, 33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1071104, 1071104, 1071104,
  /*  9503 */ 1071104, 1071104, 1173504, 1071104, 1071104, 1071104, 1071104, 1073152, 0, 119, 1095680, 1095680, 1095680,
  /*  9516 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1509376,
  /*  9527 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1093632,
  /*  9538 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 18455, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /*  9556 */ 0, 270, 0, 0, 275, 0, 0, 278, 0, 55, 55, 55, 55, 55, 55, 55, 55, 475, 1, 0, 0, 0, 14357, 18455, 0, 28, 33,
  /*  9583 */ 59429, 38951, 41001, 59392, 0, 0, 0, 52, 52, 52, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 880, 55, 55, 55,
  /*  9607 */ 55, 77, 1060881, 18, 0, 18, 14357, 18455, 0, 28, 33, 36900, 38951, 41001, 0, 0, 0, 0, 1075200, 0, 0, 0, 0,
  /*  9630 */ 1095680, 0, 0, 1071104, 1071104, 1071104, 1163264, 1060881, 0, 65536, 0, 14357, 14357, 18455, 18455, 0, 0,
  /*  9647 */ 28, 28, 28, 28, 28, 33, 33, 33, 0, 32768, 0, 38951, 0, 41001, 0, 0, 0, 0, 0, 0, 0, 946, 55, 55, 55, 55,
  /*  9673 */ 55, 55, 55, 55, 55, 964, 55, 55, 967, 55, 55, 55, 33, 33, 33, 36900, 0, 106, 38951, 0, 41001, 0, 0, 0, 0,
  /*  9698 */ 65536, 0, 0, 275, 0, 0, 278, 0, 55, 55, 55, 55, 55, 472, 55, 55, 55, 55, 55, 1189, 55, 55, 55, 55, 55, 77,
  /*  9724 */ 77, 77, 77, 77, 77, 77, 803, 77, 805, 77, 77, 77, 77, 77, 77, 55, 55, 55, 55, 55, 55, 55, 1303, 55, 1305,
  /*  9749 */ 1077248, 0, 1095680, 460, 0, 1071104, 464, 1071104, 1071104, 1071104, 1155072, 1071104, 1071104, 1071104,
  /*  9763 */ 1071104, 1071104, 1449984, 1071104, 1071104, 1071104, 1071104, 1480704, 1071104, 1071104, 1071104,
  /*  9774 */ 1071104, 1071104, 1071104, 1540096, 1, 0, 0, 0, 14357, 18455, 0, 28, 33, 36900, 38951, 41001, 45, 0, 0, 0,
  /*  9794 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 670, 55, 1, 0, 0, 0, 14357, 18455, 0, 28, 33, 38, 38, 38, 0,
  /*  9820 */ 0, 0, 0, 1075200, 0, 0, 0, 276, 1095680, 0, 279, 1071104, 1071104, 1071104, 1163264, 1093632, 1093632,
  /*  9837 */ 18455, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 459, 0, 0, 275, 0, 0, 278, 0, 55, 469, 55, 55, 55, 55, 55, 474, 55,
  /*  9865 */ 1, 0, 0, 0, 14357, 18455, 0, 28, 33, 36900, 63528, 41001, 63488, 0, 0, 0, 55, 55, 55, 55, 55, 55, 55, 55,
  /*  9889 */ 55, 55, 669, 55, 55, 1, 0, 19, 0, 14357, 18455, 0, 28, 34, 36900, 38951, 41001, 46, 0, 0, 0, 55, 55, 55,
  /*  9913 */ 55, 55, 55, 55, 55, 668, 55, 55, 55, 55, 55, 482, 55, 55, 55, 55, 55, 55, 55, 55, 55, 493, 1, 0, 0, 0,
  /*  9939 */ 14357, 14357, 18455, 18455, 0, 0, 28, 28, 28, 28, 28, 1103976, 1103976, 1103976, 36900, 0, 0, 38951, 0,
  /*  9958 */ 41001, 0, 0, 0, 0, 0, 0, 0, 1075200, 0, 0, 0, 277, 1095680, 0, 123, 1071104, 1071104, 1071104, 1163264,
  /*  9978 */ 33, 33, 79872, 36900, 0, 0, 38951, 0, 41001, 0, 0, 0, 0, 0, 0, 0, 1075200, 0, 266, 0, 121, 1095680, 0,
  /* 10001 */ 124, 1071104, 1071104, 1071104, 1163264, 1, 0, 0, 0, 14357, 18455, 0, 28, 33, 36900, 38951, 41001, 20527,
  /* 10019 */ 0, 0, 0, 55, 55, 55, 55, 55, 55, 55, 667, 55, 55, 55, 55, 671, 1077248, 0, 1095680, 0, 20480, 1071104, 0,
  /* 10042 */ 1071104, 1071104, 1071104, 1155072, 1071104, 1071104, 1071104, 1071104, 1071104, 1314816, 1327104,
  /* 10053 */ 1071104, 1071104, 1071104, 1372160, 1374208, 1071104, 1409024, 1071104, 1071104, 1423360, 1071104,
  /* 10064 */ 1071104, 1271808, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1310720, 1071104, 1071104,
  /* 10075 */ 1071104, 1071104, 1071104, 1335296, 1, 0, 0, 0, 14357, 18455, 0, 28, 33, 36900, 38951, 41001, 4096, 0, 0,
  /* 10094 */ 0, 55, 55, 55, 55, 55, 55, 55, 829, 55, 55, 55, 55, 55, 55, 483, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1127,
  /* 10120 */ 55, 55, 55, 55, 55, 55, 1, 0, 0, 0, 22, 18455, 0, 28, 33, 36900, 38951, 41001, 4096, 0, 0, 0, 55, 55, 55,
  /* 10145 */ 55, 55, 55, 828, 55, 55, 55, 55, 55, 55, 55, 532, 55, 55, 55, 537, 55, 55, 55, 55, 1, 0, 0, 0, 98, 99,
  /* 10171 */ 18455, 18455, 0, 0, 28, 28, 28, 43038, 43038, 33, 33, 33, 36900, 0, 0, 38951, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 10196 */ 660, 55, 55, 55, 55, 55, 666, 55, 55, 55, 55, 55, 55, 55, 1125, 1126, 55, 55, 55, 55, 1130, 1131, 55,
  /* 10219 */ 1073152, 0, 0, 52, 52, 52, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 553, 55, 77, 77, 77, 6257, 6257, 0,
  /* 10244 */ 0, 1075200, 272, 274, 0, 121, 52, 0, 124, 55, 55, 55, 55, 55, 55, 974, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 10269 */ 487, 55, 55, 55, 55, 55, 55, 77, 77, 18455, 0, 0, 0, 0, 0, 0, 0, 267, 0, 0, 270, 20751, 0, 55, 55, 55, 55,
  /* 10296 */ 55, 55, 1047, 55, 55, 55, 55, 55, 1051, 55, 55, 55, 55, 703, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 10321 */ 191, 77, 77, 77, 77, 1077248, 81920, 275, 0, 0, 278, 0, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 986, 55,
  /* 10345 */ 55, 989, 55, 55, 77, 1031, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 0, 0, 0, 0, 0, 55, 1121, 55,
  /* 10371 */ 55, 55, 1124, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1132, 55, 1186, 1187, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 10395 */ 77, 77, 77, 77, 77, 1288, 77, 77, 77, 55, 55, 55, 1222, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 1231, 77,
  /* 10420 */ 0, 643, 0, 0, 0, 0, 0, 0, 0, 820, 0, 462, 0, 0, 0, 55, 55, 55, 55, 55, 1046, 55, 55, 55, 55, 55, 55, 55,
  /* 10448 */ 55, 55, 1326, 1327, 55, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1237, 77, 77, 77, 77, 1241, 55, 55, 55, 55,
  /* 10472 */ 55, 55, 292, 55, 55, 55, 55, 55, 55, 55, 55, 55, 721, 722, 55, 55, 55, 55, 55, 1, 0, 0, 0, 14357, 18455,
  /* 10497 */ 0, 28, 33, 36900, 38951, 41001, 48, 0, 0, 0, 55, 55, 55, 55, 664, 55, 55, 55, 55, 55, 55, 55, 55, 486, 55,
  /* 10522 */ 55, 55, 55, 55, 55, 55, 1, 0, 0, 0, 14357, 14357, 18455, 18455, 0, 0, 28, 28, 28, 43038, 43038, 33, 33,
  /* 10545 */ 33, 36900, 0, 0, 38951, 0, 0, 0, 0, 524288, 0, 0, 0, 0, 55, 55, 55, 55, 1045, 55, 55, 55, 55, 1049, 55,
  /* 10570 */ 55, 55, 55, 55, 55, 679, 55, 55, 55, 55, 684, 55, 55, 55, 55, 1073269, 0, 0, 52, 52, 52, 55, 55, 55, 55,
  /* 10595 */ 55, 55, 55, 55, 55, 55, 55, 709, 710, 55, 55, 55, 77, 14357, 0, 18455, 18455, 28, 43038, 33, 33, 0, 0, 0,
  /* 10619 */ 0, 0, 0, 8304, 52, 52, 52, 55, 55, 55, 55, 55, 55, 55, 55, 55, 153, 6257, 6257, 0, 0, 1075200, 0, 0, 0,
  /* 10644 */ 121, 52, 0, 124, 55, 55, 55, 55, 55, 55, 985, 55, 55, 55, 55, 55, 55, 55, 55, 55, 534, 55, 55, 55, 55, 55,
  /* 10670 */ 55, 1077248, 0, 275, 0, 0, 278, 0, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1076, 55, 55, 55, 55, 55, 1, 0,
  /* 10696 */ 0, 0, 14357, 18455, 26, 28, 33, 36900, 38951, 41001, 0, 0, 0, 0, 55, 55, 55, 55, 826, 55, 55, 55, 55, 830,
  /* 10720 */ 55, 55, 55, 55, 55, 718, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 77, 77, 738, 77, 77, 77, 33, 33, 33,
  /* 10745 */ 36900, 0, 0, 38951, 0, 41001, 111, 0, 0, 0, 0, 0, 0, 55, 55, 55, 663, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 10771 */ 840, 55, 842, 55, 55, 55, 55, 1, 0, 0, 0, 14357, 18455, 0, 28, 33, 36900, 38951, 41001, 49, 0, 0, 0, 55,
  /* 10795 */ 55, 55, 825, 55, 55, 55, 55, 55, 55, 55, 55, 55, 358, 55, 55, 55, 55, 55, 77, 49, 0, 0, 52, 52, 52, 55,
  /* 10821 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 854, 55, 55, 55, 55, 77, 14357, 0, 18455, 18455, 28, 43038, 33,
  /* 10844 */ 33, 260, 0, 0, 0, 0, 0, 8304, 52, 52, 52, 55, 55, 55, 55, 55, 55, 55, 149, 55, 55, 6257, 6257, 0, 0, 117,
  /* 10870 */ 273, 0, 0, 121, 52, 0, 124, 55, 55, 55, 55, 55, 55, 1058, 55, 55, 55, 55, 55, 55, 55, 55, 55, 707, 55, 55,
  /* 10896 */ 55, 55, 55, 713, 77, 77, 18455, 260, 452, 0, 0, 0, 0, 0, 267, 0, 0, 270, 20751, 273, 0, 275, 0, 0, 278, 0,
  /* 10922 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1182, 55, 55, 55, 55, 55, 77, 77, 77, 452, 0, 0, 0, 0, 8649, 6602,
  /* 10948 */ 0, 648, 0, 0, 0, 654, 1, 0, 0, 0, 14357, 18455, 0, 28, 35, 36900, 38951, 41001, 50, 0, 0, 0, 55, 55, 662,
  /* 10973 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 336, 55, 55, 55, 55, 55, 1, 0, 0, 0, 14357, 14357, 18455, 18455,
  /* 10997 */ 0, 0, 28, 28, 28, 28, 28, 1103977, 67584, 1103977, 36900, 0, 0, 38951, 0, 41001, 0, 0, 0, 0, 67699, 116,
  /* 11019 */ 0, 55, 55, 1043, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1065, 1066, 55, 1073152, 0, 0,
  /* 11042 */ 1095800, 1095800, 1095800, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11053 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1243259, 1071227, 1071227, 269,
  /* 11065 */ 269, 0, 0, 1075200, 0, 0, 0, 121, 1095800, 0, 124, 1071227, 1071227, 1071227, 1163387, 1167483, 1071227,
  /* 11082 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11093 */ 1071227, 1263739, 1071227, 1071227, 1271931, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11104 */ 1310843, 1071227, 1071227, 1071227, 1071227, 1071227, 1335419, 1071227, 1366139, 1071227, 1071227,
  /* 11115 */ 1382523, 1071227, 1071227, 1071227, 1411195, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11126 */ 1071227, 1226875, 1071227, 1071227, 1071227, 1071227, 1071227, 1269883, 1071227, 1071227, 1093632,
  /* 11137 */ 1093632, 18455, 0, 0, 0, 0, 0, 0, 0, 456, 0, 0, 270, 0, 0, 275, 0, 0, 278, 0, 468, 55, 470, 55, 471, 55,
  /* 11163 */ 473, 55, 55, 55, 55, 545, 55, 55, 55, 55, 551, 55, 55, 55, 77, 77, 77, 0, 264, 0, 0, 643, 8649, 6602, 0,
  /* 11188 */ 0, 0, 0, 0, 0, 1077248, 0, 1095680, 0, 0, 1071104, 0, 1071227, 1071227, 1071227, 1155195, 1071227,
  /* 11205 */ 1071227, 1071227, 1071227, 1071227, 1216635, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11216 */ 1071227, 1253499, 1071227, 1265787, 1513595, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11227 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1093632, 1093632, 1093632, 1093632, 1339515,
  /* 11238 */ 1349755, 1362043, 1071227, 1071227, 1071227, 1392763, 1407099, 1071227, 1071227, 1071227, 1071227,
  /* 11249 */ 1071227, 1071227, 1071227, 1071227, 1554555, 1071227, 1093632, 1093632, 1093632, 1093632, 1093632,
  /* 11260 */ 1093632, 1071227, 1071227, 1276027, 1071227, 1071227, 1071227, 1304699, 1071227, 1319035, 1071227,
  /* 11271 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1351803, 1357947, 1071227, 1370235, 1071227,
  /* 11282 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1519739, 1093632, 1093632, 1200128, 1093632,
  /* 11293 */ 1093632, 1093632, 1228800, 1232896, 1394811, 1071227, 1413243, 1071227, 1071227, 1071227, 1071227,
  /* 11304 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1468539, 1071227, 1071227, 1486971, 1071227, 1071227,
  /* 11315 */ 1511547, 1071227, 1071227, 1521787, 1071227, 1071227, 1071227, 1536123, 1071227, 1071227, 1546363,
  /* 11326 */ 1548411, 1071227, 1144832, 1071227, 1071227, 1314939, 1327227, 1071227, 1071227, 1071227, 1372283,
  /* 11337 */ 1374331, 1071227, 1409147, 1071227, 1071227, 1423483, 1071227, 1071227, 1071227, 1259643, 1071227,
  /* 11348 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1282171, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11359 */ 1300603, 1071227, 1308795, 1071227, 1312891, 1071227, 1316987, 1337467, 1071227, 1071227, 1353851,
  /* 11370 */ 1448059, 1071227, 1452155, 1071227, 1071227, 1462395, 1071227, 1484923, 1493115, 1499259, 1071227,
  /* 11381 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1212539, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11392 */ 1071227, 1071227, 1071227, 1251451, 1071227, 1071227, 1071227, 1562747, 1093632, 1093632, 1093632,
  /* 11403 */ 1093632, 1093632, 1173504, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /* 11414 */ 1093632, 1519616, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1222779, 1224827, 1071227,
  /* 11425 */ 1071227, 1249403, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11436 */ 1071227, 1415291, 1149051, 1151099, 1071227, 1071227, 1171579, 1071227, 1185915, 1071227, 1071227,
  /* 11447 */ 1071227, 1210491, 1071227, 1071227, 1071227, 1071227, 1245307, 1071227, 1257595, 1273979, 1071227,
  /* 11458 */ 1071227, 1298555, 1329275, 1071227, 1071227, 1071227, 1417339, 1071227, 1071227, 1071227, 1071227,
  /* 11469 */ 1071227, 1456251, 1071227, 1071227, 1093632, 1093632, 1202176, 1093632, 1093632, 1093632, 1093632,
  /* 11480 */ 1093632, 1093632, 1513472, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /* 11491 */ 1093632, 1519616, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071227, 1071227, 1515643,
  /* 11502 */ 1071227, 1071227, 1527931, 1534075, 1538171, 1148928, 1150976, 1093632, 1093632, 1171456, 1093632,
  /* 11513 */ 1185792, 1093632, 14357, 0, 18455, 18455, 1065062, 1065062, 33, 33, 0, 0, 0, 0, 0, 0, 0, 659, 55, 55, 55,
  /* 11534 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 308, 55, 55, 1071227, 1165435, 1169531, 1071227, 1194107, 1071227,
  /* 11553 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1278075, 1290363, 1331323, 1333371,
  /* 11564 */ 1378427, 1435771, 1071227, 1454203, 1071227, 1460347, 1071227, 1071227, 1071227, 1525883, 1093632,
  /* 11575 */ 1165312, 1169408, 1093632, 1193984, 1093632, 1460224, 1093632, 1093632, 1093632, 1525760, 1071227,
  /* 11586 */ 1071227, 1200251, 1071227, 1071227, 1071227, 1228923, 1233019, 1071227, 1071227, 1071227, 1450107,
  /* 11597 */ 1071227, 1071227, 1071227, 1071227, 1480827, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 11608 */ 1540219, 1093632, 1093632, 1093632, 1456128, 1093632, 1093632, 1071227, 1071227, 1071227, 1071227,
  /* 11619 */ 1071227, 1247355, 1071227, 1071227, 1071227, 1071227, 1470587, 1071227, 1482875, 1071227, 1071227,
  /* 11630 */ 1071227, 1071227, 1501307, 1071227, 1071227, 1517691, 1071227, 1071227, 1175675, 1071227, 1218683,
  /* 11641 */ 1071227, 1255547, 1071227, 1380475, 1071227, 1071227, 1071227, 1466491, 1093632, 1175552, 1093632,
  /* 11652 */ 1218560, 1093632, 1255424, 1093632, 1380352, 1093632, 1093632, 1093632, 1466368, 1071227, 1214587,
  /* 11663 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1093632, 1093632, 1093632, 1093632, 1093632, 1247232,
  /* 11674 */ 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1277952, 1290240, 1331200,
  /* 11685 */ 1333248, 1378304, 1435648, 1093632, 1454080, 1214464, 1093632, 1093632, 1093632, 1093632, 1093632,
  /* 11696 */ 1153147, 1071227, 1071227, 1071227, 1071227, 1464443, 1153024, 1093632, 1093632, 1093632, 0, 0, 0, 455, 0,
  /* 11711 */ 0, 0, 0, 0, 0, 0, 0, 0, 55, 55, 55, 55, 55, 55, 55, 952, 55, 55, 1093632, 1464320, 1071227, 1280123,
  /* 11733 */ 1437819, 1071227, 1093632, 1280000, 1437696, 1093632, 1230971, 1071227, 1230848, 1093632, 1071227,
  /* 11744 */ 1093632, 1071227, 1093632, 1443963, 1443840, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 55, 824, 55, 55, 55, 55,
  /* 11766 */ 55, 55, 55, 55, 55, 831, 1093632, 1093632, 18455, 53248, 0, 0, 0, 30720, 0, 0, 0, 0, 0, 270, 0, 0, 275,
  /* 11789 */ 461, 0, 278, 465, 55, 55, 55, 55, 55, 55, 55, 55, 55, 302, 55, 55, 55, 55, 55, 55, 1093632, 1093632,
  /* 11811 */ 1093632, 53248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 661, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 11838 */ 536, 55, 55, 55, 55, 1093632, 1521664, 1093632, 1093632, 1093632, 1536000, 1093632, 1093632, 1546240,
  /* 11852 */ 1548288, 1093632, 0, 270, 0, 0, 0, 55, 823, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1184, 55, 55,
  /* 11876 */ 55, 1093632, 1462272, 1093632, 1484800, 1492992, 1499136, 1093632, 1093632, 1093632, 1093632, 1093632,
  /* 11888 */ 1093632, 1093632, 1562624, 0, 270, 0, 121, 0, 124, 0, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 11903 */ 1173504, 1071104, 1071104, 1071104, 1071104, 1511424, 1071104, 1071104, 1521664, 1071104, 1071104,
  /* 11914 */ 1071104, 1536000, 1071104, 1071104, 1546240, 1548288, 1071104, 1144832, 1, 0, 0, 0, 14357, 18455, 0, 28,
  /* 11930 */ 33, 36900, 38951, 42, 4147, 0, 0, 0, 652, 0, 658, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 552, 55, 55, 77,
  /* 11955 */ 77, 77, 1073152, 4096, 0, 1095680, 1095680, 1095680, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 11969 */ 1071104, 1071104, 1071104, 1071104, 1515520, 1071104, 1071104, 1527808, 1533952, 1538048, 1148928,
  /* 11980 */ 1150976, 1093632, 1093632, 1171456, 1093632, 1185792, 1093632, 1, 0, 0, 0, 14357, 18455, 88064, 28, 33,
  /* 11996 */ 36900, 38951, 41001, 4096, 0, 0, 0, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 12010 */ 1071104, 1071104, 1181696, 1183744, 1071104, 1071104, 1, 0, 0, 0, 14357, 14357, 18455, 18455, 0, 77824,
  /* 12026 */ 28, 28, 90112, 28, 28, 33, 33, 33, 36900, 0, 0, 38951, 0, 0, 0, 520192, 0, 0, 0, 0, 0, 55, 1042, 55, 55,
  /* 12051 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 882, 77, 1093632, 14357, 75776, 18455, 94208, 0, 28, 33,
  /* 12073 */ 33, 0, 0, 0, 0, 0, 0, 0, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 12090 */ 1181819, 1183867, 1071227, 1071227, 1093632, 1093632, 0, 0, 0, 0, 0, 0, 0, 0, 10240, 0, 0, 270, 0, 0, 275,
  /* 12111 */ 462, 0, 278, 466, 55, 55, 55, 55, 55, 55, 55, 55, 55, 502, 55, 55, 55, 55, 55, 55, 1093632, 1093632,
  /* 12133 */ 1093632, 0, 0, 0, 10240, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1144832, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 12153 */ 1071104, 1071104, 1177600, 1071104, 1187840, 1191936, 1071104, 1, 0, 0, 0, 14357, 18455, 0, 1064989, 33,
  /* 12169 */ 36900, 38951, 41001, 0, 0, 0, 0, 275, 463, 0, 278, 467, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1061, 55, 55,
  /* 12193 */ 55, 55, 55, 55, 1, 0, 0, 0, 14357, 14357, 18455, 18455, 0, 0, 1065062, 1065062, 1065062, 1065062, 1065062,
  /* 12212 */ 33, 33, 33, 36900, 0, 0, 38951, 0, 41001, 0, 0, 0, 0, 0, 0, 0, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 12239 */ 55, 55, 55, 55, 55, 77, 1073152, 0, 86016, 1095680, 1095680, 1095680, 1071104, 1071104, 1071104, 1071104,
  /* 12255 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1257472, 1273856, 1071104, 1071104, 1298432,
  /* 12266 */ 1329152, 1071104, 1071104, 1071104, 1417216, 1071104, 1071104, 1071104, 1071104, 1071104, 1456128,
  /* 12277 */ 1071104, 1071104, 1093632, 1093632, 1202176, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632,
  /* 12288 */ 1093632, 1509376, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1071104,
  /* 12299 */ 1071104, 1202176, 1071104, 1071104, 1071104, 1071104, 1071104, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33,
  /* 12315 */ 36900, 38951, 41001, 52, 55, 55, 77, 77, 995, 77, 77, 77, 77, 77, 1000, 77, 77, 77, 77, 77, 77, 77, 790,
  /* 12338 */ 77, 77, 77, 77, 77, 77, 795, 77, 33, 33, 33, 36900, 0, 0, 38951, 0, 41001, 8304, 0, 0, 6257, 0, 0, 0, 819,
  /* 12363 */ 0, 821, 0, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1050, 55, 55, 55, 55, 77, 14357, 0, 18455, 18455, 28,
  /* 12387 */ 43038, 33, 33, 0, 0, 0, 0, 0, 267, 8304, 6257, 6257, 0, 20751, 0, 0, 0, 275, 121, 52, 278, 124, 55, 55,
  /* 12411 */ 55, 55, 55, 55, 1072, 1074, 55, 55, 55, 1077, 55, 1079, 1080, 55, 77, 77, 18455, 0, 452, 0, 0, 0, 0, 0,
  /* 12435 */ 267, 8649, 6602, 270, 20751, 0, 124, 0, 1144832, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 12450 */ 1071104, 1177600, 1071104, 1187840, 1191936, 1071104, 1175552, 1071104, 1218560, 1071104, 1255424,
  /* 12461 */ 1071104, 1380352, 1071104, 1071104, 1071104, 1466368, 1093632, 1175552, 1093632, 1218560, 77, 77, 77, 452,
  /* 12475 */ 0, 0, 0, 643, 8649, 6602, 0, 0, 0, 0, 0, 0, 8304, 52, 52, 52, 55, 55, 55, 55, 55, 55, 141, 55, 55, 155,
  /* 12501 */ 77, 812, 643, 0, 0, 0, 0, 0, 819, 0, 0, 0, 0, 0, 821, 0, 646, 0, 0, 0, 0, 55, 947, 55, 55, 55, 55, 55, 55,
  /* 12530 */ 55, 55, 681, 55, 55, 55, 55, 55, 55, 55, 77, 77, 18455, 0, 452, 0, 0, 0, 0, 454, 267, 8649, 6602, 270,
  /* 12554 */ 20751, 0, 61440, 0, 0, 14357, 14357, 18455, 18455, 0, 0, 28, 28, 28, 28, 28, 33, 33, 33, 36900, 0, 0, 0,
  /* 12577 */ 34816, 41001, 0, 0, 0, 0, 0, 0, 0, 1071227, 1071227, 1071227, 1071227, 1071227, 1173627, 1071227, 1071227,
  /* 12594 */ 1071227, 1071227, 77, 77, 77, 452, 0, 642, 0, 643, 8649, 6602, 0, 0, 0, 0, 0, 0, 8304, 52, 52, 52, 55, 55,
  /* 12618 */ 55, 55, 55, 55, 143, 55, 55, 55, 55, 55, 1177, 55, 55, 55, 1181, 55, 55, 55, 55, 55, 55, 176, 55, 55, 55,
  /* 12643 */ 55, 55, 77, 193, 77, 77, 118, 0, 8304, 52, 52, 52, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 881, 55,
  /* 12668 */ 55, 55, 77, 6257, 6257, 0, 20751, 118, 0, 0, 275, 121, 52, 278, 124, 55, 55, 55, 55, 55, 55, 1178, 55, 55,
  /* 12692 */ 55, 55, 55, 55, 55, 55, 55, 735, 736, 77, 77, 77, 77, 77, 77, 77, 18455, 0, 0, 0, 0, 0, 0, 0, 267, 8649,
  /* 12718 */ 6602, 270, 20751, 0, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1198080,
  /* 12731 */ 1071104, 1071104, 1208320, 1071104, 1071104, 1071104, 1259520, 1071104, 1071104, 1071104, 1071104,
  /* 12742 */ 1071104, 1071104, 1282048, 1071104, 1071104, 1071104, 1071104, 1071104, 1300480, 1071104, 1308672,
  /* 12753 */ 1071104, 1312768, 1071104, 1316864, 1337344, 1071104, 1071104, 1353728, 77, 14357, 0, 18455, 18455, 28,
  /* 12767 */ 30, 33, 33, 0, 0, 0, 0, 0, 267, 8304, 1, 0, 0, 0, 14357, 14357, 18455, 18455, 0, 0, 28, 28, 28, 43038,
  /* 12791 */ 43111, 33, 33, 33, 36900, 0, 0, 38951, 0, 41001, 0, 0, 0, 0, 0, 0, 117, 1, 0, 0, 0, 14357, 18455, 0,
  /* 12815 */ 43038, 33, 36900, 38951, 41001, 53, 56, 56, 77, 0, 643, 0, 0, 0, 0, 0, 819, 0, 0, 0, 0, 0, 821, 0, 1041,
  /* 12840 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 979, 33, 33, 33, 36900, 0, 0, 38951, 0, 41001,
  /* 12865 */ 8304, 0, 0, 6258, 0, 0, 0, 8304, 52, 52, 52, 55, 55, 55, 55, 55, 55, 144, 55, 55, 55, 55, 317, 55, 55, 55,
  /* 12891 */ 55, 55, 55, 55, 55, 55, 55, 55, 322, 55, 55, 325, 55, 1, 0, 0, 0, 14357, 18455, 0, 43039, 33, 36900,
  /* 12914 */ 38951, 41001, 52, 55, 55, 77, 994, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 570, 77, 77, 77,
  /* 12937 */ 1093632, 1093632, 1449984, 1093632, 1093632, 1093632, 1093632, 1480704, 1093632, 1093632, 1093632,
  /* 12948 */ 1093632, 1093632, 1093632, 1540096, 83968, 1, 0, 0, 0, 14357, 18456, 0, 28, 33, 36900, 38951, 41001, 0, 0,
  /* 12967 */ 0, 0, 8304, 52, 52, 52, 55, 55, 55, 55, 135, 55, 55, 55, 55, 55, 55, 548, 55, 55, 55, 55, 55, 55, 77, 77,
  /* 12993 */ 77, 1, 0, 0, 0, 14357, 14357, 18532, 18533, 0, 0, 28, 28, 28, 28, 28, 33, 33, 33, 36900, 0, 0, 38951, 0,
  /* 13017 */ 41001, 110, 0, 0, 0, 0, 0, 0, 55, 55, 948, 55, 55, 55, 55, 55, 953, 55, 1093632, 14357, 0, 18691, 18691,
  /* 13040 */ 28, 28, 33, 33, 0, 0, 0, 0, 0, 0, 0, 8304, 52, 52, 52, 55, 55, 55, 130, 134, 55, 55, 55, 55, 55, 55, 318,
  /* 13067 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 975, 55, 55, 55, 55, 55, 55, 1093632, 1093632, 18691, 0, 0, 0, 0, 0,
  /* 13091 */ 0, 0, 0, 0, 0, 270, 0, 0, 8304, 52, 52, 52, 55, 55, 55, 132, 136, 139, 55, 147, 55, 55, 55, 55, 677, 55,
  /* 13117 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 977, 55, 55, 55, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33,
  /* 13141 */ 36900, 38951, 41001, 52, 57, 57, 78, 33, 33, 33, 36900, 0, 107, 38951, 0, 41001, 8304, 0, 0, 6257, 0, 0,
  /* 13163 */ 0, 8304, 52, 52, 52, 55, 55, 55, 133, 55, 55, 55, 55, 151, 55, 159, 55, 164, 55, 170, 55, 173, 55, 55,
  /* 13187 */ 187, 55, 55, 77, 77, 197, 201, 55, 348, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77,
  /* 13212 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 434, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1174, 77, 77,
  /* 13238 */ 77, 476, 55, 55, 55, 55, 55, 55, 55, 55, 55, 489, 55, 55, 55, 55, 55, 55, 332, 55, 55, 55, 55, 55, 55, 55,
  /* 13264 */ 345, 55, 55, 526, 55, 55, 529, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 541, 576, 77, 77, 77, 77, 77, 77,
  /* 13289 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 0, 0, 77, 77, 77, 452, 0, 0, 0, 643, 8649, 6602, 645, 0, 0, 0, 0,
  /* 13316 */ 0, 8304, 52, 52, 52, 55, 55, 125, 55, 55, 55, 55, 55, 55, 154, 672, 55, 55, 55, 55, 55, 55, 680, 55, 55,
  /* 13341 */ 55, 55, 55, 55, 55, 55, 77, 1148, 77, 77, 77, 1151, 77, 77, 77, 77, 77, 77, 745, 77, 77, 748, 77, 77, 77,
  /* 13366 */ 77, 77, 77, 756, 77, 0, 643, 0, 0, 817, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 77, 77, 77, 775, 77, 77, 77, 77,
  /* 13395 */ 77, 77, 77, 77, 77, 77, 77, 241, 77, 77, 77, 77, 77, 77, 897, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 13421 */ 77, 77, 406, 77, 77, 77, 77, 77, 77, 939, 77, 77, 77, 77, 77, 77, 0, 0, 944, 0, 0, 8304, 52, 52, 52, 55,
  /* 13447 */ 55, 126, 55, 55, 55, 140, 55, 55, 55, 55, 55, 961, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1183, 55,
  /* 13472 */ 55, 55, 55, 955, 55, 55, 959, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 968, 55, 55, 55, 55, 1135, 55, 55,
  /* 13497 */ 55, 55, 55, 55, 55, 1140, 55, 55, 55, 55, 55, 1057, 55, 55, 55, 55, 55, 1063, 55, 55, 55, 55, 55, 55,
  /* 13521 */ 1324, 55, 1325, 55, 55, 55, 77, 77, 77, 77, 77, 77, 77, 1013, 77, 77, 77, 77, 77, 77, 77, 77, 749, 77,
  /* 13545 */ 751, 77, 77, 77, 77, 77, 55, 55, 1054, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1143,
  /* 13570 */ 77, 1094, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 0, 944, 77, 77, 77, 77, 1111, 77, 1113,
  /* 13595 */ 77, 77, 77, 77, 77, 77, 77, 77, 0, 0, 0, 0, 643, 8649, 6602, 0, 0, 0, 0, 653, 0, 1, 0, 0, 0, 14357, 18455,
  /* 13622 */ 0, 43038, 33, 36900, 38951, 41001, 52, 58, 58, 79, 55, 542, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 13645 */ 77, 77, 77, 1194, 77, 77, 623, 77, 77, 77, 77, 77, 629, 77, 77, 77, 77, 77, 77, 77, 77, 55, 55, 55, 1337,
  /* 13670 */ 1338, 55, 55, 77, 77, 77, 77, 886, 77, 77, 77, 77, 890, 77, 77, 77, 77, 77, 77, 77, 77, 1240, 77, 55, 55,
  /* 13695 */ 55, 55, 1245, 55, 1278, 55, 1280, 55, 55, 1282, 55, 77, 77, 77, 77, 77, 77, 77, 77, 1291, 77, 1293, 77,
  /* 13718 */ 77, 1295, 77, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 966, 55, 55, 55, 55, 1, 0, 0, 0, 14357, 18455,
  /* 13743 */ 0, 43038, 33, 36900, 38951, 41001, 52, 59, 59, 80, 6257, 6257, 0, 20751, 0, 0, 0, 275, 121, 52, 278, 124,
  /* 13765 */ 55, 55, 282, 284, 310, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 346, 77, 368, 370, 77,
  /* 13790 */ 77, 77, 77, 77, 77, 77, 77, 384, 77, 389, 77, 77, 55, 55, 55, 55, 77, 77, 77, 77, 55, 55, 77, 77, 55, 77,
  /* 13816 */ 55, 77, 55, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 55, 55, 55, 55, 827, 55, 55, 55, 55, 55, 55, 55, 485,
  /* 13844 */ 55, 55, 55, 55, 55, 55, 55, 55, 1137, 55, 55, 55, 55, 55, 1142, 55, 393, 77, 77, 396, 77, 77, 77, 77, 77,
  /* 13869 */ 77, 77, 77, 77, 77, 77, 77, 251, 77, 77, 77, 55, 55, 479, 55, 55, 55, 55, 55, 55, 55, 55, 55, 491, 55, 55,
  /* 13895 */ 55, 55, 55, 732, 55, 55, 55, 55, 77, 77, 77, 77, 740, 77, 525, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 13921 */ 55, 55, 55, 55, 524, 77, 77, 578, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 572, 77, 77, 77, 77,
  /* 13947 */ 591, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 602, 77, 77, 797, 798, 77, 77, 77, 77, 77, 77,
  /* 13972 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 908, 77, 77, 77, 926, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 13998 */ 388, 77, 77, 77, 1019, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 256, 55, 55, 55, 1146,
  /* 14023 */ 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1002, 77, 77, 1006, 1, 0, 0, 0, 14357, 18455, 0,
  /* 14048 */ 43038, 33, 36900, 38951, 41001, 54, 60, 60, 81, 77, 77, 77, 77, 220, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 14071 */ 77, 77, 246, 77, 77, 77, 77, 6257, 6257, 0, 20751, 0, 0, 0, 275, 121, 52, 278, 124, 55, 55, 283, 55, 55,
  /* 14095 */ 55, 55, 1147, 55, 55, 55, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1001, 77, 1004, 77, 77, 55, 55, 329, 55, 55,
  /* 14120 */ 331, 55, 55, 334, 55, 55, 55, 55, 55, 55, 55, 183, 55, 55, 55, 55, 77, 77, 77, 77, 77, 369, 77, 77, 77,
  /* 14145 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1163, 394, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 14171 */ 77, 407, 77, 0, 643, 0, 815, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 727, 55, 729, 55, 55, 55, 55, 55, 55, 55,
  /* 14199 */ 77, 77, 77, 77, 77, 77, 1289, 77, 77, 77, 743, 77, 77, 77, 77, 747, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 14224 */ 418, 77, 77, 77, 77, 77, 77, 77, 77, 885, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 619, 77, 77,
  /* 14250 */ 923, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 574, 55, 55, 55, 982, 55, 55, 55, 55, 55,
  /* 14276 */ 55, 55, 55, 55, 55, 55, 55, 55, 505, 55, 55, 77, 77, 77, 77, 1010, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 14302 */ 77, 569, 77, 77, 77, 77, 1247, 55, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 1262, 55, 1279, 55,
  /* 14327 */ 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1292, 77, 77, 77, 77, 77, 55, 55,
  /* 14353 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 976, 55, 55, 55, 55, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33, 36900,
  /* 14377 */ 38951, 41001, 52, 61, 61, 82, 118, 0, 8304, 52, 52, 52, 55, 55, 55, 131, 55, 137, 55, 55, 150, 55, 55, 55,
  /* 14401 */ 55, 1223, 55, 55, 55, 77, 77, 77, 1228, 77, 77, 77, 77, 77, 77, 416, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 14426 */ 631, 77, 77, 77, 77, 77, 77, 160, 55, 165, 55, 55, 172, 175, 180, 55, 188, 55, 55, 77, 77, 198, 77, 0,
  /* 14450 */ 643, 0, 816, 0, 0, 0, 0, 652, 0, 0, 0, 0, 0, 658, 0, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 14478 */ 55, 990, 55, 204, 77, 77, 217, 77, 227, 77, 232, 77, 77, 239, 242, 247, 77, 255, 77, 0, 643, 813, 0, 0, 0,
  /* 14503 */ 648, 819, 0, 0, 0, 0, 654, 821, 0, 55, 55, 55, 1044, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 520, 55,
  /* 14529 */ 55, 55, 55, 77, 77, 395, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 755, 77, 77, 410, 77, 77, 77,
  /* 14555 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 422, 77, 77, 55, 55, 55, 55, 77, 77, 77, 77, 55, 55, 77, 77, 1361,
  /* 14580 */ 1362, 55, 477, 55, 55, 55, 55, 55, 55, 55, 55, 55, 490, 55, 55, 55, 55, 55, 55, 1225, 55, 77, 77, 77, 77,
  /* 14605 */ 77, 77, 77, 77, 438, 77, 77, 77, 77, 77, 77, 448, 494, 55, 55, 55, 55, 498, 55, 500, 55, 55, 55, 55, 55,
  /* 14630 */ 55, 55, 55, 357, 55, 55, 55, 55, 55, 55, 77, 508, 509, 511, 55, 55, 55, 55, 55, 55, 518, 519, 55, 55, 522,
  /* 14655 */ 523, 55, 55, 55, 167, 55, 55, 55, 55, 185, 55, 55, 55, 77, 194, 77, 77, 77, 77, 77, 77, 1033, 77, 77,
  /* 14679 */ 1036, 77, 77, 1039, 77, 0, 0, 18455, 18455, 28, 43038, 33, 33, 0, 0, 0, 0, 0, 0, 8304, 52, 52, 52, 55, 55,
  /* 14704 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 870, 55, 55, 55, 55, 55, 55, 543, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 14730 */ 554, 555, 77, 557, 77, 558, 77, 560, 77, 77, 77, 564, 77, 77, 77, 77, 77, 77, 77, 77, 55, 55, 1336, 55,
  /* 14754 */ 55, 55, 1340, 77, 77, 577, 77, 77, 77, 77, 581, 77, 77, 77, 77, 585, 77, 587, 77, 77, 55, 55, 55, 55, 77,
  /* 14779 */ 77, 77, 77, 55, 1359, 77, 1360, 55, 77, 606, 77, 77, 609, 610, 77, 77, 77, 77, 77, 77, 77, 618, 77, 77,
  /* 14803 */ 77, 0, 0, 0, 0, 643, 8649, 6602, 0, 0, 0, 652, 0, 0, 622, 77, 77, 77, 77, 77, 77, 77, 630, 77, 77, 77, 77,
  /* 14830 */ 77, 77, 77, 77, 1271, 55, 55, 55, 55, 55, 55, 55, 184, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 641, 452,
  /* 14855 */ 0, 0, 0, 643, 8649, 6602, 0, 0, 0, 0, 0, 0, 8304, 52, 52, 52, 55, 55, 129, 55, 55, 55, 55, 148, 152, 158,
  /* 14881 */ 55, 673, 55, 675, 55, 55, 55, 55, 55, 55, 683, 55, 685, 55, 55, 55, 55, 55, 850, 55, 55, 55, 55, 55, 55,
  /* 14906 */ 55, 55, 55, 55, 77, 737, 77, 77, 77, 77, 55, 55, 55, 717, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 14932 */ 55, 539, 540, 55, 55, 55, 55, 730, 55, 55, 733, 734, 55, 55, 77, 77, 77, 77, 77, 77, 77, 999, 77, 77, 77,
  /* 14957 */ 77, 77, 77, 77, 759, 77, 761, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 421, 77, 77, 77, 77, 77,
  /* 14982 */ 785, 786, 77, 77, 77, 77, 77, 77, 793, 77, 77, 77, 77, 77, 77, 55, 55, 55, 1300, 55, 55, 55, 55, 55, 55,
  /* 15007 */ 179, 55, 55, 55, 55, 55, 77, 77, 77, 77, 55, 55, 860, 55, 55, 55, 865, 55, 55, 55, 55, 55, 55, 55, 872,
  /* 15032 */ 55, 55, 55, 168, 55, 55, 55, 55, 186, 55, 55, 55, 77, 77, 77, 77, 77, 77, 437, 77, 77, 77, 77, 77, 77, 77,
  /* 15058 */ 77, 77, 1101, 77, 77, 77, 77, 77, 77, 77, 77, 77, 925, 77, 77, 77, 77, 77, 77, 77, 932, 77, 77, 77, 77,
  /* 15083 */ 77, 77, 55, 55, 1348, 1349, 55, 55, 77, 77, 1352, 1353, 77, 77, 937, 77, 77, 77, 77, 77, 77, 77, 77, 0, 0,
  /* 15108 */ 944, 0, 0, 8304, 52, 52, 122, 55, 55, 55, 55, 55, 138, 55, 146, 55, 55, 55, 55, 691, 55, 55, 694, 55, 55,
  /* 15133 */ 55, 55, 55, 55, 55, 55, 963, 55, 55, 55, 55, 55, 55, 55, 55, 980, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 15159 */ 55, 55, 55, 55, 55, 969, 77, 1008, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 408, 77, 77,
  /* 15184 */ 77, 1021, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1027, 77, 77, 55, 55, 55, 1356, 77, 77, 77, 1358, 55,
  /* 15208 */ 55, 77, 77, 55, 77, 1365, 1366, 55, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8304, 52, 52, 52, 55, 55, 128, 55,
  /* 15235 */ 55, 55, 55, 55, 55, 157, 77, 77, 77, 77, 1097, 77, 77, 77, 77, 77, 1103, 77, 77, 77, 77, 77, 77, 55, 1212,
  /* 15260 */ 55, 55, 1214, 55, 55, 55, 55, 55, 55, 531, 55, 55, 55, 535, 55, 55, 55, 55, 55, 55, 547, 549, 55, 55, 55,
  /* 15285 */ 55, 55, 77, 77, 77, 996, 77, 77, 77, 77, 77, 77, 1003, 77, 1005, 77, 77, 77, 77, 77, 77, 1112, 1114, 77,
  /* 15309 */ 77, 77, 1117, 77, 1119, 1120, 77, 0, 643, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 55, 55, 55, 55, 665,
  /* 15337 */ 55, 55, 55, 55, 55, 55, 55, 55, 1255, 77, 77, 77, 77, 77, 77, 77, 77, 1160, 77, 77, 77, 77, 77, 77, 77,
  /* 15362 */ 77, 1203, 77, 77, 77, 1204, 1205, 77, 77, 55, 55, 55, 1123, 55, 55, 55, 55, 55, 55, 55, 1128, 55, 55, 55,
  /* 15386 */ 55, 55, 352, 55, 55, 55, 55, 55, 55, 362, 55, 55, 77, 77, 77, 77, 1155, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 15411 */ 77, 77, 77, 77, 444, 77, 77, 77, 77, 1165, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 424,
  /* 15436 */ 77, 77, 77, 77, 1209, 77, 77, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1218, 77, 1233, 77, 77, 77, 77, 77, 77,
  /* 15461 */ 77, 77, 55, 55, 55, 55, 55, 55, 55, 77, 55, 55, 55, 1309, 1310, 1311, 77, 77, 77, 1314, 77, 1316, 77, 77,
  /* 15485 */ 77, 77, 77, 77, 77, 1023, 77, 77, 77, 77, 77, 77, 77, 1029, 77, 1342, 77, 77, 77, 1346, 55, 55, 55, 55,
  /* 15509 */ 55, 55, 77, 77, 77, 77, 77, 77, 77, 1088, 77, 77, 77, 77, 77, 77, 77, 77, 583, 77, 77, 77, 77, 77, 77, 77,
  /* 15535 */ 1, 0, 0, 0, 14357, 18455, 0, 43038, 33, 36900, 38951, 41001, 52, 62, 62, 83, 77, 77, 77, 77, 221, 77, 77,
  /* 15558 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 753, 77, 77, 77, 77, 55, 55, 287, 55, 55, 55, 55, 55, 299, 55, 55, 55,
  /* 15584 */ 55, 55, 55, 55, 293, 300, 55, 55, 55, 55, 55, 55, 55, 294, 55, 55, 55, 55, 55, 55, 55, 55, 517, 55, 55,
  /* 15609 */ 55, 55, 55, 55, 55, 55, 55, 55, 702, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 699, 55, 55, 77,
  /* 15635 */ 77, 77, 77, 1156, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 779, 77, 77, 77, 77, 77, 77, 1355, 55, 55,
  /* 15660 */ 55, 1357, 77, 77, 77, 55, 55, 77, 77, 55, 77, 0, 643, 814, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  /* 15690 */ 14357, 18455, 0, 43038, 33, 36900, 38951, 41001, 52, 63, 63, 84, 33, 33, 33, 36900, 0, 108, 38951, 0,
  /* 15710 */ 41001, 8304, 0, 0, 6257, 0, 0, 0, 69632, 0, 1075200, 0, 0, 0, 121, 1095680, 0, 124, 1071104, 1071104,
  /* 15730 */ 1071104, 1163264, 77, 77, 1032, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 0, 0, 0, 817, 0, 1067, 55, 55,
  /* 15754 */ 55, 55, 55, 55, 55, 55, 1075, 55, 55, 1078, 55, 55, 55, 55, 55, 864, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 15779 */ 55, 359, 55, 55, 55, 55, 77, 1081, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 589, 55,
  /* 15804 */ 55, 1122, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 326, 55, 55, 55, 55, 1134, 55, 55, 55,
  /* 15829 */ 55, 55, 55, 55, 1139, 55, 1141, 55, 55, 55, 55, 731, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 77, 1315,
  /* 15854 */ 77, 1317, 77, 77, 77, 77, 77, 77, 1166, 77, 1168, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 382, 77, 77, 77,
  /* 15879 */ 77, 392, 55, 55, 55, 1188, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 55, 1347, 55, 55, 55, 55,
  /* 15904 */ 77, 1351, 77, 77, 77, 77, 77, 77, 77, 1200, 77, 77, 77, 77, 77, 77, 77, 77, 1206, 77, 77, 77, 77, 77, 226,
  /* 15929 */ 77, 231, 77, 237, 77, 240, 77, 77, 254, 77, 0, 643, 0, 0, 0, 818, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1071227,
  /* 15955 */ 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227, 1198203, 1071227, 1071227, 1208443,
  /* 15966 */ 1071227, 1071227, 1071227, 1071227, 1509499, 1071227, 1071227, 1071227, 1071227, 1071227, 1071227,
  /* 15977 */ 1071227, 1071227, 1071227, 1071227, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 1093632, 429,
  /* 15989 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 621, 77, 640, 77, 0, 0, 0, 0, 643, 8649, 6602,
  /* 16015 */ 0, 0, 0, 0, 0, 0, 55, 874, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 77, 192, 77, 77, 77, 77,
  /* 16042 */ 77, 77, 1210, 77, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1193, 77, 77, 77, 77, 1, 0, 0, 0, 14357,
  /* 16067 */ 18455, 0, 43038, 33, 36900, 38951, 41001, 52, 64, 64, 85, 205, 77, 213, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 16089 */ 77, 77, 77, 77, 257, 311, 55, 55, 55, 55, 55, 55, 55, 319, 55, 55, 55, 55, 55, 55, 55, 295, 55, 55, 55,
  /* 16114 */ 55, 55, 55, 55, 55, 533, 55, 55, 55, 55, 55, 55, 55, 55, 55, 350, 55, 55, 55, 55, 55, 356, 55, 55, 55,
  /* 16139 */ 363, 55, 55, 77, 77, 77, 77, 77, 373, 77, 77, 77, 77, 77, 385, 77, 77, 77, 77, 77, 77, 77, 1100, 77, 1102,
  /* 16164 */ 77, 77, 77, 77, 77, 77, 55, 55, 55, 1213, 55, 55, 55, 55, 1217, 55, 77, 77, 77, 397, 77, 77, 77, 77, 77,
  /* 16189 */ 77, 77, 405, 77, 77, 77, 77, 77, 77, 77, 1159, 77, 77, 77, 77, 77, 77, 77, 77, 55, 55, 55, 55, 55, 1275,
  /* 16214 */ 55, 55, 77, 77, 432, 77, 77, 436, 77, 77, 77, 77, 77, 442, 77, 77, 77, 449, 77, 77, 608, 77, 77, 77, 77,
  /* 16239 */ 77, 77, 77, 77, 617, 77, 77, 77, 77, 77, 77, 77, 1170, 77, 77, 77, 77, 77, 77, 77, 77, 765, 77, 77, 77,
  /* 16264 */ 77, 769, 77, 771, 77, 77, 625, 77, 77, 77, 77, 77, 77, 77, 77, 77, 634, 636, 77, 77, 77, 77, 77, 77, 913,
  /* 16289 */ 77, 77, 77, 77, 77, 77, 919, 77, 77, 77, 77, 77, 77, 929, 77, 77, 77, 77, 77, 77, 77, 77, 77, 600, 77, 77,
  /* 16315 */ 77, 77, 77, 77, 55, 55, 55, 676, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 711, 55, 55, 55, 55,
  /* 16341 */ 861, 55, 55, 55, 55, 55, 55, 868, 55, 55, 55, 55, 55, 55, 55, 866, 55, 55, 55, 55, 55, 55, 55, 55, 298,
  /* 16366 */ 55, 303, 55, 55, 307, 55, 55, 55, 55, 55, 875, 55, 55, 55, 878, 55, 55, 55, 55, 55, 55, 55, 77, 1285, 77,
  /* 16391 */ 1286, 77, 77, 77, 1290, 77, 883, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 757, 77, 910,
  /* 16416 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 921, 77, 77, 77, 77, 77, 400, 77, 77, 77, 77, 77, 77, 77,
  /* 16442 */ 77, 77, 77, 584, 77, 77, 77, 77, 77, 77, 77, 77, 938, 77, 77, 77, 77, 77, 77, 77, 0, 0, 0, 0, 0, 8649,
  /* 16468 */ 6602, 0, 0, 0, 0, 0, 0, 970, 55, 55, 55, 55, 973, 55, 55, 55, 55, 55, 55, 55, 55, 978, 55, 55, 55, 169,
  /* 16494 */ 171, 55, 55, 182, 55, 55, 55, 55, 77, 77, 200, 77, 77, 77, 77, 77, 415, 77, 77, 417, 77, 77, 420, 77, 77,
  /* 16519 */ 77, 77, 77, 77, 77, 941, 77, 77, 77, 0, 0, 0, 0, 945, 55, 55, 981, 55, 983, 55, 55, 55, 55, 55, 55, 987,
  /* 16545 */ 55, 55, 55, 55, 55, 353, 55, 55, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 1260, 77, 77, 77, 1020, 77,
  /* 16570 */ 77, 77, 77, 77, 77, 77, 77, 1025, 77, 77, 77, 1028, 77, 77, 77, 77, 77, 562, 77, 77, 77, 77, 77, 77, 77,
  /* 16595 */ 77, 573, 77, 77, 77, 77, 77, 580, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 752, 77, 77, 77, 77, 77, 1030,
  /* 16620 */ 77, 77, 77, 77, 77, 77, 1034, 77, 77, 77, 77, 77, 77, 0, 0, 0, 0, 643, 8649, 6602, 0, 0, 0, 0, 0, 0, 55,
  /* 16647 */ 55, 1055, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 365, 77, 55, 55, 1069, 55, 55, 55, 55,
  /* 16672 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 492, 55, 77, 77, 77, 77, 1085, 77, 77, 77, 77, 1089, 77, 77, 77,
  /* 16697 */ 77, 77, 77, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 1313, 77, 77, 77, 77, 77, 77, 77, 77, 55, 55, 55, 55,
  /* 16723 */ 55, 1339, 55, 77, 77, 1095, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 425, 77, 77, 1109, 77,
  /* 16748 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 0, 0, 944, 0, 0, 77, 1196, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 16775 */ 77, 77, 77, 77, 77, 77, 427, 77, 1207, 77, 77, 77, 77, 77, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 189,
  /* 16800 */ 55, 77, 77, 77, 202, 55, 55, 1249, 55, 1251, 1252, 55, 1254, 55, 77, 77, 77, 77, 77, 77, 77, 77, 1335, 55,
  /* 16824 */ 55, 55, 55, 55, 55, 1341, 77, 1264, 77, 1266, 1267, 77, 1269, 77, 55, 55, 55, 55, 55, 55, 55, 55, 501, 55,
  /* 16848 */ 55, 55, 55, 55, 55, 55, 77, 77, 1331, 77, 1332, 77, 77, 77, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77,
  /* 16873 */ 77, 611, 612, 77, 77, 77, 77, 77, 77, 77, 77, 77, 404, 77, 77, 77, 77, 77, 77, 77, 77, 744, 77, 77, 77,
  /* 16898 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 893, 77, 77, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33, 36900, 38951,
  /* 16922 */ 41001, 52, 65, 65, 86, 77, 207, 77, 77, 77, 77, 77, 77, 77, 77, 77, 243, 77, 77, 77, 77, 77, 77, 77, 1202,
  /* 16947 */ 77, 77, 77, 77, 77, 77, 77, 77, 1035, 77, 77, 77, 77, 77, 0, 0, 6257, 6257, 0, 20751, 0, 0, 0, 275, 121,
  /* 16972 */ 52, 278, 124, 55, 281, 55, 55, 55, 55, 863, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1129, 55, 55,
  /* 16997 */ 55, 55, 55, 314, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 506, 55, 367, 77, 77, 77, 77, 77,
  /* 17023 */ 77, 77, 77, 77, 379, 386, 77, 77, 77, 77, 77, 77, 77, 1239, 77, 77, 55, 55, 55, 55, 55, 55, 55, 1136, 55,
  /* 17048 */ 55, 55, 55, 55, 55, 55, 55, 1191, 55, 55, 77, 77, 77, 77, 77, 77, 431, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 17074 */ 77, 77, 445, 77, 77, 77, 77, 77, 77, 940, 77, 77, 77, 77, 0, 0, 944, 0, 0, 8304, 52, 52, 52, 55, 55, 127,
  /* 17100 */ 55, 55, 55, 142, 55, 55, 156, 55, 55, 55, 480, 481, 55, 55, 55, 55, 488, 55, 55, 55, 55, 55, 55, 55, 1059,
  /* 17125 */ 55, 55, 55, 55, 55, 55, 55, 55, 516, 55, 55, 55, 521, 55, 55, 55, 55, 55, 527, 55, 55, 55, 55, 55, 55, 55,
  /* 17151 */ 55, 55, 55, 55, 55, 55, 55, 686, 55, 639, 77, 77, 0, 0, 0, 0, 643, 8649, 6602, 646, 0, 0, 0, 0, 0, 714,
  /* 17177 */ 55, 55, 55, 55, 55, 55, 719, 55, 55, 55, 55, 55, 724, 55, 55, 55, 55, 876, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 17203 */ 55, 55, 77, 77, 77, 77, 77, 741, 77, 77, 77, 77, 800, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 807, 77,
  /* 17229 */ 77, 77, 77, 77, 77, 77, 77, 899, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 918, 77, 77, 77, 77, 1007,
  /* 17254 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 782, 55, 1145, 55, 55, 55, 55, 55, 55, 77, 77,
  /* 17280 */ 77, 77, 77, 77, 77, 77, 235, 77, 77, 77, 77, 253, 77, 77, 1321, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 17305 */ 55, 1328, 77, 77, 77, 0, 0, 0, 0, 643, 8649, 6602, 0, 0, 651, 0, 0, 0, 1, 0, 0, 0, 14357, 18455, 0, 43038,
  /* 17331 */ 33, 36900, 38951, 41001, 52, 66, 66, 87, 77, 208, 77, 77, 222, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 17355 */ 943, 0, 0, 0, 0, 77, 14357, 0, 18455, 18455, 28, 43038, 33, 33, 0, 262, 0, 0, 0, 267, 8304, 55, 55, 55,
  /* 17379 */ 330, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 844, 55, 55, 347, 55, 55, 55, 55, 55, 354, 55,
  /* 17404 */ 55, 55, 55, 55, 55, 55, 55, 77, 77, 1149, 77, 77, 77, 77, 77, 77, 77, 77, 433, 77, 77, 77, 77, 77, 440,
  /* 17429 */ 77, 77, 77, 77, 77, 77, 55, 55, 55, 55, 55, 55, 1216, 55, 55, 55, 55, 55, 55, 513, 55, 55, 55, 55, 55, 55,
  /* 17455 */ 55, 55, 55, 55, 55, 55, 55, 856, 55, 55, 656, 0, 0, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 17481 */ 55, 1053, 55, 55, 716, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 700, 55, 77, 77, 760, 77,
  /* 17506 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 934, 77, 77, 77, 77, 77, 77, 787, 77, 77, 77, 77, 792, 77,
  /* 17532 */ 77, 77, 77, 77, 77, 55, 55, 55, 55, 1301, 55, 55, 55, 55, 55, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33,
  /* 17556 */ 36900, 38951, 41001, 52, 67, 67, 88, 77, 209, 77, 77, 223, 77, 77, 77, 234, 77, 77, 77, 77, 252, 77, 77,
  /* 17579 */ 77, 77, 77, 77, 1087, 77, 77, 77, 77, 77, 1091, 77, 77, 77, 0, 0, 0, 0, 643, 8649, 6602, 0, 0, 650, 0, 0,
  /* 17605 */ 0, 77, 784, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 588, 77, 832, 55, 55, 835, 836, 55,
  /* 17630 */ 55, 55, 55, 55, 841, 55, 843, 55, 55, 55, 55, 55, 984, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 697,
  /* 17655 */ 55, 55, 55, 55, 55, 847, 55, 55, 55, 55, 55, 55, 55, 55, 853, 55, 55, 55, 55, 55, 55, 837, 55, 55, 55, 55,
  /* 17681 */ 55, 55, 55, 55, 55, 335, 55, 55, 55, 55, 55, 55, 55, 859, 55, 55, 55, 55, 55, 55, 867, 55, 55, 55, 55,
  /* 17706 */ 871, 55, 55, 55, 55, 960, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 321, 55, 55, 55, 55, 896, 77, 77,
  /* 17731 */ 77, 77, 77, 901, 77, 903, 77, 77, 77, 77, 907, 77, 77, 77, 77, 77, 77, 1099, 77, 77, 77, 77, 77, 77, 77,
  /* 17756 */ 77, 77, 615, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 927, 77, 77, 77, 77, 931, 77, 77, 77, 77, 77, 77, 55,
  /* 17782 */ 55, 55, 55, 1350, 55, 77, 77, 77, 77, 992, 55, 993, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 17807 */ 1018, 77, 77, 55, 1068, 55, 55, 1070, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 338, 55, 55, 55, 55, 77,
  /* 17832 */ 77, 1083, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1092, 77, 77, 1108, 77, 77, 1110, 77, 77,
  /* 17856 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 0, 813, 944, 0, 0, 1153, 77, 77, 77, 77, 1157, 1158, 77, 77, 77, 77,
  /* 17881 */ 77, 1162, 77, 77, 77, 0, 0, 0, 0, 643, 8649, 6602, 0, 649, 0, 0, 0, 655, 77, 77, 77, 77, 1167, 77, 77, 77,
  /* 17907 */ 77, 77, 77, 77, 77, 77, 77, 77, 1016, 1017, 77, 77, 77, 55, 1220, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77,
  /* 17932 */ 77, 77, 77, 77, 566, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1235, 77, 77, 77, 77, 77, 77, 55, 55, 1243,
  /* 17957 */ 55, 55, 55, 55, 55, 1071, 55, 1073, 55, 55, 55, 55, 55, 55, 55, 55, 77, 1227, 77, 77, 1229, 77, 77, 77,
  /* 17981 */ 55, 1248, 55, 55, 55, 55, 1253, 55, 55, 77, 77, 1258, 77, 77, 77, 77, 77, 77, 77, 1270, 55, 55, 55, 55,
  /* 18005 */ 55, 55, 1276, 55, 1263, 77, 77, 77, 77, 1268, 77, 77, 55, 55, 55, 55, 55, 55, 55, 55, 550, 55, 55, 55, 55,
  /* 18030 */ 77, 77, 77, 55, 55, 55, 1281, 55, 55, 1283, 77, 77, 77, 77, 77, 77, 77, 77, 77, 916, 77, 77, 77, 77, 77,
  /* 18055 */ 77, 77, 77, 1294, 77, 77, 1296, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 190, 55, 77, 77, 77, 77, 77, 77,
  /* 18080 */ 1343, 1344, 77, 77, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 374, 77, 77, 77, 383, 77, 77, 77, 77,
  /* 18105 */ 77, 77, 77, 914, 77, 77, 77, 77, 77, 77, 77, 77, 614, 77, 77, 77, 77, 77, 77, 77, 1, 0, 0, 0, 14357,
  /* 18130 */ 18455, 0, 43038, 33, 36900, 38951, 41001, 52, 68, 68, 89, 161, 163, 166, 55, 55, 55, 177, 181, 55, 55, 55,
  /* 18152 */ 55, 77, 77, 199, 203, 206, 77, 214, 77, 77, 228, 230, 233, 77, 77, 77, 244, 248, 77, 77, 77, 0, 0, 0, 0,
  /* 18177 */ 643, 8649, 6602, 646, 0, 0, 0, 0, 0, 328, 55, 55, 55, 55, 55, 55, 55, 55, 55, 337, 55, 55, 344, 55, 55,
  /* 18202 */ 55, 55, 972, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 988, 55, 55, 55, 77, 77, 77, 414, 77, 77, 77,
  /* 18228 */ 77, 77, 77, 77, 77, 77, 423, 77, 77, 77, 77, 77, 77, 1201, 77, 77, 77, 77, 77, 77, 77, 77, 77, 904, 77,
  /* 18253 */ 77, 77, 77, 77, 77, 430, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 443, 77, 77, 77, 77, 77, 77, 402, 77, 77,
  /* 18279 */ 77, 77, 77, 77, 77, 77, 77, 77, 1037, 77, 77, 77, 0, 0, 77, 77, 18455, 0, 0, 0, 453, 0, 108, 0, 267, 8649,
  /* 18305 */ 6602, 270, 20751, 0, 55, 55, 496, 55, 55, 55, 55, 55, 55, 55, 55, 503, 55, 55, 55, 507, 55, 55, 512, 55,
  /* 18329 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 712, 55, 55, 55, 55, 544, 55, 55, 55, 55, 55, 55, 55,
  /* 18355 */ 55, 55, 77, 556, 77, 77, 77, 77, 77, 628, 77, 77, 77, 77, 77, 633, 77, 77, 77, 77, 77, 77, 77, 930, 77,
  /* 18380 */ 77, 77, 77, 77, 77, 77, 77, 55, 55, 55, 55, 1274, 55, 55, 55, 77, 77, 77, 77, 561, 77, 77, 77, 77, 77, 77,
  /* 18406 */ 77, 77, 77, 77, 77, 1026, 77, 77, 77, 77, 77, 590, 77, 77, 77, 594, 77, 77, 599, 77, 77, 77, 77, 77, 77,
  /* 18431 */ 77, 403, 77, 77, 77, 77, 77, 77, 77, 77, 439, 77, 77, 77, 77, 77, 77, 77, 822, 0, 466, 55, 55, 55, 55, 55,
  /* 18457 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 845, 55, 55, 971, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 18483 */ 55, 55, 991, 1175, 55, 55, 55, 55, 55, 55, 55, 1180, 55, 55, 55, 55, 55, 55, 55, 333, 55, 55, 55, 340,
  /* 18507 */ 342, 55, 55, 55, 77, 77, 77, 1198, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 635, 77, 77, 77, 1232,
  /* 18532 */ 77, 77, 77, 77, 77, 1238, 77, 77, 77, 55, 55, 55, 55, 55, 1246, 55, 55, 55, 1250, 55, 55, 55, 55, 55, 77,
  /* 18557 */ 77, 77, 77, 77, 1261, 77, 77, 77, 77, 77, 746, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 441, 77, 77, 77,
  /* 18582 */ 77, 77, 77, 77, 1265, 77, 77, 77, 77, 77, 55, 55, 55, 55, 55, 55, 55, 55, 706, 55, 55, 55, 55, 55, 55, 55,
  /* 18608 */ 1363, 1364, 55, 77, 55, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33, 36900,
  /* 18634 */ 38951, 41001, 52, 69, 69, 90, 77, 14357, 0, 18455, 18455, 28, 43038, 33, 33, 0, 263, 0, 0, 0, 267, 8304,
  /* 18656 */ 77, 77, 18455, 0, 0, 264, 0, 0, 0, 0, 267, 8649, 6602, 270, 20751, 0, 657, 0, 0, 55, 55, 55, 55, 55, 55,
  /* 18681 */ 55, 55, 55, 55, 55, 55, 55, 1052, 55, 55, 689, 55, 55, 55, 55, 693, 55, 695, 55, 55, 55, 55, 55, 55, 55,
  /* 18706 */ 355, 55, 55, 55, 55, 55, 55, 55, 77, 33, 33, 33, 36900, 0, 109, 38951, 0, 41001, 8304, 0, 0, 6257, 0, 0,
  /* 18730 */ 0, 77, 210, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 603, 77, 258, 14357, 0, 18455, 18455,
  /* 18754 */ 28, 43038, 33, 33, 0, 0, 0, 0, 0, 267, 8304, 1133, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 18780 */ 55, 687, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33, 36900, 38951, 41001, 52, 70, 70, 91, 77, 77, 77, 218, 77,
  /* 18803 */ 77, 77, 77, 236, 238, 77, 77, 249, 77, 77, 77, 0, 0, 0, 0, 643, 8649, 6602, 647, 0, 0, 0, 0, 0, 55, 313,
  /* 18829 */ 315, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 857, 55, 55, 349, 55, 55, 55, 55, 55, 55, 55,
  /* 18855 */ 55, 360, 361, 55, 55, 55, 77, 77, 77, 77, 77, 762, 77, 764, 77, 77, 77, 77, 77, 77, 77, 77, 1115, 77, 77,
  /* 18880 */ 1118, 77, 77, 77, 0, 77, 77, 77, 77, 399, 401, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 766, 77, 77, 77,
  /* 18905 */ 77, 77, 77, 77, 77, 77, 435, 77, 77, 77, 77, 77, 77, 77, 77, 446, 447, 77, 77, 77, 77, 77, 776, 77, 77,
  /* 18930 */ 77, 77, 77, 77, 77, 77, 77, 77, 381, 77, 77, 77, 77, 77, 77, 77, 559, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 18956 */ 77, 77, 77, 77, 768, 77, 77, 77, 77, 624, 77, 77, 77, 77, 77, 77, 77, 77, 632, 77, 77, 77, 77, 638, 55,
  /* 18981 */ 55, 55, 690, 55, 55, 55, 55, 55, 55, 696, 55, 698, 55, 701, 55, 55, 55, 288, 55, 55, 55, 297, 55, 55, 55,
  /* 19006 */ 55, 55, 55, 55, 55, 1060, 55, 1062, 55, 55, 55, 55, 55, 742, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 19031 */ 77, 77, 77, 77, 796, 77, 772, 77, 774, 77, 777, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 778, 77, 77, 77,
  /* 19056 */ 77, 77, 783, 77, 77, 77, 77, 77, 789, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1116, 77, 77, 77, 77, 77, 0,
  /* 19081 */ 811, 0, 643, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 833, 55, 55, 55, 55, 55, 838, 55, 55, 55, 55, 55,
  /* 19110 */ 55, 55, 55, 839, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 898, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 19136 */ 77, 780, 781, 77, 77, 77, 1082, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 620, 77, 77, 77,
  /* 19161 */ 77, 77, 1345, 77, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 563, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 19187 */ 77, 1090, 77, 77, 77, 77, 77, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33, 36900, 38951, 41001, 52, 71, 71, 92,
  /* 19210 */ 77, 77, 77, 77, 224, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1038, 77, 77, 0, 0, 55, 286, 55, 55, 55,
  /* 19236 */ 290, 55, 55, 301, 55, 55, 305, 55, 55, 55, 55, 55, 546, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 1287,
  /* 19261 */ 77, 77, 77, 77, 77, 77, 77, 77, 372, 77, 77, 77, 376, 77, 77, 387, 77, 77, 391, 77, 77, 77, 77, 77, 788,
  /* 19286 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 77, 411, 77, 77, 77, 77,
  /* 19312 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 637, 77, 55, 715, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 19338 */ 725, 55, 55, 55, 316, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 364, 55, 366, 77, 924, 77, 77,
  /* 19363 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 894, 77, 817, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 19389 */ 55, 55, 55, 55, 726, 55, 55, 55, 1176, 55, 55, 55, 1179, 55, 55, 55, 55, 55, 55, 55, 55, 879, 55, 55, 55,
  /* 19414 */ 55, 55, 55, 77, 77, 77, 1197, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 794, 77, 77, 77, 1219,
  /* 19439 */ 55, 1221, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 77, 77, 791, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 19464 */ 1234, 77, 1236, 77, 77, 77, 77, 77, 55, 55, 55, 55, 55, 55, 55, 1190, 55, 55, 55, 77, 77, 77, 77, 77,
  /* 19488 */ 1306, 55, 55, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1318, 77, 77, 77, 77, 77, 77, 1211, 55, 55, 55, 55,
  /* 19513 */ 1215, 55, 55, 55, 55, 55, 530, 55, 55, 55, 55, 55, 55, 538, 55, 55, 55, 55, 55, 1322, 55, 1323, 55, 55,
  /* 19537 */ 55, 55, 55, 55, 55, 77, 77, 1329, 77, 77, 77, 77, 77, 801, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 806,
  /* 19562 */ 77, 77, 809, 810, 77, 1330, 77, 77, 77, 77, 77, 77, 77, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77,
  /* 19587 */ 888, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 380, 77, 77, 77, 77, 77, 1, 0, 0, 0, 14357, 18455, 0, 43038,
  /* 19612 */ 33, 36900, 38951, 41001, 52, 72, 72, 93, 162, 55, 55, 55, 55, 55, 178, 55, 55, 55, 55, 55, 77, 196, 77,
  /* 19635 */ 77, 77, 77, 77, 77, 1297, 1298, 1299, 55, 55, 55, 1302, 55, 1304, 55, 77, 77, 215, 219, 225, 229, 77, 77,
  /* 19658 */ 77, 77, 77, 245, 77, 77, 77, 77, 77, 77, 595, 596, 598, 77, 77, 77, 77, 77, 77, 605, 77, 14357, 0, 18455,
  /* 19682 */ 18455, 28, 43038, 33, 33, 0, 0, 264, 0, 0, 267, 8304, 6257, 6257, 0, 20751, 0, 0, 0, 275, 121, 52, 278,
  /* 19705 */ 124, 280, 55, 55, 55, 55, 55, 1224, 55, 55, 1226, 77, 77, 77, 77, 1230, 77, 77, 285, 55, 55, 55, 55, 291,
  /* 19729 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 708, 55, 55, 55, 55, 55, 312, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 19755 */ 55, 323, 55, 55, 55, 327, 77, 77, 77, 371, 77, 77, 77, 77, 377, 77, 77, 77, 77, 77, 77, 77, 582, 77, 77,
  /* 19780 */ 77, 77, 586, 77, 77, 77, 77, 77, 77, 398, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 409, 77, 77, 77, 77, 77,
  /* 19806 */ 900, 77, 902, 77, 77, 77, 77, 77, 77, 77, 77, 55, 1272, 55, 1273, 55, 55, 55, 1277, 77, 77, 413, 77, 77,
  /* 19830 */ 77, 77, 77, 77, 77, 419, 77, 77, 77, 426, 428, 450, 77, 18455, 0, 0, 0, 0, 0, 0, 0, 267, 8649, 6602, 270,
  /* 19855 */ 20751, 0, 55, 478, 55, 55, 55, 55, 484, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1192, 55, 77, 77, 77, 77, 77,
  /* 19880 */ 55, 495, 55, 55, 55, 55, 499, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1256, 77, 77, 77, 77, 77, 77, 55, 510,
  /* 19905 */ 55, 55, 514, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 341, 55, 55, 55, 55, 77, 77, 77, 626, 627, 77,
  /* 19930 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1161, 77, 77, 77, 77, 55, 55, 674, 55, 55, 678, 55, 55, 55, 682,
  /* 19955 */ 55, 55, 55, 55, 55, 55, 55, 1284, 77, 77, 77, 77, 77, 77, 77, 77, 915, 77, 77, 77, 77, 77, 77, 77, 55,
  /* 19980 */ 728, 55, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 77, 1152, 758, 77, 77, 77, 77, 77, 77, 77,
  /* 20005 */ 77, 77, 77, 767, 77, 77, 770, 77, 77, 77, 77, 77, 928, 77, 77, 77, 77, 77, 77, 77, 77, 77, 935, 77, 77,
  /* 20030 */ 77, 799, 77, 77, 77, 77, 804, 77, 77, 77, 77, 77, 77, 77, 597, 77, 77, 601, 77, 77, 77, 77, 77, 846, 55,
  /* 20055 */ 55, 55, 849, 55, 55, 851, 55, 852, 55, 55, 55, 55, 55, 55, 174, 55, 55, 55, 55, 55, 77, 77, 77, 77, 997,
  /* 20080 */ 77, 998, 77, 77, 77, 77, 77, 77, 77, 565, 77, 77, 77, 77, 571, 77, 77, 77, 55, 55, 55, 862, 55, 55, 55,
  /* 20105 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 1185, 55, 55, 873, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 20131 */ 55, 55, 77, 195, 77, 77, 77, 884, 77, 77, 77, 77, 77, 77, 77, 77, 77, 891, 77, 77, 77, 77, 77, 77, 763,
  /* 20156 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 567, 568, 77, 77, 77, 77, 575, 909, 77, 77, 911, 77, 912, 77, 77, 77,
  /* 20181 */ 77, 77, 77, 77, 77, 77, 922, 55, 957, 55, 55, 55, 55, 962, 55, 55, 55, 965, 55, 55, 55, 55, 55, 55, 877,
  /* 20206 */ 55, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 1150, 77, 77, 77, 77, 77, 77, 1009, 77, 77, 77, 1012, 77, 77,
  /* 20231 */ 77, 77, 77, 77, 77, 77, 77, 1172, 77, 77, 77, 77, 77, 77, 55, 55, 55, 1056, 55, 55, 55, 55, 55, 55, 55,
  /* 20256 */ 55, 1064, 55, 55, 55, 55, 289, 55, 55, 55, 55, 55, 55, 304, 55, 55, 55, 309, 77, 77, 77, 1084, 77, 77, 77,
  /* 20281 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 808, 77, 77, 77, 77, 77, 1096, 77, 77, 77, 77, 77, 77, 77, 77, 1104,
  /* 20306 */ 77, 77, 77, 77, 77, 77, 802, 77, 77, 77, 77, 77, 77, 77, 77, 77, 750, 77, 77, 754, 77, 77, 77, 1144, 55,
  /* 20331 */ 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 77, 77, 77, 1024, 77, 77, 77, 77, 77, 77, 77, 77, 1154, 77,
  /* 20356 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1040, 944, 1164, 77, 77, 77, 77, 77, 1169, 77, 1171,
  /* 20380 */ 77, 77, 77, 77, 77, 77, 77, 613, 77, 77, 616, 77, 77, 77, 77, 77, 1195, 77, 77, 77, 1199, 77, 77, 77, 77,
  /* 20405 */ 77, 77, 77, 77, 77, 77, 77, 1173, 77, 77, 77, 77, 77, 77, 1208, 77, 77, 77, 55, 55, 55, 55, 55, 55, 55,
  /* 20430 */ 55, 55, 55, 869, 55, 55, 55, 55, 55, 55, 55, 1308, 77, 77, 77, 1312, 77, 77, 77, 77, 77, 77, 77, 77, 1320,
  /* 20455 */ 77, 77, 77, 77, 77, 1333, 1334, 77, 55, 55, 55, 55, 55, 55, 55, 77, 77, 77, 77, 77, 1011, 77, 77, 1014,
  /* 20479 */ 77, 77, 77, 77, 77, 77, 77, 375, 77, 77, 77, 77, 77, 77, 390, 77, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33,
  /* 20504 */ 36900, 38951, 41001, 52, 73, 73, 94, 77, 77, 216, 77, 77, 77, 77, 77, 77, 77, 77, 77, 250, 77, 77, 77, 77,
  /* 20528 */ 77, 77, 889, 77, 77, 77, 77, 77, 77, 77, 77, 77, 378, 77, 77, 77, 77, 77, 77, 77, 14357, 0, 18455, 18455,
  /* 20552 */ 28, 43038, 33, 33, 0, 0, 0, 265, 0, 267, 8304, 77, 451, 18455, 0, 0, 0, 0, 0, 0, 0, 267, 8649, 6602, 270,
  /* 20577 */ 20751, 0, 55, 55, 55, 528, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 504, 55, 55, 55, 77, 77, 77,
  /* 20602 */ 77, 579, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 905, 77, 77, 77, 77, 77, 77, 77, 77, 592, 77, 77, 77,
  /* 20628 */ 77, 77, 77, 77, 77, 77, 77, 604, 77, 77, 77, 77, 77, 1022, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 55,
  /* 20653 */ 1242, 55, 1244, 55, 55, 77, 77, 77, 77, 887, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 917, 77, 77, 77,
  /* 20678 */ 920, 77, 956, 55, 958, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 324, 55, 55, 55, 1307, 55, 77,
  /* 20703 */ 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1319, 77, 77, 77, 77, 77, 1086, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 20728 */ 77, 77, 1015, 77, 77, 77, 77, 77, 1354, 77, 55, 55, 55, 55, 77, 77, 77, 77, 55, 55, 77, 77, 55, 77, 77,
  /* 20753 */ 77, 77, 77, 1098, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1107, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33, 36900,
  /* 20777 */ 38951, 41001, 52, 74, 74, 95, 77, 211, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 1093, 77,
  /* 20801 */ 6257, 6257, 0, 20751, 0, 0, 0, 275, 121, 4148, 278, 124, 55, 55, 55, 55, 55, 692, 55, 55, 55, 55, 55, 55,
  /* 20825 */ 55, 55, 55, 55, 320, 55, 55, 55, 55, 55, 77, 77, 77, 77, 593, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 20851 */ 942, 0, 0, 0, 0, 0, 1, 0, 0, 0, 14357, 18455, 0, 43038, 33, 36900, 38951, 41001, 52, 75, 75, 96, 55, 55,
  /* 20875 */ 55, 848, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 855, 55, 55, 55, 936, 77, 77, 77, 77, 77, 77, 77,
  /* 20901 */ 77, 77, 77, 0, 0, 0, 0, 0, 1, 0, 0, 0, 14357, 18455, 0, 43039, 33, 36900, 38951, 41001, 52, 76, 76, 97,
  /* 20925 */ 77, 212, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 892, 77, 77, 895, 77, 14357, 0, 18455,
  /* 20949 */ 18455, 28, 43038, 33, 33, 261, 0, 0, 0, 0, 267, 8304, 55, 55, 55, 351, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 20974 */ 55, 55, 77, 77, 77, 739, 77, 77, 77, 412, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 906, 77,
  /* 21000 */ 77, 77, 77, 77, 773, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 933, 77, 77, 77, 55, 55, 834, 55,
  /* 21026 */ 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 343, 55, 55, 77, 607, 77, 77, 77, 77, 77, 77, 77, 77, 77,
  /* 21052 */ 77, 77, 77, 77, 77, 1105, 1106, 77, 77, 688, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
  /* 21077 */ 858, 1, 0, 0, 0, 14357, 18455, 0, 28, 33, 36900, 38951, 518187, 0, 0, 0, 0, 1073152, 0, 0, 1095680,
  /* 21098 */ 1095801, 1095680, 1071104, 1071228, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 21109 */ 1071104, 1366016, 1071104, 1071104, 1382400, 1071104, 1071104, 1071104, 1411072, 1071104, 1071104,
  /* 21120 */ 1071104, 1071104, 1071104, 1071104, 1071104, 1226752, 1071104, 1071104, 1071104, 1071104, 1071104,
  /* 21131 */ 1269760, 1071104, 1071104, 1093632, 1093632, 18455, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  /* 21154 */ 14357, 18455, 0, 28, 33, 36900, 38951, 44, 522240, 0, 0, 0, 1093632, 1093632, 18455, 0, 0, 0, 0, 0, 0, 0,
  /* 21176 */ 0, 0, 0, 269, 0, 0, 6257, 6257, 0, 0, 0, 0, 0, 0, 121, 52, 0, 124, 55, 55, 55, 55, 55, 704, 705, 55, 55,
  /* 21203 */ 55, 55, 55, 55, 55, 55, 55, 1138, 55, 55, 55, 55, 55, 55
];

XQueryTokenizer.EXPECTED =
[
  /*    0 */ 171, 175, 198, 210, 179, 181, 210, 185, 190, 210, 197, 202, 193, 186, 212, 208, 216, 204, 220, 224, 228,
  /*   21 */ 232, 236, 240, 246, 424, 353, 252, 437, 353, 257, 444, 608, 353, 262, 268, 273, 342, 277, 515, 310, 281,
  /*   42 */ 285, 291, 354, 382, 353, 289, 297, 353, 295, 503, 353, 301, 307, 410, 336, 303, 408, 314, 417, 318, 322,
  /*   63 */ 326, 330, 334, 340, 346, 269, 352, 358, 430, 353, 364, 639, 594, 370, 375, 381, 386, 533, 390, 394, 397,
  /*   84 */ 401, 405, 414, 466, 583, 353, 421, 248, 353, 601, 521, 353, 428, 512, 578, 589, 455, 562, 434, 441, 353,
  /*  105 */ 353, 348, 613, 448, 628, 637, 253, 353, 453, 258, 353, 459, 630, 371, 353, 465, 470, 264, 474, 478, 482,
  /*  126 */ 486, 490, 494, 500, 461, 366, 353, 506, 242, 353, 519, 603, 353, 525, 509, 527, 559, 531, 537, 541, 545,
  /*  147 */ 548, 552, 556, 566, 353, 570, 576, 377, 582, 587, 449, 593, 598, 496, 360, 607, 612, 617, 572, 621, 625,
  /*  168 */ 634, 353, 354, 643, 647, 651, 655, 693, 703, 662, 666, 670, 674, 692, 692, 657, 703, 683, 692, 692, 692,
  /*  189 */ 678, 692, 692, 676, 703, 703, 705, 691, 687, 692, 692, 692, 699, 692, 699, 703, 703, 692, 700, 692, 692,
  /*  210 */ 703, 703, 703, 703, 679, 698, 704, 692, 692, 694, 703, 709, 694, 713, 658, 718, 701, 709, 702, 693, 722,
  /*  231 */ 714, 726, 730, 734, 738, 745, 977, 749, 820, 741, 755, 977, 977, 751, 1182, 977, 1295, 977, 977, 780, 1048,
  /*  252 */ 773, 977, 977, 977, 833, 777, 977, 977, 977, 834, 784, 789, 977, 977, 814, 977, 785, 977, 977, 977, 934,
  /*  273 */ 795, 977, 977, 893, 849, 895, 977, 947, 1137, 1178, 971, 972, 1376, 812, 977, 859, 940, 830, 977, 977, 818,
  /*  294 */ 1147, 826, 847, 977, 977, 838, 842, 1322, 857, 977, 977, 869, 977, 977, 1323, 848, 977, 808, 804, 1177,
  /*  314 */ 1174, 977, 1172, 1176, 1134, 1227, 1026, 1185, 1292, 1333, 1170, 883, 1335, 1263, 887, 890, 978, 900, 977,
  /*  333 */ 1095, 907, 912, 977, 977, 915, 864, 1247, 919, 977, 977, 922, 977, 983, 930, 977, 977, 977, 1106, 842, 977,
  /*  354 */ 977, 977, 977, 824, 1347, 938, 977, 977, 977, 1117, 1354, 939, 977, 977, 977, 1167, 958, 977, 977, 977,
  /*  374 */ 1010, 984, 1246, 977, 977, 977, 1312, 985, 977, 977, 977, 1017, 964, 977, 977, 968, 1243, 977, 1059, 976,
  /*  394 */ 1088, 977, 982, 1161, 998, 989, 995, 1159, 925, 926, 1003, 1014, 977, 1024, 977, 873, 977, 977, 914, 863,
  /*  414 */ 977, 1221, 1065, 977, 877, 1163, 1136, 977, 1123, 1042, 977, 901, 762, 766, 790, 1063, 977, 977, 999, 944,
  /*  434 */ 1008, 977, 1006, 977, 902, 1071, 1298, 1224, 977, 1076, 977, 903, 1071, 1298, 1086, 977, 977, 977, 1020,
  /*  453 */ 843, 1110, 977, 977, 1069, 977, 879, 1094, 977, 977, 1111, 1157, 1188, 977, 977, 977, 1030, 1189, 977, 977,
  /*  473 */ 1077, 977, 1230, 977, 813, 1232, 813, 1094, 1050, 790, 798, 1369, 1369, 1121, 1127, 799, 1367, 1368, 1131,
  /*  492 */ 1141, 1145, 977, 1151, 977, 977, 1116, 1339, 1214, 1082, 959, 977, 983, 853, 977, 758, 1198, 977, 769,
  /*  511 */ 1203, 977, 791, 1064, 977, 803, 1137, 865, 977, 1193, 977, 977, 1153, 1058, 768, 1202, 977, 977, 1207, 977,
  /*  531 */ 977, 1282, 977, 977, 1245, 977, 1289, 977, 977, 1241, 977, 1239, 977, 1306, 977, 1212, 1330, 1269, 1275,
  /*  550 */ 1330, 1218, 1237, 1251, 1252, 1256, 953, 1260, 950, 977, 983, 1208, 977, 1007, 977, 908, 1267, 977, 1273,
  /*  569 */ 1279, 1299, 1286, 977, 977, 1351, 977, 977, 1303, 977, 977, 1360, 779, 1310, 977, 977, 977, 1038, 790,
  /*  588 */ 1316, 977, 977, 1361, 977, 1320, 977, 977, 977, 1044, 896, 1327, 977, 977, 1054, 977, 977, 991, 1197, 1340,
  /*  608 */ 977, 977, 977, 1072, 1033, 977, 977, 977, 1081, 1034, 977, 977, 1344, 960, 1104, 977, 1102, 977, 1358,
  /*  627 */ 1233, 977, 1092, 977, 977, 1009, 1115, 1365, 1373, 977, 977, 1099, 977, 977, 1043, 957, 1380, 1384, 1388,
  /*  646 */ 1392, 1396, 2116, 1400, 1408, 2131, 1955, 1412, 1425, 1448, 1431, 1491, 1491, 1491, 1494, 1452, 1457, 1466,
  /*  664 */ 1469, 1474, 1440, 1428, 1482, 1491, 1486, 1470, 1474, 1510, 1810, 1490, 1491, 1491, 1493, 1452, 1452, 1452,
  /*  682 */ 1496, 1453, 1500, 1477, 1444, 1437, 1509, 1443, 1490, 1478, 1491, 1491, 1491, 1491, 1452, 1452, 1514, 1491,
  /*  700 */ 1491, 1491, 1492, 1452, 1452, 1452, 1452, 1495, 1508, 1452, 1518, 1491, 1491, 1452, 1452, 1518, 1491, 1452,
  /*  718 */ 1452, 1452, 1491, 1491, 1452, 1452, 1491, 1492, 1518, 1493, 1518, 1522, 1434, 1524, 1462, 1530, 1544, 1547,
  /*  736 */ 1461, 1504, 1559, 1783, 1781, 1639, 1782, 1580, 1587, 1574, 1782, 1566, 2039, 2038, 1573, 1782, 1782, 1414,
  /*  754 */ 1418, 1825, 1603, 1592, 1782, 1416, 2006, 1979, 1782, 1819, 1782, 1826, 1612, 1592, 1782, 1782, 1415, 2005,
  /*  772 */ 2012, 1824, 1610, 1831, 1594, 1827, 1831, 1594, 1782, 1782, 1782, 1885, 1459, 1782, 1782, 1828, 1832, 1832,
  /*  790 */ 1782, 1782, 1782, 1567, 1910, 1782, 2119, 1829, 1627, 1782, 1782, 1782, 2151, 1622, 1627, 1782, 1782, 1632,
  /*  808 */ 1634, 1782, 1782, 1815, 1816, 1782, 1782, 1782, 1574, 1963, 1782, 1866, 1782, 1782, 1503, 1782, 1644, 1649,
  /*  826 */ 1782, 1782, 1551, 1683, 1665, 1669, 1679, 1782, 1574, 1940, 1944, 1782, 1588, 1553, 1667, 1677, 1651, 1782,
  /*  844 */ 1782, 1782, 1576, 1688, 1671, 1782, 1782, 1782, 1608, 1552, 1684, 1689, 1672, 1958, 1671, 1782, 1782, 1562,
  /*  862 */ 1782, 1690, 1673, 1782, 1782, 1782, 1632, 1581, 1420, 1696, 2014, 1582, 1421, 1697, 2015, 1709, 1721, 1782,
  /*  880 */ 1782, 1575, 1941, 1729, 1782, 1782, 1728, 1946, 1782, 1948, 1947, 1947, 1714, 1782, 1608, 1613, 1782, 1782,
  /*  898 */ 1782, 1569, 1738, 1782, 1782, 1782, 1639, 1782, 1782, 1746, 1782, 1782, 1782, 1640, 2057, 1745, 1782, 1782,
  /*  916 */ 1583, 1695, 1690, 1755, 1760, 1765, 1782, 1617, 1613, 1782, 1461, 2122, 1782, 2121, 1751, 1756, 1761, 1650,
  /*  934 */ 1786, 2085, 1772, 1792, 1790, 1794, 1782, 1782, 1782, 1657, 1801, 1772, 1793, 1782, 1621, 1626, 1782, 1533,
  /*  952 */ 1536, 1782, 1540, 2030, 2028, 1807, 1774, 1823, 1782, 1782, 1782, 1659, 1782, 1836, 1842, 1723, 1782, 1837,
  /*  970 */ 1843, 1782, 1632, 1782, 1782, 1816, 1525, 1782, 1782, 1782, 1782, 1526, 1853, 1782, 1782, 1782, 1783, 1838,
  /*  988 */ 1843, 1853, 1782, 1782, 1783, 1417, 2007, 1854, 1782, 1782, 1852, 1782, 1782, 1782, 1785, 1782, 2122, 2120,
  /* 1006 */ 1782, 1640, 1814, 1782, 1782, 1782, 1952, 1943, 2122, 2121, 2121, 1782, 1645, 1650, 1782, 1568, 1419, 2098,
  /* 1024 */ 1782, 1858, 1782, 1782, 1711, 1782, 1870, 1875, 1880, 1782, 1659, 2128, 1782, 1782, 1782, 1871, 1876, 1881,
  /* 1042 */ 1864, 1782, 1782, 1782, 1798, 1807, 1889, 1895, 1782, 1782, 1768, 1782, 1568, 1403, 1903, 1594, 1904, 1782,
  /* 1060 */ 1782, 1782, 1847, 1910, 1914, 1782, 1782, 1782, 1862, 1639, 1813, 1782, 1782, 1826, 1830, 1593, 1653, 1782,
  /* 1078 */ 1782, 1782, 1962, 1926, 1782, 1782, 1782, 1972, 1782, 1925, 1782, 1782, 1848, 1782, 1930, 1935, 1945, 1782,
  /* 1096 */ 1782, 1782, 2058, 1782, 1931, 1936, 1782, 1659, 2141, 1782, 1782, 1782, 2137, 1918, 1942, 1782, 1782, 1782,
  /* 1114 */ 2050, 1943, 1782, 1782, 1782, 2113, 2109, 2151, 1782, 1782, 1567, 1887, 2094, 1627, 1782, 1782, 2149, 2150,
  /* 1132 */ 1782, 2066, 1782, 1710, 1722, 1782, 1782, 1782, 1634, 2067, 2065, 1782, 2067, 2066, 2066, 1782, 1782, 1865,
  /* 1150 */ 1638, 1968, 1782, 1782, 1782, 1908, 1404, 1977, 1983, 1782, 1782, 1920, 2122, 1782, 1782, 1628, 1710, 2051,
  /* 1168 */ 1978, 1984, 1782, 1712, 1782, 1782, 1582, 1701, 1705, 1782, 1782, 1782, 1633, 1782, 2008, 1988, 1823, 1782,
  /* 1186 */ 1715, 1712, 1782, 1574, 2093, 1945, 1782, 1416, 2006, 1890, 2000, 1891, 2001, 1782, 1782, 1782, 2012, 1990,
  /* 1204 */ 1782, 1782, 1782, 1783, 1417, 2019, 1990, 1782, 1992, 1555, 1782, 1782, 1973, 1782, 1782, 2032, 2036, 1782,
  /* 1222 */ 1724, 1863, 1782, 1652, 1814, 1782, 1653, 1704, 1782, 1574, 1964, 1782, 1782, 1782, 2124, 1782, 2024, 1782,
  /* 1240 */ 1782, 1994, 2036, 1782, 1782, 1921, 1843, 1782, 1782, 1782, 1750, 2023, 1782, 1782, 2023, 1782, 1539, 1782,
  /* 1258 */ 1540, 1538, 2043, 2044, 2048, 1782, 1733, 1782, 1734, 1782, 2055, 1782, 1782, 2033, 2037, 1899, 2063, 1782,
  /* 1276 */ 1782, 2034, 1782, 1782, 1898, 2062, 1782, 1740, 1995, 1818, 2071, 2076, 2064, 1782, 1741, 1996, 1782, 1716,
  /* 1294 */ 1713, 1782, 1600, 1604, 1593, 1782, 1782, 1782, 1549, 1550, 2072, 2077, 1782, 1783, 1554, 2037, 2091, 2104,
  /* 1312 */ 1782, 1782, 2081, 1419, 1417, 2089, 2093, 2064, 2103, 1782, 1782, 1782, 2083, 1694, 1958, 2108, 2099, 2104,
  /* 1330 */ 1782, 1783, 2035, 1782, 1717, 1714, 1782, 1728, 1714, 2109, 2092, 2064, 1782, 1782, 1595, 1660, 2135, 1782,
  /* 1348 */ 1784, 1778, 1803, 1596, 1661, 2136, 1782, 1786, 1802, 1773, 2123, 1460, 1782, 1782, 2143, 1912, 1594, 2147,
  /* 1366 */ 1782, 1782, 1782, 2150, 1782, 1782, 1782, 2123, 1782, 1782, 1782, 1817, 1782, 1818, 32, 536870912,
  /* 1382 */ 0x80000000, 545259520, 134217792, 134217984, 150994944, 143655040, 218103808, 436387840, 1241858048,
  /* 1391 */ 168312856, -650102258, 1024, 8389632, 18874368, 32, 536870912, 0x80000000, 8388608, 16777216, 0, 8388736,
  /* 1403 */ 128, 256, 1536, 2048, 8192, 128, 1048704, 1048704, 83886080, 524288, 24, 0, 0, 1, 4, 8, 48, 64, 256, 512,
  /* 1423 */ 1024, 8192, 4, 0x80000000, 512, 12288, 8192, 0, 4194816, 4194818, 1024, 1024, 2097152, 1024, 2097152, 0,
  /* 1439 */ 16, 4, 4, 0, 512, 512, 512, 512, 1024, 14336, 2, 8, 4194816, 2097152, 2097152, 2097152, 2097152, 33554432,
  /* 1457 */ 2097152, 64, 0, 256, 0, 0, 0, 16, 8192, 256, 128, 1048704, 67108864, 33554432, 16384, 16384, 16384, 16384,
  /* 1475 */ 0, 16, 8, 4, 4, 512, 512, 512, 4194818, 1024, 1024, 2097152, 2097152, 256, 33554432, 512, 1024, 1024, 1024,
  /* 1494 */ 1024, 2097152, 2097152, 2097152, 0, 4, 16384, 0, 16, 16, 0, 8192, 0, 32, 4, 4, 4, 4, 512, 8192, 4, 1024,
  /* 1516 */ 1024, 1024, 2097152, 2097152, 1024, 1024, 2097152, 2097152, 1024, 2097152, 0, 0, 0, -702284929, 1056, 2048,
  /* 1532 */ 65, 0, -1342177280, 1073741824, 72151935, 72151935, 0, 0, 1, 1024, 0, 0, 0, 256, 899, 2140094464,
  /* 1548 */ 2140094464, 0, 0, 1, 6, 8, 32, 64, 256, 1024, 2048, 0, 0, 2048, 0, -1007163537, -1007163537, -1007163537,
  /* 1566 */ 896, 0, 0, 0, 2, 8, 48, 2013265920, 0, 0, 0, 3, 384, 16384, 2, 0, 0, 0, 4, 64, 256, 384, 0, 0, 0, 7,
  /* 1592 */ 268435456, 536870912, 1073741824, 0, 0, 0, 8, 32, 0, 16384, 65536, 917504, 25165824, 100663296, 134217728,
  /* 1607 */ 268435456, 0, 0, 65536, 393216, 524288, 16777216, 67108864, 134217728, 536870912, 0, 256, 65536, 393216, 0,
  /* 1622 */ 0, 262144, 16777216, 67108864, 67108864, 536870912, 0, 0, 0, 64, 0, 0, 262144, 536870912, 0, 0,
  /* 1638 */ -1007419392, 0, 0, 0, 256, 512, 0, 15, 32, 255808, 66322432, 66322432, 1073741824, 0x80000000, 0, 0, 0,
  /* 1655 */ 512, 1024, 0, 7, 8, 32, 256, 512, 4096, 16384, 64, 256, 26112, 98304, 131072, 1310720, 2097152, 4194304,
  /* 1673 */ 58720256, 0x80000000, 0, 0, 2097152, 4194304, 58720256, 1073741824, 0x80000000, 0, 64, 256, 1536, 24576,
  /* 1687 */ 98304, 98304, 131072, 262144, 1048576, 2097152, 4194304, 256, 1536, 8192, 16384, 65536, 262144, 1048576,
  /* 1701 */ 512, 1024, 16384, 65536, 262144, 25165824, 33554432, 0x80000000, 64, 512, 1024, 65536, 262144, 16777216, 0,
  /* 1716 */ 0, 0, 1024, 65536, 262144, 262144, 25165824, 33554432, 0, 0, 0, 16271, 0, 0, 65536, 262144, 16777216, 0,
  /* 1734 */ 65536, 16777216, 0, 0, -702284929, -702284929, 0, 0, 1, 8, 32, 35897344, 1409286144, 0x80000000, 0, 0, 1,
  /* 1751 */ 6, 24, 96, 256, 256, 512, 14336, 16384, 229376, 229376, 2097152, 33554432, 67108864, 268435456, 268435456,
  /* 1766 */ 1073741824, 0x80000000, 0, 0, 3, 805306368, 4096, 8192, 16384, 98304, 2097152, 33554432, 4, 24, 32, 64, 0,
  /* 1783 */ 0, 0, 0, 1, 2, 4, 24, 16384, 98304, 131072, 2097152, 33554432, 268435456, 0x80000000, 0, 0, 1, 2, 24, 32,
  /* 1803 */ 512, 2048, 4096, 8192, 32, 512, 2048, 8192, 0, 4194304, 512, 1024, 0, 0, 0, 262144, 0, 0, 0, 128,
  /* 1823 */ 268435456, 0, 0, 0, 16384, 65536, 393216, 16777216, 67108864, 134217728, 268435456, 536870912, 0, 0, 1, 2,
  /* 1839 */ 16, 32, 2048, 32, 8192, 98304, 2097152, 33554432, 0, 1, 16, 98304, 2097152, 0, 1, 16, 65536, 0, 0, 0,
  /* 1859 */ 1968979855, 1968979855, 1968979855, 16271, 89915392, 1879048192, 0, 0, 0, 255855, -1007419392, 0, 1, 2,
  /* 1873 */ 3980, 4096, 4096, 8192, 786432, 5242880, 16777216, 16777216, 67108864, 1879048192, 0, 0, 0, 2, 8, 384,
  /* 1889 */ 3584, 8192, 262144, 524288, 1048576, 2097152, 4194304, 16777216, 1879048192, 0, 0, 63, 832, 61440, 8192,
  /* 1904 */ 262144, 16777216, 536870912, 1073741824, 0, 2, 8, 128, 256, 512, 1024, 536870912, 1073741824, 0, 810533255,
  /* 1919 */ 810533255, 0, 0, 1, 16, 32, 0, 391, 1032192, 809500672, 0, 0, 3, 4, 384, 16384, 16384, 32768, 983040,
  /* 1938 */ 4194304, 805306368, 384, 16384, 32768, 917504, 4194304, 805306368, 0, 0, 0, 16777216, 0, 0, 0, 3, 256,
  /* 1955 */ 32768, 33570816, 262144, 65536, 131072, 262144, 1048576, 3, 262144, 524288, 805306368, 0, 0, 0, 423378813,
  /* 1970 */ 423378813, 423378813, 0, 1, 124, 154943232, 268435456, 256, 7680, 8192, 262144, 524288, 3145728, 524288,
  /* 1984 */ 19922944, 134217728, 268435456, 0, 524288, 3145728, 16777216, 134217728, 0, 0, 1, 32, 64, 256, 3072,
  /* 1999 */ 262144, 2097152, 16777216, 134217728, 268435456, 0, 48, 64, 256, 3584, 4096, 8192, 262144, 4096, 262144,
  /* 2014 */ 1048576, 2097152, 58720256, 0x80000000, 0, 256, 3584, 262144, 1048576, 0, 1, 1024, 2048, 0, 0, 1, 0, 1, 0,
  /* 2033 */ 0, 1, 64, 1024, 2048, 0, 0, 0, 126828544, 2013265920, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 124, 256, 536870912,
  /* 2056 */ 0x80000000, 0, 0, 1, 15230, 35897344, 61440, 4980736, 67108864, 0, 0, 0, 536870912, 0, 0, 8, 48, 320, 512,
  /* 2075 */ 28672, 28672, 32768, 786432, 4194304, 67108864, 0, 2, 4, 8, 32, 64, 512, 2048, 256, 512, 12288, 16384,
  /* 2093 */ 32768, 262144, 524288, 4194304, 16777216, 4096, 8192, 16384, 32768, 262144, 262144, 524288, 4194304,
  /* 2106 */ 67108864, 0, 64, 256, 512, 4096, 8192, 2, 8, 32, 64, 64, 256, 256, 0, 0, 65536, 0, 0, 0, 32, 256, 4096,
  /* 2129 */ 16384, 32768, 67108864, 67108864, 67108864, 131072, 16384, 32768, 0, 0, 0, 810533255, 4096, 16384, 0, 0, 2,
  /* 2146 */ 128, 0, 32, 0, 0, 2, 536870912, 0, 0
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
  "PITarget",
  "NCName",
  "QName",
  "S",
  "S",
  "CharRef",
  "CommentContents",
  "EOF",
  "'\"'",
  "'#)'",
  "''''",
  "'(#'",
  "'(:'",
  "'(:~'",
  "'*'",
  "'*'",
  "'-->'",
  "'/>'",
  "':)'",
  "'<!--'",
  "'<![CDATA['",
  "'<?'",
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

                                                            // line 494 "XQueryTokenizer.ebnf"
                                                            });
                                                            // line 3007 "XQueryTokenizer.js"
// End
