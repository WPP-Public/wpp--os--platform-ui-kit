import { FlatTheme, Theme, ThemeContent, ThemeStyles } from '../types/theme'
import { isObject, recursiveObjectMap, toKebabCase } from './utils'

const dsPrefix = '--wpp'

/**
 * Function to transform incorrect color variable names to correct: '--wpp-color-primary-500' -> '--wpp-primary-color-500'
 */
const transformColorVariableNames = (theme: FlatTheme) =>
  Object.entries(theme).reduce((acc: FlatTheme, [key, value]) => {
    if (key.includes('color') && key.indexOf('color') === 6) {
      const splittedKeys = key.slice(2).split('-')
      const temp = splittedKeys[1]

      splittedKeys[1] = splittedKeys[2]
      splittedKeys[2] = temp
      const transformedKey = `--${splittedKeys.join('-')}`

      return {
        ...acc,
        [transformedKey]: value,
      }
    }
    acc[key] = value

    return {
      ...acc,
      [key]: value,
    }
  }, {})

/**
 * Function to transform Theme properties from 'color.primary.500' to '#FFF',
 */
const transformJsonValueToCss = (theme: FlatTheme, json: ThemeStyles) => {
  const updatedCssTokens: FlatTheme = {}

  // TODO: improve typings
  // eslint-disable-next-line array-callback-return
  Object.entries(theme).reduce((acc, [key, value]): any => {
    if (value?.startsWith('color.')) {
      const parsedValue = value.split('.').reduce<any>((acc, currentProp) => acc[currentProp], json)

      updatedCssTokens[key] = parsedValue
    }
  })

  return { ...theme, ...updatedCssTokens }
}

/**
 * Recursive function to iterate through theme properties and convert them to '--wpp-css-variable'
 */
const loopProperty = <T extends Record<string, any>>(obj: T, key: string, res: FlatTheme): FlatTheme =>
  Object.entries(obj).reduce((acc, [prop, value]) => {
    // if we face property with 'default' name - we should not add it to the css variable. E.g.  'color.brand.default' -> 'color-brand'
    const firstPart = key !== 'components' ? key : ''
    const secondPart = prop !== 'default' ? prop : ''
    const delimiter = firstPart && secondPart ? '-' : ''
    const newKey = toKebabCase(firstPart + delimiter + secondPart)

    if (secondPart === 'fontFamily' || (firstPart === 'font' && secondPart === 'family')) {
      return {
        ...acc,
        [`${dsPrefix}-${newKey}`]: Array.isArray(value) ? value.filter(i => i).join(', ') : value,
      }
    } else if (!isObject(value)) {
      return {
        ...acc,
        [`${dsPrefix}-${newKey}`]: value,
      }
    } else {
      return loopProperty<typeof value>(value, newKey, acc)
    }
  }, res)

/**
 * Creates flat theme object from theme object
 */
export const createTheme = (json: Theme, variant: keyof ThemeContent = 'light'): FlatTheme => {
  const flatTheme = Object.entries(json.content[variant]!).reduce((acc: FlatTheme, [category, value]): FlatTheme => {
    if (isObject(value)) {
      return {
        ...acc,
        ...loopProperty<typeof value>(value, category, acc),
      }
    }

    return { ...acc, [toKebabCase(category)]: value as unknown as string }
  }, {})

  return transformJsonValueToCss(transformColorVariableNames(flatTheme), json.content[variant]!)
}

/**
 * Resolve theme object with color values
 */
export const resolveTheme = (initJson: Theme, variant: keyof ThemeContent = 'light'): Theme => {
  const json = { ...initJson }

  return recursiveObjectMap(json, value => {
    if (typeof value === 'string' && value.startsWith('color.')) {
      return value.split('.').reduce<any>((acc, currentProp) => acc[currentProp], json.content[variant]!)
    }

    return value
  })
}
