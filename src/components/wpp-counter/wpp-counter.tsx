import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'

import { AriaProps, FOCUS_TYPE, InputMessageTypes, DropdownConfig } from '../../types/common'

import { CounterChangeEventDetail, CounterFormat, CounterLabelConfig } from './types'
import { autoFocusElement } from '../../utils/utils'

/**
 * @part input - Counter input element
 * @part label - Label text element
 * @part body - Main content wrapper
 * @part decrease-button - decrease button element
 * @part decrease-icon - decrease icon element
 * @part increase-button - increase button element
 * @part increase-icon - increase icon element
 * @part message - message element
 */
@Component({
  tag: 'wpp-counter',
  styleUrl: 'wpp-counter.scss',
  shadow: true,
})
export class WppCounter {
  private inputRef?: HTMLInputElement

  @Element() host: HTMLWppCounterElement

  @State() formattedValue: string
  @State() focusType: FOCUS_TYPE

  // NEW: Track which element is focused (for padding-on-neighbor experiment)
  @State() currentFocused: 'decrease' | 'input' | 'increase' | null = null

  /**
   * Defines the counter name.
   */
  @Prop() readonly name?: string

  /**
   * Defines the counter value.
   */
  @Prop({ mutable: true }) value: number = 1

  /**
   * Defines the counter `min` value.
   */
  @Prop() readonly min: number = 1

  /**
   * Defines the counter `max` value.
   */
  @Prop() readonly max: number = 100

  /**
   * If `true`, the counter will show increment/decrement(+/-) buttons
   */
  @Prop() readonly withButtons: boolean = true

  /**
   * If the counter is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If the counter is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the counter should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * Defines the counter size.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * Defines the counter message.
   */
  @Prop() readonly message?: string

  /**
   * Defines the counter message type.
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Defines the counter message maximum length.
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Contains the counter `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Defines the counter format number.
   */
  @Prop() readonly format: CounterFormat

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {}

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: CounterLabelConfig

  /**
   * Indicates the step of the counter.
   */
  @Prop() readonly step: number = 1

