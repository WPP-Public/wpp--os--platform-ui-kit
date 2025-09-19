import { Component, Host, h, Prop, Event, EventEmitter, Element, State } from '@stencil/core'

import { getSlotEmptyStates, transformToVersionedTag, truncate } from '../../../../utils/utils'
import { AriaProps, FOCUS_TYPE } from '../../../../types/common'

import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'

import { PillChangeEventDetail, PillSize, PillState, PillTabElements, PillType, PillValue } from './types'

interface FocusType {
  wrapper: FOCUS_TYPE
  'icon-close': FOCUS_TYPE
  'icon-draggable': FOCUS_TYPE
}

const getInitFocusInfo = (): FocusType => ({
  wrapper: FOCUS_TYPE.NONE,
  'icon-close': FOCUS_TYPE.NONE,
  'icon-draggable': FOCUS_TYPE.NONE,
})

/**
 * @slot - Contains the content displayed in the pill. The default slot, without the name attribute.
 * @slot icon-start - May contain an icon or components that will be placed before the main content, e.g. a plus icon, wpp-avatar
 *
 * @part pill-wrapper - Wrapper for the pill content
 * @part input - Input element
 * @part drag-wrapper - drag wrapper element
 * @part drag-icon - drag icon element
 * @part label - label text element
 * @part inner - Content slot element
 * @part active-icon - active icon element
 * @part remove-icon - remove icon element
 */
@Component({
  tag: 'wpp-pill',
  styleUrl: 'wpp-pill.scss',
  shadow: true,
})
export class WppPill {
  private inputEl?: HTMLInputElement

  @Element() host: HTMLWppPillElement

  @State() hasIconStartSlot: boolean = false

  @State() hasSquareIcon: boolean = false

  @State() componentState?: PillState | null

  @State() focusType: FocusType = getInitFocusInfo()

  /**
   * Defines the pill value.
   */
  @Prop({ reflect: true }) readonly value: PillValue

  /**
   * Defines the pill size.
   */
  @Prop() readonly size: PillSize = 'm'

  /**
   * Defines the pill type.
   */
  @Prop({ mutable: true }) type: PillType

  /**
   * If the pill is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the pill has close icon button
   * Note: This is applicable only for `type="display"` or `type="draggable"`.
   */
  @Prop({ reflect: true }) readonly removable: boolean = false

  /**
   * If the pill is selected.
   */
  @Prop({ reflect: true, mutable: true }) checked: boolean = false

  /**
   * Defines the pill label.
   */
  @Prop() readonly label?: string

  /**
   * Contains the pill `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Defines the pill name.
   */
  @Prop({ reflect: true }) readonly name?: string

  /**
   * Defines the maximum label length (in characters) of a single item.
   * Zero or fewer means there is no limit
   */
  @Prop() readonly maxLength?: number

  /**
   * Emitted when the selected state changes.
   */
  @Event({ bubbles: false, composed: false }) wppClick: EventEmitter<PillChangeEventDetail>

  /**
   * Emitted when the pill is in focus.
   */
  @Event({ bubbles: false, composed: false }) wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the pill loses focus.
   */
  @Event({ bubbles: false, composed: false }) wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the close icon clicked
   */
  @Event({ bubbles: false, composed: false }) wppClose: EventEmitter<MouseEvent>

  /**
   * Emitted when the drag icon pressed
   */
  @Event({ bubbles: false, composed: false }) wppDragPress: EventEmitter<MouseEvent>

  componentWillLoad() {
    const pillGroup = this.host.closest(transformToVersionedTag('wpp-pill-group')) as HTMLWppPillGroupElement

    if (pillGroup) {
      this.type = pillGroup.type
    }
  }

  private getUpdatedFocusInfo = (type: PillTabElements, updateValue: FOCUS_TYPE): FocusType => ({
    ...this.focusType,
    [type]: updateValue,
  })

