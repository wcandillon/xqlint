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
    }
};