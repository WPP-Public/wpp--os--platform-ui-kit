import { Component, Element, Event, EventEmitter, Fragment, h, Host, Method, Prop, State } from '@stencil/core'

import { getSlotEmptyStates, isEventTargetContained } from '../../../../utils/utils'

import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'

import { AriaProps, FOCUS_TYPE } from '../../../../types/common'
import { CardChangeEventDetail, CardSize, CardState, CardType, CardValue } from './types'

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

  @State() isPressed: boolean = false
  @State() focusType: FOCUS_TYPE

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
   * Used be remove tab navigation from the card in case when the component has WppRadio inside.
   *
   * @internal - This.prop is controlled by WppCardGroup component
   */
  @Prop({ mutable: true }) index: number = -1

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
   * Accepts CSS background property values to control the component's background appearance. This can include colors, images, gradients, and positioning parameters.
   */
  @Prop() readonly background?: string

  /**
   * Contains the card `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

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

  /**
   * Method that sets focus on the card element.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.host?.focus({ preventScroll: true })
    this.focusType = FOCUS_TYPE.TAB
  }

  componentWillLoad() {
    this.updateSlotData()
  }

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
    this.focusType = FOCUS_TYPE.NONE
    this.isPressed = false

    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE

    this.updateComponentState({ active: true })
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab' && document.activeElement === this.host) {
      this.focusType = FOCUS_TYPE.TAB
    }

    if (event.key === 'Enter' || event.key === ' ') {
      this.isPressed = false
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || document.activeElement !== this.host) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.isPressed = true

      this.wppClick.emit({
        checked: !this.checked,
        value: this.value as CardValue,
      })
    }
  }

  private checkTabIndex = () => {
    if (!!this.type || this.interactive) {
      return 0
    }

    return null
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
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    'with-actions': this.hasActionsSlot,
    pressed: this.isPressed,
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
    const isInteractive = !!this.type || this.interactive

    const role =
      this.ariaProps.role ??
      (this.type === 'single'
        ? 'radio'
        : this.type === 'multiple'
          ? 'checkbox'
          : this.interactive
            ? 'button'
            : undefined)
    const tabIndex = this.disabled
      ? -1
      : (this.ariaProps.tabIndex ??
        (this.type === 'single' ? this.index : this.type === 'multiple' ? 0 : this.checkTabIndex()))

    return (
      <Host
        onMouseEnter={() => this.updateComponentState({ hover: true })}
        onMouseLeave={() => this.updateComponentState({ hover: false })}
        onMouseUp={() => this.updateComponentState({ active: false })}
        {...(isInteractive ? { onMouseDown: this.onMouseDown } : {})}
        {...(isInteractive ? { onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp } : {})}
        {...(isInteractive ? { onClick: this.onClick } : {})}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        htmlFor={this.name}
        exportparts="card, header-outer-wrapper, header-wrapper radio, checkbox, actions-wrapper"
        class={this.hostCssClasses()}
        tabIndex={tabIndex}
        role={role}
        aria-disabled={this.withRadioOrCheckbox && this.disabled ? 'true' : undefined}
        aria-labelledby={this.ariaProps?.labelledby}
        {...((this.interactive || this.type) && role !== 'button'
          ? { ariaChecked: this.checked ? 'true' : 'false' }
          : {})}
        {...(role === 'button' ? { 'aria-pressed': this.checked ? 'true' : 'false' } : {})}
      >
        <div
          class={this.cardCssClasses()}
          part="card"
          {...(this.background ? { style: { background: this.background } } : {})}
        >
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
                    decorative={true}
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
                    decorative={true}
                  />
                )}
              </Fragment>
            )}

            <WrappedSlot
              name="actions"
              part="actions"
              wrapperClass={this.actionsCssClasses()}
              onSlotchange={this.updateSlotData}
            />
          </div>

          <slot />
        </div>
      </Host>
    )
  }
}
