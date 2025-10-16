import { InputLocaleInterface } from './types'

export const LOCALES_DEFAULTS: InputLocaleInterface = {
  minLengthErrorMessage: minLength => `The input must have at least ${minLength} characters`,
  maxLengthErrorMessage: maxLength => `The input can have a maximum of ${maxLength} characters`,
}
