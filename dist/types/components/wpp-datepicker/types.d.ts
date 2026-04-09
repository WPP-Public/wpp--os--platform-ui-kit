import AirDatepicker, { AirDatepickerLocale } from 'air-datepicker';
import { DATE_FORMAT } from './const';
import { LabelConfig } from '../wpp-label/types';
export type DatePickerView = 'days' | 'months' | 'years';
export interface DatePickerEventDetail {
  date: Date | Date[];
  formattedDate: string | string[] | Date | Date[];
  name?: string;
}
export interface DatePickerClearEventDetail {
  clear: boolean;
}
export type DateFormatType = typeof DATE_FORMAT.DAY_MONTH_YEAR | typeof DATE_FORMAT.MONTH_DAY_YEAR | typeof DATE_FORMAT.YEAR_MONTH_DAY;
export interface LocaleTypes extends Partial<AirDatepickerLocale> {
  dateFormat: DateFormatType;
  /**
   * Custom error message shown when the user types an invalid date.
   * Defaults to 'Invalid date format'.
   */
  invalidDateMessage?: string;
  /**
   * The locale string used to determine date-related properties like `firstDay`.
   * Example: 'en-US', 'fr-FR', etc.
   */
  dateLocale?: 'en-US' | 'en-GB' | 'fr-FR' | 'ar-SA' | 'de-DE' | 'es-ES' | 'it-IT' | 'ja-JP' | 'ko-KR' | 'nl-NL' | 'pt-BR' | 'ru-RU' | 'tr-TR' | 'zh-CN' | 'zh-TW';
}
export type AirDatepickerTypes = AirDatepicker;
export type DatepickerLabelConfig = LabelConfig;
export interface IPreset {
  label: string;
  value: string[];
}
/**
 * Configuration for normalizing month range dates.
 * When using `view="months"` with `range`, this config allows automatic
 * normalization of selected dates to specific days of the month.
 */
export interface MonthRangeNormalization {
  /**
   * If `true`, enables month range normalization when `view="months"` and `range` are set.
   * @default true
   */
  enabled: boolean;
  /**
   * The day to use for the start date of the range.
   * @default 'first' (1st day of the month)
   */
  startDay?: 'first' | number;
  /**
   * The day to use for the end date of the range.
   * @default 'last' (last day of the month)
   */
  endDay?: 'last' | number;
}
