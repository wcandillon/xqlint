'use strict';

var TokenHandler = function(code) {
    var input = code;
    this.tokens = [];
 
    this.reset = function() {
        input = input;
        this.tokens = [];
    };
    
    this.startNonterminal = function() {};
    this.endNonterminal = function() {};

    this.terminal = function(name, begin, end) {
        this.tokens.push({
            name: name,
            value: input.substring(begin, end)
        });
    };

    this.whitespace = function(begin, end) {
        this.tokens.push({
            name: 'WS',
            value: input.substring(begin, end)
        });
    };
};

exports.Lexer = function(Tokenizer, Rules) {
  
    this.tokens = [];
  
    this.getLineTokens = function(line, state, row) {
        state = (state === 'start' || !state) ? '["start"]' : state;
        var stack = JSON.parse(state);
        var h = new TokenHandler(line);
        var tokenizer = new Tokenizer(line, h);
        var tokens = [];
    
        while(true) {
            var currentState = stack[stack.length - 1];
            try {
                h.tokens = [];
                tokenizer['parse_' + currentState]();
                var info = null;
        
                if(h.tokens.length > 1 && h.tokens[0].name === 'WS') {
                    tokens.push({
                        type: 'text',
                        value: h.tokens[0].value
                    });
                    h.tokens.splice(0, 1);
                }
        
                var token = h.tokens[0];
                var rules  = Rules[currentState];
                for(var k = 0; k < rules.length; k++) {
                    var rule = Rules[currentState][k];
                    if((typeof(rule.name) === 'function' && rule.name(token)) || rule.name === token.name) {
                        info = rule;
                        break;
                    }
                }
        
                if(token.name === 'EOF') { break; }
                if(token.value === '') { throw 'Encountered empty string lexical rule.'; }
        
                tokens.push({
                    type: info === null ? 'text' : (typeof(info.token) === 'function' ? info.token(token.value) : info.token),
                    value: token.value
                });
        
                if(info && info.next) {
                    info.next(stack);
                }
      
            } catch(e) {
                if(e instanceof tokenizer.ParseException) {
                    var index = 0;
                    for(var i=0; i < tokens.length; i++) {
                        index += tokens[i].value.length;
                    }
                    tokens.push({ type: 'text', value: line.substring(index) });
                    return {
                        tokens: tokens,
                        state: JSON.stringify(['start'])
                    };
                } else {
                    throw e;
                }
            }
        }
   
    
        if(this.tokens[row] !== undefined) {
            var cachedLine = this.lines[row];
            var begin = sharedStart([line, cachedLine]);
            var diff = cachedLine.length - line.length;
            var idx = 0;
            var col = 0;
            for(var i = 0; i < tokens.length; i++) {
                var t = tokens[i];
                for(var j = 0; j < this.tokens[row].length; j++) {
                    var semanticToken = this.tokens[row][j];
                    if(
                        ((col + t.value.length) <= begin.length && semanticToken.sc === col && semanticToken.ec === (col + t.value.length)) ||
                        (semanticToken.sc === (col + diff) && semanticToken.ec === (col + t.value.length + diff))
                    ) {
                        idx = i;
                        t.type = semanticToken.type;
                    }
                }
                col += t.value.length;
            }
        }

        return {
            tokens: tokens,
            state: JSON.stringify(stack)
        };
    };
  
    function sharedStart(A) {
        A = A.slice(0).sort();
        var tem1, tem2, s;
        tem1 = A[0];
        s = tem1.length;
        tem2 = A.pop();
        while(s && tem2.indexOf(tem1) === -1) {
            tem1 = tem1.substring(0, --s);
        }
        return tem1;
    }
};