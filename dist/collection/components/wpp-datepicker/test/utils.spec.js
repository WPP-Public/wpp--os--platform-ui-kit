import { getCurrentFormatDate, normalizeMonthRangeDates, normalizeYearRangeDates } from '../utils';
describe('wpp-datepicker', () => {
  describe('utils', () => {
    describe('getCurrentFormatDate', () => {
      it('should return proper date based on the provided format', () => {
        expect(getCurrentFormatDate('yyyy/dd/mm')('2023/26/01')).toEqual(new Date('2023-01-26T00:00:00.000Z'));
        expect(getCurrentFormatDate('dd/mm/yyyy')('26/01/2023')).toEqual(new Date('2023-01-26T00:00:00.000Z'));
        expect(getCurrentFormatDate('mm/dd/yyyy')('01/26/2023')).toEqual(new Date('2023-01-26T00:00:00.000Z'));
        expect(getCurrentFormatDate('mm/yyyy/dd')('01/2023/26')).toEqual(new Date('2023-01-26T00:00:00.000Z'));
      });
    });
    describe('normalizeMonthRangeDates', () => {
      it('should normalize start date to first day and end date to last day of month by default', () => {
        const startDate = new Date(2026, 3, 15); // April 15, 2026
        const endDate = new Date(2026, 5, 10); // June 10, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], { enabled: true });
        expect(result[0].getDate()).toBe(1); // First day of April
        expect(result[0].getMonth()).toBe(3); // April
        expect(result[0].getFullYear()).toBe(2026);
        expect(result[1].getDate()).toBe(30); // Last day of June
        expect(result[1].getMonth()).toBe(5); // June
        expect(result[1].getFullYear()).toBe(2026);
      });
      it('should handle months with 31 days correctly', () => {
        const startDate = new Date(2026, 0, 20); // January 20, 2026
        const endDate = new Date(2026, 0, 25); // January 25, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], { enabled: true });
        expect(result[0].getDate()).toBe(1); // First day of January
        expect(result[1].getDate()).toBe(31); // Last day of January
      });
      it('should handle February correctly (non-leap year)', () => {
        const startDate = new Date(2026, 1, 10); // February 10, 2026
        const endDate = new Date(2026, 1, 20); // February 20, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], { enabled: true });
        expect(result[1].getDate()).toBe(28); // Last day of February 2026 (non-leap year)
      });
      it('should handle February correctly (leap year)', () => {
        const startDate = new Date(2024, 1, 10); // February 10, 2024
        const endDate = new Date(2024, 1, 20); // February 20, 2024
        const result = normalizeMonthRangeDates([startDate, endDate], { enabled: true });
        expect(result[1].getDate()).toBe(29); // Last day of February 2024 (leap year)
      });
      it('should use custom startDay when provided', () => {
        const startDate = new Date(2026, 3, 15); // April 15, 2026
        const endDate = new Date(2026, 5, 10); // June 10, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], {
          enabled: true,
          startDay: 15,
        });
        expect(result[0].getDate()).toBe(15); // 15th of April
        expect(result[1].getDate()).toBe(30); // Last day of June (default)
      });
      it('should use custom endDay when provided', () => {
        const startDate = new Date(2026, 3, 15); // April 15, 2026
        const endDate = new Date(2026, 5, 10); // June 10, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], {
          enabled: true,
          endDay: 20,
        });
        expect(result[0].getDate()).toBe(1); // First day of April (default)
        expect(result[1].getDate()).toBe(20); // 20th of June
      });
      it('should use custom startDay and endDay when both provided', () => {
        const startDate = new Date(2026, 3, 15); // April 15, 2026
        const endDate = new Date(2026, 5, 10); // June 10, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], {
          enabled: true,
          startDay: 10,
          endDay: 25,
        });
        expect(result[0].getDate()).toBe(10); // 10th of April
        expect(result[1].getDate()).toBe(25); // 25th of June
      });
      it('should return original dates when enabled is false', () => {
        const startDate = new Date(2026, 3, 15); // April 15, 2026
        const endDate = new Date(2026, 5, 10); // June 10, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], { enabled: false });
        expect(result[0]).toBe(startDate);
        expect(result[1]).toBe(endDate);
      });
      it('should return original dates when array length is not 2', () => {
        const singleDate = new Date(2026, 3, 15);
        const result = normalizeMonthRangeDates([singleDate], { enabled: true });
        expect(result).toEqual([singleDate]);
      });
      it('should return original dates when config is not provided but defaults enabled', () => {
        const startDate = new Date(2026, 3, 15);
        const endDate = new Date(2026, 5, 10);
        // Default config has enabled: true
        const result = normalizeMonthRangeDates([startDate, endDate]);
        expect(result[0].getDate()).toBe(1);
        expect(result[1].getDate()).toBe(30);
      });
      it('should cap custom endDay to last day of month when endDay exceeds month length', () => {
        const startDate = new Date(2026, 3, 15); // April 15, 2026
        const endDate = new Date(2026, 1, 10); // February 10, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], {
          enabled: true,
          endDay: 31, // February doesn't have 31 days
        });
        expect(result[1].getDate()).toBe(28); // Capped to last day of February 2026
        expect(result[1].getMonth()).toBe(1); // Still February
      });
      it('should cap custom endDay for February in leap year', () => {
        const startDate = new Date(2024, 0, 10); // January 10, 2024
        const endDate = new Date(2024, 1, 15); // February 15, 2024 (leap year)
        const result = normalizeMonthRangeDates([startDate, endDate], {
          enabled: true,
          endDay: 30, // February doesn't have 30 days even in leap year
        });
        expect(result[1].getDate()).toBe(29); // Capped to last day of February 2024 (leap year)
      });
      it('should cap custom startDay to last day of month when startDay exceeds month length', () => {
        const startDate = new Date(2026, 1, 10); // February 10, 2026
        const endDate = new Date(2026, 5, 10); // June 10, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], {
          enabled: true,
          startDay: 31, // February doesn't have 31 days
        });
        expect(result[0].getDate()).toBe(28); // Capped to last day of February 2026
        expect(result[0].getMonth()).toBe(1); // Still February
      });
      it('should handle cross-year month ranges', () => {
        const startDate = new Date(2025, 10, 15); // November 15, 2025
        const endDate = new Date(2026, 2, 10); // March 10, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], { enabled: true });
        expect(result[0].getDate()).toBe(1); // First day of November
        expect(result[0].getMonth()).toBe(10); // November
        expect(result[0].getFullYear()).toBe(2025);
        expect(result[1].getDate()).toBe(31); // Last day of March
        expect(result[1].getMonth()).toBe(2); // March
        expect(result[1].getFullYear()).toBe(2026);
      });
      it('should handle same month selection', () => {
        const startDate = new Date(2026, 6, 5); // July 5, 2026
        const endDate = new Date(2026, 6, 20); // July 20, 2026
        const result = normalizeMonthRangeDates([startDate, endDate], { enabled: true });
        expect(result[0].getDate()).toBe(1); // First day of July
        expect(result[0].getMonth()).toBe(6);
        expect(result[1].getDate()).toBe(31); // Last day of July
        expect(result[1].getMonth()).toBe(6);
      });
      it('should return original dates when dates are invalid', () => {
        const invalidDate = new Date('invalid');
        const validDate = new Date(2026, 3, 15);
        const result = normalizeMonthRangeDates([invalidDate, validDate], { enabled: true });
        expect(result[0]).toBe(invalidDate);
        expect(result[1]).toBe(validDate);
      });
      it('should return empty array as-is', () => {
        const result = normalizeMonthRangeDates([], { enabled: true });
        expect(result).toEqual([]);
      });
      it('should preserve time components as midnight for normalized dates', () => {
        const startDate = new Date(2026, 3, 15, 14, 30, 0); // April 15, 2026, 2:30 PM
        const endDate = new Date(2026, 5, 10, 9, 15, 0); // June 10, 2026, 9:15 AM
        const result = normalizeMonthRangeDates([startDate, endDate], { enabled: true });
        expect(result[0].getHours()).toBe(0); // Normalized dates start at midnight
        expect(result[0].getMinutes()).toBe(0);
        expect(result[1].getHours()).toBe(0);
        expect(result[1].getMinutes()).toBe(0);
      });
    });
    describe('normalizeYearRangeDates', () => {
      it('should normalize start date to Jan 1st and end date to Dec 31st by default', () => {
        const startDate = new Date(2011, 5, 15); // June 15, 2011
        const endDate = new Date(2019, 7, 20); // August 20, 2019
        const result = normalizeYearRangeDates([startDate, endDate], { enabled: true });
        expect(result[0].getFullYear()).toBe(2011);
        expect(result[0].getMonth()).toBe(0); // January
        expect(result[0].getDate()).toBe(1);
        expect(result[1].getFullYear()).toBe(2019);
        expect(result[1].getMonth()).toBe(11); // December
        expect(result[1].getDate()).toBe(31);
      });
      it('should respect custom startMonth/startDay and endMonth/endDay', () => {
        const startDate = new Date(2024, 5, 15);
        const endDate = new Date(2025, 7, 20);
        const result = normalizeYearRangeDates([startDate, endDate], {
          enabled: true,
          startMonth: 4,
          startDay: 1,
          endMonth: 3,
          endDay: 31,
        });
        expect(result[0].getMonth()).toBe(3); // April (1-based 4 → 0-based 3)
        expect(result[0].getDate()).toBe(1);
        expect(result[1].getMonth()).toBe(2); // March (1-based 3 → 0-based 2)
        expect(result[1].getDate()).toBe(31);
      });
      it('should cap end day to last day of end month (e.g. Feb 31 → Feb 28/29)', () => {
        const result = normalizeYearRangeDates([new Date(2023, 0, 1), new Date(2023, 0, 1)], {
          enabled: true,
          endMonth: 2,
          endDay: 31,
        });
        // Feb 2023 → 28 days
        expect(result[1].getMonth()).toBe(1);
        expect(result[1].getDate()).toBe(28);
      });
      it('should return dates as-is when disabled', () => {
        const startDate = new Date(2011, 5, 15);
        const endDate = new Date(2019, 7, 20);
        const result = normalizeYearRangeDates([startDate, endDate], { enabled: false });
        expect(result).toEqual([startDate, endDate]);
      });
      it('should return dates as-is when array length is not 2', () => {
        const result = normalizeYearRangeDates([new Date(2011, 0, 1)], { enabled: true });
        expect(result).toEqual([new Date(2011, 0, 1)]);
      });
      it('should return dates as-is when a date is invalid', () => {
        const result = normalizeYearRangeDates([new Date('invalid'), new Date(2019, 0, 1)], { enabled: true });
        expect(result.length).toBe(2);
      });
      it('should default to enabled when no config is provided', () => {
        const result = normalizeYearRangeDates([new Date(2011, 5, 15), new Date(2019, 7, 20)]);
        expect(result[0].getMonth()).toBe(0);
        expect(result[0].getDate()).toBe(1);
        expect(result[1].getMonth()).toBe(11);
        expect(result[1].getDate()).toBe(31);
      });
    });
  });
});
