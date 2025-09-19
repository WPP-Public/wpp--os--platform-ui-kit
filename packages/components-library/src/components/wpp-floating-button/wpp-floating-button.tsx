import { Component, Prop, h, Host, Element, State, Method, Watch } from '@stencil/core'

import { getAriaProps, hasShadowDom } from '../../utils/utils'
import { AriaProps, FOCUS_TYPE } from '../../types/common'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

/**
 * @slot - Icon slot, contains `wpp-icon-plus` by default. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - spinner wrapper element
 * @part spinner - spinner element
 * @part icon-plus - icon plus element
 */
@Component({
  tag: 'wpp-floating-button',
  styleUrl: 'wpp-floating-button.scss',
  shadow: true,
})
export class WppFloatingButton {
  private buttonRef?: HTMLButtonElement

  @Element() host: HTMLWppFloatingButtonElement

  @State() focusType: FOCUS_TYPE

  @State() isPressed: boolean = false

  @State() validAriaProps: Record<string, string> = {}

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If the component is in loading state.
   */
  @Prop({ reflect: true }) readonly loading: boolean = false

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
   */
  @Prop() readonly form?: string

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
   * Defines the button value.
   */
  @Prop() readonly value?: string

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

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
    this.validAriaProps = getAriaProps(this.ariaProps)
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

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB

    if (event.key === 'Enter' || event.key === ' ') {
      this.isPressed = false
    }
  }

  private onBlur = (): void => {
    this.focusType = FOCUS_TYPE.NONE
    this.isPressed = false
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private handleClick = (ev: Event | KeyboardEvent) => {
    if (this.disabled || this.loading) {
      ev.stopPropagation()

      return
    }

    if (hasShadowDom(this.host)) {
      const form = this.host.closest('form')

      if (form) {
        ev.preventDefault()

        const fakeButton = document.createElement('button')

        fakeButton.type = this.type
        fakeButton.style.display = 'none'
        form.appendChild(fakeButton)
        fakeButton.click()
        fakeButton.remove()
      }
    }
  }

  private hostCssClasses = () => ({
    'wpp-floating-button': true,
    'wpp-disabled': this.disabled,
    'wpp-loading': this.loading,
  })

  private buttonCssClasses = () => ({
    button: true,
    loading: this.loading,
    disabled: this.disabled,
    primary: true,
    'tab-focus': this.focusType === 'tab-focus',
    pressed: this.isPressed,
  })

  private loaderCssClasses = () => ({
    loader: true,
  })

  private contentCssClasses = () => ({
    content: true,
    icon: true,
    hide: this.loading,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        onClick={this.handleClick}
        exportparts="button, spinner-wrapper, spinner, icon-plus, ws-wrapper, ws-inner"
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
      >
        <button
          ref={el => (this.buttonRef = el)}
          class={this.buttonCssClasses()}
          autoFocus={this.autoFocus}
          disabled={this.disabled || this.loading}
          form={this.form}
          formAction={this.formAction}
          formEncType={this.formEncType}
          formMethod={this.formMethod}
          formNoValidate={this.formNoValidate}
          formTarget={this.formTarget}
          value={this.value}
          name={this.name}
          type={this.type}
          data-testid="wppFloatingButton"
          aria-pressed={this.isPressed ? 'true' : 'false'}
          {...this.validAriaProps}
          part="button"
        >
          {this.loading && (
            <div class={this.loaderCssClasses()} part="spinner-wrapper">
              <wpp-spinner color={'var(--wpp-grey-color-000)'} part="spinner" />
            </div>
          )}
          <WrappedSlot wrapperClass={this.contentCssClasses()}>
            <wpp-icon-plus class="icon-plus" part="icon-plus" />
          </WrappedSlot>
        </button>
      </Host>
    )
  }
}
