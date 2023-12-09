#!/usr/bin/env node

// This is a simple script used to build a mod package. The script will copy necessary files to the build directory
// and compress the build directory into a zip file that can be easily shared.

const fs = require("fs-extra");
const glob = require("glob");
const zip = require('bestzip');
const path = require("path");

// Function to update version using updateVersion.js script
//function updateVersion() {
//    const { execSync } = require('child_process');

//    try {
//        execSync('node updateVersion.js', { stdio: 'inherit' });
//        console.log('Version updated successfully.');
//    } catch (error) {
//        console.error('Error updating version:', error);
//    }
//}

// Call the updateVersion function before the build process
// updateVersion();

// Load the package.json file to get some information about the package so we can name things appropriately. This is
// atypical, and you would never do this in a production environment, but this script is only used for development so
// it's fine in this case. Some of these values are stored in environment variables, but those differ between node
// versions; the 'author' value is not available after node v14.
const { author, name:packageName, version } = require("./package.json");

// Generate the name of the package, stripping out all non-alphanumeric characters in the 'author' and 'name'.
const modName = "SITCoop-" + version;
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
    ".github/",
    ".gitea/",
    ".eslintignore",
    ".eslintrc.json",
    ".gitignore",
    ".DS_Store",
    "packageBuild.ts",
    "mod.code-workspace",
    "package-lock.json",
    "tsconfig.json",
    ".github",
    ".gitignore",
    "package.json",
    "packageBuild.ts",
    "updateVersion.js"
];
const exclude = glob.sync(`{${ignoreList.join(",")}}`, { realpath: true, dot: true });

// For some reason these basic-bitch functions won't allow us to copy a directory into itself, so we have to resort to
// using a temporary directory, like an idiot. Excuse the normalize spam; some modules cross-platform, some don't...
fs.copySync(__dirname, path.normalize(`${__dirname}/../~${modName}`), {
    filter: (filePath) => {
        return !exclude.includes(filePath);
    }
});
fs.moveSync(path.normalize(`${__dirname}/../~${modName}`), path.normalize(`${__dirname}/${modName}`), { overwrite: true });
fs.copySync(path.normalize(`${__dirname}/${modName}`), path.normalize(`${__dirname}/dist`));
console.log("Build files copied.");

// Remove the dist folder
fs.rmdirSync(path.resolve(__dirname, "dist"), { recursive: true });
console.log("Dist folder removed.");

// Remove additional files and folders from SITCoop folder
const filesToRemove = [
    ".gitignore",
    "mod.code-workspace",
    "package-lock.json",
    "package.json",
    "packageBuild.ts",
    "updateVersion.js",
    ".github",
    "node_modules",
    ".elintignore",
    ".eslintrc.json",
];
  
filesToRemove.forEach((file) => {
    const filePath = path.resolve(__dirname, "SITCoop", file);
    fs.removeSync(filePath);
    console.log(`Removed: ${filePath}`);
});