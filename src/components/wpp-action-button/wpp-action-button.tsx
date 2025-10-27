import { Component, Prop, h, Host, Element, State, Method, Watch } from '@stencil/core'

import { getSlotEmptyStates, closestElement, getAriaProps } from '../../utils/utils'
import { AriaProps, FOCUS_TYPE } from '../../types/common'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

/**
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a plus icon.
 * @slot icon-end - Can contain an icon that will be placed after the main content, e.g. a plus icon.
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - Spinner wrapper element
 * @part spinner - Spinner element
 * @part body - Main content wrapper
 * @part icon-start-wrapper - icon-start wrapper element
 * @part icon-start - icon-start element
 * @part icon-end-wrapper - icon-end wrapper element
 * @part icon-end - icon-end element
 * @part inner - Content slot element
 * @part overlay - overlay element
 * @part icon-start-wrapper - icon-start wrapper element
 * @part icon-start - icon-start slot element
 * @part icon-end-wrapper - icon-end wrapper element
 * @part icon-end - icon-end slot element
 */
@Component({
  tag: 'wpp-action-button',
  styleUrl: 'wpp-action-button.scss',
  shadow: true,
})
export class WppActionButton {
  private buttonRef?: HTMLButtonElement

  @Element() host: HTMLWppActionButtonElement

  @State() hasIconStartSlot: boolean = false

  @State() hasIconEndSlot: boolean = false

  @State() isIconOnly: boolean = false

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
   * Defines the button style.
   */
  @Prop() readonly variant?: 'primary' | 'secondary' | 'inverted' | 'destructive' = 'primary'

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

  private onBlur = (): void => {
    this.focusType = FOCUS_TYPE.NONE
    this.isPressed = false
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

  private hostCssClasses = () => ({
    'wpp-action-button': true,
    'wpp-disabled': this.disabled,
    'wpp-loading': this.loading,
  })

  private buttonCssClasses = () => ({
    loading: this.loading,
    disabled: this.disabled,
    [`${this.variant}`]: true,
    'tab-focus': this.focusType === 'tab-focus',
    'with-icon-only': this.isIconOnly,
    'with-icon-start': this.hasIconStartSlot,
    'with-icon-end': this.hasIconEndSlot,
    pressed: this.isPressed,
  })

  private loadingColor = () => {
    switch (this.variant) {
      case 'secondary': {
        return 'var(--wpp-grey-color-800)'
      }

      case 'inverted': {
        return 'var(--wpp-grey-color-000)'
      }

      case 'destructive': {
        return 'var(--wpp-danger-color-500)'
      }

      default: {
        return 'var(--wpp-primary-color-500)'
      }
    }
  }

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
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        exportparts="button, spinner-wrapper, spinner, body, icon-start-wrapper, icon-start, icon-end-wrapper, icon-end, inner, overlay"
      >
        <button
          ref={el => (this.buttonRef = el)}
          class={this.buttonCssClasses()}
          autoFocus={this.autoFocus}
          disabled={this.disabled || this.loading}
          value={this.value}
          name={this.name}
          type={this.type}
          part="button"
          data-testid="wppActionButton"
          aria-pressed={this.isPressed ? 'true' : 'false'}
          tabindex={this.ariaProps?.tabIndex}
          {...this.validAriaProps}
        >
          {this.loading && (
            <div class={this.loaderCssClasses()} part="spinner-wrapper">
              <wpp-spinner color={this.loadingColor()} part="spinner" />
            </div>
          )}
          <div class={this.contentCssClasses()} part="body">
            <WrappedSlot
              wrapperClass={this.iconStartCssClasses()}
              name="icon-start"
              onSlotchange={this.updateSlotData}
            />
            <slot part="inner" onSlotchange={this.updateSlotData} />
            <WrappedSlot wrapperClass={this.iconEndCssClasses()} name="icon-end" onSlotchange={this.updateSlotData} />
          </div>
        </button>
        <div class="overlay" part="overlay" />
      </Host>
    )
  }
}
