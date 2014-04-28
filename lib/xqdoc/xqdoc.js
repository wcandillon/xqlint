var parseComment = require('./parse_comment').parseComment;

exports.XQDoc = function(ast){
    'use strict';

    var lastComment;
    var doc = {};

    this.getDoc = function(){
        return doc;
    };

    this.WS = function(node){
        lastComment = parseComment(node.value);
    };
  
    this.ModuleDecl = function(){
        //URILiteral
        //doc.ns = 
    };
    
    this.MainModule = function(){
        throw new Error('Cannot get XQDoc from a main module.');
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
