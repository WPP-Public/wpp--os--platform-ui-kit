const selectors = require('../components-list');
const version = require('../version')
const suffix = typeof version === 'string' ? `-${version}` : `-${version.default}`;

module.exports = function (source) {
  const templateRegExp = new RegExp(/(domElement|element)(Start|End)?\(.*/g)
  const isTemplate = templateRegExp.test(source);

  if(isTemplate) {
    const quotesPattern = `['"]`;
    const selectorsPattern = selectors.join('|');
    const pattern = new RegExp(`(${quotesPattern})(${selectorsPattern})(${quotesPattern})`, 'g');

    return source.replace(pattern, `$1$2${suffix}$3`);
  }

  return source
}
