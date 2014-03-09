var fs = require('fs');
var ffs = require('final-fs');

var crypto = require('crypto');

var result = {};
var exts = ['.xq', '.jq', '.module', '.xqlib'];

var files = ffs.readdirRecursiveSync('test/queries', true);


String.prototype.endsWith = function(suffix) {
      return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

files.forEach(function(file){
  var found = false;
  exts.forEach(function(ext){
    if(file.endsWith(ext)) {
      found = true;
    }
  });
  var crypto = require('crypto');

  var hash = crypto.createHash('sha1');
  
  // change to 'binary' if you want a binary hash.
  hash.setEncoding('hex');
  
  // the text that you want to hash
  hash.write(fs.readFileSync(__dirname + '/test/queries/' + file));
  
  // very important! You cannot read from the stream until you haven't called end()
  hash.end();
  
  var key = hash.read();
  if(!result[key]) {
    result[key] = [file];
  } else {
    result[key].push(file);
  }
  if(!found) {
    console.log(file);
//      fs.unlinkSync(__dirname + '/test/queries/' + file);
  }
});

Object.keys(result).forEach(function(key, i){
  var dups = result[key];
  if(dups.length > 1) {
    dups.forEach(function(file, index){
        if(index > 0) {
          fs.unlinkSync(__dirname + '/test/queries/' + file);
        }
    }); 
  }
});
console.log(files.length);
console.log(Object.keys(result).length);
