import { Component, h, Host, Prop, Element, Fragment, Event, EventEmitter, Watch, State } from '@stencil/core'

import { NavSidebarItemEventDetail } from '../../types'
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'

import { getSlotEmptyStates, transformToVersionedTag, truncate } from '../../../../utils/utils'

import { tooltipConfig } from '../../config'

/**
 * @slot icon-start - May contain an icon that will be placed before the main content, e.g. a plus icon
 * @slot icon-end - May contain an icon that will be placed after the main content, e.g. a plus icon
 * @slot - Should contain `wpp-navigation-sidebar-item` if first level item need to have sub items. The default slot, without the name attribute.
 *
 * @part label - Label text element
 * @part icon-chevron - icon chevron element
 * @part extended-item - extended item element
 * @part link-item - link item element
 * @part tooltip - tooltip wrapper content
 * @part title - title text element
 * @part divider - divider element
 */

@Component({
  tag: 'wpp-nav-sidebar-item',
  styleUrl: 'wpp-nav-sidebar-item.scss',
  shadow: true,
})
export class WppNavSidebarItem {
  @Element() host: HTMLWppNavSidebarItemElement

  @State() hasIconStartSlot: boolean = false

  /**
   * If `true`, navigation item expanded
   */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = false

  /**
   * If `true`, navigation item should have sub items
   */
  @Prop({ reflect: true }) readonly extended: boolean = false

  /**
   * Indicates max title length for item with sub items
   */
  @Prop() readonly maxTitleLengthWithSubItems: number = 15

  /**
   * Indicates max title length for item without sub items
   */
  @Prop() readonly maxTitleLengthWithoutSubItems: number = 21

  /**
   * Indicates navigation item label
   */
  @Prop({ reflect: true }) readonly label: string

  /**
   * Indicates navigation item path
   */
  @Prop({ reflect: true }) readonly path: string

  /**
   * Indicates navigation item group title
   */
  @Prop({ reflect: true }) readonly groupTitle: string

  /**
   * Indicates navigation item is sub items, this prop don't need to pass in item, it pass automaticly from Navigation sidebar component
   */
  @Prop({ reflect: true }) readonly nestedItem: boolean = false

  /**
   * If `true`, show divide line in item
   */
  @Prop({ reflect: true }) readonly divide: boolean = false

  /**
   * If `true`, item active
   */
  @Prop({ reflect: true }) readonly active: boolean = false

  /**
   * If `true`, the navigation link will be have native behaviour `a` tag.
   * If app using `client side render` you need to leave `nativeLink` false, if `server side render`, then better to use this prop
   * This is not dynamic prop, so in Storybook when change value of this prop, need you to refresh the page
   */
  @Prop() readonly nativeLink: boolean

  /**
   * Specifies where to open the linked document.
   * Allows all valid values for the native "target" attribute: _self, _blank, _parent, _top, etc.
   *
   * _self: The current browsing context. (Default)
   * _blank: Usually a new tab, but users can configure browsers to open a new window instead.
   * _parent: The parent browsing context of the current one. If no parent, behaves as _self.
   * _top: The topmost browsing context. To be specific, this means the "highest" context that's an ancestor of the current one. If no ancestors, behaves as _self.
   */
  @Prop({ reflect: true }) readonly target?: string

  /**
   * Emitted when the item path changes, return object like { path: '/home', label: 'Home' }
   */
  @Event({ bubbles: false, composed: false }) wppClickSidebarItem: EventEmitter<NavSidebarItemEventDetail>

  /** @internal */
  @Event({ bubbles: false, composed: false }) wppClickExpandedItem: EventEmitter<NavSidebarItemEventDetail>

  componentWillLoad() {
    this.updateSlotData()
  }

  componentDidLoad() {
    this.host.querySelectorAll(transformToVersionedTag('wpp-nav-sidebar-item')).forEach(item => {
      item.setAttribute('nested-item', `${true}`)
      item.setAttribute('tabIndex', String(this.expanded ? 0 : -1))
    })
  }

