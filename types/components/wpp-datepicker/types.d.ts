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
