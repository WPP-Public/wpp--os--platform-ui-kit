import { h, Host } from '@stencil/core';
/**
 * @slot - Can contain only the `wpp-checkbox` components that are displayed in `checkbox-group`. The default slot, without the name attribute. A maximum of 5 checkbox elements are allowed in this component and a minimum of 2.
 *
 * @part inner - Content slot element
 */
export class WppCheckboxGroup {
  constructor() {
    this.items = [];
    this.getCheckboxElements = () => {
      setTimeout(() => {
        this.items = Array.from(this.host.querySelectorAll('.wpp-checkbox'));
        this.items.forEach((checkbox) => {
          checkbox.checked = this.value.includes(checkbox.value);
          checkbox.required = true;
        });
      }, 0);
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.hostCssClasses = () => ({
      'wpp-checkbox-group': true,
    });
    this.value = [];
    this.required = false;
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  componentDidLoad() {
    this.getCheckboxElements();
  }
  updateValue(value) {
    this.items.forEach(item => {
      item.checked = value.includes(item.value);
    });
  }
  onClickCheckbox(event) {
    const value = event.detail.value;
    if (this.value.includes(value)) {
      this.value = [...this.value.filter(item => item !== value)];
    }
    else {
      this.value = [...this.value, value];
    }
    this.wppChange.emit({ value: this.value });
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "inner" }, this.labelConfig?.text && (h("wpp-label-v2-22-0", { class: "label", typography: "s-body", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), h("slot", { onSlotchange: this.getCheckboxElements, part: "inner" }), !!this.message && (h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))));
  }
  static get is() { return "wpp-checkbox-group"; }
  static get registryIs() { return "wpp-checkbox-group-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-checkbox-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-checkbox-group.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "CheckboxGroupValue[]",
          "resolved": "CheckboxGroupValue[]",
          "references": {
            "CheckboxGroupValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-checkbox-group/types.ts::CheckboxGroupValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the checkbox group value."
        },
        "defaultValue": "[]"
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
          "text": "If `true`, the group is required"
        },
        "attribute": "required",
        "reflect": true,
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
          "text": "Defines the message that is going to be displayed below the checkbox group.\nThis property should be used in case there is an error / warning that needs to be displayed on the component."
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
          "text": "Defines the message's type and can take one of the following values: \"error\" / \"warning\".\nThe icon displayed for the message will change based on this property."
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
          "text": "Defines the message's maximum length. If the length of the message is greater than the value of this property,\nthe message will be truncated and a tooltip will display the whole text upon hover."
        },
        "attribute": "max-message-length",
        "reflect": false
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
              "path": "../wpp-label/types",
              "id": "src/components/wpp-label/types.ts::LabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the label configuration for the checkbox group."
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
          "text": "Tooltip config for label, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      }
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
          "text": "Emitted when the checkbox group value changes."
        },
        "complexType": {
          "original": "CheckboxGroupChangeEvent",
          "resolved": "BaseFormControlEventDetail<CheckboxGroupValue[]> & { name?: string | undefined; }",
          "references": {
            "CheckboxGroupChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-checkbox-group/types.ts::CheckboxGroupChangeEvent"
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
          "text": "Emitted when the group receives focus"
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
          "text": "Emitted when the group loses focus"
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
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "updateValue"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppClickCheckbox",
        "method": "onClickCheckbox",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
