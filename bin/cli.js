'use strict';

var fs = require('fs');
var ffs = require('final-fs');
var path = require('path');
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
.command('parse <path>')
.description('Check queries')
.action(function(p) {
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
    files.forEach(function(file){
        console.log('Check ' + file);
        var source = fs.readFileSync(file, 'utf-8');
        var linter = new XQLint(file, source);
        var markers = linter.getMarkers();
        //var ast = linter.getAST();
        if(markers.length === 0) {
            console.log('File is OK');
        } else {
            console.log(JSON.stringify(markers, null, 2));
        }
    });
});

cli.version(pkg.version);
module.exports = cli;
