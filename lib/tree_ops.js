'use strict';

exports.TreeOps = {
    flatten: function(node){
        var that = this;
        var value = '';
        if (node.value === undefined) {
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
    }
};