import module namespace file = "http://expath.org/ns/file";
import module namespace xqdoc = "http://www.zorba-xquery.com/modules/xqdoc";

declare namespace xqd = "http://www.xqdoc.org/1.0";


variable $processed := ();

{|
for $file in file:list("modules", true(), "*.xq")
return {
  variable $source := file:read-text("modules/" || $file);
  variable $xqdoc  := xqdoc:xqdoc-content($source);
  variable $ns := $xqdoc/xqd:module/xqd:uri/text();
  variable $description := $xqdoc/xqd:module/xqd:comment/xqd:description/node();
  variable $r :=
  { 
    $ns : {
      "doc": serialize($description, ()),
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
