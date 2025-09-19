import { Component, Host, h, Prop, Event, EventEmitter, Watch, State, Element, Listen, Fragment } from '@stencil/core'
import { StickyBarButtonItem, StickyBarTabItem, StickyBarVariants, VisibilityClasses } from './types'
import {
  DEFAULT_SCROLL_TRESHOLD,
  INITIAL_BUTTONS_LIST_VALUE,
  MAXIMUM_ACTION_BUTTONS,
  MAXIMUM_PRIMARY_BUTTONS,
  MAXIMUM_SECONDARY_BUTTONS,
  MULTIPLE_ACTION_BUTTONS_ERROR,
  MULTIPLE_PRIMARY_BUTTONS_ERROR,
  TOO_MANY_SECONDARY_BUTTONS_ERROR,
} from './consts'
import { TabsChangeEventDetail } from '../wpp-tabs/types'
import { WppTabsCustomEvent } from '../../components'
import { Z_INDEX } from '../../common/consts'

/**
 * @slot content - Should contain the content for the sticky bar. This slot is available only for the following variants: 'two-lines' and 'blank'
 */

@Component({
  tag: 'wpp-sticky-bar',
  styleUrl: 'wpp-sticky-bar.scss',
  shadow: true,
})
export class WppStickyBar {
  @State() visibility: VisibilityClasses = ''

  @State() scrollDirection: 'up' | 'down' = 'down'

  @State() currentTab: string = ''

  @State() currentSize: 'm' | 's' = 'm'

  @State() buttonsList: Array<StickyBarButtonItem | null> = []

  @Element() host: HTMLWppStickyBarElement

  /**
   * The variant of the sticky-bar. The default value is 'one-line'
   */
  @Prop() readonly variant: StickyBarVariants = 'one-line'

  /**
   * The title on the sticky bar.
   */
  @Prop() readonly barTitle: string

  /**
   * The offset from the top edge of the screen. In most cases, this shouldn't be used, as the sticky-bar
   * searches for the os-bar and places itself right below it. Use this just when the sticky-bar
   * does not find the os-bar.
   */
  @Prop() readonly offsetFromTop?: number = undefined

  /**
   * The zIndex of the sticky bar. The default value is 890 such that it hides below the os-bar.
   */
  @Prop() readonly zIndex: number = Z_INDEX.STICKY_BAR

  /**
   * If the sticky bar has the back button (on the left of the title).
   * By default, the back button is shown.
   */
  @Prop() readonly withBackButton: boolean = true

  /**
   * The distance in pixels after which the sticky bar will become visible.
   * The default value is 200px.
   */
  @Prop() readonly scrollTreshold: number = DEFAULT_SCROLL_TRESHOLD

  /**
   * The configuration of the buttons. Based on this array with config items, buttons are placed on the sticky bar.
   * There can be at most 1 primary button, at most 2 secondary buttons and at most 1 action button.
   */
  @Prop() readonly buttons: StickyBarButtonItem[] = []

  /**
   * The configuration of the tabs. Based on this array with config items, tabs are placed on the sticky bar.
   * This prop can only be used with the "two-lines-with-tabs" variant.
   */
  @Prop() readonly tabs: StickyBarTabItem[] = []

  /**
   * Emitted when the back icon is clicked (icon on the left of the title).
   */
  @Event({ bubbles: false, composed: false }) readonly wppClickBackIcon: EventEmitter<void>

  /**
   * Emitted when one of the buttons provided in the "buttons" list is clicked. This event
   * contains the details of the StickyBarButtonItem provided to the array.
   */
  @Event({ bubbles: false, composed: false }) readonly wppClickBtn: EventEmitter<StickyBarButtonItem>

  /**
   * Emitted when one of the tabs provided in the "tabs" list is clicked. This event
   * contains the details of the tab item clicked.
   */
  @Event({ bubbles: false, composed: false }) readonly wppClickTab: EventEmitter<StickyBarTabItem>

  @Watch('buttons')
  updateButtons() {
    this.getButtonsList()
  }

  @Watch('tabs')
  updateTabs(newValue: StickyBarTabItem[]) {
    if (newValue.length > 0) {
      if (!newValue.find((tabItem: StickyBarTabItem) => tabItem.value === this.currentTab)) {
        this.currentTab = newValue[0].value
      }
    } else {
      this.currentTab = ''
    }
  }

  @Watch('offsetFromTop')
  updateOffset(newValue: number) {
    this.host.style.setProperty('--wpp-sticky-bar-offset-top', `${newValue}px`)
  }

  @Listen('scroll', { target: 'window' })
  handleScroll() {
    this.visibility = window.scrollY > this.scrollTreshold ? `visible` : `invisible`
  }

