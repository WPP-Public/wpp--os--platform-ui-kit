import Quill from 'quill';
const DOWNCONVERT_STYLES = ['width', 'height'];
const STYLES = ['float'];
const STYLE_VALUES = {
  float: ['left', 'right'],
};
/**
 * Creates a class that extends Quill's built-in Image format
 * (or a derived class) with functionality to recognize and
 * apply additional formats known to this package.
 *
 * Relies on the base-class implementation for width and height,
 * so it may break if inheritance is not properly preserved, i.e.
 * if another module completely overrides Image.
 *
 * To avoid import-ordering issues, this is a class factory
 * instead of a statically defined class.
 */
export function extendBlot(Blot) {
  return class BlotWithFormats extends Blot {
    static formats(domNode) {
      // img attributes (width, height, etc)
      const inherited = Blot.formats(domNode);
      // CSS styles (float, etc)
      const local = STYLES.reduce((formats, style) => {
        // @ts-ignore types
        const value = domNode.style[style];
        // @ts-ignore types
        if (value && STYLE_VALUES[style].indexOf(value) >= 0)
          formats[style] = value;
        return formats;
      }, {});
      // CSS styles that should be attributes, but might be pasted from
      // noncomformant source -- downconvert them to attributes
      const downconverted = DOWNCONVERT_STYLES.reduce((formats, style) => {
        // @ts-ignore types
        const value = domNode.style[style];
        if (!domNode.dataset.dontDownconvert && value && value.endsWith('px')) {
          // @ts-ignore types
          formats[style] = value.replace('px', '');
        }
        return formats;
      }, {});
      return Object.assign({}, inherited, downconverted, local);
    }
  };
}
export function extendBlotNames(blotNames) {
  blotNames.forEach(blotName => {
    Quill.register(blotName, extendBlot(Quill.import(blotName)), true);
  });
}
