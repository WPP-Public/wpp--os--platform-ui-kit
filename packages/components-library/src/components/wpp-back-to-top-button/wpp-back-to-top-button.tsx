import { Component, Prop, h, Host, Element, State, Method, Watch } from '@stencil/core'

import { getAriaProps } from '../../utils/utils'
import { AriaProps, FOCUS_TYPE } from '../../types/common'

/**
 * @part button - Button element
 * @part icon - Icon element
 */
@Component({
  tag: 'wpp-back-to-top-button',
  styleUrl: 'wpp-back-to-top-button.scss',
  shadow: true,
})
export class WppBackToTopButton {
  private buttonRef?: HTMLButtonElement

  @Element() host: HTMLWppBackToTopButtonElement

  @State() focusType: FOCUS_TYPE

  @State() isPressed: boolean = false

  @State() validAriaProps: Record<string, string> = {}

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {
    label: 'Back to top',
  }

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
    if (this.focusType === FOCUS_TYPE.NONE) return

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

  private hostCssClasses = () => ({
    'wpp-back-to-top-button': true,
  })

  private buttonCssClasses = () => ({
    'tab-focus': this.focusType === 'tab-focus',
    pressed: this.isPressed,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="button, icon"
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
      >
        <button
          ref={el => (this.buttonRef = el)}
          onBlur={this.onBlur}
          class={this.buttonCssClasses()}
          type="button"
          part="button"
          data-testid="wppBackToTopButton"
          aria-pressed={this.isPressed ? 'true' : 'false'}
          {...this.validAriaProps}
        >
          <wpp-icon-arrow direction="top" class="icon" part="icon" />
        </button>
      </Host>
    )
  }
}
