export interface StickyBarButtonItem {
  variant: 'primary' | 'secondary' | 'action-button'
  text: string
}

export interface StickyBarTabItem {
  text: string
  value: string
}

export type StickyBarVariants = 'blank' | 'one-line' | 'two-lines' | 'two-lines-with-tabs'

export type VisibilityClasses = `visible` | `invisible` | ''
