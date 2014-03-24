module namespace foo = "http://www.foo.com";


declare function foo:f( $i as xs:integer ) 
as xs:integer
{
  $i + 2 
};


declare function foo:f( $i as xs:integer ) as item()* external;