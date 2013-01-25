declare function local:between-inclusive 
  ( $value as xdt:anyAtomicType? ,
    $minValue as xdt:anyAtomicType ,
    $maxValueeeeeeeeee as xdt:anyAtomicType )  as xs:boolean {
       
   $value >= $minValue and $value <= $maxValue
 } ;
