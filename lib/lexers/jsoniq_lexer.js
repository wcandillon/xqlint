'use strict';

var JSONiqTokenizer = require('./JSONiqTokenizer').JSONiqTokenizer;
var Lexer = require('./lexer').Lexer;

var keys = 'NaN|after|allowing|ancestor|ancestor-or-self|and|append|array|as|ascending|at|attribute|base-uri|before|boundary-space|break|by|case|cast|castable|catch|child|collation|comment|constraint|construction|contains|context|continue|copy|copy-namespaces|count|decimal-format|decimal-separator|declare|default|delete|descendant|descendant-or-self|descending|digit|div|document|document-node|element|else|empty|empty-sequence|encoding|end|eq|every|except|exit|external|false|first|following|following-sibling|for|from|ft-option|function|ge|greatest|group|grouping-separator|gt|idiv|if|import|in|index|infinity|insert|instance|integrity|intersect|into|is|item|json|json-item|jsoniq|last|lax|le|least|let|loop|lt|minus-sign|mod|modify|module|namespace|namespace-node|ne|next|node|nodes|not|null|object|of|only|option|or|order|ordered|ordering|paragraphs|parent|pattern-separator|per-mille|percent|preceding|preceding-sibling|previous|processing-instruction|rename|replace|return|returning|revalidation|satisfies|schema|schema-attribute|schema-element|score|select|self|sentences|sliding|some|stable|start|strict|switch|text|then|times|to|treat|true|try|tumbling|type|typeswitch|union|unordered|updating|validate|value|variable|version|when|where|while|window|with|words|xquery|zero-digit'.split('|');
var keywords = keys.map(function(val) { return { name: '\'' + val + '\'', token: 'keyword' }; });
var ncnames = keys.map(function(val) { return { name: '\'' + val + '\'', token: 'text', next: function(stack){ stack.pop(); } }; });