  componentWillLoad() {
    if (this.buttons.length > 0) {
      this.getButtonsList()
    }

    if (this.tabs.length > 0) {
      this.currentTab = this.tabs[0].value
    }

    if (this.zIndex) {
      this.host.style.zIndex = `${this.zIndex}`
    }
  }

  componentDidLoad() {
    if (!this.offsetFromTop) {
      setTimeout(() => {
        this.getHeightOfOsBar()
      }, 0)
    } else {
      this.host.style.setProperty('--wpp-sticky-bar-offset-top', `${this.offsetFromTop}px`)
    }
  }

  private getHeightOfOsBar = () => {
    const appContainer = document.body.querySelector('div.wpp')

    if (appContainer) {
      const headerEl = appContainer.querySelector(':scope > header')

      this.host.style.setProperty('--wpp-sticky-bar-offset-top', `${headerEl ? headerEl.clientHeight : 0}px`)
    }
  }

  private getButtonsList = () => {
    let primaryBtns: number = 0
    let secondaryBtns: number = 0
    let actionBtns: number = 0
    const buttonsListProxy: Array<StickyBarButtonItem | null> = [...INITIAL_BUTTONS_LIST_VALUE]

    this.buttons.forEach((buttonItem: StickyBarButtonItem) => {
      switch (buttonItem.variant) {
        case 'primary': {
          primaryBtns++

          if (primaryBtns > MAXIMUM_PRIMARY_BUTTONS) {
            throw new Error(MULTIPLE_PRIMARY_BUTTONS_ERROR)
          }

          buttonsListProxy[3] = buttonItem
          break
        }
        case 'secondary': {
          secondaryBtns++

          if (secondaryBtns > MAXIMUM_SECONDARY_BUTTONS) {
            throw new Error(TOO_MANY_SECONDARY_BUTTONS_ERROR)
          }

          buttonsListProxy[3 - secondaryBtns] = buttonItem
          break
        }
        default: {
          actionBtns++

          if (actionBtns > MAXIMUM_ACTION_BUTTONS) {
            throw new Error(MULTIPLE_ACTION_BUTTONS_ERROR)
          }

          buttonsListProxy[0] = buttonItem
          break
        }
      }
    })

    this.buttonsList = buttonsListProxy
  }

  private handleLeftIconClick = () => {
    this.wppClickBackIcon.emit()
  }

  private handleButtonClick = (btnIndex: number) => {
    this.wppClickBtn.emit(this.buttonsList[btnIndex] || undefined)
  }

  private handleTabClick = (event: WppTabsCustomEvent<TabsChangeEventDetail>) => {
    this.currentTab = event.detail.value
    this.wppClickTab.emit(this.tabs.find((tabItem: StickyBarTabItem) => tabItem.value === event.detail.value))
  }

  private hostCssClasses = () => ({
    'wpp-sticky-bar': true,
    [`wpp-${this.variant}`]: true,
    [`wpp-${this.visibility}`]: true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()}>
        <div class="container">
          {this.variant === 'blank' ? (
            <slot name="content"></slot>
          ) : (
            <Fragment>
              <div class="header">
                <div class="left-area">
                  {this.withBackButton && (
                    <wpp-action-button variant="secondary" onClick={this.handleLeftIconClick}>
                      <wpp-icon-chevron slot="icon-start" direction="left" />
                    </wpp-action-button>
                  )}

                  <wpp-typography class="bar-title" type={'m-strong'}>
                    {this.barTitle}
                  </wpp-typography>
                </div>
                <div class="right-area">
                  {this.buttonsList.map((buttonItem: StickyBarButtonItem | null, btnIndex: number) => {
                    if (!buttonItem) return null

                    if (buttonItem.variant === 'action-button') {
                      return (
                        <wpp-action-button
                          key={buttonItem.text}
                          onClick={() => this.handleButtonClick(btnIndex)}
                          variant="primary"
                        >
                          {buttonItem.text}
                        </wpp-action-button>
                      )
                    }

                    return (
                      <wpp-button
                        size="s"
                        onClick={() => this.handleButtonClick(btnIndex)}
                        key={buttonItem.text}
                        variant={buttonItem.variant}
                      >
                        {buttonItem.text}
                      </wpp-button>
                    )
                  })}
                </div>
              </div>
              {this.variant !== 'one-line' && (
                <div class="body">
                  {this.variant === 'two-lines' ? (
                    <slot name="content"></slot>
                  ) : (
                    this.tabs.length > 0 && (
                      <wpp-tabs size="s" onWppChange={this.handleTabClick} value={this.currentTab}>
                        {this.tabs.map((tabItem: StickyBarTabItem) => (
                          <wpp-tab size="s" key={tabItem.value} value={tabItem.value}>
                            {tabItem.text}
                          </wpp-tab>
                        ))}
                      </wpp-tabs>
                    )
                  )}
                </div>
              )}
            </Fragment>
          )}
        </div>
      </Host>
    )
  }
}
