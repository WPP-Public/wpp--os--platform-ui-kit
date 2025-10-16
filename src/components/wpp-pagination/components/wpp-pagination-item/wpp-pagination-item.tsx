import { Component, Host, h, State, Prop, Event, EventEmitter } from '@stencil/core'

import { FOCUS_TYPE } from '../../../../types/common'
import { PaginationPageChangeEventDetail } from '../../types'

/**
 * @part number - number text element
 */
@Component({
  tag: 'wpp-pagination-item',
  styleUrl: 'wpp-pagination-item.scss',
  shadow: true,
})
export class WppPaginationItem {
  @State() focusType: FOCUS_TYPE

  /**
   * Indicates current page number
   */
  @Prop() readonly number!: number

  /**
   * If `true`, the component is selected
   */
  @Prop() readonly selected: boolean = false

  /**
   * Emitted active page number
   */
  @Event({ bubbles: false, composed: false }) wppPageChange: EventEmitter<PaginationPageChangeEventDetail>

  private onBlur = () => {
    this.focusType = FOCUS_TYPE.NONE
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB
  }

  private handleClick = () => {
    this.wppPageChange.emit({ page: this.number })
  }

  private hostCssClasses = () => ({
    'wpp-pagination-item': true,
    'pagination-item-wrapper': true,
    selected: this.selected,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        onClick={this.handleClick}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyUp={this.onKeyUp}
        tabIndex={0}
        exportparts="number"
      >
        <wpp-typography type="s-body" part="number">
          {this.number}
        </wpp-typography>
      </Host>
    )
  }
}
