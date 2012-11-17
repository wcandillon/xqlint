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
 : This module provides functions to create a native process and return the result
 : (i.e. exit code, result on standard out and error).
 :
 : Example:
 :<pre class="brush: xquery;">
 :  import module namespace proc = "http://www.zorba-xquery.com/modules/process";
 :  proc:exec("ls")
 :</pre>
 :
 : Potential result:
 : <pre>
 : &lt;result xmlns="http://www.zorba-xquery.com/modules/process">
 :   &lt;stdout>myfile.txt&lt;/stout>
 :   &lt;stderr/>
 :   &lt;exit-code>0&lt;/exit-code>
 : &lt;/result>
 : </pre>
 :
 : @author Cezar Andrei
 : @project external
 :
 :)
module namespace process = "http://www.zorba-xquery.com/modules/process";

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : Executes the specified string command in a separate process.
 : This function does not allow arguments to be passed to
 : the command.
 :
 : @param $cmd command to be executed (without arguments)
 :
 : @return the result of the execution as an element as
 :         shown in the documentation of this module. The exit-code
 :         element returns the exit code of the child process.
 :
 : @error process:PROC01 if an error occurred while communicating 
 :   with the executed process.
 :)
declare %an:sequential function process:exec(
  $cmd as xs:string
) as element(process:result) external;

(:~
 : Executes the specified string command in a separate process.
 : Each of the strings in the sequence passed in as the second
 : argument is passed as an argument to the executed command.
 :
 : @param $cmd command to be executed (without arguments)
 : @param $args the arguments passed to the executed command (e.g. "-la")
 :
 : @return the result of the execution as an element as
 :         shown in the documentation of this module. The exit-code
 :         element returns the exit code of the child process.
 :
 : @error process:PROC01 if an error occurred while communicating 
 :   with the executed process.
 :)
declare %an:sequential function process:exec(
  $cmd as xs:string,
  $args as xs:string*
) as element(process:result) external;
