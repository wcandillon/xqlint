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
 : The system module allows developers to access system properties.
 : Part of these system properties are environment variables,
 : local variable to the process running Zorba, and properties defined by Zorba.
 : <br />
 : To avoid conflicts between environment variables and properties defined by Zorba,
 : all environment variables are prefixed with <i>env.</i>.
 : <br />
 : For instance, the following query: <br />
 : <pre class="brush: xquery;">
 : import module namespace system = "http://www.zorba-xquery.com/modules/system";
 : 
 : for $prop in system:properties()
 : return concat($prop, ": ", system:property($prop), "
 : ")
 : </pre>
 : <br />
 : Will output:
 : <pre>
 : env.TERM_PROGRAM: Apple_Terminal
 : ...
 : </pre>
 : In this example, it is important to notice that the environnement variable PATH
 : with the key env.PATH.
 :
 : @author Markus Pilman
 : @project external
 :)
module namespace system = 'http://www.zorba-xquery.com/modules/system';

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : The name of the operating system (os.name).
 :)
declare variable $system:os-name as xs:string := "os.name";

(:~
 : The name of the computer the process is running on (os.node.name).
 :)
declare variable $system:os-node-name as xs:string := "os.node.name";

(:~
 : The major version number of the Windows installation or
 : an empty string if the process does not run on a Windows installation
 : (os.version.major).
 : <b>Works on Windows only.</b>
 :)
declare variable $system:os-version-major as xs:string := "os.version.major";

(:~
 : The minor version number of the Windows installation or
 : an empty string if the process does not run on a Windows installation
 : (os.version.minor).
 : <b>Works on Windows only.</b>
 :)
declare variable $system:os-version-minor as xs:string := "os.version.minor";

(:~
 : The build number of the Windows installation or
 : an empty string if the process does not run on a Windows installation
 : (os.version.build).
 : <b>Works on Windows only.</b>
 :)
declare variable $system:os-version-build as xs:string := "os.version.build";

(:~
 : The release of this UNIX installation or
 : an empty string if the process does not run on a UNIX/Linux installation
 : (os.version.release).
 : <b>Works on UNIX based operating systems only.</b>
 :)
declare variable $system:os-version-release as xs:string := "os.version.release";
(:~
 : The version of this UNIX installation or
 : an empty string if the process does not run on a UNIX/Linux installation
 : (os.version.version).
 : <b>Works on UNIX based operating systems only.</b>
 :)
declare variable $system:os-version-version as xs:string := "os.version.version";

(:~
 : The version of the Operating System.
 :)
declare variable $system:os-version as xs:string := "os.version";

(:~
 : The name of the processor architecture (os.arch).
 : For example x86 or x86_64.
 :)
declare variable $system:os-arch as xs:string := "os.arch";

(:~
 : True if system architecture is 64bits (os.is64).
 :)
declare variable $system:os-is64 as xs:string := "os.is64";

(:~
 : Number of logical processors in the system (hardware.logical.cpu).
 : This information is not available under Mac OS X.
 :)
declare variable $system:hardware-logical-cpu as xs:string := "hardware.logical.cpu";

(:~
 : Number of physical processors in the system (hardware.logical.cpu).
 :)
declare variable $system:hardware-physical-cpu as xs:string := "hardware.physical.cpu";

(:~
 : number of logical per physical processors in the system (hardware.logical.per.physical.cpu).
 : This information is not available under Mac OS X.
 :)
declare variable $system:hardware-logical-per-physical-cpu as xs:string := "hardware.logical.per.physical.cpu";

(:~
 : Physical memory available (hardware.physical.memory).
 :)
declare variable $system:hardware-physical-memory as xs:string := "hardware.physical.memory";
(:~
 : Virtual memory available (hardware.virtual.memory).
 :)
declare variable $system:hardware-virtual-memory as xs:string := "hardware.virtual.memory";
(:~
 : Gets the hardware manufacturer (hardware.manufacturer).
 :)
declare variable $system:hardware-manufacturer as xs:string := "hardware.manufacturer";

(:~
 : The Linux distribution, Zorba is running on (linux.distributor).
 : <b>Works on UNIX based operating systems only.</b>
 :)
declare variable $system:linux-distributor as xs:string := "linux.distributor";

(:~
 : The version of the Linux distribution, Zorba is running on (linux.distributor.version).
 : <b>Works on UNIX based operating systems only.</b>
 :)
declare variable $system:linux-distributor-version as xs:string := "linux.distributor.version";

(:~
 : The username, with which this process was started (user.name).
 : On Unix, this variable is only available if the USER environment
 : variable is set (e.g. it might not be available in a cronjob).
 :)
declare variable $system:user-name as xs:string := "user.name";

(:~
 : The Zorba module path, that is the paths in which Zorba looks
 : for modules (zorba.module.path).
 :)
declare variable $system:zorba-module-path as xs:string := "zorba.module.path";

(:~
 : Zorba version in the format Major.Minor.Patch (zorba.version).
 :)
declare variable $system:zorba-version as xs:string := "zorba.version";

(:~
 : Zorba major version (zorba.version.major).
 :)
declare variable $system:zorba-version-major as xs:string := "zorba.version.major";

(:~
 : Zorba minor version (zorba.version.minor).
 :)
declare variable $system:zorba-version-minor as xs:string := "zorba.version.minor";

(:~
 : Zorba patch version (zorba.version.patch).
 :)
declare variable $system:zorba-version-patch as xs:string := "zorba.version.patch";

(:~
 : Gets the system property indicated by the specified key.
 :
 : @param $key The name of the system property.
 : @return The string value of the system property, or an empty sequence if there is no property with that key.
 :)
declare %an:nondeterministic function system:property($key as xs:string) as xs:string? external;

(:~
 : This function retrieves the names of the current system properties.
 : This list includes environment variables, local variable to the process running Zorba, and properties defined by Zorba.
 : <br />
 : To avoid conflicts between environment variables and properties defined by Zorba,
 : all environment variables are prefixed with <i>env.</i>.
 :
 : @return List of all system properties.
 :)
declare %an:nondeterministic function system:properties() as xs:string* external;

