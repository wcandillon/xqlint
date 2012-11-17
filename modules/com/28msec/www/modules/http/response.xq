xquery version "3.0";
(:
 : Copyright 2012 28msec Inc.
 :)

(:~
 : The Sausalito response module can be used to modify the HTTP response
 : that will be send as a result of this request. For example, the
 : <tt>set-content-type</tt> function can be used to set the Content-Type
 : header and determine the encoding of data in the response.
 :
 : @author 28msec
 :
 :)
module namespace resp = "http://www.28msec.com/modules/http/response";

declare namespace http = "http://www.28msec.com/modules/http/response";

declare namespace an = "http://www.zorba-xquery.com/annotations";

import module namespace s = "http://www.zorba-xquery.com/modules/schema";

import schema namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : The serialization parameters, in the standardized XSLT/XQuery format.
 :)
declare %fn:private variable $resp:serialization-params
  as element(output:serialization-parameters) := resp:serializer-defaults-xml();

(:~
 : QName representing the HTTP Status Code 100 Continue
 :)
declare variable $http:continue as xs:QName := xs:QName("http:continue");

(:~
 : QName representing the HTTP Status Code 101 Switching Protocols
 :)
declare variable $http:switching-protocols as xs:QName := xs:QName("http:switching-protocols");

(:~
 : QName representing the HTTP Status Code 102 Processing (Web; RFC 2518)
 :)
declare variable $http:processing as xs:QName := xs:QName("http:processing");

(:~
 : QName representing the HTTP Status Code 200 OK
 :)
declare variable $http:ok as xs:QName := xs:QName("http:ok");

(:~
 : QName representing the HTTP Status Code 201 Created
 :)
declare variable $http:created as xs:QName := xs:QName("http:created");

(:~
 : QName representing the HTTP Status Code 202 Accepted
 :)
declare variable $http:accepted as xs:QName := xs:QName("http:accepted");

(:~
 : QName representing the HTTP Status Code 203 Non-Authoritative
 :)
declare variable $http:non-authoritative as xs:QName := xs:QName("http:non-authoritative");

(:~
 : QName representing the HTTP Status Code 204 No Content
 :)
declare variable $http:no-content as xs:QName := xs:QName("http:no-content");

(:~
 : QName representing the HTTP Status Code 205 Reset Content
 :)
declare variable $http:reset-content as xs:QName := xs:QName("http:reset-content");

(:~
 : QName representing the HTTP Status Code 206 Partial Content
 :)
declare variable $http:partial-content as xs:QName := xs:QName("http:partial-content");

(:~
 : QName representing the HTTP Status Code 207 Multi-Status (WebDAV; RFC 5842)
 :)
declare variable $http:multi-status as xs:QName := xs:QName("http:multi-status");

(:~
 : QName representing the HTTP Status Code 208 Already Reported (WebDAV; RFC 5842)
 :)
declare variable $http:already-reported as xs:QName := xs:QName("http:already-reported");

(:~
 : QName representing the HTTP Status Code 226 IM Used (RFC 3229)
 :)
declare variable $http:im-used as xs:QName := xs:QName("http:im-used");

(:~
 : QName representing the HTTP Status Code 300 Multiple Choices
 :)
declare variable $http:multiple-choices as xs:QName := xs:QName("http:multiple-choices");

(:~
 : QName representing the HTTP Status Code 301 Moved Permantently
 :)
declare variable $http:moved-permanently as xs:QName := xs:QName("http:moved-permanently");

(:~
 : QName representing the HTTP Status Code 302 Found
 :)
declare variable $http:found as xs:QName := xs:QName("http:found");

(:~
 : QName representing the HTTP Status Code 303 See Other
 :)
declare variable $http:see-other as xs:QName := xs:QName("http:see-other");

(:~
 : QName representing the HTTP Status Code 304 Not Modified
 :)
declare variable $http:not-modified as xs:QName := xs:QName("http:not-modified");

(:~
 : QName representing the HTTP Status Code 305 Use Proxy
 :)
declare variable $http:use-proxy as xs:QName := xs:QName("http:use-proxy");

(:~
 : QName representing the HTTP Status Code 306 Switch Proxy
 :)
declare variable $http:switch-proxy as xs:QName := xs:QName("http:switch-proxy");

(:~
 : QName representing the HTTP Status Code 307 Temporary Redirect
 :)
declare variable $http:temporary-redirect as xs:QName := xs:QName("http:temporary-redirect");

