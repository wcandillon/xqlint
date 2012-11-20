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
for $file in file:list("modules", true(), "*.xq")
return {
  trace($file, "file");
  variable $source := file:read-text("modules/" || $file);
  variable $xqdoc  := xqdoc:xqdoc-content($source);
  variable $ns := $xqdoc/xqd:module/xqd:uri/text();
  variable $description := $xqdoc/xqd:module/xqd:comment/xqd:description;
  variable $r :=
  { 
    $ns : {
      "doc": local:description-summary($description),
      "docUrl": "http://www.28msec.com/modules/",
      "functions": {|
        for $function in $xqdoc/xqd:functions/xqd:function
        let $name := $function/xqd:name/text()
        let $name := substring-after($name, ":")
        let $arity := $function/@arity/string()
        group by $name
        (:
        let $fn := $function[1]
        let $is-private := exists($fn/xqd:annotations/xqd:annotation[@namespace = "http://www.w3.org/2005/xpath-functions" and @localname = "private"])
        where not($is-private)
        :)
        return {
          $name : [
                    for $f in $function
                    group by $arity := $f/@arity/string()
                    return {
                      "doc": local:description-summary($f[1]/xqd:comment/xqd:description),
                      "docUrl": "http://www.28msec.com/modules/",
                      "params": [
                        for $param in $f[1]/xqd:parameters/xqd:parameter
                        return "$" || $param/xqd:name/text()
                      ]
                    }
                  ]
        }
      |}
    }
  };
  $processed := ($processed, $ns);
  if(count($processed[. eq $ns]) = 1) then
    $r
  else
    ()
}
|}
