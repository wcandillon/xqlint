XQLint [![Build Status](https://travis-ci.org/wcandillon/xqlint.svg?branch=master)](https://travis-ci.org/wcandillon/xqlint)
============

## XQuery & JSONiq Code Quality Tool

XQLint parses XQuery & JSONiq files and returns errors and warnings based on static code analysis.

## Installation

Install Node.js and NPM for your system (Mac, Windows or Linux). And install the command line tool using:

```
$ npm install xqlint -g
```
## Usage

### Lint

```
$ xqlint lint <path>
```
![result](http://dl.dropboxusercontent.com/u/1487285/Screenshot%202014-03-22%2015.40.41.png)


##Who is using this project?
* [28.io cli tool](https://github.com/28msec/28)
* [ACE, aka the Cloud9 editor](https://github.com/ajaxorg/ace), is using this parser to perform XQuery syntax checking and semantic highlighting of the source code.
