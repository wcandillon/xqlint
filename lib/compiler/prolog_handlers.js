'use strict';

var TreeOps = require('../tree_ops').TreeOps;
var Errors = require('./errors');
var StaticWarning = Errors.StaticWarning;

exports.ModuleImport = function(translator, rootStcx, node) {
    var prefix = '';
    var moduleURI;
    //location hints

    return {
        NCName: function(ncname){
            prefix = TreeOps.flatten(ncname);
        },

        URILiteral: function(uri) {
            if(moduleURI) {
                //location hints
                return;
            }
            uri = TreeOps.flatten(uri);
            uri = uri.substring(1, uri.length - 1);
            moduleURI = uri;
            translator.apply(function(){
                rootStcx.addNamespace(uri, prefix, node.pos, 'module');
            });
        }
  
    };
};

exports.SchemaImport = function(translator, rootStcx, node) {
    var prefix = '';
    var schemaURI;
    
    return {
        SchemaPrefix: function(schemaPrefix) {
            var SchemaPrefixHandler = function () {
                this.NCName = function (ncname) {
                    prefix = TreeOps.flatten(ncname);
                };
            };
            translator.visitChildren(schemaPrefix, new SchemaPrefixHandler());
        },

        URILiteral: function(uri) {
            if(schemaURI) {
                //location hints
                return;
            }
            uri = TreeOps.flatten(uri);
            uri = uri.substring(1, uri.length - 1);
            schemaURI = uri;
            translator.apply(function(){
                rootStcx.addNamespace(uri, prefix, node.pos, 'schema');
            });
        }
    };
};

exports.DefaultNamespaceDecl = function(translator, rootStcx, node) {
    var fn = false;
    var ns = '';

    return {
        TOKEN: function(token){
            fn = fn ? true : (token.value === 'function');
        },
        URILiteral: function(uri){
            ns = TreeOps.flatten(uri);
            ns = ns.substring(1, ns.length - 1);
            if(!fn) {
                translator.apply(function(){
                    throw new StaticWarning('Avoid default element namespace declarations.', node.pos);
                });
                rootStcx.defaultElementNamespace = ns;
            } else {
                rootStcx.defaultFunctionNamespace = ns;
            }
        }
    };
};

exports.NamespaceDecl = function(translator, rootStcx, node) {
    var prefix = '';
    return {
        NCName: function(ncname) {
            prefix = TreeOps.flatten(ncname);
        },
        URILiteral: function(uri) {
            uri = TreeOps.flatten(uri);
            uri = uri.substring(1, uri.length - 1);
            translator.apply(function(){
                rootStcx.addNamespace(uri, prefix, node.pos, 'declare');
            });
        }
    };
};