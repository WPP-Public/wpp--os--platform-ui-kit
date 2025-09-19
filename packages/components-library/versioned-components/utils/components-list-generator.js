const fs = require('fs')
const path = require('path')

const generateComponentsList = () => {
  const file = fs.readFileSync(path.join(__dirname, '../../src/components.d.ts'), 'utf-8')

  const intrinsicElementsRegex = new RegExp('interface IntrinsicElements {((.|\\n|\\r| )*?)}')
  const intrinsicElements = intrinsicElementsRegex.exec(file)[0]

  const componentRegexp = new RegExp(/"(.*?)"/, 'g')
  const componentsList = [...intrinsicElements.matchAll(componentRegexp)].map(elem => elem[0])

  fs.writeFileSync(
    path.join(__dirname, '../components-list.js'),
    `const componentsList = [${componentsList}]; \rmodule.exports = componentsList`,
    err => {
      if (err) return console.log(err)
      console.log('Components list generated')
    },
  )
}

module.exports = generateComponentsList
