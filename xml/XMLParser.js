// This file was generated on Tue Mar 12, 2013 04:08 (UTC+01) by REx v5.24 which is Copyright (c) 1979-2013 by Gunther Rademacher <grd@gmx.net>
// REx command line: XML.ebnf -tree -javascript -a xqlint

                                                            // line 2 "XML.ebnf"
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
                                                            var XMLParser = exports.XMLParser = function XMLParser(string, parsingEventHandler)
                                                            {
                                                              init(string, parsingEventHandler);
                                                            // line 40 "XML.js"
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
    l2 = 0;
    l3 = 0;
    end = e;
    eventHandler.reset(input);
  }

  this.getOffendingToken = function(e)
  {
    var o = e.getOffending();
    return o >= 0 ? XML.TOKEN[o] : null;
  };

  this.getExpectedTokenSet = function(e)
  {
    var expected;
    if (e.getExpected() < 0)
    {
      expected = XML.getTokenSet(- e.getState());
    }
    else
    {
      expected = [XML.TOKEN[e.getExpected()]];
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
         + (size == 0 || found != null ? "" : "after successfully scanning " + size + " characters beginning ")
         + "at line " + line + ", column " + column + ":\n..."
         + input.substring(e.getBegin(), Math.min(input.length, e.getBegin() + 64))
         + "...";
  };

  this.parse_document = function()
  {
    eventHandler.startNonterminal("document", e0);
    parse_prolog();
    parse_element();
    for (;;)
    {
      lookahead1(56);               // EOF | S | Comment | PI
      if (l1 == 1)                  // EOF
      {
        break;
      }
      parse_Misc();
    }
    shift(1);                       // EOF
    eventHandler.endNonterminal("document", e0);
  };

  function parse_prolog()
  {
    eventHandler.startNonterminal("prolog", e0);
    lookahead1(66);                 // S | Comment | PI | '<' | '<!DOCTYPE' | '<?xml'
    if (l1 == 40)                   // '<?xml'
    {
      parse_XMLDecl();
    }
    for (;;)
    {
      lookahead1(64);               // S | Comment | PI | '<' | '<!DOCTYPE'
      if (l1 == 33                  // '<'
       || l1 == 35)                 // '<!DOCTYPE'
      {
        break;
      }
      parse_Misc();
    }
    if (l1 == 35)                   // '<!DOCTYPE'
    {
      parse_doctypedecl();
      for (;;)
      {
        lookahead1(59);             // S | Comment | PI | '<'
        if (l1 == 33)               // '<'
        {
          break;
        }
        parse_Misc();
      }
    }
    eventHandler.endNonterminal("prolog", e0);
  }

  function parse_XMLDecl()
  {
    eventHandler.startNonterminal("XMLDecl", e0);
    shift(40);                      // '<?xml'
    parse_VersionInfo();
    lookahead1(28);                 // S | '?>'
    switch (l1)
    {
    case 2:                         // S
      lookahead2(55);               // '?>' | 'encoding' | 'standalone'
      break;
    default:
      lk = l1;
    }
    if (lk == 7810)                 // S 'encoding'
    {
      parse_EncodingDecl();
    }
    lookahead1(28);                 // S | '?>'
    switch (l1)
    {
    case 2:                         // S
      lookahead2(40);               // '?>' | 'standalone'
      break;
    default:
      lk = l1;
    }
    if (lk == 8066)                 // S 'standalone'
    {
      parse_SDDecl();
    }
    lookahead1(28);                 // S | '?>'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(17);                 // '?>'
    shift(44);                      // '?>'
    eventHandler.endNonterminal("XMLDecl", e0);
  }

  function parse_VersionInfo()
  {
    eventHandler.startNonterminal("VersionInfo", e0);
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(21);                 // 'version'
    shift(64);                      // 'version'
    parse_Eq();
    lookahead1(33);                 // '"' | "'"
    switch (l1)
    {
    case 24:                        // "'"
      shift(24);                    // "'"
      lookahead1(6);                // VersionNum
      shift(13);                    // VersionNum
      lookahead1(11);               // "'"
      shift(24);                    // "'"
      break;
    default:
      shift(17);                    // '"'
      lookahead1(6);                // VersionNum
      shift(13);                    // VersionNum
      lookahead1(8);                // '"'
      shift(17);                    // '"'
    }
    eventHandler.endNonterminal("VersionInfo", e0);
  }

  function parse_Eq()
  {
    eventHandler.startNonterminal("Eq", e0);
    lookahead1(26);                 // S | '='
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(15);                 // '='
    shift(41);                      // '='
    lookahead1(58);                 // S | AttValue | '"' | "'"
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    eventHandler.endNonterminal("Eq", e0);
  }

  function parse_Misc()
  {
    eventHandler.startNonterminal("Misc", e0);
    switch (l1)
    {
    case 10:                        // Comment
      shift(10);                    // Comment
      break;
    case 11:                        // PI
      shift(11);                    // PI
      break;
    default:
      shift(2);                     // S
    }
    eventHandler.endNonterminal("Misc", e0);
  }

  function parse_doctypedecl()
  {
    eventHandler.startNonterminal("doctypedecl", e0);
    shift(35);                      // '<!DOCTYPE'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(1);                  // Name
    shift(3);                       // Name
    lookahead1(48);                 // S | '>' | '['
    switch (l1)
    {
    case 2:                         // S
      lookahead2(63);               // '>' | 'PUBLIC' | 'SYSTEM' | '['
      break;
    default:
      lk = l1;
    }
    if (lk == 7298                  // S 'PUBLIC'
     || lk == 7426)                 // S 'SYSTEM'
    {
      shift(2);                     // S
      parse_ExternalID();
    }
    lookahead1(48);                 // S | '>' | '['
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(39);                 // '>' | '['
    if (l1 == 59)                   // '['
    {
      shift(59);                    // '['
      parse_intSubset();
      shift(60);                    // ']'
      lookahead1(27);               // S | '>'
      if (l1 == 2)                  // S
      {
        shift(2);                   // S
      }
    }
    lookahead1(16);                 // '>'
    shift(42);                      // '>'
    eventHandler.endNonterminal("doctypedecl", e0);
  }

  function parse_DeclSep()
  {
    eventHandler.startNonterminal("DeclSep", e0);
    switch (l1)
    {
    case 15:                        // PEReference
      shift(15);                    // PEReference
      break;
    default:
      shift(2);                     // S
    }
    eventHandler.endNonterminal("DeclSep", e0);
  }

  function parse_intSubset()
  {
    eventHandler.startNonterminal("intSubset", e0);
    for (;;)
    {
      lookahead1(70);               // S | Comment | PI | PEReference | '<!ATTLIST' | '<!ELEMENT' | '<!ENTITY' |
                                    // '<!NOTATION' | ']'
      if (l1 == 60)                 // ']'
      {
        break;
      }
      switch (l1)
      {
      case 2:                       // S
      case 15:                      // PEReference
        parse_DeclSep();
        break;
      default:
        parse_markupdecl();
      }
    }
    eventHandler.endNonterminal("intSubset", e0);
  }

  function parse_markupdecl()
  {
    eventHandler.startNonterminal("markupdecl", e0);
    switch (l1)
    {
    case 36:                        // '<!ELEMENT'
      parse_elementdecl();
      break;
    case 34:                        // '<!ATTLIST'
      parse_AttlistDecl();
      break;
    case 37:                        // '<!ENTITY'
      parse_EntityDecl();
      break;
    case 38:                        // '<!NOTATION'
      parse_NotationDecl();
      break;
    case 11:                        // PI
      shift(11);                    // PI
      break;
    default:
      shift(10);                    // Comment
    }
    eventHandler.endNonterminal("markupdecl", e0);
  }

  function parse_SDDecl()
  {
    eventHandler.startNonterminal("SDDecl", e0);
    shift(2);                       // S
    lookahead1(20);                 // 'standalone'
    shift(63);                      // 'standalone'
    parse_Eq();
    lookahead1(33);                 // '"' | "'"
    switch (l1)
    {
    case 24:                        // "'"
      shift(24);                    // "'"
      lookahead1(42);               // 'no' | 'yes'
      switch (l1)
      {
      case 65:                      // 'yes'
        shift(65);                  // 'yes'
        break;
      default:
        shift(62);                  // 'no'
      }
      lookahead1(11);               // "'"
      shift(24);                    // "'"
      break;
    default:
      shift(17);                    // '"'
      lookahead1(42);               // 'no' | 'yes'
      switch (l1)
      {
      case 65:                      // 'yes'
        shift(65);                  // 'yes'
        break;
      default:
        shift(62);                  // 'no'
      }
      lookahead1(8);                // '"'
      shift(17);                    // '"'
    }
    eventHandler.endNonterminal("SDDecl", e0);
  }

  function parse_element()
  {
    eventHandler.startNonterminal("element", e0);
    shift(33);                      // '<'
    lookahead1(1);                  // Name
    shift(3);                       // Name
    for (;;)
    {
      lookahead1(47);               // S | '/>' | '>'
      switch (l1)
      {
      case 2:                       // S
        lookahead2(50);             // Name | '/>' | '>'
        break;
      default:
        lk = l1;
      }
      if (lk != 386)                // S Name
      {
        break;
      }
      shift(2);                     // S
      parse_Attribute();
    }
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(37);                 // '/>' | '>'
    switch (l1)
    {
    case 31:                        // '/>'
      shift(31);                    // '/>'
      break;
    default:
      shift(42);                    // '>'
      parse_content();
      parse_ETag();
    }
    eventHandler.endNonterminal("element", e0);
  }

  function parse_Attribute()
  {
    eventHandler.startNonterminal("Attribute", e0);
    lookahead1(1);                  // Name
    shift(3);                       // Name
    parse_Eq();
    lookahead1(3);                  // AttValue
    shift(6);                       // AttValue
    eventHandler.endNonterminal("Attribute", e0);
  }

  function parse_ETag()
  {
    eventHandler.startNonterminal("ETag", e0);
    shift(39);                      // '</'
    lookahead1(1);                  // Name
    shift(3);                       // Name
    lookahead1(27);                 // S | '>'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(16);                 // '>'
    shift(42);                      // '>'
    eventHandler.endNonterminal("ETag", e0);
  }

  function parse_content()
  {
    eventHandler.startNonterminal("content", e0);
    lookahead1(69);                 // CharData | Comment | PI | CDSect | CharRef | '&' | '<' | '</'
    if (l1 == 9)                    // CharData
    {
      shift(9);                     // CharData
    }
    for (;;)
    {
      lookahead1(68);               // Comment | PI | CDSect | CharRef | '&' | '<' | '</'
      if (l1 == 39)                 // '</'
      {
        break;
      }
      switch (l1)
      {
      case 33:                      // '<'
        parse_element();
        break;
      case 12:                      // CDSect
        shift(12);                  // CDSect
        break;
      case 11:                      // PI
        shift(11);                  // PI
        break;
      case 10:                      // Comment
        shift(10);                  // Comment
        break;
      default:
        parse_Reference();
      }
      lookahead1(69);               // CharData | Comment | PI | CDSect | CharRef | '&' | '<' | '</'
      if (l1 == 9)                  // CharData
      {
        shift(9);                   // CharData
      }
    }
    eventHandler.endNonterminal("content", e0);
  }

  function parse_elementdecl()
  {
    eventHandler.startNonterminal("elementdecl", e0);
    shift(36);                      // '<!ELEMENT'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(1);                  // Name
    shift(3);                       // Name
    lookahead1(0);                  // S
    shift(2);                       // S
    parse_contentspec();
    lookahead1(27);                 // S | '>'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(16);                 // '>'
    shift(42);                      // '>'
    eventHandler.endNonterminal("elementdecl", e0);
  }

  function parse_contentspec()
  {
    eventHandler.startNonterminal("contentspec", e0);
    lookahead1(52);                 // '(' | 'ANY' | 'EMPTY'
    switch (l1)
    {
    case 25:                        // '('
      lookahead2(57);               // S | Name | '#PCDATA' | '('
      switch (lk)
      {
      case 281:                     // '(' S
        lookahead3(49);             // Name | '#PCDATA' | '('
        break;
      }
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 47:                        // 'EMPTY'
      shift(47);                    // 'EMPTY'
      break;
    case 45:                        // 'ANY'
      shift(45);                    // 'ANY'
      break;
    case 2585:                      // '(' '#PCDATA'
    case 327961:                    // '(' S '#PCDATA'
      parse_Mixed();
      break;
    default:
      parse_children();
    }
    eventHandler.endNonterminal("contentspec", e0);
  }

  function parse_children()
  {
    eventHandler.startNonterminal("children", e0);
    parse_choiceOrSeq();
    lookahead1(65);                 // S | '*' | '+' | '>' | '?'
    if (l1 != 2                     // S
     && l1 != 42)                   // '>'
    {
      switch (l1)
      {
      case 43:                      // '?'
        shift(43);                  // '?'
        break;
      case 28:                      // '*'
        shift(28);                  // '*'
        break;
      default:
        shift(29);                  // '+'
      }
    }
    eventHandler.endNonterminal("children", e0);
  }

  function parse_cp()
  {
    eventHandler.startNonterminal("cp", e0);
    lookahead1(30);                 // Name | '('
    switch (l1)
    {
    case 3:                         // Name
      shift(3);                     // Name
      break;
    default:
      parse_choiceOrSeq();
    }
    lookahead1(67);                 // S | ')' | '*' | '+' | ',' | '?' | '|'
    if (l1 == 28                    // '*'
     || l1 == 29                    // '+'
     || l1 == 43)                   // '?'
    {
      switch (l1)
      {
      case 43:                      // '?'
        shift(43);                  // '?'
        break;
      case 28:                      // '*'
        shift(28);                  // '*'
        break;
      default:
        shift(29);                  // '+'
      }
    }
    eventHandler.endNonterminal("cp", e0);
  }

  function parse_choiceOrSeq()
  {
    eventHandler.startNonterminal("choiceOrSeq", e0);
    shift(25);                      // '('
    lookahead1(43);                 // S | Name | '('
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    parse_cp();
    lookahead1(61);                 // S | ')' | ',' | '|'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(54);                 // ')' | ',' | '|'
    switch (l1)
    {
    case 66:                        // '|'
      for (;;)
      {
        shift(66);                  // '|'
        lookahead1(43);             // S | Name | '('
        if (l1 == 2)                // S
        {
          shift(2);                 // S
        }
        parse_cp();
        lookahead1(45);             // S | ')' | '|'
        if (l1 == 2)                // S
        {
          shift(2);                 // S
        }
        lookahead1(35);             // ')' | '|'
        if (l1 != 66)               // '|'
        {
          break;
        }
      }
      break;
    default:
      for (;;)
      {
        lookahead1(34);             // ')' | ','
        if (l1 != 30)               // ','
        {
          break;
        }
        shift(30);                  // ','
        lookahead1(43);             // S | Name | '('
        if (l1 == 2)                // S
        {
          shift(2);                 // S
        }
        parse_cp();
        lookahead1(44);             // S | ')' | ','
        if (l1 == 2)                // S
        {
          shift(2);                 // S
        }
      }
    }
    shift(26);                      // ')'
    eventHandler.endNonterminal("choiceOrSeq", e0);
  }

  function parse_Mixed()
  {
    eventHandler.startNonterminal("Mixed", e0);
    shift(25);                      // '('
    lookahead1(25);                 // S | '#PCDATA'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(9);                  // '#PCDATA'
    shift(20);                      // '#PCDATA'
    lookahead1(60);                 // S | ')' | ')*' | '|'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(53);                 // ')' | ')*' | '|'
    switch (l1)
    {
    case 26:                        // ')'
      shift(26);                    // ')'
      break;
    default:
      for (;;)
      {
        lookahead1(36);             // ')*' | '|'
        if (l1 != 66)               // '|'
        {
          break;
        }
        shift(66);                  // '|'
        lookahead1(23);             // S | Name
        if (l1 == 2)                // S
        {
          shift(2);                 // S
        }
        lookahead1(1);              // Name
        shift(3);                   // Name
        lookahead1(46);             // S | ')*' | '|'
        if (l1 == 2)                // S
        {
          shift(2);                 // S
        }
      }
      shift(27);                    // ')*'
    }
    eventHandler.endNonterminal("Mixed", e0);
  }

  function parse_AttlistDecl()
  {
    eventHandler.startNonterminal("AttlistDecl", e0);
    shift(34);                      // '<!ATTLIST'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(1);                  // Name
    shift(3);                       // Name
    for (;;)
    {
      lookahead1(27);               // S | '>'
      switch (l1)
      {
      case 2:                       // S
        lookahead2(31);             // Name | '>'
        break;
      default:
        lk = l1;
      }
      if (lk != 386)                // S Name
      {
        break;
      }
      parse_AttDef();
    }
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(16);                 // '>'
    shift(42);                      // '>'
    eventHandler.endNonterminal("AttlistDecl", e0);
  }

  function parse_AttDef()
  {
    eventHandler.startNonterminal("AttDef", e0);
    shift(2);                       // S
    lookahead1(1);                  // Name
    shift(3);                       // Name
    lookahead1(0);                  // S
    shift(2);                       // S
    parse_AttType();
    lookahead1(0);                  // S
    shift(2);                       // S
    parse_DefaultDecl();
    eventHandler.endNonterminal("AttDef", e0);
  }

  function parse_AttType()
  {
    eventHandler.startNonterminal("AttType", e0);
    lookahead1(71);                 // '(' | 'CDATA' | 'ENTITIES' | 'ENTITY' | 'ID' | 'IDREF' | 'IDREFS' | 'NMTOKEN' |
                                    // 'NMTOKENS' | 'NOTATION'
    switch (l1)
    {
    case 46:                        // 'CDATA'
      parse_StringType();
      break;
    case 25:                        // '('
    case 56:                        // 'NOTATION'
      parse_EnumeratedType();
      break;
    default:
      parse_TokenizedType();
    }
    eventHandler.endNonterminal("AttType", e0);
  }

  function parse_StringType()
  {
    eventHandler.startNonterminal("StringType", e0);
    shift(46);                      // 'CDATA'
    eventHandler.endNonterminal("StringType", e0);
  }

  function parse_TokenizedType()
  {
    eventHandler.startNonterminal("TokenizedType", e0);
    switch (l1)
    {
    case 50:                        // 'ID'
      shift(50);                    // 'ID'
      break;
    case 51:                        // 'IDREF'
      shift(51);                    // 'IDREF'
      break;
    case 52:                        // 'IDREFS'
      shift(52);                    // 'IDREFS'
      break;
    case 49:                        // 'ENTITY'
      shift(49);                    // 'ENTITY'
      break;
    case 48:                        // 'ENTITIES'
      shift(48);                    // 'ENTITIES'
      break;
    case 54:                        // 'NMTOKEN'
      shift(54);                    // 'NMTOKEN'
      break;
    default:
      shift(55);                    // 'NMTOKENS'
    }
    eventHandler.endNonterminal("TokenizedType", e0);
  }

  function parse_EnumeratedType()
  {
    eventHandler.startNonterminal("EnumeratedType", e0);
    switch (l1)
    {
    case 56:                        // 'NOTATION'
      parse_NotationType();
      break;
    default:
      parse_Enumeration();
    }
    eventHandler.endNonterminal("EnumeratedType", e0);
  }

  function parse_NotationType()
  {
    eventHandler.startNonterminal("NotationType", e0);
    shift(56);                      // 'NOTATION'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(12);                 // '('
    shift(25);                      // '('
    lookahead1(23);                 // S | Name
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(1);                  // Name
    shift(3);                       // Name
    for (;;)
    {
      lookahead1(45);               // S | ')' | '|'
      switch (l1)
      {
      case 2:                       // S
        lookahead2(35);             // ')' | '|'
        break;
      default:
        lk = l1;
      }
      if (lk != 66                  // '|'
       && lk != 8450)               // S '|'
      {
        break;
      }
      if (l1 == 2)                  // S
      {
        shift(2);                   // S
      }
      lookahead1(22);               // '|'
      shift(66);                    // '|'
      lookahead1(23);               // S | Name
      if (l1 == 2)                  // S
      {
        shift(2);                   // S
      }
      lookahead1(1);                // Name
      shift(3);                     // Name
    }
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(13);                 // ')'
    shift(26);                      // ')'
    eventHandler.endNonterminal("NotationType", e0);
  }

  function parse_Enumeration()
  {
    eventHandler.startNonterminal("Enumeration", e0);
    shift(25);                      // '('
    lookahead1(24);                 // S | Nmtoken
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(2);                  // Nmtoken
    shift(4);                       // Nmtoken
    for (;;)
    {
      lookahead1(45);               // S | ')' | '|'
      switch (l1)
      {
      case 2:                       // S
        lookahead2(35);             // ')' | '|'
        break;
      default:
        lk = l1;
      }
      if (lk != 66                  // '|'
       && lk != 8450)               // S '|'
      {
        break;
      }
      if (l1 == 2)                  // S
      {
        shift(2);                   // S
      }
      lookahead1(22);               // '|'
      shift(66);                    // '|'
      lookahead1(24);               // S | Nmtoken
      if (l1 == 2)                  // S
      {
        shift(2);                   // S
      }
      lookahead1(2);                // Nmtoken
      shift(4);                     // Nmtoken
    }
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(13);                 // ')'
    shift(26);                      // ')'
    eventHandler.endNonterminal("Enumeration", e0);
  }

  function parse_DefaultDecl()
  {
    eventHandler.startNonterminal("DefaultDecl", e0);
    lookahead1(62);                 // AttValue | '#FIXED' | '#IMPLIED' | '#REQUIRED'
    switch (l1)
    {
    case 21:                        // '#REQUIRED'
      shift(21);                    // '#REQUIRED'
      break;
    case 19:                        // '#IMPLIED'
      shift(19);                    // '#IMPLIED'
      break;
    default:
      if (l1 == 18)                 // '#FIXED'
      {
        shift(18);                  // '#FIXED'
        lookahead1(0);              // S
        shift(2);                   // S
      }
      lookahead1(3);                // AttValue
      shift(6);                     // AttValue
    }
    eventHandler.endNonterminal("DefaultDecl", e0);
  }

  function parse_Reference()
  {
    eventHandler.startNonterminal("Reference", e0);
    switch (l1)
    {
    case 23:                        // '&'
      parse_EntityRef();
      break;
    default:
      shift(14);                    // CharRef
    }
    eventHandler.endNonterminal("Reference", e0);
  }

  function parse_EntityRef()
  {
    eventHandler.startNonterminal("EntityRef", e0);
    shift(23);                      // '&'
    lookahead1(1);                  // Name
    shift(3);                       // Name
    lookahead1(14);                 // ';'
    shift(32);                      // ';'
    eventHandler.endNonterminal("EntityRef", e0);
  }

  function parse_EntityDecl()
  {
    eventHandler.startNonterminal("EntityDecl", e0);
    switch (l1)
    {
    case 37:                        // '<!ENTITY'
      lookahead2(0);                // S
      switch (lk)
      {
      case 293:                     // '<!ENTITY' S
        lookahead3(29);             // Name | '%'
        break;
      }
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 49445:                     // '<!ENTITY' S Name
      parse_GEDecl();
      break;
    default:
      parse_PEDecl();
    }
    eventHandler.endNonterminal("EntityDecl", e0);
  }

  function parse_GEDecl()
  {
    eventHandler.startNonterminal("GEDecl", e0);
    shift(37);                      // '<!ENTITY'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(1);                  // Name
    shift(3);                       // Name
    lookahead1(0);                  // S
    shift(2);                       // S
    parse_EntityDef();
    lookahead1(27);                 // S | '>'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(16);                 // '>'
    shift(42);                      // '>'
    eventHandler.endNonterminal("GEDecl", e0);
  }

  function parse_PEDecl()
  {
    eventHandler.startNonterminal("PEDecl", e0);
    shift(37);                      // '<!ENTITY'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(10);                 // '%'
    shift(22);                      // '%'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(1);                  // Name
    shift(3);                       // Name
    lookahead1(0);                  // S
    shift(2);                       // S
    parse_PEDef();
    lookahead1(27);                 // S | '>'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(16);                 // '>'
    shift(42);                      // '>'
    eventHandler.endNonterminal("PEDecl", e0);
  }

  function parse_EntityDef()
  {
    eventHandler.startNonterminal("EntityDef", e0);
    lookahead1(51);                 // EntityValue | 'PUBLIC' | 'SYSTEM'
    switch (l1)
    {
    case 5:                         // EntityValue
      shift(5);                     // EntityValue
      break;
    default:
      parse_ExternalID();
      lookahead1(27);               // S | '>'
      switch (l1)
      {
      case 2:                       // S
        lookahead2(38);             // '>' | 'NDATA'
        break;
      default:
        lk = l1;
      }
      if (lk == 6786)               // S 'NDATA'
      {
        parse_NDataDecl();
      }
    }
    eventHandler.endNonterminal("EntityDef", e0);
  }

  function parse_PEDef()
  {
    eventHandler.startNonterminal("PEDef", e0);
    lookahead1(51);                 // EntityValue | 'PUBLIC' | 'SYSTEM'
    switch (l1)
    {
    case 5:                         // EntityValue
      shift(5);                     // EntityValue
      break;
    default:
      parse_ExternalID();
    }
    eventHandler.endNonterminal("PEDef", e0);
  }

  function parse_ExternalID()
  {
    eventHandler.startNonterminal("ExternalID", e0);
    lookahead1(41);                 // 'PUBLIC' | 'SYSTEM'
    switch (l1)
    {
    case 58:                        // 'SYSTEM'
      shift(58);                    // 'SYSTEM'
      lookahead1(0);                // S
      shift(2);                     // S
      lookahead1(4);                // SystemLiteral
      shift(7);                     // SystemLiteral
      break;
    default:
      shift(57);                    // 'PUBLIC'
      lookahead1(0);                // S
      shift(2);                     // S
      lookahead1(5);                // PubidLiteral
      shift(8);                     // PubidLiteral
      lookahead1(0);                // S
      shift(2);                     // S
      lookahead1(4);                // SystemLiteral
      shift(7);                     // SystemLiteral
    }
    eventHandler.endNonterminal("ExternalID", e0);
  }

  function parse_NDataDecl()
  {
    eventHandler.startNonterminal("NDataDecl", e0);
    shift(2);                       // S
    lookahead1(18);                 // 'NDATA'
    shift(53);                      // 'NDATA'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(1);                  // Name
    shift(3);                       // Name
    eventHandler.endNonterminal("NDataDecl", e0);
  }

  function parse_EncodingDecl()
  {
    eventHandler.startNonterminal("EncodingDecl", e0);
    shift(2);                       // S
    lookahead1(19);                 // 'encoding'
    shift(61);                      // 'encoding'
    parse_Eq();
    lookahead1(33);                 // '"' | "'"
    switch (l1)
    {
    case 17:                        // '"'
      shift(17);                    // '"'
      lookahead1(7);                // EncName
      shift(16);                    // EncName
      lookahead1(8);                // '"'
      shift(17);                    // '"'
      break;
    default:
      shift(24);                    // "'"
      lookahead1(7);                // EncName
      shift(16);                    // EncName
      lookahead1(11);               // "'"
      shift(24);                    // "'"
    }
    eventHandler.endNonterminal("EncodingDecl", e0);
  }

  function parse_NotationDecl()
  {
    eventHandler.startNonterminal("NotationDecl", e0);
    shift(38);                      // '<!NOTATION'
    lookahead1(0);                  // S
    shift(2);                       // S
    lookahead1(1);                  // Name
    shift(3);                       // Name
    lookahead1(0);                  // S
    shift(2);                       // S
    parse_ExternalOrPublicID();
    lookahead1(27);                 // S | '>'
    if (l1 == 2)                    // S
    {
      shift(2);                     // S
    }
    lookahead1(16);                 // '>'
    shift(42);                      // '>'
    eventHandler.endNonterminal("NotationDecl", e0);
  }

  function parse_ExternalOrPublicID()
  {
    eventHandler.startNonterminal("ExternalOrPublicID", e0);
    lookahead1(41);                 // 'PUBLIC' | 'SYSTEM'
    switch (l1)
    {
    case 58:                        // 'SYSTEM'
      shift(58);                    // 'SYSTEM'
      lookahead1(0);                // S
      shift(2);                     // S
      lookahead1(4);                // SystemLiteral
      shift(7);                     // SystemLiteral
      break;
    default:
      shift(57);                    // 'PUBLIC'
      lookahead1(0);                // S
      shift(2);                     // S
      lookahead1(5);                // PubidLiteral
      shift(8);                     // PubidLiteral
      lookahead1(27);               // S | '>'
      switch (l1)
      {
      case 2:                       // S
        lookahead2(32);             // SystemLiteral | '>'
        break;
      default:
        lk = l1;
      }
      if (lk == 898)                // S SystemLiteral
      {
        shift(2);                   // S
        lookahead1(4);              // SystemLiteral
        shift(7);                   // SystemLiteral
      }
    }
    eventHandler.endNonterminal("ExternalOrPublicID", e0);
  }

  function shift(t)
  {
    if (l1 == t)
    {
      eventHandler.terminal(XML.TOKEN[l1], b1, e1 > size ? size : e1);
      b0 = b1; e0 = e1; l1 = l2; if (l1 != 0) {
      b1 = b2; e1 = e2; l2 = l3; if (l2 != 0) {
      b2 = b3; e2 = e3; l3 = 0; }}
    }
    else
    {
      error(b1, e1, 0, l1, t);
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

  function lookahead2(set)
  {
    if (l2 == 0)
    {
      l2 = match(set);
      b2 = begin;
      e2 = end;
    }
    lk = (l2 << 7) | l1;
  }

  function lookahead3(set)
  {
    if (l3 == 0)
    {
      l3 = match(set);
      b3 = begin;
      e3 = end;
    }
    lk |= l3 << 14;
  }

  function error(b, e, s, l, t)
  {
    throw new self.ParseException(b, e, s, l, t);
  }

  var lk, b0, e0;
  var l1, b1, e1;
  var l2, b2, e2;
  var l3, b3, e3;
  var eventHandler;

  var input;
  var size;
  var begin;
  var end;

  function match(tokenSetId)
  {
    begin = end;
    var current = end;
    var result = XML.INITIAL[tokenSetId];
    var state = 0;

    for (var code = result & 511; code != 0; )
    {
      var charclass;
      var c0 = current < size ? input.charCodeAt(current) : 0;
      ++current;
      if (c0 < 0x80)
      {
        charclass = XML.MAP0[c0];
      }
      else if (c0 < 0xd800)
      {
        var c1 = c0 >> 4;
        charclass = XML.MAP1[(c0 & 15) + XML.MAP1[(c1 & 31) + XML.MAP1[c1 >> 5]]];
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
          }
        }
        var lo = 0, hi = 4;
        for (var m = 2; ; m = (hi + lo) >> 1)
        {
          if (XML.MAP2[m] > c0) hi = m - 1;
          else if (XML.MAP2[5 + m] < c0) lo = m + 1;
          else {charclass = XML.MAP2[10 + m]; break;}
          if (lo > hi) {charclass = 0; break;}
        }
      }

      state = code;
      var i0 = (charclass << 9) + code - 1;
      code = XML.TRANSITION[(i0 & 15) + XML.TRANSITION[i0 >> 4]];

      if (code > 511)
      {
        result = code;
        code &= 511;
        end = current;
      }
    }

    result >>= 9;
    if (result == 0)
    {
      end = current - 1;
      var c1 = end < size ? input.charCodeAt(end) : 0;
      if (c1 >= 0xdc00 && c1 < 0xe000) --end;
      return error(begin, end, state, -1, -1);
    }

    return (result & 127) - 1;
  }
}

