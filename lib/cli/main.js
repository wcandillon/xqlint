'use strict';

var cli = require('./cli.js');

if (process.argv.length === 2) {
    cli.help();
}
cli
.parse(process.argv);