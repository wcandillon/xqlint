declare variable $hello := $varname;
declare variable $varname := 1;

let $foo := function($hello){ $hello }
return
    $varname