(:~
 : QName representing the HTTP Status Code 308 Permanent Redirect (http://tools.ietf.org/html/draft-reschke-http-status-308-07)
 :)
declare variable $http:permanent-redirect as xs:QName := xs:QName("http:permanent-redirect");

(:~
 : QName representing the HTTP Status Code 400 Bad Request
 :)
declare variable $http:bad-request as xs:QName := xs:QName("http:bad-request");

(:~
 : QName representing the HTTP Status Code 401 Unauthorized
 :)
declare variable $http:unauthorized as xs:QName := xs:QName("http:unauthorized");

(:~
 : QName representing the HTTP Status Code 403 Forbidden
 :)
declare variable $http:forbidden as xs:QName := xs:QName("http:forbidden");

(:~
 : QName representing the HTTP Status Code 404 Not Found
 :)
declare variable $http:not-found as xs:QName := xs:QName("http:not-found");

(:~
 : QName representing the HTTP Status Code 405 Not Allowed
 :)
declare variable $http:not-allowed as xs:QName := xs:QName("http:not-allowed");

(:~
 : QName representing the HTTP Status Code 406 Not Acceptable
 :)
declare variable $http:not-acceptable as xs:QName := xs:QName("http:not-acceptable");

(:~
 : QName representing the HTTP Status Code 407 Proxy Authentication Required
 :)
declare variable $http:proxy-authentication-required as xs:QName := xs:QName("http:proxy-authentication-required");

(:~
 : QName representing the HTTP Status Code 408 Request Timeout
 :)
declare variable $http:request-timeout as xs:QName := xs:QName("http:request-timeout");

(:~
 : QName representing the HTTP Status Code 409 Conflict
 :)
declare variable $http:conflict as xs:QName := xs:QName("http:conflict");

(:~
 : QName representing the HTTP Status Code 410 GONE
 :)
declare variable $http:gone as xs:QName := xs:QName("http:gone");

(:~
 : QName representing the HTTP Status Code 411 Length Required
 :)
declare variable $http:length-required as xs:QName := xs:QName("http:length-required");

(:~
 : QName representing the HTTP Status Code 412 Precondition Failed
 :)
declare variable $http:precondition-failed as xs:QName := xs:QName("http:precondition-failed");

(:~
 : QName representing the HTTP Status Code 413 Request Entity Too Large
 :)
declare variable $http:request-entity-too-large as xs:QName := xs:QName("http:request-entity-too-large");

(:~
 : QName representing the HTTP Status Code 414 Request Entity Too Long
 :)
declare variable $http:request-entity-too-long as xs:QName := xs:QName("http:request-entity-too-long");

(:~
 : QName representing the HTTP Status Code 415 Unsupported Media Type
 :)
declare variable $http:unsupported-media-type as xs:QName := xs:QName("http:unsupported-media-type");

(:~
 : QName representing the HTTP Status Code 416 Request Range Not Satisfiable
 :)
declare variable $http:request-range-not-satisfiable as xs:QName := xs:QName("http:request-range-not-satisfiable");

(:~
 : QName representing the HTTP Status Code 417 Expectation Failed
 :)
declare variable $http:expectation-failed as xs:QName := xs:QName("http:expectation-failed");

(:~
 : QName representing the HTTP Status Code 418 I'm a teapot (RFC 2324)
 :)
declare variable $http:im-a-teapot as xs:QName := xs:QName("http:im-a-teapot");

(:~
 : QName representing the HTTP Status Code 420 Enhance Your Calm
 :)
declare variable $http:enhance-your-calm as xs:QName := xs:QName("http:enhance-your-calm");

(:~
 : QName representing the HTTP Status Code 422 Unprocessable Entity (WebDAV; RFC 4918)
 :)
declare variable $http:unprocessable-entity as xs:QName := xs:QName("http:unprocessable-entity");

(:~
 : QName representing the HTTP Status Code 423 Locked (WebDAV; RFC 4918)
 :)
declare variable $http:locked as xs:QName := xs:QName("http:locked");

(:~
 : QName representing the HTTP Status Code 424 Failed Dependency (WebDAV; RFC 4918)
 :)
declare variable $http:failed-dependency as xs:QName := xs:QName("http:failed-dependency");

(:~
 : QName representing the HTTP Status Code 425 Unordered Collection
 :)
declare variable $http:unordered-collection as xs:QName := xs:QName("http:unordered-collection");

(:~
 : QName representing the HTTP Status Code 426 Upgrade Required
 :)
declare variable $http:upgrade-required as xs:QName := xs:QName("http:upgrade-required");

(:~
 : QName representing the HTTP Status Code 428 Precondition Required (RFC 6585)
 :)
declare variable $http:precondition-required as xs:QName := xs:QName("http:precondition-required");

(:~
 : QName representing the HTTP Status Code 429 Too Many Requests (RFC 6585)
 :)
declare variable $http:too-many-requests as xs:QName := xs:QName("http:too-many-requests");

(:~
 : QName representing the HTTP Status Code 431 Request Header Fields Too Large (RFC 6585)
 :)
declare variable $http:request-header-fields-too-large as xs:QName := xs:QName("http:request-header-fields-too-large");

(:~
 : QName representing the HTTP Status Code 500 Internal Server Error
 :)
declare variable $http:internal-server-error as xs:QName := xs:QName("http:internal-server-error");

(:~
 : QName representing the HTTP Status Code 501 Not Implemented
 :)
declare variable $http:not-implemented as xs:QName := xs:QName("http:not-implemented");

(:~
 : QName representing the HTTP Status Code 502 Bad Gateway
 :)
declare variable $http:bad-gateway as xs:QName := xs:QName("http:bad-gateway");

(:~
 : QName representing the HTTP Status Code 503 Service Unavailable
 :)
declare variable $http:service-unavailable as xs:QName := xs:QName("http:service-unavailable");

(:~
 : QName representing the HTTP Status Code 504 Gateway Timeout
 :)
declare variable $http:gateway-timeout as xs:QName := xs:QName("http:gateway-timeout");

(:~
 : QName representing the HTTP Status Code 505 HTTP Version Not Supported
 :)
declare variable $http:http-version-not-supported as xs:QName := xs:QName("http:http-version-not-supported");

(:~
 : QName representing the HTTP Status Code 506 Variant Also Negotiates (RFC 2295)
 :)
declare variable $http:variant-also-negotiates as xs:QName := xs:QName("http:variant-also-negotiates");

(:~
 : QName representing the HTTP Status Code 507 Insufficient Storage (WebDAV; RFC 4918)
 :)
declare variable $http:insufficient-storage as xs:QName := xs:QName("http:insufficient-storage");

(:~
 : QName representing the HTTP status code 508 Loop Detected (webdav; rfc 5842)
 :)
declare variable $http:loop-detected as xs:QName := xs:QName("http:loop-detected");

(:~
 : QName representing the HTTP status code 510 Not Extended (RFC 2774)
 :)
declare variable $http:not-extended as xs:QName := xs:QName("http:not-extended");

(:~
 : QName representing the HTTP status code 511 Network Authentication Required (RFC 6585)
 :)
declare variable $http:network-authentication-required as xs:QName := xs:QName("http:network-authentication-required");

(:~
 : Variable containing a description for all the HTTP Status Codes
 :)
declare variable $resp:status-info :=
  <http:status-info>
    <http:continue message="CONTINUE" code="100"/>
    <http:switching-protocols message="SWITCHING PROTOCOLS" code="101"/>
    <http:processing message="PROCESSING" code="102"/>
    <http:ok message="OK" code="200"/>
    <http:created message="CREATED" code="201"/>
    <http:accepted message="ACCEPTED" code="202"/>
    <http:non-authoritative message="NON AUTHORITATIVE" code="203"/>
    <http:no-content message="NO CONTENT" code="204"/>
    <http:reset-content message="RESET CONTENT" code="205"/>
    <http:partial-content message="PARTIAL CONTENT" code="206"/>
    <http:multi-status message="MULTI-STATUS" code="207"/>
    <http:already-reported message="ALREADY REPORTED" code="208"/>
    <http:im-used message="IM USED" code="226"/>
    <http:multiple-choices message="MULTIPLE CHOICES" code="300"/>
    <http:moved-permanently message="MOVED PERMANENTLY" code="301"/>
    <http:found message="FOUND" code="302"/>
    <http:see-other message="SEE OTHER" code="303"/>
    <http:not-modified message="NOT MODIFIED" code="304"/>
    <http:use-proxy message="USE PROXY" code="305"/>
    <http:temporary-redirect message="TEMPORARY REDIRECT" code="307"/>
    <http:permanent-redirect message="PERMANENT REDIRECT" code="308"/>
    <http:bad-request message="BAD REQUEST" code="400"/>
    <http:unauthorized message="UNAUTHORIZED" code="401"/>
    <http:forbidden message="FORBIDDEN" code="403"/>
    <http:not-found message="NOT FOUND" code="404"/>
    <http:not-allowed message="NOT ALLOWED" code="405"/>
    <http:not-acceptable message="NOT ACCEPTABLE" code="406"/>
    <http:proxy-authentication-required message="PROXY AUTHENTICATION REQUIRED" code="407"/>
    <http:request-timeout message="REQUEST TIMEOUT" code="408"/>
    <http:conflict message="CONFLICT" code="409"/>
    <http:gone message="GONE" code="410"/>
    <http:length-required message="LENGTH REQUIRED" code="411"/>
    <http:precondition-failed message="PRECONDITION FAILED" code="412"/>
    <http:request-entity-too-large message="REQUEST ENTITY TOO LARGE" code="413"/>
    <http:request-entity-too-long message="REQUEST ENTITY TOO LONG" code="414"/>
    <http:unsupported-media-type message="UNSUPPORTED MEDIA TYPE" code="415"/>
    <http:request-range-not-satisfiable message="REQUEST RANGE NOT SATISFIABLE" code="416"/>
    <http:expectation-failed message="EXPECTATION FAILED" code="417"/>
    <http:im-a-teapot message="I'm a teapot" code="418"/>
    <http:enhance-your-calm message="ENHANCE YOUR CALM" code="420"/>
    <http:unprocessable-entity message="UNPROCESSABLE ENTITY" code="422"/>
    <http:locked message="LOCKED" code="423"/>
    <http:failed-dependency message="FAILED DEPENDENCY" code="424"/>
    <http:unordered-collection message="UNORDERED COLLECTION" code="425"/>
    <http:upgrade-required message="UPGRADE REQUIRED" code="426"/>
    <http:precondition-required message="PRECONDITION REQUIRED" code="428"/>
    <http:too-many-requests message="TOO MANY REQUESTS" code="429"/>
    <http:internal-server-error message="INTERNAL SERVER ERROR" code="500"/>
    <http:not-implemented message="NOT IMPLEMENTED" code="501"/>
    <http:bad-gateway message="BAD GATEWAY" code="502"/>
    <http:service-unavailable message="SERVICE UNAVAILABLE" code="503"/>
    <http:gateway-timeout message="GATEWAY TIMEOUT" code="504"/>
    <http:http-version-not-supported message="HTTP VERSION NOT SUPPORTED" code="505"/>
    <http:variant-als-negotiates message="VARIANT ALSO NEGOTIATES" code="506"/>
    <http:insufficient-storage message="INSUFFICIENT STORAGE" code="507"/>
    <http:loop-detected message="LOOP DETECTED" code="508"/>
    <http:not-extended message="NOT EXTENDED" code="510"/>
    <http:network-authentication-required message="NETWORK AUTHENTICATION REQUIRED" code="511"/>
  </http:status-info>;


(:~
 : <p>Set a HTTP header in the response.</p>
 :
 : <p>If a header with the same name was already set, the
 : value is overwritten and the function returns the old value. As defined
 : in the HTTP specification, multiple headers with the same name
 : can be combined into one header whose value is a comma-separated
 : list of the values.</p>
 :
 : <p>The following headers must not be set using this function.
 : Instead, other functions of this module should be used in order
 : to implemented the required semantics:
 : <ul>
 :   <li>Status: use set-status() instead</li>
 :   <li>Content-Type: use set-content-type() instead</li>
 : </ul>
 : </p>
 :
 : @param $name the name of the header to set
 : @param $value the value of the header to set
 :`
 : @return the value of the header previously set or the empty sequence
 :   if no header has been set with the same name.
 :
 : @error resp:invalid-header-name if an invalid name
 :   is used for the header.
 :)
declare %an:sequential function resp:set-header(
    $name as xs:string,
    $value as xs:string)
as xs:string?
{
  switch (lower-case($name))
    case "status" return
      fn:error(
        xs:QName("http:invalid-header-name"),
        "For changing Status use set-status() instead"
      )
    case "content-type" return
      fn:error(
        xs:QName("http:invalid-header-name"),
        "For changing Content-Type use set-content-type() instead"
      )
    default return
      http:set-header-impl($name, $value)
};

(:~
 : <p>Set a HTTP header in the response.</p>
 :
 : @return the value of the header previously set or the empty sequence
 :   if no header has been set with the same name.
 :)
declare %fn:private %an:sequential function resp:set-header-impl(
    $name as xs:string,
    $value as xs:string)
as xs:string? external;

(:~
 : <p>Sets the status code of the HTTP response to the QName given as
 : parameter.</p>
 : For example,
 :
 : <tt>resp:set-status($http:no-content)</tt>
 : will result in "HTTP/1.1 204 No Content".
 :
 : @param $status The status code of the HTTP response as a QName
 :   (e.g. $http:no-content)
 :
 : @return On success, the empty-sequence is returned
 :
 : @error http:invalid-status if the given QName does not represent
 :   a valid HTTP status code;
 :)
declare %an:sequential function resp:set-status($status as xs:QName)
as empty-sequence()
{
  resp:set-status-code(resp:code-for-status($status));
};

(:~
 : <p>Sets the status code of the HTTP response to the integer given as
 : parameter.</p>
 : For example,
 :
 : <tt>resp:set-status(204)</tt>
 : will result in "HTTP/1.1 204 No Content".
 :
 : @param $status The status code of the HTTP response as integer.
 :
 : @return On success, the empty-sequence is returned
 :
 : @error http:invalid-status-code if the given integer does
 :   not reflect a valid HTTP status code
 :)
declare %an:sequential function resp:set-status-code(
  $status as xs:integer
) as empty-sequence() external;

(:~
 : <p>Sets the Content-Type header for the response.</p>
 : <p>
 : For example,
 :
 : <tt>resp:set-content-type("text/plain")</tt> will cause the
 : header
 : <tt>Content-Type: text/plain</tt> to be added for the response.</p>
 :
 : <p>In addtion to setting the Content-Type header, the function also
 : sets the serialization parameters to the default values for serialization
 : method for the given content-type. For example, if the content-type is set to
 : text/plain, the default serialization parameters for the text
 : serialization method will be used. For application/atom+xml, the default
 : serialization parameters for the XML serialization method will be used.</p>
 :
 : <p>The functions resp:content-type-text/xml/html/xhtml/binary may be used
 : to figure out which serialization method will be used for a specific
 : content-type.</p>
 :
 : <p>If the given content-type contains a charset declaration (e.g.
 : <tt>resp:set-content-type("text/plain;charset=ISO-8859-1")</tt>), the
 : content of the response will be transcoded to the given encoding.</p>
 :
 : <p>The default serialization parameters set by this function can
 : be overwritten using the resp:set-serialization-parameters() function.</p>
 :
 : @param $type the content-type to be set
 :
 : @return the function is sequential and returns the empty sequence
 :
 : @error http:invalid-encoding if the given encoding is invalid or not
 :   supported.
 :)
declare %an:sequential function resp:set-content-type(
  $type as xs:string)
as empty-sequence()
{
  resp:set-content-type(
    $type,
    if (resp:content-type-html($type))
    then
      resp:serializer-defaults-html()
    else if (resp:content-type-xhtml($type))
    then
      resp:serializer-defaults-xhtml()
    else if (resp:content-type-xml($type))
    then
      resp:serializer-defaults-xml()
    else if (resp:content-type-json($type))
    then
      resp:serializer-defaults-jsoniq()
    else
      resp:serializer-defaults-text()
  );
};

(:~
 : <p>Sets the Content-Type header for the response.</p>
 :
 : <p>For example,
 :
 : <tt>resp:set-content-type("text/plain")</tt> will cause the
 : header
 : <tt>Content-Type: text/plain</tt> to be added for the response.</p>
 :
 : <p>In addition to the content-type, the function also allows to
 : specify the serialization method and parameters that will be used
 : for serializing the result. For details about this parameter, please
 : refer to resp:set-serialization-parameters().</p>
 :
 : <p>If the given content-type contains a charset declaration (e.g.
 : <tt>resp:set-content-type("text/plain;charset=ISO-8859-1")</tt>), the
 : content of the response will be transcoded to the given encoding.
 : If the serialization parameters also contain a charset declaration,
 : the charset contained in the content-type will be used. to transcode
 : the result.</p>
 :
 : @param $type the content-type to be set
 :
 : @param $params the serialization parameters that will be used for
 :  serialization the result.
 :
 : @return the function is sequential and returns the empty sequence
 :
 : @error http:invalid-encoding if the given encoding is invalid or not
 :   supported.
 :)
declare %an:sequential function resp:set-content-type(
  $type as xs:string,
  $params as element(output:serialization-parameters))
as empty-sequence()
{
  resp:set-serialization-parameters($params);
  resp:set-header-impl("Content-Type", $type);
  if (resp:content-type-binary($type))
  then
    resp:set-decode-binary(fn:true());
  else
    ();
};

(:~
 : <p>The function sets the output encoding that will be
 : used for the payload of the response.</p>
 :
 : <p>For example,
 : <tt>resp:set-encoding("ISO-8859-1")</tt> will cause the
 : content in the response to be encoded using ISO-8859-1.</p>
 :
 : <p>Please note that the encoding only applies to textual data.
 : It is not used if the function <tt>set-decode-binary()</tt>
 : was invoked passing true as parameter.</p>
 :
 : @param $encoding the encoding to be used for the payload
 :   of the response.
 :
 : @return the function is sequential and returns the empty sequence
 :
 : @error http:invalid-encoding if the given encoding is invalid or not
 :   supported.
 :)
declare %an:sequential function resp:set-encoding(
  $encoding as xs:string
) as empty-sequence() external;

(:~
 : <p>Returns an element that can be used to specify the
 : settings of serialization parameters for the XML serialization
 : method.</p>
 :
 : <p>The defaults are
 : <ul>
 :  <li>encoding: UTF-8</li>
 :  <li>indent: yes</li>
 :  <li>omit-xml-declaration: yes</li>
 :  <li>version: 1.0</li>
 : </ul>
 : </p>
 :
 : <p>For example, those defaults are used when setting
 : the content-type to some XML content-type (e.g. application/atom+xml).</p>
 :
 : @return an element that can be used to specify
 :   the above serialization parameters.
 :)
declare function resp:serializer-defaults-xml()
as element(output:serialization-parameters)
{
  <output:serialization-parameters>
    <output:encoding value="UTF-8"/>
    <output:indent value="yes"/>
    <output:method value="xml"/>
    <output:omit-xml-declaration value="yes"/>
    <output:version value="1.0"/>
  </output:serialization-parameters>
};

(:~
 : <p>Returns an element that can be used to specify the
 : settings of serialization parameters for the text serialization
 : method.</p>
 :
 : <p>The only default used is
 : <ul>
 :  <li>encoding: UTF-8</li>
 : </ul>
 : </p>
 :
 : <p>For example, this default is used when setting
 : the content-type to some text content-type (e.g. text/plain).</p>
 :
 : @return an element that can be used to specify
 :   the above serialization parameters.
 :)
declare function resp:serializer-defaults-text() as element()*
{
  <output:serialization-parameters>
    <output:encoding value="UTF-8"/>
    <output:method value="text"/>
  </output:serialization-parameters>
};

(:~
 : <p>Returns an element that can be used to specify the
 : settings of serialization parameters for the XHTML serialization
 : method.</p>
 :
 : <p>The defaults are
 : <ul>
 :  <li>encoding: UTF-8</li>
 :  <li>indent: yes</li>
 :  <li>omit-xml-declaration: yes</li>
 :  <li>version: 1.0</li>
 :  <li>doctype-system: http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd</li>
 :  <li>doctype-public: -//W3C//DTD XHTML 1.0 Transitional//EN</li>
 : </ul>
 : </p>
 :
 : <p>For example, those defaults are used when setting
 : the content-type to some XHTML content-type (i.e. application/xhtml+xml).</p>
 :
 : @return an element that can be used to specify
 :   the above serialization parameters.
 :)
declare function resp:serializer-defaults-xhtml() as element()*
{
  <output:serialization-parameters>
    <output:encoding value="UTF-8"/>
    <output:indent value="yes"/>
    <output:method value="xhtml"/>
    <output:omit-xml-declaration value="yes"/>
    <output:version value="1.0"/>
    <output:doctype-system value="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/>
    <output:doctype-public value="-//W3C//DTD XHTML 1.0 Transitional//EN"/>
  </output:serialization-parameters>
};

(:~
 : <p>Returns an element that can be used to specify the
 : settings of serialization parameters for the HTML serialization
 : method.</p>
 :
 : <p>The defaults are
 : <ul>
 :  <li>encoding: UTF-8</li>
 :  <li>indent: yes</li>
 :  <li>version: 4.01</li>
 :  <li>doctype-system: http://www.w3.org/TR/html4/loose.dtd</li>
 :  <li>doctype-public: -//W3C//DTD HTML 4.01 Transitional//EN</li>
 :  <li>include-content-type: yes</li>
 : </ul>
 : </p>
 :
 : <p>For example, those defaults are used when setting
 : the content-type to some HTML content-type (i.e. text/html).</p>
 :
 : @return an element that can be used to specify
 :   the above serialization parameters.
 :)
declare function resp:serializer-defaults-html() as element()*
{
  <output:serialization-parameters>
    <output:encoding value="UTF-8"/>
    <output:indent value="yes"/>
    <output:method value="html"/>
    <output:version value="4.01"/>
    <output:doctype-system value="http://www.w3.org/TR/html4/loose.dtd"/>
    <output:doctype-public value="-//W3C//DTD HTML 4.01 Transitional//EN"/>
  </output:serialization-parameters>
};

(:~
 : <p>Returns an element that can be used to specify the
 : settings of serialization parameters for the JSONiq serialization
 : method.</p>
 :
 : <p>The defaults are
 : <ul>
 :  <li>encoding: UTF-8</li>
 :  <li>indent: yes</li>
 :  <li>omit-xml-declaration: yes</li>
 :  <li>version: 1.0</li>
 :  <li>jsoniq-extensions: yes</li>
 :  <li>jsoniq-xdm-node-output-method: xml</li>
 :  <li>jsoniq-multiple-items: appended</li>
 : </ul>
 : </p>
 :
 : <p>For example, those defaults are used when setting
 : the content-type to some XML content-type (e.g. application/atom+xml).</p>
 :
 : @return an element that can be used to specify
 :   the above serialization parameters.
 :)
declare function resp:serializer-defaults-jsoniq()
as element(output:serialization-parameters)
{
  <output:serialization-parameters>
    <output:encoding value="UTF-8"/>
    <output:indent value="yes"/>
    <output:method value="jsoniq"/>
    <output:omit-xml-declaration value="yes"/>
    <output:version value="1.0"/>
    <output:jsoniq-extensions value="yes"/>
    <output:jsoniq-xdm-node-output-method value="xml"/>
    <output:jsoniq-multiple-items value="appended"/>
  </output:serialization-parameters>
};

(:~
 : <p>Test if a given content-type is a text content-type.</p>
 :
 : <p>A text content-type starts with "text/" or contains either of
 : the strings "xml" or "json".</p>
 :
 : @param $type the content-type to test.
 :
 : @return true if the given content-type is a text content-type,
 :  false otherwise.
 :)
declare function resp:content-type-text($type as xs:string)
  as xs:boolean external;

(:~
 : <p>Test if a given content-type is a XML content-type</p>
 :
 : <p>A XML content-type is a content-type that is "application/xml"
 : or ends : with the string "+xml".</p>
 :
 : @param $type the content-type to test.
 :
 : @return true if the given content-type is a XML content-type,
 :  false otherwise.
 :)
declare function resp:content-type-xml($type as xs:string)
  as xs:boolean external;

(:~
 : <p>Test if a given content-type is a HTML content-type, i.e.
 : the content-type is the string "text/html".</p>
 :
 : @param $type the content-type to test.
 :
 : @return true if the given content-type is the HTML content-type,
 :  false otherwise.
 :)
declare function resp:content-type-html($type as xs:string)
  as xs:boolean external;

(:~
 : <p>Test if a given content-type is a XHTML content-type, i.e.
 : the content-type is the string "application/xhtml+xml".</p>
 :
 : @param $type the content-type to test.
 :
 : @return true if the given content-type is the XHTML content-type,
 :  false otherwise.
 :)
declare function resp:content-type-xhtml($type as xs:string)
  as xs:boolean external;

(:~
 : <p>Test if a given content-type is a JSON content-type, i.e.
 : the content-type is the string "application/json".</p>
 :
 : @param $type the content-type to test.
 :
 : @return true if the given content-type is the JSON content-type,
 :  false otherwise.
 :)
declare function resp:content-type-json($type as xs:string)
  as xs:boolean external;

(:~
 : <p>Test if a given content-type is a binary content-type. A
 : content-type is considered to be binary if it's not a text
 : content-type.</p>
 :
 : @param $type the content-type to test.
 :
 : @return true if the given content-type is a binary content-type,
 :  false otherwise.
 :)
declare function resp:content-type-binary($type as xs:string)
  as xs:boolean external;

(:~
 : <p>Set the serialization parameters used for serializing the result
 : of the request.</p>
 :
 : <p>The following example shows how to set several options
 : for the HTML serialization method. Specifically, it sets the
 : HTML method to HTML 4.01, set the doctype-system and
 : doctype-public makes sure that the output is indented. In addition,
 : the output is UTF-8 encoded and 
 : <pre>
 : &lt;output:serialization-parameters&gt;
 :   &lt;output:encoding value="UTF-8"/&gt;
 :   &lt;output:doctype-system value="http://www.w3.org/TR/html4/loose.dtd"/&gt;
 :   &lt;output:doctype-public value="-//W3C//DTD HTML 4.01 Transitional//EN"/&gt;
 : &lt;/output:serialization-parameters&gt;
 : </pre>
 : </p>
 :
 : <p>The element passed as parameter need to be valid according
 : to the schema http://www.w3.org/2010/xslt-xquery-serialization. This
 : function validates its input (if it has not already been validated)
 : and may raise an error if the input is not valid.</p>
 :
 : <p>Please note that serialization options set by this function can
 : be overwritten by a subsequent call to resp:set-content-type. In this
 : case, the options will be reset to the default for the given
 : content-type. Also note, that the output encoding can be overwritten
 : by subsequently calling the resp:set-encoding function.</p>
 :
 : @param $params the serialization parameters that will be used
 :   to serialize the result of the request
 :
 : @return the function is sequential and, on success, returns the empty
 :   sequence.
 :
 : @error err:XQDY0027 if the input is not valid according to the
 :   schema http://www.w3.org/2010/xslt-xquery-serialization.
 :
 : @error http:invalid-encoding if the encoding specified in the serialization
 :   options is invalid or not supported.
 :)
declare %an:sequential function resp:set-serialization-parameters(
  $params as element(output:serialization-parameters)
) as empty-sequence()
{
  $resp:serialization-params :=
    if (s:is-validated($params))
    then $params
    else validate { $params }
  ;
  let $enc := $params//output:encoding/@value
  return
    if (exists($enc))
    then
      resp:set-encoding($enc);
    else
      ();
};

(:~
 : <p>Returns the serialization parameters that are currently
 : active, i.e. the ones that will be used to serialize the result
 : of this request.</p>
 :
 : <p>This will either be the default, the defaults set when
 : calling resp:set-content-type(), or the ones set by
 : resp:set-serialization-parameters().</p>
 :
 : @return the said serialization parameters
 :)
declare function resp:serialization-parameters()
  as element(output:serialization-parameters)
{
  $resp:serialization-params
};

(:~
 : <p>If this function is invoked with true, the result of the request
 : will not be serialized. Instead, the result will be the binary values
 : of any item that is of type xs:base64Binary. The values of all other
 : items will not be part of the result.</p>
 :
 : <p>Please note that all serialization parameters which have been set using
 : resp:set-serialization-parameters will be ignored. Also, the output encoding
 : is ignored for binaries.</p>
 :
 : @param $decode boolean value indicating whether base64Binaries should
 :   be decoded.
 :
 : @return the function is sequential and returns the empty sequence.
 :)
declare %an:sequential function resp:set-decode-binary($decode as xs:boolean)
  as empty-sequence() external;

(:~
 : <p>Returns the boolean indiciating whether base64Binaries returned by
 : this request will be decoded.</p>
 :
 : <p>The default if not modified using resp:set-decode-binary is false.</p>
 :
 : @return the said boolean value
 :
 :)
declare %an:sequential function resp:decode-binary()
  as xs:boolean external;

(:~
 : This function sets the HTTP 302 redirect status code in the response. As
 : a result, a redirect to the URL given as parameter will be made.
 :
 : @param $url The URL to which the redirect will be made.
 : @return The empty-sequence is returned.
 :)
declare %an:sequential function resp:set-redirect(
  $url as xs:string)
  as empty-sequence()
{
  resp:set-status($http:found);
  resp:set-header("Location", $url);
};

(:~
 : Convert between the HTTP status code as QName and
 : the integer value of that status code.
 :
 : @param $code the QName of the status code
 :
 : @return the integer value of the given QName as xs:int
 :
 : @error http:invalid-status if the given QName does not represent
 :   a valid http status code
 :)
declare function resp:code-for-status($status as xs:QName) as xs:int
{
  let $valid-code := $resp:status-info/*[fn:node-name() eq $status]
  return
    if ($valid-code)
    then
      xs:int($valid-code/@code)
    else
      fn:error(
        xs:QName("http:invalid-status"),
        concat($status, ": does not represent a valid HTTP status code"),
        $status
      )
};

(:~
 : Convert between the HTTP status code as QName and
 : the name/message of that status code.
 :
 : @param $code the QName of the status code
 :
 : @return the message of the given QName as xs:string
 :
 : @error http:invalid-status if the given QName does not represent
 :   a valid http status code
 :)
declare function resp:message-for-status($status as xs:QName) as xs:string
{
  let $valid-code := $resp:status-info/*[fn:node-name() eq $status]
  return
    if ($valid-code)
    then
      $valid-code/@message
    else
      fn:error(
        xs:QName("http:invalid-status"),
        concat($status, ": does not represent a valid HTTP status code"),
        $status
      )
};

(:~
 : Test whether the given QName refers to a valid HTTP status code.
 :
 : @param $error the QName to test
 :
 : @return true if the given QName refers to a valid HTTP status code,
 :   false otherwise.
 :)
declare function resp:valid-status($status as xs:QName) as xs:boolean
{
  exists($resp:status-info/*[fn:node-name() eq $status])
};
