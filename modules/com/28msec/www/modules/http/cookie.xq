xquery version "3.0";
(:
 : Copyright 2010-2012 28msec Inc.
 :)

(:~
 : The Sausalito Cookie module provides function to manipulate 
 : HTTP-Cookies.
 :
 : @author 28msec
 :
 :)
module namespace cookie = "http://www.28msec.com/modules/http/cookie";

import module namespace req = "http://www.28msec.com/modules/http/request";
import module namespace resp = "http://www.28msec.com/modules/http/response";

import module namespace uri = "http://www.zorba-xquery.com/modules/uri";
import module namespace sec = "http://www.zorba-xquery.com/modules/cryptography/hmac";
import module namespace schema = "http://www.zorba-xquery.com/modules/schema";

import schema namespace cookie-schema = "http://www.28msec.com/modules/http/cookie";

declare copy-namespaces no-preserve, no-inherit;

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare option ver:module-version "2.0";

(:~
 : Adds a <tt>Set-Cookie</tt> header to the response.
 :
 : The cookie parameter needs to adhere to the cookie schema. For example,
 : <tt>
 : &#60;cookie:cookie
 :   name="xs:string"
 :   expires="xs:datetime"
 :   domain="xs:string"
 :   path="xs:string"
 :   secure="xs:boolean">value&#60;/cookie:cookie>
 : </tt>.
 :
 : If the cookie parameter is not valid according to the schema, err:XQDY0027 is raised. 
 :
 : If $encode evaluates to fn:true(), then the child nodes of the cookie element will be
 : serialized using XML serialization (omitting the XML declaration). In order not to
 : break the cookie syntax, any occurence of whitespace or column in the value will be
 : encoded on the client using the URL encoding format. For this reason also the '%'
 : character will be encoded using the same format.
 :
 : If $encode evaluates to fn:false(), the children nodes of the cookie element will be
 : serialized as text and no encoding will be performed whatsoever. It is the
 : responsibility of the caller to make sure the text serialization will not produce an
 : invalid cookie.
 :
 : @param $cookie The cookie to send to the client
 : @param $encode if encoding should be performed on the value or not
 :
 : @error cookie:S002 if the cookie is bigger than 4096 bytes.
 :
 : @error: err:XQDY0027 if the cookie parameter is not valid according to the schema.
 :
 : @return The empty-sequence is returned.
 :)
declare %an:sequential function cookie:set(
  $cookie as element(cookie:cookie),
  $encode as xs:boolean) as empty-sequence()
{
  let $validated-cookie :=
    if (schema:is-validated($cookie))
   then $cookie
   else validate { $cookie }
  let $name := fn:data($validated-cookie/@name)
  let $value :=
    if ($encode) then
      let $newCookie :=
        <cookie:cookie>{
          $validated-cookie/attribute::*,
          $validated-cookie/child::node()
        }</cookie:cookie>
      let $data := 
        fn:serialize(
          $newCookie/child::node(), 
          <output:serialization-parameters
            xmlns:output="http://www.w3.org/2010/xslt-xquery-serialization">
            <output:method value="xml"/>
            <output:omit-xml-declaration value="yes"/>
            <output:version value="1.0"/>
          </output:serialization-parameters>)
      let $chars :=
        for $ch in string-to-codepoints($data)
        return codepoints-to-string($ch)
      let $newchars :=
        for $ch in $chars
        return
          if ($ch eq "&#10;") then "%09"      (: tab :)
          else if ($ch eq "&#09;") then "%0A" (: new line :)
          else if ($ch eq "&#13;") then "%0D" (: carriage return :)
          else if ($ch eq " ") then "%20"     (: space :)
          else if ($ch eq ";") then "%3B"
          else if ($ch eq "%") then "%25"
          (: some older browsers don't like the following 3 characters
             in the cookie value so we have to encode them as well :)
          else if ($ch eq ",") then "%2C"
          else if ($ch eq "=") then "%3D"
          else if ($ch eq '"') then "%22"
          else $ch
      return fn:string-join($newchars, "")
    else
      fn:serialize(
        $validated-cookie/child::node(), 
        <output:serialization-parameters
          xmlns:output="http://www.w3.org/2010/xslt-xquery-serialization">
          <output:method value="text"/>
        </output:serialization-parameters>
      )

  let $cookiestring :=  
    fn:concat(
      $name, "=", $value,
      if ($validated-cookie/@expires) then
        let $adjusted := fn:adjust-dateTime-to-timezone(fn:data($validated-cookie/@expires), xs:dayTimeDuration("PT0H"))
        let $datetimestring := fn:format-dateTime(
              $adjusted,
              "[FNn,3-3], [D]-[MNn,3-3]-[Y] [H]:[m]:[s] GMT",
              "en", "OS", ()) 
        return
          fn:concat("; expires=", $datetimestring)
      else (),
      if ($validated-cookie/@domain) then
        fn:concat("; domain=",  fn:data($validated-cookie/@domain))
      else (),
      if ($validated-cookie/@path) then
        fn:concat("; path=",  fn:data($validated-cookie/@path))
      else (), 
      if ($validated-cookie/@secure and fn:data($validated-cookie/@secure)) then
        "; secure=true"
      else ()  
    )
  return {
    if (fn:string-length($cookiestring) gt 4096) then
      exit returning fn:error(xs:QName("cookie:S002"),
        "The set cookie exeeds the maximum of 4096 bytes allowed per cookie.");
    else
      resp:set-header("Set-Cookie", $cookiestring);
  }
};


