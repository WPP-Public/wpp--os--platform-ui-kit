import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core'

import { DropdownConfig, FOCUS_TYPE, MessageTypes } from '../../types/common'
import { debounce } from '../../utils/utils'
import { InlineMessageLocalesType } from './types'
import { LOCALES_DEFAULTS } from './const'

/**
 * @part message-block - Wrapper around the icon and message.
 *
 * @part message-icon - message icon element
 * @part message-block - message block element
 * @part message - message element
 * @part wrapper - component wrapper element
 * @part tooltip - tooltip wrapper content
 */

@Component({
  tag: 'wpp-inline-message',
  styleUrl: 'wpp-inline-message.scss',
  shadow: true,
})
export class WppInlineMessage {
  @Element() host: HTMLWppInlineMessageElement

  @State() isTruncated = false

  @State() hasTitle = false

  @State() focusType: FOCUS_TYPE

  private messageRef?: HTMLSpanElement | HTMLDivElement
  private resizeObserver: ResizeObserver
  private _locales: InlineMessageLocalesType = LOCALES_DEFAULTS

  /**
   * Defines the title of the component. This prop is available only for inline-messages with size="l".
   */
  @Prop() readonly titleText: string = ''

  /**
   * Defines the text of the action button. This prop is available only for inline-messages with size="l".
   */
  @Prop() readonly actionBtnText: string = ''

  /**
   * Defines the inline message.
   */
  @Prop() readonly message: string = ''

  /**
   * Defines the inline message style based on the available types.
   */
  @Prop() readonly type: MessageTypes

  /**
   * Defines the inline message size.
   */
  @Prop() readonly size: 's' | 'm' | 'l' = 's'

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly tooltipConfig: DropdownConfig = {}

  /**
   * Controls message truncation behavior. When set to a number, limits visible characters to that value.
   * When set to 'auto' (default), truncates based on input width. In both cases, full message appears in tooltip when truncated.
   */
  @Prop({ mutable: true }) readonly showTooltipFrom: number | 'auto' = 'auto'

  /**
   * If `true`, the close button on the right of the container for the inline-message with size='l' will not be displayed.
   */
  @Prop() readonly hideCloseBtn: boolean = false

  /**
   * Defines the component locale types.
   */
  @Prop() readonly locales: Partial<InlineMessageLocalesType> = {}

  /**
   * Emitted when the action button is clicked. This event is emitted only for the inline-messages with size="l".
   */
  @Event({ bubbles: false, composed: false }) wppClickActionBtn: EventEmitter<void>

  /**
   * Emitted when the close button is clicked. This event is emitted only for the inline-messages with size="l".
   */
  @Event({ bubbles: false, composed: false }) wppClickCloseBtn: EventEmitter<void>

