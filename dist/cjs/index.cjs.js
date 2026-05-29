'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const consts = require('./consts-d8f5ef98.js');
const utils = require('./utils-2231f97a.js');
const types = require('./types-332b969c.js');
const types$1 = require('./types-05f8f988.js');
const types$2 = require('./types-7010056a.js');
const types$3 = require('./types-18fdc89e.js');
const index = require('./index-10e1072f.js');
const tiptapTypes = require('./tiptap-types-03d4d5ad.js');
const types$4 = require('./types-2185a602.js');
require('./_commonjsHelpers-bcc1208a.js');

const dsPrefix = '--wpp';
/**
 * Function to transform incorrect color variable names to correct: '--wpp-color-primary-500' -> '--wpp-primary-color-500'
 */
const transformColorVariableNames = (theme) => Object.entries(theme).reduce((acc, [key, value]) => {
  if (key.includes('color') && key.indexOf('color') === 6) {
    const splittedKeys = key.slice(2).split('-');
    const temp = splittedKeys[1];
    splittedKeys[1] = splittedKeys[2];
    splittedKeys[2] = temp;
    const transformedKey = `--${splittedKeys.join('-')}`;
    return {
      ...acc,
      [transformedKey]: value,
    };
  }
  acc[key] = value;
  return {
    ...acc,
    [key]: value,
  };
}, {});
/**
 * Function to transform Theme properties from 'color.primary.500' to '#FFF',
 */
const transformJsonValueToCss = (theme, json) => {
  const updatedCssTokens = {};
  // TODO: improve typings
  // eslint-disable-next-line array-callback-return
  Object.entries(theme).reduce((acc, [key, value]) => {
    if (value?.startsWith('color.')) {
      const parsedValue = value.split('.').reduce((acc, currentProp) => acc[currentProp], json);
      updatedCssTokens[key] = parsedValue;
    }
  });
  return { ...theme, ...updatedCssTokens };
};
/**
 * Recursive function to iterate through theme properties and convert them to '--wpp-css-variable'
 */
const loopProperty = (obj, key, res) => Object.entries(obj).reduce((acc, [prop, value]) => {
  // if we face property with 'default' name - we should not add it to the css variable. E.g.  'color.brand.default' -> 'color-brand'
  const firstPart = key !== 'components' ? key : '';
  const secondPart = prop !== 'default' ? prop : '';
  const delimiter = firstPart && secondPart ? '-' : '';
  const newKey = utils.toKebabCase(firstPart + delimiter + secondPart);
  if (secondPart === 'fontFamily' || (firstPart === 'font' && secondPart === 'family')) {
    return {
      ...acc,
      [`${dsPrefix}-${newKey}`]: Array.isArray(value) ? value.filter(i => i).join(', ') : value,
    };
  }
  else if (!utils.isObject(value)) {
    return {
      ...acc,
      [`${dsPrefix}-${newKey}`]: value,
    };
  }
  else {
    return loopProperty(value, newKey, acc);
  }
}, res);
/**
 * Creates flat theme object from theme object
 */
const createTheme = (json, variant = 'light') => {
  const flatTheme = Object.entries(json.content[variant]).reduce((acc, [category, value]) => {
    if (utils.isObject(value)) {
      return {
        ...acc,
        ...loopProperty(value, category, acc),
      };
    }
    return { ...acc, [utils.toKebabCase(category)]: value };
  }, {});
  return transformJsonValueToCss(transformColorVariableNames(flatTheme), json.content[variant]);
};
/**
 * Resolve theme object with color values
 */
const resolveTheme = (initJson, variant = 'light') => {
  const json = { ...initJson };
  return utils.recursiveObjectMap(json, value => {
    if (typeof value === 'string' && value.startsWith('color.')) {
      return value.split('.').reduce((acc, currentProp) => acc[currentProp], json.content[variant]);
    }
    return value;
  });
};

Object.defineProperty(exports, 'Z_INDEX', {
  enumerable: true,
  get: function () {
    return consts.Z_INDEX;
  }
});
exports.applyBodyStylesIfNeeded = utils.applyBodyStylesIfNeeded;
exports.areSetsEqual = utils.areSetsEqual;
exports.autoFocusElement = utils.autoFocusElement;
exports.closestElement = utils.closestElement;
exports.debounce = utils.debounce;
exports.form2object = utils.form2object;
exports.format = utils.format;
exports.getAriaProps = utils.getAriaProps;
exports.getDurationValues = utils.getDurationValues;
exports.getHasFocused = utils.getHasFocused;
exports.getHighestContainerInDOM = utils.getHighestContainerInDOM;
exports.getHighlightData = utils.getHighlightData;
exports.getOsBarOffsetHeight = utils.getOsBarOffsetHeight;
exports.getSlotEmptyStates = utils.getSlotEmptyStates;
exports.hasParentWithId = utils.hasParentWithId;
exports.hasShadowDom = utils.hasShadowDom;
exports.isEventTargetContained = utils.isEventTargetContained;
exports.isObject = utils.isObject;
exports.isWppElement = utils.isWppElement;
exports.recursiveObjectMap = utils.recursiveObjectMap;
exports.selectDropdownWidth = utils.selectDropdownWidth;
exports.setHasFocused = utils.setHasFocused;
exports.toKebabCase = utils.toKebabCase;
exports.transformToVersionedTag = utils.transformToVersionedTag;
exports.truncate = utils.truncate;
exports.uuidv4 = utils.uuidv4;
Object.defineProperty(exports, 'ScrollState', {
  enumerable: true,
  get: function () {
    return types.ScrollState;
  }
});
Object.defineProperty(exports, 'FullScreenModalCloseReason', {
  enumerable: true,
  get: function () {
    return types$1.FullScreenModalCloseReason;
  }
});
Object.defineProperty(exports, 'InlineEditModeEnum', {
  enumerable: true,
  get: function () {
    return types$2.InlineEditModeEnum;
  }
});
Object.defineProperty(exports, 'ModalCloseReason', {
  enumerable: true,
  get: function () {
    return types$3.ModalCloseReason;
  }
});
exports.Editor = index.Editor;
exports.Quill = index.Quill;
exports.RICHTEXT_UPLOAD_REQUEST_EVENT = index.UPLOAD_REQUEST_EVENT;
exports.debugLevels = index.debugLevels;
exports.formats = index.formats;
exports.richtextUploadTypes = index.uploadTypes;
exports.sources = index.sources;
exports.TIPTAP_UPLOAD_REQUEST_EVENT = tiptapTypes.TIPTAP_UPLOAD_REQUEST_EVENT;
exports.tiptapFormats = tiptapTypes.tiptapFormats;
exports.tiptapSources = tiptapTypes.tiptapSources;
exports.tiptapUploadTypes = tiptapTypes.tiptapUploadTypes;
Object.defineProperty(exports, 'SideModalCloseReason', {
  enumerable: true,
  get: function () {
    return types$4.SideModalCloseReason;
  }
});
exports.createTheme = createTheme;
exports.resolveTheme = resolveTheme;
