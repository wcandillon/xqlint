xquery version "3.0";
(:
 : Copyright 2010-2011 28msec Inc.
 :)

(:~
 : The sequence module allows you to generate consecutive
 : application-unique xs:integer ids. This is required e.g. in accounting
 : applications as some legislations require consecutive invoice numbers.
 :
 : @author 28msec
 :
 :)
module namespace seq = "http://www.28msec.com/modules/sequence";

import module namespace cdml = "http://www.zorba-xquery.com/modules/store/static/collections/dml";
import module namespace idml = "http://www.zorba-xquery.com/modules/store/static/indexes/dml";
import module namespace lock  = "http://www.28msec.com/modules/lock";
import module namespace sleep = "http://www.28msec.com/modules/sleep";

declare namespace an = "http://www.zorba-xquery.com/annotations";
declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : The QName for the counters collection.
 :)
declare variable $seq:counters := xs:QName("seq:counters");
declare collection seq:counters as node()*;

(:~
 : The QName for the counters-by-uri collection.
 :)
declare variable $seq:counters-by-uri := xs:QName("seq:counters-by-uri");
declare %an:automatic %an:unique %an:value-equality index seq:counters-by-uri
  on nodes cdml:collection(xs:QName("seq:counters"))
  by xs:string(@uri) as xs:string;

(:~
 : Tries to acquire a lock that ensures consistent modifications of
 : the counter for the uri specified as parameter.
 : Throws seq:failed if the lock cannnot be acquired.
 :
 : @param $uri The name of the sequence counter as uri.
 : @return empty sequence
 :)
declare %private %an:sequential function seq:acquire-lock($uri as xs:string)  {
  variable $lock-name := fn:concat("28msec-sequence:", $uri);
  variable $success := lock:try-acquire($lock-name);
  variable $i := 0;
  while (not($success) and $i lt 28) {
    sleep:millis(28);
    $success := lock:try-acquire($lock-name);
    $i := $i + 1;
  }
  if ($success) then {
    ()
  } else
    fn:error(xs:QName("seq:failed"), "failed to acquire lock")
};

(:~
 : Returns a unique (sequentially incremented) id for the
 : uri specified as parameter.
 :
 : Here the function is used to create consecutive invoice numbers:
 : <pre>
 : if (order:fulfilled($order-id))
 : then
 :   {
 :     variable $invoice-id := seq:id("invoice");
 :     invoice:create($invoice-id, $order-id);
 :   }
 : else
 :   ...
 : </pre>
 :
 : @param $uri The name of the sequence counter as uri.
 : @return A sequentially incremented id.
 :)
declare %an:sequential function seq:id($uri as xs:string) as xs:integer  {
  seq:acquire-lock($uri);
  variable $counter := idml:probe-index-point-value($seq:counters-by-uri, $uri);
  variable $new as xs:integer := 0;
  if (fn:empty($counter)) then {
    $new := 1;
    cdml:insert-nodes($seq:counters, <counter uri="{$uri}">{$new}</counter>);
  } else {
    $new := xs:integer($counter) + 1;
    replace value of node $counter with $new;
  }
  $new
};

(:~
 : Returns the id for the uri specified as parameter without incrementing it.
 :
 : @param $uri The name of the sequence counter as uri.
 :
 : @return The current value
 :
 : @error seq:not-found if no counter with the given $uri was found
 :)
declare %an:sequential function seq:value($uri as xs:string) as xs:integer {
  seq:acquire-lock($uri);
  variable $counter := idml:probe-index-point-value($seq:counters-by-uri, $uri);
  if (fn:empty($counter))
  then
    fn:error(xs:QName("seq:not-found"), $uri || " counter not found")
  else
    $counter/text() cast as xs:integer
};

(:~
 : Resets the unique (sequentially incremented) id generation 
 : for the uri specified as parameter.
 :
 : @param $uri The name of the sequence counter as uri.
 : @return empty-sequence()
 :)
declare %an:sequential function seq:reset($uri as xs:string) as empty-sequence() {
  seq:acquire-lock($uri);
  variable $counter := idml:probe-index-point-value($seq:counters-by-uri, $uri);
  if (fn:empty($counter)) then ();
  else cdml:delete-nodes($counter);
};
