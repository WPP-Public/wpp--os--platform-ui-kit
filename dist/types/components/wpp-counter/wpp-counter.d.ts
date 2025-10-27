import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, FOCUS_TYPE, InputMessageTypes, DropdownConfig } from '../../types/common';
import { CounterChangeEventDetail, CounterFormat, CounterLabelConfig } from './types';
/**
 * @part input - Counter input element
 * @part label - Label text element
 * @part body - Main content wrapper
 * @part decrease-button - decrease button element
 * @part decrease-icon - decrease icon element
 * @part increase-button - increase button element
 * @part increase-icon - increase icon element
 * @part message - message element
 */
export declare class WppCounter {
  private inputRef?;
  host: HTMLWppCounterElement;
  formattedValue: string;
  focusType: FOCUS_TYPE;
  currentFocused: 'decrease' | 'input' | 'increase' | null;
  /**
   * Defines the counter name.
   */
  readonly name?: string;
  /**
   * Defines the counter value.
   */
  value: number;
  /**
   * Defines the counter `min` value.
   */
  readonly min: number;
  /**
   * Defines the counter `max` value.
   */
  readonly max: number;
  /**
   * If `true`, the counter will show increment/decrement(+/-) buttons
   */
  readonly withButtons: boolean;
  /**
   * If the counter is required.
   */
  readonly required: boolean;
  /**
   * If the counter is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the counter should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Defines the counter size.
   */
  readonly size: 'm' | 's';
  /**
   * Defines the counter message.
   */
  readonly message?: string;
  /**
   * Defines the counter message type.
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines the counter message maximum length.
   */
  readonly maxMessageLength?: number;
  /**
   * Contains the counter `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines the counter format number.
   */
  readonly format: CounterFormat;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * Indicates label config
   */
  labelConfig?: CounterLabelConfig;
  /**
   * Indicates the step of the counter.
   */
  readonly step: number;
  /**
   * Emitted when the input value changes.
   */
  readonly wppChange: EventEmitter<CounterChangeEventDetail>;
  /**
   * Emitted when the counter is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the counter loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  updateFormattedValue(): void;
  /**
   * Method that sets focus on the native input.
   */
  setFocus(): Promise<void>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private handleValidate;
  private formatValue;
  private onInput;
  private onMouseDown;
  private onBlur;
  private roundToDecimal;
  private isInputEmpty;
  private addStepToValue;
  private increaseValue;
  private decreaseValue;
  private counterWrapperCssClasses;
  private decreaseWrapperCssClasses;
  private increaseWrapperCssClasses;
  private inputCssClasses;
  private hostCssClasses;
  private onFocus;
  private onElementFocus;
  private onElementBlur;
  private onKeyDownButton;
  private onKeyUp;
  render(): any;
}
