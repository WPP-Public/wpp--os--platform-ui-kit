const fs = require('fs')

const NODE_MODULES_FILE = '../../node_modules/air-datepicker/air-datepicker.css'
const DEST_FILE = 'src/datepicker.css'

const GLOBAL_DATEPICKER_STYLES = 'src/global.scss'
const LOCAL_DATEPICKER_STYLES = 'src/components/wpp-datepicker/wpp-datepicker.scss'

const IMPORT_STATEMENT_LOCAL_COMPONENT = "@import '../../datepicker.css';\n"

const attachImportToFile = (pathToFile, importStatement, sassToCss) => {
  fs.readFile(pathToFile, 'utf8', (err, fileContent) => {
    if (err) {
      console.error('Error reading local global.scss file:', err)
      return
    }

    if (fileContent.includes(importStatement)) {
      if (sassToCss) {
        sassToCss('src/global')
      }
      return
    }

    fs.writeFile(pathToFile, importStatement + fileContent, err => {
      if (err) {
        console.error('Error updating global.scss file:', err)
        return
      }

      if (sassToCss) {
        sassToCss('src/global')
      }
    })
  })
}

const copyAirDatepickerStyles = sassToCss =>
  fs.readFile(NODE_MODULES_FILE, 'utf8', (err, cssContent) => {
    if (err) {
      console.error('Error reading package file:', err)
      return
    }

    fs.writeFile(DEST_FILE, cssContent, err => {
      if (err) {
        console.error('Error copying file from NODE_MODULES:', err)
        return
      }

      attachImportToFile(GLOBAL_DATEPICKER_STYLES, cssContent + '\n', sassToCss)
      attachImportToFile(LOCAL_DATEPICKER_STYLES, IMPORT_STATEMENT_LOCAL_COMPONENT, undefined)
    })
  })

module.exports = copyAirDatepickerStyles
