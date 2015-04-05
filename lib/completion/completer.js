'use strict';

var TreeOps = require('../tree_ops').TreeOps;

var ID_REGEX = /[a-zA-Z_0-9\$]/;

function retrievePrecedingIdentifier(text, pos, regex) {
    regex = regex || ID_REGEX;
    var buf = [];
    for (var i = pos-1; i >= 0; i--) {
        if (regex.test(text[i])) {
            buf.push(text[i]);
        } else {
            break;
        }
    }
    return buf.reverse().join('');
}

/*
function retrieveFollowingIdentifier(text, pos, regex) {
    regex = regex || ID_REGEX;
    var buf = [];
    for (var i = pos; i < text.length; i++) {
        if (regex.test(text[i])) {
            buf.push(text[i]);
        } else {
            break;
        }
    }
    return buf;
}
*/

function prefixBinarySearch(items, prefix) {
    var startIndex = 0;
    var stopIndex = items.length - 1;
    var middle = Math.floor((stopIndex + startIndex) / 2);
    
    while (stopIndex > startIndex && middle >= 0 && items[middle].indexOf(prefix) !== 0) {
        if (prefix < items[middle]) {
            stopIndex = middle - 1;
        } else if (prefix > items[middle]) {
            startIndex = middle + 1;
        }
        middle = Math.floor((stopIndex + startIndex) / 2);
    }
    while (middle > 0 && items[middle-1].indexOf(prefix) === 0) {
        middle--;
    }
    return middle >= 0 ? middle : 0; // ensure we're not returning a negative index
}

