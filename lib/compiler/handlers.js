'use strict';

var TreeOps = require('../tree_ops').TreeOps;
var Errors = require('./errors');
var StaticWarning = Errors.StaticWarning;

//
// Prolog Handlers
//
exports.ModuleDecl = function(translator, rootSctx, node){
    var prefix = '';
    return {
        NCName: function(ncname){
            prefix = TreeOps.flatten(ncname);
        },

        URILiteral: function(uri) {
            uri = TreeOps.flatten(uri);
            uri = uri.substring(1, uri.length - 1);
            translator.apply(function(){
                rootSctx.moduleNamespace = uri;
                rootSctx.addNamespace(uri, prefix, node.pos, 'moduleDecl');
            });
        }
    };
};

exports.ModuleImport = function(translator, rootSctx, node) {
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
                rootSctx.importModule(uri, prefix, node.pos);
            });
        }
    };
};

exports.SchemaImport = function(translator, rootSctx, node) {
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
                rootSctx.addNamespace(uri, prefix, node.pos, 'schema');
            });
        }
    };
};

exports.DefaultNamespaceDecl = function(translator, rootSctx, node) {
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
                rootSctx.defaultElementNamespace = ns;
            } else {
                rootSctx.defaultFunctionNamespace = ns;
            }
        }
    };
};

exports.NamespaceDecl = function(translator, rootSctx, node) {
    var prefix = '';
    return {
        NCName: function(ncname) {
            prefix = TreeOps.flatten(ncname);
        },
        URILiteral: function(uri) {
            uri = TreeOps.flatten(uri);
            uri = uri.substring(1, uri.length - 1);
            translator.apply(function(){
                rootSctx.addNamespace(uri, prefix, node.pos, 'declare');
            });
        }
    };
};

//
//
//
exports.VarHandler = function(translator, sctx, node){
    var EQNameHandler = function(eqname){
        var value = TreeOps.flatten(eqname);
        translator.apply(function(){
            var qname = sctx.resolveQName(value, eqname.pos);
            sctx.addVariable(qname, node.name, eqname.pos);
        });
    };
    return {
        ExprSingle: function(){ return true; },
        VarValue: function(){ return true; },
        VarDefaultValue: function(){ return true; },
        VarName: EQNameHandler,
        EQName: EQNameHandler
    };
};

exports.VarRefHandler = function(translator, sctx, node){
    return {
        VarName: function(eqname){
            var value = TreeOps.flatten(eqname);
            translator.apply(function(){
                var qname = sctx.resolveQName(value, node.pos);
                sctx.addVarRef(qname, eqname.pos);
            });
        }
    };
};