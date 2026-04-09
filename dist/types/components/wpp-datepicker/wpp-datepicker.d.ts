import { EventEmitter } from '../../stencil-public-runtime';
import AirDatepicker from 'air-datepicker';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { InlineMessage } from '../../interfaces/inline-message';
import { BaseComponent } from '../../interfaces/base-component';
import { AirDatepickerTypes, DatePickerClearEventDetail, DatePickerEventDetail, DatepickerLabelConfig, DatePickerView, IPreset, LocaleTypes, MonthRangeNormalization } from './types';
import { Instance } from 'tippy.js';
/**
 * @slot trigger - Slot for a custom trigger element (button). When a button is placed in this slot, it replaces the default input field as the datepicker trigger.
 *
 * @part label - Label text element
 * @part datepicker-container - datepicker container element
 * @part icon-calendar - icon calendar element
 * @part datepicker-input - datepicker input element
 * @part icon-cross - icon cross wrapper
 * @part message - message element
 * @part trigger-wrapper - trigger wrapper element for button trigger variant
 */
export declare class WppDatepicker implements BaseComponent, InlineMessage {
  private inputRef?;
  private hiddenInputRef?;
  private triggerWrapperRef?;
  private portalRef;
  private hideTimer;
  private previewPresetTimer;
  private hasClickedPreset;
  private isDatePickerInitialized;
  private isNormalizingMonthRange;
  private isDestroyed;
  private _locales;
  host: HTMLWppDatepickerElement;
  datePickerInstance: AirDatepicker;
  lastValidDate: string | string[];
  lastAppliedDate: string[];
  focusType: FOCUS_TYPE;
  hidden: boolean;
  tippyInstance: Instance;
  isInComponent: boolean;
  isValueExists: boolean;
  hasTriggerSlot: boolean;
  internalMessage: string;
  internalMessageType: InputMessageTypes | undefined;
  private justSelectedFromCalendar;
  private isManuallyTyping;
  /**
   * If the range mode is enabled.
   */
  readonly range: boolean;
  /**
   * If `true`, any selected date can be unselected by clicking on it again.
   */
  readonly toggleSelected: boolean;
  /**
   * Defines the input value.
   */
  value: string | string[];
  /**
   * If `true`, the input should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * If the datepicker is always visible.
   */
  readonly static: boolean;
  /**
   * Defines the minimal datepicker date.
   */
  readonly minDate?: string;
  /**
   *  Defines the maximal datepicker date.
   */
  readonly maxDate?: string;
  /**
   * Defines the input placeholder.
   */
  readonly placeholder?: string;
  /**
   * Defines datepicker view
   */
  readonly view: DatePickerView;
  /**
   * Configuration for normalizing month range dates. When using `view="months"` with `range`,
   * this option allows automatic normalization of selected dates to specific days.
   * By default, normalizes start date to the 1st day and end date to the last day of their respective months.
   *
   * @example
   * // Enable normalization with defaults (1st and last day)
   * monthRangeNormalization={{ enabled: true }}
   *
   * @example
   * // Custom days: start on 15th, end on 20th
   * monthRangeNormalization={{ enabled: true, startDay: 15, endDay: 20 }}
   */
  readonly monthRangeNormalization?: MonthRangeNormalization;
  /**
   * Indicates datepicker message
   */
  readonly message?: string;
  /**
   * Indicates datepicker message type
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines the tooltip configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * Indicates datepicker input message maximum length
   */
  readonly maxMessageLength?: number;
  /**
   * If `true`, the datepicker input is required
   */
  readonly required: boolean;
  /**
   * If `true`, the datepicker input is disabled
   */
  readonly disabled: boolean;
  /**
   * Indicates datepicker name
   */
  readonly name?: string;
  /**
   * Defines the datepicker size.
   */
  readonly size: 's' | 'm';
  /**
   * Defines the width of the datepicker. If it is undefined, the datepicker will take the default value (200px single datepicker, 260px range datepicker).
   */
  readonly width?: string;
  /**
   * An array of preset date ranges that the user can quickly select from the datepicker. This
   * prop is available only for the range-datepicker. The format of the dates within each preset item
   * should match the dateFormat provided to the component.
   */
  readonly presets: IPreset[];
  /**
   * Dropdown config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Defines the datepicker locale, uses English by default.
   * @deprecated Use `locales` property instead.
   * @remarks
   * - `firstDay` determines the starting day of the week and acts as a fallback if `dateLocale` is not provided.
   * - `dateLocale` is used to automatically infer date-related properties, like `firstDay`.
   */
  readonly locale: Partial<LocaleTypes>;
  /**
   * Defines the datepicker locale, uses English by default.
   * @remarks
   * - `firstDay` determines the starting day of the week and acts as a fallback if `dateLocale` is not provided.
   * - `dateLocale` is used to automatically infer date-related properties, like `firstDay`.
   */
  readonly locales: Partial<LocaleTypes>;
  /**
   * Indicates label config
   */
  labelConfig?: DatepickerLabelConfig;
  /**
   * If `true`, the wpp-datepicker-portal containing the datepicker will be appended to the `#container`
   * By default it is false, meaning that the wpp-datepicker-portal will be appended to the document.body
   * in order to avoid clipping issues by the parent
   */
  appendToListWrapper?: boolean;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  /**
   * Reverse layout for the range datepicker with a preset list
   */
  readonly reverseLayout: boolean;
  /**
   * Emitted when a date is chosen.
   */
  wppChange: EventEmitter<DatePickerEventDetail>;
  /**
   * Emitted when the input loses focus
   */
  wppBlur: EventEmitter<void>;
  /**
   * Emitted when the input receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when a date is cleared.
   */
  wppDateClear: EventEmitter<DatePickerClearEventDetail>;
  /**
   * Method that returns a datepicker instance which allows manipulating all props and changing them as necessary. [Read more](https://air-datepicker.com/docs).
   */
  getInstance(): Promise<AirDatepickerTypes>;
  /**
   * Method that sets focus on the input.
   */
  setFocus(): Promise<void>;
  updateDatepickerClearButton(newValidDate: string): Promise<void>;
  private isStringDateValid;
  updateValue(): void;
  onUpdateWidth(): void;
  updateRange(): void;
  updateMinDate(): void;
  updateMaxDate(): void;
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  updateIsInComponent(value: boolean): void;
  onUpdateLocales(newLocales: Partial<LocaleTypes>): void;
  private setInitialDate;
  private setMinMaxDate;
  private clearIfDateNotInInterval;
  private updateSlotData;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /**
   * Determines the first day of the week based on `dateLocale`, `firstDay`, or falls back to default.
   * @returns {0 | 1 | 2 | 3 | 4 | 5 | 6} The first day of the week (0 = Sunday, 1 = Monday, etc.)
   */
  private determineFirstDay;
  private hasPresets;
  /**
   * Checks if month range normalization should be applied.
   * Normalization is only applied when range mode is enabled, view is 'months', and normalization is enabled.
   */
  private shouldNormalizeMonthRange;
  private getDateFormatSeparator;
  private isDefaultDateFormatSeparator;
  private isDefaultDateFormat;
  private getDateFormat;
  private createDateInstance;
  private onHideGetLastAppliedValue;
  private createTippyInstance;
  private clearDatePicker;
  private onInput;
  private clearInternalValidation;
  private validateManualInput;
  private onBlur;
  private onFocus;
  private onMouseDown;
  private onKeyUp;
  private updateInput;
  private onKeyDown;
  private handleBlurPortal;
  private handlePreviewPreset;
  private handleClickCalendarIcon;
  private handleClickPreset;
  private handleMouseLeavePreset;
  private handleClickIconCross;
  private handleTriggerClick;
  private hostCssClasses;
  private inputCssClasses;
  private iconCrossCssClasses;
  private iconCalendarCssClasses;
  private containerClasses;
  private portalClasses;
  render(): any;
}
