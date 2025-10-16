import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core'

import { DropdownConfig } from '../../types/common'

import { SelectChangeEventDetail } from '../wpp-select/types'

import { PaginationChangeEventDetail, PaginationPageChangeEventDetail, PaginationLocales } from './types'
import { LOCALES_DEFAULTS } from './const'

/**
 * @part body - Main content wrapper
 * @part per-page-label - per-page label text element
 * @part pre-page-select - per-page select element
 * @part per-page-item - per-page item element
 * @part divider - divider element
 * @part range - pagination range text element
 * @part page-select - page select element
 */
@Component({
  tag: 'wpp-pagination',
  styleUrl: 'wpp-pagination.scss',
  shadow: true,
})
export class WppPagination {
  private _locales: PaginationLocales = LOCALES_DEFAULTS

  /**
   * Defines the total number of items.
   */
  @Prop() readonly count!: number

  /**
   * Defines the menu items.
   */
  @Prop() readonly itemsPerPage: number[] = [5, 10, 20, 50]

  /**
   * Defines a menu item that serves as the initial value.
   */
  @Prop({ mutable: true }) selectedItemPerPage?: number

  /**
   * Defines a threshold for pages to display. When the number of pages to display exceeds this value, the component displays a numeric selector instead of the page list.
   */
  @Prop() readonly pageSelectThreshold: number = 8

  /**
   * Defines the active page number.
   */
  @Prop({ reflect: true, mutable: true }) activePageNumber: number = 1

  /**
   * Dropdown config, under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly dropdownConfig: DropdownConfig = {}

  /**
   * Indicates locales for pagination component
   */
  @Prop() readonly locales: Partial<PaginationLocales> = {}

  /**
   * Emitted when selected page or number of items per page changes
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<PaginationChangeEventDetail>

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<PaginationLocales>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales }

    if (!this.selectedItemPerPage) {
      this.selectedItemPerPage = this.itemsPerPage[0]
      this.wppChange.emit({ page: this.activePageNumber, itemsPerPage: this.selectedItemPerPage })
    }
  }

  private handleItemsPerPageNumberChange = (e: CustomEvent<SelectChangeEventDetail>) => {
    this.activePageNumber = 1
    this.selectedItemPerPage = Number(e.detail.value)

    this.wppChange.emit({
      page: this.activePageNumber,
      itemsPerPage: this.selectedItemPerPage,
    })
  }

  private handleSelectedPageChange = (e: CustomEvent<PaginationPageChangeEventDetail>) => {
    this.activePageNumber = e.detail.page

    this.wppChange.emit({
      page: this.activePageNumber,
      itemsPerPage: Number(this.selectedItemPerPage),
    })
  }

  private getPageRange = () => {
    if (this.selectedItemPerPage) {
      const min = (this.activePageNumber - 1) * this.selectedItemPerPage + 1
      const max = Math.min(this.activePageNumber * this.selectedItemPerPage, this.count)
      const totalPages = this.count

      return `${min}-${max} ${this._locales.of} ${totalPages} ${this._locales.items}`
    }
  }

  private hostCssClasses = () => ({
    'wpp-pagination': true,
    'wpp-pagination-wrapper': true,
  })

  render() {
    const countPagesToDisplay = Math.ceil(this.count / (this.selectedItemPerPage as number))

    if (this.count === 0) {
      return null
    }

    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="body, per-page-label, pre-page-select, per-page-item, divider, range, page-select"
      >
        <div class="control-pagination-wrapper" part="body">
          <wpp-typography type="s-body" part="per-page-label">
            {this._locales.itemsPerPage}:
          </wpp-typography>
          <wpp-select
            type="single"
            isTextSelect
            onWppChange={this.handleItemsPerPageNumberChange}
            value={this.selectedItemPerPage}
            dropdownConfig={{ ...this.dropdownConfig }}
            dropdownWidth="100px"
            part="pre-page-select"
            list={this.itemsPerPage.map(item => ({
              value: item,
              label: `${item}`,
              part: 'per-page-item',
            }))}
          ></wpp-select>
          <wpp-divider part="divider" />
          <wpp-typography type="s-body" part="range">
            {this.getPageRange()}
          </wpp-typography>
        </div>

        {countPagesToDisplay && (
          <wpp-pagination-select
            count={countPagesToDisplay}
            pageSelectThreshold={this.pageSelectThreshold}
            onWppChange={this.handleSelectedPageChange}
            activePageNumber={this.activePageNumber}
            part="page-select"
          />
        )}
      </Host>
    )
  }
}
