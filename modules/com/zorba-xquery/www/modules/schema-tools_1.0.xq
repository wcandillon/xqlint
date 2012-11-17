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
 : This module provides funtionality to get sample XMLSchema from XML instances
 : and sample XML instances from XMLSchema.
 : <a href="http://xmlbeans.apache.org/">Apache XMLBeans</a> library is used to implement
 : inst2xsd and xsd2inst functions.
 : <br />
 : <br />
 : <b>Note:</b> Since this module has a Java library dependency a JVM required
 : to be installed on the system. For Windows: jvm.dll is required on the system
 : path ( usually located in "C:\Program Files\Java\jre6\bin\client".
 :
 : @author Cezar Andrei
 : @see http://xmlbeans.apache.org/
 : @library <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">JDK - Java Development Kit</a>
 : @project data processing/metadata
 : @library <a href="http://xmlbeans.apache.org/">Apache XMLBeans</a>
 :)
module namespace schema-tools = "http://www.zorba-xquery.com/modules/schema-tools";


import schema namespace st-options = "http://www.zorba-xquery.com/modules/schema-tools/schema-tools-options";

(:~
 : Import module for checking if options element is validated.
 :)
import module namespace schema-options = "http://www.zorba-xquery.com/modules/schema";


declare namespace err = "http://www.w3.org/2005/xqt-errors";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";


(:~
 : The inst2xsd function takes a set of sample XML instance elements as input and
 : generates a set of sample XMLSchema documents that define
 : the content of the given input.
 : <br />
 : Please consult the 
 : <a href="http://xmlbeans.apache.org/">official documentation for further
 : information</a>.
 : <br />
 : Example:<pre class="brush: xquery;">
 :
 :  import module namespace st = "http://www.zorba-xquery.com/modules/schema-tools";
 :  declare namespace sto =
 :      "http://www.zorba-xquery.com/modules/schema-tools/schema-tools-options";
 :  let $instances := (<a><b/><c/></a>, <b/>, <c>ccc</c>)
 :  let $options  :=
 :     <sto:inst2xsd-options xmlns:sto=
 :       "http://www.zorba-xquery.com/modules/schema-tools/schema-tools-options">
 :       <sto:design>vbd</sto:design>
 :       <sto:simple-content-types>smart</sto:simple-content-types>
 :       <sto:use-enumeration>10</sto:use-enumeration>
 :     </sto:inst2xsd-options>
 :  return
 :      st:inst2xsd($instances, $options)
 :
 : </pre>
 : <br />
 : @param $instances The input XML instance elements
 : @param $options Options:<br />
 :    <ul>
 :      <li>design: Choose the generated schema design<br />
 :         - rdd: Russian Doll Design - local elements and local types<br />
 :         - ssd: Salami Slice Design - global elements and local types<br />
 :         - vbd (default): Venetian Blind Design - local elements and global
 :                          complex types</li>
 :      <li>simple-content-types: type of leaf nodes<br />
 :         - smart (default): try to find the right simple XMLSchema type<br />
 :         - always-string: use xsd:string for all simple types</li>
 :      <li>use-enumeration: - when there are multiple valid values in a list<br />
 :         - 1: never use enumeration<br />
 :         - 2 or more (default 10): use enumeration if less than this number of occurrences - number option</li>
 :      <li>verbose: - stdout verbose info<br />
 :         - true: - output type holder information<br />
 :         - false (default): no output</li></ul>
 :
 :
 : @return The generated XMLSchema documents.
 : @error schema-tools:VM001 If Zorba was unable to start the JVM.
 : @error schema-tools:JAVA-EXCEPTION If Apache XMLBeans throws an exception.
 : @example test/Queries/schema-tools/inst2xsd-opt1.xq
 : @example test/Queries/schema-tools/inst2xsd-opt2.xq
 : @example test/Queries/schema-tools/inst2xsd-opt3.xq
 : @example test/Queries/schema-tools/inst2xsd-simple.xq
 : @example test/Queries/schema-tools/inst2xsd-tns-default.xq
 : @example test/Queries/schema-tools/inst2xsd-tns.xq
 : @example test/Queries/schema-tools/inst2xsd-multiTns.xq
 : @example test/Queries/schema-tools/inst2xsd-err1-badOpt.xq
 :)
