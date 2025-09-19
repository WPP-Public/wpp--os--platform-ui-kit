export enum EVENT_SOURCE {
  RIGHT_SLOT = 'RIGHT_SLOT',
}

export const ALLOWED_COMPONENTS_RIGHT_SINGLE_SELECTION = new Set([
  'wpp-action-button',
  'wpp-toggle',
  'wpp-icon',
  'wpp-tag',
  'wpp-typography',
  'wpp-menu-context',
])

export const ALLOWED_COMPONENTS_RIGHT_MULTIPLE_SELECTION = new Set([
  'wpp-typography',
  'wpp-tag',
  'wpp-menu-context',
  'wpp-action-button',
])

export const ALLOWED_COMPONENTS_LEFT_SINGLE_SELECTION = new Set(['wpp-icon', 'wpp-avatar'])

export const ALLOWED_COMPONENTS_LEFT_MULTIPLE_SELECTION = new Set(['wpp-checkbox'])