XML.getTokenSet = function(tokenSetId)
{
  var set = [];
  var s = tokenSetId < 0 ? - tokenSetId : INITIAL[tokenSetId] & 511;
  for (var i = 0; i < 67; i += 32)
  {
    var j = i;
    var i0 = (i >> 5) * 280 + s - 1;
    var i1 = i0 >> 2;
    var f = XML.EXPECTED[(i0 & 3) + XML.EXPECTED[(i1 & 63) + XML.EXPECTED[i1 >> 6]]];
    for ( ; f != 0; f >>>= 1, ++j)
    {
      if ((f & 1) != 0)
      {
        set.push(XML.TOKEN[j]);
      }
    }
  }
  return set;
};

XML.MAP0 =
[
  /*   0 */ 71, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 5,
  /*  36 */ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 18, 18, 18, 18, 18, 18, 18, 18, 20, 21, 22, 23, 24, 25,
  /*  64 */ 6, 26, 27, 28, 29, 30, 31, 32, 32, 33, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 32, 32, 45, 46, 32,
  /*  91 */ 47, 48, 49, 48, 50, 48, 51, 52, 53, 54, 55, 52, 56, 32, 57, 32, 32, 58, 59, 60, 61, 32, 32, 62, 63, 64, 32,
  /* 118 */ 65, 32, 66, 67, 32, 48, 68, 48, 48, 48
];

