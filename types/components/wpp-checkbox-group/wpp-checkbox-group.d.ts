import { EventEmitter } from '../../stencil-public-runtime';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { BaseComponent } from '../../interfaces/base-component';
import { CheckboxChangeEvent } from '../wpp-checkbox/types';
import { CheckboxGroupChangeEvent, CheckboxGroupValue } from './types';
import { AriaProps, DropdownConfig, InputMessageTypes } from '../../types/common';
import { LabelConfig } from '../wpp-label/types';
/**
 * @slot - Can contain only the `wpp-checkbox` components that are displayed in `checkbox-group`. The default slot, without the name attribute. A maximum of 5 checkbox elements are allowed in this component and a minimum of 2.
 *
 * @part inner - Content slot element
 */
export declare class WppCheckboxGroup implements BaseComponent, BaseFormControl<CheckboxGroupValue[]> {
  private items;
  readonly host: HTMLWppCheckboxGroupElement;
  /**
   * Defines the checkbox group value.
   */
  value: CheckboxGroupValue[];
  /**
   * If `true`, the group is required
   */
  readonly required: boolean;
  /**
   * Defines the message that is going to be displayed below the checkbox group.
   * This property should be used in case there is an error / warning that needs to be displayed on the component.
   */
  readonly message?: string;
  /**
   * Defines the message's type and can take one of the following values: "error" / "warning".
   * The icon displayed for the message will change based on this property.
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines the direction in which the checkbox items are displayed.
   * By default, the items are displayed vertically (in a column).
   */
  readonly direction: 'column' | 'row';
  /**
   * Defines the message's maximum length. If the length of the message is greater than the value of this property,
   * the message will be truncated and a tooltip will display the whole text upon hover.
   */
  readonly maxMessageLength?: number;
  /**
   * Indicates the label configuration for the checkbox group.
   */
  labelConfig?: LabelConfig;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Contains the checkbox group `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Emitted when the checkbox group value changes.
   */
  wppChange: EventEmitter<CheckboxGroupChangeEvent>;
  /**
   * Emitted when the group receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the group loses focus
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  componentDidLoad(): void;
  updateValue(value: CheckboxGroupValue[]): void;
  onClickCheckbox(event: CustomEvent<CheckboxChangeEvent>): void;
  private getCheckboxElements;
  private onFocus;
  private onBlur;
  private hostCssClasses;
  private contentCssClasses;
  render(): any;
}
