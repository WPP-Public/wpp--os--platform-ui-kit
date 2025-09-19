import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core'
import { Maskito, MaskitoOptions } from '@maskito/core'
import { maskitoPhoneOptionsGenerator } from '@maskito/phone'
import metadata from 'libphonenumber-js/min/metadata'
import {
  maskitoPrefixPostprocessorGenerator,
  maskitoWithPlaceholder,
  maskitoNumberOptionsGenerator,
} from '@maskito/kit'

import { AriaProps, InputMessageTypes, FOCUS_TYPE, DropdownConfig } from '../../types/common'
import { autoFocusElement, debounce, getSlotEmptyStates } from '../../utils/utils'

import { BaseComponent } from '../../interfaces/base-component'
import { BaseFormControl } from '../../interfaces/base-form-control'
import { InlineMessage } from '../../interfaces/inline-message'
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

import {
  InputChangeEventDetail,
  InputValue,
  InputTypes,
  InputLabelConfig,
  tabElements,
  InputLocaleInterface,
  MaskOptions,
  WppChangeExtraEventDetail,
} from './types'
import { getRawValueForExtra, getValidAutocomplete } from './utils'

interface FocusType {
  input: FOCUS_TYPE
  icon: FOCUS_TYPE
}

const getInitFocusInfo = (): FocusType => ({
  input: FOCUS_TYPE.NONE,
  icon: FOCUS_TYPE.NONE,
})

/**
 * @part input - Input element
 * @part label - label text element
 * @part body - Main content element
 * @part icon-search - icon search element
 * @part icon-cross - icon cross element
 * @part message - message
 *
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a search icon.
 * @slot icon-end - Can contain an icon that will be placed after the main content, e.g. a cross icon.
 */
@Component({
  tag: 'wpp-input',
  styleUrl: 'wpp-input.scss',
  shadow: true,
})
export class WppInput implements BaseComponent, BaseFormControl<InputValue>, InlineMessage {
  private debouncedCheckForEllipsis: () => void
  private hadChangesInTooltip?: boolean = false
  private inputRef?: HTMLInputElement
  private lengthValidationError?: string
  private maskedElement?: Maskito
  private suppressInputEvent: boolean = false

  @State() private hasActiveEllipses: boolean = false

  @State() private hasIconStartSlot: boolean = false

  @State() private hasIconEndSlot: boolean = false

  @State() focusType: FocusType = getInitFocusInfo()

  @Element() readonly host: HTMLWppInputElement

  @State() private initialProcessed: boolean = false

  /**
   * Defines the input name.
   */
  @Prop() readonly name?: string

  /**
   * Defines the input type.
   */
  @Prop() readonly type: InputTypes = 'text'

  /**
   * Defines the input value.
   */
  @Prop({ mutable: true }) value: InputValue

  /**
   * Defines the default value of the input.
   * Note: This value is used only when the component is uncontrolled.
   */
  @Prop() readonly defaultValue?: InputValue

  /**
   * Defines the input placeholder.
   */
  @Prop() readonly placeholder?: string

  /**
   * If the input is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If the input is readonly.
   */
  @Prop({ reflect: true }) readonly readOnly: boolean = false

  /**
   * If the input is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the input should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * Defines the input size.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * Defines the input message.
   */
  @Prop() readonly message?: string

  /**
   * Defines the input message type.
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Defines the input message maximum length.
   */
  @Prop() readonly maxMessageLength?: number | 'auto'

  /**
   * Contains the input `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {}

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Defines the custom mask options. Currently, it can be used with the following types: 'decimal', 'text', 'tel'
   */
  @Prop() readonly maskOptions?: MaskOptions

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: InputLabelConfig

  /**
   * Indicates the maximum number of characters the input can accept.
   * If the user introduces more characters, the input will display an error.
   */
  @Prop() readonly maxLength?: number

  /**
   * Indicates the minimum number of characters the input can accept.
   * If the user introduces less characters, the input will display an error.
   */
  @Prop() readonly minLength?: number

