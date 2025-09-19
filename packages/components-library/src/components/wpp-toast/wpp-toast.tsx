import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Fragment } from '@stencil/core'

import { AriaProps, MessageTypes } from '../../types/common'

import { ButtonState, ToastCompleteDetail, ToastIcon } from './types'
import { ANIMATION_DURATION } from './consts'

import { transformToVersionedTag } from '../../utils/utils'

/**
 * @part body - Main content wrapper
 * @part actions - Action buttons wrapper
 * @part message - Message text
 * @part header - Header text
 * @part info-wrapper - info wrapper element
 * @part action-button - action button element
 * @part icon-start - icon-start element
 * @part icon-wrapper - icon-wrapper element
 */
@Component({
  tag: 'wpp-toast',
  styleUrl: 'wpp-toast.scss',
  shadow: true,
})
export class WppToast {
  private timer: NodeJS.Timeout

  @Element() host: HTMLWppToastElement

  @State() isShown: boolean = false
  @State() isHide: boolean = false
  @State() toastHeight: number
  @State() remainingTime: number
  @State() isMessageFitsWithinSingleLine: boolean
  @State() hasIconSlot: boolean = false
  @State() isHovering: boolean = false

  /**
   * Defines the toast style variant.
   * This property is primarily intended for internal use in the chat component.
   */
  @Prop() readonly variant?: 'default' | 'chat' = 'default'

  /**
   * Defines the toast index.
   */
  @Prop() readonly index?: string

  /**
   * Defines the toast text.
   */
  @Prop() readonly message!: string

  /**
   * Defines the toast header.
   */
  @Prop() readonly header?: string

  /**
   * Defines the toast style based on the available types.
   */
  @Prop() readonly type: Exclude<MessageTypes, 'brand'> = 'error'

  /**
   * Defines for how long the toast is displayed.
   */
  @Prop() readonly duration: number = 5000

  /**
   * Defines the toast primary action button.
   */
  @Prop() readonly primaryBtn?: ButtonState

  /**
   * Defines the toast max message lines, by default it's 3
   */
  @Prop() readonly maxMessageLines?: number = 3

  /**
   * If you only provide the ‘name’ key, you should use an icon from the CL (e.g., ‘wpp-icon-user’).
   * Alternatively, if you provide the ‘URL’ key, you can pass an icon using a URL (e.g., ‘https://avatar/1.jpg’)
   */
  @Prop() readonly icon?: ToastIcon

  /**
   * Contains the `aria-` props of the wpp-action-button.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Emitted when the toast index is displayed.
   */
  @Event({ bubbles: false, composed: false }) wppToastComplete: EventEmitter<ToastCompleteDetail>

  @Watch('header')
  @Watch('message')
  @Watch('maxMessageLines')
  onContentChange() {
    this.checkIfTextHasOneLine()
    this.toastHeight = 0

    setTimeout(() => {
      this.toastHeight = this.host.clientHeight
    }, 0)
  }

  componentWillLoad() {
    this.remainingTime = this.duration
  }
  componentDidLoad() {
    // it's used to add animation to the toast, at first we render component and than we add class that's add move animation
    requestAnimationFrame(() => {
      this.checkIfTextHasOneLine()
      this.toastHeight = this.host.clientHeight
      this.isShown = true
    })

    if (this.duration) {
      this.startTimer()
    }
  }

  disconnectedCallback() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  private startTimer() {
    const interval = 1000

    this.timer = setInterval(() => {
      if (!this.isHovering) {
        if (this.remainingTime <= interval) {
          clearInterval(this.timer)
          this.isHide = true
          setTimeout(() => {
            this.onComplete()
          }, ANIMATION_DURATION)
        } else {
          this.remainingTime -= interval
        }
      }
    }, interval)
  }

  private handleMouseEnter = () => {
    if (this.isIconProvided()) this.isHovering = true
  }

  private handleMouseLeave = () => {
    if (this.isIconProvided()) this.isHovering = false
  }

  private getIconType = (iconType: string) => {
    if (iconType === 'warning') return <wpp-icon-warning width={16} height={16} class="icon" />
    if (iconType === 'error') return <wpp-icon-error width={16} height={16} class="icon" />
    if (iconType === 'information')
      return <wpp-icon-info-message color="var(--wpp-grey-color-700)" width={16} height={16} class="icon" />
    if (iconType === 'success') return <wpp-icon-success width={16} height={16} class="icon" />

    return null
  }

  private handleCloseClick = () => {
    this.isHide = true

    setTimeout(() => {
      this.onComplete()
    }, ANIMATION_DURATION)
  }

  private onComplete = () => {
    this.wppToastComplete.emit({ currentIndex: this.index || '' })
  }

