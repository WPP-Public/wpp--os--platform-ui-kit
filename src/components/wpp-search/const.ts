import { SearchLocales } from './types'

export const BLUR_TIME = 250

export const DROPDOWN_ANIMATION_TIME: number | [number, number] = [300, BLUR_TIME]

export const LOCALES_DEFAULTS: SearchLocales = {
  nothingFound: 'Nothing found',
  loading: 'Loading...',
  dropdownHeader: '',
}
