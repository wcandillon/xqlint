// This file was generated on Tue Mar 12, 2013 05:31 (UTC+01) by REx v5.24 which is Copyright (c) 1979-2013 by Gunther Rademacher <grd@gmx.net>
// REx command line: JSON.ebnf -tree -javascript -a xqlint

                                                            // line 2 "JSON.ebnf"
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
                                                            var XQueryParser = exports.XQueryParser = function XQueryParser(string, parsingEventHandler)
                                                            {
                                                              init(string, parsingEventHandler);
                                                            // line 40 "JSON.js"
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

  this.getOffendingToken = function(e)
  {
    var o = e.getOffending();
    return o >= 0 ? JSON.TOKEN[o] : null;
  };

  this.getExpectedTokenSet = function(e)
  {
    var expected;
    if (e.getExpected() < 0)
    {
      expected = JSON.getTokenSet(- e.getState());
    }
    else
    {
      expected = [JSON.TOKEN[e.getExpected()]];
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

  this.parse_json = function()
  {
    eventHandler.startNonterminal("json", e0);
    lookahead1W(6);                 // string | number | whitespace^token | '[' | 'false' | 'null' | 'true' | '{'
    whitespace();
    parse_value();
    lookahead1W(0);                 // eof | whitespace^token
    shift(1);                       // eof
    eventHandler.endNonterminal("json", e0);
  };

  function parse_object()
  {
    eventHandler.startNonterminal("object", e0);
    shift(12);                      // '{'
    lookahead1W(3);                 // string | whitespace^token | '}'
    if (l1 == 2)                    // string
    {
      whitespace();
      parse_pair();
      for (;;)
      {
        lookahead1W(5);             // whitespace^token | ',' | '}'
        if (l1 != 5)                // ','
        {
          break;
        }
        shift(5);                   // ','
        lookahead1W(1);             // string | whitespace^token
        whitespace();
        parse_pair();
      }
    }
    shift(13);                      // '}'
    eventHandler.endNonterminal("object", e0);
  }

  function parse_pair()
  {
    eventHandler.startNonterminal("pair", e0);
    shift(2);                       // string
    lookahead1W(2);                 // whitespace^token | ':'
    shift(6);                       // ':'
    lookahead1W(6);                 // string | number | whitespace^token | '[' | 'false' | 'null' | 'true' | '{'
    whitespace();
    parse_value();
    eventHandler.endNonterminal("pair", e0);
  }

  function parse_array()
  {
    eventHandler.startNonterminal("array", e0);
    shift(7);                       // '['
    lookahead1W(7);                 // string | number | whitespace^token | '[' | ']' | 'false' | 'null' | 'true' | '{'
    if (l1 != 8)                    // ']'
    {
      whitespace();
      parse_value();
      for (;;)
      {
        lookahead1W(4);             // whitespace^token | ',' | ']'
        if (l1 != 5)                // ','
        {
          break;
        }
        shift(5);                   // ','
        lookahead1W(6);             // string | number | whitespace^token | '[' | 'false' | 'null' | 'true' | '{'
        whitespace();
        parse_value();
      }
    }
    shift(8);                       // ']'
    eventHandler.endNonterminal("array", e0);
  }

  function parse_value()
  {
    eventHandler.startNonterminal("value", e0);
    switch (l1)
    {
    case 2:                         // string
      shift(2);                     // string
      break;
    case 3:                         // number
      shift(3);                     // number
      break;
    case 12:                        // '{'
      parse_object();
      break;
    case 7:                         // '['
      parse_array();
      break;
    case 11:                        // 'true'
      shift(11);                    // 'true'
      break;
    case 9:                         // 'false'
      shift(9);                     // 'false'
      break;
    default:
      shift(10);                    // 'null'
    }
    eventHandler.endNonterminal("value", e0);
  }

  function shift(t)
  {
    if (l1 == t)
    {
      whitespace();
      eventHandler.terminal(JSON.TOKEN[l1], b1, e1 > size ? size : e1);
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
      if (code != 4)                // whitespace^token
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

  function error(b, e, s, l, t)
  {
    throw new self.ParseException(b, e, s, l, t);
  }

  var lk, b0, e0;
  var l1, b1, e1;
  var eventHandler;

  var input;
  var size;
  var begin;
  var end;

  function match(tokenSetId)
  {
    begin = end;
    var current = end;
    var result = JSON.INITIAL[tokenSetId];
    var state = 0;

    for (var code = result & 63; code != 0; )
    {
      var charclass;
      var c0 = current < size ? input.charCodeAt(current) : 0;
      ++current;
      if (c0 < 0x80)
      {
        charclass = JSON.MAP0[c0];
      }
      else if (c0 < 0xd800)
      {
        var c1 = c0 >> 5;
        charclass = JSON.MAP1[(c0 & 31) + JSON.MAP1[(c1 & 31) + JSON.MAP1[c1 >> 5]]];
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
        var lo = 0, hi = 1;
        for (var m = 1; ; m = (hi + lo) >> 1)
        {
          if (JSON.MAP2[m] > c0) hi = m - 1;
          else if (JSON.MAP2[2 + m] < c0) lo = m + 1;
          else {charclass = JSON.MAP2[4 + m]; break;}
          if (lo > hi) {charclass = 0; break;}
        }
      }

      state = code;
      var i0 = (charclass << 5) + code - 1;
      code = JSON.TRANSITION[(i0 & 7) + JSON.TRANSITION[i0 >> 3]];

      if (code > 63)
      {
        result = code;
        code &= 63;
        end = current;
      }
    }

    result >>= 6;
    if (result == 0)
    {
      end = current - 1;
      var c1 = end < size ? input.charCodeAt(end) : 0;
      if (c1 >= 0xdc00 && c1 < 0xe000) --end;
      return error(begin, end, state, -1, -1);
    }

    return (result & 15) - 1;
  }
}

JSON.getTokenSet = function(tokenSetId)
{
  var set = [];
  var s = tokenSetId < 0 ? - tokenSetId : INITIAL[tokenSetId] & 63;
  for (var i = 0; i < 14; i += 32)
  {
    var j = i;
    var i0 = (i >> 5) * 32 + s - 1;
    var f = JSON.EXPECTED[(i0 & 3) + JSON.EXPECTED[i0 >> 2]];
    for ( ; f != 0; f >>>= 1, ++j)
    {
      if ((f & 1) != 0)
      {
        set.push(JSON.TOKEN[j]);
      }
    }
  }
  return set;
};

JSON.MAP0 =
[
  /*   0 */ 29, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2,
  /*  36 */ 2, 2, 2, 2, 2, 2, 2, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 2, 2, 2, 2, 2, 2, 12, 12, 12,
  /*  68 */ 12, 13, 12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 14, 15, 16, 2, 2, 2, 17, 18, 12, 12,
  /* 101 */ 19, 20, 2, 2, 2, 2, 2, 21, 2, 22, 2, 2, 2, 23, 24, 25, 26, 2, 2, 2, 2, 2, 27, 2, 28, 2, 2
];

JSON.MAP1 =
[
  /*   0 */ 54, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58,
  /*  27 */ 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58,
  /*  54 */ 90, 122, 181, 212, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149,
  /*  76 */ 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 149, 29, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
  /* 102 */ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 4, 5, 6, 7, 8,
  /* 138 */ 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  /* 171 */ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 12, 12, 12, 12, 13, 12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  /* 205 */ 2, 2, 2, 14, 15, 16, 2, 2, 17, 18, 12, 12, 19, 20, 2, 2, 2, 2, 2, 21, 2, 22, 2, 2, 2, 23, 24, 25, 26, 2, 2,
  /* 236 */ 2, 2, 2, 27, 2, 28, 2, 2
];

JSON.MAP2 =
[
  /* 0 */ 57344, 65536, 65533, 1114111, 2, 2
];

JSON.INITIAL =
[
  /* 0 */ 1, 2, 3, 4, 5, 6, 7, 8
];

JSON.TRANSITION =
[
  /*   0 */ 129, 129, 129, 129, 120, 127, 129, 129, 129, 137, 129, 129, 147, 178, 128, 129, 129, 137, 167, 129, 248,
  /*  21 */ 137, 129, 129, 139, 137, 167, 129, 129, 188, 129, 129, 129, 137, 128, 129, 324, 201, 214, 222, 288, 230,
  /*  42 */ 214, 222, 321, 137, 129, 129, 129, 137, 348, 235, 129, 243, 170, 235, 193, 137, 129, 129, 129, 256, 128,
  /*  63 */ 129, 277, 137, 129, 129, 129, 266, 348, 235, 129, 137, 154, 235, 129, 243, 170, 338, 180, 137, 154, 235,
  /*  84 */ 129, 137, 272, 285, 258, 137, 128, 129, 129, 296, 128, 129, 129, 137, 129, 304, 306, 137, 128, 129, 129,
  /* 105 */ 314, 332, 129, 206, 137, 129, 129, 161, 137, 129, 129, 346, 129, 129, 129, 329, 329, 329, 329, 329, 329,
  /* 126 */ 329, 329, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 11, 11, 0, 10, 0, 10, 0, 0, 10, 10, 0, 0, 0,
  /* 158 */ 0, 0, 29, 0, 0, 0, 896, 0, 896, 0, 0, 25, 0, 0, 0, 0, 0, 0, 29, 19, 0, 192, 0, 0, 0, 0, 0, 0, 14, 14, 0, 10,
  /* 190 */ 0, 18, 18, 0, 0, 0, 0, 0, 0, 512, 512, 0, 10, 268, 0, 269, 0, 0, 0, 0, 0, 0, 832, 832, 0, 280, 281, 0, 0, 0,
  /* 220 */ 29, 280, 281, 0, 0, 0, 31, 0, 32, 10, 0, 10, 269, 0, 269, 0, 0, 0, 0, 31, 0, 32, 10, 0, 10, 0, 19, 19, 0, 0,
  /* 250 */ 0, 0, 384, 384, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 15, 15, 0, 10, 0, 0, 0, 20, 0, 0, 0, 26, 27, 0, 0, 0, 0, 576,
  /* 282 */ 0, 0, 576, 0, 0, 704, 0, 0, 0, 0, 0, 0, 269, 269, 0, 10, 0, 0, 0, 0, 0, 22, 0, 30, 0, 0, 0, 0, 0, 0, 16, 16,
  /* 314 */ 0, 10, 0, 0, 0, 0, 21, 0, 0, 448, 0, 0, 0, 0, 0, 0, 268, 268, 23, 0, 0, 0, 0, 28, 0, 0, 0, 768, 31, 640, 32,
  /* 345 */ 10, 128, 0, 0, 0, 0, 0, 0, 0, 29, 0
];

JSON.EXPECTED =
[
  /*  0 */ 8, 12, 16, 21, 17, 23, 21, 27, 18, 20, 80, 8212, 304, 8240, 7836, 8092, 16, 4, 8, 8, 512, 8, 512, 1024, 2048,
  /* 25 */ 4, 8, 4, 512, 4, 4
];

JSON.TOKEN =
[
  "(0)",
  "eof",
  "string",
  "number",
  "whitespace",
  "','",
  "':'",
  "'['",
  "']'",
  "'false'",
  "'null'",
  "'true'",
  "'{'",
  "'}'"
];

                                                            // line 79 "JSON.ebnf"
                                                            });
                                                            // line 453 "JSON.js"
// End
