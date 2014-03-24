declare namespace foo = "http://www.example.com";

declare variable $foo:hello as xs:integer := $varname;
declare variable $varname as xs:integer := 1;

let $foo := function($hello as xs:integer) { $hello }
return
    $foo(1)
