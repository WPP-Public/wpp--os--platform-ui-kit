import { h, Host } from '@stencil/core';
import { parse, isValid, format } from 'date-fns';
import AirDatepicker from 'air-datepicker';
import defaultLocale from 'air-datepicker/locale/en';
import isEqual from 'lodash/isEqual';
import { FOCUS_TYPE } from '../../types/common';
import { autoFocusElement, getHighestContainerInDOM, getSlotEmptyStates, transformToVersionedTag, } from '../../utils/utils';
import { getCurrentFormatDate, getFormattedDateString, getNextCursorPosition, isValidDate, localeToFirstDayMap, normalizeMonthRangeDates, } from './utils';
import { ANIMATION_DURATION, DATE_FORMAT_SEPARATOR_PATTERN, DATES_SEPARATOR, LOCALES_DEFAULTS } from './const';
import { Z_INDEX } from '../../common/consts';
import { menuListConfig } from '../../common/menuListConfig';
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
    this.hasClickedPreset = false;
    this.isDatePickerInitialized = false;
    this.isNormalizingMonthRange = false;
    this.isDestroyed = false;
    this._locales = LOCALES_DEFAULTS;
    this.justSelectedFromCalendar = false;
    this.isManuallyTyping = false;
    this.isStringDateValid = (stringDateValue) => {
      const parsedDate = parse(stringDateValue, this._locales.dateFormat, new Date());
      return isValid(parsedDate) && format(parsedDate, this._locales.dateFormat) === stringDateValue;
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
        this.datePickerInstance.update({
          maxDate: formatDate(this.maxDate),
        });
      }
      if (this.minDate) {
        this.datePickerInstance.update({
          minDate: formatDate(this.minDate),
        });
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
    this.hasPresets = () => this.range && this.presets.length > 0;
    /**
     * Checks if month range normalization should be applied.
     * Normalization is only applied when range mode is enabled, view is 'months', and normalization is enabled.
     */
    this.shouldNormalizeMonthRange = () => this.range && this.view === 'months' && this.monthRangeNormalization?.enabled === true;
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
    this.createDateInstance = () => {
      const datepickerInputRef = this.hasTriggerSlot ? this.hiddenInputRef : this.inputRef;
      if (!datepickerInputRef || this.isDatePickerInitialized)
        return;
      const buttonApply = {
        content: 'Apply',
        className: 'disabled button-apply',
        attrs: {
          tabindex: '-1',
        },
        onClick: () => {
          const formattedDates = this.datePickerInstance.selectedDates.map(selectedDate => this.datePickerInstance.formatDate(selectedDate, this.getDateFormat()));
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
        },
      };
      const buttonCancel = {
        content: 'Clear',
        className: 'disabled button-clear',
        attrs: {
          tabindex: '-1',
        },
        onClick: () => {
          this.clearDatePicker();
        },
      };
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
          // Intercept 2nd month click to normalize dates before selection
          if (this.isNormalizingMonthRange ||
            !this.shouldNormalizeMonthRange() ||
            datepicker.selectedDates.length !== 1) {
            return true;
          }
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
        },
        onSelect: ({ date, formattedDate }) => {
          // Guard against async callback after component destruction (air-datepicker uses setTimeout)
          if (this.isDestroyed)
            return;
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
            this.tippyInstance?.hide();
            return;
          }
          if (formattedDate?.length) {
            const [startDate, endDate] = formattedDate;
            if (startDate && endDate) {
              this.isValueExists = true;
              this.datePickerInstance.setViewDate(formatDate(endDate));
            }
            else {
              this.isValueExists = true;
              this.datePickerInstance.setViewDate(formatDate(startDate));
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
        ...(this.range ? buttonsConfig : {}),
      });
      this.datePickerInstance['$datepicker'].setAttribute('part', 'datepicker');
      this.isDatePickerInitialized = true;
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
        showOnCreate: this.autoFocus && !this.hasTriggerSlot,
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
        onShown: (instance) => {
          this.updateDatepickerClearButton(this.lastValidDate);
          if (this.dropdownConfig.onShown) {
            this.dropdownConfig.onShown(instance);
          }
        },
        onHidden: (instance) => {
          this.isInComponent = false;
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
    this.onBlur = () => {
      if (this.isInComponent)
        return;
      this.focusType = FOCUS_TYPE.NONE;
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
      this.clearInternalValidation();
      this.justSelectedFromCalendar = false;
      this.wppFocus.emit(event);
      if (this.tippyInstance && !this.tippyInstance.state.isShown) {
        this.tippyInstance.show();
      }
    };
    this.onMouseDown = () => {
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
    this.onKeyDown = (event) => {
      // For non-default date formats (e.g. 'MMMM yyyy'), keep input read-only
      if (!this.isDefaultDateFormat()) {
        if (!event.metaKey && !event.ctrlKey && event.key !== 'Tab' && event.key !== 'Escape') {
          event.preventDefault();
        }
        return;
      }
      const separator = this.getDateFormatSeparator(this.getDateFormat());
      const allowedKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
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
      }
    };
    this.handleClickCalendarIcon = () => {
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
      'wpp-active': this.isInComponent,
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
    });
    this.datePickerInstance = undefined;
    this.lastValidDate = undefined;
    this.lastAppliedDate = [];
    this.focusType = undefined;
    this.hidden = true;
    this.tippyInstance = undefined;
    this.isInComponent = false;
    this.isValueExists = false;
    this.hasTriggerSlot = false;
    this.internalMessage = '';
    this.internalMessageType = undefined;
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
    this.locale = {};
    this.locales = {};
    this.labelConfig = undefined;
    this.appendToListWrapper = false;
    this.dropdownConfig = {};
    this.reverseLayout = false;
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
    const clearButton = this.portalRef?.querySelector('.air-datepicker--buttons .button-clear');
    const applyButton = this.portalRef?.querySelector('.air-datepicker--buttons .button-apply');
    if (newValidDate) {
      clearButton?.classList?.remove('disabled');
    }
    else {
      clearButton?.classList?.add('disabled');
    }
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
    this.clearDatePicker();
    this.datePickerInstance.destroy();
    this.createDateInstance();
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
    if (!value)
      this.onBlur();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
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
    this._locales = { ...this._locales, ...this.locale, ...this.locales };
    this.createDateInstance();
    this.setInitialDate();
    this.setMinMaxDate();
    const datepickerEl = this.host.shadowRoot?.querySelector('[part="datepicker"]');
    if (datepickerEl) {
      this.portalRef?.appendChild(datepickerEl);
    }
    if (!this.static) {
      this.createTippyInstance();
    }
    autoFocusElement(this.autoFocus, this.inputRef);
  }
  disconnectedCallback() {
    this.isDestroyed = true;
    this.tippyInstance?.destroy();
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, datepicker-container, icon-calendar, datepicker-input, icon-cross, message, trigger-wrapper" }, this.labelConfig?.text && !this.hasTriggerSlot && (h("wpp-label-v3-6-0", { class: "label", htmlFor: this.name, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.containerClasses(), id: "container", part: "datepicker-container" }, this.hasTriggerSlot
      ? [
        h("input", { type: "hidden", ref: el => (this.hiddenInputRef = el), "aria-hidden": "true" }),
        h("div", { class: "trigger-wrapper", ref: el => (this.triggerWrapperRef = el), onClick: (e) => this.handleTriggerClick(e), role: "presentation", part: "trigger-wrapper" }, h("slot", { name: "trigger", onSlotchange: () => this.updateSlotData() })),
      ]
      : [
        h("input", { id: "datepicker", type: "text", class: this.inputCssClasses(), onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, disabled: this.disabled, placeholder: this.placeholder ||
            (this.range
              ? `${this._locales.dateFormat}${DATES_SEPARATOR}${this._locales.dateFormat}`
              : `${this._locales.dateFormat}`), ref: inputRef => (this.inputRef = inputRef), autocomplete: "off", part: "datepicker-input", title: "", "aria-invalid": !!((this.message || this.internalMessage) &&
            (this.messageType || this.internalMessageType) === 'error'), "aria-describedby": this.message || this.internalMessage ? 'datepicker-message' : undefined }),
        h("wpp-icon-calendar-v3-6-0", { onClick: this.handleClickCalendarIcon, class: this.iconCalendarCssClasses(), part: "icon-calendar", color: "inherit" }),
      ], h("div", { onBlur: this.handleBlurPortal, onFocus: () => clearTimeout(this.hideTimer), ...(this.hasPresets() ? { tabIndex: 0 } : {}), ref: ref => (this.portalRef = ref), class: this.portalClasses() }, this.hasPresets() && (h("div", { class: "wpp-presets-container" }, h("div", { class: "wpp-presets-list" }, this.presets.map((preset) => (h("wpp-list-item-v3-6-0", { onMouseEnter: () => this.handlePreviewPreset(preset.value), onMouseLeave: this.handleMouseLeavePreset, onWppChangeListItem: () => this.handleClickPreset(preset), class: "wpp-presets-item" }, h("wpp-typography-v3-6-0", { type: "s-body", slot: "label" }, preset.label))))), h("div", { class: "wpp-presets-footer" })))), (!!this.lastValidDate || this.inputRef?.value) && !this.hasTriggerSlot && (h("wpp-icon-cross-v3-6-0", { class: this.iconCrossCssClasses(), "aria-label": "Erase date", onClick: this.handleClickIconCross, onMouseDown: (e) => e.preventDefault(), part: "icon-cross" })), (this.message || this.internalMessage) && (h("wpp-inline-message-v3-6-0", { id: "datepicker-message", class: "inline-message", message: this.message || this.internalMessage, type: this.message ? this.messageType : this.internalMessageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" })))));
  }
  static get is() { return "wpp-datepicker"; }
  static get registryIs() { return "wpp-datepicker-v3-6-0"; }
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
          "text": "If `true`, the input should be focused on page load"
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
      "locale": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<LocaleTypes>",
          "resolved": "{ dateFormat?: string | undefined; invalidDateMessage?: string | undefined; dateLocale?: \"en-US\" | \"en-GB\" | \"fr-FR\" | \"ar-SA\" | \"de-DE\" | \"es-ES\" | \"it-IT\" | \"ja-JP\" | \"ko-KR\" | \"nl-NL\" | \"pt-BR\" | \"ru-RU\" | \"tr-TR\" | \"zh-CN\" | \"zh-TW\" | undefined; days?: string[] | undefined; daysShort?: string[] | undefined; daysMin?: string[] | undefined; months?: string[] | undefined; monthsShort?: string[] | undefined; today?: string | undefined; clear?: string | undefined; timeFormat?: string | undefined; firstDay?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | undefined; }",
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
              "name": "deprecated",
              "text": "Use `locales` property instead."
            }, {
              "name": "remarks",
              "text": "- `firstDay` determines the starting day of the week and acts as a fallback if `dateLocale` is not provided.\n- `dateLocale` is used to automatically infer date-related properties, like `firstDay`."
            }],
          "text": "Defines the datepicker locale, uses English by default."
        },
        "defaultValue": "{}"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<LocaleTypes>",
          "resolved": "{ dateFormat?: string | undefined; invalidDateMessage?: string | undefined; dateLocale?: \"en-US\" | \"en-GB\" | \"fr-FR\" | \"ar-SA\" | \"de-DE\" | \"es-ES\" | \"it-IT\" | \"ja-JP\" | \"ko-KR\" | \"nl-NL\" | \"pt-BR\" | \"ru-RU\" | \"tr-TR\" | \"zh-CN\" | \"zh-TW\" | undefined; days?: string[] | undefined; daysShort?: string[] | undefined; daysMin?: string[] | undefined; months?: string[] | undefined; monthsShort?: string[] | undefined; today?: string | undefined; clear?: string | undefined; timeFormat?: string | undefined; firstDay?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | undefined; }",
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
      "isValueExists": {},
      "hasTriggerSlot": {},
      "internalMessage": {},
      "internalMessageType": {}
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
