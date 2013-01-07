// This file was generated on Mon Jan 7, 2013 20:32 (UTC+01) by REx v5.21 which is Copyright (c) 1979-2012 by Gunther Rademacher <grd@gmx.net>
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
    lookahead1W(10);                // Variable | Wildcard | IntegerLiteral | DecimalLiteral | DoubleLiteral | QName |
                                    // S^WS | EOF | '"' | "'" | '(#' | '(:' | '(:~' | '<!--' | '<![CDATA[' | '<?'
    switch (l1)
    {
    case 35:                        // '<![CDATA['
      shift(35);                    // '<![CDATA['
      break;
    case 34:                        // '<!--'
      shift(34);                    // '<!--'
      break;
    case 36:                        // '<?'
      shift(36);                    // '<?'
      break;
    case 27:                        // '(#'
      shift(27);                    // '(#'
      break;
    case 29:                        // '(:~'
      shift(29);                    // '(:~'
      break;
    case 28:                        // '(:'
      shift(28);                    // '(:'
      break;
    case 24:                        // '"'
      shift(24);                    // '"'
      break;
    case 26:                        // "'"
      shift(26);                    // "'"
      break;
    case 6:                         // Wildcard
      shift(6);                     // Wildcard
      break;
    case 8:                         // IntegerLiteral
      shift(8);                     // IntegerLiteral
      break;
    case 9:                         // DecimalLiteral
      shift(9);                     // DecimalLiteral
      break;
    case 10:                        // DoubleLiteral
      shift(10);                    // DoubleLiteral
      break;
    case 1:                         // Variable
      shift(1);                     // Variable
      break;
    case 18:                        // QName
      shift(18);                    // QName
      break;
    default:
      shift(23);                    // EOF
    }
    eventHandler.endNonterminal("Start", e0);
  };

  this.parse_CData = function()
  {
    eventHandler.startNonterminal("CData", e0);
    lookahead1(3);                  // CDataSectionContents | ']]>'
    switch (l1)
    {
    case 5:                         // CDataSectionContents
      shift(5);                     // CDataSectionContents
      break;
    default:
      shift(39);                    // ']]>'
    }
    eventHandler.endNonterminal("CData", e0);
  };

  this.parse_XMLComment = function()
  {
    eventHandler.startNonterminal("XMLComment", e0);
    lookahead1(5);                  // DirCommentContents | EOF | '-->'
    switch (l1)
    {
    case 3:                         // DirCommentContents
      shift(3);                     // DirCommentContents
      break;
    case 32:                        // '-->'
      shift(32);                    // '-->'
      break;
    default:
      shift(23);                    // EOF
    }
    eventHandler.endNonterminal("XMLComment", e0);
  };

  this.parse_PI = function()
  {
    eventHandler.startNonterminal("PI", e0);
    lookahead1(6);                  // DirPIContents | PITarget | S | EOF | '?>'
    switch (l1)
    {
    case 16:                        // PITarget
      shift(16);                    // PITarget
      break;
    case 19:                        // S
      shift(19);                    // S
      break;
    case 4:                         // DirPIContents
      shift(4);                     // DirPIContents
      break;
    case 37:                        // '?>'
      shift(37);                    // '?>'
      break;
    default:
      shift(23);                    // EOF
    }
    eventHandler.endNonterminal("PI", e0);
  };

  this.parse_Pragma = function()
  {
    eventHandler.startNonterminal("Pragma", e0);
    lookahead1(2);                  // '(#'
    shift(27);                      // '(#'
    lookahead1(12);                 // EQName^Token | S | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
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
    if (l1 == 19)                   // S
    {
      shift(19);                    // S
    }
    parse_EQName();
    lookahead1(4);                  // S | '#)'
    if (l1 == 19)                   // S
    {
      shift(19);                    // S
      lookahead1(0);                // PragmaContents
      shift(2);                     // PragmaContents
    }
    lookahead1(1);                  // '#)'
    shift(25);                      // '#)'
    eventHandler.endNonterminal("Pragma", e0);
  };

  this.parse_Comment = function()
  {
    eventHandler.startNonterminal("Comment", e0);
    lookahead1W(7);                 // S^WS | CommentContents | EOF | '(:' | ':)'
    switch (l1)
    {
    case 22:                        // CommentContents
      shift(22);                    // CommentContents
      break;
    case 33:                        // ':)'
      shift(33);                    // ':)'
      break;
    case 28:                        // '(:'
      shift(28);                    // '(:'
      break;
    default:
      shift(23);                    // EOF
    }
    eventHandler.endNonterminal("Comment", e0);
  };

  this.parse_QuotString = function()
  {
    eventHandler.startNonterminal("QuotString", e0);
    lookahead1(8);                  // PredefinedEntityRef | EscapeQuot | QuotChar | CharRef | EOF | '"'
    switch (l1)
    {
    case 11:                        // PredefinedEntityRef
      shift(11);                    // PredefinedEntityRef
      break;
    case 21:                        // CharRef
      shift(21);                    // CharRef
      break;
    case 12:                        // EscapeQuot
      shift(12);                    // EscapeQuot
      break;
    case 14:                        // QuotChar
      shift(14);                    // QuotChar
      break;
    case 24:                        // '"'
      shift(24);                    // '"'
      break;
    default:
      shift(23);                    // EOF
    }
    eventHandler.endNonterminal("QuotString", e0);
  };

  this.parse_AposString = function()
  {
    eventHandler.startNonterminal("AposString", e0);
    lookahead1(9);                  // PredefinedEntityRef | EscapeApos | AposChar | CharRef | EOF | "'"
    switch (l1)
    {
    case 11:                        // PredefinedEntityRef
      shift(11);                    // PredefinedEntityRef
      break;
    case 21:                        // CharRef
      shift(21);                    // CharRef
      break;
    case 13:                        // EscapeApos
      shift(13);                    // EscapeApos
      break;
    case 15:                        // AposChar
      shift(15);                    // AposChar
      break;
    case 26:                        // "'"
      shift(26);                    // "'"
      break;
    default:
      shift(23);                    // EOF
    }
    eventHandler.endNonterminal("AposString", e0);
  };

  this.parse_NCName = function()
  {
    eventHandler.startNonterminal("NCName", e0);
    lookahead1W(13);                // NCName^Token | S^WS | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
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
    case 17:                        // NCName^Token
      shift(17);                    // NCName^Token
      break;
    case 40:                        // 'after'
      shift(40);                    // 'after'
      break;
    case 45:                        // 'and'
      shift(45);                    // 'and'
      break;
    case 49:                        // 'as'
      shift(49);                    // 'as'
      break;
    case 50:                        // 'ascending'
      shift(50);                    // 'ascending'
      break;
    case 54:                        // 'before'
      shift(54);                    // 'before'
      break;
    case 58:                        // 'case'
      shift(58);                    // 'case'
      break;
    case 59:                        // 'cast'
      shift(59);                    // 'cast'
      break;
    case 60:                        // 'castable'
      shift(60);                    // 'castable'
      break;
    case 64:                        // 'collation'
      shift(64);                    // 'collation'
      break;
    case 75:                        // 'count'
      shift(75);                    // 'count'
      break;
    case 79:                        // 'default'
      shift(79);                    // 'default'
      break;
    case 83:                        // 'descending'
      shift(83);                    // 'descending'
      break;
    case 88:                        // 'div'
      shift(88);                    // 'div'
      break;
    case 92:                        // 'else'
      shift(92);                    // 'else'
      break;
    case 93:                        // 'empty'
      shift(93);                    // 'empty'
      break;
    case 96:                        // 'end'
      shift(96);                    // 'end'
      break;
    case 98:                        // 'eq'
      shift(98);                    // 'eq'
      break;
    case 101:                       // 'except'
      shift(101);                   // 'except'
      break;
    case 107:                       // 'for'
      shift(107);                   // 'for'
      break;
    case 116:                       // 'ge'
      shift(116);                   // 'ge'
      break;
    case 118:                       // 'group'
      shift(118);                   // 'group'
      break;
    case 120:                       // 'gt'
      shift(120);                   // 'gt'
      break;
    case 121:                       // 'idiv'
      shift(121);                   // 'idiv'
      break;
    case 130:                       // 'instance'
      shift(130);                   // 'instance'
      break;
    case 132:                       // 'intersect'
      shift(132);                   // 'intersect'
      break;
    case 133:                       // 'into'
      shift(133);                   // 'into'
      break;
    case 134:                       // 'is'
      shift(134);                   // 'is'
      break;
    case 142:                       // 'le'
      shift(142);                   // 'le'
      break;
    case 144:                       // 'let'
      shift(144);                   // 'let'
      break;
    case 148:                       // 'lt'
      shift(148);                   // 'lt'
      break;
    case 150:                       // 'mod'
      shift(150);                   // 'mod'
      break;
    case 151:                       // 'modify'
      shift(151);                   // 'modify'
      break;
    case 156:                       // 'ne'
      shift(156);                   // 'ne'
      break;
    case 168:                       // 'only'
      shift(168);                   // 'only'
      break;
    case 170:                       // 'or'
      shift(170);                   // 'or'
      break;
    case 171:                       // 'order'
      shift(171);                   // 'order'
      break;
    case 190:                       // 'return'
      shift(190);                   // 'return'
      break;
    case 194:                       // 'satisfies'
      shift(194);                   // 'satisfies'
      break;
    case 206:                       // 'stable'
      shift(206);                   // 'stable'
      break;
    case 207:                       // 'start'
      shift(207);                   // 'start'
      break;
    case 218:                       // 'to'
      shift(218);                   // 'to'
      break;
    case 219:                       // 'treat'
      shift(219);                   // 'treat'
      break;
    case 224:                       // 'union'
      shift(224);                   // 'union'
      break;
    case 236:                       // 'where'
      shift(236);                   // 'where'
      break;
    case 240:                       // 'with'
      shift(240);                   // 'with'
      break;
    case 43:                        // 'ancestor'
      shift(43);                    // 'ancestor'
      break;
    case 44:                        // 'ancestor-or-self'
      shift(44);                    // 'ancestor-or-self'
      break;
    case 52:                        // 'attribute'
      shift(52);                    // 'attribute'
      break;
    case 63:                        // 'child'
      shift(63);                    // 'child'
      break;
    case 66:                        // 'comment'
      shift(66);                    // 'comment'
      break;
    case 73:                        // 'copy'
      shift(73);                    // 'copy'
      break;
    case 78:                        // 'declare'
      shift(78);                    // 'declare'
      break;
    case 80:                        // 'delete'
      shift(80);                    // 'delete'
      break;
    case 81:                        // 'descendant'
      shift(81);                    // 'descendant'
      break;
    case 82:                        // 'descendant-or-self'
      shift(82);                    // 'descendant-or-self'
      break;
    case 89:                        // 'document'
      shift(89);                    // 'document'
      break;
    case 90:                        // 'document-node'
      shift(90);                    // 'document-node'
      break;
    case 91:                        // 'element'
      shift(91);                    // 'element'
      break;
    case 94:                        // 'empty-sequence'
      shift(94);                    // 'empty-sequence'
      break;
    case 99:                        // 'every'
      shift(99);                    // 'every'
      break;
    case 104:                       // 'first'
      shift(104);                   // 'first'
      break;
    case 105:                       // 'following'
      shift(105);                   // 'following'
      break;
    case 106:                       // 'following-sibling'
      shift(106);                   // 'following-sibling'
      break;
    case 115:                       // 'function'
      shift(115);                   // 'function'
      break;
    case 122:                       // 'if'
      shift(122);                   // 'if'
      break;
    case 123:                       // 'import'
      shift(123);                   // 'import'
      break;
    case 129:                       // 'insert'
      shift(129);                   // 'insert'
      break;
    case 135:                       // 'item'
      shift(135);                   // 'item'
      break;
    case 140:                       // 'last'
      shift(140);                   // 'last'
      break;
    case 152:                       // 'module'
      shift(152);                   // 'module'
      break;
    case 154:                       // 'namespace'
      shift(154);                   // 'namespace'
      break;
    case 155:                       // 'namespace-node'
      shift(155);                   // 'namespace-node'
      break;
    case 161:                       // 'node'
      shift(161);                   // 'node'
      break;
    case 172:                       // 'ordered'
      shift(172);                   // 'ordered'
      break;
    case 176:                       // 'parent'
      shift(176);                   // 'parent'
      break;
    case 182:                       // 'preceding'
      shift(182);                   // 'preceding'
      break;
    case 183:                       // 'preceding-sibling'
      shift(183);                   // 'preceding-sibling'
      break;
    case 186:                       // 'processing-instruction'
      shift(186);                   // 'processing-instruction'
      break;
    case 188:                       // 'rename'
      shift(188);                   // 'rename'
      break;
    case 189:                       // 'replace'
      shift(189);                   // 'replace'
      break;
    case 196:                       // 'schema-attribute'
      shift(196);                   // 'schema-attribute'
      break;
    case 197:                       // 'schema-element'
      shift(197);                   // 'schema-element'
      break;
    case 199:                       // 'self'
      shift(199);                   // 'self'
      break;
    case 205:                       // 'some'
      shift(205);                   // 'some'
      break;
    case 213:                       // 'switch'
      shift(213);                   // 'switch'
      break;
    case 214:                       // 'text'
      shift(214);                   // 'text'
      break;
    case 220:                       // 'try'
      shift(220);                   // 'try'
      break;
    case 223:                       // 'typeswitch'
      shift(223);                   // 'typeswitch'
      break;
    case 226:                       // 'unordered'
      shift(226);                   // 'unordered'
      break;
    case 230:                       // 'validate'
      shift(230);                   // 'validate'
      break;
    case 232:                       // 'variable'
      shift(232);                   // 'variable'
      break;
    case 244:                       // 'xquery'
      shift(244);                   // 'xquery'
      break;
    case 42:                        // 'allowing'
      shift(42);                    // 'allowing'
      break;
    case 51:                        // 'at'
      shift(51);                    // 'at'
      break;
    case 53:                        // 'base-uri'
      shift(53);                    // 'base-uri'
      break;
    case 55:                        // 'boundary-space'
      shift(55);                    // 'boundary-space'
      break;
    case 56:                        // 'break'
      shift(56);                    // 'break'
      break;
    case 61:                        // 'catch'
      shift(61);                    // 'catch'
      break;
    case 68:                        // 'construction'
      shift(68);                    // 'construction'
      break;
    case 71:                        // 'context'
      shift(71);                    // 'context'
      break;
    case 72:                        // 'continue'
      shift(72);                    // 'continue'
      break;
    case 74:                        // 'copy-namespaces'
      shift(74);                    // 'copy-namespaces'
      break;
    case 76:                        // 'decimal-format'
      shift(76);                    // 'decimal-format'
      break;
    case 95:                        // 'encoding'
      shift(95);                    // 'encoding'
      break;
    case 102:                       // 'exit'
      shift(102);                   // 'exit'
      break;
    case 103:                       // 'external'
      shift(103);                   // 'external'
      break;
    case 111:                       // 'ft-option'
      shift(111);                   // 'ft-option'
      break;
    case 124:                       // 'in'
      shift(124);                   // 'in'
      break;
    case 125:                       // 'index'
      shift(125);                   // 'index'
      break;
    case 131:                       // 'integrity'
      shift(131);                   // 'integrity'
      break;
    case 141:                       // 'lax'
      shift(141);                   // 'lax'
      break;
    case 162:                       // 'nodes'
      shift(162);                   // 'nodes'
      break;
    case 169:                       // 'option'
      shift(169);                   // 'option'
      break;
    case 173:                       // 'ordering'
      shift(173);                   // 'ordering'
      break;
    case 192:                       // 'revalidation'
      shift(192);                   // 'revalidation'
      break;
    case 195:                       // 'schema'
      shift(195);                   // 'schema'
      break;
    case 198:                       // 'score'
      shift(198);                   // 'score'
      break;
    case 204:                       // 'sliding'
      shift(204);                   // 'sliding'
      break;
    case 210:                       // 'strict'
      shift(210);                   // 'strict'
      break;
    case 221:                       // 'tumbling'
      shift(221);                   // 'tumbling'
      break;
    case 222:                       // 'type'
      shift(222);                   // 'type'
      break;
    case 227:                       // 'updating'
      shift(227);                   // 'updating'
      break;
    case 231:                       // 'value'
      shift(231);                   // 'value'
      break;
    case 233:                       // 'version'
      shift(233);                   // 'version'
      break;
    case 237:                       // 'while'
      shift(237);                   // 'while'
      break;
    case 67:                        // 'constraint'
      shift(67);                    // 'constraint'
      break;
    case 146:                       // 'loop'
      shift(146);                   // 'loop'
      break;
    default:
      shift(191);                   // 'returning'
    }
    eventHandler.endNonterminal("NCName", e0);
  };

  function parse_EQName()
  {
    eventHandler.startNonterminal("EQName", e0);
    lookahead1(11);                 // EQName^Token | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' | 'and' |
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
    case 52:                        // 'attribute'
      shift(52);                    // 'attribute'
      break;
    case 66:                        // 'comment'
      shift(66);                    // 'comment'
      break;
    case 90:                        // 'document-node'
      shift(90);                    // 'document-node'
      break;
    case 91:                        // 'element'
      shift(91);                    // 'element'
      break;
    case 94:                        // 'empty-sequence'
      shift(94);                    // 'empty-sequence'
      break;
    case 115:                       // 'function'
      shift(115);                   // 'function'
      break;
    case 122:                       // 'if'
      shift(122);                   // 'if'
      break;
    case 135:                       // 'item'
      shift(135);                   // 'item'
      break;
    case 155:                       // 'namespace-node'
      shift(155);                   // 'namespace-node'
      break;
    case 161:                       // 'node'
      shift(161);                   // 'node'
      break;
    case 186:                       // 'processing-instruction'
      shift(186);                   // 'processing-instruction'
      break;
    case 196:                       // 'schema-attribute'
      shift(196);                   // 'schema-attribute'
      break;
    case 197:                       // 'schema-element'
      shift(197);                   // 'schema-element'
      break;
    case 213:                       // 'switch'
      shift(213);                   // 'switch'
      break;
    case 214:                       // 'text'
      shift(214);                   // 'text'
      break;
    case 223:                       // 'typeswitch'
      shift(223);                   // 'typeswitch'
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
    case 7:                         // EQName^Token
      shift(7);                     // EQName^Token
      break;
    case 40:                        // 'after'
      shift(40);                    // 'after'
      break;
    case 43:                        // 'ancestor'
      shift(43);                    // 'ancestor'
      break;
    case 44:                        // 'ancestor-or-self'
      shift(44);                    // 'ancestor-or-self'
      break;
    case 45:                        // 'and'
      shift(45);                    // 'and'
      break;
    case 49:                        // 'as'
      shift(49);                    // 'as'
      break;
    case 50:                        // 'ascending'
      shift(50);                    // 'ascending'
      break;
    case 54:                        // 'before'
      shift(54);                    // 'before'
      break;
    case 58:                        // 'case'
      shift(58);                    // 'case'
      break;
    case 59:                        // 'cast'
      shift(59);                    // 'cast'
      break;
    case 60:                        // 'castable'
      shift(60);                    // 'castable'
      break;
    case 63:                        // 'child'
      shift(63);                    // 'child'
      break;
    case 64:                        // 'collation'
      shift(64);                    // 'collation'
      break;
    case 73:                        // 'copy'
      shift(73);                    // 'copy'
      break;
    case 75:                        // 'count'
      shift(75);                    // 'count'
      break;
    case 78:                        // 'declare'
      shift(78);                    // 'declare'
      break;
    case 79:                        // 'default'
      shift(79);                    // 'default'
      break;
    case 80:                        // 'delete'
      shift(80);                    // 'delete'
      break;
    case 81:                        // 'descendant'
      shift(81);                    // 'descendant'
      break;
    case 82:                        // 'descendant-or-self'
      shift(82);                    // 'descendant-or-self'
      break;
    case 83:                        // 'descending'
      shift(83);                    // 'descending'
      break;
    case 88:                        // 'div'
      shift(88);                    // 'div'
      break;
    case 89:                        // 'document'
      shift(89);                    // 'document'
      break;
    case 92:                        // 'else'
      shift(92);                    // 'else'
      break;
    case 93:                        // 'empty'
      shift(93);                    // 'empty'
      break;
    case 96:                        // 'end'
      shift(96);                    // 'end'
      break;
    case 98:                        // 'eq'
      shift(98);                    // 'eq'
      break;
    case 99:                        // 'every'
      shift(99);                    // 'every'
      break;
    case 101:                       // 'except'
      shift(101);                   // 'except'
      break;
    case 104:                       // 'first'
      shift(104);                   // 'first'
      break;
    case 105:                       // 'following'
      shift(105);                   // 'following'
      break;
    case 106:                       // 'following-sibling'
      shift(106);                   // 'following-sibling'
      break;
    case 107:                       // 'for'
      shift(107);                   // 'for'
      break;
    case 116:                       // 'ge'
      shift(116);                   // 'ge'
      break;
    case 118:                       // 'group'
      shift(118);                   // 'group'
      break;
    case 120:                       // 'gt'
      shift(120);                   // 'gt'
      break;
    case 121:                       // 'idiv'
      shift(121);                   // 'idiv'
      break;
    case 123:                       // 'import'
      shift(123);                   // 'import'
      break;
    case 129:                       // 'insert'
      shift(129);                   // 'insert'
      break;
    case 130:                       // 'instance'
      shift(130);                   // 'instance'
      break;
    case 132:                       // 'intersect'
      shift(132);                   // 'intersect'
      break;
    case 133:                       // 'into'
      shift(133);                   // 'into'
      break;
    case 134:                       // 'is'
      shift(134);                   // 'is'
      break;
    case 140:                       // 'last'
      shift(140);                   // 'last'
      break;
    case 142:                       // 'le'
      shift(142);                   // 'le'
      break;
    case 144:                       // 'let'
      shift(144);                   // 'let'
      break;
    case 148:                       // 'lt'
      shift(148);                   // 'lt'
      break;
    case 150:                       // 'mod'
      shift(150);                   // 'mod'
      break;
    case 151:                       // 'modify'
      shift(151);                   // 'modify'
      break;
    case 152:                       // 'module'
      shift(152);                   // 'module'
      break;
    case 154:                       // 'namespace'
      shift(154);                   // 'namespace'
      break;
    case 156:                       // 'ne'
      shift(156);                   // 'ne'
      break;
    case 168:                       // 'only'
      shift(168);                   // 'only'
      break;
    case 170:                       // 'or'
      shift(170);                   // 'or'
      break;
    case 171:                       // 'order'
      shift(171);                   // 'order'
      break;
    case 172:                       // 'ordered'
      shift(172);                   // 'ordered'
      break;
    case 176:                       // 'parent'
      shift(176);                   // 'parent'
      break;
    case 182:                       // 'preceding'
      shift(182);                   // 'preceding'
      break;
    case 183:                       // 'preceding-sibling'
      shift(183);                   // 'preceding-sibling'
      break;
    case 188:                       // 'rename'
      shift(188);                   // 'rename'
      break;
    case 189:                       // 'replace'
      shift(189);                   // 'replace'
      break;
    case 190:                       // 'return'
      shift(190);                   // 'return'
      break;
    case 194:                       // 'satisfies'
      shift(194);                   // 'satisfies'
      break;
    case 199:                       // 'self'
      shift(199);                   // 'self'
      break;
    case 205:                       // 'some'
      shift(205);                   // 'some'
      break;
    case 206:                       // 'stable'
      shift(206);                   // 'stable'
      break;
    case 207:                       // 'start'
      shift(207);                   // 'start'
      break;
    case 218:                       // 'to'
      shift(218);                   // 'to'
      break;
    case 219:                       // 'treat'
      shift(219);                   // 'treat'
      break;
    case 220:                       // 'try'
      shift(220);                   // 'try'
      break;
    case 224:                       // 'union'
      shift(224);                   // 'union'
      break;
    case 226:                       // 'unordered'
      shift(226);                   // 'unordered'
      break;
    case 230:                       // 'validate'
      shift(230);                   // 'validate'
      break;
    case 236:                       // 'where'
      shift(236);                   // 'where'
      break;
    case 240:                       // 'with'
      shift(240);                   // 'with'
      break;
    case 244:                       // 'xquery'
      shift(244);                   // 'xquery'
      break;
    case 42:                        // 'allowing'
      shift(42);                    // 'allowing'
      break;
    case 51:                        // 'at'
      shift(51);                    // 'at'
      break;
    case 53:                        // 'base-uri'
      shift(53);                    // 'base-uri'
      break;
    case 55:                        // 'boundary-space'
      shift(55);                    // 'boundary-space'
      break;
    case 56:                        // 'break'
      shift(56);                    // 'break'
      break;
    case 61:                        // 'catch'
      shift(61);                    // 'catch'
      break;
    case 68:                        // 'construction'
      shift(68);                    // 'construction'
      break;
    case 71:                        // 'context'
      shift(71);                    // 'context'
      break;
    case 72:                        // 'continue'
      shift(72);                    // 'continue'
      break;
    case 74:                        // 'copy-namespaces'
      shift(74);                    // 'copy-namespaces'
      break;
    case 76:                        // 'decimal-format'
      shift(76);                    // 'decimal-format'
      break;
    case 95:                        // 'encoding'
      shift(95);                    // 'encoding'
      break;
    case 102:                       // 'exit'
      shift(102);                   // 'exit'
      break;
    case 103:                       // 'external'
      shift(103);                   // 'external'
      break;
    case 111:                       // 'ft-option'
      shift(111);                   // 'ft-option'
      break;
    case 124:                       // 'in'
      shift(124);                   // 'in'
      break;
    case 125:                       // 'index'
      shift(125);                   // 'index'
      break;
    case 131:                       // 'integrity'
      shift(131);                   // 'integrity'
      break;
    case 141:                       // 'lax'
      shift(141);                   // 'lax'
      break;
    case 162:                       // 'nodes'
      shift(162);                   // 'nodes'
      break;
    case 169:                       // 'option'
      shift(169);                   // 'option'
      break;
    case 173:                       // 'ordering'
      shift(173);                   // 'ordering'
      break;
    case 192:                       // 'revalidation'
      shift(192);                   // 'revalidation'
      break;
    case 195:                       // 'schema'
      shift(195);                   // 'schema'
      break;
    case 198:                       // 'score'
      shift(198);                   // 'score'
      break;
    case 204:                       // 'sliding'
      shift(204);                   // 'sliding'
      break;
    case 210:                       // 'strict'
      shift(210);                   // 'strict'
      break;
    case 221:                       // 'tumbling'
      shift(221);                   // 'tumbling'
      break;
    case 222:                       // 'type'
      shift(222);                   // 'type'
      break;
    case 227:                       // 'updating'
      shift(227);                   // 'updating'
      break;
    case 231:                       // 'value'
      shift(231);                   // 'value'
      break;
    case 232:                       // 'variable'
      shift(232);                   // 'variable'
      break;
    case 233:                       // 'version'
      shift(233);                   // 'version'
      break;
    case 237:                       // 'while'
      shift(237);                   // 'while'
      break;
    case 67:                        // 'constraint'
      shift(67);                    // 'constraint'
      break;
    case 146:                       // 'loop'
      shift(146);                   // 'loop'
      break;
    default:
      shift(191);                   // 'returning'
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
      if (code != 20)               // S^WS
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
      for (var i = result >> 8; i > 0; --i)
      {
        --end;
        var c1 = end < size ? input.charCodeAt(end) : 0;
        if (c1 >= 0xdc00 && c1 < 0xe000) --end;
      }
    }
    else
    {
      end -= result >> 8;
    }

    return (result & 255) - 1;
  }

  function getExpectedTokenSet(s)
  {
    var set = [];
    if (s > 0)
    {
      for (var i = 0; i < 246; i += 32)
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
    var i0 = t * 1347 + s - 1;
    var i1 = i0 >> 2;
    var i2 = i1 >> 2;
    return XQueryTokenizer.EXPECTED[(i0 & 3) + XQueryTokenizer.EXPECTED[(i1 & 3) + XQueryTokenizer.EXPECTED[(i2 & 3) + XQueryTokenizer.EXPECTED[i2 >> 2]]]];
  }
}

