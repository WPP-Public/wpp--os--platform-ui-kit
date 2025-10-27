import { BooleanFormControlEventDetail } from '../../interfaces/boolean-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
export type CheckboxValue = string | number;
export type CheckboxChangeEvent = BooleanFormControlEventDetail<CheckboxValue> & {
  name?: string;
};
export type CheckboxLabelConfig = LabelConfig;
