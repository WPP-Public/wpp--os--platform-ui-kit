import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig, LabelConfig } from '../../components';
import { FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { TimePickerChangeEventDetails, TimePickerLocaleTypes } from './types';
export declare class WppTimePicker {
  private tippyInstance;
  private hasSelectedMinutes;
  private previousInputValue;
  private readonly popupId;
  private readonly inputId;
  private isDestroyed;
  private focusItemTimer?;
  private selectionFromKeyboard;
  private restoreFocusOnHidden;
  private scrollTimer?;
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
  isInputFocused: boolean;
  showDisplayCross: boolean;
  generatedMinutes: string[];
  checkedTimeValues: {
    hoursIndex: number;
    minutesIndex: number;
  };
  isInComponent: boolean;
  isDropdownOpen: boolean;
  rovingTimeValues: {
    hoursIndex: number;
    minutesIndex: number;
  };
  focusedColumn: 'hours' | 'minutes' | null;
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
   * Defines accessible labels used by the time picker, using English defaults.
   */
  readonly locales: Partial<TimePickerLocaleTypes>;
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
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private highlightItem;
  private get _locales();
  private scrollIntoView;
  private isValidTimeValue;
  private setErrorMessage;
  private createTippyInstance;
  private updateValueOnHide;
  private handleClickCrossIcon;
  private handleClickListItem;
  /**
   * Close the dropdown and hand focus back to the text input. The focused item is unmounted with
   * the dropdown, so without this focus falls back to `<body>` and the keyboard user is stranded.
   */
  private closeAndReturnFocusToInput;
  /**
   * Move the keyboard highlight into `column` once the dropdown has settled. The list re-renders
   * on the value change that triggered this, so the target item only exists on the next task.
   */
  private focusColumnAfterSelection;
  private selectTextInInput;
  private generateMinutes;
  private onUpdateInput;
  private handleHourChange;
  private handleMinuteChange;
  private onPaste;
  private clearCheckedValue;
  private roundToNearestInterval;
  private onKeyPress;
  /**
   * Focus legitimately moves between the text input, the clear ("x") control and the
   * portaled dropdown items, and all of those still count as "inside" the component.
   * `relatedTarget` is retargeted to the host element for anything in our shadow root, and the
   * dropdown lives in the light DOM (tippy portal), so both cases are covered here.
   */
  private isFocusStillInside;
  private onFocus;
  private onBlur;
  private onKeyUp;
  private onKeyDown;
  private getColumnItems;
  private focusColumnItem;
  /**
   * Index the keyboard should land on when it enters a column: the selected value if there is
   * one, else wherever the roving index last sat, else the first item. Crossing columns used to
   * carry the source column's index over, so ArrowRight from hour `07` landed on the 8th minute
   * (clamped to `45`) instead of the selected one.
   */
  private getColumnEntryIndex;
  private getFocusedPosition;
  /**
   * `wpp-list-item` handles Enter/Space itself and emits `wppChangeListItem`, so that is the one
   * selection path — and it gives no clue about which input device drove it. A pointer selection
   * always fires `pointerdown` on the portal first, so clearing the flag here is enough to tell
   * the two apart; `focusColumnItem` sets it whenever the keyboard moves the highlight.
   */
  private onPortalPointerDown;
  /**
   * Keep the text input focused when the pointer lands on the dropdown's own chrome rather than
   * on an option — that means the scroll container itself, i.e. its scrollbar or padding gutter.
   * Letting focus move there blurs the input with a null `relatedTarget`, which reads as "focus
   * left the component" and closed the dropdown mid scroll-drag. Options are deliberately
   * excluded so a click can still hand them focus and move the roving highlight; preventing the
   * default here does not stop the scrollbar itself from working.
   */
  private onPortalMouseDown;
  private onPortalKeyDown;
  private getAnchorCssClasses;
  render(): any;
}
