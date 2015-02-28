'use strict';

var init = function(that, code, message, pos, type){
    if(!code) {
        throw new Error(type + ' code is missing.');
    }
    
    if(!message) {
        throw new Error(type + ' message is missing.');
    }
    
    if(!pos) {
        throw new Error(type + ' position is missing.');
    }

    that.getCode = function(){
        return code;
    };
    
    that.getMessage = function(){
        return message;
    };

    that.getPos = function(){
        return pos;
    };
};

var StaticError = {};
var StaticWarning = {};
StaticError.prototype = new Error();
StaticWarning.prototype = new Error();

exports.StaticError = StaticError.prototype.constructor = function(code, message, pos) {
    init(this, code, message, pos, 'Error');
};

exports.StaticWarning = StaticWarning.prototype.constructor = function(code, message, pos) {
    init(this, code, message, pos, 'Warning');
};