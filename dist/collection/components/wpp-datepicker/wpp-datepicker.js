import { h, Host } from '@stencil/core';
import { parse, isValid, format, addDays, addMonths, addYears, startOfDay } from 'date-fns';
import AirDatepicker from 'air-datepicker';
import defaultLocale from 'air-datepicker/locale/en';
import isEqual from 'lodash/isEqual';
import { FOCUS_TYPE } from '../../types/common';
import { activateOnEnterOrSpace, autoFocusElement, getHighestContainerInDOM, getSlotEmptyStates, mergeLocales, transformToVersionedTag, uniquePortalId, } from '../../utils/utils';
import { getCurrentFormatDate, getFormattedDateString, getNextCursorPosition, isValidDate, localeToFirstDayMap, normalizeMonthRangeDates, normalizeYearRangeDates, } from './utils';
import { AIR_DP_CLASS, AIR_DP_STATE, ANIMATION_DURATION, DATE_FORMAT_SEPARATOR_PATTERN, DATES_SEPARATOR, LOCALES_DEFAULTS, PRESET_ITEM_CLASS, } from './const';
import { Z_INDEX } from '../../common/consts';
import { menuListConfig } from '../../common/menuListConfig';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
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
export class WppDatepicker {
  constructor() {
    this.isSyncingCalendars = false;
    // Set when ArrowDown/ArrowUp opened the calendar: focus moves into the grid once it exists.
    this.focusGridWhenOpened = false;
    /**
     * Whether the last thing the user did was a key press. Drives whether a dismissal hands the
     * field a keyboard focus ring: clicking Apply with the mouse should leave no ring, the same way
     * `:focus-visible` would not paint one.
     */
    this.lastInteractionWasKeyboard = false;
    this.hasClickedPreset = false;
    this.isDatePickerInitialized = false;
    this.isNormalizingMonthRange = false;
    this.isNormalizingYearRange = false;
    this.isDestroyed = false;
    this.themeSubscription = themeSubscriptionController(() => this.portalRef);
    this.justSelectedFromCalendar = false;
    this.isManuallyTyping = false;
    // Set right before we programmatically return focus to the input (after a selection or
    // ESC) so onFocus does not immediately re-open the calendar it just closed.
    this.suppressShowOnFocus = false;
    // Only the POPUP id needs to be instance-unique: tippy re-parents the portal into the
    // light DOM, where multiple datepickers' popups (and popups from different CL versions
    // coexisting under SingleSPA) would otherwise collide. The input and message ids stay
    // static — each lives inside this component's own shadow root, where ids (and the
    // aria-describedby reference) are scoped per tree, and the stylesheet targets
    // `#datepicker` directly.
    this.popupId = uniquePortalId('wpp-datepicker-popup');
    this.isStringDateValid = (stringDateValue) => {
      const parsedDate = parse(stringDateValue, this._locales.dateFormat, new Date());
      return isValid(parsedDate) && format(parsedDate, this._locales.dateFormat) === stringDateValue;
    };
    /**
     * Recreates the underlying air-datepicker instance.
     * Required when `view` or `range` changes because both are construction-time
     * options that affect the views container layout (`minView`) and range
     * selection state. air-datepicker's `update()` only swaps the current view
     * and does not rebuild the views container, which leaves the picker in an
     * inconsistent state in range mode (Apply button stops firing, view does
     * not visually switch).
     */
    this.recreateDatePicker = () => {
      this.datePickerInstance?.destroy();
      this.mirrorDatePickerInstance?.destroy();
      this.mirrorDatePickerInstance = undefined;
      this.isDatePickerInitialized = false;
      this.createDateInstance();
      this.setInitialDate();
      this.setMinMaxDate();
      // air-datepicker uses `inline: true` so the new $datepicker element is
      // inserted after the input in the shadow DOM (not in portalRef). The
      // initial mount in componentDidLoad re-parents it into portalRef so
      // tippy can use it as popover content; we must repeat that move here,
      // otherwise tippy's content stays empty and the popup won't open.
      this.moveCalendarsIntoPortal();
    };
    /**
     * Re-parents the calendar element(s) air-datepicker created next to the input into the
     * portal (or, in double mode, into the calendars row) so tippy has them as popup content.
     */
    this.moveCalendarsIntoPortal = () => {
      const target = this.isDoubleCalendar() ? this.calendarsRef : this.portalRef;
      if (!target)
        return;
      const primaryEl = this.host.shadowRoot?.querySelector('[part="datepicker"]');
      // Appended in order, so the mirror is always the right-hand calendar. Skipping nodes that
      // are already in place keeps this cheap enough to re-run on every render.
      for (const el of [primaryEl, this.mirrorDatePickerInstance?.['$datepicker']]) {
        if (el && el.parentElement !== target)
          target.appendChild(el);
      }
    };
    this.setInitialDate = () => {
      if (this.value === '' || isEqual(this.value, [])) {
        this.clearDatePicker();
        return;
      }
      if (!this.value)
        return;
      const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
      if (this.range) {
        const [startDate, endDate] = this.value;
        if (!startDate || !endDate)
          return;
        if (isValidDate([formatDate(startDate), formatDate(endDate)])) {
          this.isValueExists = true;
          // Clear before selecting — in range mode, selectDate appends to existing dates,
          // which corrupts the selection if there's a partial range (1 date already selected).
          this.datePickerInstance.clear({ silent: true });
          //@ts-ignore Due to outdated air-datepicker.d.ts
          this.datePickerInstance.selectDate([formatDate(startDate), formatDate(endDate)]);
          this.lastValidDate = this.value;
          this.lastAppliedDate = this.value;
          // onSelect deliberately leaves the view alone in double mode, so park the pair on the
          // range's start month here instead of leaving it on the current month.
          this.setDoubleCalendarView(formatDate(startDate));
        }
        return;
      }
      if (!Array.isArray(this.value)) {
        this.lastValidDate = this.value;
        const formattedDate = formatDate(this.value);
        this.isValueExists = true;
        this.datePickerInstance.selectDate([formattedDate]);
      }
    };
    this.setMinMaxDate = () => {
      const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
      if (this.maxDate) {
        const maxDate = formatDate(this.maxDate);
        this.datePickerInstance.update({ maxDate });
        this.mirrorDatePickerInstance?.update({ maxDate });
      }
      if (this.minDate) {
        const minDate = formatDate(this.minDate);
        this.datePickerInstance.update({ minDate });
        this.mirrorDatePickerInstance?.update({ minDate });
      }
      if (this.range) {
        if (this.lastAppliedDate.length < 2)
          return;
        this.clearIfDateNotInInterval(formatDate(this.lastAppliedDate[0]), formatDate);
        this.clearIfDateNotInInterval(formatDate(this.lastAppliedDate[1]), formatDate);
      }
      else {
        if (!this.lastValidDate)
          return;
        this.clearIfDateNotInInterval(formatDate(this.lastValidDate), formatDate);
      }
    };
    this.clearIfDateNotInInterval = (dateValue, formatDate) => {
      if (formatDate(this.minDate || '') > dateValue || formatDate(this.maxDate || '') < dateValue) {
        this.clearDatePicker();
      }
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        trigger: '[slot="trigger"]',
      });
      this.hasTriggerSlot = !emptyStates.trigger;
    };
    /**
     * air-datepicker wraps each month's prev/title/next in a `<nav>`, which is an implicit
     * `navigation` landmark. Two calendars therefore expose two unnamed duplicates, which axe
     * flags as landmark-unique. A date picker's month header isn't a page-level landmark in the
     * first place (the APG date picker dialog uses plain buttons), so drop the role rather than
     * invent names for it. The buttons inside keep their own semantics.
     */
    this.applyDoubleCalendarA11y = () => {
      if (!this.isDoubleCalendar())
        return;
      for (const el of [this.datePickerInstance?.['$datepicker'], this.mirrorDatePickerInstance?.['$datepicker']]) {
        el?.querySelector('.air-datepicker-nav')?.setAttribute('role', 'presentation');
      }
    };
    this.hasPresets = () => this.range && this.presets.length > 0;
    /** Double calendar is a range-only layout, gated the same way presets are. */
    this.isDoubleCalendar = () => this.range && this.withDoubleCalendar;
    /**
     * Checks if month range normalization should be applied.
     * Normalization is only applied when range mode is enabled, view is 'months', and normalization is enabled.
     */
    this.shouldNormalizeMonthRange = () => this.range && this.view === 'months' && this.monthRangeNormalization?.enabled === true;
    /**
     * Checks if year range normalization should be applied.
     * Normalization is only applied when range mode is enabled, view is 'years', and normalization is enabled.
     */
    this.shouldNormalizeYearRange = () => this.range && this.view === 'years' && this.yearRangeNormalization?.enabled === true;
    this.getDateFormatSeparator = (dateFormat) => {
      const match = dateFormat.match(DATE_FORMAT_SEPARATOR_PATTERN);
      return match ? match[0] : '/';
    };
    this.isDefaultDateFormatSeparator = (separator) => ['/', '.'].includes(separator);
    this.isDefaultDateFormat = () => {
      const baseFormat = ['dd', 'MM', 'yyyy'].sort();
      const separator = this.getDateFormatSeparator(this._locales.dateFormat);
      if (this.isDefaultDateFormatSeparator(separator)) {
        const separatedDate = this._locales.dateFormat.split(separator).sort();
        return isEqual(baseFormat, separatedDate);
      }
      return false;
    };
    this.getDateFormat = () => this._locales.dateFormat;
    this.handleApply = () => {
      const selected = this.datePickerInstance.selectedDates.map(selectedDate => this.datePickerInstance.formatDate(selectedDate, this.getDateFormat()));
      // Picking the same day for both ends leaves air-datepicker with one date. Commit it as the
      // one-day range the user actually chose, so the value and the input read like every other
      // range rather than like a single date.
      const formattedDates = this.range && selected.length === 1 ? [selected[0], selected[0]] : selected;
      this.wppChange.emit({
        date: this.datePickerInstance.selectedDates,
        formattedDate: formattedDates,
        name: this.name,
      });
      if (this.range && Array.isArray(this.lastValidDate)) {
        this.lastAppliedDate = formattedDates;
        this.lastValidDate = formattedDates;
      }
      // Update the input field to reflect the applied dates (normalized or not)
      const inputValue = formattedDates.join(DATES_SEPARATOR);
      this.updateInput(inputValue, inputValue.length);
      this.value = inputValue;
      if (this.tippyInstance)
        this.tippyInstance.hide();
      // Combobox: applying the range commits it and closes the popup, so focus belongs back on the
      // control the user opened it from rather than being dropped.
      this.returnFocusToTrigger();
    };
    this.handleClear = () => {
      this.clearDatePicker();
    };
    this.createDateInstance = () => {
      const datepickerInputRef = this.hasTriggerSlot ? this.hiddenInputRef : this.inputRef;
      if (!datepickerInputRef || this.isDatePickerInitialized)
        return;
      const buttonApply = {
        content: this._locales.apply,
        className: 'disabled button-apply',
        attrs: {
          // Focusable so a keyboard user can Tab to Apply inside the popup (item 4).
          // augmentCalendarA11y() flips this to -1 + aria-disabled while the button is disabled.
          tabindex: '0',
        },
        onClick: this.handleApply,
      };
      const buttonCancel = {
        content: this._locales.clear,
        className: 'disabled button-clear',
        attrs: {
          // Focusable so a keyboard user can Tab to Clear inside the popup (item 4).
          tabindex: '0',
        },
        onClick: this.handleClear,
      };
      // In double mode the actions row is rendered by this component so it can span the full
      // popup width below both calendars, per the Figma. air-datepicker's own buttons live
      // inside a single $datepicker and would sit under the left calendar only.
      const buttonsConfig = {
        buttons: [buttonCancel, buttonApply],
      };
      const IconChevron = transformToVersionedTag('wpp-icon-chevron');
      const firstDay = this.determineFirstDay();
      this.datePickerInstance = new AirDatepicker(datepickerInputRef, {
        container: this.portalRef,
        range: this.range,
        toggleSelected: this.toggleSelected
          ? () => !this.range || this.datePickerInstance.selectedDates.length === 2
          : false,
        multipleDatesSeparator: DATES_SEPARATOR,
        autoClose: !this.range,
        inline: true,
        // We own keyboard navigation (roving tabindex on the grid + our own arrow date-math)
        // so air-datepicker's built-in keyboardNav must be off — otherwise it hijacks the
        // input's Left/Right caret keys (item 3 / C8) and fights our DOM focus on cells.
        keyboardNav: false,
        locale: { ...defaultLocale, ...this._locales, firstDay },
        showOtherMonths: true,
        fixedHeight: true,
        selectOtherMonths: true,
        view: this.view,
        minView: this.view,
        dateFormat: this.getDateFormat(),
        position({ done }) {
          return function completeHide() {
            return setTimeout(done, ANIMATION_DURATION);
          };
        },
        navTitles: {
          days: '<p class="datepicker-header">MMMM</p>,<p class="datepicker-header header-year">yyyy</p>',
          years: '<p class="years">yyyy1 - yyyy2</p>',
        },
        nextHtml: `<${IconChevron} class="nav-icon"></${IconChevron}>`,
        prevHtml: `<${IconChevron} class="nav-icon prev-icon"></${IconChevron}>`,
        onBeforeSelect: ({ date, datepicker }) => {
          this.captureGridFocus();
          this.captureViewAnchor();
          // Intercept 2nd month click to normalize dates before selection
          if (!this.isNormalizingMonthRange &&
            this.shouldNormalizeMonthRange() &&
            datepicker.selectedDates.length === 1) {
            const firstDate = datepicker.selectedDates[0];
            // Sort chronologically so start is always the earlier month
            const [startDate, endDate] = firstDate <= date ? [firstDate, date] : [date, firstDate];
            const normalizedDates = normalizeMonthRangeDates([startDate, endDate], this.monthRangeNormalization);
            // Prevent default selection, then select normalized dates
            this.isNormalizingMonthRange = true;
            datepicker.clear({ silent: true });
            datepicker.selectDate(normalizedDates);
            this.isNormalizingMonthRange = false;
            return false;
          }
          // Intercept 2nd year click to normalize dates before selection
          if (!this.isNormalizingYearRange && this.shouldNormalizeYearRange() && datepicker.selectedDates.length === 1) {
            const firstDate = datepicker.selectedDates[0];
            // Sort chronologically so start is always the earlier year
            const [startDate, endDate] = firstDate <= date ? [firstDate, date] : [date, firstDate];
            const normalizedDates = normalizeYearRangeDates([startDate, endDate], this.yearRangeNormalization);
            // Prevent default selection, then select normalized dates
            this.isNormalizingYearRange = true;
            datepicker.clear({ silent: true });
            datepicker.selectDate(normalizedDates);
            this.isNormalizingYearRange = false;
            return false;
          }
          return true;
        },
        // Prev/next navigation and title (view) changes re-render the grid, wiping the ARIA
        // augmentation — re-apply it once air-datepicker has rendered the new view.
        onChangeViewDate: () => {
          this.syncViewDates('primary');
          this.scheduleCalendarA11yAugment();
        },
        onChangeView: view => {
          this.syncCalendarView('primary', view);
          this.scheduleCalendarA11yAugment();
        },
        onFocus: ({ date }) => this.syncFocusDate('primary', date),
        onSelect: ({ date, formattedDate }) => {
          // Guard against async callback after component destruction (air-datepicker uses setTimeout)
          if (this.isDestroyed)
            return;
          this.syncMirrorSelection();
          this.restoreViewAnchor();
          // Selecting rebuilds the cells, so the ARIA the grid depends on (role, aria-selected,
          // accessible names, the roving tab stop) has to be re-applied to the new nodes.
          this.scheduleCalendarA11yAugment();
          // Skip onSelect side-effects when air-datepicker auto-adjusts a manually typed invalid date
          if (this.isManuallyTyping)
            return;
          const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
          // Clear validation errors when a valid date is selected from calendar
          this.clearInternalValidation();
          this.justSelectedFromCalendar = true;
          if (!this.range) {
            this.wppChange.emit({
              date,
              formattedDate: formattedDate || '',
              name: this.name,
            });
          }
          if (!this.range && !Array.isArray(formattedDate)) {
            this.lastValidDate = formattedDate;
            if (formattedDate) {
              this.isValueExists = true;
              this.datePickerInstance.setViewDate(formatDate(formattedDate));
            }
            // Read before hide(): onHidden clears the flag, and only a pick the user made in an
            // open calendar should hand focus back. Setting `value` in code runs through onSelect
            // too — that is how one datepicker updates a dependent one — and focusing there
            // snatched focus onto the datepicker that had just been updated, away from whatever
            // the user was actually on.
            const pickedFromOpenCalendar = this.isCalendarOpen;
            this.tippyInstance?.hide();
            // Queued, not called straight out: air-datepicker runs its own selection work on a
            // later task and re-renders the cells, which took focus off the field again and left it
            // on the document. Handing it back afterwards is what makes a keyboard commit land on
            // the field. Same reason the autoFocus open below is queued.
            if (pickedFromOpenCalendar) {
              clearTimeout(this.commitFocusTimer);
              this.commitFocusTimer = setTimeout(() => {
                if (!this.isDestroyed)
                  this.returnFocusToTrigger();
              });
            }
            return;
          }
          if (formattedDate?.length) {
            const [startDate, endDate] = formattedDate;
            this.isValueExists = true;
            // In double mode both months are already on screen, so jumping the view to the date
            // the user just clicked would scroll the pair out from under them.
            if (!this.isDoubleCalendar()) {
              this.datePickerInstance.setViewDate(formatDate(startDate && endDate ? endDate : startDate));
            }
            if (formattedDate.length === 2) {
              this.portalRef?.classList.add('wpp-range-selected');
            }
            else {
              this.portalRef?.classList.remove('wpp-range-selected');
            }
            this.lastValidDate = formattedDate;
          }
        },
        ...(this.range && !this.isDoubleCalendar() ? buttonsConfig : {}),
      });
      this.datePickerInstance['$datepicker'].setAttribute('part', 'datepicker');
      this.datePickerInstance['$datepicker'].classList.add('wpp-calendar-primary');
      if (this.isDoubleCalendar()) {
        this.createMirrorInstance(firstDay, IconChevron);
      }
      this.isDatePickerInitialized = true;
    };
    /**
     * Builds the second, display-only calendar shown one month ahead of the primary.
     *
     * air-datepicker derives each cell's `-in-range-`/`-range-from-`/`-range-to-` class from its
     * own `selectedDates` and `focusDate` and never clamps them to the visible month. So feeding
     * both instances the same dates makes each paint its own slice and the range reads as one
     * continuous run across the gap — no cell painting of our own.
     */
    this.createMirrorInstance = (firstDay, IconChevron) => {
      // Detached host: with `inline: true` air-datepicker renders next to its $el, and we move
      // $datepicker into the calendars row ourselves. Binding it to the real input instead would
      // double up the input's key/focus handling.
      const mirrorHost = document.createElement('div');
      this.mirrorDatePickerInstance = new AirDatepicker(mirrorHost, {
        range: this.range,
        toggleSelected: false,
        multipleDatesSeparator: DATES_SEPARATOR,
        autoClose: false,
        inline: true,
        locale: { ...defaultLocale, ...this._locales, firstDay },
        showOtherMonths: true,
        fixedHeight: true,
        selectOtherMonths: true,
        view: this.view,
        minView: this.view,
        dateFormat: this.getDateFormat(),
        startDate: this.getNextMonth(this.datePickerInstance.viewDate),
        navTitles: {
          days: '<p class="datepicker-header">MMMM</p>,<p class="datepicker-header header-year">yyyy</p>',
          years: '<p class="years">yyyy1 - yyyy2</p>',
        },
        nextHtml: `<${IconChevron} class="nav-icon"></${IconChevron}>`,
        prevHtml: `<${IconChevron} class="nav-icon prev-icon"></${IconChevron}>`,
        // Selection made in the right-hand calendar: hand it to the primary so the normal
        // pipeline (validation, input, wppChange, range-selected class) runs exactly once.
        // Captured before the mirror moves itself, so picking its greyed 1 October keeps the
        // pair on August|September too.
        onBeforeSelect: () => {
          this.captureGridFocus();
          this.captureViewAnchor();
          return true;
        },
        onSelect: () => {
          if (this.isDestroyed || this.isSyncingCalendars)
            return;
          const dates = this.mirrorDatePickerInstance?.selectedDates.slice() ?? [];
          this.isSyncingCalendars = true;
          this.datePickerInstance.clear({ silent: true });
          this.isSyncingCalendars = false;
          // Hand the pick to the primary so the normal pipeline runs exactly once, then put the
          // pair back where the user left it.
          if (dates.length)
            this.datePickerInstance.selectDate(dates);
          this.restoreViewAnchor();
          this.scheduleCalendarA11yAugment();
        },
        onChangeViewDate: () => {
          this.syncViewDates('mirror');
          this.scheduleCalendarA11yAugment();
        },
        onChangeView: view => {
          this.syncCalendarView('mirror', view);
          this.scheduleCalendarA11yAugment();
        },
        onFocus: ({ date }) => this.syncFocusDate('mirror', date),
      });
      const mirrorEl = this.mirrorDatePickerInstance['$datepicker'];
      mirrorEl.setAttribute('part', 'datepicker-secondary');
      mirrorEl.classList.add('wpp-calendar-secondary');
    };
    this.getNextMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1);
    /**
     * The mirror sits one *page* ahead of the primary, where a page is whatever the current view
     * shows: a month in days view, a year in months view, a decade in years view. That matches
     * what the chevrons already step by, so the pair stays consistent at every drill level.
     */
    this.getPageOffset = (date, direction) => {
      switch (this.datePickerInstance?.currentView) {
        case 'months':
          return new Date(date.getFullYear() + direction, date.getMonth(), 1);
        case 'years':
          return new Date(date.getFullYear() + direction * 10, date.getMonth(), 1);
        default:
          return new Date(date.getFullYear(), date.getMonth() + direction, 1);
      }
    };
    /**
     * Pushes the primary's selection onto the mirror so both paint the same range. Called after
     * every programmatic change, since `silent` updates don't fire `onSelect`.
     */
    this.syncMirrorSelection = () => {
      if (!this.mirrorDatePickerInstance || this.isSyncingCalendars)
        return;
      this.isSyncingCalendars = true;
      const dates = this.datePickerInstance.selectedDates.slice();
      const keepViewDate = this.mirrorDatePickerInstance.viewDate;
      // Range mode appends, so clear first — otherwise a partial range gets corrupted.
      this.mirrorDatePickerInstance.clear({ silent: true });
      if (dates.length)
        this.mirrorDatePickerInstance.selectDate(dates, { silent: true });
      this.mirrorDatePickerInstance.setViewDate(keepViewDate);
      this.isSyncingCalendars = false;
    };
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
    this.captureGridFocus = () => {
      // Only the first capture of a selection counts, for the same reason as the view anchor below:
      // the right calendar's pick re-fires the primary's onBeforeSelect, by which point focus is
      // already gone and a second capture would record nothing over the real answer.
      if (this.gridFocusBeforeSelect)
        return;
      const active = this.deepActiveElement();
      if (!active || !this.portalRef?.contains(active) || !active.classList.contains(AIR_DP_CLASS.cell))
        return;
      // The grid is recorded alongside the date because both calendars render the days either side
      // of the boundary: picking 8 October in the right calendar also matches September's greyed
      // copy of it, and restoring by date alone would move the ring to the wrong month.
      const bodyIndex = this.getActiveBodies().findIndex(body => body.contains(active));
      this.gridFocusBeforeSelect = { bodyIndex, key: this.cellKey(active) };
    };
    /** Identifies a cell by the date it renders — stable across the re-render that replaces it. */
    this.cellKey = (cell) => `${cell.dataset.year}-${cell.dataset.month}-${cell.dataset.date}`;
    this.captureViewAnchor = () => {
      // Only the first capture of a selection counts. Handing a right-calendar pick to the
      // primary calls selectDate on it, which re-fires the primary's onBeforeSelect — capturing
      // again there would overwrite the user's real starting month with one already moved.
      if (!this.isDoubleCalendar() || this.viewAnchorBeforeSelect)
        return;
      this.viewAnchorBeforeSelect = this.datePickerInstance?.viewDate;
    };
    this.restoreViewAnchor = () => {
      const anchor = this.viewAnchorBeforeSelect;
      if (!anchor || !this.isDoubleCalendar())
        return;
      this.applyDoubleCalendarView(anchor);
      // selectDate settles asynchronously and re-parks the view afterwards, so re-apply once the
      // microtask queue has drained. A deliberate move in between clears the anchor, which
      // cancels this — that is what keeps an initial value or a preset preview from being
      // dragged back to the month the user happened to be on.
      Promise.resolve().then(() => {
        if (this.isDestroyed || this.viewAnchorBeforeSelect !== anchor)
          return;
        this.applyDoubleCalendarView(anchor);
        this.viewAnchorBeforeSelect = undefined;
      });
    };
    /** Either calendar's chevrons move both; the mirror stays exactly one page ahead. */
    this.syncViewDates = (source) => {
      if (!this.mirrorDatePickerInstance || this.isSyncingCalendars)
        return;
      this.isSyncingCalendars = true;
      if (source === 'primary') {
        this.mirrorDatePickerInstance.setViewDate(this.getPageOffset(this.datePickerInstance.viewDate, 1));
      }
      else {
        this.datePickerInstance.setViewDate(this.getPageOffset(this.mirrorDatePickerInstance.viewDate, -1));
      }
      this.isSyncingCalendars = false;
    };
    /**
     * Drilling up to months/years switches only the calendar that was clicked, which would leave
     * a months grid sitting next to a days grid. Move both, then re-assert the one-page-ahead
     * offset at the new granularity.
     */
    this.syncCalendarView = (source, view) => {
      if (!this.mirrorDatePickerInstance || this.isSyncingCalendars)
        return;
      const target = source === 'primary' ? this.mirrorDatePickerInstance : this.datePickerInstance;
      const leader = source === 'primary' ? this.datePickerInstance : this.mirrorDatePickerInstance;
      this.isSyncingCalendars = true;
      target.setCurrentView(view, { silent: true });
      target.setViewDate(this.getPageOffset(leader.viewDate, source === 'primary' ? 1 : -1));
      this.isSyncingCalendars = false;
    };
    /**
     * Extends the half-picked hover preview across the gap. air-datepicker recomputes in-range
     * from `focusDate`, so handing the hovered date to the other instance is all it takes.
     */
    this.syncFocusDate = (source, date) => {
      if (!this.mirrorDatePickerInstance || this.isSyncingCalendars)
        return;
      const target = source === 'primary' ? this.mirrorDatePickerInstance : this.datePickerInstance;
      this.isSyncingCalendars = true;
      target.setFocusDate(date || false, { viewDateTransition: false });
      this.isSyncingCalendars = false;
    };
    /**
     * A deliberate move — an initial value, a preset preview. Clears the selection anchor so a
     * pending restore doesn't drag the pair back afterwards.
     */
    this.setDoubleCalendarView = (date) => {
      this.viewAnchorBeforeSelect = undefined;
      this.applyDoubleCalendarView(date);
    };
    /** Puts the primary on `date`'s month and the mirror on the one after. */
    this.applyDoubleCalendarView = (date) => {
      if (!this.mirrorDatePickerInstance)
        return;
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      this.isSyncingCalendars = true;
      this.datePickerInstance.setViewDate(startOfMonth);
      // One page ahead at the granularity on screen — a month in days view, a year in months
      // view, a decade in years view. Hardcoding "next month" here left both calendars showing
      // the same year once the user drilled up.
      this.mirrorDatePickerInstance.setViewDate(this.getPageOffset(startOfMonth, 1));
      this.isSyncingCalendars = false;
    };
    this.onHideGetLastAppliedValue = () => {
      // If onBlur already detected an invalid manual input, preserve the error state
      if (this.internalMessage)
        return;
      const selectedDates = this.datePickerInstance.selectedDates;
      // Save current selection on click outside instead of reverting
      if (selectedDates.length === 2) {
        const formattedDates = selectedDates.map(date => this.datePickerInstance.formatDate(date, this.getDateFormat()));
        // Only emit if selection actually changed
        if (!isEqual(formattedDates, this.lastAppliedDate)) {
          this.lastAppliedDate = formattedDates;
          this.lastValidDate = formattedDates;
          const inputValue = formattedDates.join(DATES_SEPARATOR);
          this.updateInput(inputValue, inputValue.length);
          this.wppChange.emit({
            date: selectedDates,
            formattedDate: formattedDates,
            name: this.name,
          });
        }
      }
      else if (this.lastAppliedDate.length === 2) {
        // Partial selection (only 1 date picked) — revert to last applied
        const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
        this.lastValidDate = this.lastAppliedDate;
        if (this.inputRef) {
          this.inputRef.value = this.lastAppliedDate.join(DATES_SEPARATOR);
        }
        this.value = this.lastAppliedDate;
        this.datePickerInstance.clear({ silent: true });
        this.datePickerInstance.selectDate([formatDate(this.lastAppliedDate[0]), formatDate(this.lastAppliedDate[1])]);
      }
      else if (selectedDates.length === 1) {
        // Only one date selected and no previous applied pair — clear
        this.clearDatePicker();
      }
    };
    this.createTippyInstance = () => {
      if (!this.portalRef)
        return;
      const dropdownConfig = this.dropdownConfig;
      const anchor = this.hasTriggerSlot ? this.triggerWrapperRef : this.inputRef;
      if (!anchor)
        return;
      this.portalRef.classList.add('portal-datepicker');
      const dropdownOffset = this.hasTriggerSlot ? 4 : 8;
      this.tippyInstance = menuListConfig({
        anchor,
        content: this.portalRef,
        maxWidth: 'none',
        zIndex: Z_INDEX.DATE_PICKER,
        hideOnClick: false,
        trigger: this.hasTriggerSlot ? 'manual' : 'click',
        appendTo: getHighestContainerInDOM(),
        // Only an explicit `autoFocus` opens the calendar on load (componentDidLoad); focus arriving
        // by click or Tab never does.
        popperOptions: {
          strategy: 'fixed',
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top-start'],
                boundary: 'viewport',
                padding: 5,
              },
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                tether: true,
                tetherOffset: 0,
                altAxis: true,
                padding: 5,
              },
            },
            {
              name: 'offset',
              options: {
                offset: [0, dropdownOffset],
              },
            },
          ],
        },
        ...dropdownConfig,
        onShow: (instance) => {
          this.isCalendarOpen = true;
          // Opening the calendar is the user engaging again, whatever put focus here.
          this.isVisuallyActive = true;
          if (this.dropdownConfig.onShow) {
            this.dropdownConfig.onShow(instance);
          }
        },
        onShown: (instance) => {
          this.updateDatepickerClearButton(this.lastValidDate);
          this.scheduleCalendarA11yAugment();
          // Queued after the augmentation above, so the roving tabindex is already assigned by the
          // time focus moves. The grid does not exist until tippy has mounted, which is why this
          // cannot happen where the key was handled.
          if (this.focusGridWhenOpened) {
            this.focusGridWhenOpened = false;
            clearTimeout(this.openGridFocusTimer);
            this.openGridFocusTimer = setTimeout(() => {
              if (!this.isDestroyed)
                this.focusGrid();
            });
          }
          if (this.dropdownConfig.onShown) {
            this.dropdownConfig.onShown(instance);
          }
        },
        onHidden: (instance) => {
          this.isInComponent = false;
          this.isVisuallyActive = false;
          this.isCalendarOpen = false;
          if (this.range) {
            this.onHideGetLastAppliedValue();
          }
          if (this.dropdownConfig.onHidden) {
            this.dropdownConfig.onHidden(instance);
          }
        },
        onClickOutside: (instance, event) => {
          // For trigger slot, check if click is on trigger wrapper or its children
          if (this.hasTriggerSlot && this.triggerWrapperRef) {
            const isClickOnTrigger = this.triggerWrapperRef.contains(event.target) ||
              event.composedPath().some(el => el === this.triggerWrapperRef);
            if (isClickOnTrigger) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
          }
          // For regular input datepicker, check if click is on the host element
          if (!this.hasTriggerSlot && event.target === this.host) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          this.tippyInstance?.hide();
          if (this.dropdownConfig.onClickOutside) {
            this.dropdownConfig.onClickOutside(instance, event);
          }
        },
      });
    };
    this.clearDatePicker = () => {
      if (!this.lastValidDate)
        return;
      this.lastValidDate = '';
      this.lastAppliedDate = [];
      this.isValueExists = false;
      this.datePickerInstance.clear();
      this.datePickerInstance.update();
      this.syncMirrorSelection();
      this.wppDateClear.emit({
        clear: true,
      });
    };
    this.onInput = () => {
      this.focusType = FOCUS_TYPE.NONE;
      this.justSelectedFromCalendar = false;
    };
    this.clearInternalValidation = () => {
      this.internalMessage = '';
      this.internalMessageType = undefined;
    };
    this.validateManualInput = (inputValue) => {
      if (!inputValue || !inputValue.trim())
        return true;
      const errorMessage = this._locales.invalidDateMessage || LOCALES_DEFAULTS.invalidDateMessage;
      if (this.range) {
        const parts = inputValue.split(DATES_SEPARATOR);
        if (parts.length === 2) {
          const isStartValid = this.isStringDateValid(parts[0].trim());
          const isEndValid = this.isStringDateValid(parts[1].trim());
          if (!isStartValid || !isEndValid) {
            this.internalMessage = errorMessage;
            this.internalMessageType = 'error';
            return false;
          }
        }
        else {
          // Incomplete range (single date or missing separator) is always invalid
          this.internalMessage = errorMessage;
          this.internalMessageType = 'error';
          return false;
        }
      }
      else {
        if (!this.isStringDateValid(inputValue.trim())) {
          this.internalMessage = errorMessage;
          this.internalMessageType = 'error';
          return false;
        }
      }
      this.clearInternalValidation();
      return true;
    };
    /**
     * Runs the leave checks. Called two ways: the input's own blur event, and the @Watch on
     * `isInComponent` when the popup closes — which is not a blur at all. `keepFocusRing` marks
     * that second case: Escape and Apply hand focus back to the field before the popup finishes
     * hiding, so clearing the ring there stripped it off a field the user was still sitting on.
     */
    this.onBlur = (options) => {
      // Clear the keyboard focus ring the moment the input actually blurs — even while the calendar
      // is still open — so a datepicker you have tabbed away from does not keep its ring. The
      // `.tab-focus` class is stateful, not :focus-visible, so it must be reset explicitly.
      if (!options?.keepFocusRing) {
        this.focusType = FOCUS_TYPE.NONE;
      }
      if (this.isInComponent) {
        // Blurring while the calendar is open means focus moved into the popup, so the field stays
        // "in component" and the leave logic below waits for onHidden to flip the flag. With the
        // calendar closed there is no popup to move into and no onHidden coming, so the flag has to
        // be dropped here — otherwise a field that was only ever focused (never opened) keeps its
        // active look after you tab away, and never emits wppBlur or re-validates again.
        if (this.isCalendarOpen)
          return;
        this.isVisuallyActive = false;
        // Flipping this re-enters onBlur through its @Watch, which then runs the leave logic below.
        this.isInComponent = false;
        return;
      }
      const inputValue = this.inputRef?.value ?? '';
      this.wppBlur.emit();
      // Skip re-validation if user just selected a date from the calendar
      if (this.justSelectedFromCalendar) {
        this.justSelectedFromCalendar = false;
        return;
      }
      // Validate manual input and show error if invalid
      if (inputValue && !this.validateManualInput(inputValue)) {
        this.value = inputValue;
        this.isValueExists = true;
        return;
      }
      this.clearInternalValidation();
      if (!inputValue) {
        this.value = this.lastValidDate;
        return;
      }
      // Update lastValidDate & isValueExists for valid manual input
      const dateFormat = this.getDateFormat();
      const separator = this.getDateFormatSeparator(dateFormat);
      const toDateObject = getCurrentFormatDate(dateFormat, separator);
      if (this.range) {
        const parts = inputValue.split(DATES_SEPARATOR).map(p => p.trim());
        if (parts.length === 2 && parts.every(p => this.isStringDateValid(p))) {
          this.lastValidDate = parts;
          this.isValueExists = true;
          this.wppChange.emit({
            date: parts.map(p => toDateObject(p)),
            formattedDate: parts,
            name: this.name,
          });
        }
      }
      else {
        if (this.isStringDateValid(inputValue.trim())) {
          this.lastValidDate = inputValue.trim();
          this.isValueExists = true;
          this.wppChange.emit({
            date: toDateObject(inputValue.trim()),
            formattedDate: inputValue.trim(),
            name: this.name,
          });
        }
      }
      this.value = inputValue;
    };
    this.onFocus = (event) => {
      this.isInComponent = true;
      // Read before the block below clears it: focus returned programmatically after a selection,
      // a clear or Escape leaves the field looking idle (and without the clear affordance) rather
      // than painted active, while still keeping focus so the keyboard user is not stranded.
      this.isVisuallyActive = !this.suppressShowOnFocus;
      this.clearInternalValidation();
      this.justSelectedFromCalendar = false;
      this.wppFocus.emit(event);
      // Tabbing to the field opens the calendar, so the keyboard lands on the same state a click
      // does — QA asked for the two to agree. The date can still be typed with the popup up.
      //
      // Only for keyboard focus. A pointer press already sets MOUSE in onMouseDown, which runs
      // before this, and tippy's own `click` trigger toggles the popup for that case — opening here
      // as well would show it on focus and let the click that followed immediately toggle it shut.
      //
      // The suppress flag keeps this off the dismissal paths: focus handed back after Escape, Apply,
      // a committed date, or a Tab past the last popup control would otherwise reopen the popup the
      // user had just closed.
      const shouldOpen = !this.suppressShowOnFocus && this.focusType !== FOCUS_TYPE.MOUSE;
      this.suppressShowOnFocus = false;
      if (shouldOpen && !this.static)
        this.tippyInstance?.show();
    };
    this.onMouseDown = () => {
      this.lastInteractionWasKeyboard = false;
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
      }
      // Skip auto-format logic for non-default formats (e.g. 'MMMM yyyy')
      if (!this.isDefaultDateFormat())
        return;
      const isAddedChar = event.key !== 'Backspace';
      const dateFormat = this.getDateFormat();
      const separator = this.getDateFormatSeparator(dateFormat);
      const dateAndSeparator = dateFormat.length + DATES_SEPARATOR.length;
      const toDateObject = getCurrentFormatDate(dateFormat, separator);
      const getDateInfo = (date) => getFormattedDateString(date, dateFormat, separator);
      const dates = this.inputRef.value.split(DATES_SEPARATOR).map(date => date.replace(/[^a-zA-Z0-9]/g, ''));
      let datesInfo = [getDateInfo(dates[0]), getDateInfo(dates[1])];
      const isAllDatesFulfilled = datesInfo.every(info => info.isAllMatchedPartsLength);
      const isOnlyFirstDateFulfilled = datesInfo[0].isAllMatchedPartsLength && !dates[1];
      let cursorPosition = this.inputRef.selectionStart;
      // Sort dates if both fulfilled, including cursor position
      if (isAllDatesFulfilled && toDateObject(datesInfo[0].formattedDate) > toDateObject(datesInfo[1].formattedDate)) {
        datesInfo = datesInfo.reverse();
        cursorPosition = ((cursorPosition > dateAndSeparator && cursorPosition - dateAndSeparator) ||
          (cursorPosition <= dateFormat.length && cursorPosition + dateAndSeparator));
      }
      const inputValue = this.range
        ? datesInfo
          .map(info => info.formattedDate)
          .join(datesInfo[0].isAllMatchedPartsLength || dates[1] ? DATES_SEPARATOR : '')
        : datesInfo[0].formattedDate;
      cursorPosition = getNextCursorPosition(inputValue, cursorPosition, isAddedChar, separator);
      // Only sync to air-datepicker if all fulfilled dates are strictly valid (prevents auto-adjustment)
      const fulfilledDateStrings = datesInfo.filter(info => info.isAllMatchedPartsLength).map(info => info.formattedDate);
      const allFulfilledDatesValid = fulfilledDateStrings.length > 0 && fulfilledDateStrings.every(d => this.isStringDateValid(d));
      if (allFulfilledDatesValid) {
        // Update lastValidDate as user types valid dates (enables Apply button, shows cross icon)
        this.lastValidDate = fulfilledDateStrings.length === 1 ? fulfilledDateStrings[0] : fulfilledDateStrings;
        this.isValueExists = true;
        const inputDates = fulfilledDateStrings.map(d => toDateObject(d));
        if (!isEqual(inputDates, this.datePickerInstance.selectedDates)) {
          this.isManuallyTyping = true;
          // @ts-ignore Due to outdated air-datepicker.d.ts
          this.datePickerInstance.clear({ silent: true });
          // @ts-ignore Due to outdated air-datepicker.d.ts
          this.datePickerInstance
            .selectDate(inputDates)
            .then(() => {
            if (!(isOnlyFirstDateFulfilled || isAllDatesFulfilled)) {
              this.updateInput(inputValue, cursorPosition);
            }
            if (this.range && isOnlyFirstDateFulfilled) {
              this.updateInput(this.inputRef.value + DATES_SEPARATOR, cursorPosition === dateFormat.length ? cursorPosition + DATES_SEPARATOR.length : cursorPosition);
            }
            // Navigate calendar to show the manually entered date
            const lastDate = inputDates[inputDates.length - 1];
            this.datePickerInstance.setViewDate(lastDate);
          })
            .finally(() => {
            this.isManuallyTyping = false;
          });
        }
      }
      this.updateInput(inputValue, cursorPosition);
    };
    this.updateInput = (value, cursorPosition) => {
      if (this.inputRef) {
        this.inputRef.value = value;
        this.value = value;
        this.inputRef.setSelectionRange(cursorPosition, cursorPosition);
      }
    };
    /**
     * Whether the calendar popup is (or is becoming) visible. tippy flips `isVisible`
     * synchronously on show() but `isShown` only after the show transition — checking both
     * closes the race where a fast Tab/Escape lands during the opening animation.
     */
    this.isCalendarPopupVisible = () => Boolean(this.tippyInstance?.state?.isVisible || this.tippyInstance?.state?.isShown);
    this.onKeyDown = (event) => {
      this.lastInteractionWasKeyboard = true;
      // Escape closes the calendar first and must NOT bubble to a containing modal
      // (WPPOPENDS-1484 item 10). wpp-side-modal listens for Escape on `document` in the
      // bubble phase, so stopping propagation here (at the input, the event target) keeps
      // the modal open. Only swallow Escape while the calendar is actually open.
      if (event.key === 'Escape') {
        if (this.isCalendarPopupVisible()) {
          event.preventDefault();
          event.stopPropagation();
          this.closeCalendar();
        }
        return;
      }
      // Enter and Space open the calendar from the field, which is how it is reopened after being
      // dismissed (W3C ARIA APG, Date Picker Dialog — the pattern's trigger is activated this way).
      // The calendar icon carries those semantics but is deliberately out of the tab order, so the
      // field answers for it. Only while closed: with the popup up, Space belongs to the grid.
      if ((event.key === 'Enter' || event.key === ' ') && !this.isCalendarPopupVisible() && !this.static) {
        event.preventDefault();
        this.tippyInstance?.show();
        return;
      }
      // ArrowDown / ArrowUp open the calendar from the field and move focus into the date grid,
      // so the keyboard route does not depend on tabbing to the "choose date" button.
      // Left/Right stay with the text caret.
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (this.isCalendarPopupVisible()) {
          this.focusGrid();
        }
        else {
          // Opening first: the grid does not exist yet, so `onShown` hands focus over once it does.
          this.focusGridWhenOpened = true;
          this.tippyInstance?.show();
        }
        return;
      }
      // Tab from the input bridges focus INTO the popup — the calendar lives in a portal
      // (appended to the body), so the browser's natural tab order would skip it. Forward
      // Tab only: from the first control, the popup's controls are natural tab stops, and
      // Tab past the last one closes the popup (handlePortalKeyDown).
      if (event.key === 'Tab' && !event.shiftKey && this.isCalendarPopupVisible()) {
        let firstControl = this.getFirstPopupControl();
        // A fast Tab can outrun the scheduled onShown augmentation, leaving the nav
        // controls without tabindex (unfocusable). Augment synchronously and retry.
        if (!firstControl || firstControl.getAttribute('tabindex') !== '0') {
          this.augmentCalendarA11y();
          firstControl = this.getFirstPopupControl();
        }
        if (firstControl && firstControl.getAttribute('tabindex') === '0') {
          event.preventDefault();
          firstControl.focus();
          return;
        }
      }
      // For non-default date formats (e.g. 'MMMM yyyy'), keep the input read-only.
      if (!this.isDefaultDateFormat()) {
        if (!event.metaKey && !event.ctrlKey && event.key !== 'Tab') {
          event.preventDefault();
        }
        return;
      }
      const separator = this.getDateFormatSeparator(this.getDateFormat());
      const allowedKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Enter',
        // Caret navigation within the typed date must keep working (item 3 / C8) — these keys
        // do not insert characters, so they are safe to allow through the numeric-only filter.
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End',
        separator,
        ...Array.from({ length: 10 }, (_, i) => i.toString()),
      ];
      if (!allowedKeys.includes(event.key) && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
      }
    };
    this.handleBlurPortal = (event) => {
      if (event.relatedTarget && this.portalRef && this.portalRef.contains(event.relatedTarget))
        return;
      this.hideTimer = setTimeout(() => this.tippyInstance?.hide());
    };
    this.handlePreviewPreset = (dateRange) => {
      if (this.previewPresetTimer) {
        clearTimeout(this.previewPresetTimer);
      }
      const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
      const [currentSelectedStartDate, currentSelectedEndDate] = this.datePickerInstance.selectedDates;
      const formattedStartDate = formatDate(dateRange[0]);
      const formattedEndDate = formatDate(dateRange[1]);
      if (isValidDate([formattedStartDate, formattedEndDate]) &&
        (!isEqual(currentSelectedStartDate, formattedStartDate) || !isEqual(currentSelectedEndDate, formattedEndDate))) {
        // Clear existing selection first — in range mode, selectDate appends to existing dates.
        // If there's a partial selection (1 date), appending 2 more causes air-datepicker to
        // complete the range then start a new one, leaving only 1 date selected.
        this.datePickerInstance.clear({ silent: true });
        this.datePickerInstance.selectDate([formattedStartDate, formattedEndDate]);
        this.datePickerInstance.update();
        // Park the pair on the preset's start month so the previewed range is actually visible.
        this.setDoubleCalendarView(formattedStartDate);
      }
    };
    this.handleClickCalendarIcon = () => {
      if (this.disabled)
        return;
      if (this.inputRef && this.tippyInstance) {
        this.inputRef.focus();
        this.tippyInstance.show();
      }
    };
    this.handleClickPreset = (preset) => {
      this.hasClickedPreset = true;
      this.value = preset.value;
      this.lastValidDate = preset.value;
      this.lastAppliedDate = preset.value;
      this.wppChange.emit({
        date: this.datePickerInstance.selectedDates,
        formattedDate: this.datePickerInstance.selectedDates.map(selectedDate => this.datePickerInstance.formatDate(selectedDate, this.getDateFormat())),
        name: this.name,
      });
      this.tippyInstance?.hide();
    };
    this.handleMouseLeavePreset = () => {
      if (this.hasClickedPreset) {
        this.hasClickedPreset = false;
        return;
      }
      this.previewPresetTimer = setTimeout(() => {
        if (this.lastAppliedDate.length > 0) {
          this.handlePreviewPreset(this.lastAppliedDate);
        }
        else {
          this.datePickerInstance.clear();
          this.lastValidDate = '';
        }
      }, 100);
    };
    this.handleClickIconCross = () => {
      if (this.disabled)
        return;
      // Clear input even if no valid date was committed
      if (this.inputRef) {
        this.inputRef.value = '';
      }
      this.clearInternalValidation();
      this.justSelectedFromCalendar = false;
      this.value = '';
      this.isValueExists = false;
      this.lastValidDate = '';
      this.lastAppliedDate = [];
      this.datePickerInstance.clear();
      this.datePickerInstance.update();
      this.wppDateClear.emit({ clear: true });
    };
    // ---------------------------------------------------------------------------
    // Calendar popup keyboard accessibility (WPPOPENDS-1484)
    //
    // air-datepicker renders the navigation, grid and footer buttons itself into
    // `portalRef`. We layer the ARIA APG date-picker semantics on top of that DOM
    // in `augmentCalendarA11y`, re-running it whenever air-datepicker re-renders
    // (open, prev/next, view switch). Grid navigation uses roving tabindex + real
    // DOM focus on cells, with our own date math (air-datepicker's keyboardNav is
    // disabled) so the input's caret keys keep working.
    // ---------------------------------------------------------------------------
    /**
     * The control the calendar was opened from: the field normally, the slotted button when a
     * trigger is used. A `wpp-*` trigger keeps its real button inside its own shadow root, and
     * focusing the host of a custom element that isn't focusable itself does nothing, so reach
     * through to that button.
     */
    /** The calendar is on screen: either the popup is open, or it is a static, always-visible one. */
    this.isCalendarVisible = () => this.static || this.isCalendarOpen;
    /**
     * The node that really has focus. `document.activeElement` stops at a shadow host, and a static
     * datepicker renders its calendar inside this component's shadow root rather than a light-DOM
     * popup — so every `portal.contains(document.activeElement)` check quietly read false there.
     */
    this.deepActiveElement = () => {
      let element = document.activeElement;
      while (element?.shadowRoot?.activeElement)
        element = element.shadowRoot.activeElement;
      return element;
    };
    this.getTriggerFocusTarget = () => {
      const slotted = this.host.querySelector('[slot="trigger"]');
      return slotted?.shadowRoot?.querySelector('button, [tabindex]') ?? slotted;
    };
    /**
     * Return focus to the control that opened the calendar, without re-opening it. Only refocuses
     * when that control isn't already focused, so the suppress flag can't get stuck set (which
     * would stop the next legitimate open).
     */
    this.returnFocusToTrigger = () => {
      // A trigger-slot datepicker renders no input at all, so the old `inputRef.focus()` was a
      // silent no-op: closing with Escape, or committing with Apply, dropped focus on the document
      // instead of handing it back to the button (WCAG 2.4.3). Nothing below applies to that path —
      // the popup is opened manually, not by focus, and the ring belongs to the button itself.
      if (this.hasTriggerSlot) {
        this.getTriggerFocusTarget()?.focus();
        return;
      }
      // The field's focus ring comes from the stateful `.tab-focus` class, not `:focus-visible`, and
      // that class is only ever set by a real mousedown or Tab keyup — handing focus back in code
      // fires neither, so the field ended up focused while painted idle (WCAG 2.4.7). Which state it
      // takes follows the modality: a keyboard dismissal needs the ring, a mouse one must not draw
      // it, exactly as `:focus-visible` would behave.
      //
      // Set before the guard below: dismissing repaints the field's focus state even when focus
      // never left it, which is the common keyboard case — the popup opens from the field and
      // Escape closes it without focus ever moving into the grid.
      this.focusType = this.lastInteractionWasKeyboard ? FOCUS_TYPE.TAB : FOCUS_TYPE.NONE;
      // A pointer-driven dismissal stops here: dragging focus back into the field put a text caret
      // in it and left it painted active, which is not what clicking a date or Apply should leave
      // behind. The keyboard needs the hand-back — a mouse user does not.
      if (!this.lastInteractionWasKeyboard)
        return;
      if (this.host.shadowRoot?.activeElement === this.inputRef)
        return;
      this.suppressShowOnFocus = true;
      this.inputRef?.focus();
    };
    /** Hide the calendar and return focus to the input (ESC / after selection). */
    this.closeCalendar = () => {
      this.tippyInstance?.hide();
      this.returnFocusToTrigger();
    };
    /** Move focus from the input into the grid, onto the roving cell. */
    this.focusGrid = () => {
      this.getRovingCell()?.focus();
    };
    /** Re-apply ARIA augmentation after air-datepicker finishes its async render. */
    this.scheduleCalendarA11yAugment = () => {
      if (this.isDestroyed)
        return;
      clearTimeout(this.a11yAugmentTimer);
      this.a11yAugmentTimer = setTimeout(() => {
        if (!this.isDestroyed)
          this.augmentCalendarA11y();
      });
    };
    /**
     * Every rendered grid. `withDoubleCalendar` renders two months side by side, so the keyboard
     * model has to treat the pair as one composite grid — otherwise it silently drives only the
     * left calendar. With a single calendar this is a one-element list and nothing changes.
     */
    this.getActiveBodies = () => Array.from(this.portalRef?.querySelectorAll(`.${AIR_DP_CLASS.body}:not(.${AIR_DP_STATE.hidden})`) ?? []);
    this.getActiveBody = () => this.getActiveBodies()[0] ?? null;
    /** Cells across every grid, in DOM order — which is chronological across the pair. */
    this.getCells = () => this.getActiveBodies().flatMap(body => Array.from(body.querySelectorAll(`.${AIR_DP_CLASS.cell}`)));
    this.getRovingCell = () => this.getCells().find(c => c.getAttribute('tabindex') === '0') || this.getPreferredCell() || null;
    /** The cell that should be the single tab stop: selected, else today, else first enabled. */
    this.getPreferredCell = () => {
      const cells = this.getCells();
      return (cells.find(c => c.classList.contains(AIR_DP_STATE.selected)) ||
        cells.find(c => c.classList.contains(AIR_DP_STATE.current)) ||
        cells.find(c => !c.classList.contains(AIR_DP_STATE.disabled)) ||
        null);
    };
    this.setRovingCell = (cell) => {
      this.getCells().forEach(c => c.setAttribute('tabindex', c === cell ? '0' : '-1'));
    };
    this.getGridColumns = () => {
      const cellsContainer = this.getActiveBody()?.querySelector(`.${AIR_DP_CLASS.cells}`);
      if (!cellsContainer)
        return 7;
      // gridTemplateColumns can be undefined in non-layout environments (mock DOM).
      const columns = (getComputedStyle(cellsContainer).gridTemplateColumns ?? '').split(' ').filter(Boolean).length;
      return columns || 7;
    };
    /** The instance that rendered a cell — the mirror owns the right-hand calendar's grid. */
    this.instanceForCell = (cell) => {
      const mirrorRoot = this.mirrorDatePickerInstance?.['$datepicker'];
      return mirrorRoot?.contains(cell) ? this.mirrorDatePickerInstance : this.datePickerInstance;
    };
    this.cellDate = (cell) => {
      const { year, month, date } = cell.dataset;
      if (year === undefined)
        return null;
      return new Date(Number(year), month === undefined ? 0 : Number(month), date === undefined ? 1 : Number(date));
    };
    this.cellAccessibleName = (cell) => {
      const { year, month, date } = cell.dataset;
      const months = this._locales.months;
      if (year !== undefined && month !== undefined && date !== undefined) {
        return `${Number(date)} ${months[Number(month)]} ${year}`;
      }
      if (year !== undefined && month !== undefined) {
        return `${months[Number(month)]} ${year}`;
      }
      if (year !== undefined)
        return `${year}`;
      return cell.textContent?.trim() ?? '';
    };
    this.findCellForDate = (target) => {
      const view = this.datePickerInstance?.currentView;
      const year = target.getFullYear();
      const month = target.getMonth();
      const day = target.getDate();
      let selector;
      if (view === 'years') {
        selector = `.${AIR_DP_CLASS.cell}[data-year="${year}"]`;
      }
      else if (view === 'months') {
        selector = `.${AIR_DP_CLASS.cell}[data-year="${year}"][data-month="${month}"]`;
      }
      else {
        selector = `.${AIR_DP_CLASS.cell}[data-year="${year}"][data-month="${month}"][data-date="${day}"]`;
      }
      const matches = this.getActiveBodies().flatMap(body => Array.from(body.querySelectorAll(selector)));
      // A date can appear more than once across two months: 1 Aug is a real cell in the August
      // grid and a greyed spill cell in July's trailing row. Prefer the month that owns it, so
      // arrowing off 31 Jul lands in the August calendar rather than on July's spill.
      return matches.find(c => !c.classList.contains(AIR_DP_STATE.otherMonth)) ?? matches[0] ?? null;
    };
    /** Focus the cell for `target`, navigating the view first if it is not rendered. */
    /**
     * Whether a date the keyboard is about to move to is inside the picker's own min/max window.
     * Outside it every cell is disabled, so paging there would strand the user on a month they
     * cannot select anything in.
     */
    this.isDateWithinLimits = (target) => {
      if (!this.minDate && !this.maxDate)
        return true;
      const parseDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
      const min = this.minDate ? parseDate(this.minDate) : null;
      const max = this.maxDate ? parseDate(this.maxDate) : null;
      if (min && startOfDay(target) < startOfDay(min))
        return false;
      if (max && startOfDay(target) > startOfDay(max))
        return false;
      return true;
    };
    this.focusDateCell = (target) => {
      // Arrowing past minDate/maxDate used to page the view onto a month where every date is
      // disabled. Stay where we are instead, the way a native date grid stops at its bounds.
      if (!this.isDateWithinLimits(target))
        return;
      const cell = this.findCellForDate(target);
      if (cell && !cell.classList.contains(AIR_DP_STATE.disabled)) {
        this.setRovingCell(cell);
        cell.focus();
        return;
      }
      // Target is outside the rendered page (or disabled) — navigate; augmentCalendarA11y
      // re-runs via onChangeViewDate and focuses the pending date once it is rendered.
      this.pendingGridFocusDate = target;
      this.datePickerInstance?.setViewDate(target);
    };
    this.moveGridFocusByDate = (current, key, columns, view) => {
      switch (key) {
        case 'ArrowRight':
          return this.focusDateCell(view === 'days' || !view ? addDays(current, 1) : this.addByView(current, view, 1));
        case 'ArrowLeft':
          return this.focusDateCell(view === 'days' || !view ? addDays(current, -1) : this.addByView(current, view, -1));
        case 'ArrowDown':
          return this.focusDateCell(this.addByView(current, view, columns));
        case 'ArrowUp':
          return this.focusDateCell(this.addByView(current, view, -columns));
        case 'PageDown':
          return this.focusDateCell(this.pageByView(current, view, 1));
        case 'PageUp':
          return this.focusDateCell(this.pageByView(current, view, -1));
      }
    };
    this.addByView = (date, view, delta) => {
      if (view === 'years')
        return addYears(date, delta);
      if (view === 'months')
        return addMonths(date, delta);
      return addDays(date, delta);
    };
    this.pageByView = (date, view, direction) => {
      if (view === 'years')
        return addYears(date, direction * 10);
      if (view === 'months')
        return addYears(date, direction);
      return addMonths(date, direction);
    };
    this.handleGridKeyDown = (event, cell) => {
      const key = event.key;
      if (key === 'Enter' || key === ' ') {
        event.preventDefault();
        // air-datepicker resolves an activated cell from its own `focusDate`, not from the element
        // that was clicked, and it only maintains that from its pointer handlers and its own arrow
        // keys — which are bound to the input, not to the cells our roving tabindex focuses. So it
        // had no idea which cell the keyboard was on and acted on whatever the pointer last hovered:
        // drilling into a month from the months view landed on the wrong one. Hand it the date first.
        const date = this.cellDate(cell);
        const instance = this.instanceForCell(cell);
        if (date && instance)
          instance.setFocusDate(date);
        // Activating a cell above the day view drills down rather than selects, and that rebuilds
        // every cell — so ask for focus to land on the same date in the view underneath, the way a
        // cross-view arrow move already does. Otherwise the re-render leaves focus on the document.
        if (date && instance && instance.currentView !== 'days')
          this.pendingGridFocusDate = date;
        cell.click(); // air-datepicker owns selection; single mode also closes + returns focus
        return;
      }
      if (key === 'Home' || key === 'End') {
        event.preventDefault();
        const cells = this.getCells();
        const columns = this.getGridColumns();
        const index = cells.indexOf(cell);
        const rowStart = index - (index % columns);
        const targetIndex = key === 'Home' ? rowStart : Math.min(rowStart + columns - 1, cells.length - 1);
        const target = cells[targetIndex];
        if (target && !target.classList.contains(AIR_DP_STATE.disabled)) {
          this.setRovingCell(target);
          target.focus();
        }
        return;
      }
      if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(key)) {
        const current = this.cellDate(cell);
        if (!current)
          return;
        event.preventDefault();
        this.moveGridFocusByDate(current, key, this.getGridColumns(), this.datePickerInstance?.currentView);
      }
    };
    this.getPresetItems = () => Array.from(this.portalRef?.querySelectorAll(`.${PRESET_ITEM_CLASS}`) ?? []);
    /**
     * First control focus lands on when Tab enters the popup: the first ENABLED tab stop in
     * DOM order. Using the tab-stop chain (not a hard-coded prev chevron) means a datepicker
     * whose chevrons are disabled by min/max bridges to the title instead of a dead control.
     */
    this.getFirstPopupControl = () => this.getPopupTabStops()[0] ?? null;
    this.handlePresetKeyDown = (event, item) => {
      const items = this.getPresetItems();
      const index = items.indexOf(item);
      if (index === -1)
        return;
      let nextIndex = index;
      switch (event.key) {
        case 'ArrowDown':
          nextIndex = (index + 1) % items.length;
          break;
        case 'ArrowUp':
          nextIndex = (index - 1 + items.length) % items.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = items.length - 1;
          break;
        // Enter/Space are handled by wpp-list-item itself (emits wppChangeListItem ->
        // handleClickPreset); handling them here too would select the preset twice.
        default:
          return;
      }
      event.preventDefault();
      // Roving tabindex is driven declaratively off presetRovingIndex (wpp-list-item reflects
      // its host tabindex, so a declarative value is stable where an imperative one raced its
      // render). Move focus now; the tabindex attributes follow on the next render.
      this.presetRovingIndex = nextIndex;
      items[nextIndex].focus();
      // Preview the highlighted preset in the calendar, matching mouse hover.
      this.handlePreviewPreset(this.presets[nextIndex].value);
    };
    /** The popup's tab stops in DOM order (only enabled controls carry tabindex=0). */
    this.getPopupTabStops = () => Array.from(this.portalRef?.querySelectorAll(`.${PRESET_ITEM_CLASS}[tabindex="0"], .${AIR_DP_CLASS.navAction}[tabindex="0"], ` +
      `.${AIR_DP_CLASS.navTitle}[tabindex="0"], .${AIR_DP_CLASS.cell}[tabindex="0"], ` +
      `.${AIR_DP_CLASS.button}[tabindex="0"]`) ?? []);
    /** Single delegated keydown handler for everything inside the popup. */
    this.handlePortalKeyDown = (event) => {
      this.lastInteractionWasKeyboard = true;
      // Escape closes the calendar first and must not reach a containing modal (item 10).
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.closeCalendar();
        return;
      }
      const target = event.target;
      if (!target)
        return;
      // Keep the non-modal popup from being abandoned open: forward Tab on the LAST control
      // closes the calendar and re-anchors focus on the input, so the browser's default Tab
      // then continues to the element after the input (no preventDefault). Shift+Tab on the
      // FIRST control returns to the input while the popup stays open.
      if (event.key === 'Tab') {
        const stops = this.getPopupTabStops();
        if (!event.shiftKey && stops.length && target === stops[stops.length - 1]) {
          this.tippyInstance?.hide();
          this.returnFocusToTrigger();
          return;
        }
        if (event.shiftKey && stops.length && target === stops[0]) {
          event.preventDefault();
          this.inputRef?.focus();
          return;
        }
        return;
      }
      if (target.getAttribute('role') === 'gridcell') {
        this.handleGridKeyDown(event, target);
        return;
      }
      if (target.classList.contains(PRESET_ITEM_CLASS)) {
        this.handlePresetKeyDown(event, target);
        return;
      }
      // Chevrons and the view-switching title are air-datepicker DIVs promoted to
      // role="button" — they have no native keyboard activation, so Enter/Space must
      // synthesize the click. (Clear/Apply are real <button>s and activate natively.)
      if ((event.key === 'Enter' || event.key === ' ') &&
        (target.classList.contains(AIR_DP_CLASS.navAction) || target.classList.contains(AIR_DP_CLASS.navTitle)) &&
        target.getAttribute('aria-disabled') !== 'true') {
        event.preventDefault();
        // Activation re-renders the nav; if air-datepicker replaces the focused node,
        // restore focus to its successor after the augmentation pass.
        if (target.classList.contains(AIR_DP_CLASS.navTitle)) {
          this.pendingNavRefocus = { selector: `.${AIR_DP_CLASS.navTitle}`, index: 0 };
        }
        else {
          const actions = Array.from(this.portalRef?.querySelectorAll(`.${AIR_DP_CLASS.navAction}`) ?? []);
          this.pendingNavRefocus = { selector: `.${AIR_DP_CLASS.navAction}`, index: actions.indexOf(target) };
        }
        target.click();
        this.scheduleCalendarA11yAugment();
      }
    };
    /** Layer ARIA APG semantics onto air-datepicker's freshly-rendered DOM. */
    this.augmentCalendarA11y = () => {
      const portal = this.portalRef;
      if (!portal)
        return;
      // Navigation chevrons (prev = first, next = last) + title.
      const navActions = Array.from(portal.querySelectorAll(`.${AIR_DP_CLASS.navAction}`));
      navActions.forEach(action => {
        const disabled = action.classList.contains(AIR_DP_STATE.disabled);
        action.setAttribute('role', 'button');
        action.setAttribute('tabindex', disabled ? '-1' : '0');
        action.setAttribute('aria-disabled', disabled ? 'true' : 'false');
        // Labelled from air-datepicker's own `data-action` rather than the loop index: a double
        // calendar renders four of these, so indexing called everything after the first "next month".
        action.setAttribute('aria-label', action.getAttribute('data-action') === 'prev'
          ? this._locales.previousMonthLabel
          : this._locales.nextMonthLabel);
      });
      // querySelectorAll, not querySelector: a double calendar has one title per month, and taking
      // only the first left the second month's title with no role and out of the tab order.
      const titles = Array.from(portal.querySelectorAll(`.${AIR_DP_CLASS.navTitle}`));
      titles.forEach(title => {
        const disabled = title.classList.contains(AIR_DP_STATE.disabled);
        title.setAttribute('role', 'button');
        title.setAttribute('tabindex', disabled ? '-1' : '0');
        title.setAttribute('aria-disabled', disabled ? 'true' : 'false');
      });
      // Footer Clear / Apply buttons: reflect their disabled class into the tab order + a11y.
      Array.from(portal.querySelectorAll(`.${AIR_DP_CLASS.button}`)).forEach(el => {
        const button = el;
        const disabled = button.classList.contains('disabled');
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', disabled ? '-1' : '0');
        button.setAttribute('aria-disabled', disabled ? 'true' : 'false');
      });
      this.augmentGrid(titles[0]?.textContent?.trim());
      // Focus a pending cell after a cross-view navigation triggered by arrow keys, or by
      // activating a month/year cell. Only while the calendar is actually on screen: committing a
      // date closes the popup, and focus belongs on the field then, not in a hidden grid.
      if (this.pendingGridFocusDate && this.isCalendarVisible()) {
        const target = this.findCellForDate(this.pendingGridFocusDate);
        this.pendingGridFocusDate = undefined;
        if (target && !target.classList.contains(AIR_DP_STATE.disabled)) {
          this.setRovingCell(target);
          target.focus();
        }
      }
      // Put focus back in the grid after a selection replaced the focused cell's node. Consume the
      // record either way, and only step in when focus actually fell out of the popup.
      const gridFocus = this.gridFocusBeforeSelect;
      this.gridFocusBeforeSelect = undefined;
      // The calendar has to actually be on screen: committing a single date closes the popup and
      // hands focus back to the field, and without this the deferred augmentation would drag focus
      // into a hidden grid. A static datepicker has no popup at all, so tippy never sets
      // isCalendarOpen and the restore was being skipped there entirely.
      if (gridFocus && this.isCalendarVisible() && !portal.contains(this.deepActiveElement())) {
        const bodies = this.getActiveBodies();
        const body = bodies[gridFocus.bodyIndex] ?? bodies[0];
        const cells = body ? Array.from(body.querySelectorAll(`.${AIR_DP_CLASS.cell}`)) : [];
        const target = cells.find(cell => this.cellKey(cell) === gridFocus.key) ?? this.getRovingCell();
        if (target) {
          this.setRovingCell(target);
          target.focus();
        }
      }
      // Restore focus to a keyboard-activated nav control whose node the re-render replaced.
      if (this.pendingNavRefocus) {
        const { selector, index } = this.pendingNavRefocus;
        const control = portal.querySelectorAll(selector)[Math.max(index, 0)];
        this.pendingNavRefocus = undefined;
        // Only intervene when focus was actually lost out of the popup (node replaced).
        if (control && !portal.contains(this.deepActiveElement())) {
          control.focus();
        }
      }
    };
    this.augmentGrid = (gridLabel) => {
      // Each rendered month is its own grid. In double mode that means two, and each is named
      // from its own nav title so a screen reader can tell July from August.
      this.getActiveBodies().forEach(body => this.augmentSingleGrid(body, gridLabel));
    };
    this.augmentSingleGrid = (body, fallbackLabel) => {
      const ownTitle = body
        .closest(`.${AIR_DP_CLASS.root}`)
        ?.querySelector(`.${AIR_DP_CLASS.navTitle}`)
        ?.textContent?.trim();
      const gridLabel = ownTitle || fallbackLabel;
      body.setAttribute('role', 'grid');
      if (gridLabel)
        body.setAttribute('aria-label', gridLabel);
      // Weekday header row (days view only).
      const dayNames = body.querySelector(`.${AIR_DP_CLASS.dayNames}`);
      if (dayNames) {
        dayNames.setAttribute('role', 'row');
        Array.from(dayNames.querySelectorAll(`.${AIR_DP_CLASS.dayName}`)).forEach(el => el.setAttribute('role', 'columnheader'));
      }
      const cellsContainer = body.querySelector(`.${AIR_DP_CLASS.cells}`);
      if (!cellsContainer)
        return;
      this.wrapCellsIntoRows(cellsContainer);
      // Decorate every cell + set the single roving tab stop.
      const cells = this.getCells();
      const rovingTarget = this.getRovingCell();
      cells.forEach(cell => {
        cell.setAttribute('role', 'gridcell');
        cell.setAttribute('aria-label', this.cellAccessibleName(cell));
        if (cell.classList.contains(AIR_DP_STATE.selected))
          cell.setAttribute('aria-selected', 'true');
        else
          cell.removeAttribute('aria-selected');
        if (cell.classList.contains(AIR_DP_STATE.current))
          cell.setAttribute('aria-current', 'date');
        else
          cell.removeAttribute('aria-current');
        if (cell.classList.contains(AIR_DP_STATE.disabled))
          cell.setAttribute('aria-disabled', 'true');
        else
          cell.removeAttribute('aria-disabled');
        cell.setAttribute('tabindex', cell === rovingTarget ? '0' : '-1');
      });
    };
    /**
     * Group the flat cell list into `role="row"` wrappers so the grid has the
     * grid > rowgroup > row > gridcell structure ARIA requires. `display: contents`
     * keeps air-datepicker's CSS grid layout intact (the cells still lay out as
     * direct grid items). Re-runs each render; skips if already wrapped.
     */
    this.wrapCellsIntoRows = (cellsContainer) => {
      const directCells = Array.from(cellsContainer.children).filter(el => el.classList.contains(AIR_DP_CLASS.cell));
      if (directCells.length === 0)
        return; // already wrapped for this render
      cellsContainer.setAttribute('role', 'rowgroup');
      const columns = this.getGridColumns();
      for (let i = 0; i < directCells.length; i += columns) {
        const row = document.createElement('div');
        row.setAttribute('role', 'row');
        row.style.display = 'contents';
        directCells.slice(i, i + columns).forEach(cell => row.appendChild(cell));
        cellsContainer.appendChild(row);
      }
    };
    this.handleTriggerClick = (event) => {
      if (this.disabled)
        return;
      // Prevent the click from bubbling to tippy's click handler
      event.stopPropagation();
      if (this.tippyInstance) {
        if (this.tippyInstance.state.isShown) {
          this.tippyInstance.hide();
        }
        else {
          this.tippyInstance.show();
        }
      }
    };
    this.hostCssClasses = () => ({
      'wpp-datepicker': true,
      'wpp-disabled': this.disabled,
      [`wpp-size-${this.size}`]: true,
      'wpp-has-value': this.isValueExists,
      'wpp-active': this.isVisuallyActive,
      'wpp-button-trigger': this.hasTriggerSlot,
    });
    this.inputCssClasses = () => ({
      'datepicker-input': true,
      [`${this.messageType}`]: !!this.messageType,
      [`${this.internalMessageType}`]: !this.messageType && !!this.internalMessageType,
      [`size-${this.size}`]: true,
      [this.focusType]: !!this.focusType,
    });
    this.iconCrossCssClasses = () => ({
      'cross-icon': true,
      disabled: this.disabled,
      [`size-${this.size}`]: true,
    });
    this.iconCalendarCssClasses = () => ({
      'calendar-icon': true,
      [`size-${this.size}`]: true,
    });
    this.containerClasses = () => ({
      'datepicker-wrapper': true,
      disabled: this.disabled,
      'has-value': this.isValueExists,
      'single-datepicker': !this.range,
      'range-datepicker': this.range,
      'has-default-format': this.isDefaultDateFormat(),
      'static-datepicker': this.static,
      'with-presets': this.hasPresets(),
      'button-trigger': this.hasTriggerSlot,
    });
    this.portalClasses = () => ({
      'wpp-datepicker-portal': true,
      'wpp-static-portal': this.static,
      'wpp-with-presets': this.hasPresets(),
      'wpp-reverse-layout': this.reverseLayout,
      'wpp-double-calendar': this.isDoubleCalendar(),
    });
    this.renderPresets = () => (h("div", { class: "wpp-presets-container" }, h("div", { class: "wpp-presets-list" }, this.presets.map((preset, index) => (h("wpp-list-item-v4-4-0", { onMouseEnter: () => this.handlePreviewPreset(preset.value), onMouseLeave: this.handleMouseLeavePreset, onFocus: () => this.handlePreviewPreset(preset.value), onWppChangeListItem: () => this.handleClickPreset(preset), class: "wpp-presets-item", tabIndex: index === this.presetRovingIndex ? 0 : -1 }, h("wpp-typography-v4-4-0", { type: "s-body", slot: "label" }, preset.label))))), !this.isDoubleCalendar() && h("div", { class: "wpp-presets-footer" })));
    /**
     * Double mode owns its actions row so it can span the full popup width beneath both
     * calendars, instead of air-datepicker's per-instance buttons under the left one. Reuses
     * air-datepicker's button classes so both layouts stay visually identical, but right-aligns
     * them per the Figma rather than space-between.
     *
     * Enabled/disabled mirrors `updateDatepickerClearButton`, declaratively off `lastValidDate`.
     */
    this.renderActions = () => {
      const canClear = !!this.lastValidDate;
      const canApply = Array.isArray(this.lastValidDate) && this.lastValidDate.length === 2;
      return (h("div", { class: "wpp-datepicker-actions", part: "datepicker-actions" }, h("button", { type: "button", class: { 'air-datepicker-button': true, 'button-clear': true, disabled: !canClear }, onClick: this.handleClear, part: "datepicker-action-clear" }, h("span", null, this._locales.clear)), h("button", { type: "button", class: { 'air-datepicker-button': true, 'button-apply': true, disabled: !canApply }, onClick: this.handleApply, part: "datepicker-action-apply" }, h("span", null, this._locales.apply))));
    };
    this.datePickerInstance = undefined;
    this.lastValidDate = undefined;
    this.lastAppliedDate = [];
    this.focusType = undefined;
    this.hidden = true;
    this.tippyInstance = undefined;
    this.isInComponent = false;
    this.isVisuallyActive = false;
    this.isValueExists = false;
    this.hasTriggerSlot = false;
    this.internalMessage = '';
    this.internalMessageType = undefined;
    this.isCalendarOpen = false;
    this.presetRovingIndex = 0;
    this.range = false;
    this.toggleSelected = true;
    this.value = undefined;
    this.autoFocus = false;
    this.static = false;
    this.minDate = undefined;
    this.maxDate = undefined;
    this.placeholder = undefined;
    this.view = 'days';
    this.monthRangeNormalization = { enabled: true };
    this.yearRangeNormalization = { enabled: true };
    this.message = undefined;
    this.messageType = undefined;
    this.tooltipConfig = {};
    this.maxMessageLength = undefined;
    this.required = false;
    this.disabled = false;
    this.name = undefined;
    this.size = 'm';
    this.width = undefined;
    this.presets = [];
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.locales = {};
    this.labelConfig = undefined;
    this.appendToListWrapper = false;
    this.dropdownConfig = {};
    this.reverseLayout = false;
    this.withDoubleCalendar = false;
  }
  /**
   * Method that returns a datepicker instance which allows manipulating all props and changing them as necessary. [Read more](https://air-datepicker.com/docs).
   */
  async getInstance() {
    return this.datePickerInstance;
  }
  /**
   * Method that sets focus on the input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  async updateDatepickerClearButton(newValidDate) {
    const clearButton = this.portalRef?.querySelector(`.${AIR_DP_CLASS.buttonsContainer} .button-clear`);
    const applyButton = this.portalRef?.querySelector(`.${AIR_DP_CLASS.buttonsContainer} .button-apply`);
    if (newValidDate) {
      clearButton?.classList?.remove('disabled');
    }
    else {
      clearButton?.classList?.add('disabled');
    }
    // Apply commits a range, so it stays disabled until both ends are set. This has to match the
    // `canApply` gate in render(): the two used to disagree (>= 1 here, === 2 there), and whichever
    // ran last won, which is how Apply came to be live on a single date.
    if (Array.isArray(newValidDate) && newValidDate.length === 2) {
      applyButton?.classList?.remove('disabled');
    }
    else {
      applyButton?.classList?.add('disabled');
    }
  }
  updateValue() {
    if (this.value === '' || isEqual(this.value, [])) {
      this.clearDatePicker();
      this.isValueExists = false;
      return;
    }
    if (!this.value || !this.datePickerInstance)
      return;
    if (this.range) {
      this.setInitialDate();
    }
    else {
      if (!this.isStringDateValid(this.value))
        return;
      const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
      const formattedDate = formatDate(this.value);
      const currentDatePickerValue = this.datePickerInstance.selectedDates[0];
      if (isValidDate(formattedDate) && !isEqual(formattedDate, currentDatePickerValue)) {
        this.setInitialDate();
      }
      this.isValueExists = Boolean((this.value ?? '').trim());
    }
  }
  onUpdateWidth() {
    if (this.width) {
      this.host.style.setProperty('--wpp-datepicker-container-width', this.width);
    }
  }
  updateRange() {
    this.recreateDatePicker();
  }
  updateView() {
    this.recreateDatePicker();
  }
  updateDoubleCalendar() {
    this.recreateDatePicker();
  }
  updateMinDate() {
    this.setMinMaxDate();
  }
  updateMaxDate() {
    this.setMinMaxDate();
  }
  updateDropdownConfig(newConfig, oldConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  updateIsInComponent(value) {
    // The popup closing, not a blur — keep whatever focus ring the field is wearing.
    if (!value)
      this.onBlur({ keepFocusRing: true });
  }
  onUpdateLocales() {
    const firstDay = this.determineFirstDay();
    this.datePickerInstance?.update({
      locale: { ...defaultLocale, ...this._locales, firstDay },
    });
  }
  componentWillLoad() {
    this.updateSlotData();
    if (this.width) {
      this.host.style.setProperty('--wpp-datepicker-container-width', this.width);
    }
  }
  componentDidLoad() {
    this.themeSubscription.start();
    this.createDateInstance();
    this.setInitialDate();
    this.setMinMaxDate();
    this.moveCalendarsIntoPortal();
    if (!this.static) {
      this.createTippyInstance();
    }
    // Same reason as returnFocusToTrigger: autoFocusElement focuses in code, which fires neither
    // mousedown nor a Tab keyup, so the field was left holding focus with nothing drawn on it —
    // an autofocused control has to show where focus is.
    if (this.autoFocus)
      this.focusType = FOCUS_TYPE.TAB;
    autoFocusElement(this.autoFocus, this.inputRef);
    // `autoFocus` opens the calendar alongside focusing the field. Focus stays in the input so the
    // date can still be typed; the popup is just already on screen. Ordinary focus (click, Tab)
    // does not do this — see handleFocus.
    // Queued rather than called straight out: autoFocusElement defers its own focus() by a
    // macrotask, so opening synchronously here would fire onShow before the field is focused.
    if (this.autoFocus && !this.static) {
      this.autoFocusOpenTimer = setTimeout(() => {
        if (!this.isDestroyed)
          this.tippyInstance?.show();
      });
    }
  }
  /**
   * `withDoubleCalendar` arriving as a property after first render (which is what framework
   * wrappers do) fires the @Watch before Stencil has rendered the calendars row, so the
   * re-parent inside recreateDatePicker has nowhere to put them. Re-asserting it here — after
   * every render — is what keeps the two calendars inside the flex row instead of stacking
   * loose in the portal. It no-ops when they are already in place.
   */
  componentDidRender() {
    if (!this.isDatePickerInitialized)
      return;
    this.moveCalendarsIntoPortal();
    this.applyDoubleCalendarA11y();
  }
  connectedCallback() {
    this.themeSubscription.start();
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.isDestroyed = true;
    clearTimeout(this.a11yAugmentTimer);
    clearTimeout(this.hideTimer);
    clearTimeout(this.previewPresetTimer);
    clearTimeout(this.openGridFocusTimer);
    clearTimeout(this.autoFocusOpenTimer);
    clearTimeout(this.commitFocusTimer);
    this.tippyInstance?.destroy();
    this.mirrorDatePickerInstance?.destroy();
    this.mirrorDatePickerInstance = undefined;
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  /**
   * Determines the first day of the week based on `dateLocale`, `firstDay`, or falls back to default.
   * @returns {0 | 1 | 2 | 3 | 4 | 5 | 6} The first day of the week (0 = Sunday, 1 = Monday, etc.)
   */
  determineFirstDay() {
    if (this._locales.dateLocale) {
      const mappedFirstDay = localeToFirstDayMap[this._locales.dateLocale];
      if (mappedFirstDay !== undefined) {
        return mappedFirstDay;
      }
      else {
        console.warn(`Unknown dateLocale: "${this._locales.dateLocale}". Defaulting to firstDay: Monday (1). ` +
          `Ensure the dateLocale is correctly mapped in localeToFirstDayMap.`);
      }
    }
    return this._locales.firstDay ?? 1; // Default to Monday (ISO 8601) if no valid value is found
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, datepicker-container, icon-calendar, datepicker-input, icon-cross, message, trigger-wrapper" }, this.labelConfig?.text && !this.hasTriggerSlot && (h("wpp-label-v4-4-0", { class: "label", htmlFor: "datepicker", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.containerClasses(), id: "container", part: "datepicker-container" }, this.hasTriggerSlot
      ? [
        h("input", { type: "hidden", ref: el => (this.hiddenInputRef = el), "aria-hidden": "true" }),
        h("div", { class: "trigger-wrapper", ref: el => (this.triggerWrapperRef = el), onClick: (e) => this.handleTriggerClick(e), role: "presentation", part: "trigger-wrapper" }, h("slot", { name: "trigger", onSlotchange: () => this.updateSlotData() })),
      ]
      : [
        h("input", { id: "datepicker", type: "text", class: this.inputCssClasses(), onInput: this.onInput, onBlur: () => this.onBlur(), onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, disabled: this.disabled, placeholder: this.placeholder ||
            (this.range
              ? `${this._locales.dateFormat}${DATES_SEPARATOR}${this._locales.dateFormat}`
              : `${this._locales.dateFormat}`), ref: inputRef => (this.inputRef = inputRef), autocomplete: "off", part: "datepicker-input", title: "", "aria-label": this.labelConfig?.text || this._locales.calendarLabel, "aria-invalid": (this.message || this.internalMessage) && (this.messageType || this.internalMessageType) === 'error'
            ? 'true'
            : undefined, "aria-describedby": this.message || this.internalMessage ? 'datepicker-message' : undefined }),
        h("wpp-icon-calendar-v4-4-0", { onClick: this.handleClickCalendarIcon, onKeyDown: activateOnEnterOrSpace(this.handleClickCalendarIcon), class: this.iconCalendarCssClasses(), part: "icon-calendar", color: "inherit", role: "button",
          // Pointer-only trigger: QA asked for it out of the tab order. The keyboard route
          // into the calendar is ArrowDown/ArrowUp on the field, which also lands focus in
          // the date grid, so the dialog stays reachable without this being a tab stop.
          tabIndex: -1, "aria-disabled": this.disabled ? 'true' : 'false', "aria-label": this._locales.calendarLabel, "aria-haspopup": "dialog", "aria-expanded": this.isCalendarOpen ? 'true' : 'false' }),
      ], h("div", { id: this.popupId, role: "dialog", "aria-modal": "false", "aria-label": this._locales.calendarLabel, onBlur: this.handleBlurPortal, onFocus: () => clearTimeout(this.hideTimer), onKeyDown: this.handlePortalKeyDown, onPointerDown: () => (this.lastInteractionWasKeyboard = false), ref: ref => (this.portalRef = ref), class: this.portalClasses() }, this.isDoubleCalendar()
      ? [
        // Figma: [rail | calendars] row, then a full-width divider, then actions.
        h("div", { class: "wpp-datepicker-row" }, this.hasPresets() && this.renderPresets(), h("div", { class: "wpp-datepicker-calendars", ref: ref => (this.calendarsRef = ref) })),
        h("div", { class: "wpp-datepicker-divider" }),
        this.renderActions(),
      ]
      : this.hasPresets() && this.renderPresets()), (!!this.lastValidDate || this.inputRef?.value) && !this.hasTriggerSlot && (h("wpp-icon-cross-v4-4-0", { class: this.iconCrossCssClasses(), "aria-label": this._locales.eraseDateLabel, role: "button", "aria-disabled": this.disabled ? 'true' : 'false', tabIndex: this.disabled ? -1 : 0, onClick: this.handleClickIconCross, onKeyDown: activateOnEnterOrSpace(this.handleClickIconCross), onMouseDown: (e) => e.preventDefault(), part: "icon-cross" })), (this.message || this.internalMessage) && (h("div", { id: "datepicker-message", class: "inline-message-live-region", role: (this.message ? this.messageType : this.internalMessageType) === 'error' ? 'alert' : 'status' }, h("span", { class: "sr-only" }, this.message || this.internalMessage), h("wpp-inline-message-v4-4-0", { "aria-hidden": "true", class: "inline-message", message: this.message || this.internalMessage, type: this.message ? this.messageType : this.internalMessageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" }))))));
  }
  static get is() { return "wpp-datepicker"; }
  static get registryIs() { return "wpp-datepicker-v4-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-datepicker.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-datepicker.css"]
    };
  }
  static get properties() {
    return {
      "range": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the range mode is enabled."
        },
        "attribute": "range",
        "reflect": false,
        "defaultValue": "false"
      },
      "toggleSelected": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, any selected date can be unselected by clicking on it again."
        },
        "attribute": "toggle-selected",
        "reflect": false,
        "defaultValue": "true"
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the input value."
        },
        "attribute": "value",
        "reflect": false
      },
      "autoFocus": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the input is focused on page load and the calendar opens with it. Focus stays in\nthe input, so a date can still be typed. Has no effect on a `static` datepicker, whose\ncalendar is always visible."
        },
        "attribute": "auto-focus",
        "reflect": false,
        "defaultValue": "false"
      },
      "static": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the datepicker is always visible."
        },
        "attribute": "static",
        "reflect": false,
        "defaultValue": "false"
      },
      "minDate": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the minimal datepicker date."
        },
        "attribute": "min-date",
        "reflect": false
      },
      "maxDate": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the maximal datepicker date."
        },
        "attribute": "max-date",
        "reflect": false
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the input placeholder."
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "view": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DatePickerView",
          "resolved": "\"days\" | \"months\" | \"years\"",
          "references": {
            "DatePickerView": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::DatePickerView"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines datepicker view"
        },
        "attribute": "view",
        "reflect": false,
        "defaultValue": "'days'"
      },
      "monthRangeNormalization": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MonthRangeNormalization",
          "resolved": "MonthRangeNormalization | undefined",
          "references": {
            "MonthRangeNormalization": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::MonthRangeNormalization"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "example",
              "text": "// Enable normalization with defaults (1st and last day)\nmonthRangeNormalization={{ enabled: true }}"
            }, {
              "name": "example",
              "text": "// Custom days: start on 15th, end on 20th\nmonthRangeNormalization={{ enabled: true, startDay: 15, endDay: 20 }}"
            }],
          "text": "Configuration for normalizing month range dates. When using `view=\"months\"` with `range`,\nthis option allows automatic normalization of selected dates to specific days.\nBy default, normalizes start date to the 1st day and end date to the last day of their respective months."
        },
        "defaultValue": "{ enabled: true }"
      },
      "yearRangeNormalization": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "YearRangeNormalization",
          "resolved": "YearRangeNormalization | undefined",
          "references": {
            "YearRangeNormalization": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::YearRangeNormalization"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "example",
              "text": "// Enable normalization with defaults (Jan 1st and Dec 31st)\nyearRangeNormalization={{ enabled: true }}"
            }, {
              "name": "example",
              "text": "// Custom: start on Apr 1st, end on Mar 31st (fiscal year)\nyearRangeNormalization={{ enabled: true, startMonth: 4, startDay: 1, endMonth: 3, endDay: 31 }}"
            }],
          "text": "Configuration for normalizing year range dates. When using `view=\"years\"` with `range`,\nthis option allows automatic normalization of selected dates to specific month/day boundaries.\nBy default, normalizes start date to January 1st and end date to December 31st of their respective years."
        },
        "defaultValue": "{ enabled: true }"
      },
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates datepicker message"
        },
        "attribute": "message",
        "reflect": false
      },
      "messageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputMessageTypes",
          "resolved": "\"error\" | \"warning\" | undefined",
          "references": {
            "InputMessageTypes": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::InputMessageTypes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates datepicker message type"
        },
        "attribute": "message-type",
        "reflect": false
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the tooltip configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "maxMessageLength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates datepicker input message maximum length"
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "required": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the datepicker input is required"
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the datepicker input is disabled"
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates datepicker name"
        },
        "attribute": "name",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the datepicker size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "width": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the width of the datepicker. If it is undefined, the datepicker will take the default value (200px single datepicker, 260px range datepicker)."
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "undefined"
      },
      "presets": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IPreset[]",
          "resolved": "IPreset[]",
          "references": {
            "IPreset": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::IPreset"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "An array of preset date ranges that the user can quickly select from the datepicker. This\nprop is available only for the range-datepicker. The format of the dates within each preset item\nshould match the dateFormat provided to the component."
        },
        "defaultValue": "[]"
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Dropdown config for label, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<LocaleTypes>",
          "resolved": "{ dateFormat?: string | undefined; apply?: string | undefined; clear?: string | undefined; invalidDateMessage?: string | undefined; eraseDateLabel?: string | undefined; calendarLabel?: string | undefined; previousMonthLabel?: string | undefined; nextMonthLabel?: string | undefined; dateLocale?: \"en-US\" | \"en-GB\" | \"fr-FR\" | \"ar-SA\" | \"de-DE\" | \"es-ES\" | \"it-IT\" | \"ja-JP\" | \"ko-KR\" | \"nl-NL\" | \"pt-BR\" | \"ru-RU\" | \"tr-TR\" | \"zh-CN\" | \"zh-TW\" | undefined; days?: string[] | undefined; daysShort?: string[] | undefined; daysMin?: string[] | undefined; months?: string[] | undefined; monthsShort?: string[] | undefined; today?: string | undefined; timeFormat?: string | undefined; firstDay?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "LocaleTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::LocaleTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "remarks",
              "text": "- `firstDay` determines the starting day of the week and acts as a fallback if `dateLocale` is not provided.\n- `dateLocale` is used to automatically infer date-related properties, like `firstDay`."
            }],
          "text": "Defines the datepicker locale, uses English by default."
        },
        "defaultValue": "{}"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DatepickerLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "DatepickerLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::DatepickerLabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config"
        }
      },
      "appendToListWrapper": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If `true`, the wpp-datepicker-portal containing the datepicker will be appended to the `#container`\nBy default it is false, meaning that the wpp-datepicker-portal will be appended to the document.body\nin order to avoid clipping issues by the parent"
        },
        "attribute": "append-to-list-wrapper",
        "reflect": false,
        "defaultValue": "false"
      },
      "dropdownConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "reverseLayout": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Reverse layout for the range datepicker with a preset list"
        },
        "attribute": "reverse-layout",
        "reflect": false,
        "defaultValue": "false"
      },
      "withDoubleCalendar": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the range datepicker shows two consecutive months side by side, so a range\nspanning a month boundary can be picked without navigating. Only applies when `range`\nis `true`; ignored otherwise. Works with `presets`."
        },
        "attribute": "with-double-calendar",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "datePickerInstance": {},
      "lastValidDate": {},
      "lastAppliedDate": {},
      "focusType": {},
      "hidden": {},
      "tippyInstance": {},
      "isInComponent": {},
      "isVisuallyActive": {},
      "isValueExists": {},
      "hasTriggerSlot": {},
      "internalMessage": {},
      "internalMessageType": {},
      "isCalendarOpen": {},
      "presetRovingIndex": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a date is chosen."
        },
        "complexType": {
          "original": "DatePickerEventDetail",
          "resolved": "DatePickerEventDetail",
          "references": {
            "DatePickerEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::DatePickerEventDetail"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input loses focus"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input receives focus"
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppDateClear",
        "name": "wppDateClear",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a date is cleared."
        },
        "complexType": {
          "original": "DatePickerClearEventDetail",
          "resolved": "DatePickerClearEventDetail",
          "references": {
            "DatePickerClearEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::DatePickerClearEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "getInstance": {
        "complexType": {
          "signature": "() => Promise<AirDatepickerTypes>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "AirDatepickerTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-datepicker/types.ts::AirDatepickerTypes"
            }
          },
          "return": "Promise<AirDatepickerTypes>"
        },
        "docs": {
          "text": "Method that returns a datepicker instance which allows manipulating all props and changing them as necessary. [Read more](https://air-datepicker.com/docs).",
          "tags": []
        }
      },
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that sets focus on the input.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "lastValidDate",
        "methodName": "updateDatepickerClearButton"
      }, {
        "propName": "value",
        "methodName": "updateValue"
      }, {
        "propName": "width",
        "methodName": "onUpdateWidth"
      }, {
        "propName": "range",
        "methodName": "updateRange"
      }, {
        "propName": "view",
        "methodName": "updateView"
      }, {
        "propName": "withDoubleCalendar",
        "methodName": "updateDoubleCalendar"
      }, {
        "propName": "minDate",
        "methodName": "updateMinDate"
      }, {
        "propName": "maxDate",
        "methodName": "updateMaxDate"
      }, {
        "propName": "dropdownConfig",
        "methodName": "updateDropdownConfig"
      }, {
        "propName": "isInComponent",
        "methodName": "updateIsInComponent"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
