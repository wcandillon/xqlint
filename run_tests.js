var walk = require('walk');
var fs = require('fs');
var requirejs = require('./r');
var Compiler = requirejs('./lib/Compiler').Compiler;
var SyntaxHighlighter = requirejs('./lib/visitors/SyntaxHighlighter').SyntaxHighlighter;

var JSONParseTreeHandler = requirejs('./lib/JSONParseTreeHandler').JSONParseTreeHandler;
var XQueryParser = requirejs('./lib/XQueryParser').XQueryParser;
var CodeFormatter = requirejs('./lib/visitors/CodeFormatter').CodeFormatter;

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var successes = [];
var failures  = [];
var testHighlighter = false;
var testMarkers = false;
var testCodeFormatter = false;
var showAST = false;
var writeBack = false;

var testFileExtensions = ['.xq'];

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
  if (showAST){
    c.showAST = true;
  }
  var ast = c.compile(code);
  
  var fail = ast.error !== undefined;
  fail ? failures.push(filename) : successes.push(filename);

  if (testMarkers){
    console.log(ast.markers);
  }

  if(testHighlighter) {
    console.log("Test syntax highlighter");
    var visitor = new SyntaxHighlighter(ast);
    var tokens = visitor.getTokens();
    if(code !== getCode(tokens)) throw "Syntax Highlighter issue with " + filename;
  }

  var green = '\x1b[32m';
  var red = '\x1b[31m';
  var reset = '\x1b[0m';

  if(testCodeFormatter){
    console.log("Test code formatter");
    console.log(red + "Code preformat:\n\"\n" + code + "\n\"" + reset);
    var h = new JSONParseTreeHandler(code);
    var parser = new XQueryParser(code, h);
    parser.parse_XQuery();
    ast = h.getParseTree();
    //console.log(ast);
    var codeFormatter = new CodeFormatter(ast);
    var formatted = codeFormatter.format();
    console.log(green + "Code postformat:\n\"");
    console.log(formatted + "\n\"" + reset);
    if (writeBack) {
      fs.writeFile(filename, formatted, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Wrote formatted code to " + filename);
        }
      }); 
    }
  }
}

function main(args) {
  var keepGoing     = args.indexOf("--keep-going") != -1;
  var file          = args.indexOf("-f");
  var dir           = args.indexOf("-d");
  testHighlighter   = args.indexOf("--test-highlighter") != -1;
  testCodeFormatter = args.indexOf("--test-formatter") != -1;
  showAST           = args.indexOf("--ast") != -1;
  writeBack         = args.indexOf("-w") != -1;

  var path      = "./tests/queries";
  if(file != -1)
  {
    if(args.length <= (file + 1)) {
      throw "Missing argument to -f: -f <filename>"; 
    }
    var filename = args[file + 1];
    path = "./" + filename;
    parseFile(filename, keepGoing);
  } else if (dir != -1){
    if (args.length <= (dir + 1)) {
      throw "Missing argument to -d: -d <dirname>";
    }
    var dirName = args[dir + 1];
    var testFiles = fs.readdirSync(dirName);
    for (var i = 0; i < testFiles.length; i++){
      var testFile = dirName + testFiles[i];

      for (var j = 0; j < testFileExtensions.length; j++){
        if (testFile.endsWith(testFileExtensions[j])){
          parseFile(testFile, keepGoing); 
          break;
        }
      }
    }
  }else { 
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
      for(i in failures) {
        console.log(failures[i]);
      }
    });
  }
};

main(process.argv);

