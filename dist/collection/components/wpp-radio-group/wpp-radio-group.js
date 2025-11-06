import { h, Host } from '@stencil/core';
/**
 * @slot - Can contain only the `wpp-radio` components that are displayed in `radio-group`. The default slot, without the name attribute. A maximum of 5 radio elements are allowed in this component and a minimum of 2.
 *
 * @part inner - Content slot element
 */
export class WppRadioGroup {
  constructor() {
    this.items = [];
    this.checkRadioElements = () => {
      setTimeout(() => {
        this.items = Array.from(this.host.querySelectorAll('.wpp-radio'));
        this.items.forEach((radio) => {
          radio.checked = this.value === radio.value;
          radio.required = true;
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
      'wpp-radio-group': true,
    });
    this.value = undefined;
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
    this.checkRadioElements();
  }
  updateValue(value) {
    this.items.forEach(item => {
      item.checked = item.value === value;
    });
  }
  onClickRadioButton(event) {
    const value = event.detail.value;
    if (this.value !== value) {
      this.value = value;
      this.wppChange.emit({ value });
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), "aria-multiselectable": "false", "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "inner" }, this.labelConfig?.text && (h("wpp-label-v2-22-0", { class: "label", typography: "s-body", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig })), h("slot", { onSlotchange: this.checkRadioElements, part: "inner" }), !!this.message && (h("wpp-inline-message-v2-22-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType }))));
  }
  static get is() { return "wpp-radio-group"; }
  static get registryIs() { return "wpp-radio-group-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-radio-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-radio-group.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "RadioGroupValue",
          "resolved": "number | string",
          "references": {
            "RadioGroupValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-radio-group/types.ts::RadioGroupValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the radio group value."
        },
        "attribute": "value",
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
          "text": "Defines the message that is going to be displayed below the radio group.\nThis property should be used in case there is an error / warning that needs to be displayed on the component."
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
          "text": "Indicates the label configuration for the radio group."
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
          "text": "Emitted when the radio group value changes."
        },
        "complexType": {
          "original": "RadioGroupChangeEvent",
          "resolved": "BaseFormControlEventDetail<RadioGroupValue>",
          "references": {
            "RadioGroupChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-radio-group/types.ts::RadioGroupChangeEvent"
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
        "name": "wppClickRadio",
        "method": "onClickRadioButton",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
