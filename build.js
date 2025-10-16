const childProcess = require('child_process')

require('dotenv-extended').config({ path: '../../.env' })

const updateSuffixVersion = require('./versioned-components/utils/update-suffix-version')
const generateComponentsList = require('./versioned-components/utils/components-list-generator')
const updateStories = require('./versioned-components/utils/update-stories')
const updateFrameworkBindings = require('./versioned-components/utils/update-framework-bindings')
const sassToCss = require('./versioned-components/utils/sass-to-css')
const copyAirDatepickerStyles = require('./versioned-components/utils/create-datepicker-styles-file')

// Run `yalc push`, if it is available
const runYalc = () => childProcess.execSync(`command -v yalc >/dev/null 2>&1 && yalc push`, { stdio: 'inherit' })

const build = () => {
  copyAirDatepickerStyles(sassToCss)

  const myArgs = process.argv.slice(2).join(' ')

  sassToCss('src/shared/styles/grid')
  sassToCss('src/components/swiper/swiper')

  const dashedVersion = updateSuffixVersion()
  generateComponentsList()
  updateStories(dashedVersion)
  updateFrameworkBindings(dashedVersion)

  const child = childProcess.spawn('stencil', `build --docs --tagNamePostfix ${dashedVersion} ${myArgs}`.split(' '))

  // The only way found to run command after each rebuild
  child.stdout.on('data', data => {
    const message = data.toString().slice(0, -1)

    // Filter out annoying warnings about outdated caniuse-lite
    if (!message.startsWith('Browserslist:')) {
      console.log(message)
    }

    if (message.includes('build finished') && process.env.RUN_YALC) {
      // runYalc()
    }
  })

  child.stderr.on('data', data => {
    const message = data.toString().slice(0, -1)
    console.log(message)
  })
}

build()
