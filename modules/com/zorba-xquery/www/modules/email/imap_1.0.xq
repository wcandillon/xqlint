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
 : This module provides functions for accessing and manipulating emails on mail
 : servers through the IMAP protocol.
 :
 : All functions in this module receive as the first argument the IMAP host and user
 : information. This is an element with the type <code>hostInfoType</code> as defined
 : in the email schema: <code>http://www.zorba-xquery.com/modules/email</code>.
 :
 : For example:
 : <pre>
 : &lt;email:hostInfo&gt;
 :   &lt;email:hostName&gt;imap.example.com&lt;/email:hostName&gt;
 :   &lt;email:userName&gt;myuser&lt;/email:userName&gt;
 :   &lt;email:password&gt;mypassword&lt;/email:password&gt;
 : &lt;/email:hostInfo&gt;
 : </pre>
 :
 : The <code>hostInfoType</code> only needs to be in the email schema namespace
 : (<code>http://www.zorba-xquery.com/modules/email</code>). It does not need
 : to be validated since it's validated by the module.
 :
 : @author Daniel Thomas, Gabriel Petrovay
 : @library <a href="http://www.washington.edu/imap/">c-client library part of UW IMAP toolkit</a>
 : @project communication
 :)
module namespace imap = 'http://www.zorba-xquery.com/modules/email/imap';

import schema namespace email = 'http://www.zorba-xquery.com/modules/email';

declare namespace an = "http://www.zorba-xquery.com/annotations";

declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : Returns the status of the given mailbox.
 :
 : The status of a mailbox contains:
 : <ul>
 :  <li><code>messages</code>: the number of messages in the mailbox</li>
 :  <li><code>recent</code>: the number of messages flagged as recent</li>
 :  <li><code>unseen</code>: the number of messages flagged as unseen</li>
 :  <li><code>uidnext</code>: the next unique identifier that will be assigned to a message</li>
 :  <li><code>uidvalidity</code>: a value that, together with the <code>uidnext</code> value
 :    forms a 64 bit number that must be unique for the server</li>
 : </ul>
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox for which we want to have the status.
 : @return The <code>status</code> of the specified <code>$mailbox</code>.
 :    The result is validated against the schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/status_example.xq
 :)
declare %an:nondeterministic function imap:status(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string)
  as element(email:status)
{
  let $status := imap:status-impl(validate {$host-info}, $mailbox)
  let $status-sequence := fn:tokenize($status, ',')
  return
    validate {
      <email:status>
        <email:messages>{$status-sequence[1]}</email:messages>
        <email:recent>{$status-sequence[2]}</email:recent>
        <email:unseen>{$status-sequence[3]}</email:unseen>
        <email:uidnext>{$status-sequence[4]}</email:uidnext>
        <email:uidvalidity>{$status-sequence[5]}</email:uidvalidity>
      </email:status> 
    }
};

declare %private %an:nondeterministic function imap:status-impl($host-info as element(email:hostInfo), $mailbox as xs:string) as xs:string* external;

(:~
 : Creates a new mailbox for the given user.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox-name The name for the new mailbox.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/create_rename_delete_example.xq
 :)
declare %an:sequential function imap:create(
    $host-info as element(email:hostInfo),
    $mailbox-name as xs:string)
  as empty-sequence()
{
  imap:create-impl(validate {$host-info}, $mailbox-name) 
};
  
declare %private %an:sequential function imap:create-impl($host-info as element(email:hostInfo), $mailbox-name as xs:string)  as empty-sequence() external; 

(:~
 : Deletes a mailbox for the given user.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox-name The name of the mailbox to delete.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/create_rename_delete_example.xq
 :)
declare %an:sequential function imap:delete(
    $host-info as element(email:hostInfo),
    $mailbox-name as xs:string)
  as empty-sequence()
{
  imap:delete-impl(validate {$host-info}, $mailbox-name)
};

declare %private %an:sequential function imap:delete-impl($host-info as element(email:hostInfo), $mailbox-name as xs:string)  as empty-sequence() external; 

(:~
 : Renames a mailbox.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox-old The name of the mailbox we want to rename.
 : @param $mailbox-new The new name for the mailbox.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/create_rename_delete_example.xq
 :)
declare %an:sequential function imap:rename(
    $host-info as element(email:hostInfo),
    $mailbox-old as xs:string,
    $mailbox-new as xs:string)
  as empty-sequence()
{
  imap:rename-impl(validate {$host-info}, $mailbox-old, $mailbox-new) 
};

