import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { BaseComponent } from '../../interfaces/base-component';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { InlineMessage } from '../../interfaces/inline-message';
import { InputChangeEventDetail, InputLabelConfig, InputLocaleInterface, InputTypes, InputValue, MaskOptions, WppChangeExtraEventDetail } from './types';
interface FocusType {
  input: FOCUS_TYPE;
  icon: FOCUS_TYPE;
  inlineMessage: FOCUS_TYPE;
}
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
export declare class WppInput implements BaseComponent, BaseFormControl<InputValue>, InlineMessage {
  private inputRef?;
  private lengthValidationError?;
  private maskedElement?;
  private _locales;
  private previouslyRenderedValue?;
  private previouslyRenderedHasCrossIcon?;
  private generatedMask;
  private internalDefaultValue?;
  private resizeObserver?;
  private shouldRenderCrossIcon;
  private hasActiveEllipses;
  private hasIconStartSlot;
  private hasIconEndSlot;
  private isInputFocused;
  private isHovered;
  focusType: FocusType;
  renderedValue: InputValue;
  readonly host: HTMLWppInputElement;
  /**
   * Defines the input name.
   */
  readonly name?: string;
  /**
   * Defines the input type.
   */
  readonly type: InputTypes;
  /**
   * Defines the input value.
   */
  value: InputValue;
  /**
   * Defines the default value of the input.
   * Note: This value is used only when the component is uncontrolled.
   */
  readonly defaultValue?: InputValue;
  /**
   * Defines the input placeholder.
   */
  readonly placeholder?: string;
  /**
   * If the input is required.
   */
  readonly required: boolean;
  /**
   * If the input is readonly.
   */
  readonly readOnly: boolean;
  /**
   * If the input is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the input should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Defines the input size.
   */
  readonly size: 'm' | 's';
  /**
   * Defines the input message.
   */
  readonly message?: string;
  /**
   * Defines the input message type.
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines the input message maximum length.
   */
  readonly maxMessageLength?: number | 'auto';
  /**
   * Contains the input `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * The configuration for the tooltip displayed when the input is truncated.
   * @internal - this property is used internally. Controlled by the inline-edit. When the inline edit enters error state, the tooltip for truncation should not display.
   */
  readonly truncationTooltipConfig: DropdownConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Defines the custom mask options. Under the hood, the masking is done using maskito library. Provides various options, such as: custom patterns, telephone and number patterns.
   * Developers can also enable the placeholder for the mask by providing the `maskPlaceholder` property.
   * It can be used with the following types: 'text', 'tel', 'search', 'url', 'password'.
   */
  readonly maskOptions?: MaskOptions;
  /**
   * Indicates label config
   */
  labelConfig?: InputLabelConfig;
  /**
   * Indicates the maximum number of characters the input can accept.
   * If the user introduces more characters, the input will display an error.
   */
  readonly maxLength?: number;
  /**
   * Indicates the minimum number of characters the input can accept.
   * If the user introduces less characters, the input will display an error.
   */
  readonly minLength?: number;
  /**
   * Defines the component locale types.
   */
  readonly locales: Partial<InputLocaleInterface>;
  /**
   * If the component is loading.
   */
  readonly loading: boolean;
  /**
   * Defines the autocomplete behavior for the input.
   * Possible values:
   * - "on": Enables autocomplete for the input.
   * - "off": Disables autocomplete for the input.
   * - Additional valid values: See HTML specifications (e.g., "name", "email", "username").
   * Default: "off"
   */
  readonly autocomplete: string;
  /**
   * If the input displays a cross icon on the right side. Clicking the icon will reset the value of the input.
   * Note: The cross icon will appear only on inputs that have a min-width of 160px.
   */
  readonly withCrossIcon: boolean;
  /**
   * Emitted when the input value changes. If the input has a mask, the rawValue will also be provided.
   * - `value`: The processed or masked value of the input (in case a mask is applied).
   * - `rawValue`: The unformatted input value, typically representing the actual data entered by the user (provided only when the input has a mask).
   */
  readonly wppChange: EventEmitter<InputChangeEventDetail>;
  /**
   * Emitted when the input is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the input loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * @deprecated Use `wppChange` instead.
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
  readonly wppChangeExtra: EventEmitter<WppChangeExtraEventDetail>;
  /**
   * Method that selects all the text in an element
   */
  select(): Promise<void>;
  /**
   * Method that sets focus on the native input.
   */
  setFocus(isOutlined?: boolean): Promise<void>;
  /**
   * Method that sets the input value programmatically.
   */
  setValue(value: InputValue): Promise<void>;
  /**
   * Method that returns current input value.
   */
  getValue(): Promise<InputValue>;
  onUpdateMaskOptions(newMaskOptions: MaskOptions, prevMaskOptions: MaskOptions): void;
  onUpdateLocales(newLocales: Partial<InputLocaleInterface>): void;
  onUpdateValue(newValue: InputValue): void;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentDidRender(): void;
  private checkInputAfterRender;
  componentDidLoad(): void;
  private setupResizeObserver;
  private handleResize;
  private updateCrossIcon;
  private updateInputRef;
  private createMaskForInput;
  private destroyMask;
  disconnectedCallback(): void;
  private checkForEllipsis;
  private getMaskOptions;
  private createTelPatternOptions;
  private updateSlotData;
  private getUpdatedFocusInfo;
  private validateInputLength;
  private onInput;
  private onClear;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private onKeyDown;
  private onKeyPress;
  private inputCssClasses;
  private wrapperCssClasses;
  private inputWithIconsCssClasses;
  private iconStartCssClasses;
  private iconEndCssClasses;
  private inputId;
  private labelId;
  private getInputType;
  private renderInput;
  private renderSearchIconOrSpinner;
  render(): any;
}
export {};
