import { Component, Host, h, Prop, Event, EventEmitter, Element, State } from '@stencil/core'

import { FOCUS_TYPE } from '../../../../types/common'

import { TabChangeEventDetail } from '../../types'
import { transformToVersionedTag } from '../../../../utils/utils'

/**
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part counter - counter text element
 */
@Component({
  tag: 'wpp-tab',
  styleUrl: 'wpp-tab.scss',
  shadow: true,
})
export class WppTab {
  private isMouseClicked = false

  @Element() host: HTMLWppTabElement

  @State() focusType: FOCUS_TYPE

  /**
   * If the component is active.
   */
  @Prop({ reflect: true }) readonly active: boolean = false

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Indicates value of the item (must be unique)
   */
  @Prop({ reflect: true }) readonly value!: string

  /**
   * Defines the number of elements within a specific item.
   */
  @Prop() readonly counter: number = 0

  /**
   * Indicates tabs size
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * Defines the icon that will be displayed in the tab. Must be an icon from the WPP library.
   * Example: `wpp-icon-pie-chart`.
   */
  @Prop() readonly icon: `wpp-icon-${string}`

  /**
   * Emitted when an item is clicked.
   */
  @Event({ bubbles: false, composed: false }) wppChangeTabControlItem: EventEmitter<TabChangeEventDetail>

  /**
   * Emitted when an item is in focus.
   */
  @Event({ bubbles: false, composed: false }) wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when an item loses focus.
   */
  @Event({ bubbles: false, composed: false }) wppBlur: EventEmitter<FocusEvent>

  componentDidLoad() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  disconnectedCallback() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
  }

  private handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden' && document.activeElement) {
      this.host.blur()
    }
  }

  private onFocus = (event: FocusEvent) => {
    this.focusType = this.isMouseClicked ? FOCUS_TYPE.MOUSE : FOCUS_TYPE.TAB
    this.isMouseClicked = false

    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.NONE

    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    if (this.focusType === FOCUS_TYPE.TAB) {
      this.focusType = FOCUS_TYPE.MOUSE
    } else {
      this.isMouseClicked = true
    }
  }

  private handleClickTab = (): void => {
    this.focusType = FOCUS_TYPE.NONE

    if (this.disabled) return
    this.wppChangeTabControlItem.emit({ value: this.value as string })
  }

  private cssClasses = () => ({
    'wpp-tab-wrapper': true,
    'wpp-tab': true,
    'tab-focus': this.focusType === 'tab-focus',
    [`size-${this.size}`]: true,
    'wpp-icon-and-counter': !!this.icon && this.counter > 0,
  })

  private get tabIndex() {
    return this.disabled ? -1 : 0
  }

  private hostCssClasses = () => ({
    'wpp-tab': true,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        tabIndex={this.tabIndex}
        exportparts="wrapper, inner, counter"
        onClick={this.handleClickTab}
        onFocus={this.onFocus}
        onMouseDown={this.onMouseDown}
        onBlur={this.onBlur}
      >
        <div
          class={this.cssClasses()}
          role="option"
          aria-selected={this.active ? 'true' : 'false'}
          id={this.value}
          part="wrapper"
        >
          {this.icon && h(transformToVersionedTag(this.icon), { className: 'wpp-tab-icon' })}
          <slot part="inner" />
          {this.counter > 0 && <div class="counter" part="counter">{`(${this.counter})`}</div>}
        </div>
      </Host>
    )
  }
}
