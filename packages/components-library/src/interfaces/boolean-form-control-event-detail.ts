import { BaseFormControlEventDetail } from './base-form-control-event-detail'
import { BooleanFormControl } from './boolean-form-control'

export interface BooleanFormControlEventDetail<T> extends BaseFormControlEventDetail<T> {
  readonly checked: BooleanFormControl<T>['checked']
}