XQueryTokenizer.MAP0 =
[
  /*   0 */ 62, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4,
  /*  36 */ 5, 6, 7, 8, 9, 10, 11, 12, 6, 13, 14, 6, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 17, 18, 6, 19, 20, 6,
  /*  65 */ 21, 22, 23, 24, 25, 22, 26, 26, 26, 26, 26, 27, 28, 26, 26, 26, 29, 26, 26, 30, 26, 26, 26, 31, 26, 26, 32,
  /*  92 */ 6, 33, 6, 26, 6, 34, 35, 36, 37, 38, 39, 40, 41, 42, 26, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
  /* 120 */ 56, 57, 26, 58, 6, 59, 60, 6
];

XQueryTokenizer.MAP1 =
[
  /*   0 */ 108, 124, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 156, 181, 181, 181, 181,
  /*  21 */ 181, 214, 215, 213, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  42 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  63 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  84 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /* 105 */ 214, 214, 214, 247, 261, 277, 331, 394, 347, 363, 379, 314, 314, 314, 306, 423, 415, 423, 415, 423, 423,
  /* 126 */ 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 439, 439, 439, 439, 439, 439, 439,
  /* 147 */ 408, 423, 423, 423, 423, 423, 423, 423, 423, 292, 314, 314, 315, 313, 314, 314, 423, 423, 423, 423, 423,
  /* 168 */ 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 314, 314, 314, 314, 314, 314, 314, 314,
  /* 189 */ 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314, 314,
  /* 210 */ 314, 314, 314, 422, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423,
  /* 231 */ 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 423, 314, 62, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 256 */ 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 6, 13,
  /* 291 */ 14, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 26, 26, 6, 6, 6, 6, 6, 6, 6, 61, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
  /* 326 */ 6, 6, 6, 6, 61, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 16, 17, 18, 6, 19, 20, 26, 29, 26, 26, 30, 26, 26,
  /* 354 */ 26, 31, 26, 26, 32, 6, 33, 6, 26, 6, 34, 35, 36, 37, 38, 39, 40, 41, 42, 26, 43, 44, 45, 46, 47, 48, 49, 50,
  /* 382 */ 51, 52, 53, 54, 55, 56, 57, 26, 58, 6, 59, 60, 6, 21, 22, 23, 24, 25, 22, 26, 26, 26, 26, 26, 27, 28, 26,
  /* 409 */ 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 6, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
  /* 436 */ 26, 26, 26, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61, 61
];

XQueryTokenizer.MAP2 =
[
  /*  0 */ 57344, 63744, 64976, 65008, 65536, 983040, 63743, 64975, 65007, 65533, 983039, 1114111, 6, 26, 6, 26, 26, 6
];

XQueryTokenizer.INITIAL =
[
  /*  0 */ 1, 2, 3, 12292, 5, 8198, 7, 8, 9, 10, 11, 12, 13, 14
];

