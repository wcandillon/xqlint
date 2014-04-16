xquery version "3.0";
 
import module namespace http = "http://expath.org/ns/http-client";
declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare namespace json="http://www.json.org";

declare namespace an = "http://zorba.io/annotations";
 
(: Switch to JSON serialization :)
declare option output:method "json";
declare option output:media-type "text/javascript";
 
declare %an:sequential function local:convert-geojson($text as xs:string, $api-key as xs:string) as item()*
{ 
    let $entities := http:send-request(<http:request href="http://access.alchemyapi.com/calls/text/TextGetRankedNamedEntities?api-key={$api-key}&amp;text={$text}" method="POST" />)[2]//results/entities
    for $entity in $entities/entity
    where $entity//geo
    return
    <json:value>
       <type>Feature</type>
       <properties>
          {($entity/text)}
        </properties>
        <geometry type="Point">
            <coordinates>{fn:substring-after($entity/disambiguated/geo, " ")}</coordinates>
            <coordinates>{fn:substring-before($entity/disambiguated/geo, " ")}</coordinates>
      </geometry>
      </json:value>
    
};
 
let $api-key := "434e406f3e41f4fadb602f0343e1ea5e7ddfc22e"
let $text := "I grew up in Judsonia, AR. I now live in Nashville, TN."
return 
<json type="FeatureCollection">
    {xs:anyURI($api-key)}
    <features> 
    {
      local:convert-geojson($text, $api-key)
    }
    </features>
</json>
