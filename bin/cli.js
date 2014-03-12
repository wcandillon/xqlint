'use strict';

var fs = require('fs');
var cli = require('commander');

var XQLint = require('../lib/xqlint').XQLint;
var TreeOps = require('../lib/tree_ops').TreeOps;

var pkg = require('../package.json');

var printAST = function(ast, indent){
    console.log(indent + ast.name);
    ast.children.forEach(function(child){
        printAST(child, indent + indent);
    });
};

cli
.command('parse <file>')
.description('Sign-in into 28.io.')
.action(function(file) {
    var source = fs.readFileSync(file, 'utf-8');
    var linter = new XQLint(file, source);
    var markers = linter.getMarkers();
    var ast = linter.getAST();
    //TreeOps.removeParentPtr(ast, '  ');
    //printAST(ast, '  ');
    //console.log(JSON.stringify(ast, null, 2));
    if(markers.length === 0) {
        console.log('File is OK');
    } else {
        console.log(JSON.stringify(markers, null, 2));
    }
});

cli.version(pkg.version);
module.exports = cli;
