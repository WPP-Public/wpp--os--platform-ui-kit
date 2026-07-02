import { isObject, recursiveObjectMap, toKebabCase } from './utils';
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
export const createTheme = (json, variant = 'light') => {
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
export const resolveTheme = (initJson, variant = 'light') => {
  const json = { ...initJson };
  return recursiveObjectMap(json, value => {
    if (typeof value === 'string' && value.startsWith('color.')) {
      return value.split('.').reduce((acc, currentProp) => acc[currentProp], json.content[variant]);
    }
    return value;
  });
};
export const WppAgGridThemeConfig = {
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
