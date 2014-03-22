jsoniq version "1.0";

import module namespace components = "http://xbrl.io/modules/bizql/components";
import module namespace companies = "http://xbrl.io/modules/bizql/profiles/sec/companies";
import module namespace archives = "http://xbrl.io/modules/bizql/archives";
import module namespace fiscal = "http://xbrl.io/modules/bizql/profiles/sec/fiscal/core";
import module namespace request = "http://www.28msec.com/modules/http-request";
import module namespace response = "http://www.28msec.com/modules/http-response";
import module namespace session = "http://apps.28.io/session";

variable $ticker := let $ticker := request:param-values("ticker","axp")
return if (empty($ticker))
       then error(QName("local:INVALID-REQUEST"), "ticker: mandatory parameter not found")
       else $ticker;
           
let $format  := lower-case(substring-after(request:path(), ".jq.")) (: text, xml, or json (default) :)
let $company := companies:companies-for-tickers($ticker)
for $archive in ()
where fiscal:fiscal-period($archive) eq "FY" and fiscal:fiscal-year($archive) eq 2012 
for $r in components:components-for-archives($archive)
let $matches :=
    let $members := $r.Hypercubes."xbrl:DefaultHypercube".Aspects."xbrl:Concept".Domains."xbrl:ConceptDomain".Members
    for $k in keys($members)
    let $member := $members($k)
    where contains(lower-case($member.Label), "long-term debt")
    return $member
where exists($matches)
let $count := count($matches)
order by $count descending
return  if(session:only-dow30($company) or session:valid()) 
        then {
            Archive : $r.Archive,
            Label : $r.Label,
            NumConcepts : $matches
        } else {
            response:status-code(401);
            session:error("accessing filings of an entity that is not in the DOW30", $format) 
        }
