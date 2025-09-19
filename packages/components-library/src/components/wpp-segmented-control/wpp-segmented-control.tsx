import { Component, Host, h, Prop, Element, Watch, Listen, State, Event, EventEmitter } from '@stencil/core'

import { transformToVersionedTag } from '../../utils/utils'
import { DropdownConfig } from '../../types/common'

import { BaseFormControl } from '../../interfaces/base-form-control'
import { BaseComponent } from '../../interfaces/base-component'

import {
  SegmentedControlChangeEventDetail,
  SegmentedControlValue,
  SegmentedControlItemChangeEventDetail,
  SegmentedControlItemSize,
  SegmentedControlLabelConfig,
} from './types'

/**
 * @slot - Should contain only the `segmented-control-item` elements. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part label - Label text element
 */
@Component({
  tag: 'wpp-segmented-control',
  styleUrl: 'wpp-segmented-control.scss',
  shadow: true,
})
export class WppSegmentedControl implements BaseComponent, BaseFormControl<SegmentedControlValue> {
  @Element() host: HTMLWppSegmentedControlElement

  @State() previousActiveElement: Element | null

  /**
   * Defines the segmented control size.
   */
  @Prop() readonly size: SegmentedControlItemSize = 'm'

  /**
   * If the item size is relative to the control bar size.
   */
  @Prop({ reflect: true }) readonly hugContentOff: boolean = false

  /**
   * Defines the control bar width, with the leftover space distributed evenly between the items. Must be in pixels, e.g. **800px**.
   */
  @Prop() readonly width: string = 'auto'

  /**
   * Defines the component style.
   */
  @Prop() readonly variant: 'text' | 'icon' = 'text'

  /**
   * If `true`, the segmented control is required
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * Indicates selected value
   */
  @Prop({ reflect: true, mutable: true }) value!: SegmentedControlValue

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: SegmentedControlLabelConfig

  /**
   * Defines the dropdown configuration for the label tooltip.
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Emitted when the active item has changed, emits value of the active item
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<SegmentedControlChangeEventDetail>

  /**
   * Emitted when the segmented control receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the segmented control loses focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  @Listen('wppChangeSegmentedControlItem', { capture: true })
  handleChangeSegmentedControlItemClick(event: CustomEvent<SegmentedControlItemChangeEventDetail>) {
    this.value = event.detail.value
  }

  @Watch('value')
  valueChanged(newValue: string) {
    this.previousActiveElement?.setAttribute('active', 'false')
    const activeElement = Array.from(
      this.host.querySelectorAll<HTMLWppSegmentedControlItemElement>(
        transformToVersionedTag('wpp-segmented-control-item'),
      ),
    ).find(item => item.value === newValue)

    activeElement?.setAttribute('active', 'true')
    this.previousActiveElement = activeElement as HTMLWppSegmentedControlItemElement
    this.wppChange.emit({ value: newValue, reason: 'valueChanged' })
  }

  @Watch('width')
  widthChange(newValue: string) {
    this.host.style.setProperty('--wpp-bar-width', newValue)
  }

  @Watch('size')
  onUpdateSize(newSize: SegmentedControlItemSize) {
    this.setSegmentedControlItemsSize(newSize)
  }

  componentWillLoad() {
    this.widthChange(this.width)
    this.setSegmentedControlItemsSize(this.size)
  }

  componentDidLoad() {
    this.host
      .querySelectorAll<HTMLWppSegmentedControlItemElement>(transformToVersionedTag('wpp-segmented-control-item'))
      .forEach(item => {
        if (item.value === this.value) {
          item.setAttribute('active', 'true')
          this.previousActiveElement = item
        }
      })
  }

  private setSegmentedControlItemsSize = (size: SegmentedControlItemSize) => {
    this.host
      .querySelectorAll<HTMLWppSegmentedControlItemElement>(transformToVersionedTag('wpp-segmented-control-item'))
      .forEach(item => {
        item.setAttribute('size', size)
      })
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.wppBlur.emit(event)
  }

  private cssClasses = () => ({
    'wpp-bar-wrapper': true,
    [`size-${this.size}`]: true,
    'hug-content-off': this.hugContentOff,
  })

  private hostCssClasses = () => ({
    'wpp-segmented-control': true,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="wrapper, inner, label"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
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
        <div
          class={this.cssClasses()}
          role="listbox"
          aria-multiselectable="false"
          aria-required={this.required}
          part="wrapper"
        >
          <slot part="inner" />
        </div>
      </Host>
    )
  }
}
