'use strict';

var StaticError = function(code, message, loc){
    this.getCode = function(){
        return code;
    };
    
    this.getMessage = function(){
        return message;
    };

    this.getLoc = function(){
        return loc;
    };
};
StaticError.prototype = new Error();
exports.StaticError = StaticError.prototype.constructor = StaticError;