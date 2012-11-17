xquery version "3.0";

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
 : This module can be used for sending emails.
 :
 : The SMTP module contains only one public function that receives two parameters.
 : The SMTP server access information passed as an <code>hostInfo</code> element
 : and the email message representation as a <code>message</code> element.
 : For a quick start see the examples associates with the <code>send(...)</code>
 : function. For a complete specification read, the description and the
 : documentation associated with this function.
 :
 : @author Sorin Nasoi, Daniel Thomas
 : @library <a href="http://www.washington.edu/imap/">c-client Library part of UW IMAP toolkit</a>
 : @project communication
 :)
module namespace smtp = "http://www.zorba-xquery.com/modules/email/smtp";

import schema namespace email = 'http://www.zorba-xquery.com/modules/email';

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : This function sends an email message from the specified account.
 :
 : The <code>hostName</code> child element of <code>$host-info</code> must have the form:
 : <code><b>remote_system_name</b> [":" <b>port</b>] [<b>flags</b>]</code>. This syntax is part of the
 : <a href="http://www.washington.edu/imap/documentation/naming.txt.html" target="_blank">Remote names</a>
 : syntax defined in the UW IMAP toolkit. The <code><b>remote_system_name</b></code> and
 : <code><b>flags</b></code> fragments are explained in the section <code>III</code> of this document.
 :
 : For example the hostName could look like:
 : <ul>
 :   <li><code>&lt;hostName&gt;smtp.gmail.com:587/tls/novalidate-cert&lt;hostName&gt;</code></li>
 :   <li><code>&lt;hostName&gt;[209.85.129.111]:587/tls/novalidate-cert&lt;hostName&gt;</code></li>
 : </ul>
 :
 : The <code>$host-info</code> parameter could then look like this:
 : <pre>
 : &lt;hostInfo&gt;
 : &lt;hostName&gt;smtp.gmail.com:587/tls/novalidate-cert&lt;hostName&gt;
 : &lt;userName&gt;username&lt;userName&gt;
 : &lt;password&gt;password&lt;password&gt;
 : &lt;/hostInfo&gt;
 : </pre>
 :
 : For a complete of the structure of an email message, see the imported email
 : schema: <code>http://www.zorba-xquery.com/modules/email</code>
 :
 : All the data passed to this function does not need to be validated.
 : The only requirement is that they have a valid format and are in the
 : correct namespace according to the schema:
 : <code>http://www.zorba-xquery.com/modules/email</code>.
 : 
 : @param $host-info The SMTP host, user name, and password.
 : @param $message The message to send as defined in the email XML schema.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error smtp:SMTP0001 The message format is invalid.
 : @error smtp:SMTP0002 The message has no recipient.
 : @error smtp:SMTP0003 The message could not be sent.
 : @error smtp:SMTP9999 If any other error occurs.
 : @error err:XQDY0027 If the values of the arguments are not not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/smtp/simple_text.xq
 : @example examples/Queries/smtp/text_with_image.xq
 : @example examples/Queries/smtp/html.xq
 :)
declare %an:sequential function smtp:send(
    $host-info as element(email:hostInfo),
    $message as element(email:message))
  as empty-sequence()
{
  smtp:send-impl(validate{$host-info}, validate{$message})
}; 

declare %private %an:sequential function smtp:send-impl($host-info as element(email:hostInfo), $message as element(email:message)) as empty-sequence() external;
