xquery version "3.0";
(:
 : Copyright 2010-2012 28msec Inc.
 :)

(:~
 : This module provides utility functions to help with diagnostic analysis
 : / debugging of RESTful Apps or webapps.
 :
 : @author 28msec
 :
 :)
module namespace diagnostic = "http://www.28msec.com/modules/http/util/diagnostic";

import module namespace request = "http://www.28msec.com/modules/http/request";
import module namespace multipart = "http://www.28msec.com/modules/http/util/multipart";
import module namespace base64 = "http://www.zorba-xquery.com/modules/converters/base64";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare namespace err = "http://www.w3.org/2005/xqt-errors";
declare option ver:module-version "2.0";

(: 
  this function is private as it is very likely that the structure
  of the xml representation will change.
:)
declare %fn:private function diagnostic:serialize-request-as-xml() as element(request)
{
  <request description="Request Information">
    <general_http_info description="General HTTP Request Information">
      <info>
        <description>Request Method</description>
        <function>request:method()</function>
        <value>{ request:method() }</value>
      </info>
      <info_list>
        <value class="{if(request:method-get())then "success" else "error"}">
          request:method-get(): { request:method-get() }</value>
        <value class="{if(request:method-post())then "success" else "error"}">
          request:method-post(): { request:method-post() }</value>
        <value class="{if(request:method-put())then "success" else "error"}">
          request:method-put(): { request:method-put() }</value>
        <value class="{if(request:method-head())then "success" else "error"}">
          request:method-head(): { request:method-head() }</value>
        <value class="{if(request:method-delete())then "success" else "error"}">
          request:method-delete(): { request:method-delete() }</value>
        <value class="{if(request:method-options())then "success" else "error"}">
          request:method-options(): { request:method-options() }</value>
      </info_list>
      <info>
        <description>Uri String</description>
        <function>request:uri()</function>
        <value>{ request:uri() }</value>
      </info>
      <info>
        <description>Path String</description>
        <function>request:path()</function>
        <value>{ request:path() }</value>
      </info>
      <info>
        <description>Query String</description>
        <function>request:query-string()</function>
        <value>{ request:query-string() }</value>
      </info>
      <info>
        <description>All Parameters</description>
        <function>request:parameter-names()</function>
        <function>request:parameter-values($name)</function>
        {
          for $name in request:parameter-names() 
          return <value name="{$name}">{ request:parameter-values($name) }</value>
        }
      </info>
      <info>
        <description>HTTP Headers</description>
        <function>request:header-names()</function>
        <function>request:header-value($name)</function>
        {
          for $name in request:header-names() 
          return <value name="{$name}">{ request:header-value($name) }</value>
        }
      </info>
    </general_http_info>
    
    <server_info description="Server Information">
      <info>
        <description>Server name</description>
        <function>request:server-name()</function>
        <value>{ request:server-name() }</value>
      </info>
      <info>
        <description>Server port</description>
        <function>request:server-port()</function>
        <value>{ request:server-port() }</value>
      </info>
    </server_info>
    
    <client_info description="Client Information">
      <info>
        <description>Client Address</description>
        <function>request:remote-addr()</function>
        <value>{ request:remote-addr() }</value>
      </info>
      <info>
        <description>Client port</description>
        <function>request:remote-port()</function>
        <value>{ request:remote-port() }</value>
      </info>
      <info>
        <description>User Agent</description>
        <function>request:user-agent()</function>
        <value>{ request:user-agent() }</value>
      </info>
    </client_info>
    
    <content_info description="Content Information">
      <info>
        <description>Content Type</description>
        <function>request:content-type()</function>
        <value>{ request:content-type() }</value>
      </info>
      <info>
        <description>Content length</description>
        <function>request:content-length()</function>
        <value>{ request:content-length() }</value>
      </info>
      <info>
        <description>Text content</description>
        <function>request:text-content()</function>
        { 
          try { <value>{ request:text-content() }</value> } 
          catch * { 
            <value class="error" error-code="{$err:code}">{$err:description}</value>
          } 
        }
      </info>
      <info>
        <description>Binary content</description>
        <function>request:binary-content()</function>
        { 
          try { <value>{ request:binary-content() }</value> } 
          catch * { 
            <value class="error" error-code="{$err:code}">{$err:description}</value>
          } 
        }  
      </info>
    </content_info>
    
    <multipart_info description="Multipart Content Information">
      <info>
        <description>Plain text multiparts</description>
        <function>multipart:names()</function>
        <function>multipart:part($name)</function>
        { 
          try{
            for $name in multipart:names()
            return <value name="{$name}">{ serialize(multipart:part($name)) }</value> 
          } catch * { 
            <value class="error" error-code="{$err:code}">{$err:description}</value>
          }
        }
      </info>
      <info>
        <description>Files multipart</description>
        <function>multipart:filenames()</function>
        <function>multipart:text-file($filename)</function>
        <function>multipart:binary-file($filename)</function>
        { 
          try{
            for $filename in multipart:filenames()
            return
              try{
                <value name="{$filename} (text)">{ multipart:text-file($filename) }</value>
              } catch *:no-text-content {
                <value name="{$filename} (binary)">{ multipart:binary-file($filename) }</value>
              }
          } catch * { 
            <value class="error" error-code="{$err:code}">{$err:description}</value>
          }
        }
      </info>
    </multipart_info>
  </request>
};