declare function
schema-tools:inst2xsd ($instances as element()+,
    $options as element(st-options:inst2xsd-options)?)
  as document-node()*
{
  let $validated-options :=
    if(empty($options))
    then
      $options
    else if(schema-options:is-validated($options))
    then
      $options
    else
      validate{$options}
  return
    schema-tools:inst2xsd-internal($instances, $validated-options)
};


declare %private function
schema-tools:inst2xsd-internal( $instances as element()+,
    $options as element(st-options:inst2xsd-options, st-options:inst2xsdOptionsType)? )
  as document-node()* external;



(:~
 : The xsd2inst function takes a set of XML Schema elements as input and the
 : local name of the root element and
 : generates a document that represents one sample XML instance of the given
 : input schemas. The local name is searched in schema global element definitions
 : in the order of schemas parameter.
 : <br />
 : Please consult the
 : <a href="http://xmlbeans.apache.org/">official documentation for further
 :   information</a>.
 : <br />
 : Example:<pre class="brush: xquery;">
 :
 :  import module namespace st = "http://www.zorba-xquery.com/modules/schema-tools";
 :  declare namespace sto =
 :      "http://www.zorba-xquery.com/modules/schema-tools/schema-tools-options";
 :  let $xsds  :=
 :     ( <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
 :           attributeFormDefault="unqualified"
 :           elementFormDefault="qualified">
 :         <xs:element name="a" type="aType"/>
 :         <xs:complexType name="aType">
 :           <xs:sequence>
 :             <xs:element type="xs:string" name="b"/>
 :             <xs:element type="xs:string" name="c"/>
 :           </xs:sequence>
 :         </xs:complexType>
 :       </xs:schema> )
 :  let $options :=
 :    <sto:xsd2inst-options xmlns:sto=
 :      "http://www.zorba-xquery.com/modules/schema-tools/schema-tools-options">
 :      <sto:network-downloads>false</sto:network-downloads>
 :      <sto:no-pvr>false</sto:no-pvr>
 :      <sto:no-upa>false</sto:no-upa>
 :    </sto:xsd2inst-options>
 :  return
 :      st:xsd2inst($xsds, "a", $options)
 : </pre><br />
 : @param $schemas elements representing XMLSchema definitions
 : @param $rootElementName The local name of the instance root element.
 :        If multiple target namespaces are used, first one found - using the
 :        sequence order - will be used.
 : @param $options Options:<br /><ul>
 :       <li>network-downloads: boolean (default false)<br />
 :             - true allows XMLBeans to use network when resolving schema
 :               imports and includes</li>
 :       <li>no-pvr: boolean (default false)<br />
 :             - true to disable particle valid (restriction) rule,
 :               false otherwise</li>
 :       <li>no-upa: boolean (default false)<br />
 :             - true to disable unique particle attribution rule,
 :               false otherwise</li></ul>
 :
 : @return The generated output document, representing a sample XML instance.
 : @error schema-tools:VM001 If Zorba was unable to start the JVM.
 : @error schema-tools:JAVA-EXCEPTION If Apache XMLBeans throws an exception.
 : @example test/Queries/schema-tools/xsd2inst-opt1.xq
 : @example test/Queries/schema-tools/xsd2inst-simple.xq
 : @example test/Queries/schema-tools/xsd2inst-tns.xq
 : @example test/Queries/schema-tools/xsd2inst-err1-badOpt.xq
 :)
declare function
schema-tools:xsd2inst ($schemas as element()+, $rootElementName as xs:string,
    $options as element(st-options:xsd2inst-options)?)
  as document-node()
{
  let $validated-options :=
    if(empty($options))
    then
        $options
    else if(schema-options:is-validated($options))
    then
        $options
    else
        validate{$options}
  return
    schema-tools:xsd2inst-internal($schemas, $rootElementName, $validated-options)
};


declare %private function
schema-tools:xsd2inst-internal ($schemas as element()+,
    $rootElementName as xs:string,
    $options as element(st-options:xsd2inst-options, st-options:xsd2instOptionsType)?)
  as document-node() external;