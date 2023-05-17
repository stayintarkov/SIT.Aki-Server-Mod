#!/usr/bin/env node

"use strict";

var zip = require("../lib/bestzip.js");

var argv = require("yargs")
  .usage("\nUsage: bestzip destination.zip sources/")
  .option("force", {
    describe: "Force use of node.js or native zip methods",
    choices: ["node", "native"],
  })
  .option("level", {
    describe: "Level of compression",
    type: "number",
    default: -1,
  })
  .demand(2).argv;

var destination = argv._.shift();
var source = argv._;

if (argv.level < -1 || argv.level > 9) {
  console.error("Invalid compression level, must be >= 0 and <= 9");
  process.exit(1);
}

console.log("Writing %s to %s...", source.join(", "), destination);

if (argv.force === "node") {
  zip = zip.nodeZip;
} else if (argv.force === "native") {
  zip = zip.nativeZip;
}

zip({
  source: source,
  destination: destination,
  verbose: !!argv.verbose,
  level: argv.level,
})
  .then(function () {
    console.log("zipped!");
  })
  .catch(function (err) {
    console.error(err);
    process.exit(1);
  });
