import { SelectOptionChangeEventDetail } from '../wpp-select/types'
import { LabelConfig } from '../wpp-label/types'

export type SearchOption = Record<string, any>
// Workaround for a Stencil bug with Angular proxies generation
export type SearchOptionList = SearchOption[]

export interface SearchDefaultOption extends SearchOption {
  id: SearchOptionId
  label: string
}

export type SearchChangeEventDetail =
  | ({
      value: SearchOptionList
      reason: SearchChangeReason
    } & { name?: string })
  | ((SelectOptionChangeEventDetail & { reason: 'selectOption' }) & { name?: string })
  | ({ value: null; reason: 'removeOption' } & { name?: string })

export type SearchChangeReason = 'applyOption' | 'removeOption' | 'selectOption'

export type SearchOptionId = string | number

export type SearchGetOptionIdHandler = (item: SearchOption) => SearchOptionId

export type SearchGetOptionLabelHandler = (item: SearchOption) => string

export interface SearchLocales {
  nothingFound?: string
  loading?: string
  dropdownHeader?: string
}

export type SearchLabelConfig = LabelConfig
