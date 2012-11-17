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
 : This library module provides data conversion functions for processing calendar dates, 
 : temporal values, currency values, units of measurement, location names and postal addresses.
 :
 : The logic contained in this module is not specific to any particular XQuery implementation.
 :
 : @author Bruno Martins and Diogo Simões
 : @project data processing/data cleaning
 :)

module namespace conversion = "http://www.zorba-xquery.com/modules/data-cleaning/conversion";

declare namespace exref = "http://www.ecb.int/vocabulary/2002-08-01/eurofxref";
declare namespace an = "http://www.zorba-xquery.com/annotations";

import schema namespace wp = 'http://api.whitepages.com/schema/';

import module namespace http = "http://www.zorba-xquery.com/modules/http-client";

import module namespace reflection = "http://www.zorba-xquery.com/modules/reflection";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "2.0";

(:~ The key to be used when accessing the White Pages Web service :)
declare variable $conversion:key := "06ea2f21cc15602b6a3e242e3225a81a";

(:~
 : Uses a White-pages Web service to discover information about a given name, 
 : returning a sequence of strings for the phone numbers associated to the name.
 :
 :
 : @param $name The name of person or organization.
 : @return A sequence of strings for the phone numbers associated to the name.
 : @example test/Queries/data-cleaning/conversion/phone-from-user.xq
 :)
declare %an:nondeterministic function conversion:phone-from-user ( $name as xs:string) as xs:string*{
	let $name-value := replace($name, " ", "%20")
	let $url := concat("http://api.whitepages.com/find_person/1.0/?name=",$name-value,";api_key=",$conversion:key)
	let $doc := http:get-node($url)[2]
	return
    $doc/wp:wp/wp:listings/wp:listing/wp:phonenumbers/wp:phone/wp:fullphone/text()
};

(:~
 : Uses a White-pages Web service to discover information about a given name, 
 : returning a sequence of strings for the addresses associated to the name.
 :
 :
 : @param $name The name of person or organization.
 : @return A sequence of strings for the addresses associated to the name.
 : @example test/Queries/data-cleaning/conversion/address-from-user.xq
 :)
declare %an:nondeterministic function conversion:address-from-user ( $name as xs:string) as xs:string*{
	let $name-value := replace($name, " ", "%20")
	let $url := concat("http://api.whitepages.com/find_person/1.0/?name=",$name-value,";api_key=",$conversion:key)
	let $doc := http:get-node($url)[2]
	for $a in $doc/wp:wp/wp:listings/wp:listing/wp:address
		let $fullstreet := $a/wp:fullstreet/text()
		let $city := $a/wp:city/text()
		let $state := $a/wp:state/text()
		let $country := $a/wp:country/text()
		return concat($fullstreet, ", ", $city, ", ", $state, ", ", $country)
};


(:~
 : Uses a White-pages Web service to discover information about a given phone number, 
 : returning a sequence of strings for the name associated to the phone number.
 :
 :
 : @param $phone-number A string with 10 digits corresponding to the phone number.
 : @return A sequence of strings for the person or organization's name associated to the phone number.
 : @example test/Queries/data-cleaning/conversion/user-from-phone.xq
 :)
declare %an:nondeterministic function conversion:user-from-phone ( $phone-number as xs:string) as xs:string*{
	let $url := concat("http://api.whitepages.com/reverse_phone/1.0/?phone=",$phone-number,";api_key=",$conversion:key)
	let $doc := http:get-node($url)[2]
	return $doc/wp:wp/wp:listings/wp:listing/wp:displayname/text()	
};

(:~
 : Uses a White-pages Web service to discover information about a given phone number, 
 : returning a string for the address associated to the phone number.
 :
 :
 : @param $phone-number A string with 10 digits corresponding to the phone number.
 : @return A string for the addresses associated to the phone number.
 : @example test/Queries/data-cleaning/conversion/address-from-phone.xq
 :)
