import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch, Listen } from '@stencil/core'

import { transformToVersionedTag } from '../../utils/utils'
import { DropdownConfig } from '../../types/common'

import { BaseFormControl } from '../../interfaces/base-form-control'
import { BaseComponent } from '../../interfaces/base-component'

import { PillSize, PillValue, PillChangeEventDetail, PillType } from './components/wpp-pill/types'
import { PillGroupChangeEvent, PillGroupValue, PillGroupLabelConfig } from './types'

/**
 * @slot - Can contain only the `wpp-pill` components that are displayed in `pill-group`. It can be only <wpp-pill>. The default slot, without the name attribute.
 *
 * @part label - Label text element
 * @part content - content wrapper element
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-pill-group',
  styleUrl: 'wpp-pill-group.scss',
  shadow: true,
})
export class WppPillGroup implements BaseComponent, BaseFormControl<PillGroupValue> {
  @Element() readonly host: HTMLWppPillGroupElement

  /**
   * Defines the pill group name.
   */
  @Prop() readonly name: string

  /**
   * Defines the pill group size.
   */
  @Prop() readonly size: PillSize = 'm'

  /**
   * Defines the pill group value.
   */
  @Prop({ mutable: true }) value?: PillGroupValue

  /**
   * Indicates the type of the pill
   */
  @Prop() readonly type: PillType

  /**
   * If the pill group is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: PillGroupLabelConfig

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Emitted when the pill group value changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<PillGroupChangeEvent>

  /**
   * Emitted when the pill group receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the pill group loses focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  @Listen('wppClick', { capture: true })
  handleClick(event: CustomEvent<PillChangeEventDetail>) {
    const isMultiple = this.type === 'multiple'

    if (isMultiple) {
      const currentValue = (this.value as PillValue[]) || []

      this.value = event.detail.checked
        ? [...currentValue, event.detail.value]
        : currentValue.filter(element => element !== event.detail.value)
    } else {
      this.value = event.detail.value
    }

    this.wppChange.emit({
      value: this.value,
      name: this.name,
    })
  }

  @Watch('value')
  onValueChange(newValue: PillValue) {
    this.setActivePill(newValue)
  }

  @Watch('size')
  onUpdateSize(newSize: PillSize) {
    this.setPillsSize(newSize)
  }

  componentDidLoad() {
    this.setPillsSize(this.size)

    if (this.value) {
      this.setActivePill(this.value as PillValue)
    }
  }

  private setPillsSize = (size: PillSize) => {
    this.host.querySelectorAll(transformToVersionedTag('wpp-pill')).forEach(pill => {
      pill.setAttribute('size', size)
    })
  }

  private setActivePill = (initValue: PillValue) => {
    const value = Array.isArray(initValue) ? initValue : [initValue]

    this.host.querySelectorAll<HTMLWppPillElement>(transformToVersionedTag('wpp-pill')).forEach(pill => {
      pill.setAttribute('checked', value.includes(pill.value) ? 'true' : 'false')
    })
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.wppBlur.emit(event)
  }

  private hostCssClasses = () => ({
    'wpp-pill-group': true,
  })

  render() {
    return (
      <Host
        aria-multiselectable={this.type === 'multiple'}
        aria-required={this.required}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        class={this.hostCssClasses()}
        exportparts="label, content, inner"
      >
        {this.labelConfig?.text && (
          <wpp-label
            class="label"
            optional={!this.required}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
            part="label"
          />
        )}
        <div class="pills-wrapper" part="content">
          <slot part="inner" />
        </div>
      </Host>
    )
  }
}
