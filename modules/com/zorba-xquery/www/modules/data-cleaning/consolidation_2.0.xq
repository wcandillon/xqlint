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
 : This library module provides data consolidation functions that generally take as input a sequence of XML nodes
 : and apply some rule in order do decide which node is better suited to represent the entire sequence.
 :
 : The logic contained in this module is not specific to any particular XQuery implementation, 
 : although the consolidation functions based on matching sequences against XPath expressions require 
 : some form of dynamic evaluation for XPath expressions,
 : such as the x:eval() function provided in the Qizx XQuery Engine.
 :
 : @author Bruno Martins
 : @project data processing/data cleaning
 :)

module namespace con = "http://www.zorba-xquery.com/modules/data-cleaning/consolidation";

import module namespace set = "http://www.zorba-xquery.com/modules/data-cleaning/set-similarity";
import module namespace simc = "http://www.zorba-xquery.com/modules/data-cleaning/character-based-string-similarity";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Returns the single most frequent node in a sequence of nodes provided as input.
 : If more then one answer is possible, returns the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-frequent( ( "a", "a", "b") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("a") </pre>
 :
 : @param $s A sequence of nodes.
 : @return The most frequent node in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/most-frequent.xq
 :)
declare function con:most-frequent ( $s ) as item(){
 (for $str in set:distinct($s) order by count($s[deep-equal(.,$str)]) descending return $str)[1]
};

