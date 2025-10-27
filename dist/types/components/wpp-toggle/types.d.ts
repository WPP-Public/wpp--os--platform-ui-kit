import { BooleanFormControlEventDetail } from '../../interfaces/boolean-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
export type ToggleValue = string | number;
export type ToggleChangeEvent = BooleanFormControlEventDetail<ToggleValue> & {
  name?: string;
};
export type ToggleLabelConfig = LabelConfig;
