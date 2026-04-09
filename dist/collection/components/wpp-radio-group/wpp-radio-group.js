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
        this.syncTabIndexes();
      }, 0);
    };
    this.getEnabledItems = () => this.items.filter(item => !item.disabled);
    this.getCurrentNdx = (enabled) => {
      const checkedNdx = enabled.findIndex(item => item.checked);
      return checkedNdx !== -1 ? checkedNdx : 0;
    };
    this.focusAndSelect = (target) => {
      if (!target)
        return;
      const nextValue = target.value;
      if (this.value !== nextValue) {
        this.value = nextValue;
        this.wppChange.emit({ value: this.value });
      }
      this.syncTabIndexes();
      target.setFocus?.();
    };
    this.onKeyDown = (event) => {
      const enabledItems = this.getEnabledItems();
      if (enabledItems.length === 0)
        return;
      const currentNdx = this.getCurrentNdx(enabledItems);
      let nextNdx = currentNdx;
      const isNextKey = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      const isPrevKey = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
      if (!isNextKey && !isPrevKey)
        return;
      event.preventDefault();
      const onFirst = currentNdx === 0;
      const onLast = currentNdx === enabledItems.length - 1;
      if (onLast && isNextKey) {
        nextNdx = 0;
      }
      else if (onFirst && isPrevKey) {
        nextNdx = enabledItems.length - 1;
      }
      else if (isNextKey) {
        nextNdx = Math.min(currentNdx + 1, enabledItems.length - 1);
      }
      else if (isPrevKey) {
        nextNdx = Math.max(currentNdx - 1, 0);
      }
      const target = enabledItems[nextNdx];
      this.focusAndSelect(target);
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
    this.contentCssClasses = () => ({
      content: true,
      [`direction-${this.direction}`]: true,
    });
    this.value = undefined;
    this.required = false;
    this.message = undefined;
    this.messageType = undefined;
    this.direction = 'column';
    this.maxMessageLength = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.ariaProps = {
      labelledby: 'label-id',
      describedby: 'description-id',
    };
    this.gap = undefined;
  }
  updateValue(value) {
    this.items.forEach(item => {
      item.checked = item.value === value;
    });
    this.syncTabIndexes();
  }
  onClickRadioButton(event) {
    const value = event.detail.value;
    if (this.value !== value) {
      this.value = value;
      this.wppChange.emit({ value });
    }
    this.syncTabIndexes();
  }
  componentDidLoad() {
    this.checkRadioElements();
  }
  syncTabIndexes() {
    const enabled = this.getEnabledItems();
    if (enabled.length === 0)
      return;
    let activeIndex = enabled.findIndex(r => r.checked);
    if (activeIndex === -1)
      activeIndex = 0;
    enabled.forEach((r, i) => {
      r.index = i === activeIndex ? 0 : -1;
    });
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onKeyDown: this.onKeyDown, onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "inner" }, h("div", { class: "group-container", role: "radiogroup", "aria-labelledby": this.ariaProps.labelledby, ...(!!this.message && this.ariaProps.describedby ? { 'aria-describedby': this.ariaProps.describedby } : {}) }, this.labelConfig?.text && (h("wpp-label-v3-6-0", { class: "label", tag: "h3", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, id: this.ariaProps.labelledby })), h("div", { class: this.contentCssClasses(), style: this.gap ? { gap: `${this.gap}px` } : {} }, h("slot", { onSlotchange: this.checkRadioElements, part: "inner" })), !!this.message && (h("wpp-inline-message-v3-6-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, id: this.ariaProps.describedby })))));
  }
  static get is() { return "wpp-radio-group"; }
  static get registryIs() { return "wpp-radio-group-v3-6-0"; }
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
      "direction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'column' | 'row'",
          "resolved": "\"column\" | \"row\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the direction in which the checkbox items are displayed.\nBy default, the items are displayed vertically (in a column)."
        },
        "attribute": "direction",
        "reflect": true,
        "defaultValue": "'column'"
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
          "text": "Contains the checkbox group `aria-` props."
        },
        "defaultValue": "{\n    labelledby: 'label-id',\n    describedby: 'description-id',\n  }"
      },
      "gap": {
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
          "text": "Gap between radio buttons in pixels"
        },
        "attribute": "gap",
        "reflect": false
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
