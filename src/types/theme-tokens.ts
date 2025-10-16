/**
 * CSS variable names for theme colors
 * These map to the theme structure defined in theme.ts
 */
export type ThemeColorToken =
  // Primary colors (from ThemeColor['primary'])
  | '--wpp-primary-color-100'
  | '--wpp-primary-color-200'
  | '--wpp-primary-color-300'
  | '--wpp-primary-color-400'
  | '--wpp-primary-color-500'
  | '--wpp-primary-color-600'
  | '--wpp-primary-color-700'
  | '--wpp-primary-color-800'

  // Success colors (from ThemeColor['success'])
  | '--wpp-success-color-200'
  | '--wpp-success-color-400'
  | '--wpp-success-color-500'

  // Warning colors (from ThemeColor['warning'])
  | '--wpp-warning-color-200'
  | '--wpp-warning-color-400'
  | '--wpp-warning-color-500'

  // Danger colors (from ThemeColor['danger'])
  | '--wpp-danger-color-200'
  | '--wpp-danger-color-300'
  | '--wpp-danger-color-400'
  | '--wpp-danger-color-500'
  | '--wpp-danger-color-600'

  // Grey colors (from ThemeColor['grey'])
  | '--wpp-grey-color-000'
  | '--wpp-grey-color-100'
  | '--wpp-grey-color-200'
  | '--wpp-grey-color-300'
  | '--wpp-grey-color-400'
  | '--wpp-grey-color-500'
  | '--wpp-grey-color-600'
  | '--wpp-grey-color-700'
  | '--wpp-grey-color-800'
  | '--wpp-grey-color-900'
  | '--wpp-grey-color-1000'

  // Brand colors (from ThemeColor['brand'])
  | '--wpp-brand-color'
  | '--wpp-brand-color-disabled'
  | '--wpp-brand-color-hover'
  | '--wpp-brand-color-active'

  // Text colors (from ThemeText['color'])
  | '--wpp-text-color'
  | '--wpp-text-color-white-info'
  | '--wpp-text-color-disabled'
  | '--wpp-text-color-danger'
  | '--wpp-text-color-warning'
  | '--wpp-text-color-success'
  | '--wpp-text-color-info'

  // Icon colors (from ThemeIcon['color'])
  | '--wpp-icon-color'
  | '--wpp-icon-color-disabled'
  | '--wpp-icon-color-hover'
  | '--wpp-icon-color-active'

  // Other colors
  | '--wpp-white-color'
  | '--wpp-highlight-color-200'
  | '--wpp-highlight-color-400'
  | '--wpp-surface-bg-color'
  | '--wpp-overlay-bg-color'

/**
 * Helper type for color props that enforces CSS variable syntax
 */
export type ThemeColorValue = `var(${ThemeColorToken})` | (string & {})
