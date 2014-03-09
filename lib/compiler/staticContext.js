exports.StaticContext = function(){
    'use strict';

    var StaticError = require('./staticError').StaticError;
    
    this.namespaces = {
    };
    
    this.addNamespace = function(uri, prefix, loc, type){
        if(uri === '') {
            throw new StaticError('XQST0088', 'empty target namespace in module import or module declaration', loc);
        }

        //Check for duplicate target namespace
        var namespace = this.getNamespace(uri);
        if(namespace && namespace.type === type) {
            throw new StaticError('XQST0047', '"' + uri + '": duplicate target namespace', namespace.loc);
        }
        
        //Check for duplicate prefix
        namespace = this.getNamespaceByPrefix(prefix);
        if(namespace) {
            throw new StaticError('XQST0033', '"' + prefix + '": namespace prefix already bound to "' + namespace.uri + '"', namespace.loc);
        }
        
        this.namespaces[uri] = {
            prefix: prefix,
            loc: loc,
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