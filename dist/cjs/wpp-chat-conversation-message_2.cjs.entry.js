'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7d205426.js');
const marked_umd = require('./marked.umd-e1074c94.js');
const utils = require('./utils-8b2c3bc1.js');
const _commonjsHelpers = require('./_commonjsHelpers-bcc1208a.js');
const utils$1 = require('./utils-c4eee165.js');
const utils$2 = require('./utils-9562a1ee.js');
const WrappedSlot = require('./WrappedSlot-1f8b2d26.js');
const consts = require('./consts-d8f5ef98.js');
const subscribeToTheme = require('./subscribe-to-theme-f2fa6289.js');
const speechRecognition = require('./speech-recognition-f6839ec3.js');
const loadingHalo = require('./loading-halo-1b17d535.js');
require('./lodash-6b012aab.js');
require('./theme-observer-4179316e.js');

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

const LOCALES_DEFAULTS$1 = {
  quoteAction: 'Reply',
  copyAction: 'Copy',
  copiedAction: 'Copied',
  pinAction: 'Pin',
  unpinAction: 'Unpin',
  tokenCountLabel: 'Token usage',
};
/**
 * How long the copy confirmation (checkmark + "Copied" label) stays visible before the button
 * reverts to its idle state.
 */
const COPIED_CONFIRMATION_TIMEOUT = 3000;
/**
 * The footer actions rendered when a dev passes no `actionButtonsConfig`. Overrides are merged onto
 * these by `id`, so a dev can retarget one action without restating the others or preserving order.
 */
const getDefaultActionButtons = (locales) => [
  { id: 'quote', icon: 'wpp-icon-blockquote', label: locales.quoteAction },
  { id: 'copy', icon: 'wpp-icon-copy', label: locales.copyAction },
  {
    id: 'pin',
    icon: 'wpp-icon-unpinned',
    activeIcon: 'wpp-icon-pinned',
    label: locales.pinAction,
    activeLabel: locales.unpinAction,
  },
];
/**
 * A valid ARIA role parked on the host so the `role` @Prop's `MessageRole` value ("user" /
 * "assistant") never occupies the host's global `role` attribute, where it is not a valid ARIA
 * role (axe: aria-roles, critical). The prop keeps driving layout via internal state.
 */
const HOST_ARIA_ROLE = 'group';

