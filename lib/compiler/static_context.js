exports.StaticContext = function (parent, pos) {
    'use strict';
    
    var TreeOps = require('../tree_ops').TreeOps;
    
    var Errors = require('./errors');
    var StaticError = Errors.StaticError;
    var StaticWarning = Errors.StaticWarning;
    
    var emptyPos = { sl:0, sc: 0, el: 0, ec: 0 };
    var namespaces = {};
    
    var getVarKey = function(qname) {
        return qname.uri + '#' + qname.name;
    };

    var getFnKey = function(qname, arity) {
        return getVarKey(qname) + '#' + arity;
    };

    if(!parent) {
        namespaces['http://jsoniq.org/functions'] = {
            prefix: 'jn',
            pos: emptyPos,
            type: 'module',
            override: true
        };
        namespaces['http://www.w3.org/2005/xpath-functions'] = {
            prefix: 'fn',
            pos: emptyPos,
            type: 'module',
            override: true
        };
        namespaces['http://www.w3.org/2005/xquery-local-functions'] = {
            prefix: 'local',
            pos: emptyPos,
            type: 'declare',
            override: true
        };
        namespaces['http://www.w3.org/2001/XMLSchema-instance'] = {
            prefix: 'xsi',
            pos: emptyPos,
            type: 'declare'
        };
        namespaces['http://www.w3.org/2001/XMLSchema'] = {
            prefix: 'xs',
            pos: emptyPos,
            type: 'declare'
        };
        namespaces['http://www.w3.org/XML/1998/namespace'] = {
            prefix: 'xml',
            pos: emptyPos,
            type: 'declare'
        };
        namespaces['http://zorba.io/annotations'] = {
            prefix: 'an',
            pos: emptyPos,
            type: 'declare',
            override: true
        };
        namespaces['http://www.w3.org/2005/xqt-errors'] = {
            prefix: 'err',
            pos: emptyPos,
            type: 'declare',
            override: true
        };
        namespaces['http://zorba.io/errors'] = {
            prefix: 'zerr',
            pos: emptyPos,
            type: 'declare',
            override: true
        };
    }

    var s = {
        parent: parent,
        children: [],
        pos: pos,
        setModuleResolver: function(resolver){
            this.root.moduleResolver = resolver;
            return this;
        },
        moduleNamespace: '',
        defaultFunctionNamespace: '',
        defaultElementNamespace: '',
        namespaces: namespaces,
        importModule: function(uri, prefix, pos) {
            this.root.addNamespace(uri, prefix, pos, 'module');
            if(this.root.moduleResolver) {
                try {
                    var mod = this.root.moduleResolver(uri, []);
                    TreeOps.concat(this.variables, mod.variables);
                    TreeOps.concat(this.functions, mod.functions);
                } catch(e) {
                    throw new StaticError('XQST0059', 'module "' + uri + '" not found: ' + e, pos);
                }
            }
            return this;
        },
        addNamespace: function (uri, prefix, pos, type) {
            if(prefix === '' && type === 'module') {
                throw new StaticWarning('W01', 'Avoid this type of import. Use import module namespace instead');
            }
            //Check for empty target namespace
            if (uri === '') {
                throw new StaticError('XQST0088', 'empty target namespace in module import or module declaration', pos);
            }

            //Check for duplicate target namespace
            var namespace = this.getNamespace(uri);
            if (namespace && namespace.type === type && type !== 'declare' && !namespace.override) {
                throw new StaticError('XQST0047', '"' + uri + '": duplicate target namespace', pos);
            }

            //Check for duplicate prefix
            namespace = this.getNamespaceByPrefix(prefix);
            if (namespace && !namespace.override) {
                throw new StaticError('XQST0033', '"' + prefix + '": namespace prefix already bound to "' + namespace.uri + '"', pos);
            }

            namespace = this.namespaces[uri];
            this.namespaces[uri] = {
                prefix: prefix,
                pos: pos,
                type: type
            };

            if (namespace) {
                throw new StaticWarning('W02', '"' + uri + '" already bound to the "' + namespace.prefix + '" prefix', pos);
            }

        },
        getNamespace: function (uri) {
            var that = this;
            while (that) {
                var namespace = that.namespaces[uri];
                if (namespace) {
                    return namespace;
                }
                that = that.parent;
            }

        },

        getNamespaceByPrefix: function (prefix) {
            var handler = function (uri) {
                var namespace = that.namespaces[uri];
                if (namespace.prefix === prefix) {
                    namespace.uri = uri;
                    throw namespace;
                }
            };
            var that = this;
            while (that) {
                try {
                    Object.keys(that.namespaces).forEach(handler);
                } catch (e) {
                    return e;
                }
                that = that.parent;
            }

        },
        
        resolveQName: function(value, pos){
            var qname = {
                uri: '',
                prefix: '',
                name: ''
            };
            var idx;
            if (value.substring(0, 2) === 'Q{') {
                idx = value.indexOf('}');
                qname.uri = value.substring(2, idx);
                qname.name = value.substring(idx + 1);
            } else {
                idx = value.indexOf(':');
                qname.prefix = value.substring(0, idx);
                var namespace = this.getNamespaceByPrefix(qname.prefix);
                if(!namespace && qname.prefix !== '') {
                    throw new StaticError('XPST0081', '"' + qname.prefix + '": can not expand prefix of lexical QName to namespace URI', pos);
                }
                if(namespace) {
                    qname.uri = namespace.uri;
                }
                qname.name = value.substring(idx + 1);
            }
            return qname;
        },
        
        variables: {},
        varRefs: {},
    
        addVariable: function(qname, type, pos){
            if(type === 'VarDecl' && qname.uri !== this.moduleNamespace && this.moduleNamespace !== '') {
                throw new StaticError('XQST0048', '"' + qname.prefix + ':' + qname.name + '": Qname not library namespace', pos);
            }
            var key = getVarKey(qname);
            if(type === 'VarDecl' && this.variables[key]) {
                throw new StaticError('XQST0049', '"' + qname.name + '": duplicate variable declaration', pos);
            }
            this.variables[key] = {
                type: type,
                pos: pos,
                qname: qname
            };
            return this;
        },
        
        getVariables: function(){
            var variables = {};
            var that = this;
            while(that){
                Object.keys(that.variables).forEach(function(key){
                    if(!variables[key]){
                        variables[key] = that.variables[key];
                    }
                });
                that = that.parent;
            }
            return variables;
        },
        
        getVariable: function(qname) {
            var key = getVarKey(qname);
            var that = this;
            while(that) {
                if(that.variables[key]) {
                    return that.variables[key];
                }
                that = that.parent;
            }
        },
        
        addVarRef: function(qname, pos){
            var varDecl = this.getVariable(qname);
            //If no moduleResolver is available, then only resolve 'local' variables
            if(!varDecl && (qname.uri === '' || this.root.moduleResolver)) {
                throw new StaticError('XPST0008', '"' + qname.name + '": undeclared variable', pos);
            }
            var key = getVarKey(qname);
            this.varRefs[key] = true;
        },
        
        functions: {},
        
        getFunction: function(qname, arity){
            var key = getFnKey(qname, arity);
            var that = this;
            while(that) {
                if(that.functions[key]) {
                    return that.functions[key];
                }
                that = that.parent;
            }
        },
        
        addFunction: function(qname, arity, pos) {
            if(qname.uri !== this.moduleNamespace && this.moduleNamespace !== '') {
                throw new StaticError('XQST0048', '"' + qname.prefix + ':' + qname.name + '": Qname not library namespace', pos);
            }
            var key = getFnKey(qname, arity);
            if(this.functions[key]) {
                throw new StaticError('XQST0034', '"' + qname.name + '": duplicate function declaration', pos);
            }
            this.functions[key] = {
                pos: pos
            };
            return this;
        }
        
    };
    s.root = parent ? parent.root : s;
    return s;
};