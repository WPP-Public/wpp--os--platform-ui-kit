import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'

import { AriaProps, InputMessageTypes, DropdownConfig, FOCUS_TYPE } from '../../types/common'

import { BaseComponent } from '../../interfaces/base-component'
import { BaseFormControl } from '../../interfaces/base-form-control'
import { InlineMessage } from '../../interfaces/inline-message'

import { TextareaInputChangeEventDetail, TextareaInputValue, TextareaInputLocales, TextareaLabelConfig } from './types'
import { autoFocusElement } from '../../utils/utils'
import { LOCALES_DEFAULTS } from './const'

/**
 * @part textarea - Textarea input element
 * @part label - Label text element
 * @part message-wrapper - message wrapper element
 * @part message - message element
 * @part limit-wrapper - limit block wrapper element
 * @part limit-label - limit label text element
 * @part limit-text - limit value text element
 */
@Component({
  tag: 'wpp-textarea-input',
  styleUrl: 'wpp-textarea-input.scss',
  shadow: true,
})
export class WppTextareaInput implements BaseComponent, BaseFormControl<TextareaInputValue>, InlineMessage {
  private inputRef?: HTMLTextAreaElement
  private _locales: TextareaInputLocales = LOCALES_DEFAULTS

  @State() focusType: FOCUS_TYPE

  @Element() readonly host: HTMLWppTextareaInputElement

  /**
   * Defines the textarea name.
   */
  @Prop() readonly name?: string

  /**
   * Defines the textarea value.
   */
  @Prop({ mutable: true }) value: TextareaInputValue

  /**
   * Defines the textarea placeholder.
   */
  @Prop() readonly placeholder?: string

  /**
   * If the textarea is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If the textarea is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the input should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * Defines the textarea height in rows.
   */
  @Prop({ reflect: true }) readonly rows: number

  /**
   * Defines the textarea size.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: TextareaLabelConfig

  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Defines the textarea message.
   */
  @Prop() readonly message?: string

  /**
   * Defines the textarea message type.
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Defines a maximum length for the textarea threshold warning/error messages. Once a message exceeds `maxMessageLength`, it will be truncated, with the full message shown in a tooltip.
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Defines the textarea character limit.
   */
  @Prop() readonly charactersLimit?: number

  /**
   * Defines a char threshold after which users are notified that they are about to exceed `charactersLimit`.
   */
  @Prop() readonly warningThreshold: number = 20

  /**
   * Contains the textarea `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Indicates locales for textarea component
   */
  @Prop() readonly locales: Partial<TextareaInputLocales> = {}

  /**
   * Emitted when the textarea value changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<TextareaInputChangeEventDetail>

  /**
   * Emitted when the textarea is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the textarea loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

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
   * Method that sets input value.
   */
  @Method()
  async setValue(value: TextareaInputValue): Promise<void> {
    this.value = value
    this.wppChange.emit({
      value,
      name: this.name,
    })
  }

  /**
   * Method that returns current input value.
   */
  @Method()
  async getValue(): Promise<TextareaInputValue> {
    return this.value
  }

  @State() private enteredCharacters: number

  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales }

    if (this.charactersLimit) {
      this.updateEnteredCharacters()
    }
  }

  componentDidLoad() {
    autoFocusElement(this.autoFocus, this.inputRef)
  }

  private updateEnteredCharacters() {
    this.enteredCharacters = this.value?.length ?? 0
  }

  @Watch('value')
  onValueChange() {
    this.updateEnteredCharacters()
  }

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<TextareaInputLocales>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  private onFocus = (event: FocusEvent): void => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent): void => {
    this.focusType = FOCUS_TYPE.NONE

    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB
  }

  private onInput = (event: Event): void => {
    this.focusType = FOCUS_TYPE.NONE
    this.value = (event.target as HTMLTextAreaElement).value

    if (this.charactersLimit) {
      this.enteredCharacters = this.value.length
    }

    this.wppChange.emit({
      value: this.value,
      name: this.name,
    })
  }

  private hostCssClasses = () => ({
    'wpp-textarea-input': true,
    'wpp-textarea-wrapper': true,
  })

  private textAreaCssClasses = () => ({
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    [`${this.messageType}`]: Boolean(this.messageType),
  })

  private charLimitCssClasses = () => ({
    'characters-limit': true,
    warning: Boolean(
      this.charactersLimit &&
        this.enteredCharacters >= this.warningThreshold &&
        this.enteredCharacters <= this.charactersLimit,
    ),
    error: Boolean(this.charactersLimit && this.enteredCharacters > this.charactersLimit),
  })

  private messageCssClasses = () => ({
    'messages-wrapper': true,
    'without-text-message': !!this.charactersLimit && !this.message,
  })

  render() {
    const style = {
      '--text-area-height-by-rows': this.rows ? 'auto' : '',
    }

    return (
      <Host
        class={this.hostCssClasses()}
        aria-disabled={this.disabled}
        aria-required={this.required}
        exportparts="label, textarea, message-wrapper, message, limit-wrapper, limit-label, limit-text"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyUp={this.onKeyUp}
      >
        {this.labelConfig?.text && (
          <wpp-label
            class="label"
            htmlFor={this.name}
            optional={!this.required}
            disabled={this.disabled}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
            part="label"
          />
        )}
        <textarea
          name={this.name}
          value={this.value}
          disabled={this.disabled}
          placeholder={this.placeholder}
          rows={this.rows}
          id={this.name}
          required={this.required}
          class={this.textAreaCssClasses()}
          onInput={this.onInput}
          ref={inputRef => (this.inputRef = inputRef)}
          part="textarea"
          aria-label={this.ariaProps.label}
          style={style}
          title=""
        />

        {(!!this.charactersLimit || !!this.message) && (
          <div class={this.messageCssClasses()} part="message-wrapper">
            {!!this.message && (
              <wpp-inline-message
                message={this.message}
                type={this.messageType}
                showTooltipFrom={this.maxMessageLength}
                part="message"
              />
            )}
            {!!this.charactersLimit && (
              <div class={this.charLimitCssClasses()} data-testid="char-entered-label" part="limit-wrapper">
                <wpp-typography type="xs-body" tag="span" part="limit-label">
                  {this._locales.charactersEntered}:
                </wpp-typography>
                <wpp-typography type="xs-strong" tag="span" class="entered-characters" part="limit-text">
                  {this.enteredCharacters}/{this.charactersLimit}
                </wpp-typography>
              </div>
            )}
          </div>
        )}
      </Host>
    )
  }
}