declare %private %an:sequential function imap:rename-impl($host-info as element(email:hostInfo), $mailbox-old as xs:string, $mailbox-new as xs:string) as empty-sequence() external;

(:~
 : Lists IMAP folders for the specified user on the host that match the pattern. 
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox-ref is applied to pattern in an implementation dependent fashion to search for matching mailbox names. 
 : @param $pattern The pattern for mailboxes to look for (can include wildcards '*' and '%').
 : @param $only-subscribed If set true, only mailboxes are listed to which the user is subscribed.
 : @return A sequence of <code>mailbox</code> elements.
 :    The result elements are validated against the schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/list_example.xq
 :)
declare %an:nondeterministic function imap:list(
    $host-info as element(email:hostInfo),
    $mailbox-ref as xs:string,
    $pattern as xs:string,
    $only-subscribed as xs:boolean)
  as element(email:mailbox)*
{
  let $mailbox-sequence := imap:list-impl(validate {$host-info}, $mailbox-ref, $pattern, $only-subscribed)
  for $mailbox in $mailbox-sequence
  return
  validate {
    <email:mailbox>
      <email:hostName>{$host-info/email:hostName/text()}</email:hostName>
      <email:mailboxName>{fn:substring-after($mailbox, '}')}</email:mailboxName>
    </email:mailbox>
  }
};

declare %private %an:nondeterministic function imap:list-impl($host-info as element(email:hostInfo), $mailbox-ref as xs:string, $pattern as xs:string, $only-subscribed as xs:boolean) as xs:string* external;

(:~
 : Subscribes the user to the specified mailbox.
 : 
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox the user wants to subscribe to.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/subscribe_unsubscribe_example.xq
 :)
declare %an:sequential function imap:subscribe(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string)
  as empty-sequence() 
{
  imap:subscribe-impl(validate {$host-info}, $mailbox)
};

declare %private %an:sequential function imap:subscribe-impl($host-info as element(email:hostInfo), $mailbox as xs:string) as empty-sequence() external;

(:~
 : Unsubscribes the user from the specified mailbox.
 : 
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox the user wants to unsubscribe from.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/subscribe_unsubscribe_example.xq
 :)
declare %an:sequential function imap:unsubscribe(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string)
  as empty-sequence()
{
  imap:unsubscribe-impl(validate {$host-info}, $mailbox)
};

declare %private %an:sequential function imap:unsubscribe-impl($host-info as element(email:hostInfo), $mailbox as xs:string) as empty-sequence() external;

(:~
 : Permanently deletes all messages of the given mailbox that have the "deleted" flag set.
 : 
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox for which all messages that have the \Deleted flag set should be permanently deleted.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/expunge_example.xq
 :) 
declare %an:sequential function imap:expunge(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string)
  as empty-sequence()
{
  imap:expunge-impl(validate {$host-info}, $mailbox)
};

declare %private %an:sequential function imap:expunge-impl($host-info as element(email:hostInfo), $mailbox as xs:string) as empty-sequence() external;

(:~
 : Searches a mailbox for messages that match the given criteria.
 : The criteria should be a string as defined in the RFC3501 (IMAP4rev1).
 : A valid example would be: 'FROM zorba@gmail.com OR NOT SUBJECT Bug'. 
 : Depending on the value of <code>$uid</code>, the function will either
 : return matching sequence numbers or unique identifiers.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox to search.
 : @param $criteria The searching criteria.
 : @param $uid If true, the function returns the sequence of unique identifiers
 :    corresponding to the matching mails, else the corresponding sequence
 :    numbers are returned. 
 : @return Either the sequence of matching sequence numbers or the sequence of
 :    matching unique identifiers.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/search_example.xq
 :)
declare %an:nondeterministic function imap:search(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $criteria as xs:string,
    $uid as xs:boolean?)
  as xs:long*
{
  imap:search-impl(validate {$host-info}, $mailbox, $criteria, $uid)
}; 

declare %private %an:nondeterministic function imap:search-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $criteria as xs:string, $uid as xs:boolean?) as xs:long* external;

(:~
 : Copies messages between mailboxes.
 :
 : Depending on the value of <code>$uid</code>, the messages are either specified
 : through their sequence number or through their unique id. Both mailboxes must exist.
 : 
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox-from The mailbox in which the messages reside.
 : @param $mailbox-to The mailbox in to which the messages are copied.
 : @param $messages The messages to be copied, specified either by their sequence number or their unique id.
 : @param $uid If true, <code>$messages</code> are treated as sequence numbers. Else as unique identifiers.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/copy_example.xq
 :)
