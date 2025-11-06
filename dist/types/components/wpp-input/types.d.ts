import { MaskitoOptions, MaskitoMask } from '@maskito/core';
import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
export type InputValue = string;
export interface InputChangeEventDetail extends BaseFormControlEventDetail<InputValue> {
  name?: string;
}
export type InputTypes = 'text' | 'password' | 'search' | 'number' | 'email' | 'tel' | 'url' | 'decimal';
export type tabElements = 'input' | 'icon';
export type InputLabelConfig = LabelConfig;
export type InputLocaleInterface = {
  minLengthErrorMessage: (minLength: number) => string;
  maxLengthErrorMessage: (maxLength: number) => string;
};
declare const CountryCodes: import("libphonenumber-js/types").CountryCode[];
export type CountryCode = (typeof CountryCodes)[number];
export interface DecimalMaskOptions {
  decimalZeroPadding?: boolean;
  decimalSeparator?: string;
  thousandSeparator?: string;
  prefix?: string;
  postfix?: string;
  min?: number;
  max?: number;
  precision?: number;
}
export type MaskOptions = {
  decimalPatternOptions?: DecimalMaskOptions;
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
