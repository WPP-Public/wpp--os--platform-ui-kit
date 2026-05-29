'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const marked_umd = require('./marked.umd-e1074c94.js');
const utils = require('./utils-2231f97a.js');
const _commonjsHelpers = require('./_commonjsHelpers-bcc1208a.js');
const utils$1 = require('./utils-b74e20f1.js');
const _const = require('./const-09fdf30a.js');
const _const$1 = require('./const-04a83f05.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');
const consts = require('./consts-d8f5ef98.js');
const subscribeToTheme = require('./subscribe-to-theme-fc5de7fe.js');
require('./lodash-6b012aab.js');

const md = new marked_umd.marked_umd.Marked({
  gfm: true,
  breaks: true,
});
const extractImageData = (t) => {
  if (t.type === 'image') {
    const img = t;
    return { href: img.href, alt: img.text || img.title || '' };
  }
  if (t.type === 'link') {
    const link = t;
    const img = link.tokens?.find(inner => inner.type === 'image');
    if (img) {
      return { href: img.href, alt: img.text || img.title || '', linkHref: link.href };
    }
  }
  return null;
};
const transformImageGroups = (token) => {
  if (token.type !== 'paragraph')
    return;
  const tokens = token.tokens ?? [];
  const imageDataArr = [];
  let hasNonImageContent = false;
  for (const t of tokens) {
    if (t.type === 'br' || t.type === 'space')
      continue;
    if (t.type === 'text' && !t.text.trim())
      continue;
    const imageData = extractImageData(t);
    if (imageData) {
      imageDataArr.push(imageData);
    }
    else {
      hasNonImageContent = true;
      break;
    }
  }
  if (!hasNonImageContent && imageDataArr.length > 0) {
    const group = token;
    group.type = 'image_group';
    group.images = imageDataArr;
  }
};
const getMarkdownTokens = (text) => {
  const tokens = md.lexer(text);
  tokens.forEach(transformImageGroups);
  return tokens;
};
const findSafeBoundary = (text) => {
  let inCodeFence = false;
  let lastBoundary = -1;
  let i = 0;
  while (i < text.length) {
    // Detect an opening/closing code fence at the start of a line
    if ((i === 0 || text[i - 1] === '\n') && (text[i] === '`' || text[i] === '~')) {
      const fenceChar = text[i];
      let fenceLen = 0;
      while (i + fenceLen < text.length && text[i + fenceLen] === fenceChar) {
        fenceLen++;
      }
      if (fenceLen >= 3) {
        const lineEnd = text.indexOf('\n', i + fenceLen);
        if (inCodeFence) {
          // Closing fence - safe to commit after this line
          inCodeFence = false;
          if (lineEnd !== -1)
            lastBoundary = lineEnd + 1;
        }
        else {
          inCodeFence = true;
        }
        i = lineEnd === -1 ? text.length : lineEnd + 1;
        continue;
      }
    }
    // Blank line outside a code fence = block boundary
    if (!inCodeFence && text[i] === '\n' && i + 1 < text.length && text[i + 1] === '\n') {
      lastBoundary = i + 2;
    }
    i++;
  }
  // If inside an unclosed code fence = do not commit changes and process further
  return inCodeFence ? -1 : lastBoundary;
};
const handleDownload = async (href, alt) => {
  try {
    const response = await fetch(href);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = alt || 'image';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }
  catch (error) {
    console.error('Image download failed:', error);
  }
};

