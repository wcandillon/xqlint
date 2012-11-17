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
 : This library module provides data normalization functions for processing calendar dates, 
 : temporal values, currency values, units of measurement, location names and postal addresses.
 :
 : These functions are particularly useful for converting different data representations into cannonical formats.
 :
 : The logic contained in this module is not specific to any particular XQuery implementation.
 :
 : @author Bruno Martins and Diogo Simões
 : @project data processing/data cleaning
 :)

module namespace normalization = "http://www.zorba-xquery.com/modules/data-cleaning/normalization";

import module namespace http = "http://www.zorba-xquery.com/modules/http-client";

declare namespace an = "http://www.zorba-xquery.com/annotations";
declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~
 : Converts a given string representation of a date value into a date representation valid according 
 : to the corresponding XML Schema type.
 :
 :
 : @param $sd The string representation for the date
 : @param $format An optional parameter denoting the format used to represent the date in the string, according to a 
 : sequence of conversion specifications. In the format string, a conversion specification is introduced by '%', usually followed 
 : by a single letter or 'O' or 'E' and then a single letter. Any character in the format string that is not part of a conversion 
 : specification is interpreted literally, and the string '%%' gives '%'. The supported conversion specifications are as follows:
 : <pre>
 : '%b' Abbreviated month name in the current locale.<br/>
 : '%B' Full month name in the current locale.<br/>
 : '%d' Day of the month as decimal number (01-31).<br/>
 : '%m' Month as decimal number (01-12).<br/>
 : '%x' Date, locale-specific.<br/>
 : '%y' Year without century (00-99).<br/>
 : '%Y' Year with century.<br/>
 : '%C' Century (00-99): the integer part of the year divided by 100.<br/>
 : '%D' Locale-specific date format such as '%m/%d/%y'.<br/>
 : '%e' Day of the month as decimal number (1-31), with a leading pace for a single-digit number.<br/>
 : '%F' Equivalent to %Y-%m-%d (the ISO 8601 date format).<br/>
 : '%h' Equivalent to '%b'.<br/> 
 :</pre>
 :
 : @return The date value resulting from the conversion.
 : @example test/Queries/data-cleaning/normalization/to-date.xq
 :)