var purify = _commonjsHelpers.createCommonjsModule(function (module, exports) {
/*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE */
(function(global, factory) {
	module.exports = factory() ;
})(_commonjsHelpers.commonjsGlobal, function() {
	function _arrayLikeToArray(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	function _arrayWithHoles(r) {
		if (Array.isArray(r)) return r;
	}
	function _iterableToArrayLimit(r, l) {
		var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		if (null != t) {
			var e, n, i, u, a = [], f = !0, o = !1;
			try {
				if (i = (t = t.call(r)).next, 0 === l) {
					if (Object(t) !== t) return;
					f = !1;
				} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
			} catch (r) {
				o = !0, n = r;
			} finally {
				try {
					if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
				} finally {
					if (o) throw n;
				}
			}
			return a;
		}
	}
	function _nonIterableRest() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
	function _slicedToArray(r, e) {
		return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
	}
	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray(r, a);
			var t = {}.toString.call(r).slice(8, -1);
			return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
		}
	}
	const entries = Object.entries;
	const setPrototypeOf = Object.setPrototypeOf;
	const isFrozen = Object.isFrozen;
	const getPrototypeOf = Object.getPrototypeOf;
	const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	let freeze = Object.freeze;
	let seal = Object.seal;
	let create = Object.create;
	let _ref = typeof Reflect !== "undefined" && Reflect;
	let apply = _ref.apply;
	let construct = _ref.construct;
	if (!freeze) freeze = function freeze(x) {
		return x;
	};
	if (!seal) seal = function seal(x) {
		return x;
	};
	if (!apply) apply = function apply(func, thisArg) {
		for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
		return func.apply(thisArg, args);
	};
	if (!construct) construct = function construct(Func) {
		for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
		return new Func(...args);
	};
	const arrayForEach = unapply(Array.prototype.forEach);
	const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
	const arrayPop = unapply(Array.prototype.pop);
	const arrayPush = unapply(Array.prototype.push);
	const arraySlice = unapply(Array.prototype.slice);
	const arraySplice = unapply(Array.prototype.splice);
	const arrayIsArray = Array.isArray;
	const setCreate = unconstruct(Set);
	const setAdd = unapply(Set.prototype.add);
	const setHas = unapply(Set.prototype.has);
	const stringToLowerCase = unapply(String.prototype.toLowerCase);
	const stringToString = unapply(String.prototype.toString);
	const stringMatch = unapply(String.prototype.match);
	const stringReplace = unapply(String.prototype.replace);
	const stringIndexOf = unapply(String.prototype.indexOf);
	const stringTrim = unapply(String.prototype.trim);
	const numberToString = unapply(Number.prototype.toString);
	const booleanToString = unapply(Boolean.prototype.toString);
	const bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
	const symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
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
		return function(thisArg) {
			if (thisArg instanceof RegExp) thisArg.lastIndex = 0;
			for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) args[_key3 - 1] = arguments[_key3];
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
		return function() {
			for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
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
		let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
		if (setPrototypeOf) setPrototypeOf(set, null);
		if (!arrayIsArray(array)) return set;
		let l = array.length;
		while (l--) {
			let element = array[l];
			if (typeof element === "string") {
				const lcElement = transformCaseFunc(element);
				if (lcElement !== element) {
					if (!isFrozen(array)) array[l] = lcElement;
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
		for (let index = 0; index < array.length; index++) if (!objectHasOwnProperty(array, index)) array[index] = null;
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
		for (const _ref2 of entries(object)) {
			var _ref3 = _slicedToArray(_ref2, 2);
			const property = _ref3[0];
			const value = _ref3[1];
			if (objectHasOwnProperty(object, property)) {
				if (arrayIsArray(value)) newObject[property] = cleanArray(value);
				else if (value && typeof value === "object" && value.constructor === Object) newObject[property] = clone(value);
				else newObject[property] = value;
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
			case "string": return value;
			case "number": return numberToString(value);
			case "boolean": return booleanToString(value);
			case "bigint": return bigintToString ? bigintToString(value) : "0";
			case "symbol": return symbolToString ? symbolToString(value) : "Symbol()";
			case "undefined": return objectToString(value);
			case "function":
			case "object": {
				if (value === null) return objectToString(value);
				const valueAsRecord = value;
				const valueToString = lookupGetter(valueAsRecord, "toString");
				if (typeof valueToString === "function") {
					const stringified = valueToString(valueAsRecord);
					return typeof stringified === "string" ? stringified : objectToString(stringified);
				}
				return objectToString(value);
			}
			default: return objectToString(value);
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
				if (desc.get) return unapply(desc.get);
				if (typeof desc.value === "function") return unapply(desc.value);
			}
			object = getPrototypeOf(object);
		}
		function fallbackValue() {
			return null;
		}
		return fallbackValue;
	}
	/**
	* Like lookupGetter, but for accessor properties only, and returns null
	* instead of a null-returning fallback when no getter exists on the chain.
	* Lets a caller fall back to a direct property read in environments that
	* lack the getter, where a fallback returning null would be indistinguishable
	* from a legitimate null value (e.g. namespaceURI of a no-namespace element).
	*
	* @param object - The object (usually a prototype) to start the lookup at.
	* @param prop - The accessor property name.
	* @returns The unapplied getter, or null if none was found.
	*/
	function lookupAccessor(object, prop) {
		while (object !== null) {
			const desc = getOwnPropertyDescriptor(object, prop);
			if (desc) return desc.get ? unapply(desc.get) : null;
			object = getPrototypeOf(object);
		}
		return null;
	}
	function isRegex(value) {
		try {
			regExpTest(value, "");
			return true;
		} catch (_unused) {
			return false;
		}
	}
	const html$1 = freeze([
		"a",
		"abbr",
		"acronym",
		"address",
		"area",
		"article",
		"aside",
		"audio",
		"b",
		"bdi",
		"bdo",
		"big",
		"blink",
		"blockquote",
		"body",
		"br",
		"button",
		"canvas",
		"caption",
		"center",
		"cite",
		"code",
		"col",
		"colgroup",
		"content",
		"data",
		"datalist",
		"dd",
		"decorator",
		"del",
		"details",
		"dfn",
		"dialog",
		"dir",
		"div",
		"dl",
		"dt",
		"element",
		"em",
		"fieldset",
		"figcaption",
		"figure",
		"font",
		"footer",
		"form",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"head",
		"header",
		"hgroup",
		"hr",
		"html",
		"i",
		"img",
		"input",
		"ins",
		"kbd",
		"label",
		"legend",
		"li",
		"main",
		"map",
		"mark",
		"marquee",
		"menu",
		"menuitem",
		"meter",
		"nav",
		"nobr",
		"ol",
		"optgroup",
		"option",
		"output",
		"p",
		"picture",
		"pre",
		"progress",
		"q",
		"rp",
		"rt",
		"ruby",
		"s",
		"samp",
		"search",
		"section",
		"select",
		"shadow",
		"slot",
		"small",
		"source",
		"spacer",
		"span",
		"strike",
		"strong",
		"style",
		"sub",
		"summary",
		"sup",
		"table",
		"tbody",
		"td",
		"template",
		"textarea",
		"tfoot",
		"th",
		"thead",
		"time",
		"tr",
		"track",
		"tt",
		"u",
		"ul",
		"var",
		"video",
		"wbr"
	]);
	const svg$1 = freeze([
		"svg",
		"a",
		"altglyph",
		"altglyphdef",
		"altglyphitem",
		"animatecolor",
		"animatemotion",
		"animatetransform",
		"circle",
		"clippath",
		"defs",
		"desc",
		"ellipse",
		"enterkeyhint",
		"exportparts",
		"filter",
		"font",
		"g",
		"glyph",
		"glyphref",
		"hkern",
		"image",
		"inputmode",
		"line",
		"lineargradient",
		"marker",
		"mask",
		"metadata",
		"mpath",
		"part",
		"path",
		"pattern",
		"polygon",
		"polyline",
		"radialgradient",
		"rect",
		"stop",
		"style",
		"switch",
		"symbol",
		"text",
		"textpath",
		"title",
		"tref",
		"tspan",
		"view",
		"vkern"
	]);
	const svgFilters = freeze([
		"feBlend",
		"feColorMatrix",
		"feComponentTransfer",
		"feComposite",
		"feConvolveMatrix",
		"feDiffuseLighting",
		"feDisplacementMap",
		"feDistantLight",
		"feDropShadow",
		"feFlood",
		"feFuncA",
		"feFuncB",
		"feFuncG",
		"feFuncR",
		"feGaussianBlur",
		"feImage",
		"feMerge",
		"feMergeNode",
		"feMorphology",
		"feOffset",
		"fePointLight",
		"feSpecularLighting",
		"feSpotLight",
		"feTile",
		"feTurbulence"
	]);
	const svgDisallowed = freeze([
		"animate",
		"color-profile",
		"cursor",
		"discard",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"foreignobject",
		"hatch",
		"hatchpath",
		"mesh",
		"meshgradient",
		"meshpatch",
		"meshrow",
		"missing-glyph",
		"script",
		"set",
		"solidcolor",
		"unknown",
		"use"
	]);
	const mathMl$1 = freeze([
		"math",
		"menclose",
		"merror",
		"mfenced",
		"mfrac",
		"mglyph",
		"mi",
		"mlabeledtr",
		"mmultiscripts",
		"mn",
		"mo",
		"mover",
		"mpadded",
		"mphantom",
		"mroot",
		"mrow",
		"ms",
		"mspace",
		"msqrt",
		"mstyle",
		"msub",
		"msup",
		"msubsup",
		"mtable",
		"mtd",
		"mtext",
		"mtr",
		"munder",
		"munderover",
		"mprescripts"
	]);
	const mathMlDisallowed = freeze([
		"maction",
		"maligngroup",
		"malignmark",
		"mlongdiv",
		"mscarries",
		"mscarry",
		"msgroup",
		"mstack",
		"msline",
		"msrow",
		"semantics",
		"annotation",
		"annotation-xml",
		"mprescripts",
		"none"
	]);
	const text = freeze(["#text"]);
	const html = freeze([
		"accept",
		"action",
		"align",
		"alt",
		"autocapitalize",
		"autocomplete",
		"autopictureinpicture",
		"autoplay",
		"background",
		"bgcolor",
		"border",
		"capture",
		"cellpadding",
		"cellspacing",
		"checked",
		"cite",
		"class",
		"clear",
		"color",
		"cols",
		"colspan",
		"command",
		"commandfor",
		"controls",
		"controlslist",
		"coords",
		"crossorigin",
		"datetime",
		"decoding",
		"default",
		"dir",
		"disabled",
		"disablepictureinpicture",
		"disableremoteplayback",
		"download",
		"draggable",
		"enctype",
		"enterkeyhint",
		"exportparts",
		"face",
		"for",
		"headers",
		"height",
		"hidden",
		"high",
		"href",
		"hreflang",
		"id",
		"inert",
		"inputmode",
		"integrity",
		"ismap",
		"kind",
		"label",
		"lang",
		"list",
		"loading",
		"loop",
		"low",
		"max",
		"maxlength",
		"media",
		"method",
		"min",
		"minlength",
		"multiple",
		"muted",
		"name",
		"nonce",
		"noshade",
		"novalidate",
		"nowrap",
		"open",
		"optimum",
		"part",
		"pattern",
		"placeholder",
		"playsinline",
		"popover",
		"popovertarget",
		"popovertargetaction",
		"poster",
		"preload",
		"pubdate",
		"radiogroup",
		"readonly",
		"rel",
		"required",
		"rev",
		"reversed",
		"role",
		"rows",
		"rowspan",
		"spellcheck",
		"scope",
		"selected",
		"shape",
		"size",
		"sizes",
		"slot",
		"span",
		"srclang",
		"start",
		"src",
		"srcset",
		"step",
		"style",
		"summary",
		"tabindex",
		"title",
		"translate",
		"type",
		"usemap",
		"valign",
		"value",
		"width",
		"wrap",
		"xmlns"
	]);
	const svg = freeze([
		"accent-height",
		"accumulate",
		"additive",
		"alignment-baseline",
		"amplitude",
		"ascent",
		"attributename",
		"attributetype",
		"azimuth",
		"basefrequency",
		"baseline-shift",
		"begin",
		"bias",
		"by",
		"class",
		"clip",
		"clippathunits",
		"clip-path",
		"clip-rule",
		"color",
		"color-interpolation",
		"color-interpolation-filters",
		"color-profile",
		"color-rendering",
		"cx",
		"cy",
		"d",
		"dx",
		"dy",
		"diffuseconstant",
		"direction",
		"display",
		"divisor",
		"dominant-baseline",
		"dur",
		"edgemode",
		"elevation",
		"end",
		"exponent",
		"fill",
		"fill-opacity",
		"fill-rule",
		"filter",
		"filterunits",
		"flood-color",
		"flood-opacity",
		"font-family",
		"font-size",
		"font-size-adjust",
		"font-stretch",
		"font-style",
		"font-variant",
		"font-weight",
		"fx",
		"fy",
		"g1",
		"g2",
		"glyph-name",
		"glyphref",
		"gradientunits",
		"gradienttransform",
		"height",
		"href",
		"id",
		"image-rendering",
		"in",
		"in2",
		"intercept",
		"k",
		"k1",
		"k2",
		"k3",
		"k4",
		"kerning",
		"keypoints",
		"keysplines",
		"keytimes",
		"lang",
		"lengthadjust",
		"letter-spacing",
		"kernelmatrix",
		"kernelunitlength",
		"lighting-color",
		"local",
		"marker-end",
		"marker-mid",
		"marker-start",
		"markerheight",
		"markerunits",
		"markerwidth",
		"maskcontentunits",
		"maskunits",
		"max",
		"mask",
		"mask-type",
		"media",
		"method",
		"mode",
		"min",
		"name",
		"numoctaves",
		"offset",
		"operator",
		"opacity",
		"order",
		"orient",
		"orientation",
		"origin",
		"overflow",
		"paint-order",
		"path",
		"pathlength",
		"patterncontentunits",
		"patterntransform",
		"patternunits",
		"pointer-events",
		"points",
		"preservealpha",
		"preserveaspectratio",
		"primitiveunits",
		"r",
		"rx",
		"ry",
		"radius",
		"refx",
		"refy",
		"repeatcount",
		"repeatdur",
		"restart",
		"result",
		"rotate",
		"scale",
		"seed",
		"shape-rendering",
		"slope",
		"specularconstant",
		"specularexponent",
		"spreadmethod",
		"startoffset",
		"stddeviation",
		"stitchtiles",
		"stop-color",
		"stop-opacity",
		"stroke-dasharray",
		"stroke-dashoffset",
		"stroke-linecap",
		"stroke-linejoin",
		"stroke-miterlimit",
		"stroke-opacity",
		"stroke",
		"stroke-width",
		"style",
		"surfacescale",
		"systemlanguage",
		"tabindex",
		"tablevalues",
		"targetx",
		"targety",
		"transform",
		"transform-origin",
		"text-anchor",
		"text-decoration",
		"text-orientation",
		"text-rendering",
		"textlength",
		"type",
		"u1",
		"u2",
		"unicode",
		"values",
		"vector-effect",
		"viewbox",
		"visibility",
		"version",
		"vert-adv-y",
		"vert-origin-x",
		"vert-origin-y",
		"width",
		"word-spacing",
		"wrap",
		"writing-mode",
		"xchannelselector",
		"ychannelselector",
		"x",
		"x1",
		"x2",
		"xmlns",
		"y",
		"y1",
		"y2",
		"z",
		"zoomandpan"
	]);
	const mathMl = freeze([
		"accent",
		"accentunder",
		"align",
		"bevelled",
		"close",
		"columnalign",
		"columnlines",
		"columnspacing",
		"columnspan",
		"denomalign",
		"depth",
		"dir",
		"display",
		"displaystyle",
		"encoding",
		"fence",
		"frame",
		"height",
		"href",
		"id",
		"largeop",
		"length",
		"linethickness",
		"lquote",
		"lspace",
		"mathbackground",
		"mathcolor",
		"mathsize",
		"mathvariant",
		"maxsize",
		"minsize",
		"movablelimits",
		"notation",
		"numalign",
		"open",
		"rowalign",
		"rowlines",
		"rowspacing",
		"rowspan",
		"rspace",
		"rquote",
		"scriptlevel",
		"scriptminsize",
		"scriptsizemultiplier",
		"selection",
		"separator",
		"separators",
		"stretchy",
		"subscriptshift",
		"supscriptshift",
		"symmetric",
		"voffset",
		"width",
		"xmlns"
	]);
	const xml = freeze([
		"xlink:href",
		"xml:id",
		"xlink:title",
		"xml:space",
		"xmlns:xlink"
	]);
	const MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
	const ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
	const TMPLIT_EXPR = seal(/\${[\w\W]*/g);
	const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
	const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
	const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
	const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
	const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
	const DOCTYPE_NAME = seal(/^html$/i);
	const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
	const ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
	const COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
	const FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
	const SELF_CLOSING_TAG = seal(/\/>/i);
	const NODE_TYPE = {
		element: 1,
		attribute: 2,
		text: 3,
		cdataSection: 4,
		entityReference: 5,
		entityNode: 6,
		processingInstruction: 7,
		comment: 8,
		document: 9,
		documentType: 10,
		documentFragment: 11,
		notation: 12
	};
	const LITERAL_TEXT_ELEMENTS = freeze(addToSet({}, [
		"style",
		"script",
		"xmp",
		"iframe",
		"noembed",
		"noframes",
		"plaintext",
		"noscript"
	]));
	const getGlobal = function getGlobal() {
		return typeof window === "undefined" ? null : window;
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
		if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") return null;
		let suffix = null;
		const ATTR_NAME = "data-tt-policy-suffix";
		if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) suffix = purifyHostElement.getAttribute(ATTR_NAME);
		const policyName = "dompurify" + (suffix ? "#" + suffix : "");
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
			console.warn("TrustedTypes policy " + policyName + " could not be created.");
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
	/**
	* Resolve a set-valued configuration option: a fresh set built from
	* cfg[key] when it is an own array property (seeded with a clone of
	* options.base when given, case-normalized via options.transform),
	* the fallback set otherwise.
	*
	* @param cfg the cloned, prototype-free configuration object
	* @param key the configuration property to read
	* @param fallback the set to use when the option is absent or not an array
	* @param options transform and optional base set to merge into
	* @returns the resolved set
	*/
	const _resolveSetOption = function _resolveSetOption(cfg, key, fallback, options) {
		return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
	};
	/**
	* Resolve an object-valued configuration option: a prototype-free clone
	* of cfg[key] when it is an own, truthy object property, else a fresh
	* fallback built by makeFallback (fresh on every parse, so a previous
	* parse can never leak state into the next one).
	*
	* @param cfg the cloned, prototype-free configuration object
	* @param key the configuration property to read
	* @param makeFallback builds the fallback value when the option is absent
	* @returns the resolved object
	*/
	const _resolveObjectOption = function _resolveObjectOption(cfg, key, makeFallback) {
		const value = objectHasOwnProperty(cfg, key) ? cfg[key] : void 0;
		return value && typeof value === "object" ? clone(value) : makeFallback();
	};
	function createDOMPurify() {
		let window = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
		const DOMPurify = (root) => createDOMPurify(root);
		DOMPurify.version = "3.4.17";
		DOMPurify.removed = [];
		if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
			DOMPurify.isSupported = false;
			return DOMPurify;
		}
		let document = window.document;
		const originalDocument = document;
		const currentScript = originalDocument.currentScript;
		const HTMLTemplateElement = window.HTMLTemplateElement, Node = window.Node, Element = window.Element, NodeFilter = window.NodeFilter;
		const DOMParser = window.DOMParser, trustedTypes = window.trustedTypes;
		const ElementPrototype = Element.prototype;
		const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
		const remove = lookupGetter(ElementPrototype, "remove");
		const removeAttributeNode = lookupGetter(ElementPrototype, "removeAttributeNode");
		const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
		const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
		const getParentNode = lookupGetter(ElementPrototype, "parentNode");
		const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
		const getAttributes = lookupGetter(ElementPrototype, "attributes");
		const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeType") : null;
		const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, "nodeName") : null;
		const getOwnerDocument = Node && Node.prototype ? lookupGetter(Node.prototype, "ownerDocument") : null;
		const _readNodeType = function _readNodeType(node) {
			return getNodeType ? getNodeType(node) : node.nodeType;
		};
		const _readNodeName = function _readNodeName(node) {
			return getNodeName ? getNodeName(node) : node.nodeName;
		};
		const getNamespaceURI = lookupAccessor(ElementPrototype, "namespaceURI");
		const _readNamespaceURI = function _readNamespaceURI(element) {
			return getNamespaceURI ? getNamespaceURI(element) : element.namespaceURI;
		};
		if (typeof HTMLTemplateElement === "function") {
			const template = document.createElement("template");
			if (template.content && template.content.ownerDocument) document = template.content.ownerDocument;
		}
		let trustedTypesPolicy;
		let emptyHTML = "";
		let defaultTrustedTypesPolicy;
		let defaultTrustedTypesPolicyResolved = false;
		let IN_TRUSTED_TYPES_POLICY = 0;
		const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy() {
			if (IN_TRUSTED_TYPES_POLICY > 0) throw typeErrorCreate("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
		};
		const _createTrustedHTML = function _createTrustedHTML(html) {
			_assertNotInTrustedTypesPolicy();
			IN_TRUSTED_TYPES_POLICY++;
			try {
				return trustedTypesPolicy.createHTML(html);
			} finally {
				IN_TRUSTED_TYPES_POLICY--;
			}
		};
		const _createTrustedScriptURL = function _createTrustedScriptURL(scriptUrl) {
			_assertNotInTrustedTypesPolicy();
			IN_TRUSTED_TYPES_POLICY++;
			try {
				return trustedTypesPolicy.createScriptURL(scriptUrl);
			} finally {
				IN_TRUSTED_TYPES_POLICY--;
			}
		};
		const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy() {
			if (!defaultTrustedTypesPolicyResolved) {
				defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
				defaultTrustedTypesPolicyResolved = true;
			}
			return defaultTrustedTypesPolicy;
		};
		const _document = document, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
		const importNode = originalDocument.importNode;
		let hooks = _createHooksMap();
		/**
		* Expose whether this browser supports running the full DOMPurify.
		*/
		DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
		const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
		let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
		/**
		* We consider the elements and attributes below to be safe. Ideally
		* don't add any new ones but feel free to remove unwanted ones.
		*/
		let ALLOWED_TAGS = null;
		const DEFAULT_ALLOWED_TAGS = addToSet({}, [
			...html$1,
			...svg$1,
			...svgFilters,
			...mathMl$1,
			...text
		]);
		let ALLOWED_ATTR = null;
		const DEFAULT_ALLOWED_ATTR = addToSet({}, [
			...html,
			...svg,
			...mathMl,
			...xml
		]);
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
		let FORBID_TAGS = null;
		let FORBID_ATTR = null;
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
		let ALLOW_ARIA_ATTR = true;
		let ALLOW_DATA_ATTR = true;
		let ALLOW_UNKNOWN_PROTOCOLS = false;
		let ALLOW_SELF_CLOSE_IN_ATTR = true;
		let SAFE_FOR_TEMPLATES = false;
		let SAFE_FOR_XML = true;
		let WHOLE_DOCUMENT = false;
		let SET_CONFIG = false;
		let SET_CONFIG_ALLOWED_TAGS = null;
		let SET_CONFIG_ALLOWED_ATTR = null;
		let FORCE_BODY = false;
		let RETURN_DOM = false;
		let RETURN_DOM_FRAGMENT = false;
		let RETURN_TRUSTED_TYPE = false;
		let SANITIZE_DOM = true;
		let SANITIZE_NAMED_PROPS = false;
		const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
		let KEEP_CONTENT = true;
		let IN_PLACE = false;
		let IN_PLACE_VISITED = null;
		let USE_PROFILES = {};
		let FORBID_CONTENTS = null;
		const DEFAULT_FORBID_CONTENTS = addToSet({}, [
			"annotation-xml",
			"audio",
			"colgroup",
			"desc",
			"foreignobject",
			"head",
			"iframe",
			"math",
			"mi",
			"mn",
			"mo",
			"ms",
			"mtext",
			"noembed",
			"noframes",
			"noscript",
			"plaintext",
			"script",
			"selectedcontent",
			"style",
			"svg",
			"template",
			"thead",
			"title",
			"video",
			"xmp"
		]);
		let DATA_URI_TAGS = null;
		const DEFAULT_DATA_URI_TAGS = addToSet({}, [
			"audio",
			"video",
			"img",
			"source",
			"image",
			"track"
		]);
		let URI_SAFE_ATTRIBUTES = null;
		const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, [
			"alt",
			"class",
			"for",
			"id",
			"label",
			"name",
			"pattern",
			"placeholder",
			"role",
			"summary",
			"title",
			"value",
			"style",
			"xmlns"
		]);
		const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
		const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
		const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
		let NAMESPACE = HTML_NAMESPACE;
		let IS_EMPTY_INPUT = false;
		let ALLOWED_NAMESPACES = null;
		const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [
			MATHML_NAMESPACE,
			SVG_NAMESPACE,
			HTML_NAMESPACE
		], stringToString);
		const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze([
			"mi",
			"mo",
			"mn",
			"ms",
			"mtext"
		]);
		let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
		const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
		let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
		const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, [
			"title",
			"style",
			"font",
			"a",
			"script"
		]);
		let PARSER_MEDIA_TYPE = null;
		const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
		const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
		let transformCaseFunc = null;
		let CONFIG = null;
		const formElement = document.createElement("form");
		const isRegexOrFunction = function isRegexOrFunction(testValue) {
			return testValue instanceof RegExp || testValue instanceof Function;
		};
		/**
		* _parseConfig
		*
		* @param cfg optional config literal
		*/
		const _parseConfig = function _parseConfig() {
			let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
			if (CONFIG && CONFIG === cfg) return;
			if (!cfg || typeof cfg !== "object") cfg = {};
			cfg = clone(cfg);
			PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
			transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
			ALLOWED_TAGS = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, { transform: transformCaseFunc });
			ALLOWED_ATTR = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, { transform: transformCaseFunc });
			ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, { transform: stringToString });
			URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
				transform: transformCaseFunc,
				base: DEFAULT_URI_SAFE_ATTRIBUTES
			});
			DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
				transform: transformCaseFunc,
				base: DEFAULT_DATA_URI_TAGS
			});
			FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, { transform: transformCaseFunc });
			FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), { transform: transformCaseFunc });
			FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), { transform: transformCaseFunc });
			USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
			ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
			ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
			ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
			ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
			SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
			SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
			WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
			RETURN_DOM = cfg.RETURN_DOM || false;
			RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
			RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
			FORCE_BODY = cfg.FORCE_BODY || false;
			SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
			SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
			KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
			IN_PLACE = cfg.IN_PLACE || false;
			IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
			NAMESPACE = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
			MATHML_TEXT_INTEGRATION_POINTS = _resolveObjectOption(cfg, "MATHML_TEXT_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS));
			HTML_INTEGRATION_POINTS = _resolveObjectOption(cfg, "HTML_INTEGRATION_POINTS", () => addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS));
			const customElementHandling = _resolveObjectOption(cfg, "CUSTOM_ELEMENT_HANDLING", () => create(null));
			CUSTOM_ELEMENT_HANDLING = create(null);
			if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
			if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
			if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
			seal(CUSTOM_ELEMENT_HANDLING);
			if (SAFE_FOR_TEMPLATES) ALLOW_DATA_ATTR = false;
			if (RETURN_DOM_FRAGMENT) RETURN_DOM = true;
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
			EXTRA_ELEMENT_HANDLING.tagCheck = null;
			EXTRA_ELEMENT_HANDLING.attributeCheck = null;
			if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
				if (typeof cfg.ADD_TAGS === "function") EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
				else if (arrayIsArray(cfg.ADD_TAGS)) {
					if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) ALLOWED_TAGS = clone(ALLOWED_TAGS);
					addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
				}
			}
			if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
				if (typeof cfg.ADD_ATTR === "function") EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
				else if (arrayIsArray(cfg.ADD_ATTR)) {
					if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) ALLOWED_ATTR = clone(ALLOWED_ATTR);
					addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
				}
			}
			if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
				if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) FORBID_CONTENTS = clone(FORBID_CONTENTS);
				addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
			}
			if (KEEP_CONTENT) ALLOWED_TAGS["#text"] = true;
			if (WHOLE_DOCUMENT) addToSet(ALLOWED_TAGS, [
				"html",
				"head",
				"body"
			]);
			if (ALLOWED_TAGS.table) {
				addToSet(ALLOWED_TAGS, ["tbody"]);
				delete FORBID_TAGS.tbody;
			}
			if (cfg.TRUSTED_TYPES_POLICY) {
				if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
				if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") throw typeErrorCreate("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
				const previousTrustedTypesPolicy = trustedTypesPolicy;
				trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
				try {
					emptyHTML = _createTrustedHTML("");
				} catch (error) {
					trustedTypesPolicy = previousTrustedTypesPolicy;
					throw error;
				}
			} else if (cfg.TRUSTED_TYPES_POLICY === null) {
				trustedTypesPolicy = void 0;
				emptyHTML = "";
			} else {
				if (trustedTypesPolicy === void 0) trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
				if (trustedTypesPolicy && typeof emptyHTML === "string") emptyHTML = _createTrustedHTML("");
			}
			if (freeze) freeze(cfg);
			CONFIG = cfg;
		};
		const ALL_SVG_TAGS = addToSet({}, [
			...svg$1,
			...svgFilters,
			...svgDisallowed
		]);
		const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
		/**
		* Namespace rules for an element in the SVG namespace.
		*
		* @param tagName the element's lowercase tag name
		* @param parent the (possibly simulated) parent node
		* @param parentTagName the parent's lowercase tag name
		* @returns true if a spec-compliant parser could produce this element
		*/
		const _checkSvgNamespace = function _checkSvgNamespace(tagName, parent, parentTagName) {
			if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "svg";
			if (parent.namespaceURI === MATHML_NAMESPACE) return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
			return Boolean(ALL_SVG_TAGS[tagName]);
		};
		/**
		* Namespace rules for an element in the MathML namespace.
		*
		* @param tagName the element's lowercase tag name
		* @param parent the (possibly simulated) parent node
		* @param parentTagName the parent's lowercase tag name
		* @returns true if a spec-compliant parser could produce this element
		*/
		const _checkMathMlNamespace = function _checkMathMlNamespace(tagName, parent, parentTagName) {
			if (parent.namespaceURI === HTML_NAMESPACE) return tagName === "math";
			if (parent.namespaceURI === SVG_NAMESPACE) return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
			return Boolean(ALL_MATHML_TAGS[tagName]);
		};
		/**
		* Namespace rules for an element in the HTML namespace.
		*
		* @param tagName the element's lowercase tag name
		* @param parent the (possibly simulated) parent node
		* @param parentTagName the parent's lowercase tag name
		* @returns true if a spec-compliant parser could produce this element
		*/
		const _checkHtmlNamespace = function _checkHtmlNamespace(tagName, parent, parentTagName) {
			if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) return false;
			if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) return false;
			return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
		};
		/**
		* @param element a DOM element whose namespace is being checked
		* @returns Return false if the element has a
		*  namespace that a spec-compliant parser would never
		*  return. Return true otherwise.
		*/
		const _checkValidNamespace = function _checkValidNamespace(element) {
			const elementNamespace = _readNamespaceURI(element);
			const tagName = stringToLowerCase(_readNodeName(element));
			const parentNode = getParentNode(element);
			let parent;
			let parentTagName;
			if (parentNode && _readNodeType(parentNode) === NODE_TYPE.element) {
				parent = { namespaceURI: _readNamespaceURI(parentNode) };
				parentTagName = stringToLowerCase(_readNodeName(parentNode));
			} else {
				parent = { namespaceURI: NAMESPACE };
				parentTagName = "template";
			}
			if (!ALLOWED_NAMESPACES[elementNamespace]) return false;
			if (elementNamespace === SVG_NAMESPACE) return _checkSvgNamespace(tagName, parent, parentTagName);
			if (elementNamespace === MATHML_NAMESPACE) return _checkMathMlNamespace(tagName, parent, parentTagName);
			if (elementNamespace === HTML_NAMESPACE) return _checkHtmlNamespace(tagName, parent, parentTagName);
			if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[elementNamespace]) return true;
			return false;
		};
		/**
		* _forceRemove
		*
		* @param node a DOM node
		*/
		const _forceRemove = function _forceRemove(node) {
			arrayPush(DOMPurify.removed, { element: node });
			try {
				getParentNode(node).removeChild(node);
			} catch (_) {
				remove(node);
				if (!getParentNode(node)) throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
			}
		};
		/**
		* _stripAttributeNode
		*
		* Remove a single Attr node case/namespace-exactly on an attribute-teardown
		* path. Name-based removeAttribute() ASCII-lowercases its lookup key for an
		* HTML element in an HTML document and so silently misses a case-preserved
		* handler (e.g. `ONERROR` off an XML/XHTML import) - the same defect
		* _removeAttribute() was fixed for, which a name-based call would reintroduce
		* on these IN_PLACE teardown paths. Unlike _removeAttribute this does not
		* record into DOMPurify.removed: the neutralize passes intentionally do not
		* book-keep. A clobbered/detached node falls back to best-effort name-based
		* removal.
		*
		* @param element the element to strip the attribute from
		* @param attribute the Attr node to remove
		* @param name the attribute's name, for the fallback path
		*/
		const _stripAttributeNode = function _stripAttributeNode(element, attribute, name) {
			try {
				removeAttributeNode(element, attribute);
			} catch (_) {
				try {
					element.removeAttribute(name);
				} catch (_) {}
			}
		};
		/**
		* Fail-closed teardown of an in-place root: strip every disallowed attribute
		* in the subtree first, so nothing armed is left behind, then remove all
		* children and the root's own attributes.
		*
		* @param root the in-place root to empty
		*/
		const _neutralizeRoot = function _neutralizeRoot(root) {
			_neutralizeSubtree(root);
			const childNodes = getChildNodes(root);
			if (childNodes) arrayForEach(arraySlice(childNodes), (child) => {
				try {
					remove(child);
				} catch (_) {}
			});
			const attributes = _readNodeType(root) === NODE_TYPE.element ? getAttributes(root) : null;
			if (attributes) for (let i = attributes.length - 1; i >= 0; --i) {
				const attribute = attributes[i];
				const name = attribute && attribute.name;
				if (typeof name === "string") _stripAttributeNode(root, attribute, name);
			}
		};
		/**
		* Removes an attribute, preferably as its exact Attr node: name-based
		* removal lowercases the name in HTML documents and misses case-preserved
		* names, e.g. from imported XHTML.
		*
		* @param name an Attribute name
		* @param element a DOM node
		* @param attr the exact Attr node to remove, when the caller has it
		*/
		const _removeAttribute = function _removeAttribute(name, element, attr) {
			if (!attr) try {
				attr = element.getAttributeNode(name);
			} catch (_) {
				attr = null;
			}
			arrayPush(DOMPurify.removed, {
				attribute: attr || null,
				from: element
			});
			try {
				if (attr) removeAttributeNode(element, attr);
				else element.removeAttribute(name);
			} catch (_) {
				try {
					element.removeAttribute(name);
				} catch (_) {}
			}
			if (name === "is") {
				if (RETURN_DOM || RETURN_DOM_FRAGMENT) try {
					_forceRemove(element);
				} catch (_) {}
				else try {
					element.setAttribute(name, "");
				} catch (_) {}
			}
		};
		/**
		* Removes every attribute the configuration does not allow. Used to
		* neutralize nodes discarded from an in-place tree.
		*
		* @param element the element to strip
		*/
		const _stripDisallowedAttributes = function _stripDisallowedAttributes(element) {
			const attributes = getAttributes(element);
			if (!attributes) return;
			for (let i = attributes.length - 1; i >= 0; --i) {
				const attribute = attributes[i];
				const name = attribute && attribute.name;
				if (typeof name !== "string" || ALLOWED_ATTR[transformCaseFunc(name)]) continue;
				_stripAttributeNode(element, attribute, name);
			}
		};
		/**
		* Iterative depth-first walk, so deep trees cannot overflow the call stack,
		* reading through the cached getters, so clobbering cannot hide children.
		* When `visit` returns false, the node's children are skipped. With
		* `intoShadow`, open shadow roots are walked after their host's children.
		*
		* @param root where to start
		* @param visit called for every node
		* @param intoShadow whether to enter open shadow roots
		*/
		const _walkTree = function _walkTree(root, visit) {
			let intoShadow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
			const stack = [root];
			while (stack.length > 0) {
				const node = stack.pop();
				if (visit(node) === false) continue;
				if (intoShadow && _readNodeType(node) === NODE_TYPE.element) {
					const shadowRoot = getShadowRoot(node);
					if (_isDocumentFragment(shadowRoot)) stack.push(shadowRoot);
				}
				const childNodes = getChildNodes(node);
				if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push(childNodes[i]);
			}
		};
		/**
		* Strips disallowed attributes from every element of a discarded subtree,
		* so a handler that is already queued (a loading image) cannot fire.
		*
		* @param root the root of a removed subtree
		*/
		const _neutralizeSubtree = function _neutralizeSubtree(root) {
			_walkTree(root, (node) => {
				if (_readNodeType(node) === NODE_TYPE.element) _stripDisallowedAttributes(node);
			});
		};
		/**
		* All nodes under `root`, root first, including open shadow roots. Template
		* content is not entered, it is inert.
		*
		* @param root the in-place root
		* @return the nodes
		*/
		const _collectLiveNodes = function _collectLiveNodes(root) {
			const nodes = [];
			_walkTree(root, (node) => {
				nodes.push(node);
			}, true);
			return nodes;
		};
		/**
		* Strips disallowed attributes from every element that was under the
		* in-place root when the call started and no longer is, whatever removed
		* or moved it.
		*
		* @param root the in-place root
		* @param before the root's nodes, collected before the walk
		*/
		const _neutralizeEscapedElements = function _neutralizeEscapedElements(root, before) {
			const reachable = setCreate();
			arrayForEach(_collectLiveNodes(root), (node) => {
				if (_readNodeType(node) === NODE_TYPE.element) setAdd(reachable, node);
			});
			arrayForEach(before, (node) => {
				if (_readNodeType(node) === NODE_TYPE.element && !setHas(reachable, node)) _stripDisallowedAttributes(node);
			});
		};
		/**
		* Neutralizes everything that left the in-place tree during the call: what
		* DOMPurify removed, and what hooks or custom elements removed or moved out.
		*
		* @param root the in-place root
		* @param before the root's nodes, collected before the walk
		* @return true if the root itself was removed
		*/
		const _neutralizeDiscarded = function _neutralizeDiscarded(root, before) {
			let rootRemoved = false;
			arrayForEach(DOMPurify.removed, (entry) => {
				if (entry.element) {
					rootRemoved = rootRemoved || entry.element === root;
					_neutralizeSubtree(entry.element);
				}
			});
			_neutralizeEscapedElements(root, before);
			return rootRemoved;
		};
		const MAX_UNVISITED_ROUNDS = 8;
		/**
		* The walk only moves forward, so a node moved to a position it already
		* passed is never visited. Give every original node that is still in the
		* tree but unvisited the normal treatment, hooks included. Nodes created
		* during the call are left alone. Fails closed if the tree keeps changing.
		*
		* @param root the in-place root
		* @param before the root's nodes, collected before the walk
		*/
		const _sanitizeUnvisitedNodes = function _sanitizeUnvisitedNodes(root, before) {
			const visited = IN_PLACE_VISITED;
			let original = null;
			const getOriginal = () => {
				if (!original) {
					original = setCreate();
					arrayForEach(before, (beforeNode) => {
						setAdd(original, beforeNode);
					});
				}
				return original;
			};
			for (let round = 0;; round++) {
				const live = _collectLiveNodes(root);
				const containers = [root];
				let pending = false;
				arrayForEach(live, (node) => {
					if (_readNodeType(node) === NODE_TYPE.documentFragment) arrayPush(containers, node);
					else if (!pending && !setHas(visited, node)) pending = setHas(getOriginal(), node);
				});
				if (!pending) return;
				if (round >= MAX_UNVISITED_ROUNDS) throw typeErrorCreate("the tree kept changing during in-place sanitization; refusing to return it");
				arrayForEach(containers, (container, index) => {
					_sanitizeUnvisitedIn(container, index > 0, root, getOriginal());
				});
			}
		};
		/**
		* One _sanitizeUnvisitedNodes pass over the root or an open shadow root.
		*
		* @param container the root or an open shadow root
		* @param inShadow whether container is a shadow root
		* @param root the in-place root
		* @param original the root's nodes collected before the walk, as a set
		*/
		const _sanitizeUnvisitedIn = function _sanitizeUnvisitedIn(container, inShadow, root, original) {
			const iterator = _createNodeIterator(container);
			let node;
			while (node = iterator.nextNode()) {
				if (!setHas(original, node) || setHas(IN_PLACE_VISITED, node)) continue;
				if (inShadow) _executeHooks(hooks.uponSanitizeShadowNode, node, null);
				_sanitizeElements(node, root);
				_sanitizeAttributes(node, root);
				if (_isDocumentFragment(node.content)) _sanitizeShadowDOM2(node.content);
			}
		};
		/**
		* Records that _sanitizeElements processed `node`. No-op outside IN_PLACE.
		*
		* @param node the node being processed
		*/
		const _markVisited = function _markVisited(node) {
			if (IN_PLACE_VISITED) setAdd(IN_PLACE_VISITED, node);
		};
		/**
		* Patch-linkage attributes (declarative partial updates): `patchsrc`
		* always, `for` everywhere except on <label> and <output>. Gated on
		* SAFE_FOR_XML. Shared by the IN_PLACE pre-pass and _isValidAttribute.
		*
		* @param lcName the transformCaseFunc'd attribute name
		* @param lcTag the transformCaseFunc'd tag name of the carrying element
		* @return true if the attribute is patch linkage and must be dropped
		*/
		const _isPatchLinkageAttribute = function _isPatchLinkageAttribute(lcName, lcTag) {
			if (!SAFE_FOR_XML) return false;
			if (lcName === "patchsrc") return true;
			return lcName === "for" && lcTag !== "label" && lcTag !== "output";
		};
		/**
		* IN_PLACE pre-pass: sever all patch linkage before the walk, so no patch
		* can fire mid-walk into a part of the tree the walker already passed.
		* Removes range markers (processing instructions, comments with markup)
		* and strips linkage attributes. It cannot undo a patch that already fired.
		*
		* TODO: if the shipped feature can patch through `for` on <label>/<output>,
		* drop that pair here too (see test/declarative-patch-probe.html).
		*
		* @param root the in-place root to sweep
		*/
		const _neutralizePatchLinkage = function _neutralizePatchLinkage(root) {
			if (!SAFE_FOR_XML) return;
			_walkTree(root, (node) => {
				const nodeType = _readNodeType(node);
				if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node.data)) {
					try {
						remove(node);
					} catch (_) {}
					return false;
				}
				if (nodeType === NODE_TYPE.element) {
					const element = node;
					const lcTag = transformCaseFunc(_readNodeName(node));
					try {
						if (element.hasAttribute && element.hasAttribute("patchsrc")) element.removeAttribute("patchsrc");
						if (element.hasAttribute && element.hasAttribute("for") && _isPatchLinkageAttribute("for", lcTag)) element.removeAttribute("for");
					} catch (_) {}
				}
				return true;
			});
		};
		/**
		* _initDocument
		*
		* @param dirty - a string of dirty markup
		* @return a DOM, filled with the dirty markup
		*/
		const _initDocument = function _initDocument(dirty) {
			let doc = null;
			let leadingWhitespace = null;
			if (FORCE_BODY) dirty = "<remove></remove>" + dirty;
			else {
				const matches = stringMatch(dirty, /^[\r\n\t ]+/);
				leadingWhitespace = matches && matches[0];
			}
			if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) dirty = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + dirty + "</body></html>";
			const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
			if (NAMESPACE === HTML_NAMESPACE) try {
				doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
			} catch (_) {}
			if (!doc || !doc.documentElement) {
				doc = implementation.createDocument(NAMESPACE, "template", null);
				try {
					doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
				} catch (_) {}
			}
			const body = doc.body || doc.documentElement;
			if (dirty && leadingWhitespace) body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
			if (NAMESPACE === HTML_NAMESPACE) return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
			return WHOLE_DOCUMENT ? doc.documentElement : body;
		};
		/**
		* Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
		*
		* @param root The root element or node to start traversing on.
		* @return The created NodeIterator
		*/
		const _createNodeIterator = function _createNodeIterator(root) {
			const doc = getOwnerDocument ? getOwnerDocument(root) : root.ownerDocument;
			return createNodeIterator.call(doc || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
		};
		/**
		* Replace template expression syntax (mustache, ERB, template
		* literal) with a space; shared by all SAFE_FOR_TEMPLATES scrub
		* sites. Order matters: mustache, then ERB, then template literal.
		*
		* @param value the string to scrub
		* @returns the scrubbed string
		*/
		const _stripTemplateExpressions = function _stripTemplateExpressions(value) {
			value = stringReplace(value, MUSTACHE_EXPR$1, " ");
			value = stringReplace(value, ERB_EXPR$1, " ");
			value = stringReplace(value, TMPLIT_EXPR$1, " ");
			return value;
		};
		/**
		* Strip template-engine expressions ({{...}}, ${...}, <%...%>) from the
		* character data of an element subtree. Used as the final safety net for
		* SAFE_FOR_TEMPLATES on every DOM-returning code path so that expressions
		* which only form after text-node normalization (e.g. fragments split across
		* stripped elements) cannot survive into a template-evaluating framework.
		*
		* Walks text/comment/CDATA/processing-instruction nodes and mutates `.data`
		* in place rather than round-tripping through innerHTML. This preserves
		* descendant node references (important for IN_PLACE callers), avoids a
		* serialize/reparse cycle, and reads literal character data — which means
		* `<%...%>` in text content matches the ERB regex against its real bytes
		* instead of the HTML-entity-escaped form innerHTML would produce.
		*
		* Attribute values are not visited here; SAFE_FOR_TEMPLATES handling for
		* attributes is performed during the per-node `_sanitizeAttributes` pass.
		*
		* @param node The root element whose character data should be scrubbed.
		*/
		const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
			var _node$querySelectorAl;
			_scrubOwnCharacterData(node);
			const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, "template");
			if (templates) arrayForEach(templates, (tmpl) => {
				if (_isDocumentFragment(tmpl.content)) _scrubTemplateExpressions2(tmpl.content);
			});
		};
		/**
		* _scrubOwnCharacterData
		*
		* Non-recursive core of _scrubTemplateExpressions: normalize `node` and
		* strip template expressions from its own character data only. Does not
		* enter <template>.content or attached shadow roots (NodeIterator never
		* does). Used by _sanitizeShadowDOM, where every nested template content
		* and shadow root is already walked - and therefore scrubbed - by its own
		* recursive _sanitizeShadowDOM call; recursing here as well would rescrub
		* each nested fragment once per ancestor, which is quadratic in nesting
		* depth.
		*
		* @param node The root whose own character data should be scrubbed.
		*/
		const _scrubOwnCharacterData = function _scrubOwnCharacterData(node) {
			node.normalize();
			const doc = getOwnerDocument ? getOwnerDocument(node) : node.ownerDocument;
			const walker = createNodeIterator.call(doc || node, node, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
			let currentNode = walker.nextNode();
			while (currentNode) {
				currentNode.data = _stripTemplateExpressions(currentNode.data);
				currentNode = walker.nextNode();
			}
		};
		/**
		* _isClobbered
		*
		* Detect DOM-clobbering on HTMLFormElement nodes. Form is the only HTML
		* interface with [LegacyOverrideBuiltIns]; a descendant element with a
		* `name` attribute matching a prototype property shadows that property
		* on direct reads. We use this check at the IN_PLACE entry-point and
		* during attribute sanitization to refuse clobbered forms.
		*
		* @param element element to check for clobbering attacks
		* @return true if clobbered, false if safe
		*/
		const _isClobbered = function _isClobbered(element) {
			const realTagName = getNodeName ? getNodeName(element) : null;
			if (typeof realTagName !== "string") return false;
			if (transformCaseFunc(realTagName) !== "form") return false;
			return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || typeof element.removeAttributeNode !== "function" || typeof element.getAttributeNode !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || element.nodeType !== getNodeType(element) || element.childNodes !== getChildNodes(element);
		};
		/**
		* Checks whether the given value is a DocumentFragment from any realm.
		*
		* The realm-independent replacement reads `nodeType` through the cached
		* Node.prototype getter and compares to the DOCUMENT_FRAGMENT_NODE
		* constant (11). nodeType is a numeric value resolved from the node's
		* internal slot, identical across realms for the same kind of node.
		*
		* @param value object to check
		* @return true if value is a DocumentFragment-shaped node from any realm
		*/
		const _isDocumentFragment = function _isDocumentFragment(value) {
			if (!getNodeType || typeof value !== "object" || value === null) return false;
			try {
				return getNodeType(value) === NODE_TYPE.documentFragment;
			} catch (_) {
				return false;
			}
		};
		/**
		* Checks whether the given object is a DOM node, including nodes that
		* originate from a different window/realm (e.g. an iframe's
		* contentDocument). The previous `value instanceof Node` check was
		* realm-bound: nodes from a different window failed it, causing
		* sanitize() to silently stringify them and reset IN_PLACE to false,
		* returning the original node unsanitized. See GHSA-4w3q-35jp-p934.
		*
		* @param value object to check whether it's a DOM node
		* @return true if value is a DOM node from any realm
		*/
		const _isNode = function _isNode(value) {
			if (!getNodeType || typeof value !== "object" || value === null) return false;
			try {
				return typeof getNodeType(value) === "number";
			} catch (_) {
				return false;
			}
		};
		function _executeHooks(hooks, currentNode, data) {
			if (hooks.length === 0) return;
			arrayForEach(hooks, (hook) => {
				hook.call(DOMPurify, currentNode, data, CONFIG);
			});
		}
		/**
		* Structural-threat checks that condemn a node regardless of the
		* allowlists: mXSS via namespace confusion, risky CSS construction,
		* processing instructions, markup-bearing comments. Pure predicate;
		* the caller removes. Check order is load-bearing.
		*
		* @param currentNode the node to inspect
		* @param tagName the node's transformCaseFunc'd tag name
		* @return true if the node must be removed
		*/
		const _isUnsafeNode = function _isUnsafeNode(currentNode, tagName) {
			if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) return true;
			if (SAFE_FOR_XML && LITERAL_TEXT_ELEMENTS[tagName] && _readNodeType(currentNode) === NODE_TYPE.element && _readNamespaceURI(currentNode) === HTML_NAMESPACE && (_isNode(currentNode.firstElementChild) || typeof currentNode.textContent === "string" && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent))) return true;
			if (currentNode.nodeType === NODE_TYPE.processingInstruction) return true;
			if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) return true;
			return false;
		};
		/**
		* Evaluate a CUSTOM_ELEMENT_HANDLING check (a RegExp or a predicate
		* function, per the validation in _parseConfig) against a name.
		* Additional arguments are forwarded to predicate functions - the
		* attributeNameCheck predicate receives the tag name as its second
		* argument. A null/absent check never matches.
		*
		* @param check the configured tagNameCheck / attributeNameCheck value
		* @param name the name to test
		* @param args extra arguments forwarded to a predicate function
		* @return true if the check matches the name
		*/
		const _matchesNameCheck = function _matchesNameCheck(check, name) {
			if (check instanceof RegExp) return regExpTest(check, name);
			if (check instanceof Function) {
				for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
				return Boolean(check(name, ...args));
			}
			return false;
		};
		/**
		* Handle a node whose tag is forbidden or not allowlisted: keep
		* allowed custom elements (false return exits _sanitizeElements
		* early - the namespace and fallback-tag removal checks are
		* intentionally skipped for kept custom elements), else hoist
		* content per KEEP_CONTENT and remove.
		*
		* A kept custom element is the ONLY case in which this function
		* returns false, so the caller uses that return value to run the
		* afterSanitizeElements hook on the kept element and keep the
		* element-hook lifecycle consistent with normal allowlisted
		* elements (GHSA-c2j3-45gr-mqc4).
		*
		* @param currentNode the disallowed node
		* @param tagName the node's transformCaseFunc'd tag name
		* @return true if the node was removed, false if kept
		*/
		const _sanitizeDisallowedNode = function _sanitizeDisallowedNode(currentNode, tagName, root) {
			if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
			if (KEEP_CONTENT && !FORBID_CONTENTS[tagName] && !FORBID_CONTENTS[stringToLowerCase(tagName)]) {
				const parentNode = getParentNode(currentNode);
				const childNodes = getChildNodes(currentNode);
				if (childNodes && parentNode) {
					const childCount = childNodes.length;
					for (let i = childCount - 1; i >= 0; --i) {
						const hoisted = currentNode === root ? cloneNode(childNodes[i], true) : childNodes[i];
						parentNode.insertBefore(hoisted, getNextSibling(currentNode));
					}
				}
			}
			_forceRemove(currentNode);
			return true;
		};
		/**
		* Fork a hook-mutable allowlist off its shared binding the first time a
		* (possibly lazily-installed) uponSanitize* hook is about to see it, so the
		* hook cannot widen the per-instance default or the setConfig binding by
		* reference and leak past the call. Returns the set unchanged once it is
		* already call-local, so repeated calls across elements are idempotent.
		*
		* @param hookList the uponSanitize* hook array for this event
		* @param set the current ALLOWED_TAGS / ALLOWED_ATTR binding
		* @param defaultSet the per-instance DEFAULT_ALLOWED_* constant
		* @param setConfigSet the captured setConfig() binding, or null
		* @return a call-local clone if a hook is present and set is still shared,
		*   else set unchanged
		*/
		const _forkSharedAllowlist = function _forkSharedAllowlist(hookList, set, defaultSet, setConfigSet) {
			if (hookList.length === 0) return set;
			return set === defaultSet || set === setConfigSet ? clone(set) : set;
		};
		/**
		* A hook may have detached the node it was called for. If so, treat it as
		* removed and stop processing it; the walk root is exempt. On the IN_PLACE
		* path the detached subtree is neutralized right away.
		*
		* @param currentNode the node a hook may have detached
		* @param root the current walk root
		* @return true if the node was detached
		*/
		const _handleHookDetachedNode = function _handleHookDetachedNode(currentNode, root) {
			if (currentNode === root || getParentNode(currentNode) !== null) return false;
			if (IN_PLACE) _neutralizeSubtree(currentNode);
			return true;
		};
		/**
		* _sanitizeElements
		*
		* @protect nodeName
		* @protect textContent
		* @protect removeChild
		* @param currentNode to check for permission to exist
		* @return true if node was killed, false if left alive
		*/
		const _sanitizeElements = function _sanitizeElements(currentNode, root) {
			_markVisited(currentNode);
			_executeHooks(hooks.beforeSanitizeElements, currentNode, null);
			if (_handleHookDetachedNode(currentNode, root)) return true;
			if (_isClobbered(currentNode)) {
				_forceRemove(currentNode);
				return true;
			}
			const tagName = transformCaseFunc(_readNodeName(currentNode));
			ALLOWED_TAGS = _forkSharedAllowlist(hooks.uponSanitizeElement, ALLOWED_TAGS, DEFAULT_ALLOWED_TAGS, SET_CONFIG_ALLOWED_TAGS);
			_executeHooks(hooks.uponSanitizeElement, currentNode, {
				tagName,
				allowedTags: ALLOWED_TAGS
			});
			if (_handleHookDetachedNode(currentNode, root)) return true;
			if (_isUnsafeNode(currentNode, tagName)) {
				_forceRemove(currentNode);
				return true;
			}
			if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
				const removed = _sanitizeDisallowedNode(currentNode, tagName, root);
				if (removed === false) {
					_executeHooks(hooks.afterSanitizeElements, currentNode, null);
					if (_handleHookDetachedNode(currentNode, root)) return true;
				}
				return removed;
			}
			if (_readNodeType(currentNode) === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
				_forceRemove(currentNode);
				return true;
			}
			if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
				_forceRemove(currentNode);
				return true;
			}
			if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
				const content = _stripTemplateExpressions(currentNode.textContent);
				if (currentNode.textContent !== content) {
					arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
					currentNode.textContent = content;
				}
			}
			_executeHooks(hooks.afterSanitizeElements, currentNode, null);
			return _handleHookDetachedNode(currentNode, root);
		};
		/**
		* _isValidAttribute
		*
		* @param lcTag Lowercase tag name of containing element.
		* @param lcName Lowercase attribute name.
		* @param value Attribute value.
		* @return Returns true if `value` is valid, otherwise false.
		*/
		const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
			if (FORBID_ATTR[lcName]) return false;
			if (_isPatchLinkageAttribute(lcName, lcTag)) return false;
			if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document || value in formElement)) return false;
			const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
			if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) return true;
			if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) return true;
			if (!nameIsPermitted) return _isBasicCustomElement(lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName, lcTag) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && _matchesNameCheck(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value);
			if (URI_SAFE_ATTRIBUTES[lcName]) return true;
			if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
			if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) return true;
			if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) return true;
			return !value;
		};
		const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, [
			"annotation-xml",
			"color-profile",
			"font-face",
			"font-face-format",
			"font-face-name",
			"font-face-src",
			"font-face-uri",
			"missing-glyph"
		]);
		/**
		* _isBasicCustomElement
		* checks if at least one dash is included in tagName, and it's not the first char
		* for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
		*
		* @param tagName name of the tag of the node to sanitize
		* @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
		*/
		const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
			return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
		};
		/**
		* Wrap an attribute value in the matching Trusted Types object when
		* the active policy requires it. Namespaced attributes pass through
		* unchanged (no TT support yet, see
		* https://bugs.chromium.org/p/chromium/issues/detail?id=1305293).
		*
		* @param lcTag lowercase tag name of the containing element
		* @param lcName lowercase attribute name
		* @param namespaceURI the attribute's namespace, if any
		* @param value the attribute value to wrap
		* @return the value, wrapped when Trusted Types demand it
		*/
		const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value) {
			if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) switch (trustedTypes.getAttributeType(lcTag, lcName)) {
				case "TrustedHTML": return _createTrustedHTML(value);
				case "TrustedScriptURL": return _createTrustedScriptURL(value);
			}
			return value;
		};
		/**
		* Write a modified attribute value back onto the element. On
		* success, re-probe for clobbering introduced by the new value and
		* remove the element when found; otherwise, when this writeback is the
		* recreate half of the SANITIZE_NAMED_PROPS remove-and-recreate, pop the
		* removal entry that path recorded so it does not show as removed. On
		* failure, remove the attribute instead.
		*
		* Returns true only on a clean write (the value was set and the new value
		* introduced no clobbering). The caller uses that, together with its own
		* knowledge of whether this attribute pushed a DOMPurify.removed record, to
		* decide whether to pop that record. The pop must happen ONLY for the
		* named-prop remove-and-recreate; popping on any other value change (trim,
		* template scrubbing, Trusted Types) would consume an unrelated _forceRemove
		* subtree-cleanup record and let that detached subtree keep a live event
		* handler through the IN_PLACE neutralization pass (SO-001).
		*
		* @param currentNode the element carrying the attribute
		* @param name the attribute name as present on the element
		* @param namespaceURI the attribute's namespace, if any
		* @param value the new attribute value
		* @return true if the value was written without introducing clobbering
		*/
		const _setAttributeValue = function _setAttributeValue(currentNode, name, namespaceURI, value) {
			try {
				if (namespaceURI) currentNode.setAttributeNS(namespaceURI, name, value);
				else currentNode.setAttribute(name, value);
				if (_isClobbered(currentNode)) {
					_forceRemove(currentNode);
					return false;
				}
				return true;
			} catch (_) {
				_removeAttribute(name, currentNode);
				return false;
			}
		};
		/**
		* _isUnsafeAttributeValue
		*
		* Value-based attribute checks that the attribute walk applies before any
		* hook can force-keep an attribute, shared with the public
		* isValidAttribute() so that it never approves a value sanitize() would
		* strip.
		*
		* @param name the attribute name as found on the node (case preserved)
		* @param value the attribute value
		* @returns true if the attribute must be removed because of its value
		*/
		const _isUnsafeAttributeValue = function _isUnsafeAttributeValue(name, value) {
			if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) return true;
			return stringToLowerCase(name) === "attributename" && stringMatch(value, "href") !== null;
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
		* @param root the current walk root
		*/
		const _sanitizeAttributes = function _sanitizeAttributes(currentNode, root) {
			_executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
			if (_handleHookDetachedNode(currentNode, root)) return;
			const attributes = currentNode.attributes;
			if (!attributes || _isClobbered(currentNode)) return;
			ALLOWED_ATTR = _forkSharedAllowlist(hooks.uponSanitizeAttribute, ALLOWED_ATTR, DEFAULT_ALLOWED_ATTR, SET_CONFIG_ALLOWED_ATTR);
			const hookEvent = {
				attrName: "",
				attrValue: "",
				keepAttr: true,
				allowedAttributes: ALLOWED_ATTR,
				forceKeepAttr: void 0
			};
			let l = attributes.length;
			const lcTag = transformCaseFunc(currentNode.nodeName);
			while (l--) {
				const attr = attributes[l];
				const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
				const lcName = transformCaseFunc(name);
				const initValue = attrValue;
				let value = name === "value" ? initValue : stringTrim(initValue);
				let recreatedNamedProp = false;
				hookEvent.attrName = lcName;
				hookEvent.attrValue = value;
				hookEvent.keepAttr = true;
				hookEvent.forceKeepAttr = void 0;
				_executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
				value = hookEvent.attrValue;
				if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
					_removeAttribute(name, currentNode, attr);
					value = SANITIZE_NAMED_PROPS_PREFIX + value;
					recreatedNamedProp = true;
				}
				if (_isUnsafeAttributeValue(name, value)) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				if (hookEvent.forceKeepAttr) continue;
				if (!hookEvent.keepAttr) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				if (SAFE_FOR_TEMPLATES) value = _stripTemplateExpressions(value);
				if (!_isValidAttribute(lcTag, lcName, value)) {
					_removeAttribute(name, currentNode, attr);
					continue;
				}
				value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
				if (value !== initValue) {
					if (_setAttributeValue(currentNode, name, namespaceURI, value) && recreatedNamedProp) arrayPop(DOMPurify.removed);
				}
			}
			_executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
			_handleHookDetachedNode(currentNode, root);
		};
		/**
		* _sanitizeShadowDOM
		*
		* @param fragment to iterate over recursively
		*/
		const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
			let shadowNode = null;
			const shadowIterator = _createNodeIterator(fragment);
			_executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
			while (shadowNode = shadowIterator.nextNode()) {
				_executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
				_sanitizeElements(shadowNode, fragment);
				_sanitizeAttributes(shadowNode, fragment);
				if (_isDocumentFragment(shadowNode.content)) _sanitizeShadowDOM2(shadowNode.content);
				if (_readNodeType(shadowNode) === NODE_TYPE.element) {
					const innerSr = getShadowRoot(shadowNode);
					if (_isDocumentFragment(innerSr)) {
						_sanitizeAttachedShadowRoots(innerSr);
						_sanitizeShadowDOM2(innerSr);
					}
				}
			}
			if (SAFE_FOR_TEMPLATES) _scrubOwnCharacterData(fragment);
			_executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
		};
		/**
		* Sanitizes every attached shadow root under `root`, since the node
		* iterator does not enter shadow trees. Needed for IN_PLACE input and for
		* DOM input whose clonable shadow roots were copied by importNode().
		*
		* @param root the subtree root to walk for attached shadow roots
		*/
		const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots(root) {
			const stack = [{
				node: root,
				shadow: null
			}];
			while (stack.length > 0) {
				const item = stack.pop();
				if (item.shadow) {
					_sanitizeShadowDOM2(item.shadow);
					continue;
				}
				const node = item.node;
				const isElement = _readNodeType(node) === NODE_TYPE.element;
				const childNodes = getChildNodes(node);
				if (childNodes) for (let i = childNodes.length - 1; i >= 0; --i) stack.push({
					node: childNodes[i],
					shadow: null
				});
				if (isElement) {
					const rootName = getNodeName ? getNodeName(node) : null;
					if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
						const content = node.content;
						if (_isDocumentFragment(content)) stack.push({
							node: content,
							shadow: null
						});
					}
				}
				if (isElement) {
					const sr = getShadowRoot(node);
					if (_isDocumentFragment(sr)) stack.push({
						node: null,
						shadow: sr
					}, {
						node: sr,
						shadow: null
					});
				}
			}
		};
		DOMPurify.sanitize = function(dirty) {
			let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			let body = null;
			let importedNode = null;
			let currentNode = null;
			let returnNode = null;
			IS_EMPTY_INPUT = !dirty;
			if (IS_EMPTY_INPUT) dirty = "<!-->";
			if (typeof dirty !== "string" && !_isNode(dirty)) {
				dirty = stringifyValue(dirty);
				if (typeof dirty !== "string") throw typeErrorCreate("dirty is not a string, aborting");
			}
			if (!DOMPurify.isSupported) return dirty;
			if (SET_CONFIG) {
				ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
				ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
			} else _parseConfig(cfg);
			if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) ALLOWED_TAGS = clone(ALLOWED_TAGS);
			if (hooks.uponSanitizeAttribute.length > 0) ALLOWED_ATTR = clone(ALLOWED_ATTR);
			DOMPurify.removed = [];
			const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
			let inPlaceNodes = [];
			const outerVisited = IN_PLACE_VISITED;
			if (inPlace) {
				_neutralizePatchLinkage(dirty);
				const nn = _readNodeName(dirty);
				if (typeof nn === "string") {
					const tagName = transformCaseFunc(nn);
					if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
						_neutralizeRoot(dirty);
						throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
					}
				}
				if (_isClobbered(dirty)) {
					_neutralizeRoot(dirty);
					throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
				}
				inPlaceNodes = _collectLiveNodes(dirty);
				IN_PLACE_VISITED = setCreate();
			} else if (_isNode(dirty)) {
				body = _initDocument("<!---->");
				importedNode = body.ownerDocument.importNode(dirty, true);
				if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") body = importedNode;
				else if (importedNode.nodeName === "HTML") body = importedNode;
				else body.appendChild(importedNode);
				_sanitizeAttachedShadowRoots(body);
			} else {
				if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
				body = _initDocument(dirty);
				if (!body) return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
			}
			if (body && FORCE_BODY) _forceRemove(body.firstChild);
			const walkRoot = inPlace ? dirty : body;
			try {
				if (inPlace) _sanitizeAttachedShadowRoots(dirty);
				const nodeIterator = _createNodeIterator(walkRoot);
				while (currentNode = nodeIterator.nextNode()) {
					_sanitizeElements(currentNode, walkRoot);
					_sanitizeAttributes(currentNode, walkRoot);
					if (_isDocumentFragment(currentNode.content)) _sanitizeShadowDOM2(currentNode.content);
				}
				if (inPlace) _sanitizeUnvisitedNodes(dirty, inPlaceNodes);
			} catch (error) {
				if (inPlace) {
					_neutralizeRoot(dirty);
					_neutralizeDiscarded(dirty, inPlaceNodes);
				}
				throw error;
			} finally {
				IN_PLACE_VISITED = outerVisited;
			}
			if (inPlace) {
				if (_neutralizeDiscarded(dirty, inPlaceNodes)) throw typeErrorCreate("a node selected for removal could not be safely returned; refusing to sanitize in place");
				if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(dirty);
				return dirty;
			}
			if (RETURN_DOM) {
				if (SAFE_FOR_TEMPLATES) _scrubTemplateExpressions2(body);
				if (RETURN_DOM_FRAGMENT) {
					returnNode = createDocumentFragment.call(body.ownerDocument);
					while (body.firstChild) returnNode.appendChild(body.firstChild);
				} else returnNode = body;
				if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) returnNode = importNode.call(originalDocument, returnNode, true);
				return returnNode;
			}
			let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
			if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
			if (SAFE_FOR_TEMPLATES) serializedHTML = _stripTemplateExpressions(serializedHTML);
			return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
		};
		DOMPurify.setConfig = function() {
			let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
			_parseConfig(cfg);
			SET_CONFIG = true;
			SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
			SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
		};
		DOMPurify.clearConfig = function() {
			CONFIG = null;
			SET_CONFIG = false;
			SET_CONFIG_ALLOWED_TAGS = null;
			SET_CONFIG_ALLOWED_ATTR = null;
			trustedTypesPolicy = defaultTrustedTypesPolicy;
			emptyHTML = "";
		};
		DOMPurify.isValidAttribute = function(tag, attr, value) {
			if (!CONFIG) _parseConfig({});
			const lcTag = transformCaseFunc(tag);
			const lcName = transformCaseFunc(attr);
			if (typeof value === "string" && (_isUnsafeAttributeValue(attr, value) || !ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value))) return false;
			return _isValidAttribute(lcTag, lcName, value);
		};
		DOMPurify.addHook = function(entryPoint, hookFunction) {
			if (typeof hookFunction !== "function") return;
			if (!objectHasOwnProperty(hooks, entryPoint)) return;
			arrayPush(hooks[entryPoint], hookFunction);
		};
		DOMPurify.removeHook = function(entryPoint, hookFunction) {
			if (!objectHasOwnProperty(hooks, entryPoint)) return;
			if (hookFunction !== void 0) {
				const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
				return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
			}
			return arrayPop(hooks[entryPoint]);
		};
		DOMPurify.removeHooks = function(entryPoint) {
			if (!objectHasOwnProperty(hooks, entryPoint)) return;
			hooks[entryPoint] = [];
		};
		DOMPurify.removeAllHooks = function() {
			hooks = _createHooksMap();
		};
		return DOMPurify;
	}
	return createDOMPurify();
});

