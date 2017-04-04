'use strict';

var fs = require('fs');
var ffs = require('final-fs');
var path = require('path');
var cli = require('commander');
require('colors');

var XQLint = require('../xqlint').XQLint;
var JSONiqLexer = require('../lexers/jsoniq_lexer').JSONiqLexer;
var XQueryLexer = require('../lexers/xquery_lexer').XQueryLexer;
var ANSIOutput = require('./outputs/ansi').ANSIOutput;
var CodeFormatter = require('../formatter/formatter').CodeFormatter;

var pkg = require('../../package.json');

var getFiles = function(p){
    p = path.resolve(path.normalize(p));
    var files = [];
    if(fs.statSync(p).isFile()){
        files.push(p);
    } else {
        var list = ffs.readdirRecursiveSync(p, true, p);
        list.forEach(function(file){
            if(['jq', 'xq'].indexOf(file.substring(file.length - 2)) !== -1) {
                files.push(file);
            }
        });
    }
    return files;
};

var formatCmd = cli.command('format <path>');
formatCmd.description('Format queries')
.action(function(p){
    var files = getFiles(p);
    files.forEach(function(file){
        var source = fs.readFileSync(file, 'utf-8');
        var linter = new XQLint(file, source, undefined, { styleCheck: false });
        var formatter = new CodeFormatter(linter.getAST());
        var formatted = formatter.format();
        console.log(formatted.trim());
    });
});

var highlightCmd = cli.command('highlight <path>');
/*
highlightCmd.option(
    '-o, --output <html, ansi>',
    function(value){
        return value.toLowerCase();
    }
)
*/
highlightCmd
.description('Highlight queries')
.action(function(p){
    var files = getFiles(p);
    files.forEach(function(file){
        var source = fs.readFileSync(file, 'utf-8');
        var lines = source.split('\n');
        var isJSONiq = ((file.substring(file.length - '.jq'.length).indexOf('.jq') !== -1) && source.indexOf('xquery version') !== 0) || source.indexOf('jsoniq version') === 0;
        var lexer = isJSONiq ? new JSONiqLexer() : new XQueryLexer();
        var result = [], tokens, state;
        lines.forEach(function(line){
            tokens = lexer.getLineTokens(line, state);
            state = tokens.state;
            result.push(tokens);
        });
        ANSIOutput(result);
        
    });
});

var astCmd = cli.command('ast <path>');
astCmd
.description('Print AST')
.action(function(p){
    var files = getFiles(p);
    files.forEach(function(file){
        var source = fs.readFileSync(file, 'utf-8');
        var linter = new XQLint(source, { fileName: file, styleCheck: false });
        console.log(linter.printAST());
    });
});

var xqdocCmd = cli.command('xqdoc <path>');
xqdocCmd
.description('Print Module XQDoc')
.action(function(p){
    var files = getFiles(p);
    files.forEach(function(file){
        var source = fs.readFileSync(file, 'utf-8');
        var linter = new XQLint(source, { fileName: file, styleCheck: false });
        var xqdoc = linter.getXQDoc();
        console.log(JSON.stringify(xqdoc, null, 2));
    });
});

var lintCmd = cli.command('lint <path>');
lintCmd.option(
    '-e, --emacs',
    'Format for Gnu/Emacs flymake.'
)
.option(
    '-s, --style-check <yes, no>',
    'Check for code formatting.',
    function(value){
        return value === 'yes';
    }
)
.option(
    '-p, --processor <name>',
    'XQuery/JSONiq Processor (e.g. 28msec)',
    function(value) {
        return value.toLowerCase();
    }
)
.description('Check queries')
.action(function(p) {
    var files = getFiles(p);
    var errors = 0;
    var warnings = 0;
    var spaces = function(count){
        var result = '';
        for(var i = 1; i <= count; i++){
            result += ' ';
        }
        return result;
    };
    files.forEach(function(file){
        var source = fs.readFileSync(file, 'utf-8').replace(/^\uFEFF/, '');
        var linter = new XQLint(source, { fileName: file, styleCheck: lintCmd.styleCheck, processor: lintCmd.processor });
        var markers = linter.getMarkers().sort(function(a, b){ return a.sl - b.sl; });
        var lines = source.split('\n');
        if(markers.length !== 0) {
	    if (!lintCmd.emacs) {
		console.log(('\n' + file).bold);
		linter.getErrors().forEach(function(error){
                    errors++;
                    console.log('\t' + (error.pos.sl + 1) + ' |' + (lines[error.pos.sl].grey));
                    console.log('\t' + spaces((error.pos.sl + 1 + '').length + 1) + spaces(error.pos.sc + 1) + ('^ ' + error.message).red);
		});
		linter.getWarnings().forEach(function(error){
                    warnings++;
                    console.log('\t' + (error.pos.sl + 1) + ' |' + (lines[error.pos.sl].grey));
                    console.log('\t' + spaces((error.pos.sl + 1 + '').length + 1) + spaces(error.pos.sc + 1) + ('^ ' + error.message).yellow);
		});
            } else { // --emacs
		markers.forEach(function(marker){
                    console.log(marker.type.toUpperCase() + ': ' + file + ':' + (marker.pos.sl + 1) + ':' + (marker.pos.sc) + ':' + marker.type + ' ' + marker.message);
		});
            }
	}
    });
    if (!lintCmd.emacs) {
	if(errors === 0 && warnings === 0) {
            console.log(('Linted ' + files.length + ' files').green);
	} else if(errors > 0) {
            throw new Error(('Linted ' + files.length + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').red);
	} else if(warnings > 0) {
            throw new Error(('Linted ' + files.length + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').yellow);
	}
    }
});

cli.version(pkg.version);
module.exports = cli;
