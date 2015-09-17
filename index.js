var readPackageTree = require("read-package-tree");

module.exports = function(dir, cb) {
  readPackageTree(dir, function(err, root) {
    if (err) {
      cb(err);
      return;
    }

    var isUpToDate = root.children.every(function(child) {
      var currentVersion = child.package.version;
      var wantedVersion = root.package.dependencies[child.package.name];
      return !wantedVersion || currentVersion === wantedVersion;
    });

    cb(null, isUpToDate);
  });
};
