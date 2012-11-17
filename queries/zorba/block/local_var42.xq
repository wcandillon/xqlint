declare namespace ann = "http://www.zorba-xquery.com/annotations";

for $i in (10, 20, 30)
return
  {
    variable $i := { $i := local:foo(); 1 };
    $result
  }
