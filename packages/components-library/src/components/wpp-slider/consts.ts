import { DecimalMaskOptions } from '../wpp-input/types'
import { SliderRangeType, SliderTypes } from './types'

export const DEFAULT_INPUT_WIDTH = '68px'

export const getDefaultMaskOptions = (step: number): DecimalMaskOptions => ({
  decimalSeparator: '.',
  thousandSeparator: '',
  precision: String(step).split('.')[1]?.length || 0,
})

export const parseMaskedInput = (input: string, options: DecimalMaskOptions): number => {
  const { prefix = '', postfix = '', decimalSeparator = '.', thousandSeparator = '' } = options

  let cleanedInput = input

  if (prefix && cleanedInput.startsWith(prefix)) {
    cleanedInput = cleanedInput.slice(prefix.length)
  }

  if (postfix && cleanedInput.endsWith(postfix)) {
    cleanedInput = cleanedInput.slice(0, -postfix.length)
  }

  if (thousandSeparator) {
    const thousandSeparatorRegex = new RegExp(`\\${thousandSeparator}`, 'g')

    cleanedInput = cleanedInput.replace(thousandSeparatorRegex, '')
  }

  if (decimalSeparator !== '.') {
    const decimalSeparatorRegex = new RegExp(`\\${decimalSeparator}`)

    cleanedInput = cleanedInput.replace(decimalSeparatorRegex, '.')
  }

  const parsedNumber = Number(cleanedInput)

  return isNaN(parsedNumber) ? 0 : parsedNumber
}

export const formatDecimalWithMask = (value: number, options: DecimalMaskOptions): string => {
  const { prefix = '', postfix = '', decimalSeparator = '.', thousandSeparator = '' } = options

  let formattedValue = String(value)

  if (decimalSeparator !== '.') {
    formattedValue = formattedValue.replace('.', decimalSeparator)
  }

  const parts = formattedValue.split(decimalSeparator)

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

  formattedValue = parts.join(decimalSeparator)

  return `${prefix}${formattedValue}${postfix}`
}

export const getMaskOptionsForInput = (
  sliderType?: SliderTypes,
  inputType?: SliderRangeType,
  maskOptions?: DecimalMaskOptions | DecimalMaskOptions[],
): DecimalMaskOptions => {
  if (sliderType === 'single') {
    const options = maskOptions as DecimalMaskOptions

    return options ? options : { decimalSeparator: '.' }
  } else {
    if (inputType === 'min') {
      const options = maskOptions as DecimalMaskOptions[]

      if (!options) return { decimalSeparator: '.' }

      return options[0] ? options[0] : { decimalSeparator: '.' }
    } else {
      const options = maskOptions as DecimalMaskOptions[]

      if (!options) return { decimalSeparator: '.' }

      return options[1] ? options[1] : { decimalSeparator: '.' }
    }
  }
}
