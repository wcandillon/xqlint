import module namespace d = "www.data.com" at "multi_key_01.xqlib";

import module namespace ddl = 
"http://www.zorba-xquery.com/modules/store/static/collections/ddl";

import module namespace dml = 
"http://www.zorba-xquery.com/modules/store/static/collections/dml";

import module namespace iddl = 
"http://www.zorba-xquery.com/modules/store/static/indexes/ddl";

import module namespace idml = 
"http://www.zorba-xquery.com/modules/store/static/indexes/dml";

declare namespace an = "http://www.zorba-xquery.com/annotations";


declare variable $doc11 := 
<doc key1="foo1" key2="boo1"/>;

declare variable $doc21 := 
<doc key1="foo2" key2="boo1"/>;

declare variable $doc12 := 
<doc key1="foo1" key2="boo2"/>;

declare variable $doc22 := 
<doc key1="foo2" key2="boo2"/>;


ddl:create($d:documents);

dml:insert($d:documents, ($doc11, $doc21, $doc12, $doc22));

iddl:create($d:idx);

idml:probe-index-range-value(
    $d:idx,
    "foo1", (), true(),  false(), false(), false(),
    (),     (), false(), false(), false(), false())
,
"
"
,
idml:probe-index-range-value(
     $d:idx,
     (), "foo2", false(), true(),  false(), false(),
     (), (),     false(), false(), false(), false())
,
"
"