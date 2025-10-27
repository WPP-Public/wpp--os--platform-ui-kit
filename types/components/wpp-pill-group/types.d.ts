import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
import { PillValue } from './components/wpp-pill/types';
export type PillGroupValue = PillValue | PillValue[];
export type PillGroupChangeEvent = BaseFormControlEventDetail<PillGroupValue> & {
  name?: string;
};
export type PillGroupLabelConfig = LabelConfig;