  private checkIfTextHasOneLine = () => {
    const host = this.host.shadowRoot as ShadowRoot
    const message = host.querySelector('.message') as Element
    const lineHeightElement = message?.shadowRoot?.querySelector('.typography') as Element

    if (!lineHeightElement || !message) {
      console.warn('Line height element or message element not found')

      return
    }

    const messageLineHeight = parseFloat(getComputedStyle(lineHeightElement).lineHeight)
    const contentHeight = (host.querySelector('.body') as HTMLDivElement)?.clientHeight || 0

    this.isMessageFitsWithinSingleLine = contentHeight - 10 <= messageLineHeight
  }

  private hostCssClasses = () => ({
    'wpp-toast': true,
    'wpp-toast-wrapper': this.variant !== 'chat',
    'wpp-chat-variant': this.variant === 'chat',
    'wpp-with-header': !!this.header,
    'wpp-with-header-and-without-message': !!this.header && !this.message,
    'wpp-with-multiple-message-lines': !this.isMessageFitsWithinSingleLine,
    'wpp-with-custom-icon': this.isIconProvided(),
    'wpp-visible': this.isShown,
    'wpp-hide': this.isHide,
  })

  private iconWrapperCssClasses = () => ({
    'icon-wrapper': true,
    'logo-wrapper': !!(this.icon && 'url' in this.icon && this.icon.url),
    'custom-icon-wrapper': !!(this.icon && 'name' in this.icon && this.icon.name),
    information: this.type === 'information',
    success: this.type === 'success',
    error: this.type === 'error',
    warning: this.type === 'warning',
  })

  private chatToastWrapper = () => ({
    information: this.type === 'information',
    success: this.type === 'success',
    error: this.type === 'error',
    warning: this.type === 'warning',
    'chat-toast-wrapper': true,
  })

  private renderIcon = () => {
    if (!this.icon) return null

    if ('url' in this.icon && this.icon.url) {
      return <img src={this.icon.url} class="custom-logo" alt="custom-logo" />
    }

    if ('name' in this.icon && this.icon.name) {
      return h(transformToVersionedTag(this.icon.name), { width: 16, height: 16, part: 'icon' })
    }
  }

  private isIconProvided = (): boolean =>
    !!this.icon && (('url' in this.icon && !!this.icon.url) || ('name' in this.icon && !!this.icon.name))

  render() {
    const style = {
      '--mt-height': this.toastHeight ? this.toastHeight + 'px' : '',
      '--mt-show-animation-duration': ANIMATION_DURATION / 1000 + 's',
      '--mt-hide-animation-duration': ANIMATION_DURATION / 1500 + 's',
      '--mt-max-message-lines': this.maxMessageLines + '',
    }

    return (
      <Host
        class={this.hostCssClasses()}
        style={style}
        exportparts="body, message, body, info-wrapper, header, message, actions, action-button, icon-start, icon-wrapper"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        role="alert"
      >
        {this.variant === 'chat' ? (
          <div class={this.chatToastWrapper()}>
            <wpp-typography class="chat-toast-message" type="2xs-strong">
              {this.message}
            </wpp-typography>
          </div>
        ) : (
          <Fragment>
            {this.message && !this.header && (
              <div class="body" part="body">
                <div class={this.iconWrapperCssClasses()} style={this.icon?.styles} part="icon-wrapper">
                  {this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)}
                </div>
                <wpp-typography type="s-body" class="message" part="message">
                  {this.message}
                </wpp-typography>
              </div>
            )}
            {this.header && (
              <div class="body" part="body">
                <div class={this.iconWrapperCssClasses()} style={this.icon?.styles} part="icon-wrapper">
                  {this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)}
                </div>
                <div class="info" part="info-wrapper">
                  <wpp-typography type="s-strong" class="header" part="header">
                    {this.header}
                  </wpp-typography>
                  <wpp-typography type="s-body" class="message" part="message">
                    {this.message}
                  </wpp-typography>
                </div>
              </div>
            )}
            {!!this.primaryBtn && (
              <div class="actions" part="actions">
                {this.primaryBtn && (
                  <wpp-action-button
                    onClick={() => this.primaryBtn?.onClick(this.index || '')}
                    disabled={this.primaryBtn.disabled}
                    loading={this.primaryBtn.loading}
                    variant={this.primaryBtn.variant}
                    ariaProps={this.ariaProps}
                    part="action-button"
                  >
                    {this.primaryBtn.label}
                  </wpp-action-button>
                )}
                <wpp-action-button
                  ariaProps={{ label: 'Remove message' }}
                  variant="inverted"
                  part="action-button"
                  onClick={this.handleCloseClick}
                >
                  <wpp-icon-cross slot="icon-start" part="icon-start" />
                </wpp-action-button>
              </div>
            )}
            {!this.primaryBtn && (
              <div class="actions" part="actions">
                <wpp-action-button
                  ariaProps={{ label: 'Remove message' }}
                  variant="inverted"
                  part="action-button"
                  onClick={this.handleCloseClick}
                >
                  <wpp-icon-cross slot="icon-start" part="icon-start" />
                </wpp-action-button>
              </div>
            )}
          </Fragment>
        )}
      </Host>
    )
  }
}
