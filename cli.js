#!/usr/bin/env node

"use strict";

var getWantedDependencies = require("./");

getWantedDependencies(__dirname, function(err, wantedDependencies) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  wantedDependencies.forEach(dependency => {
    console.log(dependency.name + " (" + dependency.wantedVersion + ")");
  });
});
