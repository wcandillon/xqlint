declare namespace err = "http://www.w3.org/2005/xqt-errors";

declare variable $error := xs:QName("err:FOER0000");

try {
    fn:error($error, "An Error Happened")
} catch err:FOER0000 {
    concat(
      $err:code, ": ", $err:description, " at "
      , $err:module, "(", $err:line-number, ",", $err:column-number, ")"
    )
}
