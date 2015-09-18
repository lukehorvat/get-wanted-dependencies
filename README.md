# get-wanted-dependencies [![NPM version](http://img.shields.io/npm/v/get-wanted-dependencies.svg?style=flat-square)](https://www.npmjs.org/package/get-wanted-dependencies)

Get a list of NPM package dependencies that are "wanted", based on the contents of `package.json` and what is currently installed in `/node_modules`.

## Installation

Install the package with NPM:

```bash
$ npm install get-wanted-dependencies
```

## Usage

The package exposes a function with the signature `(dir, callback)`, where `dir` is the directory containing `package.json` and `callback` is a typical Node.js-style callback function.

Example:

```javascript
import getWantedDependencies from "get-wanted-dependencies";

getWantedDependencies(__dirname, (err, wantedDependencies) => {
  if (err) {
    console.error(err);
    return;
  }

  wantedDependencies.forEach(dependency => {
    console.log(dependency.name);
    console.log(dependency.installedVersion);
    console.log(dependency.wantedVersion);
  });
});
```

## Tip

When working on a team, one can sometimes forget to run `npm install` after pulling in dependency changes made by others. Solution – integrate the package into your automated build system!

Example [gulp](http://gulpjs.com/) task:

```javascript
gulp.task("check-dependencies", done => {
  getWantedDependencies(__dirname).then(wantedDependencies => {
    if (wantedDependencies.length > 0) {
      console.error("Wanted dependencies not installed. Run `npm install`.");
      process.exit(1);
    }

    done();
  }).catch(err => done(err));
});
```
