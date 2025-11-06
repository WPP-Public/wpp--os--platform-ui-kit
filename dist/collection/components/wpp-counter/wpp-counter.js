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
      const target = event.target;
      const targetValue = target.value.replace(' ', '').replace(/[^0-9.]/g, '');
      if (Number.isInteger(this.step)) {
        const inputValue = Number(targetValue) || 0;
        if (inputValue === 0) {
          target.value = '';
          this.formattedValue = '';
        }
        else {
          this.value = Math.max(this.min, Math.min(this.max, inputValue));
          target.value = this.formatValue();
        }
      }
      else {
        if (!/^-?\d*(?:[.,]\d*)?$/.test(targetValue)) {
          target.value = this.formatValue();
          return;
        }
        if (targetValue.includes('.') && targetValue.split('.')[1].length === 0) {
          target.value = this.formatValue(targetValue);
        }
        else {
          this.value = Number(targetValue);
          target.value = this.formatValue();
        }
      }
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.onFocus = (event) => {
      this.inputRef?.select();
      this.wppFocus.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      if (this.formattedValue === '') {
        this.formattedValue = String(this.min);
        this.value = this.min;
        this.wppChange.emit({
          value: this.value,
          name: this.name,
        });
      }
      this.wppBlur.emit(event);
    };
    this.roundToDecimal = (value, decimals) => {
      const factor = Math.pow(10, decimals);
      return Math.round(value * factor) / factor;
    };
    this.addStepToValue = (valueOfStep) => {
      if (Number.isInteger(this.step)) {
        this.value += valueOfStep;
      }
      else {
        const numberOfDecimalsFromStep = (this.step + '').split('.')[1].length;
        this.value = this.roundToDecimal(this.value + valueOfStep, numberOfDecimalsFromStep);
      }
    };
    this.increaseValue = () => {
      if (this.value === this.max)
        return;
      this.addStepToValue(this.step);
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.decreaseValue = () => {
      if (this.value === this.min)
        return;
      this.addStepToValue(-this.step);
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.counterWrapperCssClasses = () => ({
      'counter-wrapper': true,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.decreaseWrapperCssClasses = () => ({
      'decrease-wrapper': true,
      disabled: this.value === this.min,
    });
    this.increaseWrapperCssClasses = () => ({
      'increase-wrapper': true,
      disabled: this.value === this.max,
    });
    this.inputCssClasses = () => ({
      'counter-input': true,
      'without-counter': !this.withButtons,
      [`${this.messageType}`]: !!this.messageType,
    });
    this.hostCssClasses = () => ({
      'wpp-counter': true,
    });
    this.formattedValue = undefined;
    this.focusType = undefined;
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
    return (h(Host, { "aria-disabled": this.disabled, class: this.hostCssClasses(), exportparts: "label, body, decrease-button, decrease-icon, input, increase-button, increase-icon, message", onFocus: this.onFocus, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onBlur: this.onBlur }, this.labelConfig?.text && (h("wpp-label-v2-22-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.counterWrapperCssClasses(), part: "body" }, this.withButtons && (h("div", { class: this.decreaseWrapperCssClasses(), onClick: this.decreaseValue, part: "decrease-button" }, h("wpp-icon-remove-v2-22-0", { class: "icon-minus", part: "decrease-icon" }))), h("input", { id: this.name, type: this.withButtons ? 'text' : 'decimal', class: this.inputCssClasses(), name: this.name, onKeyDown: this.handleValidate, value: this.formattedValue, required: this.required, disabled: this.disabled, onInput: this.onInput, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, part: "input", title: "" }), this.withButtons && (h("div", { class: this.increaseWrapperCssClasses(), onClick: this.increaseValue, part: "increase-button" }, h("wpp-icon-plus-v2-22-0", { class: "icon-plus", part: "increase-icon" })))), this.message && (h("wpp-inline-message-v2-22-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" }))));
  }
  static get is() { return "wpp-counter"; }
  static get registryIs() { return "wpp-counter-v2-22-0"; }
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
      "focusType": {}
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
