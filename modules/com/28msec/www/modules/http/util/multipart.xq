xquery version "3.0";
(:
 : Copyright 2010-2012 28msec Inc.
 :)

(:~
 : This module provides utility functions to help dealing with the
 : content of multipart requests.
 :
 : In their implementation, all the functions use the multipart
 : related functions of the request module (e.g. parts() or text-part()).
 :
 : @author 28msec
 :
 :)
module namespace multipart = "http://www.28msec.com/modules/http/util/multipart";

import module namespace req = "http://www.28msec.com/modules/http/request";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Returns the names of all the parts contained in the multipart
 : content of the given request.
 :
 : @return the said names
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:names() as xs:string*
{
  req:parts()//req:body/@req:name
};

(:~
 : Returns the filenames of all the parts contained in the multipart
 : content of the given request.
 :
 : @return the said filenames
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:filenames() as xs:string*
{
  req:parts()//req:body/@req:filename
};

(:~
 : Returns the <tt>req:part</tt> element among all the parts contained
 : in the multipart requests with the given name.
 :
 : @param $name the name of the requested part.
 :
 : @return the said part elements or the empty sequence if no part with
 :   the given name exists.
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:part($name as xs:string) as element(req:part)*
{
  for $p in req:parts()/req:part
  where $name = $p/req:body/@req:name
  return $p
};

(:~
 : Returns the contents of the part/file in the multipart requests with
 : the given filename as a string.
 :
 : It is assumed that the character set of the file is UTF-8.
 :
 : Please note that the file is identified by the filename (and not the
 : name of the part) that is contained in the Content-Disposition header
 : of the part.
 :
 : @param $filename the name of the requested file.
 :
 : @return the said content or the empty sequence if no part with
 :   the given filename exists.
 :
 : @error request:no-text-content if the value of the part cannot be treated
 :   as text
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:text-file($filename as xs:string) as xs:string*
{
  for $body in req:parts()//req:body
  where data($body/@req:filename) eq $filename
  return req:text-part($body/@req:src, 'UTF-8')
};

(:~
 : Returns the contents of the part/file in the multipart requests with
 : the given filename as xs:base64Binary.
 :
 :
 : Please note that the file is identified by the filename (and not the
 : name of the part) that is contained in the Content-Disposition header
 : of the part.
 :
 : @param $filename the name of the requested file.
 :
 : @return the said content or the empty sequence if no part with
 :   the given filename exists.
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:binary-file($filename as xs:string) as xs:base64Binary*
{
  for $body in req:parts()//req:body
  where data($body/@req:filename) eq $filename
  return req:binary-part($body/@req:src)
};

(:~
 : Returns the content type of the parts/files in the multipart requests with
 : the given part name as xs:string.
 : 
 :
 : @param $name the name of the requested part.
 :
 : @return The content-types of the parts/files or the empty sequence if the part does not exist 
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:content-type($name as xs:string) as xs:string* 
{
  fn:data(multipart:part($name)/req:header[@req:name="Content-Type"]/@req:value)
};

(:~
 : Returns the content length of the parts/files in the multipart requests with
 : the given part name as xs:integer.
 : 
 : @param $name the name of the requested part.
 :
 : @return The content-length in bytes of the parts/files or the empty sequence if the part does not exist 
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:content-length($name as xs:string) as xs:integer*
{
  fn:data(multipart:part($name)/req:body/@req:size)
};

(:~
 : Returns the filenames of the parts/files in the multipart requests with
 : the given part name as xs:string.
 :
 : @param $name the name of the requested part.
 :
 : @return The filename of the parts/files or the empty sequence if the part does not exist
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:filename($name as xs:string) as xs:string*
{
  fn:data(multipart:part($name)/req:body/@req:filename)
};

(:~
 : Returns the contents of the parts/files in the multipart requests with
 : the given part name as xs:base64Binary.
 : 
 :
 : @param $name the name of the requested part.
 :
 : @return the said content or the empty sequence if no part with
 :   the given name exists.
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:binary-content($name as xs:string) as xs:base64Binary*
{
  for $src in multipart:part($name)/req:body/@req:src
  return req:binary-part($src)    
};

(:~
 : Returns the contents of the parts/files in the multipart requests with
 : the given part name as a string.
 :
 : It is assumed that the character set of the file is UTF-8.
 :
 :
 : @param $name the name of the requested part.
 :
 : @return the said content or the empty sequence if no part with
 :   the given filename exists.
 :
 : @error request:no-text-content if the value of the part cannot be treated
 :   as text
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function multipart:text-content($name as xs:string) as xs:string* 
{
   for $src in multipart:part($name)/req:body/@req:src
   return req:text-part($src)    
};
