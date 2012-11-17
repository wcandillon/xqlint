xquery version "3.0";
(:
 : Copyright 2010-2012 28msec Inc.
 :)

(:~
 : The Sausalito request module provides functions for accessing
 : information contained in the current HTTP request. For example,
 : the <tt>parameter-names</tt> function can be used to retrieve all
 : the names of the parameters contained in a request.
 :
 : @author 28msec
 :
 :)
module namespace request = "http://www.28msec.com/modules/http/request";

import module namespace sec = "http://www.zorba-xquery.com/modules/cryptography/hmac";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : <p>Returns a sequence of parameter values for the given parameter name
 : which are contained in the URL's query string or the body of a POST or PUT
 : request.</p>
 :
 : <p>Parameters are name-value pairs contained in the query string of the URL
 : used to make this request. As defined in RFC 1738, the query string of a
 : URL starts with a "?" character and ends with the character (if any).
 : Additionally, such name-value pairs may be part of the request's body if
 : it is a PUT or POST request and the content-type of the request is
 : "application/x-www-form-urlencoded". Name-value pairs are separated
 : using either the "&amp;" or the ";" character.</p>
 : 
 : <p>In general, the names and the values  are precent-encoded. This function
 : does the decoding of the parameters, i.e. it returns the values being
 : not percent-encoded.</p>
 :
 : <p>Also, the names and the values of each parameter (after being precent-decoded)
 : are treated as UTF-8. Please see the <tt>http:parameter-values#3</tt> function
 : for retrieving parameters submitted using a encoding other than UTF-8.</p>
 :
 : <p>This function returns the empty-sequence if no parameter with the
 : given name exists in this request. If you want the function to return
 : a default value other than the empty sequence, use the
 : <tt>http:parameter-values#2</tt> function.</p>
 :
 : <p>A URL could contain the following query string:
 : <tt>name1=value1&amp;name2=value2;name1=value3&amp;name3</tt>.
 : <tt>name1=value1&amp;name2=value2&amp;name1=value3&amp;name3</tt>.
 :
 : The name value pairs in this query string are
 : <ul>
 :   <li> name: <tt>name1</tt>; values: <tt>value1</tt> and <tt>value3</tt></li>
 :   <li> name: <tt>name2</tt>; value: <tt>value2</tt></li>
 :   <li> name: <tt>name3</tt>; value: <tt></tt></li>
 : </ul>
 : </p>
 :
 : @param $name The name of the parameter whose value(s) should be returned.
 :
 : @return A sequence of values for the parameter with the given name.
 :   The empty sequence is returned if no parameter exists with the given
 :   name.
 :)
declare function request:parameter-values(
  $name as xs:string
) as xs:string*
{
  request:parameter-values($name, ())
};

(:~
 : <p>Returns a sequence of parameter values for the given parameter name
 : which are contained in the URL's query string or the body of a POST or PUT
 : request.</p>
 :
 : <p>This function is similar to the <tt>request:parameter-values#1</tt> function.
 : However, instead of returning the empty-sequence as a default value it returns
 : the given default-values sequence if no parameter with the given name is found
 : in this request.</p>
 :
 : @param $name The name of the parameter whose value(s) should be returned.
 :
 : @param $default_param Default value that is returned if the request
 :        does not contain a parameter with the given name.
 :
 : @return A sequence of values for the parameter with the given name.
 :  The sequence given as $default-values parameter is returned if
 :  no parameter exists with the given name.
 :)
declare function request:parameter-values(
  $name as xs:string,
  $default-values as xs:string*
) as xs:string*
{
  request:parameter-values($name, $default-values, "UTF-8") 
};

(:~
 : <p>Returns a sequence of parameter values for the given parameter name
 : which are contained in the URL's query string or the body of a POST or PUT
 : request.</p>
 :
 : <p>This function is similar to the <tt>request:parameter-values#2</tt> function.
 : However, the names and values are treated (after precent-decoding) using the
 : given encoding supplied as third parameter. For example, parameters might
 : be encoded using the ISO-8859-1 encoding.</p>
 :
 : @param $name The name of the parameter whose value(s) should be returned.
 :
 : @param $default_param Default value that is returned if the request
 :        does not contain a parameter with the given name.
 :
 : @param $encoding The encoding of the parameters in the request (e.g. ISO-8859-1)
 :
 : @return A sequence of values for the parameter with the given name.
 :  The sequence given as $default-values parameter is returned if
 :  no parameter exists with the given name.
 :
 : @error request:invalid-encoding if the given encoding is invalid or not
 :   supported.
 :)
declare function request:parameter-values(
  $name as xs:string,
  $default-values as xs:string*,
  $encoding as xs:string
) as xs:string* external;

