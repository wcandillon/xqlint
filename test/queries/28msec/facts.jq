jsoniq version "1.0";

import module namespace archives = "http://28.io/modules/xbrl/archives";
import module namespace components = "http://28.io/modules/xbrl/components";
import module namespace conversion = "http://28.io/modules/xbrl/conversion";
import module namespace entities = "http://28.io/modules/xbrl/entities";
import module namespace facts = "http://28.io/modules/xbrl/facts";
import module namespace labels = "http://28.io/modules/xbrl/labels";
import module namespace reports = "http://28.io/modules/xbrl/reports";
import module namespace report-elements = "http://28.io/modules/xbrl/report-elements";
import module namespace rules = "http://28.io/modules/xbrl/rules";

import module namespace multiplexer = "http://28.io/modules/xbrl/profiles/multiplexer";

import module namespace api = "http://apps.28.io/api";
import module namespace config = "http://apps.28.io/config";
import module namespace request = "http://apps.28.io/request";
import module namespace session = "http://apps.28.io/session";

declare option rest:response "first-item";

declare variable $local:additional-concepts as object* := (
  {
    Name: "sec:DefaultLegalEntity",
    Labels : [ {
        Role : "http://www.xbrl.org/2003/role/label",
        Language : "en-us",
        Value : "Default Legal Entity [Member]"
    } ]
  },
  {
    Name: "dei:LegalEntityAxis",
    Labels : [ {
        Role : "http://www.xbrl.org/2003/role/label",
        Language : "en-us",
        Value : "Legal Entity [Axis]"
    } ]
  },
  {
    Name: "xbrl:NonNumeric",
    Labels : [ {
        Role : "http://www.xbrl.org/2003/role/label",
        Language : "en-us",
        Value : "Non Numeric"
    } ]
  }
);

(: Resolves aspect name labels just once for *all* facts, trying the archives
one by one recursively and stopping as soon as all labels were found :)
declare function local:resolve-aspect-name-labels(
  $aspect-names as string*,
  $archives as string*
) as object*
{
  if(empty($aspect-names) or empty($archives))
  then ()
  else
    let $found-next as object* := report-elements:report-elements(
        $aspect-names,
        $archives[1],
        $report-elements:ANY_COMPONENT_LINK_ROLE
    )
    let $left := $aspect-names[not $$ = $found-next.Name]
    return ($found-next, local:resolve-aspect-name-labels($left, $archives[position() gt 1]))
};

 declare function local:to-xml($res as object) as node()* {
       <FactTable NetworkIdentifier="http://bizql.io/facts"
        TableName="xbrl:Facts">{
            conversion:facts-to-xml($res.FactTable[])
    }</FactTable>
};

declare function local:to-csv($res as object) as string {
    (conversion:facts-to-csv($res.FactTable[]), "")[1]
};

declare function local:to-odata($res as object) as node()* {
    <feed xmlns='http://www.w3.org/2005/Atom'
        xmlns:m='http://docs.oasis-open.org/odata/ns/metadata'
        xmlns:d='http://docs.oasis-open.org/odata/ns/data'
        xml:base='http://www.28.io/'>
    <id>{"odata:transient:"|| current-dateTime() }</id>
    <title type='text'>Cell store facts</title>
    <updated>{current-dateTime()}</updated>
   {
        let $next := $res."FactTable@odata.nextLink"
        where exists($next)
        return <link rel="next">{$next}</link>,
        let $id := $res."FactTable@odata.id"
        where exists($id)
        return <link rel="self">{$id}</link>,
        conversion:facts-to-odata(
          $res.FactTable[],
          $hypercube,
          {
            token: $token
          })
   }
   </feed>
};

declare function to-xBRL-JSON($res as object) as object* {
    conversion:facts-to-xBRL-JSON($res.FactTable[], archives:archives(distinct-values($res.FactTable[].Aspects."xbrl28:Archive")))
};

declare %an:nondeterministic function local:facts-to-xbrl-xml($res as object) as node()* {
  conversion:facts-to-xBRL-XML($res.FactTable[])
};

(: Query parameters :)
declare  %rest:case-insensitive                 variable $token             as string? external;
declare  %rest:case-insensitive                 variable $profile-name      as string  external := $config:profile-name;
declare  %rest:env                              variable $request-uri       as string  external;
declare  %rest:case-insensitive                 variable $format            as string external := "json";
declare  %rest:case-insensitive %rest:distinct  variable $cik               as string* external;
declare  %rest:case-insensitive %rest:distinct  variable $edinetcode        as string* external;
declare  %rest:case-insensitive %rest:distinct  variable $concept           as string*  external;
declare  %rest:case-insensitive %rest:distinct  variable $tag               as string* external;
declare  %rest:case-insensitive %rest:distinct  variable $ticker            as string* external;
declare  %rest:case-insensitive %rest:distinct  variable $sic               as string* external;
declare  %rest:case-insensitive %rest:distinct  variable $fiscalYear        as string* external := ();
declare  %rest:case-insensitive %rest:distinct  variable $fiscalPeriod      as string* external := ();
declare  %rest:case-insensitive %rest:distinct  variable $fiscalPeriodType  as string* external := ();
declare  %rest:case-insensitive %rest:distinct  variable $eid               as string* external;
declare  %rest:case-insensitive %rest:distinct  variable $aid               as string* external;
declare  %rest:case-insensitive                 variable $map               as string? external;
declare  %rest:case-insensitive                 variable $rule              as string? external;
declare  %rest:case-insensitive                 variable $report            as string? external;
declare  %rest:case-insensitive                 variable $validate          as boolean external := false;
declare  %rest:case-insensitive                 variable $open              as boolean external := false;
declare  %rest:case-insensitive                 variable $labels            as boolean external := true;
declare  %rest:case-insensitive                 variable $additional-rules  as string? external;
declare  %rest:case-insensitive                 variable $debug             as boolean external := false;
declare  %rest:case-insensitive                 variable $language          as string  external := "en-US";
declare  %rest:case-insensitive                 variable $count             as boolean external := false;
declare  %rest:case-insensitive                 variable $top               as nonNegativeInteger? external := ();
declare  %rest:case-insensitive                 variable $skip              as nonNegativeInteger? external := ();
declare  %rest:case-insensitive                 variable $aggregation-function  as string? external := ();

