/*
  Takes an array of packages and their dependencies which are strings formatted like:
  ["package: package2, package3", "package2: ", "package3: "]
  Will return a string of the packages in the order they should be installed:
  "package2, package3, package"
  Or will throw an error if the packages include a circular reference
*/
function installPackages(packages) {
  return;
}

module.exports.installPackages = installPackages;