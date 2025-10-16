import { SelectOptionChangeEventDetail } from '../wpp-select/types'
import { LabelConfig } from '../wpp-label/types'
import { ListItemProps } from '../wpp-list-item/types'

export type AutocompleteOptionType = 'multiple' | 'single'

export type AutocompleteOption = Record<string, any>
// Workaround for a Stencil bug with Angular proxies generation
export type AutocompleteOptionList = AutocompleteOption[]

export interface AutocompleteDefaultOption extends AutocompleteOption {
  id: AutocompleteOptionId
  label: string
}

export type AutocompleteExtendedOption = ListItemProps & AutocompleteOption

export type AutocompleteChangeEventDetail =
  | ({
      value: AutocompleteOptionList
      reason: AutocompleteChangeReason
    } & { name?: string })
  | ((SelectOptionChangeEventDetail & { reason: 'selectOption' }) & { name?: string })
  | ({ value: null; reason: 'removeOption' } & { name?: string })

export type AutocompleteChangeReason = 'applyOption' | 'removeOption' | 'selectOption'

export type AutocompleteOptionId = string | number

export type GetOptionIdHandler = (item: AutocompleteOption) => AutocompleteOptionId

export type GetOptionLabelHandler = (item: AutocompleteOption) => string

export type LoadMoreHandler = () => Promise<void>

export interface CancellablePromise<T> extends Promise<T> {
  cancelled?: boolean
}

export interface AutocompleteLocales {
  nothingFound: string
  beginTyping: string
  more: string
  showMore: string
  showLess: string
  selected: (count: number) => string
  loading: string
  createNewElement: string
}

export type AutocompleteTypes = 'regular' | 'extended'

export type AutocompleteLabelConfig = LabelConfig
