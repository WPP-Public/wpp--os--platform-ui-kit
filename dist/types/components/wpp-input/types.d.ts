import { MaskitoOptions, MaskitoMask } from '@maskito/core';
import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
import { MaskitoNumberParams } from '@maskito/kit/src/lib/masks/number/number-params';
export type InputValue = string;
export interface InputChangeEventDetail extends BaseFormControlEventDetail<InputValue> {
  name?: string;
}
export type InputTypes = 'text' | 'password' | 'search' | 'number' | 'email' | 'tel' | 'url' | 'decimal';
export type tabElements = 'input' | 'icon' | 'inlineMessage';
export type InputLabelConfig = LabelConfig;
export type InputLocaleInterface = {
  minLengthErrorMessage: (minLength: number) => string;
  maxLengthErrorMessage: (maxLength: number) => string;
};
declare const _CountryCodes: import("libphonenumber-js/types").CountryCode[];
export type CountryCode = (typeof _CountryCodes)[number];
export type MaskOptions = {
  decimalPatternOptions?: MaskitoNumberParams;
  maskPlaceholder?: string;
  customPatternOptions?: MaskitoOptions;
  telPatternOptions?: {
    mask?: MaskitoMask;
    countryCode?: CountryCode;
    countryPhoneCode?: string;
  };
};
export type WppChangeExtraEventDetail = {
  raw: string;
  formatted: string;
  name?: string;
};
export {};
