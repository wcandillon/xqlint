xquery version "3.0";

(:
 : Copyright 2006-2009 The FLWOR Foundation.
 :
 : Licensed under the Apache License, Version 2.0 (the "License");
 : you may not use this file except in compliance with the License.
 : You may obtain a copy of the License at
 :
 : http://www.apache.org/licenses/LICENSE-2.0
 :
 : Unless required by applicable law or agreed to in writing, software
 : distributed under the License is distributed on an "AS IS" BASIS,
 : WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 : See the License for the specific language governing permissions and
 : limitations under the License.
:)

(:~
 : <p>
 : This module provides functions to <a href="http://www.w3.org/People/Raggett/tidy/" target="_blank">tidy</a> a HTML document. <br /> 
 : The functions in this module take an HTML document (a string) as parameter, 
 : tidy it in order to result in valid XHTML, and return this XHTML document as a document-node.
 : </p>
 :
 :
 : @author Sorin Nasoi
 : @library <a href="http://tidy.sourceforge.net/">Tidy C++ Library</a>
 : @project data processing/data converters
 :
 :)
module namespace html = "http://www.zorba-xquery.com/modules/converters/html";

(:~
 : Import module for checking if html options element is validated.
 :)
import module namespace schema = "http://www.zorba-xquery.com/modules/schema";

import schema namespace html-options = "http://www.zorba-xquery.com/modules/converters/html-options";

declare namespace err = "http://ww.w3.org/2005/xqt-errors";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : <p>This function tidies the given HTML string and returns
 : a valid XHTML document node.</p>
 :
 : <p>This functions automatically sets the following tidying parameters:
 :   <ul>
 :    <li>output-xml=yes</li>
 :    <li>doctype=omit</li>
 :    <li>quote-nbsp=no</li>
 :    <li>char-encoding=utf8</li>
 :    <li>newline=LF</li>
 :    <li>tidy-mark=no</li>
 :   </ul>
 : </p>
 :
 : @param $html the HTML string to tidy
 : @return the tidied XML document
 :
 : @error html:InternalError if an internal error occurred while tidying
 :  the string.
 :
 : @example test_html/Queries/converters/html/tidy_2.xq
 :)
declare function html:parse (
  $html as xs:string
) as document-node()
{
  let $validated-options := 
    validate {
          <options xmlns="http://www.zorba-xquery.com/modules/converters/html-options" >
              <tidyParam name="output-xml" value="yes" />
              <tidyParam name="doctype" value="omit" />
              <tidyParam name="quote-nbsp" value="no" />
              <tidyParam name="char-encoding" value="utf8" />
              <tidyParam name="newline" value="LF" />
              <tidyParam name="tidy-mark" value="no" />
            </options>
    }
  return
    html:parse-internal($html, $validated-options)
};

(:~
 : <p>This function tidies the given HTML string and returns
 : a valid XHTML document node.</p>
 :
 : <p>The second parameter allows to specify options that
 : configure the tidy process. This parameter is a sequence
 : of name=value pairs. Allowed parameter names and values
 : are documented at <a href="http://tidy.sourceforge.net/docs/quickref.html">
 : http://tidy.sourceforge.net/docs/quickref.html</a>.</p>
 :
 : @param $html the HTML string to tidy
 : @param $options a set of name and value pairs that provide options
 :        to configure the tidy process that have to be validated against the 
 :        "http://www.zorba-xquery.com/modules/converters/html-options" schema.
 : @return the tidied XHTML document node
 :
 : @error err:XQDY0027 if $options can not be validated against the
 :  html-options schema
 : @error html:TidyOption if there was an error with one of the options
 :  in the $options parameter that couldn't have been caught by validating
 :  against the schema
 : @error html:InternalError if an internal error occurred while tidying
 :  the string.
 :
 : @example test_html/Queries/converters/html/tidy_1.xq
 :)
declare function html:parse (
  $html as xs:string,
  $options as element(html-options:options)
) as document-node()
{
  let $validated-options := if(schema:is-validated($options)) then
                              $options
                            else
                              validate { $options } 
  return
    html:parse-internal($html, $validated-options)
};

declare %private function html:parse-internal(
  $html as xs:string,
  $options as element(html-options:options)
) as document-node() external;
