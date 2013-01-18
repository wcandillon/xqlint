import module namespace db = "http://www.28msec.com/modules/mongodb";

variable $db := db:connect({
  "host": "linus.mongohq.com",
  "port": 10059,
  "db": "stackoverflow",
  "user": "takeoffconf",
  "pass": "lille2013"
});

(: Window of contribution :)
for $answers in db:find($db, "answers")
group by $user := $answers("owner")("user_id")
where exists($user) and count($answers) gt 1
let $oldest-question := min(for $answer in $answers return $answer("creation_date"))
let $newest-question := max(for $answer in $answers return $answer("creation_date"))
return {
    "user": $user,
    "duration": $newest-question - $oldest-question
}
