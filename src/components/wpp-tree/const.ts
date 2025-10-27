import { TreeLocaleType } from './types'

export const LOCALES_DEFAULTS: TreeLocaleType = {
  nothingFound: 'No result',
}

export const KNOWN_KEYS_OF_TREE_TYPE: Record<string, true> = {
  search: true,
  id: true,
  selected: true,
  isNotSelectable: true,
  loadingActions: true,
  disabled: true,
  checked: true,
  indeterminate: true,
  hidden: true,
  open: true,
  title: true,
  children: true,
  iconStart: true,
  iconEnd: true,
  iconsStart: true,
  iconsEnd: true,
  endContent: true,
}
