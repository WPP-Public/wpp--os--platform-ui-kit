import isDate from 'lodash/isDate';
import { DATES_SEPARATOR, DATE_FORMAT_REG_EXP, INVALID_DATE, MONTHS, MONTHS_SHORT } from './const';
export function isValidDate(date) {
  if (Array.isArray(date)) {
    return date.every(currentDate => isDate(currentDate) && currentDate.toString() !== 'Invalid Date');
  }
  return isDate(date) && date.toString() !== 'Invalid Date';
}
const getSplittedDateParts = (date) => date.match(DATE_FORMAT_REG_EXP)?.map(item => item.toLowerCase()) || [];
export function getCurrentFormatDate(dateFormat, separator = '/') {
  return (date) => {
    if (!date)
      return new Date(INVALID_DATE);
    const formatItems = dateFormat.match(DATE_FORMAT_REG_EXP)?.map(item => item.toLowerCase()) || [];
    const dateItems = date.split(separator).map(item => {
      const formattedItem = item.includes(',') ? item.slice(0, -1) : item;
      return !isNaN(Number(formattedItem)) ? Number(formattedItem) : formattedItem;
    });
    if (formatItems.length !== dateItems.length) {
      return new Date(INVALID_DATE);
    }
    const monthFormat = formatItems.find(item => item.includes('m'));
    const month = monthFormat
      ? monthFormat === 'mm' || monthFormat === 'm'
        ? dateItems[formatItems.indexOf(monthFormat)] - 1
        : (monthFormat === 'mmm' ? MONTHS_SHORT : MONTHS).indexOf(dateItems[formatItems.indexOf(monthFormat)])
      : undefined;
    const dayFormat = formatItems.find(item => item.includes('d'));
    const day = dayFormat ? dateItems[formatItems.indexOf(dayFormat)] : undefined;
    const yearFormat = formatItems.find(item => item.includes('yy'));
    const year = yearFormat ? dateItems[formatItems.indexOf(yearFormat)] : undefined;
    if (monthFormat?.includes('mmm') && !dayFormat && year && month !== undefined) {
      const formattedYear = yearFormat === 'yy' ? parseInt(`${year >= 50 ? '19' : '20'}` + year, 10) : year;
      return new Date(formattedYear, month, 1);
    }
    if (year && month !== undefined && day) {
      const formattedYear = yearFormat === 'yy' ? parseInt(`${year >= 50 ? '19' : '20'}` + year, 10) : year;
      return new Date(formattedYear, month, day);
    }
    return new Date(INVALID_DATE);
  };
}
export const getFormattedDateString = (date = '', dateFormat, separator = '/') => {
  const formatItems = getSplittedDateParts(dateFormat);
  let prevMargin = 0;
  let isAllMatchedPartsLength = true;
  const formattedInfoParts = formatItems
    .map((item, index) => {
    const nextMargin = prevMargin + item.length;
    const currStringPart = date.substring(prevMargin, nextMargin);
    const isToAddSlash = currStringPart && currStringPart.length === item.length && index !== formatItems.length - 1;
    prevMargin = nextMargin;
    if (currStringPart.length !== item.length) {
      isAllMatchedPartsLength = false;
    }
    return `${currStringPart}${isToAddSlash ? separator : ''}`;
  })
    .filter(Boolean)
    .join('');
  return {
    formattedDate: formattedInfoParts,
    isAllMatchedPartsLength,
  };
};
export const getNextCursorPosition = (value, startPos, isAdded, separator = '/') => {
  const nearElement = isAdded ? value[startPos] : value[startPos - 2];
  let nextPosition = startPos;
  if (isAdded) {
    if (nearElement === separator) {
      nextPosition += 1;
    }
    if (value.endsWith(DATES_SEPARATOR)) {
      nextPosition = value.length;
    }
  }
  return nextPosition;
};
export const generatePreset = (days) => {
  const today = new Date();
  const endDate = today.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - days + 1);
  const formattedStartDate = startDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return {
    label: `Last ${days} Days`,
    value: [formattedStartDate, endDate],
  };
};
// Mapping known locales to their first day of the week
export const localeToFirstDayMap = {
  'en-US': 0,
  'en-GB': 1,
  'fr-FR': 1,
  'ar-SA': 6,
  'de-DE': 1,
  'es-ES': 1,
  'it-IT': 1,
  'ja-JP': 0,
  'ko-KR': 0,
  'nl-NL': 1,
  'pt-BR': 0,
  'ru-RU': 1,
  'tr-TR': 1,
  'zh-CN': 1,
  'hi-IN': 0,
  'th-TH': 0,
  'sv-SE': 1,
  'da-DK': 1,
  'fi-FI': 1,
  'nb-NO': 1,
  'pl-PL': 1,
  'cs-CZ': 1,
  'sk-SK': 1,
  'hu-HU': 1,
  'el-GR': 1,
  'he-IL': 0,
  'ar-EG': 6, // Saturday
};
/**
 * Normalizes a date range for month view selection.
 * Sets the start date to the specified day (default: first day) and
 * end date to the specified day (default: last day) of their respective months.
 *
 * @param dates - Array of two dates representing the range [startDate, endDate]
 * @param config - Configuration for normalization
 * @returns Normalized date range [normalizedStart, normalizedEnd]
 */
