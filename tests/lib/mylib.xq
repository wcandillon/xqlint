module namespace mylib = "http://www.example.com/mylib";

declare variable $mylib:var as xs:string := "some var";

declare function mylib:foo()
as xs:string
{
  $mylib:var
};