var cdata = 'constant.language';
var number = 'constant';
var xmlcomment = 'comment';
var pi = 'xml-pe';
var pragma = 'constant.buildin';
var n = function(name){
    return '\'' + name + '\'';
};
var Rules = {
    start: [
        { name: n('(#'), token: pragma, next: function(stack){ stack.push('Pragma'); } },
        { name: n('(:'), token: 'comment', next: function(stack){ stack.push('Comment'); } },
        { name: n('(:~'), token: 'comment.doc', next: function(stack){ stack.push('CommentDoc'); } },
        { name: n('<!--'), token: xmlcomment, next: function(stack){ stack.push('XMLComment'); } },
        { name: n('<?'), token: pi, next: function(stack) { stack.push('PI'); } },
        { name: n('\'\''), token: 'string', next: function(stack){ stack.push('AposString'); } },
        { name: n('"'), token: 'string', next: function(stack){ stack.push('QuotString'); } },
        { name: 'Annotation', token: 'support.function' },
        { name: 'ModuleDecl', token: 'keyword', next: function(stack){ stack.push('Prefix'); } },
        { name: 'OptionDecl', token: 'keyword', next: function(stack){ stack.push('_EQName'); } },
        { name: 'AttrTest', token: 'support.type' },
        { name: 'Variable', token: 'variable' },
        { name: n('<![CDATA['), token: cdata, next: function(stack){ stack.push('CData'); } },
        { name: 'IntegerLiteral', token: number },
        { name: 'DecimalLiteral', token: number },
        { name: 'DoubleLiteral', token: number },
        { name: 'Operator', token: 'keyword.operator' },
        { name: 'EQName', token: function(val) { return keys.indexOf(val) !== -1 ? 'keyword' : 'support.function'; } },
        { name: n('('), token: 'lparen' },
        { name: n(')'), token: 'rparen' },
        { name: 'Tag', token: 'meta.tag', next: function(stack){ stack.push('StartTag'); } },
        { name: n('}'), token: 'text', next: function(stack){ if(stack.length > 1) { stack.pop(); } } },
        { name: n('{'), token: 'text', next: function(stack){ stack.push('start'); } } //, next: function(stack){ if(stack.length > 1) { stack.pop(); } } }
    ].concat(keywords),
    _EQName: [
        { name: 'EQName', token: 'text', next: function(stack) { stack.pop(); } }
    ].concat(ncnames),
    Prefix: [
        { name: 'NCName', token: 'text', next: function(stack) { stack.pop(); } }
    ].concat(ncnames),
    StartTag: [
        { name: n('>'), token: 'meta.tag', next: function(stack){ stack.push('TagContent'); } },
        { name: 'QName', token: 'entity.other.attribute-name' },
        { name: n('='), token: 'text' },
        { name: n('\'\''), token: 'string', next: function(stack){ stack.push('AposAttr'); } },
        { name: n('"'), token: 'string', next: function(stack){ stack.push('QuotAttr'); } },
        { name: n('/>'), token: 'meta.tag.r', next: function(stack){ stack.pop(); } }
    ],
    TagContent: [
        { name: 'ElementContentChar', token: 'text' },
        { name: n('<![CDATA['), token: cdata, next: function(stack){ stack.push('CData'); } },
        { name: n('<!--'), token: xmlcomment, next: function(stack){ stack.push('XMLComment'); } },
        { name: 'Tag', token: 'meta.tag', next: function(stack){ stack.push('StartTag'); } },
        { name: 'PredefinedEntityRef', token: 'constant.language.escape' },
        { name: 'CharRef', token: 'constant.language.escape' },
        { name: n('{{'), token: 'text' },
        { name: n('}}'), token: 'text' },
        { name: n('{'), token: 'text', next: function(stack){ stack.push('start'); } },
        { name: 'EndTag', token: 'meta.tag', next: function(stack){ stack.pop(); stack.pop(); } }
    ],
    AposAttr: [
        { name: n('\'\''), token: 'string', next: function(stack){ stack.pop(); } },
        { name: 'EscapeApos', token: 'constant.language.escape' },
        { name: 'AposAttrContentChar', token: 'string' },
        { name: 'PredefinedEntityRef', token: 'constant.language.escape' },
        { name: 'CharRef', token: 'constant.language.escape' },
        { name: n('{{'), token: 'string' },
        { name: n('}}'), token: 'string' },
        { name: n('{'), token: 'text', next: function(stack){ stack.push('start'); } }
    ],
    QuotAttr: [
        { name: n('\"'), token: 'string', next: function(stack){ stack.pop(); } },
        { name: 'EscapeQuot', token: 'constant.language.escape' },
        { name: 'QuotAttrContentChar', token: 'string' },
        { name: 'PredefinedEntityRef', token: 'constant.language.escape' },
        { name: 'CharRef', token: 'constant.language.escape' },
        { name: n('{{'), token: 'string' },
        { name: n('}}'), token: 'string' },
        { name: n('{'), token: 'text', next: function(stack){ stack.push('start'); } }
    ],
    Pragma: [
        { name: 'PragmaContents', token: pragma },
        { name: n('#'), token: pragma },
        { name: n('#)'), token: pragma, next: function(stack){ stack.pop(); } }
    ],
    Comment: [
        { name: 'CommentContents', token: 'comment' },
        { name: n('(:'), token: 'comment', next: function(stack){ stack.push('Comment'); } },
        { name: n(':)'), token: 'comment', next: function(stack){ stack.pop(); } }
    ],
    CommentDoc: [
        { name: 'DocCommentContents', token: 'comment.doc' },
        { name: 'DocTag', token: 'comment.doc.tag' },
        { name: n('(:'), token: 'comment.doc', next: function(stack){ stack.push('CommentDoc'); } },
        { name: n(':)'), token: 'comment.doc', next: function(stack){ stack.pop(); } }
    ],
    XMLComment: [
        { name: 'DirCommentContents', token: xmlcomment },
        { name: n('-->'), token: xmlcomment, next: function(stack){ stack.pop(); } }
    ],
    CData: [
        { name: 'CDataSectionContents', token: cdata },
        { name: n(']]>'), token: cdata, next: function(stack){ stack.pop(); } }
    ],
    PI: [
        { name: 'DirPIContents', token: pi },
        { name: n('?'), token: pi },
        { name: n('?>'), token: pi, next: function(stack){ stack.pop(); } }
    ],
    AposString: [
        { name: n('\'\''), token: 'string', next: function(stack){ stack.pop(); } },
        { name: 'PredefinedEntityRef', token: 'constant.language.escape' },
        { name: 'CharRef', token: 'constant.language.escape' },
        { name: 'EscapeApos', token: 'constant.language.escape' },
        { name: 'AposChar', token: 'string' }
    ],
    QuotString: [
        { name: n('"'), token: 'string', next: function(stack){ stack.pop(); } },
        { name: 'JSONPredefinedCharRef', token: 'constant.language.escape' },
        { name: 'JSONCharRef', token: 'constant.language.escape' },
        { name: 'JSONChar', token: 'string' }
    ]
};
    
exports.JSONiqLexer = function(){ return new Lexer(JSONiqTokenizer, Rules); };