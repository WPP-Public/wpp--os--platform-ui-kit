import { Host, h } from '@stencil/core';
import { menuListConfig } from '../../common/menuListConfig';
import { Z_INDEX } from '../../common/consts';
import { getHighestContainerInDOM } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { DEFAULT_CHECKED_TIME_VALUES, DEFAULT_WIDTH_VALUE, HOURS, PLACEHOLDER, TOP_PADDING, isValidHour, isValidMinutes, } from './config';
export class WppTimePicker {
  constructor() {
    this.hasSelectedMinutes = false;
    this.hasChangedHours = false;
    this.hasChangedMinutes = false;
    this.hasClearedValue = false;
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
      this.tippyInstance = menuListConfig({
        anchor: this.anchorRef,
        content: this.portalRef,
        maxWidth: 'none',
        hideOnClick: false,
        zIndex: Z_INDEX.TIME_PICKER,
        trigger: 'click',
        placement: 'bottom-start',
        offset: [0, 4],
        // Automatically attach dropdown to highest container in DOM such that there will
        // be no clipping issues.
        appendTo: () => getHighestContainerInDOM(),
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
      this.focusType = FOCUS_TYPE.MOUSE;
      if (this.value === '') {
        this.value = PLACEHOLDER;
        this.previousInputValue = PLACEHOLDER;
      }
      this.wppFocus.emit(event);
    };
    this.onBlur = () => {
      if (this.isInComponent)
        return;
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit();
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.getAnchorCssClasses = () => ({
      [this.focusType]: true,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: true,
      disabled: this.disabled,
      'no-value': this.value === '' || this.value === undefined,
    });
    this.focusType = FOCUS_TYPE.NONE;
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
    this.createTippyInstance();
  }
  render() {
    return (h(Host, { class: "wpp-time-picker", "aria-disabled": this.disabled, style: { width: !this.width ? DEFAULT_WIDTH_VALUE : this.width } }, this.labelConfig?.text && (h("wpp-label-v3-6-0", { typography: "s-strong", class: "label", htmlFor: this.name, optional: !this.required, config: this.labelConfig, disabled: this.disabled, tooltipConfig: this.labelTooltipConfig })), h("div", { ref: el => (this.anchorRef = el), id: "anchor", class: this.getAnchorCssClasses() }, h("div", { class: "anchor-time" }, h("wpp-icon-clock-v3-6-0", { class: "clock-icon" }), h("input", { ref: el => (this.inputRef = el), onFocus: this.onFocus, onBlur: this.onBlur, onKeyUp: this.onKeyUp, onKeyPress: this.onKeyPress, onPaste: this.onPaste, disabled: this.disabled, onInput: this.onUpdateInput, id: "time-picker", type: "text", placeholder: this.placeholder, value: this.value })), h("div", { class: "cross-icon-container" }, this.showDisplayCross && (h("wpp-icon-cross-v3-6-0", { class: "cross-icon", "aria-label": "Erase time", onClick: this.handleClickCrossIcon })))), h("div", { ref: el => (this.portalRef = el), class: "wpp-time-picker-portal" }, h("div", { ref: refEl => (this.hoursSectionRef = refEl), class: "hours section" }, HOURS.map((hour, hourIndex) => (h("wpp-list-item-v3-6-0", { id: `hour-${hour}`, key: hour, checked: this.checkedTimeValues.hoursIndex === hourIndex, onWppChangeListItem: () => this.handleClickListItem(hour, 'hour') }, h("span", { slot: "label" }, hour))))), h("wpp-divider-v3-6-0", { vertical: true }), h("div", { ref: refEl => (this.minutesSectionRef = refEl), class: "minutes section" }, this.generatedMinutes.map((minutes, minutesIndex) => (h("wpp-list-item-v3-6-0", { id: `minutes-${minutes}`, key: minutes, checked: this.checkedTimeValues.minutesIndex === minutesIndex, onWppChangeListItem: () => this.handleClickListItem(minutes, 'minutes') }, h("span", { slot: "label" }, minutes)))))), this.message && (h("wpp-inline-message-v3-6-0", { class: !this.messageType ? 'helper-text' : '', message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig }))));
  }
  static get is() { return "wpp-time-picker"; }
  static get registryIs() { return "wpp-time-picker-v3-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-time-picker.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-time-picker.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Defines the time picker size, which differs in terms of paddings."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
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
          "text": "If `true`, the time picker is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
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
              "path": "../../components",
              "id": "src/components.d.ts::DropdownConfig"
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
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the placeholder of the time picker. Placeholder is displayed when there is no value in the time picker."
        },
        "attribute": "placeholder",
        "reflect": false,
        "defaultValue": "PLACEHOLDER"
      },
      "width": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The width of time picker. Values can be in \"px\" or in \"%\".\nDefault value is \"198px\"."
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "DEFAULT_WIDTH_VALUE"
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Value of time picker. Should always have a valid time format."
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
      },
      "minutesInterval": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "1 | 5 | 10 | 15",
          "resolved": "1 | 10 | 15 | 5",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the interval of minutes. Can take of one of the following values: 1, 5, 10, 15"
        },
        "attribute": "minutes-interval",
        "reflect": true,
        "defaultValue": "5"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "LabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "LabelConfig": {
              "location": "import",
              "path": "../../components",
              "id": "src/components.d.ts::LabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config."
        }
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
          "text": "Indicates time picker name."
        },
        "attribute": "name",
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
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../components",
              "id": "src/components.d.ts::DropdownConfig"
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
      "messageType": {
        "type": "string",
        "mutable": true,
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
          "text": "Indicates time picker message type. This property should be used together with \"messagae\" property for \"error\" and \"warning\" states."
        },
        "attribute": "message-type",
        "reflect": false
      },
      "message": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates time picker message."
        },
        "attribute": "message",
        "reflect": false
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
          "text": "Indicates time picker message maximum length"
        },
        "attribute": "max-message-length",
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
              "path": "../../components",
              "id": "src/components.d.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the tooltip configuration for the message below the input. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "showDisplayCross": {},
      "generatedMinutes": {},
      "checkedTimeValues": {},
      "isInComponent": {}
    };
  }
  static get events() {
    return [{
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
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
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
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
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the dropdown of the time picker closes. Contains details about the current value of the datepicker."
        },
        "complexType": {
          "original": "TimePickerChangeEventDetails",
          "resolved": "TimePickerChangeEventDetails",
          "references": {
            "TimePickerChangeEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-time-picker/types.ts::TimePickerChangeEventDetails"
            }
          }
        }
      }, {
        "method": "wppClear",
        "name": "wppClear",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the \"cross\" icon is clicked and the value of the time picker is cleared."
        },
        "complexType": {
          "original": "TimePickerChangeEventDetails",
          "resolved": "TimePickerChangeEventDetails",
          "references": {
            "TimePickerChangeEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-time-picker/types.ts::TimePickerChangeEventDetails"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "minutesInterval",
        "methodName": "onUpdateMinutesInterval"
      }, {
        "propName": "value",
        "methodName": "onUpdateValue"
      }, {
        "propName": "isInComponent",
        "methodName": "updateIsInComponent"
      }];
  }
}
