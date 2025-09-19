import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core'

import { BaseFormControl } from '../../interfaces/base-form-control'
import { BaseComponent } from '../../interfaces/base-component'
import { RadioChangeEvent, RadioValue } from '../wpp-radio/types'

import { RadioGroupChangeEvent, RadioGroupValue } from './types'
import { DropdownConfig, InputMessageTypes } from '../../types/common'
import { LabelConfig } from '../wpp-label/types'

/**
 * @slot - Can contain only the `wpp-radio` components that are displayed in `radio-group`. The default slot, without the name attribute. A maximum of 5 radio elements are allowed in this component and a minimum of 2.
 *
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-radio-group',
  styleUrl: 'wpp-radio-group.scss',
  shadow: true,
})
export class WppRadioGroup implements BaseComponent, BaseFormControl<RadioGroupValue> {
  private items: HTMLWppRadioElement[] = []

  @Element() readonly host: HTMLWppRadioGroupElement

  /**
   * Defines the radio group value.
   */
  @Prop({ mutable: true }) value: RadioGroupValue

  /**
   * If `true`, the group is required
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * Defines the message that is going to be displayed below the radio group.
   * This property should be used in case there is an error / warning that needs to be displayed on the component.
   */
  @Prop() readonly message?: string

  /**
   * Defines the message's type and can take one of the following values: "error" / "warning".
   * The icon displayed for the message will change based on this property.
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Defines the message's maximum length. If the length of the message is greater than the value of this property,
   * the message will be truncated and a tooltip will display the whole text upon hover.
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Indicates the label configuration for the radio group.
   */
  @Prop({ mutable: true }) labelConfig?: LabelConfig

  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Emitted when the radio group value changes.
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<RadioGroupChangeEvent>

  /**
   * Emitted when the group receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the group loses focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  componentDidLoad() {
    this.checkRadioElements()
  }

  @Watch('value')
  updateValue(value: RadioGroupValue): void {
    this.items.forEach(item => {
      item.checked = item.value === value
    })
  }

  @Listen('wppClickRadio', { capture: true })
  onClickRadioButton(event: CustomEvent<RadioChangeEvent>): void {
    const value = event.detail.value as RadioValue

    if (this.value !== value) {
      this.value = value
      this.wppChange.emit({ value })
    }
  }

  private checkRadioElements = () => {
    setTimeout(() => {
      this.items = Array.from(this.host.querySelectorAll('.wpp-radio'))

      this.items.forEach((radio: HTMLWppRadioElement) => {
        radio.checked = this.value === radio.value
        radio.required = true
      })
    }, 0)
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.wppBlur.emit(event)
  }

  private hostCssClasses = () => ({
    'wpp-radio-group': true,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        aria-multiselectable="false"
        aria-required={this.required}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        exportparts="inner"
      >
        {this.labelConfig?.text && (
          <wpp-label
            class="label"
            typography="s-body"
            optional={!this.required}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
          />
        )}

        <slot onSlotchange={this.checkRadioElements} part="inner" />

        {!!this.message && (
          <wpp-inline-message
            class="inline-message"
            showTooltipFrom={this.maxMessageLength}
            message={this.message}
            type={this.messageType}
          />
        )}
      </Host>
    )
  }
}
