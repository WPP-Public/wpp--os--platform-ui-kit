import { Component, Prop, h, Host, Element, State, Method, Watch } from '@stencil/core'

import { getAriaProps } from '../../utils/utils'
import { AriaProps, FOCUS_TYPE } from '../../types/common'

/**
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part icon - Icon element
 * @part text - Main text content
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-sort-button',
  styleUrl: 'wpp-sort-button.scss',
  shadow: true,
})
export class WppSortButton {
  private buttonRef?: HTMLButtonElement

  @Element() host: HTMLWppSortButtonElement

  @State() focusType: FOCUS_TYPE

  @State() isPressed: boolean = false

  @State() validAriaProps: Record<string, string> = {}

  /**
   * Defines the button name.
   */
  @Prop() readonly name?: string

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If the button should be in focus on page load.
   */
  @Prop({ reflect: true }) readonly autoFocus: boolean = false

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
    if (this.disabled) return

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
    'wpp-sort-button': true,
    'wpp-disabled': this.disabled,
  })

  private buttonCssClasses = () => ({
    button: true,
    disabled: this.disabled,
    'tab-focus': this.focusType === 'tab-focus',
    pressed: this.isPressed,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="button, icon, text, inner"
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
      >
        <button
          ref={el => (this.buttonRef = el)}
          class={this.buttonCssClasses()}
          autoFocus={this.autoFocus}
          disabled={this.disabled}
          name={this.name}
          type="button"
          data-testid="wppSortButton"
          aria-pressed={this.isPressed ? 'true' : 'false'}
          {...this.validAriaProps}
          part="button"
        >
          <wpp-icon-sort class="icon" part="icon" />
          <span class="text" part="text">
            <slot part="inner" />
          </span>
        </button>
      </Host>
    )
  }
}