XML.MAP1 =
[
  /*   0 */ 108, 124, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 156, 181, 181, 181, 181,
  /*  21 */ 181, 214, 215, 213, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  42 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  63 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /*  84 */ 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214, 214,
  /* 105 */ 214, 214, 214, 247, 261, 277, 293, 309, 325, 341, 357, 394, 394, 394, 386, 442, 434, 442, 434, 442, 442,
  /* 126 */ 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 411, 411, 411, 411, 411, 411, 411,
  /* 147 */ 427, 442, 442, 442, 442, 442, 442, 442, 442, 370, 394, 394, 395, 393, 394, 394, 442, 442, 442, 442, 442,
  /* 168 */ 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 394, 394, 394, 394, 394, 394, 394, 394,
  /* 189 */ 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394, 394,
  /* 210 */ 394, 394, 394, 441, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442,
  /* 231 */ 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 442, 394, 71, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 256 */ 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  /* 290 */ 15, 16, 17, 18, 19, 18, 18, 18, 18, 18, 18, 18, 18, 20, 21, 22, 23, 24, 25, 6, 26, 27, 28, 29, 30, 31, 32,
  /* 317 */ 32, 33, 32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 32, 32, 45, 46, 32, 47, 48, 49, 48, 50, 48, 51, 52,
  /* 344 */ 53, 54, 55, 52, 56, 32, 57, 32, 32, 58, 59, 60, 61, 32, 32, 62, 63, 64, 32, 65, 32, 66, 67, 32, 48, 68, 48,
  /* 371 */ 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 70, 70, 48, 48, 48, 48, 48, 48, 48, 48, 48, 69, 48, 48, 48, 48,
  /* 398 */ 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
  /* 425 */ 69, 69, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 48, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
  /* 452 */ 70, 70, 70, 70, 70, 70
];

