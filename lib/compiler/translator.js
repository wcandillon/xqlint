exports.Translator = function(rootStcx, ast){
    'use strict';

    var Errors = require('./errors');
    var StaticError = Errors.StaticError;
    var StaticWarning = Errors.StaticWarning;
    var StaticContext = require('./static_context').StaticContext;
    
    var markers = [];
    var apply = function(fn) {
        try {
            fn();
        } catch(e) {
            if(e instanceof StaticError) {
                addStaticError(e);
            } else if(e instanceof StaticWarning) {
                addWarning(e.getMessage(), e.getPos());
            } else {
                throw e;
            }
        }
    };
    
    var addStaticError = function(e){
        markers.push({
            pos: e.getPos(),
            type: 'error',
            level: 'error',
            message: '[' + e.getCode() + '] ' + e.getMessage()
        });
    };
    
    var addWarning = function(message, pos) {
        markers.push({
            pos: pos,
            type: 'warning',
            level: 'warning',
            message: message
        });
    };
    
    this.getMarkers = function(){
        return markers;
    };

    rootStcx = rootStcx ? rootStcx : new StaticContext();

    var getNodeValue = function(node) {
        var value = '';
        if (node.value === undefined) {
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                value += getNodeValue(child);
            }
        } else {
            value += node.value;
        }
        return value;
    };
    
    this.ModuleImport = function (node) {
        var ModuleImportHandler = function () {
            var prefix = '';
            var moduleURI;
            //var locationHints = [];

            this.NCName = function (ncname) {
                prefix = getNodeValue(ncname);
            };

            this.URILiteral = function (uri) {
                if(moduleURI) {
                    //location hints
                    return;
                }
                uri = getNodeValue(uri);
                uri = uri.substring(1, uri.length - 1);
                moduleURI = uri;
                apply(function(){
                    rootStcx.addNamespace(uri, prefix, node.pos, 'module');
                });
            };
        };
        this.visitChildren(node, new ModuleImportHandler());
        return true;
    };
    
    this.SchemaImport = function (node) {
        var that = this;
        var SchemaImportHandler = function () {
            var prefix = '';
            var schemaURI;
            //var locationHints = [];

            this.SchemaPrefix = function (schemaPrefix) {
                var SchemaPrefixHandler = function () {
                    this.NCName = function (ncname) {
                        prefix = getNodeValue(ncname);
                    };
                };
                that.visitChildren(schemaPrefix, new SchemaPrefixHandler());
            };

            this.URILiteral = function (uri) {
                if(schemaURI) {
                    //location hints
                    return;
                }
                uri = getNodeValue(uri);
                uri = uri.substring(1, uri.length - 1);
                schemaURI = uri;
                apply(function(){
                    rootStcx.addNamespace(uri, prefix, node.pos, 'schema');
                });
            };
        };
        this.visitChildren(node, new SchemaImportHandler());
        return true;
    };
    
    this.DefaultNamespaceDecl = function(node){
        var DefaultNamespaceHandler = function () {
            var fn = false;
            var ns = '';

            this.TOKEN = function (token) {
                fn = fn ? true : (token.value === 'function');
            };

            this.URILiteral = function (uri) {
                ns = getNodeValue(uri);
                ns = ns.substring(1, ns.length - 1);
                if(!fn) {
                    addWarning('Avoid default element namespace declarations.', node.pos);
                    rootStcx.defaultElementNamespace = ns;
                } else {
                    rootStcx.defaultFunctionNamespace = ns;
                }
            };
        };
        this.visitChildren(node, new DefaultNamespaceHandler());
        return true;
    };
    
    this.NamespaceDecl = function (node) {
        var NamespaceHandler = function () {
            var prefix = '';

            this.NCName = function (ncname) {
                prefix = getNodeValue(ncname);
            };

            this.URILiteral = function (uri) {
                uri = getNodeValue(uri);
                uri = uri.substring(1, uri.length - 1);
                apply(function(){
                    rootStcx.addNamespace(uri, prefix, node.pos, 'declare');
                });
            };
        };

        this.visitChildren(node, new NamespaceHandler());
        return true;
    };
    
    this.visit = function (node) {
        var name = node.name;
        var skip = false;

        if (typeof this[name] === 'function') {
            skip = this[name](node) === true;
        }

        if (!skip) {
            this.visitChildren(node);
        }
    };

    this.visitChildren = function (node, handler) {
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            if (handler !== undefined && typeof handler[child.name] === 'function') {
                handler[child.name](child);
            } else {
                this.visit(child);
            }
        }
    };

    this.visit(ast);
};