var _ = require('lodash');
var parseComment = require('./parse_comment').parseComment;

exports.XQDoc = function(ast){
    'use strict';

    var doc = {};

    this.getDoc = function(){
        return doc;
    };

    this.WS = function(node){
        if(node.value.trim().substring(0, 3) === '(:~') {
            node.getParent.comment = parseComment(node.value);
        }
    };

    this.AnnotatedDecl = function(node){
        this.visitChildren(node);
        node.comment = node.getParent.comment;
        node.getParent.comment = undefined;
    };
    
    this.XQuery = function(node){
        this.visitChildren(node);
    };

    this.getXQDoc = function(sctx){
        var doc = {
            moduleNamespace: sctx.moduleNamespace,
            description: sctx.description,
            variables: [],
            functions: []
        };

        _.forEach(sctx.variables, function(variable){
            var varDecl = _.cloneDeep(variable.qname);
            varDecl.annotations = variable.annotations;
            varDecl.description = variable.description;
            varDecl.type = variable.type;
            varDecl.occurrence = variable.occurrence;
            doc.variables.push(varDecl);
        });

        _.forEach(sctx.functions, function(fn, key){
            if(key.substring(0, 'http://www.w3.org/2001/XMLSchema#'.length) === 'http://www.w3.org/2001/XMLSchema#') {
                return;
            }

            var tokens = key.split('#');
            doc.functions.push({
                name: tokens[0],
                uri: tokens[1],
                params: fn.params
            });
        });

        return doc;
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
