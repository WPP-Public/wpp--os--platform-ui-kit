export { Z as Z_INDEX } from './consts-744c144f.js';
import { i as isObject, t as toKebabCase, r as recursiveObjectMap } from './utils-452958a4.js';
export { m as applyBodyStylesIfNeeded, a as areSetsEqual, n as autoFocusElement, l as closestElement, d as debounce, o as form2object, f as format, z as getAriaProps, p as getDurationValues, q as getHasFocused, w as getHighestContainerInDOM, j as getHighlightData, x as getOsBarOffsetHeight, g as getSlotEmptyStates, c as hasParentWithId, h as hasShadowDom, b as isEventTargetContained, i as isObject, A as isWppElement, y as mergeLocales, r as recursiveObjectMap, s as selectDropdownWidth, v as setHasFocused, t as toKebabCase, k as transformToVersionedTag, e as truncate, u as uuidv4 } from './utils-452958a4.js';
export { S as ScrollState } from './types-6eb465ab.js';
export { F as FullScreenModalCloseReason } from './types-b5cf2c7a.js';
export { I as InlineEditModeEnum } from './types-55e66228.js';
export { M as ModalCloseReason } from './types-9a70ac4e.js';
export { E as Editor, R as RICHTEXT_UPLOAD_REQUEST_EVENT, T as TIPTAP_UPLOAD_REQUEST_EVENT, d as debugLevels, f as formats, r as richtextUploadTypes, s as sources, a as tiptapFormats, b as tiptapSources, t as tiptapUploadTypes } from './index-6a313091.js';
export { S as SideModalCloseReason } from './types-945bd5da.js';
export { S as SidePanelCloseReason } from './types-bb202fab.js';

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
const WppAgGridThemeConfig = {
  wrapperBorder: false,
  headerRowBorder: false,
  rowBorder: { style: 'solid', width: 1, color: 'var(--wpp-grey-color-300)' },
  backgroundColor: 'var(--wpp-grey-color-000)',
  headerBackgroundColor: 'var(--wpp-grey-color-000)',
  headerColumnBorderHeight: 20,
  headerColumnBorder: { style: 'solid', width: 0, color: 'var(--wpp-grey-color-300)' },
  headerColumnResizeHandleColor: 'var(--wpp-grey-color-600)',
  headerColumnResizeHandleHeight: '100%',
  headerColumnResizeHandleWidth: 2,
  headerCellHoverBackgroundColor: 'var(--wpp-grey-color-200)',
  headerHeight: 47,
  rowHeight: 47,
  rowHoverColor: 'var(--wpp-grey-color-200)',
  oddRowBackgroundColor: 'var(--wpp-grey-color-000)',
  selectedRowBackgroundColor: 'var(--wpp-grey-color-200)',
  rangeSelectionBorderColor: 'transparent',
  cellHorizontalPadding: 16,
  fontFamily: 'var(--wpp-font-family)',
  fontSize: 13,
};

export { WppAgGridThemeConfig, createTheme, resolveTheme };
