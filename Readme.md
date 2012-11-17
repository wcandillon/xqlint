XQLint - XQuery Code Quality Tool.
============================

XQLint parses XQuery files and returns errors and warnings based on semantic analysis.
The XQuery parser is generated using REx Parser Generator (http://www.bottlecaps.de/rex/).

Dependencies
-----------
* Required
    * Dryice (https://github.com/mozilla/dryice)

```bash
npm install dryice
```
* Optionals (to run tests)
    * Walk (https://github.com/coolaj86/node-walk)

```bash
npm install walk
```
Running the test suite
-----------
```bash
node run_tests.js --keep-going
```

To parse a particular XQuery file:

```bash
node run_tests.js -f filename
```
For instance:
```bash
node run_tests.js -f queries/zorba/boolean/compare0.xq
```

Who is using this project?
-----------
ACE, aka the Cloud9 editor (https://github.com/ajaxorg/ace), is using this parser to perform XQuery syntax checking and semantic highlighting of the source code. 

