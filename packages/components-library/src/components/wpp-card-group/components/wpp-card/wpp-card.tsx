import { Component, h, Prop, Host, Event, EventEmitter, Element, State, Fragment } from '@stencil/core'

import { getSlotEmptyStates, isEventTargetContained } from '../../../../utils/utils'

import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'

import { FOCUS_TYPE } from '../../../../types/common'
import { CardSize, CardType, CardValue, CardState, CardChangeEventDetail, CardTabElements } from './types'

interface FocusType {
  card: FOCUS_TYPE
  icon: FOCUS_TYPE
}

const getInitFocusInfo = (): FocusType => ({
  card: FOCUS_TYPE.NONE,
  icon: FOCUS_TYPE.NONE,
})

/**
 * @slot - Content that is placed inside the card. The default slot, without the name attribute.
 * @slot header - Content that is placed inside the header section.
 * @slot actions - Content is placed inside the `.actions` element and add content to actions.
 *
 * @part header-wrapper - card header wrapper
 * @part header - card header
 * @part card - card container
 * @part actions - actions container
 * @part radio - input radio element
 * @part checkbox - Checkbox element
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-card',
  styleUrl: 'wpp-card.scss',
  shadow: true,
})
export class WppCard {
  @Element() host: HTMLWppCardElement

  @State() hasHeaderSlot: boolean = false
  @State() hasActionsSlot: boolean = false

  @State() componentState: CardState = {
    hover: false,
    active: false,
  }

  @State() focusType: FocusType = getInitFocusInfo()

  /**
   * Indicates the variant of the card.
   */
  @Prop() readonly variant: 'primary' | 'secondary' = 'primary'

  /**
   * Indicates the value of the card
   */
  @Prop({ reflect: true }) readonly value?: CardValue

  /**
   * Indicates the size of the card
   */
  @Prop() readonly size: CardSize = 'm'

  /**
   * Indicates the type of the card
   */
  @Prop({ mutable: true }) type?: CardType

  /**
   * If `true`, the card is disabled
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the card is checked
   */
  @Prop({ reflect: true, mutable: true }) checked: boolean = false

  /**
   * If `true`, it means that the card is nested inside another card, and clicking it will prevent
   * the value from card-group to change.
   *
   * @internal - This.prop is controlled by card group component, do not set it manually.
   */
  @Prop({ reflect: true }) readonly nested: boolean = false

  /**
   * If `true`, the card group has radio or checkbox button on the right-top-side of the card
   *
   * @internal - This prop is controlled by card group component, do not set it manually
   */
  @Prop({ reflect: true, mutable: true }) withRadioOrCheckbox: boolean

  /**
   * Indicates the name of the card
   */
  @Prop({ reflect: true }) readonly name?: string

  /**
   * If `true`, then on hover and on pressed card appropriate styles will be applied
   */
  @Prop() readonly interactive: boolean = false

  /**
   * Emitted when the checked state changes
   */
  @Event({ bubbles: false, composed: false }) wppClick: EventEmitter<CardChangeEventDetail>

  /**
   * Emitted when the card receives focus
   */
  @Event({ bubbles: false, composed: false }) wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the card loses focus
   */
  @Event({ bubbles: false, composed: false }) wppBlur: EventEmitter<FocusEvent>

  componentWillLoad() {
    this.updateSlotData()
  }

  private getUpdatedFocusInfo = (type: CardTabElements, updateValue: FOCUS_TYPE): FocusType => ({
    ...this.focusType,
    [type]: updateValue,
  })

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      actions: '[slot="actions"]',
      header: '[slot="header"]',
    })

    this.hasActionsSlot = !emptyStates.actions
    this.hasHeaderSlot = !emptyStates.header
  }

  private onClick = (event: MouseEvent) => {
    if (this.disabled) return

    const actionsContainer = this.host.querySelector('[slot="actions"]') as HTMLDivElement

    if (actionsContainer && isEventTargetContained(actionsContainer as HTMLDivElement, event)) {
      return
    }

    this.wppClick.emit({
      checked: !this.checked,
      value: this.value as CardValue,
    })
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = this.getUpdatedFocusInfo('card', FOCUS_TYPE.NONE)
    this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.NONE)

    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = this.getUpdatedFocusInfo('card', FOCUS_TYPE.MOUSE)
    this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.MOUSE)

    this.updateComponentState({ active: true })
  }

  private onKeyUp = (event: KeyboardEvent, type: CardTabElements) => {
    if (event.key === 'Tab') {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB)
    }
  }

  private checkTabIndex = () => {
    if (this.hasActionsSlot && !this.interactive) {
      return null
    } else if ((this.interactive && !this.hasActionsSlot) || !!this.type) {
      return 0
    }
  }

  private updateComponentState = (updateData: Partial<CardState>) => {
    this.componentState = {
      ...this.componentState,
      ...updateData,
    }
  }

  private cardCssClasses = () => ({
    card: true,
    [`${this.variant}`]: true,
    [`size-${this.size}`]: true,
    choosable: !!this.type,
    disabled: !!this.type && this.disabled,
    checked: this.checked,
    interactive: this.interactive,
    'tab-focus': this.focusType.card === FOCUS_TYPE.TAB && this.focusType.icon !== FOCUS_TYPE.TAB,
    'with-actions': this.hasActionsSlot,
  })

  private headerCssClasses = () => ({
    header: true,
    'slot-hidden': !this.hasHeaderSlot,
  })

  private actionsCssClasses = () => ({
    actions: true,
    'slot-hidden': !this.hasActionsSlot,
  })

  private headerWrapperCssClasses = () => ({
    'header-wrapper': true,
    'with-actions': this.hasActionsSlot,
  })

  private hostCssClasses = () => ({
    'wpp-card': true,
  })

  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : ''

    return (
      <Host
        onMouseEnter={() => this.updateComponentState({ hover: true })}
        onMouseLeave={() => this.updateComponentState({ hover: false })}
        onMouseUp={() => this.updateComponentState({ active: false })}
        onMouseDown={this.onMouseDown}
        onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'card')}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        aria-disabled={this.disabled}
        aria-checked={this.checked}
        aria-hidden={this.disabled ? 'true' : null}
        htmlFor={this.name}
        exportparts="card, header-outer-wrapper, header-wrapper radio, checkbox, actions-wrapper"
        class={this.hostCssClasses()}
        tabIndex={this.disabled ? -1 : this.checkTabIndex()}
      >
        <div class={this.cardCssClasses()} part="card">
          <div class={this.headerWrapperCssClasses()} part="header-outer-wrapper">
            <WrappedSlot
              name="header"
              wrapperClass={this.headerCssClasses()}
              onSlotchange={this.updateSlotData}
              part="header"
            />

            {this.withRadioOrCheckbox && (
              <Fragment>
                {this.type === 'single' && (
                  <wpp-radio
                    class="radio"
                    internalState={displayState}
                    name={this.name}
                    checked={this.checked}
                    disabled={this.disabled}
                    index={-1}
                    part="radio"
                  />
                )}
                {this.type === 'multiple' && (
                  <wpp-checkbox
                    class="checkbox"
                    internalState={displayState}
                    name={this.name}
                    checked={this.checked}
                    disabled={this.disabled}
                    index={-1}
                    part="checkbox"
                  />
                )}
              </Fragment>
            )}

            <WrappedSlot
              name="actions"
              part="actions"
              wrapperClass={this.actionsCssClasses()}
              onSlotchange={this.updateSlotData}
              onBlur={this.onBlur}
              tabIndex={0}
              onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'icon')}
            />
          </div>

          <slot />
        </div>
      </Host>
    )
  }
}
