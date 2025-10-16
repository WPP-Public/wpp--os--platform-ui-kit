/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

// Z-INDEX HIERARCHY
// 900: Header (OS Bar)
// 890: Sticky Bar (Top Bar)
// 880: Overlays (dropdowns, pickers, popovers, etc.)
// 1150: Context Menu (as we have these in the header)
// 1200: Tooltips

export enum Z_INDEX {
  TOOLTIP = 1200,
  CONTEXT_MENU = 1150,
  TOAST = 1050,
  OVERLAY = 900,
  NAV_SIDEBAR = 899,
  STICKY_BAR = 890,
  COLOR_PICKER = 880,
  TIME_PICKER = 880,
  DATE_PICKER = 880,
  AUTOCOMPLETE = 880,
  MENU_LIST = 880,
  SEARCH = 880,
  POPOVER = 880,
  MODAL = 875,
  SIDE_MODAL = 870,
  TOPBAR = 860,
  CHAT = 100,
  BANNER = 1,
}

export const ANIMATION_PROPERTY_NAME = 'opacity'

export const DEFAULT_SHOW_DURATION_ANIMATION = 275
export const DEFAULT_HIDE_DURATION_ANIMATION = 250

export const DEFAULT_OFFSET = 8
export const ARROW_VERTICAL_OFFSET = 4
export const ARROW_HORIZONTAL_OFFSET = 6

export const STATIC_SIDES: { [key: string]: string } = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

export const ROTATION_VALUES: { [key: string]: number } = {
  left: 270,
  bottom: 180,
  right: 90,
  top: 0,
}

export const DEFAULT_SHOW_STYLES = {
  opacity: 1,
  visibility: 'visible',
}

export const DEFAULT_HIDE_STYLES = {
  opacity: 0,
  visibility: 'hidden',
}

export const PLACEMENTS = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end',
]