  /**
   * Defines the component locale types.
   */
  @Prop() readonly locales: InputLocaleInterface = {
    minLengthErrorMessage: minLength => `The input must have at least ${minLength} characters`,
    maxLengthErrorMessage: maxLength => `The input can have a maximum of ${maxLength} characters`,
  }

  /**
   * If the component is loading.
   */
  @Prop({ reflect: true }) readonly loading: boolean = false

  /**
   * Defines the autocomplete behavior for the input.
   * Possible values:
   * - "on": Enables autocomplete for the input.
   * - "off": Disables autocomplete for the input.
   * - Additional valid values: See HTML specifications (e.g., "name", "email", "username").
   * Default: "off"
   */
  @Prop() readonly autocomplete: string = 'off'

  /**
   * Emitted when the input value changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<InputChangeEventDetail>

  /**
   * Emitted when the input is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the input loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * New optional event that emits both raw and formatted values of the input.
   * - `raw`: The unformatted input value, typically representing the actual data entered by the user.
   * - `formatted`: The processed or masked value displayed in the input field, based on the applied mask or formatting rules.
   *
   * This event can be useful in cases where both raw and formatted values are needed,
   * such as when handling currency, phone numbers, or other masked inputs.
   *
   * Unlike `wppChange`, which emits only the formatted value, `wppChangeExtra` provides
   * both representations, allowing better control over data handling.
   */
  @Event({ bubbles: false, composed: false })
  readonly wppChangeExtra: EventEmitter<WppChangeExtraEventDetail>

  /**
   * Method that listens to the window resize event.
   */
  @Listen('resize', { target: 'window' })
  onResize() {
    if (this.debouncedCheckForEllipsis) {
      this.debouncedCheckForEllipsis()
    }
  }

  /**
   * Method that selects all the text in an element
   */
  @Method()
  async select(): Promise<void> {
    this.inputRef?.select()
  }

  /**
   * Method that sets focus on the native input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.focus()
  }

  /**
   * Method that sets the input value programmatically.
   */
  @Method()
  async setValue(value: InputValue): Promise<void> {
    this.value = value

    if (this.inputRef) {
      this.inputRef.value = value
      this.updateInputWithMask()
      this.suppressInputEvent = true
      const inputEvent = new InputEvent('input', { bubbles: true, composed: true })

      this.inputRef.dispatchEvent(inputEvent)
    }

    setTimeout(() => {
      const formattedValue = this.inputRef ? this.inputRef.value : value

      this.value = formattedValue
      const rawValue = getRawValueForExtra(formattedValue, this.type, this.maskOptions)

      if (this.suppressInputEvent) {
        this.suppressInputEvent = false
        this.wppChangeExtra.emit({
          raw: rawValue,
          formatted: formattedValue,
          name: this.name,
        })
        this.wppChange.emit({
          value: formattedValue,
          name: this.name,
        })
      }
    }, 100)
  }

  /**
   * Method that returns current input value.
   */
  @Method()
  async getValue(): Promise<InputValue> {
    return this.value
  }

  @Watch('value')
  onUpdateValue() {
    if (this.focusType.input === FOCUS_TYPE.NONE && this.debouncedCheckForEllipsis) {
      // This will be called when the value changes when moving the slider's thumbs.
      this.debouncedCheckForEllipsis()
    }
  }

  componentWillLoad() {
    this.updateSlotData()

    this.debouncedCheckForEllipsis = debounce(() => {
      this.checkForEllipsis()
    }, 50)
  }

  componentDidRender() {
    if (this.hadChangesInTooltip && this.inputRef) {
      this.updateInputWithMask()
      this.hadChangesInTooltip = false
    }
  }

