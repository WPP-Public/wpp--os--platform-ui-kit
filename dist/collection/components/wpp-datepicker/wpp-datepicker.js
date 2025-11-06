import { h, Host } from '@stencil/core';
import { parse, isValid, format } from 'date-fns';
import AirDatepicker from 'air-datepicker';
import defaultLocale from 'air-datepicker/locale/en';
import isEqual from 'lodash/isEqual';
import { FOCUS_TYPE } from '../../types/common';
import { autoFocusElement, getHighestContainerInDOM, transformToVersionedTag } from '../../utils/utils';
import { getCurrentFormatDate, getFormattedDateString, getNextCursorPosition, isValidDate, localeToFirstDayMap, } from './utils';
import { ANIMATION_DURATION, DATE_FORMAT, DATE_FORMAT_SEPARATOR_PATTERN, DATES_SEPARATOR, DAYS, DAYS_MIN, DAYS_SHORT, MONTHS, MONTHS_SHORT, } from './consts';
import { Z_INDEX } from '../../common/consts';
import { menuListConfig } from '../../common/menuListConfig';
/**
 * @part label - Label text element
 * @part datepicker-container - datepicker container element
 * @part icon-calendar - icon calendar element
 * @part datepicker-input - datepicker input element
 * @part icon-cross - icon cross wrapper
 * @part message - message element
 */
