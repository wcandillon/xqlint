(:
 : Copyright 2006-2009 The FLWOR Foundation.
 :
 : Licensed under the Apache License, Version 2.0 (the "License");
 : you may not use this file except in compliance with the License.
 : You may obtain a copy of the License at
 :
 : http://www.apache.org/licenses/LICENSE-2.0
 :
 : Unless required by applicable law or agreed to in writing, software
 : distributed under the License is distributed on an "AS IS" BASIS,
 : WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 : See the License for the specific language governing permissions and
 : limitations under the License.
:)

(:~
 : This module contains all the functions specified in the
 : W3C XPath and XQuery Functions and Operators 3.0.
 :
 :
 : @author www.w3c.org
 : @see http://www.w3.org/TR/xpath-functions-30/
 : @project W3C/XPath Functions
 :
 :)
module namespace fn = "http://www.w3.org/2005/xpath-functions";

(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Constructs an <code>xs:QName</code> value given a namespace URI
 : and a lexical QName.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:QName</code>(<code class="arg">$paramURI</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$paramQName</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:QName</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The namespace URI in the returned QName is taken from
 : <code>$paramURI</code>. If <code>$paramURI</code> is the
 : zero-length string or the empty sequence, it represents "no
 : namespace".</p>
 : <p>The prefix (or absence of a prefix) in <code>$paramQName</code>
 : is retained in the returned <code>xs:QName</code> value.</p>
 : <p>The local name in the result is taken from the local part of
 : <code>$paramQName</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOCA0002" title="err:FOCA0002">err:FOCA0002</span>] if <code>$paramQName</code> does
 : not have the correct lexical form for an instance of
 : <code>xs:QName</code>.</p>
 : <p>An error is raised [<span href="#ERRFOCA0002" title="err:FOCA0002">err:FOCA0002</span>] if <code>$paramURI</code> is the
 : zero-length string or the empty sequence, and the value of
 : <code>$paramQName</code> contains a colon (<code>:</code>).</p>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCA0002" title="err:FOCA0002">err:FOCA0002</span>] if <code>$paramURI</code> is
 : not a valid URI (XML Namespaces 1.0) or IRI (XML Namespaces
 : 1.1).</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p><code>fn:QName("http://www.example.com/example",
 : "person")</code> returns an <code>xs:QName</code> with namespace
 : URI = "http://www.example.com/example", local name = "person" and
 : prefix = "".</p>
 : <p><code>fn:QName("http://www.example.com/example",
 : "ht:person")</code> returns an <code>xs:QName</code> with namespace
 : URI = "http://www.example.com/example", local name = "person" and
 : prefix = "ht".</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-QName
 :)
declare function fn:QName($paramURI as xs:string?,  $paramQName as xs:string) as  xs:QName external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the absolute value of <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:abs</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>General rules: see <span href="#numeric-value-functions"><b>4.4
 : Functions on numeric values</b></span>.</p>
 : <p>If <code>$arg</code> is negative the function returns
 : <code>-$arg</code>, otherwise it returns <code>$arg</code>.</p>
 : <p>If the type of <code>$arg</code> is one of the four numeric
 : types <code>xs:float</code>, <code>xs:double</code>,
 : <code>xs:decimal</code> or <code>xs:integer</code> the type of the
 : result is the same as the type of <code>$arg</code>. If the type of
 : <code>$arg</code> is a type derived from one of the numeric types,
 : the result is an instance of the base numeric type.</p>
 : <p>For <code>xs:float</code> and <code>xs:double</code> arguments,
 : if the argument is positive zero or negative zero, then positive
 : zero is returned. If the argument is positive or negative infinity,
 : positive infinity is returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:abs(10.5)</code> returns
 : <code>10.5</code>.</p>
 : <p>The expression <code>fn:abs(-10.5)</code> returns
 : <code>10.5</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-abs
 :)
declare function fn:abs($arg as numeric?) as  numeric? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Adjusts an <code>xs:date</code> value to a specific timezone, or
 : to no timezone at all; the result is the date in the target
 : timezone that contains the starting instant of the supplied
 : date.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:adjust-date-to-timezone</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:date?</code>)<code class="as"> as </code><code class="return-type">xs:date?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:adjust-date-to-timezone</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:date?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$timezone</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dayTimeDuration?</code>)<code class="as"> as </code><code class="return-type">xs:date?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$timezone</code> is not specified, then the effective
 : value of <code>$timezone</code> is the value of the implicit
 : timezone in the dynamic context.</p>
 : <p>If <code>$arg</code> is the empty sequence, then the function
 : returns the empty sequence.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : the value of <code>$arg</code>.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the result
 : is <code>$arg</code> with <code>$timezone</code> as the timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : the local value of <code>$arg</code> without its timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the function
 : returns the value of the expression:</p>
 : <ul>
 : <li>
 : <p>Let <code>$dt</code> be the value of <span href="#func-dateTime"><code>fn:dateTime($arg,
 : xs:time('00:00:00'))</code></span>.</p>
 : </li>
 : <li>
 : <p>Let <code>$adt</code> be the value of <span href="#func-adjust-dateTime-to-timezone"><code>fn:adjust-dateTime-to-timezone($dt,
 : $timezone)</code></span></p>
 : </li>
 : <li>
 : <p>The function returns the value of <code>xs:date($adt)</code></p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODT0003" title="err:FODT0003">err:FODT0003</span>] if <code>$timezone</code> is less
 : than <code>-PT14H</code> or greater than <code>PT14H</code> or is
 : not an integral number of minutes.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Assume the dynamic context provides an implicit timezone of
 : <code>-05:00 (-PT5H0M)</code>.</p>
 : <p>let <code>$tz-10</code> :=
 : <code>xs:dayTimeDuration("-PT10H")</code></p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07"))</code>
 : returns <code>xs:date("2002-03-07-05:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00"))</code>
 : returns <code>xs:date("2002-03-07-05:00")</code>.
 : <em>(<code>$arg</code> is converted to
 : <code>xs:dateTime("2002-03-07T00:00:00-07:00")</code>. This is
 : adjusted to the implicit timezone, giving
 : <code>"2002-03-07T02:00:00-05:00"</code>. ).</em></p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07"),
 : $tz-10)</code> returns
 : <code>xs:date("2002-03-07-10:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00"),
 : $tz-10)</code> returns <code>xs:date("2002-03-06-10:00")</code>.
 : <em>(<code>$arg</code> is converted to the <code>xs:dateTime
 : "2002-03-07T00:00:00-07:00"</code>. This is adjusted to the given
 : timezone, giving <code>"2002-03-06T21:00:00-10:00"</code>.
 : ).</em></p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07"), ())</code>
 : returns <code>xs:date("2002-03-07")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00"),
 : ())</code> returns <code>xs:date("2002-03-07")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-adjust-date-to-timezone
 :)
declare function fn:adjust-date-to-timezone($arg as xs:date?) as  xs:date? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Adjusts an <code>xs:date</code> value to a specific timezone, or
 : to no timezone at all; the result is the date in the target
 : timezone that contains the starting instant of the supplied
 : date.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:adjust-date-to-timezone</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:date?</code>)<code class="as"> as </code><code class="return-type">xs:date?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:adjust-date-to-timezone</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:date?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$timezone</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dayTimeDuration?</code>)<code class="as"> as </code><code class="return-type">xs:date?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$timezone</code> is not specified, then the effective
 : value of <code>$timezone</code> is the value of the implicit
 : timezone in the dynamic context.</p>
 : <p>If <code>$arg</code> is the empty sequence, then the function
 : returns the empty sequence.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : the value of <code>$arg</code>.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the result
 : is <code>$arg</code> with <code>$timezone</code> as the timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : the local value of <code>$arg</code> without its timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the function
 : returns the value of the expression:</p>
 : <ul>
 : <li>
 : <p>Let <code>$dt</code> be the value of <span href="#func-dateTime"><code>fn:dateTime($arg,
 : xs:time('00:00:00'))</code></span>.</p>
 : </li>
 : <li>
 : <p>Let <code>$adt</code> be the value of <span href="#func-adjust-dateTime-to-timezone"><code>fn:adjust-dateTime-to-timezone($dt,
 : $timezone)</code></span></p>
 : </li>
 : <li>
 : <p>The function returns the value of <code>xs:date($adt)</code></p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODT0003" title="err:FODT0003">err:FODT0003</span>] if <code>$timezone</code> is less
 : than <code>-PT14H</code> or greater than <code>PT14H</code> or is
 : not an integral number of minutes.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Assume the dynamic context provides an implicit timezone of
 : <code>-05:00 (-PT5H0M)</code>.</p>
 : <p>let <code>$tz-10</code> :=
 : <code>xs:dayTimeDuration("-PT10H")</code></p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07"))</code>
 : returns <code>xs:date("2002-03-07-05:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00"))</code>
 : returns <code>xs:date("2002-03-07-05:00")</code>.
 : <em>(<code>$arg</code> is converted to
 : <code>xs:dateTime("2002-03-07T00:00:00-07:00")</code>. This is
 : adjusted to the implicit timezone, giving
 : <code>"2002-03-07T02:00:00-05:00"</code>. ).</em></p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07"),
 : $tz-10)</code> returns
 : <code>xs:date("2002-03-07-10:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00"),
 : $tz-10)</code> returns <code>xs:date("2002-03-06-10:00")</code>.
 : <em>(<code>$arg</code> is converted to the <code>xs:dateTime
 : "2002-03-07T00:00:00-07:00"</code>. This is adjusted to the given
 : timezone, giving <code>"2002-03-06T21:00:00-10:00"</code>.
 : ).</em></p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07"), ())</code>
 : returns <code>xs:date("2002-03-07")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-date-to-timezone(xs:date("2002-03-07-07:00"),
 : ())</code> returns <code>xs:date("2002-03-07")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-adjust-date-to-timezone
 :)
declare function fn:adjust-date-to-timezone( $arg as xs:date?,  $timezone as xs:dayTimeDuration?) as  xs:date? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Adjusts an <code>xs:dateTime</code> value to a specific
 : timezone, or to no timezone at all.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:adjust-dateTime-to-timezone</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:dateTime?</code>)<code class="as"> as </code><code class="return-type">xs:dateTime</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:adjust-dateTime-to-timezone</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dateTime?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$timezone</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dayTimeDuration?</code>)<code class="as"> as </code><code class="return-type">xs:dateTime</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$timezone</code> is not specified, then the effective
 : value of <code>$timezone</code> is the value of the implicit
 : timezone in the dynamic context.</p>
 : <p>If <code>$arg</code> is the empty sequence, then the function
 : returns the empty sequence.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : <code>$arg</code>.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the result
 : is <code>$arg</code> with <code>$timezone</code> as the timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : the local value of <code>$arg</code> without its timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the result
 : is the <code>xs:dateTime</code> value that is equal to
 : <code>$arg</code> and that has a timezone component equal to
 : <code>$timezone</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODT0003" title="err:FODT0003">err:FODT0003</span>] if <code>$timezone</code> is less
 : than <code>-PT14H</code> or greater than <code>PT14H</code> or is
 : not an integral number of minutes.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Assume the dynamic context provides an implicit timezone of
 : <code>-05:00 (-PT5H0M)</code>.</p>
 : <p>let <code>$tz-10</code> :=
 : <code>xs:dayTimeDuration("-PT10H")</code></p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00'))</code>
 : returns <code>xs:dateTime('2002-03-07T10:00:00-05:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00-07:00'))</code>
 : returns <code>xs:dateTime('2002-03-07T12:00:00-05:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00'),
 : $tz-10)</code> returns
 : <code>xs:dateTime('2002-03-07T10:00:00-10:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00-07:00'),
 : $tz-10)</code> returns
 : <code>xs:dateTime('2002-03-07T07:00:00-10:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00-07:00'),
 : xs:dayTimeDuration("PT10H"))</code> returns
 : <code>xs:dateTime('2002-03-08T03:00:00+10:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T00:00:00+01:00'),
 : xs:dayTimeDuration("-PT8H"))</code> returns
 : <code>xs:dateTime('2002-03-06T15:00:00-08:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00'),
 : ())</code> returns
 : <code>xs:dateTime('2002-03-07T10:00:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00-07:00'),
 : ())</code> returns
 : <code>xs:dateTime('2002-03-07T10:00:00')</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-adjust-dateTime-to-timezone
 :)
declare function fn:adjust-dateTime-to-timezone($arg as xs:dateTime?) as  xs:dateTime external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Adjusts an <code>xs:dateTime</code> value to a specific
 : timezone, or to no timezone at all.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:adjust-dateTime-to-timezone</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:dateTime?</code>)<code class="as"> as </code><code class="return-type">xs:dateTime</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:adjust-dateTime-to-timezone</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dateTime?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$timezone</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dayTimeDuration?</code>)<code class="as"> as </code><code class="return-type">xs:dateTime</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$timezone</code> is not specified, then the effective
 : value of <code>$timezone</code> is the value of the implicit
 : timezone in the dynamic context.</p>
 : <p>If <code>$arg</code> is the empty sequence, then the function
 : returns the empty sequence.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : <code>$arg</code>.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the result
 : is <code>$arg</code> with <code>$timezone</code> as the timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : the local value of <code>$arg</code> without its timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the result
 : is the <code>xs:dateTime</code> value that is equal to
 : <code>$arg</code> and that has a timezone component equal to
 : <code>$timezone</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODT0003" title="err:FODT0003">err:FODT0003</span>] if <code>$timezone</code> is less
 : than <code>-PT14H</code> or greater than <code>PT14H</code> or is
 : not an integral number of minutes.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Assume the dynamic context provides an implicit timezone of
 : <code>-05:00 (-PT5H0M)</code>.</p>
 : <p>let <code>$tz-10</code> :=
 : <code>xs:dayTimeDuration("-PT10H")</code></p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00'))</code>
 : returns <code>xs:dateTime('2002-03-07T10:00:00-05:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00-07:00'))</code>
 : returns <code>xs:dateTime('2002-03-07T12:00:00-05:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00'),
 : $tz-10)</code> returns
 : <code>xs:dateTime('2002-03-07T10:00:00-10:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00-07:00'),
 : $tz-10)</code> returns
 : <code>xs:dateTime('2002-03-07T07:00:00-10:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00-07:00'),
 : xs:dayTimeDuration("PT10H"))</code> returns
 : <code>xs:dateTime('2002-03-08T03:00:00+10:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T00:00:00+01:00'),
 : xs:dayTimeDuration("-PT8H"))</code> returns
 : <code>xs:dateTime('2002-03-06T15:00:00-08:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00'),
 : ())</code> returns
 : <code>xs:dateTime('2002-03-07T10:00:00')</code>.</p>
 : <p>The expression
 : <code>fn:adjust-dateTime-to-timezone(xs:dateTime('2002-03-07T10:00:00-07:00'),
 : ())</code> returns
 : <code>xs:dateTime('2002-03-07T10:00:00')</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-adjust-dateTime-to-timezone
 :)
declare function fn:adjust-dateTime-to-timezone( $arg as xs:dateTime?,  $timezone as xs:dayTimeDuration?) as  xs:dateTime external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Adjusts an <code>xs:time</code> value to a specific timezone, or
 : to no timezone at all.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:adjust-time-to-timezone</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:time?</code>)<code class="as"> as </code><code class="return-type">xs:time?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:adjust-time-to-timezone</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:time?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$timezone</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dayTimeDuration?</code>)<code class="as"> as </code><code class="return-type">xs:time?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$timezone</code> is not specified, then the effective
 : value of <code>$timezone</code> is the value of the implicit
 : timezone in the dynamic context.</p>
 : <p>If <code>$arg</code> is the empty sequence, then the function
 : returns the empty sequence.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : <code>$arg</code>.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the result
 : is <code>$arg</code> with <code>$timezone</code> as the timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : the localized value of <code>$arg</code> without its timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is not the empty sequence, then:</p>
 : <ul>
 : <li>
 : <p>Let <code>$dt</code> be the <code>xs:dateTime</code> value
 : <span href="#func-dateTime"><code>fn:dateTime(xs:date('1972-12-31'),
 : $arg)</code></span>.</p>
 : </li>
 : <li>
 : <p>Let <code>$adt</code> be the value of <span href="#func-adjust-dateTime-to-timezone"><code>fn:adjust-dateTime-to-timezone($dt,
 : $timezone)</code></span></p>
 : </li>
 : <li>
 : <p>The function returns the <code>xs:time</code> value
 : <code>xs:time($adt)</code>.</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODT0003" title="err:FODT0003">err:FODT0003</span>] if <code>$timezone</code> is less
 : than <code>-PT14H</code> or greater than <code>PT14H</code> or if
 : does not contain an integral number of minutes.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Assume the dynamic context provides an implicit timezone of
 : <code>-05:00 (-PT5H0M)</code>.</p>
 : <p>let <code>$tz-10</code> :=
 : <code>xs:dayTimeDuration("-PT10H")</code></p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00"))</code>
 : returns <code>xs:time("10:00:00-05:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"))</code>
 : returns <code>xs:time("12:00:00-05:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00"),
 : $tz-10)</code> returns <code>xs:time("10:00:00-10:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"),
 : $tz-10)</code> returns <code>xs:time("07:00:00-10:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00"), ())</code>
 : returns <code>xs:time("10:00:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"),
 : ())</code> returns <code>xs:time("10:00:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"),
 : xs:dayTimeDuration("PT10H"))</code> returns
 : <code>xs:time("03:00:00+10:00")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-adjust-time-to-timezone
 :)
declare function fn:adjust-time-to-timezone($arg as xs:time?) as  xs:time? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Adjusts an <code>xs:time</code> value to a specific timezone, or
 : to no timezone at all.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:adjust-time-to-timezone</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:time?</code>)<code class="as"> as </code><code class="return-type">xs:time?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:adjust-time-to-timezone</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:time?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$timezone</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dayTimeDuration?</code>)<code class="as"> as </code><code class="return-type">xs:time?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$timezone</code> is not specified, then the effective
 : value of <code>$timezone</code> is the value of the implicit
 : timezone in the dynamic context.</p>
 : <p>If <code>$arg</code> is the empty sequence, then the function
 : returns the empty sequence.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : <code>$arg</code>.</p>
 : <p>If <code>$arg</code> does not have a timezone component and
 : <code>$timezone</code> is not the empty sequence, then the result
 : is <code>$arg</code> with <code>$timezone</code> as the timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is the empty sequence, then the result is
 : the localized value of <code>$arg</code> without its timezone
 : component.</p>
 : <p>If <code>$arg</code> has a timezone component and
 : <code>$timezone</code> is not the empty sequence, then:</p>
 : <ul>
 : <li>
 : <p>Let <code>$dt</code> be the <code>xs:dateTime</code> value
 : <span href="#func-dateTime"><code>fn:dateTime(xs:date('1972-12-31'),
 : $arg)</code></span>.</p>
 : </li>
 : <li>
 : <p>Let <code>$adt</code> be the value of <span href="#func-adjust-dateTime-to-timezone"><code>fn:adjust-dateTime-to-timezone($dt,
 : $timezone)</code></span></p>
 : </li>
 : <li>
 : <p>The function returns the <code>xs:time</code> value
 : <code>xs:time($adt)</code>.</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODT0003" title="err:FODT0003">err:FODT0003</span>] if <code>$timezone</code> is less
 : than <code>-PT14H</code> or greater than <code>PT14H</code> or if
 : does not contain an integral number of minutes.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Assume the dynamic context provides an implicit timezone of
 : <code>-05:00 (-PT5H0M)</code>.</p>
 : <p>let <code>$tz-10</code> :=
 : <code>xs:dayTimeDuration("-PT10H")</code></p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00"))</code>
 : returns <code>xs:time("10:00:00-05:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"))</code>
 : returns <code>xs:time("12:00:00-05:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00"),
 : $tz-10)</code> returns <code>xs:time("10:00:00-10:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"),
 : $tz-10)</code> returns <code>xs:time("07:00:00-10:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00"), ())</code>
 : returns <code>xs:time("10:00:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"),
 : ())</code> returns <code>xs:time("10:00:00")</code>.</p>
 : <p>The expression
 : <code>fn:adjust-time-to-timezone(xs:time("10:00:00-07:00"),
 : xs:dayTimeDuration("PT10H"))</code> returns
 : <code>xs:time("03:00:00+10:00")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-adjust-time-to-timezone
 :)
declare function fn:adjust-time-to-timezone( $arg as xs:time?,  $timezone as xs:dayTimeDuration?) as  xs:time? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Analyzes a string using a regular expression, returning an XML
 : structure that identifies which parts of the input string matched
 : or failed to match the regular expression, and in the case of
 : matched substrings, which substrings matched each capturing group
 : in the regular expression.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:analyze-string</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">element(fn:analyze-string-result)</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:analyze-string</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$flags</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">element(fn:analyze-string-result)</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the first version of this function
 : (omitting the argument <code>$flags</code>) is the same as the
 : effect of calling the second version with the <code>$flags</code>
 : argument set to a zero-length string. Flags are defined in <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : <p>The <code>$flags</code> argument is interpreted in the same way
 : as for the <span href="#func-matches"><code>fn:matches</code></span>
 : function.</p>
 : <p>If <code>$input</code> is the empty sequence the function
 : behaves as if <code>$input</code> were the zero-length string. In
 : this situation the result will be an element node with no
 : children.</p>
 : <p>The function returns an element node whose local name is
 : <code>analyze-string-result</code>. This element and all its
 : descendant elements have the namespace URI
 : <code>http://www.w3.org/2005/xpath-functions</code>. The namespace
 : prefix is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>. The children of this element are a sequence
 : of <code>fn:match</code> and <code>fn:non-match</code> elements.
 : This sequence is formed by breaking the <code>$input</code> string
 : into a sequence of strings, returning any substring that matches
 : <code>$pattern</code> as the content of a <code>match</code>
 : element, and any intervening substring as the content of a
 : <code>non-match</code> element.</p>
 : <p>More specifically, the function starts at the beginning of the
 : input string and attempts to find the first substring that matches
 : the regular expression. If there are several matches, the first
 : match is defined to be the one whose starting position comes first
 : in the string. If several alternatives within the regular
 : expression both match at the same position in the input string,
 : then the match that is chosen is the first alternative that
 : matches. For example, if the input string is <code>The quick brown
 : fox jumps</code> and the regular expression is
 : <code>jump|jumps</code>, then the match that is chosen is
 : <code>jump</code>.</p>
 : <p>Having found the first match, the instruction proceeds to find
 : the second and subsequent matches by repeating the search, starting
 : at the first <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> that was not included in the previous
 : match.</p>
 : <p>The input string is thus partitioned into a sequence of
 : substrings, some of which match the regular expression, others
 : which do not match it. Each substring will contain at least one
 : character. This sequence is represented in the result by the
 : sequence of <code>fn:match</code> and <code>fn:non-match</code>
 : children of the returned element node; the string value of the
 : <code>fn:match</code> or <code>fn:non-match</code> element will be
 : the corresponding substring of <code>$input</code>, and the string
 : value of the returned element node will therefore be the same as
 : <code>$input</code>.</p>
 : <p>The content of an <code>fn:non-match</code> element is always a
 : single text node.</p>
 : <p>The content of a <code>fn:match</code> element, however, is in
 : general a sequence of text nodes and <code>fn:group</code> element
 : children. An <code>fn:group</code> element with a <code>nr</code>
 : attribute having the integer value <var>N</var> identifies the
 : substring captured by the <var>Nth</var> parenthesized
 : sub-expression in the regular expression. For each capturing
 : subexpression there will be at most one corresponding
 : <code>fn:group</code> element in each <code>fn:match</code> element
 : in the result.</p>
 : <p>If the function is called twice with the same arguments, it is
 : <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span> whether the two calls return the same element
 : node or distinct (but deep equal) element nodes. In this respect it
 : is <span title="" class="termref" href="#"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>.</p>
 : <p>The base URI of the element nodes in the result is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span></p>
 : <p>A schema is defined for the structure of the returned element,
 : containing the definitions below. The returned element and its
 : descendants will have type annotations obtained by validating the
 : returned element against this schema, unless the function is used
 : in an environment where type annotations are not supported (for
 : example, a Basic XSLT Processor), in which case the elements will
 : all be annotated as <code>xs:untyped</code> and the attributes as
 : <code>xs:untypedAtomic</code>.</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;?xml version="1.0" encoding="UTF-8"?&gt;
 : &lt;xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
 :     targetNamespace="http://www.w3.org/2005/xpath-functions"
 :     xmlns:fn="http://www.w3.org/2005/xpath-functions"
 :     elementFormDefault="qualified"&gt; 
 : 
 :     &lt;xs:element name="analyze-string-result" type="fn:analyze-string-result-type"/&gt;
 :     &lt;xs:element name="match" type="fn:match-type"/&gt;
 :     &lt;xs:element name="non-match" type="xs:string"/&gt;
 :     &lt;xs:element name="group" type="fn:group-type"/&gt;
 :     
 :     &lt;xs:complexType name="analyze-string-result-type" mixed="true"&gt;
 :         &lt;xs:choice minOccurs="0" maxOccurs="unbounded"&gt;
 :             &lt;xs:element ref="fn:match"/&gt;
 :             &lt;xs:element ref="fn:non-match"/&gt;
 :         &lt;/xs:choice&gt;
 :     &lt;/xs:complexType&gt;
 :         
 :     &lt;xs:complexType name="match-type" mixed="true"&gt;
 :         &lt;xs:sequence&gt;
 :             &lt;xs:element ref="fn:group" minOccurs="0" maxOccurs="unbounded"/&gt;
 :         &lt;/xs:sequence&gt;
 :     &lt;/xs:complexType&gt;
 :     
 :     &lt;xs:complexType name="group-type" mixed="true"&gt;
 :         &lt;xs:sequence&gt;
 :             &lt;xs:element ref="fn:group" minOccurs="0" maxOccurs="unbounded"/&gt;
 :         &lt;/xs:sequence&gt;
 :         &lt;xs:attribute name="nr" type="xs:positiveInteger"/&gt;
 :     &lt;/xs:complexType&gt;    
 :  
 : &lt;/xs:schema&gt;
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORX0002" title="err:FORX0002">err:FORX0002</span>] if the value of
 : <code>$pattern</code> is invalid according to the rules described
 : in section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0001" title="err:FORX0001">err:FORX0001</span>] if the value of
 : <code>$flags</code> is invalid according to the rules described in
 : section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0003" title="err:FORX0003">err:FORX0003</span>] if the supplied
 : <code>$pattern</code> matches a zero-length string, that is, if
 : <span href="#func-matches"><code>fn:matches("", $pattern,
 : $flags)</code></span> returns <code>true</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>In the following examples, the result document is shown in
 : serialized form, with whitespace between the element nodes. This
 : whitespace is not actually present in the result.</p>
 : <p>The expression <code>fn:analyze-string("The cat sat on the
 : mat.", "\w+")</code> returns <code>&lt;analyze-string-result
 : xmlns="http://www.w3.org/2005/xpath-functions"&gt;
 : &lt;match&gt;The&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;cat&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;sat&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;on&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;the&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;mat&lt;/match&gt; &lt;non-match&gt;.&lt;/non-match&gt;
 : &lt;/analyze-string-result&gt;</code>.</p>
 : <p>The expression <code>fn:analyze-string("2008-12-03",
 : "^(\d+)\-(\d+)\-(\d+)$")</code> returns
 : <code>&lt;analyze-string-result
 : xmlns="http://www.w3.org/2005/xpath-functions"&gt;
 : &lt;match&gt;&lt;group nr="1"&gt;2008&lt;/group&gt;-&lt;group
 : nr="2"&gt;12&lt;/group&gt;-&lt;group
 : nr="3"&gt;03&lt;/group&gt;&lt;/match&gt;
 : &lt;/analyze-string-result&gt;</code>.</p>
 : <p>The expression <code>fn:analyze-string("A1,C15,,D24, X50,",
 : "([A-Z])([0-9]+)")</code> returns <code>&lt;analyze-string-result
 : xmlns="http://www.w3.org/2005/xpath-functions"&gt;
 : &lt;match&gt;&lt;group nr="1"&gt;A&lt;/group&gt;&lt;group
 : nr="2"&gt;1&lt;/group&gt;&lt;/match&gt;
 : &lt;non-match&gt;,&lt;/non-match&gt; &lt;match&gt;&lt;group
 : nr="1"&gt;C&lt;/group&gt;&lt;group
 : nr="2"&gt;15&lt;/group&gt;&lt;/match&gt;
 : &lt;non-match&gt;,,&lt;/non-match&gt; &lt;match&gt;&lt;group
 : nr="1"&gt;D&lt;/group&gt;&lt;group
 : nr="2"&gt;24&lt;/group&gt;&lt;/match&gt; &lt;non-match&gt;,
 : &lt;/non-match&gt; &lt;match&gt;&lt;group
 : nr="1"&gt;X&lt;/group&gt;&lt;group
 : nr="2"&gt;50&lt;/group&gt;&lt;/match&gt;
 : &lt;non-match&gt;,&lt;/non-match&gt;
 : &lt;/analyze-string-result&gt;</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-analyze-string
 :)
declare function fn:analyze-string( $input as xs:string?,  $pattern as xs:string) as  element(fn:analyze-string-result) external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Analyzes a string using a regular expression, returning an XML
 : structure that identifies which parts of the input string matched
 : or failed to match the regular expression, and in the case of
 : matched substrings, which substrings matched each capturing group
 : in the regular expression.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:analyze-string</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">element(fn:analyze-string-result)</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:analyze-string</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$flags</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">element(fn:analyze-string-result)</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the first version of this function
 : (omitting the argument <code>$flags</code>) is the same as the
 : effect of calling the second version with the <code>$flags</code>
 : argument set to a zero-length string. Flags are defined in <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : <p>The <code>$flags</code> argument is interpreted in the same way
 : as for the <span href="#func-matches"><code>fn:matches</code></span>
 : function.</p>
 : <p>If <code>$input</code> is the empty sequence the function
 : behaves as if <code>$input</code> were the zero-length string. In
 : this situation the result will be an element node with no
 : children.</p>
 : <p>The function returns an element node whose local name is
 : <code>analyze-string-result</code>. This element and all its
 : descendant elements have the namespace URI
 : <code>http://www.w3.org/2005/xpath-functions</code>. The namespace
 : prefix is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>. The children of this element are a sequence
 : of <code>fn:match</code> and <code>fn:non-match</code> elements.
 : This sequence is formed by breaking the <code>$input</code> string
 : into a sequence of strings, returning any substring that matches
 : <code>$pattern</code> as the content of a <code>match</code>
 : element, and any intervening substring as the content of a
 : <code>non-match</code> element.</p>
 : <p>More specifically, the function starts at the beginning of the
 : input string and attempts to find the first substring that matches
 : the regular expression. If there are several matches, the first
 : match is defined to be the one whose starting position comes first
 : in the string. If several alternatives within the regular
 : expression both match at the same position in the input string,
 : then the match that is chosen is the first alternative that
 : matches. For example, if the input string is <code>The quick brown
 : fox jumps</code> and the regular expression is
 : <code>jump|jumps</code>, then the match that is chosen is
 : <code>jump</code>.</p>
 : <p>Having found the first match, the instruction proceeds to find
 : the second and subsequent matches by repeating the search, starting
 : at the first <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> that was not included in the previous
 : match.</p>
 : <p>The input string is thus partitioned into a sequence of
 : substrings, some of which match the regular expression, others
 : which do not match it. Each substring will contain at least one
 : character. This sequence is represented in the result by the
 : sequence of <code>fn:match</code> and <code>fn:non-match</code>
 : children of the returned element node; the string value of the
 : <code>fn:match</code> or <code>fn:non-match</code> element will be
 : the corresponding substring of <code>$input</code>, and the string
 : value of the returned element node will therefore be the same as
 : <code>$input</code>.</p>
 : <p>The content of an <code>fn:non-match</code> element is always a
 : single text node.</p>
 : <p>The content of a <code>fn:match</code> element, however, is in
 : general a sequence of text nodes and <code>fn:group</code> element
 : children. An <code>fn:group</code> element with a <code>nr</code>
 : attribute having the integer value <var>N</var> identifies the
 : substring captured by the <var>Nth</var> parenthesized
 : sub-expression in the regular expression. For each capturing
 : subexpression there will be at most one corresponding
 : <code>fn:group</code> element in each <code>fn:match</code> element
 : in the result.</p>
 : <p>If the function is called twice with the same arguments, it is
 : <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span> whether the two calls return the same element
 : node or distinct (but deep equal) element nodes. In this respect it
 : is <span title="" class="termref" href="#"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>.</p>
 : <p>The base URI of the element nodes in the result is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span></p>
 : <p>A schema is defined for the structure of the returned element,
 : containing the definitions below. The returned element and its
 : descendants will have type annotations obtained by validating the
 : returned element against this schema, unless the function is used
 : in an environment where type annotations are not supported (for
 : example, a Basic XSLT Processor), in which case the elements will
 : all be annotated as <code>xs:untyped</code> and the attributes as
 : <code>xs:untypedAtomic</code>.</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;?xml version="1.0" encoding="UTF-8"?&gt;
 : &lt;xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
 :     targetNamespace="http://www.w3.org/2005/xpath-functions"
 :     xmlns:fn="http://www.w3.org/2005/xpath-functions"
 :     elementFormDefault="qualified"&gt; 
 : 
 :     &lt;xs:element name="analyze-string-result" type="fn:analyze-string-result-type"/&gt;
 :     &lt;xs:element name="match" type="fn:match-type"/&gt;
 :     &lt;xs:element name="non-match" type="xs:string"/&gt;
 :     &lt;xs:element name="group" type="fn:group-type"/&gt;
 :     
 :     &lt;xs:complexType name="analyze-string-result-type" mixed="true"&gt;
 :         &lt;xs:choice minOccurs="0" maxOccurs="unbounded"&gt;
 :             &lt;xs:element ref="fn:match"/&gt;
 :             &lt;xs:element ref="fn:non-match"/&gt;
 :         &lt;/xs:choice&gt;
 :     &lt;/xs:complexType&gt;
 :         
 :     &lt;xs:complexType name="match-type" mixed="true"&gt;
 :         &lt;xs:sequence&gt;
 :             &lt;xs:element ref="fn:group" minOccurs="0" maxOccurs="unbounded"/&gt;
 :         &lt;/xs:sequence&gt;
 :     &lt;/xs:complexType&gt;
 :     
 :     &lt;xs:complexType name="group-type" mixed="true"&gt;
 :         &lt;xs:sequence&gt;
 :             &lt;xs:element ref="fn:group" minOccurs="0" maxOccurs="unbounded"/&gt;
 :         &lt;/xs:sequence&gt;
 :         &lt;xs:attribute name="nr" type="xs:positiveInteger"/&gt;
 :     &lt;/xs:complexType&gt;    
 :  
 : &lt;/xs:schema&gt;
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORX0002" title="err:FORX0002">err:FORX0002</span>] if the value of
 : <code>$pattern</code> is invalid according to the rules described
 : in section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0001" title="err:FORX0001">err:FORX0001</span>] if the value of
 : <code>$flags</code> is invalid according to the rules described in
 : section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0003" title="err:FORX0003">err:FORX0003</span>] if the supplied
 : <code>$pattern</code> matches a zero-length string, that is, if
 : <span href="#func-matches"><code>fn:matches("", $pattern,
 : $flags)</code></span> returns <code>true</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>In the following examples, the result document is shown in
 : serialized form, with whitespace between the element nodes. This
 : whitespace is not actually present in the result.</p>
 : <p>The expression <code>fn:analyze-string("The cat sat on the
 : mat.", "\w+")</code> returns <code>&lt;analyze-string-result
 : xmlns="http://www.w3.org/2005/xpath-functions"&gt;
 : &lt;match&gt;The&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;cat&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;sat&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;on&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;the&lt;/match&gt; &lt;non-match&gt; &lt;/non-match&gt;
 : &lt;match&gt;mat&lt;/match&gt; &lt;non-match&gt;.&lt;/non-match&gt;
 : &lt;/analyze-string-result&gt;</code>.</p>
 : <p>The expression <code>fn:analyze-string("2008-12-03",
 : "^(\d+)\-(\d+)\-(\d+)$")</code> returns
 : <code>&lt;analyze-string-result
 : xmlns="http://www.w3.org/2005/xpath-functions"&gt;
 : &lt;match&gt;&lt;group nr="1"&gt;2008&lt;/group&gt;-&lt;group
 : nr="2"&gt;12&lt;/group&gt;-&lt;group
 : nr="3"&gt;03&lt;/group&gt;&lt;/match&gt;
 : &lt;/analyze-string-result&gt;</code>.</p>
 : <p>The expression <code>fn:analyze-string("A1,C15,,D24, X50,",
 : "([A-Z])([0-9]+)")</code> returns <code>&lt;analyze-string-result
 : xmlns="http://www.w3.org/2005/xpath-functions"&gt;
 : &lt;match&gt;&lt;group nr="1"&gt;A&lt;/group&gt;&lt;group
 : nr="2"&gt;1&lt;/group&gt;&lt;/match&gt;
 : &lt;non-match&gt;,&lt;/non-match&gt; &lt;match&gt;&lt;group
 : nr="1"&gt;C&lt;/group&gt;&lt;group
 : nr="2"&gt;15&lt;/group&gt;&lt;/match&gt;
 : &lt;non-match&gt;,,&lt;/non-match&gt; &lt;match&gt;&lt;group
 : nr="1"&gt;D&lt;/group&gt;&lt;group
 : nr="2"&gt;24&lt;/group&gt;&lt;/match&gt; &lt;non-match&gt;,
 : &lt;/non-match&gt; &lt;match&gt;&lt;group
 : nr="1"&gt;X&lt;/group&gt;&lt;group
 : nr="2"&gt;50&lt;/group&gt;&lt;/match&gt;
 : &lt;non-match&gt;,&lt;/non-match&gt;
 : &lt;/analyze-string-result&gt;</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-analyze-string
 :)
declare function fn:analyze-string( $input as xs:string?,  $pattern as xs:string,  $flags as xs:string) as  element(fn:analyze-string-result) external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a list of environment variable names that are suitable
 : for passing to <span href="#func-environment-variable"><code>fn:environment-variable</code></span>,
 : as a (possibly empty) sequence of strings.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:available-environment-variables</code>()<code class="as"> as </code><code class="return-type">xs:string*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on environment-variables.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence of strings, being the names of
 : the environment variables in the dynamic context in some <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation-dependent<span class="arrow">·</span></span> order.</p>
 : <p>The function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>: that
 : is, the set of available environment variables does not vary during
 : evaluation.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The function returns a list of strings, containing no
 : duplicates.</p>
 : <p>It is intended that the strings in this list should be suitable
 : for passing to <span href="#func-environment-variable"><code>fn:environment-variable</code></span>.</p>
 : <p>See also the note on security under the definition of the
 : <span href="#func-environment-variable"><code>fn:environment-variable</code></span>
 : function. If access to environment variables has been disabled,
 : <code>fn:available-environment-variables</code> always returns the
 : empty sequence.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-available-environment-variables
 :)
declare function fn:available-environment-variables() as  xs:string* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the average of the values in the input sequence
 : <code>$arg</code>, that is, the sum of the values divided by the
 : number of values.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:avg</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the empty sequence
 : is returned.</p>
 : <p>If <code>$arg</code> contains values of type
 : <code>xs:untypedAtomic</code> they are cast to
 : <code>xs:double</code>.</p>
 : <p>Duration values must either all be
 : <code>xs:yearMonthDuration</code> values or must all be
 : <code>xs:dayTimeDuration</code> values. For numeric values, the
 : numeric promotion rules defined in <span href="#op.numeric"><b>4.2
 : Arithmetic operators on numeric values</b></span> are used to promote
 : all values to a single common type. After these operations,
 : <code>$arg</code> must contain items of a single type, which must
 : be one of the four numeric types, <code>xs:yearMonthDuration</code>
 : or <code>xs:dayTimeDuration</code> or one if its subtypes.</p>
 : <p>The function returns the average of the values as
 : <code>sum($arg) div count($arg)</code>; but the implementation may
 : use an otherwise equivalent algorithm that avoids arithmetic
 : overflow.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>A type error is raised [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>] if the input sequence contains
 : items of incompatible types, as described above.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$d1</code> :=
 : <code>xs:yearMonthDuration("P20Y")</code></p>
 : <p>let <code>$d2</code> :=
 : <code>xs:yearMonthDuration("P10M")</code></p>
 : <p>let <code>$seq3</code> := <code>(3, 4, 5)</code></p>
 : <p>The expression <code>fn:avg($seq3)</code> returns
 : <code>4.0</code>. <em>(The result is of type
 : <code>xs:decimal</code>.).</em></p>
 : <p>The expression <code>fn:avg(($d1, $d2))</code> returns
 : <code>xs:yearMonthDuration("P10Y5M")</code>.</p>
 : <p><code>fn:avg(($d1, $seq3))</code> raises a type error [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : <p>The expression <code>fn:avg(())</code> returns
 : <code>()</code>.</p>
 : <p>The expression <code>fn:avg((xs:float('INF'),
 : xs:float('-INF')))</code> returns <code>xs:float('NaN')</code>.</p>
 : <p>The expression <code>fn:avg(($seq3, xs:float('NaN')))</code>
 : returns <code>xs:float('NaN')</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-avg
 :)
declare function fn:avg($arg as xs:anyAtomicType*) as  xs:anyAtomicType? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Computes the effective boolean value of the sequence
 : <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:boolean</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function computes the effective boolean value of a sequence,
 : defined according to the following rules. See also <span href="http://www.w3.org/TR/xpath-30/#id-ebv">Section 2.4.3 Effective
 : Boolean Value</span> <sup><small>XP30</small></sup>.</p>
 : <ul>
 : <li>
 : <p>If <code>$arg</code> is the empty sequence,
 : <code>fn:boolean</code> returns <code>false</code>.</p>
 : </li>
 : <li>
 : <p>If <code>$arg</code> is a sequence whose first item is a node,
 : <code>fn:boolean</code> returns <code>true</code>.</p>
 : </li>
 : <li>
 : <p>If <code>$arg</code> is a singleton value of type
 : <code>xs:boolean</code> or a derived from <code>xs:boolean</code>,
 : <code>fn:boolean</code> returns <code>$arg</code>.</p>
 : </li>
 : <li>
 : <p>If <code>$arg</code> is a singleton value of type
 : <code>xs:string</code> or a type derived from
 : <code>xs:string</code>, <code>xs:anyURI</code> or a type derived
 : from <code>xs:anyURI</code> or <code>xs:untypedAtomic</code>,
 : <code>fn:boolean</code> returns <code>false</code> if the operand
 : value has zero length; otherwise it returns <code>true</code>.</p>
 : </li>
 : <li>
 : <p>If <code>$arg</code> is a singleton value of any numeric type or
 : a type derived from a numeric type, <code>fn:boolean</code> returns
 : <code>false</code> if the operand value is <code>NaN</code> or is
 : numerically equal to zero; otherwise it returns
 : <code>true</code>.</p>
 : </li>
 : <li>
 : <p>In all other cases, <code>fn:boolean</code> raises a type error
 : [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The result of this function is not necessarily the same as
 : <code>$arg cast as xs:boolean</code>. For example,
 : <code>fn:boolean("false")</code> returns the value
 : <code>true</code> whereas <code>"false" cast as xs:boolean</code>
 : (which can also be written <code>xs:boolean("false")</code>)
 : returns <code>false</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$abc</code> := <code>("a", "b", "")</code></p>
 : <p><code>fn:boolean($abc)</code> raises a type error [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : <p>The expression <code>fn:boolean($abc[1])</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:boolean($abc[0])</code> returns
 : <code>false()</code>.</p>
 : <p>The expression <code>fn:boolean($abc[3])</code> returns
 : <code>false()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-boolean
 :)
declare function fn:boolean($arg as item()*) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Rounds <code>$arg</code> upwards to a whole number.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:ceiling</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>General rules: see <span href="#numeric-value-functions"><b>4.4
 : Functions on numeric values</b></span>.</p>
 : <p>The function returns the smallest (closest to negative infinity)
 : number with no fractional part that is not less than the value of
 : <code>$arg</code>.</p>
 : <p>If the type of <code>$arg</code> is one of the four numeric
 : types <code>xs:float</code>, <code>xs:double</code>,
 : <code>xs:decimal</code> or <code>xs:integer</code> the type of the
 : result is the same as the type of <code>$arg</code>. If the type of
 : <code>$arg</code> is a type derived from one of the numeric types,
 : the result is an instance of the base numeric type.</p>
 : <p>For <code>xs:float</code> and <code>xs:double</code> arguments,
 : if the argument is positive zero, then positive zero is returned.
 : If the argument is negative zero, then negative zero is returned.
 : If the argument is less than zero and greater than -1, negative
 : zero is returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:ceiling(10.5)</code> returns
 : <code>11</code>.</p>
 : <p>The expression <code>fn:ceiling(-10.5)</code> returns
 : <code>-10</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-ceiling
 :)
declare function fn:ceiling($arg as numeric?) as  numeric? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if two strings are equal, considered
 : codepoint-by-codepoint.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:codepoint-equal</code>(</td>
 : <td valign="baseline"><code class="arg">$comparand1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$comparand2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If either argument is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns <code>true</code> or
 : <code>false</code> depending on whether the value of
 : <code>$comparand1</code> is equal to the value of
 : <code>$comparand2</code>, according to the Unicode codepoint
 : collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function allows <code>xs:anyURI</code> values to be
 : compared without having to specify the Unicode codepoint
 : collation.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:codepoint-equal("abcd", "abcd")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:codepoint-equal("abcd", "abcd ")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:codepoint-equal("", "")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:codepoint-equal("", ())</code> returns
 : <code>()</code>.</p>
 : <p>The expression <code>fn:codepoint-equal((), ())</code> returns
 : <code>()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-codepoint-equal
 :)
declare function fn:codepoint-equal( $comparand1 as xs:string?,  $comparand2 as xs:string?) as  xs:boolean? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Creates an <code>xs:string</code> from a sequence of <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:codepoints-to-string</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:integer*</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the string made up from the <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> whose
 : Unicode <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span> are supplied in <code>$arg</code>. This will
 : be the zero-length string if <code>$arg</code> is the empty
 : sequence.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOCH0001" title="err:FOCH0001">err:FOCH0001</span>] if any of the codepoints in
 : <code>$arg</code> is not a permitted XML character.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:codepoints-to-string((66, 65, 67,
 : 72))</code> returns <code>"BACH"</code>.</p>
 : <p>The expression <code>fn:codepoints-to-string((2309, 2358, 2378,
 : 2325))</code> returns <code>"अशॊक"</code>.</p>
 : <p>The expression <code>fn:codepoints-to-string(())</code> returns
 : <code>""</code>.</p>
 : <p>The expression <code>fn:codepoints-to-string(0)</code> raises
 : error <code>FOCH0001</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-codepoints-to-string
 :)
declare function fn:codepoints-to-string($arg as xs:integer*) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of nodes representing a collection of
 : documents indentified by a collection URI; or a default collection
 : if no URI is supplied.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:collection</code>()<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:collection</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on available-collections.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>This function takes an <code>xs:string</code> as argument and
 : returns a sequence of nodes obtained by interpreting
 : <code>$arg</code> as an <code>xs:anyURI</code> and resolving it
 : according to the mapping specified in <b>Available collections</b>
 : described in <span href="http://www.w3.org/TR/xpath-30/#id-xp-evaluation-context-components">
 : Section C.2 Dynamic Context Components</span>
 : <sup><small>XP30</small></sup>.</p>
 : <p>If <b>Available collections</b> provides a mapping from this
 : string to a sequence of nodes, the function returns that sequence.
 : If <b>Available collections</b> maps the string to an empty
 : sequence, then the function returns an empty sequence.</p>
 : <p>If <code>$arg</code> is not specified, the function returns the
 : sequence of the nodes in the default collection in the dynamic
 : context. See <span href="http://www.w3.org/TR/xpath-30/#id-xp-evaluation-context-components">
 : Section C.2 Dynamic Context Components</span>
 : <sup><small>XP30</small></sup>.</p>
 : <p>If the value of <code>$arg</code> is a relative
 : <code>xs:anyURI</code>, it is resolved against the value of the
 : base-URI property from the static context.</p>
 : <p>If <code>$arg</code> is the empty sequence, the function behaves
 : as if it had been called without an argument. See above.</p>
 : <p>By default, this function is <span title="" class="termref" href="#"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>. This means that repeated calls on the
 : function with the same argument will return the same result.
 : However, for performance reasons, implementations may provide a
 : user option to evaluate the function without a guarantee of
 : determinism. The manner in which any such option is provided is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. If the user has not selected such an option,
 : a call to this function must either return a deterministic result
 : or must raise an error [<span href="#ERRFODC0003" title="err:FODC0003">err:FODC0003</span>].</p>
 : <p>There is no requirement that the returned nodes should be in
 : document order, nor is there a requirement that the result should
 : contain no duplicates.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if no URI is supplied and the
 : value of the default collection is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if <b>available collections</b>
 : provides no mapping for the absolutized URI.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <code>$arg</code> is not a
 : valid <code>xs:anyURI</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function provides a facility for users to work with a
 : collection of documents which may be contained in a directory or
 : rows of a Relational table or other implementation-specific
 : construct. An implementation may also use external variables to
 : identify external resources, but <code>fn:collection</code>
 : provides functionality not provided by external variables.
 : Specifying resources using URIs is useful because URIs are dynamic,
 : can be parameterized, and do not rely on an external
 : environment.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-collection
 :)
declare function fn:collection() as  node()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of nodes representing a collection of
 : documents indentified by a collection URI; or a default collection
 : if no URI is supplied.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:collection</code>()<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:collection</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on available-collections.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>This function takes an <code>xs:string</code> as argument and
 : returns a sequence of nodes obtained by interpreting
 : <code>$arg</code> as an <code>xs:anyURI</code> and resolving it
 : according to the mapping specified in <b>Available collections</b>
 : described in <span href="http://www.w3.org/TR/xpath-30/#id-xp-evaluation-context-components">
 : Section C.2 Dynamic Context Components</span>
 : <sup><small>XP30</small></sup>.</p>
 : <p>If <b>Available collections</b> provides a mapping from this
 : string to a sequence of nodes, the function returns that sequence.
 : If <b>Available collections</b> maps the string to an empty
 : sequence, then the function returns an empty sequence.</p>
 : <p>If <code>$arg</code> is not specified, the function returns the
 : sequence of the nodes in the default collection in the dynamic
 : context. See <span href="http://www.w3.org/TR/xpath-30/#id-xp-evaluation-context-components">
 : Section C.2 Dynamic Context Components</span>
 : <sup><small>XP30</small></sup>.</p>
 : <p>If the value of <code>$arg</code> is a relative
 : <code>xs:anyURI</code>, it is resolved against the value of the
 : base-URI property from the static context.</p>
 : <p>If <code>$arg</code> is the empty sequence, the function behaves
 : as if it had been called without an argument. See above.</p>
 : <p>By default, this function is <span title="" class="termref" href="#"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>. This means that repeated calls on the
 : function with the same argument will return the same result.
 : However, for performance reasons, implementations may provide a
 : user option to evaluate the function without a guarantee of
 : determinism. The manner in which any such option is provided is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. If the user has not selected such an option,
 : a call to this function must either return a deterministic result
 : or must raise an error [<span href="#ERRFODC0003" title="err:FODC0003">err:FODC0003</span>].</p>
 : <p>There is no requirement that the returned nodes should be in
 : document order, nor is there a requirement that the result should
 : contain no duplicates.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if no URI is supplied and the
 : value of the default collection is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if <b>available collections</b>
 : provides no mapping for the absolutized URI.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <code>$arg</code> is not a
 : valid <code>xs:anyURI</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function provides a facility for users to work with a
 : collection of documents which may be contained in a directory or
 : rows of a Relational table or other implementation-specific
 : construct. An implementation may also use external variables to
 : identify external resources, but <code>fn:collection</code>
 : provides functionality not provided by external variables.
 : Specifying resources using URIs is useful because URIs are dynamic,
 : can be parameterized, and do not rely on an external
 : environment.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-collection
 :)
declare function fn:collection($arg as xs:string?) as  node()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns -1, 0, or 1, depending on whether
 : <code>$comparand1</code> collates before, equal to, or after
 : <code>$comparand2</code> according to the rules of a selected
 : collation.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:compare</code>(<code class="arg">$comparand1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$comparand2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:compare</code>(</td>
 : <td valign="baseline"><code class="arg">$comparand1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$comparand2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns -1, 0, or 1, depending on whether the value of the
 : <code>$comparand1</code> is respectively less than, equal to, or
 : greater than the value of <code>$comparand2</code>, according to
 : the rules of the collation that is used.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>If either <code>$comparand1</code> or <code>$comparand2</code>
 : is the empty sequence, the function returns the empty sequence.</p>
 : <p>This function, called with the first signature, defines the
 : semantics of the "eq", "ne", "gt", "lt", "le" and "ge" operators on
 : <code>xs:string</code> values.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:compare('abc', 'abc')</code> returns
 : <code>0</code>.</p>
 : <p>The expression <code>fn:compare('Strasse', 'Straße')</code>
 : returns <code>0</code>. <em>(Assuming the default collation
 : includes provisions that equate "ss" and the (German) character "ß"
 : ("sharp-s"). Otherwise, the returned value depends on the semantics
 : of the default collation.).</em></p>
 : <p>The expression <code>fn:compare('Strasse', 'Straße',
 : 'http://example.com/deutsch')</code> returns <code>0</code>.
 : <em>(Assuming the collation identified by the URI
 : <code>http://example.com/deutsch</code> includes provisions that
 : equate "ss" and the (German) character "ß" ("sharp-s"). Otherwise,
 : the returned value depends on the semantics of that
 : collation.).</em></p>
 : <p>The expression <code>fn:compare('Strassen', 'Straße')</code>
 : returns <code>1</code>. <em>(Assuming the default collation
 : includes provisions that treat differences between "ss" and the
 : (German) character "ß" ("sharp-s") with less strength than the
 : differences between the base characters, such as the final "n".
 : ).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-compare
 :)
declare function fn:compare($comparand1 as xs:string?,  $comparand2 as xs:string?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns -1, 0, or 1, depending on whether
 : <code>$comparand1</code> collates before, equal to, or after
 : <code>$comparand2</code> according to the rules of a selected
 : collation.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:compare</code>(<code class="arg">$comparand1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$comparand2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:compare</code>(</td>
 : <td valign="baseline"><code class="arg">$comparand1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$comparand2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns -1, 0, or 1, depending on whether the value of the
 : <code>$comparand1</code> is respectively less than, equal to, or
 : greater than the value of <code>$comparand2</code>, according to
 : the rules of the collation that is used.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>If either <code>$comparand1</code> or <code>$comparand2</code>
 : is the empty sequence, the function returns the empty sequence.</p>
 : <p>This function, called with the first signature, defines the
 : semantics of the "eq", "ne", "gt", "lt", "le" and "ge" operators on
 : <code>xs:string</code> values.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:compare('abc', 'abc')</code> returns
 : <code>0</code>.</p>
 : <p>The expression <code>fn:compare('Strasse', 'Straße')</code>
 : returns <code>0</code>. <em>(Assuming the default collation
 : includes provisions that equate "ss" and the (German) character "ß"
 : ("sharp-s"). Otherwise, the returned value depends on the semantics
 : of the default collation.).</em></p>
 : <p>The expression <code>fn:compare('Strasse', 'Straße',
 : 'http://example.com/deutsch')</code> returns <code>0</code>.
 : <em>(Assuming the collation identified by the URI
 : <code>http://example.com/deutsch</code> includes provisions that
 : equate "ss" and the (German) character "ß" ("sharp-s"). Otherwise,
 : the returned value depends on the semantics of that
 : collation.).</em></p>
 : <p>The expression <code>fn:compare('Strassen', 'Straße')</code>
 : returns <code>1</code>. <em>(Assuming the default collation
 : includes provisions that treat differences between "ss" and the
 : (German) character "ß" ("sharp-s") with less strength than the
 : differences between the base characters, such as the final "n".
 : ).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-compare
 :)
declare function fn:compare( $comparand1 as xs:string?,  $comparand2 as xs:string?,  $collation as xs:string) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the concatenation of the string values of the
 : arguments.</p>
 : </dd>
 : <dt class="label">Operator Mapping</dt>
 : <dd>
 : <p>The two-argument form of this function defines the semantics of
 : the "||" operator.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:concat</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><span class="varargs">...</span></td>
 : <td valign="baseline">)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>This function accepts two or more <code>xs:anyAtomicType</code>
 : arguments and casts each one to <code>xs:string</code>. The
 : function returns the <code>xs:string</code> that is the
 : concatenation of the values of its arguments after conversion. If
 : any argument is the empty sequence, that argument is treated as the
 : zero-length string.</p>
 : <p>The <code>fn:concat</code> function is specified to allow two or
 : more arguments, which are concatenated together. This is the only
 : function specified in this document that allows a variable number
 : of arguments. This capability is retained for compatibility with
 : <span href="#xpath">[XML Path Language (XPath) Version 1.0]</span>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>As mentioned in <span href="#string-types"><b>5.1 String
 : types</b></span> Unicode normalization is not automatically applied to
 : the result of <code>fn:concat</code>. If a normalized result is
 : required, <span href="#func-normalize-unicode"><code>fn:normalize-unicode</code></span> can
 : be applied to the <code>xs:string</code> returned by
 : <code>fn:concat</code>. The following XQuery:</p>
 : <div class="exampleInner">
 : <pre>
 : let $v1 := "I plan to go to Mu"
 : let $v2 := "?nchen in September"
 : return concat($v1, $v2)
 : </pre></div>
 : <p>where the "?" represents either the actual Unicode character
 : COMBINING DIARESIS (Unicode codepoint U+0308) or "&amp;#x0308;",
 : will return:</p>
 : <p>"I plan to go to Mu?nchen in September"</p>
 : <p>where the "?" represents either the actual Unicode character
 : COMBINING DIARESIS (Unicode codepoint U+0308) or "&amp;#x0308;". It
 : is worth noting that the returned value is not normalized in NFC;
 : however, it is normalized in NFD. .</p>
 : <p>However, the following XQuery:</p>
 : <div class="exampleInner">
 : <pre>
 : let $v1 := "I plan to go to Mu"
 : let $v2 := "?nchen in September"
 : return normalize-unicode(concat($v1, $v2))
 : </pre></div>
 : <p>where the "?" represents either the actual Unicode character
 : COMBINING DIARESIS (Unicode codepoint U+0308) or "&amp;#x0308;",
 : will return:</p>
 : <p>"I plan to go to München in September"</p>
 : <p>This returned result is normalized in NFC.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:concat('un', 'grateful')</code> returns
 : <code>"ungrateful"</code>.</p>
 : <p>The expression <code>fn:concat('Thy ', (), 'old ', "groans", "",
 : ' ring', ' yet', ' in', ' my', ' ancient',' ears.')</code> returns
 : <code>"Thy old groans ring yet in my ancient ears."</code>.</p>
 : <p>The expression <code>fn:concat('Ciao!',())</code> returns
 : <code>"Ciao!"</code>.</p>
 : <p>The expression <code>fn:concat('Ingratitude, ', 'thou ',
 : 'marble-hearted', ' fiend!')</code> returns <code>"Ingratitude,
 : thou marble-hearted fiend!"</code>.</p>
 : <p>The expression <code>fn:concat(01, 02, 03, 04, true())</code>
 : returns <code>"1234true"</code>.</p>
 : <p>The expression <code>10 || '/' || 6</code> returns
 : <code>"10/6"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-concat
 :)
declare function fn:concat( $arg1 as xs:anyAtomicType?,  $arg2 as xs:anyAtomicType?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the string <code>$arg1</code> contains
 : <code>$arg2</code> as a substring, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:contains</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:contains</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns <code>true</code>.</p>
 : <p>If the value of <code>$arg1</code> is the zero-length string,
 : the function returns <code>false</code>.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns an <code>xs:boolean</code> indicating
 : whether or not the value of <code>$arg1</code> contains (at the
 : beginning, at the end, or anywhere within) at least one sequence of
 : collation units that provides a <b>minimal match</b> to the
 : collation units in the value of <code>$arg2</code>, according to
 : the collation that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Minimal match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:contains ( "tattoo", "t")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:contains ( "tattoo", "ttt")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:contains ( "", ())</code> returns
 : <code>true()</code>. <em>(The first rule is applied, followed by
 : the second rule.).</em></p>
 : <p>The expression <code>fn:contains ( "abcdefghi", "-d-e-f-",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:contains ( "a*b*c*d*e*f*g*h*i*",
 : "d-ef-", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:contains ( "abcd***e---f*--*ghi", "def",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:contains ( (), "--***-*---",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>. <em>(The second argument contains only
 : ignorable collation units and is equivalent to the zero-length
 : string.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-contains
 :)
declare function fn:contains($arg1 as xs:string?,  $arg2 as xs:string?) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the string <code>$arg1</code> contains
 : <code>$arg2</code> as a substring, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:contains</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:contains</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns <code>true</code>.</p>
 : <p>If the value of <code>$arg1</code> is the zero-length string,
 : the function returns <code>false</code>.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns an <code>xs:boolean</code> indicating
 : whether or not the value of <code>$arg1</code> contains (at the
 : beginning, at the end, or anywhere within) at least one sequence of
 : collation units that provides a <b>minimal match</b> to the
 : collation units in the value of <code>$arg2</code>, according to
 : the collation that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Minimal match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:contains ( "tattoo", "t")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:contains ( "tattoo", "ttt")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:contains ( "", ())</code> returns
 : <code>true()</code>. <em>(The first rule is applied, followed by
 : the second rule.).</em></p>
 : <p>The expression <code>fn:contains ( "abcdefghi", "-d-e-f-",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:contains ( "a*b*c*d*e*f*g*h*i*",
 : "d-ef-", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:contains ( "abcd***e---f*--*ghi", "def",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:contains ( (), "--***-*---",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>. <em>(The second argument contains only
 : ignorable collation units and is equivalent to the zero-length
 : string.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-contains
 :)
declare function fn:contains( $arg1 as xs:string?,  $arg2 as xs:string?,  $collation as xs:string) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of items in a sequence.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:count</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:integer</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the number of items in the value of
 : <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Returns 0 if <code>$arg</code> is the empty sequence.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$seq1</code> := <code>($item1, $item2)</code></p>
 : <p>let <code>$seq2</code> := <code>(98.5, 98.3, 98.9)</code></p>
 : <p>let <code>$seq3</code> := <code>()</code></p>
 : <p>The expression <code>fn:count($seq1)</code> returns
 : <code>2</code>.</p>
 : <p>The expression <code>fn:count($seq3)</code> returns
 : <code>0</code>.</p>
 : <p>The expression <code>fn:count($seq2)</code> returns
 : <code>3</code>.</p>
 : <p>The expression <code>fn:count($seq2[. &gt; 100])</code> returns
 : <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-count
 :)
declare function fn:count($arg as item()*) as  xs:integer external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns an <code>xs:dateTime</code> value created by combining
 : an <code>xs:date</code> and an <code>xs:time</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:dateTime</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:date?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:time?</code>)<code class="as"> as </code><code class="return-type">xs:dateTime?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If either <code>$arg1</code> or <code>$arg2</code> is the empty
 : sequence the function returns the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:dateTime</code>
 : whose date component is equal to <code>$arg1</code> and whose time
 : component is equal to <code>$arg2</code>.</p>
 : <p>The timezone of the result is computed as follows:</p>
 : <ul>
 : <li>
 : <p>If neither argument has a timezone, the result has no
 : timezone.</p>
 : </li>
 : <li>
 : <p>If exactly one of the arguments has a timezone, or if both
 : arguments have the same timezone, the result has this timezone.</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORG0008" title="err:FORG0008">err:FORG0008</span>] if the two arguments both have
 : timezones and the timezones are different.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:dateTime(xs:date("1999-12-31"),
 : xs:time("12:00:00"))</code> returns
 : <code>xs:dateTime("1999-12-31T12:00:00")</code>.</p>
 : <p>The expression <code>fn:dateTime(xs:date("1999-12-31"),
 : xs:time("24:00:00"))</code> returns
 : <code>xs:dateTime("1999-12-31T00:00:00")</code>. <em>(This is
 : because <code>"24:00:00"</code> is an alternate lexical form for
 : <code>"00:00:00"</code>).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-dateTime
 :)
declare function fn:dateTime($arg1 as xs:date?,  $arg2 as xs:time?) as  xs:dateTime? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the day component of an <code>xs:date</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:day-from-date</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:date?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : between 1 and 31, both inclusive, representing the day component in
 : the localized value of <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:day-from-date(xs:date("1999-05-31-05:00"))</code> returns
 : <code>31</code>.</p>
 : <p>The expression
 : <code>fn:day-from-date(xs:date("2000-01-01+05:00"))</code> returns
 : <code>1</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-day-from-date
 :)
declare function fn:day-from-date($arg as xs:date?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of days in a duration.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:days-from-duration</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:duration?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : representing the days component in the value of <code>$arg</code>.
 : The result is obtained by casting <code>$arg</code> to an
 : <code>xs:dayTimeDuration</code> (see <span href="#casting-to-durations"><b>18.1.3 Casting to duration
 : types</b></span>) and then computing the days component as described
 : in <span href="#canonical-dayTimeDuration"><b>8.1.2.3 Canonical
 : representation</b></span>.</p>
 : <p>If <code>$arg</code> is a negative duration then the result will
 : be negative..</p>
 : <p>If <code>$arg</code> is an <code>xs:yearMonthDuration</code> the
 : function returns 0.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:days-from-duration(xs:dayTimeDuration("P3DT10H"))</code>
 : returns <code>3</code>.</p>
 : <p>The expression
 : <code>fn:days-from-duration(xs:dayTimeDuration("P3DT55H"))</code>
 : returns <code>5</code>.</p>
 : <p>The expression
 : <code>fn:days-from-duration(xs:yearMonthDuration("P3Y5M"))</code>
 : returns <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-days-from-duration
 :)
declare function fn:days-from-duration($arg as xs:duration?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function assesses whether two sequences are deep-equal to
 : each other. To be deep-equal, they must contain items that are
 : pairwise deep-equal; and for two items to be deep-equal, they must
 : either be atomic values that compare equal, or nodes of the same
 : kind, with the same name, whose children are deep-equal.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:deep-equal</code>(<code class="arg">$parameter1</code><code class="as"> as </code><code class="type">item()*</code>, <code class="arg">$parameter2</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:deep-equal</code>(</td>
 : <td valign="baseline"><code class="arg">$parameter1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$parameter2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>$collation</code> argument identifies a collation
 : which is used at all levels of recursion when strings are compared
 : (but not when names are compared), according to the rules in
 : <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>If the two sequences are both empty, the function returns
 : <code>true</code>.</p>
 : <p>If the two sequences are of different lengths, the function
 : returns <code>false</code>.</p>
 : <p>If the two sequences are of the same length, the function
 : returns <code>true</code> if and only if every item in the sequence
 : <code>$parameter1</code> is deep-equal to the item at the same
 : position in the sequence <code>$parameter2</code>. The rules for
 : deciding whether two items are deep-equal follow.</p>
 : <p>Call the two items <code>$i1</code> and <code>$i2</code>
 : respectively.</p>
 : <p>If <code>$i1</code> and <code>$i2</code> are both atomic values,
 : they are deep-equal if and only if <code>($i1 eq $i2)</code> is
 : <code>true</code>, or if both values are <code>NaN</code>. If the
 : <code>eq</code> operator is not defined for <code>$i1</code> and
 : <code>$i2</code>, the function returns <code>false</code>.</p>
 : <p>If one of the pair <code>$i1</code> or <code>$i2</code> is an
 : atomic value and the other is not, the function returns
 : <code>false</code>.</p>
 : <p>If <code>$i1</code> and <code>$i2</code> are both nodes, they
 : are compared as described below:</p>
 : <ol class="enumar">
 : <li>
 : <p>If the two nodes are of different kinds, the result is
 : <code>false</code>.</p>
 : </li>
 : <li>
 : <p>If the two nodes are both document nodes then they are
 : deep-equal if and only if the sequence <code>$i1/(*|text())</code>
 : is deep-equal to the sequence <code>$i2/(*|text())</code>.</p>
 : </li>
 : <li>
 : <p>If the two nodes are both element nodes then they are deep-equal
 : if and only if all of the following conditions are satisfied:</p>
 : <ol class="enumla">
 : <li>
 : <p>The two nodes have the same name, that is <code>(node-name($i1)
 : eq node-name($i2))</code>.</p>
 : </li>
 : <li>
 : <p>The two nodes are both annotated as having simple content or
 : both nodes are annotated as having complex content.</p>
 : </li>
 : <li>
 : <p>The two nodes have the same number of attributes, and for every
 : attribute <code>$a1</code> in <code>$i1/@*</code> there exists an
 : attribute <code>$a2</code> in <code>$i2/@*</code> such that
 : <code>$a1</code> and <code>$a2</code> are deep-equal.</p>
 : </li>
 : <li>
 : <p>One of the following conditions holds:</p>
 : <ul>
 : <li>
 : <p>Both element nodes have a type annotation that is simple
 : content, and the typed value of <code>$i1</code> is deep-equal to
 : the typed value of <code>$i2</code>.</p>
 : </li>
 : <li>
 : <p>Both element nodes have a type annotation that is complex
 : content with elementOnly content, and each child element of
 : <code>$i1</code> is deep-equal to the corresponding child element
 : of <code>$i2</code>.</p>
 : </li>
 : <li>
 : <p>Both element nodes have a type annotation that is complex
 : content with mixed content, and the sequence
 : <code>$i1/(*|text())</code> is deep-equal to the sequence
 : <code>$i2/(*|text())</code>.</p>
 : </li>
 : <li>
 : <p>Both element nodes have a type annotation that is complex
 : content with empty content.</p>
 : </li>
 : </ul>
 : </li>
 : </ol>
 : </li>
 : <li>
 : <p>If the two nodes are both attribute nodes then they are
 : deep-equal if and only if both the following conditions are
 : satisfied:</p>
 : <ol class="enumla">
 : <li>
 : <p>The two nodes have the same name, that is <code>(node-name($i1)
 : eq node-name($i2))</code>.</p>
 : </li>
 : <li>
 : <p>The typed value of <code>$i1</code> is deep-equal to the typed
 : value of <code>$i2</code>.</p>
 : </li>
 : </ol>
 : </li>
 : <li>
 : <p>If the two nodes are both processing instruction nodes, then
 : they are deep-equal if and only if both the following conditions
 : are satisfied:</p>
 : <ol class="enumla">
 : <li>
 : <p>The two nodes have the same name, that is <code>(node-name($i1)
 : eq node-name($i2))</code>.</p>
 : </li>
 : <li>
 : <p>The string value of <code>$i1</code> is equal to the string
 : value of <code>$i2</code>.</p>
 : </li>
 : </ol>
 : </li>
 : <li>
 : <p>If the two nodes are both namespace nodes, then they are
 : deep-equal if and only if both the following conditions are
 : satisfied:</p>
 : <ol class="enumla">
 : <li>
 : <p>The two nodes either have the same name or are both nameless,
 : that is <code>fn:deep-equal(node-name($i1),
 : node-name($i2))</code>.</p>
 : </li>
 : <li>
 : <p>The string value of <code>$i1</code> is equal to the string
 : value of <code>$i2</code> when compared using the Unicode codepoint
 : collation.</p>
 : </li>
 : </ol>
 : </li>
 : <li>
 : <p>If the two nodes are both text nodes or comment nodes, then they
 : are deep-equal if and only if their string-values are equal.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOTY0015" title="err:FOTY0015">err:FOTY0015</span>] if either input sequence contains
 : a function item.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The two nodes are not required to have the same type annotation,
 : and they are not required to have the same in-scope namespaces.
 : They may also differ in their parent, their base URI, and the
 : values returned by the <code>is-id</code> and
 : <code>is-idrefs</code> accessors (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup> and <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-idrefs">Section 5.6
 : is-idrefs Accessor</span> <sup><small>DM30</small></sup>). The order
 : of children is significant, but the order of attributes is
 : insignificant.</p>
 : <p>The contents of comments and processing instructions are
 : significant only if these nodes appear directly as items in the two
 : sequences being compared. The content of a comment or processing
 : instruction that appears as a descendant of an item in one of the
 : sequences being compared does not affect the result. However, the
 : presence of a comment or processing instruction, if it causes a
 : text node to be split into two text nodes, may affect the
 : result.</p>
 : <p>The result of <code>fn:deep-equal(1, current-dateTime())</code>
 : is <code>false</code>; it does not raise an error.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$at</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;attendees&gt; &lt;name last='Parker'
 :             first='Peter'/&gt; &lt;name last='Barker' first='Bob'/&gt; &lt;name last='Parker'
 :             first='Peter'/&gt; &lt;/attendees&gt;
 : </pre></div>
 : <p>The expression <code>fn:deep-equal($at, $at/*)</code> returns
 : <code>false()</code>.</p>
 : <p>The expression <code>fn:deep-equal($at/name[1],
 : $at/name[2])</code> returns <code>false()</code>.</p>
 : <p>The expression <code>fn:deep-equal($at/name[1],
 : $at/name[3])</code> returns <code>true()</code>.</p>
 : <p>The expression <code>fn:deep-equal($at/name[1], 'Peter
 : Parker')</code> returns <code>false()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-deep-equal
 :)
declare function fn:deep-equal($parameter1 as item()*,  $parameter2 as item()*) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function assesses whether two sequences are deep-equal to
 : each other. To be deep-equal, they must contain items that are
 : pairwise deep-equal; and for two items to be deep-equal, they must
 : either be atomic values that compare equal, or nodes of the same
 : kind, with the same name, whose children are deep-equal.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:deep-equal</code>(<code class="arg">$parameter1</code><code class="as"> as </code><code class="type">item()*</code>, <code class="arg">$parameter2</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:deep-equal</code>(</td>
 : <td valign="baseline"><code class="arg">$parameter1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$parameter2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>$collation</code> argument identifies a collation
 : which is used at all levels of recursion when strings are compared
 : (but not when names are compared), according to the rules in
 : <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>If the two sequences are both empty, the function returns
 : <code>true</code>.</p>
 : <p>If the two sequences are of different lengths, the function
 : returns <code>false</code>.</p>
 : <p>If the two sequences are of the same length, the function
 : returns <code>true</code> if and only if every item in the sequence
 : <code>$parameter1</code> is deep-equal to the item at the same
 : position in the sequence <code>$parameter2</code>. The rules for
 : deciding whether two items are deep-equal follow.</p>
 : <p>Call the two items <code>$i1</code> and <code>$i2</code>
 : respectively.</p>
 : <p>If <code>$i1</code> and <code>$i2</code> are both atomic values,
 : they are deep-equal if and only if <code>($i1 eq $i2)</code> is
 : <code>true</code>, or if both values are <code>NaN</code>. If the
 : <code>eq</code> operator is not defined for <code>$i1</code> and
 : <code>$i2</code>, the function returns <code>false</code>.</p>
 : <p>If one of the pair <code>$i1</code> or <code>$i2</code> is an
 : atomic value and the other is not, the function returns
 : <code>false</code>.</p>
 : <p>If <code>$i1</code> and <code>$i2</code> are both nodes, they
 : are compared as described below:</p>
 : <ol class="enumar">
 : <li>
 : <p>If the two nodes are of different kinds, the result is
 : <code>false</code>.</p>
 : </li>
 : <li>
 : <p>If the two nodes are both document nodes then they are
 : deep-equal if and only if the sequence <code>$i1/(*|text())</code>
 : is deep-equal to the sequence <code>$i2/(*|text())</code>.</p>
 : </li>
 : <li>
 : <p>If the two nodes are both element nodes then they are deep-equal
 : if and only if all of the following conditions are satisfied:</p>
 : <ol class="enumla">
 : <li>
 : <p>The two nodes have the same name, that is <code>(node-name($i1)
 : eq node-name($i2))</code>.</p>
 : </li>
 : <li>
 : <p>The two nodes are both annotated as having simple content or
 : both nodes are annotated as having complex content.</p>
 : </li>
 : <li>
 : <p>The two nodes have the same number of attributes, and for every
 : attribute <code>$a1</code> in <code>$i1/@*</code> there exists an
 : attribute <code>$a2</code> in <code>$i2/@*</code> such that
 : <code>$a1</code> and <code>$a2</code> are deep-equal.</p>
 : </li>
 : <li>
 : <p>One of the following conditions holds:</p>
 : <ul>
 : <li>
 : <p>Both element nodes have a type annotation that is simple
 : content, and the typed value of <code>$i1</code> is deep-equal to
 : the typed value of <code>$i2</code>.</p>
 : </li>
 : <li>
 : <p>Both element nodes have a type annotation that is complex
 : content with elementOnly content, and each child element of
 : <code>$i1</code> is deep-equal to the corresponding child element
 : of <code>$i2</code>.</p>
 : </li>
 : <li>
 : <p>Both element nodes have a type annotation that is complex
 : content with mixed content, and the sequence
 : <code>$i1/(*|text())</code> is deep-equal to the sequence
 : <code>$i2/(*|text())</code>.</p>
 : </li>
 : <li>
 : <p>Both element nodes have a type annotation that is complex
 : content with empty content.</p>
 : </li>
 : </ul>
 : </li>
 : </ol>
 : </li>
 : <li>
 : <p>If the two nodes are both attribute nodes then they are
 : deep-equal if and only if both the following conditions are
 : satisfied:</p>
 : <ol class="enumla">
 : <li>
 : <p>The two nodes have the same name, that is <code>(node-name($i1)
 : eq node-name($i2))</code>.</p>
 : </li>
 : <li>
 : <p>The typed value of <code>$i1</code> is deep-equal to the typed
 : value of <code>$i2</code>.</p>
 : </li>
 : </ol>
 : </li>
 : <li>
 : <p>If the two nodes are both processing instruction nodes, then
 : they are deep-equal if and only if both the following conditions
 : are satisfied:</p>
 : <ol class="enumla">
 : <li>
 : <p>The two nodes have the same name, that is <code>(node-name($i1)
 : eq node-name($i2))</code>.</p>
 : </li>
 : <li>
 : <p>The string value of <code>$i1</code> is equal to the string
 : value of <code>$i2</code>.</p>
 : </li>
 : </ol>
 : </li>
 : <li>
 : <p>If the two nodes are both namespace nodes, then they are
 : deep-equal if and only if both the following conditions are
 : satisfied:</p>
 : <ol class="enumla">
 : <li>
 : <p>The two nodes either have the same name or are both nameless,
 : that is <code>fn:deep-equal(node-name($i1),
 : node-name($i2))</code>.</p>
 : </li>
 : <li>
 : <p>The string value of <code>$i1</code> is equal to the string
 : value of <code>$i2</code> when compared using the Unicode codepoint
 : collation.</p>
 : </li>
 : </ol>
 : </li>
 : <li>
 : <p>If the two nodes are both text nodes or comment nodes, then they
 : are deep-equal if and only if their string-values are equal.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOTY0015" title="err:FOTY0015">err:FOTY0015</span>] if either input sequence contains
 : a function item.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The two nodes are not required to have the same type annotation,
 : and they are not required to have the same in-scope namespaces.
 : They may also differ in their parent, their base URI, and the
 : values returned by the <code>is-id</code> and
 : <code>is-idrefs</code> accessors (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup> and <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-idrefs">Section 5.6
 : is-idrefs Accessor</span> <sup><small>DM30</small></sup>). The order
 : of children is significant, but the order of attributes is
 : insignificant.</p>
 : <p>The contents of comments and processing instructions are
 : significant only if these nodes appear directly as items in the two
 : sequences being compared. The content of a comment or processing
 : instruction that appears as a descendant of an item in one of the
 : sequences being compared does not affect the result. However, the
 : presence of a comment or processing instruction, if it causes a
 : text node to be split into two text nodes, may affect the
 : result.</p>
 : <p>The result of <code>fn:deep-equal(1, current-dateTime())</code>
 : is <code>false</code>; it does not raise an error.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$at</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;attendees&gt; &lt;name last='Parker'
 :             first='Peter'/&gt; &lt;name last='Barker' first='Bob'/&gt; &lt;name last='Parker'
 :             first='Peter'/&gt; &lt;/attendees&gt;
 : </pre></div>
 : <p>The expression <code>fn:deep-equal($at, $at/*)</code> returns
 : <code>false()</code>.</p>
 : <p>The expression <code>fn:deep-equal($at/name[1],
 : $at/name[2])</code> returns <code>false()</code>.</p>
 : <p>The expression <code>fn:deep-equal($at/name[1],
 : $at/name[3])</code> returns <code>true()</code>.</p>
 : <p>The expression <code>fn:deep-equal($at/name[1], 'Peter
 : Parker')</code> returns <code>false()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-deep-equal
 :)
declare function fn:deep-equal( $parameter1 as item()*,  $parameter2 as item()*,  $collation as xs:string) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the values that appear in a sequence, with duplicates
 : eliminated.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:distinct-values</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:distinct-values</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the sequence that results from removing
 : from <code>$arg</code> all but one of a set of values that are
 : equal to one another. Values are compared using the <code>eq</code>
 : operator, subject to the caveats defined below.</p>
 : <p>Values of type <code>xs:untypedAtomic</code> are compared as if
 : they were of type <code>xs:string</code>.</p>
 : <p>Values that cannot be compared, because the <code>eq</code>
 : operator is not defined for their types, are considered to be
 : distinct.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>. This collation is used when string comparison is
 : required.</p>
 : <p>For <code>xs:float</code> and <code>xs:double</code> values,
 : positive zero is equal to negative zero and, although
 : <code>NaN</code> does not equal itself, if <code>$arg</code>
 : contains multiple <code>NaN</code> values a single <code>NaN</code>
 : is returned.</p>
 : <p>If <code>xs:dateTime</code>, <code>xs:date</code> or
 : <code>xs:time</code> values do not have a timezone, they are
 : considered to have the implicit timezone provided by the dynamic
 : context for the purpose of comparison. Note that
 : <code>xs:dateTime</code>, <code>xs:date</code> or
 : <code>xs:time</code> values can compare equal even if their
 : timezones are different.</p>
 : <p>The order in which the sequence of values is returned is
 : <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : <p>Which value of a set of values that compare equal is returned is
 : <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : <p>If the input sequence contains values of different numeric types
 : that differ from each other by small amounts, then the eq operator
 : is not transitive, because of rounding effects occurring during
 : type promotion. In the situation where the input contains three
 : values <code>A</code>, <code>B</code>, and <code>C</code> such that
 : <code>A eq B</code>, <code>B eq C</code>, but <code>A ne C</code>,
 : then the number of items in the result of the function (as well as
 : the choice of which items are returned) is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>, subject only to the constraints that (a) no
 : two items in the result sequence compare equal to each other, and
 : (b) every input item that does not appear in the result sequence
 : compares equal to some item that does appear in the result
 : sequence.</p>
 : <p>For example, this arises when computing:</p>
 : <div class="exampleInner">
 : <pre>
 :     distinct-values(
 :             (xs:float('1.0'),
 :             xs:decimal('1.0000000000100000000001',
 :             xs:double( '1.00000000001'))
 : </pre></div>
 : <p>because the values of type <code>xs:float</code> and
 : <code>xs:double</code> both compare equal to the value of type
 : <code>xs:decimal</code> but not equal to each other.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:distinct-values((1, 2.0, 3, 2))</code>
 : returns some permutation of <code>(1, 3, 2.0)</code>.</p>
 : <p>The expression
 : <code>fn:distinct-values((xs:untypedAtomic("cherry"),
 : xs:untypedAtomic("plum"), xs:untypedAtomic("plum")))</code> returns
 : some permutation of <code>(xs:untypedAtomic("cherry"),
 : xs:untypedAtomic("plum"))</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-distinct-values
 :)
declare function fn:distinct-values($arg as xs:anyAtomicType*) as  xs:anyAtomicType* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the values that appear in a sequence, with duplicates
 : eliminated.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:distinct-values</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:distinct-values</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the sequence that results from removing
 : from <code>$arg</code> all but one of a set of values that are
 : equal to one another. Values are compared using the <code>eq</code>
 : operator, subject to the caveats defined below.</p>
 : <p>Values of type <code>xs:untypedAtomic</code> are compared as if
 : they were of type <code>xs:string</code>.</p>
 : <p>Values that cannot be compared, because the <code>eq</code>
 : operator is not defined for their types, are considered to be
 : distinct.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>. This collation is used when string comparison is
 : required.</p>
 : <p>For <code>xs:float</code> and <code>xs:double</code> values,
 : positive zero is equal to negative zero and, although
 : <code>NaN</code> does not equal itself, if <code>$arg</code>
 : contains multiple <code>NaN</code> values a single <code>NaN</code>
 : is returned.</p>
 : <p>If <code>xs:dateTime</code>, <code>xs:date</code> or
 : <code>xs:time</code> values do not have a timezone, they are
 : considered to have the implicit timezone provided by the dynamic
 : context for the purpose of comparison. Note that
 : <code>xs:dateTime</code>, <code>xs:date</code> or
 : <code>xs:time</code> values can compare equal even if their
 : timezones are different.</p>
 : <p>The order in which the sequence of values is returned is
 : <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : <p>Which value of a set of values that compare equal is returned is
 : <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : <p>If the input sequence contains values of different numeric types
 : that differ from each other by small amounts, then the eq operator
 : is not transitive, because of rounding effects occurring during
 : type promotion. In the situation where the input contains three
 : values <code>A</code>, <code>B</code>, and <code>C</code> such that
 : <code>A eq B</code>, <code>B eq C</code>, but <code>A ne C</code>,
 : then the number of items in the result of the function (as well as
 : the choice of which items are returned) is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>, subject only to the constraints that (a) no
 : two items in the result sequence compare equal to each other, and
 : (b) every input item that does not appear in the result sequence
 : compares equal to some item that does appear in the result
 : sequence.</p>
 : <p>For example, this arises when computing:</p>
 : <div class="exampleInner">
 : <pre>
 :     distinct-values(
 :             (xs:float('1.0'),
 :             xs:decimal('1.0000000000100000000001',
 :             xs:double( '1.00000000001'))
 : </pre></div>
 : <p>because the values of type <code>xs:float</code> and
 : <code>xs:double</code> both compare equal to the value of type
 : <code>xs:decimal</code> but not equal to each other.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:distinct-values((1, 2.0, 3, 2))</code>
 : returns some permutation of <code>(1, 3, 2.0)</code>.</p>
 : <p>The expression
 : <code>fn:distinct-values((xs:untypedAtomic("cherry"),
 : xs:untypedAtomic("plum"), xs:untypedAtomic("plum")))</code> returns
 : some permutation of <code>(xs:untypedAtomic("cherry"),
 : xs:untypedAtomic("plum"))</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-distinct-values
 :)
declare function fn:distinct-values( $arg as xs:anyAtomicType*,  $collation as xs:string) as  xs:anyAtomicType* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Retrieves a document using a URI supplied as an
 : <code>xs:string</code>, and returns the corresponding document
 : node.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:doc</code>(<code class="arg">$uri</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">document-node()?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on available-documents.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$uri</code> is the empty sequence, the result is an
 : empty sequence.</p>
 : <p>If <code>$uri</code> is a relative URI reference, it is resolved
 : relative to the value of the <span>Dynamic Base URI property from
 : the dynamic context</span>. The resulting absolute URI is promoted
 : to an <code>xs:string</code>.</p>
 : <p>If the <b>Available documents</b> described in <span href="http://www.w3.org/TR/xpath-30/#eval_context">Section 2.1.2 Dynamic
 : Context</span> <sup><small>XP30</small></sup> provides a mapping from
 : this string to a document node, the function returns that document
 : node.</p>
 : <p>The URI may include a fragment identifier.</p>
 : <p>By default, this function is <span title="" class="termref" href="#"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>. Two calls on this function return the same
 : document node if the same URI Reference (after resolution to an
 : absolute URI Reference) is supplied to both calls. Thus, the
 : following expression (if it does not raise an error) will always be
 : true:</p>
 : <div class="exampleInner">
 : <pre>
 : doc("foo.xml") is doc("foo.xml")
 : </pre></div>
 : <p>However, for performance reasons, implementations may provide a
 : user option to evaluate the function without a guarantee of
 : determinism. The manner in which any such option is provided is
 : implementation-defined. If the user has not selected such an
 : option, a call of the function must either return a deterministic
 : result or must raise an error [<span href="#ERRFODC0003" title="err:FODC0003">err:FODC0003</span>].</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p>If <code>$uri</code> is read from a source document, it is
 : generally appropriate to resolve it relative to the base URI
 : property of the relevant node in the source document. This can be
 : achieved by calling the <span href="#func-resolve-uri"><code>fn:resolve-uri</code></span> function, and
 : passing the resulting absolute URI as an argument to the
 : <code>fn:doc</code> function.</p>
 : </div>
 : <p>If two calls to this function supply different absolute URI
 : References as arguments, the same document node may be returned if
 : the implementation can determine that the two arguments refer to
 : the same resource.</p>
 : <p>By defining the semantics of this function in terms of a
 : string-to-document-node mapping in the dynamic context, the
 : specification is acknowledging that the results of this function
 : are outside the purview of the language specification itself, and
 : depend entirely on the run-time environment in which the expression
 : is evaluated. This run-time environment includes not only an
 : unpredictable collection of resources ("the web"), but configurable
 : machinery for locating resources and turning their contents into
 : document nodes within the XPath data model. Both the set of
 : resources that are reachable, and the mechanisms by which those
 : resources are parsed and validated, are <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : <p>One possible processing model for this function is as follows.
 : The resource identified by the URI Reference is retrieved. If the
 : resource cannot be retrieved, an error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>]. The data
 : resulting from the retrieval action is then parsed as an XML
 : document and a tree is constructed in accordance with the <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>.
 : If the top-level media type is known and is "text", the content is
 : parsed in the same way as if the media type were text/xml;
 : otherwise, it is parsed in the same way as if the media type were
 : application/xml. If the contents cannot be parsed successfully, an
 : error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>]. Otherwise, the result of the
 : function is the document node at the root of the resulting tree.
 : This tree is then optionally validated against a schema.</p>
 : <p>Various aspects of this processing are <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. Implementations may provide external
 : configuration options that allow any aspect of the processing to be
 : controlled by the user. In particular:</p>
 : <ul>
 : <li>
 : <p>The set of URI schemes that the implementation recognizes is
 : implementation-defined. Implementations may allow the mapping of
 : URIs to resources to be configured by the user, using mechanisms
 : such as catalogs or user-written URI handlers.</p>
 : </li>
 : <li>
 : <p>The handling of non-XML media types is implementation-defined.
 : Implementations may allow instances of the data model to be
 : constructed from non-XML resources, under user control.</p>
 : </li>
 : <li>
 : <p>It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> whether DTD validation and/or schema
 : validation is applied to the source document.</p>
 : </li>
 : <li>
 : <p>Implementations may provide user-defined error handling options
 : that allow processing to continue following an error in retrieving
 : a resource, or in parsing and validating its content. When errors
 : have been handled in this way, the function may return either an
 : empty sequence, or a fallback document provided by the error
 : handler.</p>
 : </li>
 : <li>
 : <p>Implementations may provide user options that relax the
 : requirement for the function to return deterministic results.</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFODC0005" title="err:FODC0005">err:FODC0005</span>] if <code>$uri</code> is not
 : a valid URI.</p>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if the <b>available documents</b>
 : provides no mapping for the absolutized URI.</p>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if the resource cannot be
 : retrieved or cannot be parsed successfully as XML.</p>
 : <p>An error is raised [<span href="#ERRFODC0003" title="err:FODC0003">err:FODC0003</span>] if the implementation is not able
 : to guarantee that the result of the function will be deterministic,
 : and the user has not indicated that an unstable result is
 : acceptable.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-doc
 :)
declare function fn:doc($uri as xs:string?) as  document-node()? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>The function returns true if and only if the function call
 : <span href="#func-doc"><code>fn:doc($uri)</code></span> would return a
 : document node.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:doc-available</code>(<code class="arg">$uri</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$uri</code> is an empty sequence, this function returns
 : <code>false</code>.</p>
 : <p>If a call on <span href="#func-doc"><code>fn:doc($uri)</code></span>
 : would return a document node, this function returns
 : <code>true</code>.</p>
 : <p>An error is raised [<span href="#ERRFODC0005" title="err:FODC0005">err:FODC0005</span>] if <code>$uri</code> is not a
 : valid URI according to the rules applied by the implementation of
 : <span href="#func-doc"><code>fn:doc</code></span>.</p>
 : <p>Otherwise, this function returns <code>false</code>.</p>
 : <p>If this function returns <code>true</code>, then calling
 : <span href="#func-doc"><code>fn:doc($uri)</code></span> within the same
 : <span title="execution scope" class="termref" href="#execution-scope"><span class="arrow">·</span>execution
 : scope<span class="arrow">·</span></span> must return a document node.
 : However, if nondeterministic processing has been selected for the
 : <span href="#func-doc"><code>fn:doc</code></span> function, this
 : guarantee is lost.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-doc-available
 :)
declare function fn:doc-available($uri as xs:string?) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the sequence of element nodes that have an
 : <code>ID</code> value matching the value of one or more of the
 : <code>IDREF</code> values supplied in <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:element-with-id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>)<code class="as"> as </code><code class="return-type">element()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:element-with-id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>, <code class="arg">$node</code><code class="as"> as </code><code class="type">node()</code>)<code class="as"> as </code><code class="return-type">element()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p>The effect of this function is identical to <code>fn:id</code>
 : in respect of elements that have an attribute with the
 : <code>is-id</code> property. However, it behaves differently in
 : respect of element nodes with the <code>is-id</code> property.
 : Whereas the <span href="#func-id"><code>fn:id</code></span>, for legacy
 : reasons, returns the element that has the <code>is-id</code>
 : property, this parent returns the element identified by the ID,
 : which is the parent of the element having the <code>is-id</code>
 : property.</p>
 : </div>
 : <p>The function returns a sequence, in document order with
 : duplicates eliminated, containing every element node <code>E</code>
 : that satisfies all the following conditions:</p>
 : <ol class="enumar">
 : <li>
 : <p><code>E</code> is in the target document. The target document is
 : the document containing <code>$node</code>, or the document
 : containing the context item (<code>.</code>) if the second argument
 : is omitted. The behavior of the function if <code>$node</code> is
 : omitted is exactly the same as if the context item had been passed
 : as <code>$node</code>.</p>
 : </li>
 : <li>
 : <p><code>E</code> has an <code>ID</code> value equal to one of the
 : candidate <code>IDREF</code> values, where:</p>
 : <ul>
 : <li>
 : <p>An element has an <code>ID</code> value equal to <code>V</code>
 : if either or both of the following conditions are true:</p>
 : <ul>
 : <li>
 : <p>The element has an child element node whose <code>is-id</code>
 : property (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup>.) is true and
 : whose typed value is equal to <code>V</code> under the rules of the
 : <code>eq</code> operator using the Unicode code point collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </li>
 : <li>
 : <p>The element has an attribute node whose <code>is-id</code>
 : property (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup>.) is true and
 : whose typed value is equal to <code>V</code> under the rules of the
 : <code>eq</code> operator using the Unicode code point collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>Each <code>xs:string</code> in <code>$arg</code> is parsed as if
 : it were of type <code>IDREFS</code>, that is, each
 : <code>xs:string</code> in <code>$arg</code> is treated as a
 : whitespace-separated sequence of tokens, each acting as an
 : <code>IDREF</code>. These tokens are then included in the list of
 : candidate <code>IDREF</code>s. If any of the tokens is not a
 : lexically valid <code>IDREF</code> (that is, if it is not lexically
 : an <code>xs:NCName</code>), it is ignored. Formally, the candidate
 : <code>IDREF</code> values are the strings in the sequence given by
 : the expression:</p>
 : <div class="exampleInner">
 : <pre>
 : for $s in $arg return 
 :    fn:tokenize(fn:normalize-space($s), ' ')[. castable as xs:IDREF]
 : </pre></div>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>If several elements have the same <code>ID</code> value, then
 : <code>E</code> is the one that is first in document order.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0001" title="err:FODC0001">err:FODC0001</span>] if <code>$node</code>, or the
 : context item if the second argument is omitted, is a node in a tree
 : whose root is not a document node.</p>
 : <p>If the second argument is the context item, or is omitted, the
 : following errors may be raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>,
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function is equivalent to the <span href="#func-id"><code>fn:id</code></span> function except when dealing with
 : ID-valued element nodes. Whereas the <span href="#func-id"><code>fn:id</code></span> function selects the element
 : containing the identifier, this function selects its parent.</p>
 : <p>If the data model is constructed from an Infoset, an attribute
 : will have the <code>is-id</code> property if the corresponding
 : attribute in the Infoset had an attribute type of <code>ID</code>:
 : typically this means the attribute was declared as an
 : <code>ID</code> in a DTD.</p>
 : <p>If the data model is constructed from a PSVI, an element or
 : attribute will have the <code>is-id</code> property if its typed
 : value is a single atomic value of type <code>xs:ID</code> or a type
 : derived by restriction from <code>xs:ID</code>.</p>
 : <p>No error is raised in respect of a candidate <code>IDREF</code>
 : value that does not match the <code>ID</code> of any element in the
 : document. If no candidate <code>IDREF</code> value matches the
 : <code>ID</code> value of any element, the function returns the
 : empty sequence.</p>
 : <p>It is not necessary that the supplied argument should have type
 : <code>xs:IDREF</code> or <code>xs:IDREFS</code>, or that it should
 : be derived from a node with the <code>is-idrefs</code>
 : property.</p>
 : <p>An element may have more than one <code>ID</code> value. This
 : can occur with synthetic data models or with data models
 : constructed from a PSVI where the element and one of its attributes
 : are both typed as <code>xs:ID</code>.</p>
 : <p>If the source document is well-formed but not valid, it is
 : possible for two or more elements to have the same <code>ID</code>
 : value. In this situation, the function will select the first such
 : element.</p>
 : <p>It is also possible in a well-formed but invalid document to
 : have an element or attribute that has the <code>is-id</code>
 : property but whose value does not conform to the lexical rules for
 : the <code>xs:ID</code> type. Such a node will never be selected by
 : this function.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$emp</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 :             &lt;employee xml:id="ID21256"&gt;
 :                &lt;empnr&gt;E21256&lt;/empnr&gt;
 :                &lt;first&gt;John&lt;/first&gt;
 :                &lt;last&gt;Brown&lt;/last&gt;
 :             &lt;/employee&gt;
 :          
 : </pre></div>
 : <p>The expression <code>id('ID21256')/name()</code> returns
 : <code>"employee"</code>. <em>(The <code>xml:id</code> attribute has
 : the <code>is-id</code> property, so the employee element is
 : selected.).</em></p>
 : <p>The expression <code>id('E21256')/name()</code> returns
 : <code>"employee"</code>. <em>(Assuming the <code>empnr</code>
 : element is given the type <code>xs:ID</code> as a result of schema
 : validation, the element will have the <code>is-id</code> property
 : and is therefore its parent is selected. Note the difference from
 : the behavior of <span href="#func-id"><code>fn:id</code></span>.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-element-with-id
 :)
declare function fn:element-with-id($arg as xs:string*) as  element()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the sequence of element nodes that have an
 : <code>ID</code> value matching the value of one or more of the
 : <code>IDREF</code> values supplied in <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:element-with-id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>)<code class="as"> as </code><code class="return-type">element()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:element-with-id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>, <code class="arg">$node</code><code class="as"> as </code><code class="type">node()</code>)<code class="as"> as </code><code class="return-type">element()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p>The effect of this function is identical to <code>fn:id</code>
 : in respect of elements that have an attribute with the
 : <code>is-id</code> property. However, it behaves differently in
 : respect of element nodes with the <code>is-id</code> property.
 : Whereas the <span href="#func-id"><code>fn:id</code></span>, for legacy
 : reasons, returns the element that has the <code>is-id</code>
 : property, this parent returns the element identified by the ID,
 : which is the parent of the element having the <code>is-id</code>
 : property.</p>
 : </div>
 : <p>The function returns a sequence, in document order with
 : duplicates eliminated, containing every element node <code>E</code>
 : that satisfies all the following conditions:</p>
 : <ol class="enumar">
 : <li>
 : <p><code>E</code> is in the target document. The target document is
 : the document containing <code>$node</code>, or the document
 : containing the context item (<code>.</code>) if the second argument
 : is omitted. The behavior of the function if <code>$node</code> is
 : omitted is exactly the same as if the context item had been passed
 : as <code>$node</code>.</p>
 : </li>
 : <li>
 : <p><code>E</code> has an <code>ID</code> value equal to one of the
 : candidate <code>IDREF</code> values, where:</p>
 : <ul>
 : <li>
 : <p>An element has an <code>ID</code> value equal to <code>V</code>
 : if either or both of the following conditions are true:</p>
 : <ul>
 : <li>
 : <p>The element has an child element node whose <code>is-id</code>
 : property (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup>.) is true and
 : whose typed value is equal to <code>V</code> under the rules of the
 : <code>eq</code> operator using the Unicode code point collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </li>
 : <li>
 : <p>The element has an attribute node whose <code>is-id</code>
 : property (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup>.) is true and
 : whose typed value is equal to <code>V</code> under the rules of the
 : <code>eq</code> operator using the Unicode code point collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>Each <code>xs:string</code> in <code>$arg</code> is parsed as if
 : it were of type <code>IDREFS</code>, that is, each
 : <code>xs:string</code> in <code>$arg</code> is treated as a
 : whitespace-separated sequence of tokens, each acting as an
 : <code>IDREF</code>. These tokens are then included in the list of
 : candidate <code>IDREF</code>s. If any of the tokens is not a
 : lexically valid <code>IDREF</code> (that is, if it is not lexically
 : an <code>xs:NCName</code>), it is ignored. Formally, the candidate
 : <code>IDREF</code> values are the strings in the sequence given by
 : the expression:</p>
 : <div class="exampleInner">
 : <pre>
 : for $s in $arg return 
 :    fn:tokenize(fn:normalize-space($s), ' ')[. castable as xs:IDREF]
 : </pre></div>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>If several elements have the same <code>ID</code> value, then
 : <code>E</code> is the one that is first in document order.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0001" title="err:FODC0001">err:FODC0001</span>] if <code>$node</code>, or the
 : context item if the second argument is omitted, is a node in a tree
 : whose root is not a document node.</p>
 : <p>If the second argument is the context item, or is omitted, the
 : following errors may be raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>,
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function is equivalent to the <span href="#func-id"><code>fn:id</code></span> function except when dealing with
 : ID-valued element nodes. Whereas the <span href="#func-id"><code>fn:id</code></span> function selects the element
 : containing the identifier, this function selects its parent.</p>
 : <p>If the data model is constructed from an Infoset, an attribute
 : will have the <code>is-id</code> property if the corresponding
 : attribute in the Infoset had an attribute type of <code>ID</code>:
 : typically this means the attribute was declared as an
 : <code>ID</code> in a DTD.</p>
 : <p>If the data model is constructed from a PSVI, an element or
 : attribute will have the <code>is-id</code> property if its typed
 : value is a single atomic value of type <code>xs:ID</code> or a type
 : derived by restriction from <code>xs:ID</code>.</p>
 : <p>No error is raised in respect of a candidate <code>IDREF</code>
 : value that does not match the <code>ID</code> of any element in the
 : document. If no candidate <code>IDREF</code> value matches the
 : <code>ID</code> value of any element, the function returns the
 : empty sequence.</p>
 : <p>It is not necessary that the supplied argument should have type
 : <code>xs:IDREF</code> or <code>xs:IDREFS</code>, or that it should
 : be derived from a node with the <code>is-idrefs</code>
 : property.</p>
 : <p>An element may have more than one <code>ID</code> value. This
 : can occur with synthetic data models or with data models
 : constructed from a PSVI where the element and one of its attributes
 : are both typed as <code>xs:ID</code>.</p>
 : <p>If the source document is well-formed but not valid, it is
 : possible for two or more elements to have the same <code>ID</code>
 : value. In this situation, the function will select the first such
 : element.</p>
 : <p>It is also possible in a well-formed but invalid document to
 : have an element or attribute that has the <code>is-id</code>
 : property but whose value does not conform to the lexical rules for
 : the <code>xs:ID</code> type. Such a node will never be selected by
 : this function.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$emp</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 :             &lt;employee xml:id="ID21256"&gt;
 :                &lt;empnr&gt;E21256&lt;/empnr&gt;
 :                &lt;first&gt;John&lt;/first&gt;
 :                &lt;last&gt;Brown&lt;/last&gt;
 :             &lt;/employee&gt;
 :          
 : </pre></div>
 : <p>The expression <code>id('ID21256')/name()</code> returns
 : <code>"employee"</code>. <em>(The <code>xml:id</code> attribute has
 : the <code>is-id</code> property, so the employee element is
 : selected.).</em></p>
 : <p>The expression <code>id('E21256')/name()</code> returns
 : <code>"employee"</code>. <em>(Assuming the <code>empnr</code>
 : element is given the type <code>xs:ID</code> as a result of schema
 : validation, the element will have the <code>is-id</code> property
 : and is therefore its parent is selected. Note the difference from
 : the behavior of <span href="#func-id"><code>fn:id</code></span>.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-element-with-id
 :)
declare function fn:element-with-id($arg as xs:string*,  $node as node()) as  element()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the argument is the empty sequence.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:empty</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : function returns <code>true</code>; otherwise, the function returns
 : <code>false</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:empty((1,2,3)[10])</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:empty(fn:remove(("hello", "world"),
 : 1))</code> returns <code>false()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-empty
 :)
declare function fn:empty($arg as item()*) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the string <code>$arg1</code> contains
 : <code>$arg2</code> as a trailing substring, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:ends-with</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:ends-with</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns <code>true</code>. If the value of
 : <code>$arg1</code> is the zero-length string and the value of
 : <code>$arg2</code> is not the zero-length string, then the function
 : returns <code>false</code>.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns an <code>xs:boolean</code> indicating
 : whether or not the value of <code>$arg1</code> starts with a
 : sequence of collation units that provides a <b>match</b> to the
 : collation units of <code>$arg2</code> according to the collation
 : that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:ends-with ( "tattoo", "tattoo")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( "tattoo", "atto")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:ends-with ((), ())</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( "abcdefghi", "-g-h-i-",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( "abcd***e---f*--*ghi",
 : "defghi", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( "abcd***e---f*--*ghi",
 : "defghi", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( (), "--***-*---",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>. <em>(The second argument contains only
 : ignorable collation units and is equivalent to the zero-length
 : string.).</em></p>
 : <p>The expression <code>fn:ends-with ( "abcdefghi", "ghi-",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-ends-with
 :)
declare function fn:ends-with($arg1 as xs:string?,  $arg2 as xs:string?) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the string <code>$arg1</code> contains
 : <code>$arg2</code> as a trailing substring, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:ends-with</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:ends-with</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns <code>true</code>. If the value of
 : <code>$arg1</code> is the zero-length string and the value of
 : <code>$arg2</code> is not the zero-length string, then the function
 : returns <code>false</code>.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns an <code>xs:boolean</code> indicating
 : whether or not the value of <code>$arg1</code> starts with a
 : sequence of collation units that provides a <b>match</b> to the
 : collation units of <code>$arg2</code> according to the collation
 : that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:ends-with ( "tattoo", "tattoo")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( "tattoo", "atto")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:ends-with ((), ())</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( "abcdefghi", "-g-h-i-",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( "abcd***e---f*--*ghi",
 : "defghi", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( "abcd***e---f*--*ghi",
 : "defghi", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:ends-with ( (), "--***-*---",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>. <em>(The second argument contains only
 : ignorable collation units and is equivalent to the zero-length
 : string.).</em></p>
 : <p>The expression <code>fn:ends-with ( "abcdefghi", "ghi-",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-ends-with
 :)
declare function fn:ends-with( $arg1 as xs:string?,  $arg2 as xs:string?,  $collation as xs:string) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of a system environment variable, if it
 : exists.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:environment-variable</code>(<code class="arg">$name</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on environment-variables.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The set of available <span href="http://www.w3.org/TR/xpath-30/#dt-environment-variables">environment
 : variables</span><sup><small>XP30</small></sup> is a set of (name,
 : value) pairs forming part of the dynamic context, in which the name
 : is unique within the set of pairs. The name and value are arbitrary
 : strings.</p>
 : <p>If the <code>$name</code> argument matches the name of one of
 : these pairs, the function returns the corresponding value.</p>
 : <p>If there is no environment variable with a matching name, the
 : function returns the empty sequence.</p>
 : <p>The collation used for matching names is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>, but must be the same as the collation used to
 : ensure that the names of all environment variables are unique.</p>
 : <p>The function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : which means that if it is called several times within the same
 : <span title="" class="termref" href="#"><span class="arrow">·</span>execution scope<span class="arrow">·</span></span>,
 : with the same arguments, it must return the same result.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>On many platforms, the term "environment variable" has a natural
 : meaning in terms of facilities provided by the operating system.
 : This interpretation of the concept does not exclude other
 : interpretations, such as a mapping to a set of configuration
 : parameters in a database system.</p>
 : <p>Environment variable names are usually case sensitive. Names are
 : usually of the form <code>(letter|_) (letter|_|digit)*</code>, but
 : this varies by platform.</p>
 : <p>On some platforms, there may sometimes be multiple environment
 : variables with the same name; in this case, it is
 : implementation-dependent as to which is returned; see for example
 : <span href="#POSIX.1-2008">[POSIX.1-2008]</span> (Chapter 8, Environment
 : Variables). Implementations <strong>may</strong> use prefixes or
 : other naming conventions to disambiguate the names.</p>
 : <p>The requirement to ensure that the function is deterministic
 : means in practice that the implementation must make a snapshot of
 : the environment variables at some time during execution, and return
 : values obtained from this snapshot, rather than using live values
 : that are subject to change at any time.</p>
 : <p>Operating system environment variables may be associated with a
 : particular process, while queries and stylesheets may execute
 : across multiple processes (or multiple machines). In such
 : circumstances implementations <strong>may</strong> choose to
 : provide access to the environment variables associated with the
 : process in which the query or stylesheet processing was
 : initiated.</p>
 : <p>Security advice: Queries from untrusted sources should not be
 : permitted unrestricted access to environment variables. For
 : example, the name of the account under which the query is running
 : may be useful information to a would-be intruder. An implementation
 : may therefore choose to restrict access to the environment, or may
 : provide a facility to make <code>fn:environment-variable</code>
 : always return the empty sequence.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-environment-variable
 :)
declare function fn:environment-variable($name as xs:string) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Calling the <code>fn:error</code> function raises an
 : application-defined error.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>()<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>(<code class="arg">$code</code><code class="as"> as </code><code class="type">xs:QName</code>)<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>(<code class="arg">$code</code><code class="as"> as </code><code class="type">xs:QName?</code>, <code class="arg">$description</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:error</code>(</td>
 : <td valign="baseline"><code class="arg">$code</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:QName?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$description</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$error-object</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">none</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>This function never returns a value. Instead it always raises an
 : error. The effect of the error is identical to the effect of
 : dynamic errors raised implicitly, for example when an incorrect
 : argument is supplied to a function.</p>
 : <p>The parameters to the <code>fn:error</code> function supply
 : information that is associated with the error condition and that is
 : made available to a caller that asks for information about the
 : error. The error may be caught either by the host language (using a
 : try/catch construct in XSLT or XQuery, for example), or by the
 : calling application or external processing environment. The way in
 : which error information is returned to the external processing
 : environment is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span></p>
 : <p>If <code>fn:error</code> is called with no arguments, then its
 : behavior is the same as the function call:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:error(fn:QName('http://www.w3.org/2005/xqt-errors', 'err:FOER0000')) 
 : </pre></div>
 : <p>If <code>$code</code> is the empty sequence then the effective
 : value is the <code>xs:QName</code> constructed by:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:QName('http://www.w3.org/2005/xqt-errors', 'err:FOER0000')
 : </pre></div>
 : <p>There are three pieces of information that may be associated
 : with an error:</p>
 : <ul>
 : <li>
 : <p>The <code>$code</code> is an error code that distinguishes this
 : error from others. It is an <code>xs:QName</code>; the namespace
 : URI conventionally identifies the component, subsystem, or
 : authority responsible for defining the meaning of the error code,
 : while the local part identifies the specific error condition. The
 : namespace URI <code>http://www.w3.org/2005/xqt-errors</code> is
 : used for errors defined in this specification; other namespace URIs
 : may be used for errors defined by the application.</p>
 : <p>If the external processing environment expects the error code to
 : be returned as a URI or a string rather than as an
 : <code>xs:QName</code>, then an error code with namespace URI
 : <code>NS</code> and local part <code>LP</code> will be returned in
 : the form <code>NS#LP</code>. The namespace URI part of the error
 : code should therefore not include a fragment identifier.</p>
 : </li>
 : <li>
 : <p>The <code>$description</code> is a natural-language description
 : of the error condition.</p>
 : </li>
 : <li>
 : <p>The <code>$error-object</code> is an arbitrary value used to
 : convey additional information about the error, and may be used in
 : any way the application chooses.</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>This function always raises an error.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The value of the <code>$description</code> parameter may need to
 : be localized.</p>
 : <p>The type "none" is a special type defined in <span href="#xquery-semantics">[XQuery 1.0 and XPath 2.0 Formal Semantics]</span>
 : and is not available to the user. It indicates that the function
 : never returns and ensures that it has the correct static type.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:error()</code> raises error
 : <code>FOER0000</code>. <em>(This returns the URI
 : <code>http://www.w3.org/2005/xqt-errors#FOER0000</code> (or the
 : corresponding <code>xs:QName</code>) to the external processing
 : environment, unless the error is caught using a try/catch construct
 : in the host language.).</em></p>
 : <p>The expression
 : <code>fn:error(fn:QName('http://www.example.com/HR',
 : 'myerr:toohighsal'), 'Does not apply because salary is too
 : high')</code> raises error <code>myerr:toohighsal</code>. <em>(This
 : returns <code>http://www.example.com/HR#toohighsal</code> and the
 : <code>xs:string</code> <code>"Does not apply because salary is too
 : high"</code> (or the corresponding <code>xs:QName</code>) to the
 : external processing environment, unless the error is caught using a
 : try/catch construct in the host language.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-error
 :)
declare function fn:error() as  none external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Calling the <code>fn:error</code> function raises an
 : application-defined error.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>()<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>(<code class="arg">$code</code><code class="as"> as </code><code class="type">xs:QName</code>)<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>(<code class="arg">$code</code><code class="as"> as </code><code class="type">xs:QName?</code>, <code class="arg">$description</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:error</code>(</td>
 : <td valign="baseline"><code class="arg">$code</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:QName?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$description</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$error-object</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">none</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>This function never returns a value. Instead it always raises an
 : error. The effect of the error is identical to the effect of
 : dynamic errors raised implicitly, for example when an incorrect
 : argument is supplied to a function.</p>
 : <p>The parameters to the <code>fn:error</code> function supply
 : information that is associated with the error condition and that is
 : made available to a caller that asks for information about the
 : error. The error may be caught either by the host language (using a
 : try/catch construct in XSLT or XQuery, for example), or by the
 : calling application or external processing environment. The way in
 : which error information is returned to the external processing
 : environment is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span></p>
 : <p>If <code>fn:error</code> is called with no arguments, then its
 : behavior is the same as the function call:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:error(fn:QName('http://www.w3.org/2005/xqt-errors', 'err:FOER0000')) 
 : </pre></div>
 : <p>If <code>$code</code> is the empty sequence then the effective
 : value is the <code>xs:QName</code> constructed by:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:QName('http://www.w3.org/2005/xqt-errors', 'err:FOER0000')
 : </pre></div>
 : <p>There are three pieces of information that may be associated
 : with an error:</p>
 : <ul>
 : <li>
 : <p>The <code>$code</code> is an error code that distinguishes this
 : error from others. It is an <code>xs:QName</code>; the namespace
 : URI conventionally identifies the component, subsystem, or
 : authority responsible for defining the meaning of the error code,
 : while the local part identifies the specific error condition. The
 : namespace URI <code>http://www.w3.org/2005/xqt-errors</code> is
 : used for errors defined in this specification; other namespace URIs
 : may be used for errors defined by the application.</p>
 : <p>If the external processing environment expects the error code to
 : be returned as a URI or a string rather than as an
 : <code>xs:QName</code>, then an error code with namespace URI
 : <code>NS</code> and local part <code>LP</code> will be returned in
 : the form <code>NS#LP</code>. The namespace URI part of the error
 : code should therefore not include a fragment identifier.</p>
 : </li>
 : <li>
 : <p>The <code>$description</code> is a natural-language description
 : of the error condition.</p>
 : </li>
 : <li>
 : <p>The <code>$error-object</code> is an arbitrary value used to
 : convey additional information about the error, and may be used in
 : any way the application chooses.</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>This function always raises an error.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The value of the <code>$description</code> parameter may need to
 : be localized.</p>
 : <p>The type "none" is a special type defined in <span href="#xquery-semantics">[XQuery 1.0 and XPath 2.0 Formal Semantics]</span>
 : and is not available to the user. It indicates that the function
 : never returns and ensures that it has the correct static type.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:error()</code> raises error
 : <code>FOER0000</code>. <em>(This returns the URI
 : <code>http://www.w3.org/2005/xqt-errors#FOER0000</code> (or the
 : corresponding <code>xs:QName</code>) to the external processing
 : environment, unless the error is caught using a try/catch construct
 : in the host language.).</em></p>
 : <p>The expression
 : <code>fn:error(fn:QName('http://www.example.com/HR',
 : 'myerr:toohighsal'), 'Does not apply because salary is too
 : high')</code> raises error <code>myerr:toohighsal</code>. <em>(This
 : returns <code>http://www.example.com/HR#toohighsal</code> and the
 : <code>xs:string</code> <code>"Does not apply because salary is too
 : high"</code> (or the corresponding <code>xs:QName</code>) to the
 : external processing environment, unless the error is caught using a
 : try/catch construct in the host language.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-error
 :)
declare function fn:error($code as xs:QName) as  none external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Calling the <code>fn:error</code> function raises an
 : application-defined error.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>()<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>(<code class="arg">$code</code><code class="as"> as </code><code class="type">xs:QName</code>)<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>(<code class="arg">$code</code><code class="as"> as </code><code class="type">xs:QName?</code>, <code class="arg">$description</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:error</code>(</td>
 : <td valign="baseline"><code class="arg">$code</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:QName?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$description</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$error-object</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">none</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>This function never returns a value. Instead it always raises an
 : error. The effect of the error is identical to the effect of
 : dynamic errors raised implicitly, for example when an incorrect
 : argument is supplied to a function.</p>
 : <p>The parameters to the <code>fn:error</code> function supply
 : information that is associated with the error condition and that is
 : made available to a caller that asks for information about the
 : error. The error may be caught either by the host language (using a
 : try/catch construct in XSLT or XQuery, for example), or by the
 : calling application or external processing environment. The way in
 : which error information is returned to the external processing
 : environment is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span></p>
 : <p>If <code>fn:error</code> is called with no arguments, then its
 : behavior is the same as the function call:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:error(fn:QName('http://www.w3.org/2005/xqt-errors', 'err:FOER0000')) 
 : </pre></div>
 : <p>If <code>$code</code> is the empty sequence then the effective
 : value is the <code>xs:QName</code> constructed by:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:QName('http://www.w3.org/2005/xqt-errors', 'err:FOER0000')
 : </pre></div>
 : <p>There are three pieces of information that may be associated
 : with an error:</p>
 : <ul>
 : <li>
 : <p>The <code>$code</code> is an error code that distinguishes this
 : error from others. It is an <code>xs:QName</code>; the namespace
 : URI conventionally identifies the component, subsystem, or
 : authority responsible for defining the meaning of the error code,
 : while the local part identifies the specific error condition. The
 : namespace URI <code>http://www.w3.org/2005/xqt-errors</code> is
 : used for errors defined in this specification; other namespace URIs
 : may be used for errors defined by the application.</p>
 : <p>If the external processing environment expects the error code to
 : be returned as a URI or a string rather than as an
 : <code>xs:QName</code>, then an error code with namespace URI
 : <code>NS</code> and local part <code>LP</code> will be returned in
 : the form <code>NS#LP</code>. The namespace URI part of the error
 : code should therefore not include a fragment identifier.</p>
 : </li>
 : <li>
 : <p>The <code>$description</code> is a natural-language description
 : of the error condition.</p>
 : </li>
 : <li>
 : <p>The <code>$error-object</code> is an arbitrary value used to
 : convey additional information about the error, and may be used in
 : any way the application chooses.</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>This function always raises an error.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The value of the <code>$description</code> parameter may need to
 : be localized.</p>
 : <p>The type "none" is a special type defined in <span href="#xquery-semantics">[XQuery 1.0 and XPath 2.0 Formal Semantics]</span>
 : and is not available to the user. It indicates that the function
 : never returns and ensures that it has the correct static type.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:error()</code> raises error
 : <code>FOER0000</code>. <em>(This returns the URI
 : <code>http://www.w3.org/2005/xqt-errors#FOER0000</code> (or the
 : corresponding <code>xs:QName</code>) to the external processing
 : environment, unless the error is caught using a try/catch construct
 : in the host language.).</em></p>
 : <p>The expression
 : <code>fn:error(fn:QName('http://www.example.com/HR',
 : 'myerr:toohighsal'), 'Does not apply because salary is too
 : high')</code> raises error <code>myerr:toohighsal</code>. <em>(This
 : returns <code>http://www.example.com/HR#toohighsal</code> and the
 : <code>xs:string</code> <code>"Does not apply because salary is too
 : high"</code> (or the corresponding <code>xs:QName</code>) to the
 : external processing environment, unless the error is caught using a
 : try/catch construct in the host language.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-error
 :)
declare function fn:error($code as xs:QName?,  $description as xs:string) as  none external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Calling the <code>fn:error</code> function raises an
 : application-defined error.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>()<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>(<code class="arg">$code</code><code class="as"> as </code><code class="type">xs:QName</code>)<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:error</code>(<code class="arg">$code</code><code class="as"> as </code><code class="type">xs:QName?</code>, <code class="arg">$description</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">none</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:error</code>(</td>
 : <td valign="baseline"><code class="arg">$code</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:QName?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$description</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$error-object</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">none</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>This function never returns a value. Instead it always raises an
 : error. The effect of the error is identical to the effect of
 : dynamic errors raised implicitly, for example when an incorrect
 : argument is supplied to a function.</p>
 : <p>The parameters to the <code>fn:error</code> function supply
 : information that is associated with the error condition and that is
 : made available to a caller that asks for information about the
 : error. The error may be caught either by the host language (using a
 : try/catch construct in XSLT or XQuery, for example), or by the
 : calling application or external processing environment. The way in
 : which error information is returned to the external processing
 : environment is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span></p>
 : <p>If <code>fn:error</code> is called with no arguments, then its
 : behavior is the same as the function call:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:error(fn:QName('http://www.w3.org/2005/xqt-errors', 'err:FOER0000')) 
 : </pre></div>
 : <p>If <code>$code</code> is the empty sequence then the effective
 : value is the <code>xs:QName</code> constructed by:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:QName('http://www.w3.org/2005/xqt-errors', 'err:FOER0000')
 : </pre></div>
 : <p>There are three pieces of information that may be associated
 : with an error:</p>
 : <ul>
 : <li>
 : <p>The <code>$code</code> is an error code that distinguishes this
 : error from others. It is an <code>xs:QName</code>; the namespace
 : URI conventionally identifies the component, subsystem, or
 : authority responsible for defining the meaning of the error code,
 : while the local part identifies the specific error condition. The
 : namespace URI <code>http://www.w3.org/2005/xqt-errors</code> is
 : used for errors defined in this specification; other namespace URIs
 : may be used for errors defined by the application.</p>
 : <p>If the external processing environment expects the error code to
 : be returned as a URI or a string rather than as an
 : <code>xs:QName</code>, then an error code with namespace URI
 : <code>NS</code> and local part <code>LP</code> will be returned in
 : the form <code>NS#LP</code>. The namespace URI part of the error
 : code should therefore not include a fragment identifier.</p>
 : </li>
 : <li>
 : <p>The <code>$description</code> is a natural-language description
 : of the error condition.</p>
 : </li>
 : <li>
 : <p>The <code>$error-object</code> is an arbitrary value used to
 : convey additional information about the error, and may be used in
 : any way the application chooses.</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>This function always raises an error.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The value of the <code>$description</code> parameter may need to
 : be localized.</p>
 : <p>The type "none" is a special type defined in <span href="#xquery-semantics">[XQuery 1.0 and XPath 2.0 Formal Semantics]</span>
 : and is not available to the user. It indicates that the function
 : never returns and ensures that it has the correct static type.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:error()</code> raises error
 : <code>FOER0000</code>. <em>(This returns the URI
 : <code>http://www.w3.org/2005/xqt-errors#FOER0000</code> (or the
 : corresponding <code>xs:QName</code>) to the external processing
 : environment, unless the error is caught using a try/catch construct
 : in the host language.).</em></p>
 : <p>The expression
 : <code>fn:error(fn:QName('http://www.example.com/HR',
 : 'myerr:toohighsal'), 'Does not apply because salary is too
 : high')</code> raises error <code>myerr:toohighsal</code>. <em>(This
 : returns <code>http://www.example.com/HR#toohighsal</code> and the
 : <code>xs:string</code> <code>"Does not apply because salary is too
 : high"</code> (or the corresponding <code>xs:QName</code>) to the
 : external processing environment, unless the error is caught using a
 : try/catch construct in the host language.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-error
 :)
declare function fn:error( $code as xs:QName?,  $description as xs:string,  $error-object as item()*) as  none external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns <code>$arg</code> if it contains exactly one item.
 : Otherwise, raises an error.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:exactly-one</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Except in error cases, the function returns <code>$arg</code>
 : unchanged.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORG0005" title="err:FORG0005">err:FORG0005</span>] if <code>$arg</code> is an empty
 : sequence or a sequence containing more than one item.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-exactly-one
 :)
declare function fn:exactly-one($arg as item()*) as  item() external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the argument is a non-empty sequence.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:exists</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is a non-empty sequence, the
 : function returns <code>true</code>; otherwise, the function returns
 : <code>false</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:exists(fn:remove(("hello"), 1))</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:exists(fn:remove(("hello", "world"),
 : 1))</code> returns <code>true()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-exists
 :)
declare function fn:exists($arg as item()*) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the <code>xs:boolean</code> value
 : <code>false</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:false</code>()<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The result is equivalent to <code>xs:boolean("0")</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:false()</code> returns
 : <code>xs:boolean(0)</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-false
 :)
declare function fn:false() as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns those items from the sequence <var>$seq</var> for which
 : the supplied function <var>$f</var> returns true.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:filter</code>(<code class="arg">$f</code><code class="as"> as </code><code class="type">function(item()) as
 : xs:boolean</code>, <code class="arg">$seq</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the function is equivalent to the following
 : implementation in XQuery:</p>
 : <div class="exampleInner">
 : <pre>
 : declare function fn:filter(
 :         $f as function(item()) as xs:boolean, 
 :         $seq as item()*)
 :         as item()* {
 :   if (fn:empty($seq))
 :   then ()
 :   else ( fn:head($seq)[$f(.) eq fn:true()], 
 :          fn:filter($f, fn:tail($seq))
 :        )
 : };
 : </pre></div>
 : <p>or its equivalent in XSLT:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:function name="fn:filter" as="item()*"&gt;
 :   &lt;xsl:param name="f" as="function(item()) as xs:boolean"/&gt;
 :   &lt;xsl:param name="seq" as="item()*"/&gt;
 :   &lt;xsl:if test="fn:exists($seq)"&gt;
 :     &lt;xsl:sequence select="fn:head($seq)[$f(.) eq fn:true()], fn:filter($f, fn:tail($seq))"/&gt;
 :   &lt;/xsl:if&gt;
 : &lt;/xsl:function&gt;
 :          
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>As a consequence of the function signature and the function
 : calling rules, a type error occurs if the supplied function
 : <var>$f</var> returns anything other than a single
 : <code>xs:boolean</code> item; there is no conversion to an
 : effective boolean value.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The function call <code>fn:filter($F, $SEQ)</code> has a very
 : similar effect to the expression <code>$SEQ[$F(.)]</code>. There
 : are some differences, however. In the case of
 : <code>fn:filter</code>, the function <code>$F</code> is required to
 : return a boolean; there is no special treatment for numeric
 : predicate values, and no conversion to an effective boolean value.
 : Also, with a filter expression <code>$SEQ[$F(.)]</code>, the focus
 : within the predicate is different from that outside; this means
 : that the use of a context-sensitive function such as <span href="#func-lang"><code>fn:lang#1</code></span> will give different results
 : in the two cases.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:filter(function($a) {$a mod 2 = 0}, 1 to
 : 10)</code> returns <code>(2, 4, 6, 8, 10)</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-filter
 :)
declare function fn:filter($f as function(item()) as xs:boolean,  $seq as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Rounds <code>$arg</code> downwards to a whole number.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:floor</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>General rules: see <span href="#numeric-value-functions"><b>4.4
 : Functions on numeric values</b></span>.</p>
 : <p>The function returns the largest (closest to positive infinity)
 : number with no fractional part that is not greater than the value
 : of <code>$arg</code>.</p>
 : <p>If the type of <code>$arg</code> is one of the four numeric
 : types <code>xs:float</code>, <code>xs:double</code>,
 : <code>xs:decimal</code> or <code>xs:integer</code> the type of the
 : result is the same as the type of <code>$arg</code>. If the type of
 : <code>$arg</code> is a type derived from one of the numeric types,
 : the result is an instance of the base numeric type.</p>
 : <p>For <code>xs:float</code> and <code>xs:double</code> arguments,
 : if the argument is positive zero, then positive zero is returned.
 : If the argument is negative zero, then negative zero is
 : returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:floor(10.5)</code> returns
 : <code>10</code>.</p>
 : <p>The expression <code>fn:floor(-10.5)</code> returns
 : <code>-11</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-floor
 :)
declare function fn:floor($arg as numeric?) as  numeric? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Processes the supplied sequence from left to right, applying the
 : supplied function repeatedly to each item in turn, together with an
 : accumulated result value.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:fold-left</code>(</td>
 : <td valign="baseline"><code class="arg">$f</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">function(item()*, item()) as item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$zero</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$seq</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the function is equivalent to the following
 : implementation in XQuery:</p>
 : <div class="exampleInner">
 : <pre>
 : declare function fn:fold-left(
 :         $f as function(item()*, item()) as item()*, 
 :         $zero as item()*, 
 :         $seq as item()*) 
 :         as item()* {
 :   if (fn:empty($seq))
 :   then $zero
 :   else fn:fold-left($f, $f($zero, fn:head($seq)), fn:tail($seq))
 : };
 : </pre></div>
 : <p>or its equivalent in XSLT:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:function name="fn:fold-left" as="item()*"&gt;
 :   &lt;xsl:param name="f" as="function(item()*, item()) as item()*"/&gt;
 :   &lt;xsl:param name="zero" as="item()*"/&gt;
 :   &lt;xsl:param name="seq" as="item()*"/&gt;
 :   &lt;xsl:choose&gt;
 :     &lt;xsl:when test="fn:empty($seq)"&gt;
 :       &lt;xsl:sequence select="$zero"/&gt;
 :     &lt;/xsl:when&gt;
 :     &lt;xsl:otherwise&gt;
 :       &lt;xsl:sequence select="fn:fold-left($f, $f($zero, fn:head($seq)), fn:tail($seq))"/&gt;
 :     &lt;/xsl:otherwise&gt;
 :   &lt;/xsl:choose&gt;
 : &lt;/xsl:function&gt;
 :          
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>As a consequence of the function signature and the function
 : calling rules, a type error occurs if the supplied function
 : <var>$f</var> cannot be applied to two arguments, where the first
 : argument is either the value of <var>$zero</var> or the result of a
 : previous application of <var>$f</var>, and the second is
 : <var>$seq</var> or any trailing subsequence of <var>$seq</var>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This operation is often referred to in the functional
 : programming literature as "folding" or "reducing" a sequence. It
 : takes a function that operates on a pair of values, and applies it
 : repeatedly, with an accumulated result as the first argument, and
 : the next item in the sequence as the second argument. The
 : accumulated result is initially set to the value of the
 : <var>$zero</var> argument, which is conventionally a value (such as
 : zero in the case of addition, one in the case of multiplication, or
 : a zero-length string in the case of string concatenation) that
 : causes the function to return the value of the other argument
 : unchanged.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:fold-left(function($a, $b) { $a + $b },
 : 0, 1 to 5)</code> returns <code>15</code>. <em>(This returns the
 : sum of the items in the sequence).</em></p>
 : <p>The expression <code>fn:fold-left(function($a, $b) { $a * $b },
 : 1, (2,3,5,7))</code> returns <code>210</code>. <em>(This returns
 : the product of the items in the sequence).</em></p>
 : <p>The expression <code>fn:fold-left(function($a, $b) { $a or $b },
 : false(), (true(), false(), false()))</code> returns
 : <code>true()</code>. <em>(This returns true if any item in the
 : sequence has an effective boolean value of true).</em></p>
 : <p>The expression <code>fn:fold-left(function($a, $b) { $a and $b
 : }, false(), (true(), false(), false()))</code> returns
 : <code>false()</code>. <em>(This returns true only if every item in
 : the sequence has an effective boolean value of true).</em></p>
 : <p>The expression <code>fn:fold-left(function($a, $b) {($b, $a)},
 : (), 1 to 5)</code> returns <code>(5,4,3,2,1)</code>. <em>(This
 : reverses the order of the items in a sequence).</em></p>
 : <p>The expression <code>fn:fold-left(fn:concat(?, ".", ?), "", 1 to
 : 5)</code> returns <code>".1.2.3.4.5"</code>.</p>
 : <p>The expression <code>fn:fold-left(fn:concat("$f(", ?, ", ", ?,
 : ")"), "$zero", 1 to 5)</code> returns <code>"$f($f($f($f($f($zero,
 : 1), 2), 3), 4), 5)"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-fold-left
 :)
declare function fn:fold-left( $f as function(item()*, item()) as item()*,  $zero as item()*,  $seq as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Processes the supplied sequence from right to left, applying the
 : supplied function repeatedly to each item in turn, together with an
 : accumulated result value.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:fold-right</code>(</td>
 : <td valign="baseline"><code class="arg">$f</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">function(item(), item()*) as item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$zero</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$seq</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the function is equivalent to the following
 : implementation in XQuery:</p>
 : <div class="exampleInner">
 : <pre>
 : declare function fn:fold-right(
 :         $f as function(item(), item()*) as item()*, 
 :         $zero as item()*, 
 :         $seq as item()*) 
 :         as item()* {
 :   if (fn:empty($seq))
 :   then $zero
 :   else $f(fn:head($seq), fn:fold-right($f, $zero, fn:tail($seq)))
 : };
 : </pre></div>
 : <p>or its equivalent in XSLT:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:function name="fn:fold-right" as="item()*"&gt;
 :   &lt;xsl:param name="f" as="function(item(), item()*) as item()*"/&gt;
 :   &lt;xsl:param name="zero" as="item()*"/&gt;
 :   &lt;xsl:param name="seq" as="item()*"/&gt;
 :   &lt;xsl:choose&gt;
 :     &lt;xsl:when test="fn:empty($seq)"&gt;
 :       &lt;xsl:sequence select="$zero"/&gt;
 :     &lt;/xsl:when&gt;
 :     &lt;xsl:otherwise&gt;
 :       &lt;xsl:sequence select="$f(fn:head($seq), fn:fold-right($f, $zero, fn:tail($seq))"/&gt;
 :     &lt;/xsl:otherwise&gt;
 :   &lt;/xsl:choose&gt;
 : &lt;/xsl:function&gt;
 :          
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>As a consequence of the function signature and the function
 : calling rules, a type error occurs if the supplied function
 : <var>$f</var> cannot be applied to two arguments, where the first
 : argument is any item in the sequence <var>$seq</var>, and the
 : second is either the value of <var>$zero</var> or the result of a
 : previous application of <var>$f</var>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This operation is often referred to in the functional
 : programming literature as "folding" or "reducing" a sequence. It
 : takes a function that operates on a pair of values, and applies it
 : repeatedly, with the next item in the sequence as the first
 : argument, and the result of processing the remainder of the
 : sequence as the second argument. The accumulated result is
 : initially set to the value of the <var>$zero</var> argument, which
 : is conventionally a value (such as zero in the case of addition,
 : one in the case of multiplication, or a zero-length string in the
 : case of string concatenation) that causes the function to return
 : the value of the other argument unchanged.</p>
 : <p>In cases where the function performs an associative operation on
 : its two arguments (such as addition or multiplication),
 : <code>fn:fold-right</code> produces the same result as <span href="#func-fold-left"><code>fn:fold-left</code></span>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:fold-right(function($a, $b) { $a + $b },
 : 0, 1 to 5)</code> returns <code>15</code>. <em>(This returns the
 : sum of the items in the sequence).</em></p>
 : <p>The expression <code>fn:fold-right(fn:concat(?, ".", ?), "", 1
 : to 5)</code> returns <code>"1.2.3.4.5."</code>.</p>
 : <p>The expression <code>fn:fold-right(concat("$f(", ?, ", ", ?,
 : ")"), "$zero", 1 to 5)</code> returns <code>"$f(1, $f(2, $f(3,
 : $f(4, $f(5, $zero)))))"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-fold-right
 :)
declare function fn:fold-right( $f as function(item(), item()*) as item()*,  $zero as item()*,  $seq as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string containing an <code>xs:date</code> value
 : formatted for display.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-date</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">xs:date?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="5"><code class="function">fn:format-date</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:date?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$language</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$calendar</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$place</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>See <span href="#rules-for-datetime-formatting"><b>9.8.4 The
 : date/time formatting functions</b></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-date
 :)
declare function fn:format-date( $value as xs:date?,  $picture as xs:string,  $language as xs:string?,  $calendar as xs:string?,  $place as xs:string?) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string containing an <code>xs:date</code> value
 : formatted for display.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-date</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">xs:date?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="5"><code class="function">fn:format-date</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:date?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$language</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$calendar</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$place</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>See <span href="#rules-for-datetime-formatting"><b>9.8.4 The
 : date/time formatting functions</b></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-date
 :)
declare function fn:format-date($value as xs:date?,  $picture as xs:string) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string containing an <code>xs:dateTime</code> value
 : formatted for display.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-dateTime</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">xs:dateTime?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="5"><code class="function">fn:format-dateTime</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dateTime?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$language</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$calendar</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$place</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>See <span href="#rules-for-datetime-formatting"><b>9.8.4 The
 : date/time formatting functions</b></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-dateTime
 :)
declare function fn:format-dateTime( $value as xs:dateTime?,  $picture as xs:string,  $language as xs:string?,  $calendar as xs:string?,  $place as xs:string?) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string containing an <code>xs:dateTime</code> value
 : formatted for display.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-dateTime</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">xs:dateTime?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="5"><code class="function">fn:format-dateTime</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:dateTime?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$language</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$calendar</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$place</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>See <span href="#rules-for-datetime-formatting"><b>9.8.4 The
 : date/time formatting functions</b></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-dateTime
 :)
declare function fn:format-dateTime($value as xs:dateTime?,  $picture as xs:string) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Formats an integer according to a given picture string, using
 : the conventions of a given natural language if specified.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-integer</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">xs:integer?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:format-integer</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:integer?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$language</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$value</code> is an empty sequence, the function
 : returns a zero-length string.</p>
 : <p>In all other cases, the <code>$picture</code> argument describes
 : the format in which <code>$value</code> is output.</p>
 : <p>The rules that follow describe how non-negative numbers are
 : output. If the value of <code>$value</code> is negative, the rules
 : below are applied to the absolute value of <code>$value</code>, and
 : a minus sign is prepended to the result.</p>
 : <p>The value of <code>$picture</code> <strong>must</strong> match
 : the regular expression:</p>
 : <p>
 : <code>^((\p{Nd}|#|[^\p{N}\p{L}])+?)(([co](\([^()]\))?)?[at]?)$</code></p>
 : <p>The substring that matches the first capturing group in this
 : regular expression are referred to as the primary format token. The
 : substring that matches the second capturing group (which may be
 : empty) is referred to as the format modifier. A picture thus
 : consists of a primary format token, followed by an optional format
 : modifier.</p>
 : <p>The primary format token is classified as one of the
 : following:</p>
 : <ul>
 : <li>
 : <p>A <var>decimal-digit-pattern</var> made up of
 : <var>optional-digit-signs</var>, <var>mandatory-digit-signs</var>,
 : and <var>grouping-separator-signs</var>.</p>
 : <ul>
 : <li>
 : <p>The <var>optional-digit-sign</var> is the character "#".</p>
 : </li>
 : <li>
 : <p>A <var>mandatory-digit-sign</var> is a <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> in
 : Unicode category Nd. All <var>mandatory-digit-signs</var> within
 : the format token must be from the same digit family, where a digit
 : family is a sequence of ten consecutive characters in Unicode
 : category Nd, having digit values 0 through 9. Within the format
 : token, these digits are interchangeable: a three-digit number may
 : thus be indicated equivalently by <code>000</code>,
 : <code>001</code>, or <code>999</code>.</p>
 : </li>
 : <li>
 : <p>a <var>grouping-separator-sign</var> is a non-alphanumeric
 : character, that is a <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> whose Unicode category is other than Nd, Nl,
 : No, Lu, Ll, Lt, Lm or Lo.</p>
 : </li>
 : </ul>
 : <p>There <strong>must</strong> be at least one
 : <var>mandatory-digit-sign</var>. There may be zero or more
 : <var>optional-digit-signs</var>, and (if present) these
 : <strong>must</strong> precede all <var>mandatory-digit-signs</var>.
 : There may be zero or more <var>grouping-separator-signs</var>. A
 : <var>grouping-separator-sign</var> <strong>must not</strong> appear
 : at the start or end of the <var>decimal-digit-pattern</var>, nor
 : adjacent to another <var>grouping-separator-sign</var>.</p>
 : <p>The corresponding output format is a decimal number, using this
 : digit family, with at least as many digits as there are
 : <var>mandatory-digit-signs</var> in the format token. Thus, a
 : format token <code>1</code> generates the sequence <code>0 1 2 ...
 : 10 11 12 ...</code>, and a format token <code>01</code> (or
 : equivalently, <code>00</code> or <code>99</code>) generates the
 : sequence <code>00 01 02 ... 09 10 11 12 ... 99 100 101</code>. A
 : format token of <code>&amp;#x661;</code> (Arabic-Indic digit one)
 : generates the sequence <code>١</code> then <code>٢</code> then
 : <code>٣</code> ...</p>
 : <p>The <var>grouping-separator-signs</var> are handled as follows.
 : The position of grouping separators within the format token,
 : counting backwards from the last digit, indicates the position of
 : grouping separators to appear within the formatted number, and the
 : character used as the <var>grouping-separator-sign</var> within the
 : format token indicates the character to be used as the
 : corresponding grouping separator in the formatted number. If
 : <var>grouping-separator-signs</var> appear at regular intervals
 : within the format token, that is if the same grouping separator
 : appears at positions forming a sequence <var>N</var>,
 : 2<var>N</var>, 3<var>N</var>, ... for some integer value
 : <var>N</var> (including the case where there is only one number in
 : the list), then the sequence is extrapolated to the left, so
 : grouping separators will be used in the formatted number at every
 : multiple of <var>N</var>. For example, if the format token is
 : <code>0'000</code> then the number one million will be formatted as
 : <code>1'000'000</code>, while the number fifteen will be formatted
 : as <code>0'015</code>.</p>
 : <p>The only purpose of <var>optional-digit-signs</var> is to mark
 : the position of <var>grouping-separator-signs</var>. For example,
 : if the format token is <code>#'##0</code> then the number one
 : million will be formatted as <code>1'000'000</code>, while the
 : number fifteen will be formatted as <code>15</code>. A grouping
 : separator is included in the formatted number only if there is a
 : digit to its left, which will only be the case if either (a) the
 : number is large enough to require that digit, or (b) the number of
 : <var>mandatory-digit-signs</var> in the format token requires
 : insignificant leading zeros to be present.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p>Numbers will never be truncated. Given the
 : <var>decimal-digit-pattern</var> <code>01</code>, the number three
 : hundred will be output as <code>300</code>, despite the absence of
 : any <var>optional-digit-sign</var>.</p>
 : </div>
 : </li>
 : <li>
 : <p>The format token <code>A</code>, which generates the sequence
 : <code>A B C ... Z AA AB AC...</code>.</p>
 : </li>
 : <li>
 : <p>The format token <code>a</code>, which generates the sequence
 : <code>a b c ... z aa ab ac...</code>.</p>
 : </li>
 : <li>
 : <p>The format token <code>i</code>, which generates the sequence
 : <code>i ii iii iv v vi vii viii ix x ...</code>.</p>
 : </li>
 : <li>
 : <p>The format token <code>I</code>, which generates the sequence
 : <code>I II III IV V VI VII VIII IX X ...</code>.</p>
 : </li>
 : <li>
 : <p>The format token <code>w</code>, which generates numbers written
 : as lower-case words, for example in English, <code>one two three
 : four ...</code></p>
 : </li>
 : <li>
 : <p>The format token <code>W</code>, which generates numbers written
 : as upper-case words, for example in English, <code>ONE TWO THREE
 : FOUR ...</code></p>
 : </li>
 : <li>
 : <p>The format token <code>Ww</code>, which generates numbers
 : written as title-case words, for example in English, <code>One Two
 : Three Four ...</code></p>
 : </li>
 : <li>
 : <p>Any other format token, which indicates a numbering sequence in
 : which that token represents the number 1 (one) (but see the note
 : below). It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> which numbering sequences, additional to those
 : listed above, are supported. If an implementation does not support
 : a numbering sequence represented by the given token, it
 : <strong>must</strong> use a format token of <code>1</code>.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p>In some traditional numbering sequences additional signs are
 : added to denote that the letters should be interpreted as numbers;
 : these are not included in the format token. An example (see also
 : the example below) is classical Greek where a <em>dexia keraia</em>
 : (x0374, ʹ) and sometimes an <em>aristeri keraia</em> (x0375, ͵) is
 : added.</p>
 : </div>
 : </li>
 : </ul>
 : <p>For all format tokens other than the first kind above (one that
 : consists of decimal digits), there <strong>may</strong> be
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> lower and upper bounds on the range of numbers
 : that can be formatted using this format token; indeed, for some
 : numbering sequences there may be intrinsic limits. For example, the
 : format token <code>&amp;#x2460;</code> (circled digit one, ①) has a
 : range of 1 to 20 imposed by the Unicode character repertoire. For
 : the numbering sequences described above any upper bound imposed by
 : the implementation <strong>must not</strong> be less than 1000 (one
 : thousand) and any lower bound must not be greater than 1. Numbers
 : that fall outside this range <strong>must</strong> be formatted
 : using the format token <code>1</code>.</p>
 : <p>The above expansions of numbering sequences for format tokens
 : such as <code>a</code> and <code>i</code> are indicative but not
 : prescriptive. There are various conventions in use for how
 : alphabetic sequences continue when the alphabet is exhausted, and
 : differing conventions for how roman numerals are written (for
 : example, <code>IV</code> versus <code>IIII</code> as the
 : representation of the number 4). Sometimes alphabetic sequences are
 : used that omit letters such as <code>i</code> and <code>o</code>.
 : This specification does not prescribe the detail of any sequence
 : other than those sequences consisting entirely of decimal
 : digits.</p>
 : <p>Many numbering sequences are language-sensitive. This applies
 : especially to the sequence selected by the tokens <code>w</code>,
 : <code>W</code> and <code>Ww</code>. It also applies to other
 : sequences, for example different languages using the Cyrillic
 : alphabet use different sequences of characters, each starting with
 : the letter #x410 (Cyrillic capital letter A). In such cases, the
 : <code>$language</code> argument specifies which language's
 : conventions are to be used. <span>If the argument is specified, the
 : value <strong>should</strong> be a string that is castable to the
 : type <code>xs:language</code></span>.</p>
 : <p>The set of languages for which numbering is supported is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. If the <code>$language</code> argument is
 : absent, or is set to an empty sequence, or is invalid, or is not a
 : language supported by the implementation, then the number is
 : formatted using a default language; the default language is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>.</p>
 : <p>The format modifier, if present, is one <span>or more</span> of
 : the following, in order:</p>
 : <ul>
 : <li>
 : <p>either <code>c</code> or <code>o</code>, optionally followed by
 : a sequence of characters enclosed between parentheses, to indicate
 : cardinal or ordinal numbering respectively, the default being
 : cardinal numbering</p>
 : </li>
 : <li>
 : <p>either <code>a</code> or <code>t</code>, to indicate alphabetic
 : or traditional numbering respectively, the default being <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>.</p>
 : </li>
 : </ul>
 : <p>If the <code>o</code> modifier is present, this indicates a
 : request to output ordinal numbers rather than cardinal numbers. For
 : example, in English, when used with the format token
 : <code>1</code>, this outputs the sequence <code>1st 2nd 3rd 4th
 : ...</code>, and when used with the format token <code>w</code>
 : outputs the sequence <code>first second third fourth
 : ...</code>.</p>
 : <p>In some languages, ordinal numbers vary depending on the
 : grammatical context, for example they may have different genders
 : and may decline with the noun that they qualify. In such cases the
 : string appearing in parentheses after the letter <code>o</code> may
 : be used to indicate the variation of the ordinal number required.
 : The way in which the variation is indicated will depend on the
 : conventions of the language. For inflected languages that vary the
 : ending of the word, the preferred approach is to indicate the
 : required ending, preceded by a hyphen: for example in German,
 : appropriate values are <code>o(-e)</code>, <code>o(-er)</code>,
 : <code>o(-es)</code>, <code>o(-en)</code>.</p>
 : <p>It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> what combinations of values of the format
 : token, the language, and the cardinal/ordinal modifier are
 : supported. If ordinal numbering is not supported for the
 : combination of the format token, the language, and the string
 : appearing in parentheses, the request is ignored and cardinal
 : numbers are generated instead.</p>
 : <div class="exampleOuter">
 : <div class="exampleHeader"><span name="d5e6102" id="d5e6102"/>Example: Ordinal Numbering in Italian</div>
 : <p>The specification <code>"1o(-º)"</code> with
 : <code>$language</code> equal to <code>it</code>, if supported,
 : should produce the sequence:</p>
 : <div class="exampleInner">
 : <pre>
 : 1º 2º 3º 4º ...
 : </pre></div>
 : <p>The specification <code>"Wwo"</code> with <code>$language</code>
 : equal to <code>it</code>, if supported, should produce the
 : sequence:</p>
 : <div class="exampleInner">
 : <pre>
 : Primo Secondo Terzo Quarto Quinto ...
 : </pre></div>
 : </div>
 : <p>The <span>use of the <code>a</code> or <code>t</code>
 : modifier</span> disambiguates between numbering sequences that use
 : letters. In many languages there are two commonly used numbering
 : sequences that use letters. One numbering sequence assigns numeric
 : values to letters in alphabetic sequence, and the other assigns
 : numeric values to each letter in some other manner traditional in
 : that language. In English, these would correspond to the numbering
 : sequences specified by the format tokens <code>a</code> and
 : <code>i</code>. In some languages, the first member of each
 : sequence is the same, and so the format token alone would be
 : ambiguous. <span>In the absence of the <code>a</code> or
 : <code>t</code> modifier, the default is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span></span>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>format-integer(123, '0000')</code> returns
 : <code>"0123"</code>.</p>
 : <p><code>format-integer(123, 'w')</code> might return <code>"one
 : hundred and twenty-three"</code></p>
 : <p>The expression <code>format-integer(21, '1o', 'en')</code>
 : returns <code>"21st"</code>.</p>
 : <p><code>format-integer(14, 'Wwo(-e)', 'de')</code> might return
 : <code>"Vierzehnte"</code></p>
 : <p>The expression <code>format-integer(7, 'a')</code> returns
 : <code>"g"</code>.</p>
 : <p>The expression <code>format-integer(57, 'I')</code> returns
 : <code>"LVII"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-integer
 :)
declare function fn:format-integer($value as xs:integer?,  $picture as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Formats an integer according to a given picture string, using
 : the conventions of a given natural language if specified.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-integer</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">xs:integer?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:format-integer</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:integer?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$language</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$value</code> is an empty sequence, the function
 : returns a zero-length string.</p>
 : <p>In all other cases, the <code>$picture</code> argument describes
 : the format in which <code>$value</code> is output.</p>
 : <p>The rules that follow describe how non-negative numbers are
 : output. If the value of <code>$value</code> is negative, the rules
 : below are applied to the absolute value of <code>$value</code>, and
 : a minus sign is prepended to the result.</p>
 : <p>The value of <code>$picture</code> <strong>must</strong> match
 : the regular expression:</p>
 : <p>
 : <code>^((\p{Nd}|#|[^\p{N}\p{L}])+?)(([co](\([^()]\))?)?[at]?)$</code></p>
 : <p>The substring that matches the first capturing group in this
 : regular expression are referred to as the primary format token. The
 : substring that matches the second capturing group (which may be
 : empty) is referred to as the format modifier. A picture thus
 : consists of a primary format token, followed by an optional format
 : modifier.</p>
 : <p>The primary format token is classified as one of the
 : following:</p>
 : <ul>
 : <li>
 : <p>A <var>decimal-digit-pattern</var> made up of
 : <var>optional-digit-signs</var>, <var>mandatory-digit-signs</var>,
 : and <var>grouping-separator-signs</var>.</p>
 : <ul>
 : <li>
 : <p>The <var>optional-digit-sign</var> is the character "#".</p>
 : </li>
 : <li>
 : <p>A <var>mandatory-digit-sign</var> is a <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> in
 : Unicode category Nd. All <var>mandatory-digit-signs</var> within
 : the format token must be from the same digit family, where a digit
 : family is a sequence of ten consecutive characters in Unicode
 : category Nd, having digit values 0 through 9. Within the format
 : token, these digits are interchangeable: a three-digit number may
 : thus be indicated equivalently by <code>000</code>,
 : <code>001</code>, or <code>999</code>.</p>
 : </li>
 : <li>
 : <p>a <var>grouping-separator-sign</var> is a non-alphanumeric
 : character, that is a <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> whose Unicode category is other than Nd, Nl,
 : No, Lu, Ll, Lt, Lm or Lo.</p>
 : </li>
 : </ul>
 : <p>There <strong>must</strong> be at least one
 : <var>mandatory-digit-sign</var>. There may be zero or more
 : <var>optional-digit-signs</var>, and (if present) these
 : <strong>must</strong> precede all <var>mandatory-digit-signs</var>.
 : There may be zero or more <var>grouping-separator-signs</var>. A
 : <var>grouping-separator-sign</var> <strong>must not</strong> appear
 : at the start or end of the <var>decimal-digit-pattern</var>, nor
 : adjacent to another <var>grouping-separator-sign</var>.</p>
 : <p>The corresponding output format is a decimal number, using this
 : digit family, with at least as many digits as there are
 : <var>mandatory-digit-signs</var> in the format token. Thus, a
 : format token <code>1</code> generates the sequence <code>0 1 2 ...
 : 10 11 12 ...</code>, and a format token <code>01</code> (or
 : equivalently, <code>00</code> or <code>99</code>) generates the
 : sequence <code>00 01 02 ... 09 10 11 12 ... 99 100 101</code>. A
 : format token of <code>&amp;#x661;</code> (Arabic-Indic digit one)
 : generates the sequence <code>١</code> then <code>٢</code> then
 : <code>٣</code> ...</p>
 : <p>The <var>grouping-separator-signs</var> are handled as follows.
 : The position of grouping separators within the format token,
 : counting backwards from the last digit, indicates the position of
 : grouping separators to appear within the formatted number, and the
 : character used as the <var>grouping-separator-sign</var> within the
 : format token indicates the character to be used as the
 : corresponding grouping separator in the formatted number. If
 : <var>grouping-separator-signs</var> appear at regular intervals
 : within the format token, that is if the same grouping separator
 : appears at positions forming a sequence <var>N</var>,
 : 2<var>N</var>, 3<var>N</var>, ... for some integer value
 : <var>N</var> (including the case where there is only one number in
 : the list), then the sequence is extrapolated to the left, so
 : grouping separators will be used in the formatted number at every
 : multiple of <var>N</var>. For example, if the format token is
 : <code>0'000</code> then the number one million will be formatted as
 : <code>1'000'000</code>, while the number fifteen will be formatted
 : as <code>0'015</code>.</p>
 : <p>The only purpose of <var>optional-digit-signs</var> is to mark
 : the position of <var>grouping-separator-signs</var>. For example,
 : if the format token is <code>#'##0</code> then the number one
 : million will be formatted as <code>1'000'000</code>, while the
 : number fifteen will be formatted as <code>15</code>. A grouping
 : separator is included in the formatted number only if there is a
 : digit to its left, which will only be the case if either (a) the
 : number is large enough to require that digit, or (b) the number of
 : <var>mandatory-digit-signs</var> in the format token requires
 : insignificant leading zeros to be present.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p>Numbers will never be truncated. Given the
 : <var>decimal-digit-pattern</var> <code>01</code>, the number three
 : hundred will be output as <code>300</code>, despite the absence of
 : any <var>optional-digit-sign</var>.</p>
 : </div>
 : </li>
 : <li>
 : <p>The format token <code>A</code>, which generates the sequence
 : <code>A B C ... Z AA AB AC...</code>.</p>
 : </li>
 : <li>
 : <p>The format token <code>a</code>, which generates the sequence
 : <code>a b c ... z aa ab ac...</code>.</p>
 : </li>
 : <li>
 : <p>The format token <code>i</code>, which generates the sequence
 : <code>i ii iii iv v vi vii viii ix x ...</code>.</p>
 : </li>
 : <li>
 : <p>The format token <code>I</code>, which generates the sequence
 : <code>I II III IV V VI VII VIII IX X ...</code>.</p>
 : </li>
 : <li>
 : <p>The format token <code>w</code>, which generates numbers written
 : as lower-case words, for example in English, <code>one two three
 : four ...</code></p>
 : </li>
 : <li>
 : <p>The format token <code>W</code>, which generates numbers written
 : as upper-case words, for example in English, <code>ONE TWO THREE
 : FOUR ...</code></p>
 : </li>
 : <li>
 : <p>The format token <code>Ww</code>, which generates numbers
 : written as title-case words, for example in English, <code>One Two
 : Three Four ...</code></p>
 : </li>
 : <li>
 : <p>Any other format token, which indicates a numbering sequence in
 : which that token represents the number 1 (one) (but see the note
 : below). It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> which numbering sequences, additional to those
 : listed above, are supported. If an implementation does not support
 : a numbering sequence represented by the given token, it
 : <strong>must</strong> use a format token of <code>1</code>.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p>In some traditional numbering sequences additional signs are
 : added to denote that the letters should be interpreted as numbers;
 : these are not included in the format token. An example (see also
 : the example below) is classical Greek where a <em>dexia keraia</em>
 : (x0374, ʹ) and sometimes an <em>aristeri keraia</em> (x0375, ͵) is
 : added.</p>
 : </div>
 : </li>
 : </ul>
 : <p>For all format tokens other than the first kind above (one that
 : consists of decimal digits), there <strong>may</strong> be
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> lower and upper bounds on the range of numbers
 : that can be formatted using this format token; indeed, for some
 : numbering sequences there may be intrinsic limits. For example, the
 : format token <code>&amp;#x2460;</code> (circled digit one, ①) has a
 : range of 1 to 20 imposed by the Unicode character repertoire. For
 : the numbering sequences described above any upper bound imposed by
 : the implementation <strong>must not</strong> be less than 1000 (one
 : thousand) and any lower bound must not be greater than 1. Numbers
 : that fall outside this range <strong>must</strong> be formatted
 : using the format token <code>1</code>.</p>
 : <p>The above expansions of numbering sequences for format tokens
 : such as <code>a</code> and <code>i</code> are indicative but not
 : prescriptive. There are various conventions in use for how
 : alphabetic sequences continue when the alphabet is exhausted, and
 : differing conventions for how roman numerals are written (for
 : example, <code>IV</code> versus <code>IIII</code> as the
 : representation of the number 4). Sometimes alphabetic sequences are
 : used that omit letters such as <code>i</code> and <code>o</code>.
 : This specification does not prescribe the detail of any sequence
 : other than those sequences consisting entirely of decimal
 : digits.</p>
 : <p>Many numbering sequences are language-sensitive. This applies
 : especially to the sequence selected by the tokens <code>w</code>,
 : <code>W</code> and <code>Ww</code>. It also applies to other
 : sequences, for example different languages using the Cyrillic
 : alphabet use different sequences of characters, each starting with
 : the letter #x410 (Cyrillic capital letter A). In such cases, the
 : <code>$language</code> argument specifies which language's
 : conventions are to be used. <span>If the argument is specified, the
 : value <strong>should</strong> be a string that is castable to the
 : type <code>xs:language</code></span>.</p>
 : <p>The set of languages for which numbering is supported is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. If the <code>$language</code> argument is
 : absent, or is set to an empty sequence, or is invalid, or is not a
 : language supported by the implementation, then the number is
 : formatted using a default language; the default language is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>.</p>
 : <p>The format modifier, if present, is one <span>or more</span> of
 : the following, in order:</p>
 : <ul>
 : <li>
 : <p>either <code>c</code> or <code>o</code>, optionally followed by
 : a sequence of characters enclosed between parentheses, to indicate
 : cardinal or ordinal numbering respectively, the default being
 : cardinal numbering</p>
 : </li>
 : <li>
 : <p>either <code>a</code> or <code>t</code>, to indicate alphabetic
 : or traditional numbering respectively, the default being <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>.</p>
 : </li>
 : </ul>
 : <p>If the <code>o</code> modifier is present, this indicates a
 : request to output ordinal numbers rather than cardinal numbers. For
 : example, in English, when used with the format token
 : <code>1</code>, this outputs the sequence <code>1st 2nd 3rd 4th
 : ...</code>, and when used with the format token <code>w</code>
 : outputs the sequence <code>first second third fourth
 : ...</code>.</p>
 : <p>In some languages, ordinal numbers vary depending on the
 : grammatical context, for example they may have different genders
 : and may decline with the noun that they qualify. In such cases the
 : string appearing in parentheses after the letter <code>o</code> may
 : be used to indicate the variation of the ordinal number required.
 : The way in which the variation is indicated will depend on the
 : conventions of the language. For inflected languages that vary the
 : ending of the word, the preferred approach is to indicate the
 : required ending, preceded by a hyphen: for example in German,
 : appropriate values are <code>o(-e)</code>, <code>o(-er)</code>,
 : <code>o(-es)</code>, <code>o(-en)</code>.</p>
 : <p>It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> what combinations of values of the format
 : token, the language, and the cardinal/ordinal modifier are
 : supported. If ordinal numbering is not supported for the
 : combination of the format token, the language, and the string
 : appearing in parentheses, the request is ignored and cardinal
 : numbers are generated instead.</p>
 : <div class="exampleOuter">
 : <div class="exampleHeader"><span name="d5e6102" id="d5e6102"/>Example: Ordinal Numbering in Italian</div>
 : <p>The specification <code>"1o(-º)"</code> with
 : <code>$language</code> equal to <code>it</code>, if supported,
 : should produce the sequence:</p>
 : <div class="exampleInner">
 : <pre>
 : 1º 2º 3º 4º ...
 : </pre></div>
 : <p>The specification <code>"Wwo"</code> with <code>$language</code>
 : equal to <code>it</code>, if supported, should produce the
 : sequence:</p>
 : <div class="exampleInner">
 : <pre>
 : Primo Secondo Terzo Quarto Quinto ...
 : </pre></div>
 : </div>
 : <p>The <span>use of the <code>a</code> or <code>t</code>
 : modifier</span> disambiguates between numbering sequences that use
 : letters. In many languages there are two commonly used numbering
 : sequences that use letters. One numbering sequence assigns numeric
 : values to letters in alphabetic sequence, and the other assigns
 : numeric values to each letter in some other manner traditional in
 : that language. In English, these would correspond to the numbering
 : sequences specified by the format tokens <code>a</code> and
 : <code>i</code>. In some languages, the first member of each
 : sequence is the same, and so the format token alone would be
 : ambiguous. <span>In the absence of the <code>a</code> or
 : <code>t</code> modifier, the default is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span></span>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>format-integer(123, '0000')</code> returns
 : <code>"0123"</code>.</p>
 : <p><code>format-integer(123, 'w')</code> might return <code>"one
 : hundred and twenty-three"</code></p>
 : <p>The expression <code>format-integer(21, '1o', 'en')</code>
 : returns <code>"21st"</code>.</p>
 : <p><code>format-integer(14, 'Wwo(-e)', 'de')</code> might return
 : <code>"Vierzehnte"</code></p>
 : <p>The expression <code>format-integer(7, 'a')</code> returns
 : <code>"g"</code>.</p>
 : <p>The expression <code>format-integer(57, 'I')</code> returns
 : <code>"LVII"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-integer
 :)
declare function fn:format-integer( $value as xs:integer?,  $picture as xs:string,  $language as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string containing a number formatted according to a
 : given picture string, taking account of decimal formats specified
 : in the static context.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-number</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">numeric?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:format-number</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">numeric?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$decimal-format-name</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : <p>The three-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on decimal-formats and namespaces.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the two-argument form of the function is
 : equivalent to calling the three-argument form with an empty
 : sequence as the value of the third argument.</p>
 : <p>The function formats <code>$value</code> as a string using the
 : <span title="picture string" class="termref" href="#dt-picture-string"><span class="arrow">·</span>picture
 : string<span class="arrow">·</span></span> specified by the
 : <code>$picture</code> argument and the decimal-format named by the
 : <code>$decimal-format-name</code> argument, or the default
 : decimal-format, if there is no <code>$decimal-format-name</code>
 : argument. The syntax of the picture string is described in <span href="#syntax-of-picture-string"><b>4.7.3 Syntax of the picture
 : string</b></span>.</p>
 : <p>The <code>$value</code> argument may be of any numeric data type
 : (<code>xs:double</code>, <code>xs:float</code>,
 : <code>xs:decimal</code>, or their subtypes including
 : <code>xs:integer</code>). Note that if an <code>xs:decimal</code>
 : is supplied, it is not automatically promoted to an
 : <code>xs:double</code>, as such promotion can involve a loss of
 : precision.</p>
 : <p>If the supplied value of the <code>$value</code> argument is an
 : empty sequence, the function behaves as if the supplied value were
 : the <code>xs:double</code> value <code>NaN</code>.</p>
 : <p>The value of <code>$decimal-format-name</code>, <span>if present
 : and non-empty,</span> <strong>must</strong> be a lexical QName,
 : which is expanded using the <span>statically known
 : namespaces</span>. The default namespace is not used (no prefix
 : means no namespace).</p>
 : <p>The decimal format that is used is the decimal format in the
 : static context whose name matches <code>$decimal-format-name</code>
 : if supplied, or the default decimal format in the static context
 : otherwise.</p>
 : <p>The evaluation of the <code>format-number</code> function takes
 : place in two phases, an analysis phase described in <span href="#analysing-picture-string"><b>4.7.4 Analysing the picture
 : string</b></span> and a formatting phase described in <span href="#formatting-the-number"><b>4.7.5 Formatting the
 : number</b></span>.</p>
 : <p>The analysis phase takes as its inputs the <span title="picture string" class="termref" href="#dt-picture-string"><span class="arrow">·</span>picture
 : string<span class="arrow">·</span></span> and the variables derived
 : from the relevant decimal format in the static context, and
 : produces as its output a number of variables with defined values.
 : The formatting phase takes as its inputs the number to be formatted
 : and the variables produced by the analysis phase, and produces as
 : its output a string containing a formatted representation of the
 : number.</p>
 : <p>The result of the function is the formatted string
 : representation of the supplied number.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODF1280" title="err:FODF1280">err:FODF1280</span>] if the name specified as the
 : <code>$decimal-format-name</code> argument is not a valid lexical
 : QName, or if its prefix <span>is not found in the statically known
 : namespaces</span>, or if the static context does not contain a
 : declaration of a decimal-format with a matching expanded QName. If
 : the processor is able to detect the error statically (for example,
 : when the argument is supplied as a string literal), then the
 : processor <strong>may</strong> optionally signal this as a static
 : error.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Numbers will always be formatted with the most significant digit
 : on the left.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>format-number(12345.6, '#.###,00')</code>
 : returns <code>"12.345,00"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-number
 :)
declare function fn:format-number($value as numeric?,  $picture as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string containing a number formatted according to a
 : given picture string, taking account of decimal formats specified
 : in the static context.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-number</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">numeric?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:format-number</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">numeric?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$decimal-format-name</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : <p>The three-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on decimal-formats and namespaces.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the two-argument form of the function is
 : equivalent to calling the three-argument form with an empty
 : sequence as the value of the third argument.</p>
 : <p>The function formats <code>$value</code> as a string using the
 : <span title="picture string" class="termref" href="#dt-picture-string"><span class="arrow">·</span>picture
 : string<span class="arrow">·</span></span> specified by the
 : <code>$picture</code> argument and the decimal-format named by the
 : <code>$decimal-format-name</code> argument, or the default
 : decimal-format, if there is no <code>$decimal-format-name</code>
 : argument. The syntax of the picture string is described in <span href="#syntax-of-picture-string"><b>4.7.3 Syntax of the picture
 : string</b></span>.</p>
 : <p>The <code>$value</code> argument may be of any numeric data type
 : (<code>xs:double</code>, <code>xs:float</code>,
 : <code>xs:decimal</code>, or their subtypes including
 : <code>xs:integer</code>). Note that if an <code>xs:decimal</code>
 : is supplied, it is not automatically promoted to an
 : <code>xs:double</code>, as such promotion can involve a loss of
 : precision.</p>
 : <p>If the supplied value of the <code>$value</code> argument is an
 : empty sequence, the function behaves as if the supplied value were
 : the <code>xs:double</code> value <code>NaN</code>.</p>
 : <p>The value of <code>$decimal-format-name</code>, <span>if present
 : and non-empty,</span> <strong>must</strong> be a lexical QName,
 : which is expanded using the <span>statically known
 : namespaces</span>. The default namespace is not used (no prefix
 : means no namespace).</p>
 : <p>The decimal format that is used is the decimal format in the
 : static context whose name matches <code>$decimal-format-name</code>
 : if supplied, or the default decimal format in the static context
 : otherwise.</p>
 : <p>The evaluation of the <code>format-number</code> function takes
 : place in two phases, an analysis phase described in <span href="#analysing-picture-string"><b>4.7.4 Analysing the picture
 : string</b></span> and a formatting phase described in <span href="#formatting-the-number"><b>4.7.5 Formatting the
 : number</b></span>.</p>
 : <p>The analysis phase takes as its inputs the <span title="picture string" class="termref" href="#dt-picture-string"><span class="arrow">·</span>picture
 : string<span class="arrow">·</span></span> and the variables derived
 : from the relevant decimal format in the static context, and
 : produces as its output a number of variables with defined values.
 : The formatting phase takes as its inputs the number to be formatted
 : and the variables produced by the analysis phase, and produces as
 : its output a string containing a formatted representation of the
 : number.</p>
 : <p>The result of the function is the formatted string
 : representation of the supplied number.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODF1280" title="err:FODF1280">err:FODF1280</span>] if the name specified as the
 : <code>$decimal-format-name</code> argument is not a valid lexical
 : QName, or if its prefix <span>is not found in the statically known
 : namespaces</span>, or if the static context does not contain a
 : declaration of a decimal-format with a matching expanded QName. If
 : the processor is able to detect the error statically (for example,
 : when the argument is supplied as a string literal), then the
 : processor <strong>may</strong> optionally signal this as a static
 : error.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Numbers will always be formatted with the most significant digit
 : on the left.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>format-number(12345.6, '#.###,00')</code>
 : returns <code>"12.345,00"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-number
 :)
declare function fn:format-number( $value as numeric?,  $picture as xs:string,  $decimal-format-name as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string containing an <code>xs:time</code> value
 : formatted for display.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-time</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">xs:time?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="5"><code class="function">fn:format-time</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:time?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$language</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$calendar</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$place</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>See <span href="#rules-for-datetime-formatting"><b>9.8.4 The
 : date/time formatting functions</b></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-time
 :)
declare function fn:format-time( $value as xs:time?,  $picture as xs:string,  $language as xs:string?,  $calendar as xs:string?,  $place as xs:string?) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string containing an <code>xs:time</code> value
 : formatted for display.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:format-time</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">xs:time?</code>, <code class="arg">$picture</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="5"><code class="function">fn:format-time</code>(</td>
 : <td valign="baseline"><code class="arg">$value</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:time?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$picture</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$language</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$calendar</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$place</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>See <span href="#rules-for-datetime-formatting"><b>9.8.4 The
 : date/time formatting functions</b></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-format-time
 :)
declare function fn:format-time($value as xs:time?,  $picture as xs:string) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the arity of the function identified by a function
 : item.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:function-arity</code>(<code class="arg">$func</code><code class="as"> as </code><code class="type">function(*)</code>)<code class="as"> as </code><code class="return-type">xs:integer</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>fn:function-arity</code> function returns the arity
 : (number of arguments) of the function identified by
 : <code>$func</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:function-arity(fn:substring#2)</code>
 : returns <code>2</code>.</p>
 : <p>The expression
 : <code>fn:function-arity(function($node){name($node)})</code>
 : returns <code>1</code>.</p>
 : <p>The expression <code>let $initial := fn:substring(?, 1, 1)
 : return fn:function-arity($initial)</code> returns
 : <code>1</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-function-arity
 :)
declare function fn:function-arity($func as function(*)) as  xs:integer external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function returns a string that uniquely identifies a given
 : node.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:generate-id</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:generate-id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If the argument is the empty sequence, the result is the
 : zero-length string.</p>
 : <p>In other cases, the function returns a string that uniquely
 : identifies a given node.</p>
 : <p>The returned identifier <strong>must</strong> consist of ASCII
 : alphanumeric characters and <strong>must</strong> start with an
 : alphabetic character. Thus, the string is syntactically an XML
 : name.</p>
 : <p>An implementation is free to generate an identifier in any
 : convenient way provided that it always generates the same
 : identifier for the same node and that different identifiers are
 : always generated from different nodes. An implementation is under
 : no obligation to generate the same identifiers each time a document
 : is transformed or queried.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>There is no guarantee that a generated unique identifier will be
 : distinct from any unique IDs specified in the source document.</p>
 : <p>There is no inverse to this function; it is not directly
 : possible to find the node with a given generated ID. Of course, it
 : is possible to search a given sequence of nodes using an expression
 : such as <code>$nodes[generate-id()=$id]</code>.</p>
 : <p>It is advisable, but not required, for implementations to
 : generate IDs that are distinct even when compared using a
 : case-blind collation.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The primary use case for this function is to generate
 : hyperlinks. For example, when generating HTML, an anchor for a
 : given section <code>$sect</code> can be generated by writing (in
 : either XSLT or XQuery):</p>
 : <p><code>&lt;a name="{generate-id($sect)}"/&gt;</code></p>
 : <p>and a link to that section can then be produced with code such
 : as:</p>
 : <p><code>see &lt;a
 : href="#{generate-id($sect)}"&gt;here&lt;/a&gt;</code></p>
 : <p>Note that anchors generated in this way will not necessarily be
 : the same each time a document is republished.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-generate-id
 :)
declare function fn:generate-id() as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function returns a string that uniquely identifies a given
 : node.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:generate-id</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:generate-id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If the argument is the empty sequence, the result is the
 : zero-length string.</p>
 : <p>In other cases, the function returns a string that uniquely
 : identifies a given node.</p>
 : <p>The returned identifier <strong>must</strong> consist of ASCII
 : alphanumeric characters and <strong>must</strong> start with an
 : alphabetic character. Thus, the string is syntactically an XML
 : name.</p>
 : <p>An implementation is free to generate an identifier in any
 : convenient way provided that it always generates the same
 : identifier for the same node and that different identifiers are
 : always generated from different nodes. An implementation is under
 : no obligation to generate the same identifiers each time a document
 : is transformed or queried.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>There is no guarantee that a generated unique identifier will be
 : distinct from any unique IDs specified in the source document.</p>
 : <p>There is no inverse to this function; it is not directly
 : possible to find the node with a given generated ID. Of course, it
 : is possible to search a given sequence of nodes using an expression
 : such as <code>$nodes[generate-id()=$id]</code>.</p>
 : <p>It is advisable, but not required, for implementations to
 : generate IDs that are distinct even when compared using a
 : case-blind collation.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The primary use case for this function is to generate
 : hyperlinks. For example, when generating HTML, an anchor for a
 : given section <code>$sect</code> can be generated by writing (in
 : either XSLT or XQuery):</p>
 : <p><code>&lt;a name="{generate-id($sect)}"/&gt;</code></p>
 : <p>and a link to that section can then be produced with code such
 : as:</p>
 : <p><code>see &lt;a
 : href="#{generate-id($sect)}"&gt;here&lt;/a&gt;</code></p>
 : <p>Note that anchors generated in this way will not necessarily be
 : the same each time a document is republished.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-generate-id
 :)
declare function fn:generate-id($arg as node()?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the first item in a sequence.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:head</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the value of the expression
 : <code>$arg[1]</code></p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the empty sequence
 : is returned. Otherwise the first item in the sequence is
 : returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:head(1 to 5)</code> returns
 : <code>1</code>.</p>
 : <p>The expression <code>fn:head(("a", "b", "c"))</code> returns
 : <code>"a"</code>.</p>
 : <p>The expression <code>fn:head(())</code> returns
 : <code>()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-head
 :)
declare function fn:head($arg as item()*) as  item()? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of hours in a duration.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:hours-from-duration</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:duration?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : representing the hours component in the value of <code>$arg</code>.
 : The result is obtained by casting <code>$arg</code> to an
 : <code>xs:dayTimeDuration</code> (see <span href="#casting-to-durations"><b>18.1.3 Casting to duration
 : types</b></span>) and then computing the hours component as described
 : in <span href="#canonical-dayTimeDuration"><b>8.1.2.3 Canonical
 : representation</b></span>.</p>
 : <p>If <code>$arg</code> is a negative duration then the result will
 : be negative..</p>
 : <p>If <code>$arg</code> is an <code>xs:yearMonthDuration</code> the
 : function returns 0.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:hours-from-duration(xs:dayTimeDuration("P3DT10H"))</code>
 : returns <code>10</code>.</p>
 : <p>The expression
 : <code>fn:hours-from-duration(xs:dayTimeDuration("P3DT12H32M12S"))</code>
 : returns <code>12</code>.</p>
 : <p>The expression
 : <code>fn:hours-from-duration(xs:dayTimeDuration("PT123H"))</code>
 : returns <code>3</code>.</p>
 : <p>The expression
 : <code>fn:hours-from-duration(xs:dayTimeDuration("-P3DT10H"))</code>
 : returns <code>-10</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-hours-from-duration
 :)
declare function fn:hours-from-duration($arg as xs:duration?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the hours component of an <code>xs:time</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:hours-from-time</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:time?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : between 0 and 23, both inclusive, representing the value of the
 : hours component in the local value of <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Assume that the dynamic context provides an implicit timezone
 : value of <code>-05:00</code>.</p>
 : <p>The expression
 : <code>fn:hours-from-time(xs:time("11:23:00"))</code> returns
 : <code>11</code>.</p>
 : <p>The expression
 : <code>fn:hours-from-time(xs:time("21:23:00"))</code> returns
 : <code>21</code>.</p>
 : <p>The expression
 : <code>fn:hours-from-time(xs:time("01:23:00+05:00"))</code> returns
 : <code>1</code>.</p>
 : <p>The expression
 : <code>fn:hours-from-time(fn:adjust-time-to-timezone(xs:time("01:23:00+05:00"),
 : xs:dayTimeDuration("PT0S")))</code> returns <code>20</code>.</p>
 : <p>The expression
 : <code>fn:hours-from-time(xs:time("24:00:00"))</code> returns
 : <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-hours-from-time
 :)
declare function fn:hours-from-time($arg as xs:time?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the sequence of element nodes that have an
 : <code>ID</code> value matching the value of one or more of the
 : <code>IDREF</code> values supplied in <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>)<code class="as"> as </code><code class="return-type">element()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>, <code class="arg">$node</code><code class="as"> as </code><code class="type">node()</code>)<code class="as"> as </code><code class="return-type">element()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence, in document order with
 : duplicates eliminated, containing every element node <code>E</code>
 : that satisfies all the following conditions:</p>
 : <ol class="enumar">
 : <li>
 : <p><code>E</code> is in the target document. The target document is
 : the document containing <code>$node</code>, or the document
 : containing the context item (<code>.</code>) if the second argument
 : is omitted. The behavior of the function if <code>$node</code> is
 : omitted is exactly the same as if the context item had been passed
 : as <code>$node</code>.</p>
 : </li>
 : <li>
 : <p><code>E</code> has an <code>ID</code> value equal to one of the
 : candidate <code>IDREF</code> values, where:</p>
 : <ul>
 : <li>
 : <p>An element has an <code>ID</code> value equal to <code>V</code>
 : if either or both of the following conditions are true:</p>
 : <ul>
 : <li>
 : <p>The <code>is-id</code> property (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup>.) of the element
 : node is true, and the typed value of the element node is equal to V
 : under the rules of the <code>eq</code> operator using the Unicode
 : codepoint collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </li>
 : <li>
 : <p>The element has an attribute node whose <code>is-id</code>
 : property (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup>.) is true and
 : whose typed value is equal to <code>V</code> under the rules of the
 : <code>eq</code> operator using the Unicode code point collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>Each <code>xs:string</code> in <code>$arg</code> is parsed as if
 : it were of type <code>IDREFS</code>, that is, each
 : <code>xs:string</code> in <code>$arg</code> is treated as a
 : whitespace-separated sequence of tokens, each acting as an
 : <code>IDREF</code>. These tokens are then included in the list of
 : candidate <code>IDREF</code>s. If any of the tokens is not a
 : lexically valid <code>IDREF</code> (that is, if it is not lexically
 : an <code>xs:NCName</code>), it is ignored. Formally, the candidate
 : <code>IDREF</code> values are the strings in the sequence given by
 : the expression:</p>
 : <div class="exampleInner">
 : <pre>
 : for $s in $arg return 
 :     fn:tokenize(fn:normalize-space($s), ' ')[. castable as xs:IDREF]
 : </pre></div>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>If several elements have the same <code>ID</code> value, then
 : <code>E</code> is the one that is first in document order.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0001" title="err:FODC0001">err:FODC0001</span>] if <code>$node</code>, or the
 : context item if the second argument is absent, is a node in a tree
 : whose root is not a document node.</p>
 : <p>If the second argument is the context item, or is omitted, the
 : following errors may be raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>,
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The effect of this function is anomalous in respect of element
 : nodes with the <code>is-id</code> property. For legacy reasons,
 : this function returns the element that has the <code>is-id</code>
 : property, whereas it would be more appropriate to return its
 : parent, that being the element that is uniquely identified by the
 : ID. A new function <code>element-with-id</code> is being introduced
 : with the desired behavior.</p>
 : <p>If the data model is constructed from an Infoset, an attribute
 : will have the <code>is-id</code> property if the corresponding
 : attribute in the Infoset had an attribute type of <code>ID</code>:
 : typically this means the attribute was declared as an
 : <code>ID</code> in a DTD.</p>
 : <p>If the data model is constructed from a PSVI, an element or
 : attribute will have the <code>is-id</code> property if its typed
 : value is a single atomic value of type <code>xs:ID</code> or a type
 : derived by restriction from <code>xs:ID</code>.</p>
 : <p>No error is raised in respect of a candidate <code>IDREF</code>
 : value that does not match the <code>ID</code> of any element in the
 : document. If no candidate <code>IDREF</code> value matches the
 : <code>ID</code> value of any element, the function returns the
 : empty sequence.</p>
 : <p>It is not necessary that the supplied argument should have type
 : <code>xs:IDREF</code> or <code>xs:IDREFS</code>, or that it should
 : be derived from a node with the <code>is-idrefs</code>
 : property.</p>
 : <p>An element may have more than one <code>ID</code> value. This
 : can occur with synthetic data models or with data models
 : constructed from a PSVI where the element and one of its attributes
 : are both typed as <code>xs:ID</code>.</p>
 : <p>If the source document is well-formed but not valid, it is
 : possible for two or more elements to have the same <code>ID</code>
 : value. In this situation, the function will select the first such
 : element.</p>
 : <p>It is also possible in a well-formed but invalid document to
 : have an element or attribute that has the <code>is-id</code>
 : property but whose value does not conform to the lexical rules for
 : the <code>xs:ID</code> type. Such a node will never be selected by
 : this function.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$emp</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 :             &lt;employee xml:id="ID21256"&gt;
 :                &lt;empnr&gt;E21256&lt;/empnr&gt;
 :                &lt;first&gt;John&lt;/first&gt;
 :                &lt;last&gt;Brown&lt;/last&gt;
 :             &lt;/employee&gt;
 :          
 : </pre></div>
 : <p>The expression <code>id('ID21256')/name()</code> returns
 : <code>employee</code>. <em>(The <code>xml:id</code> attribute has
 : the <code>is-id</code> property, so the employee element is
 : selected.).</em></p>
 : <p>The expression <code>id('E21256')/name()</code> returns
 : <code>empnr</code>. <em>(Assuming the <code>empnr</code> element is
 : given the type <code>xs:ID</code> as a result of schema validation,
 : the element will have the <code>is-id</code> property and is
 : therefore selected. Note the difference from the behavior of
 : <span href="#func-element-with-id"><code>fn:element-with-id</code></span>.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-id
 :)
declare function fn:id($arg as xs:string*) as  element()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the sequence of element nodes that have an
 : <code>ID</code> value matching the value of one or more of the
 : <code>IDREF</code> values supplied in <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>)<code class="as"> as </code><code class="return-type">element()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:id</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>, <code class="arg">$node</code><code class="as"> as </code><code class="type">node()</code>)<code class="as"> as </code><code class="return-type">element()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence, in document order with
 : duplicates eliminated, containing every element node <code>E</code>
 : that satisfies all the following conditions:</p>
 : <ol class="enumar">
 : <li>
 : <p><code>E</code> is in the target document. The target document is
 : the document containing <code>$node</code>, or the document
 : containing the context item (<code>.</code>) if the second argument
 : is omitted. The behavior of the function if <code>$node</code> is
 : omitted is exactly the same as if the context item had been passed
 : as <code>$node</code>.</p>
 : </li>
 : <li>
 : <p><code>E</code> has an <code>ID</code> value equal to one of the
 : candidate <code>IDREF</code> values, where:</p>
 : <ul>
 : <li>
 : <p>An element has an <code>ID</code> value equal to <code>V</code>
 : if either or both of the following conditions are true:</p>
 : <ul>
 : <li>
 : <p>The <code>is-id</code> property (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup>.) of the element
 : node is true, and the typed value of the element node is equal to V
 : under the rules of the <code>eq</code> operator using the Unicode
 : codepoint collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </li>
 : <li>
 : <p>The element has an attribute node whose <code>is-id</code>
 : property (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-id">Section 5.5
 : is-id Accessor</span> <sup><small>DM30</small></sup>.) is true and
 : whose typed value is equal to <code>V</code> under the rules of the
 : <code>eq</code> operator using the Unicode code point collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</p>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>Each <code>xs:string</code> in <code>$arg</code> is parsed as if
 : it were of type <code>IDREFS</code>, that is, each
 : <code>xs:string</code> in <code>$arg</code> is treated as a
 : whitespace-separated sequence of tokens, each acting as an
 : <code>IDREF</code>. These tokens are then included in the list of
 : candidate <code>IDREF</code>s. If any of the tokens is not a
 : lexically valid <code>IDREF</code> (that is, if it is not lexically
 : an <code>xs:NCName</code>), it is ignored. Formally, the candidate
 : <code>IDREF</code> values are the strings in the sequence given by
 : the expression:</p>
 : <div class="exampleInner">
 : <pre>
 : for $s in $arg return 
 :     fn:tokenize(fn:normalize-space($s), ' ')[. castable as xs:IDREF]
 : </pre></div>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>If several elements have the same <code>ID</code> value, then
 : <code>E</code> is the one that is first in document order.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0001" title="err:FODC0001">err:FODC0001</span>] if <code>$node</code>, or the
 : context item if the second argument is absent, is a node in a tree
 : whose root is not a document node.</p>
 : <p>If the second argument is the context item, or is omitted, the
 : following errors may be raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>,
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The effect of this function is anomalous in respect of element
 : nodes with the <code>is-id</code> property. For legacy reasons,
 : this function returns the element that has the <code>is-id</code>
 : property, whereas it would be more appropriate to return its
 : parent, that being the element that is uniquely identified by the
 : ID. A new function <code>element-with-id</code> is being introduced
 : with the desired behavior.</p>
 : <p>If the data model is constructed from an Infoset, an attribute
 : will have the <code>is-id</code> property if the corresponding
 : attribute in the Infoset had an attribute type of <code>ID</code>:
 : typically this means the attribute was declared as an
 : <code>ID</code> in a DTD.</p>
 : <p>If the data model is constructed from a PSVI, an element or
 : attribute will have the <code>is-id</code> property if its typed
 : value is a single atomic value of type <code>xs:ID</code> or a type
 : derived by restriction from <code>xs:ID</code>.</p>
 : <p>No error is raised in respect of a candidate <code>IDREF</code>
 : value that does not match the <code>ID</code> of any element in the
 : document. If no candidate <code>IDREF</code> value matches the
 : <code>ID</code> value of any element, the function returns the
 : empty sequence.</p>
 : <p>It is not necessary that the supplied argument should have type
 : <code>xs:IDREF</code> or <code>xs:IDREFS</code>, or that it should
 : be derived from a node with the <code>is-idrefs</code>
 : property.</p>
 : <p>An element may have more than one <code>ID</code> value. This
 : can occur with synthetic data models or with data models
 : constructed from a PSVI where the element and one of its attributes
 : are both typed as <code>xs:ID</code>.</p>
 : <p>If the source document is well-formed but not valid, it is
 : possible for two or more elements to have the same <code>ID</code>
 : value. In this situation, the function will select the first such
 : element.</p>
 : <p>It is also possible in a well-formed but invalid document to
 : have an element or attribute that has the <code>is-id</code>
 : property but whose value does not conform to the lexical rules for
 : the <code>xs:ID</code> type. Such a node will never be selected by
 : this function.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$emp</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 :             &lt;employee xml:id="ID21256"&gt;
 :                &lt;empnr&gt;E21256&lt;/empnr&gt;
 :                &lt;first&gt;John&lt;/first&gt;
 :                &lt;last&gt;Brown&lt;/last&gt;
 :             &lt;/employee&gt;
 :          
 : </pre></div>
 : <p>The expression <code>id('ID21256')/name()</code> returns
 : <code>employee</code>. <em>(The <code>xml:id</code> attribute has
 : the <code>is-id</code> property, so the employee element is
 : selected.).</em></p>
 : <p>The expression <code>id('E21256')/name()</code> returns
 : <code>empnr</code>. <em>(Assuming the <code>empnr</code> element is
 : given the type <code>xs:ID</code> as a result of schema validation,
 : the element will have the <code>is-id</code> property and is
 : therefore selected. Note the difference from the behavior of
 : <span href="#func-element-with-id"><code>fn:element-with-id</code></span>.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-id
 :)
declare function fn:id($arg as xs:string*,  $node as node()) as  element()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the sequence of element or attribute nodes with an
 : <code>IDREF</code> value matching the value of one or more of the
 : <code>ID</code> values supplied in <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:idref</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>)<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:idref</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>, <code class="arg">$node</code><code class="as"> as </code><code class="type">node()</code>)<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence, in document order with
 : duplicates eliminated, containing every element or attribute node
 : <code>$N</code> that satisfies all the following conditions:</p>
 : <ol class="enumar">
 : <li>
 : <p><code>$N</code> is in the target document. The target document
 : is the document containing <code>$node</code> or the document
 : containing the context item (<code>.</code>) if the second argument
 : is omitted. The behavior of the function if <code>$node</code> is
 : omitted is exactly the same as if the context item had been passed
 : as <code>$node</code>.</p>
 : </li>
 : <li>
 : <p><code>$N</code> has an <code>IDREF</code> value equal to one of
 : the candidate <code>ID</code> values, where:</p>
 : <ul>
 : <li>
 : <p>A node <code>$N</code> has an <code>IDREF</code> value equal to
 : <code>V</code> if both of the following conditions are true:</p>
 : <ul>
 : <li>
 : <p>The <code>is-idrefs</code> property (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-idrefs">Section 5.6
 : is-idrefs Accessor</span> <sup><small>DM30</small></sup>) of
 : <code>$N</code> is <code>true</code>.</p>
 : </li>
 : <li>
 : <p>The sequence</p>
 : <div class="exampleInner">
 : <pre>
 : fn:tokenize(fn:normalize-space(fn:string($N)), ' ')
 : </pre></div>
 : contains a string that is equal to <code>V</code> under the rules
 : of the <code>eq</code> operator using the Unicode code point
 : collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</li>
 : </ul>
 : </li>
 : <li>
 : <p>Each <code>xs:string</code> in <code>$arg</code> is parsed as if
 : it were of lexically of type <code>xs:ID</code>. These
 : <code>xs:string</code>s are then included in the list of candidate
 : <code>xs:ID</code>s. If any of the strings in <code>$arg</code> is
 : not a lexically valid <code>xs:ID</code> (that is, if it is not
 : lexically an <code>xs:NCName</code>), it is ignored. More formally,
 : the candidate <code>ID</code> values are the strings in the
 : sequence:</p>
 : <div class="exampleInner">
 : <pre>
 : $arg[. castable as xs:NCName]
 : </pre></div>
 : </li>
 : </ul>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0001" title="err:FODC0001">err:FODC0001</span>] if <code>$node</code>, or the
 : context item if the second argument is omitted, is a node in a tree
 : whose root is not a document node.</p>
 : <p>If the second argument is the context item, or is omitted, the
 : following errors may be raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>An element or attribute typically acquires the
 : <code>is-idrefs</code> property by being validated against the
 : schema type <code>xs:IDREF</code> or <code>xs:IDREFS</code>, or
 : (for attributes only) by being described as of type
 : <code>IDREF</code> or <code>IDREFS</code> in a DTD.</p>
 : <p>No error is raised in respect of a candidate <code>ID</code>
 : value that does not match the <code>IDREF</code> value of any
 : element or attribute in the document. If no candidate
 : <code>ID</code> value matches the <code>IDREF</code> value of any
 : element or attribute, the function returns the empty sequence.</p>
 : <p>It is possible for two or more nodes to have an
 : <code>IDREF</code> value that matches a given candidate
 : <code>ID</code> value. In this situation, the function will return
 : all such nodes. However, each matching node will be returned at
 : most once, regardless how many candidate <code>ID</code> values it
 : matches.</p>
 : <p>It is possible in a well-formed but invalid document to have a
 : node whose <code>is-idrefs</code> property is true but that does
 : not conform to the lexical rules for the <code>xs:IDREF</code>
 : type. The effect of the above rules is that ill-formed candidate
 : <code>ID</code> values and ill-formed <code>IDREF</code> values are
 : ignored.</p>
 : <p>If the data model is constructed from a PSVI, the typed value of
 : a node that has the <code>is-idrefs</code> property will contain at
 : least one atomic value of type <code>xs:IDREF</code> (or a type
 : derived by restriction from <code>xs:IDREF</code>). It may also
 : contain atomic values of other types. These atomic values are
 : treated as candidate <code>ID</code> values if their lexical form
 : is valid as an <code>xs:NCName</code>, and they are ignored
 : otherwise.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-idref
 :)
declare function fn:idref($arg as xs:string*) as  node()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the sequence of element or attribute nodes with an
 : <code>IDREF</code> value matching the value of one or more of the
 : <code>ID</code> values supplied in <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:idref</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>)<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:idref</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string*</code>, <code class="arg">$node</code><code class="as"> as </code><code class="type">node()</code>)<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence, in document order with
 : duplicates eliminated, containing every element or attribute node
 : <code>$N</code> that satisfies all the following conditions:</p>
 : <ol class="enumar">
 : <li>
 : <p><code>$N</code> is in the target document. The target document
 : is the document containing <code>$node</code> or the document
 : containing the context item (<code>.</code>) if the second argument
 : is omitted. The behavior of the function if <code>$node</code> is
 : omitted is exactly the same as if the context item had been passed
 : as <code>$node</code>.</p>
 : </li>
 : <li>
 : <p><code>$N</code> has an <code>IDREF</code> value equal to one of
 : the candidate <code>ID</code> values, where:</p>
 : <ul>
 : <li>
 : <p>A node <code>$N</code> has an <code>IDREF</code> value equal to
 : <code>V</code> if both of the following conditions are true:</p>
 : <ul>
 : <li>
 : <p>The <code>is-idrefs</code> property (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-is-idrefs">Section 5.6
 : is-idrefs Accessor</span> <sup><small>DM30</small></sup>) of
 : <code>$N</code> is <code>true</code>.</p>
 : </li>
 : <li>
 : <p>The sequence</p>
 : <div class="exampleInner">
 : <pre>
 : fn:tokenize(fn:normalize-space(fn:string($N)), ' ')
 : </pre></div>
 : contains a string that is equal to <code>V</code> under the rules
 : of the <code>eq</code> operator using the Unicode code point
 : collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>).</li>
 : </ul>
 : </li>
 : <li>
 : <p>Each <code>xs:string</code> in <code>$arg</code> is parsed as if
 : it were of lexically of type <code>xs:ID</code>. These
 : <code>xs:string</code>s are then included in the list of candidate
 : <code>xs:ID</code>s. If any of the strings in <code>$arg</code> is
 : not a lexically valid <code>xs:ID</code> (that is, if it is not
 : lexically an <code>xs:NCName</code>), it is ignored. More formally,
 : the candidate <code>ID</code> values are the strings in the
 : sequence:</p>
 : <div class="exampleInner">
 : <pre>
 : $arg[. castable as xs:NCName]
 : </pre></div>
 : </li>
 : </ul>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0001" title="err:FODC0001">err:FODC0001</span>] if <code>$node</code>, or the
 : context item if the second argument is omitted, is a node in a tree
 : whose root is not a document node.</p>
 : <p>If the second argument is the context item, or is omitted, the
 : following errors may be raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>An element or attribute typically acquires the
 : <code>is-idrefs</code> property by being validated against the
 : schema type <code>xs:IDREF</code> or <code>xs:IDREFS</code>, or
 : (for attributes only) by being described as of type
 : <code>IDREF</code> or <code>IDREFS</code> in a DTD.</p>
 : <p>No error is raised in respect of a candidate <code>ID</code>
 : value that does not match the <code>IDREF</code> value of any
 : element or attribute in the document. If no candidate
 : <code>ID</code> value matches the <code>IDREF</code> value of any
 : element or attribute, the function returns the empty sequence.</p>
 : <p>It is possible for two or more nodes to have an
 : <code>IDREF</code> value that matches a given candidate
 : <code>ID</code> value. In this situation, the function will return
 : all such nodes. However, each matching node will be returned at
 : most once, regardless how many candidate <code>ID</code> values it
 : matches.</p>
 : <p>It is possible in a well-formed but invalid document to have a
 : node whose <code>is-idrefs</code> property is true but that does
 : not conform to the lexical rules for the <code>xs:IDREF</code>
 : type. The effect of the above rules is that ill-formed candidate
 : <code>ID</code> values and ill-formed <code>IDREF</code> values are
 : ignored.</p>
 : <p>If the data model is constructed from a PSVI, the typed value of
 : a node that has the <code>is-idrefs</code> property will contain at
 : least one atomic value of type <code>xs:IDREF</code> (or a type
 : derived by restriction from <code>xs:IDREF</code>). It may also
 : contain atomic values of other types. These atomic values are
 : treated as candidate <code>ID</code> values if their lexical form
 : is valid as an <code>xs:NCName</code>, and they are ignored
 : otherwise.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-idref
 :)
declare function fn:idref($arg as xs:string*,  $node as node()) as  node()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the prefixes of the in-scope namespaces for an element
 : node.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:in-scope-prefixes</code>(<code class="arg">$element</code><code class="as"> as </code><code class="type">element()</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence of strings representing the
 : prefixes of the in-scope namespaces for <code>$element</code>.</p>
 : <p>For namespace bindings that have a prefix, the function returns
 : the prefix as an <code>xs:NCName</code>. For the default namespace,
 : which has no prefix, it returns the zero-length string.</p>
 : <p>The result sequence contains no duplicates.</p>
 : <p>The ordering of the result sequence is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation-dependent<span class="arrow">·</span></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-in-scope-prefixes
 :)
declare function fn:in-scope-prefixes($element as element()) as  xs:string* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of positive integers giving the positions
 : within the sequence <code>$seq</code> of items that are equal to
 : <code>$search</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:index-of</code>(</td>
 : <td valign="baseline"><code class="arg">$seq</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$search</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType</code>)<code class="as"> as </code><code class="return-type">xs:integer*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:index-of</code>(</td>
 : <td valign="baseline"><code class="arg">$seq</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$search</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:integer*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence of positive integers giving the
 : positions within the sequence <code>$seq</code> of items that are
 : equal to <code>$search</code>.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>. This collation is used when string comparison is
 : required.</p>
 : <p>The items in the sequence <code>$seq</code> are compared with
 : <code>$search</code> under the rules for the <code>eq</code>
 : operator. Values of type <code>xs:untypedAtomic</code> are compared
 : as if they were of type <code>xs:string</code>. Values that cannot
 : be compared, because the <code>eq</code> operator is not defined
 : for their types, are considered to be distinct. If an item compares
 : equal, then the position of that item in the sequence
 : <code>$seq</code> is included in the result.</p>
 : <p>The first item in a sequence is at position 1, not position
 : 0.</p>
 : <p>The result sequence is in ascending numeric order.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If the value of <code>$seq</code> is the empty sequence, or if
 : no item in <code>$seq</code> matches <code>$search</code>, then the
 : function returns the empty sequence.</p>
 : <p>No error occurs if non-comparable values are encountered. So
 : when comparing two atomic values, the effective boolean value of
 : <code>fn:index-of($a, $b)</code> is true if <code>$a</code> and
 : <code>$b</code> are equal, false if they are not equal or not
 : comparable.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:index-of((10, 20, 30, 40), 35)</code>
 : returns <code>()</code>.</p>
 : <p>The expression <code>fn:index-of((10, 20, 30, 30, 20, 10),
 : 20)</code> returns <code>(2, 5)</code>.</p>
 : <p>The expression <code>fn:index-of(("a", "sport", "and", "a",
 : "pastime"), "a")</code> returns <code>(1, 4)</code>.</p>
 : <p>The expression <code>fn:index-of(current-date(), 23)</code>
 : returns <code>()</code>.</p>
 : <p>If <code>@a</code> is an attribute of type
 : <code>xs:NMTOKENS</code> whose string value is <code>"red green
 : blue"</code>, and whose typed value is therefore <code>("red",
 : "green", "blue")</code>, then <code>fn:index-of(@a, "blue")</code>
 : returns <code>3</code>. This is because the function calling
 : mechanism atomizes the attribute node to produce a sequence of
 : three <code>xs:NMTOKEN</code> values.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-index-of
 :)
declare function fn:index-of( $seq as xs:anyAtomicType*,  $search as xs:anyAtomicType) as  xs:integer* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of positive integers giving the positions
 : within the sequence <code>$seq</code> of items that are equal to
 : <code>$search</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:index-of</code>(</td>
 : <td valign="baseline"><code class="arg">$seq</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$search</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType</code>)<code class="as"> as </code><code class="return-type">xs:integer*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:index-of</code>(</td>
 : <td valign="baseline"><code class="arg">$seq</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$search</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:integer*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence of positive integers giving the
 : positions within the sequence <code>$seq</code> of items that are
 : equal to <code>$search</code>.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>. This collation is used when string comparison is
 : required.</p>
 : <p>The items in the sequence <code>$seq</code> are compared with
 : <code>$search</code> under the rules for the <code>eq</code>
 : operator. Values of type <code>xs:untypedAtomic</code> are compared
 : as if they were of type <code>xs:string</code>. Values that cannot
 : be compared, because the <code>eq</code> operator is not defined
 : for their types, are considered to be distinct. If an item compares
 : equal, then the position of that item in the sequence
 : <code>$seq</code> is included in the result.</p>
 : <p>The first item in a sequence is at position 1, not position
 : 0.</p>
 : <p>The result sequence is in ascending numeric order.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If the value of <code>$seq</code> is the empty sequence, or if
 : no item in <code>$seq</code> matches <code>$search</code>, then the
 : function returns the empty sequence.</p>
 : <p>No error occurs if non-comparable values are encountered. So
 : when comparing two atomic values, the effective boolean value of
 : <code>fn:index-of($a, $b)</code> is true if <code>$a</code> and
 : <code>$b</code> are equal, false if they are not equal or not
 : comparable.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:index-of((10, 20, 30, 40), 35)</code>
 : returns <code>()</code>.</p>
 : <p>The expression <code>fn:index-of((10, 20, 30, 30, 20, 10),
 : 20)</code> returns <code>(2, 5)</code>.</p>
 : <p>The expression <code>fn:index-of(("a", "sport", "and", "a",
 : "pastime"), "a")</code> returns <code>(1, 4)</code>.</p>
 : <p>The expression <code>fn:index-of(current-date(), 23)</code>
 : returns <code>()</code>.</p>
 : <p>If <code>@a</code> is an attribute of type
 : <code>xs:NMTOKENS</code> whose string value is <code>"red green
 : blue"</code>, and whose typed value is therefore <code>("red",
 : "green", "blue")</code>, then <code>fn:index-of(@a, "blue")</code>
 : returns <code>3</code>. This is because the function calling
 : mechanism atomizes the attribute node to produce a sequence of
 : three <code>xs:NMTOKEN</code> values.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-index-of
 :)
declare function fn:index-of( $seq as xs:anyAtomicType*,  $search as xs:anyAtomicType,  $collation as xs:string) as  xs:integer* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence constructed by inserting an item or a
 : sequence of items at a given position within an existing
 : sequence.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:insert-before</code>(</td>
 : <td valign="baseline"><code class="arg">$target</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$position</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:integer</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$inserts</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The value returned by the function consists of all items of
 : <code>$target</code> whose index is less than
 : <code>$position</code>, followed by all items of
 : <code>$inserts</code>, followed by the remaining elements of
 : <code>$target</code>, in that order.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$target</code> is the empty sequence,
 : <code>$inserts</code> is returned. If <code>$inserts</code> is the
 : empty sequence, <code>$target</code> is returned.</p>
 : <p>If <code>$position</code> is less than one (1), the first
 : position, the effective value of <code>$position</code> is one (1).
 : If <code>$position</code> is greater than the number of items in
 : <code>$target</code>, then the effective value of
 : <code>$position</code> is equal to the number of items in
 : <code>$target</code> plus 1.</p>
 : <p>The value of <code>$target</code> is not affected by the
 : sequence construction.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$abc</code> := <code>("a", "b", "c")</code></p>
 : <p>The expression <code>fn:insert-before($abc, 0, "z")</code>
 : returns <code>("z", "a", "b", "c")</code>.</p>
 : <p>The expression <code>fn:insert-before($abc, 1, "z")</code>
 : returns <code>("z", "a", "b", "c")</code>.</p>
 : <p>The expression <code>fn:insert-before($abc, 2, "z")</code>
 : returns <code>("a", "z", "b", "c")</code>.</p>
 : <p>The expression <code>fn:insert-before($abc, 3, "z")</code>
 : returns <code>("a", "b", "z", "c")</code>.</p>
 : <p>The expression <code>fn:insert-before($abc, 4, "z")</code>
 : returns <code>("a", "b", "c", "z")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-insert-before
 :)
declare function fn:insert-before( $target as item()*,  $position as xs:integer,  $inserts as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the local part of the supplied QName.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:local-name-from-QName</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:QName?</code>)<code class="as"> as </code><code class="return-type">xs:NCName?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:NCName</code>
 : representing the local part of <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:local-name-from-QName(fn:QName("http://www.example.com/example",
 : "person"))</code> returns <code>"person"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-local-name-from-QName
 :)
declare function fn:local-name-from-QName($arg as xs:QName?) as  xs:NCName? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Converts a string to lower case.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:lower-case</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : zero-length string is returned.</p>
 : <p>Otherwise, the function returns the value of <code>$arg</code>
 : after translating every <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> to its lower-case correspondent as defined in
 : the appropriate case mappings section in the Unicode standard
 : <span href="#Unicode">[The Unicode Standard]</span>. For versions of
 : Unicode beginning with the 2.1.8 update, only locale-insensitive
 : case mappings should be applied. Beginning with version 3.2.0 (and
 : likely future versions) of Unicode, precise mappings are described
 : in default case operations, which are full case mappings in the
 : absence of tailoring for particular languages and environments.
 : Every upper-case character that does not have a lower-case
 : correspondent, as well as every lower-case character, is included
 : in the returned value in its original form.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Case mappings may change the length of a string. In general, the
 : <span href="#func-upper-case"><code>fn:upper-case</code></span> and
 : <code>fn:lower-case</code> functions are not inverses of each
 : other: <code>fn:lower-case(fn:upper-case($arg))</code> is not
 : guaranteed to return <code>$arg</code>, nor is <span href="#func-upper-case"><code>fn:upper-case(fn:lower-case($arg))</code></span>.
 : The Latin small letter dotless i (as used in Turkish) is perhaps
 : the most prominent lower-case letter which will not round-trip. The
 : Latin capital letter i with dot above is the most prominent
 : upper-case letter which will not round trip; there are others, such
 : as Latin capital letter Sharp S (#1E9E) which is introduced in
 : Unicode 5.1.</p>
 : <p>These functions may not always be linguistically appropriate
 : (e.g. Turkish i without dot) or appropriate for the application
 : (e.g. titlecase). In cases such as Turkish, a simple translation
 : should be used first.</p>
 : <p>Because the function is not sensitive to locale, results will
 : not always match user expectations. In Quebec, for example, the
 : standard uppercase equivalent of "è" is "È", while in metropolitan
 : France it is more commonly "E"; only one of these is supported by
 : the functions as defined.</p>
 : <p>Many characters of class Ll lack uppercase equivalents in the
 : Unicode case mapping tables; many characters of class Lu lack
 : lowercase equivalents.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:lower-case("ABc!D")</code> returns
 : <code>"abc!d"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-lower-case
 :)
declare function fn:lower-case($arg as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Applies the function item <var>$f</var> to every item from the
 : sequence <var>$seq</var> in turn, returning the concatenation of
 : the resulting sequences in order.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:map</code>(<code class="arg">$f</code><code class="as"> as </code><code class="type">function(item()) as
 : item()*</code>, <code class="arg">$seq</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the function is equivalent to the following
 : implementation in XQuery:</p>
 : <div class="exampleInner">
 : <pre>
 : declare function fn:map($f, $seq) {
 :   if (fn:empty($seq))
 :   then ()
 :   else $f(fn:head($seq)), fn:map($f, fn:tail($seq))
 : };
 : </pre></div>
 : <p>or its equivalent in XSLT:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:function name="fn:map"&gt;
 :   &lt;xsl:param name="f"/&gt;
 :   &lt;xsl:param name="seq/&gt;
 :   &lt;xsl:if test="fn:exists($seq)"&gt;
 :     &lt;xsl:sequence select="$f(fn:head($seq)), fn:map($f, fn:tail($seq))"/&gt;
 :   &lt;/xsl:if&gt;
 : &lt;/xsl:function&gt;
 :          
 : </pre></div>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The function call <code>fn:map($F, $SEQ)</code> is equivalent to
 : the expression <code>for $i in $SEQ return $F($i)</code><span>,
 : assuming that ordering mode is <code>ordered</code>.</span></p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:map(function($a) { $a * $a }, 1 to
 : 5)</code> returns <code>(1, 4, 9, 16, 25)</code>.</p>
 : <p>The expression <code>fn:map(fn:string-to-codepoints#1, ("john",
 : "jane"))</code> returns <code>(106, 111, 104, 110, 106, 97, 110,
 : 101)</code>.</p>
 : <p>The expression <code>fn:map(xs:int#1, ("23", "29"))</code>
 : returns <code>(23, 29)</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-map
 :)
declare function fn:map($f as function(item()) as item()*,  $seq as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Applies the function item <var>$f</var> to successive pairs of
 : items taken one from <var>$seq1</var> and one from
 : <var>$seq2</var>, returning the concatenation of the resulting
 : sequences in order.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:map-pairs</code>(</td>
 : <td valign="baseline"><code class="arg">$f</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">function(item(), item()) as item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$seq1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$seq2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the function is equivalent to the following
 : implementation in XQuery:</p>
 : <div class="exampleInner">
 : <pre>
 : declare function fn:map-pairs($f, $seq1, $seq2)
 : {
 :    if(fn:exists($seq1) and fn:exists($seq2)) 
 :    then (
 :      $f(fn:head($seq1), fn:head($seq2)),
 :      fn:map-pairs($f, fn:tail($seq1), fn:tail($seq2))
 :    )
 :    else ()
 : };
 : </pre></div>
 : <p>or its equivalent in XSLT:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:function name="fn:map-pairs"&gt;
 :   &lt;xsl:param name="f"/&gt;
 :   &lt;xsl:param name="seq1/&gt;
 :   &lt;xsl:param name="seq2/&gt;
 :   &lt;xsl:if test="fn:exists($seq1) and fn:exists($seq2"&gt;
 :     &lt;xsl:sequence select="$f(fn:head($seq1), fn:head($seq2))"/&gt;
 :     &lt;xsl:sequence select="fn:map-pairs($f, fn:tail($seq1), fn:tail($seq2))"/&gt;
 :   &lt;/xsl:if&gt;
 : &lt;/xsl:function&gt;
 :          
 : </pre></div>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:map-pairs(concat#2, ("a", "b", "c"),
 : ("x", "y", "z"))</code> returns <code>("ax", "by",
 : "cz")</code>.</p>
 : <p>The expression <code>fn:map-pairs(function($a, $b){10*$a + $b},
 : 1 to 5, 1 to 5)</code> returns <code>(11, 22, 33, 44,
 : 55)</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-map-pairs
 :)
declare function fn:map-pairs( $f as function(item(), item()) as item()*,  $seq1 as item()*,  $seq2 as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the supplied string matches a given regular
 : expression.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:matches</code>(<code class="arg">$input</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$pattern</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:matches</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$flags</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the first version of this function
 : (omitting the argument <code>$flags</code>) is the same as the
 : effect of calling the second version with the <code>$flags</code>
 : argument set to a zero-length string. Flags are defined in <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : <p>If <code>$input</code> is the empty sequence, it is interpreted
 : as the zero-length string.</p>
 : <p>The function returns <code>true</code> if <code>$input</code> or
 : some substring of <code>$input</code> matches the regular
 : expression supplied as <code>$pattern</code>. Otherwise, the
 : function returns <code>false</code>. The matching rules are
 : influenced by the value of <code>$flags</code> if present.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORX0002" title="err:FORX0002">err:FORX0002</span>] if the value of
 : <code>$pattern</code> is invalid according to the rules described
 : in <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0001" title="err:FORX0001">err:FORX0001</span>] if the value of
 : <code>$flags</code> is invalid according to the rules described in
 : <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Unless the metacharacters <code>^</code> and <code>$</code> are
 : used as anchors, the string is considered to match the pattern if
 : any substring matches the pattern. But if anchors are used, the
 : anchors must match the start/end of the string (in string mode), or
 : the start/end of a line (in multiline mode).</p>
 : <p>This is different from the behavior of patterns in <span href="#xmlschema-2">[XML Schema Part 2: Datatypes Second Edition]</span>,
 : where regular expressions are <em>implicitly</em> anchored.</p>
 : <p>Regular expression matching is defined on the basis of Unicode
 : code points; it takes no account of collations.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:matches("abracadabra", "bra")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:matches("abracadabra", "^a.*a$")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:matches("abracadabra", "^bra")</code>
 : returns <code>false()</code>.</p>
 : <p>Given the source document:</p>
 : <p>let <code>$poem</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;poem author="Wilhelm Busch"&gt; 
 : Kaum hat dies der Hahn gesehen, 
 : Fängt er auch schon an zu krähen: 
 : Kikeriki! Kikikerikih!! 
 : Tak, tak, tak! - da kommen sie. 
 : &lt;/poem&gt;
 : </pre></div>
 : <p>the following function calls produce the following results, with
 : the <code>poem</code> element as the context node:</p>
 : <p>The expression <code>fn:matches($poem, "Kaum.*krähen")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:matches($poem, "Kaum.*krähen",
 : "s")</code> returns <code>true()</code>.</p>
 : <p>The expression <code>fn:matches($poem, "^Kaum.*gesehen,$",
 : "m")</code> returns <code>true()</code>.</p>
 : <p>The expression <code>fn:matches($poem,
 : "^Kaum.*gesehen,$")</code> returns <code>false()</code>.</p>
 : <p>The expression <code>fn:matches($poem, "kiki", "i")</code>
 : returns <code>true()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-matches
 :)
declare function fn:matches($input as xs:string?,  $pattern as xs:string) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the supplied string matches a given regular
 : expression.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:matches</code>(<code class="arg">$input</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$pattern</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:matches</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$flags</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the first version of this function
 : (omitting the argument <code>$flags</code>) is the same as the
 : effect of calling the second version with the <code>$flags</code>
 : argument set to a zero-length string. Flags are defined in <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : <p>If <code>$input</code> is the empty sequence, it is interpreted
 : as the zero-length string.</p>
 : <p>The function returns <code>true</code> if <code>$input</code> or
 : some substring of <code>$input</code> matches the regular
 : expression supplied as <code>$pattern</code>. Otherwise, the
 : function returns <code>false</code>. The matching rules are
 : influenced by the value of <code>$flags</code> if present.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORX0002" title="err:FORX0002">err:FORX0002</span>] if the value of
 : <code>$pattern</code> is invalid according to the rules described
 : in <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0001" title="err:FORX0001">err:FORX0001</span>] if the value of
 : <code>$flags</code> is invalid according to the rules described in
 : <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Unless the metacharacters <code>^</code> and <code>$</code> are
 : used as anchors, the string is considered to match the pattern if
 : any substring matches the pattern. But if anchors are used, the
 : anchors must match the start/end of the string (in string mode), or
 : the start/end of a line (in multiline mode).</p>
 : <p>This is different from the behavior of patterns in <span href="#xmlschema-2">[XML Schema Part 2: Datatypes Second Edition]</span>,
 : where regular expressions are <em>implicitly</em> anchored.</p>
 : <p>Regular expression matching is defined on the basis of Unicode
 : code points; it takes no account of collations.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:matches("abracadabra", "bra")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:matches("abracadabra", "^a.*a$")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:matches("abracadabra", "^bra")</code>
 : returns <code>false()</code>.</p>
 : <p>Given the source document:</p>
 : <p>let <code>$poem</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;poem author="Wilhelm Busch"&gt; 
 : Kaum hat dies der Hahn gesehen, 
 : Fängt er auch schon an zu krähen: 
 : Kikeriki! Kikikerikih!! 
 : Tak, tak, tak! - da kommen sie. 
 : &lt;/poem&gt;
 : </pre></div>
 : <p>the following function calls produce the following results, with
 : the <code>poem</code> element as the context node:</p>
 : <p>The expression <code>fn:matches($poem, "Kaum.*krähen")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:matches($poem, "Kaum.*krähen",
 : "s")</code> returns <code>true()</code>.</p>
 : <p>The expression <code>fn:matches($poem, "^Kaum.*gesehen,$",
 : "m")</code> returns <code>true()</code>.</p>
 : <p>The expression <code>fn:matches($poem,
 : "^Kaum.*gesehen,$")</code> returns <code>false()</code>.</p>
 : <p>The expression <code>fn:matches($poem, "kiki", "i")</code>
 : returns <code>true()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-matches
 :)
declare function fn:matches( $input as xs:string?,  $pattern as xs:string,  $flags as xs:string) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a value that is equal to the highest value appearing in
 : the input sequence.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:max</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:max</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,
 : <code class="arg">$collation</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The following rules are applied to the input sequence
 : <code>$arg</code>:</p>
 : <ul>
 : <li>
 : <p>Values of type <code>xs:untypedAtomic</code> in
 : <code>$arg</code> are cast to <code>xs:double</code>.</p>
 : </li>
 : <li>
 : <p>Numeric and <code>xs:anyURI</code> values are converted to the
 : least common type reachable by a combination of type promotion and
 : subtype substitution. See <span href="http://www.w3.org/TR/xpath-30/#promotion">Section B.1 Type
 : Promotion</span> <sup><small>XP30</small></sup> and <span href="http://www.w3.org/TR/xpath-30/#mapping">Section B.2 Operator
 : Mapping</span> <sup><small>XP30</small></sup>.</p>
 : </li>
 : </ul>
 : <p>The items in the resulting sequence may be reordered in an
 : arbitrary order. The resulting sequence is referred to below as the
 : converted sequence. The function returns an item from the converted
 : sequence rather than the input sequence.</p>
 : <p>If the converted sequence is empty, the function returns the
 : empty sequence.</p>
 : <p>All items in the <span>converted sequence must be derived</span>
 : from a single base type for which the <code>le</code> operator is
 : defined. In addition, the values in the sequence must have a total
 : order. If date/time values do not have a timezone, they are
 : considered to have the implicit timezone provided by the dynamic
 : context for the purpose of comparison. Duration values must either
 : all be <code>xs:yearMonthDuration</code> values or must all be
 : <code>xs:dayTimeDuration</code> values.</p>
 : <p>If the converted sequence contains the value <code>NaN</code>,
 : the value <code>NaN</code> is returned.</p>
 : <p>If the items in the <span>converted sequence</span> are of type
 : <code>xs:string</code> or types derived by restriction from
 : <code>xs:string</code>, then the determination of the item with the
 : smallest value is made according to the collation that is used. If
 : the type of the items in the <span>converted sequence</span> is not
 : <code>xs:string</code> and <code>$collation</code> is specified,
 : the collation is ignored.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns the result of the expression:</p>
 : <div class="exampleInner">
 : <pre>
 :    if (every $v in $c satisfies $c[1] ge $v)
 :    then $c[1] 
 :    else fn:max(fn:subsequence($c, 2))
 : </pre></div>
 : <p>evaluated with <code>$collation</code> as the default collation
 : if specified, and with <code>$c</code> as the converted
 : sequence.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>A type error is raised [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>] if the input sequence contains
 : items of incompatible types, as described above.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Because the rules allow the sequence to be reordered, if there
 : are two or items that are "equal highest", the specific item whose
 : value is returned is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>. This can arise for example if two different
 : strings compare equal under the selected collation, or if two
 : different <code>xs:dateTime</code> values compare equal despite
 : being in different timezones.</p>
 : <p>If the converted sequence contains exactly one value then that
 : value is returned.</p>
 : <p>The default type when the <code>fn:max</code> function is
 : applied to <code>xs:untypedAtomic</code> values is
 : <code>xs:double</code>. This differs from the default type for
 : operators such as <code>gt</code>, and for sorting in XQuery and
 : XSLT, which is <code>xs:string</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:max((3,4,5))</code> returns
 : <code>5</code>.</p>
 : <p>The expression <code>fn:max((xs:integer(5), xs:float(5.0),
 : xs:double(0)))</code> returns <code>xs:double(5.0e0)</code>.</p>
 : <p><code>fn:max((3,4,"Zero"))</code> raises a type error [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : <p>The expression <code>fn:max((fn:current-date(),
 : xs:date("2100-01-01")))</code> returns
 : <code>xs:date("2100-01-01")</code>. <em>(Assuming that the current
 : date is during the 21st century.).</em></p>
 : <p>The expression <code>fn:max(("a", "b", "c"))</code> returns
 : <code>"c"</code>. <em>(Assuming a typical default
 : collation.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-max
 :)
declare function fn:max($arg as xs:anyAtomicType*) as  xs:anyAtomicType? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a value that is equal to the highest value appearing in
 : the input sequence.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:max</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:max</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,
 : <code class="arg">$collation</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The following rules are applied to the input sequence
 : <code>$arg</code>:</p>
 : <ul>
 : <li>
 : <p>Values of type <code>xs:untypedAtomic</code> in
 : <code>$arg</code> are cast to <code>xs:double</code>.</p>
 : </li>
 : <li>
 : <p>Numeric and <code>xs:anyURI</code> values are converted to the
 : least common type reachable by a combination of type promotion and
 : subtype substitution. See <span href="http://www.w3.org/TR/xpath-30/#promotion">Section B.1 Type
 : Promotion</span> <sup><small>XP30</small></sup> and <span href="http://www.w3.org/TR/xpath-30/#mapping">Section B.2 Operator
 : Mapping</span> <sup><small>XP30</small></sup>.</p>
 : </li>
 : </ul>
 : <p>The items in the resulting sequence may be reordered in an
 : arbitrary order. The resulting sequence is referred to below as the
 : converted sequence. The function returns an item from the converted
 : sequence rather than the input sequence.</p>
 : <p>If the converted sequence is empty, the function returns the
 : empty sequence.</p>
 : <p>All items in the <span>converted sequence must be derived</span>
 : from a single base type for which the <code>le</code> operator is
 : defined. In addition, the values in the sequence must have a total
 : order. If date/time values do not have a timezone, they are
 : considered to have the implicit timezone provided by the dynamic
 : context for the purpose of comparison. Duration values must either
 : all be <code>xs:yearMonthDuration</code> values or must all be
 : <code>xs:dayTimeDuration</code> values.</p>
 : <p>If the converted sequence contains the value <code>NaN</code>,
 : the value <code>NaN</code> is returned.</p>
 : <p>If the items in the <span>converted sequence</span> are of type
 : <code>xs:string</code> or types derived by restriction from
 : <code>xs:string</code>, then the determination of the item with the
 : smallest value is made according to the collation that is used. If
 : the type of the items in the <span>converted sequence</span> is not
 : <code>xs:string</code> and <code>$collation</code> is specified,
 : the collation is ignored.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns the result of the expression:</p>
 : <div class="exampleInner">
 : <pre>
 :    if (every $v in $c satisfies $c[1] ge $v)
 :    then $c[1] 
 :    else fn:max(fn:subsequence($c, 2))
 : </pre></div>
 : <p>evaluated with <code>$collation</code> as the default collation
 : if specified, and with <code>$c</code> as the converted
 : sequence.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>A type error is raised [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>] if the input sequence contains
 : items of incompatible types, as described above.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Because the rules allow the sequence to be reordered, if there
 : are two or items that are "equal highest", the specific item whose
 : value is returned is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>. This can arise for example if two different
 : strings compare equal under the selected collation, or if two
 : different <code>xs:dateTime</code> values compare equal despite
 : being in different timezones.</p>
 : <p>If the converted sequence contains exactly one value then that
 : value is returned.</p>
 : <p>The default type when the <code>fn:max</code> function is
 : applied to <code>xs:untypedAtomic</code> values is
 : <code>xs:double</code>. This differs from the default type for
 : operators such as <code>gt</code>, and for sorting in XQuery and
 : XSLT, which is <code>xs:string</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:max((3,4,5))</code> returns
 : <code>5</code>.</p>
 : <p>The expression <code>fn:max((xs:integer(5), xs:float(5.0),
 : xs:double(0)))</code> returns <code>xs:double(5.0e0)</code>.</p>
 : <p><code>fn:max((3,4,"Zero"))</code> raises a type error [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : <p>The expression <code>fn:max((fn:current-date(),
 : xs:date("2100-01-01")))</code> returns
 : <code>xs:date("2100-01-01")</code>. <em>(Assuming that the current
 : date is during the 21st century.).</em></p>
 : <p>The expression <code>fn:max(("a", "b", "c"))</code> returns
 : <code>"c"</code>. <em>(Assuming a typical default
 : collation.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-max
 :)
declare function fn:max($arg as xs:anyAtomicType*,  $collation as xs:string) as  xs:anyAtomicType? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a value that is equal to the lowest value appearing in
 : the input sequence.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:min</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:min</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,
 : <code class="arg">$collation</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The following rules are applied to the input sequence:</p>
 : <ul>
 : <li>
 : <p>Values of type <code>xs:untypedAtomic</code> in
 : <code>$arg</code> are cast to <code>xs:double</code>.</p>
 : </li>
 : <li>
 : <p>Numeric and <code>xs:anyURI</code> values are converted to the
 : least common type reachable by a combination of type promotion and
 : subtype substitution. See <span href="http://www.w3.org/TR/xpath-30/#promotion">Section B.1 Type
 : Promotion</span> <sup><small>XP30</small></sup> and <span href="http://www.w3.org/TR/xpath-30/#mapping">Section B.2 Operator
 : Mapping</span> <sup><small>XP30</small></sup>.</p>
 : </li>
 : </ul>
 : <p>The items in the resulting sequence may be reordered in an
 : arbitrary order. The resulting sequence is referred to below as the
 : converted sequence. The function returns an item from the converted
 : sequence rather than the input sequence.</p>
 : <p>If the converted sequence is empty, the empty sequence is
 : returned.</p>
 : <p>All items in the <span>converted sequence must be derived</span>
 : from a single base type for which the <code>le</code> operator is
 : defined. In addition, the values in the sequence must have a total
 : order. If date/time values do not have a timezone, they are
 : considered to have the implicit timezone provided by the dynamic
 : context for the purpose of comparison. Duration values must either
 : all be <code>xs:yearMonthDuration</code> values or must all be
 : <code>xs:dayTimeDuration</code> values.</p>
 : <p>If the converted sequence contains the value <code>NaN</code>,
 : the value <code>NaN</code> is returned.</p>
 : <p>If the items in the <span>converted sequence</span> are of type
 : <code>xs:string</code> or types derived by restriction from
 : <code>xs:string</code>, then the determination of the item with the
 : smallest value is made according to the collation that is used. If
 : the type of the items in the <span>converted sequence</span> is not
 : <code>xs:string</code> and <code>$collation</code> is specified,
 : the collation is ignored.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns the result of the expression:</p>
 : <div class="exampleInner">
 : <pre>
 :    if (every $v in $c satisfies $c[1] le $v) 
 :    then $c[1] 
 :    else fn:min(fn:subsequence($c, 2))
 : </pre></div>
 : <p>evaluated with <code>$collation</code> as the default collation
 : if specified, and with <code>$c</code> as the converted
 : sequence.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>A type error is raised [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>] if the input sequence contains
 : items of incompatible types, as described above.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Because the rules allow the sequence to be reordered, if there
 : are two or items that are "equal lowest", the specific item whose
 : value is returned is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>. This can arise for example if two different
 : strings compare equal under the selected collation, or if two
 : different <code>xs:dateTime</code> values compare equal despite
 : being in different timezones.</p>
 : <p>If the converted sequence contains exactly one value then that
 : value is returned.</p>
 : <p>The default type when the <code>fn:min</code> function is
 : applied to <code>xs:untypedAtomic</code> values is
 : <code>xs:double</code>. This differs from the default type for
 : operators such as <code>lt</code>, and for sorting in XQuery and
 : XSLT, which is <code>xs:string</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:min((3,4,5))</code> returns
 : <code>3</code>.</p>
 : <p>The expression <code>fn:min((xs:integer(5), xs:float(5),
 : xs:double(10)))</code> returns <code>xs:double(5.0e0)</code>.</p>
 : <p><code>fn:min((3,4,"Zero"))</code> raises a type error [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : <p><code>fn:min((xs:float(0.0E0), xs:float(-0.0E0)))</code> can
 : return either positive or negative zero. <span>The two items are
 : equal, so it is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span> which is returned.</span></p>
 : <p>The expression <code>fn:min((fn:current-date(),
 : xs:date("1900-01-01")))</code> returns
 : <code>xs:date("1900-01-01")</code>. <em>(Assuming that the current
 : date is set to a reasonable value.).</em></p>
 : <p>The expression <code>fn:min(("a", "b", "c"))</code> returns
 : <code>"a"</code>. <em>(Assuming a typical default
 : collation.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-min
 :)
declare function fn:min($arg as xs:anyAtomicType*) as  xs:anyAtomicType? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a value that is equal to the lowest value appearing in
 : the input sequence.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:min</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:min</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,
 : <code class="arg">$collation</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The following rules are applied to the input sequence:</p>
 : <ul>
 : <li>
 : <p>Values of type <code>xs:untypedAtomic</code> in
 : <code>$arg</code> are cast to <code>xs:double</code>.</p>
 : </li>
 : <li>
 : <p>Numeric and <code>xs:anyURI</code> values are converted to the
 : least common type reachable by a combination of type promotion and
 : subtype substitution. See <span href="http://www.w3.org/TR/xpath-30/#promotion">Section B.1 Type
 : Promotion</span> <sup><small>XP30</small></sup> and <span href="http://www.w3.org/TR/xpath-30/#mapping">Section B.2 Operator
 : Mapping</span> <sup><small>XP30</small></sup>.</p>
 : </li>
 : </ul>
 : <p>The items in the resulting sequence may be reordered in an
 : arbitrary order. The resulting sequence is referred to below as the
 : converted sequence. The function returns an item from the converted
 : sequence rather than the input sequence.</p>
 : <p>If the converted sequence is empty, the empty sequence is
 : returned.</p>
 : <p>All items in the <span>converted sequence must be derived</span>
 : from a single base type for which the <code>le</code> operator is
 : defined. In addition, the values in the sequence must have a total
 : order. If date/time values do not have a timezone, they are
 : considered to have the implicit timezone provided by the dynamic
 : context for the purpose of comparison. Duration values must either
 : all be <code>xs:yearMonthDuration</code> values or must all be
 : <code>xs:dayTimeDuration</code> values.</p>
 : <p>If the converted sequence contains the value <code>NaN</code>,
 : the value <code>NaN</code> is returned.</p>
 : <p>If the items in the <span>converted sequence</span> are of type
 : <code>xs:string</code> or types derived by restriction from
 : <code>xs:string</code>, then the determination of the item with the
 : smallest value is made according to the collation that is used. If
 : the type of the items in the <span>converted sequence</span> is not
 : <code>xs:string</code> and <code>$collation</code> is specified,
 : the collation is ignored.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns the result of the expression:</p>
 : <div class="exampleInner">
 : <pre>
 :    if (every $v in $c satisfies $c[1] le $v) 
 :    then $c[1] 
 :    else fn:min(fn:subsequence($c, 2))
 : </pre></div>
 : <p>evaluated with <code>$collation</code> as the default collation
 : if specified, and with <code>$c</code> as the converted
 : sequence.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>A type error is raised [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>] if the input sequence contains
 : items of incompatible types, as described above.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Because the rules allow the sequence to be reordered, if there
 : are two or items that are "equal lowest", the specific item whose
 : value is returned is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>. This can arise for example if two different
 : strings compare equal under the selected collation, or if two
 : different <code>xs:dateTime</code> values compare equal despite
 : being in different timezones.</p>
 : <p>If the converted sequence contains exactly one value then that
 : value is returned.</p>
 : <p>The default type when the <code>fn:min</code> function is
 : applied to <code>xs:untypedAtomic</code> values is
 : <code>xs:double</code>. This differs from the default type for
 : operators such as <code>lt</code>, and for sorting in XQuery and
 : XSLT, which is <code>xs:string</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:min((3,4,5))</code> returns
 : <code>3</code>.</p>
 : <p>The expression <code>fn:min((xs:integer(5), xs:float(5),
 : xs:double(10)))</code> returns <code>xs:double(5.0e0)</code>.</p>
 : <p><code>fn:min((3,4,"Zero"))</code> raises a type error [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : <p><code>fn:min((xs:float(0.0E0), xs:float(-0.0E0)))</code> can
 : return either positive or negative zero. <span>The two items are
 : equal, so it is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span> which is returned.</span></p>
 : <p>The expression <code>fn:min((fn:current-date(),
 : xs:date("1900-01-01")))</code> returns
 : <code>xs:date("1900-01-01")</code>. <em>(Assuming that the current
 : date is set to a reasonable value.).</em></p>
 : <p>The expression <code>fn:min(("a", "b", "c"))</code> returns
 : <code>"a"</code>. <em>(Assuming a typical default
 : collation.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-min
 :)
declare function fn:min($arg as xs:anyAtomicType*,  $collation as xs:string) as  xs:anyAtomicType? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the minute component of an <code>xs:dateTime</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:minutes-from-dateTime</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:dateTime?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code> value
 : between 0 and 59, both inclusive, representing the minute component
 : in the local value of <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:minutes-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00"))</code>
 : returns <code>20</code>.</p>
 : <p>The expression
 : <code>fn:minutes-from-dateTime(xs:dateTime("1999-05-31T13:30:00+05:30"))</code>
 : returns <code>30</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-minutes-from-dateTime
 :)
declare function fn:minutes-from-dateTime($arg as xs:dateTime?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of minutes in a duration.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:minutes-from-duration</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:duration?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : representing the minutes component in the value of
 : <code>$arg</code>. The result is obtained by casting
 : <code>$arg</code> to an <code>xs:dayTimeDuration</code> (see
 : <span href="#casting-to-durations"><b>18.1.3 Casting to duration
 : types</b></span>) and then computing the minutes component as
 : described in <span href="#canonical-dayTimeDuration"><b>8.1.2.3
 : Canonical representation</b></span>.</p>
 : <p>If <code>$arg</code> is a negative duration then the result will
 : be negative..</p>
 : <p>If <code>$arg</code> is an <code>xs:yearMonthDuration</code> the
 : function returns 0.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:minutes-from-duration(xs:dayTimeDuration("P3DT10H"))</code>
 : returns <code>0</code>.</p>
 : <p>The expression
 : <code>fn:minutes-from-duration(xs:dayTimeDuration("-P5DT12H30M"))</code>
 : returns <code>-30</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-minutes-from-duration
 :)
declare function fn:minutes-from-duration($arg as xs:duration?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the minutes component of an <code>xs:time</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:minutes-from-time</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:time?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code> value
 : between 0 and 59, both inclusive, representing the value of the
 : minutes component in the local value of <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:minutes-from-time(xs:time("13:00:00Z"))</code> returns
 : <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-minutes-from-time
 :)
declare function fn:minutes-from-time($arg as xs:time?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the month component of an <code>xs:date</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:month-from-date</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:date?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : between 1 and 12, both inclusive, representing the month component
 : in the local value of <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:month-from-date(xs:date("1999-05-31-05:00"))</code>
 : returns <code>5</code>.</p>
 : <p>The expression
 : <code>fn:month-from-date(xs:date("2000-01-01+05:00"))</code>
 : returns <code>1</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-month-from-date
 :)
declare function fn:month-from-date($arg as xs:date?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of months in a duration.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:months-from-duration</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:duration?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : representing the months component in the value of
 : <code>$arg</code>. The result is obtained by casting
 : <code>$arg</code> to an <code>xs:yearMonthDuration</code> (see
 : <span href="#casting-to-durations"><b>18.1.3 Casting to duration
 : types</b></span>) and then computing the months component as described
 : in <span href="#canonical-yearMonthDuration"><b>8.1.1.3 Canonical
 : representation</b></span>.</p>
 : <p>If <code>$arg</code> is a negative duration then the result will
 : be negative..</p>
 : <p>If <code>$arg</code> is an <code>xs:dayTimeDuration</code> the
 : function returns 0.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:months-from-duration(xs:yearMonthDuration("P20Y15M"))</code>
 : returns <code>3</code>.</p>
 : <p>The expression
 : <code>fn:months-from-duration(xs:yearMonthDuration("-P20Y18M"))</code>
 : returns <code>-6</code>.</p>
 : <p>The expression
 : <code>fn:months-from-duration(xs:dayTimeDuration("-P2DT15H0M0S"))</code>
 : returns <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-months-from-duration
 :)
declare function fn:months-from-duration($arg as xs:duration?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the namespace URI of one of the in-scope namespaces for
 : <code>$element</code>, identified by its namespace prefix.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:namespace-uri-for-prefix</code>(</td>
 : <td valign="baseline"><code class="arg">$prefix</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$element</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">element()</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$element</code> has an in-scope namespace whose
 : namespace prefix is equal to <code>$prefix</code>, the function
 : returns the namespace URI of that namespace.</p>
 : <p>If <code>$element</code> has no in-scope namespace whose
 : namespace prefix is equal to <code>$prefix</code>, the function
 : returns the empty sequence.</p>
 : <p>If <code>$prefix</code> is the zero-length string or the empty
 : sequence, then if <code>$element</code> has a default namespace
 : (that is, a namespace node with no name), the function returns the
 : namespace URI of the default namespace. If <code>$element</code>
 : has no default namespace, the function returns the empty
 : sequence.</p>
 : <p>Prefixes are equal only if their Unicode codepoints match
 : exactly.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$e</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;z:a xmlns="http://example.org/one" xmlns:z="http://example.org/two"&gt;
 :   &lt;b xmlns=""/&gt;
 : &lt;/z:a&gt;
 : </pre></div>
 : <p>The expression <code>fn:namespace-uri-for-prefix("z", $e)</code>
 : returns <code>"http://example.org/two"</code>.</p>
 : <p>The expression <code>fn:namespace-uri-for-prefix("", $e)</code>
 : returns <code>"http://example.org/one"</code>.</p>
 : <p>The expression <code>fn:namespace-uri-for-prefix((), $e)</code>
 : returns <code>"http://example.org/one"</code>.</p>
 : <p>The expression <code>fn:namespace-uri-for-prefix("xml",
 : $e)</code> returns
 : <code>"http://www.w3.org/XML/1998/namespace"</code>.</p>
 : <p>The expression <code>fn:namespace-uri-for-prefix("xml",
 : $e)</code> returns
 : <code>"http://www.w3.org/XML/1998/namespace"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-namespace-uri-for-prefix
 :)
declare function fn:namespace-uri-for-prefix( $prefix as xs:string?,  $element as element()) as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the namespace URI part of the supplied QName.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:namespace-uri-from-QName</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:QName?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:anyURI</code>
 : representing the namespace URI part of <code>$arg</code>.</p>
 : <p>If <code>$arg</code> is in no namespace, the function returns
 : the zero-length <code>xs:anyURI</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:namespace-uri-from-QName(fn:QName("http://www.example.com/example",
 : "person"))</code> returns
 : <code>xs:anyURI("http://www.example.com/example")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-namespace-uri-from-QName
 :)
declare function fn:namespace-uri-from-QName($arg as xs:QName?) as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of <code>$arg</code> with leading and trailing
 : whitespace removed, and sequences of internal whitespace reduced to
 : a single space character.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:normalize-space</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:normalize-space</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>The function returns a string constructed by stripping leading
 : and trailing whitespace from the value of <code>$arg</code>, and
 : replacing sequences of one or more adjacent whitespace characters
 : with a single space, <code>#x20</code>.</p>
 : <p>The whitespace characters are defined in the metasymbol S
 : (Production 3) of <span href="#REC-xml">[REC-xml]</span>.</p>
 : <p>If no argument is supplied, then <code>$arg</code> defaults to
 : the string value (calculated using <span href="#func-string"><code>fn:string</code></span>) of the context item
 : (<code>.</code>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>If no argument is supplied and the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : then an error is raised: [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The definition of whitespace is unchanged in <span href="#xml11">[Extensible Markup Language (XML) 1.1
 : Recommendation]</span>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:normalize-space(" The    wealthy curled darlings
 :                                         of    our    nation. ")</code>
 : returns <code>"The wealthy curled darlings of our
 : nation."</code>.</p>
 : <p>The expression <code>fn:normalize-space(())</code> returns
 : <code>""</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-normalize-space
 :)
declare function fn:normalize-space() as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of <code>$arg</code> with leading and trailing
 : whitespace removed, and sequences of internal whitespace reduced to
 : a single space character.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:normalize-space</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:normalize-space</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>The function returns a string constructed by stripping leading
 : and trailing whitespace from the value of <code>$arg</code>, and
 : replacing sequences of one or more adjacent whitespace characters
 : with a single space, <code>#x20</code>.</p>
 : <p>The whitespace characters are defined in the metasymbol S
 : (Production 3) of <span href="#REC-xml">[REC-xml]</span>.</p>
 : <p>If no argument is supplied, then <code>$arg</code> defaults to
 : the string value (calculated using <span href="#func-string"><code>fn:string</code></span>) of the context item
 : (<code>.</code>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>If no argument is supplied and the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : then an error is raised: [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The definition of whitespace is unchanged in <span href="#xml11">[Extensible Markup Language (XML) 1.1
 : Recommendation]</span>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:normalize-space(" The    wealthy curled darlings
 :                                         of    our    nation. ")</code>
 : returns <code>"The wealthy curled darlings of our
 : nation."</code>.</p>
 : <p>The expression <code>fn:normalize-space(())</code> returns
 : <code>""</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-normalize-space
 :)
declare function fn:normalize-space($arg as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of <code>$arg</code> after applying Unicode
 : normalization.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:normalize-unicode</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:normalize-unicode</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$normalizationForm</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>If the single-argument version of the function is used, the
 : result is the same as calling the two-argument version with
 : <code>$normalizationForm</code> set to the string "NFC".</p>
 : <p>Otherwise, the function returns the value of <code>$arg</code>
 : normalized according to the rules of the normalization form
 : identified by the value of <code>$normalizationForm</code>.</p>
 : <p>The effective value of <code>$normalizationForm</code> is the
 : value of the expression <span href="#func-upper-case"><code>fn:upper-case(fn:normalize-space($normalizationForm))</code></span>.</p>
 : <ul>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "NFC", then the function returns the value of <code>$arg</code>
 : converted to Unicode Normalization Form C (NFC).</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "NFD", then the function returns the value of <code>$arg</code>
 : converted to Unicode Normalization Form D (NFD).</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "NFKC", then the function returns the value of <code>$arg</code> in
 : Unicode Normalization Form KC (NFKC).</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "NFKD", then the function returns the value of <code>$arg</code>
 : converted to Unicode Normalization Form KD (NFKD).</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "FULLY-NORMALIZED", then the function returns the value of
 : <code>$arg</code> converted to fully normalized form.</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is the
 : zero-length string, no normalization is performed and
 : <code>$arg</code> is returned.</p>
 : </li>
 : </ul>
 : <p>Normalization forms NFC, NFD, NFKC, and NFKD, and the algorithms
 : to be used for converting a string to each of these forms, are
 : defined in <span href="#Unicode-Normalization">[Unicode Normaliation
 : Forms]</span>.</p>
 : <p>The motivation for normalization form FULLY-NORMALIZED is
 : explained in <span href="#charmod-normalization">[Character Model for
 : the World Wide Web 1.0: Normalization]</span>. However, as that
 : specification did not progress beyond working draft status, the
 : normative specification is as follows:</p>
 : <ul>
 : <li>
 : <p>A string is <b>fully-normalized</b> if (a) it is in
 : normalization form NFC as defined in <span href="#Unicode-Normalization">[Unicode Normaliation Forms]</span>, and (b)
 : it does not start with a composing character.</p>
 : </li>
 : <li>
 : <p>A composing character is a character that is one or both of the
 : following:</p>
 : <ul>
 : <li>
 : <p>the second character in the canonical decomposition mapping of
 : some character that is not listed in the Composition Exclusion
 : Table defined in <span href="#Unicode-Normalization">[Unicode
 : Normaliation Forms]</span>;</p>
 : </li>
 : <li>
 : <p>of non-zero canonical combining class (as defined in <span href="#Unicode">[The Unicode Standard]</span>).</p>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>A string is converted to FULLY-NORMALIZED form as follows:</p>
 : <ul>
 : <li>
 : <p>if the first character in the string is a composing character,
 : prepend a single space (x20);</p>
 : </li>
 : <li>
 : <p>convert the resulting string to normalization form NFC.</p>
 : </li>
 : </ul>
 : </li>
 : </ul>
 : <p>Conforming implementations <strong>must</strong> support
 : normalization form "NFC" and <strong>may</strong> support
 : normalization forms "NFD", "NFKC", "NFKD", and "FULLY-NORMALIZED".
 : They <strong>may</strong> also support other normalization forms
 : with <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> semantics.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOCH0003" title="err:FOCH0003">err:FOCH0003</span>] if the effective value of the
 : <code>$normalizationForm</code> argument is not one of the values
 : supported by the implementation.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-normalize-unicode
 :)
declare function fn:normalize-unicode($arg as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of <code>$arg</code> after applying Unicode
 : normalization.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:normalize-unicode</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:normalize-unicode</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$normalizationForm</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>If the single-argument version of the function is used, the
 : result is the same as calling the two-argument version with
 : <code>$normalizationForm</code> set to the string "NFC".</p>
 : <p>Otherwise, the function returns the value of <code>$arg</code>
 : normalized according to the rules of the normalization form
 : identified by the value of <code>$normalizationForm</code>.</p>
 : <p>The effective value of <code>$normalizationForm</code> is the
 : value of the expression <span href="#func-upper-case"><code>fn:upper-case(fn:normalize-space($normalizationForm))</code></span>.</p>
 : <ul>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "NFC", then the function returns the value of <code>$arg</code>
 : converted to Unicode Normalization Form C (NFC).</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "NFD", then the function returns the value of <code>$arg</code>
 : converted to Unicode Normalization Form D (NFD).</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "NFKC", then the function returns the value of <code>$arg</code> in
 : Unicode Normalization Form KC (NFKC).</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "NFKD", then the function returns the value of <code>$arg</code>
 : converted to Unicode Normalization Form KD (NFKD).</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is
 : "FULLY-NORMALIZED", then the function returns the value of
 : <code>$arg</code> converted to fully normalized form.</p>
 : </li>
 : <li>
 : <p>If the effective value of <code>$normalizationForm</code> is the
 : zero-length string, no normalization is performed and
 : <code>$arg</code> is returned.</p>
 : </li>
 : </ul>
 : <p>Normalization forms NFC, NFD, NFKC, and NFKD, and the algorithms
 : to be used for converting a string to each of these forms, are
 : defined in <span href="#Unicode-Normalization">[Unicode Normaliation
 : Forms]</span>.</p>
 : <p>The motivation for normalization form FULLY-NORMALIZED is
 : explained in <span href="#charmod-normalization">[Character Model for
 : the World Wide Web 1.0: Normalization]</span>. However, as that
 : specification did not progress beyond working draft status, the
 : normative specification is as follows:</p>
 : <ul>
 : <li>
 : <p>A string is <b>fully-normalized</b> if (a) it is in
 : normalization form NFC as defined in <span href="#Unicode-Normalization">[Unicode Normaliation Forms]</span>, and (b)
 : it does not start with a composing character.</p>
 : </li>
 : <li>
 : <p>A composing character is a character that is one or both of the
 : following:</p>
 : <ul>
 : <li>
 : <p>the second character in the canonical decomposition mapping of
 : some character that is not listed in the Composition Exclusion
 : Table defined in <span href="#Unicode-Normalization">[Unicode
 : Normaliation Forms]</span>;</p>
 : </li>
 : <li>
 : <p>of non-zero canonical combining class (as defined in <span href="#Unicode">[The Unicode Standard]</span>).</p>
 : </li>
 : </ul>
 : </li>
 : <li>
 : <p>A string is converted to FULLY-NORMALIZED form as follows:</p>
 : <ul>
 : <li>
 : <p>if the first character in the string is a composing character,
 : prepend a single space (x20);</p>
 : </li>
 : <li>
 : <p>convert the resulting string to normalization form NFC.</p>
 : </li>
 : </ul>
 : </li>
 : </ul>
 : <p>Conforming implementations <strong>must</strong> support
 : normalization form "NFC" and <strong>may</strong> support
 : normalization forms "NFD", "NFKC", "NFKD", and "FULLY-NORMALIZED".
 : They <strong>may</strong> also support other normalization forms
 : with <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> semantics.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOCH0003" title="err:FOCH0003">err:FOCH0003</span>] if the effective value of the
 : <code>$normalizationForm</code> argument is not one of the values
 : supported by the implementation.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-normalize-unicode
 :)
declare function fn:normalize-unicode( $arg as xs:string?,  $normalizationForm as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns <code>true</code> if the effective boolean value of
 : <code>$arg</code> is <code>false</code>, or <code>false</code> if
 : it is <code>true</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:not</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The value of <code>$arg</code> is first reduced to an effective
 : boolean value by applying the <span href="#func-boolean"><code>fn:boolean()</code></span> function. The
 : function returns <code>true</code> if the effective boolean value
 : is <code>false</code>, or <code>false</code> if the effective
 : boolean value is <code>true</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:not(fn:true())</code> returns
 : <code>false()</code>.</p>
 : <p>The expression <code>fn:not("false")</code> returns
 : <code>false()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-not
 :)
declare function fn:not($arg as item()*) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns <code>$arg</code> if it contains one or more items.
 : Otherwise, raises an error.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:one-or-more</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()+</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Except in error cases, the function returns <code>$arg</code>
 : unchanged.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORG0004" title="err:FORG0004">err:FORG0004</span>] if <code>$arg</code> is an empty
 : sequence.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-one-or-more
 :)
declare function fn:one-or-more($arg as item()*) as  item()+ external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function takes as input an XML document represented as a
 : string, and returns the document node at the root of an XDM tree
 : representing the parsed document.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:parse-xml</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">document-node(element(*))</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>The precise process used to construct the XDM instance is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. In particular, it is implementation-defined
 : whether DTD and/or schema validation is invoked, and it is
 : implementation-defined whether an XML 1.0 or XML 1.1 parser is
 : used.</p>
 : <p>The Dynamic Base URI property from the dynamic context of the
 : <code>fn:parse-xml</code> function call is used both as the base
 : URI used by the XML parser to resolve relative entity references
 : within the document, and as the base URI of the document node that
 : is returned.</p>
 : <p>The document URI of the returned node is <span title="" class="termref" href="#"><span class="arrow">·</span>absent<span class="arrow">·</span></span>.</p>
 : <p>The function is <em>not</em> <span title="" class="termref" href="#"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>: that is, if the function is called twice with
 : the same arguments, it is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation-dependent<span class="arrow">·</span></span> whether the same node is returned on both
 : occasions.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0006" title="err:FODC0006">err:FODC0006</span>] if the content of
 : <code>$arg</code> is not a well-formed and namespace-well-formed
 : XML document.</p>
 : <p>An error is raised [<span href="#ERRFODC0006" title="err:FODC0006">err:FODC0006</span>] if DTD-based validation is carried
 : out and the content of <code>$arg</code> is not valid against its
 : DTD.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Since the XML document is presented to the parser as a string,
 : rather than as a sequence of octets, the encoding specified within
 : the XML declaration has no meaning. If the XML parser accepts input
 : only in the form of a sequence of octets, then the processor must
 : ensure that the string is encoded as octets in a way that is
 : consistent with rules used by the XML parser to detect the
 : encoding.</p>
 : <p>The primary use case for this function is to handle input
 : documents that contain nested XML documents embedded within CDATA
 : sections. Since the content of the CDATA section are exposed as
 : text, the receiving query or stylesheet may pass this text to the
 : <code>fn:parse-xml</code> function to create a tree representation
 : of the nested document.</p>
 : <p>Similarly, nested XML within comments is sometimes encountered,
 : and lexical XML is sometimes returned by extension functions, for
 : example, functions that access web services or read from
 : databases.</p>
 : <p>A use case arises in XSLT where there is a need to preprocess an
 : input document before parsing. For example, an application might
 : wish to edit the document to remove its DOCTYPE declaration. This
 : can be done by reading the raw text using the <span href="#func-unparsed-text"><code>fn:unparsed-text</code></span> function,
 : editing the resulting string, and then passing it to the
 : <code>fn:parse-xml</code> function.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:parse-xml("&lt;alpha&gt;abcd&lt;/alpha&gt;")</code>
 : returns a newly created document node, having an <code>alpha</code>
 : element as its only child; the <code>alpha</code> element in turn
 : is the parent of a text node whose string value is
 : <code>"abcd"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-parse-xml
 :)
declare function fn:parse-xml($arg as xs:string?) as  document-node(element(*, xs:untyped)) external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function takes as input an XML document represented as a
 : string, and returns the document node at the root of an XDM tree
 : representing the parsed document.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:parse-xml</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">document-node(element(*))</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>The precise process used to construct the XDM instance is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. In particular, it is implementation-defined
 : whether DTD and/or schema validation is invoked, and it is
 : implementation-defined whether an XML 1.0 or XML 1.1 parser is
 : used.</p>
 : <p>The Dynamic Base URI property from the dynamic context of the
 : <code>fn:parse-xml</code> function call is used both as the base
 : URI used by the XML parser to resolve relative entity references
 : within the document, and as the base URI of the document node that
 : is returned.</p>
 : <p>The document URI of the returned node is <span title="" class="termref" href="#"><span class="arrow">·</span>absent<span class="arrow">·</span></span>.</p>
 : <p>The function is <em>not</em> <span title="" class="termref" href="#"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>: that is, if the function is called twice with
 : the same arguments, it is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation-dependent<span class="arrow">·</span></span> whether the same node is returned on both
 : occasions.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0006" title="err:FODC0006">err:FODC0006</span>] if the content of
 : <code>$arg</code> is not a well-formed and namespace-well-formed
 : XML document.</p>
 : <p>An error is raised [<span href="#ERRFODC0006" title="err:FODC0006">err:FODC0006</span>] if DTD-based validation is carried
 : out and the content of <code>$arg</code> is not valid against its
 : DTD.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Since the XML document is presented to the parser as a string,
 : rather than as a sequence of octets, the encoding specified within
 : the XML declaration has no meaning. If the XML parser accepts input
 : only in the form of a sequence of octets, then the processor must
 : ensure that the string is encoded as octets in a way that is
 : consistent with rules used by the XML parser to detect the
 : encoding.</p>
 : <p>The primary use case for this function is to handle input
 : documents that contain nested XML documents embedded within CDATA
 : sections. Since the content of the CDATA section are exposed as
 : text, the receiving query or stylesheet may pass this text to the
 : <code>fn:parse-xml</code> function to create a tree representation
 : of the nested document.</p>
 : <p>Similarly, nested XML within comments is sometimes encountered,
 : and lexical XML is sometimes returned by extension functions, for
 : example, functions that access web services or read from
 : databases.</p>
 : <p>A use case arises in XSLT where there is a need to preprocess an
 : input document before parsing. For example, an application might
 : wish to edit the document to remove its DOCTYPE declaration. This
 : can be done by reading the raw text using the <span href="#func-unparsed-text"><code>fn:unparsed-text</code></span> function,
 : editing the resulting string, and then passing it to the
 : <code>fn:parse-xml</code> function.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:parse-xml("&lt;alpha&gt;abcd&lt;/alpha&gt;")</code>
 : returns a newly created document node, having an <code>alpha</code>
 : element as its only child; the <code>alpha</code> element in turn
 : is the parent of a text node whose string value is
 : <code>"abcd"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-parse-xml
 :)
declare function fn:parse-xml( $arg as xs:string?,  $baseURI as xs:string) as  document-node(element(*, xs:untyped)) external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function takes as input an XML external entity represented
 : as a string, and returns the document node at the root of an XDM
 : tree representing the parsed document fragment.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:parse-xml-fragment</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">document-node()?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="nondeterministic" class="termref" href="#dt-nondeterministic"><span class="arrow">·</span>nondeterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>The input must be a namespace-well-formed external general
 : parsed entity. More specifically, it must be a string conforming to
 : the production rule <span href="http://www.w3.org/TR/REC-xml/#">[NT IN
 : xml]extParsedEnt</span><sup><small>xml</small></sup> in <span href="#REC-xml">[REC-xml]</span>, it must contain no entity references
 : other that references to predefined entities, and it must satisfy
 : all the rules of <span href="#REC-xml-names">[Namespaces in XML]</span>
 : for namespace-well-formed documents with the exception that the
 : rule requiring it to be a well-formed document is replaced by the
 : rule requiring it to be a well-formed external general parsed
 : entity.</p>
 : <p>The string is parsed to form a sequence of nodes which become
 : children of the new document node, in the same way as the content
 : of any element is converted into a sequence of children for the
 : resulting element node.</p>
 : <p>Schema validation is <em>not</em> invoked, which means that the
 : nodes in the returned document will all be untyped.</p>
 : <p>The precise process used to construct the XDM instance is
 : <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. In particular, it is implementation-defined
 : whether whether an XML 1.0 or XML 1.1 parser is used.</p>
 : <p>The Dynamic Base URI from the dynamic context of the
 : <code>fn:parse-xml-fragment</code> function call is used both as
 : the base URI used by the XML parser to resolve relative entity
 : references within the document, and as the base URI of the document
 : node that is returned.</p>
 : <p>The document URI of the returned node is <span title="" class="termref" href="#"><span class="arrow">·</span>absent<span class="arrow">·</span></span>.</p>
 : <p>The function is <em>not</em> <span title="" class="termref" href="#"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>: that is, if the function is called twice with
 : the same arguments, it is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation-dependent<span class="arrow">·</span></span> whether the same node is returned on both
 : occasions.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0006" title="err:FODC0006">err:FODC0006</span>] if the content of
 : <code>$arg</code> is not a well-formed external general parsed
 : entity, if it contains entity references other than references to
 : predefined entities, or if a document that incorporates this
 : well-formed parsed entity would not be namespace-well-formed.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>See also the notes for the <span href="#func-parse-xml"><code>fn:parse-xml</code></span> function.</p>
 : <p>The main differences between <span href="#func-parse-xml"><code>fn:parse-xml</code></span> and
 : <code>fn:parse-xml-fragment</code> are that for <span href="#func-parse-xml"><code>fn:parse-xml</code></span>, the children of
 : the resulting document node must contain exactly one element node
 : and no text nodes, wheras for <code>fn:parse-xml-fragment</code>,
 : the resulting document node can have any number (including zero) of
 : element and text nodes among its children. An additional difference
 : is that the <em>text declaration</em> at the start of an external
 : entity has slightly different syntax from the <em>XML
 : declaration</em> at the start of a well-formed document.</p>
 : <p>Note that all whitespace outside the <em>text declaration</em>
 : is significant, including whitespace that precedes the first
 : element node.</p>
 : <p>One use case for this function is to handle XML fragments stored
 : in databases, which frequently allow zero-or-more top level element
 : nodes. Another use case is to parse the contents of a
 : <code>CDATA</code> section embedded within another XML
 : document.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:parse-xml-fragment("&lt;alpha&gt;abcd&lt;/alpha&gt;&lt;beta&gt;abcd&lt;/beta&gt;")</code>
 : returns a newly created document node, having two elements named
 : <code>alpha</code> and <code>beta</code> as its children; each of
 : these elements in turn is the parent of a text node.</p>
 : <p>The expression <code>fn:parse-xml-fragment("He was
 : &lt;i&gt;so&lt;/i&gt; kind")</code> returns a newly created
 : document node having three children: a text node whose string value
 : is <code>"He was "</code>, an element node named <code>i</code>
 : having a child text node with string value <code>"so"</code>, and a
 : text node whose string value is <code>" kind"</code>.</p>
 : <p>The expression <code>fn:parse-xml-fragment("")</code> returns a
 : document node having no children.</p>
 : <p>The expression <code>fn:parse-xml-fragment(" ")</code> returns a
 : document node whose children comprise a single text node whose
 : string value is a single space.</p>
 : <p>The expression <code>fn:parse-xml-fragment('&lt;xml
 : version="1.0" encoding="utf8"
 : standalone="yes"?&gt;&lt;/a&gt;")</code> results in an error
 : [<span href="#ERRFODC0006" title="err:FODC0006">err:FODC0006</span>]
 : because the "standalone" keyword is not permitted in the text
 : declaration that appears at the start of an external general parsed
 : entity. (Thus, it is not the case that any input accepted by the
 : <span href="#func-parse-xml"><code>fn:parse-xml</code></span> function
 : will also be accepted by <code>fn:parse-xml-fragment</code>.)</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-parse-xml-fragment
 :)
declare function fn:parse-xml-fragment( $arg as xs:string?) as  document-node(element(*, xs:untyped)) external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the prefix component of the supplied QName.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:prefix-from-QName</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:QName?</code>)<code class="as"> as </code><code class="return-type">xs:NCName?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence the function returns
 : the empty sequence.</p>
 : <p>If <code>$arg</code> has no prefix component the function
 : returns the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:NCName</code>
 : representing the prefix component of <code>$arg</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-prefix-from-QName
 :)
declare function fn:prefix-from-QName($arg as xs:QName?) as  xs:NCName? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a new sequence containing all the items of
 : <code>$target</code> except the item at position
 : <code>$position</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:remove</code>(<code class="arg">$target</code><code class="as"> as </code><code class="type">item()*</code>, <code class="arg">$position</code><code class="as"> as </code><code class="type">xs:integer</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence consisting of all items of
 : <code>$target</code> whose index is less than
 : <code>$position</code>, followed by all items of
 : <code>$target</code> whose index is greater than
 : <code>$position</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$position</code> is less than 1 or greater than the
 : number of items in <code>$target</code>, <code>$target</code> is
 : returned.</p>
 : <p>If <code>$target</code> is the empty sequence, the empty
 : sequence is returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$abc</code> := <code>("a", "b", "c")</code></p>
 : <p>The expression <code>fn:remove($abc, 0)</code> returns
 : <code>("a", "b", "c")</code>.</p>
 : <p>The expression <code>fn:remove($abc, 1)</code> returns
 : <code>("b", "c")</code>.</p>
 : <p>The expression <code>fn:remove($abc, 6)</code> returns
 : <code>("a", "b", "c")</code>.</p>
 : <p>The expression <code>fn:remove((), 3)</code> returns
 : <code>()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-remove
 :)
declare function fn:remove($target as item()*,  $position as xs:integer) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string produced from the input string by replacing any
 : substrings that match a given regular expression with a supplied
 : replacement string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:replace</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$replacement</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="4"><code class="function">fn:replace</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$replacement</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$flags</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the first version of this function
 : (omitting the argument <code>$flags</code>) is the same as the
 : effect of calling the second version with the <code>$flags</code>
 : argument set to a zero-length string. Flags are defined in <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : <p>The <code>$flags</code> argument is interpreted in the same
 : manner as for the <span href="#func-matches"><code>fn:matches</code></span> function.</p>
 : <p>If <code>$input</code> is the empty sequence, it is interpreted
 : as the zero-length string.</p>
 : <p>The function returns the <code>xs:string</code> that is obtained
 : by replacing each non-overlapping substring of <code>$input</code>
 : that matches the given <code>$pattern</code> with an occurrence of
 : the <code>$replacement</code> string.</p>
 : <p>If two overlapping substrings of <code>$input</code> both match
 : the <code>$pattern</code>, then only the first one (that is, the
 : one whose first <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> comes first in the <code>$input</code> string)
 : is replaced.</p>
 : <p>If the <code>q</code> flag is present, the replacement string is
 : used <em>as is</em>.</p>
 : <p><span>Otherwise,</span> within the <code>$replacement</code>
 : string, a variable <code>$N</code> may be used to refer to the
 : substring captured by the Nth parenthesized sub-expression in the
 : regular expression. For each match of the pattern, these variables
 : are assigned the value of the content matched by the relevant
 : sub-expression, and the modified replacement string is then
 : substituted for the <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> in <code>$input</code> that matched the
 : pattern. <code>$0</code> refers to the substring captured by the
 : regular expression as a whole.</p>
 : <p>More specifically, the rules are as follows, where
 : <code>S</code> is the number of parenthesized sub-expressions in
 : the regular expression, and <code>N</code> is the decimal number
 : formed by taking all the digits that consecutively follow the
 : <code>$</code> character:</p>
 : <ol class="enumar">
 : <li>
 : <p>If <code>N</code>=<code>0</code>, then the variable is replaced
 : by the substring matched by the regular expression as a whole.</p>
 : </li>
 : <li>
 : <p>If <code>1</code>&lt;=<code>N</code>&lt;=<code>S</code>, then
 : the variable is replaced by the substring captured by the Nth
 : parenthesized sub-expression. If the <code>Nth</code> parenthesized
 : sub-expression was not matched, then the variable is replaced by
 : the zero-length string.</p>
 : </li>
 : <li>
 : <p>If <code>S</code>&lt;<code>N</code>&lt;=<code>9</code>, then the
 : variable is replaced by the zero-length string.</p>
 : </li>
 : <li>
 : <p>Otherwise (if <code>N</code>&gt;<code>S</code> and
 : <code>N</code>&gt;<code>9</code>), the last digit of <code>N</code>
 : is taken to be a literal character to be included "as is" in the
 : replacement string, and the rules are reapplied using the number
 : <code>N</code> formed by stripping off this last digit.</p>
 : </li>
 : </ol>
 : <p>For example, if the replacement string is " <code>$23</code> "
 : and there are 5 substrings, the result contains the value of the
 : substring that matches the second sub-expression, followed by the
 : digit " <code>3</code> ".</p>
 : <p>Unless the <code>q</code> flag is used, a literal <code>$</code>
 : character within the replacement string must be written as
 : <code>\$</code>, and a literal <code>\</code> character must be
 : written as <code>\\</code>.</p>
 : <p>If two alternatives within the pattern both match at the same
 : position in the <code>$input</code>, then the match that is chosen
 : is the one matched by the first alternative. For example:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:replace("abcd", "(ab)|(a)", "[1=$1][2=$2]") returns "[1=ab][2=]cd"
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORX0002" title="err:FORX0002">err:FORX0002</span>] if the value of
 : <code>$pattern</code> is invalid according to the rules described
 : in section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0001" title="err:FORX0001">err:FORX0001</span>] if the value of
 : <code>$flags</code> is invalid according to the rules described in
 : section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0003" title="err:FORX0003">err:FORX0003</span>] if the pattern matches a
 : zero-length string, that is, if the expression <span href="#func-matches"><code>fn:matches("", $pattern, $flags)</code></span>
 : returns <code>true</code>. It is not an error, however, if a
 : captured substring is zero-length.</p>
 : <p>An error is raised [<span href="#ERRFORX0004" title="err:FORX0004">err:FORX0004</span>] if the value of
 : <code>$replacement</code> contains a "<code>$</code>" character
 : that is not immediately followed by a digit <code>0-9</code> and
 : not immediately preceded by a "\".</p>
 : <p>An error is raised [<span href="#ERRFORX0004" title="err:FORX0004">err:FORX0004</span>] if the value of
 : <code>$replacement</code> contains a "<code>\</code>" character
 : that is not part of a "<code>\\</code>" pair, unless it is
 : immediately followed by a "<code>$</code>" character.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If the input string contains no substring that matches the
 : regular expression, the result of the function is a single string
 : identical to the input string.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>replace("abracadabra", "bra", "*")</code>
 : returns <code>"a*cada*"</code>.</p>
 : <p>The expression <code>replace("abracadabra", "a.*a", "*")</code>
 : returns <code>"*"</code>.</p>
 : <p>The expression <code>replace("abracadabra", "a.*?a", "*")</code>
 : returns <code>"*c*bra"</code>.</p>
 : <p>The expression <code>replace("abracadabra", "a", "")</code>
 : returns <code>"brcdbr"</code>.</p>
 : <p>The expression <code>replace("abracadabra", "a(.)",
 : "a$1$1")</code> returns <code>"abbraccaddabbra"</code>.</p>
 : <p>The expression <code>replace("abracadabra", ".*?", "$1")</code>
 : raises an error, because the pattern matches the zero-length
 : string</p>
 : <p>The expression <code>replace("AAAA", "A+", "b")</code> returns
 : <code>"b"</code>.</p>
 : <p>The expression <code>replace("AAAA", "A+?", "b")</code> returns
 : <code>"bbbb"</code>.</p>
 : <p>The expression <code>replace("darted", "^(.*?)d(.*)$",
 : "$1c$2")</code> returns <code>"carted"</code>. <em>(The first
 : <code>d</code> is replaced.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-replace
 :)
declare function fn:replace( $input as xs:string?,  $pattern as xs:string,  $replacement as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string produced from the input string by replacing any
 : substrings that match a given regular expression with a supplied
 : replacement string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:replace</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$replacement</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="4"><code class="function">fn:replace</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$replacement</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$flags</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the first version of this function
 : (omitting the argument <code>$flags</code>) is the same as the
 : effect of calling the second version with the <code>$flags</code>
 : argument set to a zero-length string. Flags are defined in <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : <p>The <code>$flags</code> argument is interpreted in the same
 : manner as for the <span href="#func-matches"><code>fn:matches</code></span> function.</p>
 : <p>If <code>$input</code> is the empty sequence, it is interpreted
 : as the zero-length string.</p>
 : <p>The function returns the <code>xs:string</code> that is obtained
 : by replacing each non-overlapping substring of <code>$input</code>
 : that matches the given <code>$pattern</code> with an occurrence of
 : the <code>$replacement</code> string.</p>
 : <p>If two overlapping substrings of <code>$input</code> both match
 : the <code>$pattern</code>, then only the first one (that is, the
 : one whose first <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> comes first in the <code>$input</code> string)
 : is replaced.</p>
 : <p>If the <code>q</code> flag is present, the replacement string is
 : used <em>as is</em>.</p>
 : <p><span>Otherwise,</span> within the <code>$replacement</code>
 : string, a variable <code>$N</code> may be used to refer to the
 : substring captured by the Nth parenthesized sub-expression in the
 : regular expression. For each match of the pattern, these variables
 : are assigned the value of the content matched by the relevant
 : sub-expression, and the modified replacement string is then
 : substituted for the <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> in <code>$input</code> that matched the
 : pattern. <code>$0</code> refers to the substring captured by the
 : regular expression as a whole.</p>
 : <p>More specifically, the rules are as follows, where
 : <code>S</code> is the number of parenthesized sub-expressions in
 : the regular expression, and <code>N</code> is the decimal number
 : formed by taking all the digits that consecutively follow the
 : <code>$</code> character:</p>
 : <ol class="enumar">
 : <li>
 : <p>If <code>N</code>=<code>0</code>, then the variable is replaced
 : by the substring matched by the regular expression as a whole.</p>
 : </li>
 : <li>
 : <p>If <code>1</code>&lt;=<code>N</code>&lt;=<code>S</code>, then
 : the variable is replaced by the substring captured by the Nth
 : parenthesized sub-expression. If the <code>Nth</code> parenthesized
 : sub-expression was not matched, then the variable is replaced by
 : the zero-length string.</p>
 : </li>
 : <li>
 : <p>If <code>S</code>&lt;<code>N</code>&lt;=<code>9</code>, then the
 : variable is replaced by the zero-length string.</p>
 : </li>
 : <li>
 : <p>Otherwise (if <code>N</code>&gt;<code>S</code> and
 : <code>N</code>&gt;<code>9</code>), the last digit of <code>N</code>
 : is taken to be a literal character to be included "as is" in the
 : replacement string, and the rules are reapplied using the number
 : <code>N</code> formed by stripping off this last digit.</p>
 : </li>
 : </ol>
 : <p>For example, if the replacement string is " <code>$23</code> "
 : and there are 5 substrings, the result contains the value of the
 : substring that matches the second sub-expression, followed by the
 : digit " <code>3</code> ".</p>
 : <p>Unless the <code>q</code> flag is used, a literal <code>$</code>
 : character within the replacement string must be written as
 : <code>\$</code>, and a literal <code>\</code> character must be
 : written as <code>\\</code>.</p>
 : <p>If two alternatives within the pattern both match at the same
 : position in the <code>$input</code>, then the match that is chosen
 : is the one matched by the first alternative. For example:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:replace("abcd", "(ab)|(a)", "[1=$1][2=$2]") returns "[1=ab][2=]cd"
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORX0002" title="err:FORX0002">err:FORX0002</span>] if the value of
 : <code>$pattern</code> is invalid according to the rules described
 : in section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0001" title="err:FORX0001">err:FORX0001</span>] if the value of
 : <code>$flags</code> is invalid according to the rules described in
 : section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0003" title="err:FORX0003">err:FORX0003</span>] if the pattern matches a
 : zero-length string, that is, if the expression <span href="#func-matches"><code>fn:matches("", $pattern, $flags)</code></span>
 : returns <code>true</code>. It is not an error, however, if a
 : captured substring is zero-length.</p>
 : <p>An error is raised [<span href="#ERRFORX0004" title="err:FORX0004">err:FORX0004</span>] if the value of
 : <code>$replacement</code> contains a "<code>$</code>" character
 : that is not immediately followed by a digit <code>0-9</code> and
 : not immediately preceded by a "\".</p>
 : <p>An error is raised [<span href="#ERRFORX0004" title="err:FORX0004">err:FORX0004</span>] if the value of
 : <code>$replacement</code> contains a "<code>\</code>" character
 : that is not part of a "<code>\\</code>" pair, unless it is
 : immediately followed by a "<code>$</code>" character.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If the input string contains no substring that matches the
 : regular expression, the result of the function is a single string
 : identical to the input string.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>replace("abracadabra", "bra", "*")</code>
 : returns <code>"a*cada*"</code>.</p>
 : <p>The expression <code>replace("abracadabra", "a.*a", "*")</code>
 : returns <code>"*"</code>.</p>
 : <p>The expression <code>replace("abracadabra", "a.*?a", "*")</code>
 : returns <code>"*c*bra"</code>.</p>
 : <p>The expression <code>replace("abracadabra", "a", "")</code>
 : returns <code>"brcdbr"</code>.</p>
 : <p>The expression <code>replace("abracadabra", "a(.)",
 : "a$1$1")</code> returns <code>"abbraccaddabbra"</code>.</p>
 : <p>The expression <code>replace("abracadabra", ".*?", "$1")</code>
 : raises an error, because the pattern matches the zero-length
 : string</p>
 : <p>The expression <code>replace("AAAA", "A+", "b")</code> returns
 : <code>"b"</code>.</p>
 : <p>The expression <code>replace("AAAA", "A+?", "b")</code> returns
 : <code>"bbbb"</code>.</p>
 : <p>The expression <code>replace("darted", "^(.*?)d(.*)$",
 : "$1c$2")</code> returns <code>"carted"</code>. <em>(The first
 : <code>d</code> is replaced.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-replace
 :)
declare function fn:replace( $input as xs:string?,  $pattern as xs:string,  $replacement as xs:string,  $flags as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns an <code>xs:QName</code> value (that is, an
 : expanded-QName) by taking an <code>xs:string</code> that has the
 : lexical form of an <code>xs:QName</code> (a string in the form
 : "prefix:local-name" or "local-name") and resolving it using the
 : in-scope namespaces for a given element.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:resolve-QName</code>(<code class="arg">$qname</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$element</code><code class="as"> as </code><code class="type">element()</code>)<code class="as"> as </code><code class="return-type">xs:QName?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$qname</code> is the empty sequence, returns the empty
 : sequence.</p>
 : <p>More specifically, the function searches the namespace bindings
 : of <code>$element</code> for a binding whose name matches the
 : prefix of <code>$qname</code>, or the zero-length string if it has
 : no prefix, and constructs an expanded-QName whose local name is
 : taken from the supplied <code>$qname</code>, and whose namespace
 : URI is taken from the string value of the namespace binding.</p>
 : <p>If the <code>$qname</code> has no prefix, and there is no
 : namespace binding for <code>$element</code> corresponding to the
 : default (unnamed) namespace, then the resulting expanded-QName has
 : no namespace part.</p>
 : <p>The prefix (or absence of a prefix) in the supplied
 : <code>$qname</code> argument is retained in the returned
 : expanded-QName, as discussed in <span href="http://www.w3.org/TR/xpath-datamodel-30/#terminology">Section 2.1
 : Terminology</span> <sup><small>DM30</small></sup>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOCA0002" title="err:FOCA0002">err:FOCA0002</span>] if <code>$qname</code> does not
 : have the correct lexical form for an instance of
 : <code>xs:QName</code>.</p>
 : <p>An error is raised [<span href="#ERRFONS0004" title="err:FONS0004">err:FONS0004</span>] if <code>$qname</code> has a
 : prefix and there is no namespace binding for <code>$element</code>
 : that matches this prefix.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Sometimes the requirement is to construct an
 : <code>xs:QName</code> without using the default namespace. This can
 : be achieved by writing:</p>
 : <div class="exampleInner">
 : <pre>
 :  if (contains($qname, ":")) then fn:resolve-QName($qname, $element) else
 :             fn:QName("", $qname)
 : </pre></div>
 : <p>If the requirement is to construct an <code>xs:QName</code>
 : using the namespaces in the static context, then the
 : <code>xs:QName</code> constructor should be used.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Assume that the element bound to <code>$element</code> has a
 : single namespace binding bound to the prefix <code>eg</code>.</p>
 : <p><code>fn:resolve-QName("hello", $element)</code> returns a QName
 : with local name "hello" that is in no namespace.</p>
 : <p><code>fn:resolve-QName("eg:myFunc", $element)</code> returns an
 : <code>xs:QName</code> whose namespace URI is specified by the
 : namespace binding corresponding to the prefix "eg" and whose local
 : name is "myFunc".</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-resolve-QName
 :)
declare function fn:resolve-QName($qname as xs:string?,  $element as element()) as  xs:QName? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Reverses the order of items in a sequence.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:reverse</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence containing the items in
 : <code>$arg</code> in reverse order.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the empty sequence
 : is returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$abc</code> := <code>("a", "b", "c")</code></p>
 : <p>The expression <code>fn:reverse($abc)</code> returns <code>("c",
 : "b", "a")</code>.</p>
 : <p>The expression <code>fn:reverse(("hello"))</code> returns
 : <code>("hello")</code>.</p>
 : <p>The expression <code>fn:reverse(())</code> returns
 : <code>()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-reverse
 :)
declare function fn:reverse($arg as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Rounds a value to a specified number of decimal places, rounding
 : upwards if two such values are equally near.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:round</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:round</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>, <code class="arg">$precision</code><code class="as"> as </code><code class="type">xs:integer</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>General rules: see <span href="#numeric-value-functions"><b>4.4
 : Functions on numeric values</b></span>.</p>
 : <p>The function returns the nearest (that is, numerically closest)
 : value to <code>$arg</code> that is a multiple of ten to the power
 : of minus <code>$precision</code>. If two such values are equally
 : near (for example, if the fractional part in <code>$arg</code> is
 : exactly .5), the function returns the one that is closest to
 : positive infinity.</p>
 : <p>If the type of <code>$arg</code> is one of the four numeric
 : types <code>xs:float</code>, <code>xs:double</code>,
 : <code>xs:decimal</code> or <code>xs:integer</code> the type of the
 : result is the same as the type of <code>$arg</code>. If the type of
 : <code>$arg</code> is a type derived from one of the numeric types,
 : the result is an instance of the base numeric type.</p>
 : <p>The single-argument version of this function produces the same
 : result as the two-argument version with <code>$precision=0</code>
 : (that is, it rounds to a whole number).</p>
 : <p>When <code>$arg</code> is of type <code>xs:float</code> and
 : <code>xs:double</code>:</p>
 : <ol class="enumar">
 : <li>
 : <p>If <code>$arg</code> is NaN, positive or negative zero, or
 : positive or negative infinity, then the result is the same as the
 : argument.</p>
 : </li>
 : <li>
 : <p>For other values, the argument is cast to
 : <code>xs:decimal</code> using an implementation of
 : <code>xs:decimal</code> that imposes no limits on the number of
 : digits that can be represented. The function is applied to this
 : <code>xs:decimal</code> value, and the resulting
 : <code>xs:decimal</code> is cast back to <code>xs:float</code> or
 : <code>xs:double</code> as appropriate to form the function result.
 : If the resulting <code>xs:decimal</code> value is zero, then
 : positive or negative zero is returned according to the sign of
 : <code>$arg</code>.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function is typically used with a non-zero
 : <code>$precision</code> in financial applications where the
 : argument is of type <code>xs:decimal</code>. For arguments of type
 : <code>xs:float</code> and <code>xs:double</code> the results may be
 : counter-intuitive. For example, consider <code>round(35.425e0,
 : 2)</code>. The result is not 35.43, as might be expected, but
 : 35.42. This is because the <code>xs:double</code> written as
 : 35.425e0 has an exact value equal to 35.42499999999..., which is
 : closer to 35.42 than to 35.43.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:round(2.5)</code> returns
 : <code>3.0</code>.</p>
 : <p>The expression <code>fn:round(2.4999)</code> returns
 : <code>2.0</code>.</p>
 : <p>The expression <code>fn:round(-2.5)</code> returns
 : <code>-2.0</code>. <em>(Not the possible alternative,
 : <code>-3</code>).</em></p>
 : <p>The expression <code>fn:round(1.125, 2)</code> returns
 : <code>1.13</code>.</p>
 : <p>The expression <code>fn:round(8452, -2)</code> returns
 : <code>8500</code>.</p>
 : <p>The expression <code>fn:round(3.1415e0, 2)</code> returns
 : <code>3.14e0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-round
 :)
declare function fn:round($arg as numeric?) as  numeric? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Rounds a value to a specified number of decimal places, rounding
 : upwards if two such values are equally near.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:round</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:round</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>, <code class="arg">$precision</code><code class="as"> as </code><code class="type">xs:integer</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>General rules: see <span href="#numeric-value-functions"><b>4.4
 : Functions on numeric values</b></span>.</p>
 : <p>The function returns the nearest (that is, numerically closest)
 : value to <code>$arg</code> that is a multiple of ten to the power
 : of minus <code>$precision</code>. If two such values are equally
 : near (for example, if the fractional part in <code>$arg</code> is
 : exactly .5), the function returns the one that is closest to
 : positive infinity.</p>
 : <p>If the type of <code>$arg</code> is one of the four numeric
 : types <code>xs:float</code>, <code>xs:double</code>,
 : <code>xs:decimal</code> or <code>xs:integer</code> the type of the
 : result is the same as the type of <code>$arg</code>. If the type of
 : <code>$arg</code> is a type derived from one of the numeric types,
 : the result is an instance of the base numeric type.</p>
 : <p>The single-argument version of this function produces the same
 : result as the two-argument version with <code>$precision=0</code>
 : (that is, it rounds to a whole number).</p>
 : <p>When <code>$arg</code> is of type <code>xs:float</code> and
 : <code>xs:double</code>:</p>
 : <ol class="enumar">
 : <li>
 : <p>If <code>$arg</code> is NaN, positive or negative zero, or
 : positive or negative infinity, then the result is the same as the
 : argument.</p>
 : </li>
 : <li>
 : <p>For other values, the argument is cast to
 : <code>xs:decimal</code> using an implementation of
 : <code>xs:decimal</code> that imposes no limits on the number of
 : digits that can be represented. The function is applied to this
 : <code>xs:decimal</code> value, and the resulting
 : <code>xs:decimal</code> is cast back to <code>xs:float</code> or
 : <code>xs:double</code> as appropriate to form the function result.
 : If the resulting <code>xs:decimal</code> value is zero, then
 : positive or negative zero is returned according to the sign of
 : <code>$arg</code>.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function is typically used with a non-zero
 : <code>$precision</code> in financial applications where the
 : argument is of type <code>xs:decimal</code>. For arguments of type
 : <code>xs:float</code> and <code>xs:double</code> the results may be
 : counter-intuitive. For example, consider <code>round(35.425e0,
 : 2)</code>. The result is not 35.43, as might be expected, but
 : 35.42. This is because the <code>xs:double</code> written as
 : 35.425e0 has an exact value equal to 35.42499999999..., which is
 : closer to 35.42 than to 35.43.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:round(2.5)</code> returns
 : <code>3.0</code>.</p>
 : <p>The expression <code>fn:round(2.4999)</code> returns
 : <code>2.0</code>.</p>
 : <p>The expression <code>fn:round(-2.5)</code> returns
 : <code>-2.0</code>. <em>(Not the possible alternative,
 : <code>-3</code>).</em></p>
 : <p>The expression <code>fn:round(1.125, 2)</code> returns
 : <code>1.13</code>.</p>
 : <p>The expression <code>fn:round(8452, -2)</code> returns
 : <code>8500</code>.</p>
 : <p>The expression <code>fn:round(3.1415e0, 2)</code> returns
 : <code>3.14e0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-round
 :)
declare function fn:round($arg as numeric?,  $precision as xs:integer) as  numeric? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Rounds a value to a specified number of decimal places, rounding
 : to make the last digit even if two such values are equally
 : near.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:round-half-to-even</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:round-half-to-even</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>, <code class="arg">$precision</code><code class="as"> as </code><code class="type">xs:integer</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>General rules: see <span href="#numeric-value-functions"><b>4.4
 : Functions on numeric values</b></span>.</p>
 : <p>The function returns the nearest (that is, numerically closest)
 : value to <code>$arg</code> that is a multiple of ten to the power
 : of minus <code>$precision</code>. If two such values are equally
 : near (e.g. if the fractional part in <code>$arg</code> is exactly
 : .500...), the function returns the one whose least significant
 : digit is even.</p>
 : <p>If the type of <code>$arg</code> is one of the four numeric
 : types <code>xs:float</code>, <code>xs:double</code>,
 : <code>xs:decimal</code> or <code>xs:integer</code> the type of the
 : result is the same as the type of <code>$arg</code>. If the type of
 : <code>$arg</code> is a type derived from one of the numeric types,
 : the result is an instance of the base numeric type.</p>
 : <p>The first signature of this function produces the same result as
 : the second signature with <code>$precision=0</code>.</p>
 : <p>For arguments of type <code>xs:float</code> and
 : <code>xs:double</code>:</p>
 : <ol class="enumar">
 : <li>
 : <p>If the argument is <code>NaN</code>, positive or negative zero,
 : or positive or negative infinity, then the result is the same as
 : the argument.</p>
 : </li>
 : <li>
 : <p>In all other cases, the argument is cast to
 : <code>xs:decimal</code> <span>using an implementation of xs:decimal
 : that imposes no limits on the number of digits that can be
 : represented.</span> The function is applied to this
 : <code>xs:decimal</code> value, and the resulting
 : <code>xs:decimal</code> is cast back to <code>xs:float</code> or
 : <code>xs:double</code> as appropriate to form the function result.
 : If the resulting <code>xs:decimal</code> value is zero, then
 : positive or negative zero is returned according to the sign of the
 : original argument.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function is typically used in financial applications where
 : the argument is of type <code>xs:decimal</code>. For arguments of
 : type <code>xs:float</code> and <code>xs:double</code> the results
 : may be counter-intuitive. For example, consider
 : <code>round-half-to-even(xs:float(150.015), 2)</code>. The result
 : is not 150.02 as might be expected, but 150.01. This is because the
 : conversion of the <code>xs:float</code> value represented by the
 : literal 150.015 to an <code>xs:decimal</code> produces the
 : <code>xs:decimal</code> value 150.014999389..., which is closer to
 : 150.01 than to 150.02.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:round-half-to-even(0.5)</code> returns
 : <code>0.0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(1.5)</code> returns
 : <code>2.0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(2.5)</code> returns
 : <code>2.0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(3.567812e+3,
 : 2)</code> returns <code>3567.81e0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(4.7564e-3, 2)</code>
 : returns <code>0.0e0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(35612.25, -2)</code>
 : returns <code>35600</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-round-half-to-even
 :)
declare function fn:round-half-to-even($arg as numeric?) as  numeric? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Rounds a value to a specified number of decimal places, rounding
 : to make the last digit even if two such values are equally
 : near.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:round-half-to-even</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:round-half-to-even</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">numeric?</code>, <code class="arg">$precision</code><code class="as"> as </code><code class="type">xs:integer</code>)<code class="as"> as </code><code class="return-type">numeric?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>General rules: see <span href="#numeric-value-functions"><b>4.4
 : Functions on numeric values</b></span>.</p>
 : <p>The function returns the nearest (that is, numerically closest)
 : value to <code>$arg</code> that is a multiple of ten to the power
 : of minus <code>$precision</code>. If two such values are equally
 : near (e.g. if the fractional part in <code>$arg</code> is exactly
 : .500...), the function returns the one whose least significant
 : digit is even.</p>
 : <p>If the type of <code>$arg</code> is one of the four numeric
 : types <code>xs:float</code>, <code>xs:double</code>,
 : <code>xs:decimal</code> or <code>xs:integer</code> the type of the
 : result is the same as the type of <code>$arg</code>. If the type of
 : <code>$arg</code> is a type derived from one of the numeric types,
 : the result is an instance of the base numeric type.</p>
 : <p>The first signature of this function produces the same result as
 : the second signature with <code>$precision=0</code>.</p>
 : <p>For arguments of type <code>xs:float</code> and
 : <code>xs:double</code>:</p>
 : <ol class="enumar">
 : <li>
 : <p>If the argument is <code>NaN</code>, positive or negative zero,
 : or positive or negative infinity, then the result is the same as
 : the argument.</p>
 : </li>
 : <li>
 : <p>In all other cases, the argument is cast to
 : <code>xs:decimal</code> <span>using an implementation of xs:decimal
 : that imposes no limits on the number of digits that can be
 : represented.</span> The function is applied to this
 : <code>xs:decimal</code> value, and the resulting
 : <code>xs:decimal</code> is cast back to <code>xs:float</code> or
 : <code>xs:double</code> as appropriate to form the function result.
 : If the resulting <code>xs:decimal</code> value is zero, then
 : positive or negative zero is returned according to the sign of the
 : original argument.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This function is typically used in financial applications where
 : the argument is of type <code>xs:decimal</code>. For arguments of
 : type <code>xs:float</code> and <code>xs:double</code> the results
 : may be counter-intuitive. For example, consider
 : <code>round-half-to-even(xs:float(150.015), 2)</code>. The result
 : is not 150.02 as might be expected, but 150.01. This is because the
 : conversion of the <code>xs:float</code> value represented by the
 : literal 150.015 to an <code>xs:decimal</code> produces the
 : <code>xs:decimal</code> value 150.014999389..., which is closer to
 : 150.01 than to 150.02.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:round-half-to-even(0.5)</code> returns
 : <code>0.0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(1.5)</code> returns
 : <code>2.0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(2.5)</code> returns
 : <code>2.0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(3.567812e+3,
 : 2)</code> returns <code>3567.81e0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(4.7564e-3, 2)</code>
 : returns <code>0.0e0</code>.</p>
 : <p>The expression <code>fn:round-half-to-even(35612.25, -2)</code>
 : returns <code>35600</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-round-half-to-even
 :)
declare function fn:round-half-to-even($arg as numeric?,  $precision as xs:integer) as  numeric? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the seconds component of an
 : <code>xs:dateTime</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:seconds-from-dateTime</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:dateTime?</code>)<code class="as"> as </code><code class="return-type">xs:decimal?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:decimal</code> value
 : greater than or equal to zero and less than 60, representing the
 : seconds and fractional seconds in the local value of
 : <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:seconds-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00"))</code>
 : returns <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-seconds-from-dateTime
 :)
declare function fn:seconds-from-dateTime($arg as xs:dateTime?) as  xs:decimal? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of seconds in a duration.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:seconds-from-duration</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:duration?</code>)<code class="as"> as </code><code class="return-type">xs:decimal?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:decimal</code>
 : representing the seconds component in the value of
 : <code>$arg</code>. The result is obtained by casting
 : <code>$arg</code> to an <code>xs:dayTimeDuration</code> (see
 : <span href="#casting-to-durations"><b>18.1.3 Casting to duration
 : types</b></span>) and then computing the seconds component as
 : described in <span href="#canonical-dayTimeDuration"><b>8.1.2.3
 : Canonical representation</b></span>.</p>
 : <p>If <code>$arg</code> is a negative duration then the result will
 : be negative..</p>
 : <p>If <code>$arg</code> is an <code>xs:yearMonthDuration</code> the
 : function returns 0.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:seconds-from-duration(xs:dayTimeDuration("P3DT10H12.5S"))</code>
 : returns <code>12.5</code>.</p>
 : <p>The expression
 : <code>fn:seconds-from-duration(xs:dayTimeDuration("-PT256S"))</code>
 : returns <code>-16.0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-seconds-from-duration
 :)
declare function fn:seconds-from-duration($arg as xs:duration?) as  xs:decimal? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the seconds component of an <code>xs:time</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:seconds-from-time</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:time?</code>)<code class="as"> as </code><code class="return-type">xs:decimal?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:decimal</code> value
 : greater than or equal to zero and less than 60, representing the
 : seconds and fractional seconds in the local value of
 : <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:seconds-from-time(xs:time("13:20:10.5"))</code> returns
 : <code>10.5</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-seconds-from-time
 :)
declare function fn:seconds-from-time($arg as xs:time?) as  xs:decimal? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function serializes the supplied <span>input
 : sequence</span> <code>$arg</code> as described in <span href="#xslt-xquery-serialization-30">[XSLT and XQuery Serialization
 : 3.0]</span>, returning the serialized <span>representation of the
 : sequence</span> as a string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:serialize</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:serialize</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$params</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">element(output:serialization-parameters)?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The value of <code>$arg</code> acts as the input sequence to the
 : serialization process, which starts with sequence
 : normalization.</p>
 : <p>The single-argument version of this function has the same effect
 : as the two-argument version called with <code>$params</code> set to
 : an empty sequence. This in turn is the same as the effect of
 : passing an <code>output:serialization-parameters</code> element
 : with no child elements.</p>
 : <p>The <code>$params</code> argument is used to identify a set of
 : serialization parameters. These are supplied in the form of an
 : <code>output:serialization-parameters</code> element, having the
 : format described in <span href="http://www.w3.org/TR/xslt-xquery-serialization-30/#serparams-in-xdm-instance">
 : Section 3.1 Setting Serialization Parameters by Means of a Data
 : Model Instance</span> <sup><small>SER30</small></sup>.</p>
 : <p>The final stage of serialization, that is, encoding, is skipped.
 : If the serializer does not allow this phase to be skipped, then the
 : sequence of octets returned by the serializer is decoded into a
 : string by reversing the character encoding performed in the final
 : stage.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The serialization process will raise an error if
 : <code>$arg</code> is an attribute or namespace node.</p>
 : <p>If any serialization error occurs, including the detection of an
 : invalid value for a serialization parameter, this results in the
 : <code>fn:serialize</code> call failing with a dynamic error.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>One use case for this function arises when there is a need to
 : construct an XML document containing nested XML documents within a
 : CDATA section (or on occasions within a comment). See <span href="#func-parse-xml"><code>fn:parse-xml</code></span> for further
 : details.</p>
 : <p>Another use case arises when there is a need to call an
 : extension function that expects a lexical XML document as
 : input.</p>
 : <p>There are also use cases where the application wants to
 : post-process the output of a query or transformation, for example
 : by adding an internal DTD subset, or by inserting proprietary
 : markup delimiters such as the <code>&lt;% ... %&gt;</code> used by
 : some templating languages.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Given the output parameters:</p>
 : <p>let <code>$params</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;output:serialization-parameters&gt;
 :   &lt;output:omit-xml-declaration&gt;yes&lt;/output:omit-xml-declaration&gt;
 : &lt;/output:serialization-parameters&gt;
 :          
 : </pre></div>
 : <p>let <code>$data</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;a b='3'/&gt;
 :          
 : </pre></div>
 : <p>The following call might produce the output shown:</p>
 : <p>The expression <code>fn:serialize($data, $params)</code> returns
 : <code>'&lt;a b="3"/&gt;'</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-serialize
 :)
declare function fn:serialize($arg as item()*) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function serializes the supplied <span>input
 : sequence</span> <code>$arg</code> as described in <span href="#xslt-xquery-serialization-30">[XSLT and XQuery Serialization
 : 3.0]</span>, returning the serialized <span>representation of the
 : sequence</span> as a string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:serialize</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:serialize</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$params</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">element(output:serialization-parameters)?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The value of <code>$arg</code> acts as the input sequence to the
 : serialization process, which starts with sequence
 : normalization.</p>
 : <p>The single-argument version of this function has the same effect
 : as the two-argument version called with <code>$params</code> set to
 : an empty sequence. This in turn is the same as the effect of
 : passing an <code>output:serialization-parameters</code> element
 : with no child elements.</p>
 : <p>The <code>$params</code> argument is used to identify a set of
 : serialization parameters. These are supplied in the form of an
 : <code>output:serialization-parameters</code> element, having the
 : format described in <span href="http://www.w3.org/TR/xslt-xquery-serialization-30/#serparams-in-xdm-instance">
 : Section 3.1 Setting Serialization Parameters by Means of a Data
 : Model Instance</span> <sup><small>SER30</small></sup>.</p>
 : <p>The final stage of serialization, that is, encoding, is skipped.
 : If the serializer does not allow this phase to be skipped, then the
 : sequence of octets returned by the serializer is decoded into a
 : string by reversing the character encoding performed in the final
 : stage.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The serialization process will raise an error if
 : <code>$arg</code> is an attribute or namespace node.</p>
 : <p>If any serialization error occurs, including the detection of an
 : invalid value for a serialization parameter, this results in the
 : <code>fn:serialize</code> call failing with a dynamic error.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>One use case for this function arises when there is a need to
 : construct an XML document containing nested XML documents within a
 : CDATA section (or on occasions within a comment). See <span href="#func-parse-xml"><code>fn:parse-xml</code></span> for further
 : details.</p>
 : <p>Another use case arises when there is a need to call an
 : extension function that expects a lexical XML document as
 : input.</p>
 : <p>There are also use cases where the application wants to
 : post-process the output of a query or transformation, for example
 : by adding an internal DTD subset, or by inserting proprietary
 : markup delimiters such as the <code>&lt;% ... %&gt;</code> used by
 : some templating languages.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Given the output parameters:</p>
 : <p>let <code>$params</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;output:serialization-parameters&gt;
 :   &lt;output:omit-xml-declaration&gt;yes&lt;/output:omit-xml-declaration&gt;
 : &lt;/output:serialization-parameters&gt;
 :          
 : </pre></div>
 : <p>let <code>$data</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;a b='3'/&gt;
 :          
 : </pre></div>
 : <p>The following call might produce the output shown:</p>
 : <p>The expression <code>fn:serialize($data, $params)</code> returns
 : <code>'&lt;a b="3"/&gt;'</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-serialize
 :)
declare function fn:serialize( $arg as item()*,  $params as element(output:serialization-parameters)?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the string <code>$arg1</code> contains
 : <code>$arg2</code> as a leading substring, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:starts-with</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:starts-with</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns <code>true</code>. If the value of
 : <code>$arg1</code> is the zero-length string and the value of
 : <code>$arg2</code> is not the zero-length string, then the function
 : returns <code>false</code>.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns an <code>xs:boolean</code> indicating
 : whether or not the value of <code>$arg1</code> starts with a
 : sequence of collation units that provides a <b>match</b> to the
 : collation units of <code>$arg2</code> according to the collation
 : that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:starts-with("tattoo", "tat")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( "tattoo", "att")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:starts-with ((), ())</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( "abcdefghi", "-a-b-c-",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( "a*b*c*d*e*f*g*h*i*",
 : "a-bc-", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( "abcd***e---f*--*ghi",
 : "abcdef", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( (), "--***-*---",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>. <em>(The second argument contains only
 : ignorable collation units and is equivalent to the zero-length
 : string.).</em></p>
 : <p>The expression <code>fn:starts-with ( "-abcdefghi", "-abc",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-starts-with
 :)
declare function fn:starts-with($arg1 as xs:string?,  $arg2 as xs:string?) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the string <code>$arg1</code> contains
 : <code>$arg2</code> as a leading substring, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:starts-with</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:starts-with</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns <code>true</code>. If the value of
 : <code>$arg1</code> is the zero-length string and the value of
 : <code>$arg2</code> is not the zero-length string, then the function
 : returns <code>false</code>.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns an <code>xs:boolean</code> indicating
 : whether or not the value of <code>$arg1</code> starts with a
 : sequence of collation units that provides a <b>match</b> to the
 : collation units of <code>$arg2</code> according to the collation
 : that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:starts-with("tattoo", "tat")</code>
 : returns <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( "tattoo", "att")</code>
 : returns <code>false()</code>.</p>
 : <p>The expression <code>fn:starts-with ((), ())</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( "abcdefghi", "-a-b-c-",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( "a*b*c*d*e*f*g*h*i*",
 : "a-bc-", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( "abcd***e---f*--*ghi",
 : "abcdef", "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : <p>The expression <code>fn:starts-with ( (), "--***-*---",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>. <em>(The second argument contains only
 : ignorable collation units and is equivalent to the zero-length
 : string.).</em></p>
 : <p>The expression <code>fn:starts-with ( "-abcdefghi", "-abc",
 : "http://example.com/CollationA")</code> returns
 : <code>true()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-starts-with
 :)
declare function fn:starts-with( $arg1 as xs:string?,  $arg2 as xs:string?,  $collation as xs:string) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string created by concatenating the items in a
 : sequence, with a defined separator between adjacent items.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-join</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string*</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-join</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string*</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the single-argument version of this
 : function is the same as calling the two-argument version with
 : <code>$arg2</code> set to a zero-length string.</p>
 : <p>The function returns an <code>xs:string</code> created by
 : concatenating the items in the sequence <code>$arg1</code>, in
 : order, using the value of <code>$arg2</code> as a separator between
 : adjacent items. If the value of <code>$arg2</code> is the
 : zero-length string, then the members of <code>$arg1</code> are
 : concatenated without a separator.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> is the empty sequence, the
 : function returns the zero-length string.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:string-join(('Now', 'is', 'the', 'time',
 : '...'), ' ')</code> returns <code>"Now is the time ..."</code>.</p>
 : <p>The expression <code>fn:string-join(('Blow, ', 'blow, ', 'thou
 : ', 'winter ', 'wind!'), '')</code> returns <code>"Blow, blow, thou
 : winter wind!"</code>.</p>
 : <p>The expression <code>fn:string-join((), 'separator')</code>
 : returns <code>""</code>.</p>
 : <p>Assume a document:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;doc&gt;
 :   &lt;chap&gt;
 :     &lt;section/&gt;
 :   &lt;/chap&gt;
 : &lt;/doc&gt;
 : </pre></div>
 : <p>with the <code>&lt;section&gt;</code> element as the context
 : node, the <span href="#xpath20">[XML Path Language (XPath) 2.0]</span>
 : expression:</p>
 : <p><code>fn:string-join(ancestor-or-self::*/name(), '/')</code></p>
 : <p>returns <code>"doc/chap/section"</code></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-string-join
 :)
declare function fn:string-join($arg1 as xs:string*) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a string created by concatenating the items in a
 : sequence, with a defined separator between adjacent items.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-join</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string*</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-join</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string*</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the single-argument version of this
 : function is the same as calling the two-argument version with
 : <code>$arg2</code> set to a zero-length string.</p>
 : <p>The function returns an <code>xs:string</code> created by
 : concatenating the items in the sequence <code>$arg1</code>, in
 : order, using the value of <code>$arg2</code> as a separator between
 : adjacent items. If the value of <code>$arg2</code> is the
 : zero-length string, then the members of <code>$arg1</code> are
 : concatenated without a separator.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> is the empty sequence, the
 : function returns the zero-length string.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:string-join(('Now', 'is', 'the', 'time',
 : '...'), ' ')</code> returns <code>"Now is the time ..."</code>.</p>
 : <p>The expression <code>fn:string-join(('Blow, ', 'blow, ', 'thou
 : ', 'winter ', 'wind!'), '')</code> returns <code>"Blow, blow, thou
 : winter wind!"</code>.</p>
 : <p>The expression <code>fn:string-join((), 'separator')</code>
 : returns <code>""</code>.</p>
 : <p>Assume a document:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;doc&gt;
 :   &lt;chap&gt;
 :     &lt;section/&gt;
 :   &lt;/chap&gt;
 : &lt;/doc&gt;
 : </pre></div>
 : <p>with the <code>&lt;section&gt;</code> element as the context
 : node, the <span href="#xpath20">[XML Path Language (XPath) 2.0]</span>
 : expression:</p>
 : <p><code>fn:string-join(ancestor-or-self::*/name(), '/')</code></p>
 : <p>returns <code>"doc/chap/section"</code></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-string-join
 :)
declare function fn:string-join($arg1 as xs:string*,  $arg2 as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> in a string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-length</code>()<code class="as"> as </code><code class="return-type">xs:integer</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-length</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:integer</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns an <code>xs:integer</code> equal to the
 : length in <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> of the value of <code>$arg</code>.</p>
 : <p>Calling the zero-argument version of the function is equivalent
 : to calling <code>fn:string-length(fn:string(.))</code>.</p>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : function returns the <code>xs:integer</code> value zero (0).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>If <code>$arg</code> is not specified and the context item is
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>,
 : an error is raised: [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Unlike some programming languages, a <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoint<span class="arrow">·</span></span> greater
 : than 65535 counts as one character, not two.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:string-length("Harp not on that string,
 : madam; that is past.")</code> returns <code>45</code>.</p>
 : <p>The expression <code>fn:string-length(())</code> returns
 : <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-string-length
 :)
declare function fn:string-length() as  xs:integer external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> in a string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-length</code>()<code class="as"> as </code><code class="return-type">xs:integer</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-length</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:integer</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns an <code>xs:integer</code> equal to the
 : length in <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> of the value of <code>$arg</code>.</p>
 : <p>Calling the zero-argument version of the function is equivalent
 : to calling <code>fn:string-length(fn:string(.))</code>.</p>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : function returns the <code>xs:integer</code> value zero (0).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>If <code>$arg</code> is not specified and the context item is
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>,
 : an error is raised: [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Unlike some programming languages, a <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoint<span class="arrow">·</span></span> greater
 : than 65535 counts as one character, not two.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:string-length("Harp not on that string,
 : madam; that is past.")</code> returns <code>45</code>.</p>
 : <p>The expression <code>fn:string-length(())</code> returns
 : <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-string-length
 :)
declare function fn:string-length($arg as xs:string?) as  xs:integer external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the sequence of <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span> that
 : constitute an <code>xs:string</code> value.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-to-codepoints</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:integer*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence of integers, each integer being
 : the Unicode <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span> of the corresponding <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> in
 : <code>$arg</code>.</p>
 : <p>If <code>$arg</code> is a zero-length string or the empty
 : sequence, the function returns the empty sequence.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:string-to-codepoints("Thérèse")</code>
 : returns <code>(84, 104, 233, 114, 232, 115, 101)</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-string-to-codepoints
 :)
declare function fn:string-to-codepoints($arg as xs:string?) as  xs:integer* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the contiguous sequence of items in the value of
 : <code>$sourceSeq</code> beginning at the position indicated by the
 : value of <code>$startingLoc</code> and continuing for the number of
 : items indicated by the value of <code>$length</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:subsequence</code>(<code class="arg">$sourceSeq</code><code class="as"> as </code><code class="type">item()*</code>, <code class="arg">$startingLoc</code><code class="as"> as </code><code class="type">xs:double</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:subsequence</code>(</td>
 : <td valign="baseline"><code class="arg">$sourceSeq</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$startingLoc</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:double</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$length</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:double</code>)<code class="as"> as </code><code class="return-type">item()*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>In the two-argument case, returns:</p>
 : <div class="exampleInner">
 : <pre>
 : $sourceSeq[fn:round($startingLoc) le position()]
 : </pre></div>
 : <p>In the three-argument case, returns:</p>
 : <div class="exampleInner">
 : <pre>
 : $sourceSeq[fn:round($startingLoc) le position() 
 :          and position() lt fn:round($startingLoc) + fn:round($length)]
 : </pre></div>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The first item of a sequence is located at position 1, not
 : position 0.</p>
 : <p>If <code>$sourceSeq</code> is the empty sequence, the empty
 : sequence is returned.</p>
 : <p>If <code>$startingLoc</code> is zero or negative, the
 : subsequence includes items from the beginning of the
 : <code>$sourceSeq</code>.</p>
 : <p>If <code>$length</code> is not specified, the subsequence
 : includes items to the end of <code>$sourceSeq</code>.</p>
 : <p>If <code>$length</code> is greater than the number of items in
 : the value of <code>$sourceSeq</code> following
 : <code>$startingLoc</code>, the subsequence includes items to the
 : end of <code>$sourceSeq</code>.</p>
 : <p>As an exception to the previous two notes, if
 : <code>$startingLoc</code> is <code>-INF</code> and
 : <code>$length</code> is <code>+INF</code>, then <span href="#func-round"><code>fn:round($startingLoc) +
 : fn:round($length)</code></span> is <code>NaN</code>; since
 : <code>position() lt NaN</code> is always false, the result is an
 : empty sequence.</p>
 : <p>The reason the function accepts arguments of type
 : <code>xs:double</code> is that many computations on untyped data
 : return an <code>xs:double</code> result; and the reason for the
 : rounding rules is to compensate for any imprecision in these
 : floating-point computations.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$seq</code> := <code>("item1", "item2", "item3",
 : "item4", "item5")</code></p>
 : <p>The expression <code>fn:subsequence($seq, 4)</code> returns
 : <code>("item4", "item5")</code>.</p>
 : <p>The expression <code>fn:subsequence($seq, 3, 2)</code> returns
 : <code>("item3", "item4")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-subsequence
 :)
declare function fn:subsequence($sourceSeq as item()*,  $startingLoc as xs:double) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the contiguous sequence of items in the value of
 : <code>$sourceSeq</code> beginning at the position indicated by the
 : value of <code>$startingLoc</code> and continuing for the number of
 : items indicated by the value of <code>$length</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:subsequence</code>(<code class="arg">$sourceSeq</code><code class="as"> as </code><code class="type">item()*</code>, <code class="arg">$startingLoc</code><code class="as"> as </code><code class="type">xs:double</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:subsequence</code>(</td>
 : <td valign="baseline"><code class="arg">$sourceSeq</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">item()*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$startingLoc</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:double</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$length</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:double</code>)<code class="as"> as </code><code class="return-type">item()*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>In the two-argument case, returns:</p>
 : <div class="exampleInner">
 : <pre>
 : $sourceSeq[fn:round($startingLoc) le position()]
 : </pre></div>
 : <p>In the three-argument case, returns:</p>
 : <div class="exampleInner">
 : <pre>
 : $sourceSeq[fn:round($startingLoc) le position() 
 :          and position() lt fn:round($startingLoc) + fn:round($length)]
 : </pre></div>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The first item of a sequence is located at position 1, not
 : position 0.</p>
 : <p>If <code>$sourceSeq</code> is the empty sequence, the empty
 : sequence is returned.</p>
 : <p>If <code>$startingLoc</code> is zero or negative, the
 : subsequence includes items from the beginning of the
 : <code>$sourceSeq</code>.</p>
 : <p>If <code>$length</code> is not specified, the subsequence
 : includes items to the end of <code>$sourceSeq</code>.</p>
 : <p>If <code>$length</code> is greater than the number of items in
 : the value of <code>$sourceSeq</code> following
 : <code>$startingLoc</code>, the subsequence includes items to the
 : end of <code>$sourceSeq</code>.</p>
 : <p>As an exception to the previous two notes, if
 : <code>$startingLoc</code> is <code>-INF</code> and
 : <code>$length</code> is <code>+INF</code>, then <span href="#func-round"><code>fn:round($startingLoc) +
 : fn:round($length)</code></span> is <code>NaN</code>; since
 : <code>position() lt NaN</code> is always false, the result is an
 : empty sequence.</p>
 : <p>The reason the function accepts arguments of type
 : <code>xs:double</code> is that many computations on untyped data
 : return an <code>xs:double</code> result; and the reason for the
 : rounding rules is to compensate for any imprecision in these
 : floating-point computations.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$seq</code> := <code>("item1", "item2", "item3",
 : "item4", "item5")</code></p>
 : <p>The expression <code>fn:subsequence($seq, 4)</code> returns
 : <code>("item4", "item5")</code>.</p>
 : <p>The expression <code>fn:subsequence($seq, 3, 2)</code> returns
 : <code>("item3", "item4")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-subsequence
 :)
declare function fn:subsequence( $sourceSeq as item()*,  $startingLoc as xs:double,  $length as xs:double) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the portion of the value of <code>$sourceString</code>
 : beginning at the position indicated by the value of
 : <code>$start</code> and continuing for the number of <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span>
 : indicated by the value of <code>$length</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:substring</code>(<code class="arg">$sourceString</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$start</code><code class="as"> as </code><code class="type">xs:double</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:substring</code>(</td>
 : <td valign="baseline"><code class="arg">$sourceString</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$start</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:double</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$length</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:double</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$sourceString</code> is the empty
 : sequence, the function returns the zero-length string.</p>
 : <p>Otherwise, the function returns a string comprising those
 : <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> of
 : <code>$sourceString</code> whose index position (counting from one)
 : is greater than or equal to the value of <code>$start</code>
 : (rounded to an integer), and (if <code>$length</code> is specified)
 : less than the sum of <code>$start</code> and <code>$length</code>
 : (both rounded to integers).</p>
 : <p>The characters returned do not extend beyond
 : <code>$sourceString</code>. If <code>$start</code> is zero or
 : negative, only those characters in positions greater than zero are
 : returned.</p>
 : <p>More specifically, the three argument version of the function
 : returns the characters in <code>$sourceString</code> whose position
 : <code>$p</code> satisfies:</p>
 : <p><span href="#func-round"><code>fn:round($start) &lt;= $p &lt;
 : fn:round($start) + fn:round($length)</code></span></p>
 : <p>The two argument version of the function assumes that
 : <code>$length</code> is infinite and thus returns the <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> in
 : <code>$sourceString</code> whose position <code>$p</code>
 : satisfies:</p>
 : <p><span href="#func-round"><code>fn:round($start) &lt;=
 : $p</code></span></p>
 : <p>In the above computations, the rules for <span href="#func-numeric-less-than"><code>op:numeric-less-than</code></span> and
 : <span href="#func-numeric-greater-than"><code>op:numeric-greater-than</code></span>
 : apply.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The first character of a string is located at position 1, not
 : position 0.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:substring("motor car", 6)</code> returns
 : <code>" car"</code>. <em>(Characters starting at position 6 to the
 : end of <code>$sourceString</code> are selected.).</em></p>
 : <p>The expression <code>fn:substring("metadata", 4, 3)</code>
 : returns <code>"ada"</code>. <em>(Characters at positions greater
 : than or equal to 4 and less than 7 are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", 1.5, 2.6)</code>
 : returns <code>"234"</code>. <em>(Characters at positions greater
 : than or equal to 2 and less than 5 are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", 0, 3)</code> returns
 : <code>"12"</code>. <em>(Characters at positions greater than or
 : equal to 0 and less than 3 are selected. Since the first position
 : is 1, these are the characters at positions 1 and 2.).</em></p>
 : <p>The expression <code>fn:substring("12345", 5, -3)</code> returns
 : <code>""</code>. <em>(Characters at positions greater than or equal
 : to 5 and less than 2 are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", -3, 5)</code> returns
 : <code>"1"</code>. <em>(Characters at positions greater than or
 : equal to -3 and less than 2 are selected. Since the first position
 : is 1, this is the character at position 1.).</em></p>
 : <p>The expression <code>fn:substring("12345", 0 div 0E0, 3)</code>
 : returns <code>""</code>. <em>(Since <code>0 div 0E0</code> returns
 : <code>NaN</code>, and <code>NaN</code> compared to any other number
 : returns <code>false</code>, no characters are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", 1, 0 div 0E0)</code>
 : returns <code>""</code>. <em>(As above.).</em></p>
 : <p>The expression <code>fn:substring((), 1, 3)</code> returns
 : <code>""</code>.</p>
 : <p>The expression <code>fn:substring("12345", -42, 1 div
 : 0E0)</code> returns <code>"12345"</code>. <em>(Characters at
 : positions greater than or equal to -42 and less than
 : <code>INF</code> are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", -1 div 0E0, 1 div
 : 0E0)</code> returns <code>""</code>. <em>(Since the value of
 : <code>-INF + INF</code> is <code>NaN</code>, no characters are
 : selected.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-substring
 :)
declare function fn:substring($sourceString as xs:string?,  $start as xs:double) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the portion of the value of <code>$sourceString</code>
 : beginning at the position indicated by the value of
 : <code>$start</code> and continuing for the number of <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span>
 : indicated by the value of <code>$length</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:substring</code>(<code class="arg">$sourceString</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$start</code><code class="as"> as </code><code class="type">xs:double</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:substring</code>(</td>
 : <td valign="baseline"><code class="arg">$sourceString</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$start</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:double</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$length</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:double</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$sourceString</code> is the empty
 : sequence, the function returns the zero-length string.</p>
 : <p>Otherwise, the function returns a string comprising those
 : <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> of
 : <code>$sourceString</code> whose index position (counting from one)
 : is greater than or equal to the value of <code>$start</code>
 : (rounded to an integer), and (if <code>$length</code> is specified)
 : less than the sum of <code>$start</code> and <code>$length</code>
 : (both rounded to integers).</p>
 : <p>The characters returned do not extend beyond
 : <code>$sourceString</code>. If <code>$start</code> is zero or
 : negative, only those characters in positions greater than zero are
 : returned.</p>
 : <p>More specifically, the three argument version of the function
 : returns the characters in <code>$sourceString</code> whose position
 : <code>$p</code> satisfies:</p>
 : <p><span href="#func-round"><code>fn:round($start) &lt;= $p &lt;
 : fn:round($start) + fn:round($length)</code></span></p>
 : <p>The two argument version of the function assumes that
 : <code>$length</code> is infinite and thus returns the <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> in
 : <code>$sourceString</code> whose position <code>$p</code>
 : satisfies:</p>
 : <p><span href="#func-round"><code>fn:round($start) &lt;=
 : $p</code></span></p>
 : <p>In the above computations, the rules for <span href="#func-numeric-less-than"><code>op:numeric-less-than</code></span> and
 : <span href="#func-numeric-greater-than"><code>op:numeric-greater-than</code></span>
 : apply.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The first character of a string is located at position 1, not
 : position 0.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:substring("motor car", 6)</code> returns
 : <code>" car"</code>. <em>(Characters starting at position 6 to the
 : end of <code>$sourceString</code> are selected.).</em></p>
 : <p>The expression <code>fn:substring("metadata", 4, 3)</code>
 : returns <code>"ada"</code>. <em>(Characters at positions greater
 : than or equal to 4 and less than 7 are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", 1.5, 2.6)</code>
 : returns <code>"234"</code>. <em>(Characters at positions greater
 : than or equal to 2 and less than 5 are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", 0, 3)</code> returns
 : <code>"12"</code>. <em>(Characters at positions greater than or
 : equal to 0 and less than 3 are selected. Since the first position
 : is 1, these are the characters at positions 1 and 2.).</em></p>
 : <p>The expression <code>fn:substring("12345", 5, -3)</code> returns
 : <code>""</code>. <em>(Characters at positions greater than or equal
 : to 5 and less than 2 are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", -3, 5)</code> returns
 : <code>"1"</code>. <em>(Characters at positions greater than or
 : equal to -3 and less than 2 are selected. Since the first position
 : is 1, this is the character at position 1.).</em></p>
 : <p>The expression <code>fn:substring("12345", 0 div 0E0, 3)</code>
 : returns <code>""</code>. <em>(Since <code>0 div 0E0</code> returns
 : <code>NaN</code>, and <code>NaN</code> compared to any other number
 : returns <code>false</code>, no characters are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", 1, 0 div 0E0)</code>
 : returns <code>""</code>. <em>(As above.).</em></p>
 : <p>The expression <code>fn:substring((), 1, 3)</code> returns
 : <code>""</code>.</p>
 : <p>The expression <code>fn:substring("12345", -42, 1 div
 : 0E0)</code> returns <code>"12345"</code>. <em>(Characters at
 : positions greater than or equal to -42 and less than
 : <code>INF</code> are selected.).</em></p>
 : <p>The expression <code>fn:substring("12345", -1 div 0E0, 1 div
 : 0E0)</code> returns <code>""</code>. <em>(Since the value of
 : <code>-INF + INF</code> is <code>NaN</code>, no characters are
 : selected.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-substring
 :)
declare function fn:substring( $sourceString as xs:string?,  $start as xs:double,  $length as xs:double) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the part of <code>$arg1</code> that follows the first
 : occurrence of <code>$arg2</code>, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:substring-after</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:substring-after</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns the value of <code>$arg1</code>.</p>
 : <p>If the value of <code>$arg1</code> does not contain a string
 : that is equal to the value of <code>$arg2</code>, then the function
 : returns the zero-length string.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns the substring of the value of
 : <code>$arg1</code> that follows in the value of <code>$arg1</code>
 : the first occurrence of a sequence of collation units that provides
 : a <b>minimal match</b> to the collation units of <code>$arg2</code>
 : according to the collation that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Minimal match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:substring-after("tattoo", "tat")</code>
 : returns <code>"too"</code>.</p>
 : <p>The expression <code>fn:substring-after("tattoo",
 : "tattoo")</code> returns <code>""</code>.</p>
 : <p>The expression <code>fn:substring-after((), ())</code> returns
 : <code>""</code>.</p>
 : <p>The expression <code>fn:substring-after("abcdefghi", "--d-e-",
 : "http://example.com/CollationA")</code> returns
 : <code>"fghi"</code>.</p>
 : <p>The expression <code>fn:substring-after("abc--d-e-fghi",
 : "--d-e-", "http://example.com/CollationA")</code> returns
 : <code>"-fghi"</code>.</p>
 : <p>The expression <code>fn:substring-after ( "a*b*c*d*e*f*g*h*i*",
 : "***cde***", "http://example.com/CollationA")</code> returns
 : <code>"*f*g*h*i*"</code>.</p>
 : <p>The expression <code>fn:substring-after ( "Eureka!",
 : "--***-*---", "http://example.com/CollationA")</code> returns
 : <code>"Eureka!"</code>. <em>(The second argument contains only
 : ignorable collation units and is equivalent to the zero-length
 : string.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-substring-after
 :)
declare function fn:substring-after($arg1 as xs:string?,  $arg2 as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the part of <code>$arg1</code> that follows the first
 : occurrence of <code>$arg2</code>, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:substring-after</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:substring-after</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns the value of <code>$arg1</code>.</p>
 : <p>If the value of <code>$arg1</code> does not contain a string
 : that is equal to the value of <code>$arg2</code>, then the function
 : returns the zero-length string.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns the substring of the value of
 : <code>$arg1</code> that follows in the value of <code>$arg1</code>
 : the first occurrence of a sequence of collation units that provides
 : a <b>minimal match</b> to the collation units of <code>$arg2</code>
 : according to the collation that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Minimal match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:substring-after("tattoo", "tat")</code>
 : returns <code>"too"</code>.</p>
 : <p>The expression <code>fn:substring-after("tattoo",
 : "tattoo")</code> returns <code>""</code>.</p>
 : <p>The expression <code>fn:substring-after((), ())</code> returns
 : <code>""</code>.</p>
 : <p>The expression <code>fn:substring-after("abcdefghi", "--d-e-",
 : "http://example.com/CollationA")</code> returns
 : <code>"fghi"</code>.</p>
 : <p>The expression <code>fn:substring-after("abc--d-e-fghi",
 : "--d-e-", "http://example.com/CollationA")</code> returns
 : <code>"-fghi"</code>.</p>
 : <p>The expression <code>fn:substring-after ( "a*b*c*d*e*f*g*h*i*",
 : "***cde***", "http://example.com/CollationA")</code> returns
 : <code>"*f*g*h*i*"</code>.</p>
 : <p>The expression <code>fn:substring-after ( "Eureka!",
 : "--***-*---", "http://example.com/CollationA")</code> returns
 : <code>"Eureka!"</code>. <em>(The second argument contains only
 : ignorable collation units and is equivalent to the zero-length
 : string.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-substring-after
 :)
declare function fn:substring-after( $arg1 as xs:string?,  $arg2 as xs:string?,  $collation as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the part of <code>$arg1</code> that precedes the first
 : occurrence of <code>$arg2</code>, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:substring-before</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:substring-before</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns the zero-length string.</p>
 : <p>If the value of <code>$arg1</code> does not contain a string
 : that is equal to the value of <code>$arg2</code>, then the function
 : returns the zero-length string.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns the substring of the value of
 : <code>$arg1</code> that precedes in the value of <code>$arg1</code>
 : the first occurrence of a sequence of collation units that provides
 : a <b>minimal match</b> to the collation units of <code>$arg2</code>
 : according to the collation that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Minimal match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:substring-before ( "tattoo",
 : "attoo")</code> returns <code>"t"</code>.</p>
 : <p>The expression <code>fn:substring-before ( "tattoo",
 : "tatto")</code> returns <code>""</code>.</p>
 : <p>The expression <code>fn:substring-before ((), ())</code> returns
 : <code>""</code>.</p>
 : <p>The expression <code>fn:substring-before ( "abcdefghi",
 : "--d-e-", "http://example.com/CollationA")</code> returns
 : <code>"abc"</code>.</p>
 : <p>The expression <code>fn:substring-before ( "abc--d-e-fghi",
 : "--d-e-", "http://example.com/CollationA")</code> returns
 : <code>"abc--"</code>.</p>
 : <p>The expression <code>fn:substring-before ( "a*b*c*d*e*f*g*h*i*",
 : "***cde", "http://example.com/CollationA")</code> returns
 : <code>"a*b*"</code>.</p>
 : <p>The expression <code>fn:substring-before ( "Eureka!",
 : "--***-*---", "http://example.com/CollationA")</code> returns
 : <code>""</code>. <em>(The second argument contains only ignorable
 : collation units and is equivalent to the zero-length
 : string.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-substring-before
 :)
declare function fn:substring-before($arg1 as xs:string?,  $arg2 as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the part of <code>$arg1</code> that precedes the first
 : occurrence of <code>$arg2</code>, taking collations into
 : account.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:substring-before</code>(<code class="arg">$arg1</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$arg2</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:substring-before</code>(</td>
 : <td valign="baseline"><code class="arg">$arg1</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$arg2</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$collation</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg1</code> or <code>$arg2</code> is the
 : empty sequence, or contains only ignorable collation units, it is
 : interpreted as the zero-length string.</p>
 : <p>If the value of <code>$arg2</code> is the zero-length string,
 : then the function returns the zero-length string.</p>
 : <p>If the value of <code>$arg1</code> does not contain a string
 : that is equal to the value of <code>$arg2</code>, then the function
 : returns the zero-length string.</p>
 : <p>The collation used by this function is determined according to
 : the rules in <span href="#choosing-a-collation"><b>5.3.3 Choosing a
 : collation</b></span>.</p>
 : <p>The function returns the substring of the value of
 : <code>$arg1</code> that precedes in the value of <code>$arg1</code>
 : the first occurrence of a sequence of collation units that provides
 : a <b>minimal match</b> to the collation units of <code>$arg2</code>
 : according to the collation that is used.</p>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : <p><b>Minimal match</b> is defined in <span href="#Unicode-Collations">[Unicode Collation Algorithm]</span>.</p>
 : </div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error <strong>may</strong> be raised [<span href="#ERRFOCH0004" title="err:FOCH0004">err:FOCH0004</span>] if the specified collation
 : does not support collation units.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The collation used in these examples,
 : <code>http://example.com/CollationA</code> is a collation in which
 : both "-" and "*" are ignorable collation units.</p>
 : <p>"Ignorable collation unit" is equivalent to "ignorable collation
 : element" in <span href="#Unicode-Collations">[Unicode Collation
 : Algorithm]</span>.</p>
 : <p>The expression <code>fn:substring-before ( "tattoo",
 : "attoo")</code> returns <code>"t"</code>.</p>
 : <p>The expression <code>fn:substring-before ( "tattoo",
 : "tatto")</code> returns <code>""</code>.</p>
 : <p>The expression <code>fn:substring-before ((), ())</code> returns
 : <code>""</code>.</p>
 : <p>The expression <code>fn:substring-before ( "abcdefghi",
 : "--d-e-", "http://example.com/CollationA")</code> returns
 : <code>"abc"</code>.</p>
 : <p>The expression <code>fn:substring-before ( "abc--d-e-fghi",
 : "--d-e-", "http://example.com/CollationA")</code> returns
 : <code>"abc--"</code>.</p>
 : <p>The expression <code>fn:substring-before ( "a*b*c*d*e*f*g*h*i*",
 : "***cde", "http://example.com/CollationA")</code> returns
 : <code>"a*b*"</code>.</p>
 : <p>The expression <code>fn:substring-before ( "Eureka!",
 : "--***-*---", "http://example.com/CollationA")</code> returns
 : <code>""</code>. <em>(The second argument contains only ignorable
 : collation units and is equivalent to the zero-length
 : string.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-substring-before
 :)
declare function fn:substring-before( $arg1 as xs:string?,  $arg2 as xs:string?,  $collation as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a value obtained by adding together the values in
 : <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:sum</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:sum</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$zero</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType?</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Any values of type <code>xs:untypedAtomic</code> in
 : <code>$arg</code> are cast to <code>xs:double</code>. The items in
 : the resulting sequence may be reordered in an arbitrary order. The
 : resulting sequence is referred to below as the converted
 : sequence.</p>
 : <p>If the converted sequence is empty, then the single-argument
 : form of the function returns the <code>xs:integer</code> value
 : <code>0</code>; the two-argument form returns the value of the
 : argument <code>$zero</code>.</p>
 : <p>If the converted sequence contains the value <code>NaN</code>,
 : <code>NaN</code> is returned.</p>
 : <p>All items in <code>$arg</code> must be numeric or derived from a
 : single base type. In addition, the type must support addition.
 : Duration values must either all be
 : <code>xs:yearMonthDuration</code> values or must all be
 : <code>xs:dayTimeDuration</code> values. For numeric values, the
 : numeric promotion rules defined in <span href="#op.numeric"><b>4.2
 : Arithmetic operators on numeric values</b></span> are used to promote
 : all values to a single common type. The sum of a sequence of
 : integers will therefore be an integer, while the sum of a numeric
 : sequence that includes at least one <code>xs:double</code> will be
 : an <code>xs:double</code>.</p>
 : <p>The result of the function, using the second signature, is the
 : result of the expression:</p>
 : <div class="exampleInner">
 : <pre>
 : if (fn:count($c) eq 0) then
 :     $zero
 : else if (fn:count($c) eq 1) then
 :     $c[1]
 : else
 :     $c[1] + fn:sum(subsequence($c, 2))
 : </pre></div>
 : <p>where <code>$c</code> is the converted sequence.</p>
 : <p>The result of the function, using the first signature, is the
 : result of the expression: <code>fn:sum($arg, 0)</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>A type error is raised [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>] if the input sequence contains
 : items of incompatible types, as described above.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The second argument allows an appropriate value to be defined to
 : represent the sum of an empty sequence. For example, when summing a
 : sequence of durations it would be appropriate to return a
 : zero-length duration of the appropriate type. This argument is
 : necessary because a system that does dynamic typing cannot
 : distinguish "an empty sequence of integers", for example, from "an
 : empty sequence of durations".</p>
 : <p>If the converted sequence contains exactly one value then that
 : value is returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$d1</code> :=
 : <code>xs:yearMonthDuration("P20Y")</code></p>
 : <p>let <code>$d2</code> :=
 : <code>xs:yearMonthDuration("P10M")</code></p>
 : <p>let <code>$seq1</code> := <code>($d1, $d2)</code></p>
 : <p>let <code>$seq3</code> := <code>(3, 4, 5)</code></p>
 : <p>The expression <code>fn:sum(($d1, $d2))</code> returns
 : <code>xs:yearMonthDuration("P20Y10M")</code>.</p>
 : <p>The expression <code>fn:sum($seq1[. lt
 : xs:yearMonthDuration('P3M')], xs:yearMonthDuration('P0M'))</code>
 : returns <code>xs:yearMonthDuration("P0M")</code>.</p>
 : <p>The expression <code>fn:sum($seq3)</code> returns
 : <code>12</code>.</p>
 : <p>The expression <code>fn:sum(())</code> returns
 : <code>0</code>.</p>
 : <p>The expression <code>fn:sum((),())</code> returns
 : <code>()</code>.</p>
 : <p>The expression <code>fn:sum((1 to 100)[. lt 0], 0)</code>
 : returns <code>0</code>.</p>
 : <p><code>fn:sum(($d1, 9E1))</code> raises an error [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : <p>The expression <code>fn:sum(($d1, $d2), "ein Augenblick")</code>
 : returns <code>xs:yearMonthDuration("P20Y10M")</code>. <em>(There is
 : no requirement that the <code>$zero</code> value should be the same
 : type as the items in <code>$arg</code>, or even that it should
 : belong to a type that supports addition.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-sum
 :)
declare function fn:sum($arg as xs:anyAtomicType*) as  xs:anyAtomicType external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a value obtained by adding together the values in
 : <code>$arg</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:sum</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:sum</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType*</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$zero</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:anyAtomicType?</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType?</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Any values of type <code>xs:untypedAtomic</code> in
 : <code>$arg</code> are cast to <code>xs:double</code>. The items in
 : the resulting sequence may be reordered in an arbitrary order. The
 : resulting sequence is referred to below as the converted
 : sequence.</p>
 : <p>If the converted sequence is empty, then the single-argument
 : form of the function returns the <code>xs:integer</code> value
 : <code>0</code>; the two-argument form returns the value of the
 : argument <code>$zero</code>.</p>
 : <p>If the converted sequence contains the value <code>NaN</code>,
 : <code>NaN</code> is returned.</p>
 : <p>All items in <code>$arg</code> must be numeric or derived from a
 : single base type. In addition, the type must support addition.
 : Duration values must either all be
 : <code>xs:yearMonthDuration</code> values or must all be
 : <code>xs:dayTimeDuration</code> values. For numeric values, the
 : numeric promotion rules defined in <span href="#op.numeric"><b>4.2
 : Arithmetic operators on numeric values</b></span> are used to promote
 : all values to a single common type. The sum of a sequence of
 : integers will therefore be an integer, while the sum of a numeric
 : sequence that includes at least one <code>xs:double</code> will be
 : an <code>xs:double</code>.</p>
 : <p>The result of the function, using the second signature, is the
 : result of the expression:</p>
 : <div class="exampleInner">
 : <pre>
 : if (fn:count($c) eq 0) then
 :     $zero
 : else if (fn:count($c) eq 1) then
 :     $c[1]
 : else
 :     $c[1] + fn:sum(subsequence($c, 2))
 : </pre></div>
 : <p>where <code>$c</code> is the converted sequence.</p>
 : <p>The result of the function, using the first signature, is the
 : result of the expression: <code>fn:sum($arg, 0)</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>A type error is raised [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>] if the input sequence contains
 : items of incompatible types, as described above.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The second argument allows an appropriate value to be defined to
 : represent the sum of an empty sequence. For example, when summing a
 : sequence of durations it would be appropriate to return a
 : zero-length duration of the appropriate type. This argument is
 : necessary because a system that does dynamic typing cannot
 : distinguish "an empty sequence of integers", for example, from "an
 : empty sequence of durations".</p>
 : <p>If the converted sequence contains exactly one value then that
 : value is returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>let <code>$d1</code> :=
 : <code>xs:yearMonthDuration("P20Y")</code></p>
 : <p>let <code>$d2</code> :=
 : <code>xs:yearMonthDuration("P10M")</code></p>
 : <p>let <code>$seq1</code> := <code>($d1, $d2)</code></p>
 : <p>let <code>$seq3</code> := <code>(3, 4, 5)</code></p>
 : <p>The expression <code>fn:sum(($d1, $d2))</code> returns
 : <code>xs:yearMonthDuration("P20Y10M")</code>.</p>
 : <p>The expression <code>fn:sum($seq1[. lt
 : xs:yearMonthDuration('P3M')], xs:yearMonthDuration('P0M'))</code>
 : returns <code>xs:yearMonthDuration("P0M")</code>.</p>
 : <p>The expression <code>fn:sum($seq3)</code> returns
 : <code>12</code>.</p>
 : <p>The expression <code>fn:sum(())</code> returns
 : <code>0</code>.</p>
 : <p>The expression <code>fn:sum((),())</code> returns
 : <code>()</code>.</p>
 : <p>The expression <code>fn:sum((1 to 100)[. lt 0], 0)</code>
 : returns <code>0</code>.</p>
 : <p><code>fn:sum(($d1, 9E1))</code> raises an error [<span href="#ERRFORG0006" title="err:FORG0006">err:FORG0006</span>].</p>
 : <p>The expression <code>fn:sum(($d1, $d2), "ein Augenblick")</code>
 : returns <code>xs:yearMonthDuration("P20Y10M")</code>. <em>(There is
 : no requirement that the <code>$zero</code> value should be the same
 : type as the items in <code>$arg</code>, or even that it should
 : belong to a type that supports addition.).</em></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-sum
 :)
declare function fn:sum( $arg as xs:anyAtomicType*,  $zero as xs:anyAtomicType?) as  xs:anyAtomicType? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns all but the first item in a sequence.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:tail</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the value of the expression
 : <code>subsequence($arg, 2)</code></p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, or a sequence
 : containing a single item, then the empty sequence is returned.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:tail(1 to 5)</code> returns <code>(2, 3,
 : 4, 5)</code>.</p>
 : <p>The expression <code>fn:tail(("a", "b", "c"))</code> returns
 : <code>("b", "c")</code>.</p>
 : <p>The expression <code>fn:tail("a")</code> returns
 : <code>()</code>.</p>
 : <p>The expression <code>fn:tail(())</code> returns
 : <code>()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-tail
 :)
declare function fn:tail($arg as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the timezone component of an <code>xs:date</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:timezone-from-date</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:date?</code>)<code class="as"> as </code><code class="return-type">xs:dayTimeDuration?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns the timezone component of
 : <code>$arg</code>, if any. If <code>$arg</code> has a timezone
 : component, then the result is an <code>xs:dayTimeDuration</code>
 : that indicates deviation from UTC; its value may range from +14:00
 : to -14:00 hours, both inclusive. If <code>$arg</code> has no
 : timezone component, the result is the empty sequence.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:timezone-from-date(xs:date("1999-05-31-05:00"))</code>
 : returns <code>xs:dayTimeDuration("-PT5H")</code>.</p>
 : <p>The expression
 : <code>fn:timezone-from-date(xs:date("2000-06-12Z"))</code> returns
 : <code>xs:dayTimeDuration("PT0S")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-timezone-from-date
 :)
declare function fn:timezone-from-date($arg as xs:date?) as  xs:dayTimeDuration? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the timezone component of an
 : <code>xs:dateTime</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:timezone-from-dateTime</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:dateTime?</code>)<code class="as"> as </code><code class="return-type">xs:dayTimeDuration?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns the timezone component of
 : <code>$arg</code>, if any. If <code>$arg</code> has a timezone
 : component, then the result is an <code>xs:dayTimeDuration</code>
 : that indicates deviation from UTC; its value may range from +14:00
 : to -14:00 hours, both inclusive. If <code>$arg</code> has no
 : timezone component, the result is the empty sequence.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:timezone-from-dateTime(xs:dateTime("1999-05-31T13:20:00-05:00"))</code>
 : returns <code>xs:dayTimeDuration("-PT5H")</code>.</p>
 : <p>The expression
 : <code>fn:timezone-from-dateTime(xs:dateTime("2000-06-12T13:20:00Z"))</code>
 : returns <code>xs:dayTimeDuration("PT0S")</code>.</p>
 : <p>The expression
 : <code>fn:timezone-from-dateTime(xs:dateTime("2004-08-27T00:00:00"))</code>
 : returns <code>()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-timezone-from-dateTime
 :)
declare function fn:timezone-from-dateTime($arg as xs:dateTime?) as  xs:dayTimeDuration? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the timezone component of an <code>xs:time</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:timezone-from-time</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:time?</code>)<code class="as"> as </code><code class="return-type">xs:dayTimeDuration?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns the timezone component of
 : <code>$arg</code>, if any. If <code>$arg</code> has a timezone
 : component, then the result is an <code>xs:dayTimeDuration</code>
 : that indicates deviation from UTC; its value may range from +14:00
 : to -14:00 hours, both inclusive. If <code>$arg</code> has no
 : timezone component, the result is the empty sequence.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:timezone-from-time(xs:time("13:20:00-05:00"))</code>
 : returns <code>xs:dayTimeDuration("-PT5H")</code>.</p>
 : <p>The expression
 : <code>fn:timezone-from-time(xs:time("13:20:00"))</code> returns
 : <code>()</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-timezone-from-time
 :)
declare function fn:timezone-from-time($arg as xs:time?) as  xs:dayTimeDuration? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of strings constructed by splitting the input
 : wherever a separator is found; the separator is any substring that
 : matches a given regular expression.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:tokenize</code>(<code class="arg">$input</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$pattern</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:tokenize</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$flags</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the first version of this function
 : (omitting the argument <code>$flags</code>) is the same as the
 : effect of calling the second version with the <code>$flags</code>
 : argument set to a zero-length string. Flags are defined in <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : <p>The <code>$flags</code> argument is interpreted in the same way
 : as for the <span href="#func-matches"><code>fn:matches</code></span>
 : function.</p>
 : <p>If <code>$input</code> is the empty sequence, or if
 : <code>$input</code> is the zero-length string, the function returns
 : the empty sequence.</p>
 : <p>The function returns a sequence of strings formed by breaking
 : the <code>$input</code> string into a sequence of strings, treating
 : any substring that matches <code>$pattern</code> as a separator.
 : The separators themselves are not returned.</p>
 : <p>If a separator occurs at the start of the <code>$input</code>
 : string, the result sequence will start with a zero-length string.
 : Zero-length strings will also occur in the result sequence if a
 : separator occurs at the end of the <code>$input</code> string, or
 : if two adjacent substrings match the supplied
 : <code>$pattern</code>.</p>
 : <p>If two alternatives within the supplied <code>$pattern</code>
 : both match at the same position in the <code>$input</code> string,
 : then the match that is chosen is the first. For example:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:tokenize("abracadabra", "(ab)|(a)") returns ("", "r", "c", "d", "r", "")
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORX0002" title="err:FORX0002">err:FORX0002</span>] if the value of
 : <code>$pattern</code> is invalid according to the rules described
 : in section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0001" title="err:FORX0001">err:FORX0001</span>] if the value of
 : <code>$flags</code> is invalid according to the rules described in
 : section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>an error is raised [<span href="#ERRFORX0003" title="err:FORX0003">err:FORX0003</span>] if the supplied
 : <code>$pattern</code> matches a zero-length string, that is, if
 : <span href="#func-matches"><code>fn:matches("", $pattern,
 : $flags)</code></span> returns <code>true</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If the input string is not zero length, and no separators are
 : found in the input string, the result of the function is a single
 : string identical to the input string.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:tokenize("The cat sat on the mat",
 : "\s+")</code> returns <code>("The", "cat", "sat", "on", "the",
 : "mat")</code>.</p>
 : <p>The expression <code>fn:tokenize("1, 15, 24, 50", ",\s*")</code>
 : returns <code>("1", "15", "24", "50")</code>.</p>
 : <p>The expression <code>fn:tokenize("1,15,,24,50,", ",")</code>
 : returns <code>("1", "15", "", "24", "50", "")</code>.</p>
 : <p><code>fn:tokenize("abba", ".?")</code> raises the error
 : [<span href="#ERRFORX0003" title="err:FORX0003">err:FORX0003</span>].</p>
 : <p>The expression <code>fn:tokenize("Some unparsed &lt;br&gt; HTML
 : &lt;BR&gt; text", "\s*&lt;br&gt;\s*", "i")</code> returns
 : <code>("Some unparsed", "HTML", "text")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-tokenize
 :)
declare function fn:tokenize($input as xs:string?,  $pattern as xs:string) as  xs:string* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of strings constructed by splitting the input
 : wherever a separator is found; the separator is any substring that
 : matches a given regular expression.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:tokenize</code>(<code class="arg">$input</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$pattern</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:tokenize</code>(</td>
 : <td valign="baseline"><code class="arg">$input</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$pattern</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$flags</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of calling the first version of this function
 : (omitting the argument <code>$flags</code>) is the same as the
 : effect of calling the second version with the <code>$flags</code>
 : argument set to a zero-length string. Flags are defined in <span href="#flags"><b>5.6.1.1 Flags</b></span>.</p>
 : <p>The <code>$flags</code> argument is interpreted in the same way
 : as for the <span href="#func-matches"><code>fn:matches</code></span>
 : function.</p>
 : <p>If <code>$input</code> is the empty sequence, or if
 : <code>$input</code> is the zero-length string, the function returns
 : the empty sequence.</p>
 : <p>The function returns a sequence of strings formed by breaking
 : the <code>$input</code> string into a sequence of strings, treating
 : any substring that matches <code>$pattern</code> as a separator.
 : The separators themselves are not returned.</p>
 : <p>If a separator occurs at the start of the <code>$input</code>
 : string, the result sequence will start with a zero-length string.
 : Zero-length strings will also occur in the result sequence if a
 : separator occurs at the end of the <code>$input</code> string, or
 : if two adjacent substrings match the supplied
 : <code>$pattern</code>.</p>
 : <p>If two alternatives within the supplied <code>$pattern</code>
 : both match at the same position in the <code>$input</code> string,
 : then the match that is chosen is the first. For example:</p>
 : <div class="exampleInner">
 : <pre>
 :  fn:tokenize("abracadabra", "(ab)|(a)") returns ("", "r", "c", "d", "r", "")
 : </pre></div>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORX0002" title="err:FORX0002">err:FORX0002</span>] if the value of
 : <code>$pattern</code> is invalid according to the rules described
 : in section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>An error is raised [<span href="#ERRFORX0001" title="err:FORX0001">err:FORX0001</span>] if the value of
 : <code>$flags</code> is invalid according to the rules described in
 : section <span href="#regex-syntax"><b>5.6.1 Regular expression
 : syntax</b></span>.</p>
 : <p>an error is raised [<span href="#ERRFORX0003" title="err:FORX0003">err:FORX0003</span>] if the supplied
 : <code>$pattern</code> matches a zero-length string, that is, if
 : <span href="#func-matches"><code>fn:matches("", $pattern,
 : $flags)</code></span> returns <code>true</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If the input string is not zero length, and no separators are
 : found in the input string, the result of the function is a single
 : string identical to the input string.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:tokenize("The cat sat on the mat",
 : "\s+")</code> returns <code>("The", "cat", "sat", "on", "the",
 : "mat")</code>.</p>
 : <p>The expression <code>fn:tokenize("1, 15, 24, 50", ",\s*")</code>
 : returns <code>("1", "15", "24", "50")</code>.</p>
 : <p>The expression <code>fn:tokenize("1,15,,24,50,", ",")</code>
 : returns <code>("1", "15", "", "24", "50", "")</code>.</p>
 : <p><code>fn:tokenize("abba", ".?")</code> raises the error
 : [<span href="#ERRFORX0003" title="err:FORX0003">err:FORX0003</span>].</p>
 : <p>The expression <code>fn:tokenize("Some unparsed &lt;br&gt; HTML
 : &lt;BR&gt; text", "\s*&lt;br&gt;\s*", "i")</code> returns
 : <code>("Some unparsed", "HTML", "text")</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-tokenize
 :)
declare function fn:tokenize( $input as xs:string?,  $pattern as xs:string,  $flags as xs:string) as  xs:string* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Provides an execution trace intended to be used in debugging
 : queries.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:trace</code>(<code class="arg">$value</code><code class="as"> as </code><code class="type">item()*</code>, <code class="arg">$label</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the value of <code>$value</code>,
 : unchanged.</p>
 : <p>In addition, the values of <code>$value</code>, converted to an
 : <code>xs:string</code>, and <code>$label</code>
 : <strong>may</strong> be directed to a trace data set. The
 : destination of the trace output is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>. The format of the trace output is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>. The ordering of output from calls of the
 : <code>fn:trace</code> function is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>Consider a situation in which a user wants to investigate the
 : actual value passed to a function. Assume that in a particular
 : execution, <code>$v</code> is an <code>xs:decimal</code> with value
 : <code>124.84</code>. Writing <code>fn:trace($v, 'the value of $v
 : is:')</code> will put the strings <code>"124.84"</code> and
 : <code>"the value of $v is:"</code> in the trace data set in
 : implementation dependent order.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-trace
 :)
declare function fn:trace($value as item()*,  $label as xs:string) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of <code>$arg</code> modified by replacing or
 : removing individual characters.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="3"><code class="function">fn:translate</code>(</td>
 : <td valign="baseline"><code class="arg">$arg</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$mapString</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$transString</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>Otherwise, the function returns a result string constructed by
 : processing each <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> in the value of <code>$arg</code>, in order,
 : according to the following rules:</p>
 : <ol class="enumar">
 : <li>
 : <p>If the character does not appear in the value of
 : <code>$mapString</code> then it is added to the result string
 : unchanged.</p>
 : </li>
 : <li>
 : <p>If the character first appears in the value of
 : <code>$mapString</code> at some position <em>M</em>, where the
 : value of <code>$transString</code> is <em>M</em> or more characters
 : in length, then the character at position <em>M</em> in
 : <code>$transString</code> is added to the result string.</p>
 : </li>
 : <li>
 : <p>If the character first appears in the value of
 : <code>$mapString</code> at some position <em>M</em>, where the
 : value of <code>$transString</code> is less than <em>M</em>
 : characters in length, then the character is omitted from the result
 : string.</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$mapString</code> is the zero-length string then the
 : function returns <code>$arg</code> unchanged.</p>
 : <p>If a character occurs more than once in <code>$mapString</code>,
 : then the first occurrence determines the action taken.</p>
 : <p>If <code>$transString</code> is longer than
 : <code>$mapString</code>, the excess characters are ignored.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:translate("bar","abc","ABC")</code>
 : returns <code>"BAr"</code>.</p>
 : <p>The expression <code>fn:translate("--aaa--","abc-","ABC")</code>
 : returns <code>"AAA"</code>.</p>
 : <p>The expression <code>fn:translate("abcdabc", "abc", "AB")</code>
 : returns <code>"ABdAB"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-translate
 :)
declare function fn:translate( $arg as xs:string?,  $mapString as xs:string,  $transString as xs:string) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the <code>xs:boolean</code> value <code>true</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:true</code>()<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The result is equivalent to <code>xs:boolean("1")</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:true()</code> returns
 : <code>xs:boolean(1)</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-true
 :)
declare function fn:true() as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the items of <code>$sourceSeq</code> in an <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span> order.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unordered</code>(<code class="arg">$sourceSeq</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the items of <code>$sourceSeq</code> in an
 : <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span> order.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Query optimizers may be able to do a better job if the order of
 : the output sequence is not specified. For example, when retrieving
 : prices from a purchase order, if an index exists on prices, it may
 : be more efficient to return the prices in index order rather than
 : in document order.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:unordered((1, 2, 3, 4, 5))</code>
 : returns some permutation of <code>(1, 2, 3, 4, 5)</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unordered
 :)
declare function fn:unordered($sourceSeq as item()*) as  item()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>The <code>fn:unparsed-text</code> function reads an external
 : resource (for example, a file) and returns its contents as a
 : string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$encoding</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>$href</code> argument <strong>must</strong> be a
 : string in the form of a URI reference, which <strong>must</strong>
 : contain no fragment identifier, and <strong>must</strong> identify
 : a resource that can be read as text. If the URI is a relative URI
 : reference, then it is resolved relative to the <span>Dynamic Base
 : URI property from the dynamic context</span>.</p>
 : <p>If the value of the <code>$href</code> argument is an empty
 : sequence, the function returns an empty sequence.</p>
 : <p>The <code>$encoding</code> argument, if present, is the name of
 : an encoding. The values for this attribute follow the same rules as
 : for the <code>encoding</code> attribute in an XML declaration. The
 : only values which every <span title="" class="termref" href="#"><span class="arrow">·</span>implementation<span class="arrow">·</span></span> is <strong>required</strong> to recognize are
 : <code>utf-8</code> and <code>utf-16</code>.</p>
 : <p>The encoding of the external resource is determined as
 : follows:</p>
 : <ol class="enumar">
 : <li>
 : <p>external encoding information is used if available,
 : otherwise</p>
 : </li>
 : <li>
 : <p>if the media type of the resource is <code>text/xml</code> or
 : <code>application/xml</code> (see <span href="#rfc2376">[RFC
 : 2376]</span>), or if it matches the conventions
 : <code>text/*+xml</code> or <code>application/*+xml</code> (see
 : <span href="#rfc3023">[RFC 3023]</span> and/or its successors), then the
 : encoding is recognized as specified in <span href="#REC-xml">[REC-xml]</span>, otherwise</p>
 : </li>
 : <li>
 : <p>the value of the <code>$encoding</code> argument is used if
 : present, otherwise</p>
 : </li>
 : <li>
 : <p>the processor <strong>may</strong> use <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> heuristics to determine the likely encoding,
 : otherwise</p>
 : </li>
 : <li>
 : <p>UTF-8 is assumed.</p>
 : </li>
 : </ol>
 : <p>The result of the function is a string containing the text of
 : the resource retrieved using the URI.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOUT1170" title="err:FOUT1170">err:FOUT1170</span>] if <code>$href</code> contains a
 : fragment identifier, or if it cannot be used to retrieve a resource
 : containing text.</p>
 : <p>An error is raised [<span href="#ERRFOUT1190" title="err:FOUT1190">err:FOUT1190</span>] if the retrieved resource contains
 : octets that cannot be decoded into Unicode <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> using
 : the specified encoding, or if the resulting characters are not
 : permitted XML characters. This includes the case where the
 : <span title="" class="termref" href="#"><span class="arrow">·</span>processor<span class="arrow">·</span></span> does not
 : support the requested encoding.</p>
 : <p>An error is raised [<span href="#ERRFOUT1200" title="err:FOUT1200">err:FOUT1200</span>] if <code>$encoding</code> is
 : absent and the <span title="" class="termref" href="#"><span class="arrow">·</span>processor<span class="arrow">·</span></span> cannot
 : infer the encoding using external information and the encoding is
 : not UTF-8.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If it is appropriate to use a base URI other than the
 : <span>dynamic</span> base URI (for example, when resolving a
 : relative URI reference read from a source document) then it is
 : advisable to resolve the relative URI reference using the <span href="#func-resolve-uri"><code>fn:resolve-uri</code></span> function before
 : passing it to the <code>fn:unparsed-text</code> function.</p>
 : <p>The rules for determining the encoding are chosen for
 : consistency with <span href="#xinclude">[XML Inclusions (XInclude)
 : Version 1.0 (Second Edition)]</span>. Files with an XML media type are
 : treated specially because there are use cases for this function
 : where the retrieved text is to be included as unparsed XML within a
 : CDATA section of a containing document, and because processors are
 : likely to be able to reuse the code that performs encoding
 : detection for XML external entities.</p>
 : <p>If the text file contains characters such as <code>&lt;</code>
 : and <code>&amp;</code>, these will typically be output as
 : <code>&amp;lt;</code> and <code>&amp;amp;</code> if the string is
 : serialized as XML or HTML. If these characters actually represent
 : markup (for example, if the text file contains HTML), then an XSLT
 : stylesheet can attempt to write them as markup to the output file
 : using the <code>disable-output-escaping</code> attribute of the
 : <code>xsl:value-of</code> instruction. Note, however, that XSLT
 : implementations are not required to support this feature.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>This XSLT example attempts to read a file containing
 : 'boilerplate' HTML and copy it directly to the serialized output
 : file:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:output method="html"/&gt;
 : 
 : &lt;xsl:template match="/"&gt;
 :   &lt;xsl:value-of select="unparsed-text('header.html', 'iso-8859-1')"
 :                 disable-output-escaping="yes"/&gt;
 :   &lt;xsl:apply-templates/&gt;
 :   &lt;xsl:value-of select="unparsed-text('footer.html', 'iso-8859-1')"
 :                 disable-output-escaping="yes"/&gt;
 : &lt;/xsl:template&gt;
 : </pre></div>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text
 :)
declare function fn:unparsed-text($href as xs:string?) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>The <code>fn:unparsed-text</code> function reads an external
 : resource (for example, a file) and returns its contents as a
 : string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$encoding</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>$href</code> argument <strong>must</strong> be a
 : string in the form of a URI reference, which <strong>must</strong>
 : contain no fragment identifier, and <strong>must</strong> identify
 : a resource that can be read as text. If the URI is a relative URI
 : reference, then it is resolved relative to the <span>Dynamic Base
 : URI property from the dynamic context</span>.</p>
 : <p>If the value of the <code>$href</code> argument is an empty
 : sequence, the function returns an empty sequence.</p>
 : <p>The <code>$encoding</code> argument, if present, is the name of
 : an encoding. The values for this attribute follow the same rules as
 : for the <code>encoding</code> attribute in an XML declaration. The
 : only values which every <span title="" class="termref" href="#"><span class="arrow">·</span>implementation<span class="arrow">·</span></span> is <strong>required</strong> to recognize are
 : <code>utf-8</code> and <code>utf-16</code>.</p>
 : <p>The encoding of the external resource is determined as
 : follows:</p>
 : <ol class="enumar">
 : <li>
 : <p>external encoding information is used if available,
 : otherwise</p>
 : </li>
 : <li>
 : <p>if the media type of the resource is <code>text/xml</code> or
 : <code>application/xml</code> (see <span href="#rfc2376">[RFC
 : 2376]</span>), or if it matches the conventions
 : <code>text/*+xml</code> or <code>application/*+xml</code> (see
 : <span href="#rfc3023">[RFC 3023]</span> and/or its successors), then the
 : encoding is recognized as specified in <span href="#REC-xml">[REC-xml]</span>, otherwise</p>
 : </li>
 : <li>
 : <p>the value of the <code>$encoding</code> argument is used if
 : present, otherwise</p>
 : </li>
 : <li>
 : <p>the processor <strong>may</strong> use <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> heuristics to determine the likely encoding,
 : otherwise</p>
 : </li>
 : <li>
 : <p>UTF-8 is assumed.</p>
 : </li>
 : </ol>
 : <p>The result of the function is a string containing the text of
 : the resource retrieved using the URI.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOUT1170" title="err:FOUT1170">err:FOUT1170</span>] if <code>$href</code> contains a
 : fragment identifier, or if it cannot be used to retrieve a resource
 : containing text.</p>
 : <p>An error is raised [<span href="#ERRFOUT1190" title="err:FOUT1190">err:FOUT1190</span>] if the retrieved resource contains
 : octets that cannot be decoded into Unicode <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> using
 : the specified encoding, or if the resulting characters are not
 : permitted XML characters. This includes the case where the
 : <span title="" class="termref" href="#"><span class="arrow">·</span>processor<span class="arrow">·</span></span> does not
 : support the requested encoding.</p>
 : <p>An error is raised [<span href="#ERRFOUT1200" title="err:FOUT1200">err:FOUT1200</span>] if <code>$encoding</code> is
 : absent and the <span title="" class="termref" href="#"><span class="arrow">·</span>processor<span class="arrow">·</span></span> cannot
 : infer the encoding using external information and the encoding is
 : not UTF-8.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If it is appropriate to use a base URI other than the
 : <span>dynamic</span> base URI (for example, when resolving a
 : relative URI reference read from a source document) then it is
 : advisable to resolve the relative URI reference using the <span href="#func-resolve-uri"><code>fn:resolve-uri</code></span> function before
 : passing it to the <code>fn:unparsed-text</code> function.</p>
 : <p>The rules for determining the encoding are chosen for
 : consistency with <span href="#xinclude">[XML Inclusions (XInclude)
 : Version 1.0 (Second Edition)]</span>. Files with an XML media type are
 : treated specially because there are use cases for this function
 : where the retrieved text is to be included as unparsed XML within a
 : CDATA section of a containing document, and because processors are
 : likely to be able to reuse the code that performs encoding
 : detection for XML external entities.</p>
 : <p>If the text file contains characters such as <code>&lt;</code>
 : and <code>&amp;</code>, these will typically be output as
 : <code>&amp;lt;</code> and <code>&amp;amp;</code> if the string is
 : serialized as XML or HTML. If these characters actually represent
 : markup (for example, if the text file contains HTML), then an XSLT
 : stylesheet can attempt to write them as markup to the output file
 : using the <code>disable-output-escaping</code> attribute of the
 : <code>xsl:value-of</code> instruction. Note, however, that XSLT
 : implementations are not required to support this feature.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>This XSLT example attempts to read a file containing
 : 'boilerplate' HTML and copy it directly to the serialized output
 : file:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:output method="html"/&gt;
 : 
 : &lt;xsl:template match="/"&gt;
 :   &lt;xsl:value-of select="unparsed-text('header.html', 'iso-8859-1')"
 :                 disable-output-escaping="yes"/&gt;
 :   &lt;xsl:apply-templates/&gt;
 :   &lt;xsl:value-of select="unparsed-text('footer.html', 'iso-8859-1')"
 :                 disable-output-escaping="yes"/&gt;
 : &lt;/xsl:template&gt;
 : </pre></div>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text
 :)
declare function fn:unparsed-text($href as xs:string?,  $encoding as xs:string) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Because errors in evaluating the <code>fn:unparsed-text</code>
 : function are non-recoverable, these two functions are provided to
 : allow an application to determine whether a call with particular
 : arguments would succeed.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text-available</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:unparsed-text-available</code>(</td>
 : <td valign="baseline"><code class="arg">$href</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$encoding</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>fn:unparsed-text-available</code> function determines
 : whether a call on the <code>fn:unparsed-text</code> function with
 : identical arguments would return a string.</p>
 : <p>If the first argument is an empty sequence, the function returns
 : false. If the second argument is an empty sequence, the function
 : behaves as if the second argument were omitted.</p>
 : <p>In other cases, the function returns true if a call on
 : <code>fn:unparsed-text</code> with the same arguments would
 : succeed, and false if a call on <code>fn:unparsed-text</code> with
 : the same arguments would fail with a non-recoverable dynamic
 : error.</p>
 : <p>The functions <code>fn:unparsed-text</code> and
 : <code>fn:unparsed-text-available</code> have the same requirement
 : for <span title="" class="termref" href="#"><span class="arrow">·</span>determinism<span class="arrow">·</span></span> as the
 : functions <span href="#func-doc"><code>fn:doc</code></span> and <span href="#func-doc-available"><code>fn:doc-available</code></span>. This means
 : that unless the user has explicitly stated a requirement for a
 : reduced level of determinism, either of these functions if called
 : twice with the same arguments during the course of a transformation
 : <strong>must</strong> return the same results each time; moreover,
 : the results of a call on <code>fn:unparsed-text-available</code>
 : <strong>must</strong> be consistent with the results of a
 : subsequent call on <code>unparsed-text</code> with the same
 : arguments.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This requires that the <code>unparsed-text-available</code>
 : function should actually attempt to read the resource identified by
 : the URI, and check that it is correctly encoded and contains no
 : characters that are invalid in XML. Implementations may avoid the
 : cost of repeating these checks for example by caching the validated
 : contents of the resource, to anticipate a subsequent call on the
 : <code>unparsed-text</code> <span>or
 : <code>unparsed-text-lines</code></span> function. Alternatively,
 : implementations may be able to rewrite an expression such as
 : <code>if (unparsed-text-available(A)) then unparsed-text(A) else
 : ...</code> to generate a single call internally.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text-available
 :)
declare function fn:unparsed-text-available($href as xs:string?) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Because errors in evaluating the <code>fn:unparsed-text</code>
 : function are non-recoverable, these two functions are provided to
 : allow an application to determine whether a call with particular
 : arguments would succeed.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text-available</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:unparsed-text-available</code>(</td>
 : <td valign="baseline"><code class="arg">$href</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$encoding</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>fn:unparsed-text-available</code> function determines
 : whether a call on the <code>fn:unparsed-text</code> function with
 : identical arguments would return a string.</p>
 : <p>If the first argument is an empty sequence, the function returns
 : false. If the second argument is an empty sequence, the function
 : behaves as if the second argument were omitted.</p>
 : <p>In other cases, the function returns true if a call on
 : <code>fn:unparsed-text</code> with the same arguments would
 : succeed, and false if a call on <code>fn:unparsed-text</code> with
 : the same arguments would fail with a non-recoverable dynamic
 : error.</p>
 : <p>The functions <code>fn:unparsed-text</code> and
 : <code>fn:unparsed-text-available</code> have the same requirement
 : for <span title="" class="termref" href="#"><span class="arrow">·</span>determinism<span class="arrow">·</span></span> as the
 : functions <span href="#func-doc"><code>fn:doc</code></span> and <span href="#func-doc-available"><code>fn:doc-available</code></span>. This means
 : that unless the user has explicitly stated a requirement for a
 : reduced level of determinism, either of these functions if called
 : twice with the same arguments during the course of a transformation
 : <strong>must</strong> return the same results each time; moreover,
 : the results of a call on <code>fn:unparsed-text-available</code>
 : <strong>must</strong> be consistent with the results of a
 : subsequent call on <code>unparsed-text</code> with the same
 : arguments.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This requires that the <code>unparsed-text-available</code>
 : function should actually attempt to read the resource identified by
 : the URI, and check that it is correctly encoded and contains no
 : characters that are invalid in XML. Implementations may avoid the
 : cost of repeating these checks for example by caching the validated
 : contents of the resource, to anticipate a subsequent call on the
 : <code>unparsed-text</code> <span>or
 : <code>unparsed-text-lines</code></span> function. Alternatively,
 : implementations may be able to rewrite an expression such as
 : <code>if (unparsed-text-available(A)) then unparsed-text(A) else
 : ...</code> to generate a single call internally.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text-available
 :)
declare function fn:unparsed-text-available( $href as xs:string?,  $encoding as xs:string) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>The <code>fn:unparsed-text-lines</code> function reads an
 : external resource (for example, a file) and returns its contents as
 : a sequence of strings, one for each line of text in the file.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text-lines</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:unparsed-text-lines</code>(</td>
 : <td valign="baseline"><code class="arg">$href</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$encoding</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>unparsed-text-lines</code> function reads an external
 : resource (for example, a file) and returns its contents as a
 : sequence of strings, separated at newline boundaries.</p>
 : <p>The result of the single-argument function is the same as the
 : result of the expression <span href="#func-tokenize"><code>fn:tokenize(fn:unparsed-text($href),
 : '\r\n|\r|\n')[not(position()=last() and .='')]</code></span>. The
 : result of the two-argument function is the same as the result of
 : the expression <span href="#func-tokenize"><code>fn:tokenize(fn:unparsed-text($href,
 : $encoding), '\r\n|\r|\n'))[not(position()=last() and
 : .='')]</code></span>.</p>
 : <p>The result is a thus a sequence of strings containing the text
 : of the resource retrieved using the URI, each string representing
 : one line of text. Lines are separated by one of the sequences x0A,
 : x0D, or x0Dx0A. The characters representing the newline are not
 : included in the returned strings. If there are two adjacent newline
 : sequences, a zero-length string will be returned to represent the
 : empty line; but if the external resource ends with a newline
 : sequence, no zero-length string will be returned as the last item
 : in the result.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>Error conditions are the same as for the <span href="#func-unparsed-text"><code>fn:unparsed-text</code></span>
 : function.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>See the notes for <span href="#func-unparsed-text"><code>fn:unparsed-text</code></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text-lines
 :)
declare function fn:unparsed-text-lines($href as xs:string?) as  xs:string* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>The <code>fn:unparsed-text-lines</code> function reads an
 : external resource (for example, a file) and returns its contents as
 : a sequence of strings, one for each line of text in the file.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text-lines</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:unparsed-text-lines</code>(</td>
 : <td valign="baseline"><code class="arg">$href</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$encoding</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>unparsed-text-lines</code> function reads an external
 : resource (for example, a file) and returns its contents as a
 : sequence of strings, separated at newline boundaries.</p>
 : <p>The result of the single-argument function is the same as the
 : result of the expression <span href="#func-tokenize"><code>fn:tokenize(fn:unparsed-text($href),
 : '\r\n|\r|\n')[not(position()=last() and .='')]</code></span>. The
 : result of the two-argument function is the same as the result of
 : the expression <span href="#func-tokenize"><code>fn:tokenize(fn:unparsed-text($href,
 : $encoding), '\r\n|\r|\n'))[not(position()=last() and
 : .='')]</code></span>.</p>
 : <p>The result is a thus a sequence of strings containing the text
 : of the resource retrieved using the URI, each string representing
 : one line of text. Lines are separated by one of the sequences x0A,
 : x0D, or x0Dx0A. The characters representing the newline are not
 : included in the returned strings. If there are two adjacent newline
 : sequences, a zero-length string will be returned to represent the
 : empty line; but if the external resource ends with a newline
 : sequence, no zero-length string will be returned as the last item
 : in the result.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>Error conditions are the same as for the <span href="#func-unparsed-text"><code>fn:unparsed-text</code></span>
 : function.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>See the notes for <span href="#func-unparsed-text"><code>fn:unparsed-text</code></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text-lines
 :)
declare function fn:unparsed-text-lines( $href as xs:string?,  $encoding as xs:string) as  xs:string* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Converts a string to upper case.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:upper-case</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the value of <code>$arg</code> is the empty sequence, the
 : zero-length string is returned.</p>
 : <p>Otherwise, the function returns the value of <code>$arg</code>
 : after translating every <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> to its upper-case correspondent as defined in
 : the appropriate case mappings section in the Unicode standard
 : <span href="#Unicode">[The Unicode Standard]</span>. For versions of
 : Unicode beginning with the 2.1.8 update, only locale-insensitive
 : case mappings should be applied. Beginning with version 3.2.0 (and
 : likely future versions) of Unicode, precise mappings are described
 : in default case operations, which are full case mappings in the
 : absence of tailoring for particular languages and environments.
 : Every lower-case character that does not have an upper-case
 : correspondent, as well as every upper-case character, is included
 : in the returned value in its original form.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Case mappings may change the length of a string. In general, the
 : <code>fn:upper-case</code> and <span href="#func-lower-case"><code>fn:lower-case</code></span> functions are not
 : inverses of each other: <span href="#func-lower-case"><code>fn:lower-case(fn:upper-case($arg))</code></span>
 : is not guaranteed to return <code>$arg</code>, nor is
 : <code>fn:upper-case(fn:lower-case($arg))</code>. The Latin small
 : letter dotless i (as used in Turkish) is perhaps the most prominent
 : lower-case letter which will not round-trip. The Latin capital
 : letter i with dot above is the most prominent upper-case letter
 : which will not round trip; there are others, such as Latin capital
 : letter Sharp S (#1E9E) which is introduced in Unicode 5.1.</p>
 : <p>These functions may not always be linguistically appropriate
 : (e.g. Turkish i without dot) or appropriate for the application
 : (e.g. titlecase). In cases such as Turkish, a simple translation
 : should be used first.</p>
 : <p>Because the function is not sensitive to locale, results will
 : not always match user expectations. In Quebec, for example, the
 : standard uppercase equivalent of "è" is "È", while in metropolitan
 : France it is more commonly "E"; only one of these is supported by
 : the functions as defined.</p>
 : <p>Many characters of class Ll lack uppercase equivalents in the
 : Unicode case mapping tables; many characters of class Lu lack
 : lowercase equivalents.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:upper-case("abCd0")</code> returns
 : <code>"ABCD0"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-upper-case
 :)
declare function fn:upper-case($arg as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of <code>xs:anyURI</code> values representing
 : the document URIs of the documents in a collection.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:uri-collection</code>()<code class="as"> as </code><code class="return-type">xs:anyURI*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:uri-collection</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on available-collections.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>A collection, as returned by the <code>fn:collection</code>
 : function, is in general a sequence of nodes. Some of these nodes
 : may be document nodes, and some of these document nodes may have a
 : non-empty document URI, accessible using the
 : <code>fn:document-uri</code> function. The
 : <code>fn:uri-collection</code> function returns a sequence of URIs,
 : being the document URIs of those nodes in the collection that are
 : document nodes and that have a document URI (other nodes in the
 : collection are ignored). That is, in the absence of errors,
 : <code>fn:uri-collection(X)</code> returns the same set of URIs as
 : <span href="#func-collection"><code>fn:collection(X)/fn:document-uri()</code></span>,
 : though not necessarily in the same order.</p>
 : <p>The purpose in providing the function, however, is to allow the
 : URIs of the documents in a collection to be retrieved without
 : incurring the cost (which might be significant in some
 : implementations) of dereferencing the URIs to obtain the actual
 : nodes. Where required, the returned URIs can then be dereferenced
 : by calling the <code>fn:doc</code> function.</p>
 : <p>The zero-argument form of the function returns the document URIs
 : of the document nodes in the default collection.</p>
 : <p>The single-argument form returns the document URIs of the
 : document nodes in the collection with a given collection URI. If
 : the value of the argument is an empty sequence, the action is as
 : for the zero-argument form of the function. If the argument is a
 : relative URI reference, it is resolved against the <span>Dynamic
 : Base URI property from the dynamic context</span>.</p>
 : <p>There is no requirement that the nodes in a collection should
 : all be distinct, and therefore no requirement that the URIs in the
 : result of this function should all be distinct.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if no URI is supplied and the
 : value of the default collection is absent.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <b>available collections</b>
 : provides no mapping for the absolutized URI.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <code>$arg</code> is not a
 : valid <code>xs:anyURI</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p><em>This explanation of the function is confusing and needs to
 : be improved: it is the subject of an open bug report (<span href="https://www.w3.org/Bugs/Public/show_bug.cgi?id=14971">#14971</span>).
 : In particular, the description of how it works is not supportive
 : one of the use cases, which is to access a collection of unparsed
 : text files.</em></p>
 : <p>There are several reasons it might be appriopriate to retrieve
 : the URIs of the documents in a collection without retrieving the
 : documents themselves. For example:</p>
 : <ul>
 : <li>
 : <p>In XSLT it allows the documents to be processed in streaming
 : mode using the <code>xsl:stream</code> instruction.</p>
 : </li>
 : <li>
 : <p>It allows recovery from failures to read, parse, or validate
 : individual documents, by calling the <span href="#func-doc"><code>fn:doc</code></span> function within the scope of
 : try/catch.</p>
 : </li>
 : <li>
 : <p>It allows selection of which documents to read based on their
 : URI, for example they can be filtered to select those whose URIs
 : end in <code>.xml</code>.</p>
 : </li>
 : </ul>
 : <p>However, there may be collections that cannot be processed in
 : this way: specifically, those that contain nodes other than
 : document nodes, and those that contain document nodes having no
 : document URI.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-uri-collection
 :)
declare function fn:uri-collection() as  xs:anyURI* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of <code>xs:anyURI</code> values representing
 : the document URIs of the documents in a collection.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:uri-collection</code>()<code class="as"> as </code><code class="return-type">xs:anyURI*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:uri-collection</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on available-collections.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>A collection, as returned by the <code>fn:collection</code>
 : function, is in general a sequence of nodes. Some of these nodes
 : may be document nodes, and some of these document nodes may have a
 : non-empty document URI, accessible using the
 : <code>fn:document-uri</code> function. The
 : <code>fn:uri-collection</code> function returns a sequence of URIs,
 : being the document URIs of those nodes in the collection that are
 : document nodes and that have a document URI (other nodes in the
 : collection are ignored). That is, in the absence of errors,
 : <code>fn:uri-collection(X)</code> returns the same set of URIs as
 : <span href="#func-collection"><code>fn:collection(X)/fn:document-uri()</code></span>,
 : though not necessarily in the same order.</p>
 : <p>The purpose in providing the function, however, is to allow the
 : URIs of the documents in a collection to be retrieved without
 : incurring the cost (which might be significant in some
 : implementations) of dereferencing the URIs to obtain the actual
 : nodes. Where required, the returned URIs can then be dereferenced
 : by calling the <code>fn:doc</code> function.</p>
 : <p>The zero-argument form of the function returns the document URIs
 : of the document nodes in the default collection.</p>
 : <p>The single-argument form returns the document URIs of the
 : document nodes in the collection with a given collection URI. If
 : the value of the argument is an empty sequence, the action is as
 : for the zero-argument form of the function. If the argument is a
 : relative URI reference, it is resolved against the <span>Dynamic
 : Base URI property from the dynamic context</span>.</p>
 : <p>There is no requirement that the nodes in a collection should
 : all be distinct, and therefore no requirement that the URIs in the
 : result of this function should all be distinct.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if no URI is supplied and the
 : value of the default collection is absent.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <b>available collections</b>
 : provides no mapping for the absolutized URI.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <code>$arg</code> is not a
 : valid <code>xs:anyURI</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p><em>This explanation of the function is confusing and needs to
 : be improved: it is the subject of an open bug report (<span href="https://www.w3.org/Bugs/Public/show_bug.cgi?id=14971">#14971</span>).
 : In particular, the description of how it works is not supportive
 : one of the use cases, which is to access a collection of unparsed
 : text files.</em></p>
 : <p>There are several reasons it might be appriopriate to retrieve
 : the URIs of the documents in a collection without retrieving the
 : documents themselves. For example:</p>
 : <ul>
 : <li>
 : <p>In XSLT it allows the documents to be processed in streaming
 : mode using the <code>xsl:stream</code> instruction.</p>
 : </li>
 : <li>
 : <p>It allows recovery from failures to read, parse, or validate
 : individual documents, by calling the <span href="#func-doc"><code>fn:doc</code></span> function within the scope of
 : try/catch.</p>
 : </li>
 : <li>
 : <p>It allows selection of which documents to read based on their
 : URI, for example they can be filtered to select those whose URIs
 : end in <code>.xml</code>.</p>
 : </li>
 : </ul>
 : <p>However, there may be collections that cannot be processed in
 : this way: specifically, those that contain nodes other than
 : document nodes, and those that contain document nodes having no
 : document URI.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-uri-collection
 :)
declare function fn:uri-collection($arg as xs:string?) as  xs:anyURI* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the year component of an <code>xs:date</code>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:year-from-date</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:date?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : representing the year in the local value of <code>$arg</code>. The
 : value may be negative.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:year-from-date(xs:date("1999-05-31"))</code> returns
 : <code>1999</code>.</p>
 : <p>The expression
 : <code>fn:year-from-date(xs:date("2000-01-01+05:00"))</code> returns
 : <code>2000</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-year-from-date
 :)
declare function fn:year-from-date($arg as xs:date?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the number of years in a duration.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:years-from-duration</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:duration?</code>)<code class="as"> as </code><code class="return-type">xs:integer?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise, the function returns an <code>xs:integer</code>
 : representing the years component in the value of <code>$arg</code>.
 : The result is obtained by casting <code>$arg</code> to an
 : <code>xs:yearMonthDuration</code> (see <span href="#casting-to-durations"><b>18.1.3 Casting to duration
 : types</b></span>) and then computing the years component as described
 : in <span href="#canonical-yearMonthDuration"><b>8.1.1.3 Canonical
 : representation</b></span>.</p>
 : <p>If <code>$arg</code> is a negative duration then the result will
 : be negative..</p>
 : <p>If <code>$arg</code> is an <code>xs:dayTimeDuration</code> the
 : function returns 0.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:years-from-duration(xs:yearMonthDuration("P20Y15M"))</code>
 : returns <code>21</code>.</p>
 : <p>The expression
 : <code>fn:years-from-duration(xs:yearMonthDuration("-P15M"))</code>
 : returns <code>-1</code>.</p>
 : <p>The expression
 : <code>fn:years-from-duration(xs:dayTimeDuration("-P2DT15H"))</code>
 : returns <code>0</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-years-from-duration
 :)
declare function fn:years-from-duration($arg as xs:duration?) as  xs:integer? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns <code>$arg</code> if it contains zero or one items.
 : Otherwise, raises an error.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:zero-or-one</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">item()?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Except in error cases, the function returns <code>$arg</code>
 : unchanged.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFORG0003" title="err:FORG0003">err:FORG0003</span>] if <code>$arg</code> contains more
 : than one item.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-zero-or-one
 :)
declare function fn:zero-or-one($arg as item()*) as  item()? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Creates an <code>xs:string</code> from a sequence of <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:codepoints-to-string</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:integer*</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the string made up from the <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> whose
 : Unicode <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span> are supplied in <code>$arg</code>. This will
 : be the zero-length string if <code>$arg</code> is the empty
 : sequence.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOCH0001" title="err:FOCH0001">err:FOCH0001</span>] if any of the codepoints in
 : <code>$arg</code> is not a permitted XML character.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:codepoints-to-string((66, 65, 67,
 : 72))</code> returns <code>"BACH"</code>.</p>
 : <p>The expression <code>fn:codepoints-to-string((2309, 2358, 2378,
 : 2325))</code> returns <code>"अशॊक"</code>.</p>
 : <p>The expression <code>fn:codepoints-to-string(())</code> returns
 : <code>""</code>.</p>
 : <p>The expression <code>fn:codepoints-to-string(0)</code> raises
 : error <code>FOCH0001</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-codepoints-to-string
 :)
declare function fn:codepoints-to-string($arg as xs:integer*) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the sequence of <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span> that
 : constitute an <code>xs:string</code> value.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string-to-codepoints</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:integer*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence of integers, each integer being
 : the Unicode <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span> of the corresponding <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> in
 : <code>$arg</code>.</p>
 : <p>If <code>$arg</code> is a zero-length string or the empty
 : sequence, the function returns the empty sequence.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:string-to-codepoints("Thérèse")</code>
 : returns <code>(84, 104, 233, 114, 232, 115, 101)</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-string-to-codepoints
 :)
declare function fn:string-to-codepoints($arg as xs:string?) as  xs:integer* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the base URI of a node.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:base-uri</code>()<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:base-uri</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The zero-argument version of the function returns the base URI
 : of the context node: it is equivalent to calling
 : <code>fn:base-uri(.)</code>. This may result in an error being
 : raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : <p>The single-argument version of the function behaves as
 : follows:</p>
 : <ol class="enumar">
 : <li>If <code>$arg</code> is the empty sequence, the function
 : returns the empty sequence.</li>
 : <li>Otherwise, the function returns the value of the
 : <code>dm:base-uri</code> accessor applied to the node
 : <code>$arg</code>. This accessor is defined, for each kind of node,
 : in the XDM specification (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-base-uri">Section 5.2
 : base-uri Accessor</span> <sup><small>DM30</small></sup>).</li>
 : </ol>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : As explained in XDM, document, element and processing-instruction
 : nodes have a base-uri property which may be empty. The base-uri
 : property for all other node kinds is the empty sequence. The
 : dm:base-uri accessor returns the base-uri property of a node if it
 : exists and is non-empty; otherwise it returns the result of
 : applying the dm:base-uri accessor to its parent, recursively. If
 : the node does not have a parent, or if the recursive ascent up the
 : ancestor chain encounters a parentless node whose base-uri property
 : is empty, the empty sequence is returned. In the case of namespace
 : nodes, however, the result is always an empty sequence -- it does
 : not depend on the base URI of the parent element.</div>
 : <p>See also <span href="#func-static-base-uri"><code>fn:static-base-uri</code></span>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>If <code>$arg</code> is not specified, the following errors may
 : be raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-base-uri
 :)
declare function fn:base-uri() as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the base URI of a node.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:base-uri</code>()<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:base-uri</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The zero-argument version of the function returns the base URI
 : of the context node: it is equivalent to calling
 : <code>fn:base-uri(.)</code>. This may result in an error being
 : raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : <p>The single-argument version of the function behaves as
 : follows:</p>
 : <ol class="enumar">
 : <li>If <code>$arg</code> is the empty sequence, the function
 : returns the empty sequence.</li>
 : <li>Otherwise, the function returns the value of the
 : <code>dm:base-uri</code> accessor applied to the node
 : <code>$arg</code>. This accessor is defined, for each kind of node,
 : in the XDM specification (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-base-uri">Section 5.2
 : base-uri Accessor</span> <sup><small>DM30</small></sup>).</li>
 : </ol>
 : <div class="note">
 : <p class="prefix"><b>Note:</b></p>
 : As explained in XDM, document, element and processing-instruction
 : nodes have a base-uri property which may be empty. The base-uri
 : property for all other node kinds is the empty sequence. The
 : dm:base-uri accessor returns the base-uri property of a node if it
 : exists and is non-empty; otherwise it returns the result of
 : applying the dm:base-uri accessor to its parent, recursively. If
 : the node does not have a parent, or if the recursive ascent up the
 : ancestor chain encounters a parentless node whose base-uri property
 : is empty, the empty sequence is returned. In the case of namespace
 : nodes, however, the result is always an empty sequence -- it does
 : not depend on the base URI of the parent element.</div>
 : <p>See also <span href="#func-static-base-uri"><code>fn:static-base-uri</code></span>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>If <code>$arg</code> is not specified, the following errors may
 : be raised: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-base-uri
 :)
declare function fn:base-uri($arg as node()?) as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the current date.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:current-date</code>()<code class="as"> as </code><code class="return-type">xs:date</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns <code>xs:date(fn:current-dateTime())</code>. This is an
 : <code>xs:date</code> (with timezone) that is current at some time
 : during the evaluation of a query or transformation in which
 : <code>fn:current-date</code> is executed.</p>
 : <p>This function is <span title="" class="termref" href="#"><span class="arrow">·</span><span class="arrow">·</span></span>.
 : The precise instant during the query or transformation represented
 : by the value of <code>fn:current-date</code> is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The returned date will always have an associated timezone, which
 : will always be the same as the implicit timezone in the dynamic
 : context</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p><code>fn:current-date()</code> returns an <code>xs:date</code>
 : corresponding to the current date. For example, a call of
 : <code>fn:current-date()</code> might return
 : <code>2004-05-12+01:00</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-current-date
 :)
declare function fn:current-date() as  xs:date external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the current date and time (with timezone).</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:current-dateTime</code>()<code class="as"> as </code><code class="return-type">xs:dateTimeStamp</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns the current dateTime (with timezone) from the dynamic
 : context. (See <span href="http://www.w3.org/TR/xpath-30/#id-xp-evaluation-context-components">
 : Section C.2 Dynamic Context Components</span>
 : <sup><small>XP30</small></sup>.) This is an
 : <code>xs:dateTime</code> that is current at some time during the
 : evaluation of a query or transformation in which
 : <code>fn:current-dateTime</code> is executed.</p>
 : <p>This function is <span title="" class="termref" href="#"><span class="arrow">·</span><span class="arrow">·</span></span>.
 : The precise instant during the query or transformation represented
 : by the value of <code>fn:current-dateTime()</code> is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : <p>If the implementation supports data types from XSD 1.1 then the
 : returned value will be an instance of
 : <code>xs:dateTimeStamp</code>. Otherwise, the only guarantees are
 : that it will be an instance of <code>xs:dateTime</code> and will
 : have a timezone component.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The returned <code>xs:dateTime</code> will always have an
 : associated timezone, which will always be the same as the implicit
 : timezone in the dynamic context</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p><code>fn:current-dateTime()</code> returns an
 : <code>xs:dateTimeStamp</code> corresponding to the current date and
 : time. For example, a call of <code>fn:current-dateTime()</code>
 : might return <code>2004-05-12T18:17:15.125Z</code> corresponding to
 : the current time on May 12, 2004 in timezone <code>Z</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-current-dateTime
 :)
declare function fn:current-dateTime() as  xs:dateTimeStamp external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the current time.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:current-time</code>()<code class="as"> as </code><code class="return-type">xs:time</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns <code>xs:time(fn:current-dateTime())</code>. This is an
 : <code>xs:time</code> (with timezone) that is current at some time
 : during the evaluation of a query or transformation in which
 : <code>fn:current-time</code> is executed.</p>
 : <p>This function is <span title="" class="termref" href="#"><span class="arrow">·</span><span class="arrow">·</span></span>.
 : The precise instant during the query or transformation represented
 : by the value of <code>fn:current-time()</code> is <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation dependent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The returned time will always have an associated timezone, which
 : will always be the same as the implicit timezone in the dynamic
 : context</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p><code>fn:current-time()</code> returns an <code>xs:time</code>
 : corresponding to the current time. For example, a call of
 : <code>fn:current-time()</code> might return
 : <code>23:17:00.000-05:00</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-current-time
 :)
declare function fn:current-time() as  xs:time external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the result of atomizing a sequence, that is, replacing
 : all nodes in the sequence by their typed values.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:data</code>()<code class="as"> as </code><code class="return-type">xs:anyAtomicType*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:data</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>The result of <code>fn:data</code> is the sequence of atomic
 : values produced by applying the following rules to each item in
 : <code>$arg</code>:</p>
 : <ul>
 : <li>
 : <p>If the item is an atomic value, it is appended to the result
 : sequence.</p>
 : </li>
 : <li>
 : <p>If the item is a node, the typed value of the node is appended
 : to the result sequence. The typed value is a sequence of zero or
 : more atomic values: specifically, the result of the
 : <code>dm:typed-value</code> accessor as defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>
 : (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-typed-value">Section
 : 5.15 typed-value Accessor</span> <sup><small>DM30</small></sup>).</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOTY0012" title="err:FOTY0012">err:FOTY0012</span>] if an item in the sequence
 : <code>$arg</code> is a node that does not have a typed value.</p>
 : <p>An error is raised [<span href="#ERRFOTY0013" title="err:FOTY0013">err:FOTY0013</span>] if an item in the sequence
 : <code>$arg</code> is a function item.</p>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The process of applying the <code>fn:data</code> function to a
 : sequence is referred to as <code>atomization</code>. In many cases
 : an explicit call on <code>fn:data</code> is not required, because
 : atomization is invoked implicitly when a node or sequence of nodes
 : is supplied in a context where an atomic value or sequence of
 : atomic values is required.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>data(123)</code> returns
 : <code>123</code>.</p>
 : <p>let <code>$para</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;para&gt;In a hole in the ground there lived a &lt;term author="Tolkein"&gt;hobbit&lt;/term&gt;.&lt;/para&gt;
 :             
 : </pre></div>
 : <p>The expression <code>data($para)</code> returns
 : <code>xs:untypedAtomic("In a hole in the ground there lived a
 : hobbit.")</code>.</p>
 : <p>The expression <code>data($para/term/@author)</code> returns
 : <code>xs:untypedAtomic("Tolkein")</code>.</p>
 : <p>The expression <code>data(abs#1)</code> raises error
 : <code>FOTY0013</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-data
 :)
declare function fn:data() as  xs:anyAtomicType* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the result of atomizing a sequence, that is, replacing
 : all nodes in the sequence by their typed values.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:data</code>()<code class="as"> as </code><code class="return-type">xs:anyAtomicType*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:data</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()*</code>)<code class="as"> as </code><code class="return-type">xs:anyAtomicType*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>The result of <code>fn:data</code> is the sequence of atomic
 : values produced by applying the following rules to each item in
 : <code>$arg</code>:</p>
 : <ul>
 : <li>
 : <p>If the item is an atomic value, it is appended to the result
 : sequence.</p>
 : </li>
 : <li>
 : <p>If the item is a node, the typed value of the node is appended
 : to the result sequence. The typed value is a sequence of zero or
 : more atomic values: specifically, the result of the
 : <code>dm:typed-value</code> accessor as defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>
 : (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-typed-value">Section
 : 5.15 typed-value Accessor</span> <sup><small>DM30</small></sup>).</p>
 : </li>
 : </ul>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOTY0012" title="err:FOTY0012">err:FOTY0012</span>] if an item in the sequence
 : <code>$arg</code> is a node that does not have a typed value.</p>
 : <p>An error is raised [<span href="#ERRFOTY0013" title="err:FOTY0013">err:FOTY0013</span>] if an item in the sequence
 : <code>$arg</code> is a function item.</p>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The process of applying the <code>fn:data</code> function to a
 : sequence is referred to as <code>atomization</code>. In many cases
 : an explicit call on <code>fn:data</code> is not required, because
 : atomization is invoked implicitly when a node or sequence of nodes
 : is supplied in a context where an atomic value or sequence of
 : atomic values is required.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>data(123)</code> returns
 : <code>123</code>.</p>
 : <p>let <code>$para</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;para&gt;In a hole in the ground there lived a &lt;term author="Tolkein"&gt;hobbit&lt;/term&gt;.&lt;/para&gt;
 :             
 : </pre></div>
 : <p>The expression <code>data($para)</code> returns
 : <code>xs:untypedAtomic("In a hole in the ground there lived a
 : hobbit.")</code>.</p>
 : <p>The expression <code>data($para/term/@author)</code> returns
 : <code>xs:untypedAtomic("Tolkein")</code>.</p>
 : <p>The expression <code>data(abs#1)</code> raises error
 : <code>FOTY0013</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-data
 :)
declare function fn:data($arg as item()*) as  xs:anyAtomicType* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of the default collation property from the
 : static context.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:default-collation</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on collations.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns the value of the default collation property from the
 : static context. Components of the static context are discussed in
 : <span href="http://www.w3.org/TR/xpath-30/#id-xp-static-context-components">Section
 : C.1 Static Context Components</span>
 : <sup><small>XP30</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The default collation property can never be absent. If it is not
 : explicitly defined, a system defined default can be invoked. If
 : this is not provided, the Unicode codepoint collation
 : (<code>http://www.w3.org/2005/xpath-functions/collation/codepoint</code>)
 : is used.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-default-collation
 :)
declare function fn:default-collation() as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the URI of a resource where a document can be found, if
 : available.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:document-uri</code>()<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:document-uri</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>If <code>$arg</code> is not a document node, the function
 : returns the empty sequence.</p>
 : <p>Otherwise, the function returns the value of the
 : <code>document-uri</code> accessor applied to <code>$arg</code>, as
 : defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data
 : Model (XDM) 3.0]</span> (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#DocumentNodeAccessors">Section
 : 6.1.2 Accessors</span> <sup><small>DM30</small></sup>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>In the case of a document node <code>$D</code> returned by the
 : <span href="#func-doc"><code>fn:doc</code></span> function, or a document
 : node at the root of a tree containing a node returned by the
 : <span href="#func-collection"><code>fn:collection</code></span> function,
 : it will always be true that either <code>fn:document-uri($D)</code>
 : returns the empty sequence, or that the following expression is
 : true: <span href="#func-doc"><code>fn:doc(fn:document-uri($D))</code></span> is
 : <code>$D</code>. It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> whether this guarantee also holds for document
 : nodes obtained by other means, for example a document node passed
 : as the initial context node of a query or transformation.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-document-uri
 :)
declare function fn:document-uri() as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the URI of a resource where a document can be found, if
 : available.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:document-uri</code>()<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:document-uri</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>If <code>$arg</code> is not a document node, the function
 : returns the empty sequence.</p>
 : <p>Otherwise, the function returns the value of the
 : <code>document-uri</code> accessor applied to <code>$arg</code>, as
 : defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data
 : Model (XDM) 3.0]</span> (See <span href="http://www.w3.org/TR/xpath-datamodel-30/#DocumentNodeAccessors">Section
 : 6.1.2 Accessors</span> <sup><small>DM30</small></sup>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>In the case of a document node <code>$D</code> returned by the
 : <span href="#func-doc"><code>fn:doc</code></span> function, or a document
 : node at the root of a tree containing a node returned by the
 : <span href="#func-collection"><code>fn:collection</code></span> function,
 : it will always be true that either <code>fn:document-uri($D)</code>
 : returns the empty sequence, or that the following expression is
 : true: <span href="#func-doc"><code>fn:doc(fn:document-uri($D))</code></span> is
 : <code>$D</code>. It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> whether this guarantee also holds for document
 : nodes obtained by other means, for example a document node passed
 : as the initial context node of a query or transformation.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-document-uri
 :)
declare function fn:document-uri($arg as node()?) as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Encodes reserved characters in a string that is intended to be
 : used in the path segment of a URI.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:encode-for-uri</code>(<code class="arg">$uri-part</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$uri-part</code> is the empty sequence, the function
 : returns the zero-length string.</p>
 : <p>This function applies the URI escaping rules defined in section
 : 2 of <span href="#rfc3986">[RFC 3986]</span> to the
 : <code>xs:string</code> supplied as <code>$uri-part</code>. The
 : effect of the function is to escape reserved characters. Each such
 : character in the string is replaced with its percent-encoded form
 : as described in <span href="#rfc3986">[RFC 3986]</span>.</p>
 : <p>Since <span href="#rfc3986">[RFC 3986]</span> recommends that, for
 : consistency, URI producers and normalizers should use uppercase
 : hexadecimal digits for all percent-encodings, this function must
 : always generate hexadecimal values using the upper-case letters
 : A-F.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>All characters are escaped except those identified as
 : "unreserved" by <span href="#rfc3986">[RFC 3986]</span>, that is the
 : upper- and lower-case letters A-Z, the digits 0-9, HYPHEN-MINUS
 : ("-"), LOW LINE ("_"), FULL STOP ".", and TILDE "~".</p>
 : <p>This function escapes URI delimiters and therefore cannot be
 : used indiscriminately to encode "invalid" characters in a path
 : segment.</p>
 : <p>This function is invertible but not idempotent. This is because
 : a string containing a percent character will be modified by
 : applying the function: for example <code>100%</code> becomes
 : <code>100%25</code>, while <code>100%25</code> becomes
 : <code>100%2525</code>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression
 : <code>fn:encode-for-uri("http://www.example.com/00/Weather/CA/Los%20Angeles#ocean")</code>
 : returns
 : <code>"http%3A%2F%2Fwww.example.com%2F00%2FWeather%2FCA%2FLos%2520Angeles%23ocean"</code>.
 : <em>(This is probably not what the user intended because all of the
 : delimiters have been encoded.).</em></p>
 : <p>The expression <code>concat("http://www.example.com/",
 : encode-for-uri("~bébé"))</code> returns
 : <code>"http://www.example.com/~b%C3%A9b%C3%A9"</code>.</p>
 : <p>The expression <code>concat("http://www.example.com/",
 : encode-for-uri("100% organic"))</code> returns
 : <code>"http://www.example.com/100%25%20organic"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-encode-for-uri
 :)
declare function fn:encode-for-uri($uri-part as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Escapes a URI in the same way that HTML user agents handle
 : attribute values expected to contain URIs.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:escape-html-uri</code>(<code class="arg">$uri</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$uri</code> is the empty sequence, the function returns
 : the zero-length string.</p>
 : <p>Otherwise, the function escapes all <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> except
 : printable characters of the US-ASCII coded character set,
 : specifically the <span title="codepoint" class="termref" href="#codepoint"><span class="arrow">·</span>codepoints<span class="arrow">·</span></span> between 32 and 126 (decimal) inclusive. Each
 : character in <code>$uri</code> to be escaped is replaced by an
 : escape sequence, which is formed by encoding the character as a
 : sequence of octets in UTF-8, and then representing each of these
 : octets in the form %HH, where HH is the hexadecimal representation
 : of the octet. This function must always generate hexadecimal values
 : using the upper-case letters A-F.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The behavior of this function corresponds to the recommended
 : handling of non-ASCII characters in URI attribute values as
 : described in <span href="#HTML40">[HTML 4.0]</span> Appendix B.2.1.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:escape-html-uri
 : ("http://www.example.com/00/Weather/CA/Los Angeles#ocean")</code>
 : returns <code>"http://www.example.com/00/Weather/CA/Los
 : Angeles#ocean"</code>.</p>
 : <p>The expression <code>fn:escape-html-uri ("javascript:if
 : (navigator.browserLanguage == 'fr')
 : window.open('http://www.example.com/~bébé');")</code> returns
 : <code>"javascript:if (navigator.browserLanguage == 'fr')
 : window.open('http://www.example.com/~b%C3%A9b%C3%A9');"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-escape-html-uri
 :)
declare function fn:escape-html-uri($uri as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the supplied node has one or more child nodes
 : (of any kind).</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:has-children</code>()<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:has-children</code>(<code class="arg">$node</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>The result of the function call
 : <code>fn:has-children($node)</code> is defined to be the same as
 : the result of the expression <span href="#func-exists"><code>fn:exists($node/child::node())</code></span>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$node</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$node</code> is an empty sequence the result is
 : false.</p>
 : <p>The motivation for this function is to support streamed
 : evaluation. According to the streaming rules in <span href="#xslt-30">[XSL Transformations (XSLT) Version 3.0]</span>, the
 : following construct is not streamable:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:if test="exists(row)"&gt;
 :   &lt;ul&gt;
 :     &lt;xsl:for-each select="row"&gt;
 :        &lt;li&gt;&lt;xsl:value-of select="."/&gt;&lt;/li&gt;
 :     &lt;/xsl:for-each&gt;
 :   &lt;/ul&gt;
 : &lt;/xsl:if&gt;  
 : </pre></div>
 : <p>This is because it makes two downward selections to read the
 : child <code>row</code> elements. The use of
 : <code>fn:has-children</code> in the <code>xsl:if</code> conditional
 : is intended to circumvent this restriction.</p>
 : <p>Although the function was introduced to support streaming use
 : cases, it has general utility as a convenience function.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-has-children
 :)
declare function fn:has-children() as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true if the supplied node has one or more child nodes
 : (of any kind).</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:has-children</code>()<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:has-children</code>(<code class="arg">$node</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>The result of the function call
 : <code>fn:has-children($node)</code> is defined to be the same as
 : the result of the expression <span href="#func-exists"><code>fn:exists($node/child::node())</code></span>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$node</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$node</code> is an empty sequence the result is
 : false.</p>
 : <p>The motivation for this function is to support streamed
 : evaluation. According to the streaming rules in <span href="#xslt-30">[XSL Transformations (XSLT) Version 3.0]</span>, the
 : following construct is not streamable:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:if test="exists(row)"&gt;
 :   &lt;ul&gt;
 :     &lt;xsl:for-each select="row"&gt;
 :        &lt;li&gt;&lt;xsl:value-of select="."/&gt;&lt;/li&gt;
 :     &lt;/xsl:for-each&gt;
 :   &lt;/ul&gt;
 : &lt;/xsl:if&gt;  
 : </pre></div>
 : <p>This is because it makes two downward selections to read the
 : child <code>row</code> elements. The use of
 : <code>fn:has-children</code> in the <code>xsl:if</code> conditional
 : is intended to circumvent this restriction.</p>
 : <p>Although the function was introduced to support streaming use
 : cases, it has general utility as a convenience function.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-has-children
 :)
declare function fn:has-children($node as node()?) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of the implicit timezone property from the
 : dynamic context.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:implicit-timezone</code>()<code class="as"> as </code><code class="return-type">xs:dayTimeDuration</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on implicit-timezone.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns the value of the implicit timezone property from the
 : dynamic context. Components of the dynamic context are discussed in
 : <span href="http://www.w3.org/TR/xpath-30/#id-xp-evaluation-context-components">
 : Section C.2 Dynamic Context Components</span>
 : <sup><small>XP30</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-implicit-timezone
 :)
declare function fn:implicit-timezone() as  xs:dayTimeDuration external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns every node within the input sequence that is not an
 : ancestor of another member of the input sequence; the nodes are
 : returned in document order with duplicates eliminated.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:innermost</code>(<code class="arg">$nodes</code><code class="as"> as </code><code class="type">node()*</code>)<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the function call
 : <code>fn:innermost($nodes)</code> is defined to be equivalent to
 : the result of the expression <code>$nodes except
 : $nodes/ancestor::node()</code>.</p>
 : <p>That is, the function takes as input a sequence of nodes, and
 : returns every node within the sequence that is not an ancestor of
 : another node within the sequence; the nodes are returned in
 : document order with duplicates eliminated.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>If the source document contains nested sections represented by
 : <code>div</code> elements, the expression
 : <code>innermost(//div)</code> returns those <code>div</code>
 : elements that do not contain further <code>div</code> elements.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-innermost
 :)
declare function fn:innermost($nodes as node()*) as  node()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Converts a string containing an IRI into a URI according to the
 : rules of <span href="#rfc3987">[RFC 3987]</span>.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:iri-to-uri</code>(<code class="arg">$iri</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If <code>$iri</code> is the empty sequence, the function returns
 : the zero-length string.</p>
 : <p>Otherwise, the function converts the value of <code>$iri</code>
 : into a URI according to the rules given in Section 3.1 of <span href="#rfc3987">[RFC 3987]</span> by percent-encoding characters that are
 : allowed in an IRI but not in a URI. If <code>$iri</code> contains a
 : character that is invalid in an IRI, such as the space character
 : (see note below), the invalid character is replaced by its
 : percent-encoded form as described in <span href="#rfc3986">[RFC
 : 3986]</span> before the conversion is performed.</p>
 : <p>Since <span href="#rfc3986">[RFC 3986]</span> recommends that, for
 : consistency, URI producers and normalizers should use uppercase
 : hexadecimal digits for all percent-encodings, this function must
 : always generate hexadecimal values using the upper-case letters
 : A-F.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The function is idempotent but not invertible. Both the inputs
 : <code>My Documents</code> and <code>My%20Documents</code> will be
 : converted to the output <code>My%20Documents</code>.</p>
 : <p>This function does not check whether <code>$iri</code> is a
 : valid IRI. It treats it as an <span title="string" class="termref" href="#string"><span class="arrow">·</span>string<span class="arrow">·</span></span> and operates on the <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> in the
 : string.</p>
 : <p>The following printable ASCII characters are invalid in an IRI:
 : "&lt;", "&gt;", " " " (double quote), space, "{", "}", "|", "\",
 : "^", and "`". Since these characters should not appear in an IRI,
 : if they do appear in <code>$iri</code> they will be
 : percent-encoded. In addition, characters outside the range
 : x20-<span>x7E</span> will be percent-encoded because they are
 : invalid in a URI.</p>
 : <p>Since this function does not escape the PERCENT SIGN "%" and
 : this character is not allowed in data within a URI, users wishing
 : to convert character strings (such as file names) that include "%"
 : to a URI should manually escape "%" by replacing it with "%25".</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:iri-to-uri
 : ("http://www.example.com/00/Weather/CA/Los%20Angeles#ocean")</code>
 : returns
 : <code>"http://www.example.com/00/Weather/CA/Los%20Angeles#ocean"</code>.</p>
 : <p>The expression <code>fn:iri-to-uri
 : ("http://www.example.com/~bébé")</code> returns
 : <code>"http://www.example.com/~b%C3%A9b%C3%A9"</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-iri-to-uri
 :)
declare function fn:iri-to-uri($iri as xs:string?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function tests whether the language of <code>$node</code>,
 : or the context item if the second argument is omitted, as specified
 : by <code>xml:lang</code> attributes is the same as, or is a
 : sublanguage of, the language specified by
 : <code>$testlang</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:lang</code>(<code class="arg">$testlang</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:lang</code>(<code class="arg">$testlang</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$node</code><code class="as"> as </code><code class="type">node()</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The behavior of the function if the second argument is omitted
 : is exactly the same as if the context item (<code>.</code>) had
 : been passed as the second argument.</p>
 : <p>The language of the argument <code>$node</code>, or the context
 : item if the second argument is omitted, is determined by the value
 : of the <code>xml:lang</code> attribute on the node, or, if the node
 : has no such attribute, by the value of the <code>xml:lang</code>
 : attribute on the nearest ancestor of the node that has an
 : <code>xml:lang</code> attribute. If there is no such ancestor, then
 : the function returns <code>false</code>.</p>
 : <p>If <code>$testlang</code> is the empty sequence it is
 : interpreted as the zero-length string.</p>
 : <p>The relevant <code>xml:lang</code> attribute is determined by
 : the value of the XPath expression:</p>
 : <div class="exampleInner">
 : <pre>
 : (ancestor-or-self::*/@xml:lang)[last()]
 : </pre></div>
 : <p>If this expression returns an empty sequence, the function
 : returns <code>false</code>.</p>
 : <p>Otherwise, the function returns <code>true</code> if and only
 : if, based on a caseless default match as specified in section 3.13
 : of <span href="#Unicode">[The Unicode Standard]</span>, either:</p>
 : <ol class="enumar">
 : <li>
 : <p><code>$testlang</code> is equal to the string-value of the
 : relevant <code>xml:lang</code> attribute, or</p>
 : </li>
 : <li>
 : <p><code>$testlang</code> is equal to some substring of the
 : string-value of the relevant <code>xml:lang</code> attribute that
 : starts at the start of the string-value and ends immediately before
 : a hyphen, "-" (the character "-" is HYPHEN-MINUS, #x002D).</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>When <code>$arg</code> is omitted the following errors may be
 : raised: if the context item is absent [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:lang("en")</code> would return
 : <code>true</code> if the context node were any of the following
 : four elements:</p>
 : <ul>
 : <li>
 : <p><code>&lt;para xml:lang="en"/&gt;</code></p>
 : </li>
 : <li>
 : <p><code>&lt;div xml:lang="en"&gt;&lt;para&gt;And now, and
 : forever!&lt;/para&gt;&lt;/div&gt;</code></p>
 : </li>
 : <li>
 : <p><code>&lt;para xml:lang="EN"/&gt;</code></p>
 : </li>
 : <li>
 : <p><code>&lt;para xml:lang="en-us"/&gt;</code></p>
 : </li>
 : </ul>
 : <p>The expression <code>fn:lang("fr")</code> would return
 : <code>false</code> if the context node were <code>&lt;para
 : xml:lang="EN"/&gt;</code></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-lang
 :)
declare function fn:lang($testlang as xs:string?) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>This function tests whether the language of <code>$node</code>,
 : or the context item if the second argument is omitted, as specified
 : by <code>xml:lang</code> attributes is the same as, or is a
 : sublanguage of, the language specified by
 : <code>$testlang</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:lang</code>(<code class="arg">$testlang</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:lang</code>(<code class="arg">$testlang</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$node</code><code class="as"> as </code><code class="type">node()</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The behavior of the function if the second argument is omitted
 : is exactly the same as if the context item (<code>.</code>) had
 : been passed as the second argument.</p>
 : <p>The language of the argument <code>$node</code>, or the context
 : item if the second argument is omitted, is determined by the value
 : of the <code>xml:lang</code> attribute on the node, or, if the node
 : has no such attribute, by the value of the <code>xml:lang</code>
 : attribute on the nearest ancestor of the node that has an
 : <code>xml:lang</code> attribute. If there is no such ancestor, then
 : the function returns <code>false</code>.</p>
 : <p>If <code>$testlang</code> is the empty sequence it is
 : interpreted as the zero-length string.</p>
 : <p>The relevant <code>xml:lang</code> attribute is determined by
 : the value of the XPath expression:</p>
 : <div class="exampleInner">
 : <pre>
 : (ancestor-or-self::*/@xml:lang)[last()]
 : </pre></div>
 : <p>If this expression returns an empty sequence, the function
 : returns <code>false</code>.</p>
 : <p>Otherwise, the function returns <code>true</code> if and only
 : if, based on a caseless default match as specified in section 3.13
 : of <span href="#Unicode">[The Unicode Standard]</span>, either:</p>
 : <ol class="enumar">
 : <li>
 : <p><code>$testlang</code> is equal to the string-value of the
 : relevant <code>xml:lang</code> attribute, or</p>
 : </li>
 : <li>
 : <p><code>$testlang</code> is equal to some substring of the
 : string-value of the relevant <code>xml:lang</code> attribute that
 : starts at the start of the string-value and ends immediately before
 : a hyphen, "-" (the character "-" is HYPHEN-MINUS, #x002D).</p>
 : </li>
 : </ol>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>When <code>$arg</code> is omitted the following errors may be
 : raised: if the context item is absent [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:lang("en")</code> would return
 : <code>true</code> if the context node were any of the following
 : four elements:</p>
 : <ul>
 : <li>
 : <p><code>&lt;para xml:lang="en"/&gt;</code></p>
 : </li>
 : <li>
 : <p><code>&lt;div xml:lang="en"&gt;&lt;para&gt;And now, and
 : forever!&lt;/para&gt;&lt;/div&gt;</code></p>
 : </li>
 : <li>
 : <p><code>&lt;para xml:lang="EN"/&gt;</code></p>
 : </li>
 : <li>
 : <p><code>&lt;para xml:lang="en-us"/&gt;</code></p>
 : </li>
 : </ul>
 : <p>The expression <code>fn:lang("fr")</code> would return
 : <code>false</code> if the context node were <code>&lt;para
 : xml:lang="EN"/&gt;</code></p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-lang
 :)
declare function fn:lang($testlang as xs:string?,  $node as node()) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the context size from the dynamic context.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:last</code>()<code class="as"> as </code><code class="return-type">xs:integer</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns the context size from the dynamic context. (See <span href="http://www.w3.org/TR/xpath-30/#id-xp-evaluation-context-components">
 : Section C.2 Dynamic Context Components</span>
 : <sup><small>XP30</small></sup>.)</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup> if the
 : context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>(1 to 20)[fn:last() - 1]</code> returns
 : <code>19</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-last
 :)
declare function fn:last() as  xs:integer external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the local part of the name of <code>$arg</code> as an
 : <code>xs:string</code> that is either the zero-length string, or
 : has the lexical form of an <code>xs:NCName</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:local-name</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:local-name</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If the argument is supplied and is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>If the node identified by <code>$arg</code> has no name (that
 : is, if it is a document node, a comment, a text node, or a
 : namespace node having no name), the function returns the
 : zero-length string.</p>
 : <p>Otherwise, the function returns the local part of the
 : expanded-QName of the node identified by <code>$arg</code>, as
 : determined by the <code>dm:node-name</code> accessor defined in
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-node-name">Section
 : 5.11 node-name Accessor</span> <sup><small>DM30</small></sup>). This
 : will be an <code>xs:string</code> whose lexical form is an
 : <code>xs:NCName</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is absent [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-local-name
 :)
declare function fn:local-name() as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the local part of the name of <code>$arg</code> as an
 : <code>xs:string</code> that is either the zero-length string, or
 : has the lexical form of an <code>xs:NCName</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:local-name</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:local-name</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If the argument is supplied and is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>If the node identified by <code>$arg</code> has no name (that
 : is, if it is a document node, a comment, a text node, or a
 : namespace node having no name), the function returns the
 : zero-length string.</p>
 : <p>Otherwise, the function returns the local part of the
 : expanded-QName of the node identified by <code>$arg</code>, as
 : determined by the <code>dm:node-name</code> accessor defined in
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-node-name">Section
 : 5.11 node-name Accessor</span> <sup><small>DM30</small></sup>). This
 : will be an <code>xs:string</code> whose lexical form is an
 : <code>xs:NCName</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is absent [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-local-name
 :)
declare function fn:local-name($arg as node()?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the name of a node, as an <code>xs:string</code> that is
 : either the zero-length string, or has the lexical form of an
 : <code>xs:QName</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:name</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:name</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If the argument is supplied and is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>If the node identified by <code>$arg</code> has no name (that
 : is, if it is a document node, a comment, a text node, or a
 : namespace node having no name), the function returns the
 : zero-length string.</p>
 : <p>Otherwise, the function returns the value of the expression
 : <span href="#func-string"><code>fn:string(fn:node-name($arg))</code></span>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-name
 :)
declare function fn:name() as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the name of a node, as an <code>xs:string</code> that is
 : either the zero-length string, or has the lexical form of an
 : <code>xs:QName</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:name</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:name</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If the argument is supplied and is the empty sequence, the
 : function returns the zero-length string.</p>
 : <p>If the node identified by <code>$arg</code> has no name (that
 : is, if it is a document node, a comment, a text node, or a
 : namespace node having no name), the function returns the
 : zero-length string.</p>
 : <p>Otherwise, the function returns the value of the expression
 : <span href="#func-string"><code>fn:string(fn:node-name($arg))</code></span>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-name
 :)
declare function fn:name($arg as node()?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the namespace URI part of the name of <code>$arg</code>,
 : as an <code>xs:anyURI</code> value.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:namespace-uri</code>()<code class="as"> as </code><code class="return-type">xs:anyURI</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:namespace-uri</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context node
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If the node identified by <code>$arg</code> is neither an
 : element nor an attribute node, or if it is an element or attribute
 : node whose expanded-QName (as determined by the
 : <code>dm:node-name</code> accessor in the <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-node-name">Section
 : 5.11 node-name Accessor</span> <sup><small>DM30</small></sup>) is in
 : no namespace, then the function returns the zero-length
 : <code>xs:anyURI</code> value.</p>
 : <p>Otherwise, the result will be the namespace URI part of the
 : expanded-QName of the node identified by <code>$arg</code>, as
 : determined by the <code>dm:node-name</code> accessor defined in
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-node-name">Section
 : 5.11 node-name Accessor</span> <sup><small>DM30</small></sup>),
 : returned as an <code>xs:anyURI</code> value.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is absent [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-namespace-uri
 :)
declare function fn:namespace-uri() as  xs:anyURI external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the namespace URI part of the name of <code>$arg</code>,
 : as an <code>xs:anyURI</code> value.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:namespace-uri</code>()<code class="as"> as </code><code class="return-type">xs:anyURI</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:namespace-uri</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context node
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If the node identified by <code>$arg</code> is neither an
 : element nor an attribute node, or if it is an element or attribute
 : node whose expanded-QName (as determined by the
 : <code>dm:node-name</code> accessor in the <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-node-name">Section
 : 5.11 node-name Accessor</span> <sup><small>DM30</small></sup>) is in
 : no namespace, then the function returns the zero-length
 : <code>xs:anyURI</code> value.</p>
 : <p>Otherwise, the result will be the namespace URI part of the
 : expanded-QName of the node identified by <code>$arg</code>, as
 : determined by the <code>dm:node-name</code> accessor defined in
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-node-name">Section
 : 5.11 node-name Accessor</span> <sup><small>DM30</small></sup>),
 : returned as an <code>xs:anyURI</code> value.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is absent [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-namespace-uri
 :)
declare function fn:namespace-uri($arg as node()?) as  xs:anyURI external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true for an element that is <b>nilled</b>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:nilled</code>()<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:nilled</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:boolean?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise the function returns the result of the
 : <code>dm:nilled</code> accessor as defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>
 : (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-nilled">Section 5.9
 : nilled Accessor</span> <sup><small>DM30</small></sup>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$arg</code> is not an element node, the function
 : returns the empty sequence.</p>
 : <p>If <code>$arg</code> is an untyped element node, the function
 : returns false.</p>
 : <p>In practice, the function returns <code>true</code> only for an
 : element node that has the attribute <code>xsi:nil="true"</code> and
 : that is successfully validated against a schema that defines the
 : element to be nillable; the detailed rules, however, are defined in
 : <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM)
 : 3.0]</span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-nilled
 :)
declare function fn:nilled() as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns true for an element that is <b>nilled</b>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:nilled</code>()<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:nilled</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:boolean?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the empty sequence.</p>
 : <p>Otherwise the function returns the result of the
 : <code>dm:nilled</code> accessor as defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>
 : (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-nilled">Section 5.9
 : nilled Accessor</span> <sup><small>DM30</small></sup>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If <code>$arg</code> is not an element node, the function
 : returns the empty sequence.</p>
 : <p>If <code>$arg</code> is an untyped element node, the function
 : returns false.</p>
 : <p>In practice, the function returns <code>true</code> only for an
 : element node that has the attribute <code>xsi:nil="true"</code> and
 : that is successfully validated against a schema that defines the
 : element to be nillable; the detailed rules, however, are defined in
 : <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM)
 : 3.0]</span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-nilled
 :)
declare function fn:nilled($arg as node()?) as  xs:boolean? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the name of a node, as an <code>xs:QName</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:node-name</code>()<code class="as"> as </code><code class="return-type">xs:QName?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:node-name</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:QName?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If <code>$arg</code> is the empty sequence, the empty sequence
 : is returned.</p>
 : <p>Otherwise, the function returns the result of the
 : <code>dm:node-name</code> accessor as defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>
 : (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-node-name">Section
 : 5.11 node-name Accessor</span> <sup><small>DM30</small></sup>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>For element and attribute nodes, the name of the node is
 : returned as an <code>xs:QName</code>, retaining the prefix,
 : namespace URI, and local part.</p>
 : <p>For processing instructions, the name of the node is returned as
 : an <code>xs:QName</code> in which the prefix and namespace URI are
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : <p>For a namespace node, the function returns an empty sequence if
 : the node represents the default namespace; otherwise it returns an
 : <code>xs:QName</code> in which prefix and namespace URI are
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : and the local part is the namespace prefix being bound).</p>
 : <p>For all other kinds of node, the function returns the empty
 : sequence.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-node-name
 :)
declare function fn:node-name() as  xs:QName? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the name of a node, as an <code>xs:QName</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:node-name</code>()<code class="as"> as </code><code class="return-type">xs:QName?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:node-name</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">xs:QName?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the argument is omitted, it defaults to the context item
 : (<code>.</code>). The behavior of the function if the argument is
 : omitted is exactly the same as if the context item had been passed
 : as the argument.</p>
 : <p>If <code>$arg</code> is the empty sequence, the empty sequence
 : is returned.</p>
 : <p>Otherwise, the function returns the result of the
 : <code>dm:node-name</code> accessor as defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>
 : (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-node-name">Section
 : 5.11 node-name Accessor</span> <sup><small>DM30</small></sup>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The following errors may be raised when <code>$arg</code> is
 : omitted: if the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>For element and attribute nodes, the name of the node is
 : returned as an <code>xs:QName</code>, retaining the prefix,
 : namespace URI, and local part.</p>
 : <p>For processing instructions, the name of the node is returned as
 : an <code>xs:QName</code> in which the prefix and namespace URI are
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : <p>For a namespace node, the function returns an empty sequence if
 : the node represents the default namespace; otherwise it returns an
 : <code>xs:QName</code> in which prefix and namespace URI are
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>
 : and the local part is the namespace prefix being bound).</p>
 : <p>For all other kinds of node, the function returns the empty
 : sequence.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-node-name
 :)
declare function fn:node-name($arg as node()?) as  xs:QName? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value indicated by <code>$arg</code> or, if
 : <code>$arg</code> is not specified, the context item after
 : atomization, converted to an <code>xs:double</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:number</code>()<code class="as"> as </code><code class="return-type">xs:double</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:number</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType?</code>)<code class="as"> as </code><code class="return-type">xs:double</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Calling the zero-argument version of the function is defined to
 : give the same result as calling the single-argument version with
 : the context item (<code>.</code>). That is,
 : <code>fn:number()</code> is equivalent to
 : <code>fn:number(.)</code>.</p>
 : <p>If <code>$arg</code> is the empty sequence or if
 : <code>$arg</code> or the context item cannot be converted to an
 : <code>xs:double</code>, the <code>xs:double</code> value
 : <code>NaN</code> is returned.</p>
 : <p>Otherwise, <code>$arg</code>, or the context item after
 : atomization, is converted to an <code>xs:double</code> following
 : the rules of <span href="#casting-to-double"><b>18.1.2.2 Casting to
 : xs:double</b></span>. If the conversion to <code>xs:double</code>
 : fails, the <code>xs:double</code> value <code>NaN</code> is
 : returned.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup> if
 : <code>$arg</code> is omitted and the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>XSD 1.1 allows the string <code>+INF</code> as a representation
 : of positive infinity; XSD 1.0 does not. It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> whether XSD 1.1 is supported.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:number($item1/quantity)</code> returns
 : <code>5.0e0</code>.</p>
 : <p>The expression <code>fn:number($item2/description)</code>
 : returns <code>xs:double('NaN')</code>.</p>
 : <p>Assume that the context item is the <code>xs:string</code> value
 : "<code>15</code>". Then <code>fn:number()</code> returns
 : <code>1.5e1</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-number
 :)
declare function fn:number() as  xs:double external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value indicated by <code>$arg</code> or, if
 : <code>$arg</code> is not specified, the context item after
 : atomization, converted to an <code>xs:double</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:number</code>()<code class="as"> as </code><code class="return-type">xs:double</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:number</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:anyAtomicType?</code>)<code class="as"> as </code><code class="return-type">xs:double</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Calling the zero-argument version of the function is defined to
 : give the same result as calling the single-argument version with
 : the context item (<code>.</code>). That is,
 : <code>fn:number()</code> is equivalent to
 : <code>fn:number(.)</code>.</p>
 : <p>If <code>$arg</code> is the empty sequence or if
 : <code>$arg</code> or the context item cannot be converted to an
 : <code>xs:double</code>, the <code>xs:double</code> value
 : <code>NaN</code> is returned.</p>
 : <p>Otherwise, <code>$arg</code>, or the context item after
 : atomization, is converted to an <code>xs:double</code> following
 : the rules of <span href="#casting-to-double"><b>18.1.2.2 Casting to
 : xs:double</b></span>. If the conversion to <code>xs:double</code>
 : fails, the <code>xs:double</code> value <code>NaN</code> is
 : returned.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup> if
 : <code>$arg</code> is omitted and the context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>XSD 1.1 allows the string <code>+INF</code> as a representation
 : of positive infinity; XSD 1.0 does not. It is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> whether XSD 1.1 is supported.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>fn:number($item1/quantity)</code> returns
 : <code>5.0e0</code>.</p>
 : <p>The expression <code>fn:number($item2/description)</code>
 : returns <code>xs:double('NaN')</code>.</p>
 : <p>Assume that the context item is the <code>xs:string</code> value
 : "<code>15</code>". Then <code>fn:number()</code> returns
 : <code>1.5e1</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-number
 :)
declare function fn:number($arg as xs:anyAtomicType?) as  xs:double external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns every node within the input sequence that has no
 : ancestor that is itself a member of the input sequence; the nodes
 : are returned in document order with duplicates eliminated.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:outermost</code>(<code class="arg">$nodes</code><code class="as"> as </code><code class="type">node()*</code>)<code class="as"> as </code><code class="return-type">node()*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The effect of the function call
 : <code>fn:outermost($nodes)</code> is defined to be equivalent to
 : the result of the expression <code>$nodes[not(ancestor::node()
 : intersect $nodes)]</code>.</p>
 : <p>That is, the function takes as input a sequence of nodes, and
 : returns every node within the sequence that <span>does not have
 : another node within the sequence as an ancestor</span>; the nodes
 : are returned in document order with duplicates eliminated.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The formulation <code>$nodes except
 : $nodes/descendant::node()</code> might appear to be simpler, but
 : does not correctly account for attribute nodes, as these are not
 : descendants of their parent element.</p>
 : <p>The motivation for the function was based on XSLT streaming use
 : cases; there are cases where the <span href="#xslt-30">[XSL
 : Transformations (XSLT) Version 3.0]</span> streaming rules allow the
 : construct <code>outermost(//section)</code> but do not allow
 : <code>//section</code>; the function can therefore be useful in
 : cases where it is known that sections will not be nested, as well
 : as cases where the application actually wishes to process all
 : sections except those that are nested within another.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>If the source document contains nested sections represented by
 : <code>div</code> elements, the expression
 : <code>outermost(//div)</code> returns those <code>div</code>
 : elements that <span>are not contained within</span> further
 : <code>div</code> elements.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-outermost
 :)
declare function fn:outermost($nodes as node()*) as  node()* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the context position from the dynamic context.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:position</code>()<code class="as"> as </code><code class="return-type">xs:integer</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>Returns the context position from the dynamic context. (See
 : <span href="http://www.w3.org/TR/xpath-30/#id-xp-evaluation-context-components">
 : Section C.2 Dynamic Context Components</span>
 : <sup><small>XP30</small></sup>.)</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup> if the
 : context item is <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-position
 :)
declare function fn:position() as  xs:integer external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Resolves a relative IRI reference against an absolute IRI.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:resolve-uri</code>(<code class="arg">$relative</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:resolve-uri</code>(<code class="arg">$relative</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$base</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : <p>The three-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the second argument is absent, the effect is the same as
 : calling the two-argument function with the value of <span href="#func-static-base-uri"><code>fn:static-base-uri()</code></span> as
 : the second argument.</p>
 : <p>The function is defined to operate on IRI references as defined
 : in <span href="#rfc3987">[RFC 3987]</span>, and the implementation
 : <strong>must</strong> permit all arguments that are valid according
 : to that specification. In addition, the implementation
 : <strong>may</strong> accept some or all strings that conform to the
 : rules for (absolute or relative) Legacy Extended IRI references as
 : defined in <span href="#LEIRI">[Legacy extended IRIs for XML resource
 : identification]</span>. For the purposes of this section, the terms
 : IRI and IRI reference include these extensions, insofar as the
 : implementation chooses to support them.</p>
 : <p>If <code>$relative</code> is the empty sequence, the function
 : returns the empty sequence.</p>
 : <p>If <code>$relative</code> is an absolute IRI (as defined above),
 : then it is returned unchanged.</p>
 : <p>Otherwise, the function resolves the relative IRI reference
 : <code>$relative</code> against the base IRI <code>$base</code>
 : using the algorithm defined in <span href="#rfc3986">[RFC 3986]</span>,
 : adapted by treating any <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> that would not be valid in an RFC3986 URI or
 : relative reference in the same way that RFC3986 treats unreserved
 : characters. No percent-encoding takes place.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The first form of this function resolves <code>$relative</code>
 : against the value of the base-uri property from the static context.
 : An error is raised [<span href="#ERRFONS0005" title="err:FONS0005">err:FONS0005</span>] if the base-uri property is not
 : initialized in the static context.</p>
 : <p>An error is raised [<span href="#ERRFORG0002" title="err:FORG0002">err:FORG0002</span>] if <code>$relative</code> is not a
 : valid IRI according to the rules of RFC3987, extended with an
 : implementation-defined subset of the extensions permitted in LEIRI,
 : or if it is not a suitable relative reference to use as input to
 : the RFC3986 resolution algorithm extended to handle additional
 : unreserved characters.</p>
 : <p>An error is raised [<span href="#ERRFORG0002" title="err:FORG0002">err:FORG0002</span>] if <code>$base</code> is not a
 : valid IRI according to the rules of RFC3987, extended with an
 : implementation-defined subset of the extensions permitted in LEIRI,
 : or if it is not a suitable IRI to use as input to the chosen
 : resolution algorithm (for example, if it is a relative IRI
 : reference, if it is a non-hierarchic URI, or if it contains a
 : fragment identifier), then .</p>
 : <p>An error is raised [<span href="#ERRFORG0009" title="err:FORG0009">err:FORG0009</span>] if the chosen resolution algorithm
 : fails for any other reason.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Resolving a URI does not dereference it. This is merely a
 : syntactic operation on two <span title="string" class="termref" href="#string"><span class="arrow">·</span>strings<span class="arrow">·</span></span>.</p>
 : <p>The algorithms in the cited RFCs include some variations that
 : are optional or recommended rather than mandatory; they also
 : describe some common practices that are not recommended, but which
 : are permitted for backwards compatibility. Where the cited RFCs
 : permit variations in behavior, so does this specification.</p>
 : <p>Throughout this family of specifications, the phrase "resolving
 : a relative URI (or IRI) reference" should be understood as using
 : the rules of this function, unless otherwise stated.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-resolve-uri
 :)
declare function fn:resolve-uri($relative as xs:string?) as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Resolves a relative IRI reference against an absolute IRI.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:resolve-uri</code>(<code class="arg">$relative</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:resolve-uri</code>(<code class="arg">$relative</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$base</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The two-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : <p>The three-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the second argument is absent, the effect is the same as
 : calling the two-argument function with the value of <span href="#func-static-base-uri"><code>fn:static-base-uri()</code></span> as
 : the second argument.</p>
 : <p>The function is defined to operate on IRI references as defined
 : in <span href="#rfc3987">[RFC 3987]</span>, and the implementation
 : <strong>must</strong> permit all arguments that are valid according
 : to that specification. In addition, the implementation
 : <strong>may</strong> accept some or all strings that conform to the
 : rules for (absolute or relative) Legacy Extended IRI references as
 : defined in <span href="#LEIRI">[Legacy extended IRIs for XML resource
 : identification]</span>. For the purposes of this section, the terms
 : IRI and IRI reference include these extensions, insofar as the
 : implementation chooses to support them.</p>
 : <p>If <code>$relative</code> is the empty sequence, the function
 : returns the empty sequence.</p>
 : <p>If <code>$relative</code> is an absolute IRI (as defined above),
 : then it is returned unchanged.</p>
 : <p>Otherwise, the function resolves the relative IRI reference
 : <code>$relative</code> against the base IRI <code>$base</code>
 : using the algorithm defined in <span href="#rfc3986">[RFC 3986]</span>,
 : adapted by treating any <span title="character" class="termref" href="#character"><span class="arrow">·</span>character<span class="arrow">·</span></span> that would not be valid in an RFC3986 URI or
 : relative reference in the same way that RFC3986 treats unreserved
 : characters. No percent-encoding takes place.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>The first form of this function resolves <code>$relative</code>
 : against the value of the base-uri property from the static context.
 : An error is raised [<span href="#ERRFONS0005" title="err:FONS0005">err:FONS0005</span>] if the base-uri property is not
 : initialized in the static context.</p>
 : <p>An error is raised [<span href="#ERRFORG0002" title="err:FORG0002">err:FORG0002</span>] if <code>$relative</code> is not a
 : valid IRI according to the rules of RFC3987, extended with an
 : implementation-defined subset of the extensions permitted in LEIRI,
 : or if it is not a suitable relative reference to use as input to
 : the RFC3986 resolution algorithm extended to handle additional
 : unreserved characters.</p>
 : <p>An error is raised [<span href="#ERRFORG0002" title="err:FORG0002">err:FORG0002</span>] if <code>$base</code> is not a
 : valid IRI according to the rules of RFC3987, extended with an
 : implementation-defined subset of the extensions permitted in LEIRI,
 : or if it is not a suitable IRI to use as input to the chosen
 : resolution algorithm (for example, if it is a relative IRI
 : reference, if it is a non-hierarchic URI, or if it contains a
 : fragment identifier), then .</p>
 : <p>An error is raised [<span href="#ERRFORG0009" title="err:FORG0009">err:FORG0009</span>] if the chosen resolution algorithm
 : fails for any other reason.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>Resolving a URI does not dereference it. This is merely a
 : syntactic operation on two <span title="string" class="termref" href="#string"><span class="arrow">·</span>strings<span class="arrow">·</span></span>.</p>
 : <p>The algorithms in the cited RFCs include some variations that
 : are optional or recommended rather than mandatory; they also
 : describe some common practices that are not recommended, but which
 : are permitted for backwards compatibility. Where the cited RFCs
 : permit variations in behavior, so does this specification.</p>
 : <p>Throughout this family of specifications, the phrase "resolving
 : a relative URI (or IRI) reference" should be understood as using
 : the rules of this function, unless otherwise stated.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-resolve-uri
 :)
declare function fn:resolve-uri($relative as xs:string?,  $base as xs:string) as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the root of the tree to which <code>$arg</code> belongs.
 : This will usually, but not necessarily, be a document node.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:root</code>()<code class="as"> as </code><code class="return-type">node()</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:root</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">node()?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the function is called without an argument, the context item
 : (<code>.</code>) is used as the default argument. The behavior of
 : the function if the argument is omitted is exactly the same as if
 : the context item had been passed as the argument.</p>
 : <p>The function returns the value of the expression
 : <code>($arg/ancestor-or-self::node())[1]</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>When <code>$arg</code> is omitted the following errors may be
 : raised : if the context item is absent [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>These examples use some variables which could be defined in
 : <span href="#xquery">[XQuery 1.0: An XML Query Language]</span> as:</p>
 : <div class="exampleInner">
 : <pre>
 : let $i := &lt;tool&gt;wrench&lt;/tool&gt;
 : let $o := &lt;order&gt; {$i} &lt;quantity&gt;5&lt;/quantity&gt; &lt;/order&gt;
 : let $odoc := document {$o}
 : let $newi := $o/tool
 : </pre></div>
 : <p>Or they could be defined in <span href="#xslt20">[XSL
 : Transformations (XSLT) Version 2.0]</span> as:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:variable name="i" as="element()"&gt;
 :   &lt;tool&gt;wrench&lt;/tool&gt;
 : &lt;/xsl:variable&gt;
 : 
 : &lt;xsl:variable name="o" as="element()"&gt;
 :   &lt;order&gt;
 :     &lt;xsl:copy-of select="$i"/&gt;
 :     &lt;quantity&gt;5&lt;/quantity&gt;
 :   &lt;/order&gt;
 : &lt;/xsl:variable&gt;
 : 
 : &lt;xsl:variable name="odoc"&gt;
 :   &lt;xsl:copy-of select="$o"/&gt;
 : &lt;/xsl:variable&gt;
 : 
 : &lt;xsl:variable name="newi" select="$o/tool"/&gt;
 : </pre></div>
 : <p><code>fn:root($i)</code> returns the element node
 : <code>$i</code></p>
 : <p><code>fn:root($o/quantity)</code> returns the element node
 : <code>$o</code></p>
 : <p><code>fn:root($odoc//quantity)</code> returns the document node
 : <code>$odoc</code></p>
 : <p><code>fn:root($newi)</code> returns the element node
 : <code>$o</code></p>
 : <p>The final three examples could be made type-safe by wrapping
 : their operands with <span href="#func-exactly-one"><code>fn:exactly-one()</code></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-root
 :)
declare function fn:root() as  node() external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the root of the tree to which <code>$arg</code> belongs.
 : This will usually, but not necessarily, be a document node.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:root</code>()<code class="as"> as </code><code class="return-type">node()</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:root</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">node()?</code>)<code class="as"> as </code><code class="return-type">node()?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>If the function is called without an argument, the context item
 : (<code>.</code>) is used as the default argument. The behavior of
 : the function if the argument is omitted is exactly the same as if
 : the context item had been passed as the argument.</p>
 : <p>The function returns the value of the expression
 : <code>($arg/ancestor-or-self::node())[1]</code>.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>When <code>$arg</code> is omitted the following errors may be
 : raised : if the context item is absent [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup>; if
 : the context item is not a node [<span href="http://www.w3.org/TR/xpath20/#ERRXPTY0004" title="err:XPTY0004">err:XPTY0004</span>]<sup><small>XP</small></sup>.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>These examples use some variables which could be defined in
 : <span href="#xquery">[XQuery 1.0: An XML Query Language]</span> as:</p>
 : <div class="exampleInner">
 : <pre>
 : let $i := &lt;tool&gt;wrench&lt;/tool&gt;
 : let $o := &lt;order&gt; {$i} &lt;quantity&gt;5&lt;/quantity&gt; &lt;/order&gt;
 : let $odoc := document {$o}
 : let $newi := $o/tool
 : </pre></div>
 : <p>Or they could be defined in <span href="#xslt20">[XSL
 : Transformations (XSLT) Version 2.0]</span> as:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:variable name="i" as="element()"&gt;
 :   &lt;tool&gt;wrench&lt;/tool&gt;
 : &lt;/xsl:variable&gt;
 : 
 : &lt;xsl:variable name="o" as="element()"&gt;
 :   &lt;order&gt;
 :     &lt;xsl:copy-of select="$i"/&gt;
 :     &lt;quantity&gt;5&lt;/quantity&gt;
 :   &lt;/order&gt;
 : &lt;/xsl:variable&gt;
 : 
 : &lt;xsl:variable name="odoc"&gt;
 :   &lt;xsl:copy-of select="$o"/&gt;
 : &lt;/xsl:variable&gt;
 : 
 : &lt;xsl:variable name="newi" select="$o/tool"/&gt;
 : </pre></div>
 : <p><code>fn:root($i)</code> returns the element node
 : <code>$i</code></p>
 : <p><code>fn:root($o/quantity)</code> returns the element node
 : <code>$o</code></p>
 : <p><code>fn:root($odoc//quantity)</code> returns the document node
 : <code>$odoc</code></p>
 : <p><code>fn:root($newi)</code> returns the element node
 : <code>$o</code></p>
 : <p>The final three examples could be made type-safe by wrapping
 : their operands with <span href="#func-exactly-one"><code>fn:exactly-one()</code></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-root
 :)
declare function fn:root($arg as node()?) as  node()? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Despite its name, this function returns the value of the Dynamic
 : Base URI property from the dynamic context.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:static-base-uri</code>()<code class="as"> as </code><code class="return-type">xs:anyURI?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns the value of the Dynamic Base URI property
 : from the dynamic context. If the property is absent, the empty
 : sequence is returned.</p>
 : <p>Components of the dynamic context are discussed in [TITLE OF
 : XP30 SPEC, TITLE OF id-xp-eval-context
 : SECTION]<sup><small>XP30</small></sup> .</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The name of this function is misleading. In Query 1.0 and XPath
 : 2.0, no distinction was made between the static base URI and the
 : dynamic base URI; it was assumed that the location where a query is
 : compiled and the location where it is executed would be the same.
 : In the 3.0 specifications it is acknowledged that these locations
 : may be different. References to resources used during analysis (for
 : example, module location hints in XQuery) are interpreted as
 : relative to the static base URI, while references to resources used
 : during evaluation (for example, URIs passed to the <span href="#func-doc"><code>fn:doc</code></span> or <span href="#func-collection"><code>fn:collection</code></span> functions) are
 : interpreted as relative to the dynamic base URI. Since the use
 : cases for this function relate primarily to the need to locate
 : resources during evaluation, it has been defined in this release to
 : access the dynamic base URI, despite the choice of function
 : name.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-static-base-uri
 :)
declare function fn:static-base-uri() as  xs:anyURI? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of <code>$arg</code> represented as an
 : <code>xs:string</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>In the zero-argument version of the function, <code>$arg</code>
 : defaults to the context item. That is, calling
 : <code>fn:string()</code> is equivalent to calling
 : <code>fn:string(.)</code>.</p>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the zero-length string.</p>
 : <p>If <code>$arg</code> is a node, the function returns the
 : string-value of the node, as obtained using the
 : <code>dm:string-value</code> accessor defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>
 : (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-string-value">Section
 : 5.13 string-value Accessor</span> <sup><small>DM30</small></sup>).</p>
 : <p>If <code>$arg</code> is an atomic value, the function returns
 : the result of the expression <code>$arg cast as xs:string</code>
 : (see <span href="#casting"><b>18 Casting</b></span>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup> by the
 : zero-argument version of the function if the context item is
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : <p>An error is raised [<span href="#ERRFOTY0014" title="err:FOTY0014">err:FOTY0014</span>] if <code>$arg</code> is a function
 : item.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>string(23)</code> returns
 : <code>"23"</code>.</p>
 : <p>The expression <code>string(false())</code> returns
 : <code>"false"</code>.</p>
 : <p>The expression <code>string("Paris")</code> returns
 : <code>"Paris"</code>.</p>
 : <p>The expression <code>string(abs#1)</code> raises error
 : <code>FOTY0014</code>.</p>
 : <p>let <code>$para</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;para&gt;In a hole in the ground there lived a &lt;term author="Tolkein"&gt;hobbit&lt;/term&gt;.&lt;/para&gt;
 :          
 : </pre></div>
 : <p>The expression <code>string($para)</code> returns <code>"In a
 : hole in the ground there lived a hobbit."</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-string
 :)
declare function fn:string() as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of <code>$arg</code> represented as an
 : <code>xs:string</code>.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string</code>()<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:string</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">item()?</code>)<code class="as"> as </code><code class="return-type">xs:string</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>The zero-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-dependent"><span class="arrow">·</span>focus-dependent<span class="arrow">·</span></span>.</p>
 : <p>The one-argument form of this function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-independent" class="termref" href="#dt-context-independent"><span class="arrow">·</span>context-independent<span class="arrow">·</span></span>, and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>In the zero-argument version of the function, <code>$arg</code>
 : defaults to the context item. That is, calling
 : <code>fn:string()</code> is equivalent to calling
 : <code>fn:string(.)</code>.</p>
 : <p>If <code>$arg</code> is the empty sequence, the function returns
 : the zero-length string.</p>
 : <p>If <code>$arg</code> is a node, the function returns the
 : string-value of the node, as obtained using the
 : <code>dm:string-value</code> accessor defined in <span href="#xpath-datamodel-30">[XQuery and XPath Data Model (XDM) 3.0]</span>
 : (see <span href="http://www.w3.org/TR/xpath-datamodel-30/#dm-string-value">Section
 : 5.13 string-value Accessor</span> <sup><small>DM30</small></sup>).</p>
 : <p>If <code>$arg</code> is an atomic value, the function returns
 : the result of the expression <code>$arg cast as xs:string</code>
 : (see <span href="#casting"><b>18 Casting</b></span>).</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="http://www.w3.org/TR/xpath20/#ERRXPDY0002" title="err:XPDY0002">err:XPDY0002</span>]<sup><small>XP</small></sup> by the
 : zero-argument version of the function if the context item is
 : <span href="http://www.w3.org/TR/xpath-datamodel-30/#dt-absent">absent</span><sup><small>DM30</small></sup>.</p>
 : <p>An error is raised [<span href="#ERRFOTY0014" title="err:FOTY0014">err:FOTY0014</span>] if <code>$arg</code> is a function
 : item.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>The expression <code>string(23)</code> returns
 : <code>"23"</code>.</p>
 : <p>The expression <code>string(false())</code> returns
 : <code>"false"</code>.</p>
 : <p>The expression <code>string("Paris")</code> returns
 : <code>"Paris"</code>.</p>
 : <p>The expression <code>string(abs#1)</code> raises error
 : <code>FOTY0014</code>.</p>
 : <p>let <code>$para</code> :=</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;para&gt;In a hole in the ground there lived a &lt;term author="Tolkein"&gt;hobbit&lt;/term&gt;.&lt;/para&gt;
 :          
 : </pre></div>
 : <p>The expression <code>string($para)</code> returns <code>"In a
 : hole in the ground there lived a hobbit."</code>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-string
 :)
declare function fn:string($arg as item()?) as  xs:string external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a list of environment variable names that are suitable
 : for passing to <span href="#func-environment-variable"><code>fn:environment-variable</code></span>,
 : as a (possibly empty) sequence of strings.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:available-environment-variables</code>()<code class="as"> as </code><code class="return-type">xs:string*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on environment-variables.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The function returns a sequence of strings, being the names of
 : the environment variables in the dynamic context in some <span title="implementation dependent" class="termref" href="#implementation-dependent"><span class="arrow">·</span>implementation-dependent<span class="arrow">·</span></span> order.</p>
 : <p>The function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>: that
 : is, the set of available environment variables does not vary during
 : evaluation.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>The function returns a list of strings, containing no
 : duplicates.</p>
 : <p>It is intended that the strings in this list should be suitable
 : for passing to <span href="#func-environment-variable"><code>fn:environment-variable</code></span>.</p>
 : <p>See also the note on security under the definition of the
 : <span href="#func-environment-variable"><code>fn:environment-variable</code></span>
 : function. If access to environment variables has been disabled,
 : <code>fn:available-environment-variables</code> always returns the
 : empty sequence.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-available-environment-variables
 :)
declare function fn:available-environment-variables() as  xs:string* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns the value of a system environment variable, if it
 : exists.</p>
 : </dd>
 : <dt class="label">Signature</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:environment-variable</code>(<code class="arg">$name</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on environment-variables.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The set of available <span href="http://www.w3.org/TR/xpath-30/#dt-environment-variables">environment
 : variables</span><sup><small>XP30</small></sup> is a set of (name,
 : value) pairs forming part of the dynamic context, in which the name
 : is unique within the set of pairs. The name and value are arbitrary
 : strings.</p>
 : <p>If the <code>$name</code> argument matches the name of one of
 : these pairs, the function returns the corresponding value.</p>
 : <p>If there is no environment variable with a matching name, the
 : function returns the empty sequence.</p>
 : <p>The collation used for matching names is <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span>, but must be the same as the collation used to
 : ensure that the names of all environment variables are unique.</p>
 : <p>The function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : which means that if it is called several times within the same
 : <span title="" class="termref" href="#"><span class="arrow">·</span>execution scope<span class="arrow">·</span></span>,
 : with the same arguments, it must return the same result.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>On many platforms, the term "environment variable" has a natural
 : meaning in terms of facilities provided by the operating system.
 : This interpretation of the concept does not exclude other
 : interpretations, such as a mapping to a set of configuration
 : parameters in a database system.</p>
 : <p>Environment variable names are usually case sensitive. Names are
 : usually of the form <code>(letter|_) (letter|_|digit)*</code>, but
 : this varies by platform.</p>
 : <p>On some platforms, there may sometimes be multiple environment
 : variables with the same name; in this case, it is
 : implementation-dependent as to which is returned; see for example
 : <span href="#POSIX.1-2008">[POSIX.1-2008]</span> (Chapter 8, Environment
 : Variables). Implementations <strong>may</strong> use prefixes or
 : other naming conventions to disambiguate the names.</p>
 : <p>The requirement to ensure that the function is deterministic
 : means in practice that the implementation must make a snapshot of
 : the environment variables at some time during execution, and return
 : values obtained from this snapshot, rather than using live values
 : that are subject to change at any time.</p>
 : <p>Operating system environment variables may be associated with a
 : particular process, while queries and stylesheets may execute
 : across multiple processes (or multiple machines). In such
 : circumstances implementations <strong>may</strong> choose to
 : provide access to the environment variables associated with the
 : process in which the query or stylesheet processing was
 : initiated.</p>
 : <p>Security advice: Queries from untrusted sources should not be
 : permitted unrestricted access to environment variables. For
 : example, the name of the account under which the query is running
 : may be useful information to a would-be intruder. An implementation
 : may therefore choose to restrict access to the environment, or may
 : provide a facility to make <code>fn:environment-variable</code>
 : always return the empty sequence.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-environment-variable
 :)
declare function fn:environment-variable($arg as xs:string) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>The <code>fn:unparsed-text</code> function reads an external
 : resource (for example, a file) and returns its contents as a
 : string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$encoding</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>$href</code> argument <strong>must</strong> be a
 : string in the form of a URI reference, which <strong>must</strong>
 : contain no fragment identifier, and <strong>must</strong> identify
 : a resource that can be read as text. If the URI is a relative URI
 : reference, then it is resolved relative to the <span>Dynamic Base
 : URI property from the dynamic context</span>.</p>
 : <p>If the value of the <code>$href</code> argument is an empty
 : sequence, the function returns an empty sequence.</p>
 : <p>The <code>$encoding</code> argument, if present, is the name of
 : an encoding. The values for this attribute follow the same rules as
 : for the <code>encoding</code> attribute in an XML declaration. The
 : only values which every <span title="" class="termref" href="#"><span class="arrow">·</span>implementation<span class="arrow">·</span></span> is <strong>required</strong> to recognize are
 : <code>utf-8</code> and <code>utf-16</code>.</p>
 : <p>The encoding of the external resource is determined as
 : follows:</p>
 : <ol class="enumar">
 : <li>
 : <p>external encoding information is used if available,
 : otherwise</p>
 : </li>
 : <li>
 : <p>if the media type of the resource is <code>text/xml</code> or
 : <code>application/xml</code> (see <span href="#rfc2376">[RFC
 : 2376]</span>), or if it matches the conventions
 : <code>text/*+xml</code> or <code>application/*+xml</code> (see
 : <span href="#rfc3023">[RFC 3023]</span> and/or its successors), then the
 : encoding is recognized as specified in <span href="#REC-xml">[REC-xml]</span>, otherwise</p>
 : </li>
 : <li>
 : <p>the value of the <code>$encoding</code> argument is used if
 : present, otherwise</p>
 : </li>
 : <li>
 : <p>the processor <strong>may</strong> use <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> heuristics to determine the likely encoding,
 : otherwise</p>
 : </li>
 : <li>
 : <p>UTF-8 is assumed.</p>
 : </li>
 : </ol>
 : <p>The result of the function is a string containing the text of
 : the resource retrieved using the URI.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOUT1170" title="err:FOUT1170">err:FOUT1170</span>] if <code>$href</code> contains a
 : fragment identifier, or if it cannot be used to retrieve a resource
 : containing text.</p>
 : <p>An error is raised [<span href="#ERRFOUT1190" title="err:FOUT1190">err:FOUT1190</span>] if the retrieved resource contains
 : octets that cannot be decoded into Unicode <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> using
 : the specified encoding, or if the resulting characters are not
 : permitted XML characters. This includes the case where the
 : <span title="" class="termref" href="#"><span class="arrow">·</span>processor<span class="arrow">·</span></span> does not
 : support the requested encoding.</p>
 : <p>An error is raised [<span href="#ERRFOUT1200" title="err:FOUT1200">err:FOUT1200</span>] if <code>$encoding</code> is
 : absent and the <span title="" class="termref" href="#"><span class="arrow">·</span>processor<span class="arrow">·</span></span> cannot
 : infer the encoding using external information and the encoding is
 : not UTF-8.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If it is appropriate to use a base URI other than the
 : <span>dynamic</span> base URI (for example, when resolving a
 : relative URI reference read from a source document) then it is
 : advisable to resolve the relative URI reference using the <span href="#func-resolve-uri"><code>fn:resolve-uri</code></span> function before
 : passing it to the <code>fn:unparsed-text</code> function.</p>
 : <p>The rules for determining the encoding are chosen for
 : consistency with <span href="#xinclude">[XML Inclusions (XInclude)
 : Version 1.0 (Second Edition)]</span>. Files with an XML media type are
 : treated specially because there are use cases for this function
 : where the retrieved text is to be included as unparsed XML within a
 : CDATA section of a containing document, and because processors are
 : likely to be able to reuse the code that performs encoding
 : detection for XML external entities.</p>
 : <p>If the text file contains characters such as <code>&lt;</code>
 : and <code>&amp;</code>, these will typically be output as
 : <code>&amp;lt;</code> and <code>&amp;amp;</code> if the string is
 : serialized as XML or HTML. If these characters actually represent
 : markup (for example, if the text file contains HTML), then an XSLT
 : stylesheet can attempt to write them as markup to the output file
 : using the <code>disable-output-escaping</code> attribute of the
 : <code>xsl:value-of</code> instruction. Note, however, that XSLT
 : implementations are not required to support this feature.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>This XSLT example attempts to read a file containing
 : 'boilerplate' HTML and copy it directly to the serialized output
 : file:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:output method="html"/&gt;
 : 
 : &lt;xsl:template match="/"&gt;
 :   &lt;xsl:value-of select="unparsed-text('header.html', 'iso-8859-1')"
 :                 disable-output-escaping="yes"/&gt;
 :   &lt;xsl:apply-templates/&gt;
 :   &lt;xsl:value-of select="unparsed-text('footer.html', 'iso-8859-1')"
 :                 disable-output-escaping="yes"/&gt;
 : &lt;/xsl:template&gt;
 : </pre></div>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text
 :)
declare function fn:unparsed-text($href as xs:string?) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>The <code>fn:unparsed-text</code> function reads an external
 : resource (for example, a file) and returns its contents as a
 : string.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>, <code class="arg">$encoding</code><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string?</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>$href</code> argument <strong>must</strong> be a
 : string in the form of a URI reference, which <strong>must</strong>
 : contain no fragment identifier, and <strong>must</strong> identify
 : a resource that can be read as text. If the URI is a relative URI
 : reference, then it is resolved relative to the <span>Dynamic Base
 : URI property from the dynamic context</span>.</p>
 : <p>If the value of the <code>$href</code> argument is an empty
 : sequence, the function returns an empty sequence.</p>
 : <p>The <code>$encoding</code> argument, if present, is the name of
 : an encoding. The values for this attribute follow the same rules as
 : for the <code>encoding</code> attribute in an XML declaration. The
 : only values which every <span title="" class="termref" href="#"><span class="arrow">·</span>implementation<span class="arrow">·</span></span> is <strong>required</strong> to recognize are
 : <code>utf-8</code> and <code>utf-16</code>.</p>
 : <p>The encoding of the external resource is determined as
 : follows:</p>
 : <ol class="enumar">
 : <li>
 : <p>external encoding information is used if available,
 : otherwise</p>
 : </li>
 : <li>
 : <p>if the media type of the resource is <code>text/xml</code> or
 : <code>application/xml</code> (see <span href="#rfc2376">[RFC
 : 2376]</span>), or if it matches the conventions
 : <code>text/*+xml</code> or <code>application/*+xml</code> (see
 : <span href="#rfc3023">[RFC 3023]</span> and/or its successors), then the
 : encoding is recognized as specified in <span href="#REC-xml">[REC-xml]</span>, otherwise</p>
 : </li>
 : <li>
 : <p>the value of the <code>$encoding</code> argument is used if
 : present, otherwise</p>
 : </li>
 : <li>
 : <p>the processor <strong>may</strong> use <span title="implementation-defined" class="termref" href="#implementation-defined"><span class="arrow">·</span>implementation-defined<span class="arrow">·</span></span> heuristics to determine the likely encoding,
 : otherwise</p>
 : </li>
 : <li>
 : <p>UTF-8 is assumed.</p>
 : </li>
 : </ol>
 : <p>The result of the function is a string containing the text of
 : the resource retrieved using the URI.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFOUT1170" title="err:FOUT1170">err:FOUT1170</span>] if <code>$href</code> contains a
 : fragment identifier, or if it cannot be used to retrieve a resource
 : containing text.</p>
 : <p>An error is raised [<span href="#ERRFOUT1190" title="err:FOUT1190">err:FOUT1190</span>] if the retrieved resource contains
 : octets that cannot be decoded into Unicode <span title="character" class="termref" href="#character"><span class="arrow">·</span>characters<span class="arrow">·</span></span> using
 : the specified encoding, or if the resulting characters are not
 : permitted XML characters. This includes the case where the
 : <span title="" class="termref" href="#"><span class="arrow">·</span>processor<span class="arrow">·</span></span> does not
 : support the requested encoding.</p>
 : <p>An error is raised [<span href="#ERRFOUT1200" title="err:FOUT1200">err:FOUT1200</span>] if <code>$encoding</code> is
 : absent and the <span title="" class="termref" href="#"><span class="arrow">·</span>processor<span class="arrow">·</span></span> cannot
 : infer the encoding using external information and the encoding is
 : not UTF-8.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>If it is appropriate to use a base URI other than the
 : <span>dynamic</span> base URI (for example, when resolving a
 : relative URI reference read from a source document) then it is
 : advisable to resolve the relative URI reference using the <span href="#func-resolve-uri"><code>fn:resolve-uri</code></span> function before
 : passing it to the <code>fn:unparsed-text</code> function.</p>
 : <p>The rules for determining the encoding are chosen for
 : consistency with <span href="#xinclude">[XML Inclusions (XInclude)
 : Version 1.0 (Second Edition)]</span>. Files with an XML media type are
 : treated specially because there are use cases for this function
 : where the retrieved text is to be included as unparsed XML within a
 : CDATA section of a containing document, and because processors are
 : likely to be able to reuse the code that performs encoding
 : detection for XML external entities.</p>
 : <p>If the text file contains characters such as <code>&lt;</code>
 : and <code>&amp;</code>, these will typically be output as
 : <code>&amp;lt;</code> and <code>&amp;amp;</code> if the string is
 : serialized as XML or HTML. If these characters actually represent
 : markup (for example, if the text file contains HTML), then an XSLT
 : stylesheet can attempt to write them as markup to the output file
 : using the <code>disable-output-escaping</code> attribute of the
 : <code>xsl:value-of</code> instruction. Note, however, that XSLT
 : implementations are not required to support this feature.</p>
 : </dd>
 : <dt class="label">Examples</dt>
 : <dd>
 : <p>This XSLT example attempts to read a file containing
 : 'boilerplate' HTML and copy it directly to the serialized output
 : file:</p>
 : <div class="exampleInner">
 : <pre>
 : &lt;xsl:output method="html"/&gt;
 : 
 : &lt;xsl:template match="/"&gt;
 :   &lt;xsl:value-of select="unparsed-text('header.html', 'iso-8859-1')"
 :                 disable-output-escaping="yes"/&gt;
 :   &lt;xsl:apply-templates/&gt;
 :   &lt;xsl:value-of select="unparsed-text('footer.html', 'iso-8859-1')"
 :                 disable-output-escaping="yes"/&gt;
 : &lt;/xsl:template&gt;
 : </pre></div>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text
 :)
declare function fn:unparsed-text($href as xs:string?,  $encoding as xs:string) as  xs:string? external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Because errors in evaluating the <code>fn:unparsed-text</code>
 : function are non-recoverable, these two functions are provided to
 : allow an application to determine whether a call with particular
 : arguments would succeed.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text-available</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:unparsed-text-available</code>(</td>
 : <td valign="baseline"><code class="arg">$href</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$encoding</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>fn:unparsed-text-available</code> function determines
 : whether a call on the <code>fn:unparsed-text</code> function with
 : identical arguments would return a string.</p>
 : <p>If the first argument is an empty sequence, the function returns
 : false. If the second argument is an empty sequence, the function
 : behaves as if the second argument were omitted.</p>
 : <p>In other cases, the function returns true if a call on
 : <code>fn:unparsed-text</code> with the same arguments would
 : succeed, and false if a call on <code>fn:unparsed-text</code> with
 : the same arguments would fail with a non-recoverable dynamic
 : error.</p>
 : <p>The functions <code>fn:unparsed-text</code> and
 : <code>fn:unparsed-text-available</code> have the same requirement
 : for <span title="" class="termref" href="#"><span class="arrow">·</span>determinism<span class="arrow">·</span></span> as the
 : functions <span href="#func-doc"><code>fn:doc</code></span> and <span href="#func-doc-available"><code>fn:doc-available</code></span>. This means
 : that unless the user has explicitly stated a requirement for a
 : reduced level of determinism, either of these functions if called
 : twice with the same arguments during the course of a transformation
 : <strong>must</strong> return the same results each time; moreover,
 : the results of a call on <code>fn:unparsed-text-available</code>
 : <strong>must</strong> be consistent with the results of a
 : subsequent call on <code>unparsed-text</code> with the same
 : arguments.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This requires that the <code>unparsed-text-available</code>
 : function should actually attempt to read the resource identified by
 : the URI, and check that it is correctly encoded and contains no
 : characters that are invalid in XML. Implementations may avoid the
 : cost of repeating these checks for example by caching the validated
 : contents of the resource, to anticipate a subsequent call on the
 : <code>unparsed-text</code> <span>or
 : <code>unparsed-text-lines</code></span> function. Alternatively,
 : implementations may be able to rewrite an expression such as
 : <code>if (unparsed-text-available(A)) then unparsed-text(A) else
 : ...</code> to generate a single call internally.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text-available
 :)
declare function fn:unparsed-text-available($href as xs:string?) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>The <code>fn:unparsed-text-lines</code> function reads an
 : external resource (for example, a file) and returns its contents as
 : a sequence of strings, one for each line of text in the file.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text-lines</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:unparsed-text-lines</code>(</td>
 : <td valign="baseline"><code class="arg">$href</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$encoding</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:string*</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>unparsed-text-lines</code> function reads an external
 : resource (for example, a file) and returns its contents as a
 : sequence of strings, separated at newline boundaries.</p>
 : <p>The result of the single-argument function is the same as the
 : result of the expression <span href="#func-tokenize"><code>fn:tokenize(fn:unparsed-text($href),
 : '\r\n|\r|\n')[not(position()=last() and .='')]</code></span>. The
 : result of the two-argument function is the same as the result of
 : the expression <span href="#func-tokenize"><code>fn:tokenize(fn:unparsed-text($href,
 : $encoding), '\r\n|\r|\n'))[not(position()=last() and
 : .='')]</code></span>.</p>
 : <p>The result is a thus a sequence of strings containing the text
 : of the resource retrieved using the URI, each string representing
 : one line of text. Lines are separated by one of the sequences x0A,
 : x0D, or x0Dx0A. The characters representing the newline are not
 : included in the returned strings. If there are two adjacent newline
 : sequences, a zero-length string will be returned to represent the
 : empty line; but if the external resource ends with a newline
 : sequence, no zero-length string will be returned as the last item
 : in the result.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>Error conditions are the same as for the <span href="#func-unparsed-text"><code>fn:unparsed-text</code></span>
 : function.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>See the notes for <span href="#func-unparsed-text"><code>fn:unparsed-text</code></span>.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text-lines
 :)
declare function fn:unparsed-text-lines(	$href	 as xs:string?,  $encoding	 as xs:string) as  xs:string* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Because errors in evaluating the <code>fn:unparsed-text</code>
 : function are non-recoverable, these two functions are provided to
 : allow an application to determine whether a call with particular
 : arguments would succeed.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:unparsed-text-available</code>(<code class="arg">$href</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto">
 : <table border="0" cellpadding="0" cellspacing="0" summary="Function/operator prototype">
 : <tr>
 : <td valign="baseline" rowspan="2"><code class="function">fn:unparsed-text-available</code>(</td>
 : <td valign="baseline"><code class="arg">$href</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string?</code>,</td>
 : </tr>
 : <tr>
 : <td valign="baseline"><code class="arg">$encoding</code></td>
 : <td valign="baseline"><code class="as"> as </code><code class="type">xs:string</code>)<code class="as"> as </code><code class="return-type">xs:boolean</code></td>
 : </tr>
 : </table>
 : </div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on base-uri.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>The <code>fn:unparsed-text-available</code> function determines
 : whether a call on the <code>fn:unparsed-text</code> function with
 : identical arguments would return a string.</p>
 : <p>If the first argument is an empty sequence, the function returns
 : false. If the second argument is an empty sequence, the function
 : behaves as if the second argument were omitted.</p>
 : <p>In other cases, the function returns true if a call on
 : <code>fn:unparsed-text</code> with the same arguments would
 : succeed, and false if a call on <code>fn:unparsed-text</code> with
 : the same arguments would fail with a non-recoverable dynamic
 : error.</p>
 : <p>The functions <code>fn:unparsed-text</code> and
 : <code>fn:unparsed-text-available</code> have the same requirement
 : for <span title="" class="termref" href="#"><span class="arrow">·</span>determinism<span class="arrow">·</span></span> as the
 : functions <span href="#func-doc"><code>fn:doc</code></span> and <span href="#func-doc-available"><code>fn:doc-available</code></span>. This means
 : that unless the user has explicitly stated a requirement for a
 : reduced level of determinism, either of these functions if called
 : twice with the same arguments during the course of a transformation
 : <strong>must</strong> return the same results each time; moreover,
 : the results of a call on <code>fn:unparsed-text-available</code>
 : <strong>must</strong> be consistent with the results of a
 : subsequent call on <code>unparsed-text</code> with the same
 : arguments.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p>This requires that the <code>unparsed-text-available</code>
 : function should actually attempt to read the resource identified by
 : the URI, and check that it is correctly encoded and contains no
 : characters that are invalid in XML. Implementations may avoid the
 : cost of repeating these checks for example by caching the validated
 : contents of the resource, to anticipate a subsequent call on the
 : <code>unparsed-text</code> <span>or
 : <code>unparsed-text-lines</code></span> function. Alternatively,
 : implementations may be able to rewrite an expression such as
 : <code>if (unparsed-text-available(A)) then unparsed-text(A) else
 : ...</code> to generate a single call internally.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-unparsed-text-available
 :)
declare function fn:unparsed-text-available(	$href	 as xs:string?,  $encoding	 as xs:string) as  xs:boolean external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of <code>xs:anyURI</code> values representing
 : the document URIs of the documents in a collection.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:uri-collection</code>()<code class="as"> as </code><code class="return-type">xs:anyURI*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:uri-collection</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on available-collections.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>A collection, as returned by the <code>fn:collection</code>
 : function, is in general a sequence of nodes. Some of these nodes
 : may be document nodes, and some of these document nodes may have a
 : non-empty document URI, accessible using the
 : <code>fn:document-uri</code> function. The
 : <code>fn:uri-collection</code> function returns a sequence of URIs,
 : being the document URIs of those nodes in the collection that are
 : document nodes and that have a document URI (other nodes in the
 : collection are ignored). That is, in the absence of errors,
 : <code>fn:uri-collection(X)</code> returns the same set of URIs as
 : <span href="#func-collection"><code>fn:collection(X)/fn:document-uri()</code></span>,
 : though not necessarily in the same order.</p>
 : <p>The purpose in providing the function, however, is to allow the
 : URIs of the documents in a collection to be retrieved without
 : incurring the cost (which might be significant in some
 : implementations) of dereferencing the URIs to obtain the actual
 : nodes. Where required, the returned URIs can then be dereferenced
 : by calling the <code>fn:doc</code> function.</p>
 : <p>The zero-argument form of the function returns the document URIs
 : of the document nodes in the default collection.</p>
 : <p>The single-argument form returns the document URIs of the
 : document nodes in the collection with a given collection URI. If
 : the value of the argument is an empty sequence, the action is as
 : for the zero-argument form of the function. If the argument is a
 : relative URI reference, it is resolved against the <span>Dynamic
 : Base URI property from the dynamic context</span>.</p>
 : <p>There is no requirement that the nodes in a collection should
 : all be distinct, and therefore no requirement that the URIs in the
 : result of this function should all be distinct.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if no URI is supplied and the
 : value of the default collection is absent.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <b>available collections</b>
 : provides no mapping for the absolutized URI.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <code>$arg</code> is not a
 : valid <code>xs:anyURI</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p><em>This explanation of the function is confusing and needs to
 : be improved: it is the subject of an open bug report (<span href="https://www.w3.org/Bugs/Public/show_bug.cgi?id=14971">#14971</span>).
 : In particular, the description of how it works is not supportive
 : one of the use cases, which is to access a collection of unparsed
 : text files.</em></p>
 : <p>There are several reasons it might be appriopriate to retrieve
 : the URIs of the documents in a collection without retrieving the
 : documents themselves. For example:</p>
 : <ul>
 : <li>
 : <p>In XSLT it allows the documents to be processed in streaming
 : mode using the <code>xsl:stream</code> instruction.</p>
 : </li>
 : <li>
 : <p>It allows recovery from failures to read, parse, or validate
 : individual documents, by calling the <span href="#func-doc"><code>fn:doc</code></span> function within the scope of
 : try/catch.</p>
 : </li>
 : <li>
 : <p>It allows selection of which documents to read based on their
 : URI, for example they can be filtered to select those whose URIs
 : end in <code>.xml</code>.</p>
 : </li>
 : </ul>
 : <p>However, there may be collections that cannot be processed in
 : this way: specifically, those that contain nodes other than
 : document nodes, and those that contain document nodes having no
 : document URI.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-uri-collection
 :)
declare function fn:uri-collection() as  xs:anyURI* external;
 
(:~
 : <dl xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.w3.org/1999/xhtml">
 : <dt class="label"/>
 : <dd>
 : <p>Returns a sequence of <code>xs:anyURI</code> values representing
 : the document URIs of the documents in a collection.</p>
 : </dd>
 : <dt class="label">Signatures</dt>
 : <dd>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:uri-collection</code>()<code class="as"> as </code><code class="return-type">xs:anyURI*</code></div>
 : </div>
 : <div class="exampleInner">
 : <div class="proto"><code class="function">fn:uri-collection</code>(<code class="arg">$arg</code><code class="as"> as </code><code class="type">xs:string?</code>)<code class="as"> as </code><code class="return-type">xs:anyURI*</code></div>
 : </div>
 : </dd>
 : <dt class="label">Properties</dt>
 : <dd>
 : <p>This function is <span title="deterministic" class="termref" href="#dt-deterministic"><span class="arrow">·</span>deterministic<span class="arrow">·</span></span>,
 : <span title="context-dependent" class="termref" href="#dt-context-dependent"><span class="arrow">·</span>context-dependent<span class="arrow">·</span></span>,
 : and <span title="focus-dependent" class="termref" href="#dt-focus-independent"><span class="arrow">·</span>focus-independent<span class="arrow">·</span></span>.
 : It depends on available-collections.</p>
 : </dd>
 : <dt class="label">Rules</dt>
 : <dd>
 : <p>A collection, as returned by the <code>fn:collection</code>
 : function, is in general a sequence of nodes. Some of these nodes
 : may be document nodes, and some of these document nodes may have a
 : non-empty document URI, accessible using the
 : <code>fn:document-uri</code> function. The
 : <code>fn:uri-collection</code> function returns a sequence of URIs,
 : being the document URIs of those nodes in the collection that are
 : document nodes and that have a document URI (other nodes in the
 : collection are ignored). That is, in the absence of errors,
 : <code>fn:uri-collection(X)</code> returns the same set of URIs as
 : <span href="#func-collection"><code>fn:collection(X)/fn:document-uri()</code></span>,
 : though not necessarily in the same order.</p>
 : <p>The purpose in providing the function, however, is to allow the
 : URIs of the documents in a collection to be retrieved without
 : incurring the cost (which might be significant in some
 : implementations) of dereferencing the URIs to obtain the actual
 : nodes. Where required, the returned URIs can then be dereferenced
 : by calling the <code>fn:doc</code> function.</p>
 : <p>The zero-argument form of the function returns the document URIs
 : of the document nodes in the default collection.</p>
 : <p>The single-argument form returns the document URIs of the
 : document nodes in the collection with a given collection URI. If
 : the value of the argument is an empty sequence, the action is as
 : for the zero-argument form of the function. If the argument is a
 : relative URI reference, it is resolved against the <span>Dynamic
 : Base URI property from the dynamic context</span>.</p>
 : <p>There is no requirement that the nodes in a collection should
 : all be distinct, and therefore no requirement that the URIs in the
 : result of this function should all be distinct.</p>
 : </dd>
 : <dt class="label">Error Conditions</dt>
 : <dd>
 : <p>An error is raised [<span href="#ERRFODC0002" title="err:FODC0002">err:FODC0002</span>] if no URI is supplied and the
 : value of the default collection is absent.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <b>available collections</b>
 : provides no mapping for the absolutized URI.</p>
 : <p>An error is raised [<span href="#ERRFODC0004" title="err:FODC0004">err:FODC0004</span>] if <code>$arg</code> is not a
 : valid <code>xs:anyURI</code>.</p>
 : </dd>
 : <dt class="label">Notes</dt>
 : <dd>
 : <p><em>This explanation of the function is confusing and needs to
 : be improved: it is the subject of an open bug report (<span href="https://www.w3.org/Bugs/Public/show_bug.cgi?id=14971">#14971</span>).
 : In particular, the description of how it works is not supportive
 : one of the use cases, which is to access a collection of unparsed
 : text files.</em></p>
 : <p>There are several reasons it might be appriopriate to retrieve
 : the URIs of the documents in a collection without retrieving the
 : documents themselves. For example:</p>
 : <ul>
 : <li>
 : <p>In XSLT it allows the documents to be processed in streaming
 : mode using the <code>xsl:stream</code> instruction.</p>
 : </li>
 : <li>
 : <p>It allows recovery from failures to read, parse, or validate
 : individual documents, by calling the <span href="#func-doc"><code>fn:doc</code></span> function within the scope of
 : try/catch.</p>
 : </li>
 : <li>
 : <p>It allows selection of which documents to read based on their
 : URI, for example they can be filtered to select those whose URIs
 : end in <code>.xml</code>.</p>
 : </li>
 : </ul>
 : <p>However, there may be collections that cannot be processed in
 : this way: specifically, those that contain nodes other than
 : document nodes, and those that contain document nodes having no
 : document URI.</p>
 : </dd>
 : </dl> 
 :
 : @see http://www.w3.org/TR/xpath-functions-30/#func-uri-collection
 :)
declare function fn:uri-collection($arg as xs:string?) as  xs:anyURI* external;
