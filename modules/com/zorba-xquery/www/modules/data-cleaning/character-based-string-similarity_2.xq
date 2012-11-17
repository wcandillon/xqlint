xquery version "1.0";

(:
 : Copyright 2006-2009 The FLWOR Foundation.
 :
 : Licensed under the Apache License, Version 2.0 (the "License");
 : you may not use this file except in compliance with the License.
 : You may obtain a copy of the License at
 :
 : http://www.apache.org/licenses/LICENSE-2.0
 :
 : Unless required by applicable law or agreed to in writing, software
 : distributed under the License is distributed on an "AS IS" BASIS,
 : WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 : See the License for the specific language governing permissions and
 : limitations under the License.
 :)

(:~
 : This library module provides character-based string similarity functions 
 : that view strings as sequences of characters, generally computing a similarity score
 : that corresponds to the cost of transforming one string into another.
 :
 : These functions are particularly useful for matching near duplicate strings  
 : in the presence of typographical errors. 
 :
 : The logic contained in this module is not specific to any particular XQuery implementation.
 :
 : @author Bruno Martins and Diogo Simões
 : @project data processing/data cleaning
 :)

module namespace simc = "http://www.zorba-xquery.com/modules/data-cleaning/character-based-string-similarity";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Returns the edit distance between two strings.
 :
 : This distance, also refered to as the Levenshtein distance, is defined as the minimum number 
 : of edits needed to transform one string into the other, with the allowable edit operations 
 : being insertion, deletion, or substitution of a single character.
 :
 : <br/>
 : Example usage : <pre> edit-distance("FLWOR", "FLOWER") </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 2 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @return The edit distance between the two strings.
 : @example test/Queries/data-cleaning/character-based-string-similarity/edit-distance.xq
 :)
declare function simc:edit-distance ( $s1 as xs:string, $s2 as xs:string ) as xs:integer {
 if(string-length($s1) = 0) then string-length($s2) else
 if(string-length($s2) = 0) then string-length($s1) else
 min((
  simc:edit-distance(substring($s1, 2), $s2) + 1 ,
  simc:edit-distance($s1, substring($s2, 2)) + 1 ,
  simc:edit-distance(substring($s1, 2), substring($s2, 2)) + ( if(substring($s1, 1, 1) = substring($s2, 1, 1)) then 0 else 1 )
 ))
};

(:~
 : Returns the Jaro similarity coefficient between two strings.
 :
 : This similarity coefficient is based on the number of transposed characters and on a 
 : weighted sum of the percentage of matched characters held within the strings. The higher 
 : the Jaro-Winkler value is, the more similar the strings are. The coefficient is 
 : normalized such that 0 equates to no similarity and 1 is an exact match.
 :
 : <br/>
 : Example usage : <pre> jaro("FLWOR Found.", "FLWOR Foundation") </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.5853174603174603 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @return The Jaro similarity coefficient between the two strings.
 : @example test/Queries/data-cleaning/character-based-string-similarity/jaro.xq
 :)
declare function simc:jaro ( $s1 as xs:string, $s2 as xs:string ) as xs:double {
 let $s    := for $i in ($s1,$s2) order by string-length($i) return $i
 let $l1   := string-length($s[1])
 let $l2   := string-length($s[2])
 let $mt   := xs:integer((max(($l1,$l2)) div 2.0) - 1)
 let $mc   := for $i in 1 to min( ($l1 , $l2) ) 
              let $auxmatch := substring($s[2], max((1,$i - $mt)), $mt * 2 )
              return for $j in 1 to string-length($auxmatch)  
                     where substring($auxmatch, $j, 1) = substring($s[1], $i, 1)
                     return <match char="{substring($s[1], $i, 1)}" pos1="{$i}" pos2="{$j + max((1,$i - $mt)) - 1}" />
 let $m    := if (count($mc) = 0) then (1) else (count($mc))
 let $t    := count( for $i in $mc, $j in $mc where $i/@pos1>$j/@pos1 and $i/@pos2<$j/@pos2 return $i )
 let $dist := xs:double((($m div $l1) + ($m div $l2) + (($m - $t) div $m)) div 3)
 return $dist
};

