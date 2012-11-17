xquery version "3.0";
(:
 : Copyright 2010 28msec Inc.
 :)

(:~
 : <p>Applications written with Sausalito use this default error module 
 : if an error happens inside a Sausalito project.</p>
 : 
 : <p>An error can occur during the run time of a Sausalito project on one
 : of the following cases:</p>
 : 
 : <ol>
 :   <li>If the XQuery code raises a dynamic error that is not caught in a
 :     try-catch block.</li>
 :   <li>If the given XQuery program is syntactically incorrect or contains
 :     other static errors.</li>
 :   <li>If an explicit call to fn:error() was made and the error is not
 :     caught in a try-catch block.</li>
 :   <li>If a request is made to a module or a function which does
 :     not exist.</li>
 :   <li>If any other unexpected error happens during the processing of
 :     the request.</li>
 : </ol>
 :
 : @author 28msec
 :
 :)
module namespace err = "http://www.28msec.com/modules/error";

declare namespace an = "http://www.zorba-xquery.com/annotations";
declare namespace ver = "http://www.zorba-xquery.com/options/versioning";

import module namespace resp = "http://www.28msec.com/modules/http/response";
import module namespace request = "http://www.28msec.com/modules/http/request";

declare option ver:module-version "2.0";

(:~
 : <p>This is the default function that is called if an error happens.
 : The default can be overridden by adding an error.xq library module
 : into the Sausalito project. This module needs to declare a function
 : with the same signature as the err:handle function in this module.</p>
 :
 : <p>The value returned by this function is sent to the client. If the
 : default is overridden, the implementation is free to define all
 : parameters of the response (e.g. set the corresponding HTTP status
 : code or an arbitrary header).</p>
 :
 : <p>If the default is used, the status code is 500 if the $code QName
 : is not equal to one of the status code QNames declared in HTTP module.
 : Otherwise, the corresponding status code is set.</p>
 :
 : @param $code the error code that triggered the problem as a QName
 : @param $description a description of the error
 : @param $value a potentially empty list of items that were involved in
 :   causing the error
 : @param $stack the stacktrace leading to the error as an element.
 :   For example,
 :   <tt>
 :     &lt;stack>
 :       &lt;call ns="http://www.example.com/"
 :         localName="my-function" arity="3"/>
 :     &lt;/stack>
 :   </tt>
 : 
 : @return content of the response message
 :)
declare %an:sequential function err:handle(
  $code as xs:QName,
  $description as xs:string?,
  $value as item()*,
  $stack) as item()*
{
  resp:set-content-type("text/plain");
  if (resp:valid-status($code))
  then
    resp:set-status($code);
  else
    resp:set-status($resp:internal-server-error);

  "...because an error happened!&#10;",

  if ( $code eq $resp:not-found ) then (
    concat("The requested URL '", request:uri(), "' was not found on this server ('404').")
  )
  else (
    "Error code: ", $code, "&#10;",
    "HTTP status ", err:http-status($code), "&#10;",
    "Message: ", $description, "&#10;",
    "Stack trace: ",
    for $call in $stack/stack/call
    let $ns := string($call/@ns)
    let $name := string($call/@localName)
    let $arity := string($call/@arity)
    return
      ("&#10;",
        "called from module ", $ns, " function ", $name, "#", $arity)
  )
};

(:~
 : Convert the given error QName into an HTTP status code.
 :
 : @param $code the status code as QName to convert
 : @return the HTTP status code if the QName refers to a HTTP
 :   status code, 500 otherwise. 
 :)
declare %fn:private function err:http-status(
  $status as xs:QName
) as xs:int
{
  try {
    resp:code-for-status($status)
  } catch * {
    xs:int(500)
  }
};