declare %an:nondeterministic function conversion:address-from-phone ( $phone-number as xs:string) as xs:string*{
	let $url := concat("http://api.whitepages.com/reverse_phone/1.0/?phone=",$phone-number,";api_key=",$conversion:key)
	let $doc := http:get-node($url)[2]
	let $addresses :=
		for $a in $doc/wp:wp/wp:listings/wp:listing/wp:address
			let $fullstreet := $a/wp:fullstreet/text()
		  let $city := $a/wp:city/text()
		  let $state := $a/wp:state/text()
		  let $country := $a/wp:country/text()
			return concat($fullstreet, ", ", $city, ", ", $state, ", ", $country)
	return distinct-values($addresses)           
};

(:~
 : Uses a White-pages Web service to discover information about a given address, 
 : returning a sequence of strings for the names associated to the address.
 :
 :
 : @param $address A string corresponding to the address (ex: 5655 E Gaskill Rd, Willcox, AZ, US).
 : @return A sequence of strings for the person or organization's names associated to the address.
 : @example test/Queries/data-cleaning/conversion/user-from-address.xq
 :)
declare %an:nondeterministic function conversion:user-from-address ( $address as xs:string) as xs:string*{
	let $tokens := tokenize ($address, ",")
	let $token-full-street := $tokens[position()=1]
	let $state := 
		if (count($tokens) = 4)
		then replace($tokens[position()=3], " ", "")
		else
			if (count($tokens) = 5)
			then replace($tokens[position()=4], " ", "")
			else()
	let $house := tokenize($token-full-street, " ")[position()=1]
	let $street := replace(replace($token-full-street, "[0-9]+[ ]", ""), " ", "%20")
	let $url := concat("http://api.whitepages.com/reverse_address/1.0/?house=",$house, ";street=",$street, ";state=",$state,";api_key=",$conversion:key)
	let $doc := http:get-node($url)[2]
	return $doc/wp:wp/wp:listings/wp:listing/wp:displayname/text()
};

(:~
 : Uses a White-pages Web service to discover information about a given address, 
 : returning a sequence of strings for the phone number associated to the address.
 :
 :
 : @param $address A string corresponding to the address (ex: 5655 E Gaskill Rd, Willcox, AZ, US).
 : @return A sequence of strings for the phone number or organization's names associated to the address.
 : @example test/Queries/data-cleaning/conversion/phone-from-address.xq
 :)
declare %an:nondeterministic function conversion:phone-from-address ( $address as xs:string) as xs:string*{
	let $tokens := tokenize ($address, ",")
	let $token-full-street := $tokens[position()=1]
	let $state := 
		if (count($tokens) = 4)
		then replace($tokens[position()=3], " ", "")
		else
			if (count($tokens) = 5)
			then replace($tokens[position()=4], " ", "")
			else()
	let $house := replace($token-full-street, "([A-Za-z]+|[0-9]+[A-Za-z][A-Za-z]|[ ]+)", "")
	let $street-w-space := replace($token-full-street, $house, "")
	let $street := 
		if (substring($street-w-space, 1, 1) = " ")
		then substring($street-w-space, 2)
		else
			if(substring($street-w-space, string-length($street-w-space), 1) = " ")
			then substring($street-w-space, 1, string-length($street-w-space)-1)
			else ()
	let $street-form := replace($street, " ", "%20")
	let $url := concat("http://api.whitepages.com/reverse_address/1.0/?house=",$house, ";street=",$street-form, ";state=",$state,";api_key=",$conversion:key)
	let $doc := http:get-node($url)[2]
	return $doc/wp:wp/wp:listings/wp:listing/wp:phonenumbers/wp:phone/wp:fullphone/text()(: if($state = "TN") then "iguais" else "dif":)
};

(:~
 : Conversion function for units of measurement, acting as a wrapper over the CuppaIT WebService.
 : <br/>
 :
 :
 : @param $v The amount we wish to convert.
 : @param $t The type of metric (e.g., "Distance")
 : @param $m1 The source measurement unit metric (e.g., "meter")
 : @param $m2 The target measurement unit metric (e.g., "mile")
 : @return The value resulting from the conversion
 : @example test/Queries/data-cleaning/conversion/unit-convert.xq
 :)
