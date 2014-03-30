XQLint [![Build Status](https://travis-ci.org/wcandillon/xqlint.svg?branch=master)](https://travis-ci.org/wcandillon/xqlint) [![NPM version](https://badge.fury.io/js/xqlint.png)](http://badge.fury.io/js/xqlint)
============

## XQuery & JSONiq Code Quality Tool

XQLint parses XQuery & JSONiq files and returns errors and warnings based on static code analysis.

## Installation

Install Node.js and NPM for your system (Mac, Windows or Linux). And install the command line tool using:

```bash
$ npm install xqlint -g
```
## Usage

### Lint

```bash
$ xqlint lint <path> [-s, --style-check <yes, no>]
```
![result](https://dl.dropboxusercontent.com/u/1487285/Screenshot%202014-03-22%2015.40.41.png)

### Syntax Highlighting

```bash
$ xqlint highlight <path>
```

### Code formatting

```bash
$ xqlint format <path>
```

## Development

If you'd like to hack on xqlint itself:

```bash
git clone git@github.com:wcandillon/xqlint.git
cd xqlint
npm install
grunt
```

### Run tests

```bash
grunt vows
```

### Generate Parsers

```bash
grunt parsers
```

##Who is using this project?
* [28.io cli tool](https://github.com/28msec/28)
* [ACE, aka the Cloud9 editor](https://github.com/ajaxorg/ace), [view demo](http://try.zorba.io).

##Changelog

Version 0.0.6
* Add code completion
* Bug fixe with XQST0048.

Version 0.0.5
* Add code formatting command.

Version 0.0.4
* Add warnings for untyped module variables and functions.
* Fix syntax highlight bug for JSONiq.
* Add highlight command.

Version 0.0.3
* Exports XQLint module.
* Add code formatting checks.
