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
 : This module provides common functionality for modules that use java
 : implementations. 
 : <br/>
 : <br/>
 : Modules using java implementations must import this module 
 : to specify the dependency.
 : <br />
 : <br />
 : <b>Note:</b> Since this module has a Java library dependency a JVM is required
 : to be installed on the system. For Windows: jvm.dll is required on the system
 : path (usually located in "C:\Program Files\Java\jre\bin\client").
 :
 : @author Cezar Andrei
 : @library <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">JDK - Java Development Kit</a>
 : @project utils/util jvm
 :)
module namespace util-jvm = "http://www.zorba-xquery.com/modules/util-jvm";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

