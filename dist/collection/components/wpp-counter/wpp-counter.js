import { h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { autoFocusElement } from '../../utils/utils';
/**
 * @part input - Counter input element
 * @part label - Label text element
 * @part body - Main content wrapper
 * @part decrease-button - decrease button element
 * @part decrease-icon - decrease icon element
 * @part increase-button - increase button element
 * @part increase-icon - increase icon element
 * @part message - message element
 */
export class WppCounter {
  constructor() {
    this.handleValidate = (event) => {
      // Any non-Tab keyboard interaction should exit the "tab highlight" mode
      if (event.key !== 'Tab') {
        this.inputRef?.classList.remove('tab-focus');
        this.focusType = FOCUS_TYPE.NONE;
      }
      if (event.key === 'ArrowUp') {
        if (this.value !== this.max)
          return this.addStepToValue(this.step);
      }
      if (event.key === 'ArrowDown') {
        if (this.value !== this.min)
          return this.addStepToValue(-this.step);
      }
      this.formatValue();
    };
    this.formatValue = (valueToFormat) => {
      this.formattedValue = this.format
        ? (valueToFormat || String(this.value)).replace(this.format.searchValue, this.format.replaceValue)
        : valueToFormat || String(this.value);
      return this.formattedValue;
    };
    this.onInput = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.inputRef?.classList.remove('tab-focus');
      const target = event.target;
      const cleaned = target.value.replace(' ', '').replace(/[^0-9.]/g, '');
      // If empty, keep view empty and don’t emit a stale value
      if (cleaned === '') {
        this.formattedValue = '';
        target.value = '';
        return;
      }
      if (Number.isInteger(this.step)) {
        const inputValue = Number(cleaned) || 0;
        // Removed the inputValue === 0 special-case that cleared the field and set formattedValue to ''. That logic conflated zero with “empty,” prevented users from entering a valid 0 when min = 0, and left this.value unchanged (stale). As a result, after clearing/typing 0 the increment used the previous value (e.g., 123 → clear → + => 124). Now we only treat the field as empty when the string is actually empty, don’t emit wppChange on empty, and baseline +/-/arrow actions from min when empty. If the user types 0: clamp to min when min > 0, or accept 0 when min = 0. This fixes the stale increment bug and aligns with the test “previously entered value is not saved when clearing the input.”
        this.value = Math.max(this.min, Math.min(this.max, inputValue));
        target.value = this.formatValue();
      }
      else {
        if (!/^-?\d*(?:[.,]\d*)?$/.test(cleaned)) {
          target.value = this.formatValue();
          return;
        }
        if (cleaned.includes('.') && cleaned.split('.')[1].length === 0) {
          target.value = this.formatValue(cleaned);
        }
        else {
          this.value = Number(cleaned);
          target.value = this.formatValue();
        }
      }
      this.wppChange.emit({ value: this.value, name: this.name });
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
      // Clear keyboard focus styling when switching to mouse modality
      this.host?.shadowRoot?.querySelectorAll('.tab-focus').forEach(el => el.classList.remove('tab-focus'));
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      if (this.formattedValue === '' || isNaN(this.value)) {
        this.formattedValue = String(this.min);
        this.value = this.min;
        this.wppChange.emit({ value: this.value, name: this.name });
      }
      this.wppBlur.emit(event);
    };
    this.roundToDecimal = (value, decimals) => {
      const factor = Math.pow(10, decimals);
      return Math.round(value * factor) / factor;
    };
    this.isInputEmpty = () => this.formattedValue === '' || this.inputRef?.value === '';
    this.addStepToValue = (valueOfStep) => {
      const inputIsEmpty = this.inputRef?.value === '' || this.formattedValue === '' || isNaN(this.value);
      const base = inputIsEmpty ? this.min : this.value;
      if (Number.isInteger(this.step)) {
        let next = base + valueOfStep;
        next = Math.min(this.max, Math.max(this.min, next));
        this.value = next;
      }
      else {
        const decimals = (this.step + '').split('.')[1]?.length || 0;
        let next = this.roundToDecimal(base + valueOfStep, decimals);
        next = Math.min(this.max, Math.max(this.min, next));
        this.value = next;
      }
    };
    this.increaseValue = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
      if (this.value === this.max)
        return;
      this.addStepToValue(this.step);
      if (this.value === this.max) {
        const btn = this.host.shadowRoot?.querySelector('.increase-wrapper');
        btn?.classList.remove('pressed');
      }
      this.wppChange.emit({ value: this.value, name: this.name });
    };
    this.decreaseValue = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
      if (this.value === this.min)
        return;
      this.addStepToValue(-this.step);
      if (this.value === this.min) {
        const btn = this.host.shadowRoot?.querySelector('.decrease-wrapper');
        btn?.classList.remove('pressed');
      }
      this.wppChange.emit({ value: this.value, name: this.name });
    };
    this.counterWrapperCssClasses = () => ({
      'counter-wrapper': true,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: true,
    });
    this.decreaseWrapperCssClasses = () => ({
      'decrease-wrapper': true,
      disabled: !this.isInputEmpty() && this.value === this.min,
    });
    this.increaseWrapperCssClasses = () => ({
      'increase-wrapper': true,
      disabled: !this.isInputEmpty() && this.value === this.max,
    });
    this.inputCssClasses = () => ({
      'counter-input': true,
      'without-counter': !this.withButtons,
      [`${this.messageType}`]: !!this.messageType,
    });
    this.hostCssClasses = () => ({
      'wpp-counter': true,
    });
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onElementFocus = (event) => {
      if (this.focusType === FOCUS_TYPE.TAB) {
        const target = event.currentTarget;
        target.classList.add('tab-focus');
      }
    };
    this.onElementBlur = (event) => {
      const target = event.currentTarget;
      target.classList.remove('tab-focus');
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onKeyDownButton = (event, action) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const target = event.currentTarget;
        target.classList.add('pressed');
        if (action === 'increase')
          this.increaseValue();
        else
          this.decreaseValue();
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
        const target = event.currentTarget;
        target.classList.add('tab-focus');
      }
      if (event.key === 'Enter' || event.key === ' ') {
        const target = event.currentTarget;
        target.classList.remove('pressed');
      }
    };
    this.formattedValue = undefined;
    this.focusType = undefined;
    this.currentFocused = null;
    this.name = undefined;
    this.value = 1;
    this.min = 1;
    this.max = 100;
    this.withButtons = true;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.ariaProps = {};
    this.format = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.tooltipConfig = {};
    this.labelConfig = undefined;
    this.step = 1;
  }
  updateFormattedValue() {
    this.formatValue();
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  componentWillLoad() {
    this.formattedValue = String(this.value);
    this.formatValue();
  }
  componentDidLoad() {
    autoFocusElement(this.autoFocus, this.inputRef);
  }
  render() {
    const messageId = this.message ? `${this.name}-message` : undefined;
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, body, decrease-button, decrease-icon, input, increase-button, increase-icon, message", onMouseDown: this.onMouseDown, onBlur: this.onBlur }, this.labelConfig?.text && (h("wpp-label-v3-3-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.counterWrapperCssClasses(), part: "body" }, this.withButtons && (h("button", { type: "button", class: this.decreaseWrapperCssClasses(), onClick: this.decreaseValue, part: "decrease-button", "aria-label": "Decrease value", disabled: (!this.isInputEmpty() && this.value === this.min) || this.disabled, tabIndex: (!this.isInputEmpty() && this.value === this.min) || this.disabled ? -1 : 0, onFocus: this.onElementFocus, onBlur: this.onElementBlur, onKeyUp: this.onKeyUp, onKeyDown: e => this.onKeyDownButton(e, 'decrease') }, h("wpp-icon-remove-v3-3-0", { class: "icon-minus", part: "decrease-icon" }))), h("input", { id: this.name, type: this.withButtons ? 'text' : 'decimal', class: this.inputCssClasses(), name: this.name, onKeyDown: this.handleValidate, value: this.formattedValue, required: this.required, disabled: this.disabled, onInput: this.onInput, onKeyUp: this.onKeyUp, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label || (!this.labelConfig?.text ? 'Counter value' : undefined), "aria-labelledby": this.labelConfig?.labelId || undefined, "aria-describedby": messageId, autocomplete: this.ariaProps.autocomplete || 'off', part: "input", title: "", onFocus: e => {
        this.onElementFocus(e);
        this.onFocus(e);
      }, onBlur: this.onElementBlur }), this.withButtons && (h("button", { type: "button", class: this.increaseWrapperCssClasses(), onClick: this.increaseValue, part: "increase-button", "aria-label": "Increase value", disabled: (!this.isInputEmpty() && this.value === this.max) || this.disabled, tabIndex: (!this.isInputEmpty() && this.value === this.max) || this.disabled ? -1 : 0, onFocus: this.onElementFocus, onBlur: this.onElementBlur, onKeyUp: this.onKeyUp, onKeyDown: e => this.onKeyDownButton(e, 'increase') }, h("wpp-icon-plus-v3-3-0", { class: "icon-plus", part: "increase-icon" })))), this.message && (h("wpp-inline-message-v3-3-0", { id: messageId, message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" }))));
  }
  static get is() { return "wpp-counter"; }
  static get registryIs() { return "wpp-counter-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-counter.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-counter.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Defines the counter name."
        },
        "attribute": "name",
        "reflect": false
      },
      "value": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the counter value."
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "1"
      },
      "min": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the counter `min` value."
        },
        "attribute": "min",
        "reflect": false,
        "defaultValue": "1"
      },
      "max": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the counter `max` value."
        },
        "attribute": "max",
        "reflect": false,
        "defaultValue": "100"
      },
      "withButtons": {
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
          "text": "If `true`, the counter will show increment/decrement(+/-) buttons"
        },
        "attribute": "with-buttons",
        "reflect": false,
        "defaultValue": "true"
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
          "text": "If the counter is required."
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
          "text": "If the counter is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "If `true`, the counter should be focused on page load"
        },
        "attribute": "auto-focus",
        "reflect": false,
        "defaultValue": "false"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'m' | 's'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the counter size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
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
          "text": "Defines the counter message."
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
          "text": "Defines the counter message type."
        },
        "attribute": "message-type",
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
          "text": "Defines the counter message maximum length."
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the counter `aria-` props."
        },
        "defaultValue": "{}"
      },
      "format": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CounterFormat",
          "resolved": "CounterFormat",
          "references": {
            "CounterFormat": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-counter/types.ts::CounterFormat"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the counter format number."
        }
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
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
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
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "CounterLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "CounterLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-counter/types.ts::CounterLabelConfig"
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
      "step": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the step of the counter."
        },
        "attribute": "step",
        "reflect": false,
        "defaultValue": "1"
      }
    };
  }
  static get states() {
    return {
      "formattedValue": {},
      "focusType": {},
      "currentFocused": {}
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
          "text": "Emitted when the input value changes."
        },
        "complexType": {
          "original": "CounterChangeEventDetail",
          "resolved": "CounterChangeEventDetail",
          "references": {
            "CounterChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-counter/types.ts::CounterChangeEventDetail"
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
          "text": "Emitted when the counter is in focus."
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
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the counter loses focus."
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
      }];
  }
  static get methods() {
    return {
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
          "text": "Method that sets focus on the native input.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "updateFormattedValue"
      }];
  }
}
