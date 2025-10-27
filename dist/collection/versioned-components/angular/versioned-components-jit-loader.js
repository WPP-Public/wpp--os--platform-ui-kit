const componentList = require('../components-list')
const version = require('../version')
const suffix = typeof version === 'string' ? `-${version}` : `-${version.default}`

const componentsMapperList = componentList.map(component => {
  return {
    search: component,
    replace: `${component}${suffix}`,
    flags: 'g',
  }
})

module.exports = componentsMapperList