declare %an:sequential function imap:copy(
    $host-info as element(email:hostInfo),
    $mailbox-from as xs:string,
    $mailbox-to as xs:string,
    $messages as xs:long+,
    $uid as xs:boolean?)
  as empty-sequence()
{
  imap:copy-impl(validate {$host-info}, $mailbox-from, $mailbox-to, $messages, $uid, true());
};

declare %private %an:sequential function imap:copy-impl($host-info as element(email:hostInfo), $mailbox-from as xs:string, $mailbox-to as xs:string, $messages as xs:long+, $uid as xs:boolean?, $copy as xs:boolean) as empty-sequence() external;

(:~
 : Moves messages between mailboxes.
 :
 : Depending on the value of <code>$uid</code>, the messages are either specified through
 : their sequence number or through their unique id. Both mailboxes must exist.
 : 
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox-from The mailbox in which the messages reside.
 : @param $mailbox-to The mailbox in to which the messages should be moved.
 : @param $messages The messages to be copied, specified either by their sequence number or their unique id.
 : @param $uid If true, <code>$messages</code> are treated as sequence numbers. Else as unique identifiers.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/move_example.xq
 :)
declare %an:sequential function imap:move(
    $host-info as element(email:hostInfo),
    $mailbox-from as xs:string,
    $mailbox-to as xs:string,
    $messages as xs:long+,
    $uid as xs:boolean?)
  as empty-sequence()
{
  imap:copy-impl(validate {$host-info}, $mailbox-from, $mailbox-to, $messages, $uid, false());
};

(:~
 : Fetches the envelope of a message. 
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox in which to search for the message.
 : @param $message-number The message for which to fetch the envelope (depending on
 :    <code>$uid</code> either as message sequence number or unique identifier).
 : @param $uid If true, <code>$message-number</code> is treated as sequence number. Else as unique identifier.
 : @return The <code>envelope</code> of the requested message.
 :    The result is validated against the schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/fetch_envelope_example.xq 
 :) 
declare %an:nondeterministic function imap:fetch-envelope(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $message-number as xs:long,
    $uid as xs:boolean?)
  as element(email:envelope)
{
  validate {imap:fetch-envelope-impl( validate { $host-info }, $mailbox , $message-number, $uid )} 
};

declare %private %an:nondeterministic function imap:fetch-envelope-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $message-number as xs:long, $uid as xs:boolean?) as element(email:envelope) external;

(:~
 : Fetches a whole message.
 : 
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox in which to search for the message.
 : @param $message-number The message to fetch, denoted either by its sequence number or unique identifier.
 : @param $uid If true, <code>$message-number</code> is treated as sequence number. Else as unique identifier.
 : @return the <code>message</code> with the given <code>$message-number</code>.
 :    The result is validated against the schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/fetch_message_example.xq
 :)
declare %an:nondeterministic function imap:fetch-message(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $message-number as xs:long,
    $uid as xs:boolean)
  as element(email:message)
{
  validate {imap:fetch-message-impl(validate {$host-info}, $mailbox, $message-number, $uid)} 
}; 

declare %private %an:nondeterministic function imap:fetch-message-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $message-number as xs:long, $uid as xs:boolean) as element() external;

(:~
 : Fetches the subject for a message.
 :
 : Please note that this function only works with message sequence numbers,
 : not with unique identifiers. Only the first 255 characters of a subject
 : are fetched.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox for which we want to get the subject of a message.
 : @param $message-number Denotes the message for which we want the subject.
 : @return The subject of the specified message.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/fetch_subject_example.xq
 :)
declare %an:nondeterministic function imap:fetch-subject(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $message-number as xs:long)
  as xs:string
{
  imap:fetch-subject-impl(validate {$host-info}, $mailbox, $message-number)
};

declare %private %an:nondeterministic function imap:fetch-subject-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $message-number as xs:long) as xs:string external;

(:~
 : Fetches the 'from' string of a message.
 :
 : Please note that this function only words with message sequence numbers,
 : not with unique identifiers. Only the first 255 characters of a 'from'
 : string are fetched.
 : 
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox for which we want to get the 'from' string of a message.
 : @param $message-number Denotes the message for which we want the 'from' string.
 : @return The 'from' string of the specified message.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/fetch_from_example.xq
 :)
declare %an:nondeterministic function imap:fetch-from(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $message-number as xs:long)
  as xs:string
{
  imap:fetch-from-impl(validate {$host-info}, $mailbox, $message-number)
};

