import { i as isObject, t as toKebabCase, r as recursiveObjectMap } from './utils-f415b66e.js';
export { m as applyBodyStylesIfNeeded, a as areSetsEqual, n as autoFocusElement, l as closestElement, d as debounce, o as form2object, f as format, y as getAriaProps, p as getDurationValues, q as getHasFocused, w as getHighestContainerInDOM, j as getHighlightData, x as getOsBarOffsetHeight, g as getSlotEmptyStates, c as hasParentWithId, h as hasShadowDom, b as isEventTargetContained, i as isObject, z as isWppElement, r as recursiveObjectMap, s as selectDropdownWidth, v as setHasFocused, t as toKebabCase, k as transformToVersionedTag, e as truncate, u as uuidv4 } from './utils-f415b66e.js';
export { S as ScrollState } from './types-6eb465ab.js';
export { F as FullScreenModalCloseReason } from './types-b5cf2c7a.js';
export { I as InlineEditModeEnum } from './types-55e66228.js';
export { M as ModalCloseReason } from './types-9a70ac4e.js';
export { Q as Quill, U as RICHTEXT_UPLOAD_REQUEST_EVENT, d as debugLevels, f as formats, u as richtextUploadTypes, s as sources } from './types-112bed55.js';
export { S as SideModalCloseReason } from './types-945bd5da.js';
import './consts-9fc0a13a.js';
import './_commonjsHelpers-ba3f0406.js';

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
  const newKey = toKebabCase(firstPart + delimiter + secondPart);
  if (secondPart === 'fontFamily' || (firstPart === 'font' && secondPart === 'family')) {
    return {
      ...acc,
      [`${dsPrefix}-${newKey}`]: Array.isArray(value) ? value.filter(i => i).join(', ') : value,
    };
  }
  else if (!isObject(value)) {
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
    if (isObject(value)) {
      return {
        ...acc,
        ...loopProperty(value, category, acc),
      };
    }
    return { ...acc, [toKebabCase(category)]: value };
  }, {});
  return transformJsonValueToCss(transformColorVariableNames(flatTheme), json.content[variant]);
};
/**
 * Resolve theme object with color values
 */
const resolveTheme = (initJson, variant = 'light') => {
  const json = { ...initJson };
  return recursiveObjectMap(json, value => {
    if (typeof value === 'string' && value.startsWith('color.')) {
      return value.split('.').reduce((acc, currentProp) => acc[currentProp], json.content[variant]);
    }
    return value;
  });
};

export { createTheme, resolveTheme };