(:~
 : Returns the Jaro-Winkler similarity coefficient between two strings.
 :
 : This similarity coefficient corresponds to an extension of the Jaro similarity coefficient that weights or
 : penalizes strings based on their similarity at the beginning of the string, up to a given prefix size.
 :
 : <br/>
 : Example usage : <pre> jaro-winkler("DWAYNE", "DUANE", 4, 0.1 ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.8577777777777778 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $prefix The number of characters to consider when testing for equal prefixes in the strings.
 : @param $fact The weighting factor to consider when the input strings have equal prefixes.
 : @return The Jaro-Winkler similarity coefficient between the two strings.
 : @example test/Queries/data-cleaning/character-based-string-similarity/jaro-winkler.xq
 :)
declare function simc:jaro-winkler ( $s1 as xs:string, $s2 as xs:string, $prefix as xs:integer, $fact as xs:double ) as xs:double {
 let $jaro := simc:jaro( $s1 , $s2 )
 let $cc   := for $i in 1 to min(($prefix, string-length($s1), string-length($s2))) 
              where substring($s1, 0, $i) = substring($s2, 0, $i) return $i
 return ($jaro + ( $fact * max($cc) * ( 1 - $jaro ) ) )
};

(:~
 : Returns the Needleman-Wunsch distance between two strings.
 :
 : The Needleman-Wunsch distance is similar to the basic edit distance metric, adding a 
 : variable cost adjustment to the cost of a gap (i.e., an insertion or deletion) in the 
 : distance metric.
 :
 : <br/>
 : Example usage : <pre> needleman-wunsch("KAK", "KQRK", 1, 1) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $score The score value.
 : @param $penalty The penalty value.
 : @return The Needleman-Wunsch distance between the two strings.
 : @example test/Queries/data-cleaning/character-based-string-similarity/needleman-wunsch.xq
 :)
declare function simc:needleman-wunsch ( $s1 as xs:string, $s2 as xs:string, $score as xs:integer, $penalty as xs:integer ) as xs:double{
 
 if(string-length($s1) = 0) then string-length($s2)* - $penalty else
 if(string-length($s2) = 0) then string-length($s1)* - $penalty else
 max((
  simc:needleman-wunsch(substring($s1, 2), $s2, $score, $penalty) - $penalty ,
  simc:needleman-wunsch($s1, substring($s2, 2), $score, $penalty) - $penalty ,
  simc:needleman-wunsch(substring($s1, 2), substring($s2, 2), $score, $penalty) + ( if(substring($s1, 1, 1) = substring($s2, 1, 1)) then $score else -$penalty )
 ))
};

(:~
 : Returns the Smith-Waterman distance between two strings.
 :
 : <br/>
 : Example usage : <pre> smith-waterman("ACACACTA", "AGCACACA", 2, 1) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 12 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $score The score value.
 : @param $penalty The penalty value.
 : @return The Smith-Waterman distance between the two strings.
 :)
declare function simc:smith-waterman ( $s1 as xs:string, $s2 as xs:string, $score as xs:integer, $penalty as xs:integer ) as xs:double{ 
 if(string-length($s1) = 0) then 0 else
 if(string-length($s2) = 0) then 0 else
 max((
  0,
  simc:smith-waterman(substring($s1, 2), $s2, $score, $penalty) - $penalty ,
  simc:smith-waterman($s1, substring($s2, 2), $score, $penalty) - $penalty ,
  simc:smith-waterman(substring($s1, 2), substring($s2, 2), $score, $penalty) + ( if(substring($s1, 1, 1) = substring($s2, 1, 1)) then $score else -$penalty )
 ))
};
