import { MaskitoOptions, MaskitoMask } from '@maskito/core'
import metadata from 'libphonenumber-js/min/metadata'
import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail'
import { LabelConfig } from '../wpp-label/types'
import { MaskitoNumberParams } from '@maskito/kit/src/lib/masks/number/number-params'

export type InputValue = string
export interface InputChangeEventDetail extends BaseFormControlEventDetail<InputValue> {
  name?: string
}

export type InputTypes = 'text' | 'password' | 'search' | 'number' | 'email' | 'tel' | 'url' | 'decimal'

export type tabElements = 'input' | 'icon' | 'inlineMessage'

export type InputLabelConfig = LabelConfig

export type InputLocaleInterface = {
  minLengthErrorMessage: (minLength: number) => string
  maxLengthErrorMessage: (maxLength: number) => string
}

const getObjectKeys = Object.keys as <T>(object: T) => Array<keyof T>
const CountryCodes = getObjectKeys(metadata.countries)

export type CountryCode = (typeof CountryCodes)[number]

export type MaskOptions = {
  decimalPatternOptions?: MaskitoNumberParams
  // maskPlaceholder can be used only with "customPatternOptions" & "telPatternOptions"
  maskPlaceholder?: string
  customPatternOptions?: MaskitoOptions
  telPatternOptions?: {
    mask?: MaskitoMask
    countryCode?: CountryCode
    countryPhoneCode?: string
  }
}

export type WppChangeExtraEventDetail = {
  raw: string
  formatted: string
  name?: string
}
