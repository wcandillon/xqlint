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

  var FormatWriter = require('../FormatWriter').FormatWriter;
  var CommentParser = require('../CommentParser').CommentParser;
  var CommentHandler = require('../CommentHandler').CommentHandler;


  var CodeFormatter = exports.CodeFormatter = function(ast, newLinesEnabled, DEBUG) {

//    DEBUG = true;

    if (newLinesEnabled === undefined) {
      newLinesEnabled = true;
    }
    
    function debugMsg(msg){
      if (DEBUG && writer.newLinesEnabled){
        console.log(msg);
      }
    }

    /* These nodes will ignore WS and be formatted.
     * Note that if a child node of one of these nodes is in 'ignoreNodes',
     * that child node will not be formatted. I.e., the most specific
     * setting is used.
     */
    var formatNodes = ['DefaultNamespaceDecl', 'Setter', 'NamespaceDecl',  
'Import',  'FTOptionDecl', 'ContextItemDecl', 'AnnotatedDecl', 'OptionDecl', 
'FunctionDecl', 'FunctionCall', 'Expr', 'IfExpr', 'TypeswitchExpr', 'ParenthesizedExpr', 
'AdditiveExpr', 'VersionDecl', 'FLWORExpr', 'Statement', 'ComparisonExpr', 
'BlockExpr', 'BlockStatement', 'ApplyStatement', 'AssignStatement',
'BreakStatement', 'ContinueStatement', 'ExitStatement', 'FLWORStatement',
'IfStatement', 'SwitchStatement', 'TryCatchStatement', 'TypeswitchStatement', 
'VarDeclStatement', 'WhileStatement', 'ReturnClause', 'ReturnStatement', 'Separator',
'Comment'
 ];

    /* These nodes (and their children, unless they are in 'formatNodes')
     * will print WS and not be formatted. */
    var ignoreNodes = ['XQuery', 'StatementsAndOptionalExpr', 'Statements', 'DirElemConstructor']; 

    var noSpaceRight = ['$', '(', '[', '/', '//', '@', '%', '::'];
    var noSpaceLeft = [',', ')', '[', ']', '*', '/', '//', ';', '::'];

    var lastToken = 'INIT';          // If the previously written node was a TOKEN, this variable contains the value of that node
    // It has a nonempty initial value for the special case that the query starts with a '+' or '-'
    // in order to detect that it is a prefix operator.


    var options = {
      MAX_LINE_LENGTH:      80,     // Max length of one line of code without wrap
      MAX_IF_LENGTH:        60,     // Max length of an IfExpr without wrap
      MAX_RETURN_LENGTH:    20,     // Max length of a Return without wrap

      BLANKS_VERSIONDECL:   2,      // #blank lines after a VersionDecl
      BLANKS_MODULEDECL:    2,      // #blank lines after a ModuleDecl
      BLANKS_FUNCTIONDECL:  1,      // #blank lines after a FunctionDecl 
      BLANKS_PROLOGITEM:    1,      // #blank lines after all other items in a Prolog

      PREBLANKS_COMMENT:    1,      // #blank lines before a Comment
      
      indent: "    "
    }

    var writer = new FormatWriter(options.indent, options.MAX_LINE_LENGTH); 
    writer.DEBUG = DEBUG;
    writer.newLinesEnabled = newLinesEnabled;

    var wsToggled = false;
    var wsEnabled = true;        // Default setting for whitespace handling. Specialized by formatNodes/ignoreNodes.

    // Keeps track of what the next visited separator separates.
    var separatorStack = [];     

    // When visiting a separator via the default handler, the separatorStack is consumed up to one of these nodes.
    // Note: These nodes are actually the possible children of a Prolog node and always followed by a separator.
    var separatorBase = ['DefaultNamespaceDecl', 'Setter', 'NamespaceDecl', 'Import', 'FTOptionDecl', 'ContextItemDecl', 'AnnotatedDecl', 'OptionDecl'];


    function isWS(str){
      return !(/\S/.test(str));
    }

    function pushIndent() {
      debugMsg("pushIndent() -> indent = " + (writer.indentAmount + 1));
      writer.pushIndent();
    }

    function popIndent() {
      debugMsg("popIndent() -> indent = " + (writer.indentAmount - 1)); 
      writer.popIndent();
    }


    function postSpace(forceSpace){
      if (skipNextSpace === true) { 
        skipNextSpace = false;
      }  else if (!wsEnabled || forceSpace){ 
        writer.postSpace();
      }
    }

    function postNewLine(count){
      if (count === undefined) { 
        count = 1;
      } 
      writer.postNewLine(count);
    }

    function appendStr(str){
      writer.appendStr(str);
    }

    var skipNextSpace = false;  // Global variable to force skipping next space
    
    // Global variable to determine wether the previously 
    // written TOKEN is a prefix operator
    var prefixOp      = true;   

    function appendValue(node, forceSkipSpace){
      debugMsg("appendvalue(node=\"" + node.name + "\" : \"" + node.value + "\", forceSkipSpace=" + forceSkipSpace + ")");
      if (skipNextSpace){
        forceSkipSpace = true;
        skipNextSpace = false;
      }

      var nodeValue = getNodeValue(node);

      if (!forceSkipSpace){

        // Check if we have to prepend a space
        // 0. Previous written char mustn't be whitespace
        // 1. Previous token (if any) must allow appending spaces and not be a prefix operator (+, - could be)
        // 2. Current node mustn't be Whitespace
        // 3. If current node is a TOKEN, its value must allow prepending spaces
        if (!(isWS(writer.lastChar())) &&
            !prefixOp && noSpaceRight.indexOf(lastToken) === -1 &&
            !(node.name === "WS" && isWS(getNodeValue(node)[0])) &&
            (!(node.name === "TOKEN") || noSpaceLeft.indexOf(nodeValue) === -1)){
          if (wsToggled) {
            postSpace(true);
          } else {
            postSpace();
          }
        }
      }

      // If ws is enabled (i.e. we are in a no-format node), nodeValue
      // is non-empty and we just have indentation on the current line,
      // remove the indentation and write the value to its original position
      if (wsEnabled && nodeValue.length > 0 && writer.isEmpty()){
        writer.resetLine();
        for (var i = 0; i < node.pos.sc; i++){
          writer.appendStr(' ');
        }
      }

      // Append the node value
      appendStr(nodeValue);

      // Update prefixOp
      var prefixOpExceptions = ['!', '.'];
      if (node.name === "TOKEN" && (nodeValue === '+' || nodeValue === '-') && lastToken.length > 0
          && prefixOpExceptions.indexOf(lastToken) === -1){
        prefixOp = true;
      } else {
        prefixOp = false;
      }

      // Update lastToken
      if (node.name === "TOKEN"){
        lastToken = nodeValue; 
      }else{
        lastToken = "";
      }

      wsToggled = false;
      debugMsg("wsToggled=" + wsToggled);
    }

    function getNodeValue(node) {
      var value = "";
      if(node.value === undefined) {
        for(var i in node.children)
        {
          var child = node.children[i];
          value += getNodeValue(child);
        }
      } else {
        value += node.value;
      }
      return value;
    }


    //==========================================================================
    //    NODE HANDLERS
    //==========================================================================

    this.everythingElse = function(node) {
      if(node.value !== undefined) {
        appendValue(node);
      }else{
        this.visitChildren(node);
      }
      return true;
    };

    this.VersionDecl = function(node) {
      this.everythingElse(node);
      postNewLine(options.BLANKS_VERSIONDECL + 1);
      return true;
    };

    this.ModuleDecl = function(node) {
      this.everythingElse(node);
      postNewLine(options.BLANKS_MODULEDECL + 1);
      return true;
    };

    this.Separator = function(node) {
      if (separatorStack.length > 0){

          debugMsg("Visiting Separator, separatorStack is: [" + separatorStack.join(', ') + "]");
        // Retrieve the info which node this is a separator for
        var lastNode = separatorStack.pop();
        if (separatorBase.indexOf(lastNode) === -1){
          // Consume from stack until a separatorBase is reached
          while (separatorStack.length > 0 && 
              separatorBase.indexOf(separatorStack.pop()) === -1)
          { }
        }
        debugMsg("separatorStack is now: [" + separatorStack.join(', ') + "]");
        

        // Append separator value, skipping space
        appendValue(node, true);

        // Apply special behavior according to lastNode
        if (lastNode === 'FunctionDecl'){
          // Blanks after FunctionDecl
          postNewLine(options.BLANKS_FUNCTIONDECL + 1);
        } else if (separatorBase.indexOf(lastNode) !== -1){
          postNewLine(options.BLANKS_PROLOGITEM + 1); 
        }

      }else{
        debugMsg("Warning: visit separator, empty separatorStack");
        appendValue(node, true); // Skip space
      }
      return true;
    };

    this.ReturnClause = this.ReturnStatement = function(node) {
      if (this.FormatOneLine(node, options.MAX_RETURN_LENGTH)){
        return true;
      } else{
        var Handler = function(superHandler) {
          this.TOKEN = function(node){
            if (node.value === 'return'){
              superHandler[node.name](node);
              pushIndent();
            }
          };

          this.ExprSingle = function(node){
            postNewLine();
            superHandler[node.name](node);
            popIndent();
          };

          this.Statement = function(node) {
            return this.ExprSingle(node);
          }
        };
        this.visitChildren(node, new Handler(this));
      } 
      return true;
    };

    this.WS = function(node) {
      var wsCode = getNodeValue(node);
      //console.log("WS:\n" + wsCode);
      var h = new CommentHandler(wsCode);
      var parser = new CommentParser(wsCode, h);
      parser.parse_Comments();
      var commentAst = h.getParseTree();
      //console.log(JSON.stringify(commentAst));
      this.visit(commentAst);

      return true;
    };
    
    this.EOF = function(node) {
      // Comments are parsed with an ending EOF - avoid
      // writing a space before this node
      return true;
    };

    this.Comments = function(node) {
      return this.everythingElse(node);
    };

    // Whitespace in a comment AST
    this.S = function(node) {
      if (wsEnabled) {
        appendValue(node);
      }
      return true;
    };

    this.Comment = function(node) {
      var Handler = function(superHandler) {

        // Position after the opening '(:' on the line 
        var postStartTag = 0;
        var startLine = 0;

        this.TOKEN = function(node) {
          if (node.value === '(:') {
            postStartTag = node.pos.sc + 2;
            startLine = node.pos.sl;
            appendStr('(');
            writer.pushIndentBase();
            writer.pushLineStartStr(': ');
            appendStr(': ');
          }else if (node.value === ':)') {
            writer.popLineStartStr();
            var prevWord = writer.backOneWord();
            if (node.pos.sl > startLine && prevWord === ""){
              // multiline comment and writer.isEmpty(), starting with ': '
              var curLine = writer.curLine;
              writer.curLine = curLine.substring(0, curLine.length - 1);
              writer.appendStr(')');
            } else {
              // oneline comment and/or last line is not empty
              
              if (prevWord !== ""){
                writer.appendStr(prevWord);
              }
              if (!isWS(writer.lastChar())){
                postSpace(true);
              }
              appendValue(node);
            }
            writer.popIndentBase();
         }
          return true;
        }; 

        this.CommentContents = function(node) {
          var content = getNodeValue(node); 
          var parts = content.split('\n');
          
          // Find minimum indentation of the lines
          // This indentation will be subtracted from all lines before 
          // being written, in order to align on the left
          var firstLine = parts[0];
          if (isWS(firstLine)){
            var minIndent = 10000;
          }else {
          var curIdx = 0;
            while (curIdx < firstLine.length){
              if (!isWS(firstLine[curIdx])){
                break;
              }
              curIdx++;
            }
            var minIndent = postStartTag + curIdx;
          }

          for (var i = 1; i < parts.length; i++){
            if (isWS(parts[i])){
              continue;
            }
            var curIdx = 0;
            while (curIdx < minIndent && curIdx < parts[i].length){
              if (parts[i][curIdx] !== ':' && !isWS(parts[i][curIdx])){
                break;
              }
              curIdx++;
            }
            if (curIdx < minIndent){
              minIndent = curIdx;
            }
          }
          if (minIndent == 10000){
            minIndent = 0;
          }
           
          var firstLineStart = minIndent - postStartTag;
          if (firstLineStart <= 0){
            // Special case where the lines after the first line start further left
            firstLineStart = 0;
            while (firstLineStart < firstLine.length && 
                isWS(firstLine[firstLineStart])){
              firstLineStart++;
            }
          }
         
          //console.log("postStartTag: " + postStartTag);
          //console.log("minIndent: " + minIndent);
          //console.log("firstLineStart: " + minIndent);
          
          appendStr(firstLine.substring(firstLineStart));
          if (parts.length > 1){
            appendStr('\n');
          }
          for (var i = 1; i < parts.length; i++){
            var curPart = parts[i].substring(minIndent);
            var idx = 0;
            if (i < parts.length - 1){
              curPart += '\n';
            }
            appendStr(curPart.substring(idx));
          }          
          return true;
        };


      }; 

      if (options.PREBLANKS_COMMENT > 0 &&
          !(writer.isEmpty() && writer.result === "")){
        if (writer.isEmpty()){
          postNewLine(options.PREBLANKS_COMMENT);
        }
      }
  
      var prev_clearBlankLines = writer.clearBlankLines;
      var prev_ignoreWSIndent = writer.ignoreWSIndent;
      writer.clearBlankLines = false;
      writer.ignoreWSIndent = false;

      this.visitChildren(node, new Handler(this));

      writer.clearBlankLines = prev_clearBlankLines;
      writer.ignoreWSIndent = prev_ignoreWSIndent;
      
      return true;
    };

    this.TOKEN = function(node) {
      appendValue(node);
      return false;
    };

    var inIfExprIfStatement = false;
    this.IfExpr = this.IfStatement = function(node){
      var switched = false;
      if (!inIfExprIfStatement){
        inIfExprIfStatement = true;
        switched = true;
        if (this.FormatOneLine(node, options.MAX_IF_LENGTH)){
          return true;
        } 
      }
      var Handler = function(superHandler) {
        this.ExprSingle = this.Statement = function(node){
          if (lastToken === 'else' && 
              (node.children[0].name === 'IfExpr' || node.children[0].name === 'IfStatement')){
            // 'if' of an 'else if', don't post a newline
            return superHandler.ExprSingle(node);
          } else{
            pushIndent();
            postNewLine();
            superHandler[node.name](node);
            popIndent();
            postNewLine();
            return true;
          }
        };

      }; 

      this.visitChildren(node, new Handler(this));
      if (switched){
        inIfExprIfStatement = false;
      }
      return true;
    };


    this.MultiplicativeExpr = function(node){
      var Handler = function(superHandler) {
        this.TOKEN = function(node){
          if (noSpaceLeft.indexOf(node.value) !== -1){
            // Ensure space e.g. for '*' in MultiplicativeExpr
            postSpace();
          }
          return superHandler.TOKEN(node);
        };
      }; 

      this.visitChildren(node, new Handler(this));
      return true;
    };

    this.TypeswitchExpr = function(node) {
      var Handler = function(superHandler) {
        this.CaseClause = function(node) {
          pushIndent();
          postNewLine();
          superHandler[node.name](node);
          popIndent();
        };

        this.TOKEN = function(node) {
          if (node.value === 'default'){
            pushIndent();
            postNewLine();
            superHandler[node.name](node);
            popIndent();
          }else if (node.value === 'return'){
            pushIndent();
            pushIndent();
            postNewLine();
            superHandler[node.name](node);
            popIndent();
            popIndent();
          }else{
            superHandler[node.name](node);
          }
        };

      };

      this.visitChildren(node, new Handler(this));
      postNewLine();
      return true;
    };

    this.CaseClause = function(node) {
      var Handler = function(superHandler) {
        this.SequenceTypeUnion = function(node) {
          superHandler[node.name](node);
          pushIndent();
          postNewLine();
        };

        this.ExprSingle = function(node) {
          superHandler[node.name](node);
          popIndent();
        };
      };

      this.visitChildren(node, new Handler(this));
      return true;
    };

    this.DocumentTest = function(node){
      return this.AllKindTests(node);
    };

    this.ElementTest = function(node){
      return this.AllKindTests(node);
    };

    this.AttributeTest = function(node){
      return this.AllKindTests(node);
    };

    this.SchemaElementTest = function(node){
      return this.AllKindTests(node);
    };

    this.SchemaAttributeTest = function(node){
      return this.AllKindTests(node);
    };

    this.PITest = function(node){
      return this.AllKindTests(node);
    };

    this.CommentTest = function(node){
      return this.AllKindTests(node);
    };

    this.TextTest = function(node){
      return this.AllKindTests(node);
    };

    this.NamespaceNodeTest = function(node){
      return this.AllKindTests(node);
    };

    this.JSONTest = function(node){
      return this.AllKindTests(node);
    };

    this.AnyKindTest = function(node){
      return this.AllKindTests(node);
    };

    this.AllKindTests = function(node) {
      var Handler = function(superHandler) {
        this.TOKEN = function(node) {
          if (node.value === '('){
            // Opening bracket of a kindtest - no space to the left
            appendValue(node, true);
          } else {
            superHandler.TOKEN(node); 
          }
          return true;
        };
      };

      this.visitChildren(node, new Handler(this));
      return true;
    };

    this.ArgumentList = function(node){
      var Handler = function(superHandler) {
        var wasMultiLine = false; // was last written arg multiline?
        this.TOKEN = function(node) {
          if (node.value === '(') {
            // Opening bracket of Argumentlist - no space to the left
            appendValue(node, true);
            writer.pushIndentBase();
          } else if (node.value === ')') {
            appendValue(node, true);
            writer.popIndentBase();
          } else if (node.value === ',' && wasMultiLine) {
            // Post newline after multiline arg
            appendValue(node, true);
            postNewLine();
            wasMultiLine = false;
          } else {
            superHandler.TOKEN(node);
          }
          return true;
        };

        this.Argument = function(node) {
          // Test if arg is multiline
          var f = new CodeFormatter(node,true,false); 
          var formatted = f.format();
          if (formatted.indexOf('\n') !== -1){
            // multiline arg
            postNewLine();
            superHandler.Argument(node);
            wasMultiLine = true;
          }else{
            superHandler.Argument(node);
          }
          return true;
        };

      };
      this.visitChildren(node, new Handler(this));
      return true;
    };

    this.Annotation = function(node) {
      var Handler = function(superHandler) {
        this.TOKEN = function(node) {
          if (node.value === '('){
            appendValue(node, true); // Skip space of opening bracket
            return true;
          }else {
            return superHandler.TOKEN(node);
          }
        };
      };
      this.visitChildren(node, new Handler(this));
      return true;
    };
  
    this.FunctionDecl = function(node) {
      var Handler = function(superHandler) {
        this.skipSpace = false;
        this.EQName = function(node){
          superHandler.EQName(node);
          this.skipSpace = true; // No space between funcname and paramlist  
        };

        this.TOKEN = function(node){
          var val = node.value; 
          if (val === 'as'){
            // Return type on new line, align with function decl
            postNewLine();
            superHandler.TOKEN(node);
          } 
          else if (val === '{'){
            // Opening function bracket
            postNewLine();
            appendValue(node);
            pushIndent();
            postNewLine();
          } else if (val === '}'){
            // Closing function bracket
            popIndent();
            postNewLine();
            appendValue(node);
            separatorFor = "FunctionDecl";
          }else if (val === '(' && this.skipSpace){
            // Bracket opening paramlist
            this.skipSpace = false; 
            appendValue(node, true); 
          }else{
            superHandler.TOKEN(node);
          }
          return true;
        };
      }; 

      this.visitChildren(node, new Handler(this));
      separatorStack.push(node.name); // Need special handling of Separator after FunctionDecl
      return true;
    };

    /*
     * Expr     ::= ExprSingle ( ',' ExprSingle )*
     *
     * In order to ensure spaces after ',' we need to handle this node separately,
     * because the ExprSingle after a comma could be a non-format node and not start 
     * with a space.
     * TODO this should become obsolete by ensuring space when entering WS-node.
     * */
    /*
    this.Expr = function(node) {
      var Handler = function(superHandler) {

        this.afterComma = false;

        this.TOKEN = function(node){
          if (node.value === ','){
            appendValue(node);
            postSpace();
            this.afterComma = true;
            return true;
          } else {
            return superHandler.TOKEN(node);
          }
        };

        this.ExprSingle = function(node){
          if (this.afterComma){
            // The space after the ',' is already written
            // by this.TOKEN
            skipNextSpace = true;
          }
          return superHandler.ExprSingle(node);
        };

      }; 

      this.visitChildren(node, new Handler(this));
      return true;
    };*/

    this.ContextItemDecl = this.LetBinding = function(node){
      pushIndent();
      this.visitChildren(node);
      popIndent();
      return true;
    }

    this.FLWORExpr = this.FLWORStatement = function(node) {
      var Handler = function(superHandler) {
        this.clauseHandler = function(node){
          superHandler[node.name](node);
          postNewLine();
          return true;
        };

        this.InitialClause = function(node){
          return this.clauseHandler(node);
        };

        this.IntermediateClause = function(node){
          return this.clauseHandler(node);
        };

      }; 

      this.visitChildren(node, new Handler(this));
      return true;
    };
    

    this.BlockExpr = this.BlockStatement = function(node) {
      if (this.FormatOneLine(node, options.MAX_LINE_LENGTH)){
        return true;
      } 
      var Handler = function(superHandler) {
        this.TOKEN = function(node){
          if (node.value === '{'){
            appendValue(node, wsToggled);
            pushIndent();
            postNewLine();
            return true;
          }else if (node.value === '}'){
            popIndent();
            postNewLine();
            appendValue(node);
            return true;
          }else {
            return superHandler.TOKEN(node);
          }
        };
      }; 

      this.visitChildren(node, new Handler(this));
      return true;
    };

/*
    this.DirElemConstructor = function(node) {
      if (this.FormatOneLine(node, options.MAX_LINE_LENGTH)){
        return true;
      } 
      var Handler = function(superHandler) {
        this.TOKEN = function(node){
          if (node.value === '<'){
            appendValue(node);
            pushIndent();
            return true;
          }else if (node.value === '/>' || node.value == '</'){
            popIndent();
            appendValue(node);
            return true;
          }else {
            return superHandler.TOKEN(node);
          }
        };
      }; 

      this.visitChildren(node, new Handler(this));
      return true;
    };
*/
/*
    this.DirElemConstructor = function(node) {
      var prev_wsEnabled = wsEnabled;
      wsEnabled = true;
      var val = getNodeValue(node);
      appendStr(val);
      wsEnabled = prev_wsEnabled;
      return true;
    };

    this.DirElemContent = function(node) {
      appendValue(node);
      return true;
    };
*/


    /**
     * Try to format node on one line. Return undefined if already in one-line-mode or
     * if formatting the node on one line would result in a string which is longer than maxLength or contains newlines.
     */
    this.FormatOneLine = function(node, maxLength){
      if (writer.newLinesEnabled == false){
        return false;
      }
      if (node.pos.sl < node.pos.el){
        return false;
      }

      if (maxLength === undefined){
        maxLength = options.MAX_LINE_LENGTH;
      }

      var formatter = new CodeFormatter(node, false, false);

      var resCode = formatter.format();
      
    
     if (resCode.length <= maxLength && resCode.indexOf('\n') == -1 &&
         !(writer.wouldIncreaseLines(resCode))){
        if (!wsToggled && !wsEnabled){
          postSpace();
        }
        
        appendStr(resCode);
        
        lastToken =       formatter.lastToken;
        wsToggled =       formatter.wsToggled;
        wsEnabled =       formatter.wsEnabled;
        prefixOp =        formatter.prefixOp;
        skipNextSpace =   formatter.skipNextSpace;

        return true;
     }else{
        return false;
      }
    };



    this.visit = function(node) {
      debugMsg("ENTER " + node.name); 
      var name = node.name;
      var skip = false;

      if(typeof this[name] === "function")
        skip = this[name](node) === true ? true : false ;
      else
        skip = this.everythingElse(node) === true? true : false ; 
      if(!skip) {
        this.visitChildren(node);
      }
      debugMsg("LEAVE " + node.name); 
    };

    this.visitChildren = function(node, handler) {
      for(var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        if(handler !== undefined && typeof handler[child.name] === "function") {
          handler[child.name](child);
        } else {
          this.visit(child);
        }
      }
    };

    this.astToText = function(node){
      if (node !== undefined){
        var resText = "";
        if (node.value !== undefined) {
          resText += node.value;
        }
        for (var i = 0; i < node.children.length; i++){
          resText += this.astToText(node.children[i]);
        }
        return resText;
      }else{
        return "";
      }
    };

    this.removeWS = function(node){
      for (var i = 0; i < node.children.length; i++){
        if (node.children[i].name === "WS"){
          delete node.children[i];
        }
      }
      node.children = node.children.filter(function(a){return typeof a !== 'undefined';}); 
    };

    this.format = function(opts) {
      //    console.log('Formatting the following xquery code: ' + this.astToText(ast));
      this.visit(ast);
      return writer.getResult();
    };

    this.registerWS = function(funcName, keepWS) {
      var tmpFunc = this[funcName];
      if (tmpFunc === undefined){
        this[funcName] = function (node) {
          return this.everythingElse(node);
        }
        tmpFunc = this[funcName];
      } else if (typeof tmpFunc !== 'function'){
        throw "Can't hook non-function member: " + funcName;
      }
      var nFunc = function() {  
        var prev_wsEnabled = wsEnabled;
        var prev_doIndent = writer.doIndent;
        var prev_ignoreWSIndent = writer.ignoreWSIndent;
        wsEnabled = keepWS;
        if (keepWS){
          writer.doIndent = false;
          writer.ignoreWSIndent = false;
        }else{
          writer.doIndent = true;
          writer.ignoreWSIndent = true;
        }
        if (prev_wsEnabled !== keepWS){
          wsToggled = true;
          debugMsg("wsToggled = " + wsToggled); 
        }
        debugMsg("wsEnabled = " + wsEnabled); 

        if (wsToggled && !wsEnabled && writer.isEmpty()){
          // WS was just set to inactive from active
          // Purge the current line, if it is empty, from starting WS
          // in order to ensure correct indentation
          writer.resetLine();
        }

        var ret = tmpFunc.apply(this, arguments);
        
        wsEnabled = prev_wsEnabled;
        writer.doIndent = prev_doIndent;
        writer.ignoreWSIndent = prev_ignoreWSIndent;

        debugMsg("wsEnabled = " + wsEnabled); 
        return ret; 
      }
      this[funcName] = nFunc;
      //console.log("registerWS(" + funcName + ", " + keepWS + ")");
    };


    // Ensure that at least the base nodes push onto the separator stack. 
    // Child nodes of the base nodes only have to push themselves onto the stack if they require special separator behavior.
    for (var i = 0; i < separatorBase.length; i++){
      var curBase = separatorBase[i];
      if (this[curBase] === undefined){
        this[curBase] = function(node) {
          separatorStack.push(node.name);
          return this.everythingElse(node);
        };
      }
    }

    // Register WS handling of nodes
    for (var i = 0; i < formatNodes.length; i++){
      this.registerWS(formatNodes[i], false);
    }
    for (var i = 0; i < ignoreNodes.length; i++){
      this.registerWS(ignoreNodes[i], true);
    }




    var XQueryNodes = ["XQuery","Module","VersionDecl","LibraryModule","ModuleDecl","Prolog","Separator",
        "Setter","BoundarySpaceDecl","DefaultCollationDecl","BaseURIDecl","ConstructionDecl",
        "OrderingModeDecl","EmptyOrderDecl","CopyNamespacesDecl","PreserveMode","InheritMode",
        "DecimalFormatDecl","DFPropertyName","Import","SchemaImport","SchemaPrefix","ModuleImport",
        "NamespaceDecl","DefaultNamespaceDecl","FTOptionDecl","AnnotatedDecl","CompatibilityAnnotation",
        "Annotation","VarDecl","VarValue","VarDefaultValue","ContextItemDecl","ParamList","Param",
        "FunctionBody","EnclosedExpr","OptionDecl","Expr","FLWORExpr","InitialClause","IntermediateClause",
        "ForClause","ForBinding","AllowingEmpty","PositionalVar","FTScoreVar","LetClause","LetBinding",
        "WindowClause","TumblingWindowClause","SlidingWindowClause","WindowStartCondition",
        "WindowEndCondition","WindowVars","CurrentItem","PreviousItem","NextItem","CountClause",
        "WhereClause","GroupByClause","GroupingSpecList","GroupingSpec","OrderByClause","OrderSpecList",
        "OrderSpec","OrderModifier","ReturnClause","QuantifiedExpr","SwitchExpr","SwitchCaseClause",
        "SwitchCaseOperand","TypeswitchExpr","CaseClause","SequenceTypeUnion","IfExpr","TryCatchExpr",
        "TryClause","TryTargetExpr","CatchClause","CatchErrorList","OrExpr","AndExpr","ComparisonExpr",
        "FTContainsExpr","StringConcatExpr","RangeExpr","AdditiveExpr","MultiplicativeExpr","UnionExpr",
        "IntersectExceptExpr","InstanceofExpr","TreatExpr","CastableExpr","CastExpr","UnaryExpr","ValueExpr",
        "SimpleMapExpr","GeneralComp","ValueComp","NodeComp","ValidateExpr","ValidationMode","ExtensionExpr",
        "Pragma","PathExpr","RelativePathExpr","StepExpr","AxisStep","ForwardStep","ForwardAxis",
        "AbbrevForwardStep","ReverseStep","ReverseAxis","AbbrevReverseStep","NodeTest","NameTest",
        "PostfixExpr","ArgumentList","PredicateList","Predicate","Literal","NumericLiteral","VarRef",
        "VarName","ParenthesizedExpr","ContextItemExpr","OrderedExpr","UnorderedExpr","FunctionCall",
        "Argument","ArgumentPlaceholder","Constructor","DirectConstructor","DirElemConstructor",
        "DirAttributeList","DirAttributeValue","QuotAttrValueContent","AposAttrValueContent","DirElemContent",
        "DirCommentConstructor","DirPIConstructor","ComputedConstructor","CompElemConstructor",
        "CompNamespaceConstructor","Prefix","PrefixExpr","URIExpr","FunctionItemExpr","NamedFunctionRef",
        "InlineFunctionExpr","SingleType","TypeDeclaration","SequenceType","OccurrenceIndicator","ItemType",
        "JSONTest","StructuredItemTest","JSONItemTest","JSONObjectTest","JSONArrayTest","AtomicOrUnionType",
        "KindTest","AnyKindTest","DocumentTest","TextTest","CommentTest","NamespaceNodeTest","PITest",
        "AttributeTest","AttribNameOrWildcard","SchemaAttributeTest","AttributeDeclaration","ElementTest",
        "ElementNameOrWildcard","SchemaElementTest","ElementDeclaration","AttributeName","ElementName",
        "SimpleTypeName","TypeName","FunctionTest","AnyFunctionTest","TypedFunctionTest",
        "ParenthesizedItemType","RevalidationDecl","InsertExprTargetChoice","InsertExpr","DeleteExpr",
        "ReplaceExpr","RenameExpr","SourceExpr","TargetExpr","NewNameExpr","TransformExpr","FTSelection",
        "FTWeight","FTOr","FTAnd","FTMildNot","FTUnaryNot","FTPrimaryWithOptions","FTPrimary","FTWords",
        "FTWordsValue","FTExtensionSelection","FTAnyallOption","FTTimes","FTRange","FTPosFilter","FTOrder",
        "FTWindow","FTDistance","FTUnit","FTScope","FTBigUnit","FTContent","FTMatchOptions","FTMatchOption",
        "FTCaseOption","FTDiacriticsOption","FTStemOption","FTThesaurusOption","FTThesaurusID","FTLiteralRange",
        "FTStopWordOption","FTStopWords","FTStopWordsInclExcl","FTLanguageOption","FTWildCardOption",
        "FTExtensionOption","FTIgnoreOption","CollectionDecl","CollectionTypeDecl","IndexName","IndexDomainExpr",
        "IndexKeySpec","IndexKeyExpr","IndexKeyTypeDecl","AtomicType","IndexKeyCollation","IndexDecl","ICDecl",
        "ICCollection","ICCollSequence","ICCollSequenceUnique","ICCollNode","ICForeignKey","ICForeignKeySource",
        "ICForeignKeyTarget","ICForeignKeyValues","Comment","Whitespace","EQName","FunctionName","NCName",
        "MainModule","Program","Statements","StatementsAndExpr","StatementsAndOptionalExpr","Statement",
        "ApplyStatement","AssignStatement","BlockStatement","BreakStatement","ContinueStatement","ExitStatement",
        "FLWORStatement","ReturnStatement","IfStatement","SwitchStatement","SwitchCaseStatement",
        "TryCatchStatement","TypeswitchStatement","CaseStatement","VarDeclStatement","WhileStatement",
        "ExprSingle","ExprSimple","JSONDeleteExpr","JSONInsertExpr","JSONRenameExpr","JSONReplaceExpr",
        "JSONAppendExpr","CommonContent","ContentExpr","CompDocConstructor","CompAttrConstructor",
        "CompPIConstructor","CompCommentConstructor","CompTextConstructor","PrimaryExpr","JSONSimpleObjectUnion",
        "ObjectConstructor","PairConstructor","ArrayConstructor","BlockExpr","FunctionDecl","PragmaContents",
        "DirCommentContents","DirPIContents","CDataSection","CDataSectionContents","Wildcard","EQName",
        "URIQualifiedName","BracedURILiteral","URILiteral","IntegerLiteral","DecimalLiteral","DoubleLiteral",
        "StringLiteral","PredefinedEntityRef","EscapeQuot","EscapeApos","ElementContentChar","QuotAttrContentChar",
        "AposAttrContentChar","PITarget","Name","NameStartChar","NameChar","NCName","Char","QName","PrefixedName",
        "UnprefixedName","Prefix","LocalPart","S","CharRef","Digits","CommentContents","EOF","NonNCNameChar",
        "DelimitingChar"];

    // Create handler stubs for missing handlers
    for (var i = 0; i < XQueryNodes.length; i++){
      if (this[XQueryNodes[i]] === undefined){
        this[XQueryNodes[i]] = function (node) {
          return this.everythingElse(node);
        }
      }
    }

   

  }; // CodeFormatter

}); // define
