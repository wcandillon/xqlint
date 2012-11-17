var walk = require('walk');
var fs = require('fs');
var requirejs = require('./r');
var Compiler = requirejs('./lib/Compiler').Compiler;

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var successes = [];
var failures  = [];

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

function parseFile(filename, failOnError)
{
  console.log("Parse: " + filename);
  var code = fs.readFileSync(filename, "UTF-8");
  code = code.replace(/^(#!.*\n)/, "(:$1:)");
  var c = new Compiler();
  c.compile(code);
  //removeParentPtr(ast);
  //var json = JSON.stringify(ast, null, 2);
  //console.log(json);
  //var visitor = new SyntaxHighlighter(code, ast);
  //var tokens = visitor.getTokens(recover);
  //var json = JSON.stringify(tokens.lines, null, 2);
}

function main(args) {
  var keepGoing =  args.indexOf("--keep-going") != -1;
  var file      =  args.indexOf("-f");
  var path      = "./queries";
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

