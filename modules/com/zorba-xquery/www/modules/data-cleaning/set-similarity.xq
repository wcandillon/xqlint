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
 : This library module provides similarity functions for comparing sets of XML 
 : nodes (e.g., sets of XML elements, attributes or atomic values).
 :
 : These functions are particularly useful for matching near duplicate sets of XML nodes.
 :
 : The logic contained in this module is not specific to any particular XQuery implementation.
 :
 : @author Bruno Martins
 : @project data processing/data cleaning
 :)

module namespace set = "http://www.zorba-xquery.com/modules/data-cleaning/set-similarity";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Returns the union between two sets, using the deep-equal() function to compare the XML nodes from the sets.
 :
 : <br/>
 : Example usage : <pre> deep-union ( ( "a", "b", "c") , ( "a", "a", <d/> ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("a", "b", "c", <d/> ) </pre>
 :
 : @param $s1 The first set.
 : @param $s2 The second set.
 : @return The union of both sets.
 : @example test/Queries/data-cleaning/set-similarity/deep-union.xq
 :)
declare function set:deep-union ( $s1 , $s2 ) as item()*{
 let $s := ( $s1 , $s2 )
 for $a at $apos in $s
 where every $ba in subsequence($s, 1, $apos - 1) satisfies not(deep-equal($ba,$a))
 return $a
};

(:~
 : Returns the intersection between two sets, using the deep-equal() function to compare the XML nodes from the sets.
 :
 : <br/>
 : Example usage : <pre> deep-intersect ( ( "a", "b", "c") , ( "a", "a", <d/> ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("a") </pre>
 :
 : @param $s1 The first set.
 : @param $s2 The second set.
 : @return The intersection of both sets.
 : @example test/Queries/data-cleaning/set-similarity/deep-intersect.xq
 :)
declare function set:deep-intersect ( $s1 , $s2 ) as item()*{
 for $a at $apos in $s1
 let $t1 := every $ba in subsequence($s1, 1, $apos - 1) satisfies not(deep-equal($ba,$a))
 let $t2 := some $bb in $s2 satisfies deep-equal($bb,$a)
 where $t1 and $t2
 return $a
};

(:~
 : Removes exact duplicates from a set, using the deep-equal() function to compare the XML nodes from the sets.
 :
 : <br/>
 : Example usage : <pre> distinct ( ( "a", "a", <b/> ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("a", <b/> ) </pre>
 :
 : @param $s A set.
 : @return The set provided as input without the exact duplicates (i.e., returns the distinct nodes from the set provided as input).
 : @example test/Queries/data-cleaning/set-similarity/distinct.xq
 :)
declare function set:distinct ( $s ) as item()*{
 for $a at $apos in $s
 where every $ba in subsequence($s, 1, $apos - 1) satisfies not(deep-equal($ba,$a))
 return $a
};

(:~
 : Returns the overlap coefficient between two sets of XML nodes.
 : The overlap coefficient is defined as the shared information between the input sets 
 : (i.e., the size of the intersection) over the size of the smallest input set.
 :
 : <br/>
 : Example usage : <pre> overlap ( ( "a", "b", <c/> ) , ( "a", "a", "b" ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 1.0 </pre>
 :
 : @param $s1 The first set.
 : @param $s2 The second set.
 : @return The overlap coefficient between the two sets.
 : @example test/Queries/data-cleaning/set-similarity/overlap.xq
 :)
declare function set:overlap ( $s1 , $s2 ) as xs:double {
  count( set:deep-intersect($s1, $s2) ) div min((count(set:distinct($s1)) , count(set:distinct($s2))))
};

(:~
 : Returns the Dice similarity coefficient between two sets of XML nodes.
 : The Dice coefficient is defined as defined as twice the shared information between the input sets 
 : (i.e., the size of the intersection) over the sum of the cardinalities for the input sets.
 :
 : <br/>
 : Example usage : <pre> dice ( ( "a", "b", <c/> ) , ( "a", "a", "d") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.4 </pre>
 :
 : @param $s1 The first set.
 : @param $s2 The second set.
 : @return The Dice similarity coefficient between the two sets.
 : @example test/Queries/data-cleaning/set-similarity/dice.xq
 :)
declare function set:dice ( $s1 , $s2 ) as xs:double {
  2 * count( set:deep-intersect($s1,$s2) ) div ( count(set:distinct($s1)) + count(set:distinct($s2)) )
};

(:~
 : Returns the Jaccard similarity coefficient between two sets of XML nodes.
 : The Jaccard coefficient is defined as the size of the intersection divided by the size of the 
 : union of the input sets.
 :
 : <br/>
 : Example usage : <pre> jaccard ( ( "a", "b", <c/> ) , ( "a", "a", "d") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.25 </pre>
 :
 : @param $s1 The first set.
 : @param $s2 The second set.
 : @return The Jaccard similarity coefficient between the two sets.
 : @example test/Queries/data-cleaning/set-similarity/jaccard.xq
 :)
declare function set:jaccard ( $s1 , $s2  ) as xs:double {
 count( set:deep-intersect($s1,$s2) ) div count( set:deep-union($s1,$s2) )
};
