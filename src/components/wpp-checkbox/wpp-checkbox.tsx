import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core'

import { AriaProps, InputMessageTypes, DropdownConfig, FOCUS_TYPE } from '../../types/common'

import { BooleanFormControl } from '../../interfaces/boolean-form-control'
import { BaseComponent } from '../../interfaces/base-component'

import { CheckboxChangeEvent, CheckboxValue, CheckboxLabelConfig } from './types'

/**
 * @part body - Main content wrapper
 * @part input - Input element
 * @part square - square element
 * @part icon-tick - icon tick element
 * @part icon-dash - icon dash element
 * @part message - message element
 */
@Component({
  tag: 'wpp-checkbox',
  styleUrl: 'wpp-checkbox.scss',
  shadow: true,
})
export class WppCheckbox implements BaseComponent, BooleanFormControl<CheckboxValue> {
  @Element() host: HTMLWppCheckboxElement

  @State() focusType: FOCUS_TYPE

  @State() isPressed: boolean = false

  /**
   * Defines the checkbox name.
   */
  @Prop() readonly name?: string

  /**
   * Defines the checkbox value.
   */
  @Prop({ mutable: true }) value: CheckboxValue

  /**
   * If the checkbox is selected.
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false

  /**
   * If the checkbox is work as controlled component.
   */
  @Prop({ reflect: true }) readonly controlled: boolean = false

  /**
   * If the checkbox is indeterminate.
   */
  @Prop({ mutable: true, reflect: true }) indeterminate: boolean = false

  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * If the checkbox is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If the checkbox is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the checkbox should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * Indicates input message
   */
  @Prop() readonly message?: string

  /**
   * Indicates input message type
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Indicates input message maximum length
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Contains the checkbox `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: CheckboxLabelConfig

  /**
   * Indicates custom classes to the checkbox
   *
   * @internal - This prop is controlled by card group component
   */
  @Prop() readonly internalState?: string = ''

  /**
   * Indicates the avatar tab index.
   *
   * @internal - This prop is controlled by avatar group
   */
  @Prop() readonly index: number = 0

  /**
   * Create a component with role presentation
   *
   * @internal - This prop is controlled by WppCard component
   */
  @Prop() readonly decorative?: boolean = false

  /**
   * Emitted when the selected state changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<CheckboxChangeEvent>

  /**
   * Emitted when the checkbox is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the checkbox is clicked.
   *
   * @internal - This event is controlled by container like Checkbox Group, do not set it manually.
   */
  @Event({ bubbles: false, composed: false }) readonly wppClickCheckbox: EventEmitter<CheckboxChangeEvent>

  /**
   * Method that sets focus on the native input.
   */
  @Method()
  async setFocus(): Promise<void> {
    if (!this.inputRef) return

    this.inputRef.focus()
    this.focusType = FOCUS_TYPE.TAB
  }

  private inputRef?: HTMLInputElement

  private onClick = (event: Event) => {
    event.preventDefault()

    if (this.controlled)
      return this.wppChange.emit({
        value: this.value,
        name: this.name,
        ...(this.indeterminate ? { indeterminate: false, checked: true } : { checked: !this.checked }),
      })

    if (this.indeterminate) {
      this.indeterminate = false
      this.checked = true
    } else {
      this.checked = !this.checked
    }

    this.wppChange.emit({
      value: this.value,
      checked: this.checked,
      name: this.name,
    })

    this.wppClickCheckbox.emit({
      value: this.value,
      checked: this.checked,
    })
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.NONE
    this.wppBlur.emit(event)
    this.isPressed = false
  }

  private onKeyUp = (event: KeyboardEvent) => {
    // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
    if (event.key === 'Tab' && this.host?.shadowRoot?.activeElement === this.inputRef) this.focusType = FOCUS_TYPE.TAB

    if (event.key === 'Enter' || event.key === ' ') {
      this.isPressed = false
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return

    // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
    if ((event.key === 'Enter' || event.key === ' ') && this.host?.shadowRoot?.activeElement === this.inputRef) {
      event.preventDefault()

      const clickEvent = new MouseEvent('click', { bubbles: true, composed: true })

      this.host.dispatchEvent(clickEvent)

      this.isPressed = true
      this.checked = !this.checked
    }
  }

  private hostCssClasses = () => ({
    'wpp-checkbox': true,
    'wpp-checkbox-wrapper': true,
    'wpp-checked': this.checked && !this.indeterminate,
    'wpp-indeterminate': this.indeterminate,
    'wpp-disabled': this.disabled,
  })

  private labelCssClasses = () => ({
    label: true,
    'with-text': !!this.labelConfig?.text,
    [this.internalState as string]: true,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    pressed: this.isPressed,
  })

  private inputCssClasses = () => ({
    'checkbox-input': true,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  render() {
    if (this.decorative)
      return (
        <Host
          class={this.hostCssClasses()}
          aria-hidden="true"
          role="presentation"
          tabindex="-1"
          exportparts="body, input, square, icon-tick, icon-dash, message"
          name={this.name}
        >
          <wpp-label
            class={this.labelCssClasses()}
            typography="s-body"
            optional={!this.required}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
            part="body"
          >
            <div class="square" part="square" />
            <wpp-icon-tick part="icon-tick" />
            <wpp-icon-dash part="icon-dash" />
          </wpp-label>

          {!!this.message && (
            <wpp-inline-message
              class="inline-message"
              showTooltipFrom={this.maxMessageLength}
              message={this.message}
              type={this.messageType}
              part="message"
            />
          )}
        </Host>
      )

    return (
      <Host
        class={this.hostCssClasses()}
        onKeyUp={this.onKeyUp}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        exportparts="body, input, square, icon-tick, icon-dash, message"
        name={this.name}
      >
        <wpp-label
          class={this.labelCssClasses()}
          typography="s-body"
          optional={!this.required}
          htmlFor={this.name}
          disabled={this.disabled}
          onClick={this.onClick}
          config={this.labelConfig}
          tooltipConfig={this.labelTooltipConfig}
          part="body"
        >
          <input
            class={this.inputCssClasses()}
            type="checkbox"
            id={this.name}
            name={this.name}
            disabled={this.disabled}
            checked={this.checked || this.indeterminate}
            required={this.required}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            autoFocus={this.autoFocus}
            ref={inputRef => (this.inputRef = inputRef)}
            aria-label={this.ariaProps.label}
            aria-hidden={this.disabled ? 'true' : null}
            aria-required={this.required.toString()}
            tabindex={this.disabled ? '-1' : this.index}
            part="input"
          />
          <div class="square" part="square" />
          <wpp-icon-tick part="icon-tick" />
          <wpp-icon-dash part="icon-dash" />
        </wpp-label>

        {!!this.message && (
          <wpp-inline-message
            class="inline-message"
            showTooltipFrom={this.maxMessageLength}
            message={this.message}
            type={this.messageType}
            part="message"
          />
        )}
      </Host>
    )
  }
}
