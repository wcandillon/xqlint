exports.StyleChecker = function (source) {
    'use strict';

    var markers = [];
    this.getMarkers = function(){
        return markers;
    };
    
    var lines = source.split('\n');
    lines.forEach(function(line, index){
        
        if(/\r$/.test(line)) {
            markers.push({
                pos: {
                    sl: index,
                    el: index,
                    sc: line.length - 1,
                    ec: line.length
                },
                type: 'warning',
                level: 'warning',
                message: 'Detected CRLF'
            });
        }
        
        var result = line.match(/\t/);
        if(result !== null){
            markers.push({
                pos: {
                    sl: index,
                    el: index,
                    sc: result.index,
                    ec: result.index + result[0].length
                },
                type: 'warning',
                level: 'warning',
                message: 'Tabs detected'
            });
        }
    });
};