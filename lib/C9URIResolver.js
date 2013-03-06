
define(function(require, exports, module){

  var Utils = require('./utils').Utils;

  var C9URIResolver = exports.C9URIResolver = function(){
    
    this.resolveModuleImport = function(moduleURI, atURI){
      if (atURI){
        return this.resolveURI(atURI);
      }else{
        return this.resolveURI(moduleURI);
      }
    };

    this.resolveURI = function(uri){
      var normalized = Utils.normalizeURI(uri);

      var ret = {
        uri: uri,
        normalizedUri: normalized.uri
      }
      
      uri = normalized.uri;
      if (!uri){
        ret.error = 'Failed to normalize uri "' + uri + '"'; 
      }
      else if (normalized.isRemote){
        // Remote

      }else{
        // Local

      }

      return ret;
    }; 

  };
});
