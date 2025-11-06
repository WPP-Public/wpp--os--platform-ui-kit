import { EventEmitter } from '../../stencil-public-runtime';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { BaseComponent } from '../../interfaces/base-component';
import { RadioChangeEvent } from '../wpp-radio/types';
import { RadioGroupChangeEvent, RadioGroupValue } from './types';
import { DropdownConfig, InputMessageTypes } from '../../types/common';
import { LabelConfig } from '../wpp-label/types';
/**
 * @slot - Can contain only the `wpp-radio` components that are displayed in `radio-group`. The default slot, without the name attribute. A maximum of 5 radio elements are allowed in this component and a minimum of 2.
 *
 * @part inner - Content slot element
 */
export declare class WppRadioGroup implements BaseComponent, BaseFormControl<RadioGroupValue> {
  private items;
  readonly host: HTMLWppRadioGroupElement;
  /**
   * Defines the radio group value.
   */
  value: RadioGroupValue;
  /**
   * If `true`, the group is required
   */
  readonly required: boolean;
  /**
   * Defines the message that is going to be displayed below the radio group.
   * This property should be used in case there is an error / warning that needs to be displayed on the component.
   */
  readonly message?: string;
  /**
   * Defines the message's type and can take one of the following values: "error" / "warning".
   * The icon displayed for the message will change based on this property.
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines the message's maximum length. If the length of the message is greater than the value of this property,
   * the message will be truncated and a tooltip will display the whole text upon hover.
   */
  readonly maxMessageLength?: number;
  /**
   * Indicates the label configuration for the radio group.
   */
  labelConfig?: LabelConfig;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Emitted when the radio group value changes.
   */
  wppChange: EventEmitter<RadioGroupChangeEvent>;
  /**
   * Emitted when the group receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the group loses focus
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  componentDidLoad(): void;
  updateValue(value: RadioGroupValue): void;
  onClickRadioButton(event: CustomEvent<RadioChangeEvent>): void;
  private checkRadioElements;
  private onFocus;
  private onBlur;
  private hostCssClasses;
  render(): any;
}
