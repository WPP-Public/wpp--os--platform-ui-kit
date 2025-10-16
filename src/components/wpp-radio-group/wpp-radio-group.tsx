import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core'

import { BaseFormControl } from '../../interfaces/base-form-control'
import { BaseComponent } from '../../interfaces/base-component'
import { RadioChangeEvent, RadioValue } from '../wpp-radio/types'

import { RadioGroupChangeEvent, RadioGroupValue } from './types'
import { AriaProps, DropdownConfig, InputMessageTypes } from '../../types/common'
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
   * Defines the direction in which the checkbox items are displayed.
   * By default, the items are displayed vertically (in a column).
   */
  @Prop({ reflect: true }) readonly direction: 'column' | 'row' = 'column'

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
   * Contains the checkbox group `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {
    labelledby: 'label-id',
    describedby: 'description-id',
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

  @Watch('value')
  updateValue(value: RadioGroupValue): void {
    this.items.forEach(item => {
      item.checked = item.value === value
    })

    this.syncTabIndexes()
  }

  @Listen('wppClickRadio', { capture: true })
  onClickRadioButton(event: CustomEvent<RadioChangeEvent>): void {
    const value = event.detail.value as RadioValue

    if (this.value !== value) {
      this.value = value
      this.wppChange.emit({ value })
    }

    this.syncTabIndexes()
  }

  componentDidLoad() {
    this.checkRadioElements()
  }

  private syncTabIndexes() {
    const enabled = this.getEnabledItems()

    if (enabled.length === 0) return

    let activeIndex = enabled.findIndex(r => r.checked)

    if (activeIndex === -1) activeIndex = 0

    enabled.forEach((r, i) => {
      r.index = i === activeIndex ? 0 : -1
    })
  }

  private checkRadioElements = () => {
    setTimeout(() => {
      this.items = Array.from(this.host.querySelectorAll('.wpp-radio'))

      this.items.forEach((radio: HTMLWppRadioElement) => {
        radio.checked = this.value === radio.value
        radio.required = true
      })
      this.syncTabIndexes()
    }, 0)
  }

  private getEnabledItems = (): HTMLWppRadioElement[] => this.items.filter(item => !item.disabled)

  private getCurrentNdx = (enabled: HTMLWppRadioElement[]): number => {
    const checkedNdx = enabled.findIndex(item => item.checked)

    return checkedNdx !== -1 ? checkedNdx : 0
  }

  private focusAndSelect = (target: HTMLWppRadioElement) => {
    if (!target) return

    const nextValue = target.value as RadioValue

    if (this.value !== nextValue) {
      this.value = nextValue
      this.wppChange.emit({ value: this.value })
    }

    this.syncTabIndexes()
    target.setFocus?.()
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const enabledItems = this.getEnabledItems()

    if (enabledItems.length === 0) return

    const currentNdx = this.getCurrentNdx(enabledItems)
    let nextNdx = currentNdx
    const isNextKey = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const isPrevKey = event.key === 'ArrowLeft' || event.key === 'ArrowUp'

    if (!isNextKey && !isPrevKey) return

    event.preventDefault()

    const onFirst = currentNdx === 0
    const onLast = currentNdx === enabledItems.length - 1

    if (onLast && isNextKey) {
      nextNdx = 0
    } else if (onFirst && isPrevKey) {
      nextNdx = enabledItems.length - 1
    } else if (isNextKey) {
      nextNdx = Math.min(currentNdx + 1, enabledItems.length - 1)
    } else if (isPrevKey) {
      nextNdx = Math.max(currentNdx - 1, 0)
    }

    const target = enabledItems[nextNdx]

    this.focusAndSelect(target)
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

  private contentCssClasses = () => ({
    content: true,
    [`direction-${this.direction}`]: true,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        exportparts="inner"
      >
        <div
          class="group-container"
          role="radiogroup"
          aria-labelledby={this.ariaProps.labelledby}
          {...(!!this.message && this.ariaProps.describedby ? { 'aria-describedby': this.ariaProps.describedby } : {})}
        >
          {this.labelConfig?.text && (
            <wpp-label
              class="label"
              tag="h3"
              optional={!this.required}
              config={this.labelConfig}
              tooltipConfig={this.labelTooltipConfig}
              id={this.ariaProps.labelledby}
            />
          )}

          <div class={this.contentCssClasses()}>
            <slot onSlotchange={this.checkRadioElements} part="inner" />
          </div>

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
