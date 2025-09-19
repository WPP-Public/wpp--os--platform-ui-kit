import { Component, Event, EventEmitter, h, Prop, Host, State } from '@stencil/core'

import { truncate } from '../../../../utils/utils'

import { NavigationItemEventDetail, NavigationState } from '../../types'
import { CONTEXT_ITEM_TAG } from '../../../wpp-menu-context/constants'

const listItemNavStyle: Record<string, string> = {
  '--mc-item-margin': '4px 0',
  '--li-padding': '8px 12px',
  '--li-bg-color-selected': 'var(--wpp-grey-color-300)',
  '--li-left-icon-color-selected': 'var(--wpp-grey-color-600)',
  '--li-label-text-color-selected': 'var(--wpp-text-color)',
  '--li-label-text-font-weight-selected': '400',
}

@Component({
  tag: 'wpp-topbar-item',
  styleUrl: 'wpp-topbar-item.scss',
  shadow: true,
})
export class WppTopbarItem {
  @State() isMenuExpanded = false

  /**
   * Indicates navigation items
   */
  @Prop() readonly navigation: NavigationState

  /**
   * If `true`, the component placed on the first level of topbar
   */
  @Prop({ reflect: true }) readonly firstLevel: boolean = false

  /**
   * If `true`, the component has menu icon
   */
  @Prop({ reflect: true }) readonly menu: boolean = false

  /**
   * If `true`, the component is active
   */
  @Prop({ reflect: true }) readonly active: boolean

  /**
   * Indicates list of values of the items that are active, where each value represents particular navigation item
   */
  @Prop({ mutable: true }) activeItems: string[]

  /**
   * If `true`, the navigation link will be have native behaviour `a` tag.
   * If app using `client side render` you need to leave `nativeLink` false, if `server side render`, then better to use this prop
   * This is not dynamic prop, so in Storybook when change value of this prop, need you to refresh the page
   */
  @Prop() readonly nativeLink: boolean = false

  /**
   * Emitted when topbar item was changed
   */
  @Event({ bubbles: false, composed: false }) wppActiveTopbarItemChange: EventEmitter<NavigationItemEventDetail>

  // @TODO: add property dropdownConfig

  private getEmittedNavigationData = ({ value, path, label }: NavigationState): NavigationItemEventDetail => ({
    value,
    path,
    label,
  })

  private topbarItemClick = () => {
    this.wppActiveTopbarItemChange.emit(this.getEmittedNavigationData(this.navigation))
  }

  private menuItemClick = (e: NavigationItemEventDetail) => {
    this.wppActiveTopbarItemChange.emit(e)
  }

  private getMenuLevelData = (navigationData: NavigationState, firstLevel: boolean) => {
    const truncatedLabel = truncate(navigationData.label, 30)

    if (navigationData.children?.length) {
      return (
        <wpp-menu-context
          listWidth="224px"
          externalClass="topbar"
          dropdownConfig={{
            aria: {
              content: 'labelledby',
            },
            onHide: () => {
              this.isMenuExpanded = false
            },
            onShow: () => {
              this.isMenuExpanded = true
            },
          }}
        >
          {firstLevel ? (
            <wpp-navigation-item
              value={navigationData.value}
              label={truncatedLabel}
              slot="trigger-element"
              extended={true}
              nativeLink={this.nativeLink}
              menu={this.menu}
              menuExpanded={this.isMenuExpanded}
              chevronOnly={navigationData.chevronOnly}
              active={this.menu ? this.active : this.activeItems.includes(navigationData.value)}
            />
          ) : (
            <wpp-list-item
              value={navigationData.value}
              slot="trigger-element"
              isExtended={true}
              checked={this.activeItems.includes(navigationData.value)}
              style={listItemNavStyle}
            >
              <p slot="label">{navigationData.label}</p>
            </wpp-list-item>
          )}
          <div>
            {navigationData.children?.map(navigationItem =>
              navigationItem.children ? (
                this.getMenuLevelData(navigationItem, false)
              ) : (
                <wpp-navigation-item
                  value={navigationItem.value}
                  path={navigationItem.path}
                  label={navigationItem.label}
                  nativeLink={this.nativeLink}
                  nestedItem={true}
                  active={this.activeItems.includes(navigationItem.value)}
                  chevronOnly={navigationData.chevronOnly}
                  onWppActiveNavItemChanged={() => this.menuItemClick(this.getEmittedNavigationData(navigationItem))}
                />
              ),
            )}
          </div>
        </wpp-menu-context>
      )
    }

    return firstLevel ? (
      <wpp-navigation-item
        value={navigationData.value}
        path={navigationData.path}
        label={truncatedLabel}
        nativeLink={this.nativeLink}
        active={this.activeItems.includes(navigationData.value)}
        chevronOnly={navigationData.chevronOnly}
        onWppActiveNavItemChanged={this.topbarItemClick}
      />
    ) : (
      <wpp-list-item
        value={navigationData.value}
        checked={this.activeItems.includes(navigationData.value)}
        style={listItemNavStyle}
      >
        <p slot="label">{navigationData.label}</p>
      </wpp-list-item>
    )
  }

  private hostCssClasses = () => ({
    'wpp-topbar-item': true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} role={CONTEXT_ITEM_TAG}>
        {this.getMenuLevelData(this.navigation, true)}
      </Host>
    )
  }
}
