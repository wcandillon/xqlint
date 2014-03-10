exports.Translator = function(rootStcx, ast){
    'use strict';

    var Errors = require('./errors');
    var StaticError = Errors.StaticError;
    var StaticWarning = Errors.StaticWarning;
    var StaticContext = require('./static_context').StaticContext;
    var PrologHandlers = require('./prolog_handlers');
    
    var markers = [];
    this.apply = function(fn) {
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

    var translator = this;
    rootStcx = rootStcx ? rootStcx : new StaticContext();
    
    this.ModuleImport = function (node) {
        this.visitChildren(node, PrologHandlers.ModuleImport(translator, rootStcx, node));
        return true;
    };
    
    this.SchemaImport = function (node) {
        this.visitChildren(node, PrologHandlers.SchemaImport(translator, rootStcx, node));
        return true;
    };
    
    this.DefaultNamespaceDecl = function(node){
        this.visitChildren(node, PrologHandlers.DefaultNamespaceDecl(translator, rootStcx, node));
        return true;
    };
    
    this.NamespaceDecl = function (node) {
        this.visitChildren(node, PrologHandlers.NamespaceDecl(translator, rootStcx, node));
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