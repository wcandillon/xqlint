res:set-content-type("text/plain");

let $input :=
  let $doc     := jn:parse-json(req:text-content())
  let $module  := req:parameter-values("module")
  let $service := req:parameter-values("service")
  return {
      doc: $doc,
      module: $module,
      service: $service
  }
return
    local:javascript($input)
