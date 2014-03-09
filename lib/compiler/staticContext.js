exports.StaticContext = function(){
    'use strict';

    var StaticError = require('./staticError').StaticError;
    
    this.defaultFunctionNamespace = '';
    this.defaultElementNamespace = '';
    
    this.namespaces = {
    };
    
    this.addNamespace = function(uri, prefix, pos, type){
        //Check for empty target namespace
        if(uri === '') {
            throw new StaticError('XQST0088', 'empty target namespace in module import or module declaration', pos);
        }

        //Check for duplicate target namespace
        var namespace = this.getNamespace(uri);
        if(namespace && namespace.type === type) {
            throw new StaticError('XQST0047', '"' + uri + '": duplicate target namespace', pos);
        }
        
        //Check for duplicate prefix
        namespace = this.getNamespaceByPrefix(prefix);
        if(namespace) {
            throw new StaticError('XQST0033', '"' + prefix + '": namespace prefix already bound to "' + namespace.uri + '"', pos);
        }
        
        this.namespaces[uri] = {
            prefix: prefix,
            pos: pos,
            type: type
        };
    };

    this.getNamespace = function(uri) {
        var that = this;
        while(that) {
            var namespace = that.namespaces[uri];
            if(namespace) {
                return namespace;
            }
            that = that.parent;
        }
    };

    this.getNamespaceByPrefix = function(prefix) {
        var handler = function(uri){
            var namespace = that.namespaces[uri];
            if(namespace.prefix === prefix) {
                throw namespace;
            }
        };
        var that = this;
        while(that) {
            try {
                Object.keys(that.namespaces).forEach(handler);
            } catch(e) {
                return e;
            }
            that = that.parent;
        }
    };
};