#!/usr/bin/env node

"use strict";

var getWantedDependencies = require("./");
var pkg = require("./package.json");
var argv = process.argv.slice(2);

if (argv.indexOf("--version") >= 0 || argv.indexOf("-v") >= 0) {
  console.log(pkg.version);
  process.exit();
}

getWantedDependencies(process.cwd()).then(function(wantedDependencies) {
  wantedDependencies.forEach(function(dependency) {
    console.log(dependency.name + " (" + dependency.wantedVersion + ")");
  });
}).catch(function(err) {
  console.error(err);
  process.exit(1);
});
