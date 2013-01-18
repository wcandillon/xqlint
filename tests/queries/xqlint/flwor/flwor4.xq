for sliding window $w in (2, 4, 6, 8, 10, 12, 14)

    start at $s when fn:true()

    only end at $e 
when $e - $s gt 1 and (max(subsequence($answers, $s, $e)) - min(subsequence($answers, $s, $e))) eq (xs:dayTimeDuration("PT86400S") * ($e - $s + 1))
return <window>{ $w }</window>
