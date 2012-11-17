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
  
  var Errors = require("./Errors").Errors;
  var StaticContext = require("./StaticContext").StaticContext;
  
  var Translator = exports.Translator = function(ast){
    
    var markers = [];
    var outline = [];
    
    var isMainModule = true;
    
    var rootSctx = new StaticContext();
    var sctx = rootSctx;
    
    function pushSctx() {
      var length = sctx.children.length;
      var idx = length === 0 ? 0 : length - 1;
      sctx.children[idx] = new StaticContext(sctx);
    }
    
    function popSctx() {
      sctx = sctx.parent;
    }
    
    var defaultFnNs = "http://www.w3.org/2005/xpath-functions";
    
    var namespaces = {
      "local": "http://www.w3.org/2005/xquery-local-functions",
      "xs": "http://www.w3.org/2001/XMLSchema",
      "fn": "http://www.w3.org/2005/xpath-functions",
      "an": "http://www.zorba-xquery.com/annotations",
      "db": "http://www.zorba-xquery.com/modules/store/static/collections/dml",
      "idx": "http://www.zorba-xquery.com/modules/store/static/indexes/dml",
      "zerr": "http://www.zorba-xquery.com/errors",
      "err": "http://www.w3.org/2005/xqt-error"
    };
    
    var declaredNS = {};
    var referencedPrefixes = [];

    this.XQuery = function(node) {
      pushSctx();
      this.visitChildren(node);
      popSctx();
      
      //Check for duplicates in namespaces declarations
      var dNS = {};
      for(var prefix in declaredNS) {
        var ns = declaredNS[prefix].ns;
        var pos = declaredNS[prefix].pos;
        var type = declaredNS[prefix].type;
        if(dNS[ns] === undefined) {
            dNS[ns] = {prefix: prefix, positions: [pos]};
        } else if(type === "decl"){
          dNS[ns].positions.push(pos);
        }
      }
      for(var ns in dNS) {
        var prefix = dNS[ns].prefix;
        var positions = dNS[ns].positions;
        if(positions.length > 1) {
          for(var i = 1; i < positions.length; i++) {
            markers.push({
              pos: positions[i],
              type: "warning",
              level: "warning",
              msg: '"' + ns + '": is already available with the prefix "' + prefix + '".'
            });
          }
        }
      }
      return true;
    };  
    
    this.ModuleDecl = function(node) {
      isMainModule = false;
     
      var Handler = function() {
        var prefix = "";
        var ns = "";
        
        this.NCName = function(ncname) {
          prefix = getNodeValue(ncname);
        };
        
        this.URILiteral = function(uri) {
          ns = getNodeValue(uri);
          ns = ns.substring(1, ns.length - 1);
          namespaces[prefix] = ns;
        };
      };
      
      this.visitChildren(node, new Handler());
      
      return true;
    };
    
    this.ModuleImport = function(node) {
     
      var handler = new function() {
        var prefix = "";
        var moduleURI = null;
        //var locationHints = [];
        
        this.NCName = function(ncname) {
          prefix = getNodeValue(ncname);
        };
        
        this.URILiteral = function(uri) {
          uri = getNodeValue(uri);
          uri = uri.substring(1, uri.length - 1);
          if(moduleURI === null) {
            moduleURI = uri;
            if (declaredNS[prefix] === undefined) {
              declaredNS[prefix] = { ns: moduleURI, pos: node.pos, type: "module" };
            } else {
              markers.push(Errors.XQST0033(node.pos, prefix, moduleURI));
            }
          } else {
            //locationHints.push(uri);
          }
        };
      };
      
      this.visitChildren(node, handler);
      return true;
    };
    
    this.SchemaImport = function(node) {
      var that = this;
      
      var handler = new function() {
        var prefix = "";
        var schemaURI = null;
        //var locationHints = [];
        
        this.SchemaPrefix = function(schemaPrefix) {
          var Handler = function() {
            this.NCName = function(ncname) {
              prefix = getNodeValue(ncname);
            }
          };
          that.visitChildren(schemaPrefix, new Handler());
        };
        
        this.URILiteral = function(uri) {
          uri = getNodeValue(uri);
          uri = uri.substring(1, uri.length - 1);
          if(schemaURI === null) {
            schemaURI = uri;
            if (declaredNS[prefix] === undefined) {
              declaredNS[prefix] = { ns: schemaURI, pos: node.pos, type: "schema" };
            } else {
              markers.push(Errors.XQST0033(node.pos, prefix, schemaURI));
            }
          } else {
            //locationHints.push(uri);
          }
        };
      };
      
      this.visitChildren(node, handler);
      return true;
    };
    
    this.NamespaceDecl = function(node) {
     
      var handler = new function() {
        var prefix = "";
        var moduleURI = "";
        
        this.NCName = function(ncname) {
          prefix = getNodeValue(ncname);
        };
        
        this.URILiteral = function(uri) {
          moduleURI = getNodeValue(uri);
          moduleURI = moduleURI.substring(1, moduleURI.length - 1);
          if (declaredNS[prefix] === undefined) {
            declaredNS[prefix] = { ns: moduleURI, pos: node.pos, type: "decl" };
          } else {
             markers.push(Errors.XQST0033(node.pos, prefix, moduleURI));
          }
        };
      };
      
      this.visitChildren(node, handler);
      return true;
    };
    
    this.DefaultNamespaceDecl = function(node) {      
      var Handler = function() {
        var fn = false;
        var ns = "";
        
        this.TOKEN = function(token) {
          fn = token.value === "function";
        };
        
        this.URILiteral = function(uri) {
          ns = getNodeValue(uri);
          ns = ns.substring(1, ns.length - 1);
          if(fn) {
           defaultFnNs = ns;
          }
        };
      };
      
      this.visitChildren(node, new Handler());
      
      return true;
    };
    
    this.AnnotatedDecl = function(node) {
        
    };
    

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
    
    this.visit = function(node) {
      var name = node.name;
      var skip = false;
     
     if(typeof this[name] === "function")
       skip = this[name](node) === true ? true : false ;
     
     if(!skip) {
       this.visitChildren(node);
     }
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
    
    this.translate = function() {
      this.visit(ast);
      ast.markers = markers;
      ast.outline = outline;
      return ast;
    };
  };
});
