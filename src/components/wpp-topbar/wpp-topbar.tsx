import { Component, Host, h, Prop, Element, State, Event, EventEmitter, Watch } from '@stencil/core'

import { getSlotEmptyStates } from '../../utils/utils'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

import { NavigationState, TopbarChangeEventDetail } from './types'
import { Z_INDEX } from '../../common/consts'

/**
 * @slot app - May contain descriptive app data (e.g., icon, name, and so on)
 *
 * @part wrapper - Wrapper element
 * @part navigation - Navigation items
 * @part body - Main content wrapper
 * @part topbar-item - topbar item wrapper element
 * @part divider - divider element
 */
@Component({
  tag: 'wpp-topbar',
  styleUrl: 'wpp-topbar.scss',
  shadow: true,
})
export class WppTopbar {
  private resizeObserver: ResizeObserver

  @Element() host: HTMLWppTopbarElement

  @State() truncated: boolean = false

  @State() itemsToShow: number

  @State() hasAppSlot: boolean = false

  @State() hasRightSlot: boolean = false

  @State() activeItems: string[] = []

  @State() topbarItemsWidth: number[] = []

  /**
   * Defines the navigation items, e.g. `navigation=[{ label: 'Home', value: 'home' }]`
   */
  @Prop() readonly navigation!: NavigationState[]

  /**
   * Defines the initially active topbar item.
   */
  @Prop() readonly value: string

  /**
   * If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected.
   */
  @Prop() readonly nativeLink: boolean = false

  /**
   * Defines the z-index of the WppTopbar.
   */
  @Prop() readonly zIndex: number = Z_INDEX.TOPBAR

  /**
   * Emitted when topbar item was changed, return object like { value: 'home', path: '/home', label: 'Home' }
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<TopbarChangeEventDetail>

  // @TODO: add property dropdownConfig

  @Watch('navigation')
  navigationChanged(newNavigation: NavigationState[]) {
    this.itemsToShow = newNavigation.length

    setTimeout(() => {
      this.getItemsWidth()
      this.getDisplayData()
    }, 40) // 40 ms have been added to display the topbar correctly in safari, firefox.
  }

  @Watch('value')
  valueChanged(newValue: string) {
    const tree = {
      children: this.navigation,
    } as NavigationState

    requestAnimationFrame(() => {
      const data = this.findInTree(newValue, tree)

      if (data.path) {
        this.activeItems = data.path ? data.path.filter(item => item) : []
      } else {
        this.activeItems = []
      }
    })
  }

  private getItemsWidth = () => {
    const navigationItemsElement = (this.host.shadowRoot as ShadowRoot).querySelector('.navigation')

    const topbarItems = (navigationItemsElement as Element)?.querySelectorAll<HTMLWppTopbarItemElement>(
      '.wpp-topbar-item:not([is-menu])',
    )

    if (!topbarItems) return

    this.topbarItemsWidth = Array.from(topbarItems).map(item =>
      Math.ceil(
        Number(getComputedStyle(item).width?.replace('px', '')) + parseInt(getComputedStyle(item)?.marginRight),
      ),
    )
  }

  private findInTree(value: string, tree: NavigationState) {
    if (tree.value === value) {
      const path = [tree.value]

      return { result: tree, path }
    } else {
      const treeChildren = tree.children || []

      for (const child of treeChildren) {
        const tmp: { result?: NavigationState; path?: string[] } = this.findInTree(value, child)

        if (Object.keys(tmp).length !== 0 && tmp.path) {
          tmp.path.unshift(tree.value)

          return tmp
        }
      }

      return {}
    }
  }

  private getDisplayData = () => {
    const menuWidth = 32
    const appWrapperWidth = ((this.host.shadowRoot as ShadowRoot).querySelector('[part="app-wrapper"]') as Element)
      ?.clientWidth

    let width = appWrapperWidth + menuWidth
    let amount = 0

    const headerWidth = ((this.host.shadowRoot as ShadowRoot).querySelector('.header') as Element)?.clientWidth

    while (amount < this.navigation.length && width + this.topbarItemsWidth[amount] < headerWidth) {
      width += this.topbarItemsWidth[amount]
      amount++
    }

    this.truncated = amount < this.navigation.length
    this.itemsToShow = amount
  }

  private topbarItemClick = (e: CustomEvent) => {
    this.wppChange.emit(e.detail)
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      app: '[slot="app"]',
      right: '[slot="right"]',
    })

    this.hasAppSlot = !emptyStates.app
    this.hasRightSlot = !emptyStates.right
  }

  componentWillLoad() {
    this.itemsToShow = this.navigation.length
    this.updateSlotData()
    this.valueChanged(this.value)
  }

  componentDidLoad() {
    requestAnimationFrame(() => {
      this.getItemsWidth()
      this.getDisplayData()

      if (this.resizeObserver) {
        this.resizeObserver.observe(this.host)
      }
    })

    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.getItemsWidth()
        this.getDisplayData()
      })
    })
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  private wrapperCssClasses = () => ({
    wrapper: true,
  })

  private headerCssClasses = () => ({
    header: true,
    'with-app': this.hasAppSlot,
    'without-application': !this.hasAppSlot,
  })

  private navigationCssClasses = () => ({
    navigation: true,
    hidden: this.topbarItemsWidth.length === 0,
  })

  private hostCssClasses = () => ({
    'wpp-topbar': true,
  })

  render() {
    const hiddenNavigation = {
      children: this.navigation.slice(this.itemsToShow),
    } as NavigationState

    const isMenuActive = !!hiddenNavigation.children?.find(item => this.activeItems.includes(item.value))

    return (
      <Host
        class={this.hostCssClasses()}
        style={{ zIndex: this.zIndex.toString() }}
        exportparts="wrapper, body, navigation, topbar-item, divider, app, right, app-wrapper, right-wrapper"
      >
        <div class={this.wrapperCssClasses()} part="wrapper">
          <wpp-grid container={true}>
            <wpp-grid item={true} all={24}>
              <div class={this.headerCssClasses()} part="body">
                <WrappedSlot
                  wrapperClass={{ 'slot-hidden': !this.hasAppSlot }}
                  name="app"
                  onSlotchange={this.updateSlotData}
                />
                <nav class={this.navigationCssClasses()} key={this.itemsToShow} part="navigation">
                  {this.navigation.slice(0, this.itemsToShow).map(navigation => (
                    <wpp-topbar-item
                      navigation={navigation}
                      firstLevel={true}
                      active={navigation.active}
                      onWppActiveTopbarItemChange={this.topbarItemClick}
                      activeItems={this.activeItems}
                      nativeLink={this.nativeLink}
                      part="topbar-item"
                    />
                  ))}
                  {this.truncated && (
                    <wpp-topbar-item
                      key={this.value}
                      navigation={hiddenNavigation}
                      firstLevel={true}
                      menu={true}
                      active={isMenuActive}
                      onWppActiveTopbarItemChange={this.topbarItemClick}
                      activeItems={this.activeItems}
                      nativeLink={this.nativeLink}
                      part="topbar-item"
                    />
                  )}
                </nav>
                <WrappedSlot
                  wrapperClass={{ 'slot-hidden': !this.hasRightSlot }}
                  name="right"
                  onSlotchange={this.updateSlotData}
                />
              </div>
            </wpp-grid>
          </wpp-grid>
        </div>

        <wpp-divider part="divider" />
      </Host>
    )
  }
}
