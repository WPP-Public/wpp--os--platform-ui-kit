import { BaseFormControl } from './base-form-control'
import { BooleanFormControlEventDetail } from './boolean-form-control-event-detail'

export interface BooleanFormControl<T> extends BaseFormControl<T, BooleanFormControlEventDetail<T>> {
  checked: boolean
  indeterminate?: boolean
}
