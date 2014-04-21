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
            case 'variable':
            case 'constant.language.escape':
                output += token.value.cyan;
                break;
            case 'string':
                output += token.value.green;
                break;
            case 'constant':
                output += token.value.red;
                break;
            case 'constant.language':
                output += token.value.red.italic;
                break;
            case 'keyword.operator':
                output += token.value.grey;
                break;
            case 'comment':
            case 'comment.doc':
                output += token.value.grey;
                break;
            case 'comment.doc.tag':
                output += token.value;
                break;
            default:
                output += token.value;
            }
        });
        console.log(output);
    });
};
//meta.tag
//meta.tag.r
//variable
/*
var number = 'constant';
var pi = 'xml-pe';
var pragma = 'constant.buildin';
*/