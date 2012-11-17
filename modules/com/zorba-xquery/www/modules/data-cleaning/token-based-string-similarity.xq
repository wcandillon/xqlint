xquery version "3.0";

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
 : This library module provides token-based string similarity functions that view strings 
 : as sets or multi-sets of tokens and use set-related properties to compute similarity scores. 
 : The tokens correspond to groups of characters extracted from the strings being compared, such as 
 : individual words or character n-grams.
 :
 : These functions are particularly useful for matching near duplicate strings in cases where
 : typographical conventions often lead to rearrangement of words (e.g., "John Smith" versus "Smith, John").
 :
 : The logic contained in this module is not specific to any particular XQuery implementation,
 : although the module requires the trigonometic functions of XQuery 3.0 or a math extension 
 : function such as sqrt($x as numeric) for computing the square root.
 :
 : @author Bruno Martins
 : @project data processing/data cleaning
 :)

module namespace simt = "http://www.zorba-xquery.com/modules/data-cleaning/token-based-string-similarity";

(: In the QizX or Saxon XQuery engines, it is possible to call external functions from the Java math library :)
(: declare namespace math = "java:java.lang.Math"; :)
declare namespace math = "http://www.w3.org/2005/xpath-functions/math";

import module namespace set  = "http://www.zorba-xquery.com/modules/data-cleaning/set-similarity";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Returns the individual character n-grams forming a string.
 :
 : <br/>
 : Example usage : <pre> ngrams("FLWOR", 2 ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> ("_F" , "FL" , "LW" , "WO" , "LW" , "WO" , "OR" , "R_") </pre>
 :
 : @param $s The input string.
 : @param $n The number of characters to consider when extracting n-grams.
 : @return The sequence of strings with the extracted n-grams.
 : @example test/Queries/data-cleaning/token-based-string-similarity/ngrams.xq
 :)
declare function simt:ngrams ( $s as xs:string, $n as xs:integer ) as xs:string* {
 let $pad := '_'
 return
 ( for $a in 1 to $n 
   let $apad := string-join( for $aux in $a + 1 to $n return $pad , '' ) 
   return concat( $apad , replace(substring($s,1,$a) , "_", "\\_") ) ,

   for $b in $n + 2 to string-length($s) return replace(substring($s,$b - $n, $n), "_", "\\_") ,

   for $c in string-length($s) - (if ($n = 1) then (-1) else ($n)) - 1 to string-length($s) 
   let $cpad := string-join( for $aux in string-length($s) - $c + 2 to $n return $pad , '' ) 
   return concat(replace(substring($s, $c, $n), "_", "\\_"), $cpad ) 
 )
};

(:~
 : Auxiliary function for computing the cosine similarity coefficient between strings, 
 : using stringdescriptors based on sets of character n-grams or sets of tokens extracted from two strings.
 :
 : <br/>
 : Example usage : <pre> cosine( ("aa","bb") , ("bb","aa")) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 1.0 </pre>
 :
 : @param $desc1 The descriptor for the first string.
 : @param $desc2 The descriptor for the second string.
 : @return The cosine similarity coefficient between the descriptors for the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/cosine.xq
 :)
declare function simt:cosine ( $desc1 as xs:string*, $desc2 as xs:string* ) as xs:double {
 let $vocab     := distinct-values( ($desc1, $desc2) )
 let $freq1     := for $v1 in $vocab return count($desc1[.=$v1])
 let $freq2     := for $v2 in $vocab return count($desc2[.=$v2])
 let $freq1pow  := for $f1 in $freq1 return $f1 * $f1
 let $freq2pow  := for $f2 in $freq2 return $f2 * $f2 
 let $mult      := for $freq at $pos in $freq1 return $freq * $freq2[$pos] 
 return sum($mult) div (math:sqrt(sum($freq1pow)) * math:sqrt(sum($freq2pow)))
};