var purify = _commonjsHelpers.createCommonjsModule(function (module, exports) {
/*! @license DOMPurify 3.4.2 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.2/LICENSE */

(function (global, factory) {
    module.exports = factory() ;
})(_commonjsHelpers.commonjsGlobal, (function () {
    const {
      entries,
      setPrototypeOf,
      isFrozen,
      getPrototypeOf,
      getOwnPropertyDescriptor
    } = Object;
    let {
      freeze,
      seal,
      create
    } = Object; // eslint-disable-line import/no-mutable-exports
    let {
      apply,
      construct
    } = typeof Reflect !== 'undefined' && Reflect;
    if (!freeze) {
      freeze = function freeze(x) {
        return x;
      };
    }
    if (!seal) {
      seal = function seal(x) {
        return x;
      };
    }
    if (!apply) {
      apply = function apply(func, thisArg) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        return func.apply(thisArg, args);
      };
    }
    if (!construct) {
      construct = function construct(Func) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        return new Func(...args);
      };
    }
    const arrayForEach = unapply(Array.prototype.forEach);
    const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
    const arrayPop = unapply(Array.prototype.pop);
    const arrayPush = unapply(Array.prototype.push);
    const arraySplice = unapply(Array.prototype.splice);
    const arrayIsArray = Array.isArray;
    const stringToLowerCase = unapply(String.prototype.toLowerCase);
    const stringToString = unapply(String.prototype.toString);
    const stringMatch = unapply(String.prototype.match);
    const stringReplace = unapply(String.prototype.replace);
    const stringIndexOf = unapply(String.prototype.indexOf);
    const stringTrim = unapply(String.prototype.trim);
    const numberToString = unapply(Number.prototype.toString);
    const booleanToString = unapply(Boolean.prototype.toString);
    const bigintToString = typeof BigInt === 'undefined' ? null : unapply(BigInt.prototype.toString);
    const symbolToString = typeof Symbol === 'undefined' ? null : unapply(Symbol.prototype.toString);
    const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
    const objectToString = unapply(Object.prototype.toString);
    const regExpTest = unapply(RegExp.prototype.test);
    const typeErrorCreate = unconstruct(TypeError);
    /**
     * Creates a new function that calls the given function with a specified thisArg and arguments.
     *
     * @param func - The function to be wrapped and called.
     * @returns A new function that calls the given function with a specified thisArg and arguments.
     */
    function unapply(func) {
      return function (thisArg) {
        if (thisArg instanceof RegExp) {
          thisArg.lastIndex = 0;
        }
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }
        return apply(func, thisArg, args);
      };
    }
    /**
     * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
     *
     * @param func - The constructor function to be wrapped and called.
     * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
     */
    function unconstruct(Func) {
      return function () {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return construct(Func, args);
      };
    }
    /**
     * Add properties to a lookup table
     *
     * @param set - The set to which elements will be added.
     * @param array - The array containing elements to be added to the set.
     * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
     * @returns The modified set with added elements.
     */
    function addToSet(set, array) {
      let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
      if (setPrototypeOf) {
        // Make 'in' and truthy checks like Boolean(set.constructor)
        // independent of any properties defined on Object.prototype.
        // Prevent prototype setters from intercepting set as a this value.
        setPrototypeOf(set, null);
      }
      if (!arrayIsArray(array)) {
        return set;
      }
      let l = array.length;
      while (l--) {
        let element = array[l];
        if (typeof element === 'string') {
          const lcElement = transformCaseFunc(element);
          if (lcElement !== element) {
            // Config presets (e.g. tags.js, attrs.js) are immutable.
            if (!isFrozen(array)) {
              array[l] = lcElement;
            }
            element = lcElement;
          }
        }
        set[element] = true;
      }
      return set;
    }
    /**
     * Clean up an array to harden against CSPP
     *
     * @param array - The array to be cleaned.
     * @returns The cleaned version of the array
     */
    function cleanArray(array) {
      for (let index = 0; index < array.length; index++) {
        const isPropertyExist = objectHasOwnProperty(array, index);
        if (!isPropertyExist) {
          array[index] = null;
        }
      }
      return array;
    }
    /**
     * Shallow clone an object
     *
     * @param object - The object to be cloned.
     * @returns A new object that copies the original.
     */
    function clone(object) {
      const newObject = create(null);
      for (const [property, value] of entries(object)) {
        const isPropertyExist = objectHasOwnProperty(object, property);
        if (isPropertyExist) {
          if (arrayIsArray(value)) {
            newObject[property] = cleanArray(value);
          } else if (value && typeof value === 'object' && value.constructor === Object) {
            newObject[property] = clone(value);
          } else {
            newObject[property] = value;
          }
        }
      }
      return newObject;
    }
    /**
     * Convert non-node values into strings without depending on direct property access.
     *
     * @param value - The value to stringify.
     * @returns A string representation of the provided value.
     */
    function stringifyValue(value) {
      switch (typeof value) {
        case 'string':
          {
            return value;
          }
        case 'number':
          {
            return numberToString(value);
          }
        case 'boolean':
          {
            return booleanToString(value);
          }
        case 'bigint':
          {
            return bigintToString ? bigintToString(value) : '0';
          }
        case 'symbol':
          {
            return symbolToString ? symbolToString(value) : 'Symbol()';
          }
        case 'undefined':
          {
            return objectToString(value);
          }
        case 'function':
        case 'object':
          {
            if (value === null) {
              return objectToString(value);
            }
            const valueAsRecord = value;
            const valueToString = lookupGetter(valueAsRecord, 'toString');
            if (typeof valueToString === 'function') {
              const stringified = valueToString(valueAsRecord);
              return typeof stringified === 'string' ? stringified : objectToString(stringified);
            }
            return objectToString(value);
          }
        default:
          {
            return objectToString(value);
          }
      }
    }
    /**
     * This method automatically checks if the prop is function or getter and behaves accordingly.
     *
     * @param object - The object to look up the getter function in its prototype chain.
     * @param prop - The property name for which to find the getter function.
     * @returns The getter function found in the prototype chain or a fallback function.
     */
    function lookupGetter(object, prop) {
      while (object !== null) {
        const desc = getOwnPropertyDescriptor(object, prop);
        if (desc) {
          if (desc.get) {
            return unapply(desc.get);
          }
          if (typeof desc.value === 'function') {
            return unapply(desc.value);
          }
        }
        object = getPrototypeOf(object);
      }
      function fallbackValue() {
        return null;
      }
      return fallbackValue;
    }
    function isRegex(value) {
      try {
        regExpTest(value, '');
        return true;
      } catch (_unused) {
        return false;
      }
    }

    const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'search', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);
    const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'enterkeyhint', 'exportparts', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'inputmode', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'part', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
    const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
    // List of SVG elements that are disallowed by default.
    // We still need to know them so that we can do namespace
    // checks properly in case one wants to add them to
    // allow-list.
    const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
    const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);
    // Similarly to SVG, we want to know all MathML elements,
    // even those that we disallow by default.
    const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
    const text = freeze(['#text']);

    const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'exportparts', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inert', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns']);
    const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'amplitude', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'exponent', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'mask-type', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'slope', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'tablevalues', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
    const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnalign', 'columnlines', 'columnspacing', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lquote', 'lspace', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
    const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

    // eslint-disable-next-line unicorn/better-regex
    const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
    const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
    const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm); // eslint-disable-line unicorn/better-regex
    const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
    const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
    const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
    );
    const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
    const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
    );
    const DOCTYPE_NAME = seal(/^html$/i);
    const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

    var EXPRESSIONS = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ARIA_ATTR: ARIA_ATTR,
        ATTR_WHITESPACE: ATTR_WHITESPACE,
        CUSTOM_ELEMENT: CUSTOM_ELEMENT,
        DATA_ATTR: DATA_ATTR,
        DOCTYPE_NAME: DOCTYPE_NAME,
        ERB_EXPR: ERB_EXPR,
        IS_ALLOWED_URI: IS_ALLOWED_URI,
        IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
        MUSTACHE_EXPR: MUSTACHE_EXPR,
        TMPLIT_EXPR: TMPLIT_EXPR
    });

    /* eslint-disable @typescript-eslint/indent */
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const NODE_TYPE = {
      element: 1,
      text: 3,
      // Deprecated
      progressingInstruction: 7,
      comment: 8,
      document: 9};
    const getGlobal = function getGlobal() {
      return typeof window === 'undefined' ? null : window;
    };
    /**
     * Creates a no-op policy for internal use only.
     * Don't export this function outside this module!
     * @param trustedTypes The policy factory.
     * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
     * @return The policy created (or null, if Trusted Types
     * are not supported or creating the policy failed).
     */
    const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
      if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
        return null;
      }
      // Allow the callers to control the unique policy name
      // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
      // Policy creation with duplicate names throws in Trusted Types.
      let suffix = null;
      const ATTR_NAME = 'data-tt-policy-suffix';
      if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
        suffix = purifyHostElement.getAttribute(ATTR_NAME);
      }
      const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
      try {
        return trustedTypes.createPolicy(policyName, {
          createHTML(html) {
            return html;
          },
          createScriptURL(scriptUrl) {
            return scriptUrl;
          }
        });
      } catch (_) {
        // Policy creation failed (most likely another DOMPurify script has
        // already run). Skip creating the policy, as this will only cause errors
        // if TT are enforced.
        console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
        return null;
      }
    };
    const _createHooksMap = function _createHooksMap() {
      return {
        afterSanitizeAttributes: [],
        afterSanitizeElements: [],
        afterSanitizeShadowDOM: [],
        beforeSanitizeAttributes: [],
        beforeSanitizeElements: [],
        beforeSanitizeShadowDOM: [],
        uponSanitizeAttribute: [],
        uponSanitizeElement: [],
        uponSanitizeShadowNode: []
      };
    };
    function createDOMPurify() {
      let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
      const DOMPurify = root => createDOMPurify(root);
      DOMPurify.version = '3.4.2';
      DOMPurify.removed = [];
      if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
        // Not running in a browser, provide a factory function
        // so that you can pass your own Window
        DOMPurify.isSupported = false;
        return DOMPurify;
      }
      let {
        document
      } = window;
      const originalDocument = document;
      const currentScript = originalDocument.currentScript;
      const {
        DocumentFragment,
        HTMLTemplateElement,
        Node,
        Element,
        NodeFilter,
        NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
        HTMLFormElement,
        DOMParser,
        trustedTypes
      } = window;
      const ElementPrototype = Element.prototype;
      const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
      const remove = lookupGetter(ElementPrototype, 'remove');
      const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
      const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
      const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
      // As per issue #47, the web-components registry is inherited by a
      // new document created via createHTMLDocument. As per the spec
      // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
      // a new empty registry is used when creating a template contents owner
      // document, so we use that as our parent document to ensure nothing
      // is inherited.
      if (typeof HTMLTemplateElement === 'function') {
        const template = document.createElement('template');
        if (template.content && template.content.ownerDocument) {
          document = template.content.ownerDocument;
        }
      }
      let trustedTypesPolicy;
      let emptyHTML = '';
      const {
        implementation,
        createNodeIterator,
        createDocumentFragment,
        getElementsByTagName
      } = document;
      const {
        importNode
      } = originalDocument;
      let hooks = _createHooksMap();
      /**
       * Expose whether this browser supports running the full DOMPurify.
       */
      DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
      const {
        MUSTACHE_EXPR,
        ERB_EXPR,
        TMPLIT_EXPR,
        DATA_ATTR,
        ARIA_ATTR,
        IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE,
        CUSTOM_ELEMENT
      } = EXPRESSIONS;
      let {
        IS_ALLOWED_URI: IS_ALLOWED_URI$1
      } = EXPRESSIONS;
      /**
       * We consider the elements and attributes below to be safe. Ideally
       * don't add any new ones but feel free to remove unwanted ones.
       */
      /* allowed element names */
      let ALLOWED_TAGS = null;
      const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
      /* Allowed attribute names */
      let ALLOWED_ATTR = null;
      const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
      /*
       * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
       * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
       * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
       * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
       */
      let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
        tagNameCheck: {
          writable: true,
          configurable: false,
          enumerable: true,
          value: null
        },
        attributeNameCheck: {
          writable: true,
          configurable: false,
          enumerable: true,
          value: null
        },
        allowCustomizedBuiltInElements: {
          writable: true,
          configurable: false,
          enumerable: true,
          value: false
        }
      }));
      /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
      let FORBID_TAGS = null;
      /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
      let FORBID_ATTR = null;
      /* Config object to store ADD_TAGS/ADD_ATTR functions (when used as functions) */
      const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
        tagCheck: {
          writable: true,
          configurable: false,
          enumerable: true,
          value: null
        },
        attributeCheck: {
          writable: true,
          configurable: false,
          enumerable: true,
          value: null
        }
      }));
      /* Decide if ARIA attributes are okay */
      let ALLOW_ARIA_ATTR = true;
      /* Decide if custom data attributes are okay */
      let ALLOW_DATA_ATTR = true;
      /* Decide if unknown protocols are okay */
      let ALLOW_UNKNOWN_PROTOCOLS = false;
      /* Decide if self-closing tags in attributes are allowed.
       * Usually removed due to a mXSS issue in jQuery 3.0 */
      let ALLOW_SELF_CLOSE_IN_ATTR = true;
      /* Output should be safe for common template engines.
       * This means, DOMPurify removes data attributes, mustaches and ERB
       */
      let SAFE_FOR_TEMPLATES = false;
      /* Output should be safe even for XML used within HTML and alike.
       * This means, DOMPurify removes comments when containing risky content.
       */
      let SAFE_FOR_XML = true;
      /* Decide if document with <html>... should be returned */
      let WHOLE_DOCUMENT = false;
      /* Track whether config is already set on this instance of DOMPurify. */
      let SET_CONFIG = false;
      /* Decide if all elements (e.g. style, script) must be children of
       * document.body. By default, browsers might move them to document.head */
      let FORCE_BODY = false;
      /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
       * string (or a TrustedHTML object if Trusted Types are supported).
       * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
       */
      let RETURN_DOM = false;
      /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
       * string  (or a TrustedHTML object if Trusted Types are supported) */
      let RETURN_DOM_FRAGMENT = false;
      /* Try to return a Trusted Type object instead of a string, return a string in
       * case Trusted Types are not supported  */
      let RETURN_TRUSTED_TYPE = false;
      /* Output should be free from DOM clobbering attacks?
       * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
       */
      let SANITIZE_DOM = true;
      /* Achieve full DOM Clobbering protection by isolating the namespace of named
       * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
       *
       * HTML/DOM spec rules that enable DOM Clobbering:
       *   - Named Access on Window (§7.3.3)
       *   - DOM Tree Accessors (§3.1.5)
       *   - Form Element Parent-Child Relations (§4.10.3)
       *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
       *   - HTMLCollection (§4.2.10.2)
       *
       * Namespace isolation is implemented by prefixing `id` and `name` attributes
       * with a constant string, i.e., `user-content-`
       */
      let SANITIZE_NAMED_PROPS = false;
      const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
      /* Keep element content when removing element? */
      let KEEP_CONTENT = true;
      /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
       * of importing it into a new Document and returning a sanitized copy */
      let IN_PLACE = false;
      /* Allow usage of profiles like html, svg and mathMl */
      let USE_PROFILES = {};
      /* Tags to ignore content of when KEEP_CONTENT is true */
      let FORBID_CONTENTS = null;
      const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
      /* Tags that are safe for data: URIs */
      let DATA_URI_TAGS = null;
      const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
      /* Attributes safe for values like "javascript:" */
      let URI_SAFE_ATTRIBUTES = null;
      const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
      const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
      const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
      const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
      /* Document namespace */
      let NAMESPACE = HTML_NAMESPACE;
      let IS_EMPTY_INPUT = false;
      /* Allowed XHTML+XML namespaces */
      let ALLOWED_NAMESPACES = null;
      const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
      let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
      let HTML_INTEGRATION_POINTS = addToSet({}, ['annotation-xml']);
      // Certain elements are allowed in both SVG and HTML
      // namespace. We need to specify them explicitly
      // so that they don't get erroneously deleted from
      // HTML namespace.
      const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
      /* Parsing of strict XHTML documents */
      let PARSER_MEDIA_TYPE = null;
      const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
      const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
      let transformCaseFunc = null;
      /* Keep a reference to config to pass to hooks */
      let CONFIG = null;
      /* Ideally, do not touch anything below this line */
      /* ______________________________________________ */
      const formElement = document.createElement('form');
      const isRegexOrFunction = function isRegexOrFunction(testValue) {
        return testValue instanceof RegExp || testValue instanceof Function;
      };
      /**
       * _parseConfig
       *
       * @param cfg optional config literal
       */
      // eslint-disable-next-line complexity
      const _parseConfig = function _parseConfig() {
        let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (CONFIG && CONFIG === cfg) {
          return;
        }
        /* Shield configuration object from tampering */
        if (!cfg || typeof cfg !== 'object') {
          cfg = {};
        }
        /* Shield configuration object from prototype pollution */
        cfg = clone(cfg);
        PARSER_MEDIA_TYPE =
        // eslint-disable-next-line unicorn/prefer-includes
        SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
        // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
        transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
        /* Set configuration parameters */
        ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') && arrayIsArray(cfg.ALLOWED_TAGS) ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
        ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') && arrayIsArray(cfg.ALLOWED_ATTR) ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
        ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') && arrayIsArray(cfg.ALLOWED_NAMESPACES) ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
        URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') && arrayIsArray(cfg.ADD_URI_SAFE_ATTR) ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
        DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') && arrayIsArray(cfg.ADD_DATA_URI_TAGS) ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
        FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') && arrayIsArray(cfg.FORBID_CONTENTS) ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
        FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') && arrayIsArray(cfg.FORBID_TAGS) ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
        FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') && arrayIsArray(cfg.FORBID_ATTR) ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
        USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === 'object' ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
        ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
        ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
        ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
        ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
        SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
        SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
        WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
        RETURN_DOM = cfg.RETURN_DOM || false; // Default false
        RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
        RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
        FORCE_BODY = cfg.FORCE_BODY || false; // Default false
        SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
        SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
        KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
        IN_PLACE = cfg.IN_PLACE || false; // Default false
        IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI; // Default regexp
        NAMESPACE = typeof cfg.NAMESPACE === 'string' ? cfg.NAMESPACE : HTML_NAMESPACE; // Default HTML namespace
        MATHML_TEXT_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'MATHML_TEXT_INTEGRATION_POINTS') && cfg.MATHML_TEXT_INTEGRATION_POINTS && typeof cfg.MATHML_TEXT_INTEGRATION_POINTS === 'object' ? clone(cfg.MATHML_TEXT_INTEGRATION_POINTS) : addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']); // Default built-in map
        HTML_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'HTML_INTEGRATION_POINTS') && cfg.HTML_INTEGRATION_POINTS && typeof cfg.HTML_INTEGRATION_POINTS === 'object' ? clone(cfg.HTML_INTEGRATION_POINTS) : addToSet({}, ['annotation-xml']); // Default built-in map
        const customElementHandling = objectHasOwnProperty(cfg, 'CUSTOM_ELEMENT_HANDLING') && cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING === 'object' ? clone(cfg.CUSTOM_ELEMENT_HANDLING) : create(null);
        CUSTOM_ELEMENT_HANDLING = create(null);
        if (objectHasOwnProperty(customElementHandling, 'tagNameCheck') && isRegexOrFunction(customElementHandling.tagNameCheck)) {
          CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck; // Default undefined
        }
        if (objectHasOwnProperty(customElementHandling, 'attributeNameCheck') && isRegexOrFunction(customElementHandling.attributeNameCheck)) {
          CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck; // Default undefined
        }
        if (objectHasOwnProperty(customElementHandling, 'allowCustomizedBuiltInElements') && typeof customElementHandling.allowCustomizedBuiltInElements === 'boolean') {
          CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements; // Default undefined
        }
        if (SAFE_FOR_TEMPLATES) {
          ALLOW_DATA_ATTR = false;
        }
        if (RETURN_DOM_FRAGMENT) {
          RETURN_DOM = true;
        }
        /* Parse profile info */
        if (USE_PROFILES) {
          ALLOWED_TAGS = addToSet({}, text);
          ALLOWED_ATTR = create(null);
          if (USE_PROFILES.html === true) {
            addToSet(ALLOWED_TAGS, html$1);
            addToSet(ALLOWED_ATTR, html);
          }
          if (USE_PROFILES.svg === true) {
            addToSet(ALLOWED_TAGS, svg$1);
            addToSet(ALLOWED_ATTR, svg);
            addToSet(ALLOWED_ATTR, xml);
          }
          if (USE_PROFILES.svgFilters === true) {
            addToSet(ALLOWED_TAGS, svgFilters);
            addToSet(ALLOWED_ATTR, svg);
            addToSet(ALLOWED_ATTR, xml);
          }
          if (USE_PROFILES.mathMl === true) {
            addToSet(ALLOWED_TAGS, mathMl$1);
            addToSet(ALLOWED_ATTR, mathMl);
            addToSet(ALLOWED_ATTR, xml);
          }
        }
        /* Always reset function-based ADD_TAGS / ADD_ATTR checks to prevent
         * leaking across calls when switching from function to array config */
        EXTRA_ELEMENT_HANDLING.tagCheck = null;
        EXTRA_ELEMENT_HANDLING.attributeCheck = null;
        /* Merge configuration parameters */
        if (objectHasOwnProperty(cfg, 'ADD_TAGS')) {
          if (typeof cfg.ADD_TAGS === 'function') {
            EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
          } else if (arrayIsArray(cfg.ADD_TAGS)) {
            if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
              ALLOWED_TAGS = clone(ALLOWED_TAGS);
            }
            addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
          }
        }
        if (objectHasOwnProperty(cfg, 'ADD_ATTR')) {
          if (typeof cfg.ADD_ATTR === 'function') {
            EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
          } else if (arrayIsArray(cfg.ADD_ATTR)) {
            if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
              ALLOWED_ATTR = clone(ALLOWED_ATTR);
            }
            addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
          }
        }
        if (objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') && arrayIsArray(cfg.ADD_URI_SAFE_ATTR)) {
          addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
        }
        if (objectHasOwnProperty(cfg, 'FORBID_CONTENTS') && arrayIsArray(cfg.FORBID_CONTENTS)) {
          if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
            FORBID_CONTENTS = clone(FORBID_CONTENTS);
          }
          addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
        }
        if (objectHasOwnProperty(cfg, 'ADD_FORBID_CONTENTS') && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
          if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
            FORBID_CONTENTS = clone(FORBID_CONTENTS);
          }
          addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
        }
        /* Add #text in case KEEP_CONTENT is set to true */
        if (KEEP_CONTENT) {
          ALLOWED_TAGS['#text'] = true;
        }
        /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
        if (WHOLE_DOCUMENT) {
          addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
        }
        /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
        if (ALLOWED_TAGS.table) {
          addToSet(ALLOWED_TAGS, ['tbody']);
          delete FORBID_TAGS.tbody;
        }
        if (cfg.TRUSTED_TYPES_POLICY) {
          if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
            throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
          }
          if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
            throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
          }
          // Overwrite existing TrustedTypes policy.
          trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
          // Sign local variables required by `sanitize`.
          emptyHTML = trustedTypesPolicy.createHTML('');
        } else {
          // Uninitialized policy, attempt to initialize the internal dompurify policy.
          if (trustedTypesPolicy === undefined) {
            trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
          }
          // If creating the internal policy succeeded sign internal variables.
          if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
            emptyHTML = trustedTypesPolicy.createHTML('');
          }
        }
        // Prevent further manipulation of configuration.
        // Not available in IE8, Safari 5, etc.
        if (freeze) {
          freeze(cfg);
        }
        CONFIG = cfg;
      };
      /* Keep track of all possible SVG and MathML tags
       * so that we can perform the namespace checks
       * correctly. */
      const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
      const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
      /**
       * @param element a DOM element whose namespace is being checked
       * @returns Return false if the element has a
       *  namespace that a spec-compliant parser would never
       *  return. Return true otherwise.
       */
      const _checkValidNamespace = function _checkValidNamespace(element) {
        let parent = getParentNode(element);
        // In JSDOM, if we're inside shadow DOM, then parentNode
        // can be null. We just simulate parent in this case.
        if (!parent || !parent.tagName) {
          parent = {
            namespaceURI: NAMESPACE,
            tagName: 'template'
          };
        }
        const tagName = stringToLowerCase(element.tagName);
        const parentTagName = stringToLowerCase(parent.tagName);
        if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
          return false;
        }
        if (element.namespaceURI === SVG_NAMESPACE) {
          // The only way to switch from HTML namespace to SVG
          // is via <svg>. If it happens via any other tag, then
          // it should be killed.
          if (parent.namespaceURI === HTML_NAMESPACE) {
            return tagName === 'svg';
          }
          // The only way to switch from MathML to SVG is via`
          // svg if parent is either <annotation-xml> or MathML
          // text integration points.
          if (parent.namespaceURI === MATHML_NAMESPACE) {
            return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
          }
          // We only allow elements that are defined in SVG
          // spec. All others are disallowed in SVG namespace.
          return Boolean(ALL_SVG_TAGS[tagName]);
        }
        if (element.namespaceURI === MATHML_NAMESPACE) {
          // The only way to switch from HTML namespace to MathML
          // is via <math>. If it happens via any other tag, then
          // it should be killed.
          if (parent.namespaceURI === HTML_NAMESPACE) {
            return tagName === 'math';
          }
          // The only way to switch from SVG to MathML is via
          // <math> and HTML integration points
          if (parent.namespaceURI === SVG_NAMESPACE) {
            return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
          }
          // We only allow elements that are defined in MathML
          // spec. All others are disallowed in MathML namespace.
          return Boolean(ALL_MATHML_TAGS[tagName]);
        }
        if (element.namespaceURI === HTML_NAMESPACE) {
          // The only way to switch from SVG to HTML is via
          // HTML integration points, and from MathML to HTML
          // is via MathML text integration points
          if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
            return false;
          }
          if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
            return false;
          }
          // We disallow tags that are specific for MathML
          // or SVG and should never appear in HTML namespace
          return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
        }
        // For XHTML and XML documents that support custom namespaces
        if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
          return true;
        }
        // The code should never reach this place (this means
        // that the element somehow got namespace that is not
        // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
        // Return false just in case.
        return false;
      };
      /**
       * _forceRemove
       *
       * @param node a DOM node
       */
      const _forceRemove = function _forceRemove(node) {
        arrayPush(DOMPurify.removed, {
          element: node
        });
        try {
          // eslint-disable-next-line unicorn/prefer-dom-node-remove
          getParentNode(node).removeChild(node);
        } catch (_) {
          remove(node);
        }
      };
      /**
       * _removeAttribute
       *
       * @param name an Attribute name
       * @param element a DOM node
       */
      const _removeAttribute = function _removeAttribute(name, element) {
        try {
          arrayPush(DOMPurify.removed, {
            attribute: element.getAttributeNode(name),
            from: element
          });
        } catch (_) {
          arrayPush(DOMPurify.removed, {
            attribute: null,
            from: element
          });
        }
        element.removeAttribute(name);
        // We void attribute values for unremovable "is" attributes
        if (name === 'is') {
          if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
            try {
              _forceRemove(element);
            } catch (_) {}
          } else {
            try {
              element.setAttribute(name, '');
            } catch (_) {}
          }
        }
      };
      /**
       * _initDocument
       *
       * @param dirty - a string of dirty markup
       * @return a DOM, filled with the dirty markup
       */
      const _initDocument = function _initDocument(dirty) {
        /* Create a HTML document */
        let doc = null;
        let leadingWhitespace = null;
        if (FORCE_BODY) {
          dirty = '<remove></remove>' + dirty;
        } else {
          /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
          const matches = stringMatch(dirty, /^[\r\n\t ]+/);
          leadingWhitespace = matches && matches[0];
        }
        if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
          // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
          dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
        }
        const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
        /*
         * Use the DOMParser API by default, fallback later if needs be
         * DOMParser not work for svg when has multiple root element.
         */
        if (NAMESPACE === HTML_NAMESPACE) {
          try {
            doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
          } catch (_) {}
        }
        /* Use createHTMLDocument in case DOMParser is not available */
        if (!doc || !doc.documentElement) {
          doc = implementation.createDocument(NAMESPACE, 'template', null);
          try {
            doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
          } catch (_) {
            // Syntax error if dirtyPayload is invalid xml
          }
        }
        const body = doc.body || doc.documentElement;
        if (dirty && leadingWhitespace) {
          body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
        }
        /* Work on whole document or just its body */
        if (NAMESPACE === HTML_NAMESPACE) {
          return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
        }
        return WHOLE_DOCUMENT ? doc.documentElement : body;
      };
      /**
       * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
       *
       * @param root The root element or node to start traversing on.
       * @return The created NodeIterator
       */
      const _createNodeIterator = function _createNodeIterator(root) {
        return createNodeIterator.call(root.ownerDocument || root, root,
        // eslint-disable-next-line no-bitwise
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
      };
      /**
       * _isClobbered
       *
       * @param element element to check for clobbering attacks
       * @return true if clobbered, false if safe
       */
      const _isClobbered = function _isClobbered(element) {
        return element instanceof HTMLFormElement && (typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function');
      };
      /**
       * Checks whether the given object is a DOM node.
       *
       * @param value object to check whether it's a DOM node
       * @return true is object is a DOM node
       */
      const _isNode = function _isNode(value) {
        return typeof Node === 'function' && value instanceof Node;
      };
      function _executeHooks(hooks, currentNode, data) {
        arrayForEach(hooks, hook => {
          hook.call(DOMPurify, currentNode, data, CONFIG);
        });
      }
      /**
       * _sanitizeElements
       *
       * @protect nodeName
       * @protect textContent
       * @protect removeChild
       * @param currentNode to check for permission to exist
       * @return true if node was killed, false if left alive
       */
      const _sanitizeElements = function _sanitizeElements(currentNode) {
        let content = null;
        /* Execute a hook if present */
        _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
        /* Check if element is clobbered or can clobber */
        if (_isClobbered(currentNode)) {
          _forceRemove(currentNode);
          return true;
        }
        /* Now let's check the element's type and name */
        const tagName = transformCaseFunc(currentNode.nodeName);
        /* Execute a hook if present */
        _executeHooks(hooks.uponSanitizeElement, currentNode, {
          tagName,
          allowedTags: ALLOWED_TAGS
        });
        /* Detect mXSS attempts abusing namespace confusion */
        if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
          _forceRemove(currentNode);
          return true;
        }
        /* Remove risky CSS construction leading to mXSS */
        if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === 'style' && _isNode(currentNode.firstElementChild)) {
          _forceRemove(currentNode);
          return true;
        }
        /* Remove any occurrence of processing instructions */
        if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
          _forceRemove(currentNode);
          return true;
        }
        /* Remove any kind of possibly harmful comments */
        if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
          _forceRemove(currentNode);
          return true;
        }
        /* Remove element if anything forbids its presence */
        if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
          /* Check if we have a custom element to handle */
          if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
            if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
              return false;
            }
            if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
              return false;
            }
          }
          /* Keep content except for bad-listed elements */
          if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
            const parentNode = getParentNode(currentNode) || currentNode.parentNode;
            const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
            if (childNodes && parentNode) {
              const childCount = childNodes.length;
              for (let i = childCount - 1; i >= 0; --i) {
                const childClone = cloneNode(childNodes[i], true);
                parentNode.insertBefore(childClone, getNextSibling(currentNode));
              }
            }
          }
          _forceRemove(currentNode);
          return true;
        }
        /* Check whether element has a valid namespace */
        if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
          _forceRemove(currentNode);
          return true;
        }
        /* Make sure that older browsers don't get fallback-tag mXSS */
        if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
          _forceRemove(currentNode);
          return true;
        }
        /* Sanitize element content to be template-safe */
        if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
          /* Get the element's text content */
          content = currentNode.textContent;
          arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
            content = stringReplace(content, expr, ' ');
          });
          if (currentNode.textContent !== content) {
            arrayPush(DOMPurify.removed, {
              element: currentNode.cloneNode()
            });
            currentNode.textContent = content;
          }
        }
        /* Execute a hook if present */
        _executeHooks(hooks.afterSanitizeElements, currentNode, null);
        return false;
      };
      /**
       * _isValidAttribute
       *
       * @param lcTag Lowercase tag name of containing element.
       * @param lcName Lowercase attribute name.
       * @param value Attribute value.
       * @return Returns true if `value` is valid, otherwise false.
       */
      // eslint-disable-next-line complexity
      const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
        /* FORBID_ATTR must always win, even if ADD_ATTR predicate would allow it */
        if (FORBID_ATTR[lcName]) {
          return false;
        }
        /* Make sure attribute cannot clobber */
        if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
          return false;
        }
        const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
        /* Allow valid data-* attributes: At least one character after "-"
            (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
            XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
            We don't need to check the value; it's always URI safe. */
        if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!nameIsPermitted || FORBID_ATTR[lcName]) {
          if (
          // First condition does a very basic check if a) it's basically a valid custom element tagname AND
          // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
          _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) ||
          // Alternative, second condition checks if it's an `is`-attribute, AND
          // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
            return false;
          }
          /* Check value is safe. First, is attr inert? If so, is safe */
        } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
          return false;
        } else ;
        return true;
      };
      /* Names the HTML spec reserves from valid-custom-element-name; these must
       * never be treated as basic custom elements even when a permissive
       * CUSTOM_ELEMENT_HANDLING.tagNameCheck is configured. */
      const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, ['annotation-xml', 'color-profile', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'missing-glyph']);
      /**
       * _isBasicCustomElement
       * checks if at least one dash is included in tagName, and it's not the first char
       * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
       *
       * @param tagName name of the tag of the node to sanitize
       * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
       */
      const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
        return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT, tagName);
      };
      /**
       * _sanitizeAttributes
       *
       * @protect attributes
       * @protect nodeName
       * @protect removeAttribute
       * @protect setAttribute
       *
       * @param currentNode to sanitize
       */
      const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
        /* Execute a hook if present */
        _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
        const {
          attributes
        } = currentNode;
        /* Check if we have attributes; if not we might have a text node */
        if (!attributes || _isClobbered(currentNode)) {
          return;
        }
        const hookEvent = {
          attrName: '',
          attrValue: '',
          keepAttr: true,
          allowedAttributes: ALLOWED_ATTR,
          forceKeepAttr: undefined
        };
        let l = attributes.length;
        /* Go backwards over all attributes; safely remove bad ones */
        while (l--) {
          const attr = attributes[l];
          const {
            name,
            namespaceURI,
            value: attrValue
          } = attr;
          const lcName = transformCaseFunc(name);
          const initValue = attrValue;
          let value = name === 'value' ? initValue : stringTrim(initValue);
          /* Execute a hook if present */
          hookEvent.attrName = lcName;
          hookEvent.attrValue = value;
          hookEvent.keepAttr = true;
          hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
          _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
          value = hookEvent.attrValue;
          /* Full DOM Clobbering protection via namespace isolation,
           * Prefix id and name attributes with `user-content-`
           */
          if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name') && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
            // Remove the attribute with this value
            _removeAttribute(name, currentNode);
            // Prefix the value and later re-create the attribute with the sanitized value
            value = SANITIZE_NAMED_PROPS_PREFIX + value;
          }
          // Else: already prefixed, leave the attribute alone — the prefix is
          // itself the clobbering protection, and re-applying it is incorrect.
          /* Work around a security issue with comments inside attributes */
          if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
            _removeAttribute(name, currentNode);
            continue;
          }
          /* Make sure we cannot easily use animated hrefs, even if animations are allowed */
          if (lcName === 'attributename' && stringMatch(value, 'href')) {
            _removeAttribute(name, currentNode);
            continue;
          }
          /* Did the hooks approve of the attribute? */
          if (hookEvent.forceKeepAttr) {
            continue;
          }
          /* Did the hooks approve of the attribute? */
          if (!hookEvent.keepAttr) {
            _removeAttribute(name, currentNode);
            continue;
          }
          /* Work around a security issue in jQuery 3.0 */
          if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
            _removeAttribute(name, currentNode);
            continue;
          }
          /* Sanitize attribute content to be template-safe */
          if (SAFE_FOR_TEMPLATES) {
            arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
              value = stringReplace(value, expr, ' ');
            });
          }
          /* Is `value` valid for this attribute? */
          const lcTag = transformCaseFunc(currentNode.nodeName);
          if (!_isValidAttribute(lcTag, lcName, value)) {
            _removeAttribute(name, currentNode);
            continue;
          }
          /* Handle attributes that require Trusted Types */
          if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
            if (namespaceURI) ; else {
              switch (trustedTypes.getAttributeType(lcTag, lcName)) {
                case 'TrustedHTML':
                  {
                    value = trustedTypesPolicy.createHTML(value);
                    break;
                  }
                case 'TrustedScriptURL':
                  {
                    value = trustedTypesPolicy.createScriptURL(value);
                    break;
                  }
              }
            }
          }
          /* Handle invalid data-* attribute set by try-catching it */
          if (value !== initValue) {
            try {
              if (namespaceURI) {
                currentNode.setAttributeNS(namespaceURI, name, value);
              } else {
                /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
                currentNode.setAttribute(name, value);
              }
              if (_isClobbered(currentNode)) {
                _forceRemove(currentNode);
              } else {
                arrayPop(DOMPurify.removed);
              }
            } catch (_) {
              _removeAttribute(name, currentNode);
            }
          }
        }
        /* Execute a hook if present */
        _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
      };
      /**
       * _sanitizeShadowDOM
       *
       * @param fragment to iterate over recursively
       */
      const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
        let shadowNode = null;
        const shadowIterator = _createNodeIterator(fragment);
        /* Execute a hook if present */
        _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
        while (shadowNode = shadowIterator.nextNode()) {
          /* Execute a hook if present */
          _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
          /* Sanitize tags and elements */
          _sanitizeElements(shadowNode);
          /* Check attributes next */
          _sanitizeAttributes(shadowNode);
          /* Deep shadow DOM detected */
          if (shadowNode.content instanceof DocumentFragment) {
            _sanitizeShadowDOM2(shadowNode.content);
          }
        }
        /* Execute a hook if present */
        _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
      };
      // eslint-disable-next-line complexity
      DOMPurify.sanitize = function (dirty) {
        let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        let body = null;
        let importedNode = null;
        let currentNode = null;
        let returnNode = null;
        /* Make sure we have a string to sanitize.
          DO NOT return early, as this will return the wrong type if
          the user has requested a DOM object rather than a string */
        IS_EMPTY_INPUT = !dirty;
        if (IS_EMPTY_INPUT) {
          dirty = '<!-->';
        }
        /* Stringify, in case dirty is an object */
        if (typeof dirty !== 'string' && !_isNode(dirty)) {
          dirty = stringifyValue(dirty);
          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        }
        /* Return dirty HTML if DOMPurify cannot run */
        if (!DOMPurify.isSupported) {
          return dirty;
        }
        /* Assign config vars */
        if (!SET_CONFIG) {
          _parseConfig(cfg);
        }
        /* Clean up removed elements */
        DOMPurify.removed = [];
        /* Check if dirty is correctly typed for IN_PLACE */
        if (typeof dirty === 'string') {
          IN_PLACE = false;
        }
        if (IN_PLACE) {
          /* Do some early pre-sanitization to avoid unsafe root nodes */
          const nn = dirty.nodeName;
          if (typeof nn === 'string') {
            const tagName = transformCaseFunc(nn);
            if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
              throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
            }
          }
        } else if (dirty instanceof Node) {
          /* If dirty is a DOM element, append to an empty document to avoid
             elements being stripped by the parser */
          body = _initDocument('<!---->');
          importedNode = body.ownerDocument.importNode(dirty, true);
          if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
            /* Node is already a body, use as is */
            body = importedNode;
          } else if (importedNode.nodeName === 'HTML') {
            body = importedNode;
          } else {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            body.appendChild(importedNode);
          }
        } else {
          /* Exit directly if we have nothing to do */
          if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
          // eslint-disable-next-line unicorn/prefer-includes
          dirty.indexOf('<') === -1) {
            return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
          }
          /* Initialize the document to work on */
          body = _initDocument(dirty);
          /* Check we have a DOM node from the data */
          if (!body) {
            return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
          }
        }
        /* Remove first element node (ours) if FORCE_BODY is set */
        if (body && FORCE_BODY) {
          _forceRemove(body.firstChild);
        }
        /* Get node iterator */
        const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
        /* Now start iterating over the created document */
        while (currentNode = nodeIterator.nextNode()) {
          /* Sanitize tags and elements */
          _sanitizeElements(currentNode);
          /* Check attributes next */
          _sanitizeAttributes(currentNode);
          /* Shadow DOM detected, sanitize it */
          if (currentNode.content instanceof DocumentFragment) {
            _sanitizeShadowDOM2(currentNode.content);
          }
        }
        /* If we sanitized `dirty` in-place, return it. */
        if (IN_PLACE) {
          return dirty;
        }
        /* Return sanitized string or DOM */
        if (RETURN_DOM) {
          if (SAFE_FOR_TEMPLATES) {
            body.normalize();
            let html = body.innerHTML;
            arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
              html = stringReplace(html, expr, ' ');
            });
            body.innerHTML = html;
          }
          if (RETURN_DOM_FRAGMENT) {
            returnNode = createDocumentFragment.call(body.ownerDocument);
            while (body.firstChild) {
              // eslint-disable-next-line unicorn/prefer-dom-node-append
              returnNode.appendChild(body.firstChild);
            }
          } else {
            returnNode = body;
          }
          if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
            /*
              AdoptNode() is not used because internal state is not reset
              (e.g. the past names map of a HTMLFormElement), this is safe
              in theory but we would rather not risk another attack vector.
              The state that is cloned by importNode() is explicitly defined
              by the specs.
            */
            returnNode = importNode.call(originalDocument, returnNode, true);
          }
          return returnNode;
        }
        let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
        /* Serialize doctype if allowed */
        if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
          serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
        }
        /* Sanitize final string template-safe */
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
            serializedHTML = stringReplace(serializedHTML, expr, ' ');
          });
        }
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
      };
      DOMPurify.setConfig = function () {
        let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _parseConfig(cfg);
        SET_CONFIG = true;
      };
      DOMPurify.clearConfig = function () {
        CONFIG = null;
        SET_CONFIG = false;
      };
      DOMPurify.isValidAttribute = function (tag, attr, value) {
        /* Initialize shared config vars if necessary. */
        if (!CONFIG) {
          _parseConfig({});
        }
        const lcTag = transformCaseFunc(tag);
        const lcName = transformCaseFunc(attr);
        return _isValidAttribute(lcTag, lcName, value);
      };
      DOMPurify.addHook = function (entryPoint, hookFunction) {
        if (typeof hookFunction !== 'function') {
          return;
        }
        arrayPush(hooks[entryPoint], hookFunction);
      };
      DOMPurify.removeHook = function (entryPoint, hookFunction) {
        if (hookFunction !== undefined) {
          const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
          return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
        }
        return arrayPop(hooks[entryPoint]);
      };
      DOMPurify.removeHooks = function (entryPoint) {
        hooks[entryPoint] = [];
      };
      DOMPurify.removeAllHooks = function () {
        hooks = _createHooksMap();
      };
      return DOMPurify;
    }
    var purify = createDOMPurify();

    return purify;

}));
//# sourceMappingURL=purify.js.map
});

