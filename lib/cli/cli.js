'use strict';

var fs = require('fs');
var ffs = require('final-fs');
var path = require('path');
var cli = require('commander');
require('colors');

var XQLint = require('../xqlint').XQLint;
//var TreeOps = require('../tree_ops').TreeOps;

var pkg = require('../../package.json');

var printAST = function(ast, indent){
    console.log(indent + ast.name);
    ast.children.forEach(function(child){
        printAST(child, indent + indent);
    });
};

var lintCmd = cli.command('lint <path>');
lintCmd.option(
    '-s, --style-check <yes, no>',
    'Check for code formatting.',
    function(value){
        return value === 'yes';
    }
)
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
    var errors = 0;
    var warnings = 0;
    files.forEach(function(file){
        var source = fs.readFileSync(file, 'utf-8');
        var linter = new XQLint(file, source, undefined, { styleCheck: lintCmd.styleCheck === undefined ? true : lintCmd.styleCheck });
        var markers = linter.getMarkers();
        if(markers.length !== 0) {
            linter.getErrors().forEach(function(error){
                errors++;
                console.log(file);
                var line = '[' + (error.pos.sl + 1) + ':' + (error.pos.sc) + '] ' + error.message;
                console.log(line.red);
                line = source.split('\n')[error.pos.sl];
                process.stdout.write(line.substring(0, error.pos.sc).red);
                console.log(line.substring(error.pos.sc).underline.red);
            });
            linter.getWarnings().forEach(function(error){
                warnings++;
                console.log(file);
                var line = '[' + (error.pos.sl + 1) + ':' + (error.pos.sc) + '] ' + error.message;
                console.log(line.yellow);
                line = source.split('\n')[error.pos.sl];
                process.stdout.write(line.substring(0, error.pos.sc).yellow);
                console.log(line.substring(error.pos.sc).underline.yellow);
            });
        }
    });
    if(errors === 0 && warnings === 0) {
        console.log(('Linted ' + files.length + ' files').green);
    } else if(errors > 0) {
        console.log(('Linted ' + files.length + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').red);
    } else if(warnings > 0) {
        console.log(('Linted ' + files.length + ' files. Found ' + errors + ' errors and ' + warnings + ' warnings.').yellow);
    }
});

cli.version(pkg.version);
module.exports = cli;
