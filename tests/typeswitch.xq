xquery version "1.0";
declare default element namespace "http://www.w3.org/1999/xhtml";

(: This function takes the children of the node and passes them
   back into the typeswitch function. :)
declare function local:passthru($x as node()) as node()*
{
for $z in $x/node() return local:dispatch($z)
};

(: This is the recursive typeswitch function :)
declare function local:dispatch($x as node()) as node()*
{
typeswitch (($x))
  case text() return $x
  case element (a) return local:passthru($x)
  case element (title) return <h1>{local:passthru($x)}</h1>
  case element (para) return <p>{local:passthru($x)}</p>
  case element (sectionTitle) return <h2>{local:passthru($x)}</h2>
  case element (numbered) return <ol>{local:passthru($x)}</ol>
  case element (number) return <li>{local:passthru($x)}</li>
  default return <tempnode>{local:passthru($x)}</tempnode>
};

local:dispatch(<a/>)