(:~
 : <p>Returns the names of the parameters contained in the current request.</p>
 :
 : <p>Parameters are name-value pairs contained in the query string of the URL
 : used to make this request. As defined in RFC 1738, the query string of a
 : URL starts with a "?" character and ends with the character (if any).
 : Additionally, such name-value pairs may be part of the request's body if
 : it is a PUT or POST request and the content-type of the request is
 : "application/x-www-form-urlencoded". Name-value pairs are separated
 : using either the "&amp;" or the ";" character.</p>
 : 
 : <p>In general, the names and the values  are precent-encoded. This function
 : does the decoding of the parameters, i.e. it returns the values being
 : not percent-encoded.</p>
 :
 : <p>Also, the names of each parameter (after being precent-decoded) are
 : treated as UTF-8. Please see the <tt>http:parameter-names#1</tt> function
 : for retrieving parameter names submitted using a encoding other than UTF-8.
 : </p>
 :
 : @return The names of all parameters in this request. The empty sequence is
 :   returned if there are none.
 :)
declare function request:parameter-names() as xs:string*
{
  request:parameter-names("UTF-8")
};

(:~
 : <p>Returns the names of the parameters contained in the current request.</p>
 :
 : <p>This function is similar to the <tt>request:parameter-names#0</tt> function.
 : However, the names are treated (after precent-decoding) using the
 : given encoding supplied as parameter. For example, parameters might
 : be encoded using the ISO-8859-1 encoding.</p>
 :
 : @param $encoding The encoding of the parameters in the request
 :   (e.g. ISO-8859-1).
 :
 : @return The names of all parameters in this request. The empty sequence is
 :   returned if there are none.
 :
 : @error request:invalid-encoding if the given encoding is invalid or not
 :   supported.
 :)
declare function request:parameter-names(
  $encoding as xs:string)
as xs:string* external;

(:~
 : <p>Returns the name of the HTTP method used to make this request.</p>
 :
 : @return The request method used to make this request
 :   (i.e. GET, POST, PUT, DELETE or HEAD).
 :)
declare function request:method() as xs:string external;

(:~
 : Returns true if the HTTP method of this request is POST.
 :
 : @return true if the HTTP method of this request is POST,
 :         false otherwise.
 :)
declare function request:method-post() as xs:boolean external;

(:~
 : Returns true if the HTTP method of this request is GET.
 :
 : @return true if the HTTP method of this request is GET,
 :         false otherwise.
 :)
declare function request:method-get() as xs:boolean external;

(:~
 : Returns true if the HTTP method of this request is PUT.
 :
 : @return true if the HTTP method of this request is PUT,
 :         false otherwise.
 :)
declare function request:method-put() as xs:boolean external;

(:~
 : Returns true if the HTTP method of this request is DELETE.
 :
 : @return true if the HTTP method of this request is DELETE,
 :         false otherwise.
 :)
declare function request:method-delete() as xs:boolean external;

(:~
 : Returns true if the HTTP method of this request is HEAD.
 :
 : @return true if the HTTP method of this request is HEAD,
 :         false otherwise.
 :)
declare function request:method-head() as xs:boolean external;

(:~
 : Returns true if the HTTP method of this request is OPTION.
 :
 : @return true if the HTTP method of this request is OPTION,
 :         false otherwise.
 :)
declare function request:method-options() as xs:boolean external;

(:~
 : <p>Returns the user agent that made to perform the current request.</p>
 :
 : <p>This function returns the value of the User-Agent header
 : contained in the current request.</p>
 :
 : @return The user agent used to perform this request of the empty
 :   sequence if there was no User-Agent header in the request.
 :)
declare function request:user-agent() as xs:string? external;

(:~
 : <p>Returns the sever port to which the client making the current request
 : is connected.</p>
 :
 : @return The server port to which the client is connected.
 :)
declare function request:server-port() as xs:int external;

(:~
 : <p>Returns the server name of the server running the application.</p>
 :
 : <p>The web server's hostname or IP address.</p>
 :
 : @return The name of the server that runs the application accepting
 :   this request.
 :)
declare function request:server-name() as xs:string external;

(:~
 : <p>Returns the port of the client to which this request is connected.</p>
 :
 : @return The port on the client side to which this request
 :         is connected.
 :)
declare function request:remote-port() as xs:int external;

(:~
 : <p>Returns the IP address of the client to which this request
 : is connected.</p>
 :
 : @return The IP address on the client side to which this request
 :         is connected.
 :)
declare function request:remote-addr() as xs:string external;

(:~
 : <p>Returns the URI that was used to make this request.</p>
 :
 : <p>The value returned contains the part of the URL starting
 : from the path to the end or the starting of the fragment (i.e.
 : the '#' character).</p>
 :
 : @return The path and query string part of the request's URL
 :)
declare function request:uri() as xs:string external;


(:~
 : Return the path component of the request URI. The path starts after the
 : host and ends before the query string starts.
 :
 : @return The path component of the request URI
 :)
