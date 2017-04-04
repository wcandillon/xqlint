exports.Translator = function(rootStcx, ast){
    'use strict';

    var Errors = require('./errors');
    var StaticError = Errors.StaticError;
    var StaticWarning = Errors.StaticWarning;
    
    var TreeOps = require('../tree_ops').TreeOps;
    var StaticContext = require('./static_context').StaticContext;
    var Handlers = require('./handlers');

    var markers = [];

    var addStaticError = function(e){
        markers.push({
            pos: e.getPos(),
            type: 'error',
            level: 'error',
            message: '[' + e.getCode() + '] ' + e.getMessage()
        });
    };

    var addWarning = function(code, message, pos) {
        markers.push({
            pos: pos,
            type: 'warning',
            level: 'warning',
            message: '[' + code + '] ' + message
        });
    };

    var get = function(node, path){
        var result = [];
        if(path.length === 0){
            return node;
        }
        node.children.forEach(function(child){
            if(child.name === path[0] && path.length > 1) {
                result = get(child, path.slice(1));
            } else if(child.name === path[0]) {
                result.push(child);
            }
        });
        return result;
    };

    this.apply = function(fn) {
        try {
            fn();
        } catch(e) {
            if(e instanceof StaticError) {
                addStaticError(e);
            } else if(e instanceof StaticWarning) {
                addWarning(e.getCode(), e.getMessage(), e.getPos());
            } else {
                throw e;
            }
        }
    };
    
    this.getMarkers = function(){
        return markers;
    };

    var translator = this;

    rootStcx.pos = ast.pos;
    var sctx = rootStcx;
    var pushSctx = function(pos){
        sctx = new StaticContext(sctx, pos);
        sctx.parent.children.push(sctx);
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
            if(!sctx.varRefs[key] && sctx.variables[key].type !== 'GroupingVariable' && sctx.variables[key].type !== 'CatchVar') {
                addWarning('W03', 'Unused variable "$' + sctx.variables[key].qname.name + '"', sctx.variables[key].pos);
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

    this.XQuery = function(node) {
        rootStcx.description = node.comment ? node.comment.description : undefined;
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
                var qname, pos, params = [];
                node.children.forEach(function(child){
                    if(child.name === 'EQName') {
                        qname = child;
                        pos = child.pos;
                    } else if(child.name === 'ParamList'){
                        child.children.forEach(function(c){
                            if(c.name === 'Param') {
                                params.push(TreeOps.flatten(c));
                            }
                        });
                    }
                });
                translator.apply(function(){
                    qname = TreeOps.flatten(qname);
                    qname = rootStcx.resolveQName(qname, pos);
                    rootStcx.addFunction(qname, pos, params);
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
        annotations = {};
        this.visitChildren(node, Handlers.NamespaceDecl(translator, rootStcx, node));
        return true;
    };
    
    this.CompatibilityAnnotation = function(){
        annotations['http://www.w3.org/2012/xquery#updating'] = [];
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
        //var typeDecl = get(node, ['TypeDeclaration']);
        //if(!typeDecl){
        //    addWarning('W05', 'Untyped module variable', node.pos);
        //}
        try {
            var varname = translator.getFirstChild(node, 'VarName');
            var value = TreeOps.flatten(varname);
            var qname = sctx.resolveQName(value, varname.pos);
            var variable = rootStcx.getVariable(qname);
            if(variable) {
                variable.annotations = annotations;
                variable.description = node.getParent.comment ? node.getParent.comment.description : undefined;
                variable.type = TreeOps.flatten(get(node, ['TypeDeclaration'])[0]).substring(2).trim();
                var last = variable.type.substring(variable.type.length - 1);
                if(last === '?') {
                    variable.occurrence = 0;
                    variable.type = variable.type.substring(0, variable.type.length - 1);
                } else if(last === '*') {
                    variable.occurrence = -1;
                    variable.type = variable.type.substring(0, variable.type.length - 1);
                } else if(last === '+') {
                    variable.occurrence = 2;
                    variable.type = variable.type.substring(0, variable.type.length - 1);
                } else {
                    variable.occurrence = 1;
                }
            }
        } catch(e) {
            //ignore resolution exceptions
        }
        this.visitOnly(node, ['ExprSingle', 'VarValue', 'VarDefaultValue']);
        return true;
    };
    
    this.FunctionDecl = function(node) {
        //var updateAn = get(node, ['CompatibilityAnnotation'])[0];
        //console.log(updateAn);
        var isUpdating = annotations['http://www.w3.org/2012/xquery#updating'] !== undefined;
        var typeDecl = get(node, ['ReturnType'])[0];
        var name = get(node, ['EQName'])[0];
        if(!typeDecl && !isUpdating){
            addWarning('W05', 'Untyped return value', name.pos);
        }
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
        var typeDecl = get(node, ['TypeDeclaration'])[0];
        if(!typeDecl){
            addWarning('W05', 'Untyped function parameter', node.pos);
        }
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
    this.FLWORExpr = this.FLWORStatement = function (node) {
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
    
    //this.ReturnClause = function(node){
        //var expr = get(['ExprSingle', 'FLWORExpr']);
    //    console.log(astAsXML(node));
    //};
    
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
        return true;
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

    //SwitchExpr ::= 'switch' '(' Expr ')' SwitchCaseClause+ 'default' 'return' ExprSingle
    //SwitchCaseClause ::= ( 'case' SwitchCaseOperand )+ 'return' ExprSingle
    //SwitchCaseOperand ::= ExprSingle
    /*
    this.SwitchCaseClause = function(node){
        pushSctx(node.pos);
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        this.visitOnly(node, ['ExprSingle']);
        popSctx();
        return true;
    };
     */

    this.CaseClause = function(node) {
        pushSctx(node.pos);
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        this.visitOnly(node, ['ExprSingle']);
        popSctx();
        return true;
    };

    //TransformExpr ::= 'copy' TransformSpec ( ',' TransformSpec )* 'modify' ExprSingle 'return' ExprSingle
    //TransformSpec ::= '$' VarName ':=' ExprSingle
    var copies = [];
    this.TransformExpr = function (node) {
        pushSctx(node.pos);
        copies.push(0);
        this.visitChildren(node);
        for(var i=1; i <= copies[copies.length - 1]; i++) {
            popSctx(node.pos);
        }
        copies.pop();
        popSctx();
        return true;
    };
    
    this.TransformSpec = function(node) {
        this.visitOnly(node, ['ExprSingle']);
        pushSctx(node.pos);
        copies[copies.length-1] += 1;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    //QuantifiedExpr ::= ( 'some' | 'every' ) QuantifiedVarDecl ( ',' QuantifiedVarDecl )* 'satisfies' ExprSingle
    //QuantifiedVarDecl ::= '$' VarName TypeDeclaration? 'in' ExprSingle
    var quantifiedDecls = [];
    this.QuantifiedExpr = function (node) {
        pushSctx(node.pos);
        quantifiedDecls.push(0);
        this.visitChildren(node);
        for(var i=1; i <= quantifiedDecls[quantifiedDecls.length - 1]; i++) {
            popSctx(node.pos);
        }
        quantifiedDecls.pop();
        popSctx();
        return true;
    };
    
    this.QuantifiedVarDecl = function(node) {
        this.visitOnly(node, ['ExprSingle']);
        pushSctx(node.pos);
        quantifiedDecls[quantifiedDecls.length - 1]++;
        this.visitChildren(node, Handlers.VarHandler(translator, sctx, node));
        return true;
    };

    this.NamedFunctionRef = function(node){
        var name = translator.getFirstChild(node, 'EQName');
        var eqname = TreeOps.flatten(name);
        var arity = TreeOps.flatten(translator.getFirstChild(node, 'IntegerLiteral'));
        translator.apply(function(){
            var qname = sctx.resolveQName(eqname, node.pos);
            try {
                if(qname.uri !== '') {
                    sctx.root.namespaces[qname.uri].used = true;
                }
            } catch(e){
                //We ignore exceptions here to avoid duplicate markers
            }
            rootStcx.addFunctionRef(qname, arity, name.pos);
        });
        return true;
    };

    this.FunctionCall = function(node){
        this.visitOnly(node, ['ArgumentList']);
        var name = translator.getFirstChild(node, 'EQName');
        var eqname = TreeOps.flatten(name);
        var arity = get(node, ['ArgumentList', 'Argument']).length;
        translator.apply(function(){
            var qname = sctx.resolveQName(eqname, node.pos);
            try {
                if(qname.uri !== '') {
                    sctx.root.namespaces[qname.uri].used = true;
                }
            } catch(e){
                //We ignore exceptions here to avoid duplicate markers
            }
            rootStcx.addFunctionRef(qname, arity, name.pos);
        });
        return true;
    };
    
    this.TryClause = function(node){
        pushSctx(node.pos);
        this.visitChildren(node);
        popSctx();
        return true;
    };
    
    this.CatchClause = function(node){
        pushSctx(node.pos);
        var prefix = 'err';
        var uri = 'http://www.w3.org/2005/xqt-errors';
        var emptyPos = { sl: 0, sc: 0, el: 0, ec: 0 };
        sctx.addVariable({ prefix: prefix, uri: uri, name: 'code' }, 'CatchVar', emptyPos);
        sctx.addVariable({ prefix: prefix, uri: uri, name: 'description' }, 'CatchVar', emptyPos);
        sctx.addVariable({ prefix: prefix, uri: uri, name: 'value' }, 'CatchVar', emptyPos);
        sctx.addVariable({ prefix: prefix, uri: uri, name: 'module' }, 'CatchVar', emptyPos);
        sctx.addVariable({ prefix: prefix, uri: uri, name: 'line-number' }, 'CatchVar', emptyPos);
        sctx.addVariable({ prefix: prefix, uri: uri, name: 'column-number' }, 'CatchVar', emptyPos);
        sctx.addVariable({ prefix: prefix, uri: uri, name: 'additional' }, 'CatchVar', emptyPos);
        this.visitChildren(node);
        popSctx();
        return true;
    };

    this.Pragma = function(node){
        var qname = TreeOps.flatten(get(node, ['EQName'])[0]);
        qname = rootStcx.resolveQName(qname, node);
        var value = TreeOps.flatten(get(node, ['PragmaContents'])[0]);
        if (qname.name === 'xqlint' && qname.uri === 'http://xqlint.io') {
            pushSctx(node.pos);
            var commands = value.match(/[a-zA-Z]+\(([^)]+)\)/g);
            commands.forEach(function (command) {
                var name = command.substring(0, command.indexOf('('));
                var args = command.substring(0, command.length - 1).substring(command.indexOf('(') + 1).split(',').map(function (val) {
                    return val.trim();
                });
                if (name === 'varrefs') {
                    args.forEach(function (arg) {
                        var qname = sctx.resolveQName(arg.substring(1), node.pos);
                        if (qname.uri !== '') {
                            sctx.root.namespaces[qname.uri].used = true;
                        }
                        sctx.addVarRef(qname, node.pos);
                    });
                }
            });
            this.visitChildren(node);
            popSctx();
            return true;
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

    //
    Object.keys(rootStcx.functionRefs).filter(function(ref){
        return ref[0] === '#';
    }).forEach(function(ref){
        rootStcx.functionRefs[rootStcx.defaultFunctionNamespace + ref] = rootStcx.functionRefs[ref];
        delete rootStcx.functionRefs[ref];
    });
    Object.keys(rootStcx.functions)
    .filter(function(fn){
        return fn.substring(0, 'http://www.w3.org/2005/xquery-local-functions'.length) === 'http://www.w3.org/2005/xquery-local-functions';
    })
    .map(function(fn){
        if(!rootStcx.functionRefs[fn]) {
            addWarning('W03', 'Unused function ' + fn.substring('http://www.w3.org/2005/xquery-local-functions'.length + 1), rootStcx.functions[fn].pos);
        }
    });

    //
    Object.keys(rootStcx.variables).forEach(function(key){
        if(!rootStcx.varRefs[key] && (rootStcx.variables[key].annotations['http://www.w3.org/2005/xpath-functions#private'] || rootStcx.moduleNamespace === '') && rootStcx.variables[key].pos) {
            addWarning('W03', 'Unused variable "' + rootStcx.variables[key].qname.name + '"', rootStcx.variables[key].pos);
        }
    });

    //
    Object.keys(rootStcx.namespaces).forEach(function(uri){
        var namespace = rootStcx.namespaces[uri];
        if(namespace.used === undefined && !namespace.override && namespace.type === 'module') {
            addWarning('W04', 'Unused module "' + uri + '"', namespace.pos);
        }
    });
};
