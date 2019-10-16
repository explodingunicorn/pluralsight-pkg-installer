/*
  Takes an array of packages and their listed dependencies.
  Returns an object with the packages as the key and the dependencies
  as an array.
*/
function parsePackageArray(packages) {
  const packageObj = {};
  packages.forEach(packageAndDep => {
    const [pkg, dep] = packageAndDep.split(': ');
    packageObj[pkg] = dep ? dep : false;
  });
  return packageObj;
}

/*
  Recursive function that will traverse the package tree. Keeps track of visited
  packages and installed packages in both an array and object for quick look up.
*/
function traversePackageTree(packageObj, pkg, visited, installed, installedDict) {
  const dep = packageObj[pkg];
  if (dep && !installedDict[dep]) {
    // If visited includes the dependency throw an error due to circular reference
    if (visited.includes(dep)) {
      throw new Error('Circular reference encountered on package -', pkg);
    }
    // Otherwise traverse the tree again and update the visited nodes
    visited.push(pkg);
    return traversePackageTree(packageObj, dep, visited, installed, installedDict);
  }
  else if (!installedDict[pkg]) {
    // Update the installed object, and add the package to the array of installed packages
    installedDict[pkg] = true;
    installed.push(pkg);

    // If there are visited nodes reverse them and add each of them to the installed array
    if (visited.length) {
      visited.reverse().forEach(pkg => {
        installedDict[pkg] = true;
        installed.push(pkg);
      });
    }
  }

  return {
    installed,
    installedDict
  };
}

function orderPackageObj(packageObj) {
  let installed = new Array(), installedDict = {};
  Object.keys(packageObj).forEach(pkg => {
    // Traverse the package tree depth first for each package, this will also update our installed objects
    const updatedInstall = traversePackageTree(packageObj, pkg, [], installed, installedDict);
    installed = updatedInstall.installed;
    installedDict = updatedInstall.installedDict;
  });

  return installed;
}

/*
  Takes an array of packages and their dependencies which are strings formatted like:
  ["package: package2", "package2: ", "package3"].
  Will return a string of the packages in the order they should be installed:
  "package2, package3, package".
  Or will throw an error if the packages include a circular reference.
*/
function installPackages(packages) {
  const parsedPackages = parsePackageArray(packages);
  const orderedPackages = orderPackageObj(parsedPackages);
  return orderedPackages.join(', ');
}

module.exports = {
  parsePackageArray,
  orderPackageObj,
  installPackages
}