  @Watch('expanded')
  handleExpandedChange(newValue: boolean) {
    this.host.querySelectorAll(transformToVersionedTag('wpp-nav-sidebar-item')).forEach(item => {
      item.setAttribute('tabIndex', String(newValue ? 0 : -1))
    })
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      iconStart: '[slot="icon-start"]',
    })

    this.hasIconStartSlot = !emptyStates.iconStart
  }

  private handleClickLinkItem = (event: MouseEvent) => {
    if (this.nativeLink) return
    event.preventDefault()
    this.wppClickSidebarItem.emit({ label: this.label, path: this.path })
  }

  private handleClickExpandedItem = () => {
    if (!this.extended) return
    this.wppClickExpandedItem.emit({ label: this.label, path: this.path })
    this.expanded = !this.expanded
  }

  private navigationWrapperCssClasses = () => ({
    item: true,
    expanded: this.expanded,
    active: this.active,
    nested: this.nestedItem,
    'without-icon-start': !this.hasIconStartSlot,
  })

  private labelCssClasses = () => ({
    label: true,
    open: true,
    'nested-label': this.nestedItem,
    'open-nested-label': this.nestedItem,
  })

  private iconEndCssClasses = () => ({ 'icon-end-wrapper': true, 'icon-wrapper': true })

  private subItemWrapperCssClasses = () => ({
    'sub-items-wrapper': true,
    expanded: this.expanded,
  })

  private hostCssClasses = () => ({
    'wpp-nav-sidebar-item': true,
  })

  private item = () => {
    const currentMaxLengthLabel = this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems
    const isNeedTruncate = this.label.length > currentMaxLengthLabel

    return (
      <Fragment>
        <WrappedSlot
          name="icon-start"
          wrapperClass="icon-wrapper"
          class="slot-icon-start-fallback"
          onSlotchange={this.updateSlotData}
        />
        <p class={this.labelCssClasses()} part="label">
          {isNeedTruncate
            ? truncate(this.label, this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems)
            : this.label}
        </p>
        <WrappedSlot name="icon-end" wrapperClass={this.iconEndCssClasses()} class="slot-icon-end-fallback">
          {this.extended && <wpp-icon-chevron class="extended-icon" size="m" part="icon-chevron" />}
        </WrappedSlot>
      </Fragment>
    )
  }

  private extendedItem = () => (
    <div class={this.navigationWrapperCssClasses()} onClick={this.handleClickExpandedItem} part="extended-item">
      {this.item()}
    </div>
  )

  private linkItem = () => (
    <a
      class={this.navigationWrapperCssClasses()}
      href={this.path}
      onClick={this.handleClickLinkItem}
      target={this.target}
      tabIndex={-1}
      part="link-item"
    >
      {this.item()}
    </a>
  )

  private renderSubItemsWrapper = () => <WrappedSlot wrapperClass={this.subItemWrapperCssClasses()} />

  private renderItemWithTooltip = () => (
    <wpp-tooltip text={this.label} config={tooltipConfig} part="tooltip">
      {this.extended ? this.extendedItem() : this.linkItem()}
    </wpp-tooltip>
  )

  private renderItem = () => {
    const currentMaxLengthLabel = this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems
    const isNeedToTruncate = this.label.length > currentMaxLengthLabel
    const isRenderItemWithTruncateTextWithTooltip = isNeedToTruncate

    if (isRenderItemWithTruncateTextWithTooltip) {
      return (
        <Fragment>
          {this.renderItemWithTooltip()}
          {this.renderSubItemsWrapper()}
        </Fragment>
      )
    }

    return (
      <Fragment>
        {this.extended ? this.extendedItem() : this.linkItem()}
        {this.renderSubItemsWrapper()}
      </Fragment>
    )
  }

  render() {
    let hostProps: { tabIndex?: number } = {}

    if (!this.nestedItem) {
      hostProps = { ...hostProps, tabIndex: 0 }
    }

    return (
      <Host
        class={this.hostCssClasses()}
        {...hostProps}
        exportparts="label, icon-chevron, extended-item, link-item, tooltip, title, divider, icon-start, icon-end, ws-inner, icon-start, icon-end, ws-wrapper"
      >
        {this.groupTitle && (
          <p class="group-title" part="title">
            {this.groupTitle}
          </p>
        )}
        {this.renderItem()}
        {this.divide && <wpp-divider class="slot-divider-fallback" part="divider" />}
      </Host>
    )
  }
}