  async componentDidLoad() {
    autoFocusElement(this.autoFocus, this.inputRef)
    // Need to wait on fonts load and after that measure the size of text and input available space for the content
    try {
      await document.fonts.ready
      requestAnimationFrame(() => {
        this.checkForEllipsis()
      })
    } catch (_) {
      setTimeout(() => {
        this.checkForEllipsis()
      }, 100)
    }

    this.updateInputWithMask()

    if (this.value && this.maskOptions && this.inputRef && !this.initialProcessed) {
      this.suppressInputEvent = true
      const inputEvent = new InputEvent('input', { bubbles: true, composed: true })

      this.inputRef.dispatchEvent(inputEvent)
      const newFormatted = this.inputRef ? this.inputRef.value : this.value

      if (newFormatted !== this.value) {
        this.setValue(newFormatted)
      }

      this.initialProcessed = true
      this.suppressInputEvent = false
    }
  }

  private updateInputRef = (inputRef: HTMLInputElement | undefined) => {
    if (inputRef) this.inputRef = inputRef
  }

  private updateInputWithMask = () => {
    // Masks currently work only for these types
    if (this.inputRef && ['decimal', 'text', 'tel'].includes(this.type)) {
      const maskOptions: MaskitoOptions | undefined = this.createMaskOptions()

      if (!maskOptions) return

      this.maskedElement = new Maskito(this.inputRef, { overwriteMode: 'shift', ...maskOptions })
    }
  }

  disconnectedCallback() {
    if (this.maskedElement) {
      this.maskedElement.destroy()
    }
  }

  private checkForEllipsis = (): void => {
    // This requestAnimationFrame is needed here because Maskito applies validations directly in the input
    // and the text you type might change after first render.
    requestAnimationFrame(() => {
      if (!this.inputRef) return

      if (this.value && this.value.length > 0) {
        const inputComputedStyles = window.getComputedStyle(this.inputRef)
        let inputContentWidth = this.inputRef.clientWidth
        let inputScrollWidth = this.inputRef.scrollWidth
        const paddingLeft = inputComputedStyles.paddingLeft
        const paddingRight = inputComputedStyles.paddingRight

        if (paddingLeft?.endsWith('px') && paddingRight?.endsWith('px')) {
          inputContentWidth -= parseFloat(paddingLeft) + parseFloat(paddingRight)
          inputScrollWidth -= parseFloat(paddingLeft) + parseFloat(paddingRight)
        }

        const hasScroll = inputContentWidth < inputScrollWidth

        this.hadChangesInTooltip = this.hasActiveEllipses !== hasScroll
        this.hasActiveEllipses = hasScroll
      } else {
        this.hadChangesInTooltip = this.hasActiveEllipses !== false
        this.hasActiveEllipses = false
      }
    })
  }

  private createMaskOptions = (): MaskitoOptions | undefined => {
    if (this.maskOptions?.customPatternOptions) {
      if (this.type === 'text') {
        return {
          ...(this.maskOptions?.maskPlaceholder ? maskitoWithPlaceholder(this.maskOptions.maskPlaceholder) : {}),
          ...this.maskOptions?.customPatternOptions,
        }
      }

      return this.maskOptions?.customPatternOptions
    }

    if (this.type === 'tel') {
      return this.createTelPatternOptions()
    }

    if (this.type === 'decimal') {
      return this.maskOptions?.decimalPatternOptions
        ? maskitoNumberOptionsGenerator(this.maskOptions.decimalPatternOptions)
        : { mask: /^-?\d*(?:[.,]\d*)?$/ } // Apply default
    }

    return undefined
  }

