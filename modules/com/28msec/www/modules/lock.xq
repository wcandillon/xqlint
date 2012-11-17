xquery version "3.0";
(:
 : Copyright 2011 28msec Inc.
 :)

(:~
 : Sausalito provides a an application level locking mechanism that can be
 : used e.g. to ensure exclusive access to data.
 : As the store ensures atomicity of of single document updates, atomic
 : updates to multiple documents are implemented using this mechanism.
 : Locks can be acquired and re-acquired at any time during a request and
 : are released at the end of the request.
 :
 : @author 28msec
 :
 :)
module namespace lock = "http://www.28msec.com/modules/lock";

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Tries to acquire a lock.
 : This operation is non-blocking if the lock cannot be acquired immediately.
 :
 : To check and modify the stock of a product wihtout interference from
 : concurrent requests a lock could be used like this:
 : <pre>
 : if (lock:try-acquire("stock-update"))
 : then
 :   if (stock:check($product-id))
 :   then
 :     {
 :       order:finalize($order-id);
 :       stock:decrement($product-id);
 :     }
 :   else
 :     order:hold($order-id);
 : else
 :   ...
 : </pre>
 :
 : @param $lock-name The name of the lock.
 : @return true if the lock could be acquired, false otherwise.
 :)
 declare %an:sequential function lock:try-acquire($lock-name as xs:string) as xs:boolean external;

(:~
 : tries to acquire a lock
 : @param $lock-name The name of the lock.
 : @param $reason a reason for the acquisition of the lock that can be used for
          monitoring of debugging
 : @return true if the lock could be acquired, false otherwise.
 :)
 declare %an:sequential function lock:try-acquire($lock-name as xs:string,
                                              $reason as xs:string) as xs:boolean external;
