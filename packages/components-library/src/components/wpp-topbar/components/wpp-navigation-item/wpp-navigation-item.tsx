import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core'

import { CONTEXT_ITEM_TAG, MENU_BAR_ROLE } from '../../../wpp-menu-context/constants'

import { NavigationItemEventDetail } from '../../types'

@Component({
  tag: 'wpp-navigation-item',
  styleUrl: 'wpp-navigation-item.scss',
  shadow: true,
})
export class WppNavigationItem {
  /**
   * Indicates navigation item label
   */
  @Prop({ reflect: true }) readonly menuExpanded: boolean = false

  /**
   * Indicates navigation item label
   */
  @Prop() readonly label?: string

  /**
   * Indicates navigation item value
   */
  @Prop() readonly value: string

  /**
   * Indicates navigation item path
   */
  @Prop() readonly path?: string

  /**
   * If `true`, the navigation item is nested item in list context, don't need to pass this prop, it pass automatically from Topbar component
   */
  @Prop() readonly nestedItem: boolean = false

  /**
   * If `true`, the component is active
   */
  @Prop({ reflect: true }) readonly active: boolean = false

  /**
   * If `true`, the component has only icon menu with nested items
   */
  @Prop({ reflect: true }) readonly menu: boolean = false

  /**
   * If `true`, the component has nested items
   */
  @Prop({ reflect: true, mutable: true }) extended: boolean = false

  /**
   * If `true`, the component will render only a chevron icon without label.
   */
  @Prop({ reflect: true }) readonly chevronOnly: boolean = false

  /**
   * If `true`, the navigation link will be have native behaviour `a` tag.
   * If app using `client side render` you need to leave `nativeLink` false, if `server side render`, then better to use this prop
   * This is not dynamic prop, so in Storybook when change value of this prop, need you to refresh the page
   */
  @Prop() readonly nativeLink: boolean = false

  /**
   * Emitted when navigation item was clicked
   */
  @Event({ bubbles: false, composed: false }) wppActiveNavItemChanged: EventEmitter<NavigationItemEventDetail>

  private onClick = (event: Event) => {
    if (this.nativeLink) return
    event.preventDefault()
    this.wppActiveNavItemChanged.emit({ path: this.path, value: this.value, label: this.label })
  }

  private navItemCssClasses = () => ({
    'navigation-item-wrapper': true,
    extended: this.extended,
    active: this.active,
    menu: this.menu,
    'with-menu-expanded': this.menuExpanded,
    'chevron-only': this.chevronOnly,
  })

  private hostCssClasses = () => ({
    'wpp-navigation-item': true,
    'wpp-list-item-wrapper': this.nestedItem,
  })

  private linkItem = () => (
    <a href={this.path} class="link" onClick={this.onClick} tabIndex={-1}>
      <div class={this.navItemCssClasses()}>
        <wpp-typography
          type={this.nestedItem ? 's-body' : 's-midi'}
          class={{ 'label-text': true, 'nested-text': this.nestedItem }}
        >
          {this.label}
        </wpp-typography>
      </div>
    </a>
  )

  private listItem = () => (
    <li class="list-item" part="list-item">
      {this.linkItem()}
    </li>
  )

  private menuItem = () => (
    <div class={this.navItemCssClasses()}>
      <wpp-icon-more direction="horizontal" class="menu-icon" />
    </div>
  )

  private extendedItem = () => (
    <div class={this.navItemCssClasses()}>
      {!this.chevronOnly && (
        <wpp-typography type="s-midi" class="label-text">
          {this.label}
        </wpp-typography>
      )}
      <wpp-icon-chevron direction="down" color="var(--wpp-grey-color-600)" class="chevron-icon" part="chevron-icon" />
    </div>
  )

  private renderItem = () => {
    if (this.menu) {
      return this.menuItem()
    }

    if (this.extended) {
      return this.extendedItem()
    }

    if (this.nestedItem) {
      return this.listItem()
    }

    return this.linkItem()
  }

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        role={this.extended ? MENU_BAR_ROLE : CONTEXT_ITEM_TAG}
        tabIndex={0}
        exportparts="list-item, chevron-icon"
      >
        {this.renderItem()}
      </Host>
    )
  }
}
