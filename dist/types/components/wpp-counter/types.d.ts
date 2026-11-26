import { LabelConfig } from '../wpp-label/types';
export interface CounterChangeEventDetail {
  value: number;
  name?: string;
}
export interface CounterFormat {
  searchValue: RegExp;
  replaceValue: string;
}
export type CounterLabelConfig = LabelConfig;
export interface CounterLocales {
  /** Accessible name of the button that decreases the value. */
  decreaseValue: string;
  /** Accessible name of the button that increases the value. */
  increaseValue: string;
  /** Accessible name of the value field when there is no label and no ariaProps.label. */
  counterValue: string;
}
