import { Component, Element, Event, EventEmitter, h, Method, Prop, Host, State } from '@stencil/core'

import { AriaProps, FOCUS_TYPE, DropdownConfig } from '../../types/common'

import { BaseComponent } from '../../interfaces/base-component'
import { BooleanFormControl } from '../../interfaces/boolean-form-control'

import { RadioChangeEvent, RadioValue, RadioLabelConfig } from './types'
import { transformToVersionedTag } from '../../utils/utils'
import { Instance } from 'tippy.js'

/**
 * @part label - Label text element
 * @part input - input element
 * @part circle - radio circle element
 */
@Component({
  tag: 'wpp-radio',
  styleUrl: 'wpp-radio.scss',
  shadow: true,
})
export class WppRadio implements BaseComponent, BooleanFormControl<RadioValue> {
  @Element() readonly host: HTMLWppRadioElement

  private inputRef?: HTMLInputElement
  private tippyInstance?: Instance

  @State() focusType: FOCUS_TYPE

  @State() isPressed: boolean = false

  /**
   * Defines the radio name.
   */
  @Prop() readonly name?: string

  /**
   * Defines the radio value.
   */
  @Prop({ mutable: true }) value: RadioValue

  /**
   * If the radio is selected.
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false

  /**
   * If the radio is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If the radio is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the radio should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * Defines the radio size.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * Contains the radio `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: RadioLabelConfig

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Indicates custom classes to the radio
   *
   * @internal - This prop is controlled by card group component
   */
  @Prop() readonly internalState?: string = ''

  /**
   * Indicates the avatar tab index.
   *
   * @internal - This prop is controlled by radio group
   */
  @Prop() readonly index: number = 0

  /**
   * Create a component with role presentation
   *
   * @internal - This prop is controlled by WppCard component
   */
  @Prop() readonly decorative?: boolean = false

  /**
   * Emitted when the selected state changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<RadioChangeEvent>

  /**
   * Emitted when the radio is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the radio loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the radio button is clicked.
   *
   * @internal - This event is controlled by container like Radio Group, do not set it manually.
   */
  @Event({ bubbles: false, composed: false }) readonly wppClickRadio: EventEmitter<RadioChangeEvent>

  /**
   * Method that sets focus on the native input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.focus()
    this.focusType = FOCUS_TYPE.TAB
    this.tippyInstance?.show()
  }

  private onClick = () => {
    if (this.disabled) return

    this.checked = true

    this.wppChange.emit({
      value: this.value,
      checked: this.checked,
      name: this.name,
    })

    this.wppClickRadio.emit({
      value: this.value,
      checked: this.checked,
    })
  }

  private onInput = () => {
    if (this.disabled) return

    this.setFocus()
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.NONE
    this.tippyInstance?.hide()
    this.wppBlur.emit(event)
    this.isPressed = false
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return

    // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
    if ((event.key === 'Enter' || event.key === ' ') && this.host?.shadowRoot?.activeElement === this.inputRef) {
      event.preventDefault()

      const clickEvent = new MouseEvent('click', { bubbles: true, composed: true })

      this.host.dispatchEvent(clickEvent)
      this.isPressed = true
      this.checked = true
    }
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this.focusType = FOCUS_TYPE.TAB
      this.tippyInstance?.show()
    }

    if (event.key === 'Enter' || event.key === ' ') {
      this.isPressed = false
    }
  }

  private hostCssClasses = () => ({
    'wpp-radio': true,
    'wpp-radio-wrapper': true,
    'wpp-disabled': this.disabled,
    'wpp-checked': this.checked,
  })

  private labelCssClasses = () => ({
    label: true,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    'with-text': !!this.labelConfig?.text,
    [this.internalState as string]: true,
    pressed: this.isPressed,
  })

  private inputCssClasses = () => ({
    'radio-input': true,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  componentWillLoad(): void {
    const radioGroup = this.host.closest(transformToVersionedTag('wpp-radio-group')) as HTMLWppRadioGroupElement

    if (radioGroup) {
      this.checked = this.value === radioGroup.value
    }
  }

  render() {
    if (this.decorative) {
      return (
        <Host
          class={this.hostCssClasses()}
          aria-hidden="true"
          role="presentation"
          tabindex="-1"
          exportparts="label, content, inner"
          name={this.name}
        >
          <wpp-label class={this.labelCssClasses()} part="label">
            <div class="circle" part="circle" />
          </wpp-label>
        </Host>
      )
    }

    return (
      <Host
        class={this.hostCssClasses()}
        onKeyUp={this.onKeyUp}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        exportparts="label, content, inner"
        name={this.name}
      >
        <wpp-label
          class={this.labelCssClasses()}
          typography="s-body"
          htmlFor={this.name}
          disabled={this.disabled}
          optional={!this.required}
          config={this.labelConfig}
          onClick={this.onClick}
          tooltipConfig={{
            ...{
              onCreate: (instance: Instance) => {
                this.tippyInstance = instance
              },
              tabIndex: -1,
            },
            ...this.labelTooltipConfig,
          }}
          part="label"
        >
          <input
            class={this.inputCssClasses()}
            type="radio"
            name={this.name}
            id={this.name}
            value={this.value}
            disabled={this.disabled}
            checked={this.checked}
            required={this.required}
            onInput={this.onInput}
            autoFocus={this.autoFocus}
            ref={inputRef => (this.inputRef = inputRef)}
            aria-label={this.ariaProps.label}
            aria-hidden={this.disabled ? 'true' : null}
            aria-required={this.required.toString()}
            tabindex={this.disabled ? '-1' : this.index}
            part="input"
          />
          <div class="circle" part="circle" />
        </wpp-label>
      </Host>
    )
  }
}
