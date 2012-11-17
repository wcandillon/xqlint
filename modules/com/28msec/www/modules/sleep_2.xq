xquery version "3.0";
(:
 : Copyright 2012 28msec Inc.
 :)

(:~
 : This module provides a function to put the currently executing request
 : to sleep.
 :
 : @author 28msec
 :
 :)
module namespace sleep = "http://www.28msec.com/modules/sleep";

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~ 
 : Puts the currently executing request to sleep.
 : This function is mainly useful in development e.g. to simulate the
 : effects of long-running tasks wrt. the concurrent execution of
 : requests.
 :
 : Here the function is used to simulate a request that runs for 1 second
 : <pre>
 : declare $acquired := lock:try-acquire("my-lock");
 : if ($acquired)
 :   sleep:millis(1000);
 : else
 :   fn:error(xs:QName("..."), "failed to acquire lock");
 : </pre>
 :
 : @param $millis the number of milliseconds to sleep
 : @return the function is sequential and returns the empty sequence
 :)
declare %an:sequential function sleep:millis($millis as xs:integer)
  as empty-sequence() external;
