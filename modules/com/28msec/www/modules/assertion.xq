xquery version "3.0";
(:
 : Copyright 2012 28msec Inc.
 :)

(:~
 : <p>
 :   This module provides a set of assertion methods useful
 :   for writing tests.
 : </p>
 :
 : @author 28msec
 :)
module namespace assertion = "http://www.28msec.com/modules/assertion";

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : xs:QName with namespace URI="http://www.28msec.com/modules/assertion" and
 : local name 'A001'. 'equals-value' assertion failed.
:)
declare variable $assertion:A001 as xs:QName := xs:QName("assertion:A001");

(:~
 : xs:QName with namespace URI="http://www.28msec.com/modules/assertion" and
 : local name 'A002'. 'equals-general' assertion failed.
:)
declare variable $assertion:A002 as xs:QName := xs:QName("assertion:A002");

(:~
 : xs:QName with namespace URI="http://www.28msec.com/modules/assertion" and
 : local name 'A003'. 'equals-general' assertion failed.
:)
declare variable $assertion:A003 as xs:QName := xs:QName("assertion:A003");

declare %private function assertion:error($error as xs:QName,
                                             $expected as item()*,
                                             $actual as item()*)
{
  fn:error(
    $error,
    "&#10;"
    ||
    fn:string-join((
      "=======",
      "ACTUAL:",
      "-------",
      fn:serialize($expected),
      "=======",
      "EXPECTED:",
      "---------",
      fn:serialize($actual),
      "========="
    ),"&#10;")
    ||
    "&#10;"
  )
};

(:~
 : Asserts that two objects are equal (by value comarison).
 : If they are not, an error containing the diff is thrown.
 :
 : @param $expected expected value
 : @param $actual actual value
 :
 : @return actual value
 :
 : @error assertion:A001 expected and actual value are not equal
 :
 :)
declare function assertion:equals-value($expected as item()?, $actual as item()?)
as item()?
{
  if ($expected ne $actual) then
    assertion:error(
      $assertion:A001,
      $expected,
      $actual
    )
  else
    $actual
};

(:~
 : Asserts that two objects are equal (by general comarison).
 : If they are not, an error containing the diff is thrown.
 :
 : @param $expected expected value
 : @param $actual actual value
 :
 : @return actual value
 :
 : @error assertion:A002 expected and actual value are not equal
 :
 :)
declare function assertion:equals-general($expected as item()*,
                                          $actual as item()*)
as item()*
{
  if (not ($expected = $actual)) then
    assertion:error(
      $assertion:A002,
      $expected,
      $actual
    )
  else
    $actual
};

(:~
 : Asserts that two objects are deep-equal.
 : If they are not, an error containing the diff is thrown.
 :
 : @param $expected expected value
 : @param $actual actual value
 :
 : @return actual value
 :
 : @error assertion:A003 expected and actual value are not deep-equal
 :
 :)
declare function assertion:equals-deep($expected as item()*,
                                       $actual as item()*)
as item()*
{
  if (not(fn:deep-equal($expected, $actual))) then
    assertion:error(
      $assertion:A003,
      $expected,
      $actual
    )
  else
    $actual
};
