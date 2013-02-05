import module namespace file = "http://expath.org/ns/file";
import module namespace xqdoc = "http://www.zorba-xquery.com/modules/xqdoc";

declare namespace xqd = "http://www.xqdoc.org/1.0";

declare function local:description-summary($description as element(xqd:description)*)
as element(p)
{
  let $text := local:text($description)
  let $text := normalize-space($text)
  let $text := if(string-length($text) gt 300) then substring($text, 1, 300) || "..." else $text
  return
     <p>{$text}</p>
};

declare function local:text($nodes)
as xs:string?
{
  string-join(
    for $node in $nodes
    return
      if($node instance of text()) then
        $node
      else
        local:text($node/node())
  , " ")
};

variable $processed := ();

{|
for $file in file:list("modules", true(), "*.xsd")
return {
  trace($file, "file");
  variable $source := file:read-text("modules/" || $file);
  variable $schema  := parse-xml($source);
  variable $ns := $schema/xs:schema/@targetNamespace/string();
  variable $description := $schema/xs:schema/xs:annotation/xs:documentation/text();
  variable $r :=
  { 
    $ns : {
      "doc": $description,
      "docUrl": "http://www.28msec.com/modules/"
    }
  };
  $processed := ($processed, $ns);
  if(count($processed[. eq $ns]) = 1) then
    $r
  else
    ()
}
|}
