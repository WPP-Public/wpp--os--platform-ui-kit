const sass = require('sass')
const fs = require('fs')

const sassToCss = path => {
  const result = sass.compile(path + '.scss')
  fs.writeFileSync(path + '.css', result.css)
}

module.exports = sassToCss
