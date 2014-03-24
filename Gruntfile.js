module.exports = function(grunt) {
	'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);
    
    grunt.registerMultiTask('rex', 'Generate Parsers', function(){
        var fs = require('fs');
        var request = require('request');
        var FormData = require('form-data');
        var path = require('path');
        var done = this.async();
        var count = this.data.grammars.length;
		
        this.data.grammars.forEach(function(parser){

            var requestCallback = function(err, res, body) {
                fs.writeFileSync(parser.destination, body);
                count--;
                if(count === 0) {
                    done();
                }
            };
            
            var grammar = fs.readFileSync(parser.source);

            var form = new FormData();
            form.append('tz', parser.tz, { knownLength: new Buffer(parser.tz).length, contentType: 'text/plain'  });
            form.append('command', parser.command, { knownLength: new Buffer(parser.command).length, contentType: 'text/plain' });
            form.append('input', grammar, { knownLength : new Buffer(grammar).length, contentType: 'text/plain', filename: path.basename(parser.source) });
            form.getLength(function(err, length){
                if (err) {
                    return requestCallback(err);
                }
                var r = request.post('http://www.bottlecaps.de/rex/', requestCallback);
                r._form = form;
                r.setHeader('content-length', length);
            });
        });
    });
 
    grunt.initConfig({
        rex: {
            parsers: {
                grammars: [
					{
						source: 'lib/parsers/XQueryParser.ebnf',
						destination: 'lib/parsers/XQueryParser.js',
						command: '-ll 2 -backtrack -tree -javascript -a xqlint',
						tz: '-60',
					},
					{
						source: 'lib/parsers/JSONiqParser.ebnf',
						destination: 'lib/parsers/JSONiqParser.js',
						command: '-ll 2 -backtrack -tree -javascript -a xqlint',
						tz: '-60',
					}
                ]
            },
			lexers: {
                grammars: [
                    {
						source: 'lib/lexers/XQueryTokenizer.ebnf',
                        destination: 'lib/lexers/XQueryTokenizer.js',
                        command: '-ll 2 -backtrack -tree -javascript -a xqlint',
                        tz: '-60'
                    },
                    {
						source: 'lib/lexers/JSONiqTokenizer.ebnf',
                        destination: 'lib/lexers/JSONiqTokenizer.js',
                        command: '-ll 2 -backtrack -tree -javascript -a xqlint',
                        tz: '-60'
                    }
				]
			}
		},
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'lib/**/*.js',
                'test/**/*.js'
            ]
        },
        vows: {
            all: {
                options: {
                    verbose: true,
                    colors: true,
                    coverage: 'json'
                },
                // String or array of strings
                // determining which files to include.
                // This option is grunt's "full" file format.
                src: ['test/*.js', 'spec/*']
            }
        },
        ace_build: {
            dist: {
                files: {
                    'ace_build/xqlint.js': ['lib/xqlint.js'],
                    'ace_build/xquery_lexer.js': ['lib/lexers/XQueryLexer.js'],
                    'ace_build/jsoniq_lexer.js': ['lib/lexers/JSONiqLexer.js']
                }
            },
            options: {
                standalone: 'ace/mode/xquery'
            }
        },
        browser_build: {
            dist: {
                files: {
                    'build/xqlint.js': ['lib/xqlint.js'],
                    'build/xquery_lexer.js': ['lib/lexers/XQueryLexer.js'],
                    'build/jsoniq_lexer.js': ['lib/lexers/JSONiqLexer.js']
                }
            },
            options: {
                standalone: ''
            }
        }
    });
    grunt.registerTask('lexers', ['rex:lexers']);
    grunt.registerTask('parsers', ['rex:parsers']);
    grunt.registerTask('default', ['jshint', 'vows']);
};
