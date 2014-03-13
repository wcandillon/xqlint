 for $user-questions in

for $faq in db:find("faq")

group by $user := $faq("owner")("display_name"), $id := $faq("question_id")

return {

"user": $user,

 "answers": $faq("answer_count")

}

group by $user := $user-questions("user")

return {

  "user": $user,

  "avg": avg($user-questions("answers"))

}
