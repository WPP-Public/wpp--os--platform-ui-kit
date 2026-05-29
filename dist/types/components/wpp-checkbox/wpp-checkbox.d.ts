import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, InputMessageTypes, DropdownConfig, FOCUS_TYPE } from '../../types/common';
import { BooleanFormControl } from '../../interfaces/boolean-form-control';
import { BaseComponent } from '../../interfaces/base-component';
import { CheckboxChangeEvent, CheckboxValue, CheckboxLabelConfig } from './types';
/**
 * @part body - Main content wrapper
 * @part input - Input element
 * @part square - square element
 * @part icon-tick - icon tick element
 * @part icon-dash - icon dash element
 * @part message - message element
 */
export declare class WppCheckbox implements BaseComponent, BooleanFormControl<CheckboxValue> {
  private themeSubscription;
  host: HTMLWppCheckboxElement;
  focusType: FOCUS_TYPE;
  isPressed: boolean;
  /**
   * Defines the checkbox name.
   */
  readonly name?: string;
  /**
   * Defines the checkbox value.
   */
  value: CheckboxValue;
  /**
   * If the checkbox is selected.
   */
  checked: boolean;
  /**
   * If the checkbox is work as controlled component.
   */
  readonly controlled: boolean;
  /**
   * If the checkbox is indeterminate.
   */
  indeterminate: boolean;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * If the checkbox is required.
   */
  readonly required: boolean;
  /**
   * If the checkbox is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the checkbox should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Indicates input message
   */
  readonly message?: string;
  /**
   * Indicates input message type
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Indicates input message maximum length
   */
  readonly maxMessageLength?: number;
  /**
   * Contains the checkbox `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Indicates label config
   */
  labelConfig?: CheckboxLabelConfig;
  /**
   * Indicates custom classes to the checkbox
   *
   * @internal - This prop is controlled by card group component
   */
  readonly internalState?: string;
  /**
   * Indicates the avatar tab index.
   *
   * @internal - This prop is controlled by avatar group
   */
  readonly index: number;
  /**
   * Create a component with role presentation
   *
   * @internal - This prop is controlled by WppCard component
   */
  readonly decorative?: boolean;
  /**
   * Emitted when the selected state changes.
   */
  readonly wppChange: EventEmitter<CheckboxChangeEvent>;
  /**
   * Emitted when the checkbox is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the checkbox loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Emitted when the checkbox is clicked.
   *
   * @internal - This event is controlled by container like Checkbox Group, do not set it manually.
   */
  readonly wppClickCheckbox: EventEmitter<CheckboxChangeEvent>;
  /**
   * Method that sets focus on the native input.
   */
  setFocus(): Promise<void>;
  private inputRef?;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private onClick;
  private onFocus;
  private onBlur;
  private onKeyUp;
  private onKeyDown;
  private hostCssClasses;
  private labelCssClasses;
  private inputCssClasses;
  render(): any;
}
