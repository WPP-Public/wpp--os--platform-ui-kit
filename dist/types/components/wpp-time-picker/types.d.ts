export interface TimePickerChangeEventDetails {
  timeFormat: string;
  hours: string;
  minutes: string;
  name?: string;
}
export interface TimePickerLocaleTypes {
  /** Accessible name for the editable time input and popup dialog. */
  timePickerLabel: string;
  /** Accessible name for the hours listbox. */
  hoursLabel: string;
  /** Accessible name for the minutes listbox. */
  minutesLabel: string;
  /** Accessible name for the clear control. */
  eraseTimeLabel: string;
}