//# sourceMappingURL=purify.js.map
});

const renderImageNode = (role, data, className) => {
  const img = (index.h(index.Fragment, null,
    index.h("img", { src: data.href, alt: data.alt, class: className, loading: "lazy", onError: (e) => {
        const wrap = e.target.closest('.chat-image-error-wrap');
        wrap?.classList.add('chat-image-broken');
      } }),
    index.h("wpp-icon-image-v4-7-0", { role: "presentation", "aria-hidden": "true" })));
  return data.linkHref ? (index.h("a", { href: data.linkHref, target: "_blank", rel: "noopener noreferrer", class: "chat-image-link" }, img)) : role === 'assistant' ? (index.h(index.Fragment, null,
    index.h("wpp-action-button-v4-7-0", { class: "image-download-button", variant: "secondary", onClick: () => handleDownload(data.href, data.alt) },
      index.h("wpp-icon-download-v4-7-0", { slot: "icon-start", "aria-hidden": "true" })),
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
      return (index.h("wpp-typography-v4-7-0", { type: type, tag: tag }, token.tokens ? token.tokens.map(t => renderToken(t)) : token.text));
    }
    case 'del':
      return index.h("del", null, token.tokens?.map(t => renderToken(t)));
    case 'paragraph':
      return (index.h("wpp-typography-v4-7-0", { type: "s-body", tag: "p" }, token.tokens ? token.tokens.map(t => renderToken(t)) : token.text));
    case 'blockquote':
      return index.h("blockquote", { class: "chat-quote" }, token.tokens?.map(t => renderToken(t)));
    case 'strong':
      return (index.h("wpp-typography-v4-7-0", { type: "s-strong", tag: "span" }, token.tokens?.map(t => renderToken(t))));
    case 'em':
      return index.h("em", null, token.tokens?.map(t => renderToken(t)));
    case 'codespan':
      return index.h("code", { class: "inline-code" }, token.text);
    case 'code':
      return (index.h("pre", { class: "code-block" },
        index.h("div", { class: "code-lang" },
          index.h("span", null, token.lang || 'plaintext'),
          index.h("wpp-icon-copy-v4-7-0", { class: "code-block-copy-icon", size: "s", color: "var(--wpp-grey-color-600)", onClick: () => {
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
        token.task && index.h("wpp-icon-tick-v4-7-0", null),
        inlineContent.length > 0 && (index.h("wpp-typography-v4-7-0", { type: "s-body" }, inlineContent.map(t => renderToken(t)))),
        nestedLists.map(t => renderToken(t))));
    }
    case 'table': {
      return (index.h("div", { class: "chat-table-wrapper" },
        index.h("table", { class: "chat-table" },
          index.h("thead", null,
            index.h("tr", null, token.header.map((cell, i) => (index.h("th", { key: i },
              index.h("wpp-typography-v4-7-0", { type: "s-strong" }, cell.tokens?.map((t) => renderToken(t)) ?? cell.text)))))),
          index.h("tbody", null, token.rows.map((row, r) => (index.h("tr", { key: r }, row.map((cell, c) => (index.h("td", { key: c },
            index.h("wpp-typography-v4-7-0", { type: "s-body" }, cell.tokens?.map((t) => renderToken(t)) ?? cell.text)))))))))));
    }
    case 'link':
      if (token.title) {
        return (index.h("wpp-tooltip-v4-7-0", { text: token.title },
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
      // @deprecated The multi-image gallery is deprecated per Figma (Chat conversation
      // components). Single images (above) remain supported; the grid layout is kept only
      // for backwards compatibility and should not be used for new work.
      const [first, ...rest] = images;
      return (index.h("div", { class: "chat-image-grid" },
        index.h("div", { class: "chat-image-grid-first chat-image-error-wrap" }, renderImageNode(role, first, 'chat-image-full')),
        index.h("div", { class: "chat-image-grid-row" }, rest.map((data, i) => (index.h("div", { key: i, class: "chat-image-grid-item chat-image-error-wrap" }, renderImageNode(role, data)))))));
    }
    case 'hr':
      return index.h("wpp-divider-v4-7-0", null);
    case 'text':
      return token.tokens
        ? token.tokens.flatMap(t => renderToken(t)).filter((t) => t !== null)
        : token.text;
    case 'html':
    case 'tag':
      // Intentionally ignore raw HTML from LLM output for security
      return null;
    default:
      return 'text' in token ? index.h("wpp-typography-v4-7-0", { type: "s-body" }, token.text) : null;
  }
};

const wppChatConversationMessageCss = "@charset \"UTF-8\";:host{display:-ms-flexbox;display:flex;width:auto}.container{display:grid;width:100%;grid-template-columns:44px minmax(0, 80ch) 44px}.container.no-user-avatar{grid-template-columns:44px minmax(0, 80ch)}.container.no-assistant-avatar{grid-template-columns:minmax(0, 80ch) 44px}.container.no-user-avatar.no-assistant-avatar{grid-template-columns:minmax(0, 80ch)}.avatar-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center}.avatar-wrapper.ai-avatar{-ms-flex-pack:start;justify-content:flex-start}.avatar-wrapper.user-avatar{-ms-flex-pack:end;justify-content:flex-end}.content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:10px;width:100%;margin-left:auto}.content .wpp-typography{display:initial}.content.content-user{width:calc(100% - clamp(10%, 56px, 56px));padding:12px;background-color:var(--wpp-grey-color-000);border-radius:var(--wpp-border-radius-m);-webkit-box-shadow:var(--wpp-box-shadow-xs);box-shadow:var(--wpp-box-shadow-xs)}.content.content-user .attachments{-ms-flex-pack:end;justify-content:flex-end}.content p{margin-top:0}.message{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:12px}.message-text{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:10px}.custom-content ::slotted(*){margin-top:var(--wpp-chat-message-slot-gap, 8px)}.cursor{display:inline-block;width:2px;height:0.85em;margin-left:2px;vertical-align:text-bottom;background-color:currentcolor;border-radius:1px;-webkit-animation:blink 1s steps(1) infinite;animation:blink 1s steps(1) infinite}.code-block{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--wpp-grey-color-100);border-radius:var(--wpp-border-radius-m)}.code-block:hover .code-block-copy-icon{opacity:1}.code-block .code-lang{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:8px 8px 4px;color:var(--wpp-grey-color-600)}.code-block code{padding:8px}.code-block-copy-icon{cursor:pointer;opacity:0;-webkit-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.code-block-copy-icon:hover{--wpp-prop-icon-color:var(--wpp-grey-color-800) !important}.action-toolbar{display:-ms-flexbox;display:flex;gap:4px}.actions{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-align:center;align-items:center;margin-top:10px}.actions .sources-action,.actions .token-count{margin-left:auto}.token-count{--wpp-action-button-secondary-icon-color:var(--wpp-grey-color-600);-ms-flex:0 0 auto;flex:0 0 auto}.sr-only{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}.chat-list{padding:0 0 0 16px;margin:0 0 0 16px}.chat-list.chat-list-nonordered,.chat-list .chat-list-nonordered{list-style-type:disc}.chat-list.chat-list-ordered,.chat-list .chat-list-ordered{list-style-type:decimal}.chat-list.chat-list-task{padding:0;margin:0;list-style-type:none}.chat-list .chat-list-item{display:list-item;margin:0}.chat-list .chat-list-item::marker{font-size:var(--wpp-typography-s-body-font-size);line-height:var(--wpp-typography-s-body-line-height)}.chat-list .chat-list-item .wpp-typography{display:block}.chat-list .chat-list-item .chat-list{display:block}.chat-list .chat-list-item-task{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.chat-list .chat-list-item-task .chat-list{margin-left:8px}.chat-list .chat-list-item-task:not(.chat-list-item-task-checked){text-decoration:line-through}.chat-list .chat-list-item-task:not(.chat-list-item-task-checked) .wpp-icon-tick{display:inline-block;text-decoration:none}.chat-link{font-size:var(--wpp-typography-s-body-font-size);line-height:var(--wpp-typography-s-body-line-height);color:var(--wpp-primary-color-500);-webkit-transition:color 0.2s ease-in-out;transition:color 0.2s ease-in-out}.chat-link:hover{color:var(--wpp-primary-color-400)}.chat-link:active{color:var(--wpp-primary-color-600)}.chat-table{width:100%;border-collapse:collapse;border-spacing:0}.chat-table th,.chat-table td{padding:13px 16px;text-align:left;border-bottom:1px solid var(--wpp-grey-color-300)}.chat-quote{padding-left:16px;margin-left:0;border-left:3px solid var(--wpp-grey-color-300)}.chat-image-single{position:relative;width:100%}.chat-image-single img{display:block;width:100%;height:auto;-o-object-fit:cover;object-fit:cover}.chat-image-full{display:block;width:100%;height:auto;-o-object-fit:cover;object-fit:cover;border:1px solid var(--wpp-grey-color-000);border-radius:var(--wpp-border-radius-xs)}.chat-image-grid{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:12px;width:100%}.chat-image-grid-first{position:relative;width:100%}.chat-image-grid-row{display:-ms-flexbox;display:flex;gap:12px;-ms-flex-align:start;align-items:flex-start;overflow:visible hidden;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.chat-image-grid-row::-webkit-scrollbar{width:4px;height:4px}.chat-image-grid-row::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.chat-image-grid-row .chat-image-grid-item{display:-ms-flexbox;display:flex;-ms-flex:0 0 calc(23% - 9px);flex:0 0 calc(23% - 9px);aspect-ratio:1/1;min-width:100px;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid var(--wpp-grey-color-000);border-radius:var(--wpp-border-radius-xs);position:relative}.chat-image-grid-row .chat-image-grid-item img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.image-download-button{--wpp-btns-action-color-fill:var(--wpp-grey-color-000);position:absolute;top:8px;right:8px;opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}.chat-image-grid-item:hover .image-download-button,.chat-image-single:hover .image-download-button,.chat-image-grid-first:hover .image-download-button{opacity:1}.wpp-icon-image{display:none;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.chat-image-broken{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:var(--wpp-grey-color-200)}.chat-image-broken .wpp-icon-image{display:block}.chat-image-broken .image-download-button{display:none}.chat-image-broken img{display:none}.attachments{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:8px;width:100%}.attachments .wpp-file-upload-item{-ms-flex:1 1 calc(50% - 4px);flex:1 1 calc(50% - 4px);min-width:224px;max-width:256px}@-webkit-keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}";

const WppChatConversationMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppMessageActionClick = index.createEvent(this, "wppMessageActionClick", 1);
    // Streaming state
    this.accumulatedText = '';
    this.committedLength = 0;
    this.rafHandle = null;
    // Handle of the timer that reverts the copy confirmation to the idle copy icon.
    this.copyResetHandle = null;
    this.handleActionClick = (action) => {
      const isToggle = Boolean(action.activeIcon || action.activeLabel);
      let isActive = this.isActionActive(action);
      if (isToggle && action.isActive === undefined && action.id) {
        isActive = !isActive;
        this.toggledActionIds = isActive
          ? [...this.toggledActionIds, action.id]
          : this.toggledActionIds.filter(id => id !== action.id);
      }
      // The detail carries the state the action ends in, not the one it started in.
      this.wppMessageActionClick.emit({
        action: isToggle ? { ...action, isActive } : action,
        content: this.finalContent ?? '',
      });
      action.onClick?.();
      if (action.id === 'copy') {
        this.copyMessageToClipboard();
      }
    };
    this.renderActionButton = (action) => {
      const isCopyConfirmed = action.id === 'copy' && this.isCopied;
      const isToggle = Boolean(action.activeIcon || action.activeLabel);
      const isActive = this.isActionActive(action);
      const icon = isCopyConfirmed ? 'wpp-icon-done' : (isActive && action.activeIcon) || action.icon;
      const label = isCopyConfirmed ? this._locales.copiedAction : (isActive && action.activeLabel) || action.label;
      if (!icon)
        return null;
      return (index.h("wpp-tooltip-v4-7-0", { key: action.id, text: label, config: { placement: 'bottom' } }, index.h("wpp-action-button-v4-7-0", { variant: "secondary", disabled: action.disabled, loading: action.loading,
        // The derived label and toggle state come first so a dev override wins, while the
        // config-only fields (icon, text, isActive, …) are never spread onto the element.
        ariaProps: { label, ...(isToggle ? { pressed: isActive } : {}), ...action.ariaProps }, onClick: () => this.handleActionClick(action) }, index.h(utils.transformToVersionedTag(icon), { slot: 'icon-start', part: 'icon' }))));
    };
    this.renderMenuContextListItems = () => (index.h(index.Fragment, null, this.menuContextListItems.map(item => {
      const { label, slots, ...rest } = item;
      return (index.h("wpp-list-item-v4-7-0", { ...rest, id: item.id !== undefined ? `${utils$1.LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined, role: "option" }, index.h("span", { slot: "label" }, label), slots && utils$1.renderSlotsInListItem(slots, Boolean(label)).map((slotNode) => slotNode)));
    })));
    this.hostCssClasses = () => ({
      'wpp-chat-conversation': true,
    });
    this.shouldRenderAvatar = (type) => {
      if (this.userAvatarConfig === false && type === 'user')
        return false;
      if (this.assistantAvatarConfig === false && type === 'assistant')
        return false;
      const config = type === 'user' ? this.userAvatarConfig : this.assistantAvatarConfig;
      return Object.keys(config).length > 0;
    };
    this.containerCssClasses = () => ({
      container: true,
      [`container-${this.resolvedRole}`]: true,
      'no-user-avatar': !this.shouldRenderAvatar('user'),
      'no-assistant-avatar': !this.shouldRenderAvatar('assistant'),
    });
    this.contentCssClasses = () => ({
      content: true,
      [`content-${this.resolvedRole}`]: true,
    });
    this.messageCssClasses = () => ({
      message: true,
      [`message-${this.resolvedRole}`]: true,
      [`message-${this.currentStatus}`]: true,
    });
    this.committedTokens = [] // parsed + rendered blocks
    ;
    this.liveText = '' // current in-progress raw text
    ;
    this.currentStatus = 'complete';
    this.finalContent = '';
    this.isCopied = false;
    this.toggledActionIds = [];
    this.resolvedRole = 'user';
    this.role = 'user';
    this.content = '';
    this.status = 'complete';
    this.actionButtonsConfig = undefined;
    this.menuContextListItems = undefined;
    this.sourcesActionConfig = undefined;
    this.tokenCount = undefined;
    this.tokenCountIcon = 'wpp-icon-premium';
    this.locales = undefined;
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
  onRoleChange(newValue) {
    if (newValue !== 'user' && newValue !== 'assistant')
      return;
    this.resolvedRole = newValue;
    // Re-park immediately rather than waiting for the next render: framework bindings write this
    // AFTER the component's last render (React does, on every re-render), so a render-time-only
    // fix leaves the invalid ARIA role on the host until something else forces a re-render.
    this.parkHostAriaRole();
  }
  componentWillLoad() {
    this.currentStatus = this.status;
    this.finalContent = this.content;
    this.onRoleChange(this.role);
  }
  // Deliberately NOT connectedCallback: parking the role there runs before the props hydrate, so
  // `this.role` is already 'group' by the time componentWillLoad reads it and the message role is
  // lost (it broke 38 specs). The remaining window is pre-first-paint, so nothing renders or is
  // scanned with the invalid role.
  componentDidRender() {
    this.parkHostAriaRole();
    this.observeHostAriaRole();
  }
  /**
   * `role` is a data prop carrying a MessageRole, but it shares its name with the global ARIA
   * attribute, so "user"/"assistant" would sit on the host as an invalid ARIA role (axe:
   * aria-roles, critical). Park a valid role there instead; `resolvedRole` keeps the real value.
   */
  parkHostAriaRole() {
    const current = this.host?.getAttribute('role');
    if (current === HOST_ARIA_ROLE)
      return;
    // Capture a message role written straight to the attribute before overwriting it, so an
    // attribute-only update still drives the layout.
    if (current === 'user' || current === 'assistant') {
      this.resolvedRole = current;
    }
    this.host?.setAttribute('role', HOST_ARIA_ROLE);
  }
  /**
   * Framework bindings re-assert `role` outside Stencil's prop lifecycle — React rewrites it on
   * every re-render — so the only reliable guard is observing the attribute itself.
   *
   * Why not the `@Watch('role')` alone: it was tried and measured. With the watcher as the sole
   * guard, hosts read `role="group"` on first paint but reverted to `role="user"`/`"assistant"`
   * after the very next React re-render (toggling any page state), because React's identical
   * re-write is not a change from Stencil's point of view once the prop already holds that value,
   * so the watcher never fires. With this observer, five consecutive forced re-renders and a raw
   * `setAttribute('role', 'assistant')` all held at `group`, and axe's aria-roles rule went from
   * 1 critical node per message to 0. mock-doc does not deliver MutationObserver records, so this
   * is verified in the browser rather than in a spec.
   *
   * Re-parking is idempotent: the guard in `parkHostAriaRole` makes the observer's own write a
   * no-op, so it cannot loop.
   */
  observeHostAriaRole() {
    if (this.roleObserver || typeof MutationObserver === 'undefined')
      return;
    this.roleObserver = new MutationObserver(() => this.parkHostAriaRole());
    this.roleObserver.observe(this.host, { attributes: true, attributeFilter: ['role'] });
  }
  disconnectedCallback() {
    this.clearCopyReset();
    this.roleObserver?.disconnect();
    this.roleObserver = undefined;
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
  }
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS$1, this.locales);
  }
  /**
   * The footer actions as rendered: the built-in defaults with any dev override merged on top.
   *
   * Overrides are matched by `id` so config order stops being load-bearing — a dev can retarget a
   * single action without restating the others. An override with no `id` falls back to the default
   * at the same index, which keeps pre-existing positional configs (handlers only, no icons) wired.
   * Anything left over is appended as an extra action and must bring its own icon.
   */
  get mergedActions() {
    const defaults = getDefaultActionButtons(this._locales);
    const overrides = this.actionButtonsConfig;
    if (!overrides?.length)
      return defaults;
    const merged = new Map(defaults.map(action => [action.id, { ...action }]));
    const extras = [];
    overrides.forEach((override, ndx) => {
      const targetId = override.id ?? defaults[ndx]?.id;
      if (targetId && merged.has(targetId)) {
        merged.set(targetId, { ...merged.get(targetId), ...override, id: targetId });
      }
      else {
        extras.push({ ...override });
      }
    });
    return [...merged.values(), ...extras];
  }
  /** Controlled `isActive` when the dev supplies one, otherwise the component's own toggle state. */
  isActionActive(action) {
    return action.isActive ?? (!!action.id && this.toggledActionIds.includes(action.id));
  }
  clearCopyReset() {
    if (this.copyResetHandle !== null) {
      clearTimeout(this.copyResetHandle);
      this.copyResetHandle = null;
    }
  }
  async copyMessageToClipboard() {
    const text = this.finalContent?.trim();
    if (!text || !navigator.clipboard?.writeText)
      return;
    try {
      await navigator.clipboard.writeText(text);
    }
    catch {
      // The clipboard can reject (denied permission, insecure context). Leave the button in its
      // idle state rather than confirming a copy that did not happen.
      return;
    }
    // Restart the window on a repeat click instead of stacking timers.
    this.clearCopyReset();
    this.isCopied = true;
    this.copyResetHandle = setTimeout(() => {
      this.isCopied = false;
      this.copyResetHandle = null;
    }, COPIED_CONFIRMATION_TIMEOUT);
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
    return (index.h("div", { class: "message-text" }, this.committedTokens.map((token) => renderToken(token, this.resolvedRole)), index.h("span", { class: "streaming-live" }, purify.sanitize(this.liveText), index.h("span", { class: "cursor", "aria-hidden": "true" }))));
  }
  renderComplete() {
    const tokens = getMarkdownTokens(this.finalContent);
    if (!Array.isArray(tokens)) {
      return (index.h("wpp-typography-v4-7-0", { type: "s-body", tag: "p" }, purify.sanitize(this.finalContent)));
    }
    return index.h("div", { class: "message-text" }, tokens.map((token) => renderToken(token, this.resolvedRole)));
  }
  renderAttachments() {
    if (!this.attachments || this.attachments.length === 0)
      return null;
    return (index.h("div", { class: "attachments", part: "attachments", role: "list" }, this.attachments.map((file, index$1) => (index.h("wpp-file-upload-item-v4-7-0", { key: index$1, variant: "chat", part: "file-item", role: "listitem", "aria-posinset": (index$1 + 1).toString(), "aria-setsize": this.attachments.length.toString(), file: {
        name: file.name,
        url: file.url,
        type: file.type,
        size: file.size || 0,
        deletable: false,
        ...file.fileItemProps,
      } })))));
  }
  hasTokenCount() {
    return typeof this.tokenCount === 'string' && this.tokenCount.trim().length > 0;
  }
  /**
   * The DS component file renders the token count as an Action Button instance (S-Strong text,
   * ghost hover, 6px radius), so it IS a wpp-action-button here — not a styled div — and it emits
   * the same event as the other footer actions so a consumer can hook usage details onto it. The
   * only deviation from the button's defaults is the grey-600 icon, set through the button's own
   * `--wpp-action-button-secondary-icon-color` hook in SCSS (an icon `color` prop loses to the
   * button's ::slotted rule).
   */
  renderTokenCount() {
    return (index.h("wpp-action-button-v4-7-0", { variant: "secondary", class: "token-count", part: "token-count", ariaProps: { label: `${this._locales.tokenCountLabel} ${this.tokenCount}` }, onClick: () => this.handleActionClick({ id: 'tokenCount', label: this._locales.tokenCountLabel }) }, index.h(utils.transformToVersionedTag(this.tokenCountIcon), { slot: 'icon-start' }), this.tokenCount));
  }
  hasTextContent() {
    return !!this.finalContent && this.finalContent.trim().length > 0;
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses() }, index.h("div", { class: this.containerCssClasses() }, this.shouldRenderAvatar('assistant') && (index.h("div", { class: "avatar-wrapper ai-avatar" }, this.resolvedRole === 'assistant' && (index.h("wpp-avatar-v4-7-0", { size: "s", icon: "wpp-icon-ai", role: "presentation", ...this.assistantAvatarConfig })))), index.h("div", { class: this.contentCssClasses() }, index.h("div", { class: this.messageCssClasses() }, this.currentStatus === 'streaming' && this.renderStreaming(), this.currentStatus === 'complete' && this.hasTextContent() && this.renderComplete(), index.h("slot", { part: "custom-content" }), this.currentStatus === 'complete' && !!this.attachments?.length && this.renderAttachments()), this.resolvedRole === 'assistant' && this.currentStatus === 'complete' && (index.h("div", { class: "actions" }, index.h("div", { class: "action-toolbar", part: "action-toolbar" }, this.mergedActions.map(this.renderActionButton), this.menuContextListItems && (index.h("wpp-menu-context-v4-7-0", null, index.h("wpp-action-button-v4-7-0", { variant: "secondary", slot: "trigger-element" }, index.h("wpp-icon-more-v4-7-0", { slot: "icon-start", direction: "horizontal" })), this.renderMenuContextListItems()))), this.hasTokenCount()
      ? this.renderTokenCount()
      : this.sourcesActionConfig && (index.h("div", { class: "sources-action" }, index.h("wpp-action-button-v4-7-0", { variant: "secondary", ariaProps: this.sourcesActionConfig.ariaProps, disabled: this.sourcesActionConfig.disabled, loading: this.sourcesActionConfig.loading, onClick: () => this.sourcesActionConfig.onClick?.() }, this.sourcesActionConfig.text))), index.h("span", { class: "sr-only", "aria-live": "polite" }, this.isCopied ? this._locales.copiedAction : '')))), this.shouldRenderAvatar('user') && (index.h("div", { class: "avatar-wrapper user-avatar" }, this.resolvedRole === 'user' && index.h("wpp-avatar-v4-7-0", { size: "s", role: "presentation", ...this.userAvatarConfig }))))));
  }
  static get registryIs() { return "wpp-chat-conversation-message-v4-7-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "status": ["onStatusChange"],
    "content": ["onContentChange"],
    "role": ["onRoleChange"]
  }; }
};
WppChatConversationMessage.style = wppChatConversationMessageCss;

const TOAST_DURATION = 5000;
const debounceWithControl = (callback, timeout) => {
  let timer;
  return {
    call: (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
        callback(...args);
      }, timeout);
    },
    cancel: () => {
      clearTimeout(timer);
      timer = undefined;
    },
    flush: (...args) => {
      clearTimeout(timer);
      timer = undefined;
      callback(...args);
    },
  };
};

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
    removeFile: (name) => `Remove file ${name}`,
    uploadProgress: (name) => `Processing ${name}`,
  },
};
const MAX_INPUT_AREA_HEIGHT = 240;
const MIN_TEXTAREA_HEIGHT = 52;
/**
 * How long the send/stop button takes to collapse out of the actions bar.
 * Should be kept in sync with `--chat-input-action-transition-duration` from the `scss` file.
 */
const PRIMARY_ACTION_TRANSITION_MS = 200;
/**
 * Reserved `ChatInputAction.id` that auto-wires an actions-menu entry to the
 * same file picker used by `enableAttach`. Consumers can still listen for the
 * `wppActionsMenuItemClick` event on top of the built-in behavior.
 */
const UPLOAD_ACTION_ID = 'upload';
const UPLOAD_ICON = 'wpp-icon-attach';
/**
 * Sits between the model name and the selected reasoning level in the selector trigger
 * (`Gemini 3.5 Flash\u30FBHigh`). This is U+30FB KATAKANA MIDDLE DOT, taken verbatim from the
 * Figma text node — it carries its own wide side bearings, which is why the design shows visual
 * gaps without any space characters. Do NOT "fix" it to a bullet plus spaces; that reads the
 * same but is not what the design specifies.
 *
 * Not a locale string: it is punctuation, and the same glyph is used in every language.
 */
const MODEL_REASONING_SEPARATOR = '\u30FB';
/**
 * Levels used when a model is selected and the user has not chosen one for it yet:
 * "Reasoning: Auto, with fallback to Medium. Verbosity: Medium." (Mustafa, 23 Sep 2026).
 *
 * Matched against the ids the consumer supplies in `reasoningOptions` / `verbosityOptions`,
 * first hit wins. A model offering none of these ids gets no default rather than an arbitrary
 * guess, so nothing is pre-selected. These literals are the platform's `ReasoningLevel` /
 * `LlmOutputVerbosity` enum values — the only place the component assumes anything about an
 * option's meaning.
 */
const DEFAULT_REASONING_IDS = ['auto', 'medium'];
const DEFAULT_VERBOSITY_IDS = ['medium'];
/**
 * Geometry for a level submenu, which the design bottom-aligns with the model menu rather than
 * with the row that opens it.
 *
 * Popper's skidding offset moves the popup along the trigger's cross axis, so for a `right-end`
 * placement the submenu's bottom lands `skidding` pixels below the trigger row's bottom. Both
 * popups carry 8px of their own padding, so a skidding equal to the gap between the row and the
 * menu's bottom edge puts the last level in line with the menu's last row. `*_FALLBACK_SKIDDING`
 * is that gap when the menu is not a popup at all and there is nothing to measure against.
 */
const MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING = 8;
const MODEL_OPTIONS_SUBMENU_DISTANCE = 9;
const LOCALES_DEFAULTS = {
  placeholder: 'Type your message...',
  minimizedDescription: 'Expand message input',
  actionsToolbarLabel: 'Message actions',
  leftActionsGroupLabel: 'Attachments and tools',
  rightActionsGroupLabel: 'Send and character counter',
  sendLabel: 'Send message',
  stopLabel: 'Stop response',
  attachLabel: 'Attach file',
  voiceLabel: 'Record voice message',
  attachmentsLabel: 'Attachments',
  messageInputLabel: 'Message input',
  actionsMenuLabel: 'More actions',
  audioRecordButtonLabel: 'Start audio recording',
  audioStopRecordButtonLabel: 'Stop audio recording',
  audioLanguage: 'en-US',
  // Specific to AI model selector
  modelSelectorBtnLabel: 'Select AI model',
  modelAutoOptionLabel: 'Auto',
  modelAutoOptionCaption: 'Picks the right model per task',
  modelPremiumOptionLabel: 'Premium',
  modelPremiumOptionCaption: 'Favours high-end, efficient models',
  modelSelectorListItemLabel: 'Select model or agent',
  modelReasoningLabel: 'Reasoning',
  modelVerbosityLabel: 'Verbosity',
};
const getDefaultModelOptions = (locales) => [
  {
    id: 'auto',
    label: locales.modelAutoOptionLabel,
    caption: locales.modelAutoOptionCaption,
    logo: 'https://public-assets.os.wpp.com/images/social-media-and-companies-auto.svg',
  },
  {
    id: 'premium',
    label: locales.modelPremiumOptionLabel,
    caption: locales.modelPremiumOptionCaption,
    logo: 'https://public-assets.os.wpp.com/images/social-media-and-companies-premium.svg',
  },
];

const wppChatInputCss = "@charset \"UTF-8\";:host{--chat-input-container-min-width:var(--wpp-chat-input-container-min-width, 351px);--chat-input-container-bg-color:var(--wpp-chat-input-container-bg-color, var(--wpp-grey-color-000));--chat-input-container-border-width:var(--wpp-chat-input-container-border-width, 1px);--chat-input-container-loading-border-width:var(--wpp-chat-input-container-loading-border-width, 2px);--chat-input-container-border-color-active:var(\n    --wpp-chat-input-container-border-color-active,\n    var(--wpp-primary-color-500)\n  );--chat-input-container-border-radius:var(--wpp-chat-input-container-border-radius, var(--wpp-border-radius-m));--chat-input-area-min-height:var(--wpp-chat-input-area-min-height, 52px);--chat-input-area-max-height:var(--wpp-chat-input-area-max-height, 240px);--chat-input-area-padding:var(\n    --wpp-chat-input-area-padding,\n    calc(16px - var(--chat-input-container-border-width)) 16px 4px 16px\n  );--chat-input-area-placeholder-color:var(--wpp-chat-input-area-placeholder-color, var(--wpp-grey-color-700));--chat-text-input-min-height:var(--wpp-chat-text-input-min-height, 52px);--chat-text-input-padding:var(--wpp-chat-text-input-padding, 0);--chat-text-input-bg-color:var(--wpp-chat-text-input-bg-color, transparent);--chat-text-input-placeholder-color:var(--wpp-chat-text-input-placeholder-color, var(--wpp-grey-color-700));--chat-actions-bar-padding:var(\n    --wpp-chat-actions-bar-padding,\n    12px 16px calc(16px - var(--chat-input-container-border-width)) 12px\n  );--chat-s-size-actions-bar-padding:var(\n    --wpp-chat-s-size-actions-bar-padding,\n    8px 16px calc(8px - var(--chat-input-container-border-width)) 12px\n  );--chat-actions-bar-color:var(--wpp-chat-actions-bar-color, var(--wpp-grey-color-1000));--chat-actions-bar-color-disabled:var(--wpp-chat-actions-bar-color-disabled, var(--wpp-grey-color-400));--chat-actions-bar-char-counter-color:var(--wpp-chat-actions-bar-char-counter-color, var(--wpp-danger-color-500));--chat-actions-bar-char-counter-color-disabled:var(\n    --wpp-chat-actions-bar-char-counter-color-disabled,\n    var(--wpp-danger-color-300)\n  );--chat-text-input-minimized-width:var(--wpp-chat-text-input-minimized-width, 203px);--chat-text-input-minimized-height:var(--wpp-chat-text-input-minimized-height, 22px);--chat-text-input-minimized-padding:var(\n    --wpp-chat-text-input-minimized-padding,\n    calc(8px - var(--chat-input-container-border-width)) 16px calc(8px - var(--chat-input-container-border-width)) 12px\n  );--chat-input-transition-timing:0.3s cubic-bezier(0.4, 0, 0.2, 1);--chat-input-action-transition-duration:200ms;--chat-minimized-focus-ring-color:var(--wpp-focus-ring-color, var(--wpp-primary-color-600));--chat-minimized-focus-ring-width:var(--wpp-focus-ring-width, var(--wpp-border-width-m));--chat-minimized-focus-ring-radius:var(--wpp-chat-input-container-border-radius, var(--wpp-border-radius-m));--chat-minimized-first-border-color-focus:var(\n    --wpp-chat-minimized-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--chat-minimized-second-border-color-focus:var(\n    --wpp-chat-minimized-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--chat-minimized-border-radius-focus:var(--wpp-chat-minimized-border-radius-focus, var(--wpp-border-radius-xs));display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;-ms-flex-align:center;align-items:center;width:100%;isolation:isolate}.chat-input-container{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--chat-input-container-bg-color);border-radius:var(--chat-input-container-border-radius);border:var(--chat-input-container-border-width) solid transparent;min-width:var(--chat-input-container-min-width);width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--wpp-box-shadow-s);box-shadow:var(--wpp-box-shadow-s);-webkit-transition:width var(--chat-input-transition-timing), height var(--chat-input-transition-timing);transition:width var(--chat-input-transition-timing), height var(--chat-input-transition-timing);will-change:width, height;cursor:text}.chat-input-container.is-focused{border-color:var(--chat-input-container-border-color-active)}.chat-input-container.is-loading::before{content:\"\";position:absolute;z-index:-1;inset:calc(-1 * (var(--chat-input-container-border-width) + var(--chat-input-container-loading-border-width) + 13px));pointer-events:none;background:conic-gradient(from var(--wpp-loading-halo-angle), transparent 0%, color-mix(in srgb, var(--wpp-loading-halo-glow-color, var(--wpp-dataviz-color-seq-brand-400)) 65%, transparent) 16%, transparent 40%);-webkit-filter:blur(10px);filter:blur(10px);-webkit-animation:wpp-loading-halo-rotate 2s linear infinite;animation:wpp-loading-halo-rotate 2s linear infinite;border-radius:calc(var(--chat-input-container-border-radius) + var(--chat-input-container-loading-border-width) + 6px)}.chat-input-container.is-loading::after{content:\"\";position:absolute;z-index:-1;inset:calc(-1 * (var(--chat-input-container-border-width) + var(--chat-input-container-loading-border-width)));pointer-events:none;background:conic-gradient(from var(--wpp-loading-halo-angle), transparent 0%, var(--wpp-loading-halo-highlight-color, var(--wpp-dataviz-color-seq-brand-600)) 12%, var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900)) 30%, transparent 46%);-webkit-animation:wpp-loading-halo-rotate 2s linear infinite;animation:wpp-loading-halo-rotate 2s linear infinite;border-radius:calc(var(--chat-input-container-border-radius) + var(--chat-input-container-loading-border-width))}@media (prefers-reduced-motion: reduce){.chat-input-container.is-loading::before{display:none}.chat-input-container.is-loading::after{-webkit-animation:none;animation:none;background:var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900))}}@-webkit-keyframes wpp-loading-halo-rotate{to{--wpp-loading-halo-angle:360deg}}@keyframes wpp-loading-halo-rotate{to{--wpp-loading-halo-angle:360deg}}.chat-input-container:not(.is-focused):hover{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.chat-input-container.disabled{pointer-events:none;cursor:not-allowed}.chat-input-container.has-alert{gap:0}.alert{-ms-flex-item-align:stretch;align-self:stretch;border-top-left-radius:var(--chat-input-container-border-radius);border-top-right-radius:var(--chat-input-container-border-radius);overflow:hidden}.alert[hidden]{display:none}.chat-file-upload-toast{position:absolute;top:8px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);cursor:pointer}.input-area{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-align:stretch;align-items:stretch;color:var(--wpp-grey-color-1000);min-height:var(--chat-input-area-min-height);max-height:var(--chat-input-area-max-height);overflow-y:hidden;-ms-flex:1;flex:1;padding:var(--chat-input-area-padding);gap:12px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:var(--wpp-border-radius-m) var(--wpp-border-radius-m) 0 0;-webkit-transition:height var(--chat-input-transition-timing);transition:height var(--chat-input-transition-timing);will-change:height;-webkit-transform-origin:bottom;transform-origin:bottom}.input-area .attachments{-ms-flex-order:3;order:3}.input-area .references{-ms-flex-order:2;order:2}.input-area .text-input{-ms-flex-order:1;order:1}.input-area:not(.minimized){scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.input-area::-webkit-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-moz-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area:-ms-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-ms-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-webkit-scrollbar{width:4px;height:4px}.input-area::-webkit-scrollbar-thumb{background-color:var(--wpp-grey-color-400);border-radius:var(--wpp-border-radius-xs);margin:6px}.input-area::-webkit-scrollbar-track{background:transparent}.input-area textarea{width:100%;min-height:var(--chat-text-input-min-height);resize:none;border:none;outline:none;padding:var(--chat-text-input-padding);font-family:inherit;font-weight:inherit;font-size:inherit;line-height:inherit;background-color:var(--chat-text-input-bg-color);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;-webkit-transition:min-height var(--chat-input-transition-timing);transition:min-height var(--chat-input-transition-timing);will-change:min-height;-webkit-transform-origin:bottom;transform-origin:bottom;margin:0}.input-area textarea::-webkit-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::-moz-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea:-ms-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::-ms-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea:hover,.input-area textarea:focus-within{color:var(--wpp-grey-color-1000)}.input-area textarea:active{color:var(--wpp-grey-color-1000)}.input-area textarea:disabled{cursor:not-allowed;color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-webkit-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-moz-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled:-ms-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-ms-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::placeholder{color:var(--wpp-grey-color-500)}.input-area.minimized{min-height:0;padding:var(--chat-text-input-minimized-padding)}.input-area.minimized .input-area-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:8px}.input-area.minimized .input-area-wrapper .actions-menu{--wpp-mc-wrapper-width:auto;display:-ms-flexbox;display:flex}.input-area.minimized .input-area-wrapper .sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;-webkit-clip-path:inset(50%) !important;clip-path:inset(50%) !important;border:0 !important;white-space:nowrap !important}.input-area.minimized .minimized-input{-ms-flex-align:center;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;min-width:var(--chat-text-input-minimized-width);outline:none}.input-area.minimized .minimized-input .input-value{width:100%}.input-area.minimized .minimized-input .input-value.disabled{color:var(--wpp-grey-color-500)}.input-area.minimized .minimized-input .input-value-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area.minimized .minimized-input .input-value-placeholder.disabled{color:var(--wpp-grey-color-500)}.actions-bar{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:end;align-items:flex-end;padding:var(--chat-actions-bar-padding);border-radius:0 0 var(--wpp-border-radius-m) var(--wpp-border-radius-m)}.actions-bar.size-s{padding:var(--chat-s-size-actions-bar-padding)}.actions-bar .left-actions{display:-ms-flexbox;display:flex;gap:8px;-ms-flex-align:center;align-items:center;}.actions-bar .left-actions .actions-menu{--wpp-mc-wrapper-width:auto;display:-ms-inline-flexbox;display:inline-flex;-ms-flex:0 0 auto;flex:0 0 auto;width:auto}.actions-bar .left-actions .select{display:-ms-flexbox;display:flex;width:100%;--wpp-action-button-padding:4px 6px;--wpp-action-button-icon-start-padding:8px;--wpp-action-button-icon-end-padding:6px;--wpp-action-button-icon-start-margin:8px;--wpp-action-button-icon-end-margin:8px;--wpp-action-button-bg-color-active:var(--wpp-grey-color-300);--wpp-action-button-opacity-active:1;}.actions-bar .left-actions .select ::slotted(.wpp-action-button:not(.with-icon-end)){--wpp-action-button-padding:4px 8px}.actions-bar .left-actions .wpp-action-button::part(button){color:var(--chat-actions-bar-color)}.actions-bar .left-actions.disabled .wpp-action-button::part(button){cursor:not-allowed;color:var(--chat-actions-bar-color-disabled)}.right-actions{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.right-actions .select{line-height:0}.right-actions .char-counter{color:var(--chat-actions-bar-char-counter-color)}.right-actions .wpp-action-button::part(button){color:var(--chat-actions-bar-color)}.right-actions.disabled .wpp-action-button::part(button){cursor:not-allowed;color:var(--chat-actions-bar-color-disabled)}.right-actions.disabled .char-counter{color:var(--chat-actions-bar-char-counter-color-disabled)}.play-btn{--button-padding-s:6px;margin-left:8px;max-width:32px;opacity:1;overflow:clip;overflow-clip-margin:8px;-webkit-transition:max-width var(--chat-input-action-transition-duration) ease, opacity var(--chat-input-action-transition-duration) ease, margin-left var(--chat-input-action-transition-duration) ease, -webkit-transform var(--chat-input-action-transition-duration) ease;transition:max-width var(--chat-input-action-transition-duration) ease, opacity var(--chat-input-action-transition-duration) ease, margin-left var(--chat-input-action-transition-duration) ease, -webkit-transform var(--chat-input-action-transition-duration) ease;transition:max-width var(--chat-input-action-transition-duration) ease, opacity var(--chat-input-action-transition-duration) ease, margin-left var(--chat-input-action-transition-duration) ease, transform var(--chat-input-action-transition-duration) ease;transition:max-width var(--chat-input-action-transition-duration) ease, opacity var(--chat-input-action-transition-duration) ease, margin-left var(--chat-input-action-transition-duration) ease, transform var(--chat-input-action-transition-duration) ease, -webkit-transform var(--chat-input-action-transition-duration) ease}.play-btn::part(icon-start-wrapper){margin:0}.play-btn.is-hidden{max-width:0;margin-left:0;opacity:0;-webkit-transform:scale(0.85);transform:scale(0.85);pointer-events:none}.model-selector{height:32px;margin-right:4px}.select-model-trigger.size-s:not(.is-chat-expanded){--wpp-list-item-padding:4px}.select-model-trigger.size-s:not(.is-chat-expanded)::part(left-wrapper){margin-right:0}.select-model-trigger.is-menu-opened{--li-bg-color:var(--wpp-grey-color-300);--wpp-icon-color:var(--wpp-grey-color-900)}.attachments{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;gap:8px;width:100%;-ms-flex:0 0 auto;flex:0 0 auto;overflow:auto hidden;scrollbar-width:thin;scrollbar-color:transparent transparent;-webkit-transition:scrollbar-color 0.3s ease-in-out;transition:scrollbar-color 0.3s ease-in-out}.attachments::-webkit-scrollbar{height:4px}.attachments::-webkit-scrollbar-thumb{background-color:transparent;border-radius:var(--wpp-border-radius-xs, 4px);-webkit-transition:background-color 0.3s ease-in-out;transition:background-color 0.3s ease-in-out}.attachments:hover,.attachments:focus-within{scrollbar-color:var(--wpp-grey-color-400) transparent}.attachments:hover::-webkit-scrollbar-thumb,.attachments:focus-within::-webkit-scrollbar-thumb{background-color:var(--wpp-grey-color-400)}.attachments .wpp-file-upload-item{--wpp-file-upload-item-chat-gap:0}.attachments .wpp-file-upload-item::part(file-item){margin-top:0}.attachments .wpp-file-upload-item::part(controls){-ms-flex-pack:end;justify-content:flex-end}.attachments .wpp-file-upload-item::part(thumbnail){margin-right:8px}.attachments .wpp-file-upload-item::part(cross-icon){margin-left:12px}.references{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:end;align-items:flex-end;gap:8px;width:100%;-ms-flex:0 0 auto;flex:0 0 auto}.references[hidden]{display:none}.input-area.minimized .minimized-input:focus-visible{border-radius:var(--chat-minimized-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--chat-minimized-first-border-color-focus), 0 0 0 3px var(--chat-minimized-second-border-color-focus);box-shadow:0 0 0 1px var(--chat-minimized-first-border-color-focus), 0 0 0 3px var(--chat-minimized-second-border-color-focus)}:host([data-wpp-theme=dark]) .chat-input-container{background-color:var(--wpp-grey-color-100)}";

const WppChatInput = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppSend = index.createEvent(this, "wppSend", 1);
    this.wppStop = index.createEvent(this, "wppStop", 1);
    this.wppMic = index.createEvent(this, "wppMic", 1);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFileUploadItemDelete = index.createEvent(this, "wppFileUploadItemDelete", 1);
    this.wppFileUploadItemClick = index.createEvent(this, "wppFileUploadItemClick", 1);
    this.wppMessageChanged = index.createEvent(this, "wppMessageChanged", 1);
    this.wppActionsMenuToggle = index.createEvent(this, "wppActionsMenuToggle", 1);
    this.wppActionsMenuItemClick = index.createEvent(this, "wppActionsMenuItemClick", 1);
    this.wppModelSelect = index.createEvent(this, "wppModelSelect", 1);
    this.wppModelBrowse = index.createEvent(this, "wppModelBrowse", 1);
    this.wppReasoningSelect = index.createEvent(this, "wppReasoningSelect", 1);
    this.wppVerbositySelect = index.createEvent(this, "wppVerbositySelect", 1);
    this.scrollTimeout = null;
    this.stopBtnHideTimeout = null;
    this.inputAreaId = `wpp-ci-area`;
    this.textareaAutoId = `wpp-ci-ta`;
    this.minimizedDescId = `wpp-ci-min-desc`;
    /**
     * The levels the user last chose for each model, so switching away from a model and back
     * restores their choice instead of resetting it (Mustafa, 23 Sep 2026).
     *
     * This is INSTANCE state, not a persisted session: it lives as long as this element does, so a
     * consumer that needs the selection to survive a remount or a page reload owns that itself and
     * feeds it back through `selectedReasoning` / `selectedVerbosity`.
     */
    this.modelOptionMemory = new Map();
    /** Which mount-time defaults `componentWillLoad` applied, for `componentDidLoad` to emit. */
    this.pendingModelOptionDefaults = { reasoningChanged: false, verbosityChanged: false };
    /** The two level submenus, by kind, so their popper offset can measure against the model menu. */
    this.modelOptionsSubmenuRefs = {};
    this.modelOptionsDropdownConfigs = {};
    this.recognition = new speechRecognition.SpeechRecognitionService();
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.aiModelBtn = null;
    this.reInitValue = (list) => {
      this.successAttachmentsList = list.filter(file => !this.isFileWithError(file));
      this.errorAttachmentsList = list.filter(this.isFileWithError);
    };
    this.checkInteractedItem = (event) => {
      const path = event.composedPath();
      if (!this.isFocused || !this.host || path.includes(this.host))
        return;
      // Dropdowns (the model selector, the actions menu) are portalled out of the host, so an
      // interaction inside one still belongs to this chat input. The whole composed path has to
      // be searched for the tippy wrapper: the event target is usually an element inside a
      // `wpp-list-item`'s shadow root, and walking `parentElement` up from there stops at the
      // shadow boundary long before it reaches the wrapper that carries the id — which is why an
      // `s`-size input collapsed whenever a model row was clicked anywhere but on its label text.
      const isInsideDropdown = path.some(node => node.id?.includes('tippy-'));
      if (!isInsideDropdown) {
        this.handleSimpleBlur();
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
        alert: '[slot="alert"]',
        references: '[slot="references"]',
      });
      this.hasSelectSlot = !emptyStates.select;
      this.hasAlertSlot = !emptyStates.alert;
      this.hasReferencesSlot = !emptyStates.references;
    };
    // A fresh alert appearing in the slot should always be shown, even if a
    // previous one was dismissed.
    this.handleAlertSlotChange = () => {
      this.updateSlotData();
      this.isAlertDismissed = false;
    };
    this.handleReferencesSlotChange = () => {
      this.updateSlotData();
      // References add height to the input area, so recompute whether it needs to
      // scroll once the slotted content has been laid out.
      requestAnimationFrame(() => this.adjustTextareaHeight(false));
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
      this.internalValue = inputValue;
      this.emitMessageChangedEvent(inputValue);
    };
    this.emitMessageChangedEvent = (inputValue) => {
      if (this.debounceEnabled && this.debouncedHandleInput) {
        this.debouncedHandleInput.call(inputValue);
      }
      else {
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
      const referencesElement = this.inputAreaRef.querySelector('.references');
      const referencesHeight = referencesElement && !referencesElement.hasAttribute('hidden') ? referencesElement.scrollHeight : 0;
      const referencesGap = referencesHeight ? parseFloat(getComputedStyle(this.inputAreaRef).rowGap) || 0 : 0;
      const messageText = value !== undefined ? value : this.textareaRef.value;
      const textAreaContentHeight = Math.max(this.calculateTextHeight(messageText), MIN_TEXTAREA_HEIGHT);
      const totalHeight = attachmentsHeight + referencesHeight + textAreaContentHeight + gap + referencesGap;
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
        files: updatedFilesList,
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
      if (file.size > utils$2.convertMBToBytes(this.mergedFileUploadConfig.size ?? 0)) {
        file.sizeError = true;
      }
      else {
        file.sizeError = false;
      }
      return file;
    };
    this.isAcceptConfigFilled = () => !!this.mergedFileUploadConfig.acceptConfig && Object.keys(this.mergedFileUploadConfig.acceptConfig).length > 0;
    this.getAcceptTokens = () => this.isAcceptConfigFilled() ? utils$2.getAcceptTokens(this.mergedFileUploadConfig.acceptConfig) : [];
    this.validateFileType = (file) => {
      if (!this.isAcceptConfigFilled()) {
        if (!file.type) {
          return utils$2.modifyPropertiesOnFile(file, { type: utils$2.inferTypeFromName(file.name) });
        }
        return file;
      }
      file.formatError = !utils$2.isFileAccepted(file, this.mergedFileUploadConfig.acceptConfig);
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
      const baseName = utils$2.getBaseName(fileName);
      const extension = utils$2.getExtension(fileName);
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
    this.onWindowFocus = () => {
      if (this.isFileDialogOpen) {
        this.clearDialogState();
      }
    };
    this.clearDialogState = () => {
      this.isFileDialogOpen = false;
    };
    this.handleOnFocus = () => {
      if (!this.isFocused) {
        this.addExpandedListeners();
      }
      this.isFocused = true;
    };
    this.handleClickAudioRecording = (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (!this.recognition.isSupported) {
        console.warn('SpeechRecognition API is not supported in this browser.');
        return;
      }
      this.isAudioRecording = !this.isAudioRecording;
      if (this.isAudioRecording) {
        this.wppMic.emit({ isRecording: true });
        this.recognition.startRecognition({
          baseText: this.internalValue,
          onTranscript: newOutput => {
            if (this.internalValue === newOutput)
              return;
            this.setInternalValue(newOutput);
            this.emitMessageChangedEvent(this.internalValue);
          },
          onStop: () => {
            this.isAudioRecording = false;
            this.wppMic.emit({ isRecording: false });
          },
        });
      }
      else {
        this.wppMic.emit({ isRecording: false });
        this.recognition.stopRecognition();
      }
    };
    this.shouldDisplaySend = () => this.disabled || this.errorAttachmentsList.length > 0
      ? false
      : !!this.internalValue.trim() || this.isGenerating || this.successAttachmentsList.length > 0;
    this.renderMicrophoneBtn = (recordButtonLabel) => (index.h("wpp-action-button-v4-7-0", { "data-testid": "wpp-micophone-btn", onClick: this.handleClickAudioRecording, variant: "secondary", ariaProps: { label: recordButtonLabel }, disabled: this.disabled }, this.isAudioRecording ? index.h("wpp-icon-stop-v4-7-0", { slot: "icon-start" }) : index.h("wpp-icon-mic-on-v4-7-0", { slot: "icon-start" })));
    this.renderActionsMenu = () => (index.h("wpp-menu-context-v4-7-0", { class: "actions-menu", part: "actions-menu", dropdownConfig: this.actionsMenuDropdownConfig }, index.h("wpp-action-button-v4-7-0", { slot: "trigger-element", class: "actions-menu-trigger", "data-testid": "actions-menu-trigger-button", variant: "secondary", disabled: this.disabled, ariaProps: {
        label: this.getActionsMenuButtonLabel(),
        expanded: this.ariaProps?.actionsMenuButton?.expanded ?? this.actionsMenuOpen,
        haspopup: 'menu',
      } }, index.h("wpp-icon-plus-v4-7-0", { slot: "icon-start" })), index.h("div", null, index.h("wpp-list-item-v4-7-0", { "data-testid": `actions-menu-item-${UPLOAD_ACTION_ID}`, disabled: this.disabled, onWppChangeListItem: () => this.handleActionsMenuItemClick({
        id: UPLOAD_ACTION_ID,
        icon: UPLOAD_ICON,
        label: this.getAttachButtonLabel(),
        disabled: this.disabled || this.isFileDialogOpen,
      }) }, index.h(utils.transformToVersionedTag(UPLOAD_ICON), { slot: 'left' }), index.h("span", { slot: "label" }, this.getAttachButtonLabel())), this.actions.map(action => (index.h("wpp-list-item-v4-7-0", { key: action.id, "data-testid": `actions-menu-item-${action.id}`, disabled: action.disabled || this.disabled, onWppChangeListItem: () => this.handleActionsMenuItemClick(action) }, index.h(utils.transformToVersionedTag(action.icon), { slot: 'left' }), index.h("span", { slot: "label" }, action.label)))))));
    this.getSelectedModel = () => {
      // `selectedModel` is transiently null between React removing the attribute and setting the
      // property (see `onSelectedModelChange`). Resolve that to the built-in default rather than
      // dereferencing it - both this method's own `models.find` and every caller assume a model.
      if (!this.selectedModel || this.selectedModel === 'auto') {
        return getDefaultModelOptions(this._locales)[0];
      }
      else if (this.selectedModel === 'premium') {
        return getDefaultModelOptions(this._locales)[1];
      }
      return this.models.length === 0
        ? this.selectedModel
        : this.models.find((model) => model.id === this.selectedModel.id) || getDefaultModelOptions(this._locales)[0];
    };
    this.handleModelMenuShow = () => {
      this.isModelMenuOpen = true;
    };
    this.handleModelMenuHide = () => {
      this.isModelMenuOpen = false;
    };
    this.handleModelSelect = (model) => {
      // Assigning `selectedModel` is what carries the levels over — `handleSelectedModelChange`
      // watches it, so picking from this dropdown and having the platform set the prop from a
      // side-modal take exactly the same path.
      if (model.id === 'auto') {
        this.selectedModel = 'auto';
      }
      else if (model.id === 'premium') {
        this.selectedModel = 'premium';
      }
      else {
        this.selectedModel = model;
      }
      this.wppModelSelect.emit(model);
    };
    this.handleModelChange = () => {
      this.wppModelBrowse.emit();
    };
    /**
     * The level to pre-select for a model the user has not chosen one for yet: the first of the
     * documented defaults the model actually offers, or nothing when it offers none of them.
     */
    this.resolveDefaultOptionId = (options, defaultIds) => defaultIds.find(defaultId => options.some(option => option.id === defaultId));
    /**
     * The remembered level for a model, but only if that model still offers it — a consumer can
     * change a model's option list between selections, and a remembered id that no longer exists
     * would leave the submenu with nothing checked.
     */
    this.getRememberedOptionId = (options, rememberedId) => options.find(option => option.id === rememberedId)?.id;
    /**
     * The levels that apply to a model: what the user last chose for it, else the defaults.
     */
    this.resolveModelOptions = (model) => {
      const remembered = this.modelOptionMemory.get(model.id);
      const reasoningOptions = model.reasoningOptions || [];
      const verbosityOptions = model.verbosityOptions || [];
      return {
        reasoning: this.getRememberedOptionId(reasoningOptions, remembered?.reasoning) ??
          this.resolveDefaultOptionId(reasoningOptions, DEFAULT_REASONING_IDS),
        verbosity: this.getRememberedOptionId(verbosityOptions, remembered?.verbosity) ??
          this.resolveDefaultOptionId(verbosityOptions, DEFAULT_VERBOSITY_IDS),
      };
    };
    /**
     * Fills in only the levels the consumer left unset for the model selected at mount. It must not
     * overwrite: a level passed alongside the model is the consumer seeding an explicit selection
     * (a restored session, say) and outranks any default.
     *
     * Returns which levels it filled, so `componentDidLoad` can emit exactly those — the write has
     * to happen before the first render to avoid a frame with nothing checked, but the events wait
     * until listeners are attached.
     */
    this.applyModelOptionDefaults = () => {
      const { reasoning, verbosity } = this.resolveModelOptions(this.getSelectedModel());
      const reasoningChanged = this.selectedReasoning === undefined && reasoning !== undefined;
      const verbosityChanged = this.selectedVerbosity === undefined && verbosity !== undefined;
      if (reasoningChanged)
        this.selectedReasoning = reasoning;
      if (verbosityChanged)
        this.selectedVerbosity = verbosity;
      return { reasoningChanged, verbosityChanged };
    };
    /**
     * The levels offered by whichever model is selected. `Auto` and `Premium` are built-in
     * presets that carry no per-LLM levels, so they resolve to an empty list and render no row.
     */
    this.getModelOptions = (kind) => this.getSelectedModel()[kind] || [];
    this.getSelectedModelOption = (kind, selectedId) => this.getModelOptions(kind).find(option => option.id === selectedId) || null;
    this.emitModelOptionsState = (emitter) => {
      emitter.emit({
        model: this.getSelectedModel(),
        reasoning: this.getSelectedModelOption('reasoningOptions', this.selectedReasoning),
        verbosity: this.getSelectedModelOption('verbosityOptions', this.selectedVerbosity),
      });
    };
    this.handleReasoningSelect = (option) => {
      if (this.selectedReasoning === option.id)
        return;
      this.selectedReasoning = option.id;
      this.emitModelOptionsState(this.wppReasoningSelect);
    };
    this.handleVerbositySelect = (option) => {
      if (this.selectedVerbosity === option.id)
        return;
      this.selectedVerbosity = option.id;
      this.emitModelOptionsState(this.wppVerbositySelect);
    };
    this.renderModelSelector = (size) => {
      const selectedModel = this.getSelectedModel();
      const isCustomModel = this.selectedModel !== 'auto' && this.selectedModel !== 'premium';
      const reasoningOptions = this.getModelOptions('reasoningOptions');
      const verbosityOptions = this.getModelOptions('verbosityOptions');
      const selectedReasoning = this.getSelectedModelOption('reasoningOptions', this.selectedReasoning);
      // The visible model and reasoning have to be part of the name, so speech users can say what they see (WCAG 2.5.3).
      const triggerLabel = [this._locales.modelSelectorBtnLabel, selectedModel.label, selectedReasoning?.label]
        .filter(Boolean)
        .join(' ');
      const triggerAvatar = (index.h("wpp-avatar-v4-7-0", { slot: "left", variant: "square", size: "xs", role: "presentation", src: selectedModel.logo, name: selectedModel.label }));
      return (index.h("wpp-menu-context-v4-7-0", { isBtnTrigger: true, class: "model-selector", dropdownConfig: { onShow: this.handleModelMenuShow, onHide: this.handleModelMenuHide, placement: 'top-start' } }, index.h("wpp-list-item-v4-7-0", { slot: "trigger-element", class: this.modelSelectorTriggerCssClasses(), role: "button", disabled: this.disabled, "aria-label": triggerLabel }, triggerAvatar, size === 'm' && (index.h(index.Fragment, null, index.h("span", { slot: "label" }, selectedModel.label, selectedReasoning && `${MODEL_REASONING_SEPARATOR}${selectedReasoning.label}`), index.h("wpp-icon-chevron-v4-7-0", { slot: "right", direction: this.isModelMenuOpen ? 'up' : 'down' })))), index.h("div", { class: "wpp-model-dropdown" }, getDefaultModelOptions(this._locales).map((model) => this.renderModelListItem(model, model.id === selectedModel.id)), index.h("wpp-divider-v4-7-0", null), this.models.length > 0
        ? this.models.map((model) => this.renderModelListItem(model, model.id === selectedModel.id))
        : // Nothing lists the selected model when the list is browsed externally, so
          // surface it here — otherwise the dropdown never shows what is in use.
          isCustomModel && this.renderModelListItem(selectedModel, true), reasoningOptions.length > 0 &&
        this.renderModelOptionsSubmenu('reasoning', this._locales.modelReasoningLabel, reasoningOptions, this.selectedReasoning, this.handleReasoningSelect), verbosityOptions.length > 0 &&
        this.renderModelOptionsSubmenu('verbosity', this._locales.modelVerbosityLabel, verbosityOptions, this.selectedVerbosity, this.handleVerbositySelect), this.models.length === 0 && (index.h(index.Fragment, null, isCustomModel && index.h("wpp-divider-v4-7-0", null), index.h("wpp-list-item-v4-7-0", { onWppChangeListItem: this.handleModelChange }, index.h("span", { slot: "label" }, this._locales.modelSelectorListItemLabel), index.h("wpp-icon-chevron-v4-7-0", { slot: "right", direction: "right" })))))));
    };
    this.renderModelListItem = (model, checked) => (index.h("wpp-list-item-v4-7-0", { key: model.id, checked: checked, role: "menuitemradio", "aria-checked": String(checked), onWppChangeListItem: () => this.handleModelSelect(model) }, index.h("wpp-avatar-v4-7-0", { role: "presentation", slot: "left", size: "xs", variant: "square", src: model.logo, name: model.label }), index.h("span", { slot: "label" }, model.label), model?.caption && (index.h("span", { slot: "caption" }, model.caption))));
    /**
     * How far the submenu has to slide past its own row to sit flush with the bottom of the model
     * menu. Measured when popper asks rather than hard-coded, because it depends on which row opened
     * the submenu — Reasoning sits one row higher than Verbosity.
     */
    this.getModelOptionsSubmenuSkidding = (kind) => {
      const submenu = this.modelOptionsSubmenuRefs[kind];
      const menuRoot = submenu?.closest('[data-tippy-root]');
      if (!submenu || !menuRoot)
        return MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING;
      return menuRoot.getBoundingClientRect().bottom - submenu.getBoundingClientRect().bottom;
    };
    /**
     * Built once per kind and cached, because `wpp-menu-context` diffs `dropdownConfig` by value and
     * a fresh `offset` closure on every render would read as a change and re-apply the tippy props.
     */
    this.getModelOptionsDropdownConfig = (kind) => {
      const config = this.modelOptionsDropdownConfigs[kind] ?? {
        placement: 'right-end',
        offset: () => [this.getModelOptionsSubmenuSkidding(kind), MODEL_OPTIONS_SUBMENU_DISTANCE],
        popperOptions: {
          modifiers: [{ name: 'flip', options: { fallbackPlacements: ['right-start', 'left-end', 'left-start'] } }],
        },
      };
      this.modelOptionsDropdownConfigs[kind] = config;
      return config;
    };
    /**
     * One row in the model dropdown that opens a submenu of levels. `wpp-menu-context` treats
     * itself as nested when its first child is a `wpp-list-item`, which gives the submenu the
     * APG behaviour for free: right-side placement, ArrowRight/ArrowLeft, Escape and roving.
     *
     * The nested default top-aligns the submenu with its row (`right-start`), which sends a long
     * list of levels spilling below the model menu. The design aligns it with the bottom of the
     * model menu instead, so the placement is flipped to `right-end` and the skidding offset closes
     * the gap between the row and the menu's bottom edge. A list too tall to sit there without
     * leaving the viewport falls back to `right-start` before it is allowed to jump to the other
     * side, so the fallbacks are spelled out rather than left to the nested default.
     */
    this.renderModelOptionsSubmenu = (kind, label, options, selectedId, onSelect) => (index.h("wpp-menu-context-v4-7-0", { class: "model-options-menu", ref: element => (this.modelOptionsSubmenuRefs[kind] = element), dropdownConfig: this.getModelOptionsDropdownConfig(kind) }, index.h("wpp-list-item-v4-7-0", { slot: "trigger-element", isExtended: true }, index.h("span", { slot: "label" }, label)), index.h("div", { class: "wpp-model-options-dropdown" }, options.map((option) => (index.h("wpp-list-item-v4-7-0", { key: option.id, checked: option.id === selectedId, labelTypography: { type: 's-midi' }, role: "menuitemradio", "aria-checked": String(option.id === selectedId), onWppChangeListItem: () => onSelect(option) }, index.h("span", { slot: "label" }, option.label), option.caption && index.h("span", { slot: "caption" }, option.caption)))))));
    this.clearStopBtnHideTimeout = () => {
      if (!this.stopBtnHideTimeout)
        return;
      clearTimeout(this.stopBtnHideTimeout);
      this.stopBtnHideTimeout = null;
    };
    this.handleSendClick = (event) => {
      event.stopPropagation();
      this.handleSend();
    };
    this.handleStopBtnClick = (event) => {
      event.stopPropagation();
      this.handleStop();
      this.isStopBtnHiding = true;
      this.clearStopBtnHideTimeout();
      this.stopBtnHideTimeout = setTimeout(() => {
        this.stopBtnHideTimeout = null;
        this.isStopBtnHiding = false;
      }, PRIMARY_ACTION_TRANSITION_MS);
    };
    /**
     * The stop button is still on screen while it animates out, but it is no longer actionable —
     * `is-hidden` and `inert` must be driven by the same condition so it never becomes an invisible
     * focus target.
     */
    this.isPrimaryActionInteractive = () => this.shouldDisplaySend() && !this.isStopBtnHiding;
    this.renderSendStopBtn = () => {
      const interactive = this.isPrimaryActionInteractive();
      // While hidden the button stays in the DOM (to animate the collapse), but must leave the
      // focus order and a11y tree so its focusable inner control does not trip axe's aria-hidden-focus.
      const inertProps = interactive ? {} : { inert: true };
      return this.isGenerating || this.isStopBtnHiding ? (index.h("wpp-action-button-v4-7-0", { class: { 'play-btn': true, 'is-hidden': !interactive }, "data-testid": "stop-icon-only-button", onClick: this.handleStopBtnClick, ariaProps: { label: this.getStopButtonLabel() }, ...inertProps }, index.h("wpp-icon-stop-v4-7-0", { slot: "icon-start" }))) : (index.h("wpp-button-v4-7-0", { class: { 'play-btn': true, 'is-hidden': !interactive }, "data-testid": "send-icon-only-button", size: "s", onClick: this.handleSendClick, ariaProps: { label: this.getSendButtonLabel() }, ...inertProps }, index.h("wpp-icon-arrow-v4-7-0", { direction: "up", slot: "icon-start" })));
    };
    this.modelSelectorTriggerCssClasses = () => ({
      'select-model-trigger': true,
      [`size-${this.size}`]: true,
      'is-menu-opened': this.isModelMenuOpen,
      'is-chat-expanded': this.size === 's' && this.isChatInputExpanded,
    });
    this.hostCssClasses = () => ({
      'wpp-chat-input': true,
    });
    this.chatToastClasses = () => ({
      'chat-file-upload-toast': true,
    });
    this.chatInputContainerClasses = () => ({
      'chat-input-container': true,
      'is-focused': this.isFocused,
      'is-loading': this.isGenerating,
      'has-alert': this.hasAlertSlot && !this.isAlertDismissed,
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
      [`size-${this.size}`]: true,
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
    this.isGenerating = false;
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
        removeFile: (name) => `Remove file ${name}`,
        uploadProgress: (name) => `Processing ${name}`,
      },
    };
    this.charactersLimit = undefined;
    this.attachments = [];
    this.withSelect = false;
    this.models = [];
    this.selectedModel = 'auto';
    this.selectedReasoning = undefined;
    this.selectedVerbosity = undefined;
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
    this.hasAlertSlot = false;
    this.isAlertDismissed = false;
    this.hasReferencesSlot = false;
    this.isChatInputExpanded = false;
    this.minimizedPressed = false;
    this.isFileDialogOpen = false;
    this.internalValue = '';
    this.actionsMenuOpen = false;
    this.isFocused = false;
    this.isAudioRecording = false;
    this.isModelMenuOpen = false;
    this.isStopBtnHiding = false;
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
      this.setInternalValue(value);
      this.adjustTextareaHeight(false, value);
    }
  }
  componentWillLoad() {
    if (!this.textValue?.trim() && this.textValue !== this.internalValue) {
      this.internalValue = this.textValue;
    }
    this.aiModelBtn = this.host.querySelector('[slot="select"] > [slot="trigger-element"]');
    this.aiModelBtn?.addEventListener('focus', this.handleOnFocus);
    this.debouncedHandleInput = debounceWithControl((value) => {
      this.wppMessageChanged.emit({ value });
    }, this.debounceDelay);
    const list = [...this.attachments, ...(this.successAttachmentsList || []), ...(this.errorAttachmentsList || [])];
    this.reInitValue(list);
    // Before the first render, so the submenus never paint with nothing checked.
    this.lastResolvedModelId = this.getSelectedModel()?.id;
    this.pendingModelOptionDefaults = this.applyModelOptionDefaults();
  }
  componentDidLoad() {
    this.recognition.setupRecognition(this._locales.audioLanguage);
    // Emitted here rather than in `componentWillLoad` so a consumer's listeners are attached. A
    // default the component picked has to reach the consumer, or its next render pushes the
    // unset value straight back over it.
    if (this.pendingModelOptionDefaults.reasoningChanged)
      this.emitModelOptionsState(this.wppReasoningSelect);
    if (this.pendingModelOptionDefaults.verbosityChanged)
      this.emitModelOptionsState(this.wppVerbositySelect);
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
    document.addEventListener('mousedown', this.checkInteractedItem, { capture: true, signal });
    document.addEventListener('focusin', this.checkInteractedItem, { capture: true, signal });
  }
  removeExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = undefined;
  }
  connectedCallback() {
    // This is needed so the animation from "Processing" state works as expected (this component uses shadow DOM).
    loadingHalo.registerLoadingHaloAngle();
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.disconnectObserver();
    this.themeSubscription.stop();
    this.recognition.stopRecognition();
    this.clearStopBtnHideTimeout();
    this.debouncedHandleInput?.cancel();
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = null;
    }
    if (this.resizeObserver && this.inputAreaRef) {
      this.resizeObserver.unobserve(this.inputAreaRef);
    }
    this.removeExpandedListeners();
    window.removeEventListener('focus', this.onWindowFocus, true);
    this.aiModelBtn?.removeEventListener('focus', this.handleOnFocus);
  }
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  /**
   * Carries the reasoning/verbosity levels across a model change, whichever way the model was
   * changed — picked from this dropdown, or set by the platform after its own side-modal flow.
   *
   * The user's choice is remembered per model for the lifetime of this element and restored when
   * they come back to it; a model they have not chosen a level for yet takes the documented
   * defaults. It deliberately does NOT reset (Mustafa, 23 Sep 2026 — resetting was the earlier
   * behaviour and read as a worse experience).
   *
   * It EMITS whatever it applies, which is the part that is easy to get wrong: these are
   * controlled props, so a component that silently rewrote them would be overwritten again by the
   * next render of a consumer holding its own state. Emitting keeps the two in step. Only levels
   * that actually changed emit, so a model change that leaves a level alone stays quiet.
   */
  onSelectedModelChange(newValue) {
    // `selectedModel` takes either a string preset or a model object. Going from the string to an
    // object makes React remove the attribute, and Stencil's attributeChangedCallback assigns that
    // removal as `null` before the property set lands - so this watch sees a null it must ignore
    // rather than resolve. The real value arrives on the very next call.
    if (newValue === null || newValue === undefined)
      return;
    const previousModelId = this.lastResolvedModelId;
    const nextModelId = typeof newValue === 'string' ? newValue : newValue.id;
    if (previousModelId === nextModelId)
      return;
    if (previousModelId !== undefined) {
      this.modelOptionMemory.set(previousModelId, {
        reasoning: this.selectedReasoning,
        verbosity: this.selectedVerbosity,
      });
    }
    const { reasoning, verbosity } = this.resolveModelOptions(this.getSelectedModel());
    const reasoningChanged = reasoning !== this.selectedReasoning;
    const verbosityChanged = verbosity !== this.selectedVerbosity;
    this.selectedReasoning = reasoning;
    this.selectedVerbosity = verbosity;
    this.lastResolvedModelId = nextModelId;
    if (reasoningChanged)
      this.emitModelOptionsState(this.wppReasoningSelect);
    if (verbosityChanged)
      this.emitModelOptionsState(this.wppVerbositySelect);
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
    }
    this.removeExpandedListeners();
    this.isFocused = false;
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
      locales: {
        ...DEFAULT_FILE_UPLOAD_CONFIG.locales,
        ...this.fileUploadConfig?.locales,
      },
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
  getStopButtonLabel() {
    return this.ariaProps?.stopButton?.label ?? this._locales.stopLabel;
  }
  getAttachButtonLabel() {
    return this.ariaProps?.attachButton?.label ?? this._locales.attachLabel;
  }
  getActionsMenuButtonLabel() {
    return this.ariaProps?.actionsMenuButton?.label ?? this._locales.actionsMenuLabel;
  }
  getAudioRecordButtonLabel() {
    return this.ariaProps?.audioRecordButton?.label ?? this._locales.audioRecordButtonLabel;
  }
  getAudioStopRecordButtonLabel() {
    return this.ariaProps?.audioStopRecordButton?.label ?? this._locales.audioStopRecordButtonLabel;
  }
  checkAttachmentsVisibility() {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments');
    if (!attachmentsElement || !this.inputAreaRef) {
      this.areAttachmentsVisible = false;
      return;
    }
    // Attachments lay out horizontally, so they are fully visible only when the
    // row is not overflowing its horizontal scroll container.
    const { scrollWidth, clientWidth } = attachmentsElement;
    const horizontallyVisible = scrollWidth <= clientWidth + 1;
    // The input area is `column-reverse` with `overflow-y: hidden` and a fixed
    // max-height, so a tall textarea pushes the attachments row off the top
    // where it gets clipped out of view. Compare the row's box against the input
    // area's box to detect that vertical clipping, which a horizontal-only check
    // misses (e.g. long text + a single file that fits the row).
    const areaRect = this.inputAreaRef.getBoundingClientRect();
    const rowRect = attachmentsElement.getBoundingClientRect();
    const verticallyVisible = rowRect.top >= areaRect.top - 1 && rowRect.bottom <= areaRect.bottom + 1;
    this.areAttachmentsVisible = horizontallyVisible && verticallyVisible;
  }
  // The slotted alert lives in the light DOM, so its close event bubbles up to
  // the chat input. Hiding it here keeps the alert dismissal contained to the
  // alert area without disturbing the rest of the chat input. References share
  // the same close event, so we only react when the alert itself was dismissed.
  handleAlertClose(event) {
    const target = event.target;
    if (target?.getAttribute('slot') === 'alert') {
      this.isAlertDismissed = true;
    }
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
    // New files are appended to the end of each list, so the most recently added
    // file is the LAST element matching the selector. Target it so clicking the
    // toast reveals the file the user just added, not the oldest matching one.
    const matches = attachmentsElement.querySelectorAll(selector);
    const attachment = matches[matches.length - 1];
    if (attachment) {
      // Attachments scroll horizontally, so align along the inline axis while
      // using block: 'nearest' to avoid nudging the surrounding page vertically.
      attachment.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      return;
    }
    // Fallback: scroll back to the first attachment (start of the horizontal row).
    attachmentsElement.scrollTo({ left: 0, behavior: 'smooth' });
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
    if (this.debounceEnabled && this.textareaRef) {
      this.debouncedHandleInput.flush(this.textareaRef.value);
    }
    if (this.disabled ||
      this.isGenerating ||
      (!this.internalValue.trim() && !this.successAttachmentsList.length) ||
      this.errorAttachmentsList.length)
      return;
    this.isAudioRecording = false;
    this.recognition.stopRecognition();
    const reasoning = this.getSelectedModelOption('reasoningOptions', this.selectedReasoning);
    const verbosity = this.getSelectedModelOption('verbosityOptions', this.selectedVerbosity);
    this.wppSend.emit({
      message: this.internalValue.trim(),
      attachments: this.successAttachmentsList,
      model: this.getSelectedModel(),
      // Spread rather than assign `null`: a level the selected model does not offer is
      // absent from the payload, matching how `attachments` behaves.
      ...(reasoning ? { reasoning } : {}),
      ...(verbosity ? { verbosity } : {}),
    });
    this.setInternalValue('');
    Object.assign(this, {
      successAttachmentsList: [],
      errorAttachmentsList: [],
    });
    this.wppChange.emit({ value: [], hasError: false, errorFiles: [], files: [] });
    this.adjustTextareaHeight(true);
    if (this.size === 's') {
      // Collapse back to the minimized resting state. Use the blur routine so it
      // also clears `isFocused` (and tears down the expanded listeners); just
      // setting `isChatInputExpanded = false` would leave the active focus border
      // painted on the minimized input after sending.
      this.handleSimpleBlur();
    }
  }
  /**
   * Use this, not a plain assignment, whenever the new value doesn't come from the textarea itself (send, `textValue`, speech).
   * The re-render waits a frame and Stencil only writes the textarea when the value differs from the last render,
   * so a reset like typed "/mc" → '' before that frame leaves "/mc" on screen. `handleInput` reads the textarea and
   * `componentWillLoad` runs before it exists, so a plain assignment is fine there.
   */
  setInternalValue(value) {
    this.internalValue = value;
    if (this.textareaRef && this.textareaRef.value !== value)
      this.textareaRef.value = value;
  }
  handleStop() {
    if (this.disabled)
      return;
    this.wppStop.emit();
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
      ? utils$2.renameFile(file, this.generateUniqueName(file.name, existingAttachments))
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
      // Reassigned, as in wpp-file-upload: for an untyped file this returns a replacement carrying
      // the type resolved from its extension, and dropping it left the attachment untyped.
      file = this.validateFileType(file);
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
      files: this.attachments,
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
  render() {
    const allFiles = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    const isMaximizedS = this.isChatInputExpanded && this.size === 's';
    const maximizedSorSizeM = isMaximizedS || this.size === 'm';
    const isMinimizedS = this.size === 's' && !this.isChatInputExpanded;
    const placeholderText = this.getPlaceholderText();
    const recordButtonLabel = this.isAudioRecording
      ? this.getAudioStopRecordButtonLabel()
      : this.getAudioRecordButtonLabel();
    const ariaInvalid = this.ariaProps?.textarea?.invalid !== undefined ? this.ariaProps.textarea.invalid : undefined;
    return (index.h(index.Host, { class: this.hostCssClasses(), size: this.size, style: { zIndex: this.zIndex.toString() }, exportparts: "chat-input-container, alert, toast, input-area, attachments, references, text-input, actions-bar, left-actions, right-actions, file-item, actions-menu", onClick: isMinimizedS ? this.handleSizeToggle : this.handleClick, onFocus: this.handleOnFocus }, index.h("div", { class: this.chatInputContainerClasses(), onKeyDown: this.onExpandedKeyDown, part: "chat-input-container" }, index.h("div", { class: "alert", part: "alert", hidden: !this.hasAlertSlot || this.isAlertDismissed }, index.h("slot", { name: "alert", onSlotchange: this.handleAlertSlotChange })), this.showToast && (index.h("wpp-toast-v4-7-0", { message: this.toastMessage, type: this.toastType, duration: TOAST_DURATION, variant: "chat", part: "toast", class: this.chatToastClasses(), onClick: event => this.handleToastClick(event) })), index.h("div", { id: this.inputAreaId, class: this.inputAreaClasses(), ref: el => (this.inputAreaRef = el), part: "input-area" }, maximizedSorSizeM ? (index.h(index.Fragment, null, allFiles?.length > 0 && (index.h("div", { class: this.attachmentsWrapperClasses(), part: "attachments", role: "list", "aria-label": this._locales.attachmentsLabel }, allFiles.map((file, index$1) => (index.h("wpp-file-upload-item-v4-7-0", { key: index$1, file: file, variant: "chat", format: this.mergedFileUploadConfig.format, currentIndex: index$1, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, locales: {
        sizeError: this.mergedFileUploadConfig.locales.sizeError,
        formatError: this.mergedFileUploadConfig.locales.formatError,
        removeFile: this.mergedFileUploadConfig.locales.removeFile,
        uploadProgress: this.mergedFileUploadConfig.locales.uploadProgress,
      }, part: "file-item", class: this.isFileWithError(file) ? 'error' : '', onFileLoaded: this.handleFileLoaded, uploaded: !!file.uploaded, role: "listitem", "aria-posinset": (index$1 + 1).toString(), "aria-setsize": allFiles.length.toString() }))))), index.h("div", { class: "references", part: "references", hidden: !this.hasReferencesSlot }, index.h("slot", { name: "references", onSlotchange: this.handleReferencesSlotChange })), index.h("textarea", { id: (this.htmlAttributes?.textarea?.id ?? this.textareaId) || this.textareaAutoId, name: this.htmlAttributes?.textarea?.name ?? this.textareaName ?? 'message', class: this.textInputClasses(), placeholder: placeholderText, value: this.internalValue, ref: el => (this.textareaRef = el), onInput: this.handleInput, onPaste: this.handlePaste, disabled: this.disabled, onKeyDown: this.onKeyDown, part: "text-input", "aria-label": this.getTextareaLabel(), "aria-invalid": ariaInvalid, autocomplete: this.htmlAttributes?.textarea?.autocomplete, maxLength: this.htmlAttributes?.textarea?.maxLength, "data-gramm": "false", "data-gramm_editor": "false" }))) : (index.h("div", { class: this.inputAreaWrapperClasses() }, this.renderActionsMenu(), index.h("div", { class: this.minimizedInput(), part: "minimized-input", "data-pressed": this.minimizedPressed ? 'true' : null, role: "button", tabindex: this.disabled ? -1 : 0, "aria-expanded": this.isChatInputExpanded ? 'true' : 'false', "aria-controls": this.inputAreaId, "aria-label": this.getMinimizedAriaLabel(), "aria-describedby": this.minimizedDescId, onKeyDown: this.onMinimizedKeyDown, onKeyUp: this.onMinimizedKeyUp }, index.h("wpp-typography-v4-7-0", { class: this.inputValue(), type: "s-body" }, this.internalValue || placeholderText)), index.h("span", { id: this.minimizedDescId, class: "sr-only" }, this.getMinimizedDescriptionText()), index.h("div", { class: this.rightActionsClasses() }, !this.withSelect && this.renderModelSelector('s'), this.renderMicrophoneBtn(recordButtonLabel), this.renderSendStopBtn())))), maximizedSorSizeM && (index.h("div", { class: this.actionsBarClasses(), part: "actions-bar", role: "toolbar", "aria-label": this.getActionsToolbarLabel() }, index.h("div", { class: this.leftActionsClasses(), part: "left-actions", role: "group", "aria-label": this.getLeftActionsLabel() }, this.renderActionsMenu(), this.enableMic && (index.h("wpp-action-button-v4-7-0", { "data-testid": "mic-icon-only-button", variant: "secondary", disabled: this.disabled, ariaProps: { label: this._locales.voiceLabel } }, index.h("wpp-icon-mic-on-v4-7-0", { slot: "icon-start" })))), index.h("div", { class: this.rightActionsClasses(), part: "right-actions", role: "group", "aria-label": this.getRightActionsLabel() }, this.withSelect ? (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.selectClasses(), name: "select", onSlotchange: this.updateSlotData })) : (this.renderModelSelector('m')), this.renderMicrophoneBtn(recordButtonLabel), this.renderSendStopBtn()))), index.h("input", { class: "file-loader", type: "file", ref: inputRef => (this.inputRef = inputRef), style: { display: 'none' }, multiple: this.htmlAttributes?.attachmentsInput?.multiple ?? this.mergedFileUploadConfig.multiple, onChange: this.handleChange, accept: this.htmlAttributes?.attachmentsInput?.accept ?? this.getAcceptTokens().join(), title: "", id: this.htmlAttributes?.attachmentsInput?.id ?? 'wpp-ci-file', name: this.htmlAttributes?.attachmentsInput?.name ?? 'attachments', "aria-hidden": "true" }))));
  }
  static get registryIs() { return "wpp-chat-input-v4-7-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "attachments": ["onAttachmentsChange"],
    "textValue": ["onTextValueChange"],
    "selectedModel": ["onSelectedModelChange"],
    "size": ["onSizeChange"]
  }; }
};
WppChatInput.style = wppChatInputCss;

exports.wpp_chat_conversation_message = WppChatConversationMessage;
exports.wpp_chat_input = WppChatInput;