export class WppDatepicker {
  constructor() {
    this.hasClickedPreset = false;
    this.isDatePickerInitialized = false;
    this.isStringDateValid = (stringDateValue) => {
      const parsedDate = parse(stringDateValue, this.locale.dateFormat, new Date());
      return isValid(parsedDate) && format(parsedDate, this.locale.dateFormat) === stringDateValue;
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
    this.hasPresets = () => this.range && this.presets.length > 0;
    this.getDatepickerView = () => (this.range ? 'days' : this.view);
    this.getDateFormatSeparator = (dateFormat) => {
      const match = dateFormat.match(DATE_FORMAT_SEPARATOR_PATTERN);
      return match ? match[0] : '/';
    };
    this.isDefaultDateFormatSeparator = (separator) => ['/', '.'].includes(separator);
    this.isDefaultDateFormat = () => {
      const baseFormat = ['dd', 'MM', 'yyyy'].sort();
      const separator = this.getDateFormatSeparator(this.locale.dateFormat);
      if (this.isDefaultDateFormatSeparator(separator)) {
        const separatedDate = this.locale.dateFormat.split(separator).sort();
        return JSON.stringify(baseFormat) === JSON.stringify(separatedDate);
      }
      return false;
    };
    this.getDateFormat = () => {
      if (this.range) {
        return this.isDefaultDateFormat() ? this.locale.dateFormat : DATE_FORMAT.DAY_MONTH_YEAR;
      }
      return this.locale.dateFormat;
    };
    this.createDateInstance = () => {
      if (!this.inputRef || this.isDatePickerInitialized)
        return;
      const buttonApply = {
        content: 'Apply',
        className: 'disabled button-apply',
        attrs: {
          tabindex: '-1',
        },
        onClick: () => {
          this.wppChange.emit({
            date: this.datePickerInstance.selectedDates,
            formattedDate: this.datePickerInstance.selectedDates.map(selectedDate => this.datePickerInstance.formatDate(selectedDate, this.getDateFormat())),
            name: this.name,
          });
          if (this.range && Array.isArray(this.lastValidDate)) {
            this.lastAppliedDate = this.lastValidDate;
          }
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
      this.datePickerInstance = new AirDatepicker(this.inputRef, {
        container: this.portalRef,
        range: this.range,
        toggleSelected: this.toggleSelected
          ? () => !this.range || this.datePickerInstance.selectedDates.length === 2
          : false,
        multipleDatesSeparator: DATES_SEPARATOR,
        autoClose: !this.range,
        inline: true,
        locale: { ...defaultLocale, ...this.locale, firstDay },
        showOtherMonths: false,
        selectOtherMonths: false,
        view: this.getDatepickerView(),
        minView: this.getDatepickerView(),
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
        onRenderCell: ({ date, datepicker }) => {
          if (datepicker.viewDate.getMonth() !== date.getMonth()) {
            return {
              classes: 'outside-current-view',
            };
          }
        },
        onSelect: ({ date, formattedDate }) => {
          const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
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
              this.datePickerInstance.setViewDate(formatDate(formattedDate));
            }
            this.tippyInstance.hide();
            return;
          }
          if (formattedDate?.length) {
            const [startDate] = formattedDate;
            if (formattedDate.length === 2) {
              this.portalRef?.classList.add('wpp-range-selected');
            }
            else {
              this.portalRef?.classList.remove('wpp-range-selected');
            }
            if (!this.hasPresets()) {
              this.datePickerInstance.setViewDate(formatDate(startDate));
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
      if (this.lastAppliedDate.length === 2) {
        if (Array.isArray(this.lastValidDate) && this.lastValidDate.length === 1) {
          this.datePickerInstance.clear();
        }
        const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()));
        this.lastValidDate = this.lastAppliedDate;
        this.value = this.lastAppliedDate.join(DATES_SEPARATOR);
        this.datePickerInstance.selectDate([formatDate(this.lastAppliedDate[0]), formatDate(this.lastAppliedDate[1])]);
      }
      else {
        this.clearDatePicker();
      }
    };
    this.createTippyInstance = () => {
      if (!this.portalRef)
        return;
      const dropdownConfig = this.dropdownConfig;
      const anchor = this.inputRef;
      if (!anchor)
        return;
      this.portalRef.classList.add('portal-datepicker');
      this.tippyInstance = menuListConfig({
        anchor,
        content: this.portalRef,
        maxWidth: 'none',
        zIndex: Z_INDEX.CONTEXT_MENU,
        hideOnClick: false,
        trigger: 'click',
        appendTo: getHighestContainerInDOM(),
        showOnCreate: this.autoFocus,
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
                offset: [0, 8],
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
          if (this.range) {
            this.onHideGetLastAppliedValue();
          }
          if (this.focusType === FOCUS_TYPE.NONE && this.inputRef) {
            this.inputRef?.blur();
          }
          if (this.dropdownConfig.onHidden) {
            this.dropdownConfig.onHidden(instance);
          }
        },
        onClickOutside: (instance, event) => {
          if (event.target === this.host) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          this.tippyInstance.hide();
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
      this.datePickerInstance.clear();
      this.datePickerInstance.update();
      this.wppDateClear.emit({
        clear: true,
      });
    };
    this.onInput = () => {
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.value = event.target.value;
      this.wppBlur.emit(event);
      if (!this.lastValidDate) {
        this.value = this.lastValidDate;
      }
      if (!this.range && !isValidDate(new Date(this.value)) && !Array.isArray(this.lastValidDate)) {
        return (this.value = this.lastValidDate);
      }
      if (Array.isArray(this.lastValidDate)) {
        this.value = this.lastValidDate.join(DATES_SEPARATOR);
      }
    };
    this.onFocus = (event) => {
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
      const inputDates = datesInfo
        .filter(info => info.isAllMatchedPartsLength)
        .map(info => toDateObject(info.formattedDate));
      if (!isEqual(inputDates, this.datePickerInstance.selectedDates)) {
        // @ts-ignore Due to outdated air-datepicker.d.ts
        this.datePickerInstance.clear({ silent: true });
        // @ts-ignore Due to outdated air-datepicker.d.ts
        this.datePickerInstance.selectDate(inputDates).then(() => {
          if (!(isOnlyFirstDateFulfilled || isAllDatesFulfilled)) {
            this.updateInput(inputValue, cursorPosition);
          }
          if (this.range && isOnlyFirstDateFulfilled) {
            this.updateInput(this.inputRef.value + DATES_SEPARATOR, cursorPosition === dateFormat.length ? cursorPosition + DATES_SEPARATOR.length : cursorPosition);
          }
        });
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
      const allowedKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        '/',
        '|',
        ...Array.from({ length: 10 }, (_, i) => i.toString()),
      ];
      if (!allowedKeys.includes(event.key) && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
      }
    };
    this.handleBlurPortal = (event) => {
      if (event.relatedTarget && this.portalRef && this.portalRef.contains(event.relatedTarget))
        return;
      this.hideTimer = setTimeout(() => this.tippyInstance.hide());
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
        this.datePickerInstance.selectDate([formattedStartDate, formattedEndDate]);
        this.datePickerInstance.setViewDate(formattedStartDate);
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
          this.datePickerInstance.setViewDate(new Date());
          this.lastValidDate = '';
        }
      }, 100);
    };
    this.handleClickIconCross = () => {
      this.clearDatePicker();
    };
    this.hostCssClasses = () => ({
      'wpp-datepicker': true,
      'wpp-disabled': this.disabled,
      [`wpp-size-${this.size}`]: true,
    });
    this.inputCssClasses = () => ({
      'datepicker-input': true,
      [`${this.messageType}`]: !!this.messageType,
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
      'single-datepicker': !this.range,
      'range-datepicker': this.range,
      'has-default-format': this.isDefaultDateFormat(),
      'static-datepicker': this.static,
      'with-presets': this.hasPresets(),
    });
    this.portalClasses = () => ({
      'wpp-datepicker-portal': true,
      'wpp-static-portal': this.static,
      'wpp-with-presets': this.hasPresets(),
    });
    this.datePickerInstance = undefined;
    this.lastValidDate = undefined;
    this.lastAppliedDate = [];
    this.focusType = undefined;
    this.hidden = true;
    this.tippyInstance = undefined;
    this.range = false;
    this.toggleSelected = true;
    this.value = undefined;
    this.autoFocus = false;
    this.static = false;
    this.minDate = undefined;
    this.maxDate = undefined;
    this.placeholder = undefined;
    this.view = 'days';
    this.message = undefined;
    this.messageType = undefined;
    this.tooltipConfig = {};
    this.maxMessageLength = undefined;
    this.required = false;
    this.disabled = false;
    this.name = undefined;
    this.size = 'm';
    this.presets = [];
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.locale = {
      days: DAYS,
      daysShort: DAYS_SHORT,
      daysMin: DAYS_MIN,
      months: MONTHS,
      monthsShort: MONTHS_SHORT,
      today: 'Today',
      clear: 'Clear',
      dateFormat: DATE_FORMAT.DAY_MONTH_YEAR,
      timeFormat: 'hh:mm aa',
      dateLocale: undefined,
      firstDay: undefined,
    };
    this.labelConfig = undefined;
    this.appendToListWrapper = false;
    this.dropdownConfig = {};
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
  componentWillLoad() {
    if (!this.isDefaultDateFormat()) {
      if (this.range) {
        console.warn(`Warning: When using the range datepicker, only default date formats can be applied. For example, ` +
          `MM/dd/yyyy, dd/MM/yyyy, and other variations using only MM, dd, yyyy with '/' or '.' separators. ` +
          `Default format ${DATE_FORMAT.DAY_MONTH_YEAR} will be used instead.`);
      }
      else {
        console.warn(`Warning: When using the datepicker with a different format than the default one, the input becomes read-only. Our default formats are: MM/dd/yyyy, dd/MM/yyyy, and other variations using only MM, dd, yyyy with '/' or '.' separators.`);
      }
    }
  }
  componentDidLoad() {
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
    this.tippyInstance?.destroy();
  }
  /**
   * Determines the first day of the week based on `dateLocale`, `firstDay`, or falls back to default.
   * @returns {0 | 1 | 2 | 3 | 4 | 5 | 6} The first day of the week (0 = Sunday, 1 = Monday, etc.)
   */
  determineFirstDay() {
    if (this.locale.dateLocale) {
      const mappedFirstDay = localeToFirstDayMap[this.locale.dateLocale];
      if (mappedFirstDay !== undefined) {
        return mappedFirstDay;
      }
      else {
        console.warn(`Unknown dateLocale: "${this.locale.dateLocale}". Defaulting to firstDay: Monday (1). ` +
          `Ensure the dateLocale is correctly mapped in localeToFirstDayMap.`);
      }
    }
    return this.locale.firstDay ?? 1; // Default to Monday (ISO 8601) if no valid value is found
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, datepicker-container, icon-calendar, datepicker-input, icon-cross, message" }, this.labelConfig?.text && (h("wpp-label-v2-22-0", { class: "label", htmlFor: this.name, optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.containerClasses(), id: "container", part: "datepicker-container" }, h("wpp-icon-calendar-v2-22-0", { onClick: this.handleClickCalendarIcon, class: this.iconCalendarCssClasses(), part: "icon-calendar" }), h("input", { id: "datepicker", type: "text", class: this.inputCssClasses(), onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, disabled: this.disabled, readOnly: !this.range && !this.isDefaultDateFormat(), placeholder: this.placeholder ||
        (this.range
          ? `${this.locale.dateFormat}${DATES_SEPARATOR}${this.locale.dateFormat}`
          : `${this.locale.dateFormat}`), ref: inputRef => (this.inputRef = inputRef), autocomplete: "off", part: "datepicker-input", title: "" }), h("div", { onBlur: this.handleBlurPortal, onFocus: () => clearTimeout(this.hideTimer), ...(this.hasPresets() ? { tabIndex: 0 } : {}), ref: ref => (this.portalRef = ref), class: this.portalClasses() }, this.hasPresets() && (h("div", { class: "wpp-presets-container" }, h("div", { class: "wpp-presets-list" }, this.presets.map((preset) => (h("wpp-list-item-v2-22-0", { onMouseEnter: () => this.handlePreviewPreset(preset.value), onMouseLeave: this.handleMouseLeavePreset, onWppChangeListItem: () => this.handleClickPreset(preset), class: "wpp-presets-item" }, h("wpp-typography-v2-22-0", { type: "s-body", slot: "label" }, preset.label))))), h("div", { class: "wpp-presets-footer" })))), !!this.lastValidDate && (h("wpp-icon-cross-v2-22-0", { class: this.iconCrossCssClasses(), "aria-label": "Erase date", onClick: this.handleClickIconCross, part: "icon-cross" })), this.message && (h("wpp-inline-message-v2-22-0", { class: "inline-message", message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" })))));
  }
  static get is() { return "wpp-datepicker"; }
  static get registryIs() { return "wpp-datepicker-v2-22-0"; }
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
          "original": "LocaleTypes",
          "resolved": "LocaleTypes",
          "references": {
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
        "defaultValue": "{\n    days: DAYS,\n    daysShort: DAYS_SHORT,\n    daysMin: DAYS_MIN,\n    months: MONTHS,\n    monthsShort: MONTHS_SHORT,\n    today: 'Today',\n    clear: 'Clear',\n    dateFormat: DATE_FORMAT.DAY_MONTH_YEAR,\n    timeFormat: 'hh:mm aa',\n    dateLocale: undefined,\n    firstDay: undefined,\n  }"
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
      "tippyInstance": {}
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
      }];
  }
}
