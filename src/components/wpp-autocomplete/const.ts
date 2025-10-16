import { AutocompleteLocales } from './types'

export const BLUR_TIME = 250

export const DROPDOWN_ANIMATION_TIME: number | [number, number] = [300, BLUR_TIME]

export const PILL_MARGIN = 8

export const LOCALES_DEFAULTS: AutocompleteLocales = {
  nothingFound: 'Nothing found',
  beginTyping: 'Begin typing',
  more: 'more',
  showMore: 'more',
  showLess: 'Show less',
  selected: count => `${count} selected`,
  loading: 'Loading...',
  createNewElement: 'Create new element',
}
