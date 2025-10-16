import { EventEmitter } from '@stencil/core'
import { BaseFormControlEventDetail } from './base-form-control-event-detail'

export interface BaseFormControl<V, E extends BaseFormControlEventDetail<V> = BaseFormControlEventDetail<V>> {
  readonly name?: string

  value?: V

  readonly label?: string
  readonly placeholder?: string

  readonly required?: boolean
  readonly disabled?: boolean

  readonly wppChange: EventEmitter<E>
  readonly wppFocus: EventEmitter<FocusEvent>
  readonly wppBlur: EventEmitter<FocusEvent>

  setFocus?(): Promise<void>
}
