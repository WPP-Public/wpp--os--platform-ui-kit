import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
export type TextareaInputValue = string;
export type TextareaInputChangeEventDetail = BaseFormControlEventDetail<TextareaInputValue> & {
  name?: string;
};
export interface TextareaInputLocales {
  charactersEntered: string;
}
export type TextareaLabelConfig = LabelConfig;
