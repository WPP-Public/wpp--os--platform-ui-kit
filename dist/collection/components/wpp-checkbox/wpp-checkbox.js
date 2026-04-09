import { h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
/**
 * @part body - Main content wrapper
 * @part input - Input element
 * @part square - square element
 * @part icon-tick - icon tick element
 * @part icon-dash - icon dash element
 * @part message - message element
 */
export class WppCheckbox {
  constructor() {
    this.onClick = (event) => {
      event.preventDefault();
      if (this.controlled)
        return this.wppChange.emit({
          value: this.value,
          name: this.name,
          ...(this.indeterminate ? { indeterminate: false, checked: true } : { checked: !this.checked }),
        });
      if (this.indeterminate) {
        this.indeterminate = false;
        this.checked = true;
      }
      else {
        this.checked = !this.checked;
      }
      this.wppChange.emit({
        value: this.value,
        checked: this.checked,
        name: this.name,
      });
      this.wppClickCheckbox.emit({
        value: this.value,
        checked: this.checked,
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
      this.isPressed = false;
    };
    this.onKeyUp = (event) => {
      // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
      if (event.key === 'Tab' && this.host?.shadowRoot?.activeElement === this.inputRef)
        this.focusType = FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.onKeyDown = (event) => {
      if (this.disabled)
        return;
      // Need to check if input got focus, because label can have icon with tooltip which also can be focused.
      if ((event.key === 'Enter' || event.key === ' ') && this.host?.shadowRoot?.activeElement === this.inputRef) {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
        this.host.dispatchEvent(clickEvent);
        this.isPressed = true;
        this.checked = !this.checked;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-checkbox': true,
      'wpp-checkbox-wrapper': true,
      'wpp-checked': this.checked && !this.indeterminate,
      'wpp-indeterminate': this.indeterminate,
      'wpp-disabled': this.disabled,
    });
    this.labelCssClasses = () => ({
      label: true,
      'with-text': !!this.labelConfig?.text,
      [this.internalState]: true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      pressed: this.isPressed,
    });
    this.inputCssClasses = () => ({
      'checkbox-input': true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.focusType = undefined;
    this.isPressed = false;
    this.name = undefined;
    this.value = undefined;
    this.checked = false;
    this.controlled = false;
    this.indeterminate = false;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.ariaProps = {};
    this.labelConfig = undefined;
    this.internalState = '';
    this.index = 0;
    this.decorative = false;
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    if (!this.inputRef)
      return;
    this.inputRef.focus();
    this.focusType = FOCUS_TYPE.TAB;
  }
  render() {
    if (this.decorative)
      return (h(Host, { class: this.hostCssClasses(), "aria-hidden": "true", role: "presentation", tabindex: "-1", exportparts: "body, input, square, icon-tick, icon-dash, message", name: this.name }, h("wpp-label-v3-6-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, h("div", { class: "square", part: "square" }), h("wpp-icon-tick-v3-6-0", { part: "icon-tick" }), h("wpp-icon-dash-v3-6-0", { part: "icon-dash" })), !!this.message && (h("wpp-inline-message-v3-6-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
    return (h(Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, exportparts: "body, input, square, icon-tick, icon-dash, message", name: this.name }, h("wpp-label-v3-6-0", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, htmlFor: this.name, disabled: this.disabled, onClick: this.onClick, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "body" }, h("input", { class: this.inputCssClasses(), type: "checkbox", id: this.name, name: this.name, disabled: this.disabled, checked: this.checked || this.indeterminate, required: this.required, onFocus: this.onFocus, onBlur: this.onBlur, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, "aria-hidden": this.disabled ? 'true' : null, "aria-required": this.required.toString(), tabindex: this.disabled ? '-1' : this.index, part: "input" }), h("div", { class: "square", part: "square" }), h("wpp-icon-tick-v3-6-0", { part: "icon-tick" }), h("wpp-icon-dash-v3-6-0", { part: "icon-dash" })), !!this.message && (h("wpp-inline-message-v3-6-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, part: "message" }))));
  }
  static get is() { return "wpp-checkbox"; }
  static get registryIs() { return "wpp-checkbox-v3-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-checkbox.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-checkbox.css"]
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
          "text": "Defines the checkbox name."
        },
        "attribute": "name",
        "reflect": false
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "CheckboxValue",
          "resolved": "number | string",
          "references": {
            "CheckboxValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-checkbox/types.ts::CheckboxValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the checkbox value."
        },
        "attribute": "value",
        "reflect": false
      },
      "checked": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the checkbox is selected."
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      },
      "controlled": {
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
          "text": "If the checkbox is work as controlled component."
        },
        "attribute": "controlled",
        "reflect": true,
        "defaultValue": "false"
      },
      "indeterminate": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the checkbox is indeterminate."
        },
        "attribute": "indeterminate",
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
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tooltip config for label, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
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
          "text": "If the checkbox is required."
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
          "text": "If the checkbox is disabled."
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
          "text": "If `true`, the checkbox should be focused on page load"
        },
        "attribute": "auto-focus",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Indicates input message"
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
          "text": "Indicates input message type"
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
          "text": "Indicates input message maximum length"
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
          "text": "Contains the checkbox `aria-` props."
        },
        "defaultValue": "{}"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "CheckboxLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "CheckboxLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-checkbox/types.ts::CheckboxLabelConfig"
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
      "internalState": {
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
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by card group component"
            }],
          "text": "Indicates custom classes to the checkbox"
        },
        "attribute": "internal-state",
        "reflect": false,
        "defaultValue": "''"
      },
      "index": {
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
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by avatar group"
            }],
          "text": "Indicates the avatar tab index."
        },
        "attribute": "index",
        "reflect": false,
        "defaultValue": "0"
      },
      "decorative": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by WppCard component"
            }],
          "text": "Create a component with role presentation"
        },
        "attribute": "decorative",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "isPressed": {}
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
          "text": "Emitted when the selected state changes."
        },
        "complexType": {
          "original": "CheckboxChangeEvent",
          "resolved": "BooleanFormControlEventDetail<CheckboxValue> & { name?: string | undefined; }",
          "references": {
            "CheckboxChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-checkbox/types.ts::CheckboxChangeEvent"
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
          "text": "Emitted when the checkbox is in focus."
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
          "text": "Emitted when the checkbox loses focus."
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
        "method": "wppClickCheckbox",
        "name": "wppClickCheckbox",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This event is controlled by container like Checkbox Group, do not set it manually."
            }],
          "text": "Emitted when the checkbox is clicked."
        },
        "complexType": {
          "original": "CheckboxChangeEvent",
          "resolved": "BooleanFormControlEventDetail<CheckboxValue> & { name?: string | undefined; }",
          "references": {
            "CheckboxChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-checkbox/types.ts::CheckboxChangeEvent"
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
}