const renderImageNode = (role, data, className) => {
  const img = (index.h(index.Fragment, null,
    index.h("img", { src: data.href, alt: data.alt, class: className, loading: "lazy", onError: (e) => {
        const wrap = e.target.closest('.chat-image-error-wrap');
        wrap?.classList.add('chat-image-broken');
      } }),
    index.h("wpp-icon-image-v4-1-0", { role: "presentation", "aria-hidden": "true" })));
  return data.linkHref ? (index.h("a", { href: data.linkHref, target: "_blank", rel: "noopener noreferrer", class: "chat-image-link" }, img)) : role === 'assistant' ? (index.h(index.Fragment, null,
    index.h("wpp-action-button-v4-1-0", { class: "image-download-button", variant: "secondary", onClick: () => handleDownload(data.href, data.alt) },
      index.h("wpp-icon-download-v4-1-0", { slot: "icon-start", "aria-hidden": "true" })),
    img)) : (img);
};
const renderToken = (token, role = 'user') => {
  switch (token.type) {
    case 'space':
      return null;
    case 'heading': {
      const headingTypes = ['2xl-heading', 'xl-heading', 'l-body', 'm-body', 's-body', 'xs-body'];
      const type = headingTypes[token.depth - 1] || 's-body';
      const tag = `h${token.depth}`;
      return (index.h("wpp-typography-v4-1-0", { type: type, tag: tag }, token.tokens ? token.tokens.map(t => renderToken(t)) : token.text));
    }
    case 'del':
      return index.h("del", null, token.tokens?.map(t => renderToken(t)));
    case 'paragraph':
      return (index.h("wpp-typography-v4-1-0", { type: "s-body", tag: "p" }, token.tokens ? token.tokens.map(t => renderToken(t)) : token.text));
    case 'blockquote':
      return index.h("blockquote", { class: "chat-quote" }, token.tokens?.map(t => renderToken(t)));
    case 'strong':
      return (index.h("wpp-typography-v4-1-0", { type: "s-strong", tag: "span" }, token.tokens?.map(t => renderToken(t))));
    case 'em':
      return index.h("em", null, token.tokens?.map(t => renderToken(t)));
    case 'codespan':
      return index.h("code", { class: "inline-code" }, token.text);
    case 'code':
      return (index.h("pre", { class: "code-block" },
        index.h("div", { class: "code-lang" },
          index.h("span", null, token.lang || 'plaintext'),
          index.h("wpp-icon-copy-v4-1-0", { class: "code-block-copy-icon", size: "s", color: "var(--wpp-grey-color-600)", onClick: () => {
              navigator.clipboard.writeText(token.text);
            } })),
        index.h("code", null, token.text)));
    case 'br':
      return index.h("br", null);
    case 'escape':
      return token.text;
    case 'list': {
      const ListTag = token.ordered ? 'ol' : 'ul';
      const isTaskList = token.items.some((item) => item.task);
      return (index.h(ListTag, { class: `chat-list ${isTaskList ? 'chat-list-task' : ''} ${ListTag === 'ol' ? 'chat-list-ordered' : 'chat-list-nonordered'}` }, token.items.map((item) => renderToken(item))));
    }
    case 'list_item': {
      const nestedLists = token.tokens?.filter(t => t.type === 'list') || [];
      const inlineContent = token.tokens?.filter(t => t.type !== 'list') || [];
      return (index.h("li", { class: `chat-list-item ${token.task ? `chat-list-item-task ${token.checked ? 'chat-list-item-task-checked' : ''}` : ''}` },
        token.task && index.h("wpp-icon-tick-v4-1-0", null),
        inlineContent.length > 0 && (index.h("wpp-typography-v4-1-0", { type: "s-body" }, inlineContent.map(t => renderToken(t)))),
        nestedLists.map(t => renderToken(t))));
    }
    case 'table': {
      return (index.h("div", { class: "chat-table-wrapper" },
        index.h("table", { class: "chat-table" },
          index.h("thead", null,
            index.h("tr", null, token.header.map((cell, i) => (index.h("th", { key: i },
              index.h("wpp-typography-v4-1-0", { type: "s-strong" }, cell.tokens?.map((t) => renderToken(t)) ?? cell.text)))))),
          index.h("tbody", null, token.rows.map((row, r) => (index.h("tr", { key: r }, row.map((cell, c) => (index.h("td", { key: c },
            index.h("wpp-typography-v4-1-0", { type: "s-body" }, cell.tokens?.map((t) => renderToken(t)) ?? cell.text)))))))))));
    }
    case 'link':
      if (token.title) {
        return (index.h("wpp-tooltip-v4-1-0", { text: token.title },
          index.h("a", { href: token.href, target: "_blank", rel: "noopener noreferrer", class: "chat-link" }, token.tokens?.length ? token.tokens.map((t) => renderToken(t)) : token.text)));
      }
      return (index.h("a", { href: token.href, target: "_blank", rel: "noopener noreferrer", title: token.title, class: "chat-link" }, token.tokens?.length ? token.tokens.map((t) => renderToken(t)) : token.text));
    case 'image': {
      return (index.h("div", { class: "chat-image-single chat-image-error-wrap" }, renderImageNode(role, { href: token.href, alt: token.text || token.title || '' }, 'chat-image-full')));
    }
    case 'image_group': {
      const { images } = token;
      if (images.length === 1) {
        return (index.h("div", { class: "chat-image-single chat-image-error-wrap" }, renderImageNode(role, images[0], 'chat-image-full')));
      }
      const [first, ...rest] = images;
      return (index.h("div", { class: "chat-image-grid" },
        index.h("div", { class: "chat-image-grid-first chat-image-error-wrap" }, renderImageNode(role, first, 'chat-image-full')),
        index.h("div", { class: "chat-image-grid-row" }, rest.map((data, i) => (index.h("div", { key: i, class: "chat-image-grid-item chat-image-error-wrap" }, renderImageNode(role, data)))))));
    }
    case 'hr':
      return index.h("wpp-divider-v4-1-0", null);
    case 'text':
      return token.tokens
        ? token.tokens.flatMap(t => renderToken(t)).filter((t) => t !== null)
        : token.text;
    case 'html':
    case 'tag':
      // Intentionally ignore raw HTML from LLM output for security
      return null;
    default:
      return 'text' in token ? index.h("wpp-typography-v4-1-0", { type: "s-body" }, token.text) : null;
  }
};

