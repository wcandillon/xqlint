declare function local:test($hello){
    local:test2(), $hello
};

declare function local:test2($foo) {
    $foo
};