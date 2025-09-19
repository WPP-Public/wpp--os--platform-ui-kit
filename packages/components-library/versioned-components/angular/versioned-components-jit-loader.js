const componentList = require('../components-list')
const version = require('../version')
const suffix = `-${version}`;

const componentsMapperList = componentList.map(component => ({search: component, replace: component + suffix, flags: 'g'}))
module.exports = componentsMapperList