  private createTelPatternOptions = (): MaskitoOptions => {
    if (!this.maskOptions?.telPatternOptions) {
      // Apply default
      return {
        mask: /^[()+\-\s\d]+$/,
      }
    }

    if (this.maskOptions.telPatternOptions.mask && this.maskOptions.telPatternOptions.countryPhoneCode) {
      if (this.maskOptions.maskPlaceholder) {
        const { removePlaceholder, plugins, ...placeholderOptions } = maskitoWithPlaceholder(
          this.maskOptions.maskPlaceholder,
        )

        return {
          preprocessors: placeholderOptions.preprocessors,
          postprocessors: [
            maskitoPrefixPostprocessorGenerator(this.maskOptions.telPatternOptions.countryPhoneCode),
            ...placeholderOptions.postprocessors,
          ],
          plugins,
          mask: this.maskOptions.telPatternOptions.mask,
        }
      }

      return {
        postprocessors: [maskitoPrefixPostprocessorGenerator(this.maskOptions.telPatternOptions.countryPhoneCode)],
        mask: this.maskOptions.telPatternOptions.mask,
      }
    }

    return maskitoPhoneOptionsGenerator({
      countryIsoCode: this.maskOptions?.telPatternOptions?.countryCode || 'US',
      metadata,
    })
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      start: '[slot="icon-start"]',
      end: '[slot="icon-end"]',
    })

    this.hasIconStartSlot = !emptyStates.start
    this.hasIconEndSlot = !emptyStates.end
  }

  private getUpdatedFocusInfo = (type: tabElements, updateValue: FOCUS_TYPE): FocusType => ({
    ...this.focusType,
    [type]: updateValue,
  })

  private validateInputLength = () => {
    if (!this.maxLength && !this.minLength) return

    if (this.maxLength && this.value.length > this.maxLength) {
      this.lengthValidationError = this.locales.maxLengthErrorMessage(this.maxLength)
    } else if (this.minLength && this.value.length < this.minLength) {
      this.lengthValidationError = this.locales.minLengthErrorMessage(this.minLength)
    } else {
      this.lengthValidationError = undefined
    }
  }

  private onInput = (event: Event): void => {
    if (this.suppressInputEvent) {
      this.suppressInputEvent = false

      return
    }

    const eventValue = (event.target as HTMLInputElement).value
    const rawValue = getRawValueForExtra(eventValue, this.type, this.maskOptions)

    this.value = eventValue

    if (!rawValue) {
      this.hadChangesInTooltip = this.hasActiveEllipses !== false
      this.hasActiveEllipses = false
      requestAnimationFrame(() => this.setFocus())
    }

    if (this.type === 'number' || this.type === 'decimal') this.validateInputLength()

    this.wppChange.emit({
      value: this.value,
      name: this.name,
    })

    this.wppChangeExtra.emit({
      raw: rawValue,
      formatted: eventValue,
      name: this.name,
    })
  }

  private onClear = (event: MouseEvent): void => {
    event.preventDefault()
    event.stopPropagation()

    this.value = ''
    this.hasActiveEllipses = false

    requestAnimationFrame(() => this.setFocus())

    this.wppChange.emit({
      value: this.value,
      name: this.name,
    })

    this.wppChangeExtra.emit({
      raw: '',
      formatted: '',
      name: this.name,
    })
  }

  private onFocus = (event: FocusEvent): void => {
    if (this.type === 'search') {
      this.inputRef?.select()
    }

    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent): void => {
    this.checkForEllipsis()
    this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.NONE)
    this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.NONE)

    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.MOUSE)
    this.focusType = this.getUpdatedFocusInfo('input', FOCUS_TYPE.MOUSE)
  }

  private onKeyUp = (event: KeyboardEvent, type: tabElements) => {
    if (event.key === 'Tab') {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB)
    }
  }

  private onKeyPress = (event: KeyboardEvent) => {
    if (this.type !== 'number') return

    if (!event.key.match(/^[0-9]+$/)) event.preventDefault()
  }

  private inputCssClasses = () => ({
    'input-element': true,
    [`size-${this.size}`]: true,
    [`${this.messageType}`]: !!this.messageType,
    [`with-icon-start`]:
      this.hasIconStartSlot || (this.type === 'search' && this.loading && !this.disabled) || this.type === 'search',
    [`with-icon-end`]: this.hasIconEndSlot || this.type === 'search',
    'tab-focus': this.focusType.input === FOCUS_TYPE.TAB && this.focusType.icon !== FOCUS_TYPE.TAB,
    'with-validation-error': !!this.lengthValidationError,
  })

  private wrapperCssClasses = () => ({
    'wpp-input': true,
    'with-value': !!this.value?.length,
    [`wpp-size-${this.size}`]: true,
  })

  private inputWithIconsCssClasses = () => ({
    'input-with-icons': true,
  })

  private iconStartCssClasses = () => ({
    'icon-start': true,
    'disabled-icon': this.disabled,
    'slot-hidden': !this.hasIconStartSlot && !(this.type === 'search' && this.loading && !this.disabled),
  })

  private iconEndCssClasses = () => ({
    'icon-end': true,
    'disabled-icon': this.disabled,
    'slot-hidden': !this.hasIconEndSlot && !(this.type === 'search' && this.loading && !this.disabled),
  })

  private inputId = this.name || `wpp-input-${Math.random().toString(36).substr(2, 9)}`
  private labelId = `${this.inputId}-label`

  private renderInput = () => (
    <input
      id={this.inputId}
      class={this.inputCssClasses()}
      name={this.name}
      type={this.type}
      value={this.value}
      required={this.required}
      disabled={this.disabled}
      onInput={this.onInput}
      onKeyPress={this.onKeyPress}
      readOnly={this.readOnly}
      ref={inputRef => this.updateInputRef(inputRef)}
      aria-label={this.ariaProps.label}
      defaultValue={this.defaultValue}
      part="input"
      title=""
      placeholder={this.placeholder}
      autocomplete={getValidAutocomplete(this.autocomplete)}
      aria-disabled={this.disabled || this.loading ? 'true' : 'false'}
      aria-required={this.required ? 'true' : undefined}
      aria-labelledby={this.labelConfig?.text ? this.labelId : undefined}
      aria-invalid={this.lengthValidationError || this.messageType === 'error' ? 'true' : undefined}
      data-testid="input"
    />
  )

  private renderSearchIconOrSpinner = () => {
    if (this.type !== 'search') return null

    if (this.loading && !this.disabled) {
      return <wpp-spinner class={this.iconStartCssClasses()} slot="left" aria-label="Loading" />
    }

    return <wpp-icon-search class={this.iconStartCssClasses()} part="icon-search" />
  }

  render() {
    return (
      <Host
        class={this.wrapperCssClasses()}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'input')}
        exportparts="label, body, icon-search, input, icon-cross, message, icon-start, icon-start-wrapper, icon-end, icon-end-wrapper"
      >
        {this.labelConfig?.text && (
          <wpp-label
            class="label"
            id={this.labelId}
            htmlFor={this.inputId}
            optional={!this.required}
            disabled={this.disabled}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
            part="label"
          />
        )}

        <div class={this.inputWithIconsCssClasses()} part="body">
          <WrappedSlot wrapperClass={this.iconStartCssClasses()} name="icon-start" onSlotchange={this.updateSlotData} />

          {this.renderSearchIconOrSpinner()}

          <wpp-tooltip
            part="anchor"
            text={this.value}
            class="with-tooltip"
            disabled={!this.hasActiveEllipses}
            anchorTabIndex={-1}
          >
            {this.renderInput()}
          </wpp-tooltip>

          {(this.type === 'search' || this.loading) && !!this.value && (
            <wpp-icon-cross
              class={this.iconEndCssClasses()}
              aria-label="Erase input text"
              tabIndex={0}
              part="icon-cross"
              onClick={event => this.onClear(event)}
              onBlur={this.onBlur}
              onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'icon')}
            />
          )}
          <WrappedSlot
            wrapperClass={this.iconEndCssClasses()}
            name="icon-end"
            onSlotchange={this.updateSlotData}
            tabIndex={this.hasIconEndSlot ? 0 : -1}
            aria-label="Clear input"
            role="button"
          />
        </div>

        {this.lengthValidationError && (
          <wpp-inline-message
            message={this.lengthValidationError}
            type={'error'}
            showTooltipFrom={this.maxMessageLength}
            tooltipConfig={this.tooltipConfig}
            part="message"
          />
        )}

        {this.message && (
          <wpp-inline-message
            message={this.message}
            type={this.messageType}
            showTooltipFrom={this.maxMessageLength}
            tooltipConfig={this.tooltipConfig}
            part="message"
          />
        )}
      </Host>
    )
  }
}
