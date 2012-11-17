xquery version "3.0";
(:
 : Copyright 2011 28msec Inc.
 :)

(:~
 : This modules provides functions that allow to have more
 : control over the data store. For example, the flush() function
 : may be used to synchronously flush all pending modifications
 : and make them available to other requests.
 :
 : @author 28msec
 :
 :)
module namespace store = "http://www.28msec.com/modules/store";

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : The flush function flushes all pending modifications to
 : persistent storage such that they are immediately available
 : to other requests.
 :
 : This function is particularly useful if a huge number of
 : modifications (i.e. updates to nodes or collections) are
 : made during one request or during the initial bulkload of
 : an application. This is because Sausalito's buffer
 : is only able to handle a fixed amount (8192) of such modifications.
 : Once this limit is reached, a runtime error is raised reporting
 : "Maximum number of fixed and dirty pages has been reached.".
 : In order to remedy this situation, this function will
 : write all pending changes to persistent storage and, hence,
 : free more pages in the buffer.
 : 
 : A typical use of this function to bulkload a large number of
 : nodes could look as follows:
 :
 : <pre>
 : for $i at $y in 1 to 8193
 : return
 :   if ($y mod 100 eq 0)
 :   then
 :     {
 :       db:insert-nodes(xs:QName("foo:mycollection"), <mynode>{$i}</mynode>);
 :       store:flush();
 :     }
 :   else
 :     {
 :       db:insert-nodes(xs:QName("foo:mycollection"), <mynode>{$i}</mynode>);
 :     }  
 : </pre>
 : 
 : The following useful examples depicts how the entire contents of a
 : collection could be deleted.
 :
 : <pre>
 : while (db:collection(xs:QName("foo:mycollection")))
 : {
 :   db:delete-nodes(
 :     subsequence(xqddf:collection(xs:QName("foo:mycollection")), 1, 1000)
 :   );
 :   store:flush();
 : }
 : </pre>
 :
 : @return The function is declared as sequential. Specifically, it
 :   has side-effects (on the persistent storage) and returns the
 :   empty sequence.
 :)
declare %an:sequential function store:flush() as empty-sequence() external;


(:~
 : Same functionality as the flush function, but it only flushes conditionally.
 :
 : A typical use of this function to bulkload a large number of
 : nodes could look as follows:
 :
 : <pre>
 : for $i at $y in 1 to 8193
 : return 
 :   {
 :     store:flush-if($y mod 100 eq 0);
 :     db:insert-nodes(xs:QName("foo:mycollection"), <mynode>{$i}</mynode>);
 :   }
 : </pre>
 :
 : @param $cond flush only if $cond is true.
 :
 : @return The empty sequence.
 :)
declare %an:sequential function store:flush-if($cond as xs:boolean) as empty-sequence() {
  if ($cond)
  then store:flush()
  else ()
};


(:~
 : The clear function completely clears Sausalito's buffer.
 : It is an error if the currently executing request references an item
 : in the buffer as the buffer cannot be completely cleared in that case.
 :
 : This function is mainly useful in development e.g. to verify that the
 : data in the presistent storage is as expected.
 :
 : @return The function is declared as sequential. Specifically, it
 :   has side-effects (on the persistent storage). It returns 0
 :   if the entire buffer was cleared or the number of references
 :   that could not be cleared (e.g. because they are modified).
 :)
declare %an:sequential function store:clear() as xs:integer external;


(:~
 : Same functionality as the clear function, but it only clears conditionally.
 :
 : @param $cond flush only if $cond is true.
 :
 : @return The function is declared as sequential. Specifically, it
 :   has side-effects (on the persistent storage). It returns -1
 :   if the given condition was falsed, 0 if the entire buffer was
 :   cleared, or the number of references that could not be cleared
 :   (e.g. because they are modified).
 :)
declare %an:sequential function store:clear-if($cond as xs:boolean)
as xs:integer {
  if ($cond)
  then store:clear()
  else -1
};
