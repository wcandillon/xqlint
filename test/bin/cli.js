'use strict';

var cli = require('commander');
var pkg = require('../package.json');

cli.version(pkg.version);
module.exports = cli;
