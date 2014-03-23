'use strict';

require('colors');

exports.ANSIOutput = function(lines){
    lines.forEach(function(line){
        var output = '';
        line.tokens.forEach(function(token){
            switch(token.type){
            case 'keyword':
                output += token.value.blue;
                break;
            case 'meta.tag':
                output += token.value.cyan;
                break;
            case 'variable':
                output += token.value.cyan;
                break;
            case 'string':
                output += token.value.green;
                break;
            case 'constant':
                output += token.value.red;
                break;
            case 'comment':
                output += token.value.grey;
                break;
            default:
                output += token.value;
            }
        });
        console.log(output);
    });
};
//constant.language.escape
//comment.doc
//comment.doc.tag
//meta.tag
//meta.tag.r
//keyword.operator
//variable
/*
var cdata = 'constant.language';
var number = 'constant';
var xmlcomment = 'comment';
var pi = 'xml-pe';
var pragma = 'constant.buildin';
*/