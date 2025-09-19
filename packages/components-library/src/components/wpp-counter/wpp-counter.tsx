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
    const targetValue = target.value.replace(' ', '').replace(/[^0-9.]/g, '')

    if (Number.isInteger(this.step)) {
      const inputValue = Number(targetValue) || 0

      if (inputValue === 0) {
        target.value = ''
        this.formattedValue = ''
      } else {
        this.value = Math.max(this.min, Math.min(this.max, inputValue))
        target.value = this.formatValue()
      }
    } else {
      if (!/^-?\d*(?:[.,]\d*)?$/.test(targetValue)) {
        target.value = this.formatValue()

        return
      }

      if (targetValue.includes('.') && targetValue.split('.')[1].length === 0) {
        target.value = this.formatValue(targetValue)
      } else {
        this.value = Number(targetValue)
        target.value = this.formatValue()
      }
    }

    this.wppChange.emit({
      value: this.value,
      name: this.name,
    })
  }

  private onFocus = (event: FocusEvent): void => {
    this.inputRef?.select()

    this.wppFocus.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB
  }

  private onBlur = (event: FocusEvent): void => {
    this.focusType = FOCUS_TYPE.NONE

    if (this.formattedValue === '') {
      this.formattedValue = String(this.min)
      this.value = this.min

      this.wppChange.emit({
        value: this.value,
        name: this.name,
      })
    }

    this.wppBlur.emit(event)
  }

  private roundToDecimal = (value: number, decimals: number): number => {
    const factor = Math.pow(10, decimals)

    return Math.round(value * factor) / factor
  }

  private addStepToValue = (valueOfStep: number) => {
    if (Number.isInteger(this.step)) {
      this.value += valueOfStep
    } else {
      const numberOfDecimalsFromStep = (this.step + '').split('.')[1].length

      this.value = this.roundToDecimal(this.value + valueOfStep, numberOfDecimalsFromStep)
    }
  }

  private increaseValue = (): void => {
    if (this.value === this.max) return

    this.addStepToValue(this.step)

    this.wppChange.emit({
      value: this.value,
      name: this.name,
    })
  }

  private decreaseValue = (): void => {
    if (this.value === this.min) return

    this.addStepToValue(-this.step)

    this.wppChange.emit({
      value: this.value,
      name: this.name,
    })
  }

  private counterWrapperCssClasses = () => ({
    'counter-wrapper': true,
    [`${this.messageType}`]: !!this.messageType,
    [`size-${this.size}`]: true,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  private decreaseWrapperCssClasses = () => ({
    'decrease-wrapper': true,
    disabled: this.value === this.min,
  })

  private increaseWrapperCssClasses = () => ({
    'increase-wrapper': true,
    disabled: this.value === this.max,
  })

  private inputCssClasses = () => ({
    'counter-input': true,
    'without-counter': !this.withButtons,
    [`${this.messageType}`]: !!this.messageType,
  })

  private hostCssClasses = () => ({
    'wpp-counter': true,
  })

  render() {
    return (
      <Host
        aria-disabled={this.disabled}
        class={this.hostCssClasses()}
        exportparts="label, body, decrease-button, decrease-icon, input, increase-button, increase-icon, message"
        onFocus={this.onFocus}
        onMouseDown={this.onMouseDown}
        onKeyUp={this.onKeyUp}
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
            <div class={this.decreaseWrapperCssClasses()} onClick={this.decreaseValue} part="decrease-button">
              <wpp-icon-remove class="icon-minus" part="decrease-icon" />
            </div>
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
            ref={inputRef => (this.inputRef = inputRef)}
            aria-label={this.ariaProps.label}
            part="input"
            title=""
          />
          {this.withButtons && (
            <div class={this.increaseWrapperCssClasses()} onClick={this.increaseValue} part="increase-button">
              <wpp-icon-plus class="icon-plus" part="increase-icon" />
            </div>
          )}
        </div>

        {this.message && (
          <wpp-inline-message
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
