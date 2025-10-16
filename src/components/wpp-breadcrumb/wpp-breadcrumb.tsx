import { Component, Element, Event, EventEmitter, Fragment, h, Host, JSX, Prop } from '@stencil/core'

import { truncate, uuidv4 } from '../../utils/utils'
import { DropdownConfig } from '../../types/common'

import { BreadcrumbItemState, BreadcrumbItemEventDetails } from './types'

/**
 * @part item-text - item text element
 * @part item-tooltip - item tooltip element
 * @part menu - menu context element
 * @part menu-item - menu item element
 * @part menu-item-label - menu item label text element
 * @part icon-more - icon more element
 * @part slash - slash element
 */
@Component({
  tag: 'wpp-breadcrumb',
  styleUrl: 'wpp-breadcrumb.scss',
  shadow: true,
})
export class WppBreadcrumb {
  private readonly maxItems: number = 5

  @Element() host: HTMLWppBreadcrumbElement

  /**
   * Defines an array of breadcrumb items.
   */
  @Prop() readonly items: BreadcrumbItemState[] = []

  /**
   * Defines the maximum label length (in characters) of a single item.
   */
  @Prop() readonly maxLabelLength: number = 30

  /**
   * If the alternative truncation mode is enabled (items are truncated evenly with an ellipsis in the middle of the title).
   */
  @Prop() readonly middleTruncation: boolean = false

  /**
   * If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected.
   */
  @Prop() readonly nativeLink: boolean = false

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  /**
   * If provided, renders a back button with the specified label instead of the breadcrumb.
   * If undefined, renders the default breadcrumb.
   */
  @Prop() readonly backBtnLabel?: string

  /**
   * Emitted when route changes, return object like { path: '/home', label: 'Home' }
   * For back variant, emits { path: 'back', label: backBtnLabel }
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<BreadcrumbItemEventDetails>

  private get rootItem(): BreadcrumbItemState | null {
    return this.items[0] ?? null
  }

  private get hiddenItems(): BreadcrumbItemState[] {
    if (this.items.length > this.maxItems) {
      return this.items.slice(1, this.items.length - this.maxItems + 2)
    }

    return []
  }

  private get visibleItems(): BreadcrumbItemState[] {
    return this.items.slice(this.hiddenItems.length + 1)
  }

  // Required for `wpp-menu-context` re-initialization
  private get hiddenItemsSnapshot(): string {
    return this.hiddenItems.map(({ path }) => path).join('|')
  }

  private createRouteChangeTrigger(item: BreadcrumbItemState): (event: Event) => void {
    this.host.blur()

    return (event: Event) => {
      if (this.nativeLink) return

      event.preventDefault()
      this.wppChange.emit({ path: item.path, label: item.label })
    }
  }

  private createItemElement(item: BreadcrumbItemState, isActive: boolean = false): JSX.Element {
    const truncatedLabel = truncate(item.label, this.maxLabelLength, this.middleTruncation)

    if (isActive) {
      return (
        <wpp-tooltip
          text={item.label}
          part="item-tooltip"
          config={{
            onShow: () => {
              if (item.label.length < this.maxLabelLength) return false
            },
          }}
        >
          <span class="active item" tabIndex={-1} part="item-text">
            {truncatedLabel}
          </span>
        </wpp-tooltip>
      )
    } else if (item.label.length > this.maxLabelLength && !this.nativeLink) {
      return (
        <wpp-tooltip text={item.label} part="item-tooltip">
          <span class="item" onClick={this.createRouteChangeTrigger(item)} tabIndex={0} part="item-text">
            {truncatedLabel}
          </span>
        </wpp-tooltip>
      )
    } else if (item.label.length > this.maxLabelLength) {
      return (
        <wpp-tooltip text={item.label} part="item-tooltip">
          <a href={item.path} class="item" onClick={this.createRouteChangeTrigger(item)} tabIndex={0} part="item-text">
            {truncatedLabel}
          </a>
        </wpp-tooltip>
      )
    } else if (!this.nativeLink) {
      return (
        <span class="item" onClick={this.createRouteChangeTrigger(item)} tabIndex={0} part="item-text">
          {item.label}
        </span>
      )
    } else {
      return (
        <a href={item.path} class="item" onClick={this.createRouteChangeTrigger(item)} part="item-text">
          {item.label}
        </a>
      )
    }
  }

  private createMenuElement(item: BreadcrumbItemState): JSX.Element {
    if (this.nativeLink) {
      return (
        <wpp-list-item key={uuidv4()} class="link" linkConfig={{ href: item.path }} part="menu-item">
          <span slot="label" part="menu-item-label">
            {item.label}
          </span>
        </wpp-list-item>
      )
    } else {
      return (
        <wpp-list-item key={uuidv4()} class="link" part="menu-item" onClick={this.createRouteChangeTrigger(item)}>
          <span slot="label" part="menu-item-label">
            {item.label}
          </span>
        </wpp-list-item>
      )
    }
  }

  private handleBackClick = (event: Event) => {
    event.preventDefault()
    this.wppChange.emit({ path: 'back', label: this.backBtnLabel! })
  }

  private handleBackKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.handleBackClick(event)
    }
  }

  private hostCssClasses = () => ({
    'wpp-breadcrumb': true,
  })

  render() {
    if (this.backBtnLabel) {
      return (
        <Host class={this.hostCssClasses()} exportparts="icon">
          <button
            class="back"
            onClick={this.handleBackClick}
            onKeyDown={this.handleBackKeyDown}
            type="button"
            tabIndex={0}
          >
            <wpp-icon-chevron class="back-icon-chevron" part="icon" direction="left" size="s" />
            <span class="back-label">{this.backBtnLabel}</span>
          </button>
        </Host>
      )
    }

    if (!this.rootItem) {
      return
    }

    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="item-tooltip, item-text, menu-item, menu-item-label, slash, menu, icon-more, slash"
      >
        {this.createItemElement(this.rootItem)}

        {this.hiddenItems.length > 0 && (
          <Fragment>
            <div class="slash" part="slash">
              /
            </div>
            <wpp-menu-context
              key={this.hiddenItemsSnapshot}
              class="menu"
              dropdownConfig={{ triggerElementWidth: false, ...this.dropdownConfig }}
              tabIndex={0}
              part="menu"
            >
              <wpp-icon-more class="menu-trigger" direction="horizontal" slot="trigger-element" part="icon-more" />

              <div key={this.hiddenItemsSnapshot}>{this.hiddenItems.map(item => this.createMenuElement(item))}</div>
            </wpp-menu-context>
          </Fragment>
        )}

        {this.visibleItems.map((item, index, items) => (
          <Fragment>
            <div class="slash" tabIndex={-1} part="slash">
              /
            </div>
            {this.createItemElement(item, index === items.length - 1)}
          </Fragment>
        ))}
      </Host>
    )
  }
}