XML.MAP2 =
[
  /*  0 */ 57344, 63744, 64976, 65008, 65536, 63743, 64975, 65007, 65533, 1114111, 48, 70, 48, 70, 48
];

XML.INITIAL =
[
  /*  0 */ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
  /* 29 */ 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  /* 56 */ 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72
];

XML.TRANSITION =
[
  /*    0 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*   18 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2304, 2323, 5215, 2322,
  /*   36 */ 2339, 4812, 4178, 2305, 2794, 2305, 2368, 2305, 5429, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305,
  /*   54 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2304, 2323, 5215, 2322, 2392, 4812, 4178, 2305,
  /*   72 */ 2794, 2305, 2368, 2305, 5429, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*   90 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 4042, 4812, 2443, 2305, 2794, 2305, 2305, 2305,
  /*  108 */ 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  126 */ 2305, 2305, 4560, 2305, 2470, 2979, 4153, 3220, 4178, 2305, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305,
  /*  144 */ 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 5447, 5447,
  /*  162 */ 2305, 2488, 4042, 4812, 5384, 2523, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305,
  /*  180 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 4042, 4812,
  /*  198 */ 4178, 2305, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  216 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3353, 3350, 2305, 2305, 3513, 2831, 4178, 2305, 2794, 2305,
  /*  234 */ 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  252 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 4856, 2916, 2305, 2305, 2305, 2305, 2305, 2305, 3605, 2305,
  /*  270 */ 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  288 */ 3189, 2305, 2553, 3432, 5052, 3941, 4178, 2305, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137,
  /*  306 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2557, 2555, 2558, 2574,
  /*  324 */ 3695, 4812, 4178, 2305, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305,
  /*  342 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3789, 2305, 2600, 3891, 2650, 4812, 4178, 2305,
  /*  360 */ 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  378 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2635, 2584, 4178, 2305, 2794, 2305, 2305, 2305,
  /*  396 */ 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  414 */ 2305, 2305, 2305, 2305, 2305, 2305, 2696, 4812, 4178, 2305, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305,
  /*  432 */ 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  450 */ 2736, 2742, 2665, 4812, 4178, 2305, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305,
  /*  468 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 4809, 4803, 2305, 2305, 4942, 3376,
  /*  486 */ 4178, 2305, 2758, 4015, 2786, 2305, 2407, 2305, 2810, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  504 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 4809, 4803, 2305, 2305, 4531, 3376, 4178, 2305, 4624, 4015,
  /*  522 */ 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  540 */ 2305, 2305, 2305, 2305, 2305, 2305, 3307, 3938, 4042, 4812, 2418, 2305, 2794, 2305, 2305, 2305, 3605, 2305,
  /*  558 */ 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  576 */ 4809, 4803, 2305, 2305, 4942, 3376, 4178, 2828, 4187, 2847, 5176, 3575, 2862, 3863, 3608, 2305, 2305, 3137,
  /*  594 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2890, 4803, 2305, 2305,
  /*  612 */ 4942, 3376, 4178, 2828, 4187, 2847, 5176, 3575, 2862, 3863, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305,
  /*  630 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2913, 2427, 5317, 2932, 4942, 4812, 4680, 2965,
  /*  648 */ 3006, 4015, 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  666 */ 2305, 2305, 2305, 2305, 2305, 2305, 2812, 2305, 2305, 2305, 4042, 4812, 4178, 2305, 3469, 3669, 5194, 2990,
  /*  684 */ 3683, 3402, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  702 */ 2305, 2305, 2305, 2305, 2305, 3770, 3033, 4812, 2305, 2305, 2305, 2305, 2305, 2305, 3605, 2305, 3608, 2305,
  /*  720 */ 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 5281, 2897,
  /*  738 */ 2305, 2305, 4042, 4812, 4178, 2305, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305,
  /*  756 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3110, 3095, 3080, 3124, 3161,
  /*  774 */ 4178, 2305, 2305, 2305, 2305, 2305, 5311, 2305, 3217, 2615, 2305, 3461, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  792 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3236, 3240, 3241, 3257, 4812, 3296, 2305, 2794, 2305,
  /*  810 */ 3323, 2305, 5373, 2305, 3347, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  828 */ 2305, 2305, 2305, 2305, 3369, 2427, 5317, 3392, 4942, 3376, 4680, 3418, 3448, 4015, 4905, 3485, 3501, 3529,
  /*  846 */ 3545, 2305, 3059, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  864 */ 3369, 2427, 5317, 2932, 4942, 3376, 4680, 3561, 3006, 4015, 4905, 4970, 3501, 3863, 3608, 2305, 2305, 3137,
  /*  882 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932,
  /*  900 */ 5474, 3376, 4680, 3591, 3006, 4015, 5109, 4970, 3626, 5078, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305,
  /*  918 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3654, 2720, 2965,
  /*  936 */ 3711, 4459, 4905, 4970, 3749, 3863, 3786, 2305, 3805, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  954 */ 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 3853, 3201, 3376, 4680, 2965, 3879, 4015, 4905, 3907,
  /*  972 */ 3923, 3863, 3957, 3046, 3987, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /*  990 */ 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4002, 2965, 3006, 4015, 4905, 4970, 3501, 2680, 3608, 2305,
  /* 1008 */ 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427,
  /* 1026 */ 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305,
  /* 1044 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 2770, 3376,
  /* 1062 */ 4073, 2965, 4031, 4015, 4655, 2619, 3819, 2305, 4058, 4374, 4398, 3137, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1080 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015,
  /* 1098 */ 4616, 2305, 3819, 4869, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1116 */ 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4086, 4757, 2305, 5041, 2305,
  /* 1134 */ 4102, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1152 */ 3369, 2427, 5317, 2932, 4942, 3376, 4126, 2965, 4142, 4015, 4616, 2305, 3819, 5145, 4169, 2305, 2305, 3137,
  /* 1170 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 4474, 4915, 2932,
  /* 1188 */ 2874, 4203, 4779, 2965, 4219, 4015, 4843, 2305, 3819, 2305, 3608, 4250, 2454, 3762, 2305, 2305, 2305, 2305,
  /* 1206 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 5264, 2965,
  /* 1224 */ 3006, 4015, 5415, 4247, 3819, 2305, 3608, 2472, 2305, 4266, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1242 */ 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 3837, 4290, 4942, 4306, 4680, 4350, 3006, 4015, 4366, 2305,
  /* 1260 */ 3819, 2305, 3608, 2305, 2503, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1278 */ 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 4390, 2305, 3819, 2305, 3608, 2305,
  /* 1296 */ 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427,
  /* 1314 */ 5317, 2932, 4942, 3376, 4321, 2965, 4414, 4015, 4616, 2305, 3819, 2305, 3608, 5120, 2305, 3137, 2305, 2305,
  /* 1332 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 2376, 4490, 4942, 3376,
  /* 1350 */ 4680, 4506, 3006, 4015, 4616, 2305, 3819, 2305, 4547, 2305, 3722, 3137, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1368 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 4585, 4601,
  /* 1386 */ 4640, 2305, 3971, 4671, 4696, 4569, 2305, 4718, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1404 */ 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 4742, 4680, 2965, 3006, 4015, 4616, 2305, 5000, 2305,
  /* 1422 */ 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1440 */ 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 4795, 2305, 3819, 2305, 3608, 2305, 2305, 3137,
  /* 1458 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932,
  /* 1476 */ 4942, 4828, 4680, 4890, 3006, 4015, 4616, 2305, 4931, 2305, 4958, 5440, 5186, 3137, 2305, 2305, 2305, 2305,
  /* 1494 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2942, 2949, 3733, 4812, 4178, 2305,
  /* 1512 */ 4274, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2306, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1530 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3733, 4812, 4178, 2305, 2794, 2305, 2305, 2305,
  /* 1548 */ 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1566 */ 2305, 2305, 2305, 2305, 2305, 2305, 3638, 4812, 5255, 2305, 3331, 2305, 2305, 2305, 3605, 2305, 3608, 2305,
  /* 1584 */ 2305, 4770, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2913, 2427,
  /* 1602 */ 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305,
  /* 1620 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376,
  /* 1638 */ 4680, 4986, 3006, 4015, 4905, 4970, 3501, 5343, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1656 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015,
  /* 1674 */ 4905, 4970, 3501, 3863, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1692 */ 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 5027, 3006, 4015, 4905, 4970, 3501, 3863,
  /* 1710 */ 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1728 */ 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 4905, 2352, 3501, 3863, 3608, 2305, 2305, 3137,
  /* 1746 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2537, 5317, 5068,
  /* 1764 */ 4942, 5094, 4680, 2965, 3006, 4015, 4905, 4970, 3501, 3863, 3608, 2305, 2305, 2711, 2305, 2305, 2305, 2305,
  /* 1782 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965,
  /* 1800 */ 3006, 4015, 4616, 2305, 3819, 2305, 3608, 3610, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1818 */ 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 4616, 3064,
  /* 1836 */ 3819, 3145, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1854 */ 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 4616, 2305, 4520, 2305, 3608, 5142,
  /* 1872 */ 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427,
  /* 1890 */ 5317, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 5246, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305,
  /* 1908 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5126, 2932, 4942, 5161,
  /* 1926 */ 4680, 2965, 3006, 4429, 4616, 2305, 3819, 2305, 3608, 5210, 2507, 3137, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1944 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 5231, 4680, 2965, 3006, 4444,
  /* 1962 */ 4616, 2305, 3819, 4874, 3608, 2305, 5280, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 1980 */ 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 5297, 3006, 4015, 4616, 2305, 3819, 2305,
  /* 1998 */ 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 2016 */ 3369, 4231, 4110, 5333, 4942, 3376, 4680, 5359, 3006, 4334, 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137,
  /* 2034 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932,
  /* 2052 */ 4942, 5400, 4680, 2965, 3006, 4015, 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305,
  /* 2070 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3369, 3017, 5317, 2932, 4942, 3376, 4680, 2965,
  /* 2088 */ 3006, 4015, 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 2106 */ 2305, 2305, 2305, 2305, 2305, 2305, 3369, 2427, 5317, 2932, 4942, 3376, 4680, 2965, 5463, 5490, 4616, 2305,
  /* 2124 */ 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 2142 */ 2305, 2305, 3369, 2427, 4702, 2932, 4942, 3376, 4680, 2965, 3006, 4015, 4616, 2305, 3819, 2305, 3608, 2305,
  /* 2160 */ 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 3830,
  /* 2178 */ 3272, 3280, 3176, 4812, 4178, 2305, 2794, 2305, 2305, 2305, 3605, 2305, 3608, 2305, 2305, 3137, 2305, 2305,
  /* 2196 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 4809, 4803, 2305, 2305, 5011, 4812,
  /* 2214 */ 4178, 2305, 4624, 4015, 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 2232 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2913, 2427, 5317, 2932, 5011, 4812, 4680, 2965, 3006, 4015,
  /* 2250 */ 4616, 2305, 3819, 2305, 3608, 2305, 2305, 3137, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 2268 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 4726, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 2286 */ 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305, 2305,
  /* 2304 */ 1537, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 277, 1537, 0, 0, 0, 0, 0, 0, 0, 1537, 1537, 1537,
  /* 2333 */ 1537, 1537, 1537, 0, 0, 0, 1537, 1537, 1537, 1537, 0, 5224, 1537, 0, 0, 74, 75, 76, 77, 0, 0, 0, 0, 215, 0,
  /* 2358 */ 216, 0, 0, 218, 219, 0, 0, 0, 0, 223, 0, 0, 197, 0, 0, 0, 0, 197, 0, 0, 0, 0, 0, 0, 0, 0, 0, 91, 0, 2121,
  /* 2388 */ 0, 0, 0, 0, 1537, 1537, 1537, 1537, 0, 5224, 1537, 0, 0, 74, 75, 76, 77, 78, 79, 0, 0, 0, 225, 197, 0, 0,
  /* 2414 */ 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 20480, 5224, 5224, 0, 0, 0, 0, 0, 0, 0, 2121, 2563, 0, 0, 0, 0, 2121, 2121,
  /* 2442 */ 2121, 0, 129, 0, 134, 134, 0, 137, 5224, 5224, 0, 140, 0, 0, 0, 0, 0, 0, 274, 0, 0, 0, 0, 29184, 0, 0, 0,
  /* 2469 */ 0, 76, 9216, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 268, 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 0,
  /* 2502 */ 99, 0, 0, 0, 271, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 276, 0, 0, 0, 148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 158,
  /* 2535 */ 0, 160, 0, 0, 0, 85, 0, 0, 0, 2121, 2563, 0, 0, 0, 0, 2121, 2121, 2121, 77, 12800, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 2563 */ 0, 0, 0, 0, 0, 0, 13312, 0, 0, 0, 0, 0, 13312, 0, 0, 13312, 0, 0, 0, 0, 13312, 0, 0, 0, 0, 0, 0, 0, 14336,
  /* 2592 */ 0, 0, 0, 0, 0, 94, 95, 0, 0, 0, 13824, 13824, 88, 0, 0, 0, 0, 0, 0, 0, 13824, 13824, 88, 0, 0, 0, 5632, 0,
  /* 2620 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 221, 0, 0, 0, 0, 14848, 0, 14848, 0, 5224, 0, 0, 0, 74, 75, 76, 77, 78,
  /* 2649 */ 79, 0, 0, 0, 13824, 0, 5224, 0, 0, 0, 74, 75, 76, 77, 78, 79, 0, 0, 0, 15872, 0, 5224, 0, 0, 0, 74, 75, 76,
  /* 2677 */ 77, 78, 79, 0, 0, 0, 26861, 0, 0, 215, 216, 0, 0, 0, 0, 0, 0, 223, 224, 0, 15360, 0, 15360, 0, 5224, 0, 0,
  /* 2704 */ 0, 74, 75, 76, 77, 78, 79, 0, 0, 0, 32768, 277, 0, 277, 277, 0, 0, 0, 0, 0, 0, 0, 0, 5224, 5224, 139, 0,
  /* 2731 */ 141, 0, 26255, 0, 147, 0, 0, 15872, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15872, 0, 0, 0, 0, 0, 0, 15872, 0, 0, 162,
  /* 2759 */ 0, 0, 0, 0, 162, 0, 0, 162, 5224, 139, 162, 0, 0, 0, 0, 0, 5224, 0, 110, 2121, 74, 75, 76, 77, 78, 79, 0,
  /* 2786 */ 0, 196, 163, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5224, 0, 0, 0, 0, 0, 0, 244, 197, 0, 0, 0, 0, 0,
  /* 2817 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 16896, 0, 0, 7282, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 125, 0, 0,
  /* 2848 */ 180, 147, 182, 149, 0, 0, 0, 0, 0, 0, 0, 157, 191, 159, 193, 224, 0, 196, 197, 0, 0, 0, 0, 0, 163, 204, 0,
  /* 2875 */ 0, 0, 0, 0, 5224, 0, 111, 2121, 74, 75, 76, 77, 78, 79, 0, 0, 0, 2563, 0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 2905 */ 0, 0, 21504, 0, 0, 0, 0, 0, 0, 2121, 2563, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 126, 0, 0, 2121,
  /* 2934 */ 2121, 0, 0, 0, 0, 0, 0, 2121, 0, 0, 0, 0, 0, 0, 0, 30720, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30720,
  /* 2965 */ 149, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157, 157, 159, 159, 0, 0, 0, 94, 0, 0, 0, 0, 0, 0, 9290, 0, 0, 0, 74, 0,
  /* 2995 */ 75, 0, 0, 0, 0, 0, 0, 0, 0, 94, 0, 0, 163, 0, 0, 0, 0, 163, 0, 0, 5224, 139, 0, 0, 0, 0, 0, 87, 0, 2121,
  /* 3025 */ 2563, 0, 0, 0, 0, 2121, 2121, 2121, 17508, 0, 17509, 0, 17511, 17511, 107, 0, 0, 0, 0, 76, 77, 0, 0, 0, 0,
  /* 3050 */ 258, 0, 0, 0, 0, 263, 0, 0, 266, 0, 0, 0, 0, 272, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 220, 0, 0, 0, 0, 22016,
  /* 3081 */ 0, 22016, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22016, 0, 0, 0, 0, 22016, 22016, 22016, 0, 0, 0, 0, 0, 0, 0,
  /* 3110 */ 22016, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22016, 0, 0, 0, 22016, 0, 0, 0, 5224, 0, 0, 0, 74, 75, 76, 77, 0, 0,
  /* 3139 */ 0, 0, 277, 0, 277, 277, 0, 0, 0, 0, 0, 0, 0, 0, 0, 241, 0, 0, 0, 0, 0, 0, 0, 0, 23040, 0, 0, 0, 0, 0,
  /* 3169 */ 16384, 0, 0, 0, 0, 94, 95, 0, 0, 0, 34304, 0, 5224, 0, 0, 0, 74, 75, 76, 77, 0, 0, 0, 75, 77, 79, 0, 0, 0,
  /* 3198 */ 0, 0, 12800, 0, 0, 0, 0, 0, 5224, 0, 109, 2121, 74, 75, 76, 77, 78, 79, 0, 196, 6144, 0, 0, 0, 0, 0, 0, 0,
  /* 3226 */ 0, 0, 0, 0, 0, 0, 0, 3072, 95, 0, 0, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 3258 */ 22528, 0, 22528, 0, 5224, 0, 0, 0, 74, 75, 76, 77, 78, 79, 0, 0, 0, 34304, 34304, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 3285 */ 34304, 34304, 0, 0, 0, 0, 0, 34304, 34304, 0, 0, 0, 130, 0, 130, 135, 0, 130, 5224, 5224, 0, 130, 0, 0, 0,
  /* 3310 */ 0, 0, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 89, 0, 0, 198, 0, 0, 0, 0, 198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5258, 0, 0,
  /* 3343 */ 0, 0, 0, 0, 196, 226, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11776, 0, 0, 0, 0, 0, 0, 2121, 2563, 0, 0,
  /* 3374 */ 0, 0, 8785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 95, 0, 0, 2121, 2121, 0, 96, 0, 0, 0, 0, 2121, 0, 0, 0,
  /* 3405 */ 0, 0, 0, 74, 75, 0, 0, 0, 0, 0, 0, 94, 95, 149, 0, 0, 151, 0, 0, 0, 0, 0, 0, 157, 157, 159, 159, 0, 0, 0,
  /* 3435 */ 95, 0, 0, 0, 0, 0, 0, 12875, 0, 0, 0, 75, 0, 0, 163, 0, 0, 0, 0, 163, 0, 0, 5224, 139, 172, 175, 0, 0, 0,
  /* 3464 */ 0, 277, 0, 277, 6656, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5224, 8192, 0, 0, 0, 0, 0, 0, 0, 214, 0, 215, 0, 216, 217,
  /* 3493 */ 27648, 0, 0, 0, 0, 0, 0, 223, 0, 224, 0, 196, 197, 0, 0, 0, 0, 0, 163, 204, 0, 0, 0, 0, 0, 5224, 106, 0, 0,
  /* 3522 */ 74, 75, 76, 77, 78, 79, 0, 0, 24064, 0, 0, 0, 0, 215, 216, 0, 0, 0, 0, 0, 0, 223, 224, 196, 197, 0, 0, 0,
  /* 3550 */ 0, 248, 0, 0, 0, 252, 0, 0, 0, 0, 10752, 149, 0, 0, 0, 0, 0, 0, 155, 0, 0, 157, 157, 159, 159, 0, 0, 0,
  /* 3578 */ 180, 215, 182, 216, 0, 0, 0, 0, 0, 0, 0, 191, 223, 149, 0, 150, 0, 0, 0, 0, 0, 0, 0, 157, 157, 159, 159, 0,
  /* 3606 */ 0, 0, 196, 197, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31744, 0, 224, 0, 196, 197, 0, 0, 0, 0, 230,
  /* 3636 */ 163, 204, 0, 0, 0, 0, 0, 5225, 31232, 0, 0, 74, 75, 76, 77, 0, 0, 0, 8785, 0, 0, 116, 0, 0, 0, 0, 0, 0, 0,
  /* 3665 */ 0, 0, 94, 95, 0, 0, 74, 0, 75, 0, 0, 0, 0, 0, 0, 0, 94, 0, 95, 0, 0, 196, 197, 0, 0, 0, 0, 0, 0, 7680, 0,
  /* 3696 */ 0, 0, 0, 0, 5224, 0, 13312, 0, 74, 75, 76, 77, 78, 79, 0, 0, 163, 0, 0, 0, 167, 163, 0, 0, 5224, 139, 0, 0,
  /* 3724 */ 0, 0, 0, 273, 0, 0, 0, 25088, 28672, 0, 0, 0, 0, 0, 5224, 0, 0, 0, 74, 75, 76, 77, 0, 0, 0, 0, 224, 0, 196,
  /* 3753 */ 197, 0, 0, 0, 0, 0, 163, 204, 231, 0, 0, 0, 0, 277, 19968, 277, 277, 0, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0,
  /* 3781 */ 17506, 0, 0, 0, 0, 196, 197, 9728, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13824, 0, 0, 0, 10240, 0, 0, 0,
  /* 3810 */ 0, 0, 0, 0, 0, 0, 0, 0, 11264, 0, 0, 0, 196, 197, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 34304, 0, 0, 0, 0,
  /* 3841 */ 0, 0, 0, 0, 0, 90, 0, 2121, 0, 0, 0, 0, 0, 2121, 2121, 0, 97, 0, 0, 0, 0, 2121, 0, 0, 0, 0, 0, 0, 215, 216,
  /* 3871 */ 0, 0, 0, 0, 0, 0, 223, 224, 0, 163, 0, 0, 166, 0, 163, 0, 0, 5224, 139, 173, 0, 0, 0, 0, 0, 13912, 13824,
  /* 3898 */ 0, 0, 0, 0, 0, 13912, 13824, 0, 0, 212, 0, 0, 0, 215, 0, 216, 0, 0, 0, 0, 0, 0, 222, 0, 223, 0, 224, 0,
  /* 3926 */ 196, 197, 0, 227, 0, 0, 0, 163, 204, 0, 0, 233, 0, 0, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 3072,
  /* 3956 */ 0, 196, 197, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 254, 0, 0, 0, 196, 197, 0, 0, 0, 0, 0, 163, 0, 0, 232, 0,
  /* 3986 */ 234, 0, 0, 270, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18432, 0, 0, 131, 0, 0, 0, 0, 5224, 5224, 139, 0, 0, 0, 0,
  /* 4016 */ 0, 147, 0, 149, 0, 0, 0, 0, 0, 0, 0, 157, 0, 159, 0, 0, 163, 164, 0, 0, 0, 163, 0, 0, 5224, 139, 0, 0, 0,
  /* 4045 */ 0, 0, 5224, 0, 0, 0, 74, 75, 76, 77, 78, 79, 0, 196, 197, 0, 245, 246, 0, 0, 0, 0, 251, 0, 253, 0, 0, 255,
  /* 4073 */ 0, 0, 132, 0, 0, 0, 0, 5224, 5224, 139, 0, 0, 0, 0, 0, 147, 0, 149, 0, 0, 0, 0, 0, 189, 0, 157, 0, 159, 0,
  /* 4102 */ 196, 197, 0, 0, 0, 0, 0, 249, 0, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 2121, 0, 0, 0, 0, 128, 0, 0, 0, 0, 0, 0,
  /* 4133 */ 5224, 5224, 139, 0, 0, 0, 0, 144, 147, 0, 163, 0, 165, 0, 0, 163, 0, 0, 5224, 139, 0, 0, 0, 0, 0, 5224, 0,
  /* 4160 */ 0, 0, 3584, 75, 4096, 77, 4608, 0, 0, 196, 197, 0, 0, 0, 0, 0, 0, 250, 0, 0, 0, 0, 0, 0, 0, 5224, 5224, 0,
  /* 4188 */ 0, 0, 0, 0, 0, 0, 169, 0, 5224, 139, 0, 0, 0, 0, 0, 8785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 95, 127,
  /* 4219 */ 0, 163, 0, 0, 0, 0, 163, 0, 0, 5224, 139, 174, 0, 0, 0, 0, 86, 0, 0, 2121, 2563, 0, 0, 0, 0, 2121, 2121,
  /* 4246 */ 2121, 0, 213, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28427, 0, 0, 0, 0, 278, 0, 277, 0, 277, 277, 0, 0,
  /* 4276 */ 0, 0, 0, 0, 0, 0, 171, 5224, 0, 0, 0, 0, 0, 0, 0, 2121, 2121, 90, 0, 0, 0, 0, 0, 2121, 0, 0, 0, 0, 0, 90,
  /* 4306 */ 8785, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 95, 0, 0, 133, 0, 0, 0, 0, 5224, 5224, 139, 0, 0, 0, 0, 0,
  /* 4336 */ 147, 0, 149, 0, 0, 0, 0, 188, 0, 0, 157, 0, 159, 0, 149, 0, 0, 0, 0, 0, 0, 0, 0, 0, 157, 157, 159, 159, 0,
  /* 4365 */ 161, 0, 0, 163, 0, 200, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 262, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 201,
  /* 4396 */ 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 275, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 163, 0, 0, 5224, 139, 0, 0,
  /* 4427 */ 0, 177, 0, 0, 147, 0, 149, 0, 0, 0, 187, 0, 0, 0, 157, 0, 159, 0, 0, 147, 0, 149, 0, 0, 186, 0, 0, 0, 0,
  /* 4456 */ 157, 0, 159, 0, 0, 147, 0, 149, 184, 0, 0, 0, 0, 0, 0, 157, 0, 159, 0, 0, 84, 0, 0, 0, 0, 2121, 2563, 0, 0,
  /* 4485 */ 0, 0, 2121, 2121, 2121, 0, 2121, 2121, 91, 0, 0, 0, 0, 0, 2121, 0, 0, 0, 0, 0, 91, 149, 0, 0, 0, 0, 0, 0,
  /* 4513 */ 0, 156, 0, 157, 157, 159, 159, 0, 0, 0, 196, 197, 0, 0, 0, 0, 0, 21155, 0, 0, 0, 0, 0, 5224, 0, 0, 2121,
  /* 4540 */ 74, 75, 76, 77, 78, 79, 114, 196, 197, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27136, 0, 0, 0, 74, 76, 78, 0, 0,
  /* 4568 */ 9216, 0, 0, 0, 0, 0, 0, 0, 261, 0, 0, 264, 265, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 163, 0, 0, 5224, 139, 0, 0,
  /* 4598 */ 176, 0, 178, 179, 0, 147, 0, 149, 0, 185, 0, 0, 0, 0, 190, 157, 0, 159, 0, 0, 163, 0, 0, 0, 0, 163, 0, 0,
  /* 4626 */ 0, 0, 0, 0, 0, 0, 0, 5224, 139, 0, 0, 0, 0, 0, 195, 0, 163, 0, 0, 0, 0, 163, 0, 0, 0, 206, 0, 0, 210, 0, 0,
  /* 4657 */ 163, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 211, 235, 0, 236, 0, 0, 239, 0, 0, 240, 0, 0, 0, 0, 0, 0, 0,
  /* 4687 */ 5224, 5224, 139, 0, 0, 0, 0, 0, 147, 196, 197, 0, 0, 0, 247, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 2121, 0, 0,
  /* 4716 */ 0, 0, 17920, 18944, 0, 0, 277, 0, 277, 277, 0, 0, 0, 0, 0, 0, 0, 0, 1024, 0, 0, 0, 0, 0, 0, 0, 8785, 0, 0,
  /* 4745 */ 0, 0, 0, 0, 0, 0, 120, 0, 0, 0, 94, 95, 0, 0, 163, 0, 0, 0, 0, 163, 0, 0, 0, 0, 207, 0, 0, 0, 0, 279, 0,
  /* 4776 */ 280, 280, 0, 0, 0, 0, 0, 0, 0, 0, 5224, 5224, 139, 0, 0, 142, 0, 0, 147, 0, 0, 163, 199, 0, 0, 0, 163, 0,
  /* 4804 */ 0, 0, 0, 0, 0, 0, 0, 2563, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 95, 0, 8785, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 4837 */ 0, 121, 0, 0, 94, 95, 0, 0, 163, 0, 0, 0, 0, 163, 0, 0, 0, 0, 208, 0, 0, 0, 0, 12390, 12390, 0, 0, 0, 112,
  /* 4866 */ 113, 76, 77, 0, 0, 0, 0, 238, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 243, 0, 0, 0, 0, 149, 0, 0, 0, 0, 0, 0, 0,
  /* 4898 */ 0, 0, 157, 157, 159, 159, 23552, 0, 0, 163, 0, 0, 0, 0, 163, 0, 204, 0, 0, 0, 0, 0, 0, 84, 0, 0, 0, 0,
  /* 4926 */ 2121, 0, 0, 0, 0, 0, 0, 24576, 196, 197, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 5224, 0, 0, 2121, 74, 75, 76,
  /* 4954 */ 77, 78, 79, 0, 196, 197, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25600, 0, 0, 0, 0, 215, 0, 216, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 4985 */ 223, 149, 0, 0, 0, 0, 153, 0, 0, 0, 0, 157, 157, 159, 159, 0, 0, 0, 196, 197, 0, 0, 0, 229, 0, 163, 0, 0,
  /* 5013 */ 0, 0, 0, 5224, 0, 0, 2121, 74, 75, 76, 77, 0, 0, 0, 149, 0, 0, 0, 152, 0, 0, 0, 0, 0, 157, 157, 159, 159,
  /* 5041 */ 0, 0, 0, 196, 197, 0, 0, 228, 0, 0, 163, 0, 0, 0, 0, 0, 5224, 0, 0, 0, 74, 3584, 76, 4096, 78, 4608, 0, 0,
  /* 5069 */ 2121, 2121, 0, 0, 0, 0, 85, 0, 2121, 0, 0, 0, 0, 0, 0, 215, 216, 0, 0, 0, 0, 29696, 0, 223, 224, 8785, 0,
  /* 5096 */ 0, 0, 0, 0, 119, 0, 0, 0, 0, 0, 122, 94, 95, 0, 0, 163, 0, 0, 0, 0, 163, 0, 204, 205, 0, 0, 0, 0, 0, 259,
  /* 5126 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 2121, 0, 0, 0, 0, 0, 257, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 5158 */ 30208, 0, 0, 8785, 0, 0, 0, 117, 0, 0, 0, 0, 0, 0, 0, 0, 94, 95, 0, 0, 163, 0, 0, 0, 0, 163, 169, 204, 0,
  /* 5187 */ 0, 0, 0, 0, 0, 0, 19456, 0, 0, 0, 0, 0, 0, 0, 0, 7680, 0, 0, 0, 0, 0, 0, 0, 256, 0, 33280, 0, 0, 0, 0, 0,
  /* 5218 */ 0, 0, 0, 0, 0, 0, 0, 0, 1537, 1537, 1537, 1537, 1537, 8785, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32256, 0, 94, 95,
  /* 5246 */ 0, 0, 163, 0, 0, 0, 0, 203, 0, 0, 0, 0, 0, 0, 0, 0, 5225, 5258, 0, 0, 0, 0, 0, 0, 0, 5224, 5224, 139, 0, 0,
  /* 5276 */ 0, 0, 145, 147, 269, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21504, 149, 0, 0, 0, 0, 0, 154, 0, 0, 0,
  /* 5307 */ 157, 157, 159, 159, 0, 0, 0, 196, 197, 6144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2121, 0, 0, 0, 0, 0, 2121,
  /* 5335 */ 2121, 0, 0, 0, 0, 86, 0, 2121, 0, 0, 0, 0, 0, 0, 215, 216, 0, 0, 242, 0, 0, 0, 223, 224, 149, 0, 0, 0, 0,
  /* 5364 */ 0, 0, 0, 0, 33792, 157, 157, 159, 159, 0, 0, 0, 196, 226, 0, 0, 0, 0, 0, 198, 0, 0, 0, 0, 0, 136, 0, 5224,
  /* 5392 */ 5224, 0, 0, 0, 0, 0, 0, 146, 8785, 0, 0, 0, 0, 118, 0, 0, 0, 0, 0, 0, 0, 94, 95, 0, 0, 163, 0, 0, 0, 202,
  /* 5422 */ 163, 0, 0, 0, 0, 0, 209, 0, 0, 0, 196, 197, 0, 0, 0, 0, 0, 197, 0, 0, 0, 0, 0, 0, 260, 0, 0, 0, 0, 0, 0, 0,
  /* 5454 */ 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 168, 170, 0, 5224, 139, 0, 0, 0, 0, 0, 5224, 0, 108, 2121,
  /* 5483 */ 74, 75, 76, 77, 78, 79, 0, 0, 181, 147, 183, 149, 0, 0, 0, 0, 0, 0, 0, 157, 192, 159, 194
];

