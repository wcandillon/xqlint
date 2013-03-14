define(function(require, exports, module){

  var Utils = require('./utils').Utils;
  var fs = require('fs');

  var DefaultURIResolver = exports.DefaultURIResolver = function(workingDir){

    this.workingDir = workingDir;

    this.setWorkingDir = function(aDir){
      this.workingDir = aDir;
    }

    this.resolveModuleImport = function(moduleURI, atURI){
      if (atURI){
        return this.resolveURI(atURI);
      }else{
        return this.resolveURI(moduleURI);
      }
    };

    this.resolveURI = function(uri){
      var normalized = Utils.normalizeURI(uri, this.workingDir); 

      var ret = {
        uri: uri,
        normalizedUri: normalized.uri,
        workingDir: normalized.workingDir
      }

      if (!normalized.uri){
        ret.error = 'Failed to normalize uri "' + uri + '"'; 
      }
      else if (normalized.isRemote){
        // TODO Remote
        uri = normalized.uri;
        ret.content = "Remote contents (not implemented)";

      }else{
        // Local
        uri = normalized.uri;
        try{
          ret.content = fs.readFileSync(uri, "utf8");
        }catch(err){
          ret.error = err.message;
        }

      }

      return ret;
    }; 

  };
});