var uriRegex = /[a-zA-Z_0-9\/\.:\-#]/;
var char = '-._A-Za-z0-9:\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02ff\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203f\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD';
var nameChar = '[' + char + ']';
var varChar = '[' + char + '\\$]';
var nameCharRegExp = new RegExp(nameChar);
var varCharRegExp = new RegExp(varChar);

var varDeclLabels = {
    'LetBinding': 'Let binding',
    'Param': 'Function parameter',
    'QuantifiedExpr': 'Quantified expression binding',
    'VarDeclStatement': 'Local variable',
    'ForBinding': 'For binding',
    'TumblingWindowClause': 'Tumbling window binding',
    'WindowVars': 'Window variable',
    'SlidingWindowClause': 'Sliding window binding',
    'PositionalVar': 'Positional variable',
    'CurrentItem': 'Current item',
    'PreviousItem': 'Previous item',
    'NextItem': 'Next item',
    'CountClause': 'Count binding',
    'GroupingVariable': 'Grouping variable',
    'VarDecl': 'Module variable'
};

var findCompletions = function(prefix, allIdentifiers) {
    allIdentifiers.sort();
    var startIdx = prefixBinarySearch(allIdentifiers, prefix);
    var matches = [];
    for (var i = startIdx; i < allIdentifiers.length && allIdentifiers[i].indexOf(prefix) === 0; i++) {
        matches.push(allIdentifiers[i]);
    }
    return matches;
};


var completePrefix = function(identifier, pos, sctx){
    var idx = identifier.indexOf(':');
    if(idx === -1) {
        var prefixes = [];
        var namespaces = sctx.getNamespaces();
        Object.keys(namespaces).forEach(function(key){
            if(namespaces[key].type === 'module' || key === 'http://www.w3.org/2005/xquery-local-functions') {
                prefixes.push(namespaces[key].prefixes[0]);
            }
        });
        var matches = findCompletions(identifier, prefixes);
        var match = function(name) {
            return {
                name: name + ':',
                value: name + ':',
                meta: 'prefix'
            };
        };
        return matches.map(match);
    } else {
        return [];
    }
};

var completeFunction = function(identifier, pos, sctx){
    var names = [];
    var snippets = {};
    var functions = sctx.getFunctions();
    var uri = '';
    var prefix = '';
    var name = identifier;
    var idx = identifier.indexOf(':');
    var defaultNamespace = false;
    if(idx !== -1){
        prefix = identifier.substring(0, idx);
        name = identifier.substring(idx + 1);
        var ns = sctx.getNamespaceByPrefix(prefix);
        if(ns){
            uri = sctx.getNamespaceByPrefix(prefix).uri;
        }
    } else {
        defaultNamespace = true;
        uri = sctx.root.defaultFunctionNamespace;
    }
    Object.keys(functions).forEach(function(key){
        var fn = functions[key];
        var ns = key.substring(0, key.indexOf('#'));
        var name = key.substring(key.indexOf('#') + 1);
        name = name.substring(0, name.indexOf('#'));
        if(ns !== uri) {
            return;
        }
        if(!defaultNamespace){
            name = sctx.getNamespaces()[ns].prefixes[0] + ':' + name;
        }
        name += '(';
        var snippet = name;
        snippet += fn.params.map(function(param, index){
            return '${' + (index + 1) + ':\\' + param.split(' ')[0] + '}';
        }).join(', ');
        name += fn.params.join(', ');
        name += ')';
        snippet += ')';
        names.push(name);
        snippets[name] = snippet;
    });
    var matches = findCompletions(identifier, names);
    var match = function(name) {
        return {
            //doc:
            //docUrl:
            name: name,
            value: name,
            meta: 'function',
            priority: 4,
            identifierRegex: nameCharRegExp,
            snippet: snippets[name]
        };
    };
    return matches.map(match);
};

var completeVariable = function(identifier, pos, sctx){
    var uri = '';
    var prefix = '';
    var idx = identifier.indexOf(':');
    //Does the identifier has a prefix?
    if(idx !== -1){
        prefix = identifier.substring(0, idx);
        uri = sctx.getNamespaceByPrefix(prefix).uri;
    }
    var decls = sctx.getVariables();
    var names = [];
    var types = {};
    Object.keys(decls).forEach(function(key){
        var i = key.indexOf('#');
        var ns = key.substring(0, i);
        var name = key.substring(i+1);
        if(ns !== ''){
            names.push(sctx.getPrefixesByNamespace(ns)[0] + ':' + name);
            types[sctx.getPrefixesByNamespace(ns)[0] + ':' + name] = decls[key].type;
        } else {
            names.push(name);
            types[name] = decls[key].type;
        }
    });
    
    var matches = findCompletions(identifier, names);
    var match = function(name) {
        return {
            //doc
            //docUrl
            name: '$' + name,
            value: '$' + name,
            meta: varDeclLabels[types[name]],
            priority: 4,
            identifierRegex: varCharRegExp
        };
    };
    return matches.map(match);
};

var completeExpr = function(line, pos, sctx){
    var identifier = retrievePrecedingIdentifier(line, pos.col, nameCharRegExp);
    var before = line.substring(0, pos.col - (identifier.length === 0 ? 0 : identifier.length));
    var isVar = before[before.length - 1] === '$';
    if(isVar) {
        return completeVariable(identifier, pos, sctx);
    } else if(identifier !== '') {
        return completeFunction(identifier, pos, sctx).concat(completePrefix(identifier, pos, sctx));
    } else {
        return completeVariable(identifier, pos, sctx).concat(completeFunction(identifier, pos, sctx)).concat(completePrefix(identifier, pos, sctx));
    }
};

var completeModuleUri = function(line, pos, sctx){
    var identifier = retrievePrecedingIdentifier(line, pos.col, uriRegex);
    var matches = findCompletions(identifier, sctx.getAvailableModuleNamespaces());
    var match = function(uri) {
        return {
            //doc: 
            //docUrl:
            name: uri,
            value: uri,
            meta: 'module',
            priority: 4,
            identifierRegex: uriRegex
        };
    };
    return matches.map(match);
};

exports.complete = function(source, ast, rootSctx, pos){
    var line = source.split('\n')[pos.line];
    var node = TreeOps.findNode(ast, pos);
    var sctx = TreeOps.findNode(rootSctx, pos);
    sctx = sctx ? sctx : rootSctx;
    if(node && node.name === 'URILiteral' && node.getParent && node.getParent.name === 'ModuleImport'){
        return completeModuleUri(line, pos, sctx);
    } else {
        return completeExpr(line, pos, sctx);
    }
};