(:~
 : Adds a <tt>Set-Cookie</tt> header to the response. This function is equivalent to 
 : <tt>cookie:set($cookie, fn:true())</tt>.
 :
 : @param $cookie The XML representation of the cookie to be sent to the client.
 :
 : @return The empty-sequence is returned.
 :
 : @error cookie:S002 if the cookie is bigger than 4096 bytes.
 :
 : @error: err:XQDY0027 if the cookie parameter is not valid according to the schema.
 :)
declare %an:sequential function cookie:set(
  $cookie as element(cookie:cookie)
) as empty-sequence()
{
  cookie:set(validate { $cookie }, fn:true());
};

(:~
 : Returns the cookies in the request having the given name. If no name is given,
 : it returns all available cookies. If no cookie value decoding is wanted,
 : the user must specify a second argument that evaluates to fn:false().
 :
 : @param $name The name of the cookie that should be retrieved
 : @param $decode Boolean to specify if cookie value decoding id needed
 :
 : @return The cookie with the given name or the empty sequence if no cookie with
 :   the given name exist
 :
 : @error cookie:S003 if $decode evaluates to fn:true() and the value of the cookie
 :   cannot be parsed.
 :)
declare function cookie:get(
  $name as xs:string?,
  $decode as xs:boolean) as element(cookie:cookie)*
{
  for $cookie in fn:tokenize(req:header-value("COOKIE"),";")
  let $trimmed :=  replace(replace($cookie,'\s+$',''),'^\s+','')
  let $cookie-name := fn:substring-before($trimmed,"=")
  let $cookie-value := fn:substring-after($trimmed,"=")
  where fn:not($name) or $cookie-name eq $name
  return
    validate {
      <cookie:cookie name="{$cookie-name}">{
        if ($decode) then
          let $toparse := fn:concat(
            "<a>",
            uri:decode($cookie-value),
            "</a>")
          return
            fn:parse-xml($toparse)/child::*/child::node()
        else
          $cookie-value
      }</cookie:cookie> 
    }
};

(:~
 : Returns the cookie in the request having the given name or the empty sequence
 : if no such cookie exists. The cookie format returned is: 
 : <tt>
 : &#60;cookie:cookie 
 :   name="..">...&#60;/cookie:cookie></tt>.
 :
 : The content of the cookie element is the value of the cookie.
 :
 : @param $name The name of the cookie that should be retrieved.
 :
 : @return The cookie with the given name or the empty sequence if no cookie with
 :   the given name exist
 :
 : @error cookie:S003 if $decode evaluates to fn:true() and the value of the cookie
 :   cannot be parsed.
 :)
declare function cookie:get($name as xs:string?) as element(cookie:cookie)*
{
  cookie:get($name, fn:true())
};

(:~
 : Creates a client-side cookie named "_session", containing the
 : <tt>$sessionData</tt> node value together with its signature.
 : The signature is generated with the server's private key.
 :
 : @param $sessionData The data to be used for the session.
 : @return The empty-sequence is returned.
 :)
declare %an:sequential function cookie:create-session(
    $sessionData as node())
    as empty-sequence() {
  cookie:create-session($sessionData, (), ());
};

(:~
 : Creates a client-side cookie named "_session", containing the
 : <tt>$sessionData</tt> node value together with its signature.
 : The signature is generated with the server's private key.
 : The cookie is also set to expire on the date specified by
 : <tt>$expires</tt>.
 :
 : @param $sessionData The data to be used for the session.
 : @param $expires The expiration time of the cookie.
 : @return The empty-sequence is returned.
 :)