(:~
 : <p>Returns a sequence of html elements listing all request 
 : characteristics.</p>
 :
 : <p>This function is helpful for debugging purposes. It can be used
 : to output request information within an HTML page.</p>
 :
 : @return HTML elements describing the request
 :)
declare function diagnostic:serialize-request-as-html() as element()*
{
  let $width_col1 := "15%"
  let $width_col2 := "15%"
  let $width_col3 := "70%"
  let $request := diagnostic:serialize-request-as-xml()
  return
    (
      <hr/>,
      <h2>{ string($request/@description) }</h2>,
      {
        for $section in $request/element()
        return
          (
            <h3>{ string($section/@description) }</h3>,
            <table border="1px" cellspacing="0" cellpadding="5" width="100%">
            {
              for $info in $section/element()
              return
                typeswitch($info)
                  case element(info_list) 
                    return 
                      <tr>
                        <td colspan="3">
                        { 
                          let $common_style := 
                            "float:left;color:black;width=100px;margin:5px;padding:5px;"
                          for $value in $info/value
                          let $style :=
                            switch(string($value/@class))
                              case "error" return concat("background-color:#FDD;",$common_style)
                              case "success" return concat("background-color:#EFE;",$common_style)
                              default return $common_style
                          return
                            <div style="{ $style }">{ $value/text() }</div>,
                          <div style="clear:both;" />
                        }
                        </td>
                      </tr>
                  case element(info) 
                    return 
                      <tr>
                        <th width="{$width_col1}">{ $info/description/text() }</th>
                        <td width="{$width_col2}">{ 
                          for $func in ( $info/function )
                          return
                            (
                              $func/text(),
                              <br />
                            )
                        }</td>
                        <td width="{$width_col3}">{
                          for $value in $info/value
                          let $content :=
                            switch(false())
                              case empty($value/@name) return 
                                (
                                  <b>{ string($value/@name) }: </b>,
                                  $value/text(),
                                  <br/>
                                )
                              case empty($value/@error-code) return
                                (
                                  "[ERROR] ",
                                  <b>{ string($value/@error-code) }</b>,
                                  ": ",
                                  $value/text()
                                )
                              default return $value/text()
                            return
                              switch(string($value/@class))
                                case "error" return 
                                  <span style="background-color:#FDD;">{ $content }</span>
                                case "warning" return 
                                  <span style="background-color:#FFD;">{ $content }</span>
                                case "success" return
                                  <span style="background-color:#EFE;">{ $content }</span>
                                default return $content
                        }</td>
                      </tr>
                  default return ()
            }
            </table>
          )
      }
    )
};

(:~
 : <p>Returns a sequence of xs:string listing all request 
 : characteristics.</p>
 :
 : <p>This function is helpful for debugging purposes. It can be used
 : to output request information as plan text.</p>
 :
 : @return sequence of strings describing each characteristic of a request
 :)
declare function diagnostic:serialize-request-as-txt() as xs:string*
{
  let $request := diagnostic:serialize-request-as-xml()
  return
    (
      string($request/@description),
      "==============================",
      for $section in $request/element()
      return
        (
          string($section/@description),
          "------------------------------",
          for $info in $section/element()
          return
            typeswitch($info)
              case element(info_list) 
                return 
                  string-join(
                    for $value in $info/value
                    return
                      string($value/text()),";")
              case element(info) 
                return 
                  string-join(
                    (
                      $info/description/text(),
                      string-join(
                        for $func in ( $info/function )
                        return $func/text(),";"),
                      string-join(
                        for $value in $info/value
                        return
                          switch(true())
                            case $value/@name return 
                              concat(
                                string($value/@name),":",string($value/text())
                              )
                            case $value/@error-code return
                              concat(
                                "[ERROR] ",
                                string($value/@error-code),
                                ":",
                                string($value/text())
                              )
                            default return string($value/text()),";")
                    ),"|")
              default return ""
        )
    )
};
