xquery version "1.0";

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
 : This module provides XSLT 1.0 transformation functionality.  
 :
 : <p>For details on XSLT see 
 : <a href="http://www.w3.org/TR/xslt">XSLT 1.0 specification</a>.</p>  
 :
 : <p>This module implements the invoking of an XSLT transformation from XQuery
 : described in <a href="http://lists.w3.org/Archives/Member/w3c-xsl-wg/2008Apr/0052.html">
 :    Michael Kay's proposal</a>.</p>
 : 
 :
 : <p>Example:
 : <pre class="brush: xquery;">
 : import module namespace
 :        xslt = "http://www.zorba-xquery.com/modules/languages/xslt";
 : 
 : let $source := 
 :     &lt;catalog>
 :         &lt;cd>
 :                 &lt;title>Empire Burlesque&lt;/title>
 :                 &lt;artist>Bob Dylan&lt;/artist>
 :                 &lt;country>USA&lt;/country>
 :                 &lt;company>Columbia&lt;/company>
 :                 &lt;price>10.90&lt;/price>
 :                 &lt;year>1985&lt;/year>
 :         &lt;/cd>
 :         &lt;cd>
 :                 &lt;title>Hide your heart&lt;/title>
 :                 &lt;artist>Bonnie Tyler&lt;/artist>
 :                 &lt;country>UK&lt;/country>
 :                 &lt;company>CBS Records&lt;/company>
 :                 &lt;price>9.90&lt;/price>
 :                 &lt;year>1988&lt;/year>
 :         &lt;/cd>
 :     &lt;/catalog>
 : 
 : let $stylesheet := 
 :   &lt;xsl:stylesheet version="1.0" 
 :       xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 : 
 :     &lt;xsl:template match="/">
 :       &lt;html>
 :       &lt;body>
 :       &lt;h2>Music Collection&lt;/h2>
 :         &lt;table border="1">
 :           &lt;tr bgcolor="lightblue">
 :             &lt;th>Title&lt;/th>
 :             &lt;th>Artist&lt;/th>
 :           &lt;/tr>
 :           &lt;xsl:for-each select="catalog/cd">
 :           &lt;tr>
 :             &lt;td>&lt;xsl:value-of select="title"/>&lt;/td>
 :             &lt;td>&lt;xsl:value-of select="artist"/>&lt;/td>
 :           &lt;/tr>
 :           &lt;/xsl:for-each>
 :         &lt;/table>
 :       &lt;/body>
 :       &lt;/html>
 :     &lt;/xsl:template>
 :   &lt;/xsl:stylesheet>
 : 
 : return
 :   xslt:transform( $source, $stylesheet)
 : </pre></p>
 :
 : @author Cezar Andrei
 : @library <a href="http://xmlsoft.org/XSLT/">libxslt Library</a>
 : @project programming languages
 :
 :)
module namespace xslt = "http://www.zorba-xquery.com/modules/languages/xslt";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 :<p>Invokes an XSLT transformation.</p>
 :
 : @param $source the input document to the transformation
 : @param $stylesheet the XSLT stylesheet module
 : @return the result tree produced by the transformation
 :
 : @error  xslt:XSLT001 if $stylesheet is not a valid XSLT stylesheet
 : @error  xslt:XSLT002 if result can not be imported 
 :
 : @example test_xslt/Queries/languages/xslt/xslt1.xq
 :)
declare function xslt:transform (
  $source as node(),
  $stylesheet as node()
) as node() external;
