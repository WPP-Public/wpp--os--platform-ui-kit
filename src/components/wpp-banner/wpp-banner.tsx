import { Component, Host, h, Prop, State, Element, Event, EventEmitter } from '@stencil/core'

import { getSlotEmptyStates } from '../../utils/utils'
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'
import { AriaProps, BannerTypes } from '../../types/common'

import { BannerChangeEventDetail } from './types'
import { Z_INDEX } from '../../common/consts'

/**
 * @slot - Contains the main text content. This is the default slot, without the name attribute. Use only plain text or a `<span>` with plain text to maintain consistent styling and functionality.
 * @slot actions - Can contain action buttons.
 *
 * @part left-icon - left-icon element
 * @part wrapper - component wrapper element
 * @part body - Main content wrapper
 * @part content-wrapper - content wrapper element
 * @part message - message element
 * @part actions-wrapper - actions wrapper element
 * @part close-button - close button element
 * @part close-icon - close icon element
 * @part actions-wrapper - actions slot wrapper
 * @part actions-inner - actions slot
 */

@Component({
  tag: 'wpp-banner',
  styleUrl: 'wpp-banner.scss',
  shadow: true,
})
export class WppBanner {
  private resizeObserver: ResizeObserver
  private messageText: string

  @Element() host: HTMLWppBannerElement

  @State() hasActionsSlot: boolean = false

  @State() heightBanner: number

  @State() isOverflowing: boolean = false

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Role of the banner component.
   */
  @Prop() readonly role: string = 'alert'

  /**
   * If the banner is displayed.
   */
  @Prop({ mutable: true, reflect: true }) show: boolean = false

  /**
   * If the banner can be closed.
   */
  @Prop() readonly closable: boolean = false

  /**
   * Defines the banner style based on the available types.
   */
  @Prop() readonly type: BannerTypes

  /**
   * Defines the z-index of the WppBanner.
   */
  @Prop() readonly zIndex: number = Z_INDEX.BANNER

  /**
   * Emitted when the banner state changes.
   */
  @Event({ bubbles: false, composed: false }) wppClose: EventEmitter<BannerChangeEventDetail>

  componentWillLoad() {
    this.updateSlotData()
    this.updateMessageText()

    setTimeout(() => {
      this.heightBanner = (this.host.shadowRoot as ShadowRoot).querySelector('.banner-wrapper')!.clientHeight
    }, 0)
  }

  componentDidLoad() {
    const contentWrapper = (this.host.shadowRoot as ShadowRoot).querySelector('.content-wrapper') as HTMLDivElement

    this.resizeObserver = new ResizeObserver(() => {
      this.updateOverflowState()
    })

    if (this.resizeObserver) {
      this.resizeObserver.observe(contentWrapper)
    }
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  private updateOverflowState = () => {
    requestAnimationFrame(() => {
      const messageSpan = (this.host.shadowRoot as ShadowRoot).querySelector('.message') as HTMLSpanElement

      this.isOverflowing = messageSpan.scrollWidth > messageSpan.clientWidth
    })
  }

  private updateMessageText = () => {
    this.messageText = ''

    this.host.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        this.messageText += (node.textContent as string).trim() + ' '
      } else if (node.nodeType === Node.ELEMENT_NODE && !(node as HTMLElement).hasAttribute('slot')) {
        this.messageText += (node.textContent as string).trim() + ' '
      }
    })

    this.messageText = this.messageText.trim()
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      actions: '[slot="actions"]',
    })

    this.hasActionsSlot = !emptyStates.actions
  }

  private handleCloseIconClick = () => {
    this.show = false

    this.wppClose.emit({
      show: this.show,
    })
  }

  private messageWrapperCssClasses = () => ({
    message: true,
  })

  private tooltipCSSClasses = () => ({
    'with-tooltip': true,
  })

  private actionsCssClasses = () => ({
    actions: true,
    'slot-hidden': !this.hasActionsSlot,
  })

  private bannerWrapperCssClasses = () => ({
    'banner-wrapper': true,
    [this.type]: true,
    show: this.show,
  })

  private hiddenBannerWrapperCssClasses = () => ({
    'hidden-banner-wrapper': true,
    [this.type]: true,
    show: this.show,
  })

  private hostCssClasses = () => ({
    'wpp-banner': true,
  })

  private getMessageTypesIcons = () => {
    if (this.type === 'warning') return <wpp-icon-warning class="left-icon" part="left-icon" />
    if (this.type === 'information') return <wpp-icon-info-message class="left-icon" part="left-icon" />

    return null
  }

  render() {
    const style = {
      '--banner-height': this.heightBanner + 'px',
      zIndex: this.zIndex.toString(),
    }

    const messageWrapper = (
      <WrappedSlot
        wrapperClass={this.messageWrapperCssClasses()}
        part="message"
        onSlotchange={this.updateMessageText}
      />
    )

    return (
      <Host
        style={style}
        class={this.hostCssClasses()}
        role={this.role}
        aria-label={this.ariaProps.label || 'banner'}
        exportparts="left-icon, wrapper, body, content-wrapper, message, actions-wrapper, close-button, close-icon, actions, actions-wrapper"
      >
        <div class={this.hiddenBannerWrapperCssClasses()} part="wrapper">
          <div class={this.bannerWrapperCssClasses()} part="body">
            <div class="content-wrapper" part="content-wrapper">
              {this.getMessageTypesIcons()}
              {!this.isOverflowing ? (
                messageWrapper
              ) : (
                <wpp-tooltip text={this.messageText} class={this.tooltipCSSClasses()}>
                  {messageWrapper}
                </wpp-tooltip>
              )}
            </div>
            <div class="actions-wrapper" part="actions-wrapper">
              <WrappedSlot
                wrapperClass={this.actionsCssClasses()}
                name="actions"
                onSlotchange={this.updateSlotData}
                role="presentation"
              />
              {this.closable && (
                <wpp-action-button
                  variant={this.type === 'information' ? 'inverted' : 'secondary'}
                  onClick={this.handleCloseIconClick}
                  class="close-button"
                  part="close-button"
                  ariaProps={{ label: 'close banner' }}
                  role="presentation"
                >
                  <wpp-icon-cross slot="icon-start" part="close-icon" aria-hidden="true" />
                </wpp-action-button>
              )}
            </div>
          </div>
        </div>
      </Host>
    )
  }
}