XQueryTokenizer.TRANSITION =
[
  /*     0 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*    15 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*    30 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*    45 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*    60 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*    75 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*    90 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   105 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   120 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11673, 8064, 8080, 9344, 9588, 10250, 8573, 9340,
  /*   136 */ 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241,
  /*   153 */ 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157,
  /*   170 */ 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624,
  /*   187 */ 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585,
  /*   204 */ 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   220 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   235 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   250 */ 16601, 16601, 16601, 16601, 16601, 16601, 11211, 9227, 9243, 9344, 9588, 10250, 8573, 9340, 9188, 9024,
  /*   266 */ 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743,
  /*   283 */ 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280,
  /*   300 */ 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833,
  /*   317 */ 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468,
  /*   334 */ 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   350 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   365 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   380 */ 16601, 16601, 16601, 16601, 11309, 9273, 9312, 9344, 9588, 10250, 8573, 9340, 9188, 9024, 8802, 8499,
  /*   396 */ 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902,
  /*   413 */ 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522,
  /*   430 */ 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818,
  /*   447 */ 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067,
  /*   464 */ 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   480 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   495 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   510 */ 16601, 16601, 9362, 9401, 9417, 9344, 9588, 10250, 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686,
  /*   527 */ 8846, 9500, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 8565, 10902, 8485, 8257, 8273,
  /*   544 */ 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589,
  /*   561 */ 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994,
  /*   578 */ 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128,
  /*   595 */ 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   610 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   625 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   640 */ 11225, 9227, 19390, 9344, 9588, 10250, 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156,
  /*   657 */ 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550,
  /*   674 */ 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793,
  /*   691 */ 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901,
  /*   708 */ 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204,
  /*   725 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   740 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   755 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11211, 9227,
  /*   770 */ 19390, 9344, 9588, 10250, 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168,
  /*   787 */ 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322,
  /*   804 */ 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664,
  /*   821 */ 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082,
  /*   838 */ 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601,
  /*   855 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   870 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   885 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11701, 9273, 9211, 9344,
  /*   900 */ 9588, 10250, 13615, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 19418, 8156, 9346, 8168, 8614, 9344,
  /*   917 */ 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506,
  /*   934 */ 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680,
  /*   951 */ 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917,
  /*   968 */ 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601,
  /*   984 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*   999 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1014 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11295, 9227, 13453, 9344, 9588,
  /*  1029 */ 10250, 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577,
  /*  1046 */ 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390,
  /*  1063 */ 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702,
  /*  1080 */ 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980,
  /*  1097 */ 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601,
  /*  1113 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1128 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1143 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11197, 9530, 19390, 9344, 9588, 8964, 8573,
  /*  1159 */ 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214,
  /*  1176 */ 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471,
  /*  1193 */ 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782,
  /*  1210 */ 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604,
  /*  1227 */ 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1243 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1258 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1273 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11715, 9546, 19390, 9344, 9588, 13476, 8573, 9340, 9188,
  /*  1289 */ 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198,
  /*  1306 */ 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093,
  /*  1323 */ 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143,
  /*  1340 */ 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540,
  /*  1357 */ 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1373 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1388 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1403 */ 16601, 16601, 16601, 16601, 16601, 11281, 9227, 19390, 9344, 9588, 10250, 10841, 9340, 9188, 9024, 8802,
  /*  1419 */ 8499, 8109, 8125, 8686, 8846, 9562, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755,
  /*  1436 */ 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431,
  /*  1453 */ 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932,
  /*  1470 */ 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010,
  /*  1487 */ 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1503 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1518 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1533 */ 16601, 16601, 16601, 11211, 9227, 19390, 9344, 9588, 10250, 11046, 9340, 9188, 9024, 8802, 8499, 8109,
  /*  1549 */ 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485,
  /*  1566 */ 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537,
  /*  1583 */ 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870,
  /*  1600 */ 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052,
  /*  1617 */ 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1632 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1647 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1662 */ 16601, 16601, 11687, 9604, 18300, 15718, 14948, 17115, 15623, 15718, 12635, 15718, 15718, 14949, 19094,
  /*  1677 */ 12717, 12717, 17565, 9620, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717, 13607,
  /*  1692 */ 14235, 9643, 15718, 15718, 15718, 13995, 13747, 12717, 12717, 12717, 12718, 16601, 15718, 19668, 15718,
  /*  1707 */ 15718, 15722, 12717, 19087, 12717, 12717, 16744, 15715, 15718, 15718, 9662, 12717, 12717, 18849, 18927,
  /*  1722 */ 19994, 15718, 15721, 18354, 12717, 12078, 9681, 15718, 14382, 9716, 12058, 16147, 20323, 15826, 14854,
  /*  1737 */ 9737, 9765, 18129, 9797, 14947, 15280, 9789, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601,
  /*  1753 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1768 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1783 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11239, 9815, 9831, 15718, 14948, 16784,
  /*  1798 */ 15095, 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 17565, 9866, 15718, 15718, 15718, 15718,
  /*  1813 */ 15720, 12717, 12717, 12717, 12717, 12717, 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717,
  /*  1828 */ 12717, 12717, 12718, 16601, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744, 15715,
  /*  1843 */ 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718,
  /*  1858 */ 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322,
  /*  1873 */ 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1888 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1903 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  1918 */ 16601, 16601, 11253, 9815, 9889, 15718, 14948, 16784, 9924, 15718, 15718, 15718, 15718, 14949, 12717,
  /*  1933 */ 12717, 12717, 9982, 9997, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717, 10020,
  /*  1948 */ 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717, 12717, 17780, 13809, 15718, 15718, 15718,
  /*  1963 */ 15718, 15722, 12717, 12717, 12717, 12717, 12359, 10082, 15718, 15718, 15719, 12717, 12717, 12717, 16622,
  /*  1978 */ 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799,
  /*  1993 */ 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601,
  /*  2008 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2023 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2038 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11323, 10100, 10116, 10493, 10212,
  /*  2053 */ 10558, 11022, 10489, 10145, 10588, 10371, 10242, 8109, 8125, 8686, 8846, 10161, 10495, 10173, 8756, 10493,
  /*  2069 */ 10201, 8196, 8214, 8241, 8198, 10743, 10755, 10228, 10475, 10266, 10282, 10461, 8956, 8296, 8322, 8353,
  /*  2085 */ 8506, 8390, 16601, 10305, 10319, 10129, 10289, 10700, 8522, 8537, 8553, 8589, 8640, 10362, 10600, 10335,
  /*  2101 */ 10654, 8680, 8702, 8731, 10351, 8766, 10387, 10417, 8932, 8818, 10446, 10817, 10401, 10786, 8901, 8337,
  /*  2117 */ 10511, 10527, 8917, 10574, 10185, 8746, 10209, 8946, 10616, 10640, 10685, 10670, 10729, 10771, 10802,
  /*  2132 */ 10833, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2147 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2162 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11211,
  /*  2177 */ 9227, 19390, 9344, 9588, 10250, 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 10713, 8156, 9346,
  /*  2194 */ 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 8366, 10902, 8485, 8257, 8273, 9326, 10550, 8296,
  /*  2211 */ 8322, 8353, 8506, 8390, 13821, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 10857, 10873, 9036,
  /*  2228 */ 8664, 9257, 8680, 8702, 8731, 10889, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140,
  /*  2245 */ 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601,
  /*  2262 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2277 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2292 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11267, 9227, 19390,
  /*  2307 */ 9344, 9588, 10250, 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614,
  /*  2324 */ 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353,
  /*  2341 */ 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257,
  /*  2358 */ 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405,
  /*  2375 */ 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601,
  /*  2392 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2407 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2422 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11211, 10918, 19390, 9344, 9588,
  /*  2437 */ 8306, 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8225, 8156, 9346, 8168, 8614, 9344, 9577,
  /*  2454 */ 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390,
  /*  2471 */ 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702,
  /*  2488 */ 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980,
  /*  2505 */ 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601,
  /*  2521 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2536 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2551 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11659, 10934, 10950, 9344, 9588, 10624,
  /*  2566 */ 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196,
  /*  2583 */ 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601,
  /*  2600 */ 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731,
  /*  2617 */ 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180,
  /*  2634 */ 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601,
  /*  2650 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2665 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2680 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11337, 9815, 10966, 15718, 14948, 16784, 16289,
  /*  2695 */ 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 10995, 18823, 15718, 15718, 15718, 15718, 15720,
  /*  2710 */ 12717, 12717, 12717, 12717, 12717, 11038, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717,
  /*  2725 */ 12717, 12718, 11010, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 15189, 10082, 15718,
  /*  2740 */ 15718, 15719, 12717, 12717, 12717, 17763, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946,
  /*  2755 */ 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011,
  /*  2770 */ 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2785 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2800 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2815 */ 16601, 11337, 9815, 10966, 15718, 14948, 16784, 16289, 15718, 15718, 15718, 15718, 14949, 12717, 12717,
  /*  2830 */ 12717, 10995, 18823, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717, 11038, 15717,
  /*  2845 */ 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717, 12717, 12718, 12161, 15718, 15718, 15718, 15718,
  /*  2860 */ 15722, 12717, 12717, 12717, 12717, 15189, 10082, 15718, 15718, 15719, 12717, 12717, 12717, 16622, 15718,
  /*  2875 */ 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946,
  /*  2890 */ 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601,
  /*  2905 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2920 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  2935 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11337, 9815, 10966, 15718, 14948, 16784,
  /*  2950 */ 16289, 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 10995, 16199, 15718, 15718, 15718, 15718,
  /*  2965 */ 15720, 12717, 12717, 12717, 12717, 12717, 11038, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717,
  /*  2980 */ 12717, 12717, 12718, 12161, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 15189, 10082,
  /*  2995 */ 15718, 15718, 15719, 12717, 12717, 12717, 16622, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718,
  /*  3010 */ 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322,
  /*  3025 */ 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3040 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3055 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3070 */ 16601, 16601, 11337, 9815, 10966, 15718, 14948, 16784, 16289, 15718, 15718, 15718, 15718, 14949, 12717,
  /*  3085 */ 12717, 12717, 10995, 18823, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717, 11062,
  /*  3100 */ 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717, 12717, 12718, 12161, 15718, 15718, 15718,
  /*  3115 */ 15718, 15722, 12717, 12717, 12717, 12717, 15189, 10082, 15718, 15718, 15719, 12717, 12717, 12717, 16622,
  /*  3130 */ 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799,
  /*  3145 */ 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601,
  /*  3160 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3175 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3190 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11337, 9815, 11087, 15718, 14948,
  /*  3205 */ 16784, 16483, 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 10995, 18823, 15718, 15718, 15718,
  /*  3220 */ 15718, 15720, 12717, 12717, 12717, 12717, 12717, 11038, 15717, 15718, 15718, 15718, 15718, 20323, 12717,
  /*  3235 */ 12717, 12717, 12717, 12718, 12161, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 15189,
  /*  3250 */ 10082, 15718, 15718, 15719, 12717, 12717, 12717, 16622, 15718, 15718, 15721, 12717, 12717, 16349, 15718,
  /*  3265 */ 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058,
  /*  3280 */ 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3295 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3310 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3325 */ 16601, 16601, 16601, 11337, 9815, 10966, 15718, 14948, 16784, 16289, 15718, 15718, 15718, 15718, 14949,
  /*  3340 */ 12717, 12717, 12717, 18500, 18823, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717,
  /*  3355 */ 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717, 12717, 12718, 16601, 15718, 15718,
  /*  3370 */ 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744, 15715, 15718, 15718, 15719, 12717, 12717, 12717,
  /*  3385 */ 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717,
  /*  3400 */ 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601,
  /*  3416 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3431 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3446 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11337, 9815, 10966, 15718, 14948,
  /*  3461 */ 13975, 16289, 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 18500, 18823, 15718, 15718, 15718,
  /*  3476 */ 15718, 15720, 12717, 12717, 12717, 12717, 12717, 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717,
  /*  3491 */ 12717, 12717, 12717, 12718, 16601, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744,
  /*  3506 */ 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718,
  /*  3521 */ 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058,
  /*  3536 */ 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3551 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3566 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3581 */ 16601, 16601, 16601, 11337, 11116, 10966, 15718, 14948, 16784, 16289, 15718, 15718, 15718, 15718, 14949,
  /*  3596 */ 12717, 12717, 12717, 18500, 18823, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717,
  /*  3611 */ 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717, 12717, 12718, 16601, 15718, 15718,
  /*  3626 */ 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744, 15715, 15718, 15718, 15719, 12717, 12717, 12717,
  /*  3641 */ 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717,
  /*  3656 */ 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601,
  /*  3672 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3687 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3702 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11617, 9815, 11132, 15718, 14948,
  /*  3717 */ 16784, 16289, 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 18500, 18823, 15718, 15718, 15718,
  /*  3732 */ 15718, 15720, 12717, 12717, 12717, 12717, 12717, 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717,
  /*  3747 */ 12717, 12717, 12717, 12718, 16601, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744,
  /*  3762 */ 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718,
  /*  3777 */ 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058,
  /*  3792 */ 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3807 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3822 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3837 */ 16601, 16601, 16601, 11337, 9815, 10966, 15718, 14948, 16784, 16289, 15718, 15718, 15718, 15718, 14949,
  /*  3852 */ 12717, 12717, 12717, 18500, 18823, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717,
  /*  3867 */ 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717, 12717, 12718, 16601, 15718, 15718,
  /*  3882 */ 15718, 15718, 15722, 12717, 12717, 12717, 12717, 19604, 15715, 15718, 15718, 15719, 12717, 12717, 12717,
  /*  3897 */ 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717,
  /*  3912 */ 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601,
  /*  3928 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3943 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  3958 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11631, 9815, 10966, 15718, 14948,
  /*  3973 */ 16784, 16289, 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 18500, 18823, 15718, 15718, 15718,
  /*  3988 */ 15718, 15720, 12717, 12717, 12717, 12717, 12717, 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717,
  /*  4003 */ 12717, 12717, 12717, 12718, 16601, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744,
  /*  4018 */ 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718,
  /*  4033 */ 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058,
  /*  4048 */ 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4063 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4078 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4093 */ 16601, 16601, 16601, 11211, 9227, 19390, 9344, 9588, 10250, 8374, 9340, 9188, 9024, 8802, 8499, 8109,
  /*  4109 */ 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485,
  /*  4126 */ 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537,
  /*  4143 */ 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 11167,
  /*  4160 */ 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052,
  /*  4177 */ 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4192 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4207 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4222 */ 16601, 16601, 11183, 11731, 19390, 9344, 9588, 9112, 8573, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686,
  /*  4239 */ 10430, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273,
  /*  4256 */ 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589,
  /*  4273 */ 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994,
  /*  4290 */ 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128,
  /*  4307 */ 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4322 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4337 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4352 */ 11351, 9815, 11747, 11782, 11817, 11856, 16289, 15718, 15718, 15718, 19989, 14949, 12717, 12717, 13773,
  /*  4367 */ 10995, 9288, 11872, 15718, 15718, 11907, 11929, 15181, 11963, 12717, 12244, 17810, 11981, 9873, 15891,
  /*  4382 */ 15918, 18185, 15718, 12007, 12026, 12717, 12055, 12074, 12572, 12161, 19548, 12094, 15718, 12208, 9694,
  /*  4397 */ 12114, 12717, 12717, 12130, 12151, 12177, 12224, 14898, 15719, 20492, 13344, 12260, 16622, 20144, 15718,
  /*  4412 */ 12279, 20162, 12717, 12300, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 11947,
  /*  4427 */ 15664, 14483, 14726, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601,
  /*  4442 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4457 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4472 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11365, 9815, 10966, 15718, 14948, 16784, 16289,
  /*  4487 */ 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 10995, 18823, 15718, 15718, 15718, 16227, 12328,
  /*  4502 */ 12717, 12717, 12717, 12717, 12350, 11038, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717,
  /*  4517 */ 12717, 12718, 12161, 14808, 15718, 15718, 15718, 19797, 12375, 12717, 12717, 12717, 12397, 10082, 15718,
  /*  4532 */ 15718, 15719, 12717, 12717, 12717, 16622, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946,
  /*  4547 */ 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 11840, 12413, 12465, 12058, 20322, 19011,
  /*  4562 */ 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4577 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4592 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4607 */ 16601, 11379, 9815, 10966, 9646, 14948, 12484, 16289, 12500, 12530, 15718, 15718, 12550, 12588, 12717,
  /*  4622 */ 12717, 10995, 18823, 12611, 14054, 15718, 12658, 15720, 15030, 12676, 12696, 17227, 12717, 11038, 15717,
  /*  4637 */ 15718, 15718, 15718, 19467, 20323, 12717, 12717, 12717, 14609, 12718, 12161, 15718, 15718, 15718, 16105,
  /*  4652 */ 15722, 12717, 12717, 12717, 12716, 15189, 10082, 15718, 12734, 15719, 12717, 12700, 12717, 16622, 18440,
  /*  4667 */ 19039, 15721, 16849, 19340, 16349, 15718, 15718, 12752, 12717, 18210, 15718, 20323, 12717, 9799, 14946,
  /*  4682 */ 9795, 14945, 14393, 17617, 9799, 12058, 20322, 19011, 14139, 12770, 12784, 16601, 16601, 16601, 16601,
  /*  4697 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4712 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4727 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11393, 9815, 10966, 14864, 14685, 16784,
  /*  4742 */ 16289, 12808, 12826, 18117, 15434, 12885, 12906, 12926, 15336, 10995, 18823, 15718, 15718, 15718, 11151,
  /*  4757 */ 15720, 12717, 12717, 12717, 12717, 12964, 11038, 12312, 15134, 15718, 15718, 15414, 12981, 12997, 13018,
  /*  4772 */ 12717, 12717, 13596, 12161, 13039, 15718, 15718, 13059, 9665, 12717, 12717, 20531, 12717, 15189, 10082,
  /*  4787 */ 9844, 17588, 13077, 12717, 13095, 13113, 16622, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718,
  /*  4802 */ 13161, 12717, 13352, 15718, 20323, 12717, 9799, 14946, 17137, 19017, 19057, 19805, 9799, 12058, 20322,
  /*  4817 */ 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4832 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4847 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4862 */ 16601, 16601, 11407, 9815, 11087, 13180, 13217, 13261, 16483, 19476, 13277, 13296, 15288, 13333, 13368,
  /*  4877 */ 13390, 13410, 13438, 8405, 13492, 13532, 13565, 14110, 13581, 13631, 13674, 17096, 13726, 13763, 13797,
  /*  4892 */ 10084, 13837, 15718, 16721, 13871, 13889, 17945, 13911, 12717, 13929, 14735, 12161, 17527, 9949, 20080,
  /*  4907 */ 13954, 13991, 14011, 14030, 14354, 16330, 15189, 10082, 14051, 14070, 15719, 16688, 18557, 13201, 16622,
  /*  4922 */ 17451, 14101, 14126, 14165, 14199, 14223, 14258, 11884, 11938, 14300, 12058, 15718, 11760, 12717, 14331,
  /*  4937 */ 20017, 9795, 13139, 14370, 13505, 14409, 14447, 20322, 18702, 14473, 8455, 12784, 16601, 16601, 16601,
  /*  4952 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4967 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  4982 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11421, 9815, 14516, 14493, 18241,
  /*  4997 */ 16784, 16289, 15217, 15718, 15718, 15718, 14532, 12717, 12717, 12717, 10995, 18823, 15718, 15718, 15718,
  /*  5012 */ 14500, 15720, 12717, 12717, 12717, 16261, 12717, 11038, 15717, 15718, 15718, 14569, 15718, 20323, 12717,
  /*  5027 */ 12717, 14183, 12717, 12718, 12161, 15718, 15718, 15718, 19693, 15722, 12717, 12717, 12717, 14587, 15189,
  /*  5042 */ 10082, 15718, 15718, 15719, 12717, 12717, 12717, 16622, 15718, 15718, 15721, 12717, 12717, 16349, 13317,
  /*  5057 */ 15718, 14946, 14607, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058,
  /*  5072 */ 20322, 17392, 17405, 14625, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5087 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5102 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5117 */ 16601, 16601, 16601, 11435, 9815, 14713, 15718, 14948, 16784, 16289, 15718, 15718, 15718, 15718, 14949,
  /*  5132 */ 12717, 12717, 12717, 18500, 9377, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717,
  /*  5147 */ 14977, 15717, 15718, 17695, 15718, 15718, 20323, 12717, 12717, 14751, 12717, 12718, 16601, 15718, 15718,
  /*  5162 */ 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744, 15715, 15718, 15718, 14771, 12717, 12717, 20434,
  /*  5177 */ 9721, 15718, 14794, 16940, 12717, 14841, 15396, 15718, 14887, 14276, 19241, 14921, 12200, 14943, 14965,
  /*  5192 */ 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 13245, 8455, 12784, 16601, 16601, 16601,
  /*  5208 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5223 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5238 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11337, 9815, 10966, 15005, 15023,
  /*  5253 */ 18746, 16289, 15718, 15718, 15718, 15046, 14949, 12717, 12717, 15063, 18500, 18823, 15718, 15718, 15718,
  /*  5268 */ 15718, 18519, 12717, 12717, 12717, 12717, 12717, 15083, 9627, 15718, 15718, 15718, 15718, 20323, 15111,
  /*  5283 */ 12717, 12717, 12717, 12718, 16601, 15718, 15718, 15718, 16385, 15722, 12717, 12717, 12717, 18871, 16744,
  /*  5298 */ 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718,
  /*  5313 */ 15718, 14946, 12717, 12058, 15718, 12236, 12717, 15131, 14946, 9795, 14945, 9797, 14947, 9799, 12058,
  /*  5328 */ 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5343 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5358 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5373 */ 16601, 16601, 16601, 11449, 9815, 10966, 15150, 15171, 19303, 16289, 12642, 15205, 15718, 15251, 15267,
  /*  5388 */ 20190, 12717, 12428, 15304, 18823, 15481, 15718, 17534, 17070, 14267, 12717, 15335, 16244, 15352, 15381,
  /*  5403 */ 13607, 17038, 15412, 15718, 15718, 15430, 15450, 15688, 12717, 12717, 15775, 18579, 16601, 15497, 11801,
  /*  5418 */ 15515, 13848, 15531, 12717, 14431, 16168, 15582, 15611, 18105, 20343, 15639, 15655, 15680, 13938, 13516,
  /*  5433 */ 15704, 15738, 20303, 15721, 15754, 20251, 16349, 15718, 15718, 14946, 12717, 12058, 15791, 15811, 14591,
  /*  5448 */ 9799, 14946, 14927, 15864, 15913, 14947, 9799, 12058, 15934, 15950, 14139, 14655, 12784, 16601, 16601,
  /*  5463 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5478 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5493 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11337, 9815, 10966, 15718,
  /*  5508 */ 14948, 16784, 16289, 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 18500, 18823, 15718, 15718,
  /*  5523 */ 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717, 13607, 10004, 15718, 15718, 15718, 15718, 20323,
  /*  5538 */ 15973, 12717, 12717, 12717, 12718, 16601, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717,
  /*  5553 */ 16744, 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349,
  /*  5568 */ 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799,
  /*  5583 */ 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5598 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5613 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5628 */ 16601, 16601, 16601, 16601, 11463, 9815, 15990, 16006, 19223, 16041, 16289, 16057, 15229, 14905, 16091,
  /*  5643 */ 16126, 17235, 15067, 16163, 16184, 9377, 10048, 9908, 15718, 16223, 15155, 13374, 16243, 16260, 16880,
  /*  5658 */ 12717, 16277, 15717, 15718, 15718, 16305, 8432, 20323, 12717, 12717, 19772, 13232, 16346, 16601, 15718,
  /*  5673 */ 15475, 15718, 15718, 15722, 12717, 16365, 12717, 12717, 16744, 16929, 16383, 15718, 20512, 12855, 12717,
  /*  5688 */ 12717, 19259, 15718, 19731, 15721, 12717, 16401, 16349, 15718, 19845, 14946, 12717, 11832, 15718, 20323,
  /*  5703 */ 12717, 9799, 14946, 9795, 14945, 9797, 14947, 13126, 18653, 14825, 19011, 19139, 8455, 12784, 16601,
  /*  5718 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5733 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5748 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11477, 11116, 10966,
  /*  5763 */ 16421, 16459, 16784, 16444, 15897, 15718, 16714, 16499, 13895, 12717, 18136, 15545, 18500, 18823, 17482,
  /*  5778 */ 16525, 11796, 15718, 15720, 15115, 17003, 13145, 12717, 12717, 14697, 15717, 12625, 15718, 19736, 16542,
  /*  5793 */ 20323, 13023, 16559, 12717, 16576, 12718, 16600, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717,
  /*  5808 */ 12717, 16744, 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927, 16025, 15718, 15721, 19523, 12717,
  /*  5823 */ 16349, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 16617, 15879, 9700, 9797, 14947,
  /*  5838 */ 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5853 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5868 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5883 */ 16601, 16601, 16601, 16601, 16601, 11491, 9815, 16638, 16654, 20374, 16670, 16289, 9850, 13541, 12810,
  /*  5898 */ 15718, 11766, 12381, 12717, 16686, 18500, 18823, 16704, 15718, 15718, 15718, 15720, 12869, 12717, 12717,
  /*  5913 */ 12717, 12717, 13607, 20075, 15718, 15718, 19701, 17291, 12284, 12717, 12717, 17742, 12717, 16737, 16601,
  /*  5928 */ 18946, 16760, 19581, 18313, 15722, 20213, 16800, 16838, 16873, 16744, 18515, 17462, 9484, 18333, 12717,
  /*  5943 */ 16896, 13704, 16918, 16956, 10979, 16973, 12717, 16989, 17026, 8420, 17060, 19944, 17086, 17131, 9966,
  /*  5958 */ 20323, 17153, 14457, 14946, 17173, 17213, 17251, 17272, 17288, 12058, 20322, 17317, 17307, 14085, 17333,
  /*  5973 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  5988 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6003 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11505, 9815,
  /*  6018 */ 10966, 17362, 17377, 17421, 16289, 15718, 14242, 17437, 17505, 14949, 14755, 13740, 17550, 18795, 17725,
  /*  6033 */ 15718, 17604, 17645, 15718, 12514, 12443, 17010, 17665, 12717, 13710, 13607, 15717, 15718, 17691, 9477,
  /*  6048 */ 15718, 20323, 12717, 12449, 19359, 12717, 12718, 11071, 15718, 15718, 15718, 15718, 13549, 12717, 12717,
  /*  6063 */ 12717, 12717, 17711, 18411, 18764, 15718, 15719, 17741, 18987, 12717, 18927, 9902, 10059, 15721, 17758,
  /*  6078 */ 14547, 16349, 15718, 15718, 14946, 12717, 13394, 11145, 19442, 17779, 15463, 17796, 17839, 17868, 9797,
  /*  6093 */ 14947, 9799, 12058, 20322, 19011, 14139, 14640, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6108 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6123 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6138 */ 16601, 16601, 16601, 16601, 16601, 16601, 11519, 9815, 10966, 11913, 12754, 17884, 17900, 17044, 13280,
  /*  6153 */ 13061, 15235, 17931, 17961, 17980, 17997, 18048, 18823, 15718, 15718, 9296, 15718, 15720, 12717, 12717,
  /*  6168 */ 13097, 12717, 12717, 13422, 15717, 16543, 13310, 15718, 15718, 20323, 12717, 18011, 12717, 12717, 12718,
  /*  6183 */ 18092, 15718, 15718, 20233, 15718, 15722, 12717, 12717, 13649, 12717, 13781, 15715, 15718, 15718, 15719,
  /*  6198 */ 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058,
  /*  6213 */ 15718, 20323, 12717, 15558, 14421, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455,
  /*  6228 */ 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6243 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6258 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11337,
  /*  6273 */ 9815, 18152, 18181, 18201, 17197, 16289, 15718, 15718, 15718, 15718, 14949, 12717, 12717, 12717, 18500,
  /*  6288 */ 17580, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717, 16471, 15717, 15718, 15718,
  /*  6303 */ 15718, 15718, 20323, 12717, 12717, 12717, 12717, 12718, 16601, 15718, 15718, 15718, 15718, 15722, 12717,
  /*  6318 */ 12717, 12717, 12717, 16744, 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721,
  /*  6333 */ 12717, 12717, 16349, 20286, 15718, 14946, 15769, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945,
  /*  6348 */ 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6363 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6378 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6393 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11533, 9815, 10966, 18226, 17915, 18269, 16289, 15718,
  /*  6408 */ 19662, 13043, 18076, 14949, 17106, 12965, 14175, 18285, 10034, 15718, 16069, 15718, 19556, 8444, 18349,
  /*  6423 */ 13002, 12717, 13913, 18370, 18398, 18432, 15718, 18456, 19192, 15718, 19501, 12717, 16584, 18485, 18535,
  /*  6438 */ 16367, 16601, 15499, 16020, 9385, 15718, 15722, 18601, 18556, 18573, 12717, 16744, 9457, 15718, 15718,
  /*  6453 */ 10066, 18595, 12717, 12717, 14315, 15718, 15718, 13079, 12717, 12717, 16349, 15718, 15718, 14946, 12717,
  /*  6468 */ 12058, 15718, 20323, 12717, 18617, 18642, 18669, 14945, 19911, 14344, 9799, 12058, 20322, 14149, 18692,
  /*  6483 */ 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6498 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6513 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6528 */ 11547, 9815, 18718, 14818, 18734, 16784, 16289, 18469, 12736, 18762, 15718, 18780, 18847, 18865, 12717,
  /*  6543 */ 18500, 18823, 9958, 14871, 15718, 15718, 13855, 12263, 15974, 12717, 12717, 16560, 18382, 18887, 15718,
  /*  6558 */ 15718, 18907, 18891, 14778, 12717, 12717, 14553, 18025, 18923, 16601, 15718, 15718, 17489, 18943, 15722,
  /*  6573 */ 12717, 12717, 13689, 12717, 16744, 18962, 15566, 20394, 15719, 12717, 18981, 19250, 12135, 15718, 15718,
  /*  6588 */ 15721, 12717, 12717, 16349, 15718, 16110, 14946, 12717, 19003, 19033, 12334, 12717, 17823, 12010, 19055,
  /*  6603 */ 14945, 16141, 13195, 12039, 19827, 19073, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601,
  /*  6618 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6633 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6648 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11561, 9815, 19110, 17852, 19126, 19167, 15319,
  /*  6663 */ 19183, 19208, 19275, 15718, 19291, 19765, 19319, 19356, 19375, 18823, 19434, 19458, 19492, 15007, 15720,
  /*  6678 */ 16857, 14207, 14284, 12717, 19517, 17629, 15717, 19539, 19572, 15718, 19871, 20323, 17675, 18032, 12717,
  /*  6693 */ 20469, 19597, 19620, 19649, 18965, 19684, 19717, 12098, 13640, 12948, 19752, 20417, 16744, 16822, 19788,
  /*  6708 */ 15718, 18416, 13658, 19821, 12717, 16811, 19843, 19861, 19936, 19887, 19232, 20063, 18324, 11100, 15957,
  /*  6723 */ 12910, 19903, 19927, 12841, 19960, 9799, 14946, 9795, 14945, 9797, 14947, 15595, 19976, 13966, 20010,
  /*  6738 */ 14139, 14670, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6753 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6768 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6783 */ 16601, 11575, 9815, 10966, 18165, 16320, 20033, 19633, 16509, 15718, 15718, 15718, 20049, 12717, 12717,
  /*  6798 */ 12717, 20096, 18823, 15047, 14571, 11891, 12191, 18626, 12717, 12565, 20127, 16902, 14014, 9749, 20143,
  /*  6813 */ 9467, 15718, 15718, 15718, 20323, 17964, 12717, 12717, 12717, 12718, 18810, 17517, 15718, 15718, 15718,
  /*  6828 */ 15722, 20160, 12717, 12717, 12717, 16744, 17346, 15718, 15718, 15719, 20178, 12717, 12717, 18927, 15718,
  /*  6843 */ 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058, 18676, 20323, 20206, 9799, 14946,
  /*  6858 */ 9795, 14945, 9797, 14947, 19151, 18540, 20322, 19011, 15365, 8455, 12784, 16601, 16601, 16601, 16601,
  /*  6873 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6888 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  6903 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11589, 9815, 10966, 20229, 16775, 16784,
  /*  6918 */ 16289, 12534, 15718, 13873, 15718, 13164, 12717, 12717, 20249, 18500, 18823, 15718, 16526, 15718, 15718,
  /*  6933 */ 15720, 12717, 12717, 12941, 12717, 12717, 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717,
  /*  6948 */ 12717, 12717, 12718, 16601, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744, 15715,
  /*  6963 */ 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718,
  /*  6978 */ 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322,
  /*  6993 */ 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7008 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7023 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7038 */ 16601, 16601, 11603, 9815, 10966, 12468, 14948, 20267, 16289, 15718, 15718, 15718, 15718, 14949, 12717,
  /*  7053 */ 12717, 12717, 18500, 18823, 15718, 15718, 15718, 15718, 15720, 12717, 12717, 12717, 12717, 12717, 13607,
  /*  7068 */ 20283, 15718, 15718, 15718, 15718, 9773, 12717, 12717, 12717, 12717, 12718, 16601, 15718, 15718, 20302,
  /*  7083 */ 15718, 20319, 12717, 16405, 12717, 12680, 16744, 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927,
  /*  7098 */ 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799,
  /*  7113 */ 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601,
  /*  7128 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7143 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7158 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11645, 9815, 10966, 20339, 17188,
  /*  7173 */ 16784, 20359, 15718, 15718, 20390, 17472, 14949, 12717, 20410, 12595, 18500, 18823, 15718, 15718, 15718,
  /*  7188 */ 15718, 15720, 12717, 12717, 12717, 12717, 12717, 18253, 15717, 15718, 16428, 15718, 15718, 20323, 12717,
  /*  7203 */ 12717, 20433, 12717, 17981, 16601, 16957, 15718, 15718, 15718, 15722, 14035, 12717, 12717, 12717, 16744,
  /*  7218 */ 15715, 15718, 15718, 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718,
  /*  7233 */ 15718, 14946, 12717, 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058,
  /*  7248 */ 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7263 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7278 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7293 */ 16601, 16601, 16601, 11337, 9815, 10966, 12660, 14948, 20450, 16289, 15718, 15718, 15718, 18831, 14949,
  /*  7308 */ 12717, 12717, 12890, 18500, 18823, 16207, 15718, 15795, 15718, 15720, 11965, 12717, 12717, 20466, 12717,
  /*  7323 */ 13607, 15717, 17649, 15718, 15718, 15718, 20323, 12717, 20485, 12717, 12717, 12718, 16601, 15718, 15718,
  /*  7338 */ 16075, 15718, 17256, 12717, 12717, 19333, 12717, 15837, 15715, 15718, 15718, 15719, 12717, 12717, 12717,
  /*  7353 */ 18927, 20508, 15718, 15721, 20528, 12717, 16349, 15718, 9939, 14946, 17157, 12058, 15718, 20323, 12717,
  /*  7368 */ 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455, 12784, 16601, 16601, 16601,
  /*  7384 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7399 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7414 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11211, 9227, 20111, 9344, 9588,
  /*  7429 */ 10250, 8854, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 9444, 8156, 9346, 8168, 8614, 9344, 9577,
  /*  7446 */ 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390,
  /*  7463 */ 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702,
  /*  7480 */ 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980,
  /*  7497 */ 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601,
  /*  7513 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7528 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7543 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11211, 9227, 19390, 9344, 9588, 10250,
  /*  7558 */ 12792, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8715, 8156, 9346, 8168, 8614, 9344, 9577, 8196,
  /*  7575 */ 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601,
  /*  7592 */ 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731,
  /*  7609 */ 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180,
  /*  7626 */ 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601,
  /*  7642 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7657 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7672 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11211, 9227, 19390, 9344, 9588, 10250, 11991,
  /*  7687 */ 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 8846, 8156, 9346, 8168, 8614, 9344, 9577, 8196, 8214,
  /*  7704 */ 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296, 8322, 8353, 8506, 8390, 16601, 8471,
  /*  7721 */ 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036, 8664, 9257, 8680, 8702, 8731, 8782,
  /*  7738 */ 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140, 9082, 19405, 8917, 8980, 8180, 8604,
  /*  7755 */ 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7771 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7786 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7801 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 11211, 9815, 18063, 15718, 14948, 16784, 14989, 15718,
  /*  7816 */ 15718, 15718, 15718, 14949, 12717, 12717, 12717, 17565, 18823, 15718, 15718, 15718, 15718, 15720, 12717,
  /*  7831 */ 12717, 12717, 12717, 12717, 13607, 15717, 15718, 15718, 15718, 15718, 20323, 12717, 12717, 12717, 12717,
  /*  7846 */ 12718, 16601, 15718, 15718, 15718, 15718, 15722, 12717, 12717, 12717, 12717, 16744, 15715, 15718, 15718,
  /*  7861 */ 15719, 12717, 12717, 12717, 18927, 15718, 15718, 15721, 12717, 12717, 16349, 15718, 15718, 14946, 12717,
  /*  7876 */ 12058, 15718, 20323, 12717, 9799, 14946, 9795, 14945, 9797, 14947, 9799, 12058, 20322, 19011, 14139, 8455,
  /*  7892 */ 12784, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7907 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  7922 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 15848,
  /*  7937 */ 16601, 9211, 9344, 9588, 10751, 8648, 9340, 9188, 9024, 8802, 8499, 8109, 8125, 8686, 10754, 8156, 9346,
  /*  7954 */ 8168, 8614, 9344, 9577, 8196, 8214, 8241, 8198, 10743, 10755, 10902, 8485, 8257, 8273, 9326, 10550, 8296,
  /*  7971 */ 8322, 8353, 8506, 8390, 16601, 8471, 9157, 8093, 8280, 9431, 8522, 8537, 8553, 8589, 8640, 8793, 9036,
  /*  7988 */ 8664, 9257, 8680, 8702, 8731, 8782, 8624, 9143, 8833, 8932, 8818, 8870, 8885, 8994, 9514, 8901, 8140,
  /*  8005 */ 9082, 19405, 8917, 8980, 8180, 8604, 9585, 10540, 13468, 9010, 9067, 9052, 9098, 9128, 9173, 9204, 16601,
  /*  8022 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  8037 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601,
  /*  8052 */ 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 16601, 0, 12306, 12306,
  /*  8067 */ 40980, 8213, 8213, 40983, 24, 24, 24, 24, 43036, 29, 29, 29, 30752, 0, 0, 32803, 0, 43045, 0, 0, 0, 0,
  /*  8089 */ 542720, 0, 563200, 563200, 540672, 540672, 540672, 768000, 540672, 782336, 540672, 540672, 540672, 540672,
  /*  8103 */ 540672, 540672, 540672, 858112, 540672, 876544, 561152, 561152, 561152, 561152, 727040, 561152, 561152,
  /*  8116 */ 561152, 561152, 561152, 561152, 763904, 561152, 772096, 561152, 776192, 561152, 780288, 800768, 561152,
  /*  8129 */ 561152, 817152, 561152, 829440, 561152, 561152, 845824, 561152, 561152, 561152, 874496, 561152, 561152,
  /*  8142 */ 561152, 561152, 561152, 561152, 561152, 978944, 561152, 561152, 991232, 997376, 1001472, 540672, 628736,
  /*  8155 */ 632832, 546816, 0, 0, 563200, 0, 0, 540672, 0, 540672, 540672, 540672, 618496, 540672, 540672, 540672,
  /*  8171 */ 540672, 722944, 540672, 540672, 540672, 540672, 540672, 540672, 745472, 540672, 540672, 540672, 540672,
  /*  8184 */ 983040, 561152, 561152, 663552, 561152, 561152, 561152, 692224, 696320, 561152, 561152, 561152, 561152,
  /*  8197 */ 618496, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152,
  /*  8210 */ 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 706560, 561152, 561152, 561152, 561152,
  /*  8223 */ 561152, 722944, 561152, 561152, 561152, 561152, 561152, 0, 0, 0, 0, 0, 0, 0, 0, 254, 0, 0, 561152, 745472,
  /*  8243 */ 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 815104, 821248, 561152,
  /*  8256 */ 833536, 735232, 540672, 540672, 540672, 540672, 540672, 540672, 774144, 540672, 540672, 540672, 540672,
  /*  8269 */ 540672, 798720, 802816, 813056, 825344, 540672, 540672, 540672, 856064, 870400, 540672, 540672, 540672,
  /*  8282 */ 540672, 540672, 540672, 540672, 540672, 540672, 540672, 931840, 540672, 540672, 950272, 540672, 540672,
  /*  8295 */ 974848, 561152, 645120, 647168, 561152, 561152, 561152, 561152, 561152, 561152, 675840, 561152, 561152,
  /*  8308 */ 561152, 561152, 561152, 561152, 561152, 561152, 12306, 81920, 8213, 67584, 0, 24, 29, 29, 561152, 561152,
  /*  8324 */ 714752, 561152, 561152, 561152, 561152, 735232, 561152, 561152, 561152, 561152, 561152, 561152, 774144,
  /*  8337 */ 561152, 561152, 561152, 561152, 561152, 561152, 561152, 978944, 561152, 561152, 991232, 997376, 1001472,
  /*  8350 */ 540782, 628846, 632942, 561152, 561152, 561152, 561152, 798720, 802816, 813056, 825344, 561152, 561152,
  /*  8363 */ 561152, 856064, 870400, 561152, 561152, 561152, 561152, 45056, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 544768, 0,
  /*  8384 */ 259, 0, 109, 0, 111, 540672, 964608, 561152, 561152, 980992, 561152, 561152, 561152, 561152, 561152,
  /*  8399 */ 561152, 561152, 561152, 561152, 1017856, 561152, 0, 0, 0, 260, 0, 0, 263, 0, 450, 46, 452, 46, 453, 46,
  /*  8419 */ 455, 46, 46, 46, 46, 1106, 1107, 46, 46, 46, 46, 1111, 1112, 46, 46, 46, 46, 46, 700, 46, 46, 46, 46, 46,
  /*  8443 */ 705, 46, 46, 46, 46, 46, 527, 46, 46, 46, 46, 533, 46, 46, 46, 68, 68, 68, 68, 46, 46, 68, 68, 46, 68, 46,
  /*  8469 */ 68, 46, 608256, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 641024, 540672, 651264, 655360,
  /*  8483 */ 540672, 540672, 540672, 540672, 675840, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672,
  /*  8496 */ 714752, 540672, 540672, 540672, 540672, 561152, 561152, 561152, 626688, 630784, 561152, 561152, 561152,
  /*  8509 */ 561152, 561152, 561152, 561152, 561152, 561152, 933888, 561152, 946176, 561152, 561152, 561152, 561152,
  /*  8522 */ 561152, 561152, 561152, 561152, 641024, 561152, 651264, 655360, 561152, 561152, 561152, 561152, 561152,
  /*  8535 */ 561152, 679936, 561152, 561152, 561152, 561152, 561152, 561152, 716800, 561152, 729088, 561152, 561152,
  /*  8548 */ 739328, 561152, 561152, 561152, 768000, 561152, 782336, 561152, 561152, 561152, 561152, 561152, 561152,
  /*  8561 */ 561152, 858112, 561152, 876544, 561152, 561152, 561152, 561152, 0, 0, 0, 624, 0, 0, 0, 0, 0, 0, 0, 0,
  /*  8581 */ 544768, 0, 0, 0, 109, 0, 111, 540672, 561152, 561152, 561152, 561152, 561152, 931840, 561152, 561152,
  /*  8597 */ 950272, 561152, 561152, 974848, 561152, 561152, 985088, 561152, 561152, 561152, 561152, 561152, 561152,
  /*  8610 */ 983040, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 815104, 821248, 540672,
  /*  8623 */ 833536, 540672, 540672, 540672, 540672, 540672, 540672, 661504, 540672, 540672, 671744, 540672, 540672,
  /*  8636 */ 540672, 686080, 688128, 540672, 561152, 561152, 999424, 561152, 561152, 1009664, 1011712, 561152, 0, 0, 0,
  /*  8651 */ 0, 0, 0, 0, 0, 544768, 0, 0, 0, 0, 0, 0, 540672, 790528, 540672, 540672, 540672, 835584, 837632, 540672,
  /*  8671 */ 872448, 540672, 540672, 886784, 540672, 540672, 911360, 540672, 915456, 561152, 561152, 561152, 561152,
  /*  8684 */ 636928, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 972800,
  /*  8697 */ 561152, 561152, 561152, 561152, 561152, 690176, 561152, 561152, 561152, 561152, 561152, 733184, 561152,
  /*  8710 */ 561152, 561152, 561152, 778240, 790528, 561152, 561152, 561152, 561152, 561152, 12306, 0, 0, 0, 0, 0, 0,
  /*  8727 */ 0, 253, 0, 0, 835584, 837632, 561152, 872448, 561152, 561152, 886784, 561152, 561152, 911360, 561152,
  /*  8742 */ 915456, 561152, 561152, 925696, 561152, 561152, 561152, 561152, 561152, 561152, 983040, 540782, 540782,
  /*  8755 */ 540782, 540782, 540782, 540782, 540782, 540782, 540782, 815214, 821358, 540782, 833646, 540782, 540782,
  /*  8768 */ 540782, 540782, 540782, 540782, 661614, 540782, 540782, 671854, 540782, 540782, 540782, 686190, 688238,
  /*  8781 */ 540782, 948224, 956416, 962560, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 1026048, 0, 0, 0,
  /*  8796 */ 540672, 540672, 540672, 540672, 540672, 636928, 540672, 540672, 540672, 540672, 540672, 540672, 540672,
  /*  8809 */ 972800, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 712704, 561152, 561152, 561152,
  /*  8822 */ 561152, 561152, 561152, 561152, 561152, 561152, 561152, 878592, 561152, 561152, 561152, 913408, 540672,
  /*  8835 */ 540672, 540672, 540672, 944128, 540672, 540672, 540672, 540672, 540672, 540672, 1003520, 561152, 561152,
  /*  8848 */ 561152, 561152, 561152, 12306, 0, 0, 0, 0, 0, 0, 0, 254, 0, 0, 544768, 0, 0, 0, 0, 0, 0, 540672, 561152,
  /*  8871 */ 561152, 561152, 561152, 944128, 561152, 561152, 561152, 561152, 561152, 561152, 1003520, 0, 612352,
  /*  8884 */ 614400, 540672, 634880, 540672, 649216, 540672, 540672, 540672, 673792, 540672, 540672, 540672, 540672,
  /*  8897 */ 708608, 540672, 720896, 737280, 561152, 561152, 561152, 561152, 708608, 561152, 720896, 737280, 561152,
  /*  8910 */ 561152, 761856, 792576, 561152, 561152, 561152, 880640, 561152, 561152, 561152, 561152, 561152, 741376,
  /*  8923 */ 753664, 794624, 796672, 841728, 899072, 561152, 917504, 561152, 923648, 561152, 561152, 561152, 561152,
  /*  8936 */ 561152, 661504, 561152, 561152, 671744, 561152, 561152, 561152, 686080, 688128, 561152, 561152, 561152,
  /*  8949 */ 561152, 561152, 540782, 540782, 665710, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782,
  /*  8962 */ 1017966, 540782, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 12306, 12306, 8213, 0,
  /*  8976 */ 24, 24, 571487, 571487, 561152, 561152, 989184, 540672, 540672, 663552, 540672, 540672, 540672, 692224,
  /*  8990 */ 696320, 540672, 540672, 540672, 540672, 540672, 761856, 792576, 540672, 540672, 540672, 880640, 540672,
  /*  9003 */ 540672, 540672, 540672, 540672, 540672, 540672, 978944, 919552, 561152, 561152, 540672, 540672, 540672,
  /*  9016 */ 540672, 540672, 710656, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 817152, 540672, 829440,
  /*  9029 */ 540672, 540672, 845824, 540672, 540672, 540672, 874496, 540672, 540672, 540672, 540672, 690176, 540672,
  /*  9042 */ 540672, 540672, 540672, 540672, 733184, 540672, 540672, 540672, 540672, 778240, 681984, 540672, 718848,
  /*  9055 */ 540672, 843776, 540672, 540672, 540672, 929792, 561152, 638976, 561152, 681984, 561152, 718848, 561152,
  /*  9068 */ 561152, 561152, 561152, 561152, 710656, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 540672,
  /*  9081 */ 638976, 540672, 657408, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 741376, 753664,
  /*  9094 */ 794624, 796672, 841728, 899072, 843776, 561152, 561152, 561152, 929792, 540672, 677888, 540672, 540672,
  /*  9107 */ 540672, 540672, 540672, 561152, 677888, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152,
  /*  9120 */ 12534, 12534, 8213, 0, 24, 24, 29, 29, 561152, 561152, 561152, 616448, 540672, 540672, 540672, 540672,
  /*  9136 */ 927744, 616448, 561152, 561152, 561152, 561152, 927744, 540672, 712704, 540672, 540672, 540672, 540672,
  /*  9149 */ 540672, 540672, 540672, 540672, 540672, 540672, 878592, 540672, 540672, 540672, 679936, 540672, 540672,
  /*  9162 */ 540672, 540672, 540672, 540672, 540672, 716800, 540672, 729088, 540672, 540672, 739328, 743424, 901120,
  /*  9175 */ 540672, 561152, 743424, 901120, 561152, 694272, 540672, 694272, 561152, 540672, 561152, 540672, 561152,
  /*  9188 */ 540672, 727040, 540672, 540672, 540672, 540672, 540672, 540672, 763904, 540672, 772096, 540672, 776192,
  /*  9201 */ 540672, 780288, 800768, 561152, 907264, 907264, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 542720, 0, 563200,
  /*  9223 */ 563200, 540672, 540672, 540672, 0, 12306, 12306, 0, 8213, 8213, 24, 24, 24, 24, 24, 29, 29, 29, 29, 30752,
  /*  9243 */ 0, 0, 32803, 0, 0, 0, 0, 0, 0, 542720, 107, 563200, 563200, 540672, 540672, 540672, 925696, 540672,
  /*  9261 */ 948224, 956416, 962560, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 1026048, 561152, 0, 12306,
  /*  9275 */ 12306, 0, 8213, 8213, 24, 24, 24, 24, 24, 29, 29, 29, 29, 0, 0, 0, 260, 443, 0, 263, 447, 46, 46, 46, 46,
  /*  9300 */ 46, 46, 46, 46, 497, 46, 46, 46, 46, 46, 46, 46, 26624, 0, 32803, 0, 0, 0, 0, 0, 0, 542720, 0, 563200,
  /*  9324 */ 563200, 540672, 540672, 540672, 933888, 540672, 946176, 540672, 540672, 540672, 540672, 964608, 540672,
  /*  9337 */ 540672, 980992, 540672, 540672, 540672, 626688, 630784, 540672, 540672, 540672, 540672, 540672, 540672,
  /*  9350 */ 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 706560, 540672, 530447,
  /*  9363 */ 16, 0, 12306, 16, 8213, 24, 29, 30752, 32803, 0, 0, 0, 0, 530447, 0, 0, 0, 260, 444, 0, 263, 448, 46, 46,
  /*  9387 */ 46, 46, 46, 46, 46, 46, 835, 46, 46, 46, 46, 46, 46, 46, 57344, 12306, 12306, 0, 8213, 8213, 24, 24, 24,
  /*  9410 */ 24, 24, 29, 29, 29, 29, 30752, 0, 97, 32803, 0, 0, 0, 57344, 0, 0, 542720, 0, 563200, 563200, 540672,
  /*  9431 */ 540672, 540672, 985088, 540672, 540672, 540672, 999424, 540672, 540672, 1009664, 1011712, 540672, 608256,
  /*  9444 */ 561152, 561152, 561152, 561152, 561152, 12306, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46, 46, 46, 46, 931, 46, 932,
  /*  9467 */ 46, 46, 46, 46, 46, 46, 662, 46, 46, 46, 46, 46, 46, 46, 46, 46, 687, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /*  9493 */ 958, 46, 46, 46, 46, 46, 46, 546816, 0, 0, 563200, 442, 0, 540672, 446, 540672, 540672, 540672, 618496,
  /*  9512 */ 540672, 540672, 540672, 540672, 991232, 997376, 1001472, 612352, 614400, 561152, 561152, 634880, 561152,
  /*  9525 */ 649216, 561152, 561152, 561152, 673792, 0, 12306, 12306, 0, 8213, 8213, 24, 24, 24, 24, 24, 571487,
  /*  9542 */ 571487, 571487, 571487, 30752, 0, 12306, 12306, 0, 8213, 8213, 24, 24, 24, 24, 24, 29, 29, 29, 69632,
  /*  9561 */ 30752, 546816, 0, 0, 563200, 0, 14336, 540672, 0, 540672, 540672, 540672, 618496, 540672, 540672, 540672,
  /*  9577 */ 540672, 976896, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672,
  /*  9590 */ 540672, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152,
  /*  9603 */ 561152, 0, 12306, 12306, 0, 91, 92, 24, 24, 24, 34842, 34842, 29, 29, 29, 29, 30752, 546816, 71680, 0,
  /*  9623 */ 260, 0, 0, 263, 0, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 651, 46, 46, 46, 46, 46, 658, 46, 46, 46,
  /*  9649 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 161, 46, 46, 46, 46, 965, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /*  9675 */ 46, 46, 68, 68, 68, 866, 46, 46, 1105, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1113, 46, 46, 46, 46, 46, 860,
  /*  9700 */ 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 1241, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1140, 68, 68, 68, 68,
  /*  9725 */ 68, 68, 68, 68, 68, 68, 68, 0, 0, 0, 1022, 46, 1203, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 1212, 68, 68,
  /*  9751 */ 68, 68, 0, 0, 4535, 0, 0, 0, 0, 0, 634, 0, 0, 0, 68, 68, 1218, 68, 68, 68, 68, 1222, 46, 46, 46, 46, 46,
  /*  9778 */ 46, 46, 46, 68, 718, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1294, 68, 68, 68, 68, 68, 68, 68, 68, 46, 46,
  /*  9804 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 0, 12306, 12306, 0, 8213, 8213, 24, 24, 24, 34842, 34842, 29,
  /*  9827 */ 29, 29, 29, 30752, 0, 0, 32803, 0, 0, 0, 0, 0, 0, 542825, 0, 44, 44, 46, 46, 46, 46, 46, 944, 46, 46, 46,
  /*  9853 */ 46, 46, 46, 46, 46, 46, 46, 280, 46, 46, 46, 46, 46, 546816, 0, 0, 260, 0, 0, 263, 0, 46, 46, 46, 46, 46,
  /*  9879 */ 46, 46, 46, 46, 46, 650, 46, 46, 653, 46, 0, 0, 32803, 0, 0, 0, 0, 0, 105, 42, 0, 44, 44, 46, 46, 46, 46,
  /*  9906 */ 46, 1029, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 484, 46, 46, 46, 46, 46, 247, 0, 0, 0, 4197, 4197, 0, 0,
  /*  9932 */ 105, 257, 0, 0, 109, 0, 111, 46, 46, 46, 46, 1117, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 821, 46,
  /*  9957 */ 823, 46, 46, 46, 46, 46, 46, 46, 465, 46, 46, 46, 46, 46, 46, 46, 46, 1164, 46, 46, 46, 46, 46, 46, 46,
  /*  9982 */ 68, 68, 68, 68, 68, 12306, 247, 437, 0, 0, 0, 0, 0, 254, 14591, 257, 0, 0, 260, 0, 0, 263, 0, 46, 46, 46,
  /* 10008 */ 46, 46, 46, 46, 46, 649, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 437, 0, 4535, 0, 0, 629, 0, 0, 0, 635, 0,
  /* 10035 */ 0, 0, 260, 0, 0, 263, 0, 46, 46, 46, 46, 46, 454, 46, 46, 46, 46, 462, 463, 46, 46, 46, 46, 470, 46, 46,
  /* 10061 */ 46, 46, 46, 46, 1042, 46, 46, 46, 46, 46, 46, 46, 46, 46, 969, 46, 46, 46, 46, 46, 68, 0, 802, 0, 46, 46,
  /* 10087 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 654, 0, 12306, 12306, 0, 8213, 8213, 24, 24, 24, 24, 24,
  /* 10111 */ 571488, 571488, 59392, 571488, 30752, 0, 0, 32803, 0, 0, 0, 59495, 104, 0, 542720, 0, 563308, 563308,
  /* 10129 */ 540782, 540782, 540782, 768110, 540782, 782446, 540782, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10142 */ 858222, 540782, 876654, 540782, 727150, 540782, 540782, 540782, 540782, 540782, 540782, 764014, 540782,
  /* 10155 */ 772206, 540782, 776302, 540782, 780398, 800878, 546816, 0, 0, 563200, 0, 0, 540672, 0, 540782, 540782,
  /* 10171 */ 540782, 618606, 540782, 540782, 540782, 540782, 723054, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10184 */ 745582, 540782, 540782, 540782, 540782, 983150, 561152, 561152, 663552, 561152, 561152, 561152, 692224,
  /* 10197 */ 696320, 561152, 561152, 561152, 540782, 977006, 540782, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10210 */ 540782, 540782, 540782, 540782, 540782, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152,
  /* 10223 */ 561152, 561152, 561152, 561152, 561152, 0, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10237 */ 540782, 645230, 647278, 540782, 540782, 540782, 540782, 561152, 561152, 561152, 626688, 630784, 561152,
  /* 10250 */ 561152, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 12306, 12306, 8213, 0, 24, 24, 29, 29,
  /* 10266 */ 735342, 540782, 540782, 540782, 540782, 540782, 540782, 774254, 540782, 540782, 540782, 540782, 540782,
  /* 10279 */ 798830, 802926, 813166, 825454, 540782, 540782, 540782, 856174, 870510, 540782, 540782, 540782, 540782,
  /* 10292 */ 540782, 540782, 540782, 540782, 540782, 540782, 931950, 540782, 540782, 950382, 540782, 540782, 974958,
  /* 10305 */ 608366, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 641134, 540782, 651374, 655470, 540782,
  /* 10318 */ 540782, 540782, 540782, 680046, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 716910, 540782,
  /* 10331 */ 729198, 540782, 540782, 739438, 790638, 540782, 540782, 540782, 835694, 837742, 540782, 872558, 540782,
  /* 10344 */ 540782, 886894, 540782, 540782, 911470, 540782, 915566, 948224, 956416, 962560, 561152, 561152, 561152,
  /* 10357 */ 561152, 561152, 561152, 561152, 1026048, 0, 0, 0, 540782, 540782, 540782, 540782, 540782, 637038, 540782,
  /* 10372 */ 540782, 540782, 540782, 540782, 540782, 540782, 972910, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10385 */ 540782, 540782, 540782, 712814, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10398 */ 540782, 878702, 540782, 540782, 540782, 761966, 792686, 540782, 540782, 540782, 880750, 540782, 540782,
  /* 10411 */ 540782, 540782, 540782, 540782, 540782, 979054, 913518, 540782, 540782, 540782, 540782, 944238, 540782,
  /* 10424 */ 540782, 540782, 540782, 540782, 540782, 1003630, 561152, 561152, 561152, 561152, 561152, 12534, 0, 0, 0,
  /* 10439 */ 0, 0, 0, 0, 254, 0, 0, 561152, 561152, 561152, 561152, 944128, 561152, 561152, 561152, 561152, 561152,
  /* 10456 */ 561152, 1003520, 0, 612462, 614510, 540782, 540782, 933998, 540782, 946286, 540782, 540782, 540782,
  /* 10469 */ 540782, 964718, 540782, 540782, 981102, 540782, 540782, 540782, 675950, 540782, 540782, 540782, 540782,
  /* 10482 */ 540782, 540782, 540782, 540782, 714862, 540782, 540782, 540782, 540782, 626798, 630894, 540782, 540782,
  /* 10495 */ 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10508 */ 540782, 706670, 540782, 540782, 657518, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10521 */ 741486, 753774, 794734, 796782, 841838, 899182, 540782, 917614, 540782, 923758, 540782, 540782, 540782,
  /* 10534 */ 989294, 561152, 628736, 632832, 561152, 657408, 561152, 561152, 561152, 561152, 561152, 540672, 540672,
  /* 10547 */ 665600, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 1017856, 540672, 561152, 561152,
  /* 10560 */ 561152, 561152, 561152, 561152, 561152, 561152, 12306, 12306, 8213, 0, 24, 24, 0, 571488, 561152, 561152,
  /* 10576 */ 989184, 540782, 540782, 663662, 540782, 540782, 540782, 692334, 696430, 540782, 540782, 540782, 540782,
  /* 10589 */ 540782, 817262, 540782, 829550, 540782, 540782, 845934, 540782, 540782, 540782, 874606, 540782, 540782,
  /* 10602 */ 540782, 540782, 690286, 540782, 540782, 540782, 540782, 540782, 733294, 540782, 540782, 540782, 540782,
  /* 10615 */ 778350, 540782, 919662, 540782, 540782, 561152, 561152, 665600, 561152, 561152, 561152, 561152, 561152,
  /* 10628 */ 561152, 561152, 561152, 561152, 12306, 12306, 8213, 0, 534621, 534621, 29, 29, 919552, 561152, 561152,
  /* 10643 */ 540782, 540782, 540782, 540782, 540782, 710766, 540782, 540782, 540782, 540782, 540782, 540782, 540782,
  /* 10656 */ 925806, 540782, 948334, 956526, 962670, 540782, 540782, 540782, 540782, 540782, 540782, 540782, 1026158,
  /* 10669 */ 561152, 682094, 540782, 718958, 540782, 843886, 540782, 540782, 540782, 929902, 561152, 638976, 561152,
  /* 10682 */ 681984, 561152, 718848, 561152, 561152, 561152, 561152, 561152, 710656, 561152, 561152, 561152, 561152,
  /* 10695 */ 561152, 561152, 561152, 540782, 639086, 540782, 540782, 985198, 540782, 540782, 540782, 999534, 540782,
  /* 10708 */ 540782, 1009774, 1011822, 540782, 608256, 561152, 561152, 561152, 561152, 561152, 12306, 45056, 0, 0, 0,
  /* 10723 */ 24576, 0, 0, 254, 0, 0, 843776, 561152, 561152, 561152, 929792, 540782, 677998, 540782, 540782, 540782,
  /* 10739 */ 540782, 540782, 561152, 677888, 561152, 561152, 561152, 561152, 561152, 561152, 561152, 976896, 561152,
  /* 10752 */ 561152, 561152, 561152, 561152, 561152, 561152, 561152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 561152,
  /* 10772 */ 561152, 561152, 616558, 540782, 540782, 540782, 540782, 927854, 616448, 561152, 561152, 561152, 561152,
  /* 10785 */ 927744, 540782, 540782, 991342, 997486, 1001582, 612352, 614400, 561152, 561152, 634880, 561152, 649216,
  /* 10798 */ 561152, 561152, 561152, 673792, 743534, 901230, 540782, 561152, 743424, 901120, 561152, 694382, 540782,
  /* 10811 */ 694272, 561152, 540782, 561152, 540782, 561152, 540782, 634990, 540782, 649326, 540782, 540782, 540782,
  /* 10824 */ 673902, 540782, 540782, 540782, 540782, 708718, 540782, 721006, 737390, 561152, 907374, 907264, 0, 0, 0,
  /* 10839 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 544768, 0, 0, 14336, 109, 0, 111, 540672, 561152, 561152, 999424, 561152,
  /* 10861 */ 561152, 1009664, 1011712, 561152, 254, 0, 0, 0, 254, 0, 0, 109, 0, 111, 0, 540672, 540672, 540672, 540672,
  /* 10880 */ 540672, 636928, 540672, 540672, 540672, 540672, 540672, 540672, 540672, 948224, 956416, 962560, 561152,
  /* 10893 */ 561152, 561152, 561152, 561152, 561152, 561152, 1026048, 254, 0, 0, 540672, 540672, 540672, 540672,
  /* 10907 */ 540672, 540672, 540672, 540672, 540672, 645120, 647168, 540672, 540672, 540672, 540672, 0, 12306, 12306,
  /* 10921 */ 0, 8213, 8213, 24, 24, 77824, 24, 24, 29, 29, 29, 29, 30752, 0, 12306, 12306, 0, 8213, 8213, 534621,
  /* 10941 */ 534621, 534621, 534621, 534621, 29, 29, 29, 29, 30752, 0, 0, 32803, 0, 0, 0, 0, 0, 0, 542720, 75776,
  /* 10961 */ 563200, 563200, 540672, 540672, 540672, 0, 0, 32803, 0, 0, 4197, 0, 0, 0, 0, 0, 44, 44, 46, 46, 46, 46,
  /* 10983 */ 46, 1041, 46, 1043, 46, 46, 46, 46, 46, 46, 1049, 46, 68, 68, 68, 68, 68, 12306, 0, 437, 0, 0, 0, 0, 4535,
  /* 11008 */ 254, 14591, 0, 0, 0, 799, 0, 800, 0, 0, 0, 0, 0, 802, 0, 0, 0, 0, 253, 253, 0, 0, 544768, 0, 0, 0, 109, 0,
  /* 11036 */ 111, 540782, 68, 68, 68, 68, 437, 0, 4535, 0, 0, 0, 0, 0, 0, 0, 0, 0, 544768, 256, 0, 0, 109, 0, 111,
  /* 11061 */ 540672, 68, 68, 68, 68, 437, 0, 4535, 0, 628, 0, 0, 0, 0, 0, 0, 0, 801, 0, 444, 0, 0, 0, 803, 0, 448, 0,
  /* 11088 */ 0, 32803, 0, 0, 4197, 0, 0, 0, 106, 0, 44, 44, 46, 46, 46, 46, 46, 1118, 46, 46, 46, 46, 46, 1123, 46,
  /* 11113 */ 1125, 46, 46, 0, 12306, 12306, 0, 8213, 8213, 24, 24, 24, 34842, 34910, 29, 29, 29, 29, 30752, 0, 0,
  /* 11134 */ 32803, 0, 0, 4198, 0, 0, 0, 0, 0, 44, 44, 46, 46, 46, 46, 46, 1161, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 11160 */ 46, 516, 46, 46, 46, 46, 46, 561152, 561152, 561152, 561152, 944128, 561152, 561152, 561152, 561152,
  /* 11176 */ 561152, 561152, 1003520, 73728, 612352, 614400, 540672, 1, 0, 0, 12307, 0, 8213, 24, 29, 30752, 32803, 0,
  /* 11194 */ 0, 0, 0, 1, 0, 17, 12306, 0, 8213, 24, 30, 30752, 32803, 39, 0, 0, 0, 1, 0, 0, 12306, 0, 8213, 24, 29,
  /* 11219 */ 30752, 32803, 0, 0, 0, 0, 1, 0, 0, 12306, 0, 8213, 24, 29, 30752, 32803, 38, 0, 0, 0, 1, 0, 0, 12306, 0,
  /* 11244 */ 8213, 24, 29, 30752, 32803, 41, 0, 0, 0, 1, 0, 0, 12306, 0, 8213, 24, 29, 30752, 32803, 42, 0, 0, 0, 1, 0,
  /* 11269 */ 0, 12306, 0, 8213, 24, 29, 30752, 32803, 43, 0, 0, 0, 1, 0, 0, 12306, 0, 8213, 24, 29, 30752, 32803,
  /* 11291 */ 14376, 0, 0, 0, 1, 0, 0, 12306, 0, 8213, 24, 29, 30752, 55332, 55296, 0, 0, 0, 1, 0, 0, 12306, 0, 8213,
  /* 11315 */ 24, 29, 51233, 32803, 51200, 0, 0, 0, 1, 0, 0, 12306, 0, 8213, 24, 31, 30752, 32803, 0, 0, 0, 0, 1, 0, 0,
  /* 11340 */ 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 46, 46, 68, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803,
  /* 11361 */ 44, 48, 48, 69, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 49, 49, 70, 1, 0, 0, 12306, 0, 8213,
  /* 11385 */ 34842, 29, 30752, 32803, 44, 50, 50, 71, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 51, 51, 72,
  /* 11407 */ 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 52, 52, 73, 1, 0, 0, 12306, 0, 8213, 34842, 29,
  /* 11429 */ 30752, 32803, 44, 53, 53, 74, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 54, 54, 75, 1, 0, 0,
  /* 11452 */ 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 55, 55, 76, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803,
  /* 11473 */ 44, 56, 56, 77, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 57, 57, 78, 1, 0, 0, 12306, 0, 8213,
  /* 11497 */ 34842, 29, 30752, 32803, 44, 58, 58, 79, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 59, 59, 80,
  /* 11519 */ 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 60, 60, 81, 1, 0, 0, 12306, 0, 8213, 34842, 29,
  /* 11541 */ 30752, 32803, 44, 61, 61, 82, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 62, 62, 83, 1, 0, 0,
  /* 11564 */ 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 63, 63, 84, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803,
  /* 11585 */ 44, 64, 64, 85, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 44, 65, 65, 86, 1, 0, 0, 12306, 0, 8213,
  /* 11609 */ 34842, 29, 30752, 32803, 44, 66, 66, 87, 1, 0, 0, 12306, 0, 8213, 34842, 29, 30752, 32803, 45, 47, 47, 68,
  /* 11631 */ 1, 0, 0, 12306, 0, 8213, 34843, 29, 30752, 32803, 44, 46, 46, 68, 1, 0, 0, 12306, 0, 8213, 34843, 29,
  /* 11653 */ 30752, 32803, 44, 67, 67, 88, 1, 0, 0, 12306, 0, 8213, 534553, 29, 30752, 32803, 0, 0, 0, 0, 1, 0, 0,
  /* 11676 */ 12306, 40980, 8213, 40983, 43036, 30752, 32803, 43045, 0, 40980, 43045, 1, 0, 0, 12306, 0, 22, 24, 29,
  /* 11695 */ 30752, 32803, 0, 0, 0, 0, 1, 0, 0, 12306, 0, 8213, 24, 29, 34, 34, 0, 0, 0, 0, 1, 0, 0, 12306, 0, 8213,
  /* 11721 */ 24, 29, 30752, 32803, 0, 0, 0, 0, 0, 53248, 0, 12377, 12378, 0, 8213, 8213, 24, 24, 24, 24, 24, 29, 29,
  /* 11744 */ 29, 29, 30752, 0, 98, 32803, 0, 0, 4197, 0, 0, 0, 0, 0, 44, 44, 46, 46, 46, 46, 46, 1172, 46, 46, 68, 68,
  /* 11770 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 366, 68, 68, 117, 121, 46, 46, 46, 46, 46, 146, 46, 151, 46, 157, 46,
  /* 11795 */ 160, 46, 46, 46, 46, 495, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 826, 46, 46, 46, 46, 174, 46, 46,
  /* 11820 */ 68, 68, 184, 188, 68, 68, 68, 68, 68, 213, 68, 218, 68, 68, 68, 68, 68, 68, 1153, 68, 68, 68, 68, 68, 68,
  /* 11845 */ 46, 46, 46, 46, 46, 46, 46, 46, 1259, 46, 1261, 224, 68, 227, 68, 68, 241, 68, 68, 12306, 12306, 8213, 0,
  /* 11868 */ 24, 34842, 29, 29, 46, 458, 46, 46, 46, 46, 46, 46, 46, 46, 46, 471, 46, 46, 46, 46, 46, 46, 1119, 46, 46,
  /* 11893 */ 46, 46, 46, 46, 46, 46, 46, 499, 46, 46, 46, 46, 46, 46, 46, 46, 508, 46, 46, 511, 46, 46, 46, 46, 46, 46,
  /* 11919 */ 46, 46, 46, 46, 155, 46, 46, 46, 46, 173, 523, 46, 46, 46, 46, 46, 528, 46, 46, 46, 46, 46, 46, 46, 68,
  /* 11944 */ 68, 68, 1131, 68, 68, 68, 68, 68, 68, 68, 46, 1223, 46, 1225, 46, 46, 46, 46, 46, 68, 558, 68, 68, 68, 68,
  /* 11969 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 554, 68, 68, 68, 68, 68, 437, 0, 4535, 625, 0, 0, 0, 0, 0, 0, 0,
  /* 11996 */ 0, 61440, 0, 544768, 0, 0, 0, 109, 0, 111, 540672, 46, 46, 712, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68,
  /* 12020 */ 68, 68, 68, 68, 68, 1215, 68, 68, 726, 68, 68, 729, 68, 68, 68, 68, 68, 68, 737, 68, 68, 68, 46, 46, 46,
  /* 12045 */ 46, 46, 46, 46, 46, 46, 46, 1287, 46, 46, 68, 68, 756, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 12071 */ 46, 46, 46, 68, 68, 68, 769, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 0, 46, 1102, 46, 46, 46, 46,
  /* 12097 */ 818, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 68, 68, 865, 68, 68, 68, 68, 870, 68, 68, 68, 68, 68,
  /* 12123 */ 68, 68, 68, 68, 68, 68, 878, 68, 68, 68, 68, 911, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 0, 797, 0,
  /* 12149 */ 46, 46, 68, 920, 68, 68, 68, 68, 68, 68, 0, 924, 0, 0, 0, 0, 0, 800, 0, 0, 0, 0, 0, 802, 0, 0, 0, 0, 0,
  /* 12178 */ 802, 0, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 936, 46, 46, 46, 46, 510, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 12204 */ 46, 46, 46, 1163, 46, 46, 46, 46, 46, 46, 46, 46, 851, 46, 46, 46, 46, 46, 46, 46, 940, 46, 46, 46, 46,
  /* 12229 */ 46, 46, 46, 46, 46, 46, 949, 46, 46, 46, 46, 46, 46, 1173, 46, 68, 68, 68, 68, 68, 68, 68, 68, 595, 68,
  /* 12254 */ 68, 598, 68, 68, 68, 68, 68, 68, 1003, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 552, 68, 68,
  /* 12279 */ 46, 46, 1052, 46, 1054, 46, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 720, 68, 68, 68, 68, 68, 1092, 68,
  /* 12303 */ 1094, 68, 68, 68, 68, 68, 68, 68, 68, 0, 46, 46, 46, 46, 46, 46, 46, 648, 46, 46, 46, 46, 652, 46, 46, 46,
  /* 12329 */ 46, 524, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 1175, 68, 68, 68, 1178, 68, 68, 605, 68,
  /* 12354 */ 68, 68, 68, 68, 611, 68, 68, 68, 68, 68, 68, 68, 68, 793, 924, 0, 0, 0, 0, 0, 800, 867, 68, 68, 68, 68,
  /* 12380 */ 871, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 388, 68, 68, 68, 68, 68, 68, 68, 68, 921, 68, 68, 68, 68, 0,
  /* 12406 */ 924, 0, 0, 0, 0, 0, 800, 46, 46, 1263, 46, 68, 68, 68, 68, 68, 68, 68, 68, 1272, 68, 1274, 68, 68, 68, 68,
  /* 12432 */ 68, 417, 68, 68, 421, 68, 68, 68, 68, 68, 427, 68, 68, 68, 68, 68, 543, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 12457 */ 68, 68, 749, 68, 68, 68, 68, 68, 68, 1276, 68, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 166,
  /* 12482 */ 46, 46, 68, 68, 228, 68, 68, 68, 68, 68, 12306, 12306, 8213, 0, 24, 34842, 29, 29, 46, 267, 269, 46, 46,
  /* 12505 */ 46, 46, 46, 46, 46, 46, 283, 46, 288, 46, 46, 46, 46, 526, 46, 46, 46, 46, 46, 46, 46, 46, 46, 68, 538,
  /* 12530 */ 292, 46, 46, 295, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 287, 46, 46, 46, 46, 46, 68, 68, 353,
  /* 12555 */ 355, 68, 68, 68, 68, 68, 68, 68, 68, 369, 68, 68, 68, 68, 68, 561, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 12581 */ 788, 68, 68, 68, 68, 68, 0, 374, 68, 68, 378, 68, 68, 381, 68, 68, 68, 68, 68, 68, 68, 68, 68, 422, 68,
  /* 12606 */ 68, 68, 68, 68, 68, 46, 46, 46, 461, 46, 46, 46, 46, 46, 46, 46, 46, 46, 473, 46, 46, 46, 46, 660, 46, 46,
  /* 12632 */ 46, 46, 665, 46, 46, 46, 46, 46, 46, 301, 46, 46, 46, 46, 46, 46, 46, 46, 46, 277, 46, 46, 46, 46, 46, 46,
  /* 12658 */ 506, 507, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 171, 46, 68, 68, 68, 560, 68, 68, 68,
  /* 12683 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 917, 68, 68, 68, 68, 68, 573, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 12709 */ 68, 68, 68, 68, 1000, 68, 68, 907, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 0, 46,
  /* 12735 */ 953, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 307, 46, 1127, 46, 46, 46, 46, 68, 68, 68,
  /* 12760 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 222, 46, 46, 1337, 68, 68, 68, 1339, 46, 46, 68, 68, 46, 68, 46, 68,
  /* 12785 */ 46, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 544768, 0, 0, 0, 262, 0, 110, 540672, 46, 268, 46, 46, 46,
  /* 12813 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 323, 46, 293, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 12839 */ 46, 306, 46, 46, 46, 46, 1171, 46, 46, 46, 68, 68, 68, 68, 68, 1176, 68, 68, 68, 68, 68, 68, 980, 68, 68,
  /* 12864 */ 68, 68, 68, 68, 988, 68, 68, 68, 68, 68, 68, 544, 68, 68, 68, 68, 68, 68, 68, 68, 555, 46, 46, 68, 68,
  /* 12889 */ 354, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 424, 68, 68, 68, 68, 68, 68, 68, 379, 68, 68, 68, 68, 68,
  /* 12915 */ 68, 68, 68, 68, 68, 68, 68, 68, 1145, 68, 68, 68, 392, 68, 68, 68, 68, 68, 68, 400, 68, 68, 402, 68, 68,
  /* 12940 */ 405, 68, 68, 68, 68, 68, 575, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 887, 68, 68, 68, 890, 68, 68, 603,
  /* 12965 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 406, 710, 46, 46, 46, 46, 46, 46, 46, 68, 68,
  /* 12991 */ 68, 68, 68, 68, 68, 724, 68, 68, 68, 68, 728, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 566, 68, 68, 68,
  /* 13017 */ 68, 68, 68, 68, 68, 744, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 736, 68, 68, 68, 68, 46, 46, 46, 806,
  /* 13043 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 320, 46, 46, 46, 46, 844, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 13069 */ 46, 46, 46, 46, 46, 46, 324, 46, 963, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 68, 1063,
  /* 13094 */ 68, 68, 991, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 584, 68, 68, 68, 68, 68, 1004, 68,
  /* 13119 */ 68, 68, 68, 68, 68, 68, 1010, 68, 68, 68, 46, 46, 46, 46, 46, 46, 46, 1284, 46, 1286, 46, 46, 46, 46, 46,
  /* 13144 */ 1236, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 582, 68, 68, 68, 68, 68, 46, 1128, 46, 46, 46, 68, 68, 68,
  /* 13169 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 373, 118, 46, 124, 46, 46, 137, 46, 147, 46, 152, 46, 46, 159,
  /* 13193 */ 162, 167, 46, 46, 46, 46, 1265, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1008, 68, 68, 68, 68, 68, 175,
  /* 13218 */ 46, 46, 68, 68, 185, 68, 191, 68, 68, 204, 68, 214, 68, 219, 68, 68, 68, 68, 68, 771, 68, 68, 68, 68, 68,
  /* 13243 */ 68, 776, 68, 68, 68, 46, 46, 1329, 1330, 46, 46, 68, 68, 1333, 1334, 68, 68, 46, 68, 226, 229, 234, 68,
  /* 13266 */ 242, 68, 68, 12306, 12306, 8213, 0, 24, 34842, 29, 29, 46, 46, 294, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 13289 */ 46, 46, 46, 46, 305, 46, 46, 309, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 321, 46, 46, 46, 46,
  /* 13314 */ 674, 46, 676, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1110, 46, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68,
  /* 13339 */ 68, 68, 68, 68, 360, 68, 68, 68, 68, 68, 68, 68, 996, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1155, 68, 68,
  /* 13364 */ 68, 46, 46, 46, 68, 375, 68, 68, 68, 380, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 549, 550, 68, 68, 68,
  /* 13389 */ 68, 68, 68, 68, 395, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1156, 46, 46, 407, 68, 68, 68,
  /* 13414 */ 68, 68, 68, 68, 68, 68, 68, 423, 68, 68, 68, 68, 0, 0, 4535, 0, 0, 0, 632, 0, 0, 0, 638, 0, 68, 68, 433,
  /* 13441 */ 68, 68, 12306, 0, 437, 0, 0, 0, 0, 4535, 254, 14591, 0, 0, 0, 28672, 0, 0, 0, 0, 0, 542720, 0, 563200,
  /* 13465 */ 563200, 540672, 540672, 540672, 919552, 540672, 540672, 561152, 561152, 665600, 561152, 561152, 561152,
  /* 13478 */ 561152, 561152, 561152, 561152, 561152, 561152, 12306, 12306, 8213, 0, 24, 24, 29, 0, 46, 46, 459, 46, 46,
  /* 13497 */ 46, 46, 46, 46, 46, 46, 46, 472, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 1270, 68, 68, 68, 68, 68, 68, 68,
  /* 13523 */ 1006, 68, 68, 68, 1009, 68, 1011, 68, 68, 46, 476, 46, 46, 46, 46, 480, 46, 482, 46, 46, 46, 46, 46, 46,
  /* 13547 */ 46, 302, 46, 46, 46, 46, 46, 46, 46, 46, 862, 46, 46, 46, 68, 68, 68, 68, 46, 490, 491, 493, 46, 46, 46,
  /* 13572 */ 46, 46, 46, 500, 501, 46, 46, 504, 505, 46, 46, 46, 525, 46, 46, 46, 46, 46, 46, 46, 46, 46, 536, 537, 68,
  /* 13597 */ 68, 68, 68, 68, 784, 68, 786, 68, 68, 68, 68, 68, 68, 68, 0, 0, 4535, 0, 0, 0, 0, 0, 0, 0, 0, 0, 544768,
  /* 13624 */ 0, 0, 0, 261, 0, 264, 540672, 539, 68, 540, 68, 542, 68, 68, 68, 546, 68, 68, 68, 68, 68, 68, 68, 68, 872,
  /* 13649 */ 68, 68, 68, 68, 68, 68, 68, 68, 899, 68, 68, 68, 68, 68, 68, 68, 68, 982, 68, 985, 68, 68, 68, 68, 990,
  /* 13674 */ 68, 68, 559, 68, 68, 68, 68, 563, 68, 68, 68, 68, 567, 68, 569, 68, 68, 68, 68, 68, 896, 68, 68, 68, 68,
  /* 13699 */ 68, 68, 68, 68, 905, 68, 68, 68, 68, 68, 1005, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 613, 68, 68, 68,
  /* 13724 */ 68, 68, 587, 588, 68, 68, 591, 592, 68, 68, 68, 68, 68, 68, 68, 600, 68, 68, 68, 68, 68, 68, 399, 68, 68,
  /* 13749 */ 68, 68, 68, 68, 68, 68, 68, 734, 68, 68, 68, 68, 68, 68, 68, 604, 68, 68, 68, 68, 68, 68, 68, 612, 68, 68,
  /* 13775 */ 68, 68, 68, 68, 68, 419, 68, 68, 68, 68, 68, 68, 68, 68, 0, 0, 797, 0, 0, 0, 0, 0, 68, 68, 68, 623, 437,
  /* 13802 */ 0, 4535, 0, 0, 0, 0, 0, 0, 0, 0, 0, 629, 800, 0, 0, 0, 0, 635, 802, 0, 0, 0, 0, 109, 0, 0, 0, 109, 0, 111,
  /* 13832 */ 0, 0, 0, 111, 0, 46, 656, 46, 46, 46, 46, 46, 46, 664, 46, 666, 46, 46, 46, 46, 46, 46, 849, 46, 46, 46,
  /* 13858 */ 46, 46, 46, 46, 46, 46, 532, 46, 46, 46, 46, 68, 68, 46, 698, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 13884 */ 46, 46, 46, 326, 46, 46, 711, 46, 46, 714, 715, 46, 46, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 365,
  /* 13909 */ 68, 68, 68, 742, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 601, 68, 766, 767, 68, 68, 68,
  /* 13934 */ 68, 68, 68, 774, 68, 68, 68, 68, 68, 68, 68, 68, 997, 998, 68, 68, 68, 68, 1001, 68, 46, 46, 46, 846, 46,
  /* 13959 */ 46, 46, 46, 46, 46, 46, 853, 46, 46, 46, 46, 46, 46, 1307, 1308, 46, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 13983 */ 12306, 12306, 8213, 0, 24, 26, 29, 29, 46, 46, 46, 858, 46, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68,
  /* 14007 */ 68, 722, 68, 68, 68, 68, 869, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 617, 68, 68, 68, 68,
  /* 14032 */ 881, 68, 883, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 875, 68, 68, 68, 68, 46, 46, 942, 46, 46, 46,
  /* 14057 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 486, 46, 46, 46, 46, 46, 955, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 14083 */ 46, 961, 46, 46, 46, 68, 68, 68, 68, 46, 46, 68, 68, 46, 68, 46, 68, 1346, 46, 46, 1038, 46, 46, 46, 46,
  /* 14108 */ 46, 1044, 46, 46, 46, 46, 46, 46, 46, 513, 46, 46, 46, 517, 46, 46, 46, 46, 46, 46, 46, 1053, 1055, 46,
  /* 14132 */ 46, 46, 1058, 46, 1060, 1061, 46, 68, 68, 68, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 46, 46, 46,
  /* 14157 */ 46, 46, 1320, 46, 68, 68, 68, 68, 68, 68, 68, 1068, 68, 68, 68, 68, 68, 1072, 68, 68, 68, 68, 68, 68, 68,
  /* 14182 */ 420, 68, 68, 68, 68, 68, 68, 68, 68, 759, 68, 68, 68, 68, 68, 68, 68, 68, 1078, 68, 68, 68, 68, 68, 1084,
  /* 14207 */ 68, 68, 68, 68, 68, 68, 68, 68, 564, 68, 68, 68, 68, 568, 68, 68, 68, 68, 1093, 1095, 68, 68, 68, 1098,
  /* 14231 */ 68, 1100, 1101, 68, 0, 46, 46, 46, 46, 46, 646, 46, 46, 46, 46, 46, 46, 46, 46, 46, 303, 46, 46, 46, 46,
  /* 14256 */ 46, 46, 1104, 46, 46, 46, 46, 46, 46, 46, 1109, 46, 46, 46, 46, 46, 46, 46, 529, 531, 46, 46, 46, 46, 46,
  /* 14281 */ 68, 68, 1130, 68, 68, 68, 68, 68, 68, 68, 68, 579, 68, 68, 583, 68, 68, 68, 68, 1136, 68, 68, 68, 68, 68,
  /* 14306 */ 68, 68, 68, 68, 68, 68, 68, 68, 1146, 68, 68, 68, 68, 68, 1016, 68, 68, 68, 68, 68, 0, 0, 0, 46, 1023,
  /* 14331 */ 1190, 68, 68, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1199, 46, 46, 46, 46, 68, 68, 68, 68, 68, 1269, 68, 68,
  /* 14356 */ 68, 68, 68, 68, 68, 898, 68, 68, 68, 901, 68, 68, 68, 906, 68, 68, 68, 68, 1251, 46, 46, 46, 46, 46, 46,
  /* 14381 */ 1257, 46, 46, 46, 46, 46, 68, 1129, 68, 68, 68, 1132, 68, 68, 68, 68, 68, 46, 1253, 46, 1254, 46, 46, 46,
  /* 14405 */ 1258, 46, 46, 46, 68, 68, 68, 1278, 1279, 1280, 46, 46, 46, 1283, 46, 1285, 46, 46, 46, 46, 46, 68, 1208,
  /* 14428 */ 68, 68, 1210, 68, 68, 68, 68, 68, 68, 68, 886, 68, 68, 68, 68, 68, 68, 891, 68, 1290, 1291, 1292, 68, 68,
  /* 14452 */ 68, 1295, 68, 1297, 68, 68, 68, 68, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1201, 46, 68, 68, 1327,
  /* 14476 */ 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 46, 46, 46, 46, 1255, 46, 46, 46, 46, 46, 46, 141, 46, 46,
  /* 14502 */ 46, 46, 46, 46, 46, 46, 46, 515, 46, 46, 46, 46, 46, 46, 0, 0, 32803, 0, 0, 4197, 0, 0, 0, 0, 0, 44, 44,
  /* 14529 */ 46, 46, 112, 46, 46, 68, 68, 68, 68, 68, 68, 358, 68, 68, 68, 68, 68, 370, 68, 68, 68, 68, 68, 1082, 68,
  /* 14554 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 761, 762, 68, 68, 68, 68, 46, 683, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 14580 */ 46, 46, 46, 46, 46, 487, 46, 68, 68, 68, 910, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1188,
  /* 14605 */ 68, 68, 68, 1137, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 778, 779, 46, 46, 46, 1338, 68,
  /* 14630 */ 68, 68, 46, 46, 68, 68, 46, 68, 46, 68, 46, 46, 46, 68, 68, 68, 68, 46, 46, 68, 68, 46, 68, 1344, 1345,
  /* 14655 */ 46, 46, 46, 68, 68, 68, 68, 46, 46, 68, 68, 1342, 1343, 46, 68, 46, 46, 46, 68, 68, 68, 68, 46, 1340, 68,
  /* 14680 */ 1341, 46, 68, 46, 68, 46, 46, 46, 68, 68, 68, 68, 68, 68, 68, 68, 207, 68, 68, 68, 68, 0, 0, 4535, 0, 0,
  /* 14706 */ 0, 631, 0, 0, 0, 637, 0, 0, 99, 32803, 0, 0, 4197, 0, 0, 0, 0, 0, 44, 44, 46, 46, 46, 46, 68, 68, 68, 68,
  /* 14734 */ 1268, 68, 68, 68, 68, 68, 68, 68, 68, 787, 68, 68, 790, 791, 68, 68, 0, 68, 68, 68, 757, 68, 68, 68, 68,
  /* 14759 */ 68, 68, 68, 68, 68, 68, 68, 68, 389, 68, 68, 68, 46, 46, 46, 966, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 14785 */ 46, 68, 68, 719, 68, 68, 68, 68, 68, 46, 46, 46, 1039, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1048, 46, 46,
  /* 14810 */ 46, 46, 807, 46, 46, 46, 46, 811, 46, 46, 46, 46, 46, 46, 144, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1309,
  /* 14835 */ 68, 68, 68, 68, 68, 68, 68, 68, 1079, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1088, 68, 68, 68, 46, 46, 46,
  /* 14860 */ 46, 46, 46, 1197, 46, 46, 46, 46, 46, 46, 140, 46, 46, 46, 46, 46, 46, 46, 46, 46, 483, 46, 46, 46, 46,
  /* 14885 */ 46, 46, 1115, 46, 46, 46, 46, 46, 46, 46, 1120, 46, 1122, 46, 46, 46, 46, 46, 46, 956, 46, 46, 46, 46, 46,
  /* 14910 */ 46, 46, 46, 46, 317, 46, 46, 46, 46, 46, 46, 1147, 68, 1149, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 46,
  /* 14935 */ 46, 46, 46, 46, 46, 46, 46, 1230, 1169, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 14960 */ 68, 68, 68, 68, 68, 68, 68, 1181, 68, 68, 68, 68, 68, 68, 68, 68, 1187, 68, 68, 68, 68, 0, 0, 4535, 626,
  /* 14985 */ 0, 0, 0, 0, 0, 0, 0, 0, 4197, 4197, 0, 0, 0, 0, 0, 0, 109, 0, 111, 46, 46, 122, 46, 46, 46, 46, 46, 46,
  /* 15013 */ 46, 46, 46, 46, 46, 46, 46, 46, 521, 522, 46, 176, 46, 68, 68, 68, 189, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 15038 */ 68, 548, 68, 68, 68, 68, 68, 68, 328, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 474, 68,
  /* 15064 */ 68, 68, 414, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 403, 68, 68, 68, 68, 68, 622, 68, 0, 0, 4535,
  /* 15090 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 4197, 4197, 0, 0, 544768, 0, 0, 0, 109, 0, 111, 46, 68, 68, 68, 727, 68, 68,
  /* 15117 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 551, 68, 68, 68, 68, 1191, 68, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 15143 */ 46, 46, 46, 46, 668, 46, 46, 46, 46, 125, 46, 133, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 534, 46,
  /* 15168 */ 46, 68, 68, 46, 177, 46, 68, 68, 68, 68, 192, 68, 200, 68, 68, 68, 68, 68, 68, 68, 545, 68, 68, 68, 68,
  /* 15193 */ 68, 68, 68, 68, 0, 924, 0, 0, 0, 0, 0, 800, 46, 46, 46, 296, 46, 46, 46, 46, 46, 46, 46, 304, 46, 46, 46,
  /* 15220 */ 46, 46, 272, 46, 46, 46, 46, 46, 284, 46, 46, 46, 46, 46, 299, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 15245 */ 340, 46, 46, 46, 46, 46, 46, 46, 331, 46, 46, 335, 46, 46, 46, 46, 46, 341, 46, 46, 46, 348, 46, 46, 68,
  /* 15270 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 363, 68, 68, 68, 46, 46, 46, 46, 1282, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 15296 */ 337, 46, 46, 46, 46, 46, 46, 347, 68, 68, 434, 68, 68, 12306, 0, 0, 0, 0, 0, 0, 4535, 254, 14591, 0, 0,
  /* 15321 */ 251, 0, 4197, 4197, 0, 14591, 0, 0, 0, 260, 109, 263, 111, 265, 556, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 15345 */ 68, 68, 68, 68, 68, 68, 429, 68, 68, 68, 590, 68, 68, 68, 68, 68, 68, 68, 68, 599, 68, 68, 68, 46, 46, 46,
  /* 15371 */ 46, 1331, 46, 68, 68, 68, 68, 1335, 68, 46, 68, 68, 68, 607, 68, 68, 68, 68, 68, 68, 68, 68, 68, 616, 618,
  /* 15396 */ 68, 68, 68, 68, 68, 1096, 68, 68, 1099, 68, 68, 68, 0, 46, 46, 1103, 46, 657, 46, 46, 46, 46, 46, 46, 46,
  /* 15421 */ 46, 46, 46, 46, 46, 46, 46, 708, 46, 46, 46, 46, 699, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 343,
  /* 15447 */ 46, 46, 46, 46, 46, 46, 713, 46, 46, 46, 46, 68, 68, 68, 68, 721, 68, 68, 68, 46, 46, 46, 1194, 46, 46,
  /* 15472 */ 46, 46, 1198, 46, 46, 46, 46, 46, 820, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 469, 46, 46, 46, 46, 46,
  /* 15497 */ 46, 804, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 814, 46, 46, 46, 831, 46, 46, 46, 46, 46,
  /* 15523 */ 46, 46, 46, 46, 46, 46, 46, 842, 856, 46, 46, 46, 859, 46, 46, 46, 46, 46, 46, 46, 68, 864, 68, 68, 68,
  /* 15548 */ 68, 68, 68, 418, 68, 68, 68, 68, 68, 425, 68, 68, 68, 46, 1193, 46, 46, 1195, 46, 46, 46, 46, 46, 46, 46,
  /* 15573 */ 46, 947, 46, 46, 46, 46, 46, 46, 46, 68, 68, 909, 68, 68, 68, 68, 68, 68, 68, 68, 68, 916, 68, 68, 68, 46,
  /* 15599 */ 46, 46, 1281, 46, 46, 46, 46, 46, 46, 46, 46, 1289, 919, 68, 68, 68, 68, 68, 68, 68, 0, 0, 0, 0, 0, 0, 0,
  /* 15626 */ 0, 4197, 4197, 0, 0, 544768, 256, 258, 0, 109, 0, 111, 46, 46, 46, 954, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 15650 */ 959, 46, 46, 46, 962, 46, 964, 46, 46, 46, 46, 46, 46, 968, 46, 46, 46, 46, 46, 46, 68, 1238, 68, 1240,
  /* 15674 */ 68, 68, 68, 68, 68, 68, 68, 976, 68, 68, 68, 68, 68, 981, 68, 68, 68, 68, 68, 68, 68, 68, 733, 68, 68, 68,
  /* 15700 */ 68, 68, 68, 68, 68, 68, 68, 68, 1015, 68, 68, 68, 68, 68, 68, 0, 0, 0, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 15727 */ 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 46, 46, 1026, 46, 46, 46, 46, 1030, 46, 46, 46, 46, 46, 46,
  /* 15752 */ 46, 1036, 68, 1066, 68, 68, 68, 68, 1070, 68, 68, 68, 68, 68, 68, 68, 1076, 68, 68, 68, 68, 68, 1141, 68,
  /* 15776 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 775, 68, 68, 68, 68, 68, 46, 46, 46, 1159, 46, 46, 46, 46, 46, 46, 46,
  /* 15802 */ 46, 46, 46, 46, 46, 502, 46, 46, 46, 46, 46, 1170, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 1177, 68,
  /* 15827 */ 68, 68, 68, 68, 1184, 68, 68, 68, 1185, 1186, 68, 68, 68, 68, 68, 68, 68, 923, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 15853 */ 49152, 49152, 49152, 49152, 49152, 49152, 0, 0, 0, 0, 0, 46, 1232, 1233, 46, 1235, 46, 68, 68, 68, 68, 68,
  /* 15875 */ 68, 68, 68, 1245, 68, 68, 68, 68, 68, 1221, 68, 46, 46, 46, 46, 1226, 46, 46, 46, 46, 46, 661, 46, 46, 46,
  /* 15900 */ 46, 46, 46, 46, 46, 46, 46, 279, 46, 46, 46, 46, 46, 1247, 1248, 68, 1250, 68, 46, 46, 46, 46, 46, 46, 46,
  /* 15925 */ 46, 46, 46, 46, 680, 46, 46, 46, 46, 46, 46, 46, 1305, 46, 1306, 46, 46, 46, 68, 68, 68, 68, 68, 68, 1312,
  /* 15950 */ 68, 1313, 68, 68, 68, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1135, 68, 725, 68,
  /* 15975 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 570, 0, 99, 32803, 0, 0, 4197, 0, 0, 0, 0, 0, 44,
  /* 16002 */ 44, 46, 46, 113, 46, 46, 46, 127, 46, 46, 46, 46, 46, 46, 46, 46, 46, 163, 46, 46, 46, 46, 819, 46, 46,
  /* 16027 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 1033, 46, 46, 46, 46, 68, 68, 230, 68, 68, 68, 68, 68, 12306, 12306,
  /* 16051 */ 8213, 0, 24, 26, 29, 29, 266, 46, 46, 46, 46, 46, 46, 46, 46, 46, 278, 285, 46, 46, 46, 46, 46, 479, 46,
  /* 16076 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 837, 46, 46, 46, 46, 46, 46, 330, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 16102 */ 46, 46, 344, 46, 46, 46, 46, 847, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1124, 46, 46, 46, 46,
  /* 16127 */ 46, 68, 352, 68, 68, 68, 68, 68, 68, 68, 68, 68, 364, 371, 68, 68, 68, 68, 68, 1252, 46, 46, 46, 46, 46,
  /* 16152 */ 46, 46, 46, 46, 46, 1166, 46, 46, 46, 1167, 1168, 68, 68, 68, 68, 416, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 16177 */ 68, 68, 902, 68, 68, 68, 68, 430, 68, 68, 68, 68, 12306, 0, 0, 0, 0, 0, 0, 4535, 254, 14591, 0, 0, 441,
  /* 16202 */ 260, 0, 0, 263, 0, 46, 46, 46, 46, 46, 46, 46, 46, 467, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 509, 46,
  /* 16228 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 518, 46, 46, 46, 557, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 16254 */ 68, 68, 68, 68, 68, 585, 571, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 602, 68, 621,
  /* 16279 */ 68, 68, 0, 0, 4535, 626, 0, 0, 0, 0, 0, 0, 0, 0, 4197, 4197, 0, 14591, 0, 0, 0, 260, 109, 263, 111, 46,
  /* 16305 */ 46, 46, 684, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 695, 46, 46, 46, 68, 68, 68, 68, 68, 68, 203, 68,
  /* 16331 */ 68, 68, 68, 68, 68, 68, 913, 68, 68, 68, 68, 68, 68, 68, 918, 68, 68, 781, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 16357 */ 68, 68, 68, 68, 0, 46, 46, 46, 68, 880, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 792, 0,
  /* 16383 */ 46, 941, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 855, 46, 68, 68, 68, 1080, 68, 68, 68,
  /* 16408 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 889, 68, 68, 68, 46, 46, 46, 128, 46, 46, 142, 46, 46, 46, 46, 46, 46,
  /* 16434 */ 46, 46, 46, 678, 46, 46, 46, 46, 46, 46, 0, 249, 0, 0, 4197, 4197, 0, 14591, 0, 0, 0, 260, 109, 263, 111,
  /* 16459 */ 46, 46, 46, 68, 68, 68, 68, 68, 195, 68, 68, 209, 68, 68, 68, 68, 0, 0, 4535, 627, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 16487 */ 4197, 4197, 0, 14591, 106, 0, 0, 260, 109, 263, 111, 46, 46, 46, 46, 332, 46, 46, 46, 46, 46, 339, 46, 46,
  /* 16511 */ 46, 46, 46, 46, 273, 46, 46, 46, 282, 46, 46, 46, 46, 46, 475, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 16537 */ 46, 46, 46, 46, 488, 697, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 670, 741, 68, 68,
  /* 16562 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 619, 68, 68, 768, 68, 68, 68, 68, 773, 68, 68, 68, 68,
  /* 16588 */ 68, 68, 68, 68, 747, 68, 68, 68, 68, 68, 68, 753, 795, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 46,
  /* 16618 */ 46, 46, 1206, 46, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 924, 0, 0, 46, 46, 0, 0, 32803, 0, 0, 4197,
  /* 16644 */ 0, 0, 0, 0, 0, 44, 44, 46, 46, 114, 46, 46, 46, 129, 46, 46, 143, 46, 46, 46, 154, 46, 46, 46, 46, 172,
  /* 16670 */ 68, 68, 68, 68, 239, 68, 68, 68, 12306, 12306, 8213, 0, 24, 34842, 29, 29, 68, 409, 68, 68, 68, 68, 68,
  /* 16693 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 989, 68, 457, 46, 46, 46, 46, 46, 46, 46, 46, 468, 46, 46, 46, 46, 46,
  /* 16719 */ 46, 315, 46, 46, 46, 46, 46, 46, 46, 46, 46, 690, 691, 46, 46, 46, 46, 46, 68, 68, 68, 68, 783, 68, 68,
  /* 16744 */ 68, 68, 68, 68, 68, 68, 68, 68, 0, 0, 0, 0, 0, 0, 0, 0, 816, 817, 46, 46, 46, 46, 46, 822, 46, 824, 46,
  /* 16771 */ 46, 46, 46, 828, 46, 46, 46, 68, 68, 68, 68, 68, 198, 68, 68, 68, 68, 68, 68, 68, 68, 12306, 12306, 8213,
  /* 16795 */ 0, 24, 34842, 29, 29, 68, 68, 68, 882, 68, 884, 68, 68, 68, 68, 888, 68, 68, 68, 68, 68, 68, 68, 1018, 68,
  /* 16820 */ 68, 68, 0, 0, 0, 46, 46, 46, 46, 46, 46, 46, 46, 46, 935, 46, 938, 46, 68, 68, 68, 894, 68, 68, 68, 68,
  /* 16846 */ 68, 68, 900, 68, 68, 68, 68, 68, 68, 68, 1071, 68, 68, 68, 68, 68, 68, 68, 68, 547, 68, 68, 68, 68, 553,
  /* 16871 */ 68, 68, 68, 908, 68, 68, 68, 68, 912, 68, 68, 68, 68, 68, 68, 68, 68, 68, 596, 68, 68, 68, 68, 68, 68, 68,
  /* 16897 */ 68, 992, 68, 68, 995, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 597, 68, 68, 68, 68, 68, 68, 68, 68, 1014,
  /* 16922 */ 68, 68, 1017, 68, 68, 1020, 68, 0, 0, 0, 46, 46, 46, 46, 46, 46, 46, 933, 46, 46, 46, 46, 46, 46, 1056,
  /* 16947 */ 46, 46, 1059, 46, 46, 46, 1062, 68, 68, 1024, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 16972 */ 815, 46, 1051, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 68, 68, 1064, 68, 68, 68, 68, 1081, 68, 1083,
  /* 16996 */ 68, 68, 68, 68, 68, 68, 1089, 68, 68, 68, 68, 68, 68, 562, 68, 68, 68, 68, 68, 68, 68, 68, 68, 565, 68,
  /* 17021 */ 68, 68, 68, 68, 68, 1091, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 0, 46, 46, 46, 46, 645, 46, 46, 46,
  /* 17047 */ 46, 46, 46, 46, 46, 46, 46, 281, 46, 46, 46, 46, 291, 46, 1116, 46, 46, 46, 46, 46, 46, 46, 1121, 46, 46,
  /* 17072 */ 46, 46, 46, 46, 512, 46, 46, 46, 46, 46, 46, 520, 46, 46, 68, 68, 1138, 1139, 68, 68, 68, 68, 68, 1143,
  /* 17096 */ 68, 68, 68, 68, 68, 68, 68, 577, 578, 580, 68, 68, 68, 68, 68, 68, 68, 384, 386, 68, 68, 68, 68, 68, 68,
  /* 17121 */ 68, 68, 12306, 12306, 0, 0, 24, 34842, 29, 29, 68, 1148, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 46,
  /* 17145 */ 46, 46, 46, 46, 46, 1228, 46, 46, 68, 68, 68, 1182, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1144,
  /* 17170 */ 68, 68, 68, 1216, 68, 68, 68, 68, 68, 68, 46, 46, 1224, 46, 46, 46, 46, 1229, 46, 46, 46, 68, 68, 68, 68,
  /* 17195 */ 68, 199, 68, 68, 68, 68, 68, 68, 68, 245, 12306, 12306, 8213, 0, 24, 34842, 29, 29, 46, 46, 46, 1234, 46,
  /* 17218 */ 46, 68, 68, 1239, 68, 68, 68, 68, 1244, 68, 68, 68, 68, 68, 68, 593, 594, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 17243 */ 385, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1249, 68, 68, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 863,
  /* 17268 */ 68, 68, 68, 68, 1262, 46, 46, 1264, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1275, 68, 68, 1277, 46,
  /* 17292 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 707, 46, 46, 1325, 68, 68, 46, 46, 46, 46, 46, 46, 68, 68,
  /* 17318 */ 68, 68, 68, 68, 46, 46, 46, 1318, 1319, 46, 46, 68, 68, 68, 1324, 1347, 46, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 17345 */ 0, 0, 0, 0, 46, 46, 46, 930, 46, 46, 46, 46, 46, 46, 937, 46, 939, 119, 123, 126, 46, 134, 46, 46, 148,
  /* 17370 */ 150, 153, 46, 46, 46, 164, 168, 46, 46, 46, 68, 68, 186, 190, 193, 68, 201, 68, 68, 215, 217, 220, 68, 68,
  /* 17394 */ 68, 68, 68, 1316, 46, 46, 46, 46, 46, 46, 1322, 68, 68, 68, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68,
  /* 17419 */ 68, 1336, 68, 68, 231, 235, 68, 68, 68, 68, 12306, 12306, 8213, 0, 24, 34842, 29, 29, 46, 46, 46, 313, 46,
  /* 17442 */ 46, 46, 46, 46, 46, 46, 46, 46, 322, 46, 46, 46, 46, 1028, 46, 46, 46, 46, 46, 1032, 46, 46, 46, 46, 46,
  /* 17467 */ 46, 945, 46, 46, 948, 46, 46, 46, 46, 46, 46, 336, 46, 46, 46, 46, 46, 46, 46, 46, 46, 464, 46, 46, 46,
  /* 17492 */ 46, 46, 46, 46, 46, 46, 836, 46, 46, 46, 46, 46, 46, 329, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 342, 46,
  /* 17518 */ 46, 46, 46, 46, 808, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 809, 46, 46, 46, 46, 46, 46, 46, 46, 46, 498,
  /* 17544 */ 46, 46, 46, 503, 46, 46, 408, 68, 68, 415, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 428, 68, 68, 68, 68,
  /* 17569 */ 68, 12306, 0, 0, 0, 0, 0, 0, 0, 254, 14591, 0, 0, 0, 260, 445, 0, 263, 449, 46, 46, 46, 46, 46, 46, 46,
  /* 17595 */ 46, 957, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 478, 46, 46, 46, 46, 46, 46, 46, 46, 485, 46, 46, 46, 46,
  /* 17621 */ 68, 1266, 68, 1267, 68, 68, 68, 1271, 68, 68, 68, 68, 0, 0, 4535, 0, 0, 0, 0, 633, 0, 0, 0, 639, 489, 46,
  /* 17647 */ 46, 494, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 667, 46, 669, 46, 68, 68, 572, 68, 68, 68, 576,
  /* 17672 */ 68, 68, 581, 68, 68, 68, 68, 68, 68, 68, 731, 68, 68, 735, 68, 68, 68, 739, 68, 46, 46, 46, 673, 46, 46,
  /* 17697 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 681, 46, 46, 46, 68, 68, 68, 68, 922, 68, 68, 68, 0, 0, 0, 925, 0,
  /* 17724 */ 626, 0, 0, 0, 260, 0, 0, 263, 0, 46, 451, 46, 46, 46, 46, 46, 456, 975, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 17750 */ 68, 68, 68, 68, 68, 68, 68, 765, 68, 68, 68, 68, 1069, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 924, 0,
  /* 17776 */ 1021, 46, 46, 1179, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 793, 46, 1204, 46, 46, 46,
  /* 17801 */ 68, 68, 68, 1209, 68, 68, 68, 68, 1213, 68, 68, 68, 68, 68, 68, 610, 68, 68, 68, 68, 68, 615, 68, 68, 68,
  /* 17826 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1200, 46, 1202, 68, 68, 68, 1219, 68, 68, 68, 46, 46, 46, 46, 46,
  /* 17851 */ 1227, 46, 46, 46, 46, 135, 139, 145, 149, 46, 46, 46, 46, 46, 165, 46, 46, 1231, 46, 46, 46, 46, 46, 68,
  /* 17875 */ 68, 68, 68, 68, 1242, 68, 68, 68, 1246, 68, 68, 68, 68, 240, 68, 68, 68, 12306, 12306, 8213, 0, 24, 34842,
  /* 17898 */ 29, 29, 0, 250, 0, 0, 4197, 4197, 0, 14591, 0, 0, 0, 260, 109, 263, 111, 46, 46, 46, 68, 68, 187, 68, 68,
  /* 17923 */ 68, 68, 205, 68, 68, 68, 68, 223, 46, 46, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 367, 68, 68, 68, 68,
  /* 17949 */ 68, 68, 730, 68, 732, 68, 68, 68, 68, 68, 68, 740, 68, 68, 377, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 17974 */ 68, 68, 68, 738, 68, 68, 391, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 794, 68, 410,
  /* 17999 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 426, 68, 68, 68, 68, 68, 68, 746, 68, 68, 68, 68, 750, 68,
  /* 18024 */ 752, 68, 68, 68, 68, 68, 68, 772, 68, 68, 68, 68, 68, 68, 68, 68, 68, 748, 68, 68, 751, 68, 68, 68, 68,
  /* 18049 */ 68, 68, 68, 68, 12306, 0, 0, 251, 0, 0, 0, 4535, 254, 14591, 0, 0, 32803, 0, 0, 0, 0, 0, 0, 0, 0, 44, 44,
  /* 18076 */ 46, 46, 46, 46, 334, 46, 46, 46, 46, 46, 46, 46, 46, 345, 346, 46, 796, 0, 0, 0, 0, 0, 633, 0, 0, 0, 0, 0,
  /* 18104 */ 639, 0, 0, 0, 46, 46, 929, 46, 46, 46, 46, 46, 934, 46, 46, 46, 46, 46, 314, 46, 46, 316, 46, 46, 319, 46,
  /* 18130 */ 46, 46, 46, 46, 46, 1237, 68, 68, 68, 68, 68, 68, 68, 68, 68, 401, 68, 68, 68, 68, 68, 68, 0, 100, 32803,
  /* 18155 */ 0, 0, 4197, 0, 0, 0, 0, 0, 44, 44, 46, 46, 46, 46, 136, 46, 46, 46, 46, 46, 46, 46, 46, 46, 170, 46, 46,
  /* 18182 */ 46, 46, 130, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 693, 46, 46, 46, 46, 46, 178, 68, 68, 68, 68,
  /* 18208 */ 68, 197, 68, 68, 68, 68, 68, 68, 68, 68, 1154, 68, 68, 68, 68, 46, 46, 46, 120, 46, 46, 46, 46, 138, 46,
  /* 18233 */ 46, 46, 46, 156, 158, 46, 46, 169, 46, 46, 46, 68, 179, 68, 68, 68, 68, 68, 68, 208, 68, 68, 68, 68, 0, 0,
  /* 18259 */ 4535, 0, 0, 630, 0, 0, 0, 636, 0, 0, 225, 68, 68, 236, 68, 68, 68, 68, 12306, 12306, 8213, 0, 24, 34842,
  /* 18283 */ 29, 29, 431, 432, 68, 68, 68, 12306, 0, 0, 0, 0, 0, 0, 4535, 254, 14591, 0, 0, 32803, 0, 0, 0, 0, 0, 0,
  /* 18309 */ 542720, 0, 44, 44, 46, 46, 46, 46, 46, 848, 46, 46, 46, 46, 852, 46, 46, 46, 46, 46, 46, 1108, 46, 46, 46,
  /* 18334 */ 46, 46, 46, 46, 46, 46, 967, 46, 46, 970, 46, 46, 973, 46, 974, 68, 68, 68, 541, 68, 68, 68, 68, 68, 68,
  /* 18359 */ 68, 68, 68, 68, 68, 68, 1074, 68, 68, 68, 68, 68, 68, 606, 68, 68, 68, 68, 68, 68, 68, 68, 614, 68, 68,
  /* 18384 */ 68, 68, 0, 251, 4535, 0, 0, 0, 0, 0, 0, 0, 0, 0, 620, 68, 68, 68, 0, 0, 4535, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 18414 */ 46, 928, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 971, 46, 46, 46, 68, 0, 641, 46, 46, 46, 46, 46, 647,
  /* 18440 */ 46, 46, 46, 46, 46, 46, 46, 46, 1031, 46, 46, 46, 46, 46, 46, 46, 46, 671, 46, 46, 46, 46, 46, 46, 677,
  /* 18465 */ 46, 679, 46, 682, 46, 46, 46, 46, 271, 46, 46, 46, 275, 46, 46, 286, 46, 46, 290, 46, 68, 755, 68, 758,
  /* 18489 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 764, 68, 68, 68, 68, 68, 12306, 0, 0, 0, 0, 0, 0, 4535, 254,
  /* 18514 */ 14591, 0, 0, 0, 927, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 535, 46, 68, 68, 68, 68, 68, 68, 770,
  /* 18540 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1300, 68, 46, 46, 46, 879, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 18566 */ 68, 68, 68, 68, 68, 68, 1002, 68, 68, 68, 68, 895, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 789, 68,
  /* 18591 */ 68, 68, 68, 0, 68, 68, 68, 978, 68, 979, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 874, 68, 68, 68, 68, 68,
  /* 18617 */ 68, 68, 68, 1192, 46, 46, 46, 46, 1196, 46, 46, 46, 46, 46, 46, 46, 530, 46, 46, 46, 46, 46, 46, 68, 68,
  /* 18642 */ 46, 46, 1205, 46, 46, 1207, 68, 68, 68, 68, 1211, 68, 68, 68, 68, 68, 68, 68, 1296, 68, 1298, 68, 68, 68,
  /* 18666 */ 1302, 46, 46, 68, 68, 68, 68, 1220, 68, 68, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1165, 46, 46, 46, 46, 46,
  /* 18691 */ 46, 68, 1326, 68, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 46, 46, 1317, 46, 46, 46, 1321, 68, 68,
  /* 18716 */ 1323, 68, 0, 0, 32803, 0, 0, 4197, 0, 0, 0, 0, 0, 44, 44, 46, 46, 115, 46, 46, 46, 68, 182, 68, 68, 68,
  /* 18742 */ 68, 68, 68, 211, 68, 68, 68, 68, 68, 68, 243, 68, 12306, 12306, 8213, 0, 24, 34842, 29, 29, 46, 310, 46,
  /* 18765 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 952, 46, 46, 46, 68, 68, 68, 68, 68, 357, 68, 68, 68,
  /* 18791 */ 361, 68, 68, 372, 68, 68, 68, 68, 68, 12306, 0, 0, 0, 438, 0, 99, 4535, 254, 14591, 0, 0, 798, 0, 0, 0, 0,
  /* 18817 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 260, 0, 0, 263, 0, 46, 46, 46, 46, 46, 46, 46, 46, 338, 46, 46, 46, 46, 46, 46,
  /* 18846 */ 46, 68, 376, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1012, 68, 68, 393, 68, 68, 396, 68,
  /* 18871 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 915, 68, 68, 68, 68, 68, 0, 46, 46, 643, 46, 46, 46, 46, 46, 46,
  /* 18897 */ 46, 46, 46, 46, 46, 46, 706, 46, 46, 46, 46, 46, 46, 685, 686, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 18922 */ 696, 68, 68, 68, 782, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 0, 0, 0, 46, 46, 46, 46, 845, 46, 46,
  /* 18948 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 813, 46, 46, 633, 0, 639, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 18974 */ 46, 46, 46, 46, 827, 46, 46, 68, 68, 68, 68, 994, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 999, 68, 68,
  /* 19000 */ 68, 68, 68, 68, 68, 68, 68, 1151, 68, 68, 68, 68, 68, 68, 68, 68, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68,
  /* 19026 */ 68, 68, 68, 1243, 68, 68, 68, 1157, 46, 46, 46, 1160, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1046,
  /* 19050 */ 1047, 46, 46, 46, 46, 68, 1217, 68, 68, 68, 68, 68, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1260, 46, 46,
  /* 19074 */ 1304, 46, 46, 46, 46, 46, 46, 46, 68, 68, 1310, 68, 1311, 68, 68, 68, 68, 68, 68, 885, 68, 68, 68, 68, 68,
  /* 19099 */ 68, 68, 68, 68, 387, 68, 68, 68, 68, 68, 68, 0, 0, 32803, 0, 0, 4197, 0, 0, 0, 0, 0, 44, 44, 46, 46, 116,
  /* 19126 */ 46, 46, 46, 68, 183, 68, 68, 68, 68, 202, 206, 212, 216, 68, 68, 68, 46, 1328, 46, 46, 46, 46, 68, 1332,
  /* 19150 */ 68, 68, 68, 68, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1288, 46, 68, 68, 232, 68, 68, 68, 68, 68,
  /* 19175 */ 12306, 12306, 8213, 0, 24, 34842, 29, 29, 46, 46, 46, 270, 46, 46, 46, 46, 276, 46, 46, 46, 46, 46, 46,
  /* 19198 */ 46, 688, 46, 46, 46, 46, 46, 694, 46, 46, 46, 46, 46, 297, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 308,
  /* 19223 */ 46, 46, 46, 68, 180, 68, 68, 68, 194, 68, 68, 68, 68, 68, 68, 68, 68, 1085, 68, 68, 68, 68, 68, 68, 68,
  /* 19248 */ 68, 1142, 68, 68, 68, 68, 68, 68, 68, 68, 1007, 68, 68, 68, 68, 68, 68, 68, 68, 1019, 68, 68, 0, 0, 0, 46,
  /* 19274 */ 46, 46, 46, 312, 46, 46, 46, 46, 46, 46, 46, 318, 46, 46, 46, 325, 327, 349, 46, 351, 68, 68, 68, 356, 68,
  /* 19299 */ 68, 68, 68, 362, 68, 68, 68, 68, 68, 68, 244, 68, 12306, 12306, 8213, 0, 24, 34842, 29, 29, 68, 394, 68,
  /* 19322 */ 68, 68, 398, 68, 68, 68, 68, 68, 68, 68, 404, 68, 68, 68, 68, 68, 68, 897, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 19348 */ 68, 1086, 1087, 68, 68, 68, 68, 68, 68, 411, 413, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 763,
  /* 19373 */ 68, 68, 68, 68, 68, 435, 68, 12306, 0, 0, 0, 0, 0, 0, 4535, 254, 14591, 0, 0, 32803, 0, 0, 0, 0, 0, 0,
  /* 19399 */ 542720, 0, 563200, 563200, 540672, 540672, 540672, 917504, 540672, 923648, 540672, 540672, 540672, 989184,
  /* 19413 */ 561152, 628736, 632832, 561152, 657408, 561152, 561152, 561152, 561152, 561152, 12306, 0, 0, 0, 0, 0, 0,
  /* 19430 */ 0, 440, 0, 0, 46, 46, 460, 46, 46, 46, 46, 466, 46, 46, 46, 46, 46, 46, 46, 46, 1174, 68, 68, 68, 68, 68,
  /* 19456 */ 68, 68, 46, 46, 477, 46, 46, 46, 46, 481, 46, 46, 46, 46, 46, 46, 46, 46, 702, 703, 46, 46, 46, 46, 46,
  /* 19481 */ 46, 46, 274, 46, 46, 46, 46, 46, 46, 289, 46, 46, 46, 492, 46, 46, 496, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 19506 */ 46, 46, 716, 717, 68, 68, 68, 68, 68, 723, 68, 68, 68, 68, 68, 608, 609, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 19531 */ 68, 68, 1073, 68, 68, 68, 68, 68, 655, 46, 46, 659, 46, 46, 46, 663, 46, 46, 46, 46, 46, 46, 46, 46, 810,
  /* 19556 */ 46, 46, 46, 46, 46, 46, 46, 46, 514, 46, 46, 46, 519, 46, 46, 46, 46, 46, 672, 46, 46, 675, 46, 46, 46,
  /* 19581 */ 46, 46, 46, 46, 46, 46, 46, 834, 46, 46, 46, 46, 46, 46, 840, 46, 68, 780, 68, 68, 68, 68, 785, 68, 68,
  /* 19606 */ 68, 68, 68, 68, 68, 68, 0, 0, 0, 0, 0, 0, 926, 0, 0, 797, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 252,
  /* 19637 */ 4197, 4197, 0, 14591, 0, 0, 0, 260, 109, 263, 111, 46, 46, 46, 805, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 19661 */ 812, 46, 46, 46, 46, 298, 300, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 825, 46, 46, 46, 46, 46, 46, 830,
  /* 19686 */ 46, 46, 832, 46, 833, 46, 46, 46, 46, 46, 46, 46, 46, 46, 850, 46, 46, 46, 46, 46, 46, 46, 46, 689, 46,
  /* 19711 */ 46, 46, 46, 46, 46, 46, 843, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 854, 46, 46, 46, 46, 1040,
  /* 19736 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 692, 46, 46, 46, 46, 892, 68, 893, 68, 68, 68, 68, 68, 68, 68,
  /* 19762 */ 68, 68, 903, 68, 68, 68, 68, 68, 68, 383, 68, 68, 68, 68, 68, 68, 68, 68, 68, 760, 68, 68, 68, 68, 68, 68,
  /* 19788 */ 46, 46, 46, 943, 46, 46, 46, 946, 46, 46, 46, 46, 46, 46, 46, 46, 861, 46, 46, 46, 46, 68, 68, 68, 68, 68,
  /* 19814 */ 68, 68, 68, 68, 1273, 68, 68, 68, 68, 68, 993, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1299, 68,
  /* 19839 */ 68, 46, 46, 1303, 46, 1025, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1126, 46, 1037, 46,
  /* 19863 */ 46, 46, 46, 46, 46, 46, 46, 1045, 46, 46, 46, 46, 46, 46, 701, 46, 46, 46, 704, 46, 46, 46, 46, 709, 1065,
  /* 19888 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1077, 68, 68, 68, 1150, 68, 1152, 68, 68, 68, 68,
  /* 19913 */ 68, 68, 68, 46, 46, 46, 46, 46, 1256, 46, 46, 46, 46, 46, 46, 46, 1158, 46, 46, 46, 1162, 46, 46, 46, 46,
  /* 19938 */ 46, 46, 46, 46, 46, 1057, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 68, 1133, 1134, 68, 68, 68, 1180,
  /* 19962 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1189, 68, 68, 68, 1293, 68, 68, 68, 68, 68, 68, 68,
  /* 19987 */ 68, 1301, 46, 46, 46, 46, 333, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1034, 46, 46, 46, 68, 68,
  /* 20012 */ 1314, 1315, 68, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1214, 68, 68, 68, 68, 237,
  /* 20037 */ 68, 68, 68, 68, 12306, 12306, 8213, 0, 24, 34842, 29, 29, 46, 350, 68, 68, 68, 68, 68, 68, 68, 359, 68,
  /* 20060 */ 68, 68, 368, 68, 68, 68, 68, 68, 68, 1097, 68, 68, 68, 68, 68, 0, 46, 46, 46, 644, 46, 46, 46, 46, 46, 46,
  /* 20086 */ 46, 46, 46, 46, 46, 838, 46, 46, 46, 841, 68, 68, 68, 68, 436, 12306, 0, 0, 0, 0, 0, 0, 4535, 254, 14591,
  /* 20111 */ 0, 0, 32803, 0, 0, 0, 0, 0, 0, 542720, 0, 563200, 563309, 540672, 540783, 540672, 68, 68, 68, 68, 574, 68,
  /* 20133 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 586, 640, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46,
  /* 20159 */ 1035, 68, 868, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1075, 68, 68, 68, 977, 68, 68, 68,
  /* 20184 */ 68, 68, 68, 984, 68, 986, 68, 68, 68, 68, 68, 68, 382, 68, 68, 68, 68, 68, 68, 68, 390, 68, 68, 68, 68,
  /* 20209 */ 68, 1183, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 873, 68, 68, 876, 877, 68, 68, 46, 46, 46, 131, 46,
  /* 20234 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 839, 46, 46, 46, 68, 412, 68, 68, 68, 68, 68, 68, 68, 68, 68,
  /* 20260 */ 68, 68, 68, 68, 68, 1090, 68, 68, 68, 233, 68, 68, 68, 68, 68, 12306, 12306, 8213, 0, 24, 34842, 29, 29,
  /* 20283 */ 0, 46, 642, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 1114, 46, 46, 829, 46, 46, 46, 46, 46, 46,
  /* 20309 */ 46, 46, 46, 46, 46, 46, 46, 46, 46, 1050, 46, 857, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 68, 68, 68, 68,
  /* 20335 */ 68, 68, 68, 68, 46, 46, 46, 132, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 950, 951, 46, 46, 248, 0,
  /* 20361 */ 0, 0, 4197, 4197, 0, 14591, 0, 0, 0, 260, 109, 263, 111, 46, 46, 46, 68, 181, 68, 68, 68, 196, 68, 68,
  /* 20385 */ 210, 68, 68, 68, 221, 46, 311, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 960, 46, 46, 46,
  /* 20410 */ 68, 68, 68, 68, 397, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 914, 68, 68, 68, 68, 68, 68, 754, 68, 68,
  /* 20436 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 1013, 68, 68, 68, 238, 68, 68, 68, 68, 12306, 12306,
  /* 20460 */ 8213, 0, 24, 34842, 29, 29, 68, 68, 589, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 777, 68, 68,
  /* 20485 */ 68, 68, 68, 743, 68, 745, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 983, 68, 68, 987, 68, 68, 68, 46, 46,
  /* 20510 */ 46, 1027, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 972, 46, 46, 68, 68, 68, 1067, 68, 68, 68, 68,
  /* 20535 */ 68, 68, 68, 68, 68, 68, 68, 68, 68, 904, 68, 68
];

