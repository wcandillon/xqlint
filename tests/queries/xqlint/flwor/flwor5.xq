import module namespace db = "http://www.28msec.com/modules/mongodb";



variable $db := db:connect({
                               "host": "linus.mongohq.com",
                               "port": 10059,
                               "db": "stackoverflow",
                               "user": "takeoffconf",
                               "pass": "lille2013"
                           });



(: Contribution timeframe :)

for $anwsers in db:find($db, "answers")
group by $user := $anwsers("owner")("user_id")
let $last-activity :=
    max(for $anwser in $anwsers
           return $anwser("last_activity_date"))
where exists($user)
order by $last-activity descending
return {
    "user": $user,
    "last_activity": $last-activity
}
