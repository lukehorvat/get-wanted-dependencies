"use strict";

var objectAssign = require("object-assign");
var pify = require("pify");
var readPackageTree = require("read-package-tree");
var semver = require("semver");

function getWantedDependencies(dir, callback) {
  readPackageTree(dir, function(err, root) {
    if (err) {
      callback(err);
      return;
    }

    var packageDependencyVersions = objectAssign(root.package.dependencies, root.package.devDependencies);

    var installedDependencyVersions = root.children.reduce(function(obj, child) {
      obj[child.package.name] = child.package.version;
      return obj;
    }, {});

    var wantedDependencies = Object.keys(packageDependencyVersions).map(function(name) {
      return {
        name: name,
        installedVersion: installedDependencyVersions[name] || null,
        wantedVersion: packageDependencyVersions[name]
      };
    }).filter(function(dependency) {
      return !dependency.installedVersion || (dependency.installedVersion !== dependency.wantedVersion && semver.valid(dependency.wantedVersion));
    });

    callback(null, wantedDependencies);
  });
}

module.exports = pify(getWantedDependencies);
