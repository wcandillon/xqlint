
declare function local:fun($d as xs:decimal) as xs:decimal {
let $x :=if (true()) then $d else if (true()) then $d else $d return $x}; 

declare function local:fun2(){
let $set1 := (3,2,1) let $set2 := (1,2,3) for $x in $set2 for $y in $set1 return if ($x = $y) then true() else false()
};

local:fun(10)
