import { Component, Prop, h, State, Host, Element } from '@stencil/core'
import { transformToVersionedTag } from '../../../../../../utils/utils'

export type SortDirection = 'none' | 'ascending' | 'descending'
export type TableSortState = 'default' | 'hover' | 'pressed'

@Component({
  tag: 'wpp-icon-table-sort-wrapper',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTableSortWrapper {
  @Element() host: HTMLWppIconTableSortWrapperElement

  @State() isHoveredState: boolean = false
  @State() isPressedState: boolean = false

  /**
   * Defines the icon size, where `s` is **16px** and `m` is **20px**.
   */
  @Prop() readonly size: 's' | 'm' = 'm'

  /**
   * Defines the icon width and changes its default size.
   */
  @Prop() readonly width?: number

  /**
   * Defines the icon height and changes its default size.
   */
  @Prop() readonly height?: number

  /**
   * The current sort direction
   */
  @Prop() readonly direction: SortDirection = 'none'

  /**
   * Whether the icon should respond to interactions
   */
  @Prop() readonly interactive: boolean = true

  /**
   * Color configuration for all states and directions.
   * colorUnsorted - Base color for unsorted state (both arrows)
   * colorUnsortedHover - Base color for unsorted hover state (both arrows)
   * colorUnsortedPressed - Base color for unsorted pressed state (both arrows)
   * colorAscendingUp - Up arrow color for ascending state
   * colorAscendingDown - Down arrow color for ascending state
   * colorAscendingDownHover - Down arrow color for ascending hover state
   * colorAscendingDownPressed - Down arrow color for ascending pressed state
   * colorDescendingUp - Up arrow color for descending state
   * colorDescendingUpHover - Up arrow color for descending hover state
   * colorDescendingUpPressed - Up arrow color for descending pressed state
   * colorDescendingDown - Down arrow color for descending state
   */
  @Prop() readonly colors?: {
    unsorted?: string
    unsortedHover?: string
    unsortedPressed?: string
    ascendingUp?: string
    ascendingDown?: string
    ascendingDownHover?: string
    ascendingDownPressed?: string
    descendingUp?: string
    descendingUpHover?: string
    descendingUpPressed?: string
    descendingDown?: string
  }

  /**
   * Is the icon currently hovered
   * This is used to apply hover styles when the icon is interactive.
   */
  @Prop() readonly isHovered?: boolean

  /**
   * Is the icon currently pressed
   * This is used to apply pressed styles when the icon is interactive.
   */
  @Prop() readonly isPressed?: boolean

  componentDidLoad() {
    if (this.interactive) {
      this.host.addEventListener('mouseenter', this.onMouseEnter)
      this.host.addEventListener('mouseleave', this.onMouseLeave)
      this.host.addEventListener('mousedown', this.onMouseDown)
      this.host.addEventListener('mouseup', this.onMouseUp)
    }
  }

  disconnectedCallback() {
    if (this.interactive) {
      this.host.removeEventListener('mouseenter', this.onMouseEnter)
      this.host.removeEventListener('mouseleave', this.onMouseLeave)
      this.host.removeEventListener('mousedown', this.onMouseDown)
      this.host.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  private defaultColors = {
    unsorted: 'var(--wpp-grey-color-600)',
    unsortedHover: 'var(--wpp-grey-color-800)',
    unsortedPressed: 'var(--wpp-grey-color-800)',
    ascendingUp: 'var(--wpp-grey-color-800)',
    ascendingDown: 'var(--wpp-grey-color-400)',
    ascendingDownHover: 'var(--wpp-grey-color-500)',
    ascendingDownPressed: 'var(--wpp-grey-color-600)',
    descendingUp: 'var(--wpp-grey-color-400)',
    descendingUpHover: 'var(--wpp-grey-color-500)',
    descendingUpPressed: 'var(--wpp-grey-color-600)',
    descendingDown: 'var(--wpp-grey-color-800)',
  }

  private onMouseEnter = () => {
    this.isHoveredState = true
  }

  private onMouseLeave = () => {
    this.isHoveredState = false
    this.isPressedState = false
  }

  private onMouseDown = () => {
    this.isPressedState = true
  }

  private onMouseUp = () => {
    this.isPressedState = false
  }

  private getCurrentState(): TableSortState {
    if (!this.interactive) return 'default'

    const pressed = this.isPressed ?? this.isPressedState
    const hovered = this.isHovered ?? this.isHoveredState

    if (pressed) return 'pressed'
    if (hovered) return 'hover'

    return 'default'
  }

  private readonly colorMap = {
    none: {
      pressed: (c: any) => ({ up: c.unsortedPressed, down: c.unsortedPressed }),
      hover: (c: any) => ({ up: c.unsortedHover, down: c.unsortedHover }),
      default: (c: any) => ({ up: c.unsorted, down: c.unsorted }),
    },
    ascending: {
      pressed: (c: any) => ({ up: c.ascendingUp, down: c.ascendingDownPressed }),
      hover: (c: any) => ({ up: c.ascendingUp, down: c.ascendingDownHover }),
      default: (c: any) => ({ up: c.ascendingUp, down: c.ascendingDown }),
    },
    descending: {
      pressed: (c: any) => ({ up: c.descendingUpPressed, down: c.descendingDown }),
      hover: (c: any) => ({ up: c.descendingUpHover, down: c.descendingDown }),
      default: (c: any) => ({ up: c.descendingUp, down: c.descendingDown }),
    },
  }

  private readonly iconMap = {
    none: {
      pressed: 'wpp-icon-table-sort-pressed',
      hover: 'wpp-icon-table-sort-hover',
      default: 'wpp-icon-table-sort',
    },
    ascending: {
      pressed: 'wpp-icon-table-sort-asc-pressed',
      hover: 'wpp-icon-table-sort-asc-hover',
      default: 'wpp-icon-table-sort-asc',
    },
    descending: {
      pressed: 'wpp-icon-table-sort-desc-pressed',
      hover: 'wpp-icon-table-sort-desc-hover',
      default: 'wpp-icon-table-sort-desc',
    },
  }

  private getArrowColors(direction: SortDirection, state: TableSortState) {
    const c = { ...this.defaultColors, ...(this.colors || {}) }
    const directionMap = this.colorMap[direction] || this.colorMap.none
    const stateHandler = directionMap[state] || directionMap.default

    return stateHandler(c)
  }

  private getIconTag(direction: SortDirection, state: TableSortState): string {
    const directionMap = this.iconMap[direction] || this.iconMap.none

    if (!directionMap) {
      console.warn(`Unknown sort direction: ${direction}. Defaulting to 'none'.`)

      return this.iconMap.none.default
    }

    return directionMap[state] || directionMap.default
  }

  private getIconComponent() {
    const direction = this.direction
    const state = this.getCurrentState()
    const colors = this.getArrowColors(direction, state)
    const iconTag = this.getIconTag(direction, state)

    return h(transformToVersionedTag(iconTag), {
      size: this.size,
      width: this.width,
      height: this.height,
      upArrowColor: colors.up,
      downArrowColor: colors.down,
    })
  }

  render() {
    return <Host>{this.getIconComponent()}</Host>
  }
}
