#!/usr/bin/env node

// This is a simple script used to build a mod package. The script will copy necessary files to the build directory
// and compress the build directory into a zip file that can be easily shared.

const fs = require("fs-extra");
const glob = require("glob");
const zip = require('bestzip');
const path = require("path");

// Load the package.json file to get some information about the package so we can name things appropriately. This is
// atypical, and you would never do this in a production environment, but this script is only used for development so
// it's fine in this case. Some of these values are stored in environment variables, but those differ between node
// versions; the 'author' value is not available after node v14.
const { author, name:packageName, version } = require("./package.json");

// Generate the name of the package, stripping out all non-alphanumeric characters in the 'author' and 'name'.
const modName = `${author.replace(/[^a-z0-9]/gi, "")}-${packageName.replace(/[^a-z0-9]/gi, "")}-${version}`;
console.log(`Generated package name: ${modName}`);

// Delete the old build directory and compressed package file.
fs.rmSync(`${__dirname}/dist`, { force: true, recursive: true });
console.log("Previous build files deleted.");

// Generate a list of files that should not be copied over into the distribution directory. This is a blacklist to ensure
// we always copy over additional files and directories that authors may have added to their project. This may need to be
// expanded upon by the mod author to allow for node modules that are used within the mod; example commented out below.
const ignoreList = [
    "node_modules/",
    // "node_modules/!(weighted|glob)", // Instead of excluding the entire node_modules directory, allow two node modules.
    "src/**/*.js",
    "types/",
    ".git/",
    ".gitea/",
    ".eslintignore",
    ".eslintrc.json",
    ".gitignore",
    ".DS_Store",
    "packageBuild.ts",
    "mod.code-workspace",
    "package-lock.json",
    "tsconfig.json"
];
const exclude = glob.sync(`{${ignoreList.join(",")}}`, { realpath: true, dot: true });

// For some reason these basic-bitch functions won't allow us to copy a directory into itself, so we have to resort to
// using a temporary directory, like an idiot. Excuse the normalize spam; some modules cross-platform, some don't...
fs.copySync(__dirname, path.normalize(`${__dirname}/../~${modName}`), {filter:(filePath) => 
{
    return !exclude.includes(filePath);
}});
fs.moveSync(path.normalize(`${__dirname}/../~${modName}`), path.normalize(`${__dirname}/${modName}`), { overwrite: true });
fs.copySync(path.normalize(`${__dirname}/${modName}`), path.normalize(`${__dirname}/dist`));
console.log("Build files copied.");

// Compress the files for easy distribution. The compressed file is saved into the dist directory. When uncompressed we
// need to be sure that it includes a directory that the user can easily copy into their game mods directory.
zip({
    source: modName,
    destination: `dist/${modName}.zip`,
    cwd: __dirname
}).catch(function(err)
{
    console.error("A bestzip error has occurred: ", err.stack);
}).then(function()
{
    console.log(`Compressed mod package to: /dist/${modName}.zip`);

    // Now that we're done with the compression we can delete the temporary build directory.
    fs.rmSync(`${__dirname}/${modName}`, { force: true, recursive: true });
    console.log("Build successful! your zip file has been created and is ready to be uploaded to hub.sp-tarkov.com/files/");
});