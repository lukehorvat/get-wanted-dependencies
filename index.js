var readPackageTree = require("read-package-tree");

module.exports = function(dir, cb) {
  readPackageTree(dir, function(err, root) {
    if (err) {
      cb(err);
      return;
    }

    var wantedDependencies = root.children.map(function(child) {
      return {
        name: child.package.name,
        currentVersion: child.package.version,
        wantedVersion: root.package.dependencies[child.package.name]
      };
    }).filter(function(dependency) {
      return dependency.wantedVersion && dependency.currentVersion !== dependency.wantedVersion;
    });

    cb(null, wantedDependencies);
  });
};
