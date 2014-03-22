declare namespace foo = "http://www.example.com";

declare variable $foo:hello := $varname;
declare variable $varname := 1;

let $foo := function($hello) { $hello }
return
    $foo(1)
