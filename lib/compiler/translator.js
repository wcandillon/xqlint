exports.Translator = function(rootStcx, ast){
    'use strict';

    var Errors = require('./errors');
    var StaticError = Errors.StaticError;
    var StaticWarning = Errors.StaticWarning;
    var StaticContext = require('./static_context').StaticContext;
    var Handlers = require('./handlers');
    
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
    rootStcx.pos = ast.pos;
    var sctx = rootStcx;
    
    var pushSctx = function(pos){
        sctx = new StaticContext(sctx, pos);
    };
    
    var popSctx = function(pos){
        if (pos !== undefined) {
            sctx.pos.el = pos.el;
            sctx.pos.ec = pos.ec;
        }
        sctx = sctx.parent;
    };

    this.visitExprSingles = function (node) {
        node.children.forEach(function(child){
            if (child.name === 'ExprSingle' || child.name === 'VarValue' || child.name === 'VarDefaultValue') {
                translator.visit(child);
            }
        });
    };
    
    this.ModuleDecl = function(node){
        this.visitChildren(node, Handlers.ModuleDecl(translator, rootStcx, node));
        return true;
    };
    
    this.ModuleImport = function (node) {
        this.visitChildren(node, Handlers.ModuleImport(translator, rootStcx, node));
        return true;
    };
    
    this.SchemaImport = function (node) {
        this.visitChildren(node, Handlers.SchemaImport(translator, rootStcx, node));
        return true;
    };
    
    this.DefaultNamespaceDecl = function(node){
        this.visitChildren(node, Handlers.DefaultNamespaceDecl(translator, rootStcx, node));
        return true;
    };
    
    this.NamespaceDecl = function (node) {
        this.visitChildren(node, Handlers.NamespaceDecl(translator, rootStcx, node));
        return true;
    };
    
    //FLWOR Expressions
    var clauses = [];
    this.FLWORExpr = function (node) {
        pushSctx(node.pos);
        clauses.push(0);
        this.visitChildren(node);
        for(var i=1; i <= clauses[clauses.length - 1]; i++) {
            popSctx(node.pos);
        }
        clauses.pop();
        popSctx();
        return true;
    };
    
    this.LetBinding = function(node){
        this.visitExprSingles(node);
        pushSctx(node.pos);
        clauses[clauses.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx));
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