  @Watch('titleText')
  onUpdateTitleText() {
    this.hasTitle = this.size === 'l' && this.titleText.length > 0
  }

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<InlineMessageLocalesType>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales }
    this.hasTitle = this.size === 'l' && this.titleText.length > 0
  }

  componentDidLoad() {
    this.setupResizeObserver()

    requestAnimationFrame(() => {
      this.checkTruncation()
    })
  }

  disconnectedCallback() {
    if (this.resizeObserver) this.resizeObserver.disconnect()
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(
      debounce(() => {
        this.checkTruncation()
      }, 50),
    )

    if (this.resizeObserver) this.resizeObserver.observe(this.host)
  }

  private checkTruncation() {
    const messageSpan = (this.host?.shadowRoot as ShadowRoot).querySelector('.message') as HTMLElement

    if (!messageSpan) return
    this.isTruncated = messageSpan.clientWidth < messageSpan.scrollWidth
  }

  private getMessage = () => {
    if (this.showTooltipFrom === 'auto') return this.message

    this.isTruncated = this.message.length > this.showTooltipFrom

    return this.isTruncated ? this.message.substring(0, this.showTooltipFrom) + ' ...' : this.message
  }

  private onBlur = () => {
    this.focusType = FOCUS_TYPE.NONE
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab' && this.host.shadowRoot?.activeElement === this.messageRef) this.focusType = FOCUS_TYPE.TAB
  }

  private inlineMessageWrapperCssClasses = () => ({
    'inline-message-wrapper': true,
    [`size-${this.size}`]: true,
    [`${this.type}-message`]: !!this.type,
  })

  private messageBlockCssClasses = () => ({
    'message-block': true,
    truncated: this.isTruncated,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    'tooltip-maxlength-auto': this.showTooltipFrom === 'auto',
  })

  private hostCssClasses = () => ({
    'wpp-inline-message': true,
    [`wpp-${this.type}`]: !!this.type,
    [`wpp-size-${this.size}`]: true,
  })

  private messageCssClasses = () => ({
    message: true,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  private titleCssClasses = () => ({
    title: true,
  })

  private getMessageTypesIcons = () => {
    if (this.type === 'warning') return <wpp-icon-warning class="left-icon" part="message-icon" role="presentation" />
    if (this.type === 'error') return <wpp-icon-error class="left-icon" part="message-icon" role="presentation" />
    if (this.type === 'information')
      return (
        <wpp-icon-info-message
          color="var(--wpp-grey-color-700)"
          class="left-icon"
          part="message-icon"
          role="presentation"
        />
      )
    if (this.type === 'success') return <wpp-icon-success class="left-icon" part="message-icon" role="presentation" />

    return null
  }

  private handleClickClose = () => {
    const wrapper = this.host.shadowRoot?.querySelector('[part="wrapper"]')

    if (wrapper) {
      const wrapperEl = wrapper as HTMLElement

      wrapperEl.style.display = 'none'
    }

    this.wppClickCloseBtn.emit()
  }

  private handleClickActionBtn = () => {
    this.wppClickActionBtn.emit()
  }

  private getContainerContentCssClasses = () => ({
    'container-content': true,
    'no-title': !this.hasTitle,
  })

  private renderContent = () => {
    const message = this.getMessage()

    return this.size === 'l' ? (
      <div class="container" part="container">
        <div class={this.getContainerContentCssClasses()}>
          {this.getMessageTypesIcons()}
          <div class="content-wrapper">
            <wpp-typography class={this.titleCssClasses()} tag="h4" type="m-strong" part="title">
              {this.titleText}
            </wpp-typography>
            <div class="container-body">
              {this.isTruncated ? (
                <wpp-tooltip
                  class="tooltip"
                  text={this.message}
                  config={{ placement: 'bottom', triggerTarget: this.messageRef, ...this.tooltipConfig }}
                  part="tooltip"
                >
                  <span
                    ref={ref => (this.messageRef = ref)}
                    class={this.messageCssClasses()}
                    tabIndex={0}
                    part="message"
                    onBlur={this.onBlur}
                  >
                    {message}
                  </span>
                </wpp-tooltip>
              ) : (
                <span class="message" part="message">
                  {message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div class="container-actions">
          {this.actionBtnText.length > 0 && (
            <wpp-action-button
              part="action-btn"
              class="action-btn"
              variant="secondary"
              onClick={this.handleClickActionBtn}
            >
              {this.actionBtnText}
            </wpp-action-button>
          )}
          {!this.hideCloseBtn && (
            <wpp-action-button
              class="close-btn"
              ariaProps={{ label: this._locales.close }}
              variant="secondary"
              onClick={this.handleClickClose}
            >
              <wpp-icon-cross color="var(--ab-secondary-text-color)" size="m" />
            </wpp-action-button>
          )}
        </div>
      </div>
    ) : this.isTruncated ? (
      <wpp-tooltip text={this.message} config={{ placement: 'bottom', ...this.tooltipConfig }} part="tooltip">
        <div
          class={this.messageBlockCssClasses()}
          part="message-block"
          ref={ref => (this.messageRef = ref)}
          onBlur={this.onBlur}
          tabIndex={0}
        >
          {this.getMessageTypesIcons()}
          <span class="message" part="message">
            {message}
          </span>
        </div>
      </wpp-tooltip>
    ) : (
      <div class={this.messageBlockCssClasses()} part="message-block">
        {this.getMessageTypesIcons()}
        <span class="message" part="message">
          {message}
        </span>
      </div>
    )
  }

  private getExportParts = () => {
    let defaultParts = 'wrapper, message-icon, message'

    if (this.size === 'l') {
      this.isTruncated ? (defaultParts += ',tooltip') : (defaultParts += '')

      defaultParts += ', container, title, action-btn'
    } else {
      this.isTruncated ? (defaultParts += ',tooltip, message-block') : (defaultParts += ', message-block')
    }

    return defaultParts
  }

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        onBlur={this.onBlur}
        onKeyUp={this.onKeyUp}
        exportparts={this.getExportParts()}
      >
        <div class={this.inlineMessageWrapperCssClasses()} part="wrapper">
          {this.renderContent()}
        </div>
      </Host>
    )
  }
}
