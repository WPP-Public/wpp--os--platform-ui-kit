import { AriaProps, DropdownConfig } from '../../types/common'

export type TooltipThemeTypes = 'light' | 'dark'

export interface TooltipProps {
  header?: string
  text?: string
  value?: string
  error?: boolean
  theme?: TooltipThemeTypes
  config?: DropdownConfig
  externalClass?: string
}

export interface ArrowBgColor {
  dark?: string
  light?: string
  error?: string
  warning?: string
}

export type ReferenceComponentElement = HTMLElement & {
  ariaProps: AriaProps
}
