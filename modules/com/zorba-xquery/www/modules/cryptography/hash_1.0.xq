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
 : This module provides functions that perform different hash operations.
 :
 : @author Gabriel Petrovay, Markus Pilman
 : @project cryptography
 :)
module namespace hash = "http://www.zorba-xquery.com/modules/cryptography/hash";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : Computes the MD5 hash of the string provided as parameter.
 :
 : @param $value The string to hash.
 : @return The MD5 hash of the provided string.
 :)
declare function hash:md5($value as xs:string) as xs:string
{
  hash:hash-impl($value, "md5")
};

(:~
 : Computes the SHA1 hash of the string provided as parameter.
 :
 : @param $value The string to hash.
 : @return The base64 encoded SHA1 hash of the provided string.
 :)
declare function hash:sha1($value as xs:string) as xs:string
{
  hash:hash-impl($value, "sha1")
};

(:~
 : This function computes a hash value of the string provided as parameter.
 : The function expects the hash algorithm to be used as parameter.
 :
 : @param $value The string to be hashed.
 : @param $alg The algorithm to use for this hashing operation. Currently only
 :        "md5" and "sha1" algorithms are available. If no valid algorithm
 :        name is given, md5 will be used.
 : @return The hash of the provided string. In case SHA1 is used, the resulting
 :         hash value is base64 encoded.
 :)
declare function hash:hash-impl($value as xs:string, $alg as xs:string) as xs:string external;