  private updateSlotData = (ev: Event) => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      start: '[slot="icon-start"]',
    })

    this.hasIconStartSlot = !emptyStates.start

    if (this.hasIconStartSlot) {
      const iconStartSlot = ev.target as HTMLSlotElement

      this.hasSquareIcon = iconStartSlot
        .assignedElements()
        .some(
          element =>
            element.tagName === transformToVersionedTag('wpp-avatar').toUpperCase() &&
            (element as HTMLWppAvatarElement).variant === 'square',
        )
    }
  }

  private onClick = (event: Event) => {
    if (this.disabled || this.type === 'draggable') return

    event.preventDefault()
    this.setFocus()

    this.wppClick.emit({
      checked: !this.checked,
      value: this.value,
    })
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.NONE)
    this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.NONE)
    this.focusType = this.getUpdatedFocusInfo('icon-draggable', FOCUS_TYPE.NONE)

    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.MOUSE)
    this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.MOUSE)
    this.focusType = this.getUpdatedFocusInfo('icon-draggable', FOCUS_TYPE.MOUSE)
  }

  private onKeyUp = (event: KeyboardEvent, type: PillTabElements) => {
    if (event.key === 'Tab') {
      if (type === 'icon-draggable') {
        this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.NONE)
      }
      if (type === 'icon-close') {
        this.focusType = this.getUpdatedFocusInfo('icon-draggable', FOCUS_TYPE.NONE)
      }

      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB)
    }
  }

  private onClose = (event: MouseEvent) => {
    if (this.disabled) return
    this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.NONE)

    event.preventDefault()
    event.stopPropagation()

    this.wppClose.emit(event)
  }

  private onDragPress = (event: MouseEvent) => {
    if (this.disabled) return

    event.preventDefault()

    this.wppDragPress.emit(event)
  }

  private setFocus() {
    if (this.inputEl) {
      this.inputEl.focus()
    }
  }

  private updateComponentState = (updateData: PillState | null) => {
    if (this.disabled) return

    this.componentState = updateData
  }

  private checkTabIndex = () => {
    if (this.disabled) return -1

    if (this.type === 'display' || this.type === 'draggable' || this.removable) {
      return null
    } else {
      return 0
    }
  }

  private cssClasses = () => ({
    'pill-wrapper': true,
    'icon-start': this.hasIconStartSlot,
    'square-icon': this.hasSquareIcon,
    [`size-${this.size}`]: true,
    [this.type]: !!this.type,
    checked: this.checked && this.type !== 'draggable' && this.type !== 'display',
    disabled: this.disabled,
    removable: this.removable,
    hover: this.componentState === 'hover',
    active: this.componentState === 'active',
    'tab-focus':
      this.focusType.wrapper === FOCUS_TYPE.TAB &&
      this.focusType['icon-draggable'] !== FOCUS_TYPE.TAB &&
      this.focusType['icon-close'] !== FOCUS_TYPE.TAB,
  })

  private slotCssClasses = () => ({
    'icon-start': true,
    [`size-${this.size}`]: true,
    'drag-wrapper': this.type === 'draggable',
    'slot-hidden': !this.hasIconStartSlot && this.type !== 'draggable',
  })

  private hostCssClasses = () => ({
    'wpp-pill': true,
  })

  private getLabelText = () => {
    if (!this.maxLength || this.maxLength <= 0) return this.label

    return truncate(this.label, this.maxLength)
  }

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        aria-disabled={this.disabled}
        aria-checked={this.checked}
        aria-hidden={this.disabled ? 'true' : null}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'wrapper')}
        role="checkbox"
        exportparts="input, pill-wrapper, drag-wrapper, drag-icon, label, inner, active-icon, remove-icon, icon-start, icon-start-wrapper"
        tabIndex={this.checkTabIndex()}
      >
        <input
          class="pill-input"
          type="checkbox"
          name={this.name}
          disabled={this.disabled}
          ref={focusEl => (this.inputEl = focusEl)}
          aria-label={this.ariaProps.label}
          part="input"
          title=""
          tabIndex={-1}
        />
        <div class={this.cssClasses()} part="pill-wrapper">
          {this.type === 'draggable' ? (
            <div class={this.slotCssClasses()} part="drag-wrapper">
              <wpp-icon-drag
                class={{ [`${this.focusType['icon-draggable']}`]: true }}
                part="drag-icon"
                onMouseEnter={() => this.updateComponentState('hover')}
                onMouseLeave={() => this.updateComponentState(null)}
                onMouseDown={ev => {
                  this.updateComponentState('active')
                  this.onDragPress(ev)
                  this.onMouseDown()
                }}
                onMouseUp={() => this.updateComponentState(null)}
                tabIndex={this.disabled ? -1 : 0}
                onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'icon-draggable')}
              />
            </div>
          ) : (
            <WrappedSlot name="icon-start" wrapperClass={this.slotCssClasses()} onSlotchange={this.updateSlotData} />
          )}
          <div class="label" part="label">
            {this.getLabelText() || <slot part="inner" />}
          </div>
          {this.checked && this.type === 'multiple' && <wpp-icon-tick class="active-icon" part="active-icon" />}
          {this.removable && (this.type === 'display' || this.type === 'draggable') && (
            <wpp-icon-cross
              class={{ [`${this.focusType['icon-close']}`]: true }}
              part="remove-icon"
              onClick={this.onClose}
              tabIndex={this.disabled ? -1 : 0}
              onMouseDown={this.onMouseDown}
              onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'icon-close')}
            />
          )}
        </div>
      </Host>
    )
  }
}
