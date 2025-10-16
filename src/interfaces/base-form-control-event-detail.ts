import { BaseFormControl } from './base-form-control'

export interface BaseFormControlEventDetail<T> {
  readonly value: BaseFormControl<T>['value']
}
