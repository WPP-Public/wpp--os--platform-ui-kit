import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, FOCUS_TYPE, DropdownConfig } from '../../types/common';
import { BaseComponent } from '../../interfaces/base-component';
import { BooleanFormControl } from '../../interfaces/boolean-form-control';
import { RadioChangeEvent, RadioValue, RadioLabelConfig } from './types';
/**
 * @part label - Label text element
 * @part input - input element
 * @part circle - radio circle element
 */
export declare class WppRadio implements BaseComponent, BooleanFormControl<RadioValue> {
  readonly host: HTMLWppRadioElement;
  private inputRef?;
  private tippyInstance?;
  focusType: FOCUS_TYPE;
  isPressed: boolean;
  /**
   * Defines the radio name.
   */
  readonly name?: string;
  /**
   * Defines the radio value.
   */
  value: RadioValue;
  /**
   * If the radio is selected.
   */
  checked: boolean;
  /**
   * If the radio is required.
   */
  readonly required: boolean;
  /**
   * If the radio is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the radio should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Defines the radio size.
   */
  readonly size: 'm' | 's';
  /**
   * Contains the radio `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Indicates label config
   */
  labelConfig?: RadioLabelConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Indicates custom classes to the radio
   *
   * @internal - This prop is controlled by card group component
   */
  readonly internalState?: string;
  /**
   * Indicates the avatar tab index.
   *
   * @internal - This prop is controlled by radio group
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
  readonly wppChange: EventEmitter<RadioChangeEvent>;
  /**
   * Emitted when the radio is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the radio loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Emitted when the radio button is clicked.
   *
   * @internal - This event is controlled by container like Radio Group, do not set it manually.
   */
  readonly wppClickRadio: EventEmitter<RadioChangeEvent>;
  /**
   * Method that sets focus on the native input.
   */
  setFocus(): Promise<void>;
  private onClick;
  private onFocus;
  private onBlur;
  private onKeyDown;
  private onKeyUp;
  private hostCssClasses;
  private labelCssClasses;
  private inputCssClasses;
  componentWillLoad(): void;
  render(): any;
}
