import { Component, Host, h, Prop, Event, EventEmitter, State } from '@stencil/core'

import { PaginationPageChangeEventDetail, PaginatonSelectTabElements } from '../../types'
import { FOCUS_TYPE } from '../../../../types/common'

interface FocusType {
  'left-chevron': FOCUS_TYPE
  'right-chevron': FOCUS_TYPE
  input: FOCUS_TYPE
}

const getInitFocusInfo = (): FocusType => ({
  'left-chevron': FOCUS_TYPE.NONE,
  'right-chevron': FOCUS_TYPE.NONE,
  input: FOCUS_TYPE.NONE,
})

/**
 * @part input - Pagination input element
 * @part icon-left - icon left element
 * @part page-select - page select wrapper element
 * @part page-item - page item element
 * @part page-numeric - page numeric wrapper element
 * @part divider - divider element
 * @part total - total text element
 * @part icon-right - icon right element
 */
@Component({
  tag: 'wpp-pagination-select',
  styleUrl: 'wpp-pagination-select.scss',
  shadow: true,
})
export class WppPaginationSelect {
  @State() focusType: FocusType = getInitFocusInfo()

  /**
   * Defines the total number of items.
   */
  @Prop() readonly count!: number

  /**
   * Defines a threshold for pages to display. When the number of pages to display exceeds this value, the component displays a numeric selector instead of the page list.
   */
  @Prop() readonly pageSelectThreshold: number = 8

  /**
   * Defines the active page number.
   */
  @Prop({ reflect: true, mutable: true }) activePageNumber: number = 1

  /**
   * Emitted active page number
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<PaginationPageChangeEventDetail>

  private getPageItems = () => Array.from({ length: this.count }, (_, i) => i + 1)

  private getUpdatedFocusInfo = (type: PaginatonSelectTabElements, updateValue: FOCUS_TYPE): FocusType => ({
    ...this.focusType,
    [type]: updateValue,
  })

  private onBlur = (type: PaginatonSelectTabElements) => {
    this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.NONE)
  }

  private onMouseDown = (type: PaginatonSelectTabElements) => {
    this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.MOUSE)
  }

  private onKeyUp = (event: KeyboardEvent, type: PaginatonSelectTabElements) => {
    if (event.key === 'Tab') {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB)
    }
  }

  private handlePageNumberChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const inputValue = Math.round(Number(target.value))

    this.activePageNumber = Math.max(1, Math.min(this.count, inputValue))
    target.value = String(this.activePageNumber)

    this.wppChange.emit({ page: this.activePageNumber })
  }

  private handlePageClick = (e: CustomEvent<PaginationPageChangeEventDetail>) => {
    this.activePageNumber = e.detail.page

    this.wppChange.emit({ page: this.activePageNumber })
  }

  private handleLeftArrowClick = () => {
    this.activePageNumber = Math.max(this.activePageNumber - 1, 1)

    this.wppChange.emit({ page: this.activePageNumber })
  }

  private handleRightArrowClick = () => {
    this.activePageNumber = Math.min(this.activePageNumber + 1, this.count)

    this.wppChange.emit({ page: this.activePageNumber })
  }

  private leftArrowCssClasses = () => ({
    'icon-start': true,
    disabled: this.activePageNumber === 1,
    [this.focusType['left-chevron']]: true,
  })

  private rightArrowCssClasses = () => ({
    'icon-end': true,
    disabled: this.activePageNumber === this.count,
    [this.focusType['right-chevron']]: true,
  })

  private hostCssClasses = () => ({
    'wpp-pagination-select': true,
    'pagination-select-wrapper': true,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="icon-left, page-select, page-item, page-numeric, input, divider, total, icon-right"
      >
        <wpp-icon-chevron
          class={this.leftArrowCssClasses()}
          onClick={() => this.handleLeftArrowClick()}
          tabIndex={this.activePageNumber === 1 ? -1 : 0}
          onBlur={() => this.onBlur('left-chevron')}
          onMouseDown={() => this.onMouseDown('left-chevron')}
          onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'left-chevron')}
          part="icon-left"
        />

        {this.count <= this.pageSelectThreshold ? (
          <div class="page-select" part="page-select">
            {this.getPageItems().map(page => (
              <wpp-pagination-item
                number={page}
                selected={this.activePageNumber === page}
                part="page-item"
                onWppPageChange={this.handlePageClick}
              />
            ))}
          </div>
        ) : (
          <div class="page-numeric" part="page-numeric">
            <input
              type="number"
              class={{ 'input-page': true, [this.focusType['input']]: true }}
              value={this.activePageNumber}
              onChange={this.handlePageNumberChange}
              onInput={() => (this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE))}
              onBlur={() => this.onBlur('input')}
              onMouseDown={() => this.onMouseDown('input')}
              onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'input')}
              part="input"
              title=""
            />
            <wpp-divider part="divider" />
            <div class="total-pages" part="total">
              {this.count}
            </div>
          </div>
        )}

        <wpp-icon-chevron
          class={this.rightArrowCssClasses()}
          onClick={() => this.handleRightArrowClick()}
          onBlur={() => this.onBlur('right-chevron')}
          onMouseDown={() => this.onMouseDown('right-chevron')}
          onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'right-chevron')}
          tabIndex={this.activePageNumber === this.count ? -1 : 0}
          part="icon-right"
        />
      </Host>
    )
  }
}
