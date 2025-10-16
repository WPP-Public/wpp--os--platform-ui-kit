const fs = require('fs')
const path = require('path')

const getFiles = dir => {
  const dirs = fs.readdirSync(dir, { withFileTypes: true })
  const files = dirs.map(dirent => {
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : res
  })
  return [...files].flat()
}

const updateStories = version => {
  const files = getFiles(path.join(__dirname, '../../'))
  const stories = files.filter(i => i.includes('stories.tsx'))

  stories.forEach(storyPath => {
    const storyInfo = fs.readFileSync(storyPath, { encoding: 'utf8' })
    const updatedStoryInfo = storyInfo.replace(/((?:<|<\/)wpp-[a-zA-Z0-9-]+)(-v[0-9-]+)/g, `$1-${version}`)
    fs.writeFileSync(storyPath, updatedStoryInfo)
  })
}

module.exports = updateStories
