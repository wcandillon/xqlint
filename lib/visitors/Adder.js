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

  var Positioner = require("./Positioner.js").Positioner;
  //var Positioner = require("/ext/xquery/lib/visitors/Positioner").Positioner;



  var Adder = exports.Adder = function(ast)
{

  this.add = {};

  function containsPos(a, b){
    var slDiff = b.sl - a.sl;
    var elDiff = a.el - b.el;
    var scDiff = b.sc - a.sc;
    var ecDiff = a.ec - b.ec;

    return (slDiff > 0 || !slDiff && scDiff >= 0) 
  && (elDiff > 0 || !elDiff && ecDiff >= 0);
  }

  function emptyNode(){
    return {
      name: "WS",
      value: "",
      children: []
    };
  }

  function isWS(str){
    return !(/\S/.test(str));
  }

  function ensureQuotes(str){
    if (!str || !str.length){
      return '""';
    }
    if (str[0] !== '"'){
      str = '"' + str;
    }
    if (str.length == 1 || str[str.length-1] !== '"'){
      str += '"';
    }
    return str;
  }

  this.Prolog = function(node){
    var _self = this;

    if (_self.add.NamespaceDecl  || _self.add.ModuleImport
        /* || _self.add.otherprologstuff... */ ){
      // We have to add something to the Prolog

      if (_self.add.NamespaceDecl){
        
        var toAddNode = _self.add.NamespaceDecl;
        var insert = _self.findInsertIndexInProlog(node, toAddNode,
          "NamespaceDecl");
        var insertIdx = insert.idx;
        var haveNewLine = insert.haveNewLine;
        
        // namespaceDecl.NCName, namespaceDecl.URILiteral
        var newNode = _self.nodeNamespaceDecl(); 

        if (!haveNewLine){
          _self.pushChild(node, _self.nodeWS("\n"), insertIdx);
          this.cursorTarget.line++;
          this.cursorTarget.column = 0;
          insertIdx++;
        }
        // Add NamespaceDecl to Prolog
        _self.pushChild(node, newNode, insertIdx);

        // Add NamespaceDecl children
        _self.pushChild(newNode, _self.nodeTOKEN("declare"));
        _self.pushChild(newNode, _self.nodeWS(" "));
        _self.pushChild(newNode, _self.nodeTOKEN("namespace"));
        _self.pushChild(newNode, _self.nodeWS(" "));
        _self.pushChild(newNode, _self.nodeNCName(toAddNode.NCName));
        _self.pushChild(newNode, _self.nodeWS(" "));
        _self.pushChild(newNode, _self.nodeTOKEN("="));
        _self.pushChild(newNode, _self.nodeWS(" "));
        _self.pushChild(newNode, _self.nodeURILiteral(toAddNode.URILiteral));

        if (toAddNode.URILiteral === ""){
          // There is no URILiteral, the course should be moved such that
          // the URILiteral can be written immediately by the user
          var addStr = "declare namespace " + _self.add.NamespaceDecl.NCName + 
            " = \"";
          this.cursorTarget.column += addStr.length;
        }else{
          // There is a URILiteral, the cursor shouldn't be moved
          this.cursorTarget = undefined;
        }

        // Add Separator to Prolog
        _self.pushChild(node, _self.nodeSeparator(), insertIdx + 1);

        if (!insertIdx){
          _self.pushChild(node, _self.nodeWS("\n"));
        }

      } // Branch that added NamespaceDecl to Prolog

      else if (_self.add.ModuleImport){
        
        var toAddNode = _self.add.ModuleImport;
        var insert = _self.findInsertIndexInProlog(node, toAddNode,
          "Import");
        var insertIdx = insert.idx;
        var haveNewLine = insert.haveNewLine;

        if (!haveNewLine){
          _self.pushChild(node, _self.nodeWS("\n"), insertIdx);
          this.cursorTarget.line++;
          this.cursorTarget.column = 0;
          insertIdx++;
        }
        
        // Add Import to Prolog
        var newImport = _self.nodeImport();
        _self.pushChild(node, newImport, insertIdx);

        // Add ModuleImport to Import
        var newNode = _self.nodeModuleImport(); 
        _self.pushChild(newImport, newNode);

        // Add ModuleImport children
        var uriLiterals = toAddNode.URILiterals;
        var numURILiterals = uriLiterals.length;
        var addStr = "import module ";
        _self.pushChild(newNode, _self.nodeTOKEN("import"));
        _self.pushChild(newNode, _self.nodeWS(" "));
        _self.pushChild(newNode, _self.nodeTOKEN("module"));
        _self.pushChild(newNode, _self.nodeWS(" "));
        if (toAddNode.NCName){
          addStr += "namespace " + toAddNode.NCName + " = ";
          _self.pushChild(newNode, _self.nodeTOKEN("namespace"));
          _self.pushChild(newNode, _self.nodeWS(" "));
          _self.pushChild(newNode, _self.nodeNCName(toAddNode.NCName));
          _self.pushChild(newNode, _self.nodeWS(" "));
          _self.pushChild(newNode, _self.nodeTOKEN("="));
          _self.pushChild(newNode, _self.nodeWS(" "));
        }
        _self.pushChild(newNode, _self.nodeURILiteral(uriLiterals[0]));
        if (numURILiterals > 1){
          _self.pushChild(newNode, _self.nodeWS(" "));
          _self.pushChild(newNode, _self.nodeTOKEN("at"));
          _self.pushChild(newNode, _self.nodeWS(" "));
          _self.pushChild(newNode, _self.nodeURILiteral(uriLiterals[1]));
          for (var i = 2; i < uriLiterals.length; i++){
            _self.pushChild(newNode, _self.nodeTOKEN(","));
            _self.pushChild(newNode, _self.nodeWS(" "));
            _self.pushChild(newNode, _self.nodeURILiteral(uriLiterals[i]));
          }

        }

        if (uriLiterals[0] === "\"\""){
          // Adapt cursorTarget
          this.cursorTarget.column += addStr.length + 1;
        }else{
          this.cursorTarget = undefined;
        }

        // Add Separator to Prolog
        _self.pushChild(node, _self.nodeSeparator(), insertIdx + 1);

        if (!insertIdx){
          _self.pushChild(node, _self.nodeWS("\n"));
        }

      } // Branch that added ModuleImport to Prolog



    } // Added something to Prolog

    return this.everythingElse(node);
  };



  // For a node to be added as a child to the Prolog, find the child index
  // where it shall be added. This method also sets this.cursorTarget to 
  // the position before the node to be added.
  // Returns ret:
  // ret.idx - the insert index
  // ret.haveNewLine - false if a newline should be inserted before
  //    inserting the new node
  this.findInsertIndexInProlog = function(prologNode, addNode, addName){
        var prevItem;
        var haveNewLine = false;

        for (var insertIdx = 0; insertIdx < prologNode.children.length; insertIdx++){
          var curChild = prologNode.children[insertIdx];
          var startItems = ['DefaultNamespaceDecl', 'Setter', 'NamespaceDecl',
              'Import', 'FTOptionDecl'];
          var endItems = ['ContextItemDecl', 'AnnotatedDecl', 'OptionDecl'];
          var prologItems = startItems.concat(endItems);
          if (prevItem === addName && 
              curChild.name !== prevItem
              && prologItems.indexOf(curChild.name) !== -1){
            // Insert as last 'addName' 
            this.cursorTarget = { line: curChild.pos.sl, column: curChild.pos.sc};
            break;
          }else if (endItems.indexOf(addName) == -1 && 
                    endItems.indexOf(curChild.name) !== -1){
            // Insert before first endItem
            this.cursorTarget = { line: curChild.pos.sl, column: curChild.pos.sc};
            break;
          }else if (curChild.name !== 'Separator' && curChild.name !== 'WS'){
            prevItem = curChild.name;
            haveNewLine = false;
          }else if (curChild.name == 'Separator'){
            haveNewLine = false;
          }else if (curChild.name === 'WS'
            && curChild.value.split('\n').length > 1){
            haveNewLine = true;
          }else{
            haveNewLine = false;
          }
        }

        haveNewLine |= !insertIdx;

        if (!this.cursorTarget){
          this.cursorTarget = {
            line: prologNode.pos.sl,
            column: prologNode.pos.sc
          };
        }

        return {
          idx: insertIdx,
          haveNewLine: haveNewLine
        };
  };

  this.pushChild = function(dst, child, idx){
    dst.children = dst.children || [];
    idx = idx || dst.children.length;
    dst.children.splice(idx, 0, child);
  };
  
  this.nodeWithValue = function(name, value){
    return {
      name: name,
      value: value,
      children: []
    };
  };

  this.nodeTOKEN = function(val){
    return this.nodeWithValue("TOKEN", val);
  };

  this.nodeNCName = function(val){
    return this.nodeWithValue("NCName", val);
  };
 
  this.nodeWS = function(val){
    return this.nodeWithValue("WS", val);
  }; 
  
  this.nodeURILiteral = function(val){
    return this.nodeWithValue("URILiteral", ensureQuotes(val));
  };

  this.nodeSeparator = function(){
    return this.nodeWithValue("Separator", ";");
  };

  this.nodeNamespaceDecl = function(){
    return {
      name: "NamespaceDecl",
      children: []
    };
  };

  this.nodeImport = function(){
    return {
      name: "Import",
      children: []
    };
  };

  this.nodeModuleImport = function(){
    return {
      name: "ModuleImport",
      children: []
    };
  };

  this.fromNode = function(node, handler){
    var ret = {};
    ret.name = node.name;
    ret.children = this.visitChildren(node, handler);
    ret.value = node.value;
    ret.pos = node.pos;
    return ret;
  };

  this.everythingElse = function(node)
  {
    return this.fromNode(node);
  };
  
  this.visit = function(node) {
    var name = node.name;
    if(typeof this[name] === "function")
      return this[name](node);
    else
      return this.everythingElse(node);
  };


  this.visitChildren = function(node, handler) {
    var ret = [];
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      if (handler !== undefined && typeof handler[child.name] === "function") {
        ret.push(handler[child.name](child));
      } else {
        ret.push(this.visit(child));
      }
    }
    return ret;
  };

  this.copyAst = function(node){
    var newNode = {
      name: node.name,
      children: [],
      value: node.value,
      pos: node.pos,
      getParent: node.getParent
    };

    for (var i = 0; i < node.children.length; i++){
      newNode.children.push(this.copyAst(node.children[i]));
    }
    return newNode;
  };

  this.add = function(){
    var newAst = this.copyAst(ast);
    var addedAst = this.visit(newAst);
    var positioner = new Positioner(addedAst);
    addedAst = positioner.computePos();
    addedAst.cursorTarget = this.cursorTarget; 
    console.log(JSON.stringify(addedAst.cursorTarget));
    return addedAst;
  };

  /**
   * NamespaceDecl ::= 'declare' 'namespace' NCName '=' URILiteral
   */
  this.addNamespaceDecl = function(namespaceDecl){
    namespaceDecl.URILiteral = namespaceDecl.URILiteral || "";
    this.add.NamespaceDecl = namespaceDecl;
    return this.add();
   };


  /*
   * ModuleImport
   *          ::= 'import' 'module' ( 'namespace' NCName '=' )? URILiteral
   *              ( 'at' URILiteral ( ',' URILiteral )* )?
   *
   * Add a ModuleImport node to the Prolog of this ast. 
   */
  this.addModuleImport = function(moduleImport){
    if (!(moduleImport.URILiterals instanceof Array)){
      var lit = moduleImport.URILiterals;
      moduleImport.URILiterals = [];
      if (lit){
        moduleImport.URILiterals.push(lit);
      }
    }
    if (!moduleImport.URILiterals.length){
      moduleImport.URILiterals.push('""');
    }
    if (moduleImport.NCName === ""){
      moduleImport.NCName = undefined;
    }
    this.add.ModuleImport = moduleImport;
    return this.add();
  };

};

});
