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
export const LOCALES_DEFAULTS = {
  days: DAYS,
  daysShort: DAYS_SHORT,
  daysMin: DAYS_MIN,
  months: MONTHS,
  monthsShort: MONTHS_SHORT,
  today: 'Today',
  clear: 'Clear',
  dateFormat: DATE_FORMAT.DAY_MONTH_YEAR,
  timeFormat: 'hh:mm aa',
  invalidDateMessage: 'Invalid date format',
  dateLocale: undefined,
  firstDay: undefined,
};
