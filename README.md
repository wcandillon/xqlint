#XQLint
[![Build Status](http://img.shields.io/travis/wcandillon/xqlint/master.svg?style=flat)](https://travis-ci.org/wcandillon/xqlint) [![NPM version](http://img.shields.io/npm/v/xqlint.svg?style=flat)](http://badge.fury.io/js/xqlint) [![Code Climate](http://img.shields.io/codeclimate/github/wcandillon/xqlint.svg?style=flat)](https://codeclimate.com/github/wcandillon/xqlint)

## JSONiq & XQuery Code Quality Tool

XQLint parses XQuery & JSONiq files and returns errors and warnings based on static code analysis.
![example](http://i.imgur.com/86jU7C1.png)

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
![result](https://dl.dropboxusercontent.com/u/1487285/Screenshot%202014-04-07%2011.06.31.png)

### Print AST as XML

```bash
$ xqlint ast <path>
```

### Syntax Highlighting

```bash
$ xqlint highlight <path>
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

## Who is using this project?
* [28.io cli tool](https://github.com/28msec/28)
* [Atom Editor](https://atom.io/packages/language-jsoniq)
* [ACE, aka the Cloud9 editor](https://github.com/ajaxorg/ace), [view demo](http://try.zorba.io).
* [XQLint Grunt Task](https://github.com/wcandillon/grunt-xqlint)
* [XQLint Gulp Plugin](https://github.com/wcandillon/gulp-xqlint)
* [eXide](https://github.com/wolfgangmm/eXide), a web-based XQuery IDE for eXist-db, [view demo](http://exist-db.org/exist/apps/eXide/).
* [atom-existdb](https://github.com/wolfgangmm/atom-existdb), an Atom editor integration package for eXist-db.
