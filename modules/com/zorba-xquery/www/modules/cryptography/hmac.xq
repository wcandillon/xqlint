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
 : This module provides functions that perform HMAC
 : (hash-based message authentication code) operations.
 : For example, they calculate message codes involving hash functions such
 : as MD5 and various SHA variants. The result is the base64 encoded value
 : of the hash. A hash may be used to verify the data integrity and
 : the authenticity of a message.
 :
 : @author William Candillon, Matthias Brantner
 : @project cryptography
 :
 :)
module namespace hmac = "http://www.zorba-xquery.com/modules/cryptography/hmac";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Calculate the HMAC for the given message and secret-key involving
 : the MD5 hash function.
 :
 : @param $message the message to be authenticated
 : @param $secret-key the secret key used for calculating the authentication
 :
 : @return the base64 encoded message authentication code
 :)
declare function hmac:md5(
  $message as xs:string,
  $secret-key as xs:string
) as xs:base64Binary
{
  hmac:compute($message, $secret-key, "md5")
};

(:~
 : Calculate the HMAC for the given message and secret-key involving
 : the SHA1 hash function.
 :
 : @param $message the message to be authenticated
 : @param $secret-key the secret key used for calculating the authentication
 :
 : @return the base64 encoded message authentication code
 :)
declare function hmac:sha1(
  $message as xs:string,
  $secret-key as xs:string
) as xs:base64Binary
{
  hmac:compute($message, $secret-key, "sha1")
};

(:~
 : Calculate the HMAC for the given message and secret-key involving
 : the MD5 hash function. Before calculating the code, the given
 : base64-encoded message is base64-decoded.
 :
 : @param $message the message to be authenticated
 : @param $secret-key the secret key used for calculating the authentication
 :
 : @return the base64 encoded message authentication code
 :)
declare function hmac:md5-binary(
  $message as xs:base64Binary,
  $secret-key as xs:string
) as xs:base64Binary
{
  hmac:compute-binary($message, $secret-key, "md5")
};

(:~
 : Calculate the HMAC for the given message and secret-key involving
 : the SHA1 hash function. Before calculating the code, the given
 : base64-encoded message is base64-decoded.
 : 
 : @param $message the message to be authenticated
 : @param $secret-key the secret key used for calculating the authentication
 :
 : @return the base64 encoded message authentication code
 :)
declare function hmac:sha1-binary(
  $message as xs:base64Binary,
  $secret-key as xs:string
) as xs:base64Binary
{
  hmac:compute-binary($message, $secret-key, "sha1")
};

(:~
 : Calculate the HMAC for the given message and secret-key involving
 : an custom hash function.
 :
 : @param $message the message to be authenticated
 : @param $secret-key the secret key used for calculating the authentication
 : @param $alg The algorithm to use for the hashing operation. Supported
 :        algorithms are "md5", "sha1", and "sha256".
 :
 : @return the base64 encoded message authentication code
 :
 : @error hash:unsupported-algorithm if the given hash algorithm is not
 :  supported
 :)
declare function hmac:compute(
  $message as xs:string,
  $secret-key as xs:string,
  $alg as xs:string
) as xs:base64Binary external;

(:~
 : Calculate the HMAC for the given message and secret-key involving
 : an custom hash function. Before calculating the code, the given
 : base64-encoded message is base64-decoded.
 :
 : @param $message the message to be authenticated
 : @param $secret-key the secret key used for calculating the authentication
 : @param $alg The algorithm to use for the hashing operation. Supported
 :        algorithms are "md5", "sha1", and "sha256".
 :
 : @return the base64 encoded message authentication code
 :
 : @error hash:unsupported-algorithm if the given hash algorithm is not
 :  supported
 :)
declare function hmac:compute-binary(
  $message as xs:base64Binary,
  $secret-key as xs:string,
  $hash-algo as xs:string
) as xs:base64Binary external;
