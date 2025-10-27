export const PLACEHOLDER = 'hh:mm';
export const HOURS = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
export const DEFAULT_CHECKED_TIME_VALUES = {
  hoursIndex: -1,
  minutesIndex: -1,
};
export const TOP_PADDING = 8;
export const DEFAULT_WIDTH_VALUE = '198px';
export const isValidHour = (value) => /^(0\d|1\d|2[0-3])$/.test(value);
export const isValidMinutes = (value) => /^[0-5]\d$/.test(value);