XQueryTokenizer.EXPECTED =
[
  /*    0 */ 169, 178, 189, 194, 187, 181, 183, 188, 220, 174, 188, 193, 198, 172, 202, 208, 204, 219, 212, 216, 224,
  /*   21 */ 228, 232, 504, 257, 236, 238, 618, 242, 248, 258, 256, 262, 557, 331, 337, 268, 272, 486, 281, 285, 289,
  /*   42 */ 412, 298, 303, 308, 483, 304, 257, 409, 387, 257, 394, 400, 309, 244, 381, 406, 313, 363, 317, 321, 325,
  /*   63 */ 456, 555, 329, 335, 516, 257, 341, 476, 343, 347, 510, 417, 257, 352, 356, 360, 292, 367, 640, 371, 375,
  /*   84 */ 379, 385, 251, 391, 434, 416, 421, 633, 257, 427, 445, 494, 433, 438, 444, 449, 605, 453, 460, 464, 468,
  /*  105 */ 474, 480, 575, 548, 257, 499, 563, 257, 493, 498, 294, 503, 508, 514, 520, 526, 569, 530, 534, 538, 542,
  /*  126 */ 546, 552, 623, 628, 257, 608, 264, 257, 561, 429, 257, 567, 275, 277, 403, 573, 579, 489, 583, 587, 591,
  /*  147 */ 595, 602, 257, 617, 622, 522, 299, 627, 613, 348, 632, 397, 423, 440, 470, 637, 644, 598, 611, 257, 257,
  /*  168 */ 254, 648, 652, 656, 671, 672, 661, 661, 662, 693, 660, 723, 667, 671, 708, 661, 661, 661, 689, 680, 671,
  /*  189 */ 671, 671, 671, 697, 682, 661, 661, 661, 676, 661, 702, 670, 671, 661, 663, 671, 671, 716, 661, 714, 661,
  /*  210 */ 661, 685, 707, 716, 706, 696, 712, 684, 707, 698, 671, 683, 661, 661, 715, 720, 727, 731, 735, 739, 749,
  /*  231 */ 753, 759, 824, 1048, 770, 1242, 774, 823, 823, 786, 823, 790, 1059, 823, 823, 796, 902, 823, 1185, 794,
  /*  251 */ 823, 745, 1096, 823, 755, 806, 823, 823, 823, 823, 800, 1184, 807, 823, 823, 802, 1239, 823, 1138, 823,
  /*  271 */ 1214, 1138, 823, 1136, 823, 766, 823, 823, 1261, 823, 1147, 834, 1146, 1221, 834, 828, 1147, 829, 833, 755,
  /*  291 */ 838, 823, 782, 823, 823, 823, 1373, 978, 823, 823, 823, 843, 855, 823, 823, 823, 876, 861, 823, 823, 823,
  /*  312 */ 901, 1054, 1058, 823, 1056, 1235, 922, 926, 1092, 937, 930, 934, 1090, 1345, 1346, 941, 950, 968, 966, 823,
  /*  332 */ 823, 812, 823, 864, 972, 823, 823, 816, 823, 990, 994, 823, 823, 823, 1297, 1003, 823, 823, 823, 962, 1018,
  /*  353 */ 823, 823, 1060, 1019, 823, 823, 1257, 1024, 823, 781, 823, 892, 823, 920, 1029, 823, 1034, 1084, 1046,
  /*  372 */ 1040, 1052, 1047, 1064, 1065, 1072, 1069, 823, 1076, 823, 823, 844, 906, 1088, 1283, 823, 823, 857, 889,
  /*  391 */ 823, 1379, 1101, 823, 896, 863, 823, 871, 1357, 823, 880, 897, 823, 880, 1262, 823, 881, 913, 823, 885,
  /*  411 */ 879, 823, 842, 823, 848, 1107, 823, 823, 823, 1014, 823, 1113, 823, 823, 872, 823, 1157, 1117, 823, 823,
  /*  431 */ 909, 1250, 1124, 823, 823, 823, 1119, 1367, 1118, 823, 823, 985, 1372, 1368, 823, 823, 823, 1123, 1128,
  /*  450 */ 823, 823, 976, 975, 823, 1338, 823, 954, 823, 1172, 1134, 1316, 1351, 1351, 1291, 1316, 1332, 1292, 1144,
  /*  469 */ 1020, 823, 823, 986, 823, 823, 1042, 823, 823, 999, 984, 946, 1358, 1151, 823, 956, 868, 823, 822, 1252,
  /*  489 */ 823, 778, 823, 1280, 1168, 823, 823, 823, 1152, 823, 1103, 1156, 823, 823, 1170, 823, 823, 823, 1164, 1374,
  /*  509 */ 1171, 823, 823, 1013, 823, 823, 1176, 823, 823, 1030, 982, 823, 1177, 823, 823, 1036, 1350, 1303, 1059,
  /*  528 */ 823, 1130, 1384, 1183, 1009, 1059, 762, 1321, 823, 1083, 1189, 1201, 1326, 1190, 1081, 1082, 1194, 1198,
  /*  546 */ 1205, 1209, 823, 823, 1109, 1151, 1097, 1213, 1219, 823, 960, 823, 823, 811, 823, 823, 1246, 823, 823,
  /*  565 */ 1161, 823, 765, 1256, 823, 823, 1181, 823, 823, 1266, 823, 823, 1269, 823, 1273, 823, 776, 780, 843, 1296,
  /*  585 */ 1301, 1286, 1079, 1289, 1307, 1314, 1308, 1309, 1310, 742, 1320, 823, 1325, 823, 985, 1008, 1140, 823,
  /*  603 */ 1330, 851, 823, 995, 977, 823, 916, 1233, 823, 944, 823, 823, 1362, 823, 1336, 823, 823, 823, 1215, 1342,
  /*  623 */ 823, 823, 823, 1225, 1355, 823, 823, 823, 1229, 1366, 823, 823, 823, 1276, 823, 1025, 1378, 823, 1040,
  /*  642 */ 1065, 1065, 818, 1383, 823, 1006, 1403, 1388, 1392, 1401, 1405, 1409, 1424, 1428, 1441, 2073, 1450, 1453,
  /*  660 */ 1455, 1461, 1461, 1461, 1461, 1462, 1550, 1481, 1486, 1495, 2077, 1454, 1454, 1454, 1454, 1455, 1461, 1499,
  /*  678 */ 1482, 1510, 1513, 2076, 1454, 1454, 1454, 1461, 1461, 1461, 1551, 1461, 1502, 1525, 2077, 1505, 1526, 2076,
  /*  696 */ 1454, 1456, 1461, 1461, 1461, 1537, 1461, 1461, 1504, 1506, 1461, 1531, 1454, 1454, 1454, 1456, 1461, 1537,
  /*  714 */ 1454, 1454, 1454, 1530, 1461, 1461, 1461, 1537, 1454, 1461, 1461, 1466, 1473, 1531, 1454, 1530, 1531, 1455,
  /*  732 */ 1531, 1457, 1535, 1541, 1952, 1548, 1555, 1558, 1953, 1397, 1517, 1419, 1417, 1517, 1517, 1938, 1842, 1568,
  /*  750 */ 1517, 1517, 1574, 1826, 1582, 1517, 1517, 1415, 1819, 1517, 1825, 1581, 1517, 1517, 2002, 1517, 1517, 2034,
  /*  768 */ 2058, 1990, 1751, 1600, 1476, 1617, 2102, 1611, 1517, 1517, 1517, 2014, 2011, 1517, 1517, 1517, 1814, 1517,
  /*  786 */ 1752, 2100, 2104, 1616, 1517, 1753, 2102, 1880, 2103, 1881, 1517, 1517, 1517, 2024, 1517, 1808, 1517, 1517,
  /*  804 */ 1517, 2033, 1750, 1754, 2103, 1615, 1517, 1809, 2096, 2101, 1633, 1517, 1623, 1631, 1517, 1517, 1517, 2086,
  /*  822 */ 1708, 1517, 1517, 1517, 1517, 1395, 1517, 1819, 1806, 1517, 1517, 1805, 1517, 1517, 1805, 1517, 1517, 1820,
  /*  840 */ 1517, 1415, 1544, 1517, 1517, 1517, 1518, 1886, 1517, 1868, 1638, 1517, 1517, 2039, 1858, 1642, 1647, 1517,
  /*  858 */ 1517, 1518, 2026, 1868, 1643, 1648, 1517, 1517, 1517, 1521, 1654, 1435, 1648, 1517, 1518, 1562, 2065, 1858,
  /*  876 */ 2052, 1652, 1433, 1672, 1517, 1517, 1517, 1519, 1887, 1517, 2025, 2056, 1655, 2057, 1656, 1673, 1517, 1518,
  /*  894 */ 1688, 1701, 1519, 1662, 2057, 1656, 1648, 2024, 1663, 1431, 1658, 1517, 1664, 1669, 1680, 1517, 1518, 2035,
  /*  912 */ 1491, 1665, 1657, 1617, 1517, 1518, 2035, 1732, 1576, 1903, 1702, 1517, 1517, 1687, 1700, 1694, 1517, 1416,
  /*  930 */ 1692, 1517, 1517, 1689, 1693, 1517, 1746, 1691, 1517, 1517, 1902, 1746, 1516, 1514, 1517, 1559, 1517, 1517,
  /*  948 */ 1908, 1517, 1516, 1515, 1515, 1723, 1517, 1727, 1517, 1517, 1518, 2054, 1740, 1745, 1517, 1517, 1520, 1564,
  /*  966 */ 1763, 1768, 1517, 1517, 1520, 1758, 1759, 1764, 1769, 1517, 1559, 1892, 1517, 1517, 1517, 1637, 1783, 1789,
  /*  984 */ 1773, 1517, 1517, 1517, 1560, 2070, 1518, 1781, 1787, 1791, 1775, 1517, 1517, 1517, 1559, 1517, 1807, 1782,
  /* 1002 */ 1796, 1783, 1790, 1774, 1517, 1560, 2088, 1517, 1517, 1517, 2001, 1517, 1833, 1795, 1800, 1517, 1420, 1814,
  /* 1020 */ 1867, 1517, 1517, 1867, 1818, 1517, 1517, 1517, 1561, 1814, 1517, 1517, 1517, 1577, 1776, 1824, 1517, 1517,
  /* 1038 */ 1520, 2064, 1517, 1747, 1517, 1517, 1570, 1899, 1517, 1746, 1517, 1517, 1517, 1587, 1517, 1748, 1517, 1517,
  /* 1056 */ 1576, 1412, 1677, 1617, 1517, 1517, 1517, 1420, 1749, 1517, 1517, 1749, 1517, 1517, 1749, 1748, 1748, 1517,
  /* 1074 */ 1749, 1747, 1517, 1895, 1830, 1517, 1590, 1517, 1517, 1862, 1517, 1517, 1517, 1777, 1696, 1838, 1517, 1517,
  /* 1092 */ 1690, 1694, 1517, 1901, 1847, 1517, 1517, 1517, 1607, 1843, 1848, 1517, 1517, 1715, 1719, 1854, 1446, 1517,
  /* 1110 */ 1517, 1715, 1913, 1517, 1852, 1444, 1894, 1873, 1627, 1517, 1517, 1517, 1619, 1682, 1877, 1894, 1517, 1517,
  /* 1128 */ 1517, 1891, 1517, 1517, 1730, 1986, 1807, 1893, 1517, 1517, 1754, 1632, 1517, 1517, 1517, 2094, 1517, 1867,
  /* 1146 */ 1517, 1517, 1803, 1517, 1517, 1918, 1517, 1517, 1517, 1682, 1929, 1517, 1517, 1517, 1683, 1717, 1927, 1931,
  /* 1164 */ 1517, 1597, 1601, 1477, 1618, 1718, 1928, 1932, 1517, 1517, 1517, 1741, 1517, 2090, 1926, 1930, 1517, 1517,
  /* 1182 */ 1983, 1936, 1517, 1517, 1517, 1750, 1754, 1862, 1517, 1517, 1859, 1863, 1862, 1517, 1862, 1859, 1863, 1861,
  /* 1200 */ 1859, 1863, 1517, 1517, 1860, 1862, 1943, 1945, 1946, 1950, 1517, 1517, 1469, 1958, 1517, 1517, 1517, 1807,
  /* 1218 */ 1517, 1518, 1957, 1517, 1517, 1804, 1517, 1962, 1967, 1975, 1932, 1518, 1963, 1968, 1976, 1736, 1931, 1517,
  /* 1236 */ 1517, 1807, 1903, 1489, 1734, 1437, 1517, 1605, 1750, 2098, 2034, 1490, 1972, 1980, 1735, 1931, 1517, 1517,
  /* 1254 */ 1819, 1709, 1990, 1517, 1517, 1517, 1813, 1519, 1994, 1998, 1517, 1517, 1517, 2006, 1616, 1517, 1618, 1912,
  /* 1272 */ 1917, 1518, 2007, 1617, 1517, 1682, 1872, 1626, 1517, 2015, 1617, 1517, 1695, 1837, 1517, 1590, 1617, 1517,
  /* 1290 */ 1591, 1517, 1517, 1864, 1517, 1517, 2016, 1517, 1517, 1517, 1832, 1518, 2017, 1517, 1517, 1819, 1985, 1518,
  /* 1308 */ 1592, 1517, 1517, 2021, 1517, 1418, 1589, 1593, 1517, 1517, 1865, 1517, 1419, 1517, 1517, 1517, 1860, 2030,
  /* 1326 */ 1517, 1517, 1517, 1861, 1517, 2040, 1517, 1517, 1866, 1517, 2044, 2049, 1517, 1517, 1892, 1517, 1583, 2045,
  /* 1344 */ 1857, 1517, 1706, 1694, 1517, 1713, 1856, 1517, 1517, 1517, 1867, 2062, 2066, 1858, 1517, 1517, 1517, 1907,
  /* 1362 */ 1519, 1563, 2066, 1858, 1855, 1517, 1517, 1517, 1885, 1627, 2070, 1517, 1517, 1517, 1922, 1928, 2081, 1517,
  /* 1380 */ 1517, 1517, 1939, 2082, 1517, 1517, 1517, 1983, 34078720, 8388616, 8978448, 282066944, 27285504, 77637632,
  /* 1394 */ 1033111362, 128, 0, 1, 0, 0, 32, 524416, 1179648, 4, 33554432, 134217728, 32, 32, 524288, 8, 8, 524304, 16,
  /* 1413 */ 256, 1024, 4096, 0, 0, 0, 16, 0, 0, 0, 32, 16, 65552, 65552, 5242880, 4194304, 272629760, 4194304, 16384,
  /* 1432 */ 32768, 65536, 917504, 16777216, 100663296, 134217728, 268435456, 536870912, -1073741824, 4096, 2099200,
  /* 1443 */ 32768, 8192, 65536, 262144, 29360128, 201326592, 0, 1536, 1792, 0, 262208, 128, 128, 128, 128, 131072,
  /* 1459 */ 131072, 128, 131072, 131072, 131072, 131072, 2, 32, 32, 8, 0, -60493571, -60493571, -60493571, 16, 65552,
  /* 1475 */ 4194304, 4194304, 8388608, 16777216, 1006632960, 0x80000000, 2097152, 2048, 2048, 2048, 2048, 2, 2,
  /* 1488 */ 536870912, 64, 128, 4096, 8192, 16384, 32768, 1536, 1024, 0, 262208, 131072, 32, 2097152, 2097152, 2048, 2,
  /* 1505 */ 2, 2, 2, 0, 64, 2, 2, 64, 1024, 0, 0, 262144, 0, 0, 0, 0, 1, 4, 8, 224, 0, 64, 64, 64, 64, 128, 131072,
  /* 1532 */ 131072, 131072, 128, 131072, 128, 131072, 128, 128, 128, 131072, 128, 131072, 0, -15736931, -15736931,
  /* 1547 */ -15736931, 1, 32, 2, 0, 128, 128, 128, 0, 28, -1107411712, -1107411712, 0, 0, 0, 4, 8, 64, 128, 256, 512,
  /* 1568 */ 0, 2, 0, 0, -188662010, -188662010, 0, 28, 0, 0, 1, 8, 32, 31457280, -1140850688, 0, 0, 0, 5, 0, 12, 0, 0,
  /* 1591 */ 1, 16, 32, 0, 0, 0, 0, 256, 1024, 14336, 393216, 1572864, 2097152, 4194304, 4, 8, 0, 0, 1, 2420988,
  /* 1611 */ 16777216, 469762048, 536870912, 0x80000000, 268435456, 536870912, 0x80000000, 0, 0, 0, 6, 56, 8, 1024,
  /* 1625 */ 6144, 262144, 8388608, 16777216, 201326592, 0, 1048576, 2097152, 8388608, 268435456, 0, 0, 3997, 118476800,
  /* 1639 */ -134217728, 0, 0, 3997, 1036288, 16777216, 100663296, 402653184, 402653184, 1610612736, 0x80000000, 0, 0,
  /* 1652 */ 1536, 2048, 20480, 32768, 65536, 917504, 100663296, 134217728, 1073741824, 0x80000000, 24, 128, 256, 1024,
  /* 1666 */ 4096, 16384, 32768, 32768, 917504, 100663296, 134217728, 268435456, 1610612736, 0x80000000, 0, 393216,
  /* 1678 */ 524288, 100663296, 1073741824, 0x80000000, 0, 0, 2, 4, 24, 0, 8, 16, 1024, 4096, 262144, 67108864,
  /* 1694 */ 1073741824, 0, 0, 0, 254, 1404928, 4096, 393216, 524288, 67108864, 1073741824, 0, 0, 1024, 4096, 262144,
  /* 1710 */ 1048576, 8388608, 0, 1024, 262144, 0, 0, 6, 256, 512, 14336, 65536, 12582912, 0, 262144, 0, 262144,
  /* 1727 */ 1062768621, 1062768621, 1062768621, 0, 0, 4096, 8192, 49152, 262144, 2097152, 4194304, 134217728,
  /* 1739 */ 268435456, 0, 237, 560896, 22020096, 1040187392, 1040187392, 0, 0, 0, 1024, 0, 0, 0, 256, 1024, 6144,
  /* 1756 */ 262144, 1048576, 224, 256, 3584, 32768, 524288, 524288, 1048576, 4194304, 16777216, 33554432, 33554432,
  /* 1769 */ 67108864, 134217728, 805306368, 0, 33554432, 134217728, 536870912, 0, 0, 0, 1536, 32768, 8, 32, 64, 128,
  /* 1785 */ 256, 1536, 256, 1536, 2048, 32768, 524288, 4194304, 33554432, 134217728, 256, 1536, 32768, 524288, 4194304,
  /* 1800 */ 4194304, 134217728, 536870912, 0, 0, 4096, 8388608, 0, 0, 0, 8, 0, 0, 0, 128, 1536, 32768, 524288, 524288,
  /* 1819 */ 0, 0, 0, 4096, 0, 32768, 0, 0, 0, 1981696, 31457280, 500527358, 500527358, 0, 0, 8, 32, 128, 1404928,
  /* 1838 */ 29360128, 469762048, 0, 0, 128, 12288, 81920, 262144, 1048576, 1048576, 29360128, 201326592, 268435456, 0,
  /* 1852 */ 6, 56, 128, 4096, 8192, 65536, 1048576, 0, 0, 0, 8388608, 67108864, 0, 0, 0, 134217728, 0, 0, 0, 3997, 24,
  /* 1873 */ 32, 128, 4096, 262144, 8, 16, 8388608, 16777216, 67108864, 402653184, 536870912, 0x80000000, 2, 4, 8, 16,
  /* 1889 */ 128, 256, 4, 8, 16, 201326592, 0, 0, 0, 500527358, -188662010, 0, 0, 0, 16, 1024, 4096, 393216, 0, 6,
  /* 1909 */ 16128, 79757312, -268435456, 256, 512, 15360, 65536, 79691776, 79691776, -268435456, 0, 0, 0, 4, 512,
  /* 1924 */ 14336, 65536, 8192, 65536, 12582912, 67108864, 268435456, 536870912, -1073741824, 0, 0, 0, 67108864,
  /* 1937 */ 0x80000000, 0, 0, 62, 64, 128, 8388608, 67108864, 0, 67108864, 67108864, 67108864, 67108864, 67108864,
  /* 1951 */ 67108864, 0, 0, 128, 0, 0, 2420988, -62914560, 0, 0, 0, 1, 4, 120, 128, 4096, 4096, 8192, 311296, 2097152,
  /* 1971 */ 4194304, 32768, 262144, 2097152, 4194304, 67108864, 402653184, 536870912, -1073741824, 134217728,
  /* 1981 */ 536870912, -1073741824, 0, 0, 8192, 12582912, 67108864, 536870912, 0x80000000, 2097152, 134217728,
  /* 1992 */ 536870912, 0x80000000, 56, 4096, 16384, 262144, 2097152, 536870912, 0x80000000, 0, 0, 12582912, 67108864,
  /* 2005 */ 0x80000000, 1, 4, 48, 4096, 536870912, 32, 536870912, 0x80000000, 0, 1, 4, 16, 32, 0x80000000, 0, 0, 16,
  /* 2023 */ 32, 0, 1, 4, 24, 384, 1536, 1127373, 1127373, 1127373, 0, 1, 4, 56, 64, 128, 0, 13, 960, 77824, 1048576, 5,
  /* 2045 */ 8, 448, 512, 12288, 12288, 65536, 1048576, 0, 1, 4, 408, 1536, 2048, 4096, 16384, 32768, 262144, 4, 8, 192,
  /* 2065 */ 256, 512, 4096, 8192, 65536, 64, 256, 512, 1048576, 2, 939524096, 64, 64, 128, 128, 128, 256, 512, 0, 0, 0,
  /* 2086 */ 4, 8, 64, 256, 0, 0, 512, 4096, 4, 0, 0, 0, 1024, 6144, 8192, 262144, 1048576, 2097152, 4194304, 8388608,
  /* 2106 */ 16777216, 469762048
];

XQueryTokenizer.TOKEN =
[
  "(0)",
  "Variable",
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
  "':)'",
  "'<!--'",
  "'<![CDATA['",
  "'<?'",
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
  "'zero-digit'"
];

                                                            // line 481 "XQueryTokenizer.ebnf"
                                                            });
                                                            // line 2891 "XQueryTokenizer.js"
// End
