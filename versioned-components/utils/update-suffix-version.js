const fs = require('fs')
const path = require('path')

const transformToDashedVersion = (version) => {
  return `v${version.replaceAll('.', '-')}`
}

const updateSuffixVersion = () => {
  const rawData = fs.readFileSync(path.join(__dirname, '../../package.json'))
  const version = JSON.parse(rawData).version
  const dashedVersion =  transformToDashedVersion(version)

  fs.writeFileSync(path.join(__dirname, '../version.js'), `"use strict";\rexports.__esModule = true;\rvar version = "${dashedVersion}";\rexports["default"] = version;\r
  `, (err) => {
    if (err) return console.log(err);
    console.log('Version is updated');
  })

  fs.writeFileSync(path.join(__dirname, '../version.ts'), `const version = "${dashedVersion}"\rexport default version`, (err) => {
    if (err) return console.log(err);
    console.log('Version is updated');
  })

  return dashedVersion
}

module.exports = updateSuffixVersion

