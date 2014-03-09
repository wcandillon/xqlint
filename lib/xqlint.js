exports.XQLint = function (file, source) {
    'use strict';
    
    var JSONiqParser = require('./parsers/JSONiqParser').JSONiqParser;
    var XQueryParser = require('./parsers/XQueryParser').XQueryParser;
    var JSONParseTreeHandler = require('./parsers/JSONParseTreeHandler').JSONParseTreeHandler;
    
    var ast;
    this.getAST = function(){
        return ast;
    };
    
    var markers = [];
    this.getMarkers = function(){
        return markers;
    };
    
    var syntaxError = false;
    this.hasSyntaxError = function(){
        return syntaxError;
    };

    var convertPosition = function(code, begin, end){
        var before = code.substring(0, begin);
        var after  = code.substring(0, end);
        var startline = before.split('\n').length;
        var startcolumn = begin - before.lastIndexOf('\n');
        var endline = after.split('\n').length;
        var endcolumn = end - after.lastIndexOf('\n');
        return { sl: startline - 1, sc: startcolumn - 1, el: endline - 1, ec: endcolumn - 1 };
    };
    
    var isJSONiq = ((file.substring(file.length - '.jq'.length).indexOf('.jq') !== -1) && source.indexOf('xquery version') !== 0) || source.indexOf('jsoniq version') === 0;
    var h = new JSONParseTreeHandler(source);
    var parser = isJSONiq ? new JSONiqParser(source, h) : new XQueryParser(source, h);
    try {
        parser.parse_XQuery();
    } catch(e) {
        if(e instanceof parser.ParseException) {
            syntaxError = true;
            h.closeParseTree();
            var pos = convertPosition(source, e.getBegin(), e.getEnd());
            var message = parser.getErrorMessage(e);
            if(pos.sc === pos.ec) {
                pos.ec++;
            }
            markers.push({
                pos: pos,
                type: 'error',
                level: 'error',
                message: message
            });
            ast = h.getParseTree();
        } else {
            throw e;
        }
    }
};