'use strict';

var StaticError = {};
var StaticWarning = {};
StaticError.prototype = new Error();
StaticWarning.prototype = new Error();

exports.StaticError = StaticError.prototype.constructor = function(code, message, pos) {
    if(!code) {
        throw new Error('Error code is missing.');
    }
    
    if(!message) {
        throw new Error('Error message is missing.');
    }
    
    if(!pos) {
        throw new Error('Error position is missing.');
    }
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

exports.StaticWarning = StaticWarning.prototype.constructor = function(code, message, pos) {
    if(!code) {
        throw new Error('Warning code is missing.');
    }
    
    if(!message) {
        throw new Error('Warning message is missing.');
    }
    
    if(!pos) {
        throw new Error('Warning position is missing.');
    }
    
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