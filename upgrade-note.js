export const pleaseUpgradeNodeBanner = `
function semverCompare (a, b) {
  var pa = a.split('.');
  var pb = b.split('.');
  for (var i = 0; i < 3; i++) {
    var na = Number(pa[i]);
    var nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  return 0;
};

function pleaseUpgradeNode(pkg, opts) {
  var opts = opts || {}
  var requiredVersion = pkg.engines.node.replace('>=', '')
  var currentVersion = process.version.replace('v', '')
  if (semverCompare(currentVersion, requiredVersion) === -1) {
    if (opts.message) {
      console.error(opts.message(requiredVersion))
    } else {
      console.error(
        pkg.name +
          ' requires at least version ' +
          requiredVersion +
          ' of Node, please upgrade'
      )
    }

    if (opts.hasOwnProperty('exitCode')) {
      process.exit(opts.exitCode)
    } else {
      process.exit(1)
    }
  }
}

var pkg = require('../package.json')
pleaseUpgradeNode(pkg)
`
