import { IPreset, MonthRangeNormalization } from './types';
export declare function isValidDate(date: Date | Date[]): boolean;
export declare function getCurrentFormatDate(dateFormat: string, separator?: string): (date: string) => Date;
export declare const getFormattedDateString: (date: string | undefined, dateFormat: string, separator?: string) => {
  formattedDate: string;
  isAllMatchedPartsLength: boolean;
};
export declare const getNextCursorPosition: (value: string, startPos: number, isAdded: boolean, separator?: string) => number;
export declare const generatePreset: (days: number) => IPreset;
export declare const localeToFirstDayMap: Record<string, 0 | 1 | 2 | 3 | 4 | 5 | 6>;
/**
 * Normalizes a date range for month view selection.
 * Sets the start date to the specified day (default: first day) and
 * end date to the specified day (default: last day) of their respective months.
 *
 * @param dates - Array of two dates representing the range [startDate, endDate]
 * @param config - Configuration for normalization
 * @returns Normalized date range [normalizedStart, normalizedEnd]
 */
export declare const normalizeMonthRangeDates: (dates: Date[], config?: MonthRangeNormalization) => Date[];