XML.EXPECTED =
[
  /*   0 */ 4, 68, 132, 188, 222, 206, 215, 303, 305, 211, 219, 241, 251, 231, 484, 255, 259, 271, 278, 285, 281, 300,
  /*  22 */ 244, 247, 209, 228, 232, 295, 312, 315, 291, 411, 225, 305, 294, 296, 267, 405, 319, 305, 413, 328, 305,
  /*  43 */ 262, 266, 336, 408, 305, 411, 414, 305, 294, 264, 381, 337, 410, 305, 412, 210, 294, 267, 385, 305, 458,
  /*  64 */ 438, 384, 305, 305, 335, 410, 305, 341, 305, 350, 305, 305, 305, 288, 360, 232, 357, 344, 322, 346, 354,
  /*  85 */ 438, 370, 374, 233, 274, 378, 389, 305, 305, 402, 363, 445, 424, 393, 399, 324, 418, 330, 443, 304, 425,
  /* 106 */ 305, 395, 323, 431, 437, 331, 444, 305, 423, 394, 237, 429, 435, 305, 362, 303, 421, 305, 395, 476, 430,
  /* 127 */ 436, 442, 303, 305, 366, 478, 449, 363, 365, 477, 462, 364, 476, 466, 473, 470, 482, 305, 305, 305, 305,
  /* 148 */ 305, 452, 305, 305, 237, 457, 234, 455, 305, 455, 305, 456, 237, 305, 305, 305, 305, 307, 305, 236, 305,
  /* 169 */ 305, 305, 305, 305, 307, 235, 305, 305, 305, 305, 305, 305, 305, 308, 305, 305, 305, 305, 305, 305, 305,
  /* 190 */ 306, 305, 305, 305, 305, 305, 307, 305, 305, 305, 305, 305, 305, 305, 305, 305, 128, 256, 8192, 65536,
  /* 210 */ 1048576, 0, 0, 0, 12, 131072, 1048576, 4194304, 16777216, 20, 1048580, 4, 4, 8, 16, 64, 8192, 1048576, 0, 0,
  /* 230 */ 0, 134217728, 0x80000000, 0, 0, 0, 2, 0, 0, 0, 4, 4, 4194312, 33554440, 8, 64, 64, 128, 256, 256, 8192, 128,
  /* 252 */ 16908288, 1140850688, 67108864, 1140850692, 67108868, 134217732, -2147483644, 4, 34603016, -2147483640, 32,
  /* 263 */ 32, 32, 32, 0, 1024, 2048, 262144, 524288, 33554432, 201326592, 1140850688, 0, 0, 0, 234882048, 3078,
  /* 279 */ 34603020, 16908356, 3076, 805306372, 3076, 1946157060, 201326596, 1140850692, 2883648, 0, 0, 1, 512, 32768,
  /* 293 */ 3072, 0, 0, 32, 32, 0, 0, 8412160, 8412672, 35844, 33554432, 67108864, 0, 0, 0, 0, 1, 0, 0, 0, 3072,
  /* 314 */ 2883584, 3072, 16384, 7168, 512, 5120, 512, 32768, 1024, 0, 0, 0, 116, 16384, 64, 1048576, 0, 0, 0, 2097152,
  /* 334 */ 536870912, 0, 524288, 2097152, 0, 2048, 16384, 0, 2097152, 0, 4096, 0, 0, 1024, 2098176, 134218752, 4096, 0,
  /* 352 */ 4096, 4096, -2147479552, 100663296, 1073741824, 0, 0, 512, 1024, 4096, 2097152, 536870912, 0x80000000, 0, 0,
  /* 367 */ 8, 0, 4, 134218752, 0, 1024, 100663296, 40960, 0, 0, -1610608640, 10, 3072, 266, 2048, 2048, 262144, 524288,
  /* 385 */ 2097152, 0, 4096, 0, 130, 130, 268435572, 31408128, 32768, 0, 0, 8, 256, 0, 264, 0, 128, 0, 0, 4096,
  /* 405 */ 2097152, 1024, 2048, 16384, 16384, 4096, 0, 0, 0, 64, 64, 64, 1048576, 196608, 1835008, 29360128, 0, 0,
  /* 423 */ 32768, 0, 0, 0, 8192, 32768, 48, 64, 16384, 196608, 1572864, 12582912, 1572864, 12582912, 16777216, 0, 0, 0,
  /* 441 */ 1024, 0, 536870912, 0x80000000, 0, 33554432, 67108864, 1073741824, 1048576, 12582912, 16777216, 0, 1, 4, 0,
  /* 456 */ 4, 4, 0, 0, 0, 1048576, 65536, 12582912, 16777216, 536870912, 64, 65536, 8388608, 16777216, 4, 16, 64,
  /* 473 */ 0x80000000, 0, 8, 0, 4, 16, 32, 64, 196608, 0, 64, 0, 0, 0, 33554444
];