(:~
 : Returns the Dice similarity coefficient between sets of character n-grams extracted from two strings.
 :
 : <br/>
 : Example usage : <pre> dice-ngrams("DWAYNE", "DUANE", 2 ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.4615384615384616 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $n The number of characters to consider when extracting n-grams.
 : @return The Dice similarity coefficient between the sets of character n-grams extracted from the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/dice-ngrams.xq
 :)
declare function simt:dice-ngrams ( $s1 as xs:string, $s2 as xs:string, $n as xs:integer ) as xs:double {
 set:dice(simt:ngrams($s1,$n),simt:ngrams($s2,$n))
};

(:~
 : Returns the overlap similarity coefficient between sets of character n-grams extracted from two strings.
 :
 : <br/>
 : Example usage : <pre> overlap-ngrams("DWAYNE", "DUANE", 2 ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.5 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $n The number of characters to consider when extracting n-grams.
 : @return The overlap similarity coefficient between the sets of character n-grams extracted from the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/overlap-ngrams.xq
 :)
declare function simt:overlap-ngrams ( $s1 as xs:string, $s2 as xs:string, $n as xs:integer ) as xs:double {
 set:overlap(simt:ngrams($s1,$n),simt:ngrams($s2,$n))
};

(:~
 : Returns the Jaccard similarity coefficient between sets of character n-grams extracted from two strings.
 :
 : <br/>
 : Example usage : <pre> jaccard-ngrams("DWAYNE", "DUANE", 2 ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.3 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $n The number of characters to consider when extracting n-grams.
 : @return The Jaccard similarity coefficient between the sets of character n-grams extracted from the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/jaccard-ngrams.xq
 :)
declare function simt:jaccard-ngrams ( $s1 as xs:string, $s2 as xs:string, $n as xs:integer ) as xs:double {
 set:jaccard(simt:ngrams($s1,$n),simt:ngrams($s2,$n))
};

(:~
 : Returns the cosine similarity coefficient between sets of character n-grams extracted from two strings. 
 : The n-grams from each string are weighted according to their occurence frequency (i.e., weighted according to
 : the term-frequency heuristic from Information Retrieval).
 :
 : <br/>
 : Example usage : <pre> cosine-ngrams("DWAYNE", "DUANE", 2 ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.2401922307076307 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $n The number of characters to consider when extracting n-grams.
 : @return The cosine similarity coefficient between the sets n-grams extracted from the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/cosine-ngrams.xq
 :)
declare function simt:cosine-ngrams ( $s1 as xs:string, $s2 as xs:string, $n as xs:integer ) as xs:double {
 let $ngrams1   := simt:ngrams($s1,$n) 
 let $ngrams2   := simt:ngrams($s2,$n)
 return simt:cosine($ngrams1,$ngrams2)
};

(:~
 : Returns the Dice similarity coefficient between sets of tokens extracted from two strings.
 :
 : <br/>
 : Example usage : <pre> dice-tokens("The FLWOR Foundation", "FLWOR Found.", " +" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.4 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $r A regular expression forming the delimiter character(s) which mark the boundaries between adjacent tokens.
 : @return The Dice similarity coefficient between the sets tokens extracted from the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/dice-tokens.xq
 :)
declare function simt:dice-tokens ( $s1 as xs:string, $s2 as xs:string, $r as xs:string ) as xs:double {
 set:dice( tokenize($s1,$r) , tokenize($s2,$r) )
};

(:~
 : Returns the overlap similarity coefficient between sets of tokens extracted from two strings.
 :
 : <br/>
 : Example usage : <pre> overlap-tokens("The FLWOR Foundation", "FLWOR Found.", " +" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.5 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $r A regular expression forming the delimiter character(s) which mark the boundaries between adjacent tokens.
 : @return The overlap similarity coefficient between the sets tokens extracted from the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/overlap-tokens.xq
 :)
declare function simt:overlap-tokens ( $s1 as xs:string, $s2 as xs:string, $r as xs:string ) as xs:double {
 set:overlap( tokenize($s1,$r) , tokenize($s2,$r) )
};

(:~
 : Returns the Jaccard similarity coefficient between sets of tokens extracted from two strings.
 :
 : <br/>
 : Example usage : <pre> jaccard-tokens("The FLWOR Foundation", "FLWOR Found.", " +" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.25 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $r A regular expression forming the delimiter character(s) which mark the boundaries between adjacent tokens.
 : @return The Jaccard similarity coefficient between the sets tokens extracted from the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/jaccard-tokens.xq
 :)
declare function simt:jaccard-tokens ( $s1 as xs:string, $s2 as xs:string, $r as xs:string ) as xs:double {
 set:jaccard( tokenize($s1,$r) , tokenize($s2,$r) )
};

(:~
 : Returns the cosine similarity coefficient between sets of tokens extracted from two strings. The tokens 
 : from each string are weighted according to their occurence frequency (i.e., weighted according to the 
 : term-frequency heuristic from Information Retrieval).
 :
 : <br/>
 : Example usage : <pre> cosine-tokens("The FLWOR Foundation", "FLWOR Found.", " +" ) </pre>
 : <br/>
 : The function invocation in the example above returns : <pre> 0.408248290463863 </pre>
 :
 : @param $s1 The first string.
 : @param $s2 The second string.
 : @param $r A regular expression forming the delimiter character(s) which mark the boundaries between adjacent tokens.
 : @return The cosine similarity coefficient between the sets tokens extracted from the two strings.
 : @example test/Queries/data-cleaning/token-based-string-similarity/cosine-tokens.xq
 :)
declare function simt:cosine-tokens ( $s1 as xs:string, $s2 as xs:string, $r as xs:string ) as xs:double {
 let $tokens1   := tokenize($s1,$r) 
 let $tokens2   := tokenize($s2,$r)
 return simt:cosine($tokens1,$tokens2)
};
