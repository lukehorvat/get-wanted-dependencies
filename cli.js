#!/usr/bin/env node

"use strict";

var getWantedDependencies = require("./");

getWantedDependencies(process.cwd()).then(function(wantedDependencies) {
  wantedDependencies.forEach(function(dependency) {
    console.log(dependency.name + " (" + dependency.wantedVersion + ")");
  });
}).catch(function(err) {
  console.error(err);
  process.exit(1);
});
