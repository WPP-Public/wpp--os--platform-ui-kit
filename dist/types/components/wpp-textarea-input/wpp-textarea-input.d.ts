import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, InputMessageTypes, DropdownConfig, FOCUS_TYPE } from '../../types/common';
import { BaseComponent } from '../../interfaces/base-component';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { InlineMessage } from '../../interfaces/inline-message';
import { TextareaInputChangeEventDetail, TextareaInputValue, TextareaInputLocales, TextareaLabelConfig } from './types';
/**
 * @part textarea - Textarea input element
 * @part label - Label text element
 * @part message-wrapper - message wrapper element
 * @part message - message element
 * @part limit-wrapper - limit block wrapper element
 * @part limit-label - limit label text element
 * @part limit-text - limit value text element
 */
export declare class WppTextareaInput implements BaseComponent, BaseFormControl<TextareaInputValue>, InlineMessage {
  private inputRef?;
  focusType: FOCUS_TYPE;
  readonly host: HTMLWppTextareaInputElement;
  /**
   * Defines the textarea name.
   */
  readonly name?: string;
  /**
   * Defines the textarea value.
   */
  value: TextareaInputValue;
  /**
   * Defines the textarea placeholder.
   */
  readonly placeholder?: string;
  /**
   * If the textarea is required.
   */
  readonly required: boolean;
  /**
   * If the textarea is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the input should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Defines the textarea height in rows.
   */
  readonly rows: number;
  /**
   * Defines the textarea size.
   */
  readonly size: 'm' | 's';
  /**
   * Indicates label config
   */
  labelConfig?: TextareaLabelConfig;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Defines the textarea message.
   */
  readonly message?: string;
  /**
   * Defines the textarea message type.
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines a maximum length for the textarea threshold warning/error messages. Once a message exceeds `maxMessageLength`, it will be truncated, with the full message shown in a tooltip.
   */
  readonly maxMessageLength?: number;
  /**
   * Defines the textarea character limit.
   */
  readonly charactersLimit?: number;
  /**
   * Defines a char threshold after which users are notified that they are about to exceed `charactersLimit`.
   */
  readonly warningThreshold: number;
  /**
   * Contains the textarea `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Indicates locales for textarea component
   */
  readonly locales: TextareaInputLocales;
  /**
   * Emitted when the textarea value changes.
   */
  readonly wppChange: EventEmitter<TextareaInputChangeEventDetail>;
  /**
   * Emitted when the textarea is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the textarea loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Method that selects all the text in an element
   */
  select(): Promise<void>;
  /**
   * Method that sets focus on the native input.
   */
  setFocus(): Promise<void>;
  /**
   * Method that sets input value.
   */
  setValue(value: TextareaInputValue): Promise<void>;
  /**
   * Method that returns current input value.
   */
  getValue(): Promise<TextareaInputValue>;
  private enteredCharacters;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private updateEnteredCharacters;
  onValueChange(): void;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private onInput;
  private hostCssClasses;
  private textAreaCssClasses;
  private charLimitCssClasses;
  private messageCssClasses;
  render(): any;
}
