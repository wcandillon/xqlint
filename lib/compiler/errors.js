'use strict';

var StaticError = function(code, message, pos){
    this.getCode = function(){
        return code;
    };
    
    this.getMessage = function(){
        return message;
    };

    this.getPos = function(){
        return pos;
    };
};
StaticError.prototype = new Error();
exports.StaticError = StaticError.prototype.constructor = StaticError;


var StaticWarning = function(message, pos){
    this.getMessage = function(){
        return message;
    };

    this.getPos = function(){
        return pos;
    };
};
StaticWarning.prototype = new Error();
exports.StaticWarning = StaticWarning.prototype.constructor = StaticWarning;