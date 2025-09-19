import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core'

import { BaseFormControl } from '../../interfaces/base-form-control'
import { BaseComponent } from '../../interfaces/base-component'
import { CheckboxChangeEvent, CheckboxValue } from '../wpp-checkbox/types'

import { CheckboxGroupChangeEvent, CheckboxGroupValue } from './types'
import { AriaProps, DropdownConfig, InputMessageTypes } from '../../types/common'
import { LabelConfig } from '../wpp-label/types'

/**
 * @slot - Can contain only the `wpp-checkbox` components that are displayed in `checkbox-group`. The default slot, without the name attribute. A maximum of 5 checkbox elements are allowed in this component and a minimum of 2.
 *
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-checkbox-group',
  styleUrl: 'wpp-checkbox-group.scss',
  shadow: true,
})
export class WppCheckboxGroup implements BaseComponent, BaseFormControl<CheckboxGroupValue[]> {
  private items: HTMLWppCheckboxElement[] = []

  @Element() readonly host: HTMLWppCheckboxGroupElement

  /**
   * Defines the checkbox group value.
   */
  @Prop({ mutable: true }) value: CheckboxGroupValue[] = []

  /**
   * If `true`, the group is required
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * Defines the message that is going to be displayed below the checkbox group.
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
   * Indicates the label configuration for the checkbox group.
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
   * Contains the checkbox group `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {
    labelledby: 'label-id',
    describedby: 'description-id',
  }

  /**
   * Emitted when the checkbox group value changes.
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<CheckboxGroupChangeEvent>

  /**
   * Emitted when the group receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the group loses focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  componentDidLoad() {
    this.getCheckboxElements()
  }

  @Watch('value')
  updateValue(value: CheckboxGroupValue[]): void {
    this.items.forEach(item => {
      item.checked = value.includes(item.value)
    })
  }

  @Listen('wppClickCheckbox', { capture: true })
  onClickCheckbox(event: CustomEvent<CheckboxChangeEvent>): void {
    const value = event.detail.value as CheckboxValue

    if (this.value.includes(value)) {
      this.value = [...this.value.filter(item => item !== value)]
    } else {
      this.value = [...this.value, value]
    }

    this.wppChange.emit({ value: this.value })
  }

  private getCheckboxElements = () => {
    setTimeout(() => {
      this.items = Array.from(this.host.querySelectorAll('.wpp-checkbox'))

      this.items.forEach((checkbox: HTMLWppCheckboxElement) => {
        checkbox.checked = this.value.includes(checkbox.value)
        checkbox.required = true
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
    'wpp-checkbox-group': true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} onFocus={this.onFocus} onBlur={this.onBlur} exportparts="inner">
        <div
          class="group-container"
          role="group"
          aria-labelledby={this.ariaProps.labelledby}
          {...(!!this.message && this.ariaProps.describedby ? { 'aria-describedby': this.ariaProps.describedby } : {})}
        >
          {this.labelConfig?.text && (
            <wpp-label
              class="label"
              tag="legend"
              typography="s-body"
              optional={!this.required}
              config={this.labelConfig}
              tooltipConfig={this.labelTooltipConfig}
              id={this.ariaProps.labelledby}
            />
          )}

          <slot onSlotchange={this.getCheckboxElements} part="inner" />

          {!!this.message && (
            <wpp-inline-message
              class="inline-message"
              showTooltipFrom={this.maxMessageLength}
              message={this.message}
              type={this.messageType}
              id={this.ariaProps.describedby}
            />
          )}
        </div>
      </Host>
    )
  }
}
