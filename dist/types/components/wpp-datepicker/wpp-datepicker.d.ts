import { EventEmitter } from '../../stencil-public-runtime';
import AirDatepicker from 'air-datepicker';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { InlineMessage } from '../../interfaces/inline-message';
import { BaseComponent } from '../../interfaces/base-component';
import { AirDatepickerTypes, DatePickerClearEventDetail, DatePickerEventDetail, DatepickerLabelConfig, DatePickerView, IPreset, LocaleTypes, MonthRangeNormalization, YearRangeNormalization } from './types';
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
  private calendarsRef;
  /**
   * Display-only second calendar used by `withDoubleCalendar`. `datePickerInstance` stays the
   * single source of truth for value, validation and events; this one is fed the same dates so
   * air-datepicker paints its own slice of the range.
   */
  private mirrorDatePickerInstance?;
  private isSyncingCalendars;
  /** Primary's month as it was before a selection, so picking a date never moves the pair. */
  private viewAnchorBeforeSelect?;
  private hideTimer;
  private previewPresetTimer;
  private a11yAugmentTimer;
  private openGridFocusTimer;
  private focusGridWhenOpened;
  private autoFocusOpenTimer?;
  private commitFocusTimer?;
  /**
   * Whether the last thing the user did was a key press. Drives whether a dismissal hands the
   * field a keyboard focus ring: clicking Apply with the mouse should leave no ring, the same way
   * `:focus-visible` would not paint one.
   */
  private lastInteractionWasKeyboard;
  /** Grid cell (date) to focus once the calendar re-renders after a cross-view move. */
  private pendingGridFocusDate?;
  /** Nav control (selector + index) to re-focus if air-datepicker replaced it mid-activation. */
  private pendingNavRefocus?;
  /** Which grid held focus and on which date, so the same cell can be refocused after a select. */
  private gridFocusBeforeSelect?;
  private hasClickedPreset;
  private isDatePickerInitialized;
  private isNormalizingMonthRange;
  private isNormalizingYearRange;
  private isDestroyed;
  private themeSubscription;
  host: HTMLWppDatepickerElement;
  datePickerInstance: AirDatepicker;
  lastValidDate: string | string[];
  lastAppliedDate: string[];
  focusType: FOCUS_TYPE;
  hidden: boolean;
  tippyInstance: Instance;
  isInComponent: boolean;
  isVisuallyActive: boolean;
  isValueExists: boolean;
  hasTriggerSlot: boolean;
  internalMessage: string;
  internalMessageType: InputMessageTypes | undefined;
  private justSelectedFromCalendar;
  private isManuallyTyping;
  private suppressShowOnFocus;
  private readonly popupId;
  /** True while the calendar popup is visible; drives the input's `aria-expanded`. */
  isCalendarOpen: boolean;
  /** Index of the preset that currently owns the roving tab stop (item 7). */
  presetRovingIndex: number;
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
   * If `true`, the input is focused on page load and the calendar opens with it. Focus stays in
   * the input, so a date can still be typed. Has no effect on a `static` datepicker, whose
   * calendar is always visible.
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
   * Configuration for normalizing year range dates. When using `view="years"` with `range`,
   * this option allows automatic normalization of selected dates to specific month/day boundaries.
   * By default, normalizes start date to January 1st and end date to December 31st of their respective years.
   *
   * @example
   * // Enable normalization with defaults (Jan 1st and Dec 31st)
   * yearRangeNormalization={{ enabled: true }}
   *
   * @example
   * // Custom: start on Apr 1st, end on Mar 31st (fiscal year)
   * yearRangeNormalization={{ enabled: true, startMonth: 4, startDay: 1, endMonth: 3, endDay: 31 }}
   */
  readonly yearRangeNormalization?: YearRangeNormalization;
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
   * If `true`, the range datepicker shows two consecutive months side by side, so a range
   * spanning a month boundary can be picked without navigating. Only applies when `range`
   * is `true`; ignored otherwise. Works with `presets`.
   */
  readonly withDoubleCalendar: boolean;
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
  updateView(): void;
  updateDoubleCalendar(): void;
  /**
   * Recreates the underlying air-datepicker instance.
   * Required when `view` or `range` changes because both are construction-time
   * options that affect the views container layout (`minView`) and range
   * selection state. air-datepicker's `update()` only swaps the current view
   * and does not rebuild the views container, which leaves the picker in an
   * inconsistent state in range mode (Apply button stops firing, view does
   * not visually switch).
   */
  private recreateDatePicker;
  /**
   * Re-parents the calendar element(s) air-datepicker created next to the input into the
   * portal (or, in double mode, into the calendars row) so tippy has them as popup content.
   */
  private moveCalendarsIntoPortal;
  updateMinDate(): void;
  updateMaxDate(): void;
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  updateIsInComponent(value: boolean): void;
  onUpdateLocales(): void;
  private setInitialDate;
  private setMinMaxDate;
  private clearIfDateNotInInterval;
  private updateSlotData;
  componentWillLoad(): void;
  componentDidLoad(): void;
  /**
   * `withDoubleCalendar` arriving as a property after first render (which is what framework
   * wrappers do) fires the @Watch before Stencil has rendered the calendars row, so the
   * re-parent inside recreateDatePicker has nowhere to put them. Re-asserting it here — after
   * every render — is what keeps the two calendars inside the flex row instead of stacking
   * loose in the portal. It no-ops when they are already in place.
   */
  componentDidRender(): void;
  /**
   * air-datepicker wraps each month's prev/title/next in a `<nav>`, which is an implicit
   * `navigation` landmark. Two calendars therefore expose two unnamed duplicates, which axe
   * flags as landmark-unique. A date picker's month header isn't a page-level landmark in the
   * first place (the APG date picker dialog uses plain buttons), so drop the role rather than
   * invent names for it. The buttons inside keep their own semantics.
   */
  private applyDoubleCalendarA11y;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private get _locales();
  /**
   * Determines the first day of the week based on `dateLocale`, `firstDay`, or falls back to default.
   * @returns {0 | 1 | 2 | 3 | 4 | 5 | 6} The first day of the week (0 = Sunday, 1 = Monday, etc.)
   */
  private determineFirstDay;
  private hasPresets;
  /** Double calendar is a range-only layout, gated the same way presets are. */
  private isDoubleCalendar;
  /**
   * Checks if month range normalization should be applied.
   * Normalization is only applied when range mode is enabled, view is 'months', and normalization is enabled.
   */
  private shouldNormalizeMonthRange;
  /**
   * Checks if year range normalization should be applied.
   * Normalization is only applied when range mode is enabled, view is 'years', and normalization is enabled.
   */
  private shouldNormalizeYearRange;
  private getDateFormatSeparator;
  private isDefaultDateFormatSeparator;
  private isDefaultDateFormat;
  private getDateFormat;
  private handleApply;
  private handleClear;
  private createDateInstance;
  /**
   * Builds the second, display-only calendar shown one month ahead of the primary.
   *
   * air-datepicker derives each cell's `-in-range-`/`-range-from-`/`-range-to-` class from its
   * own `selectedDates` and `focusDate` and never clamps them to the visible month. So feeding
   * both instances the same dates makes each paint its own slice and the range reads as one
   * continuous run across the gap — no cell painting of our own.
   */
  private createMirrorInstance;
  private getNextMonth;
  /**
   * The mirror sits one *page* ahead of the primary, where a page is whatever the current view
   * shows: a month in days view, a year in months view, a decade in years view. That matches
   * what the chevrons already step by, so the pair stays consistent at every drill level.
   */
  private getPageOffset;
  /**
   * Pushes the primary's selection onto the mirror so both paint the same range. Called after
   * every programmatic change, since `silent` updates don't fire `onSelect`.
   */
  private syncMirrorSelection;
  /**
   * Selecting a date must never move the pair. air-datepicker navigates to a date's own month
   * when you pick it, which is right for one calendar but wrong here: clicking the greyed
   * 1 September inside the August grid would slide the pair to September|October under the
   * user. The anchor is the primary's month as it was before the click, captured in
   * onBeforeSelect and re-applied once the selection has settled.
   */
  /**
   * Committing a date re-renders the cells, so the node that had focus is thrown away and focus
   * falls to the document — most visibly on the right-hand calendar, whose pick is handed to the
   * primary as a clear + selectDate. Record that the calendar owned focus before the re-render;
   * augmentCalendarA11y hands it back once the new cells are decorated and focusable.
   */
  private captureGridFocus;
  /** Identifies a cell by the date it renders — stable across the re-render that replaces it. */
  private cellKey;
  private captureViewAnchor;
  private restoreViewAnchor;
  /** Either calendar's chevrons move both; the mirror stays exactly one page ahead. */
  private syncViewDates;
  /**
   * Drilling up to months/years switches only the calendar that was clicked, which would leave
   * a months grid sitting next to a days grid. Move both, then re-assert the one-page-ahead
   * offset at the new granularity.
   */
  private syncCalendarView;
  /**
   * Extends the half-picked hover preview across the gap. air-datepicker recomputes in-range
   * from `focusDate`, so handing the hovered date to the other instance is all it takes.
   */
  private syncFocusDate;
  /**
   * A deliberate move — an initial value, a preset preview. Clears the selection anchor so a
   * pending restore doesn't drag the pair back afterwards.
   */
  private setDoubleCalendarView;
  /** Puts the primary on `date`'s month and the mirror on the one after. */
  private applyDoubleCalendarView;
  private onHideGetLastAppliedValue;
  private createTippyInstance;
  private clearDatePicker;
  private onInput;
  private clearInternalValidation;
  private validateManualInput;
  /**
   * Runs the leave checks. Called two ways: the input's own blur event, and the @Watch on
   * `isInComponent` when the popup closes — which is not a blur at all. `keepFocusRing` marks
   * that second case: Escape and Apply hand focus back to the field before the popup finishes
   * hiding, so clearing the ring there stripped it off a field the user was still sitting on.
   */
  private onBlur;
  private onFocus;
  private onMouseDown;
  private onKeyUp;
  private updateInput;
  /**
   * Whether the calendar popup is (or is becoming) visible. tippy flips `isVisible`
   * synchronously on show() but `isShown` only after the show transition — checking both
   * closes the race where a fast Tab/Escape lands during the opening animation.
   */
  private isCalendarPopupVisible;
  private onKeyDown;
  private handleBlurPortal;
  private handlePreviewPreset;
  private handleClickCalendarIcon;
  private handleClickPreset;
  private handleMouseLeavePreset;
  private handleClickIconCross;
  /**
   * The control the calendar was opened from: the field normally, the slotted button when a
   * trigger is used. A `wpp-*` trigger keeps its real button inside its own shadow root, and
   * focusing the host of a custom element that isn't focusable itself does nothing, so reach
   * through to that button.
   */
  /** The calendar is on screen: either the popup is open, or it is a static, always-visible one. */
  private isCalendarVisible;
  /**
   * The node that really has focus. `document.activeElement` stops at a shadow host, and a static
   * datepicker renders its calendar inside this component's shadow root rather than a light-DOM
   * popup — so every `portal.contains(document.activeElement)` check quietly read false there.
   */
  private deepActiveElement;
  private getTriggerFocusTarget;
  /**
   * Return focus to the control that opened the calendar, without re-opening it. Only refocuses
   * when that control isn't already focused, so the suppress flag can't get stuck set (which
   * would stop the next legitimate open).
   */
  private returnFocusToTrigger;
  /** Hide the calendar and return focus to the input (ESC / after selection). */
  private closeCalendar;
  /** Move focus from the input into the grid, onto the roving cell. */
  private focusGrid;
  /** Re-apply ARIA augmentation after air-datepicker finishes its async render. */
  private scheduleCalendarA11yAugment;
  /**
   * Every rendered grid. `withDoubleCalendar` renders two months side by side, so the keyboard
   * model has to treat the pair as one composite grid — otherwise it silently drives only the
   * left calendar. With a single calendar this is a one-element list and nothing changes.
   */
  private getActiveBodies;
  private getActiveBody;
  /** Cells across every grid, in DOM order — which is chronological across the pair. */
  private getCells;
  private getRovingCell;
  /** The cell that should be the single tab stop: selected, else today, else first enabled. */
  private getPreferredCell;
  private setRovingCell;
  private getGridColumns;
  /** The instance that rendered a cell — the mirror owns the right-hand calendar's grid. */
  private instanceForCell;
  private cellDate;
  private cellAccessibleName;
  private findCellForDate;
  /** Focus the cell for `target`, navigating the view first if it is not rendered. */
  /**
   * Whether a date the keyboard is about to move to is inside the picker's own min/max window.
   * Outside it every cell is disabled, so paging there would strand the user on a month they
   * cannot select anything in.
   */
  private isDateWithinLimits;
  private focusDateCell;
  private moveGridFocusByDate;
  private addByView;
  private pageByView;
  private handleGridKeyDown;
  private getPresetItems;
  /**
   * First control focus lands on when Tab enters the popup: the first ENABLED tab stop in
   * DOM order. Using the tab-stop chain (not a hard-coded prev chevron) means a datepicker
   * whose chevrons are disabled by min/max bridges to the title instead of a dead control.
   */
  private getFirstPopupControl;
  private handlePresetKeyDown;
  /** The popup's tab stops in DOM order (only enabled controls carry tabindex=0). */
  private getPopupTabStops;
  /** Single delegated keydown handler for everything inside the popup. */
  private handlePortalKeyDown;
  /** Layer ARIA APG semantics onto air-datepicker's freshly-rendered DOM. */
  private augmentCalendarA11y;
  private augmentGrid;
  private augmentSingleGrid;
  /**
   * Group the flat cell list into `role="row"` wrappers so the grid has the
   * grid > rowgroup > row > gridcell structure ARIA requires. `display: contents`
   * keeps air-datepicker's CSS grid layout intact (the cells still lay out as
   * direct grid items). Re-runs each render; skips if already wrapped.
   */
  private wrapCellsIntoRows;
  private handleTriggerClick;
  private hostCssClasses;
  private inputCssClasses;
  private iconCrossCssClasses;
  private iconCalendarCssClasses;
  private containerClasses;
  private portalClasses;
  private renderPresets;
  /**
   * Double mode owns its actions row so it can span the full popup width beneath both
   * calendars, instead of air-datepicker's per-instance buttons under the left one. Reuses
   * air-datepicker's button classes so both layouts stay visually identical, but right-aligns
   * them per the Figma rather than space-between.
   *
   * Enabled/disabled mirrors `updateDatepickerClearButton`, declaratively off `lastValidDate`.
   */
  private renderActions;
  render(): any;
}
