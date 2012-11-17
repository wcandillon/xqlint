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
 : This module provides a function to generate hash-based
 : message authentication codes (HMAC) involving a cryptographic
 : hash function (e.g. SHA1).
 :
 : @author William Candillon
 : @project cryptography
 :
 :)
module namespace hmac = "http://www.zorba-xquery.com/modules/cryptography/hmac";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : This function provides hash-based message authentication code using
 : the SHA1 algorithm.
 : 
 : @param $message the message to be authenticated
 : @param $secret-key the secret key used for calculating the authentication
 : @return hash-based base64 encoded message authentication code
 :)
declare function hmac:sha1(
  $message as xs:string,
  $secret-key as xs:string
) as xs:string external;