  /**
   * Emitted when the input value changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<CounterChangeEventDetail>

  /**
   * Emitted when the counter is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the counter loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  @Watch('value')
  updateFormattedValue() {
    this.formatValue()
  }

  /**
   * Method that sets focus on the native input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.focus()
  }

  componentWillLoad() {
    this.formattedValue = String(this.value)
    this.formatValue()
  }

  componentDidLoad() {
    autoFocusElement(this.autoFocus, this.inputRef)
  }

  private handleValidate = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      if (this.value !== this.max) return this.addStepToValue(this.step)
    }

    if (event.key === 'ArrowDown') {
      if (this.value !== this.min) return this.addStepToValue(-this.step)
    }

    this.formatValue()
  }

  private formatValue = (valueToFormat?: string) => {
    this.formattedValue = this.format
      ? (valueToFormat || String(this.value)).replace(this.format.searchValue, this.format.replaceValue)
      : valueToFormat || String(this.value)

    return this.formattedValue
  }

  private onInput = (event: Event): void => {
    this.focusType = FOCUS_TYPE.NONE

    const target = event.target as HTMLInputElement
    const cleaned = target.value.replace(' ', '').replace(/[^0-9.]/g, '')

    // If empty, keep view empty and don’t emit a stale value
    if (cleaned === '') {
      this.formattedValue = ''
      target.value = ''

      return
    }

    if (Number.isInteger(this.step)) {
      const inputValue = Number(cleaned) || 0

      // Removed the inputValue === 0 special-case that cleared the field and set formattedValue to ''. That logic conflated zero with “empty,” prevented users from entering a valid 0 when min = 0, and left this.value unchanged (stale). As a result, after clearing/typing 0 the increment used the previous value (e.g., 123 → clear → + => 124). Now we only treat the field as empty when the string is actually empty, don’t emit wppChange on empty, and baseline +/-/arrow actions from min when empty. If the user types 0: clamp to min when min > 0, or accept 0 when min = 0. This fixes the stale increment bug and aligns with the test “previously entered value is not saved when clearing the input.”
      this.value = Math.max(this.min, Math.min(this.max, inputValue))
      target.value = this.formatValue()
    } else {
      if (!/^-?\d*(?:[.,]\d*)?$/.test(cleaned)) {
        target.value = this.formatValue()

        return
      }

      if (cleaned.includes('.') && cleaned.split('.')[1].length === 0) {
        target.value = this.formatValue(cleaned)
      } else {
        this.value = Number(cleaned)
        target.value = this.formatValue()
      }
    }

    this.wppChange.emit({ value: this.value, name: this.name })
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onBlur = (event: FocusEvent): void => {
    this.focusType = FOCUS_TYPE.NONE

    if (this.formattedValue === '' || isNaN(this.value)) {
      this.formattedValue = String(this.min)
      this.value = this.min
      this.wppChange.emit({ value: this.value, name: this.name })
    }

    this.wppBlur.emit(event)
  }

  private roundToDecimal = (value: number, decimals: number): number => {
    const factor = Math.pow(10, decimals)

    return Math.round(value * factor) / factor
  }

  private isInputEmpty = () => this.formattedValue === '' || this.inputRef?.value === ''

  private addStepToValue = (valueOfStep: number) => {
    const inputIsEmpty = this.inputRef?.value === '' || this.formattedValue === '' || isNaN(this.value)
    const base = inputIsEmpty ? this.min : this.value

    if (Number.isInteger(this.step)) {
      let next = base + valueOfStep

      next = Math.min(this.max, Math.max(this.min, next))
      this.value = next
    } else {
      const decimals = (this.step + '').split('.')[1]?.length || 0

      let next = this.roundToDecimal(base + valueOfStep, decimals)

      next = Math.min(this.max, Math.max(this.min, next))

      this.value = next
    }
  }

  private increaseValue = (): void => {
    this.focusType = FOCUS_TYPE.MOUSE
    if (this.value === this.max) return

    this.addStepToValue(this.step)

    if (this.value === this.max) {
      const btn = this.host.shadowRoot?.querySelector('.increase-wrapper') as HTMLElement

      btn?.classList.remove('pressed')
    }

    this.wppChange.emit({ value: this.value, name: this.name })
  }

  private decreaseValue = (): void => {
    this.focusType = FOCUS_TYPE.MOUSE
    if (this.value === this.min) return

    this.addStepToValue(-this.step)

    if (this.value === this.min) {
      const btn = this.host.shadowRoot?.querySelector('.decrease-wrapper') as HTMLElement

      btn?.classList.remove('pressed')
    }

    this.wppChange.emit({ value: this.value, name: this.name })
  }

  private counterWrapperCssClasses = () => ({
    'counter-wrapper': true,
    [`${this.messageType}`]: !!this.messageType,
    [`size-${this.size}`]: true,
  })

  private decreaseWrapperCssClasses = () => ({
    'decrease-wrapper': true,
    disabled: !this.isInputEmpty() && this.value === this.min,
  })

  private increaseWrapperCssClasses = () => ({
    'increase-wrapper': true,
    disabled: !this.isInputEmpty() && this.value === this.max,
  })

  private inputCssClasses = () => ({
    'counter-input': true,
    'without-counter': !this.withButtons,
    [`${this.messageType}`]: !!this.messageType,
  })

  private hostCssClasses = () => ({
    'wpp-counter': true,
  })

  private onFocus = (event: FocusEvent): void => {
    this.wppFocus.emit(event)
  }

  private onElementFocus = (event: FocusEvent) => {
    if (this.focusType === FOCUS_TYPE.TAB) {
      const target = event.currentTarget as HTMLElement

      target.classList.add('tab-focus')
    }
  }

  private onElementBlur = (event: FocusEvent) => {
    const target = event.currentTarget as HTMLElement

    target.classList.remove('tab-focus')
    this.focusType = FOCUS_TYPE.NONE
  }

  private onKeyDownButton = (event: KeyboardEvent, action: 'increase' | 'decrease') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      const target = event.currentTarget as HTMLElement

      target.classList.add('pressed')
      if (action === 'increase') this.increaseValue()
      else this.decreaseValue()
    }
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this.focusType = FOCUS_TYPE.TAB
      const target = event.currentTarget as HTMLElement

      target.classList.add('tab-focus')
    }
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.currentTarget as HTMLElement

      target.classList.remove('pressed')
    }
  }

  render() {
    const messageId = this.message ? `${this.name}-message` : undefined

    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="label, body, decrease-button, decrease-icon, input, increase-button, increase-icon, message"
        onMouseDown={this.onMouseDown}
        onBlur={this.onBlur}
      >
        {this.labelConfig?.text && (
          <wpp-label
            class="label"
            htmlFor={this.name}
            optional={!this.required}
            disabled={this.disabled}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
            part="label"
          />
        )}

        <div class={this.counterWrapperCssClasses()} part="body">
          {this.withButtons && (
            <button
              type="button"
              class={this.decreaseWrapperCssClasses()}
              onClick={this.decreaseValue}
              part="decrease-button"
              aria-label="Decrease value"
              disabled={(!this.isInputEmpty() && this.value === this.min) || this.disabled}
              tabIndex={(!this.isInputEmpty() && this.value === this.min) || this.disabled ? -1 : 0}
              onFocus={this.onElementFocus}
              onBlur={this.onElementBlur}
              onKeyUp={this.onKeyUp}
              onKeyDown={e => this.onKeyDownButton(e, 'decrease')}
            >
              <wpp-icon-remove class="icon-minus" part="decrease-icon" />
            </button>
          )}
          <input
            id={this.name}
            type={this.withButtons ? 'text' : 'decimal'}
            class={this.inputCssClasses()}
            name={this.name}
            onKeyDown={this.handleValidate}
            value={this.formattedValue}
            required={this.required}
            disabled={this.disabled}
            onInput={this.onInput}
            onKeyUp={this.onKeyUp}
            ref={inputRef => (this.inputRef = inputRef)}
            aria-label={this.ariaProps.label || (!this.labelConfig?.text ? 'Counter value' : undefined)}
            aria-labelledby={this.labelConfig?.labelId || undefined}
            aria-describedby={messageId}
            autocomplete={this.ariaProps.autocomplete || 'off'}
            part="input"
            title=""
            onFocus={e => {
              this.onElementFocus(e)
              this.onFocus(e)
            }}
            onBlur={this.onElementBlur}
          />
          {this.withButtons && (
            <button
              type="button"
              class={this.increaseWrapperCssClasses()}
              onClick={this.increaseValue}
              part="increase-button"
              aria-label="Increase value"
              disabled={(!this.isInputEmpty() && this.value === this.max) || this.disabled}
              tabIndex={(!this.isInputEmpty() && this.value === this.max) || this.disabled ? -1 : 0}
              onFocus={this.onElementFocus}
              onBlur={this.onElementBlur}
              onKeyUp={this.onKeyUp}
              onKeyDown={e => this.onKeyDownButton(e, 'increase')}
            >
              <wpp-icon-plus class="icon-plus" part="increase-icon" />
            </button>
          )}
        </div>

        {this.message && (
          <wpp-inline-message
            id={messageId}
            message={this.message}
            type={this.messageType}
            showTooltipFrom={this.maxMessageLength}
            tooltipConfig={this.tooltipConfig}
            part="message"
          />
        )}
      </Host>
    )
  }
}
