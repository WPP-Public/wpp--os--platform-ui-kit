const fs = require('fs')
const path = require('path')

const updateFrameworkBindings = (version) => {
  const wppComponentRegexp = /wpp-[a-zA-Z-]+-v[0-9-]+/g
  const filePath = path.join(__dirname, '../../framework-bindings/angular-bindings.ts')
  const file = fs.readFileSync(filePath, 'utf-8').toString()

  const updatedFile = file.replace(wppComponentRegexp, (componentName) => {
    const string = componentName.includes('-v') ? componentName.substring(0, componentName.indexOf('-v')) : componentName
    return string + '-' + version
  })

  fs.writeFileSync(filePath, updatedFile)
}

module.exports = updateFrameworkBindings