const wppChatConversationMessageCss = ":host{display:-ms-flexbox;display:flex;width:auto}.container{display:grid;width:100%;grid-template-columns:64px minmax(0, 80ch) 64px}.container.no-user-avatar{grid-template-columns:64px minmax(0, 80ch)}.container.no-assistant-avatar{grid-template-columns:minmax(0, 80ch) 64px}.container.no-user-avatar.no-assistant-avatar{grid-template-columns:minmax(0, 80ch)}.avatar-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center}.content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:10px;width:100%;margin-left:auto}.content .wpp-typography{display:initial}.content.content-user{width:calc(100% - clamp(10%, 56px, 56px));padding:12px;background-color:var(--wpp-primary-color-100);border-radius:var(--wpp-border-radius-m) 0 var(--wpp-border-radius-m) var(--wpp-border-radius-m)}.content p{margin-top:0}.message{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:12px}.message-text{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:10px}.cursor{display:inline-block;width:2px;height:0.85em;margin-left:2px;vertical-align:text-bottom;background-color:currentColor;border-radius:1px;-webkit-animation:blink 1s steps(1) infinite;animation:blink 1s steps(1) infinite}.code-block{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--wpp-grey-color-100);border-radius:var(--wpp-border-radius-m)}.code-block:hover .code-block-copy-icon{opacity:1}.code-block .code-lang{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:8px 8px 4px;color:var(--wpp-grey-color-600)}.code-block code{padding:8px}.code-block-copy-icon{cursor:pointer;opacity:0;-webkit-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.code-block-copy-icon:hover{--wpp-prop-icon-color:var(--wpp-grey-color-800) !important}.action-toolbar{display:-ms-flexbox;display:flex;gap:4px}.actions{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-align:center;align-items:center;margin-top:10px}.actions .sources-action{margin-left:auto}.chat-list{padding:0 0 0 16px;margin:0 0 0 16px}.chat-list.chat-list-nonordered,.chat-list .chat-list-nonordered{list-style-type:disc}.chat-list.chat-list-ordered,.chat-list .chat-list-ordered{list-style-type:decimal}.chat-list.chat-list-task{padding:0;margin:0;list-style-type:none}.chat-list .chat-list-item{display:list-item;margin:0}.chat-list .chat-list-item::marker{font-size:var(--wpp-typography-s-body-font-size);line-height:var(--wpp-typography-s-body-line-height)}.chat-list .chat-list-item .wpp-typography{display:block}.chat-list .chat-list-item .chat-list{display:block}.chat-list .chat-list-item-task{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.chat-list .chat-list-item-task .chat-list{margin-left:8px}.chat-list .chat-list-item-task:not(.chat-list-item-task-checked){text-decoration:line-through}.chat-list .chat-list-item-task:not(.chat-list-item-task-checked) .wpp-icon-tick{display:inline-block;text-decoration:none}.chat-link{font-size:var(--wpp-typography-s-body-font-size);line-height:var(--wpp-typography-s-body-line-height);color:var(--wpp-primary-color-500);-webkit-transition:color 0.2s ease-in-out;transition:color 0.2s ease-in-out}.chat-link:hover{color:var(--wpp-primary-color-400)}.chat-link:active{color:var(--wpp-primary-color-600)}.chat-table{width:100%;border-collapse:collapse;border-spacing:0}.chat-table th,.chat-table td{padding:13px 16px;text-align:left;border-bottom:1px solid var(--wpp-grey-color-300)}.chat-quote{padding-left:16px;margin-left:0;border-left:3px solid var(--wpp-grey-color-300)}.chat-image-single{position:relative;width:100%}.chat-image-single img{display:block;width:100%;height:auto;-o-object-fit:cover;object-fit:cover}.chat-image-full{display:block;width:100%;height:auto;-o-object-fit:cover;object-fit:cover;border:1px solid var(--wpp-grey-color-000);border-radius:var(--wpp-border-radius-xs)}.chat-image-grid{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:12px;width:100%}.chat-image-grid-first{position:relative;width:100%}.chat-image-grid-row{display:-ms-flexbox;display:flex;gap:12px;-ms-flex-align:start;align-items:flex-start;overflow:visible hidden;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.chat-image-grid-row::-webkit-scrollbar{width:4px;height:4px}.chat-image-grid-row::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.chat-image-grid-row .chat-image-grid-item{display:-ms-flexbox;display:flex;-ms-flex:0 0 calc(23% - 9px);flex:0 0 calc(23% - 9px);aspect-ratio:1/1;min-width:100px;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid var(--wpp-grey-color-000);border-radius:var(--wpp-border-radius-xs);position:relative}.chat-image-grid-row .chat-image-grid-item img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.image-download-button{--wpp-btns-action-color-fill:var(--wpp-grey-color-000);position:absolute;top:8px;right:8px;opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.chat-image-grid-item:hover .image-download-button,.chat-image-single:hover .image-download-button,.chat-image-grid-first:hover .image-download-button{opacity:1}.wpp-icon-image{display:none;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.chat-image-broken{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:var(--wpp-grey-color-200)}.chat-image-broken .wpp-icon-image{display:block}.chat-image-broken .image-download-button{display:none}.chat-image-broken img{display:none}.attachments{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:12px}.chat-file-attachments-column{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:4px;width:100%}.chat-file-attachments-column .wpp-file-upload-item{width:100%}@-webkit-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}";

const WppChatConversationMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this._actionButtonConfig = [
      { icon: 'wpp-icon-thumbs-up' },
      { icon: 'wpp-icon-thumbs-down' },
      { icon: 'wpp-icon-refresh' },
      { icon: 'wpp-icon-copy' },
    ];
    // Streaming state
    this.accumulatedText = '';
    this.committedLength = 0;
    this.rafHandle = null;
    this.renderActionButton = (data) => {
      if (!data.icon)
        return null;
      return (index.h("wpp-action-button-v4-1-0", { variant: "secondary", ...data }, index.h(utils.transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' })));
    };
    this.renderMenuContextListItems = () => (index.h(index.Fragment, null, this.menuContextListItems.map(item => {
      const { label, slots, ...rest } = item;
      return (index.h("wpp-list-item-v4-1-0", { ...rest, id: item.id !== undefined ? `${_const.LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined, role: "option" }, index.h("span", { slot: "label" }, label), slots && utils$1.renderSlotsInListItem(slots, Boolean(label)).map((slotNode) => slotNode)));
    })));
    this.hostCssClasses = () => ({
      'wpp-chat-conversation': true,
    });
    this.containerCssClasses = () => ({
      container: true,
      [`container-${this.role}`]: true,
      'no-user-avatar': !this.userAvatarConfig,
      'no-assistant-avatar': !this.assistantAvatarConfig,
    });
    this.contentCssClasses = () => ({
      content: true,
      [`content-${this.role}`]: true,
    });
    this.messageCssClasses = () => ({
      message: true,
      [`message-${this.role}`]: true,
      [`message-${this.currentStatus}`]: true,
    });
    this.committedTokens = [] // parsed + rendered blocks
    ;
    this.liveText = '' // current in-progress raw text
    ;
    this.currentStatus = 'complete';
    this.finalContent = '';
    this.role = 'user';
    this.content = '';
    this.status = 'complete';
    this.actionButtonsConfig = undefined;
    this.menuContextListItems = undefined;
    this.sourcesActionConfig = undefined;
    this.assistantAvatarConfig = {};
    this.userAvatarConfig = {};
    this.attachments = [];
  }
  async appendChunk(chunk) {
    this.accumulatedText += chunk;
    this.scheduleRefresh();
  }
  async completeStream() {
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
    const remaining = this.accumulatedText.slice(this.committedLength);
    if (remaining.trim()) {
      const tokens = getMarkdownTokens(remaining);
      if (Array.isArray(tokens) && tokens.length) {
        this.committedTokens = [...this.committedTokens, ...tokens];
      }
    }
    this.finalContent = this.accumulatedText;
    this.currentStatus = 'complete';
    // Reset streaming state
    this.accumulatedText = '';
    this.committedLength = 0;
    this.committedTokens = [];
    this.liveText = '';
  }
  async setStatus(status) {
    if (status === 'streaming') {
      this.accumulatedText = '';
      this.committedLength = 0;
      this.committedTokens = [];
      this.liveText = '';
    }
    this.currentStatus = status;
  }
  onStatusChange(newValue) {
    if (newValue === 'complete' && this.currentStatus === 'streaming') {
      this.completeStream();
    }
    else {
      this.currentStatus = newValue;
    }
  }
  onContentChange(newValue) {
    this.finalContent = newValue;
  }
  componentWillLoad() {
    this.currentStatus = this.status;
    this.finalContent = this.content;
    if (this.actionButtonsConfig) {
      this._actionButtonConfig = this.actionButtonsConfig.map((button, ndx) => ({
        ...(this._actionButtonConfig[ndx] || {}),
        ...button,
        onClick: () => {
          button.onClick?.();
        },
      }));
    }
  }
  scheduleRefresh() {
    if (this.rafHandle !== null)
      return;
    this.rafHandle = requestAnimationFrame(() => {
      this.rafHandle = null;
      this.refreshDisplay();
    });
  }
  refreshDisplay() {
    const uncommitted = this.accumulatedText.slice(this.committedLength);
    const boundary = findSafeBoundary(uncommitted);
    if (boundary !== -1) {
      const toCommit = uncommitted.slice(0, boundary);
      const tokens = getMarkdownTokens(toCommit);
      if (Array.isArray(tokens) && tokens.length) {
        this.committedTokens = [...this.committedTokens, ...tokens];
      }
      this.committedLength += boundary;
      this.liveText = uncommitted.slice(boundary);
      // Multiple blocks may have completed this frame
      this.refreshDisplay();
    }
    else {
      this.liveText = uncommitted;
    }
  }
  renderStreaming() {
    return (index.h("div", { class: "message-text" }, this.committedTokens.map((token) => renderToken(token, this.role)), index.h("span", { class: "streaming-live" }, purify.sanitize(this.liveText), index.h("span", { class: "cursor", "aria-hidden": "true" }))));
  }
  renderComplete() {
    const tokens = getMarkdownTokens(this.finalContent);
    if (!Array.isArray(tokens)) {
      return (index.h("wpp-typography-v4-1-0", { type: "s-body", tag: "p" }, purify.sanitize(this.finalContent)));
    }
    return index.h("div", { class: "message-text" }, tokens.map((token) => renderToken(token, this.role)));
  }
  renderAttachments() {
    const images = this.attachments?.filter(file => file.type?.startsWith('image/'));
    const otherFiles = this.attachments?.filter(file => !file.type?.startsWith('image/'));
    if ((!images || images.length === 0) && (!otherFiles || otherFiles.length === 0))
      return null;
    return (index.h("div", { class: "attachments" }, images.length > 0 && (index.h("div", { class: "chat-image-grid-row" }, images.map(image => (index.h("div", { class: "chat-image-grid-item chat-image-error-wrap" }, index.h("img", { src: image.url, alt: image.name, loading: "lazy", onError: (e) => {
        const wrap = e.target.closest('.chat-image-error-wrap');
        wrap?.classList.add('chat-image-broken');
        wrap?.setAttribute('data-error-message', 'Image unavailable');
      } })))))), otherFiles && otherFiles.length > 0 && (index.h("div", { class: "chat-file-attachments-column" }, otherFiles.map(file => (index.h("wpp-file-upload-item-v4-1-0", { file: {
        name: file.name,
        url: file.url,
        type: file.type,
        size: file.size || 0,
        deletable: false,
        ...file.fileItemProps,
      } })))))));
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses() }, index.h("div", { class: this.containerCssClasses() }, this.assistantAvatarConfig && (index.h("div", { class: "avatar-wrapper" }, this.role === 'assistant' && (index.h("wpp-avatar-v4-1-0", { size: "s", icon: "wpp-icon-ai", role: "presentation", ...this.assistantAvatarConfig })))), index.h("div", { class: this.contentCssClasses() }, index.h("div", { class: this.messageCssClasses() }, this.currentStatus === 'streaming' && this.renderStreaming(), this.currentStatus === 'complete' && this.renderComplete(), this.currentStatus === 'complete' && this.attachments.length > 0 && this.renderAttachments()), this.role === 'assistant' && this.status === 'complete' && (index.h("div", { class: "actions" }, index.h("div", { class: "action-toolbar" }, this._actionButtonConfig.map(this.renderActionButton), this.menuContextListItems && (index.h("wpp-menu-context-v4-1-0", null, index.h("wpp-action-button-v4-1-0", { variant: "secondary", slot: "trigger-element" }, index.h("wpp-icon-more-v4-1-0", { slot: "icon-start", direction: "horizontal" })), this.renderMenuContextListItems()))), this.sourcesActionConfig && (index.h("div", { class: "sources-action" }, index.h("wpp-action-button-v4-1-0", { variant: "secondary", ...this.sourcesActionConfig }, this.sourcesActionConfig.text)))))), this.userAvatarConfig && (index.h("div", { class: "avatar-wrapper" }, this.role === 'user' && index.h("wpp-avatar-v4-1-0", { size: "s", role: "presentation", ...this.userAvatarConfig }))))));
  }
  static get registryIs() { return "wpp-chat-conversation-message-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "status": ["onStatusChange"],
    "content": ["onContentChange"]
  }; }
};
WppChatConversationMessage.style = wppChatConversationMessageCss;

const TOAST_DURATION = 5000;

const DEFAULT_FILE_UPLOAD_CONFIG = {
  acceptConfig: {},
  size: 50,
  maxFiles: 0,
  multiple: true,
  showOnlyNewErrors: false,
  controlled: false,
  locales: {
    sizeError: 'File exceeds the allowed size limit',
    formatError: 'Invalid file format',
    limitError: 'Files limit reached',
  },
};
const MAX_INPUT_AREA_HEIGHT = 240;
const MIN_TEXTAREA_HEIGHT = 52;
/**
 * Reserved `ChatInputAction.id` that auto-wires an actions-menu entry to the
 * same file picker used by `enableAttach`. Consumers can still listen for the
 * `wppActionsMenuItemClick` event on top of the built-in behavior.
 */
const UPLOAD_ACTION_ID = 'upload';
const LOCALES_DEFAULTS = {
  placeholder: 'Type your message...',
  minimizedDescription: 'Expand message input',
  actionsToolbarLabel: 'Message actions',
  leftActionsGroupLabel: 'Attachments and tools',
  rightActionsGroupLabel: 'Send and character counter',
  sendLabel: 'Send message',
  attachLabel: 'Attach file',
  voiceLabel: 'Record voice message',
  attachmentsLabel: 'Attachments',
  messageInputLabel: 'Message input',
  actionsMenuLabel: 'More actions',
};

const wppChatInputCss = ":host{--chat-input-container-min-width:var(--wpp-chat-input-container-min-width, 320px);--chat-input-container-bg-color:var(--wpp-chat-input-container-bg-color, var(--wpp-grey-color-000));--chat-input-container-outline-width:var(--wpp-chat-input-container-outline-width, 1px);--chat-input-container-outline-style:var(--wpp-chat-input-container-outline-style, solid);--chat-input-container-outline-color:var(--wpp-chat-input-container-outline-color, var(--wpp-grey-color-500));--chat-input-container-outline-color-hover:var(\n    --wpp-chat-input-container-outline-color-hover,\n    var(--wpp-grey-color-700)\n  );--chat-input-container-outline-color-active:var(\n    --wpp-chat-input-container-outline-color-active,\n    var(--wpp-grey-color-800)\n  );--chat-input-container-outline-color-disabled:var(\n    --wpp-chat-input-container-outline-color-disabled,\n    var(--wpp-grey-color-400)\n  );--chat-input-container-border-radius:var(--wpp-chat-input-container-border-radius, 8px);--chat-input-area-min-height:var(--wpp-chat-input-area-min-height, 52px);--chat-input-area-max-height:var(--wpp-chat-input-area-max-height, 240px);--chat-input-area-padding:var(--wpp-chat-input-area-padding, 12px 6px 0 12px);--chat-input-area-placeholder-color:var(--wpp-chat-input-area-placeholder-color, var(--wpp-grey-color-700));--chat-text-input-min-height:var(--wpp-chat-text-input-min-height, 52px);--chat-text-input-padding:var(--wpp-chat-text-input-padding, 0);--chat-text-input-bg-color:var(--wpp-chat-text-input-bg-color, transparent);--chat-text-input-placeholder-color:var(--wpp-chat-text-input-placeholder-color, var(--wpp-grey-color-700));--chat-actions-bar-padding:var(--wpp-chat-actions-bar-padding, 0 10px 8px 10px);--chat-actions-bar-color:var(--wpp-chat-actions-bar-color, var(--wpp-grey-color-500));--chat-actions-bar-color-disabled:var(--wpp-chat-actions-bar-color-disabled, var(--wpp-grey-color-400));--chat-actions-bar-char-counter-color:var(--wpp-chat-actions-bar-char-counter-color, var(--wpp-danger-color-500));--chat-actions-bar-char-counter-color-disabled:var(\n    --wpp-chat-actions-bar-char-counter-color-disabled,\n    var(--wpp-danger-color-300)\n  );--chat-text-input-minimized-width:var(--wpp-chat-text-input-minimized-width, 264px);--chat-text-input-minimized-height:var(--wpp-chat-text-input-minimized-height, 22px);--chat-text-input-minimized-padding:var(--wpp-chat-text-input-minimized-padding, 8px 10px);--chat-input-transition-timing:0.3s cubic-bezier(0.4, 0, 0.2, 1);--chat-minimized-focus-ring-color:var(--wpp-focus-ring-color, var(--wpp-primary-color-600));--chat-minimized-focus-ring-width:var(--wpp-focus-ring-width, 2px);--chat-minimized-focus-ring-radius:var(--wpp-chat-input-container-border-radius, 8px);--chat-minimized-first-border-color-focus:var(\n    --wpp-chat-minimized-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--chat-minimized-second-border-color-focus:var(\n    --wpp-chat-minimized-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--chat-minimized-border-radius-focus:var(--wpp-chat-minimized-border-radius-focus, var(--wpp-border-radius-xs));display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;-ms-flex-align:center;align-items:center;width:100%}.chat-input-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--chat-input-container-bg-color);gap:8px;outline:var(--chat-input-container-outline-width) var(--chat-input-container-outline-style) var(--chat-input-container-outline-color);border-radius:var(--chat-input-container-border-radius);min-width:var(--chat-input-container-min-width);width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:width var(--chat-input-transition-timing), height var(--chat-input-transition-timing);transition:width var(--chat-input-transition-timing), height var(--chat-input-transition-timing);will-change:width, height;cursor:text}.chat-input-container:hover,.chat-input-container:focus-within{outline:var(--chat-input-container-outline-width) var(--chat-input-container-outline-style) var(--chat-input-container-outline-color-hover)}.chat-input-container:active{outline:var(--chat-input-container-outline-width) var(--chat-input-container-outline-style) var(--chat-input-container-outline-color-active)}.chat-input-container.disabled{pointer-events:none;cursor:not-allowed;outline:var(--chat-input-container-outline-width) var(--chat-input-container-outline-style) var(--chat-input-container-outline-color-disabled)}.chat-file-upload-toast{position:absolute;top:8px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);cursor:pointer}.input-area{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-align:stretch;align-items:stretch;color:var(--wpp-grey-color-1000);min-height:var(--chat-input-area-min-height);max-height:var(--chat-input-area-max-height);overflow-y:hidden;-ms-flex:1;flex:1;padding:var(--chat-input-area-padding);gap:12px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:8px 8px 0 0;-webkit-transition:height var(--chat-input-transition-timing);transition:height var(--chat-input-transition-timing);will-change:height;-webkit-transform-origin:bottom;transform-origin:bottom}.input-area .attachments{-ms-flex-order:2;order:2}.input-area .text-input{-ms-flex-order:1;order:1}.input-area:not(.minimized){scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.input-area::-webkit-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-moz-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area:-ms-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-ms-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-webkit-scrollbar{width:4px;height:4px}.input-area::-webkit-scrollbar-thumb{background-color:var(--wpp-grey-color-400);border-radius:4px;margin:6px}.input-area::-webkit-scrollbar-track{background:transparent}.input-area textarea{width:100%;min-height:var(--chat-text-input-min-height);resize:none;border:none;outline:none;padding:var(--chat-text-input-padding);font-family:inherit;font-weight:inherit;font-size:inherit;line-height:inherit;background-color:var(--chat-text-input-bg-color);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;-webkit-transition:min-height var(--chat-input-transition-timing);transition:min-height var(--chat-input-transition-timing);will-change:min-height;-webkit-transform-origin:bottom;transform-origin:bottom;margin:0}.input-area textarea::-webkit-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::-moz-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea:-ms-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::-ms-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea:hover,.input-area textarea:focus-within{color:var(--wpp-grey-color-1000)}.input-area textarea:active{color:var(--wpp-grey-color-1000)}.input-area textarea:disabled{cursor:not-allowed;color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-webkit-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-moz-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled:-ms-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-ms-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::placeholder{color:var(--wpp-grey-color-500)}.input-area.minimized{min-height:0;padding:var(--chat-text-input-minimized-padding)}.input-area.minimized .input-area-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:4px}.input-area.minimized .input-area-wrapper .sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;-webkit-clip-path:inset(50%) !important;clip-path:inset(50%) !important;border:0 !important;white-space:nowrap !important}.input-area.minimized .minimized-input{-ms-flex-align:center;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:var(--chat-text-input-minimized-width);outline:none}.input-area.minimized .minimized-input .input-value{width:100%}.input-area.minimized .minimized-input .input-value.disabled{color:var(--wpp-grey-color-500)}.input-area.minimized .minimized-input .input-value-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area.minimized .minimized-input .input-value-placeholder.disabled{color:var(--wpp-grey-color-500)}.actions-bar{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:end;align-items:flex-end;padding:var(--chat-actions-bar-padding);border-radius:0 0 8px 8px}.actions-bar .left-actions{display:-ms-flexbox;display:flex;gap:8px;-ms-flex-align:center;align-items:center;}.actions-bar .left-actions .actions-menu{--wpp-mc-wrapper-width:auto;display:-ms-inline-flexbox;display:inline-flex;-ms-flex:0 0 auto;flex:0 0 auto;width:auto}.actions-bar .left-actions .select{display:-ms-flexbox;display:flex;width:100%}.actions-bar .left-actions .wpp-action-button::part(button){color:var(--chat-actions-bar-color)}.actions-bar .left-actions.disabled .wpp-action-button::part(button){cursor:not-allowed;color:var(--chat-actions-bar-color-disabled)}.actions-bar .right-actions{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.actions-bar .right-actions .char-counter{color:var(--chat-actions-bar-char-counter-color)}.actions-bar .right-actions .wpp-action-button::part(button){color:var(--chat-actions-bar-color)}.actions-bar .right-actions.disabled .wpp-action-button::part(button){cursor:not-allowed;color:var(--chat-actions-bar-color-disabled)}.actions-bar .right-actions.disabled .char-counter{color:var(--chat-actions-bar-char-counter-color-disabled)}.attachments{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:4px;width:100%}.attachments .wpp-file-upload-item{width:100%}.attachments .wpp-file-upload-item::part(file-item){margin-top:0}.attachments .wpp-file-upload-item::part(controls){-ms-flex-pack:end;justify-content:flex-end}.input-area.minimized .minimized-input:focus-visible{border-radius:var(--chat-minimized-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--chat-minimized-first-border-color-focus), 0 0 0 3px var(--chat-minimized-second-border-color-focus);box-shadow:0 0 0 1px var(--chat-minimized-first-border-color-focus), 0 0 0 3px var(--chat-minimized-second-border-color-focus)}:host([data-wpp-theme=dark]) .chat-input-container{background-color:var(--wpp-grey-color-100)}";

const WppChatInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppSend = index.createEvent(this, "wppSend", 1);
    this.wppMic = index.createEvent(this, "wppMic", 1);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFileUploadItemDelete = index.createEvent(this, "wppFileUploadItemDelete", 1);
    this.wppFileUploadItemClick = index.createEvent(this, "wppFileUploadItemClick", 1);
    this.wppMessageChanged = index.createEvent(this, "wppMessageChanged", 1);
    this.wppActionsMenuToggle = index.createEvent(this, "wppActionsMenuToggle", 1);
    this.wppActionsMenuItemClick = index.createEvent(this, "wppActionsMenuItemClick", 1);
    this.scrollTimeout = null;
    this.inputAreaId = `wpp-ci-area`;
    this.charCounterId = `wpp-ci-cc`;
    this.textareaAutoId = `wpp-ci-ta`;
    this.minimizedDescId = `wpp-ci-min-desc`;
    this._locales = LOCALES_DEFAULTS; // Locales state holder (merged default + user overrides)
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.reInitValue = (list) => {
      this.successAttachmentsList = list.filter(file => !this.isFileWithError(file));
      this.errorAttachmentsList = list.filter(this.isFileWithError);
    };
    // Handler to block click during dialog
    this.onAttachClick = (e) => {
      // Space/Enter on buttons can still synthesize click; block if dialog is open
      if (this.isFileDialogOpen) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      this.handleFileSelection();
    };
    this.handleDocumentFocusIn = (event) => {
      const target = event.target;
      if (this.size === 's' && this.isChatInputExpanded && this.host && !this.host.contains(target)) {
        if (!utils.hasParentWithId(target, 'tippy-')) {
          this.handleSimpleBlur();
        }
      }
    };
    this.handleDocumentClick = (event) => {
      if (this.size === 's' && this.isChatInputExpanded && this.host && !this.host.contains(event.target)) {
        // For cases when the user click item from select.
        // The dropdown of the select is rendered outside of the component.
        if (!utils.hasParentWithId(event.target, 'tippy-')) {
          this.handleSimpleBlur();
        }
      }
    };
    this.onExpandedKeyDown = (e) => {
      if (e.key === 'Escape' && this.size === 's' && this.isChatInputExpanded) {
        e.preventDefault();
        e.stopPropagation();
        this.handleSimpleBlur();
      }
    };
    this.handleFileLoaded = (event) => {
      const { name, size } = event.detail;
      // Find the file in your state and set uploaded = true
      const updateUploadedFlag = (file) => {
        if (file.name === name && file.size === size) {
          const fileCopy = file;
          fileCopy.uploaded = true;
        }
        return file;
      };
      this.successAttachmentsList = this.successAttachmentsList.map(updateUploadedFlag);
      this.errorAttachmentsList = this.errorAttachmentsList.map(updateUploadedFlag);
      this.attachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    };
    this.actionsMenuDropdownConfig = {
      onShow: () => {
        this.actionsMenuOpen = true;
        this.wppActionsMenuToggle.emit({ open: true });
      },
      onHide: () => {
        this.actionsMenuOpen = false;
        this.wppActionsMenuToggle.emit({ open: false });
      },
    };
    this.handleActionsMenuItemClick = (action) => {
      if (action.disabled)
        return;
      if (action.id === UPLOAD_ACTION_ID && !this.disabled) {
        this.handleFileSelection();
      }
      this.wppActionsMenuItemClick.emit(action);
    };
    this.updateSlotData = () => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        select: '[slot="select"]',
      });
      this.hasSelectSlot = !emptyStates.select;
    };
    this.handleScroll = () => {
      if (this.scrollTimeout)
        clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.checkAttachmentsVisibility();
      }, 100);
    };
    this.handlePaste = async (event) => {
      if (this.disabled)
        return;
      this.textareaRef?.focus();
      const items = event.clipboardData?.items;
      if (!items) {
        await this.adjustTextareaHeight(false);
        return;
      }
      const handled = await this.handleFilePaste(event, items);
      if (handled)
        return;
      // Adjust textarea height after paste for non-image content
      await this.adjustTextareaHeight(false);
    };
    /**
     * Handles image file pasting from clipboard items.
     * Returns true if files were handled, false otherwise.
     */
    this.handleFilePaste = async (event, items) => {
      const files = Array.from(items)
        .filter(item => item.kind === 'file' && item.type.startsWith('image/'))
        .map(item => item.getAsFile())
        .filter((file) => !!file);
      if (files.length > 0) {
        event.preventDefault();
        await this.handleFileLoad(files);
        await this.adjustTextareaHeight();
        return true;
      }
      return false;
    };
    this.handleInput = (event) => {
      if (this.disabled)
        return;
      const target = event.target;
      const inputValue = target.value;
      if (this.debounceEnabled && this.debouncedHandleInput) {
        this.debouncedHandleInput(inputValue);
      }
      else {
        this.internalValue = inputValue;
        this.wppMessageChanged.emit({ value: inputValue });
      }
      if (!inputValue.trim() && this.textareaRef) {
        this.textareaRef.style.minHeight = `${MIN_TEXTAREA_HEIGHT}px`;
      }
      this.adjustTextareaHeight(false, inputValue);
    };
    this.debouncedAdjustTextareaHeight = utils.debounce(() => this.adjustTextareaHeight(), 50);
    this.adjustTextareaHeight = (reset = false, value, waitForInputArea = false) => new Promise(resolve => {
      if (!this.textareaRef || !this.inputAreaRef) {
        resolve();
        return;
      }
      if (reset) {
        this.textareaRef.style.minHeight = `${MIN_TEXTAREA_HEIGHT}px`;
        resolve();
        return;
      }
      const attachmentsElement = this.inputAreaRef.querySelector('.attachments');
      const attachmentsHeight = attachmentsElement?.scrollHeight || 0;
      const gap = attachmentsElement ? parseFloat(getComputedStyle(attachmentsElement).gap) || 0 : 0;
      const messageText = value !== undefined ? value : this.textareaRef.value;
      const textAreaContentHeight = Math.max(this.calculateTextHeight(messageText), MIN_TEXTAREA_HEIGHT);
      const totalHeight = attachmentsHeight + textAreaContentHeight + gap;
      const reachMaxHeight = totalHeight > MAX_INPUT_AREA_HEIGHT;
      this.inputAreaRef.style.overflowY = reachMaxHeight ? 'auto' : 'hidden';
      this.textareaRef.style.minHeight = `${textAreaContentHeight}px`;
      // --- Wait for the correct transition ---
      if (waitForInputArea) {
        // Used for expand/collapse: listen for height transition on input-area
        const computedStyle = window.getComputedStyle(this.inputAreaRef);
        const transitionDuration = parseFloat(computedStyle.transitionDuration) || 0;
        if (transitionDuration > 0) {
          const handler = (e) => {
            if (e.propertyName === 'height') {
              this.inputAreaRef?.removeEventListener('transitionend', handler);
              resolve();
            }
          };
          this.inputAreaRef.addEventListener('transitionend', handler);
        }
        else {
          resolve();
        }
      }
      else {
        // Used for textarea min-height (typing/paste)
        const computedStyle = window.getComputedStyle(this.textareaRef);
        const transitionDuration = parseFloat(computedStyle.transitionDuration) || 0;
        if (transitionDuration > 0) {
          const handler = (e) => {
            if (e.propertyName === 'min-height') {
              this.textareaRef?.removeEventListener('transitionend', handler);
              resolve();
            }
          };
          this.textareaRef.addEventListener('transitionend', handler);
        }
        else {
          resolve();
        }
      }
    });
    this.isFileWithError = (file) => !!(file.formatError || file.sizeError || file.validatorError);
    this.handleDeleteItem = (event) => {
      const { name, size } = event.detail;
      const updatedFilesList = this.attachments.filter(file => file.name + file.size !== name + size);
      this.successAttachmentsList = updatedFilesList.filter(file => !this.isFileWithError(file));
      this.errorAttachmentsList = updatedFilesList.filter(this.isFileWithError);
      if (this.inputRef)
        this.inputRef.value = '';
      this.wppChange.emit({
        value: this.successAttachmentsList,
        hasError: this.errorAttachmentsList.length > 0,
        errorFiles: this.errorAttachmentsList,
      });
      this.wppFileUploadItemDelete.emit(event.detail);
      this.attachments = updatedFilesList;
    };
    this.handleClickItem = (event) => this.wppFileUploadItemClick.emit(event.detail);
    this.handleChange = async () => {
      this.clearDialogState();
      const files = this.inputRef?.files;
      if (!files?.length)
        return;
      if (this.isMaximumFilesSet() && this.successAttachmentsList.length === this.mergedFileUploadConfig.maxFiles) {
        this.displayToast(this.mergedFileUploadConfig.locales.limitError, 'error');
        return;
      }
      const filesToLoad = this.mergedFileUploadConfig.multiple ? Array.from(files) : [files[0]];
      await this.handleFileLoad(filesToLoad);
      if (this.debouncedAdjustTextareaHeight) {
        requestAnimationFrame(() => this.debouncedAdjustTextareaHeight());
      }
      if (this.inputRef)
        this.inputRef.value = '';
    };
    this.isMaximumFilesSet = () => this.mergedFileUploadConfig.maxFiles > 0;
    this.validateFileSize = (file) => {
      if (file.size > _const$1.convertMBToBytes(this.mergedFileUploadConfig.size ?? 0)) {
        file.sizeError = true;
      }
      else {
        file.sizeError = false;
      }
      return file;
    };
    this.isAcceptConfigFilled = () => !!this.mergedFileUploadConfig.acceptConfig && Object.keys(this.mergedFileUploadConfig.acceptConfig).length > 0;
    this.getAcceptExtensions = () => _const$1.getExtensionsList(this.mergedFileUploadConfig.acceptConfig || {});
    this.validateFileType = (file) => {
      if (!this.isAcceptConfigFilled()) {
        if (!file.type) {
          const typeFromExtension = _const$1.EXTENSION_TO_TYPE[_const$1.getExtension(file.name)];
          return _const$1.modifyPropertiesOnFile(file, { type: typeFromExtension });
        }
        return file;
      }
      const allowedExtensions = file.type
        ? this.mergedFileUploadConfig.acceptConfig?.[file.type] || []
        : this.getAcceptExtensions();
      file.formatError = allowedExtensions.length > 0 ? !allowedExtensions.includes(_const$1.getExtension(file.name)) : true;
      return file;
    };
    this.customValidation = (file) => {
      file.validatorError = this.mergedFileUploadConfig.validator?.(file) || undefined;
      return file;
    };
    this.displayErrorListByShowingOption = (newFilesWithErrors) => this.mergedFileUploadConfig.showOnlyNewErrors
      ? newFilesWithErrors
      : [...this.errorAttachmentsList, ...newFilesWithErrors];
    this.generateUniqueName = (fileName, fileList) => {
      const baseName = _const$1.getBaseName(fileName);
      const extension = _const$1.getExtension(fileName);
      let counter = 1;
      const isNameTaken = (file) => {
        const currentCounter = counter;
        return file.name === `${baseName}-${currentCounter}${extension}`;
      };
      while (fileList.some(file => isNameTaken(file))) {
        counter++;
      }
      return `${baseName}-${counter}${extension}`;
    };
    this.handleClick = () => {
      if (!this.disabled) {
        this.textareaRef?.focus();
      }
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter') {
        // When "Shift" + "Enter" are pressed, keep default behaviour (new line)
        if (event.shiftKey)
          return;
        // Pressing "Enter" is equivalent to pressing "Send" icon
        event.preventDefault();
        this.handleSend();
      }
    };
    this.onMinimizedKeyDown = (e) => {
      if (this.disabled)
        return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.minimizedPressed = true;
        this.handleSizeToggle();
      }
    };
    this.onMinimizedKeyUp = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.minimizedPressed = false;
      }
    };
    this.onAttachKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.attachPressed = true;
        this.handleFileSelection();
        // Clear immediately to avoid sticky state when dialog steals focus
        this.attachPressed = false;
      }
    };
    this.onWindowFocus = () => {
      if (this.isFileDialogOpen) {
        this.clearDialogState();
      }
    };
    this.clearDialogState = () => {
      this.isFileDialogOpen = false;
      this.attachPressed = false;
    };
    this.hostCssClasses = () => ({
      'wpp-chat-input': true,
    });
    this.chatToastClasses = () => ({
      'chat-file-upload-toast': true,
    });
    this.chatInputContainerClasses = () => ({
      'chat-input-container': true,
      disabled: this.disabled,
    });
    this.inputAreaClasses = () => ({
      ...(this.size === 's' && { [this.isChatInputExpanded ? 'expanded' : 'minimized']: true }),
      'input-area': true,
    });
    this.attachmentsWrapperClasses = () => ({
      attachments: true,
    });
    this.textInputClasses = () => ({
      'text-input': true,
    });
    this.inputAreaWrapperClasses = () => ({
      'input-area-wrapper': true,
    });
    this.minimizedInput = () => ({
      'minimized-input': true,
    });
    this.inputValue = () => ({
      'input-value': true,
      disabled: this.disabled,
      'input-value-placeholder': !this.internalValue,
    });
    this.actionsBarClasses = () => ({
      'actions-bar': true,
    });
    this.leftActionsClasses = () => ({
      'left-actions': true,
      disabled: this.disabled,
    });
    this.selectClasses = () => ({
      select: true,
      'slot-hidden': !this.hasSelectSlot,
      disabled: this.disabled,
    });
    this.rightActionsClasses = () => ({
      'right-actions': true,
      disabled: this.disabled,
    });
    this.size = 'm';
    this.placeholder = 'Type your message...';
    this.enableAttach = false;
    this.enableMic = false;
    this.disabled = false;
    this.fileUploadConfig = {
      /**
       * Format of the file upload result.
       */
      format: 'base64',
      /**
       * If `true`, allows multiple files to be uploaded at once.
       */
      multiple: true,
      /**
       * Maximum number of files allowed for upload.
       * Set to `0` for no restriction.
       */
      maxFiles: 0,
      /**
       * Maximum allowed size of each file in MB.
       */
      size: 150,
      /**
       * Object defining accepted MIME types and their corresponding extensions.
       * Example: `{ 'image/png': ['.png'], 'application/pdf': ['.pdf'] }`.
       */
      acceptConfig: {},
      /**
       * Defines custom validation function for uploaded files.
       * Should return `null` if the file is valid, or a string error message otherwise.
       */
      validator: () => null,
      /**
       * If `true`, replaces existing error messages with new ones for failed uploads.
       * If `false`, retains existing errors and appends new ones.
       */
      showOnlyNewErrors: false,
      /**
       * If `true`, the file upload works as controlled component.
       */
      controlled: false,
      /**
       * Indicates locales for file upload component
       */
      locales: {
        sizeError: 'File exceeds size limit',
        formatError: 'Wrong format',
        limitError: 'Files limit reached',
      },
    };
    this.charactersLimit = undefined;
    this.attachments = [];
    this.withSelect = false;
    this.actions = [];
    this.textValue = '';
    this.debounceEnabled = true;
    this.debounceDelay = 300;
    this.zIndex = consts.Z_INDEX.CHAT;
    this.textareaAriaLabel = undefined;
    this.textareaId = undefined;
    this.textareaName = undefined;
    this.htmlAttributes = undefined;
    this.ariaProps = undefined;
    this.locales = {};
    this.successAttachmentsList = [];
    this.errorAttachmentsList = [];
    this.toastMessage = '';
    this.toastType = 'information';
    this.showToast = false;
    this.areAttachmentsVisible = true;
    this.hasSelectSlot = false;
    this.isChatInputExpanded = false;
    this.attachPressed = false;
    this.minimizedPressed = false;
    this.isFileDialogOpen = false;
    this.internalValue = '';
    this.actionsMenuOpen = false;
  }
  onAttachmentsChange(newValue) {
    if (this.mergedFileUploadConfig.controlled) {
      this.reInitValue(newValue);
    }
    if (this.debouncedAdjustTextareaHeight) {
      requestAnimationFrame(() => this.debouncedAdjustTextareaHeight());
    }
  }
  onTextValueChange(value) {
    if (value !== this.internalValue) {
      this.internalValue = value;
      this.adjustTextareaHeight(false, value);
    }
  }
  onUpdateLocales(newLocales) {
    // Merge into private _locales, not the readonly @Prop
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    if (!this.textValue?.trim() && this.textValue !== this.internalValue) {
      this.internalValue = this.textValue;
    }
    this.debouncedHandleInput = utils.debounce((value) => {
      this.internalValue = value;
      this.wppMessageChanged.emit({ value });
    }, this.debounceDelay);
    const list = [...this.attachments, ...(this.successAttachmentsList || []), ...(this.errorAttachmentsList || [])];
    this.reInitValue(list);
    // Merge initial locales once at load
    this._locales = { ...this._locales, ...this.locales };
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.initializeObserver();
    });
    const debouncedResizeHandler = utils.debounce(() => {
      if (this.textareaRef) {
        this.textareaRef.style.height = 'auto';
        this.forceRecalculateHeight();
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
      }
    }, 150);
    const resizeObserver = new ResizeObserver(() => {
      debouncedResizeHandler();
    });
    if (this.inputAreaRef) {
      resizeObserver.observe(this.inputAreaRef);
    }
    this.resizeObserver = resizeObserver;
    window.addEventListener('focus', this.onWindowFocus, true);
  }
  addExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = new AbortController();
    const signal = this.expandedListenersAbort.signal;
    document.addEventListener('mousedown', this.handleDocumentClick, { capture: true, signal });
    document.addEventListener('focusin', this.handleDocumentFocusIn, { capture: true, signal });
  }
  removeExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = undefined;
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.disconnectObserver();
    this.themeSubscription.stop();
    if (this.resizeObserver && this.inputAreaRef) {
      this.resizeObserver.unobserve(this.inputAreaRef);
    }
    this.removeExpandedListeners();
    window.removeEventListener('focus', this.onWindowFocus, true);
  }
  onSizeChange(newValue, oldValue) {
    if (newValue !== oldValue && this.size === 's') {
      this.handleSizeToggle();
    }
  }
  /**
   * Maximize the input area when the user clicks on it.
   */
  handleSizeToggle() {
    if (this.size === 's' && !this.disabled) {
      this.isChatInputExpanded = true;
      this.addExpandedListeners();
      requestAnimationFrame(() => {
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
        this.handleClick();
      });
    }
  }
  /**
   * Minimize the input area when it loses focus.
   */
  handleSimpleBlur() {
    if (this.size === 's' && this.isChatInputExpanded) {
      this.isChatInputExpanded = false;
      this.removeExpandedListeners();
      requestAnimationFrame(() => this.minimizedTriggerRef?.focus());
    }
  }
  forceRecalculateHeight() {
    if (this.textareaRef) {
      const currentValue = this.textareaRef.value;
      this.textareaRef.value = '';
      this.textareaRef.value = currentValue;
    }
  }
  calculateTextHeight(text) {
    if (!this.textareaRef || !text)
      return MIN_TEXTAREA_HEIGHT;
    const mirrorDiv = document.createElement('div');
    const computedStyle = window.getComputedStyle(this.textareaRef);
    mirrorDiv.style.position = 'absolute';
    mirrorDiv.style.visibility = 'hidden';
    mirrorDiv.style.whiteSpace = 'pre-wrap';
    mirrorDiv.style.wordWrap = 'break-word';
    mirrorDiv.style.padding = computedStyle.padding;
    mirrorDiv.style.width = this.textareaRef.offsetWidth + 'px';
    mirrorDiv.style.fontFamily = computedStyle.fontFamily;
    mirrorDiv.style.fontSize = computedStyle.fontSize;
    mirrorDiv.style.lineHeight = computedStyle.lineHeight;
    mirrorDiv.style.boxSizing = computedStyle.boxSizing;
    mirrorDiv.style.letterSpacing = computedStyle.letterSpacing;
    mirrorDiv.textContent = (text || ' ') + '\u200b';
    document.body.appendChild(mirrorDiv);
    const height = mirrorDiv.offsetHeight;
    document.body.removeChild(mirrorDiv);
    return height;
  }
  // Getter to merge defaults with provided config
  get mergedFileUploadConfig() {
    return {
      ...DEFAULT_FILE_UPLOAD_CONFIG,
      ...this.fileUploadConfig,
    };
  }
  // Precedence helpers: ariaProps > locales > internal defaults
  getPlaceholderText() {
    return this._locales.placeholder ?? this.placeholder;
  }
  getMinimizedAriaLabel() {
    return this.ariaProps?.minimizedTrigger?.label ?? (this.internalValue || this.getPlaceholderText());
  }
  getMinimizedDescriptionText() {
    return this._locales.minimizedDescription;
  }
  getTextareaLabel() {
    return (this.ariaProps?.textarea?.label ?? this.textareaAriaLabel ?? this._locales.messageInputLabel ?? 'Message input');
  }
  getActionsToolbarLabel() {
    return this.ariaProps?.actionsToolbar?.label ?? this._locales.actionsToolbarLabel;
  }
  getLeftActionsLabel() {
    return this.ariaProps?.leftActionsGroup?.label ?? this._locales.leftActionsGroupLabel;
  }
  getRightActionsLabel() {
    return this.ariaProps?.rightActionsGroup?.label ?? this._locales.rightActionsGroupLabel;
  }
  getSendButtonLabel() {
    return this.ariaProps?.sendButton?.label ?? this._locales.sendLabel;
  }
  getAttachButtonLabel() {
    return this.ariaProps?.attachButton?.label ?? this._locales.attachLabel;
  }
  getActionsMenuButtonLabel() {
    return this.ariaProps?.actionsMenuButton?.label ?? this._locales.actionsMenuLabel;
  }
  checkAttachmentsVisibility() {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments');
    if (!attachmentsElement || !this.inputAreaRef) {
      this.areAttachmentsVisible = false;
      return;
    }
    const { top: inputTop, bottom: inputBottom } = this.inputAreaRef.getBoundingClientRect();
    const { top: attachTop, bottom: attachBottom } = attachmentsElement.getBoundingClientRect();
    this.areAttachmentsVisible = attachTop >= inputTop && attachBottom <= inputBottom;
  }
  disconnectObserver() {
    if (this.inputAreaRef) {
      this.inputAreaRef.removeEventListener('scroll', this.handleScroll);
    }
  }
  initializeObserver() {
    if (!this.inputAreaRef)
      return;
    this.inputAreaRef.addEventListener('scroll', this.handleScroll);
    this.checkAttachmentsVisibility();
  }
  /**
   * Scrolls the attachments list to the specified file type.
   * @param fileType 'error' for error files, 'success' for success files (or '' for any file)
   */
  scrollToAttachment(type = '') {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments');
    if (!attachmentsElement)
      return;
    let selector = '.wpp-file-upload-item';
    if (type === 'error')
      selector += '.error';
    if (type === 'success')
      selector += ':not(.error)';
    const attachment = attachmentsElement.querySelector(selector);
    if (attachment) {
      // Use block: 'nearest' to minimize page scroll issues
      attachment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    // Fallback: scroll to top (visual top in column-reverse is scrollTop = 0)
    attachmentsElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
  displayToast(message, type) {
    this.checkAttachmentsVisibility();
    if (this.areAttachmentsVisible || !this.attachments?.length) {
      return;
    }
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), TOAST_DURATION);
  }
  handleSend() {
    if (this.disabled ||
      this.isSendDisabled ||
      (!this.internalValue.trim() && !this.successAttachmentsList.length) ||
      this.errorAttachmentsList.length)
      return;
    this.wppSend.emit({
      message: this.internalValue.trim(),
      attachments: this.successAttachmentsList,
    });
    Object.assign(this, {
      internalValue: '',
      successAttachmentsList: [],
      errorAttachmentsList: [],
    });
    this.wppChange.emit({ value: [], hasError: false, errorFiles: [] });
    this.adjustTextareaHeight(true);
    if (this.size === 's') {
      this.isChatInputExpanded = false;
    }
  }
  handleFileSelection() {
    if (!this.inputRef || this.isFileDialogOpen)
      return;
    this.isFileDialogOpen = true;
    this.inputRef.click();
  }
  async handleFileLoad(filesList) {
    if (!filesList.length)
      return;
    const existingAttachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    const filteredFiles = filesList
      .filter(Boolean)
      .map(file => existingAttachments.some(item => item.name === file.name)
      ? _const$1.renameFile(file, this.generateUniqueName(file.name, existingAttachments))
      : file);
    const filteredFilesInitLength = filteredFiles.length;
    if (this.isMaximumFilesSet()) {
      const maxFiles = this.mergedFileUploadConfig.maxFiles;
      const remainingSlots = Math.max(0, maxFiles - existingAttachments.length);
      filteredFiles.length = Math.min(filteredFiles.length, remainingSlots);
      if (remainingSlots === 0)
        return;
      this.displayToast('Uploading...', 'information');
    }
    const validatedFiles = filteredFiles.map(file => {
      if ('url' in file)
        return file;
      this.validateFileSize(file);
      this.validateFileType(file);
      this.customValidation(file);
      return file;
    });
    const [batchSuccessFiles, batchErrorFiles] = [
      validatedFiles.filter(file => !this.isFileWithError(file)),
      validatedFiles.filter(this.isFileWithError),
    ];
    this.successAttachmentsList = [...this.successAttachmentsList, ...batchSuccessFiles];
    this.errorAttachmentsList = this.displayErrorListByShowingOption(batchErrorFiles);
    this.attachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    this.wppChange.emit({
      value: this.successAttachmentsList,
      hasError: !!this.errorAttachmentsList.length,
      errorFiles: this.errorAttachmentsList,
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.checkAttachmentsVisibility();
        const label = batchErrorFiles.length > 0 ? 'Upload FAILED' : 'Uploaded Successfully';
        const fileCount = batchErrorFiles.length || batchSuccessFiles.length;
        const fileLabel = fileCount === 1 ? 'File' : 'Files';
        if (batchErrorFiles.length === 0 &&
          this.isMaximumFilesSet() &&
          this.mergedFileUploadConfig.maxFiles < filteredFilesInitLength) {
          this.displayToast(this.mergedFileUploadConfig.locales.limitError, 'error');
        }
        else if (fileCount > 0) {
          this.displayToast(`${fileCount} ${fileLabel} ${label}`, batchErrorFiles.length > 0 ? 'error' : 'success');
        }
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
      });
    });
  }
  handleToastClick(event) {
    event.stopPropagation();
    this.scrollToAttachment(this.toastType === 'error' ? 'error' : 'success');
  }
  get isSendDisabled() {
    const charExceeded = this.charactersLimit !== undefined && this.internalValue.length > this.charactersLimit;
    return (this.disabled ||
      (!this.internalValue.trim() && this.successAttachmentsList.length === 0) ||
      this.errorAttachmentsList.length > 0 ||
      charExceeded);
  }
  render() {
    const allFiles = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    const charExceeded = this.charactersLimit && this.internalValue.length > this.charactersLimit;
    const isMaximizedS = this.isChatInputExpanded && this.size === 's';
    const maximizedSorSizeM = isMaximizedS || this.size === 'm';
    const isMinimizedS = this.size === 's' && !this.isChatInputExpanded;
    const placeholderText = this.getPlaceholderText();
    const ariaInvalid = this.ariaProps?.textarea?.invalid !== undefined
      ? this.ariaProps.textarea.invalid
      : charExceeded
        ? 'true'
        : undefined;
    return (index.h(index.Host, { class: this.hostCssClasses(), size: this.size, style: { zIndex: this.zIndex.toString() }, exportparts: "chat-input-container, toast, input-area, attachments, text-input, actions-bar, left-actions, right-actions, file-item, actions-menu", onClick: isMinimizedS ? this.handleSizeToggle : this.handleClick }, index.h("div", { class: this.chatInputContainerClasses(), onKeyDown: this.onExpandedKeyDown, part: "chat-input-container" }, this.showToast && (index.h("wpp-toast-v4-1-0", { message: this.toastMessage, type: this.toastType, duration: TOAST_DURATION, variant: "chat", part: "toast", class: this.chatToastClasses(), onClick: event => this.handleToastClick(event) })), index.h("div", { id: this.inputAreaId, class: this.inputAreaClasses(), ref: el => (this.inputAreaRef = el), part: "input-area" }, maximizedSorSizeM ? (index.h(index.Fragment, null, allFiles?.length > 0 && (index.h("div", { class: this.attachmentsWrapperClasses(), part: "attachments", role: "list", "aria-label": this._locales.attachmentsLabel }, allFiles.map((file, index$1) => (index.h("wpp-file-upload-item-v4-1-0", { key: index$1, file: file, format: this.mergedFileUploadConfig.format, currentIndex: index$1, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, locales: {
        sizeError: this.mergedFileUploadConfig.locales.sizeError,
        formatError: this.mergedFileUploadConfig.locales.formatError,
      }, part: "file-item", class: this.isFileWithError(file) ? 'error' : '', onFileLoaded: this.handleFileLoaded, uploaded: !!file.uploaded, "aria-posinset": (index$1 + 1).toString(), "aria-setsize": allFiles.length.toString() }))))), index.h("textarea", { id: (this.htmlAttributes?.textarea?.id ?? this.textareaId) || this.textareaAutoId, name: this.htmlAttributes?.textarea?.name ?? this.textareaName ?? 'message', class: this.textInputClasses(), placeholder: placeholderText, value: this.internalValue, ref: el => (this.textareaRef = el), onInput: this.handleInput, onPaste: this.handlePaste, disabled: this.disabled, onKeyDown: this.onKeyDown, part: "text-input", "aria-label": this.getTextareaLabel(), "aria-invalid": ariaInvalid, "aria-describedby": charExceeded ? this.charCounterId : undefined, autocomplete: this.htmlAttributes?.textarea?.autocomplete, maxLength: this.htmlAttributes?.textarea?.maxLength, "data-gramm": "false", "data-gramm_editor": "false" }))) : (index.h("div", { class: this.inputAreaWrapperClasses() }, index.h("div", { class: this.minimizedInput(), part: "minimized-input", ref: el => (this.minimizedTriggerRef = el), "data-pressed": this.minimizedPressed ? 'true' : null, role: "button", tabindex: this.disabled ? -1 : 0, "aria-expanded": this.isChatInputExpanded ? 'true' : 'false', "aria-controls": this.inputAreaId, "aria-label": this.getMinimizedAriaLabel(), "aria-describedby": this.minimizedDescId, onKeyDown: this.onMinimizedKeyDown, onKeyUp: this.onMinimizedKeyUp }, index.h("wpp-typography-v4-1-0", { class: this.inputValue(), type: "s-body" }, this.internalValue || placeholderText)), index.h("span", { id: this.minimizedDescId, class: "sr-only" }, this.getMinimizedDescriptionText()), index.h("wpp-action-button-v4-1-0", { "data-testid": "send-icon-only-button", variant: "secondary", onClick: e => {
        e.stopPropagation();
        this.handleSend();
      }, disabled: this.isSendDisabled, ariaProps: { label: this.getSendButtonLabel() } }, index.h("wpp-icon-send-v4-1-0", { slot: "icon-start" }))))), maximizedSorSizeM && (index.h("div", { class: this.actionsBarClasses(), part: "actions-bar", role: "toolbar", "aria-label": this.getActionsToolbarLabel() }, index.h("div", { class: this.leftActionsClasses(), part: "left-actions", role: "group", "aria-label": this.getLeftActionsLabel() }, this.actions.length > 0 && (index.h("wpp-menu-context-v4-1-0", { class: "actions-menu", part: "actions-menu", dropdownConfig: this.actionsMenuDropdownConfig }, index.h("wpp-action-button-v4-1-0", { slot: "trigger-element", class: "actions-menu-trigger", "data-testid": "actions-menu-trigger-button", variant: "secondary", disabled: this.disabled, ariaProps: {
        label: this.getActionsMenuButtonLabel(),
        expanded: this.ariaProps?.actionsMenuButton?.expanded ?? this.actionsMenuOpen,
        haspopup: 'menu',
      } }, index.h("wpp-icon-plus-v4-1-0", { slot: "icon-start" })), index.h("div", null, this.actions.map(action => (index.h("wpp-list-item-v4-1-0", { key: action.id, "data-testid": `actions-menu-item-${action.id}`, disabled: action.disabled || this.disabled, onWppChangeListItem: () => this.handleActionsMenuItemClick(action) }, index.h(utils.transformToVersionedTag(action.icon), { slot: 'left' }), index.h("span", { slot: "label" }, action.label))))))), this.enableAttach && (index.h("wpp-action-button-v4-1-0", { "data-testid": "attach-icon-only-button", disabled: this.disabled || this.isFileDialogOpen, variant: "secondary", onClick: this.onAttachClick, onKeyDown: this.onAttachKeyDown, "data-pressed": this.attachPressed ? 'true' : null, ariaProps: { label: this.getAttachButtonLabel() } }, index.h("wpp-icon-attach-v4-1-0", { slot: "icon-start" }))), (this.enableAttach || this.actions.some(a => a.id === UPLOAD_ACTION_ID)) && (index.h("input", { class: "file-loader", type: "file", ref: inputRef => (this.inputRef = inputRef), style: { display: 'none' }, multiple: this.htmlAttributes?.attachmentsInput?.multiple ?? this.mergedFileUploadConfig.multiple, onChange: this.handleChange, accept: this.htmlAttributes?.attachmentsInput?.accept ?? this.getAcceptExtensions().join(), title: "", id: this.htmlAttributes?.attachmentsInput?.id ?? 'wpp-ci-file', name: this.htmlAttributes?.attachmentsInput?.name ?? 'attachments', "aria-hidden": "true" })), this.withSelect && (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.selectClasses(), name: "select", onSlotchange: this.updateSlotData })), this.enableMic && (index.h("wpp-action-button-v4-1-0", { "data-testid": "mic-icon-only-button", variant: "secondary", disabled: this.disabled, ariaProps: { label: this._locales.voiceLabel } }, index.h("wpp-icon-mic-on-v4-1-0", { slot: "icon-start" })))), index.h("div", { class: this.rightActionsClasses(), part: "right-actions", role: "group", "aria-label": this.getRightActionsLabel() }, charExceeded && (index.h("wpp-typography-v4-1-0", { class: "char-counter", type: "xs-midi", id: this.charCounterId, "aria-live": "polite" }, this.internalValue.length, "/", this.charactersLimit)), index.h("wpp-action-button-v4-1-0", { "data-testid": "send-icon-only-button", variant: "secondary", onClick: () => this.handleSend(), disabled: this.isSendDisabled, ariaProps: { label: this.getSendButtonLabel() } }, index.h("wpp-icon-send-v4-1-0", { slot: "icon-start" }))))))));
  }
  static get registryIs() { return "wpp-chat-input-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "attachments": ["onAttachmentsChange"],
    "textValue": ["onTextValueChange"],
    "locales": ["onUpdateLocales"],
    "size": ["onSizeChange"]
  }; }
};
WppChatInput.style = wppChatInputCss;

exports.wpp_chat_conversation_message = WppChatConversationMessage;
exports.wpp_chat_input = WppChatInput;
