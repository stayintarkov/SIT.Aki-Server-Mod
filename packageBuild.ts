#!/usr/bin/env node

// This is a simple script used to build a mod package. The script will copy necessary files to the build directory
// and compress the build directory into a zip file that can be easily shared.

const fs = require("fs-extra");
const glob = require("glob");
const path = require("path");

// Generate the name of the package, stripping out all non-alphanumeric characters in the 'author' and 'name'.
const modName = "SITCoop";
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
    "tsconfig.json",
    "*.ps1"
];
const exclude = glob.sync(`{${ignoreList.join(",")}}`, { realpath: true, dot: true });

// Cannot copy a folder to a subdirectory of itself, workaround by using a tmpdir
const srcdir = __dirname;
const tmpdir = path.normalize(`${__dirname}/../~${modName}`);
const dstdir = path.normalize(`${__dirname}/dist/${modName}`);
fs.copySync(srcdir, tmpdir, {
    filter: (filePath) => !exclude.includes(filePath)
});
fs.moveSync(tmpdir, dstdir);
console.log("Build files copied.");

// Remove additional files and folders from SITCoop folder
const filesToRemove = [
    // "node_modules/!(weighted|glob)", // Instead of excluding the entire node_modules directory, allow two node modules.
    ".github/",
    ".git/",
    ".gitea/",
    ".gitignore",
    "package_release_with_server.ps1",
];
  
filesToRemove.forEach((file) => {
    const filePath = path.resolve(dstdir, file);
    fs.removeSync(filePath);
    console.log(`Removed: ${filePath}`);
});
