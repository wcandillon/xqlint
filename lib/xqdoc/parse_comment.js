'use strict';

exports.parseComment = function(comment){
    comment = comment.trim();
    var isXQDoc = comment.substring(0, 3) === '(:~';
    if(isXQDoc){
        var lines = comment.split('\n');
        var ann = {
            description: ''
        };
        lines.forEach(function(line, index){
            if(index === 0) {
                line = line.substring(3);
            }
            line = line.trim();
            if(line[0] === ':') {
                line = line.substring(1);
            }
            line = line.trim();
            ann.description += ' ' + line;
        });
        ann.description = ann.description.trim();
        ann.description = ann.description.substring(0, ann.description.length - 2).trim();
        return ann;
    }
};