(: Post-processing :)
let $profile-name as string := api:preprocess-profile-name($profile-name)
let $cik as string* :=
    switch($profile-name)
    case "sec" return $cik
    case "japan" return $edinetcode
    default return ()

(: Entity resolution :)
let $entities := multiplexer:entities(
  $profile-name,
  $eid,
  $cik,
  api:preprocess-tags($tag),
  $ticker,
  $sic,
  (),
  (),
  $aid,
  ())

let $entities-not-found as boolean :=
  exists(($eid, $cik, $tag, $ticker, $sic)) and empty($entities)

let $report as object? := reports:reports($report)
let $map as item* :=
    if(exists($report))
    then reports:concept-map($report)
    else $map

let $request as object := request:request(
  $profile-name,
  $entities,
  $request-uri,
  $format,
  $concept,
  $fiscalYear,
  $fiscalPeriod,
  $fiscalPeriodType,
  $cik,
  $tag,
  $ticker,
  $sic,
  $aid,
  $open,
  $aggregation-function)

let $rule as item* :=
    (
        if(exists($aggregation-function))
        then request:rules($request)
        else (),

        if(exists($report))
        then reports:rules($report)
        else rules:rules($rule),

        if(exists($additional-rules))
        then rules:rules($additional-rules)
        else ()
    )

let $hypercube := request:hypercube($request)

let $facts :=
    let $options := {|
      {
        Hypercube : $hypercube,
        Validate: $validate
      },
      { "ConceptMaps" : $map }[exists($map)],
      { "Rules" : [ $rule ] }[exists($rule)],
      { "Concepts" : $report.Concepts }[exists($report) and exists($report.Concepts)],
      { "AuditTrail" : "debug" }[$debug]
    |}
    return if($entities-not-found)
           then ()
           else facts:facts-for($options)

let $facts := if($fiscalYear = "LATEST")
              then for $f in $facts
                   group by $entity := $f.Aspects."xbrl:Entity"
                   return for $f in $f
                          group by $fy := $f.Aspects."xbrl28:FiscalYear"
                          order by $fy descending
                          count $c where $c eq 1
                          return $f
              else $facts

let $facts :=
  if(not $labels)
  then $facts
  else
    let $language as string := ( $language, $report.$components:DEFAULT-LANGUAGE , $labels:AMERICAN_ENGLISH )[1]
    let $nonFetchedEntities as string* := request:param-values("xbrl:Entity")[not $$ = entities:eid($entities)]
    let $entities as object* := ($entities, entities:entities($nonFetchedEntities))
    let $aspect-names as string* := distinct-values((keys($facts.Aspects)))
    let $aspect-name-concepts as object* :=
    (
        local:resolve-aspect-name-labels($aspect-names, distinct-values($facts.Aspects."xbrl28:Archive")),
        $report.Concepts[][$$.Name = $aspect-names],
        if($profile-name eq "sec") then $local:additional-concepts else ()
    )
    return
    for $facts as object in $facts
    group by $archive := $facts.Aspects."xbrl28:Archive"
    let $aspect-values as string* := distinct-values(values($facts.Aspects)[$$ instance of string])
    let $aspect-value-concepts as object* :=
    (
        report-elements:report-elements(
            $aspect-values,
            $archive,
            $report-elements:ANY_COMPONENT_LINK_ROLE
        ),
        $report.Concepts[][$$.Name = $aspect-values],
        if($profile-name eq "sec") then $local:additional-concepts else ()
    )
    return
    for $fact in $facts
    return {|
      $fact,
      let $concept-labels as object? := labels:labels-for-facts(
        $fact,
        $labels:STANDARD_LABEL_ROLE,
        $language,
        ($aspect-name-concepts, $aspect-value-concepts),
        $entities,
        ()
      )
      return { Labels : $concept-labels }
    |}

let $facts as object* := api:normalize-facts($facts)

let $result := api:top-skip-count("FactTable", $facts, $count, $top, $skip)

let $comment :=
{
    NumFacts: count($facts),
    TotalNumFacts: session:num-facts(),
    TotalNumArchives: session:num-archives(),
    TotalNumEntities: session:num-entities()
}
let $comment :=
    if($debug)
    then {|
        $comment,
        { DebugInfo: { Hypercube: $hypercube,
                       Request: $request } }
    |}
    else $comment
let $serializers := {
    to-xml : local:to-xml#1,
    to-csv : local:to-csv#1,
    to-odata : local:to-odata#1,
    to-xBRL-JSON : local:to-xBRL-JSON#1,
    to-xBRL-XML : local:facts-to-xbrl-xml#1
}
let $results := api:serialize($result, $comment, $serializers, $request.format, "facts")
return if($entities-not-found)
       then api:not-found("entity")
       else api:check-and-return-results($token, $results, $request.format)
