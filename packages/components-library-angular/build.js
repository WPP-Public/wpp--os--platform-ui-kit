const childProcess = require('child_process')

require('dotenv-extended').config({ path: '../../.env' })

// Run `yalc push`, if it is available
const runYalc = () => childProcess.execSync(`command -v yalc >/dev/null 2>&1 && yalc push`, { stdio: 'inherit' })

const build = () => {
  const myArgs = process.argv.slice(2).join(' ')

  const child = childProcess.spawn('ngc', `--project tsconfig.lib.json ${myArgs}`.split(' '))

  child.stdout.on('data', data => {
    const message = data.toString().slice(0, -1)
    console.log(message)
  })

  child.stderr.on('data', data => {
    const message = data.toString().slice(0, -1)
    console.log(message)

    if (message.includes('Compilation complete.')) {
      // runYalc()
    }
  })

  if (!myArgs.includes('--watch')) {
    child.on('close', code => {
      if (code === 0 && process.env.RUN_YALC) {
        // runYalc()
      }
    })
  }
}

build()