declare function normalization:to-date ( $sd as xs:string, $format as xs:string? ) as xs:string{

 
 let $dictionary := normalization:month-dictionary()
 let $format-tokens := tokenize($format, "[ %\-/:]+")[position()>1] 
 let $sd-tokens := 
 	if (contains($sd, "-") or contains($sd, "/") or contains($sd, " "))
 	then tokenize ($sd, "[ \-/]+")
 	else let $ydtoken := tokenize(replace($sd, "[A-Za-z]", " "), " ")
	     let $ft := $ydtoken[position()=1]
	     let $lt := $ydtoken[last()]
	     let $mtoken := replace($sd, "[0-9]", "") return ($ft, $mtoken, $lt)
 return
 if (count($sd-tokens)>1) 
	then  	
		let $year := 
			if (count(index-of($format-tokens, "F")) != 0) then string($sd-tokens[position() = 1])
			else	
			
			if (count(index-of($format-tokens, "D")) != 0) then concat("19", string($sd-tokens[position() = 3]))
			else

			if (count(index-of($format-tokens, "Y")) != 0)
			then string($sd-tokens[position() = index-of($format-tokens, "Y")]) else 
				
			if (count(index-of($format-tokens, "y")) != 0)
			then 
			  if(count(index-of($format-tokens, "C")) !=0)
			  then concat(string(number(string($sd-tokens[position() = index-of($format-tokens, "C")]))-1), string($sd-tokens[position() = index-of($format-tokens, "y")]))

			  else 
			   concat("19", string($sd-tokens[position() = index-of($format-tokens, "y")]))

			else "YND"

		let $month := 
			if (count(index-of($format-tokens, "h")) != 0)
			then string($dictionary//month[abrv/text() = $sd-tokens[position() = index-of($format-tokens, "h")]]/@value) else
			
			if (count(index-of($format-tokens, "b")) != 0)
			then string($dictionary//month[abrv/text() = $sd-tokens[position() = index-of($format-tokens, "b")]]/@value)
			else 
			
			if (count(index-of($format-tokens, "B")) != 0)
			then string($dictionary//month[lower-case(@name) = 
				lower-case($sd-tokens[position() = index-of($format-tokens, "B")])]/@value)
			   
			else 

			if (count(index-of($format-tokens, "F")) != 0)
			then string($sd-tokens[position() = 2])	
			else 
			
			if (count(index-of($format-tokens, "D")) != 0) then string($sd-tokens[position() = 1])
			else

			if (count(index-of($format-tokens, "m")) != 0)
			then string($sd-tokens[position() = index-of($format-tokens, "m")])
			
			else "MND"

	      	let $day := 
			if (count(index-of($format-tokens, "F")) != 0) 
			then string($sd-tokens[position() = 3]) else 
			
			if (count(index-of($format-tokens, "D")) != 0) then string($sd-tokens[position() = 2])
			else
  
			if (count(index-of($format-tokens, "d")) != 0) 
			then $sd-tokens[position() = index-of($format-tokens, "d")] else

			if (count(index-of($format-tokens, "e")) != 0)
			then concat("0", string($sd-tokens[position() = index-of($format-tokens, "e")]))
			else "DND"
	
	let $result := concat($year, "-", $month, "-", $day)
	
	return normalization:check-date($result)
	else()
	
};

(:~
 : Converts a given string representation of a time value into a time representation valid according to 
 : the corresponding XML Schema type.
 :
 :
 : @param $sd The string representation for the time.
 : @param $format An optional parameter denoting the format used to represent the time in the string, according to a sequence of 
 : conversion specifications. In the format string, a conversion specification is introduced by '%', usually followed by a single 
 : letter or 'O' or 'E' and then a single letter. Any character in the format string that is not part of a conversion specification 
 : is interpreted literally, and the string '%%' gives '%'. The supported conversion specifications are as follows:
 :
 : <pre>
 : '%H' Hours as decimal number (00-23).<br/>
 : '%I' Hours as decimal number (01-12).<br/>
 : '%M' Minute as decimal number (00-59).<br/>
 : '%p' AM/PM indicator in the locale. Used in conjunction with '%I' and *not* with '%H'.<br/>
 : '%S' Second as decimal number (00-61), allowing for up to two leap-seconds.<br/>
 : '%X' Time, locale-specific.<br/>
 : '%z' Offset from Greenwich, so '-0900' is 9 hours west of Greenwich.<br/>
 : '%Z' Time zone as a character string.<br/>
 : '%k' The 24-hour clock time with single digits preceded by a blank.<br/>
 : '%l' The 12-hour clock time with single digits preceded by a blank.<br/>
 : '%r' The 12-hour clock time (using the locale's AM or PM).<br/>
 : '%R' Equivalent to '%H:%M'.<br/>
 : '%T' Equivalent to '%H:%M:%S'.<br/>
 :</pre>
 :
 : @return The time value resulting from the conversion.
 : @example test/Queries/data-cleaning/normalization/to-time.xq
 :)
declare function normalization:to-time ( $sd as xs:string, $format as xs:string? ) as xs:string?{
 let $timezoneDict := normalization:timeZone-dictionary()
 let $format-string := replace(replace ($format, '%R', '%H:%M'), '%T', '%H:%M:%S')
 let $format-tokens := tokenize($format-string, "( |%|:)+")[position()>1] 
 let $sd-tokens := 
 	if (contains($sd, ":") or contains($sd, ".") or contains($sd, " "))
 	then tokenize ($sd, "[ :\.]")
 	else ()
 return
 if (count($sd-tokens)>1) 
	then  	
		let $hours := 
			if (count(index-of($format-tokens, "T")) != 0) then string($sd-tokens[position() = 1])
			else	
			
			if (count(index-of($format-tokens, "X")) != 0) then substring(string(current-time()),1,2)
			else

			if (count(index-of($format-tokens, "R")) != 0) then string($sd-tokens[position() = 1])
			else

			if (count(index-of($format-tokens, "H")) != 0)
			then string($sd-tokens[position() = index-of($format-tokens, "H")]) else 
		
			if (count(index-of($format-tokens, "k")) != 0)
			then if(string-length(string($sd-tokens[position() = index-of($format-tokens, "k")]))=1)
			     then concat("0", string($sd-tokens[position() = index-of($format-tokens, "k")]))
			     else string($sd-tokens[position() = index-of($format-tokens, "k")])  
			else	
			
			if (count(index-of($format-tokens, "r")) != 0)
			then 
			  if(lower-case(string($sd-tokens[position() = 4]))="am")
			  then string($sd-tokens[position() = 1])
			  else if(lower-case(string($sd-tokens[position() = 4]))="pm")
			       then if(string($sd-tokens[position() = 1])="12") then 12
				  else string(number(string($sd-tokens[position() = 1]))+12)
			       else()
			
			else

			if (count(index-of($format-tokens, "I")) != 0)
			then 
			  if(count(index-of($format-tokens, "p")) !=0)
			  then if (lower-case(string($sd-tokens[position() = 
					index-of($format-tokens, "p")]))="am")
			       then string($sd-tokens[position() = index-of($format-tokens, "I")]) 
			       else if (lower-case(string($sd-tokens[position() = 
					index-of($format-tokens, "p")]))="pm")
				  then if (string($sd-tokens[position() = index-of($format-tokens, "I")])="12")
				       then "12"
				       else string(number(string($sd-tokens[position() = index-of($format-tokens, "I")]))+12)
				  else()
			  else()
			
			else
			if (count(index-of($format-tokens, "l")) != 0)
			then 
			  if(count(index-of($format-tokens, "p")) !=0)
			  then if (lower-case(string($sd-tokens[position() = 
					index-of($format-tokens, "p")]))="am")
			       then if(string-length(string($sd-tokens[position() = index-of($format-tokens, "l")]))=1)
				  then concat("0", string($sd-tokens[position() = index-of($format-tokens, "l")]))
				  else string($sd-tokens[position() = index-of($format-tokens, "l")])  
				
			       else if (lower-case(string($sd-tokens[position() = index-of($format-tokens, "p")]))="pm")
				  then if (string($sd-tokens[position() = index-of($format-tokens, "l")])="12")
				       then "12"
				       else string(number(string($sd-tokens[position() = index-of($format-tokens, "l")]))+12)
				  else()
			  			
			else ()
			
			
			else "HND"

		let $minutes := 
			
			if (count(index-of($format-tokens, "T")) != 0)
			then string($sd-tokens[position() = 2])	
			else 
			
			if (count(index-of($format-tokens, "X")) != 0) then substring(string(current-time()),4,2)
			else

			if (count(index-of($format-tokens, "R")) != 0) then string($sd-tokens[position() = 2])
			else

			if (count(index-of($format-tokens, "r")) != 0)
			then string($sd-tokens[position() = 2])	
			else 

			if (count(index-of($format-tokens, "M")) != 0)
			then string($sd-tokens[position() = index-of($format-tokens, "M")])
			
			else "MND"

	      	let $seconds := 
			if (count(index-of($format-tokens, "T")) != 0) 
			then string($sd-tokens[position() = 3]) else 
			
			if (count(index-of($format-tokens, "X")) != 0) then substring(string(current-time()),7,2)
			else

			if (count(index-of($format-tokens, "r")) != 0)
			then string($sd-tokens[position() = 3])	
			else 

			if (count(index-of($format-tokens, "R")) != 0) then "00"
			else

			if (count(index-of($format-tokens, "S")) != 0) 
			then $sd-tokens[position() = index-of($format-tokens, "S")] else

			if (count(index-of($format-tokens, "e")) != 0)
			then concat("0", string($sd-tokens[position() = index-of($format-tokens, "e")]))
			else "00"
	
	let $result :=

	if (count(index-of($format-tokens, "Z")) != 0) 
	then
	   if (substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() = index-of($format-tokens, "Z")]]),1,1)='+')
	   then let $complement := 
		  if (number($minutes)+number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
			 index-of($format-tokens, "Z")]]),4,2)) > 59) 		  
		  then 1 
		  else 0

		let $rhours := 
		  if (string-length(string(
			(number($complement) + number($hours) + 
	                        number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24)) = 2) 
		  then (string(
			(number($complement) + number($hours) + 
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))
		  else concat("0",
			string(
			(number($complement) + number($hours) + 
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))	
		  
	          let $rminutes := 
		  if (string-length(string(
			(number($minutes)+
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60)) = 2) 
		  then (string(
			(number($minutes)+
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60))
		  else concat("0",
			string(
			(number($minutes)+
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60))

			
	          return concat($rhours, ":", $rminutes, ":", $seconds)
	     else 
	     
	     if (substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() = 
				index-of($format-tokens, "Z")]]),1,1)='-')
	     then	
		let $complement := 
		  if (number($minutes)-number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2)) < 0) 		  
		  then -1 
		  else 0
	
		let $rhours :=
		     if( ((number($complement) + number($hours) -
			number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24) >= 0 )
		     then
		  	if (string-length(string(
		  	    (number($complement) + number($hours) -
	                          number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24)) = 2)
		   	then (string(
			  (number($complement) + number($hours) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))
		  	else concat("0",
		  	  string(
			    (number($complement) + number($hours) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))
		     else
		  	if (string-length(string(
		  	    (24 + number($complement) + number($hours) -
	                          number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24)) = 2)
		   	then (string(
			  (24 + number($complement) + number($hours) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))
		  	else concat("0",
		  	  string(
			    (24 + number($complement) + -(number($hours) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2)))) mod 24))
		
		let $rminutes := 
		     if( ((number($minutes) -
			number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60) >= 0 )
		     then
		  	if (string-length(string(
		  	    (number($minutes) -
	                          number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60)) = 2)
		   	then (string(
			  (number($minutes) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60))
		  	else concat("0",
		  	  string(
			    (number($minutes) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60))
		     else
		  	if (string-length(string(
		  	    (60 - -(number($minutes) -
	                          number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2)))) mod 60)) = 2)
		   	then (string(
			  (60 - -(number($minutes) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2)))) mod 60))
		  	else concat("0",
		  	  string(
			    (60 - -(number($minutes) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2)))) mod 60))

		return concat($rhours, ":", $rminutes, ":", $seconds)
	     else ()
	else	


	if (count(index-of($format-tokens, "z")) != 0) 
	then if (substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),1,1)='+')
	     then let $complement := 
		  if (number($minutes)+number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2)) > 59) 		  then 1 
		  else 0

		let $rhours := 
		  if (string-length(string(
			(number($complement) + number($hours) + 
	                        number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24)) = 2) 
		  then (string(
			(number($complement) + number($hours) + 
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))
		  else concat("0",
			string(
			(number($complement) + number($hours) + 
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))	
		  
	          let $rminutes := 
		  if (string-length(string(
			(number($minutes)+
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60)) = 2) 
		  then (string(
			(number($minutes)+
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60))
		  else concat("0",
			string(
			(number($minutes)+
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60))

			
	          return concat($rhours, ":", $rminutes, ":", $seconds)
	     else 
	     
	     if (substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),1,1)='-')
	     then	
		let $complement := 
		  if (number($minutes)-number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2)) < 0) 		  then -1 
		  else 0
	
		let $rhours :=
		     if( ((number($complement) + number($hours) -
			number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24) >= 0 )
		     then
		  	if (string-length(string(
		  	    (number($complement) + number($hours) -
	                          number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24)) = 2)
		   	then (string(
			  (number($complement) + number($hours) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))
		  	else concat("0",
		  	  string(
			    (number($complement) + number($hours) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))
		     else
		  	if (string-length(string(
		  	    (24 + number($complement) + number($hours) -
	                          number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24)) = 2)
		   	then (string(
			  (24 + number($complement) + number($hours) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))
		  	else concat("0",
		  	  string(
			    (24 + number($complement) + -(number($hours) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2)))) mod 24))
		
		let $rminutes := 
		     if( ((number($minutes) -
			number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60) >= 0 )
		     then
		  	if (string-length(string(
		  	    (number($minutes) -
	                          number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60)) = 2)
		   	then (string(
			  (number($minutes) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60))
		  	else concat("0",
		  	  string(
			    (number($minutes) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60))
		     else
		  	if (string-length(string(
		  	    (60 - -(number($minutes) -
	                          number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2)))) mod 60)) = 2)
		   	then (string(
			  (60 - -(number($minutes) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2)))) mod 60))
		  	else concat("0",
		  	  string(
			    (60 - -(number($minutes) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2)))) mod 60))

		return concat($rhours, ":", $rminutes, ":", $seconds)
	     else ()
	else
	 concat($hours, ":", $minutes, ":", $seconds)
	
	return 
	
	normalization:check-time($result)
	else()

};

(:~
 : Converts a given string representation of a dateTime value into a dateTime representation 
 : valid according to the corresponding XML Schema type.
 :
 :
 : @param $sd The string representation for the dateTime.
 : @param $format An optional parameter denoting the format used to represent the dateTime in the string, according to a sequence 
 : of conversion specifications. In the format string, a conversion specification is introduced by '%', usually followed by a single 
 : letter or 'O' or 'E' and then a single letter. Any character in the format string that is not part of a conversion specification 
 : is interpreted literally, and the string '%%' gives '%'. The supported conversion specifications are as follows:
 :
 : <pre>
 : '%b' Abbreviated month name in the current locale.<br/>
 : '%B' Full month name in the current locale.<br/>
 : '%c' Date and time, locale-specific.<br/>
 : '%C' Century (00-99): the integer part of the year divided by 100.<br/>
 : '%d' Day of the month as decimal number (01-31).<br/>
 : '%H' Hours as decimal number (00-23).<br/>
 : '%I' Hours as decimal number (01-12).<br/>
 : '%j' Day of year as decimal number (001-366).<br/>
 : '%m' Month as decimal number (01-12).<br/>
 : '%M' Minute as decimal number (00-59).<br/>
 : '%p' AM/PM indicator in the locale. Used in conjunction with '%I' and *not* with '%H'.<br/>
 : '%S' Second as decimal number (00-61), allowing for up to two leap-seconds.<br/>
 : '%x' Date, locale-specific.<br/>
 : '%X' Time, locale-specific.<br/>
 : '%y' Year without century (00-99).<br/>
 : '%Y' Year with century.<br/>
 : '%z' Offset from Greenwich, so '-0900' is 9 hours west of Greenwich.<br/>
 : '%Z' Time zone as a character string.<br/>
 : '%D' Locale-specific date format such as '%m/%d/%y': ISO C99 says it should be that exact format.<br/>
 : '%e' Day of the month as decimal number (1-31), with a leading pace for a single-digit number.<br/>
 : '%F' Equivalent to %Y-%m-%d (the ISO 8601 date format).<br/>
 : '%g' The last two digits of the week-based year (see '%V').<br/>
 : '%G' The week-based year (see '%V') as a decimal number.<br/>
 : '%h' Equivalent to '%b'.<br/>
 : '%k' The 24-hour clock time with single digits preceded by a blank.<br/>
 : '%l' The 12-hour clock time with single digits preceded by a blank.<br/>
 : '%r' The 12-hour clock time (using the locale's AM or PM).<br/>
 : '%R' Equivalent to '%H:%M'.<br/>
 : '%T' Equivalent to '%H:%M:%S'.<br/>
 :</pre>
 :
 : @return The dateTime value resulting from the conversion.
 : @example test/Queries/data-cleaning/normalization/to-dateTime.xq
 :)
declare function normalization:to-dateTime ( $sd as xs:string, $format as xs:string? ) as xs:string {
  let $timezoneDict := normalization:timeZone-dictionary()
  let $monthDict := normalization:month-dictionary()
  let $format-string := replace(replace(replace ($format, '%R', '%H:%M'), '%T', '%H:%M:%S'), '%F', '%Y-%m-%d')  
  let $format-tokens := tokenize($format-string, "[ %\-/:\.]+")[position()>1]  
  let $sdt := 
 	if (contains($sd, ":") or contains($sd, ".") or contains($sd, " ") or contains($sd, "-") 
		or contains($sd, "/"))
 	then tokenize ($sd, "[ \-/:\.]+")
 	else ()
  let $sdtok :=  
    	if ((count(index-of($format-tokens, "z")) != 0) and (not(contains($sdt[last()], "+"))))
          then ($sdt[position() != last()], concat("-", $sdt[position() = last()]))
          else $sdt
  let $sd-tokens :=
    for $a in $sdtok
       return
  	if (matches($a, "[0-9][0-9][A-Za-z]+[0-9][0-9]+"))
          then (let $ydtoken := tokenize(replace($a, "[A-Za-z]", " "), " ")
	     let $ft := $ydtoken[position()=1]
	     let $lt := $ydtoken[last()]
	     let $mtoken := replace($a, "[0-9]", "") return ($ft, $mtoken, $lt))
          else $a
  let $timeFormat := tokenize($format, "[ :\.\-]")[position()>1]
  let $dateFormat := tokenize($format, "[ :\.\-]")[position()=1]
   return
 if (count($sd-tokens)>1) 
	then  	
		(:Date:)
		let $year := 
			if (count(index-of($format-tokens, "F")) != 0) then string($sd-tokens[position() = 1])
			else	
			
			if (count(index-of($format-tokens, "D")) != 0) then concat("19", string($sd-tokens[position() = 3]))
			else

			if (count(index-of($format-tokens, "Y")) != 0)
			then string($sd-tokens[position() = index-of($format-tokens, "Y")]) else 
				
			if (count(index-of($format-tokens, "y")) != 0)
			then 
			  if(count(index-of($format-tokens, "C")) !=0)
			  then concat(string(number(string($sd-tokens[position() = index-of($format-tokens, "C")]))-1), string($sd-tokens[position() = index-of($format-tokens, "y")]))

			  else 
			   concat("19", string($sd-tokens[position() = index-of($format-tokens, "y")]))

			else "YND"

		let $month := 
			if (count(index-of($format-tokens, "h")) != 0)
			then string($monthDict//month[abrv/text() = $sd-tokens[position() = index-of($format-tokens, "h")]]/@value) else
			
			if (count(index-of($format-tokens, "b")) != 0)
			then string($monthDict//month[abrv/text() = $sd-tokens[position() = index-of($format-tokens, "b")]]/@value)
			else 
			
			if (count(index-of($format-tokens, "B")) != 0)
			then string($monthDict//month[lower-case(@name) = 
				lower-case($sd-tokens[position() = index-of($format-tokens, "B")])]/@value)
			   
			else 

			if (count(index-of($format-tokens, "F")) != 0)
			then string($sd-tokens[position() = 2])	
			else 
			
			if (count(index-of($format-tokens, "D")) != 0) then string($sd-tokens[position() = 1])
			else

			if (count(index-of($format-tokens, "m")) != 0)
			then string($sd-tokens[position() = index-of($format-tokens, "m")])
			
			else "MND"

	      	let $day := 
			if (count(index-of($format-tokens, "F")) != 0) 
			then string($sd-tokens[position() = 3]) else 
			
			if (count(index-of($format-tokens, "D")) != 0) then string($sd-tokens[position() = 2])
			else
  
			if (count(index-of($format-tokens, "d")) != 0) 
			then $sd-tokens[position() = index-of($format-tokens, "d")] else

			if (count(index-of($format-tokens, "e")) != 0)
			then concat("0", string($sd-tokens[position() = index-of($format-tokens, "e")]))
			else "DND"
	
		(:Time:)
		let $hours := 
			if (count(index-of($format-tokens, "T")) != 0) then string($sd-tokens[position() = 1])
			else	
			
			if (count(index-of($format-tokens, "X")) != 0) then substring(string(current-time()),1,2)
			else

			if (count(index-of($format-tokens, "R")) != 0) then string($sd-tokens[position() = 1])
			else

			if (count(index-of($format-tokens, "H")) != 0)
			then string($sd-tokens[position() = index-of($format-tokens, "H")]) else 
		
			if (count(index-of($format-tokens, "k")) != 0)
			then if(string-length(string($sd-tokens[position() = index-of($format-tokens, "k")]))=1)
			     then concat("0", string($sd-tokens[position() = index-of($format-tokens, "k")]))
			     else string($sd-tokens[position() = index-of($format-tokens, "k")])  
			else	
			
			if (count(index-of($format-tokens, "r")) != 0)
			then 
			  if(lower-case(string($sd-tokens[position() = 4]))="am")
			  then string($sd-tokens[position() = 1])
			  else if(lower-case(string($sd-tokens[position() = 4]))="pm")
			       then if(string($sd-tokens[position() = 1])="12") then 12
				  else string(number(string($sd-tokens[position() = 1]))+12)
			       else()
			
			else

			if (count(index-of($format-tokens, "I")) != 0)
			then 
			  if(count(index-of($format-tokens, "p")) !=0)
			  then if (lower-case(string($sd-tokens[position() = 
					index-of($format-tokens, "p")]))="am")
			       then string($sd-tokens[position() = index-of($format-tokens, "I")]) 
			       else if (lower-case(string($sd-tokens[position() = 
					index-of($format-tokens, "p")]))="pm")
				  then if (string($sd-tokens[position() = index-of($format-tokens, "I")])="12")
				       then "12"
				       else string(number(string($sd-tokens[position() = index-of($format-tokens, "I")]))+12)
				  else()
			  else()
			
			else
			if (count(index-of($format-tokens, "l")) != 0)
			then 
			  if(count(index-of($format-tokens, "p")) !=0)
			  then if (lower-case(string($sd-tokens[position() = 
					index-of($format-tokens, "p")]))="am")
			       then if(string-length(string($sd-tokens[position() = index-of($format-tokens, "l")]))=1)
				  then concat("0", string($sd-tokens[position() = index-of($format-tokens, "l")]))
				  else string($sd-tokens[position() = index-of($format-tokens, "l")])  
				
			       else if (lower-case(string($sd-tokens[position() = index-of($format-tokens, "p")]))="pm")
				  then if (string($sd-tokens[position() = index-of($format-tokens, "l")])="12")
				       then "12"
				       else string(number(string($sd-tokens[position() = index-of($format-tokens, "l")]))+12)
				  else()
			  			
			else ()
			
			
			else "HND"

		let $minutes := 
			
			if (count(index-of($format-tokens, "T")) != 0)
			then string($sd-tokens[position() = 2])	
			else 
			
			if (count(index-of($format-tokens, "X")) != 0) then substring(string(current-time()),4,2)
			else

			if (count(index-of($format-tokens, "R")) != 0) then string($sd-tokens[position() = 2])
			else

			if (count(index-of($format-tokens, "r")) != 0)
			then string($sd-tokens[position() = 2])	
			else 

			if (count(index-of($format-tokens, "M")) != 0)
			then string($sd-tokens[position() = index-of($format-tokens, "M")])
			
			else "MND"

	      	let $seconds := 
			if (count(index-of($format-tokens, "T")) != 0) 
			then string($sd-tokens[position() = 3]) else 
			
			if (count(index-of($format-tokens, "X")) != 0) then substring(string(current-time()),7,2)
			else

			if (count(index-of($format-tokens, "r")) != 0)
			then string($sd-tokens[position() = 3])	
			else 

			if (count(index-of($format-tokens, "R")) != 0) then "00"
			else

			if (count(index-of($format-tokens, "S")) != 0) 
			then $sd-tokens[position() = index-of($format-tokens, "S")] else

			if (count(index-of($format-tokens, "e")) != 0)
			then concat("0", string($sd-tokens[position() = index-of($format-tokens, "e")]))
			else "00"
	
	let $result :=

	if (count(index-of($format-tokens, "Z")) != 0) 
	then
	   if (substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() = index-of($format-tokens, "Z")]]),1,1)='+')
	   then let $complement := 
		  if (number($minutes)+number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
			 index-of($format-tokens, "Z")]]),4,2)) > 59) 		  
		  then 1 
		  else 0

		let $dayscomplement := 
		  if (number($complement) + number($hours) + number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() 			=index-of($format-tokens, "Z")]]),2,2)) >= 24)
		  then 1
		  else 0

		let $monthscomplement :=
		  if(($dayscomplement + number($day) > 28) and (compare($month, '02') = 0) and (number($year) mod 4 != 0))
		  then 1  
		  else 
		    if(($dayscomplement + number($day) > 30) and ((compare($month, '04') = 0) or (compare($month, '06') = 0) or (compare($month, '09') = 0) or (compare($month, '11') = 0)))
		    then 1
		    else 
		      if(($dayscomplement + number($day) > 31) and ((compare($month, '04') = 0) or (compare($month, '01') = 0) or (compare($month, '03') = 0) or (compare($month, '05') = 0) or (compare($month, '07') = 0) or (compare($month, '08') = 0) or (compare($month, '10') = 0) or (compare($month, '12') = 0)))
		      then 1
		      else 
		        if(($dayscomplement + number($day) > 29) and (compare($month, '02') = 0) and (number($year) mod 4 = 0))
		        then 1
		        else 0

		let $ryear := 
		  if ($monthscomplement + number($month) > 12)
		  then string(number($year) + 1)
		  else $year

		let $daywcompl := 
		  if ($monthscomplement = 1)
		  then 1
		  else number($day) + $dayscomplement

		let $monthwcompl :=
		  if($monthscomplement + number($month) <= 12)
		  then number($month) + $monthscomplement		
		  else 1
 
		let $rday := 
		  if (string-length(string($daywcompl)) = 1)
		  then concat ('0', string($daywcompl))
		  else string($daywcompl)

		let $rmonth :=
		  if (string-length(string($monthwcompl)) = 1)
		  then concat ('0', string($monthwcompl))
		  else string($monthwcompl)

		let $rhours := 
		  if (string-length(string(
			(number($complement) + number($hours) + 
	                        number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24)) = 2) 
		  then (string(
			(number($complement) + number($hours) + 
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))
		  else concat("0",
			string(
			(number($complement) + number($hours) + 
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))	
		  
	          let $rminutes := 
		  if (string-length(string(
			(number($minutes)+
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60)) = 2) 
		  then (string(
			(number($minutes)+
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60))
		  else concat("0",
			string(
			(number($minutes)+
			    number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60))

			
	          return concat($ryear, "-", $rmonth, "-", $rday, "T", $rhours, ":", $rminutes, ":", $seconds)
	     else 
	     
	     if (substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() = 
				index-of($format-tokens, "Z")]]),1,1)='-')
	     then	
		let $complement := 
		  if (number($minutes)-number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2)) < 0) 		  
		  then -1 
		  else 0
	
		let $dayscomplement := 
		  if (number($complement) - number($hours) - number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position()=
				 index-of($format-tokens, "Z")]]),2,2)) < 0)
		  then -1
		  else 0

		let $monthcomplement :=
		  if(number($day) + $dayscomplement < 1)
		  then -1
		  else 0
	
		let $yearcomplement :=
		  if(number($month) + $monthcomplement< 1)
		  then -1
		  else 0

		let $daywcompl := 
		  if ($monthcomplement = 0)
		  then number($day) + $dayscomplement 
		  else 
		   if ( (number($month) = 5) or (number($month) = 7) or (number($month) = 10) or (number($month) = 12))
		   then 30
		   else 
		    if((number($month) = 4) or (number($month) = 6) or (number($month) = 9) or (number($month) = 11) or (number($month) = 2) or 			(number($month) = 1) or (number($month) = 8))
		    then 31
		    else 
		      if((number($month) = 3) and (number($year) mod 4 != 0))
		      then 28
		      else 
		        if((number($month) = 3) and (number($year) mod 4 = 0))
		        then 29
		        else number($day) + $dayscomplement
	  	      	
		let $monthwcompl:=
		  if($yearcomplement = 0)
		  then number($month) + $monthcomplement
		  else 12

		let $ryear := 
		  number($year) + $yearcomplement

		let $rday := 
		  if (string-length(string($daywcompl)) = 1)
		  then concat ('0', string($daywcompl))
		  else string($daywcompl)

		let $rmonth :=
		  if (string-length(string($monthwcompl)) = 1)
		  then concat ('0', string($monthwcompl))
		  else string($monthwcompl)

		let $rhours :=
		     if( ((number($complement) + number($hours) -
			number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24) >= 0 )
		     then
		  	if (string-length(string(
		  	    (number($complement) + number($hours) -
	                          number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24)) = 2)
		   	then (string(
			  (number($complement) + number($hours) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))
		  	else concat("0",
		  	  string(
			    (number($complement) + number($hours) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))
		     else
		  	if (string-length(string(
		  	    (24 + number($complement) + number($hours) -
	                          number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24)) = 2)
		   	then (string(
			  (24 + number($complement) + number($hours) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2))) mod 24))
		  	else concat("0",
		  	  string(
			    (24 + number($complement) + -(number($hours) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2)))) mod 24))
		
		let $rminutes := 
		     if( ((number($minutes) -
			number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60) >= 0 )
		     then
		  	if (string-length(string(
		  	    (number($minutes) -
	                          number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60)) = 2)
		   	then (string(
			  (number($minutes) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60))
		  	else concat("0",
		  	  string(
			    (number($minutes) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2))) mod 60))
		     else
		  	if (string-length(string(
		  	    (60 - -(number($minutes) -
	                          number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2)))) mod 60)) = 2)
		   	then (string(
			  (60 - -(number($minutes) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),4,2)))) mod 60))
		  	else concat("0",
		  	  string(
			    (60 - -(number($minutes) - 
			      number(substring(string($timezoneDict//timeZone/@value[../@name=$sd-tokens[position() =
				 index-of($format-tokens, "Z")]]),2,2)))) mod 60))

		return concat($ryear, "-", $rmonth, "-", $rday, "T", $rhours, ":", $rminutes, ":", $seconds)
	     else ()
	else	


	if (count(index-of($format-tokens, "z")) != 0) 
	then if (substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),1,1)='+')
	     then let $complement := 
		  if (number($minutes)+number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2)) > 59) 		  	  then 1 
		  else 0

		let $dayscomplement := 
		  if (number($complement) + number($hours) + number(substring(string($sd-tokens[position() = 					index-of($format-tokens, "z")]),2,2)) >= 24)
		  then 1
		  else 0

		let $monthscomplement :=
		  if(($dayscomplement + number($day) > 28) and (compare($month, '02') = 0) and (number($year) mod 4 != 0))
		  then 1  
		  else 
		    if(($dayscomplement + number($day) > 30) and ((compare($month, '04') = 0) or (compare($month, '06') = 0) or (compare($month, '09') = 0) or (compare($month, '11') = 0)))
		    then 1
		    else 
		      if(($dayscomplement + number($day) > 31) and ((compare($month, '04') = 0) or (compare($month, '01') = 0) or (compare($month, '03') = 0) or (compare($month, '05') = 0) or (compare($month, '07') = 0) or (compare($month, '08') = 0) or (compare($month, '10') = 0) or (compare($month, '12') = 0)))
		      then 1
		      else 
		        if(($dayscomplement + number($day) > 29) and (compare($month, '02') = 0) and (number($year) mod 4 = 0))
		        then 1
		        else 0

		let $ryear := 
		  if ($monthscomplement + number($month) > 12)
		  then string(number($year) + 1)
		  else $year

		let $daywcompl := 
		  if ($monthscomplement = 1)
		  then 1
		  else number($day) + $dayscomplement

		let $monthwcompl :=
		  if($monthscomplement + number($month) <= 12)
		  then number($month) + $monthscomplement		
		  else 1
 
		let $rday := 
		  if (string-length(string($daywcompl)) = 1)
		  then concat ('0', string($daywcompl))
		  else string($daywcompl)

		let $rmonth :=
		  if (string-length(string($monthwcompl)) = 1)
		  then concat ('0', string($monthwcompl))
		  else string($monthwcompl)

		let $rhours := 
		  if (string-length(string(
			(number($complement) + number($hours) + 
	                        number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24)) = 2) 
		  then (string(
			(number($complement) + number($hours) + 
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))
		  else concat("0",
			string(
			(number($complement) + number($hours) + 
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))	
		  
	          let $rminutes := 
		  if (string-length(string(
			(number($minutes)+
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60)) = 2) 
		  then (string(
			(number($minutes)+
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60))
		  else concat("0",
			string(
			(number($minutes)+
			    number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60))

			
	          return concat($ryear, "-", $rmonth, "-", $rday, "T", $rhours, ":", $rminutes, ":", $seconds)
	     else 
	     
	     if (substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),1,1)='-')
	     then	
		let $complement := 
		  if (number($minutes)-number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2)) < 0) 		  	  then -1 
		  else 0
	
		let $dayscomplement := 
		  if (number($complement) - number($hours) - number(substring(string($sd-tokens[position() = 					index-of($format-tokens, "z")]),2,2)) < 0)
		  then -1
		  else 0

		let $monthcomplement :=
		  if(number($day) + $dayscomplement< 1)
		  then -1
		  else 0
	
		let $yearcomplement :=
		  if(number($month) + $monthcomplement< 1)
		  then -1
		  else 0

		let $daywcompl := 
		  if ($monthcomplement = 0)
		  then number($day) + $dayscomplement 
		  else 
		   if ( (number($month) = 5) or (number($month) = 7) or (number($month) = 10) or (number($month) = 12))
		   then 30
		   else 
		    if((number($month) = 4) or (number($month) = 6) or (number($month) = 9) or (number($month) = 11) or (number($month) = 2) or 			(number($month) = 1) or (number($month) = 8))
		    then 31
		    else 
		      if((number($month) = 3) and (number($year) mod 4 != 0))
		      then 28
		      else 
		        if((number($month) = 3) and (number($year) mod 4 = 0))
		        then 29
		        else number($day) + $dayscomplement
	  	      	
		let $monthwcompl:=
		  if($yearcomplement = 0)
		  then number($month) + $monthcomplement
		  else 12

		let $ryear := 
		  number($year) + $yearcomplement

		let $rday := 
		  if (string-length(string($daywcompl)) = 1)
		  then concat ('0', string($daywcompl))
		  else string($daywcompl)

		let $rmonth :=
		  if (string-length(string($monthwcompl)) = 1)
		  then concat ('0', string($monthwcompl))
		  else string($monthwcompl)

		let $rhours :=
		     if( ((number($complement) + number($hours) -
			number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24) >= 0 )
		     then
		  	if (string-length(string(
		  	    (number($complement) + number($hours) -
	                          number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24)) = 2)
		   	then (string(
			  (number($complement) + number($hours) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))
		  	else concat("0",
		  	  string(
			    (number($complement) + number($hours) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))
		     else
		  	if (string-length(string(
		  	    (24 + number($complement) + number($hours) -
	                          number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24)) = 2)
		   	then (string(
			  (24 + number($complement) + number($hours) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2))) mod 24))
		  	else concat("0",
		  	  string(
			    (24 + number($complement) + -(number($hours) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2)))) mod 24))
		
		let $rminutes := 
		     if( ((number($minutes) -
			number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60) >= 0 )
		     then
		  	if (string-length(string(
		  	    (number($minutes) -
	                          number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60)) = 2)
		   	then (string(
			  (number($minutes) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60))
		  	else concat("0",
		  	  string(
			    (number($minutes) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2))) mod 60))
		     else
		  	if (string-length(string(
		  	    (60 - -(number($minutes) -
	                          number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2)))) mod 60)) = 2)
		   	then (string(
			  (60 - -(number($minutes) - 
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),4,2)))) mod 60))
		  	else concat("0",
		  	  string(
			    (60 - -(number($minutes) -
			      number(substring(string($sd-tokens[position() = index-of($format-tokens, "z")]),2,2)))) mod 60))

		return concat($ryear, "-", $rmonth, "-", $rday, "T", $rhours, ":", $rminutes, ":", $seconds)
	     else ()
	else
	 concat($year, "-", $month, "-", $day, "T", $hours, ":", $minutes, ":", $seconds)

	return 
	normalization:check-dateTime($result)
	else()
};

