const fs = require('fs');

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Get the current version number
let currentVersion = packageJson.version;

// Increment the last part of the version number dynamically
const parts = currentVersion.split('.');
const lastPart = parseInt(parts[2]);
parts[2] = (lastPart + 1).toString();

// Update the version number in package.json
packageJson.version = parts.join('.');

// Write the updated package.json back to the file
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2), 'utf8');

// Log the updated version number
console.log(`Updated version from ${currentVersion} to ${packageJson.version}`);