# bestzip

[![Build status](https://travis-ci.org/nfriedly/node-bestzip.svg?branch=master)](https://travis-ci.org/nfriedly/node-bestzip)
[![npm version](https://badge.fury.io/js/bestzip.svg)](https://www.npmjs.com/package/bestzip)
[![npm downloads](https://img.shields.io/npm/dm/bestzip)](https://www.npmjs.com/package/bestzip)

This module provides a `bestzip` command that calls the native `zip` command if available and otherwise falls back to a
Node.js implementation.

The `--recurse-directories` (`-r`) option is automatically enabled.

## Why?

The native `zip` command on GNU/Linux and macOS is significantly faster and creates moderately smaller .zip files than the Node.js version included here, but Windows has no built-in `zip` command. This module provides the best of both worlds, and allows for easier cross-platform scripting.

## Global command line usage

    npm install -g bestzip
    bestzip destination.zip source/ [other sources...]

## Command line usage within `package.json` scripts

    npm install --save-dev bestzip

package.json:

```javascript
{
    //...
    "scripts": {
        "build" "...",
        "zip": "bestzip bundle.zip build/*",
        "upload": "....",
        "deploy": "npm run build && npm run zip && npm run upload"
    }
}
```

## Programmatic usage from within Node.js

```javascript
var zip = require('bestzip');

zip({
  source: 'build/*',
  destination: './destination.zip'
}).then(function() {
  console.log('all done!');
}).catch(function(err) {
  console.error(err.stack);
  process.exit(1);
});

// v1.x API also works for backwards compatibility: zip(destination, sources, callback)
```

### Options

* `source`: Path or paths to files and folders to include in the zip file. String or Array of Strings.
* `destination`: Path to generated .zip file.
* `cwd`: Set the Current Working Directory that source and destination paths are relative to. Defaults to `process.cwd()`

## How to control the directory structure

The directory structure in the .zip is going to match your input files, but the exact details depend on how the command is called. For example:

`bestzip build.zip build/*`

This includes the build/ folder inside of the .zip

Alternatively:

`cd build/ && bestzip ../build.zip *`

This will not include the build/ folder, it's contents will be top-level.

*Note: some tools, including the Archive Utility built into macOS, will automatically create a top-level folder to group everything together when extracting a .zip archive that contains multiple top-level files.*

When using the programmatic API, the same effect may be achieved by passing in the `cwd` option.

## .dotfiles

Wildcards (`*`) ignore dotfiles.

* To include a dotfile, either include the directory it's in (`folder/`) or include it by name (`folder/.dotfile)`
* To omit dotfiles, either use a wildcard (`folder/*`) or explicitly list the desired files (`folder/file1.txt folder/file2.txt`)

## Breaking changes for v2

* `bestzip output.zip foo/bar/file.txt` now includes the foo/bar/ folders, previously it would place file.txt at the top-level
  * This was done to more closely align with the native zip command
