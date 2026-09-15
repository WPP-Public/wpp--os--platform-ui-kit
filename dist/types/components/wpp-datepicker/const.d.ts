import { LocaleTypes } from './types';
export declare const DATE_FORMAT: {
  DAY_MONTH_YEAR: string;
  MONTH_DAY_YEAR: string;
  YEAR_MONTH_DAY: string;
};
export declare const DATE_FORMAT_SEPARATOR_PATTERN: RegExp;
export declare const DATES_SEPARATOR = " \u2013 ";
export declare const ANIMATION_DURATION = 100;
export declare const MONTHS: string[];
export declare const MONTHS_SHORT: string[];
export declare const INVALID_DATE = "32/32/2032";
export declare const DAYS: string[];
export declare const DAYS_SHORT: string[];
export declare const DAYS_MIN: string[];
export declare const DATE_FORMAT_REG_EXP: RegExp;
/**
 * air-datepicker renders the calendar DOM itself; these are ITS internal class
 * names — a third-party contract that is brittle across air-datepicker upgrades.
 * Centralised here so a library bump has one place to audit rather than a dozen
 * string literals scattered through the component's a11y augmentation.
 */
export declare const AIR_DP_CLASS: {
  /** The calendar root air-datepicker renders — one per month in double mode. */
  readonly root: "air-datepicker";
  readonly body: "air-datepicker-body";
  readonly cell: "air-datepicker-cell";
  readonly cells: "air-datepicker-body--cells";
  readonly navAction: "air-datepicker-nav--action";
  readonly navTitle: "air-datepicker-nav--title";
  readonly button: "air-datepicker-button";
  readonly buttonsContainer: "air-datepicker--buttons";
  readonly dayNames: "air-datepicker-body--day-names";
  readonly dayName: "air-datepicker-body--day-name";
};
/** air-datepicker's stateful modifier classes (leading/trailing dashes are theirs). */
export declare const AIR_DP_STATE: {
  readonly selected: "-selected-";
  readonly current: "-current-";
  readonly disabled: "-disabled-";
  readonly hidden: "-hidden-";
  /** Spill cell for a neighbouring month, rendered greyed at the edges of a grid. */
  readonly otherMonth: "-other-month-";
};
/** Our own preset list-item class rendered inside the calendar popup. */
export declare const PRESET_ITEM_CLASS = "wpp-presets-item";
export declare const LOCALES_DEFAULTS: LocaleTypes;
