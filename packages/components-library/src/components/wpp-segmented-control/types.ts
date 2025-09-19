import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail'
import { LabelConfig } from '../wpp-label/types'

export type SegmentedControlItemSize = 'm' | 's'
export type SegmentedControlValue = string | number
export type SegmentedControlReason = string

export type SegmentedControlChangeEventDetail =
  | BaseFormControlEventDetail<SegmentedControlValue>
  | {
      value: SegmentedControlValue
      reason: SegmentedControlReason
    }

export interface SegmentedControlItemChangeEventDetail {
  value: string | number
}

export type SegmentedControlLabelConfig = LabelConfig
