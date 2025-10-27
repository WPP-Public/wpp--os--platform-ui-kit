import { EventEmitter } from '../../stencil-public-runtime';
import AirDatepicker from 'air-datepicker';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { InlineMessage } from '../../interfaces/inline-message';
import { BaseComponent } from '../../interfaces/base-component';
import { AirDatepickerTypes, DatePickerClearEventDetail, DatePickerEventDetail, DatepickerLabelConfig, DatePickerView, IPreset, LocaleTypes } from './types';
import { Instance } from 'tippy.js';
/**
 * @part label - Label text element
 * @part datepicker-container - datepicker container element
 * @part icon-calendar - icon calendar element
 * @part datepicker-input - datepicker input element
 * @part icon-cross - icon cross wrapper
 * @part message - message element
 */
export declare class WppDatepicker implements BaseComponent, InlineMessage {
  private inputRef?;
  private portalRef;
  private hideTimer;
  private previewPresetTimer;
  private hasClickedPreset;
  private isDatePickerInitialized;
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
  updateRange(): void;
  updateMinDate(): void;
  updateMaxDate(): void;
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  updateIsInComponent(value: boolean): void;
  onUpdateLocales(newLocales: Partial<LocaleTypes>): void;
  private setInitialDate;
  private setMinMaxDate;
  private clearIfDateNotInInterval;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /**
   * Determines the first day of the week based on `dateLocale`, `firstDay`, or falls back to default.
   * @returns {0 | 1 | 2 | 3 | 4 | 5 | 6} The first day of the week (0 = Sunday, 1 = Monday, etc.)
   */
  private determineFirstDay;
  private hasPresets;
  private getDatepickerView;
  private getDateFormatSeparator;
  private isDefaultDateFormatSeparator;
  private isDefaultDateFormat;
  private getDateFormat;
  private createDateInstance;
  private onHideGetLastAppliedValue;
  private createTippyInstance;
  private clearDatePicker;
  private onInput;
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
  private hostCssClasses;
  private inputCssClasses;
  private iconCrossCssClasses;
  private iconCalendarCssClasses;
  private containerClasses;
  private portalClasses;
  render(): any;
}
