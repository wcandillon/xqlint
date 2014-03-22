exports.Translator = function(rootStcx, ast){
    'use strict';

    var Errors = require('./errors');
    var StaticError = Errors.StaticError;
    var StaticWarning = Errors.StaticWarning;
    
    var TreeOps = require('../tree_ops').TreeOps;
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
        Object.keys(sctx.varRefs).forEach(function(key){
            if(!sctx.variables[key]) {
                sctx.parent.varRefs[key] = true;
            }
        });
        Object.keys(sctx.variables).forEach(function(key){
            if(!sctx.varRefs[key] && sctx.variables[key].type !== 'GroupingVariable') {
                addWarning('Unused variable "$' + sctx.variables[key].qname.name + '"', sctx.variables[key].pos);
            }
        });
        
        sctx = sctx.parent;
    };
    
    this.visitOnly = function(node, names) {
        node.children.forEach(function(child){
            if (names.indexOf(child.name) !== -1){
                translator.visit(child);
            }
        });
    };
    
    this.getFirstChild = function(node, name) {
        var result;
        node.children.forEach(function(child){
            if(child.name === name && result === undefined){
                result = child;
            }
        });
        return result;
    };
    
    this.ModuleDecl = function(node){
        this.visitChildren(node, Handlers.ModuleDecl(translator, rootStcx, node));
        return true;
    };
    
    this.Prolog = function(node){
        //Visit first part of the prolog
        this.visitOnly(node, ['DefaultNamespaceDecl', 'Setter', 'NamespaceDecl', 'Import']);
        //Get the Index of variable and function Declarations
        ast.index.forEach(function(node){
            if(node.name === 'VarDecl') {
                node.children.forEach(function(child){
                    if(child.name === 'VarName') {
                        translator.apply(function(){
                            var value = TreeOps.flatten(child);
                            var qname = rootStcx.resolveQName(value, child.pos);
                            rootStcx.addVariable(qname, node.name, child.pos);
                        });
                    }
                });
            } else if(node.name === 'FunctionDecl') {
                var qname, arity = 0, pos;
                node.children.forEach(function(child){
                    if(child.name === 'EQName') {
                        qname = child;
                        pos = child.pos;
                    } else if(child.name === 'ParamList'){
                        child.children.forEach(function(c){
                            if(c.name === 'Param') {
                                arity++;
                            }
                        });
                    }
                });
                translator.apply(function(){
                    qname = TreeOps.flatten(qname);
                    qname = rootStcx.resolveQName(qname, pos);
                    rootStcx.addFunction(qname, arity, pos);
                });
            }
        });
        //Visit second part of the prolog
        this.visitOnly(node, ['ContextItemDecl', 'AnnotatedDecl', 'OptionDecl']);
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
    
    var annotations = {};
    this.AnnotatedDecl = function(node) {
        annotations = [];
        this.visitChildren(node, Handlers.NamespaceDecl(translator, rootStcx, node));
        return true;
    };
    
    this.Annotation = function(node){
        this.visitChildren(node, {
            EQName: function(eqname){
                var value = TreeOps.flatten(eqname);
                translator.apply(function(){
                    var qname = sctx.resolveQName(value, eqname.pos);
                    annotations[qname.uri + '#' + qname.name] = [];
                });
            }
        });
        return true;
    };
    
    this.VarDecl = function(node){
        try {
            var varname = translator.getFirstChild(node, 'VarName');
            var value = TreeOps.flatten(varname);
            var qname = sctx.resolveQName(value, varname.pos);
            var variable = rootStcx.getVariable(qname);
            if(variable) {
                variable.annotations = annotations;
            }
        } catch(e) {
            //ignore resolution exceptions
        }
        this.visitOnly(node, ['ExprSingle', 'VarValue', 'VarDefaultValue']);
        return true;
    };
    
    this.FunctionDecl = function(node) {
        /*
        this.visitChildren(node, {
            EQName: function(fnname){
                var value = TreeOps.flatten(fnname);
                var qname = sctx.resolveQName(value, fnname.pos);
                var fn = rootStcx.getFunction(qname, arity);
                fn.annotations = annotations;
                return true;
            }
        });  
        */
        var isExternal = false;
        node.children.forEach(function(child){
            if(child.name === 'TOKEN' && child.value === 'external') {
                isExternal = true;
                return false;
            }
        });
        if(!isExternal) {
            pushSctx(node.pos);
            this.visitChildren(node);
            popSctx();
        }
        return true;
    };
    
    this.VarRef = function(node) {
        this.visitChildren(node, Handlers.VarRefHandler(translator, sctx, node));
        return true;
    };
    
    this.Param = function(node){
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };
    
    this.InlineFunctionExpr	= function(node) {
        pushSctx(node.pos);
        this.visitChildren(node);
        popSctx();
        return true;
    };
    
    //Scripting
    var statementCount = [];
    var handleStatements = function(node) {
        pushSctx(node.pos);
        statementCount.push(0);
        translator.visitChildren(node);
        for (var i = 1; i <= statementCount[statementCount.length - 1]; i++) {
            popSctx(node.pos);
        }
        statementCount.pop();
        popSctx();
    };
    this.StatementsAndOptionalExpr = function (node) {
        handleStatements(node);
        return true;
    };

    this.StatementsAndExpr = function (node) {
        handleStatements(node);
        return true;
    };

    this.BlockStatement = function (node) {
        handleStatements(node);
        return true;
    };
    
    this.VarDeclStatement = function(node){
        pushSctx(node.pos);
        statementCount[statementCount.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        //return true;
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
    
    
    this.ForBinding = function (node) {
        this.visitOnly(node, ['ExprSingle', 'VarValue', 'VarDefaultValue']);
        pushSctx(node.pos);
        clauses[clauses.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };
    
    this.LetBinding = function(node){
        this.visitOnly(node, ['ExprSingle', 'VarValue', 'VarDefaultValue']);
        pushSctx(node.pos);
        clauses[clauses.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
    };

    this.GroupingSpec = function(node){
        var isVarDecl = false;
        node.children.forEach(function(child){
            if(child.value === ':=') {
                isVarDecl = true;
                return false;
            }
        });
        if(isVarDecl) {
            var groupingVariable = node.children[0];
            this.visitOnly(node, ['ExprSingle', 'VarValue', 'VarDefaultValue']);
            pushSctx(node.pos);
            clauses[clauses.length - 1]++;
            this.visitChildren(groupingVariable, Handlers.VarHandler(translator, sctx, groupingVariable));
            return true;
        } else {
            
        }
    };
    
    this.TumblingWindowClause = function (node) {
        this.visitOnly(node, ['ExprSingle']);
        pushSctx(node.pos);
        clauses[clauses.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        this.visitOnly(node, ['WindowStartCondition', 'WindowEndCondition']);
        return true;
    };

    this.WindowVars = function (node) {
        pushSctx(node.pos);
        clauses[clauses.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    this.SlidingWindowClause = function (node) {
        this.visitOnly(node, ['ExprSingle', 'VarValue', 'VarDefaultValue']);
        pushSctx(node.pos);
        clauses[clauses.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        this.visitOnly(node, ['WindowStartCondition', 'WindowEndCondition']);
        return true;
    };

    this.PositionalVar = function (node) {
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    this.PositionalVar = function (node) {
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    this.CurrentItem = function (node) {
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    this.PreviousItem = function (node) {
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    this.NextItem = function (node) {
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    this.CountClause = function (node) {
        pushSctx(node.pos);
        clauses[clauses.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };
    
    this.CaseClause = function(node) {
        pushSctx(node.pos);
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        this.visitOnly(node, ['ExprSingle']);
        popSctx();
        return true;
    };
    
    this.TransformExpr = function (node) {
        pushSctx(node.pos);
        this.visitChildren(node);
        popSctx();
        return true;
    };
    
    this.TransformSpec = function(node) {
        this.visitOnly(node, ['ExprSingle', 'VarValue', 'VarDefaultValue']);
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    this.QuantifiedExpr = function (node) {
        pushSctx(node.pos);
        //TODO: QuantifiedExpr ::= ("some" | "every") "$" VarName TypeDeclaration? "in" ExprSingle ("," "$" VarName TypeDeclaration? "in" ExprSingle)* "satisfies" ExprSingle
        //this.visitOnly(node, ['ExprSingle', 'VarValue', 'VarDefaultValue']);
        //this.visitChildren(node, Handlers.VarRefHandler(translator, sctx, node));
        popSctx();
        return true;
    };
    
    this.FunctionCall = function(node){
        try {
            var eqname = translator.getFirstChild(node, 'EQName');
            eqname = TreeOps.flatten(eqname);
            var qname = rootStcx.resolveQName(eqname, node.pos);
            rootStcx.namespaces[qname.uri].used = true;
        } catch(e) {
            //Ignore resolution exception to avoid duplicates   
        }
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
    Object.keys(rootStcx.variables).forEach(function(key){
        if(!rootStcx.varRefs[key] && (rootStcx.variables[key].annotations['http://www.w3.org/2005/xpath-functions#private'] || rootStcx.moduleNamespace === '')) {
            addWarning('Unused variable "' + rootStcx.variables[key].qname.name + '"', rootStcx.variables[key].pos);
        }
    });
    Object.keys(rootStcx.namespaces).forEach(function(uri){
        var namespace = rootStcx.namespaces[uri];
        if(namespace.used === undefined && !namespace.override && namespace.type === 'module') {
            addWarning('Unused module "' + uri + '"', namespace.pos);
        }
    });
};
