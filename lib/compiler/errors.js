'use strict';

var StaticError = {};
var StaticWarning = {};
StaticError.prototype = new Error();
StaticWarning.prototype = new Error();

exports.StaticError = StaticError.prototype.constructor = function(code, message, pos){
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

exports.StaticWarning = StaticWarning.prototype.constructor = function(code, message, pos){
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