declare function request:path() as xs:string
{
  tokenize(request:uri(), "\?")[1]
};

(:~
 : <p>Returns the query string that was used to make this request.</p>
 :
 : <p>The query string contains the part of the request URL that
 : starts with the '?' character to the end or the starting of the
 : fragment (i.e. the '#' character).</p>
 :
 : @return The query string part of the request's URL
 :)
declare function request:query-string() as xs:string external;

(:~
 : <p>Returns the content-type of the data sent with this request.</p>
 :
 : <p>Note that the content-type is only set for PUT and POST requests.</p>
 :
 : @see <a href="#get-content-0">get-content</a>
 : @return The content-type of the request if it is a PUT or POST request.
 :   Otherwise, it returns the empty sequence.
 :)
declare function request:content-type() as xs:string? external;

(:~
 : <p>Returns the length of the content in bytes.</p>
 :
 : <p>The value returned corresponds to the value of the HTTP
 : content-length header. The function returns an empty sequence
 : if this header does not exist in the request or its value
 : could not be converted to item of type xs:integer</p>.
 :
 : @see <a href="#content-0">content</a>
 :
 : @return The content-length in bytes of the content sent with this
 :   request or the empty sequence if the content-length header does
 :   not exist in the request.
 :)
declare function request:content-length() as xs:integer? external;

