'use strict';

var fs = require('fs');
var ffs = require('final-fs');
var path = require('path');
var cli = require('commander');
var colors = require('colors');

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
        var source = fs.readFileSync(file, 'utf-8');
        var linter = new XQLint(file, source);
        var markers = linter.getMarkers();
        //var ast = linter.getAST();
        console.log('Linting ' + file + '...');
        if(markers.length === 0) {
            console.log('File OK.');
        } else {
            linter.getErrors().forEach(function(error){
                var line = '[' + (error.pos.sl + 1) + ':' + (error.pos.sc) + '] ' + error.message;
                console.log(line.red);
                line = source.split('\n')[error.pos.sl];
                process.stdout.write(line.substring(0, error.pos.sc).red);
                console.log(line.substring(error.pos.sc).underline.red);
            });
            linter.getWarnings().forEach(function(error){
                var line = '[' + (error.pos.sl + 1) + ':' + (error.pos.sc) + '] ' + error.message;
                console.log(line.yellow);
                line = source.split('\n')[error.pos.sl];
                process.stdout.write(line.substring(0, error.pos.sc).yellow);
                console.log(line.substring(error.pos.sc).underline.yellow);
            });
        }
    });
});

cli.version(pkg.version);
module.exports = cli;