(:~
 : Uses an address normalization Web service to convert a postal address given as input into a 
 : cannonical representation format.
 :
 : 
 : @param $addr A sequence of strings encoding an address, where each string in the sequence corresponds to a different component (e.g., street, city, country, etc.) of the address.
 : @return A sequence of strings with the address encoded in a cannonical format, where each string in the sequence corresponds to a different component (e.g., street, city, country, etc.) of the address.
 : @example test/Queries/data-cleaning/normalization/normalize-address.xq
 :)
declare %an:nondeterministic  function normalization:normalize-address ( $addr as xs:string* ) as xs:string* {

  let $id   := ""
  let $url  := "http://where.yahooapis.com/geocode?q="
  let $q2   := string-join(for $i in $addr return translate($i," ","+"),",")
  let $call := concat($url,$q2,"&amp;appid=",$id)
  let $doc  := http:get-node($call)[2]
  return distinct-values( (if (string-length($doc//xs:string(*:country)) > 0) then ($doc//xs:string(*:country)) else (),
                          if (string-length($doc//xs:string(*:state)) > 0) then ($doc//xs:string(*:state)) else (),
                          if (string-length($doc//xs:string(*:county)) > 0) then ($doc//xs:string(*:county)) else (),
                          if (string-length($doc//xs:string(*:city)) > 0) then ($doc//xs:string(*:city)) else (),
			  if (string-length($doc//xs:string(*:neighborhood)) > 0) then ($doc//xs:string(*:neighborhood)) else (),
                          if (string-length($doc//xs:string(*:street)) > 0) then ($doc//xs:string(*:street)) else (),
                          if (string-length($doc//xs:string(*:house)) > 0) then ($doc//xs:string(*:house)) else () ) )
};

(:~
 : Uses an phone number normalization Web service to convert a phone number given as input into a 
 : cannonical representation.
 : 
 : @param $phone A strings encoding a phone number.
 : @return A strings with the phone number encoded in a cannonical format.
 :
 : <br/><br/><b> Attention : This function is still not implemented. </b> <br/>
 :
 :)
declare function normalization:normalize-phone ( $addr as xs:string* ) as xs:string* {
 ()
};

(:~
 : Internal auxiliary function that returns an XML representation for a dictionary that contains the 
 : time-shift value associated to different time-zone abbreviations.
 :)
declare %private function normalization:timeZone-dictionary() as element(){
	let $result :=
	<dictionary>
		<timeZone name="A" value="+0100"/>
		<timeZone name="ADT" value="-0300"/>
		<timeZone name="AFT" value="+0430"/>
		<timeZone name="AKDT" value="-0800"/>
		<timeZone name="AKST" value="-0900"/>
		<timeZone name="ALMT" value="+0600"/>
		<timeZone name="AMST" value="+0500"/>
		<!--<timeZone name="AMST" value="-0300"/>-->
		<timeZone name="AMT" value="+0400"/>
		<!--<timeZone name="AMT" value="-0400"/>-->
		<timeZone name="ANAST" value="+1200"/>
		<timeZone name="ANAT" value="+1200"/>
		<timeZone name="AQTT" value="+0500"/>
		<timeZone name="ART" value="-0300"/>
		<timeZone name="AST" value="-0400"/>
		<timeZone name="AZOST" value="+0000"/>
		<timeZone name="AZOT" value="-0100"/>
		<timeZone name="AZST" value="+0500"/>
		<timeZone name="AZT" value="+0400"/>
		<timeZone name="B" value="+0200"/>
		<timeZone name="BNT" value="+0800"/>
		<timeZone name="BOT" value="-0400"/>
		<timeZone name="BRST" value="-0200"/>
		<timeZone name="BRT" value="-0300"/>
		<!--<timeZone name="BST" value="+0600"/>-->
		<timeZone name="BST" value="+0100"/>
		<timeZone name="BTT" value="+0600"/>
		<timeZone name="C" value="+0300"/>
		<timeZone name="CAST" value="+0800"/>
		<timeZone name="CAT" value="+0200"/>
		<timeZone name="CCT" value="+0630"/>
		<!--<timeZone name="CDT" value="+1030"/>-->
		<!--<timeZone name="CDT" value="-0400"/>-->
		<timeZone name="CDT" value="-0500"/>
		<timeZone name="CEST" value="+0200"/>
		<timeZone name="CET" value="+0100"/>
		<timeZone name="CHADT" value="+1345"/>
		<timeZone name="CHAST" value="+1245"/>
		<timeZone name="CKT" value="-1000"/>
		<timeZone name="CLST" value="-0300"/>
		<timeZone name="CLT" value="-0400"/>
		<timeZone name="COT" value="-0500"/>
		<!--<timeZone name="CST" value="+0800"/>-->
		<!--<timeZone name="CST" value="+0930"/>-->
		<!--<timeZone name="CST" value="-0600"/>-->
		<!--<timeZone name="CST" value="-0500"/>-->
		<timeZone name="CST" value="-0600"/>
		<timeZone name="CVT" value="-0100"/>
		<timeZone name="CXT" value="+0700"/>
		<timeZone name="ChST" value="+1000"/>
		<timeZone name="D" value="+0400"/>
		<timeZone name="DAVT" value="+0700"/>
		<timeZone name="E" value=""/>
		<timeZone name="EASST" value="-0500"/>
		<timeZone name="EAST" value="-0600"/>
		<timeZone name="EAT" value="+0300"/>
		<timeZone name="ECT" value="-0500"/>
		<!--<timeZone name="EDT" value="+1100"/>-->
		<timeZone name="EDT" value="-0400"/>
		<timeZone name="EEST" value="+0300"/>
		<timeZone name="EET" value="+0200"/>
		<timeZone name="EGST" value="+0000"/>
		<timeZone name="EGT" value="-0100"/>
		<timeZone name="EST" value="+1000"/>
		<!--<timeZone name="EST" value="-0500"/>-->
		<timeZone name="ET" value="-0500"/>
		<timeZone name="F" value="+0600"/>
		<timeZone name="FJST" value="+1300"/>
		<timeZone name="FJT" value="+1200"/>
		<timeZone name="FKST" value="-0300"/>
		<timeZone name="FKT" value="-0400"/>
		<timeZone name="FNT" value="-0200"/>
		<timeZone name="G" value="+0700"/>
		<timeZone name="GALT" value="-0600"/>
		<timeZone name="GAMT" value="-0900"/>
		<timeZone name="GET" value="+0400"/>
		<timeZone name="GFT" value="-0300"/>
		<timeZone name="GILT" value="+1200"/>
		<timeZone name="GMT" value="+0000"/>
		<timeZone name="GST" value="+0400"/>
		<timeZone name="GYT" value="-0400"/>
		<timeZone name="H" value="+0800"/>
		<timeZone name="HAA" value="-0300"/>
		<timeZone name="HAC" value="-0500"/>
		<timeZone name="HADT" value="-0900"/>
		<timeZone name="HAE" value="-0400"/>
		<timeZone name="HAP" value="-0700"/>
		<timeZone name="HAR" value="-0600"/>
		<timeZone name="HAST" value="-1000"/>
		<timeZone name="HAT" value="-0230"/>
		<timeZone name="HAY" value="-0800"/>
		<timeZone name="HKT" value="+0800"/>
		<timeZone name="HLV" value="-0430"/>
		<timeZone name="HNA" value="-0400"/>
		<timeZone name="HNC" value="-0600"/>
		<timeZone name="HNE" value="-0500"/>
		<timeZone name="HNP" value="-0800"/>
		<timeZone name="HNR" value="-0700"/>
		<timeZone name="HNT" value="-0330"/>
		<timeZone name="I" value="+0900"/>
		<timeZone name="ICT" value="+0700"/>
		<timeZone name="IDT" value="+0300"/>
		<timeZone name="IOT" value="+0600"/>
		<timeZone name="IRDT" value="+0430"/>
		<timeZone name="IRKST" value="+0900"/>
		<timeZone name="IRKT" value="+0800"/>
		<timeZone name="IRST" value="+0330"/>
		<!--<timeZone name="IST" value="+0200"/>-->
		<timeZone name="IST" value="+0530"/>
		<!--<timeZone name="IST" value="+0100"/>-->
		<timeZone name="JST" value="+0900"/>
		<timeZone name="K" value="+1000"/>
		<timeZone name="KGT" value="+0600"/>
		<timeZone name="KRAST" value="+0800"/>
		<timeZone name="KRAT" value="+0700"/>
		<timeZone name="KST" value="+0900"/>
		<timeZone name="KUYT" value="+0400"/>
		<timeZone name="L" value="+1100"/>
		<timeZone name="LHDT" value="+1100"/>
		<timeZone name="LHST" value="+10:30"/>
		<timeZone name="LINT" value="+1400"/>
		<timeZone name="M" value="+1200"/>
		<timeZone name="MAGST" value="+1200"/>
		<timeZone name="MAGT" value="+1100"/>
		<timeZone name="MART" value="-0930"/>
		<timeZone name="MAWT" value="+0500"/>
		<timeZone name="MDT" value="-0600"/>
		<timeZone name="MHT" value="+1200"/>
		<timeZone name="MMT" value="+0630"/>
		<timeZone name="MSD" value="+0400"/>
		<timeZone name="MSK" value="+0300"/>
		<timeZone name="MST" value="-0700"/>
		<timeZone name="MUT" value="+0400"/>
		<timeZone name="MVT" value="+0500"/>
		<timeZone name="MYT" value="+0800"/>
		<timeZone name="N" value="-0100"/>
		<timeZone name="NCT" value="+1100"/>
		<timeZone name="NDT" value="-0230"/>
		<timeZone name="NFT" value="+1130"/>
		<timeZone name="NOVST" value="+0700"/>
		<timeZone name="NOVT" value="+0600"/>
		<timeZone name="NPT" value="+0545"/>
		<timeZone name="NST" value="-0330"/>
		<timeZone name="NUT" value="-1100"/>
		<timeZone name="NZDT" value="+1300"/>
		<timeZone name="NZST" value="+1200"/>
		<timeZone name="O" value="-0200"/>
		<timeZone name="OMSST" value="+0700"/>
		<timeZone name="OMST" value="+0600"/>
		<timeZone name="P" value="-0300"/>
		<timeZone name="PDT" value="-0700"/>
		<timeZone name="PET" value="-0500"/>
		<timeZone name="PETST" value="+1200"/>
		<timeZone name="PETT" value="+1200"/>
		<timeZone name="PGT" value="+1000"/>
		<timeZone name="PHOT" value="+1300"/>
		<timeZone name="PHT" value="+0800"/>
		<timeZone name="PKT" value="+0500"/>
		<timeZone name="PMDT" value="-0200"/>
		<timeZone name="PMST" value="-0300"/>
		<timeZone name="PONT" value="+1100"/>
		<timeZone name="PST" value="-0800"/>
		<timeZone name="PT" value="-0800"/>
		<timeZone name="PWT" value="+0900"/>
		<timeZone name="PYST" value="-0300"/>
		<timeZone name="PYT" value="-0400"/>
		<timeZone name="Q" value="-0400"/>
		<timeZone name="R" value="-0500"/>
		<timeZone name="RET" value="+0400"/>
		<timeZone name="S" value="-0600"/>
		<timeZone name="SAMT" value="+0400"/>
		<timeZone name="SAST" value="+0200"/>
		<timeZone name="SBT" value="+1100"/>
		<timeZone name="SCT" value="+0400"/>
		<timeZone name="SGT" value="+0800"/>
		<timeZone name="SRT" value="-0300"/>
		<timeZone name="SST" value="-1100"/>
		<timeZone name="T" value="-0700"/>
		<timeZone name="TAHT" value="-1000"/>
		<timeZone name="TFT" value="+0500"/>
		<timeZone name="TJT" value="+0500"/>
		<timeZone name="TKT" value="-1000"/>
		<timeZone name="TLT" value="+0900"/>
		<timeZone name="TMT" value="+0500"/>
		<timeZone name="TVT" value="+1200"/>
		<timeZone name="U" value="-0800"/>
		<timeZone name="ULAT" value="+0800"/>
		<timeZone name="UTC" value="+0000"/>
		<timeZone name="UYST" value="-0200"/>
		<timeZone name="UYT" value="-0300"/>
		<timeZone name="UZT" value="+0500"/>
		<timeZone name="V" value="-0900"/>
		<timeZone name="VET" value="-0430"/>
		<timeZone name="VLAST" value="+1100"/>
		<timeZone name="VLAT" value="+1000"/>
		<timeZone name="VUT" value="+1100"/>
		<timeZone name="W" value="-1000"/>
		<timeZone name="WAST" value="+0200"/>
		<timeZone name="WAT" value="+0100"/>
		<timeZone name="WDT" value="+0900"/>
		<timeZone name="WEST" value="+0100"/>
		<timeZone name="WET" value="+0000"/>
		<timeZone name="WFT" value="+1200"/>
		<timeZone name="WGST" value="-0200"/>
		<timeZone name="WGT" value="-0300"/>
		<timeZone name="WIB" value="+0700"/>
		<timeZone name="WIT" value="+0900"/>
		<timeZone name="WITA" value="+0800"/>
		<!--<timeZone name="WST" value="+0100"/>-->
		<!--<timeZone name="WST" value="-1100"/>-->
		<timeZone name="WST" value="+0800"/>
		<timeZone name="WT" value="+0000"/>
		<timeZone name="X" value="-1100"/>
		<timeZone name="Y" value="-1200"/>
		<timeZone name="YAKST" value="+1000"/>
		<timeZone name="YAKT" value="+0900"/>
		<timeZone name="YAPT" value="+1000"/>
		<timeZone name="YEKST" value="+0600"/>
		<timeZone name="YEKY" value="+0500"/>
		<timeZone name="Z" value="+0000"/>
	</dictionary>
return $result
};

(:~
 : Internal auxiliary function that returns an XML representation for a dictionary that contains a 
 : numeric value associated to different month name abbreviations.
 :)
declare %private function normalization:month-dictionary() as element(){
let $dictionary :=
<dictionary>
	<month name="January" value="01">
		<abrv>Jan</abrv>
		<abrv>jan</abrv>
		<abrv>JAN</abrv>
	</month>
	<month name="February" value="02">
		<abrv>Feb</abrv>
		<abrv>feb</abrv>
		<abrv>FEB</abrv>
	</month>
	<month name="March" value="03">
		<abrv>Mar</abrv>
		<abrv>mar</abrv>
		<abrv>MAR</abrv>
	</month>
	<month name="April" value="04">
		<abrv>Apr</abrv>
		<abrv>apr</abrv>
		<abrv>APR</abrv>
	</month>
	<month name="May" value="05">
		<abrv>MAY</abrv>
		<abrv>may</abrv>
	</month>
	<month name="June" value="06">
		<abrv>Jun</abrv>
		<abrv>jun</abrv>
		<abrv>JUN</abrv>
	</month>
	<month name="July" value="07">
		<abrv>Jul</abrv>
		<abrv>jul</abrv>
		<abrv>JUL</abrv>
	</month>
	<month name="August" value="08">
		<abrv>aug</abrv>
		<abrv>Aug</abrv>
		<abrv>AUG</abrv>
	</month>
	<month name="September" value="09">
		<abrv>sep</abrv>
		<abrv>Sep</abrv>
		<abrv>SEP</abrv>
	</month>
	<month name="October" value="10">
		<abrv>oct</abrv>
		<abrv>OCT</abrv>
		<abrv>Oct</abrv>
	</month>
	<month name="November" value="11">
		<abrv>nov</abrv>
		<abrv>Nov</abrv>
		<abrv>NOV</abrv>
	</month>
	<month name="December" value="12">
		<abrv>dec</abrv>
		<abrv>Dec</abrv>
		<abrv>DEC</abrv>
	</month>
</dictionary>
return $dictionary
};

(:~
 : Internal auxiliary function that checks if a string is in xs:dateTime format
 :
 :
 : @param $dateTime The string representation for the dateTime.
 : @return The dateTime string if it represents the xs:dateTime format.
 :)
declare %private function normalization:check-dateTime($dateTime as xs:string) as xs:string{
 concat(string(year-from-dateTime(xs:dateTime($dateTime))), substring($dateTime,5))
};

(:~
 : Internal auxiliary function that checks if a string is in xs:date format
 :
 :
 : @param $dateTime The string representation for the date.
 : @return The date string if it represents the xs:date format.
 :)
declare %private function normalization:check-date($date as xs:string) as xs:string{
 concat(string(year-from-date(xs:date($date))), substring($date,5))
};

(:~
 : Internal auxiliary function that checks if a string is in xs:time format
 :
 :
 : @param $dateTime The string representation for the time.
 : @return The time string if it represents the xs:time format.
 :)
declare %private function normalization:check-time($Time as xs:string) as xs:string{
 if(string(hours-from-time(xs:time($Time))))
 then $Time
 else()
};


