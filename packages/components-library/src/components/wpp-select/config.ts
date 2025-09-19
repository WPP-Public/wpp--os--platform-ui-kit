import { DropdownConfig } from '../../types/common'
import { Z_INDEX } from '../../common/consts'
import { getHighestContainerInDOM } from '../../utils/utils'

export const DEFAULT_DROPDOWN_CONFIG: DropdownConfig = {
  maxWidth: 'none',
  hideOnClick: false,
  trigger: 'manual',
  interactive: true,
  placement: 'bottom-start',
  offset: [0, 4],
  zIndex: Z_INDEX.CONTEXT_MENU,
  appendTo: () => getHighestContainerInDOM(),
}

export const LOCALES_DEFAULTS = {
  emptyText: 'Nothing Found',
  clearAllText: 'Clear All',
  selectAllText: 'Select All',
  searchInputPlaceholder: 'Search',
  allSelectedText: 'All selected',
  selectLabel: 'selected',
  loadingText: 'Loading...',
}

export const MULTIPLE_SELECT_SINGLE_VALUE_ERROR = 'Value should be an Array in the multiple select.'