(:~
 : <p>Returns the content of the request as string.</p>
 :
 : <p>The function returns the content of the request only
 : if the content-type refers to a type that can be treated
 : as text (e.g. text/* or application/xml). The function raises
 : an error if the content cannot be treated as text.</p>
 :
 : <p>The text content is interpreted using the encoding/charset
 : that is specified in the Content-Type header of the request. If
 : no charset is specified, the default ISO-8859-1 is used. If a encoding
 : other than the specified or default one should be used, the
 : <tt>request:text-content#1</tt> function should be used.</p>
 :
 : @return The content of the request as a string.
 :
 : @error request:invalid-encoding if the encoding specified in
 :   the Content-Type header is invalid or not supported.
 :
 : @error request:no-text-content if the content contained in the
 :   body of the request cannot be treated as text.
 :)
declare function request:text-content() as xs:string external;

(:~
 : <p>Returns the content of the request as string interpreting
 : it with the given encoding.</p>
 :
 : <p>The function returns the content of the request only
 : if the content-type refers to a type that can be treated
 : as text (e.g. text/* or application/xml). The function raises
 : an error if the content cannot be treated as text.</p>
 :
 : <p>The text content is interpreted using the given encoding/charset.
 : That is, the charset specified in the Content-Type header of the request
 : is ignored. An error is raised if the given encoding is invalid
 : or not supported.</p>
 :
 : @param overwrite-encoding the encoding that should be used to
 :   interpret the content of the request.
 :
 : @return The content of the request as a string.
 :
 : @error request:invalid-encoding if the encoding specified in
 :   the Content-Type header or the $overwrite-encoding parameter
 :   is invalid or not supported.
 :
 : @error request:no-text-content if the content contained in the
 :   body of the request cannot be treated as text.
 :)
declare function request:text-content(
  $overwrite-encoding as xs:string
) as xs:string external;

(:~
 : <p>Returns the content of the request as base64Binary.</p>
 :
 : @return The content of the request as base64Binary.
 :
 : @error request:no-binary-content if the content contained in the
 :   body of the request cannot be treated as binary because
 :   it is a request with multipart or url-encoded content.
 :)
declare function request:binary-content() as xs:base64Binary external;

(:~
 : <p>Returns the value of the HTTP header with the given name.</p>
 :
 : <p>Header fields are colon-separated name-value pairs, terminated
 : by a carriage return (CR) and line feed (LF) character sequence. The
 : names and values of each header are allowed to consist of US-ASCII
 : characters only.</p>
 :
 : <p>Please note that header names are considered case-insensitive.
 : Also note, that only one value is returned if multiple headers with the
 : same names exist in the request. This value is a comma-separated list
 : of the values of the headers in the order in which the headers appeared
 : in the request.</p>
 :
 : <p>All headers having a name that starts with SAUSALITO_ are reserved
 : and will not be returned by this function.</p>
 :
 : @param $name The header name for which the value should be returned.
 :
 : @return The header value of the header with the <tt>$name</tt> argument or
 :  the empty sequence if no header with that name is contained in the request.
 :)
declare function request:header-value($name as xs:string) as xs:string? external;

(:~
 : <p>Returns the names of all the HTTP headers in this request.</p>
 :
 : <p>Header fields are colon-separated name-value pairs, terminated
 : by a carriage return (CR) and line feed (LF) character sequence. The
 : names and values of each header are allowed to consist of US-ASCII
 : characters only.</p>
 :
 : <p>The names of the headers are returned using upper-case letters.
 : If a header with the same name is contained multiple times in a request,
 : its name is only returned once. The order of the names in the resulting
 : sequence does not reflect the order of the headers in the request. If
 : a header does not have a value, it is as if the header does not exist
 : in the request.</p>
 :
 : <p>Note that the header names user-agent and content-type are not
 : returned by this function. They are returned by the corresponding
 : functions of this module module
 : (e.g. <a href="#user-agent-0">user-agent</a>).</p>
 :
 : @return The names of the headers of this request or the empty
 :   sequence if no headers are contained in the request.
 :)
declare function request:header-names() as xs:string* external;


(:~
 : <p>Returns the metadata of all parts contained in a multipart request.</p>
 :
 : <p>The data is returned as an element with name <tt>request:mulitpart</tt>
 : as shown in the following example.</p>
 :
 : <code>
 :  &lt;multipart xmlns="http://www.28msec.com/modules/http/request"
 :    media-type="multipart/...; boundary=...">
 :    &lt;header name="Content-Disposition" value='form-data; filename="..."'/>
 :    &lt;header name="Content-Type" value="application/octet-stream"/>
 :    &lt;body filename="..." src="..."/>
 :
 :    &lt;header name="Content-Disposition" value='form-data; filename="..."'/>
 :    &lt;header name="Content-Type" value="application/octet-stream"/>
 :    &lt;body filename="..." src="..."/>
 :
 :  &lt;/multipart>
 : </code>
 :
 : <p>The <tt>media-type</tt> is the type of the content as given in the
 : request (i.e. it's value is equal to the value returned by
 : <tt>request:header-values("Content-Type")</tt>).</p>
 :
 : <p>Within the <tt>multipart</tt> element is a sequence of
 : (<tt>header</tt>*,<tt>body</tt>) elements. Each such group corresponds to
 : one part. Every <tt>header</tt> belongs to a header for this part and the
 : <tt>body</tt> refers to the value of a part. The actual value of a part
 : can be retrieved by passing the value of the <tt>src</tt> attribute of
 : the <tt>body</tt> to the <tt>request:text-part</tt> or
 : <tt>request:binary-part</tt> functions. The other attributes of the
 : <tt>body</tt> element represent a parameter of the Content-Disposition
 : header as described in RFC 2183 (e.g. filename, name, creation-date).</p> 
 :
 : <p>Please note that recursive multipart content is not supported.</p>
 :
 : @return a multipart element representing the meta data of the multipart
 :   content
 : 
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function request:parts() as element(request:multipart) external;

(:~
 : <p>Returns the value of a part as base64Binary.</p>
 :
 : <p>A part is identified by a reference that is the value of a
 : <tt>src</tt> attribute returned by the <tt>request:parts</tt> function.</p>
 :
 : @param $ref the name of the part
 :
 : @return the value of the part as base64Binary
 :
 : @error request:invalid-part if the part with the given name ($ref) does not
 :   exist
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function request:binary-part(
  $ref as xs:string
) as xs:base64Binary external; 

(:~
 : <p>Returns the value of a part as string</p>
 :
 : <p>A part is identified by a reference that is the value of a
 : <tt>src</tt> attribute returned by the <tt>request:parts</tt> function.</p>
 :
 : <p>The value of the text part is interpreted using the encoding/charset
 : given in the headers of the part. If no encoding is given, the default
 : US-ASCII is assumed.</p>
 :
 : @param $ref the name of the part
 :
 : @return the value of the part as string
 :
 : @error request:invalid-encoding if the encoding given in the headers of the
 :   part is invalid or not supported.
 :
 : @error request:no-text-content if the value of the part cannot be treated
 :   as text
 :
 : @error request:invalid-part if the part with the given name ($ref) does not
 :   exist
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function request:text-part(
  $ref as xs:string
) as xs:string external;

(:~
 : <p>Returns the value of a part as string interpreting
 : it with the given encoding.</p>
 :
 : <p>A part is identified by a reference that is the value of a
 : <tt>src</tt> attribute returned by the <tt>request:parts</tt> function.</p>
 :
 : @param $ref the name of the part
 :
 : @param overwrite-encoding the encoding that should be used to
 :   interpret the content of the part
 :
 : @return the value of the part as string
 :
 : @error request:invalid-encoding if the encoding given using the
 : $overwrite-encoding parameter is invalid or not supported.
 :
 : @error request:no-text-content if the value of the part cannot be treated
 :   as text
 :
 : @error request:invalid-part if the part with the given name ($ref) does not
 :   exist
 :
 : @error request:non-multipart if the current request does not contain
 :   multipart content
 :
 : @error request:invalid-multipart if the multipart content is invalid
 :   (e.g. the boundary is missing)
 :)
declare function request:text-part(
  $ref as xs:string,
  $overwrite-encoding as xs:string
) as xs:string external;
