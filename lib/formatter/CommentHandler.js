var CommentHandler = exports.CommentHandler = function (code) {

    var ast = null;
    var ptr = null;
    var remains = code;
    var cursor = 0;
    var lineCursor = 0;
    var line = 0;
    var col = 0;

    function createNode(name) {
        return {
            name: name,
            children: [],
            getParent: null,
            pos: {
                sl: 0,
                sc: 0,
                el: 0,
                ec: 0
            }
        };
    }

    function pushNode(name, begin) {
        var node = createNode(name);
        if (ast === null) {
            ast = node;
            ptr = node;
        } else {
            node.getParent = ptr;
            ptr.children.push(node);
            ptr = ptr.children[ptr.children.length - 1];
        }
    }

    function popNode(name, end) {

        if (ptr.children.length > 0) {
            var s = ptr.children[0];
            var e = ptr.children[ptr.children.length - 1];
            ptr.pos.sl = s.pos.sl;
            ptr.pos.sc = s.pos.sc;
            ptr.pos.el = e.pos.el;
            ptr.pos.ec = e.pos.ec;
        }

        if (ptr.getParent !== null) {
            ptr = ptr.getParent;
            for (var i in ptr.children) {
                delete ptr.children[i].getParent;
            }
        } else {
            delete ptr.getParent;
        }
    }

    this.peek = function () {
        return ptr;
    };

    this.getParseTree = function () {
        return ast;
    };

    this.reset = function (input) {};

    this.startNonterminal = function (name, begin) {
        pushNode(name, begin);
    };

    this.endNonterminal = function (name, end) {
        popNode(name, end);
    };

    this.terminal = function (name, begin, end) {
        name = (name.substring(0, 1) === '\'' && name.substring(name.length - 1) === '\'') ? 'TOKEN' : name;
        pushNode(name, begin);
        setValue(ptr, begin, end);
        popNode(name, end);
    };

    this.whitespace = function (begin, end) {
        var name = 'WS';
        pushNode(name, begin);
        setValue(ptr, begin, end);
        popNode(name, end);
    };

    function setValue(node, begin, end) {
        var e = end - cursor;
        ptr.value = remains.substring(0, e);
        var sl = line;
        var sc = line === 0 ? lineCursor : lineCursor - 1;
        var el = sl + ptr.value.split('\n').length - 1;
        var lastIdx = ptr.value.lastIndexOf('\n');
        var ec = lastIdx === -1 ? sc + ptr.value.length : ptr.value.substring(lastIdx).length;
        remains = remains.substring(e);
        cursor = end;
        lineCursor = lastIdx === -1 ? lineCursor + (ptr.value.length) : ec;
        line = el;
        ptr.pos.sl = sl;
        ptr.pos.sc = sc;
        ptr.pos.el = el;
        ptr.pos.ec = ec;
    }
};