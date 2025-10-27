import { BooleanFormControlEventDetail } from '../../interfaces/boolean-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
export type RadioValue = string | number;
export type RadioChangeEvent = BooleanFormControlEventDetail<RadioValue> & {
  name?: string;
};
export type RadioLabelConfig = LabelConfig;