XML.TOKEN =
[
  "(0)",
  "EOF",
  "S",
  "Name",
  "Nmtoken",
  "EntityValue",
  "AttValue",
  "SystemLiteral",
  "PubidLiteral",
  "CharData",
  "Comment",
  "PI",
  "CDSect",
  "VersionNum",
  "CharRef",
  "PEReference",
  "EncName",
  "'\"'",
  "'#FIXED'",
  "'#IMPLIED'",
  "'#PCDATA'",
  "'#REQUIRED'",
  "'%'",
  "'&'",
  "''''",
  "'('",
  "')'",
  "')*'",
  "'*'",
  "'+'",
  "','",
  "'/>'",
  "';'",
  "'<'",
  "'<!ATTLIST'",
  "'<!DOCTYPE'",
  "'<!ELEMENT'",
  "'<!ENTITY'",
  "'<!NOTATION'",
  "'</'",
  "'<?xml'",
  "'='",
  "'>'",
  "'?'",
  "'?>'",
  "'ANY'",
  "'CDATA'",
  "'EMPTY'",
  "'ENTITIES'",
  "'ENTITY'",
  "'ID'",
  "'IDREF'",
  "'IDREFS'",
  "'NDATA'",
  "'NMTOKEN'",
  "'NMTOKENS'",
  "'NOTATION'",
  "'PUBLIC'",
  "'SYSTEM'",
  "'['",
  "']'",
  "'encoding'",
  "'no'",
  "'standalone'",
  "'version'",
  "'yes'",
  "'|'"
];

                                                            // line 207 "XML.ebnf"
                                                            });
                                                            // line 1827 "XML.js"
// End
