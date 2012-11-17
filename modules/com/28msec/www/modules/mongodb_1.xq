xquery version "3.0";
(:
 : Copyright 2012 28msec Inc.
 :)

(:~
 : <p>This module provides a driver to access a
 : <a href="http://www.mongodb.org/">MongoDB</a> database - similar to
 : drivers for other high-level languages like e.g.
 : <a href="http://api.mongodb.org/python/current/">PyMongo</a>.</p>
 :
 : <p>Here is a simple example of how we can raise the salary of each
 : developer by 10%.
 : Starting with an <em>employees</em> collection in MongoDB that contains
 : <pre>
 : { "name" : "Peter", "role" : "developer" , "salary" : 80 }
 : { "name" : "Paul",  "role" : "developer" , "salary" : 75 }
 : { "name" : "Mary",  "role" : "manager"   , "salary" : 90 } </pre>
 : we can get a connection
 : <pre>
 : variable $conn := mongo:connect("hostname", 27017, "db", "user", "password"); </pre>
 : run this update
 : <pre>
 : for $emp in mongo:find($conn, "employees")
 : where $emp("role") = "developer"
 : let $salary := $emp("salary")
 : return {
 :   replace json value of $emp("salary") with $salary * 1.1;
 :   mongo:save($conn, "employees", $emp)
 : }; </pre>
 : and get the names and the current salaries using
 : <pre>
 : mongo:find($conn, "employees", {||}, { "_id" : false, "role" : false }, {||}) </pre>
 : In this query we have removed the <em>_id</em> and <em>role</em> fields from
 : the results and get
 : <pre>
 : { "name" : "Peter", "salary" : 88   }
 : { "name" : "Paul",  "salary" : 82.5 }
 : { "name" : "Mary",  "salary" : 90   } </pre>
 : </p>
 :
 : @author 28msec
 :)
module namespace mongo = "http://www.28msec.com/modules/mongodb";

import schema namespace m-schema = "http://www.28msec.com/modules/mongodb";

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : An empty object.
 :)
declare variable $mongo:empty-object as object() := {| |};

(:~
 : Connect to a MongoDB database.
 :
 : @param $host the host to connect to
 : @param $port the port to connect to
 : @param $db the database to connect to
 : @param $user the user used to authorize access to the db
 : @param $pass the password used to authorize access to the db
 :
 : @return an identifier for a connection to the MongoDB database.
 :
 : @error mongo:MONGO002 connection to MongoDB failed
 : @error mongo:MONGO003 authentication to the MongoDB database failed
 :
 :)
declare %an:sequential function mongo:connect(
  $host as xs:string,
  $port as xs:integer?,
  $db as xs:string,
  $user as xs:string?,
  $pass as xs:string?)
  as xs:anyURI
{
  let $options :=
     {| (
       {
         "host" : $host,
         "db"   : $db
       },
       if ($port) then { "port" : $port } else (),
       if ($user) then { "user" : $user } else (),
       if ($pass) then { "pass" : $pass } else ()
     ) |}
  return mongo:connect($options)
};

(:~
 : Connect to a MongoDB database.
 :
 : The options object can contain the following values:
 :
 : <ul>
 :   <li>host (string; mandatory)</li>
 :   <li>port (integer; default: 27017)</li>
 :   <li>db (string; mandatory)</li>
 :   <li>user (string)</li>
 :   <li>pass (string)</li>
 : </ul>
 :
 : @param $options used to connect to MongoDB and authenticate.
 :
 : @return an identifier for a connection to the MongoDB database.
 :
 : @error mongo:MONGO001 if the options object is invalid
 : @error mongo:MONGO002 connection to MongoDB failed
 : @error mongo:MONGO003 authentication to the MongoDB database failed
 :)
declare %an:sequential function mongo:connect($options as object())
  as xs:anyURI external;

(:~
 : Disconnect from a MongoDB database.
 :
 : @param $db a database connection identifier
 :
 : @return the function has side-effects and returns the empty sequence.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 :)
