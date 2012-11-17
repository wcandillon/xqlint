xquery version "1.0";

(:
 : Copyright 2006-2012 The FLWOR Foundation.
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
 : For example, they compute MD5 and various SHA functions on either
 : strings or binary. The result is the base64 encoded value of the hash.
 :
 : @author Gabriel Petrovay, Markus Pilman, Matthias Brantner
 : @project cryptography
 :)
module namespace hash = "http://www.zorba-xquery.com/modules/cryptography/hash";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Computes the MD5 hash of the string provided as parameter.
 :
 : @param $value The string to hash
 :
 : @return The MD5 hash as xs:base64Binary
 :)
declare function hash:md5($value as xs:string)
  as xs:base64Binary
{
  hash:hash($value, "md5")
};

(:~
 : Computes the SHA1 hash of the string provided as parameter.
 :
 : @param $value The string to hash.
 :
 : @return The SHA1 hash as xs:base64Binary
 :)
declare function hash:sha1($value as xs:string)
  as xs:base64Binary
{
  hash:hash($value, "sha1")
};

(:~
 : This function computes the MD5 hash value of the binary form of the given
 : base64Binary item, i.e. the item is base64-decoded before hashing.
 :
 : @param $value The binary item to hash.
 :
 : @return The MD5 hash of the provided binary.
 :)
declare function hash:md5-binary($value as xs:base64Binary)
  as xs:base64Binary
{
  hash:hash-binary($value, "md5")
};

(:~
 : This function computes the SHA1 hash value of the binary form of the given
 : base64Binary item, i.e. the item is base64-decoded before hashing.
 :
 : @param $value The binary item to hash.
 :
 : @return The base64 encoded SHA1 hash of the provided binary.
 :)
declare function hash:sha1-binary($value as xs:base64Binary)
  as xs:base64Binary
{
  hash:hash-binary($value, "sha1")
};

(:~
 : This function computes a hash value of the string provided as parameter.
 : The function expects the hash algorithm to be used as parameter.
 :
 : @param $value The string to be hashed.
 :
 : @param $alg The algorithm to use for this hashing operation. Supported
 :        algorithms are "md5", "sha1", and "sha256".
 :
 : @return The hash as xs:base64binary of the provided string
 :
 : @error hash:unsupported-algorithm if the given hash algorithm is not
 :  supported
 :)
declare function hash:hash($value as xs:string, $alg as xs:string)
  as xs:base64Binary external;

(:~
 : This function computes a hash value of the binary form of the given
 : base64Binary item, i.e. the item is base64-decoded before hashing.
 :
 : @param $value The binary item to be hashed.
 :
 : @param $alg The algorithm to use for this hashing operation. Supported
 :        algorithms are "md5", "sha1", and "sha256".
 :
 : @return The hash as xs:base64Binary of the provided binary
 :
 : @error hash:unsupported-algorithm if the given hash algorithm is not
 :  supported
 :)
declare function hash:hash-binary($value as xs:base64Binary, $alg as xs:string)
  as xs:base64Binary external;
