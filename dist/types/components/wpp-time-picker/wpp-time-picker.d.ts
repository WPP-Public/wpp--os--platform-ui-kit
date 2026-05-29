import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig, LabelConfig } from '../../components';
import { FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { TimePickerChangeEventDetails } from './types';
export declare class WppTimePicker {
  private tippyInstance;
  private hasSelectedMinutes;
  private previousInputValue;
  private hasChangedHours;
  private hasChangedMinutes;
  private hasClearedValue;
  private anchorRef?;
  private portalRef?;
  private inputRef?;
  private hoursSectionRef?;
  private minutesSectionRef?;
  private themeSubscription;
  host: HTMLWppTimePickerElement;
  focusType: FOCUS_TYPE;
  showDisplayCross: boolean;
  generatedMinutes: string[];
  checkedTimeValues: {
    hoursIndex: number;
    minutesIndex: number;
  };
  isInComponent: boolean;
  /**
   * Defines the time picker size, which differs in terms of paddings.
   */
  readonly size: 's' | 'm';
  /**
   * If `true`, the time picker is disabled.
   */
  readonly disabled: boolean;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  /**
   * Defines the placeholder of the time picker. Placeholder is displayed when there is no value in the time picker.
   */
  readonly placeholder: string;
  /**
   * The width of time picker. Values can be in "px" or in "%".
   * Default value is "198px".
   */
  readonly width: string;
  /**
   * Value of time picker. Should always have a valid time format.
   */
  value: string;
  /**
   * Defines the interval of minutes. Can take of one of the following values: 1, 5, 10, 15
   */
  readonly minutesInterval: 1 | 5 | 10 | 15;
  /**
   * Indicates label config.
   */
  labelConfig?: LabelConfig;
  /**
   * Indicates time picker name.
   */
  readonly name?: string;
  /**
   * If `true`, the datepicker input is required
   */
  readonly required: boolean;
  /**
   * Dropdown config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Indicates time picker message type. This property should be used together with "messagae" property for "error" and "warning" states.
   *
   */
  messageType?: InputMessageTypes;
  /**
   * Indicates time picker message.
   */
  message?: string;
  /**
   * Indicates time picker message maximum length
   */
  readonly maxMessageLength?: number;
  /**
   * Defines the tooltip configuration for the message below the input. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * Emitted when the input receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the input loses focus
   */
  readonly wppBlur: EventEmitter<void>;
  /**
   * Emitted when the dropdown of the time picker closes. Contains details about the current value of the datepicker.
   */
  readonly wppChange: EventEmitter<TimePickerChangeEventDetails>;
  /**
   * Emitted when the "cross" icon is clicked and the value of the time picker is cleared.
   */
  readonly wppClear: EventEmitter<TimePickerChangeEventDetails>;
  onUpdateMinutesInterval(): void;
  onUpdateValue(): void;
  updateIsInComponent(value: boolean): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private highlightItem;
  private scrollIntoView;
  private isValidTimeValue;
  private setErrorMessage;
  private createTippyInstance;
  private updateValueOnHide;
  private handleClickCrossIcon;
  private handleClickListItem;
  private selectTextInInput;
  private generateMinutes;
  private onUpdateInput;
  private handleHourChange;
  private handleMinuteChange;
  private onPaste;
  private clearCheckedValue;
  private roundToNearestInterval;
  private onKeyPress;
  private onFocus;
  private onBlur;
  private onKeyUp;
  private getAnchorCssClasses;
  render(): any;
}
