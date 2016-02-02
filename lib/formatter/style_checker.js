exports.StyleChecker = function (ast, source) {
    'use strict';

    //var TreeOps = require('../tree_ops').TreeOps;
    /*
    var tokens = [];
    function getTokenList(node){
        if(node.name === 'TOKEN'){
            tokens.push(node);
        }
        if(node.children){
            node.children.forEach(function(child){
                getTokenList(child);
            });
        }
    };
    getTokenList(ast);
    */

    var tab = '    ';
    var markers = [];
    
    this.getMarkers = function(){
        return markers;
    };

    this.WS = function(node) {
        var lines = node.value.split('\n');
        lines.forEach(function(line, index){
            var isFirst = index === 0;
            var isLast  = index === (lines.length - 1);

            if(/\r$/.test(line)) {
                markers.push({
                    pos: {
                        sl: node.pos.sl + index,
                        el: node.pos.sl + index,
                        sc: line.length - 1,
                        ec: line.length
                    },
                    type: 'warning',
                    level: 'warning',
                    message: '[SW01] Detected CRLF'
                });
            }
            
            var match = line.match(/\t+/);
            if(match !== null){
                markers.push({
                    pos: {
                        sl: node.pos.sl + index,
                        el: node.pos.sl + index,
                        sc: match.index,
                        ec: match.index + match[0].length
                    },
                    type: 'warning',
                    level: 'warning',
                    message: '[SW02] Tabs detected'
                });
            }

            if((!isFirst) && isLast){
                match = line.match(/^\ +/);
                if(match !== null) {
                    var mod = match[0].length % tab.length;
                    if(mod !== 0 && false) {
                        markers.push({
                            pos: {
                                sl: node.pos.sl + index,
                                el: node.pos.sl + index,
                                sc: match.index,
                                ec: match.index + match[0].length
                            },
                            type: 'warning',
                            level: 'warning',
                            message: '[SW03] Unexcepted indentation of ' + match[0].length
                        });
                    }
                }
            }
        });
        return true;
    };
    
    this.visit = function (node, index) {
        var name = node.name;
        var skip = false;

        if (typeof this[name] === 'function') {
            skip = this[name](node, index) === true;
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

    source.split('\n').forEach(function(line, index){
        var match = line.match(/\ +$/);
        if(match){
            markers.push({
                pos: {
                    sl: index,
                    el: index,
                    sc: match.index,
                    ec: match.index + match[0].length
                },
                type: 'warning',
                level: 'warning',
                message: '[SW04] Trailing whitespace'
            });
        }
    });
    this.visit(ast);
};
