import { Component, h, Host, Prop, Element, EventEmitter, Event, Listen, Watch } from '@stencil/core'

import { transformToVersionedTag } from '../../utils/utils'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

import { NavSidebarItemEventDetail } from './types'

/**
 * @slot - May contain only the `wpp-nav-sidebar-item` component. The default slot, without the name attribute.
 *
 * @part nav-sidebar - Sidebar navigation wrapper
 * @part body - Main content wrapper
 */
@Component({
  tag: 'wpp-nav-sidebar',
  styleUrl: 'wpp-nav-sidebar.scss',
  shadow: true,
})
export class WppNavSidebar {
  @Element() host: HTMLWppNavSidebarElement

  /**
   * Defines the initial current path.
   * @deprecated initialPath is being deprecated and will be deleted in v4.0.0. Use `activePath` instead.
   */
  @Prop() readonly initialPath?: string

  /**
   * Defines the current active path. Input any valid path that matches the `path` property of the sidebar items. Invalid values will have no effect and will not change the active item.
   * @remarks Use this property to programmatically set the active item in the navigation sidebar.
   */
  @Prop() readonly activePath?: string

  /**
   * If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected.
   */
  @Prop() readonly nativeLink: boolean = false

  /**
   * Emitted when app routes change, return object like { path: '/home', label: 'Home' }
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<NavSidebarItemEventDetail>

  @Watch('activePath')
  handleActivePathChange(newValue: string) {
    this.setActiveItem(newValue)
  }

  @Listen('wppClickSidebarItem', { capture: true })
  handleItemClick(event: CustomEvent<NavSidebarItemEventDetail>) {
    event.stopPropagation()
    this.setActiveItem(event.detail.path)
    this.closeExpandedItemOnItemClick()
    this.wppChange.emit(event.detail)
  }

  @Listen('wppClickExpandedItem', { capture: true })
  handleExpandedClick(event: CustomEvent<NavSidebarItemEventDetail>) {
    event.stopPropagation()
    this.closeInactiveExpandedItem(event.detail.label)
  }

  componentWillLoad() {
    const initialPath = this.activePath || this.initialPath

    this.setActiveItem(initialPath)
    this.calculateOsBarHeight()
  }

  private calculateOsBarHeight = () => {
    const headerElement = document.querySelector('.wpp > header') as HTMLElement | null

    if (!headerElement) return
    const headerHeight = `${headerElement?.getBoundingClientRect().height ?? 0}px`

    this.host.style.setProperty('--wpp-nav-sidebar-top-position', headerHeight)
  }

  private closeExpandedItemOnItemClick = () => {
    const expandedList = this.host.querySelectorAll<HTMLWppNavSidebarItemElement>(
      `${transformToVersionedTag('wpp-nav-sidebar-item')}[expanded]:not([expanded=false])`,
    )

    expandedList.forEach(item => {
      if (item && !item.active) {
        item.removeAttribute('expanded')
      }
    })
  }

  private closeInactiveExpandedItem = (label: string) => {
    const expandedList = this.host.querySelectorAll<HTMLWppNavSidebarItemElement>(
      `${transformToVersionedTag('wpp-nav-sidebar-item')}[expanded]`,
    ) as NodeListOf<HTMLWppNavSidebarItemElement>

    expandedList.forEach(item => {
      if (item.extended && item.label !== label) {
        item.removeAttribute('expanded')
      }
    })
  }

  private setActiveItem = (path?: string) => {
    let lastExtendedItem: HTMLWppNavSidebarItemElement | null = null

    this.host
      .querySelectorAll<HTMLWppNavSidebarItemElement>(transformToVersionedTag('wpp-nav-sidebar-item'))
      .forEach(item => {
        item.setAttribute('native-link', `${this.nativeLink}`)
        if (item.extended) lastExtendedItem = item

        if (path && item.path === path) {
          item.setAttribute('active', `${true}`)

          if (item.nestedItem) {
            lastExtendedItem?.setAttribute('active', `${true}`)
            lastExtendedItem?.setAttribute('expanded', `${true}`)
          }
        } else {
          item.removeAttribute('active')
          item.removeAttribute('expanded')
        }
      })
    lastExtendedItem = null
  }

  private asideCssClasses = () => ({
    'nav-sidebar': true,
    open: true,
  })

  private hostCssClasses = () => ({
    'wpp-nav-sidebar': true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="nav-sidebar, body, header-wrapper, header, ws-wrapper, ws-inner">
        <aside class={this.asideCssClasses()} part="nav-sidebar">
          <div class="nav-wrapper" part="body">
            <WrappedSlot wrapperClass="title-wrapper" name="header" />
            <WrappedSlot wrapperClass="items-wrapper" />
          </div>
        </aside>
      </Host>
    )
  }
}
