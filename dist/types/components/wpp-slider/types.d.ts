import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
export type SliderValue = number[] | number;
export type SliderLabel = string | number;
export type SliderInputValue = string[] | string;
export type SliderTypes = 'single' | 'range' | 'middle-range';
export type SliderRangeType = 'min' | 'max';
export type SliderChangeEventDetail = BaseFormControlEventDetail<SliderValue> & {
  name?: string;
  middleValue?: number;
};
export interface MarkState {
  label?: SliderLabel;
  value: number;
}
export interface DisplayMarkState extends MarkState {
  position?: string;
}
export interface HandleType<T> {
  single: (value: number) => T;
  range: (value: number[]) => T;
  'middle-range': (value: number) => T;
}
export type SliderLabelConfig = LabelConfig;
export type InputWidth = `${number}px`;
