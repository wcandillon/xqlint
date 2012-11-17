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
 : 
 : This module converts <a href="http://www.w3schools.com/xslfo/default.asp">XSL-FO</a> documents
 : to various formats such as PDF, EPS, PCL, AFP, Text, PNG, Postscript, RTF, and TIFF.
 : For instance, the following example converts a simple XSL-FO document to PDF:
 : <br />
 : <pre class="brush: xquery;">
 : import module namespace fop = "http://www.zorba-xquery.com/modules/xsl-fo";
 : import module namespace file = "http://expath.org/ns/file";
 : 
 : declare namespace fo = "http://www.w3.org/1999/XSL/Format";
 :
 : let $xsl-fo := <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
 :   <fo:layout-master-set>
 :     <fo:simple-page-master master-name="my-page">
 :       <fo:region-body margin="1in"/>
 :     </fo:simple-page-master>
 :   </fo:layout-master-set>
 : 
 :   <fo:page-sequence master-reference="my-page">
 :     <fo:flow flow-name="xsl-region-body">
 :       <fo:block>Hello, world!</fo:block>
 :     </fo:flow>
 :   </fo:page-sequence>
 :  </fo:root>
 : let $pdf := fop:generator($fop:PDF, $xsl-fo)
 : return file:write-binary("simple.pdf", $pdf) 
 : </pre>
 : <br /> 
 : This module uses Apache-FOP to generate content from an XSL-FO document.
 : See <a href="http://xmlgraphics.apache.org/fop/">the Apache FOP documentation</a> for further information.
 : <br />
 : <br />
 : <b>Note for Windows users</b>: On Windows, this module won't work out of the box, since
 : this module uses Java. But the Java VM dll is not in the system path by default. To make
 : this module work, you need to add the directory where the jvm.dll is located to the
 : system path. This dll is located at JRE_DIR\bin\client. On a standard installation, this would
 : be something a path like "C:\Program Files\Java\jre6\bin\client".
 :
 : @author Markus Pilman
 : @see http://xmlgraphics.apache.org/fop/
 : @library <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">JDK - Java Development Kit</a>
 : @project data processing/data formatting
 :)
module namespace xsl-fo = "http://www.zorba-xquery.com/modules/xsl-fo";

import module namespace util-jvm = "http://www.zorba-xquery.com/modules/util-jvm";

declare namespace err = "http://www.w3.org/2005/xqt-errors";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : The mime type of IBMs AFP format (application/x-afp).
 :)
declare variable $xsl-fo:AFP as xs:string := "application/x-afp";
(:~
 : The mime type of the EPS format (application/postscript).
 :)
declare variable $xsl-fo:EPS as xs:string := "application/postscript";
(:~
 : The mime type of the PCL format (application/x-pcl).
 :)
declare variable $xsl-fo:PCL as xs:string := "application/x-pcl";
(:~
 : The mime type of the PDF format (application/pdf).
 :)
declare variable $xsl-fo:PDF as xs:string := "application/pdf";
(:~
 : The mime type for plain text files (text/plain).
 :)
declare variable $xsl-fo:PLAIN_TEXT as xs:string := "text/plain";
(:~
 : The mime type of the PNG format (image/png).
 :)
declare variable $xsl-fo:PNG as xs:string := "image/png";
(:~
 : The mime type of the postscript format (application/postscript).
 :)
declare variable $xsl-fo:POSTSCRIPT as xs:string := "application/postscript";
(:~
 : The mime type of the RTF format (application/rtf).
 :)
declare variable $xsl-fo:RTF as xs:string := "application/rtf";
(:~
 : The mime type of TIFF format (application/tiff).
 :)
declare variable $xsl-fo:TIFF as xs:string := "image/tiff";

(:~
 : Deprecated. This function has been deprecated, the JVM and it's classpath is handled diffrently.<br/>
 : The generator function takes an XSL-FO document as input and generates output in the format given as input.
 : The output format can be given as a MIME type - for example "application/pdf" - or one of the predefined
 : variables can be used - like $xsl-fo:PDF. Please refer to the Apache FOP documentation for
 : <a href="http://xmlgraphics.apache.org/fop/0.95/output.html">supported output formats</a>.
 :
 : Apache FOP does not support 100% of the XSL-FO standard.
 : Please consult the <a href="http://xmlgraphics.apache.org/fop/">official documentation for further information</a>.
 :
 : @param $output-format The mime of the output format.
 : @param $xsl-fo-document The XSL-FO document from which the output should be generated. <a href="http://www.w3schools.com/xslfo/xslfo_intro.asp">More information about XSL-FO documents.</a>.
 : @param $classpath This parameter is not used, hence the deprecation of this function.
 : @return The generated output document.
 : @error xsl-fo:VM001 If zorba was unable to start the JVM.
 : @error xsl-fo:JAVA-EXCEPTION If Apache FOP throws an exception - i.e. if the input format is not correct/supported.
 : @deprecated
 :)
declare function xsl-fo:generator($output-format as xs:string, $xsl-fo-document as node(), $classpath as xs:string+) as xs:base64Binary {
  xsl-fo:generator-impl($output-format, $xsl-fo-document)
};

(:~
 : The function behaves like <a href="#generator#3">generator#3</a>, but tries to find the needed Java libraries itself.
 : <br />
 : On a Mac OS X computer, it should be sufficient to install Apache FOP via Mac Ports.<br />
 : On Ubuntu it should be sufficient to install the fop packages via apt-get.<br />
 : On Windows, the classpath needs to be set manually using <a href="#generator#3">generator#3</a>.
 : <br />
 : This function tries to find the jar files via environment variables. The user can set the
 : variable FOP_HOME to the root directory of an Apache FOP distribution. If you have all
 : JAR files in the same directory, you can set the environment variable FOP_LIB_DIR to this
 : directory.
 :
 : @param $output-format The mime of the output format, to tell Apache FOP which kind of document it should
 :        create.
 : @param $xsl-fo-document The XSL-FO document from which the output should be generated.
 : @return The generated output document.
 : @error xsl-fo:VM001 If zorba was unable to start the JVM.
 : @error xsl-fo:JAVA-EXCEPTION If Apache FOP throws an exception - i.e. if the input format is not correct/supported.
 : @error xsl-fo:JAR-NOT-FOUND If a needed Java library could not be found.
 :)
declare function xsl-fo:generator($output-format as xs:string, $xsl-fo-document as node()) as xs:base64Binary {
    xsl-fo:generator-impl($output-format, $xsl-fo-document)
};


(:~
 : Internal function used to format XSL-FO documents.
 : 
 : @param $output-format The mime type of the output format.
 : @param $xsl-fo-document The XSL-FO representation of the document.
 : @return The base64Binary Representation of document.
 :)
declare %private function xsl-fo:generator-impl($output-format as xs:string, $xsl-fo-document as node()) as xs:base64Binary external;

