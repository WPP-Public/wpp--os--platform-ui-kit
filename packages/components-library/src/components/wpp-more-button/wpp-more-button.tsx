import { Component, Host, h, Method, Prop, State, Element, Watch } from '@stencil/core'

import { AriaProps, FOCUS_TYPE } from '../../types/common'
import { getAriaProps } from '../../utils/utils'

@Component({
  tag: 'wpp-more-button',
  styleUrl: 'wpp-more-button.scss',
  shadow: true,
})
export class WppMoreButton {
  private buttonRef?: HTMLButtonElement

  @Element() host: HTMLWppMoreButtonElement

  @State() isPressed: boolean = false

  @State() focusType: FOCUS_TYPE

  @State() validAriaProps: Record<string, string> = {}

  /**
   * Defines the button name.
   */
  @Prop() readonly name?: string

  /**
   * Indicates the size of the button. Different sizes have different paddings.
   */
  @Prop({ reflect: true }) readonly size: 's' | 'm' = 'm'

  /**
   * If the button is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If the component is in loading state.
   */
  @Prop({ reflect: true }) readonly loading: boolean = false

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

  private hostCssClasses = () => ({
    'wpp-more-button': true,
    'wpp-disabled': this.disabled,
  })

  private buttonCssClasses = () => ({
    button: true,
    disabled: this.disabled,
    loading: this.loading,
    'tab-focus': this.focusType === 'tab-focus',
    [`size-${this.size}`]: true,
    pressed: this.isPressed,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
      >
        <button
          class={this.buttonCssClasses()}
          disabled={this.disabled || this.loading}
          name={this.name}
          type="button"
          data-testid="wpp-more-button"
          aria-pressed={this.isPressed}
          {...this.validAriaProps}
        >
          {this.loading && !this.disabled ? (
            <wpp-spinner size="s"></wpp-spinner>
          ) : (
            <wpp-icon-more direction={'horizontal'}></wpp-icon-more>
          )}
        </button>
      </Host>
    )
  }
}
