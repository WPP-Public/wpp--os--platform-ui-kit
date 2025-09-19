import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail'

export type CheckboxGroupValue = string | number
export type CheckboxGroupChangeEvent = BaseFormControlEventDetail<CheckboxGroupValue[]> & { name?: string }
