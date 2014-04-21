'use strict';

var trim = function(str){
    return str;
};

exports.parseComment = function(comment){
    comment = trim(comment);
    var isXQDoc = comment.substring(0, 3) === '(:~';
    if(isXQDoc){
        var lines = comment.split('\n');
        lines.forEach(function(line, index){
            if(index === 0) {
                line = line.substring(3);
            } else if(index === lines.length - 1){
                line = line.substring(0, line.length -2);
            }
            line = trim(line);
            if(line[0] === ':') {
                line = line.substring(1);
            }
            line = trim(line);
            console.log(line);
        });
        return lines.join(' ');
    }
};