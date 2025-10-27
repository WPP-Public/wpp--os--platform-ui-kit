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
