import module namespace fs = "http://expath.org/ns/file";

import module namespace http-client = "http://expath.org/ns/http-client";
import schema namespace http = "http://expath.org/ns/http-client";

declare namespace o = "http://www.w3.org/2010/xslt-xquery-serialization";

variable $output-text := <o:serialization-parameters>
  <o:method value="text"/>
</o:serialization-parameters>;
variable $filename := "XQueryParser.ebnf";
variable $output   := "lib/XQueryParser.js";
variable $grammar := fs:read-text("lib/" || $filename);
variable $response := http-client:send-request(validate {
<http:request href="http://www.bottlecaps.de/rex/" method="POST" override-media-type="text/plain">
  <http:multipart media-type="multipart/form-data">
     <http:header name="Content-Disposition" value='form-data; name="tz"' />
     <http:body media-type="text/plain">-60</http:body>
     <http:header name="Content-Disposition" value='form-data; name="input"; filename="{$filename}"' />
     <http:body media-type="text/plain">{$grammar}</http:body>
     <http:header name="Content-Disposition" value='form-data; name="command"' />
     <http:body media-type="text/plain">-ll 2 -backtrack -tree -javascript -a xqlint</http:body>
  </http:multipart>
</http:request>
});
variable $meta := $response[1];
variable $body := string($response[2]);
if($meta/@status = 200) then {
  fs:write($output, $body, $output-text);
  "Parser successfully generated at " || $output || "
"
} else {
  $meta
}
