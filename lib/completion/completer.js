'use strict';

var TreeOps = require('../tree_ops').TreeOps;

var ID_REGEX = /[a-zA-Z_0-9\$]/;

function retrievePrecedingIdentifier(text, pos, regex) {
    regex = regex || ID_REGEX;
    var buf = [];
    for (var i = pos-1; i >= 0; i--) {
        if (regex.test(text[i]))
            buf.push(text[i]);
        else
            break;
    }
    return buf.reverse().join("");
}

function retrieveFollowingIdentifier(text, pos, regex) {
    regex = regex || ID_REGEX;
    var buf = [];
    for (var i = pos; i < text.length; i++) {
        if (regex.test(text[i]))
            buf.push(text[i]);
        else
            break;
    }
    return buf;
}

var uriRegex = /[a-zA-Z_0-9\/\.:\-#]/;

var char = '-._A-Za-z0-9:\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02ff\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203f\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD';
var nameChar = '[" + char + "]';
var varChar = '[" + char + "\\$]';
var nameCharRegExp = new RegExp(nameChar);
var varCharRegExp = new RegExp(varChar);

var findCompletions = function(prefix, allIdentifiers) {
    allIdentifiers.sort();
    var startIdx = prefixBinarySearch(allIdentifiers, prefix);
    var matches = [];
    for (var i = startIdx; i < allIdentifiers.length && allIdentifiers[i].indexOf(prefix) === 0; i++)
        matches.push(allIdentifiers[i]);
    return matches;
}

var completeExpr = function(line, pos, sctx){
    var identifier = retrievePrecedingIdentifier(line, pos.sc, nameCharRegExp);
    var before = line.substring(0, pos.column - (identifier.length === 0 ? 0 : identifier.length));
    var isVar = before[before.length - 1] === '$';
    if(isVar) {
        return completeVariable(identifier, pos, sctx);
    } else {
        return completeFunction(identifier, pos, sctx);
    }
};

var completeVariable = function(identifier, pos, sctx){
    var decls = sctx.getVariables();
    var names = Object.keys(decls);
    var matches = findCompletions(identifier, names);
    var match = function(name) {
        return {
            name: "$" + name,
            score: 4,
            value: "$" + name
        };
    };
    return matches.map(match);
};

exports.complete = function(source, ast, rootSctx, pos){
    var line = source.split('\n')[pos.sl];
    var node = TreeOps.findNode(ast, pos);
    var sctx = TreeOps.findNode(sctx, pos);
    return completeExpr(line, pos, sctx);
    //if(node && currentNode.name === "URILiteral" && currentNode.getParent && currentNode.getParent.name === "SchemaImport") {
    //
    //} else if(node && currentNode.name === "URILiteral" && currentNode.getParent ){
    //
    //} else {
    //    return completeExpr(line, pos, sctx);
    //}
};