declare %an:nondeterministic function conversion:unit-convert ( $v as xs:double, $t as xs:string, $m1 as xs:string, $m2 as xs:string ) as xs:double {
 if ( $m1 = $m2 ) then $v else

let $conversion-table := 
 <unit-conversion-rules>
 <unit type="Distance" from="mile" to="kilometer" value="1.609344" />
 <unit type="Distance" from="mile" to="angstrom" value="16100000000000" />
 <unit type="Distance" from="mile" to="picometer" value="1610000000000000" />
 <unit type="Distance" from="mile" to="nanometer" value="1610000000000" />
 <unit type="Distance" from="mile" to="microometer" value="1610000000" />
 <unit type="Distance" from="mile" to="millimeter" value="1610000" />
 <unit type="Distance" from="mile" to="centimeter" value="161000" />
 <unit type="Distance" from="mile" to="meter" value="1610" />
 <unit type="Distance" from="mile" to="inch" value="63400" />
 <unit type="Distance" from="mile" to="feet" value="5280" />
 <unit type="Distance" from="kilometer" to="meter" value="1000" />
 <unit type="Distance" from="kilometer" to="picometer" value="1000000000000000" />
 <unit type="Distance" from="kilometer" to="angstrom" value="10000000000000" />
 <unit type="Distance" from="kilometer" to="nanometer" value="1000000000000" />
 <unit type="Distance" from="kilometer" to="micrometer" value="1000000000" />
 <unit type="Distance" from="kilometer" to="millimeter" value="1000000" />
 <unit type="Distance" from="kilometer" to="centimeter" value="100000" />
 <unit type="Distance" from="kilometer" to="inch" value="39400" />
 <unit type="Distance" from="kilometer" to="feet" value="3280" />
 <unit type="Distance" from="meter" to="centimeter" value="100" />
 <unit type="Distance" from="meter" to="picometer" value="1000000000000" />
 <unit type="Distance" from="meter" to="angstrom" value="10000000000" />
 <unit type="Distance" from="meter" to="nanometer" value="1000000000" />
 <unit type="Distance" from="meter" to="micrometer" value="1000000" />
 <unit type="Distance" from="meter" to="millimeter" value="1000" />
 <unit type="Distance" from="meter" to="inch" value="39.4" />
 <unit type="Distance" from="meter" to="feet" value="3.28" />
 <unit type="Distance" from="centimeter" to="millimeter" value="10" />
 <unit type="Distance" from="millimeter" to="micrometer" value="1000" />
 <unit type="Distance" from="micrometer" to="nanometer" value="1000" />
 <unit type="Distance" from="nanometer" to="angstrom" value="10" />
 <unit type="Distance" from="angstrom" to="picometer" value="100" />
 <unit type="Distance" from="inch" to="feet" value="0.0833" />
 <unit type="Mass" from="tons" to="kilograms" value="907.18474" />
 <unit type="Mass" from="tons" to="pounds" value="2000" />
 <unit type="Mass" from="tons" to="ounces" value="32000" />
 <unit type="Mass" from="tons" to="grams" value="907184.74" />
 <unit type="Mass" from="tons" to="milligrams" value="907184740" />
 <unit type="Mass" from="kilograms" to="pounds" value="2.2046226" />
 <unit type="Mass" from="kilograms" to="grams" value="1000" />
 <unit type="Mass" from="kilograms" to="milligrams" value="1000000" />
 <unit type="Mass" from="grams" to="milligrams" value="1000" />
 <unit type="Mass" from="pounds" to="ounces" value="16" />
 <unit type="Mass" from="pounds" to="grams" value="453.59237" />
 <unit type="Mass" from="pounds" to="milligrams" value="453592.37" />
 <unit type="Mass" from="ounces" to="kilograms" value="0.028349523" />
 <unit type="Mass" from="ounces" to="grams" value="28.349523" />
 <unit type="Mass" from="ounces" to="milligrams" value="28349.523" />
 <unit type="Volume" from="liters" to="cubic centimeters" value="1000" />
 <unit type="Energy" from="jouls" to="calories" value="0.239" />
 <unit type="Pressure" from="pascals" to="kilopascals" value="0.001" />
 <unit type="Pressure" from="pascals" to="bars" value="0.000001" />
 <unit type="Pressure" from="pascals" to="mmHg" value="0.00750064" />
 <unit type="Pressure" from="pascals" to="torrs" value="0.00750064" />
 <unit type="Pressure" from="atmospheres" to="pascals" value="101325" />
 <unit type="Pressure" from="atmospheres" to="kilopascals" value="101.325" />
 <unit type="Pressure" from="atmospheres" to="bars" value="1.01325" />
 <unit type="Pressure" from="atmospheres" to="mmHg" value="760" />
 <unit type="Pressure" from="atmospheres" to="torrs" value="760" />
 <unit type="Pressure" from="atmospheres" to="psi" value="14.7" />
 <unit type="Pressure" from="psi" to="pascals" value="6890" />
 <unit type="Pressure" from="psi" to="kilopascals" value="6.89" />
 <unit type="Pressure" from="psi" to="bars" value="0.0689" />
 <unit type="Pressure" from="psi" to="mmHg" value="51.7" />
 <unit type="Pressure" from="psi" to="torrs" value="51.7" />
 <unit type="Pressure" from="bars" to="kilopascals" value="100" />
 <unit type="Pressure" from="bars" to="mmHg" value="750.064" />
 <unit type="Pressure" from="bars" to="torrs" value="750.064" />
 <unit type="Pressure" from="kilopascals" to="mmHg" value="7.50064" />
 <unit type="Pressure" from="kilopascals" to="torrs" value="7.50064" />
 <unit type="Pressure" from="mmHg" to="torrs" value="1" />
 <unit type="Temperature" from="celsius" to="fahrenheit" value="* 9 div 5 + 32" />
 <unit type="Temperature" from="celsius" to="kelvin" value="+ 273.15" />
 <unit type="Temperature" from="kelvin" to="celsius" value="- 273.15" />
 <unit type="Temperature" from="kelvin" to="fahrenheit" value="* 9 div 5 - 273.15 * 9 div 5 + 32" />
 <unit type="Temperature" from="fahrenheit" to="celsius" value="* 5 div 9 - 32 * 5 div 9" />
 <unit type="Temperature" from="fahrenheit" to="kelvin" value="* 5 div 9 - 32 * 5 div 9 + 273.15" />
</unit-conversion-rules>

let $from := $conversion-table/unit[@type=$t and @from=$m1] | 
             ( for $it in $conversion-table/unit[@type=$t and @to=$m1] return 
               if (compare($t, "Temperature") != 0) then
               copy $aux := $it
               modify (
                replace value of node $aux/@value with 1.0 div $aux/@value,
                replace value of node $aux/@from with $aux/@to,
                replace value of node $aux/@to with $aux/@from 
               ) 
               return $aux
               else()
             )

return 
if   (compare($t, "Temperature") = 0) then reflection:eval(concat($v , $conversion-table//unit[@from=$m1][@to=$m2]/@value))
else
	if   ( $from[@to=$m2]) then ( $v * $from[@to=$m2]/@value )
	else ( for $i in $from return conversion:unit-convert ( $v * $i/@value , $t , $i/@to , $m2 ) )[1]
};

(:~
 : Placename to geospatial coordinates converter, acting as a wrapper over the Yahoo! geocoder service.
 :
 : 
 : @param $q A sequence of strings corresponding to the different components (e.g., street, city, country, etc.) of the place name.
 : @return The pair of latitude and longitude coordinates associated with the input address.
 : @example test/Queries/data-cleaning/conversion/geocode-from-address.xq
 :)
declare %an:nondeterministic function conversion:geocode-from-address ( $q as xs:string* ) as xs:double* {
 let $id   := ""
 let $url  := "http://where.yahooapis.com/geocode?q="
 let $q2   := string-join(for $i in $q return translate($i," ","+"),",")
 let $call := concat($url,$q2,"&amp;appid=",$id)
 let $doc  := http:get-node($call)[2]
 return    ( xs:double($doc/ResultSet/Result/latitude/text()) , xs:double($doc/ResultSet/Result/longitude/text()) )
};

(:~
 : Geospatial coordinates to placename converter, acting as a wrapper over the Yahoo! reverse geocoder service.
 :
 :
 : @param $lat Geospatial latitude.
 : @param $lon Geospatial longitude.
 : @return The sequence of strings corresponding to the different components (e.g., street, city, country, etc.) of the place name that corresponds to the input geospatial coordinates.
 : @example test/Queries/data-cleaning/conversion/address-from-geocode.xq
 :)
declare %an:nondeterministic function conversion:address-from-geocode ( $lat as xs:double, $lon as xs:double ) as xs:string* {
 let $id   := ""
 let $url  := "http://where.yahooapis.com/geocode?q="
 let $q    := concat($lat,",+",$lon) 
 let $call := concat($url,$q,"&amp;gflags=R&amp;appid=",$id)
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
 : Currency conversion function, acting as a wrapper over the WebService from the European Central Bank.
 :
 : WebService documentation at http://www.ecb.int/stats/exchange/eurofxref/html/index.en.html
 :
 :
 : @param $v The amount we wish to convert.
 : @param $m1 The source currency (e.g., "EUR").
 : @param $m2 The target currency (e.g., "USD").
 : @param $date The reference date.
 : @return The value resulting from the conversion.
 : @error conversion:notsupported if the date, the source currency type or the target currency type are not known to the service.
 : @see http://www.ecb.int/stats/exchange/eurofxref/html/index.en.html
 : @example test/Queries/data-cleaning/conversion/currency-convert.xq
 :)
declare %an:nondeterministic function conversion:currency-convert ( $v as xs:double, $m1 as xs:string, $m2 as xs:string, $date as xs:string ) as xs:double{
 let $daily   := "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
 let $hist    := "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml"
 let $doc     := if (string-length($date) = 0) then http:get-node($daily)[2] else
                 ((for $a in http:get-node($hist)[2]//exref:Cube[
                   xs:string(@time)<=$date] order by $a/xs:string(@time) descending return $a)[1])
 let $toEUR   := if ( $m1="EUR" ) then (xs:double(1.0)) else ( $doc//exref:Cube[xs:string(@currency)=$m1]/xs:double(@rate) )
 let $fromEUR := if ( $m2="EUR" ) then (xs:double(1.0)) else ( $doc//exref:Cube[xs:string(@currency)=$m2]/xs:double(@rate) )
 let $result  := ($v div $toEUR) * $fromEUR
 return if (matches(string($result),"-?[0-9]+(\.[0-9]+)?")) then ($result) 
        else (error(QName('http://www.zorba-xquery.com/modules/data-cleaning/conversion', 'conversion:notsupported'), data($result)))
};

(:~
 : Uses a whois service to discover information about a given domain name, returning a sequence of strings 
 : for the phone numbers associated to the name.
 :
 : @param $addr A string with the domain.
 : @return A sequence of strings for the phone numbers associated to the domain name.
 :
 : <br/><br/><b> Attention : This function is still not implemented. </b> <br/>
 :
 :)
declare function conversion:phone-from-domain ( $domain as xs:string ) as xs:string*{
 ()
};

(:~
 : Uses a whois service to discover information about a given domain name, returning a sequence of strings 
 : for the addresses associated to the name.
 :
 : @param $addr A string with the domain.
 : @return A sequence of strings for the addresses associated to the domain name.
 :
 : <br/><br/><b> Attention : This function is still not implemented. </b> <br/>
 :
 :)
declare function conversion:address-from-domain ( $domain as xs:string ) as xs:string*{
 ()
};

(:~
 : Uses a whois service to discover information about a given domain name, returning a sequence of strings 
 : for the person or organization names associated to the name.
 :
 : @param $addr A string with the domain.
 : @return A sequence of strings for the person or organization names associated to the domain name.
 :
 : <br/><br/><b> Attention : This function is still not implemented. </b> <br/>
 :
 :)
declare function conversion:name-from-domain ( $domain as xs:string ) as xs:string*{
 ()
};
