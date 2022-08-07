module.exports = function(grunt) {
	'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);
    
    grunt.registerMultiTask('rex', 'Generate Parsers', function(){
        var fs = require('fs');
        var request = require('request');
        var Q = require('q');
        var done = this.async();
        var promises = [];
        this.data.grammars.forEach(function(parser){
            var deferred = Q.defer();
            request(
                {
                    method: "POST",
                    url: "https://bottlecaps.de/rex",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    formData : {
                        "input": fs.createReadStream(parser.source),
                        "command": parser.command,
						"tz": new Date().getTimezoneOffset()
                    }
                },
                function(err, res, body) {
                    if(err) {
                        deferred.reject(err);
                    }
                    else {
                        fs.writeFileSync(parser.destination, body);
                        deferred.resolve();
                    }
                }
            );
            promises.push(deferred.promise);
        });
        Q.all(promises)
        .then(function(){
            done();
        })
	    .catch(function(error){
            grunt.fail.fatal(error);
	    });
    });
 
    grunt.initConfig({
        rex: {
            parsers: {
                grammars: [
					{
						source: 'lib/parsers/XQueryParser.ebnf',
						destination: 'lib/parsers/XQueryParser.js',
						command: '-ll 2 -backtrack -tree -javascript -a xqlint'
					},
					{
						source: 'lib/parsers/JSONiqParser.ebnf',
						destination: 'lib/parsers/JSONiqParser.js',
						command: '-ll 2 -backtrack -tree -javascript -a xqlint'
					}
                ]
            },
			lexers: {
                grammars: [
                    {
						source: 'lib/lexers/XQueryTokenizer.ebnf',
                        destination: 'lib/lexers/XQueryTokenizer.js',
                        command: '-ll 2 -backtrack -tree -javascript -a xqlint'
                    },
                    {
						source: 'lib/lexers/JSONiqTokenizer.ebnf',
                        destination: 'lib/lexers/JSONiqTokenizer.js',
                        command: '-ll 2 -backtrack -tree -javascript -a xqlint'
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
        browserify: {
            browser_build: {
                files: {
                    'build/xqlint.js': ['lib/xqlint.js'],
                    'build/xquery_lexer.js': ['lib/lexers/xquery_lexer.js'],
                    'build/jsoniq_lexer.js': ['lib/lexers/jsoniq_lexer.js']
                },
                options: {
                    standalone: ''
                }
            }
        }
    });
    grunt.registerTask('browser_build', ['browserify:browser_build']);
    grunt.registerTask('lexers', ['rex:lexers']);
    grunt.registerTask('parsers', ['rex:parsers']);
    grunt.registerTask('default', ['jshint', 'vows']);
};
