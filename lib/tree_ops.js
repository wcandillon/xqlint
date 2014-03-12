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