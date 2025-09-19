import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core'

import { AriaProps, DropdownConfig, FOCUS_TYPE } from '../../types/common'

import { BooleanFormControl } from '../../interfaces/boolean-form-control'
import { BaseComponent } from '../../interfaces/base-component'

import { ToggleChangeEvent, ToggleValue, ToggleLabelConfig } from './types'

/**
 * @part label - Label text element
 * @part input - input element
 */
@Component({
  tag: 'wpp-toggle',
  styleUrl: 'wpp-toggle.scss',
  shadow: true,
})
export class WppToggle implements BaseComponent, BooleanFormControl<ToggleValue> {
  private inputRef?: HTMLInputElement

  @State() focusType: FOCUS_TYPE

  @Element() readonly host: HTMLWppToggleElement

  /**
   * Defines the toggle name.
   */
  @Prop() readonly name?: string

  /**
   * Defines the toggle value.
   */
  @Prop({ mutable: true }) value: ToggleValue

  /**
   * If the toggle is on.
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false

  /**
   * If the toggle is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If the toggle is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the toggle should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * Defines the toggle size.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * If the toggle works as controlled component.
   */
  @Prop({ reflect: true }) readonly controlled: boolean = false

  /**
   * Contains the toggle `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: ToggleLabelConfig

  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Emitted when toggle state changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<ToggleChangeEvent>

  /**
   * Emitted when the toggle is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the toggle loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Method that sets focus on the native input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.focus()
  }

  private onClick = (event: Event) => {
    if (this.disabled) return
    event.preventDefault()

    this.setFocus()
    if (!this.controlled) {
      this.checked = !this.checked

      this.wppChange.emit({
        value: this.value,
        checked: this.checked,
        name: this.name,
      })
    }
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.NONE
    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB
  }

  private hostCssClasses = () => ({
    'wpp-toggle': true,
    'wpp-toggle-wrapper': true,
    'wpp-disabled': this.disabled,
    'wpp-checked': this.checked,
  })

  private labelCssClasses = () => ({
    label: true,
    'with-text': !!this.labelConfig?.text,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    hide: !this.labelConfig?.text,
  })

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.onClick(event)
    }
  }

  render() {
    const inputId = this.name || 'wpp-toggle'
    const labelId = `${inputId}-label`
    const hasLabel = !!this.labelConfig?.text
    const labelText = this.labelConfig?.text || this.ariaProps.label

    // Only pass aria-label/aria-labelledby if there is NO label
    const ariaProps =
      !hasLabel && (this.ariaProps?.label || this.ariaProps?.labelledby)
        ? {
            ...(this.ariaProps.label ? { 'aria-label': this.ariaProps.label } : {}),
            ...(this.ariaProps.labelledby ? { 'aria-labelledby': this.ariaProps.labelledby } : {}),
          }
        : {}

    return (
      <Host onClick={this.onClick} class={this.hostCssClasses()} exportparts="label, input">
        <wpp-label
          class={this.labelCssClasses()}
          typography="s-body"
          optional={!this.required}
          htmlFor={inputId}
          disabled={this.disabled}
          config={this.labelConfig}
          tooltipConfig={this.labelTooltipConfig}
          part="label"
          labelId={labelId}
        >
          <input
            type="checkbox"
            name={this.name}
            id={inputId}
            value={this.value}
            disabled={this.disabled}
            checked={this.checked}
            required={this.required}
            autoFocus={this.autoFocus}
            ref={inputRef => (this.inputRef = inputRef)}
            class="toggle-input"
            part="input"
            {...ariaProps}
            title={labelText}
            aria-checked={this.checked ? 'true' : 'false'}
            aria-hidden={this.disabled ? 'true' : null}
            role="switch"
            tabIndex={this.disabled ? -1 : 0}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onMouseDown={this.onMouseDown}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
          />
        </wpp-label>
      </Host>
    )
  }
}
