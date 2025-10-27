const version = require('../version')

module.exports = function (source) {
  return source.replaceAll(/wpp-([a-zA-Z-]+)/g, `wpp-$1-${version}`)
}
