'use strict';

exports.TreeOps = {
    flatten: function(node){
        var that = this;
        var value = '';
        if(!node) {
            throw new Error('Invalid node found');
        } else if (node.value === undefined) {
            node.children.forEach(function(child){
                value += that.flatten(child);
            });
        } else {
            value += node.value;
        }
        return value;
    },
    
    concat: function(obj1, obj2, copy){
        var result = copy ? {} : obj1;
        if(copy){
            Object.keys(obj1).forEach(function(key){
                result[key] = obj1[key];
            });
        }
        var keys = Object.keys(obj2);
        keys.forEach(function(key){
            result[key] = obj2[key];
        });
        return result;
    },
    
    removeParentPtr: function(ast){
        if(ast.getParent !== undefined) {
            delete ast.getParent;
        }
        for(var i in ast.children) {
            var child = ast.children[i];
            this.removeParentPtr(child);
        }
    },
    
    inRange: function(p, pos, exclusive){
        if(p && p.sl <= pos.line && pos.line <= p.el) {
            if(p.sl < pos.line && pos.line < p.el) {
                return true;
            } else if(p.sl === pos.line && pos.line < p.el) {
                return p.sc <= pos.col;
            } else if(p.sl === pos.line && p.el === pos.line) {
                return p.sc <= pos.col && pos.col <= p.ec + (exclusive ? 1 : 0);
            } else if(p.sl < pos.line && p.el === pos.line) {
                return pos.col <= p.ec + (exclusive ? 1 : 0);
            }
        }
    },
    
    findNode: function(ast, pos) {
        if(!ast) {
            return;
        }
        var p = ast.pos;
        if(this.inRange(p, pos) === true) {
            for(var i in ast.children) {
                var child = ast.children[i];
                var n = this.findNode(child, pos);
                if(n !== undefined) {
                    return n;
                }
            }
            return ast;
        } else {
            return;
        }
    },
    
    astAsXML: function(node, indent){
        var result =  '';
        indent = indent ? indent : '';
        if(node.value) {
            result += (indent + '<' + node.name + '>' + node.value + '</' + node.name + '>\n');
        }
        result += indent + '<' + node.name + '>\n';
        var that = this;
        node.children.forEach(function(child){
            result += that.astAsXML(child, indent + '  ');
        });
        result += indent + '</' + node.name + '>\n';
        return result;
    }
};