declare %private %an:nondeterministic function imap:fetch-from-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $message-number as xs:long) as xs:string external;

(:~
 : Fetches the unique identifier for a given message sequence number.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox for which we want to get the unique identifier of a message sequence number.
 : @param $message-number The message sequence number for which we want the unique identifier. 
 : @return The unique identifier of the given message sequence number.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/fetch_uid_example.xq
 :)
declare %an:nondeterministic function imap:fetch-uid(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $message-number as xs:long)
  as xs:long
{
  imap:fetch-uid-impl(validate {$host-info}, $mailbox, $message-number)
};

declare %private %an:nondeterministic function imap:fetch-uid-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $message-number as xs:long) as xs:long external;

(:~
 : Fetches the message sequence number for a given unique identifier.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox for which we want to get the message sequence number of an unique identifier.
 : @param $message-number The unique identifier for which we want the message sequence number.
 : @return The message sequence number of the of the given unique identifier.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/fetch_message_sequence_number_example.xq
 :)
declare %an:nondeterministic function imap:fetch-message-sequence-number(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $message-number as xs:long)
  as xs:long
{
  imap:fetch-message-sequence-number-impl(validate {$host-info}, $mailbox, $message-number)
};

declare %private %an:nondeterministic function imap:fetch-message-sequence-number-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $message-number as xs:long) as xs:long external;

(:~
 : Fetches the flags of a message.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox containing the specified message.
 : @param $message-number Either the message sequence number or the unique identifier of the message.
 : @param $uid If true, <code>$message-number</code> is treated as sequence number. Else as unique identifier.
 : @return The <code>flags</code> of the specified message.
 :    The result is validated against the schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/fetch_flags_example.xq
 :)
declare %an:nondeterministic function imap:fetch-flags(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $message-number as xs:long,
    $uid as xs:boolean?)
  as element(email:flags) 
{
  validate {imap:fetch-flags-impl(validate{$host-info}, $mailbox, $message-number, $uid)} 
};

declare %private %an:nondeterministic function imap:fetch-flags-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $message-number as xs:long, $uid as xs:boolean?) as element(email:flags) external;

(:~
 : Sets the flags for a given message.
 :
 : The flags are set and unset according to the passed <code>$flags</code>.
 :
 : @param $host-info The IMAP host, user name, and password.
 : @param $mailbox The mailbox containing the specified message.
 : @param $message-number Either the message sequence number or the unique
 :    identifier of the message (depending on the value of <code>$uid</code>).
 : @param $flags Defines which flags should be set for this message.
 :    The possibilities are "seen", "deleted", "flagged", "answered", and "draft".
 :    Setting all flags at once is done by passing the element:
 :    <code>
 :    &lt;email:flags&gt;
 :      &lt;email:seen/&gt;
 :      &lt;email:deleted/&gt;
 :      &lt;email:flagged/&gt;
 :      &lt;email:answered/&gt;
 :      &lt;email:draft/&gt;
 :    &lt;/email:flags&gt;
 :    </code>.
 :
 :    Setting "flagged" only and unsetting all other at once can be done by passing:
 :    <code>
 :    &lt;email:flags&gt;
 :      &lt;email:flagged/&gt;
 :    &lt;/email:flags&gt;
 :    </code>. 
 : @param $uid If true, <code>$message-number</code> is treated as sequence number. Else as unique identifier.
 : @return The function is declared as sequential and has side-effects. It returns the empty sequence.
 : @error imap:IMAP0001 If the IMAP operation failed.
 : @error imap:IMAP0002 If the connection to the IMAP server is refused.
 : @error imap:IMAP0003 If no message is found with the provided sequence number/unique identifier.
 : @error err:XQDY0027 If the value of <code>$host-info</code> is not valid
 :    according to the email schema:
 :    <code>http://www.zorba-xquery.com/modules/email</code>
 : @example examples/Queries/imap/set_flags_example.xq
 :)
declare %an:sequential function imap:set-flags(
    $host-info as element(email:hostInfo),
    $mailbox as xs:string,
    $message-number as xs:long,
    $flags as element(email:flags),
    $uid as xs:boolean?)
  as empty-sequence()
{
  imap:set-flags-impl(validate{$host-info}, $mailbox, $message-number, validate{$flags}, $uid)
}; 

declare %private %an:sequential function imap:set-flags-impl($host-info as element(email:hostInfo), $mailbox as xs:string, $message-number as xs:long, $flags as element(email:flags), $uid as xs:boolean?) as empty-sequence() external;