declare %an:sequential function mongo:disconnect($db as xs:anyURI)
  as empty-sequence() external;

(:~
 : Checks if the given identifiers is valid and the corresponding
 : connection is open.
 :
 : @param $db a database connection identifier
 :
 : @return true if the given connection identifier is valid
 :   and the corresponding connection is open, false otherwise.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 :)
declare function mongo:is-connected($db as xs:anyURI)
  as xs:boolean external;

(:~
 : Get a list of all the collection names in this database.
 :
 : @param $db a database connection identifier
 :
 : @return a list of the names of all collection in the
 :   given database.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 :)
declare function mongo:collection-names($db as xs:anyURI)
  as xs:string* external;

(:~
 : Drop a collection.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 :
 : @return the function has side-effects and returns the empty sequence.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 :)
declare %an:sequential function mongo:drop-collection(
  $db as xs:anyURI,
  $coll as xs:string)
  as empty-sequence() external;

(:~
 : Save a sequence of documents in the given collection.
 :
 : If a document to be save already has an "_id" field, then an
 : upsert operation is performed an any existing document with that
 : id will be overwritten. Otherwise, an insert operation is performed
 : and the "_id" generated for each document will be returned.
 :
 : Each safe operation will be checked and an error is raised if
 : one of them fails.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $doc the document to be saved or upserted
 :
 : @return the documents that have been inserted with "_id" fields.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given document could not be converted
 :   to BSON
 :)
declare %an:sequential function mongo:save(
  $db as xs:anyURI,
  $coll as xs:string,
  $doc as object())
  as empty-sequence()
{
  let $options := { "safe" : true, "manipulate" : false }
  return mongo:save($db, $coll, $doc, $options)
};

(:~
 : Save a sequence of documents in the given collection.
 :
 : If a document to be saved already has an "_id" field, then an
 : upsert operation is performed and any existing document with that
 : id will be overwritten. Otherwise, an insert operation is performed
 :
 : If the manipulate option is set to true, an "_id" field will be
 : added to the document. The new id will be returned. Otherwise,
 : the "_id" field will be added by the server.
 :
 : If the safe options is set to true, each operation will wait for a
 : response from the database and an error is raised if the operation
 : fails. Otherwise, the operation will not wait for a response.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $doc the document to be saved or upserted
 : @param $options the options for this operation
 :
 : @return a generated OID if the manipulate option was set to true,
 :   the empty sequence otherwise.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given document could not be converted
 :   to BSON
 :)
declare %an:sequential function mongo:save(
  $db as xs:anyURI,
  $coll as xs:string,
  $doc as object(),
  $options as object())
  as m-schema:oid? external;

(:~
 : Performs an update command on the given collection.
 :
 : The operation will be checked and an error is raised if
 : one of them fails. Also, this function only modifies one
 : document matching the query and does not do any upserts.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $query the query to select the objects that are updated
 : @param $update the update specification to be performed
 :
 : @return the function has side-effects and returns the empty sequence.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given objects could not be converted
 :   to BSON
 :)
declare %an:sequential function mongo:update(
  $db as xs:anyURI,
  $coll as xs:string,
  $query as object(),
  $update as object())
  as empty-sequence()
{
  let $options := { "safe" : true, "multi" : false, "upsert" : false }
  return mongo:update($db, $coll, $query, $update, $options)
};

(:~
 : Performs an update operation on the given collection.
 :
 : <ul>
 :   <li>safe: If to true, the operation will wait for a response from
 :    the database and an error is raised if the operation fails.
 :    Otherwise, the operation will not wait for a response.</li>
 :  <li>multi: indicates if all documents matching criteria should be updated
 :  rather than just one.</li>
 :  <li>upsert: if this should be an "upsert" operation; that is,
 :  if the record(s) do not exist, insert one. Upsert only inserts a single document.</li>
 : </ul>
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $query the query to select the objects that are updated
 : @param $update the update specification to be performed
 : @param $options the options for this operation
 :
 : @return the function has side-effects and returns the empty sequence.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given objects could not be converted
 :   to BSON
 :)
