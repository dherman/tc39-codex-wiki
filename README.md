# ECMAScript Wiki

This is the new home of the ECMAScript Wiki, where TC39 works on draft proposals and explanations of ECMAScript Edition 6.

## Public site

The public site will temporarily be at [tc39.github.com/wiki](http://tc39.github.com/wiki). Once it stabilizes, it will replace the official wiki at [wiki.ecmascript.org](http://wiki.ecmascript.org).

## Command-line tool

There's a command-line tool at `bin/tc39` that provides a few tools:

```
Usage: tc39 <command>

where <command> is one of:

  build           build the wiki
  push message    build and push the gh-pages branch
    message       commit message
  serve [port]    build and serve the wiki
    port          server port [default: 8888]
  webhook [port]  run the GitHub WebHook server
    port          server port [default: 8888]
```

You can run the command from anywhere. Building the wiki always saves to a subdirectory of this project root.

(Directory watching is not yet stable so it's not enabled. It'll be enabled once the code stabilizes.)
