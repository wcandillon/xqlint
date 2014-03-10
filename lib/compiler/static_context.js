exports.StaticContext = function (parent, pos) {
    'use strict';

    var Errors = require('./errors');
    var StaticError = Errors.StaticError;
    var StaticWarning = Errors.StaticWarning;

    return {
        parent: parent,
        pos: pos,

        defaultFunctionNamespace: '',
        defaultElementNamespace: '',
        namespaces: {},
        addNamespace: function (uri, prefix, pos, type) {
            //Check for empty target namespace
            if (uri === '') {
                throw new StaticError('XQST0088', 'empty target namespace in module import or module declaration', pos);
            }

            //Check for duplicate target namespace
            var namespace = this.getNamespace(uri);
            if (namespace && namespace.type === type && type !== 'declare') {
                throw new StaticError('XQST0047', '"' + uri + '": duplicate target namespace', pos);
            } else if (namespace && (namespace.type === 'declare' || type === 'declare')) {
                throw new StaticWarning('"' + namespace.uri + '" already bound to the "' + namespace.prefix + '" prefix', pos);
            }

            //Check for duplicate prefix
            namespace = this.getNamespaceByPrefix(prefix);
            if (namespace) {
                throw new StaticError('XQST0033', '"' + prefix + '": namespace prefix already bound to "' + namespace.uri + '"', pos);
            }

            this.namespaces[uri] = {
                prefix: prefix,
                pos: pos,
                type: type
            };

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

        }
    };
};