export const normalizeMonthRangeDates = (dates, config = { enabled: true }) => {
  if (!config.enabled || dates.length !== 2) {
    return dates;
  }
  const [start, end] = dates;
  if (!isValidDate(start) || !isValidDate(end)) {
    return dates;
  }
  // Determine start day, capped to the last day of the start month
  const startDayConfig = config.startDay ?? 'first';
  const lastDayOfStartMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
  const startDay = startDayConfig === 'first' ? 1 : Math.min(startDayConfig, lastDayOfStartMonth);
  // Determine end day - 'last' means last day of the month
  const endDayConfig = config.endDay ?? 'last';
  const lastDayOfEndMonth = new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
  let normalizedEnd;
  if (endDayConfig === 'last') {
    normalizedEnd = new Date(end.getFullYear(), end.getMonth(), lastDayOfEndMonth);
  }
  else {
    // Cap the custom endDay to the last day of the month
    const cappedEndDay = Math.min(endDayConfig, lastDayOfEndMonth);
    normalizedEnd = new Date(end.getFullYear(), end.getMonth(), cappedEndDay);
  }
  const normalizedStart = new Date(start.getFullYear(), start.getMonth(), startDay);
  return [normalizedStart, normalizedEnd];
};
/**
 * Normalizes a date range for year view selection.
 * Sets the start date to the specified month/day (default: Jan 1st) and
 * end date to the specified month/day (default: Dec 31st) of their respective years.
 *
 * @param dates - Array of two dates representing the range [startDate, endDate]
 * @param config - Configuration for normalization
 * @returns Normalized date range [normalizedStart, normalizedEnd]
 */
export const normalizeYearRangeDates = (dates, config = { enabled: true }) => {
  if (!config.enabled || dates.length !== 2) {
    return dates;
  }
  const [start, end] = dates;
  if (!isValidDate(start) || !isValidDate(end)) {
    return dates;
  }
  // Determine start month (0-based for Date constructor; user-facing input is 1-12)
  const startMonthConfig = config.startMonth ?? 'first';
  const startMonth = startMonthConfig === 'first' ? 0 : Math.min(Math.max(startMonthConfig, 1), 12) - 1;
  // Determine start day, capped to the last day of the start month/year
  const startDayConfig = config.startDay ?? 'first';
  const lastDayOfStartMonth = new Date(start.getFullYear(), startMonth + 1, 0).getDate();
  const startDay = startDayConfig === 'first' ? 1 : Math.min(startDayConfig, lastDayOfStartMonth);
  // Determine end month
  const endMonthConfig = config.endMonth ?? 'last';
  const endMonth = endMonthConfig === 'last' ? 11 : Math.min(Math.max(endMonthConfig, 1), 12) - 1;
  // Determine end day - 'last' means last day of the end month
  const endDayConfig = config.endDay ?? 'last';
  const lastDayOfEndMonth = new Date(end.getFullYear(), endMonth + 1, 0).getDate();
  const endDay = endDayConfig === 'last' ? lastDayOfEndMonth : Math.min(endDayConfig, lastDayOfEndMonth);
  const normalizedStart = new Date(start.getFullYear(), startMonth, startDay);
  const normalizedEnd = new Date(end.getFullYear(), endMonth, endDay);
  return [normalizedStart, normalizedEnd];
};
