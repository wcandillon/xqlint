var walk = require('walk');
var fs = require('fs');
var requirejs = require('./r');
var Compiler = requirejs('./lib/Compiler').Compiler;
var SyntaxHighlighter = requirejs('./lib/visitors/SyntaxHighlighter').SyntaxHighlighter;

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var successes = [];
var failures  = [];
var testHighlighter = false;

function removeParentPtr(ast)
{
  if(ast.getParent !== undefined) {
    delete ast.getParent;
  }
  for(var i in ast.children) {
    var child = ast.children[i];
    removeParentPtr(child);
  }
}

function getCode(tokens)
{
  var value = null;

  for(var i in tokens.lines) {
    var line = tokens.lines[i];
    value = value === null ? "" : value + "\n";
    for(var j in line) {
      var token = line[j];
      value += token.value;
    }
  }

  return value;
}

function parseFile(filename, failOnError)
{
  console.log("Parse: " + filename);
  var code = fs.readFileSync(filename, "UTF-8");
  code = code.replace(/^(#!.*\n)/, "(:$1:)");
  var c = new Compiler();
  var ast = c.compile(code);
  var fail = ast.error !== undefined;
  fail ? failures.push(filename) : successes.push(filename);
  console.log(ast.markers);
  
  if(testHighlighter) {
    console.log("Test syntax highlighter");
    var visitor = new SyntaxHighlighter(ast);
    var tokens = visitor.getTokens();
    if(code !== getCode(tokens)) throw "Syntax Highlighter issue with " + filename;
  }
}

function main(args) {
  var keepGoing =  args.indexOf("--keep-going") != -1;
  var file      =  args.indexOf("-f");
  testHighlighter = args.indexOf("--test-highlighter") != -1;

  var path      = "./tests/queries";
  if(file != -1)
  {
    if(args.length <= (file + 1)) {
      throw "Missing argument to -f: -f <filename>"; 
    }
    var filename = args[file + 1];
    path = "./" + filename;
    parseFile(filename, keepGoing);
  } else {
    var walker  = walk.walk(path, { followLinks: false });
    
    walker.on('file', function(root, stat, next) {
      // Add this file to the list of files
      var filename = root + '/' + stat.name;
      if(filename.endsWith(".xq")) {
        parseFile(filename, keepGoing);
      }
      next();
    });

    walker.on('end', function() {
      console.log("Parsed " + (failures.length + successes.length) + " files.");
      console.log(successes.length + " succeeded, " + failures.length + " failed.");
      console.log("The following files didn't parse: ");
      var i;
      for(i in failures)
      {
        console.log(failures[i]);
      }
    });
  }
};

main(process.argv);

