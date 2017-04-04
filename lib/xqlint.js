'use strict';

var _ = require('lodash');

var JSONiqParser = require('./parsers/JSONiqParser').JSONiqParser;
var XQueryParser = require('./parsers/XQueryParser').XQueryParser;
var JSONParseTreeHandler = require('./parsers/JSONParseTreeHandler').JSONParseTreeHandler;
var Translator = require('./compiler/translator').Translator;
var StyleChecker = require('./formatter/style_checker').StyleChecker;
var XQDoc = require('./xqdoc/xqdoc').XQDoc;
var completer = require('../lib/completion/completer');
var TreeOps = require('./tree_ops').TreeOps;

var createStaticContext = exports.createStaticContext = function(processor){
    var StaticContext = require('./compiler/static_context').StaticContext;
    return new StaticContext(undefined, undefined, processor);
};

var convertPosition = function (code, begin, end) {
    var before = code.substring(0, begin);
    var after = code.substring(0, end);
    var startline = before.split('\n').length;
    var startcolumn = begin - before.lastIndexOf('\n');
    var endline = after.split('\n').length;
    var endcolumn = end - after.lastIndexOf('\n');
    var pos = {
        sl: startline - 1,
        sc: startcolumn - 1,
        el: endline - 1,
        ec: endcolumn - 1
    };
    return pos;
};

exports.JSONiqLexer = require('./lexers/jsoniq_lexer').JSONiqLexer;
exports.XQueryLexer = require('./lexers/xquery_lexer').XQueryLexer;
exports.XQLint = function (source, opts) {

    //ACE editor worker hack
    if(_.defaults) {
        opts = _.defaults(opts ? opts : {}, { styleCheck: false });
    }

    var ast, xqdoc;
    var sctx = opts.staticContext ? opts.staticContext : createStaticContext(opts.processor);

    this.getAST = function () {
        return ast;
    };
    
    this.printAST = function () {
        return TreeOps.astAsXML(ast, '  ');
    };

    this.getXQDoc = function () {
        return xqdoc.getXQDoc(sctx);
    };

    var markers = [];
    this.getMarkers = function () {
        return markers;
    };
    
    this.getMarkers = function(type){
        var m = [];
        markers.forEach(function(marker){
            if(marker.type === type || type === undefined){
                m.push(marker);
            }
        });
        return m;
    };

    this.getErrors = function(){
        return this.getMarkers('error');
    };

    this.getWarnings = function(){
        return this.getMarkers('warning');
    };
    
    this.getCompletions = function(pos){
        return completer.complete(source, ast, sctx, pos);
    };

    var syntaxError = false;
    this.hasSyntaxError = function () {
        return syntaxError;
    };

    var file = opts.fileName ? opts.fileName : '';
    var isJSONiq = ((file.substring(file.length - '.jq'.length).indexOf('.jq') !== -1) && source.indexOf('xquery version') !== 0) || source.indexOf('jsoniq version') === 0;
    var h = new JSONParseTreeHandler(source);
    var parser = isJSONiq ? new JSONiqParser(source, h) : new XQueryParser(source, h);
    try {
        parser.parse_XQuery();
    } catch (e) {
        if (e instanceof parser.ParseException) {
            syntaxError = true;
            h.closeParseTree();
            var pos = convertPosition(source, e.getBegin(), e.getEnd());
            var message = parser.getErrorMessage(e);
            if (pos.sc === pos.ec) {
                pos.ec++;
            }
            markers.push({
                pos: pos,
                type: 'error',
                level: 'error',
                message: message
            });
        } else {
            throw e;
        }
    }
    ast = h.getParseTree();
    if(opts.styleCheck) {
        markers = markers.concat(new StyleChecker(ast, source).getMarkers());
    }
    xqdoc = new XQDoc(ast);
    var translator = new Translator(sctx, ast);
    markers = markers.concat(translator.getMarkers());
};