(:~
 : Returns the single less frequent node in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-frequent( ( "a", "a", "b") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("b") </pre>
 :
 : @param $s A sequence of nodes.
 : @return The least frequent node in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/leastfrequent_1.xq
 :)
declare function con:least-frequent ( $s ) as item(){
 let $aux := for $str in set:distinct($s) order by count($s[deep-equal(.,$str)]) return $str
 return if (count($aux) = 0) then () else ($aux[1])
};

(:~
 : Returns the single longest string, in terms of the number of characters, in a sequence of strings provided as input.
 : If more then one answer is possible, return the first string according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> con:longest( ( "a", "aa", "aaa") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("aaa") </pre>
 :
 : @param $s A sequence of strings.
 : @return The longest string in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/longest_1.xq
 :)
declare function con:longest ( $s as xs:string* ) as xs:string? {
 let $aux := for $str in $s order by string-length($str) descending return $str
 return if (count($aux) = 0) then () else ($aux[1])
};

(:~
 : Returns the single shortest string, in terms of the number of characters, in a sequence of strings provided as input.
 : If more then one answer is possible, return the first string according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> shortest( ( "a", "aa", "aaa") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("a") </pre>
 :
 : @param $s A sequence of strings.
 : @return The shortest string in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/shortest_1.xq
 :)
declare function con:shortest( $s as xs:string* ) as xs:string? {
 let $aux := for $str in $s order by string-length($str) return $str
 return if (count($aux) = 0) then () else ($aux[1])
};

(:~
 : Returns the single longest string, in terms of the number of tokens, in a sequence of strings provided as input.
 : If more then one answer is possible, return the first string according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-tokens( ( "a b c", "a b", "a"), " +" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("a b c") </pre>
 :
 : @param $s A sequence of strings.
 : @param $r A regular expression forming the delimiter character(s) which mark the boundaries between adjacent tokens.
 : @return The longest string in the input sequence, in terms of the number of tokens.
 : @example test/Queries/data-cleaning/consolidation/most-tokens.xq
 :)
declare function con:most-tokens ( $s as xs:string*, $r as xs:string ) as xs:string? {
 let $aux := for $str in $s order by count(tokenize($str,$r)) descending return $str
 return if (count($aux) = 0) then () else ($aux[1])
};

(:~
 : Returns the single shortest string, in terms of the number of tokens, in a sequence of strings provided as input.
 : If more then one answer is possible, return the first string according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-tokens( ( "a b c", "a b", "a"), " +" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("a") </pre>
 :
 : @param $s A sequence of strings.
 : @param $r A regular expression forming the delimiter character(s) which mark the boundaries between adjacent tokens.
 : @return The shortest string in the input sequence, in terms of the number of tokens.
 : @example test/Queries/data-cleaning/consolidation/least-tokens.xq
 :)
declare function con:least-tokens ( $s as xs:string*, $r as xs:string ) as xs:string? {
 let $aux := for $str in $s order by count(tokenize($str,$r)) return $str
 return if (count($aux) = 0) then () else ($aux[1])
};

(:~
 : Returns the strings from an input sequence of strings that match a particular regular expression.
 :
 : <br/>
 : Example usage : <pre> matching( ( "a A b", "c AAA d", "e BB f"), "A+" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ( "a A b", "c AAA d") </pre>
 :
 : @param $s A sequence of strings.
 : @param $r The regular expression to be used in the matching.
 : @return The strings in the input sequence that match the input regular expression.
 : @example test/Queries/data-cleaning/consolidation/matching_1.xq
 :)
declare function con:matching ( $s as xs:string*, $r as xs:string ) as xs:string* {
 for $str in $s where matches($str,$r) return $str
};

(:~
 : Returns the single string, from an input sequence of strings, that appears more frequently as part
 : of the other strings in the sequence. If no such string exists, the function returns an empty sequence.
 : If more then one answer is possible, the function returns the first string according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> super-string( ( "aaa bbb ccc", "aaa bbb", "aaa ddd", "eee fff" ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ( "aaa bbb" ) </pre>
 :
 : @param $s A sequence of strings.
 : @return The string that appears more frequently as part of the other strings in the sequence.
 : @example test/Queries/data-cleaning/consolidation/superstring_1.xq
 :)
declare function con:superstring ( $s as xs:string* ) as xs:string? {
  let $aux :=
  for $str in $s 
  let $cnt := count ( for $str2 in $s return if(contains($str2,$str)) then $str else () )
  where $cnt > 1
  order by $cnt descending
  return $str
  return if (count($aux) = 0) then () else ($aux[1])
};

(:~
 : Returns the single most similar string, in terms of the edit distance metric towards an input string, 
 : in a sequence of strings provided as input. If more than one string has a maximum similarity (a minimum 
 : value for the edit distance metric), the function return the first string according to the order of the 
 : input sequence.
 :
 : <br/>
 : Example usage : <pre> most-similar-edit-distance( ( "aaabbbccc", "aaabbb", "eeefff" ), "aaab" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ( "aaabbb" ) </pre>
 :
 : @param $s A sequence of strings.
 : @param $m The string towards which we want to measure the edit distance.
 : @return The most similar string in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/most-similar-edit-distance.xq
 :)
declare function con:most-similar-edit-distance ( $s as xs:string*, $m as xs:string ) as xs:string? {
 let $aux := for $str in $s order by simc:edit-distance($str,$m) return $str
 return if (count($aux) = 0) then () else ($aux[1])
};

(:~
 : Returns the single least similar string, in terms of the edit distance metric towards an input string, 
 : in a sequence of strings provided as input. If more than one string has a minimum similarity (a maximum 
 : value for the edit distance metric), return the first string according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-similar-edit-distance( ( "aaabbbccc", "aaabbb", "eeefff" ), "aaab" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ( "eeefff" ) </pre>
 :
 : @param $s A sequence of strings.
 : @param $m The string towards which we want to measure the edit distance.
 : @return The least similar string in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/least-similar-edit-distance.xq
 :)
declare function con:least-similar-edit-distance ( $s as xs:string*, $m as xs:string ) as xs:string? {
 let $aux := for $str in $s order by simc:edit-distance($str,$m) descending return $str
 return if (count($aux) = 0) then () else ($aux[1])
};

(:~
 : Returns the single node having the largest number of descending elements (sub-elements at any given depth) 
 : in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-elements( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;a/&gt;, &lt;b/&gt;) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;a&gt;&lt;b/&gt;&lt;/a&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the largest number of descending elements in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/most-elements.xq
 :)
declare function con:most-elements ( $s ) as element(){
 (for $str in set:distinct($s) order by count($str/descendant-or-self::element()) descending return $str)[1]
};

(:~
 : Returns the single node having the largest number of descending attributes (attributes at any given depth) 
 : in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-attributes( ( &lt;a att1="a1" att2="a2"/&gt;, &lt;b att1="a1" /&gt;, &lt;c/&gt; ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;a att1="a1" att2="a2"/&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the largest number of descending attributes in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/most-attributes.xq
 :)
declare function con:most-attributes ( $s ) as element(){
 (for $str in set:distinct($s) order by count($str/descendant-or-self::*/attribute()) descending return $str)[1]
};

(:~
 : Returns the single node having the largest number of descending nodes (sub-nodes at any given depth) in a 
 : sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-nodes( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;a/&gt;, &lt;b/&gt;) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;a&gt;&lt;b/&gt;&lt;/a&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the largest number of descending nodes in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/most-nodes.xq
 :)
declare function con:most-nodes ( $s ) as element(){
 (for $str in set:distinct($s) order by count($str/descendant-or-self::node()) descending return $str)[1]
};

(:~
 : Returns the single node having the smallest number of descending elements (sub-elements at any given depth) 
 : in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-elements( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;b&gt;&lt;c/&gt;&lt;/b&gt;, &lt;d/&gt;) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;d/&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the smallest number of descending elements in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/least-elements.xq
 :)
declare function con:least-elements ( $s ) as element(){
 (for $str in set:distinct($s) order by count($str/descendant-or-self::element()) return $str)[1]
};

(:~
 : Returns the single node having the smallest number of descending attributes (attributes at any given depth) 
 : in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-attributes( ( &lt;a att1="a1" att2="a2"/&gt;, &lt;b att1="a1" /&gt;, &lt;c/&gt; ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;c/&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the smallest number of descending attributes in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/least-attributes.xq
 :)
declare function con:least-attributes ( $s ) as element(){
 (for $str in set:distinct($s) order by count($str/descendant-or-self::*/attribute()) return $str)[1]
};

(:~
 : Returns the single node having the smallest number of descending nodes (sub-nodes at any given depth) 
 : in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-nodes( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;b&gt;&lt;c/&gt;&lt;/b&gt;, &lt;d/&gt;) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;d/&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the smallest number of descending nodes in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/least-nodes.xq
 :)
declare function con:least-nodes ( $s ) as element(){
 (for $str in set:distinct($s) order by count($str/descendant-or-self::node()) return $str)[1]
};

(:~
 : Returns the single node having the largest number of distinct descending elements (sub-elements at any 
 : given depth) in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-distinct-elements( ( &lt;a&gt;&lt;b/&gt;&lt;c/&gt;&lt;d/&gt;&lt;/a&gt;, &lt;a&gt;&lt;b/&gt;&lt;b/&gt;&lt;c/&gt;&lt;/a&gt;, &lt;a/&gt; ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;a&gt;&lt;b/&gt;&lt;c/&gt;&lt;d/&gt;&lt;/a&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the largest number of distinct descending elements in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/most-distinct-elements.xq
 :)
declare function con:most-distinct-elements ( $s ) as element(){
 (for $str in set:distinct($s) order by count(set:distinct($str/descendant-or-self::element())) descending return $str)[1]
};

(:~
 : Returns the single node having the largest number of distinct descending attributes (attributes at any 
 : given depth) in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-distinct-attributes( ( &lt;a att1="a1" att2="a2" att3="a3"/&gt;, &lt;a att1="a1" att2="a2"&gt;&lt;b att2="a2" /&gt;&lt;/a&gt;, &lt;c/&gt; ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;a att1="a1" att2="a2" att3="a3"/&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the largest number of distinct descending attributes in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/most-distinct-attributes.xq
 :)
declare function con:most-distinct-attributes ( $s ) as element(){
 (for $str in set:distinct($s) order by count(set:distinct($str/descendant-or-self::*/attribute())) descending return $str)[1]
};

(:~
 : Returns the single node having the largest number of distinct descending nodes (sub-nodes at any given depth) in 
 : a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-distinct-nodes( ( &lt;a>&lt;b/>&lt;/a&gt;, &lt;a>&lt;a/&gt;&lt;/a&gt;, &lt;b/&gt;) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;a&gt;&lt;b/&gt;&lt;/a&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the largest number of distinct descending nodes in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/most-distinct-nodes.xq
 :)
declare function con:most-distinct-nodes ( $s ) as element(){
 (for $str in set:distinct($s) order by count(set:distinct($str/descendant-or-self::node())) descending return $str)[1]
};

(:~
 : Returns the single node having the smallest number of distinct descending elements (sub-elements at any 
 : given depth) in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-distinct-elements( ( &lt;a>&lt;b/&gt;&lt;/a&gt;, &lt;b&gt;&lt;c/&gt;&lt;/b&gt;, &lt;d/&gt;) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;d/&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the smallest number of distinct descending elements in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/least-distinct-elements.xq
 :)
declare function con:least-distinct-elements ( $s ) as element(){
 (for $str in set:distinct($s) order by count(set:distinct($str/descendant-or-self::element())) return $str)[1]
};

(:~
 : Returns the single node having the smallest number of distinct descending attributes (attributes at any 
 : given depth) in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-distinct-attributes( ( &lt;a att1="a1" att2="a2"/&gt;, &lt;b att1="a1" /&gt;, &lt;c/&gt; ) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;c/&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the smallest number of distinct descending attributes in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/least-distinct-attributes.xq
 :)
declare function con:least-distinct-attributes ( $s ) as element(){
 (for $str in set:distinct($s) order by count(set:distinct($str/descendant-or-self::*/attribute())) return $str)[1]
};

(:~
 : Returns the single node having the smallest number of distinct descending nodes (sub-nodes at any given depth) 
 : in a sequence of nodes provided as input.
 : If more then one answer is possible, return the first node according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-distinct-nodes( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;b&gt;&lt;c/&gt;&lt;/b&gt;, &lt;d/&gt;) ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;d/&gt;) </pre>
 :
 : @param $s A sequence of nodes.
 : @return The node having the smallest number of distinct descending nodes in the input sequence.
 : @example test/Queries/data-cleaning/consolidation/least-distinct-nodes.xq
 :)
declare function con:least-distinct-nodes ( $s ) as element(){
 (for $str in set:distinct($s) order by count(set:distinct($str/descendant-or-self::node())) return $str)[1]
};

(:~
 : Returns the elements from an input sequence of elements that, when matched to a given set of XPath expressions,
 : produce a non-empty set of nodes in all the cases.
 :
 : <br/>
 : Example usage : <pre> all-xpaths( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;c&gt;&lt;d/&gt;&lt;/c&gt;, &lt;d/&gt;), (".//b") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> (&lt;a&gt;&lt;b/&gt;&lt;/a&gt;) </pre>
 :
 : @param $s A sequence of elements.
 : @param $paths A sequence of strings denoting XPath expressions.
 : @return The elements that, when matched to the given set of XPath expressions, always return a non-empty set of nodes.
 :)
declare function con:all-xpaths ( $s as element()* , $paths as xs:string* ) as element()*{
(:
 for $str in set:distinct($s)
 where every $path in $paths satisfies count( 
   x:eval( concat( "<xml>", 
                   x:serialize ( $str , <options omit-xml-declaration="true" /> ), 
                   if(starts-with($path,"/")) then ("</xml>") else ("</xml>/") , 
                   $path) ) ) > 0
 return $str
 :)
 ""
};

(:~
 : Returns the elements from a sequence of elements that, when matched to a given set of XPath expressions,
 : produce a non-empty set of nodes for some of the cases.
 :
 : <br/>
 : Example usage : <pre> some-xpaths( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;d&gt;&lt;c/&gt;&lt;/d&gt;, &lt;d/&gt;), (".//b", ".//c") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt; , &lt;d&gt;&lt;c/&gt;&lt;/d&gt; ) </pre>
 :
 : @param $s A sequence of elements.
 : @param $paths A sequence of strings denoting XPath expressions.
 : @return The elements that, when matched to the given set of XPath expressions, return a non-empty set of nodes 
 : for at least one of the cases.
 :)
declare function con:some-xpaths ( $s as element()* , $paths as xs:string* ) as element()*{
(:
 for $str in set:distinct($s)
 where some $path in $paths satisfies count( 
   x:eval( concat( "<xml>", 
                   x:serialize ( $str , <options omit-xml-declaration="true" /> ), 
                   if(starts-with($path,"/")) then ("</xml>") else ("</xml>/") , 
                   $path) ) ) > 0
 return $str
 :)
  ""
};

(:~
 : Returns the single element from an input sequence of elements that matches the largest number of 
 : XPath expressions from a given set, producing a non-empty set of nodes.
 : If more then one answer is possible, return the first element according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> most-xpaths( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;d&gt;&lt;c/&gt;&lt;b/&gt;&lt;/d&gt;, &lt;d/&gt;) , (".//b", ".//c") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ( &lt;d&gt;&lt;c/&gt;&lt;b/&gt;&lt;/d&gt; ) </pre>
 :
 : @param $s A sequence of elements.
 : @param $paths A sequence of strings denoting XPath expressions.
 : @return The element that matches the largest number of XPath expressions producing a non-empty set of nodes.
 :)

declare function con:most-xpaths ( $s as element()* , $paths as xs:string* ) as element()*{
 (:
 (
  for $str in set:distinct($s) 
  let $cnt := sum( for $path in $paths where count(
   x:eval( concat( "<xml>", 
                   x:serialize ( $str , <options omit-xml-declaration="true" /> ), 
                   if(starts-with($path,"/")) then ("</xml>") else ("</xml>/") , 
                   $path) ) ) > 0 return 1 )
  order by $cnt descending
  return $str
 )[1]
 :)
 ""
};

(:~
 : Returns the single element from an input sequence of elements that matches the smallest number of 
 : XPath expressions from a given set, producing a non-empty set of nodes.
 : If more then one answer is possible, return the first element according to the order of the input sequence.
 :
 : <br/>
 : Example usage : <pre> least-xpaths( ( &lt;a&gt;&lt;b/&gt;&lt;/a&gt;, &lt;d&gt;&lt;c/&gt;&lt;b/&gt;&lt;/d&gt;, &lt;d/&gt;) , (".//b", ".//c") ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ( $lt;d/&gt; ) </pre>
 :
 : @param $s A sequence of elements.
 : @param $paths A sequence of strings denoting XPath expressions.
 : @return The element that matches the smallest number of XPath expressions producing a non-empty set of nodes.
 :)

declare function con:least-xpaths ( $s as element()* , $paths as xs:string* ) as element()*{
(:
 (
  for $str in set:distinct($s) 
  let $cnt := sum( for $path in $paths where count(
   x:eval( concat( "<xml>", 
                   x:serialize ( $str , <options omit-xml-declaration="true" /> ), 
                   if(starts-with($path,"/")) then ("</xml>") else ("</xml>/") , 
                   $path) ) ) > 0 return 1 )
  order by $cnt
  return $str
 )[1]
 :)
 ""
};

(:~
 : Returns the nodes from an input sequence of nodes that validate against a given XML Schema.
 :
 : <br/>
 : Example usage : <pre> validating-schema ( ( &lt;a/&gt; , &lt;b/&gt; ), &lt;xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"&gt;&lt;xs:element name="a" /&gt;&lt;/xs:schema&gt; ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ( &lt;a/&gt; ) </pre>
 :
 : @param $s A sequence of elements.
 : @param $schema An element encoding an XML Schema.
 : @return The nodes that validate against the XML Schema.
 :
 : <br/><br/><b> Attention : This function is still not implemented. </b> <br/>
 :
 :)
declare function con:validating-schema ( $s as element()*, $schema as element() ) as element()*{
 false()
};
