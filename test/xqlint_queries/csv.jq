jsoniq version "1.0";

(: HTML table to CSV converter :)
(: Written for the http://28.io plattform :)
(: API query :)

import module namespace http="http://zorba.io/modules/http-client";
import module namespace string = "http://zorba.io/modules/string";
import module namespace h="http://www.zorba-xquery.com/modules/converters/html"; 
import module namespace csv = "http://zorba.io/modules/json-csv";
import module namespace req = "http://www.28msec.com/modules/http-request";
import module namespace resp = "http://www.28msec.com/modules/http-response";

(: Retrieve parameters :)
variable $url := req:param-values("url");

variable $table-number as integer? := 
  if (exists(req:param-values("tablenumber")) and not(req:param-values("tablenumber") eq ""))
  then integer(req:param-values("tablenumber"))
  else ();
  
variable $table-id as string? := 
  if (exists(req:param-values("tableid")) and not(req:param-values("tableid") eq ""))
  then string(req:param-values("tableid"))
  else ();
  
variable $table-class as string? := 
  if (exists(req:param-values("tableclass")) and not(req:param-values("tableclass") eq ""))
  then string(req:param-values("tableclass"))
  else ();
  
variable $header-row-count as integer? := 
  if (exists(req:param-values("headerrows")) and not(req:param-values("headerrows") eq ""))
  then integer(req:param-values("headerrows"))
  else ();
  
variable $skip-rows as integer := 
  if (exists(req:param-values("skip")) and not(req:param-values("skip") eq ""))
  then integer(req:param-values("skip"))
  else 0;
  
variable $truncate-rows as integer := 
  if (exists(req:param-values("truncate")) and not(req:param-values("truncate") eq ""))
  then integer(req:param-values("truncate"))
  else 0;

variable $result := http:get($url);
variable $parsed := h:parse(string:materialize($result.body.content));

(: Find table with data. Table may be identified by number, ID, class name or autodetection.  :)
(: Search by ID and class name will search for first element with given ID or class. If it is not a table
   children elements and following elements will be searched for a table :)
variable $data-table := 
  if (exists($table-number))
  then $parsed/descendant::*:table[$table-number]
  else if (exists($table-id))
  then 
      (
        $parsed/descendant::element()[$$/@id eq $table-id]/descendant-or-self::*:table,
        $parsed/descendant::element()[$$/@id eq $table-id]/following::*:table
      )[1]
  else if (exists($table-class))
  then 
      (
        $parsed/descendant::element()[$$/@class eq $table-class]/descendant-or-self::*:table,
        $parsed/descendant::element()[$$/@class eq $table-class]/following::*:table
      )[1]
  else
  (
      for $candidate in $parsed/descendant::*:table
      where not($candidate/descendant::*:table)
      let $amount-of-data := count($candidate/descendant::*:td)
      order by $amount-of-data descending
      return $candidate
  )[1];

(: Table body is tbody element or table element if no tbody is present :)
variable $table-body :=
  if ($data-table/*:tbody)
  then $data-table/*:tbody
  else $data-table;

(: Does this table use <th> elements for headings? :)
variable $uses-th-headers := exists($data-table/descendant::*:th);

(: Does this table use a thead section for the headings? :)
variable $used-thead := exists($data-table/*:thead);

(: How many heading rows does the data table have? :)
variable $number-of-header-rows :=
  if (exists($header-row-count))
  then $header-row-count
  else
      if ($used-thead)
      then count($data-table/*:thead/*:tr) - $skip-rows
      else if ($uses-th-headers)
      then count($table-body/*:tr[$$/*:th]) - $skip-rows
      else if (exists($table-body/*:tr[$$/*:td/@colspan]))
      then 2
      else 1;

(: All rows in a sequence. Remove skipped and truncated rows :)
variable $table-rows-with-colspan-and-rowspan := 
  ($data-table/*:thead/*:tr, $table-body/*:tr)[position() gt $skip-rows and position() le last()-$truncate-rows];  

(: Repeat columns with colspan. Filter out junk (everything that is not a cell) :)
variable $table-rows-with-rowspan-no-colspan :=
  for $row in $table-rows-with-colspan-and-rowspan
  return
      <tr>
      {
          for $col in $row/element()
          where $col/self::*:td or $col/self::*:th
          return 
              let $colspan := ($col/@colspan,1)[1]
              for $repeat in 1 to $colspan
              return $col
      }
      </tr>;

(: Helper variable with rowspan counters :)
variable $current-rowspans :=
    for $col in $table-rows-with-rowspan-no-colspan[1]/element()
    return { rowspan : 1 };

(: Repeat cells with rowspan accross rows :)
variable $table-rows := 
  for $row in $table-rows-with-rowspan-no-colspan
  return
      <tr>
          {      
              variable $read-column-index := 0;
              $current-rowspans :=
                for $col in $current-rowspans
                return
                    if ($col.rowspan gt 1)
                    then { rowspan : $col.rowspan - 1 }
                    else {
                        $read-column-index := $read-column-index + 1;
                        { 
                            rowspan : (integer($row/element()[$read-column-index]/@rowspan), 1)[1], 
                            index : $read-column-index 
                        }
                    };
              for $col in $current-rowspans      
              return 
                  if (exists($col.index)) 
                  then $row/element()[$col.index] 
                  else <td></td>
          } 
       </tr>;
  
(: Build column titles from header rows :)
variable $column-titles :=
  for $column in 1 to count($table-rows[1]/element())
  return 
      normalize-space(string-join(
          for $row in $table-rows[position() le $number-of-header-rows]
          return replace(data($row/element()[$column]),"\n"," ")
      ," "));

(: Eliminate duplicate columns produced by unnecessary colspans :)
if (count(distinct-values($column-titles)) lt count($column-titles))
then
    $column-titles := 
      for $title at $idx in $column-titles 
      return
          if ($title = $column-titles[position() lt $idx])
          then null
          else $title;      
else ();

(: Convert table data to JSON objects :)
variable $actual-data :=
    for $row in $table-rows[position() gt $number-of-header-rows]
    return {|
      for $column at $idx in $row/element()
      where not($column-titles[$idx] eq null)
      return { $column-titles[$idx] : replace(data($column),"\n"," ") }
    |};

(: Generate output :)
resp:content-type("text/csv");

if (exists($actual-data) and exists($column-titles))
then
{
  csv:serialize($actual-data, { field-names : [ $column-titles[not($$ eq null)] ] })
}
else
{
  "No data to extract"   
}
