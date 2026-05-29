'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const menuListConfig = require('./menuListConfig-205d098b.js');
const consts = require('./consts-d8f5ef98.js');
const utils = require('./utils-2231f97a.js');
const common = require('./common-ee802540.js');
const subscribeToTheme = require('./subscribe-to-theme-fc5de7fe.js');
require('./tippy.esm-9d703cd4.js');

const PLACEHOLDER = 'hh:mm';
const HOURS = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
const DEFAULT_CHECKED_TIME_VALUES = {
  hoursIndex: -1,
  minutesIndex: -1,
};
const TOP_PADDING = 8;
const DEFAULT_WIDTH_VALUE = '198px';
const isValidHour = (value) => /^(0\d|1\d|2[0-3])$/.test(value);
const isValidMinutes = (value) => /^[0-5]\d$/.test(value);

const wppTimePickerCss = ":host(.wpp-time-picker){display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;min-width:124px}:host(.wpp-time-picker) .label{margin-bottom:8px}:host(.wpp-time-picker) #anchor{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;border-radius:var(--wpp-border-radius-m);border:var(--wpp-border-width-s) solid;border-color:var(--wpp-grey-color-500);-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;gap:8px}:host(.wpp-time-picker) #anchor .anchor-time{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}:host(.wpp-time-picker) #anchor .clock-icon{--wpp-icon-color:var(--wpp-grey-color-800)}:host(.wpp-time-picker) #anchor .cross-icon-container{width:20px;height:20px}:host(.wpp-time-picker) #anchor .cross-icon:hover{--wpp-icon-color:var(--wpp-grey-color-800)}:host(.wpp-time-picker) #anchor .cross-icon:active{--wpp-icon-color:var(--wpp-grey-color-900)}:host(.wpp-time-picker) #anchor #time-picker{border:none;padding:0;width:100%;outline:none;color:var(--wpp-grey-color-1000);background-color:transparent;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host(.wpp-time-picker) #anchor #time-picker::-webkit-input-placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-time-picker) #anchor #time-picker::-moz-placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-time-picker) #anchor #time-picker:-ms-input-placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-time-picker) #anchor #time-picker::-ms-input-placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-time-picker) #anchor #time-picker::placeholder{color:var(--wpp-grey-color-700)}:host(.wpp-time-picker) #anchor #time-picker::-moz-selection{background-color:var(--wpp-primary-color-200)}:host(.wpp-time-picker) #anchor #time-picker::selection{background-color:var(--wpp-primary-color-200)}:host(.wpp-time-picker) #anchor #time-picker:hover{cursor:pointer}:host(.wpp-time-picker) #anchor.no-value .clock-icon{--wpp-icon-color:var(--wpp-grey-color-600)}:host(.wpp-time-picker) #anchor:hover{background-color:var(--wpp-grey-color-200);border-color:var(--wpp-grey-color-700);cursor:pointer}:host(.wpp-time-picker) #anchor:hover .clock-icon{--wpp-icon-color:var(--wpp-grey-color-800)}:host(.wpp-time-picker) #anchor:hover #time-picker{background-color:var(--wpp-grey-color-200)}:host(.wpp-time-picker) #anchor.focus{border-color:var(--wpp-grey-color-800)}:host(.wpp-time-picker) #anchor.focus .clock-icon{--wpp-icon-color:var(--wpp-grey-color-800)}:host(.wpp-time-picker) #anchor.disabled{background-color:var(--wpp-grey-color-100);border-color:var(--wpp-grey-color-400)}:host(.wpp-time-picker) #anchor.disabled:hover{cursor:not-allowed}:host(.wpp-time-picker) #anchor.disabled #time-picker{background-color:var(--wpp-grey-color-100);color:var(--wpp-text-color-disabled)}:host(.wpp-time-picker) #anchor.disabled #time-picker::-webkit-input-placeholder{color:var(--wpp-text-color-disabled)}:host(.wpp-time-picker) #anchor.disabled #time-picker::-moz-placeholder{color:var(--wpp-text-color-disabled)}:host(.wpp-time-picker) #anchor.disabled #time-picker:-ms-input-placeholder{color:var(--wpp-text-color-disabled)}:host(.wpp-time-picker) #anchor.disabled #time-picker::-ms-input-placeholder{color:var(--wpp-text-color-disabled)}:host(.wpp-time-picker) #anchor.disabled #time-picker::placeholder{color:var(--wpp-text-color-disabled)}:host(.wpp-time-picker) #anchor.disabled #time-picker:hover{cursor:not-allowed}:host(.wpp-time-picker) #anchor.disabled .clock-icon{--wpp-icon-color:var(--wpp-grey-color-400)}:host(.wpp-time-picker) #anchor.disabled .cross-icon{--wpp-icon-color:var(--wpp-grey-color-400)}:host(.wpp-time-picker) #anchor.error{border-color:var(--wpp-danger-color-500)}:host(.wpp-time-picker) #anchor.warning{border-color:var(--wpp-warning-color-400)}:host(.wpp-time-picker) #anchor.size-s{padding:4px 10px}:host(.wpp-time-picker) #anchor.size-m{padding:8px 10px}:host(.wpp-time-picker) .wpp-inline-message{margin-top:4px}:host(.wpp-time-picker) .wpp-inline-message.helper-text{--wpp-typography-xs-midi-color:var(--wpp-grey-color-800)}";

const WppTimePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppFocus = index.createEvent(this, "wppFocus", 7);
    this.wppBlur = index.createEvent(this, "wppBlur", 7);
    this.wppChange = index.createEvent(this, "wppChange", 7);
    this.wppClear = index.createEvent(this, "wppClear", 7);
    this.hasSelectedMinutes = false;
    this.hasChangedHours = false;
    this.hasChangedMinutes = false;
    this.hasClearedValue = false;
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.portalRef);
    this.highlightItem = () => {
      const [hoursValue, minutesValue] = this.value.split(':');
      const hoursIndex = HOURS.findIndex((hourItem) => hourItem === hoursValue);
      const minutesIndex = this.generatedMinutes.findIndex((minutesItem) => minutesItem === minutesValue);
      this.checkedTimeValues = {
        hoursIndex,
        minutesIndex,
      };
    };
    this.scrollIntoView = () => {
      const [hoursValue, minutesValue] = this.value.split(':');
      const hoursEl = this.portalRef?.querySelector(`#hour-${hoursValue}`);
      const minutesEl = this.portalRef?.querySelector(`#minutes-${minutesValue}`);
      if (hoursEl && this.hoursSectionRef) {
        this.hoursSectionRef.scrollTop = hoursEl.offsetTop - TOP_PADDING;
      }
      if (minutesEl && this.minutesSectionRef) {
        this.minutesSectionRef.scrollTop = minutesEl.offsetTop - TOP_PADDING;
      }
    };
    this.isValidTimeValue = (timeValue) => {
      const [hours, minutes] = timeValue.split(':');
      if (hours === 'hh' || minutes === 'mm')
        return;
      if (isValidHour(hours) && isValidMinutes(minutes)) {
        this.value = `${hours}:${this.roundToNearestInterval(minutes)}`;
        return true;
      }
      return false;
    };
    this.setErrorMessage = (message) => {
      this.message = message;
      this.messageType = message ? 'error' : undefined;
    };
    this.createTippyInstance = () => {
      if (!this.anchorRef)
        return;
      this.tippyInstance = menuListConfig.menuListConfig({
        anchor: this.anchorRef,
        content: this.portalRef,
        maxWidth: 'none',
        hideOnClick: false,
        zIndex: consts.Z_INDEX.TIME_PICKER,
        trigger: 'click',
        placement: 'bottom-start',
        offset: [0, 4],
        // Automatically attach dropdown to highest container in DOM such that there will
        // be no clipping issues.
        appendTo: () => utils.getHighestContainerInDOM(),
        popperOptions: {
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top-start'],
              },
            },
          ],
        },
        ...this.dropdownConfig,
        onHide: (instance) => {
          if (this.value === PLACEHOLDER) {
            // If true, then no changes were made in the time picker.
            // Reverting value back to empty string to display placeholder.
            this.value = '';
          }
          if (this.inputRef) {
            if (this.inputRef.value !== this.value) {
              this.updateValueOnHide(this.inputRef.value);
            }
            this.inputRef.value = this.value;
            this.inputRef.blur();
          }
          // When dropdown hides, emit values of time picker.
          const [hours, minutes] = this.value.split(':');
          this.hasSelectedMinutes = false;
          this.hasChangedHours = false;
          this.hasChangedMinutes = false;
          this.wppChange.emit({
            timeFormat: this.value,
            hours: hours || '',
            minutes: minutes || '',
            ...(this.name ? { name: this.name } : {}),
          });
          if (this.dropdownConfig.onHide) {
            return this.dropdownConfig.onHide(instance);
          }
        },
        onShow: (instance) => {
          if (!this.host || this.disabled)
            return false;
          if (this.host.clientWidth < 150) {
            instance.popper.style.width = '150px';
          }
          else {
            instance.popper.style.width = `${this.host.clientWidth}px`;
          }
          // When dropdown opens, highlight text for hours
          this.selectTextInInput('hours');
          this.highlightItem();
          if (this.value !== '' && this.value !== PLACEHOLDER) {
            setTimeout(() => {
              this.scrollIntoView();
            }, 0);
          }
          if (this.dropdownConfig.onShow) {
            return this.dropdownConfig.onShow(instance);
          }
        },
        onClickOutside: (instance, event) => {
          if (event.target === this.host) {
            // When clicking elements from time picker component, stop the propagation
            // of the event. The dropdown does not need to hide.
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          this.tippyInstance.hide();
          if (this.dropdownConfig.onClickOutside) {
            this.dropdownConfig.onClickOutside(instance, event);
          }
        },
        onHidden: () => {
          this.isInComponent = false;
        },
      });
    };
    this.updateValueOnHide = (inputValue) => {
      if (this.value === '')
        return;
      const [inputHours, inputMinutes] = inputValue.split(':');
      const [valueHours, valueMinutes] = this.value.split(':');
      if (inputHours.length === 1) {
        this.value = `0${inputHours}:${valueMinutes}`;
      }
      if (inputMinutes.length === 1) {
        this.value = `${valueHours}:${this.roundToNearestInterval(inputMinutes)}`;
      }
    };
    // Clears value of time picker
    this.handleClickCrossIcon = (event) => {
      event.stopPropagation();
      if (this.tippyInstance.state.isShown) {
        this.value = PLACEHOLDER;
        this.hasClearedValue = true;
        this.selectTextInInput('hours');
      }
      else {
        this.value = '';
      }
      this.setErrorMessage(undefined);
      this.previousInputValue = this.value;
      this.checkedTimeValues = DEFAULT_CHECKED_TIME_VALUES;
      this.wppClear.emit({ timeFormat: '', hours: '', minutes: '', ...(this.name ? { name: this.name } : {}) });
    };
    this.handleClickListItem = (value, type) => {
      if (!this.inputRef)
        return;
      const [hours, minutes] = this.value.split(':');
      this.hasClearedValue = false;
      if (type === 'hour') {
        this.value = `${value}:${minutes || 'mm'}`;
        if (this.hasSelectedMinutes) {
          this.tippyInstance?.hide();
        }
        else {
          // After selecting hours, highlight text for minutes
          this.selectTextInInput('minutes');
        }
      }
      else {
        this.value = `${hours || 'hh'}:${value}`;
        this.hasSelectedMinutes = true;
        const inputHours = this.inputRef.value.split(':')[0];
        if (inputHours && inputHours.length === 1) {
          this.value = `0${inputHours}:${value}`;
          this.tippyInstance?.hide();
          return;
        }
        if (this.inputRef?.value.split(':'))
          if (!isValidHour(hours)) {
            this.selectTextInInput('hours');
          }
          else {
            this.tippyInstance?.hide();
          }
      }
    };
    this.selectTextInInput = (text) => {
      // The input element needs to be focused before selection.
      this.inputRef?.focus();
      setTimeout(() => {
        this.inputRef?.setSelectionRange(text === 'hours' ? 0 : 3, text === 'hours' ? 2 : 5);
      }, 0);
    };
    this.generateMinutes = () => {
      this.generatedMinutes.length = 0;
      for (let i = 0; i * this.minutesInterval < 60; i += 1) {
        // This also adds "0" to the first 9 digits.
        this.generatedMinutes.push(String(i * this.minutesInterval).padStart(2, '0'));
      }
    };
    this.onUpdateInput = (event) => {
      if (!this.inputRef)
        return;
      this.setErrorMessage(undefined);
      const inputValue = event.target.value;
      if (inputValue === '' || inputValue === ':') {
        this.value = '';
        this.inputRef.value = '';
        this.clearCheckedValue();
        this.previousInputValue = '';
        this.hasClearedValue = true;
        return;
      }
      if (inputValue.length === 1 && this.previousInputValue.length >= 3) {
        this.hasClearedValue = true;
        return;
      }
      if (this.hasClearedValue) {
        if (inputValue.length === 2) {
          const newHourValue = inputValue.includes(':') ? `0${inputValue.split(':')[0]}` : inputValue;
          this.handleHourChange(inputValue, newHourValue, '');
        }
      }
      else {
        const shiftFocusToMinutes = inputValue.split(':').length - 1 >= 2;
        if (shiftFocusToMinutes) {
          const [hours, minutes] = this.previousInputValue.split(':');
          this.handleHourChange(this.previousInputValue, hours.length === 1 ? `0${hours}` : hours, minutes);
        }
        else {
          const [inputHours, inputMinutes] = inputValue.split(':');
          const [valueHours, valueMinutes] = this.value.split(':');
          if (inputHours !== valueHours || this.hasChangedHours) {
            if (inputHours.length < 2) {
              this.hasChangedHours = true;
              this.clearCheckedValue('hours');
            }
            else {
              this.handleHourChange(inputValue, inputHours, valueMinutes);
            }
          }
          if (inputMinutes !== valueMinutes || this.hasChangedMinutes) {
            if (!inputMinutes || inputMinutes.length < 2) {
              this.hasChangedMinutes = true;
              this.clearCheckedValue('minutes');
            }
            else {
              this.handleMinuteChange(valueHours, inputMinutes);
            }
          }
        }
      }
      this.previousInputValue = inputValue;
    };
    this.handleHourChange = (inputValue, newHourValue, valueMinutes) => {
      if (!this.inputRef)
        return;
      this.value = `${isValidHour(newHourValue) ? newHourValue : '23'}:${inputValue.length === 2 ? 'mm' : valueMinutes || 'mm'}`;
      this.inputRef.value = this.value;
      this.hasChangedHours = false;
      this.highlightItem();
      this.scrollIntoView();
      if (this.hasSelectedMinutes) {
        this.tippyInstance?.hide();
      }
      else {
        this.selectTextInInput('minutes');
      }
      this.hasClearedValue = false;
    };
    this.handleMinuteChange = (valueHours, inputMinutes) => {
      if (!this.inputRef)
        return;
      this.value = `${valueHours || 'hh'}:${isValidMinutes(inputMinutes)
        ? this.roundToNearestInterval(inputMinutes)
        : this.generatedMinutes[this.generatedMinutes.length - 1]}`;
      this.inputRef.value = this.value;
      this.hasSelectedMinutes = true;
      this.hasChangedMinutes = false;
      this.highlightItem();
      this.scrollIntoView();
      if (isValidHour(valueHours)) {
        this.tippyInstance?.hide();
      }
      else {
        this.selectTextInInput('hours');
      }
    };
    this.onPaste = (event) => {
      event.preventDefault();
      const pastedText = event.clipboardData?.getData('text');
      if (!pastedText)
        return;
      const hasSemiColon = pastedText.includes(':');
      if ((pastedText.length === 4 && !hasSemiColon) || (pastedText.length === 5 && hasSemiColon)) {
        const formattedPastedText = pastedText.length === 4 ? `${pastedText.slice(0, 2)}:${pastedText.slice(2)}` : pastedText;
        if (!this.isValidTimeValue(formattedPastedText)) {
          this.clearCheckedValue();
          this.tippyInstance?.hide();
          this.inputRef?.blur();
          this.value = pastedText;
        }
        else {
          this.value = formattedPastedText;
        }
      }
      else {
        this.setErrorMessage(`The value provided: ${pastedText}, is not a valid time value!`);
      }
    };
    this.clearCheckedValue = (type) => {
      if (type !== 'hours') {
        this.hasSelectedMinutes = false;
      }
      if (!type) {
        this.checkedTimeValues = DEFAULT_CHECKED_TIME_VALUES;
        return;
      }
      if (type === 'hours') {
        this.checkedTimeValues = {
          ...this.checkedTimeValues,
          hoursIndex: -1,
        };
      }
      else {
        this.checkedTimeValues = {
          ...this.checkedTimeValues,
          minutesIndex: -1,
        };
      }
    };
    this.roundToNearestInterval = (minutes) => {
      // Rounds to minutesInterval property. Also
      const num = parseInt(minutes, 10);
      let rounded = Math.round(num / this.minutesInterval) * this.minutesInterval;
      if (rounded > 59)
        rounded = 60 - this.minutesInterval;
      return rounded.toString().padStart(2, '0');
    };
    this.onKeyPress = (event) => {
      // This blocks non-digit characters and onInput will not be called.
      if (!/[0-9:]/.test(event.key)) {
        event.preventDefault();
      }
    };
    this.onFocus = (event) => {
      if (this.isInComponent)
        return;
      this.isInComponent = true;
      this.focusType = common.FOCUS_TYPE.MOUSE;
      if (this.value === '') {
        this.value = PLACEHOLDER;
        this.previousInputValue = PLACEHOLDER;
      }
      this.wppFocus.emit(event);
    };
    this.onBlur = () => {
      if (this.isInComponent)
        return;
      this.focusType = common.FOCUS_TYPE.NONE;
      this.wppBlur.emit();
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = common.FOCUS_TYPE.TAB;
      }
    };
    this.getAnchorCssClasses = () => ({
      [this.focusType]: true,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: true,
      disabled: this.disabled,
      'no-value': this.value === '' || this.value === undefined,
    });
    this.focusType = common.FOCUS_TYPE.NONE;
    this.showDisplayCross = true;
    this.generatedMinutes = [];
    this.checkedTimeValues = DEFAULT_CHECKED_TIME_VALUES;
    this.isInComponent = false;
    this.size = 'm';
    this.disabled = false;
    this.dropdownConfig = {};
    this.placeholder = PLACEHOLDER;
    this.width = DEFAULT_WIDTH_VALUE;
    this.value = '';
    this.minutesInterval = 5;
    this.labelConfig = undefined;
    this.name = undefined;
    this.required = false;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.messageType = undefined;
    this.message = undefined;
    this.maxMessageLength = undefined;
    this.tooltipConfig = {};
  }
  onUpdateMinutesInterval() {
    this.generateMinutes();
    if (this.value !== '' && this.value !== PLACEHOLDER) {
      this.isValidTimeValue(this.value);
    }
  }
  onUpdateValue() {
    if (!this.value || this.value === PLACEHOLDER) {
      this.showDisplayCross = false;
      return;
    }
    this.isValidTimeValue(this.value);
    this.showDisplayCross = true;
    this.highlightItem();
  }
  updateIsInComponent(value) {
    if (!value)
      this.onBlur();
  }
  componentWillLoad() {
    this.generateMinutes();
    if (this.value) {
      this.isValidTimeValue(this.value);
    }
    this.showDisplayCross = !!this.value;
  }
  componentDidLoad() {
    this.themeSubscription.start();
    this.createTippyInstance();
  }
  connectedCallback() {
    this.themeSubscription.start();
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    return (index.h(index.Host, { class: "wpp-time-picker", "aria-disabled": this.disabled, style: { width: !this.width ? DEFAULT_WIDTH_VALUE : this.width } }, this.labelConfig?.text && (index.h("wpp-label-v4-1-0", { typography: "s-strong", class: "label", htmlFor: this.name, optional: !this.required, config: this.labelConfig, disabled: this.disabled, tooltipConfig: this.labelTooltipConfig })), index.h("div", { ref: el => (this.anchorRef = el), id: "anchor", class: this.getAnchorCssClasses() }, index.h("div", { class: "anchor-time" }, index.h("wpp-icon-clock-v4-1-0", { class: "clock-icon" }), index.h("input", { ref: el => (this.inputRef = el), onFocus: this.onFocus, onBlur: this.onBlur, onKeyUp: this.onKeyUp, onKeyPress: this.onKeyPress, onPaste: this.onPaste, disabled: this.disabled, onInput: this.onUpdateInput, id: "time-picker", type: "text", placeholder: this.placeholder, value: this.value })), index.h("div", { class: "cross-icon-container" }, this.showDisplayCross && (index.h("wpp-icon-cross-v4-1-0", { class: "cross-icon", "aria-label": "Erase time", onClick: this.handleClickCrossIcon })))), index.h("div", { ref: el => (this.portalRef = el), class: "wpp-time-picker-portal" }, index.h("div", { ref: refEl => (this.hoursSectionRef = refEl), class: "hours section" }, HOURS.map((hour, hourIndex) => (index.h("wpp-list-item-v4-1-0", { id: `hour-${hour}`, key: hour, checked: this.checkedTimeValues.hoursIndex === hourIndex, onWppChangeListItem: () => this.handleClickListItem(hour, 'hour') }, index.h("span", { slot: "label" }, hour))))), index.h("wpp-divider-v4-1-0", { vertical: true }), index.h("div", { ref: refEl => (this.minutesSectionRef = refEl), class: "minutes section" }, this.generatedMinutes.map((minutes, minutesIndex) => (index.h("wpp-list-item-v4-1-0", { id: `minutes-${minutes}`, key: minutes, checked: this.checkedTimeValues.minutesIndex === minutesIndex, onWppChangeListItem: () => this.handleClickListItem(minutes, 'minutes') }, index.h("span", { slot: "label" }, minutes)))))), this.message && (index.h("wpp-inline-message-v4-1-0", { class: !this.messageType ? 'helper-text' : '', message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig }))));
  }
  static get registryIs() { return "wpp-time-picker-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "minutesInterval": ["onUpdateMinutesInterval"],
    "value": ["onUpdateValue"],
    "isInComponent": ["updateIsInComponent"]
  }; }
};
WppTimePicker.style = wppTimePickerCss;

exports.wpp_time_picker = WppTimePicker;
