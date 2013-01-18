(: Simple Switch expression :)

let $animal as xs:string := 'Cat'
return
switch ($animal)
   case "Cow" case "Cow2" return "Moo"
   case "Cat" return "Meow"
   case "Duck" return "Quack"
   default return "What's that odd noise?"
, 2, 3
