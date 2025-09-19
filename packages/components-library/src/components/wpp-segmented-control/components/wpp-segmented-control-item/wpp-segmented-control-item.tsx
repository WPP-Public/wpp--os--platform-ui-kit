import { Component, Prop, h, Host, Event, EventEmitter, Element } from '@stencil/core'
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'

import { SegmentedControlItemChangeEventDetail, SegmentedControlItemSize } from '../../types'

/**
 * @slot - Can contain either plain text or an icon depending on the `variant` prop. Use icons provided with the component library or custom **.svg** files that can be styled with the CSS color attribute. The default slot, without the name attribute.
 * @part item - Wrapper that can contain label or icon
 */
@Component({
  tag: 'wpp-segmented-control-item',
  styleUrl: 'wpp-segmented-control-item.scss',
  shadow: true,
})
export class WppSegmentedControlItem {
  @Element() host: HTMLWppSegmentedControlItemElement

  /**
   * Defines the item size.
   */
  @Prop() readonly size: SegmentedControlItemSize = 'm'

  /**
   * If the component is active.
   *
   * @internal - This prop is controlled by container like Segmented Control, do not set it manually.
   */
  @Prop({ reflect: true }) readonly active: boolean = false

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Indicates value of item (must be unique)
   */
  @Prop({ reflect: true }) readonly value!: string | number

  /**
   * Defines the number of elements within a specific item.
   * The counter is only displayed when the `variant` is set to 'text'.
   */
  @Prop() readonly counter: number = 0

  /**
   * Defines the item style.
   * - 'text': Displays text with an optional counter if provided.
   * - 'icon': Displays an icon without a counter.
   */
  @Prop() readonly variant: 'text' | 'icon' = 'text'

  /**
   * If the item size is relative to the control bar size.
   */
  @Prop({ reflect: true }) readonly hugContentOff: boolean = false

  /**
   * Emitted when an item is clicked.
   */
  @Event({ bubbles: false, composed: false })
  wppChangeSegmentedControlItem: EventEmitter<SegmentedControlItemChangeEventDetail>

  /**
   * Emitted when an item is in focus.
   */
  @Event({ bubbles: false, composed: false }) wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when an item loses focus.
   */
  @Event({ bubbles: false, composed: false }) wppBlur: EventEmitter<FocusEvent>

  private handleClickSegmentedControl = (): void => {
    if (this.disabled) return
    this.wppChangeSegmentedControlItem.emit({ value: this.value })
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.wppBlur.emit(event)
  }

  private cssClasses = () => ({
    'segmented-control-item': true,
    [`size-${this.size}`]: true,
    [`${this.variant}`]: true,
    active: this.active,
    disabled: this.disabled,
  })

  private hostCssClasses = () => ({
    'wpp-segmented-control-item': true,
  })

  private get tabIndex() {
    return this.disabled || this.active ? -1 : 0
  }

  render() {
    return (
      <Host
        tabIndex={this.tabIndex}
        onClick={this.handleClickSegmentedControl}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        class={this.hostCssClasses()}
        exportparts="item"
      >
        <div
          class={this.cssClasses()}
          part="item"
          id={String(this.value)}
          role="option"
          aria-selected={this.active ? 'true' : 'false'}
        >
          <WrappedSlot wrapperClass="content-wrapper" />
          {this.variant === 'text' && this.counter > 0 && <div class="counter">{`(${this.counter})`}</div>}
        </div>
      </Host>
    )
  }
}
