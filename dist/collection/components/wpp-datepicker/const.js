export const DATE_FORMAT = {
  DAY_MONTH_YEAR: 'dd/MM/yyyy',
  MONTH_DAY_YEAR: 'MM/dd/yyyy',
  YEAR_MONTH_DAY: 'yyyy/MM/dd',
};
export const DATE_FORMAT_SEPARATOR_PATTERN = /[- /.]/;
export const DATES_SEPARATOR = ' – ';
export const ANIMATION_DURATION = 100;
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const INVALID_DATE = '32/32/2032';
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DAYS_MIN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DATE_FORMAT_REG_EXP = /([YyMmwdE]+)/g;
/**
 * air-datepicker renders the calendar DOM itself; these are ITS internal class
 * names — a third-party contract that is brittle across air-datepicker upgrades.
 * Centralised here so a library bump has one place to audit rather than a dozen
 * string literals scattered through the component's a11y augmentation.
 */
export const AIR_DP_CLASS = {
  /** The calendar root air-datepicker renders — one per month in double mode. */
  root: 'air-datepicker',
  body: 'air-datepicker-body',
  cell: 'air-datepicker-cell',
  cells: 'air-datepicker-body--cells',
  navAction: 'air-datepicker-nav--action',
  navTitle: 'air-datepicker-nav--title',
  button: 'air-datepicker-button',
  buttonsContainer: 'air-datepicker--buttons',
  dayNames: 'air-datepicker-body--day-names',
  dayName: 'air-datepicker-body--day-name',
};
/** air-datepicker's stateful modifier classes (leading/trailing dashes are theirs). */
export const AIR_DP_STATE = {
  selected: '-selected-',
  current: '-current-',
  disabled: '-disabled-',
  hidden: '-hidden-',
  /** Spill cell for a neighbouring month, rendered greyed at the edges of a grid. */
  otherMonth: '-other-month-',
};
/** Our own preset list-item class rendered inside the calendar popup. */
export const PRESET_ITEM_CLASS = 'wpp-presets-item';
export const LOCALES_DEFAULTS = {
  days: DAYS,
  daysShort: DAYS_SHORT,
  daysMin: DAYS_MIN,
  months: MONTHS,
  monthsShort: MONTHS_SHORT,
  today: 'Today',
  clear: 'Clear all',
  apply: 'Apply',
  dateFormat: DATE_FORMAT.DAY_MONTH_YEAR,
  timeFormat: 'hh:mm aa',
  invalidDateMessage: 'Invalid date format',
  eraseDateLabel: 'Erase date',
  calendarLabel: 'Choose date',
  previousMonthLabel: 'Previous month',
  nextMonthLabel: 'Next month',
  dateLocale: undefined,
  firstDay: undefined,
};