declare %an:sequential function mongo:update(
  $db as xs:anyURI,
  $coll as xs:string,
  $query as object(),
  $update as object(),
  $options as object())
  as empty-sequence() external;

(:~
 : Performs a remove operation on the given collection.
 :
 : The operation will be checked and an error is raised if
 : one of them fails.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $remove the remove command to be performed
 :
 : @return the function has side-effects and returns the empty sequence.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given document could not be converted
 :   to BSON
 :)
declare %an:sequential function mongo:remove(
  $db as xs:anyURI,
  $coll as xs:string,
  $remove as object())
  as empty-sequence()
{
  mongo:remove($db, $coll, $remove, $mongo:empty-object)
};

(:~
 : Performs a remove operation on the given collection.
 :
 : <ul>
 :   <li>safe: If to true, the operation will wait for a response from
 :    the database and an error is raised if the operation fails.
 :    Otherwise, the operation will not wait for a response.</li>
 :  <li>just-one: true if the operation should stop after a single match
 :    has been found and deleted</li>
 : </ul>
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $remove the remove command to be performed
 : @param $options the options for this operation
 :
 : @return the function has side-effects and returns the empty sequence.
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given document could not be converted
 :   to BSON
 :)
declare %an:sequential function mongo:remove(
  $db as xs:anyURI,
  $coll as xs:string,
  $remove as object(),
  $options as object())
  as empty-sequence() external;

(:~
 : Counts the number of documents in the given collection.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 :
 : @return the said count
 :
 : @error mongo:MONGO005 if any mongodb error happens
 :)
declare function mongo:count(
  $db as xs:anyURI,
  $coll as xs:string)
  as xs:integer external;

(:~
 : Returns all objects of the given collection.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 :
 : @return all objects of the given collection
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 :)
declare function mongo:find(
  $db as xs:anyURI,
  $coll as xs:string)
  as object()*
{
  mongo:find($db, $coll, $mongo:empty-object)
};

(:~
 : Performs a query operation on the given collection and
 : returns all matches.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $query the query operation to perform
 :
 : @return all matches returned by the given query operation
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given query could not be converted
 :   to BSON
 :)
declare function mongo:find(
  $db as xs:anyURI,
  $coll as xs:string,
  $query as object())
  as object()*
{
  mongo:find($db, $coll, $query, $mongo:empty-object)
};

(:~
 : Performs a query operation on the given collection and
 : returns all matches.
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $query the query operation to perform
 : @param $options the options for this operation (see find#5 for available options)
 :
 : @return all matches returned by the given query operation
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given query could not be converted
 :   to BSON
 :)
declare function mongo:find(
  $db as xs:anyURI,
  $coll as xs:string,
  $query as object(),
  $options as object())
  as object()*
{
  mongo:find($db, $coll, $query, $mongo:empty-object, $options)
};

(:~
 : Performs a query operation on the given collection and
 : returns all matches.
 :
 : Available options:
 : <ul>
 :   <li>to-return: the maximum number of objects to return (0 = unlimited)</li>
 :   <li>to-skip: start with the n-th object</li>
 :   <li>batch-size: the number of objects to return in one batch</li>
 :   <li>slave-ok: allow this query to be run against a replica secondary</li>
 :   <li>await-data: the server will block for some extra time before returning,
 :   waiting for more data to return</li>
 :   <li>partial-results: return partial results if some shards are down instead
 :   of returning an error</li>
 : </ul>
 :
 : @param $db a database connection identifier
 : @param $coll the name of the collection
 : @param $query the query operation to perform
 : @param $project the projection to perform on the result
 : @param $options the options for this operation
 :
 : @return all matches returned by the given query operation
 :
 : @error mongo:MONGO004 invalid database identifier
 : @error mongo:MONGO005 if any mongodb error happens
 : @error mongo:MONGO006 if the given query or projection could not be
 :   converted to BSON
 :)
declare function mongo:find(
  $db as xs:anyURI,
  $coll as xs:string,
  $query as object(),
  $projection as object(),
  $options as object())
  as object()* external;
