'use strict';

exports.parseComment = function(comment){
    comment = comment.trim();
    var isXQDoc = comment.substring(0, 3) === '(:~';
    if(isXQDoc){
        var lines = comment.split('\n');
        lines.forEach(function(line, index){
            if(index === 0) {
                line = line.substring(3);
            } else if(index === lines.length - 1){
                line = line.substring(0, line.length -2);
            }
            line = line.trim();
            if(line[0] === ':') {
                line = line.substring(1);
            }
            line = line.trim();
            console.log(line);
        });
        return lines.join(' ');
    }
};