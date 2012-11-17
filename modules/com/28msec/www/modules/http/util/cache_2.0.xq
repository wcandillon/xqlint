xquery version "3.0";
(:
 : Copyright 2012 28msec Inc.
 :)

(:~
 : This module contains a collection of convenience functions to help
 : developers work with HTTP caching options.
 :
 : @author 28msec
 :
 :)
module namespace cache = "http://www.28msec.com/modules/http/util/cache";

import module namespace resp = "http://www.28msec.com/modules/http/response";

declare namespace an = "http://www.zorba-xquery.com/annotations";
declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : <p>Forces a client not to cache the response by setting the appropriate
 : HTTP headers.</p>
 : In detail, the following HTTP headers will be set in the response:
 : 
 : <ul>
 :   <li><tt>Cache-Control: no-cache</tt></li>
 :   <li><tt>Pragma: no-cache</tt></li>
 :   <li><tt>Expires: 0</tt></li>
 : </ul>
 :
 : @return On success, the empty-sequence is returned
 :)
declare %an:sequential function cache:no-cache()
as empty-sequence()
{
  resp:set-header("Cache-Control","no-cache");
  resp:set-header("Pragma","no-cache");
  resp:set-header("Expires","0");
};

