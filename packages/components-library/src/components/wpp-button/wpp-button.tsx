import { Component, Prop, h, Host, Element, State, Method, Event, EventEmitter, Watch } from '@stencil/core'

import { getSlotEmptyStates, closestElement, getAriaProps } from '../../utils/utils'
import { AriaProps, FOCUS_TYPE } from '../../types/common'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

/**
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a plus icon.
 * @slot icon-end - Can contain an icon that will be placed after the main content, e.g. a plus icon. For `wpp-button` with an `aria-expanded="true"` attribute: if you place an arrow icon with the `direction="down"` attribute in this slot, the icon will be rotated.
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - spinner wrapper element
 * @part spinner - spinner element
 * @part text - Main text content
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-button',
  styleUrl: 'wpp-button.scss',
  shadow: true,
})
export class WppButton {
  private buttonRef?: HTMLButtonElement

  @Element() host: HTMLWppButtonElement

  @State() hasIconStartSlot: boolean = false

  @State() hasIconEndSlot: boolean = false

  @State() isIconOnly: boolean = false

  @State() focusType: FOCUS_TYPE

  @State() isPressed: boolean = false

  @State() validAriaProps: Record<string, string> = {}

  /**
   * Defines the button size. Setting this attribute changes the button height and padding.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If the component is in loading state.
   */
  @Prop({ reflect: true }) readonly loading: boolean = false

  /**
   * Defines the button type.
   */
  @Prop() readonly variant: 'primary' | 'secondary' | 'destructive' | 'destructive-secondary' = 'primary'

  /**
   * If the component is inverted.
   * This prop can only be used together with the following variants: "primary" and "secondary".
   */
  @Prop({ reflect: true }) readonly inverted: boolean = false

  /**
   * If the button should be in focus on page load.
   */
  @Prop({ reflect: true }) readonly autoFocus: boolean = false

  /**
   * Defines the button name.
   * */
  @Prop() readonly name?: string

  /**
   * Defines the form to which the button belongs.
   * Accepts id of form or FormElement reference
   */
  @Prop() readonly form?: string | HTMLFormElement

  /**
   * Defines where to send the form-data when the form is submitted. Only for buttons with `type="submit"`.
   */
  @Prop() readonly formAction?: string

  /**
   * Defines how to encode the form-data before sending it to the server. Only for buttons with `type="submit"`.
   */
  @Prop() readonly formEncType?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'

  /**
   * Defines which HTTP method to use when sending the form-data. Only for buttons with `type="submit"`.
   */
  @Prop() readonly formMethod?: 'get' | 'post'

  /**
   * If the form-data is validated after submission. Only for buttons with `type="submit"`.
   */
  @Prop({ reflect: true }) readonly formNoValidate: boolean = false

  /**
   * Defines where to display a response after form submission. Only for buttons with `type="submit"`.
   */
  @Prop() readonly formTarget?: '_self' | '_blank' | '_parent' | '_top'

  /**
   * Defines the button type.
   */
  @Prop() readonly type: 'button' | 'reset' | 'submit' = 'button'

  /**
   * Defines the button value. This property should be used only when the button is placed
   * inside a form.
   */
  @Prop() readonly value?: string

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Emitted when the button loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the button receives focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Method that sets focus on the native button.
   */
  @Method()
  async setFocus(): Promise<void> {
    setTimeout(() => {
      if (this.buttonRef) {
        this.buttonRef.focus()

        this.focusType = FOCUS_TYPE.TAB
      }
    }, 0)
  }

  @Watch('ariaProps')
  onUpdateAriaProps() {
    this.validAriaProps = getAriaProps(this.ariaProps)
  }

  componentWillLoad() {
    this.updateSlotData()
    this.validAriaProps = getAriaProps(this.ariaProps)
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      start: '[slot="icon-start"]',
      end: '[slot="icon-end"]',
    })

    this.hasIconStartSlot = !emptyStates.start
    this.hasIconEndSlot = !emptyStates.end

    const hasSingleIcon = this.hasIconStartSlot !== this.hasIconEndSlot
    const hasMainSlot = !emptyStates.main

    this.isIconOnly = hasSingleIcon && !hasMainSlot
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.NONE
    this.isPressed = false

    this.wppBlur.emit(event)
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB

    if (event.key === 'Enter' || event.key === ' ') {
      this.isPressed = false
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || this.loading) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()

      const clickEvent = new MouseEvent('click', { bubbles: true, composed: true })

      this.host.dispatchEvent(clickEvent)

      this.isPressed = true
    }
  }

  private handleClick = (e: Event | KeyboardEvent) => {
    if (this.disabled || this.loading) {
      e.stopPropagation()

      return
    }

    if (['submit', 'reset'].includes(this.type)) {
      type FormElement = HTMLFormElement | null

      let formEl: FormElement

      if (this.form instanceof HTMLFormElement) {
        formEl = this.form
      } else if (typeof this.form === 'string') {
        formEl = document.getElementById(this.form) as FormElement
      } else {
        formEl = closestElement('form', e.currentTarget as HTMLWppButtonElement) as FormElement
      }

      if (this.type === 'submit') {
        formEl?.requestSubmit()
      } else {
        formEl?.reset()
      }
    }
  }

  private getSpinnerColor = (): string => {
    if (this.inverted && (this.variant === 'primary' || this.variant === 'secondary')) {
      return this.variant === 'primary' ? 'var(--wpp-grey-color-1000)' : 'var(--wpp-grey-color-000)'
    }

    switch (this.variant) {
      case 'secondary':
        return 'var(--wpp-primary-color-500)'
      case 'destructive-secondary':
        return 'var(--wpp-danger-color-500)'
      default:
        return 'var(--wpp-grey-color-000)'
    }
  }

  private hostCssClasses = () => ({
    'wpp-button': true,
    'wpp-disabled': this.disabled,
    'wpp-loading': this.loading,
  })

  private buttonCssClasses = () => ({
    button: true,
    loading: this.loading,
    disabled: this.disabled,
    inverted: this.inverted && (this.variant === 'primary' || this.variant === 'secondary'),
    [`${this.variant}`]: true,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    'with-icon-start': this.hasIconStartSlot,
    'with-icon-end': this.hasIconEndSlot,
    'with-icon-only': this.isIconOnly,
    'size-s': this.size === 's',
    'size-m': this.size === 'm',
    pressed: this.isPressed,
  })

  private iconStartCssClasses = () => ({
    'icon-start': true,
    'slot-hidden': !this.hasIconStartSlot,
  })

  private iconEndCssClasses = () => ({
    'icon-end': true,
    'slot-hidden': !this.hasIconEndSlot,
  })

  private loaderCssClasses = () => ({
    loader: true,
  })

  private contentCssClasses = () => ({
    content: true,
    hide: this.loading,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        onClick={this.handleClick}
        onKeyUp={this.onKeyUp}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onMouseDown={this.onMouseDown}
        exportparts="button, spinner-wrapper, spinner, text, inner, icon-start, icon-end, icon-start-wrapper, icon-end-wrapper"
      >
        <button
          ref={el => (this.buttonRef = el)}
          class={this.buttonCssClasses()}
          autoFocus={this.autoFocus}
          disabled={this.disabled || this.loading}
          formAction={this.formAction}
          formEncType={this.formEncType}
          formMethod={this.formMethod}
          formNoValidate={this.formNoValidate}
          formTarget={this.formTarget}
          value={this.value}
          name={this.name}
          type={this.type}
          part="button"
          data-testid="wppButton"
          aria-pressed={this.isPressed ? 'true' : 'false'}
          {...this.validAriaProps}
        >
          {this.loading && (
            <div class={this.loaderCssClasses()} part="spinner-wrapper">
              <wpp-spinner color={this.getSpinnerColor()} part="spinner" />
            </div>
          )}
          <div class={this.contentCssClasses()}>
            <WrappedSlot
              wrapperClass={this.iconStartCssClasses()}
              name="icon-start"
              onSlotchange={this.updateSlotData}
            />
            <span class="truncate" part="text">
              <slot onSlotchange={this.updateSlotData} part="inner" />
            </span>
            <WrappedSlot wrapperClass={this.iconEndCssClasses()} name="icon-end" onSlotchange={this.updateSlotData} />
          </div>
        </button>
      </Host>
    )
  }
}