declare %an:sequential function cookie:create-session(
    $sessionData as node(),
    $expires as xs:dateTime)
    as empty-sequence() {
  cookie:create-session($sessionData, $expires, ());
};

(:~
 : Creates a client-side cookie named "_session", containing the
 : <tt>$sessionData</tt> node value together with its signature.
 : The signature is generated with the server's private key.
 : The cookie is also set to expire on the date specified by
 : <tt>$expires</tt>. The cookie is only valid for the specified path.
 :
 : @param $sessionData The data to be used for the session.
 : @param $expires The expiration time of the cookie.
 : @param $path The path of the URL for which the cookie is valid.
 : @return The empty-sequence is returned.
 :)
declare %an:sequential function cookie:create-session(
    $sessionData as node(),
    $expires as xs:dateTime?,
    $path as xs:string?)
    as empty-sequence() { 
  (: add the expires attribute only if expire is set :)
  let $expires-attribute :=
    if (fn:empty($expires)) then
      ()
    else
      attribute expires { $expires }

  let $session-path := cookie:create-session-path($path)

  (: data that has to be signed :)  
  let $data-to-sign :=
    <sig>
      <cid>{ $sessionData }</cid>
      {
        if (fn:empty($expires)) then
          ()
        else
          <exp>{ $expires }</exp>
      }
    </sig>

  (: xml structure for cookie :)
  let $cookie :=
    <cookie:cookie name="_session" path="{ $session-path }">
      { $expires-attribute }
      <session  signature="{ cookie:ssign($data-to-sign) }"
                path="{ $session-path }" > {
        $expires-attribute,
        $sessionData
      }</session>
    </cookie:cookie>
  return 
    cookie:set( $cookie );
};

(:~
 : Reads the "_session" cookie in the request and verifies if
 : the signature matches the ad-hoc computed signature of the
 : content of the session. The signature is generated with a
 : server private key. If no cookie named "_session" exists,
 : this function returns false. 
 :
 : @return Returns <tt>true</tt> if the session is valid, and
 :         and false otherwise.
 :)
declare function cookie:validate-session() as xs:boolean {
  let $session := cookie:get("_session")/session
  return
    $session/data(@signature) = cookie:ssign(
      <sig><cid>{ $session/*}</cid>{
        if (fn:exists($session/@expires)) then
          <exp>{ $session/data(@expires) }</exp>
        else ()
      }</sig>)
};

(:~
 : Delete the "_session" cookie from the client. The next
 : user request will not receive a valid session cookie
 : anymore
 :
 : @return The empty-sequence is returned.
 :)
declare %an:sequential function cookie:delete-session() as empty-sequence() {
  cookie:delete-session(());
};

(:~
 : Delete the "_session" cookie from the client. The next
 : user request will not receive a valid session cookie
 : anymore
 :
 : @param $path The path of the URL for which the cookie is valid.
 : @return The empty-sequence is returned.
 :)
declare %an:sequential function cookie:delete-session($path as xs:string?) as empty-sequence() {
  cookie:set(
      <cookie-schema:cookie name="_session"
        path="{cookie:create-session-path($path)}"
        expires="{fn:current-dateTime() - xs:duration("P1Y")}">
      </cookie-schema:cookie>,
    fn:true()
  );
};

(:~
 : Reads the "_session" cookie in the request and verifies if the signature
 : matches the ad-hoc computed signature of the content of the session. If the
 : verification is successful, the function returns the session data. Otherwise,
 : an error is raised.
 :
 : @return The session data is returned if verification succesful.
 :)
declare function cookie:session-data() as node()
{
  if (cookie:validate-session()) then
    cookie:get("_session", fn:true())/session/node()
  else
    fn:error(xs:QName("cookie:S001"),
      "No valid session available. Session data cannot be returned.")
};


declare %fn:private function cookie:ssign($data) as xs:string
{
  xs:string(sec:sha1(fn:serialize($data), cookie:secret-key()))
};

(:~
 : Computes the default path for session cookies if no path
 : is passed by the user.  
 : It takes the path of the request URL, up to, but not 
 : including, the right-most /.
 :
 : Set http://www.ietf.org/rfc/rfc2109.txt
 : 
 : @param $path Path passed by the user.
 : @return Path of the session cookie.
 :)
declare %fn:private function cookie:create-session-path($path as xs:string?) {
  if (fn:empty($path)) then
    "/"
  else
    $path
};

declare %fn:private function cookie:secret-key() as xs:string external;
