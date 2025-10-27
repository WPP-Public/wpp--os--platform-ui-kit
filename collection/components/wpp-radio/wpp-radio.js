import { h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { transformToVersionedTag } from '../../utils/utils';
/**
 * @part label - Label text element
 * @part input - input element
 * @part circle - radio circle element
 */
export class WppRadio {
  constructor() {
    this.onClick = () => {
      if (this.disabled)
        return;
      this.checked = true;
      this.wppChange.emit({
        value: this.value,
        checked: this.checked,
        name: this.name,
      });
      this.wppClickRadio.emit({
        value: this.value,
        checked: this.checked,
      });
    };
    this.onInput = () => {
      if (this.disabled)
        return;
      this.setFocus();
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.tippyInstance?.hide();
      this.wppBlur.emit(event);
      this.isPressed = false;
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
        this.checked = true;
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
        this.tippyInstance?.show();
      }
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-radio': true,
      'wpp-radio-wrapper': true,
      'wpp-disabled': this.disabled,
      'wpp-checked': this.checked,
    });
    this.labelCssClasses = () => ({
      label: true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      'with-text': !!this.labelConfig?.text,
      [this.internalState]: true,
      pressed: this.isPressed,
    });
    this.inputCssClasses = () => ({
      'radio-input': true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.focusType = undefined;
    this.isPressed = false;
    this.name = undefined;
    this.value = undefined;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.ariaProps = {};
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.internalState = '';
    this.index = 0;
    this.decorative = false;
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
    this.focusType = FOCUS_TYPE.TAB;
    this.tippyInstance?.show();
  }
  componentWillLoad() {
    const radioGroup = this.host.closest(transformToVersionedTag('wpp-radio-group'));
    if (radioGroup) {
      this.checked = this.value === radioGroup.value;
    }
  }
  render() {
    if (this.decorative) {
      return (h(Host, { class: this.hostCssClasses(), "aria-hidden": "true", role: "presentation", tabindex: "-1", exportparts: "label, content, inner", name: this.name }, h("wpp-label-v3-3-0", { class: this.labelCssClasses(), part: "label" }, h("div", { class: "circle", part: "circle" }))));
    }
    return (h(Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, exportparts: "label, content, inner", name: this.name }, h("wpp-label-v3-3-0", { class: this.labelCssClasses(), typography: "s-body", htmlFor: this.name, disabled: this.disabled, optional: !this.required, config: this.labelConfig, onClick: this.onClick, tooltipConfig: {
        ...{
          onCreate: (instance) => {
            this.tippyInstance = instance;
          },
          tabIndex: -1,
        },
        ...this.labelTooltipConfig,
      }, part: "label" }, h("input", { class: this.inputCssClasses(), type: "radio", name: this.name, id: this.name, value: this.value, disabled: this.disabled, checked: this.checked, required: this.required, onInput: this.onInput, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label, "aria-hidden": this.disabled ? 'true' : null, "aria-required": this.required.toString(), tabindex: this.disabled ? '-1' : this.index, part: "input" }), h("div", { class: "circle", part: "circle" }))));
  }
  static get is() { return "wpp-radio"; }
  static get registryIs() { return "wpp-radio-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-radio.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-radio.css"]
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
          "text": "Defines the radio name."
        },
        "attribute": "name",
        "reflect": false
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "RadioValue",
          "resolved": "number | string",
          "references": {
            "RadioValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-radio/types.ts::RadioValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the radio value."
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
          "text": "If the radio is selected."
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "If the radio is required."
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
          "text": "If the radio is disabled."
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
          "text": "If `true`, the radio should be focused on page load"
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
          "text": "Defines the radio size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
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
          "text": "Contains the radio `aria-` props."
        },
        "defaultValue": "{}"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "RadioLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "RadioLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-radio/types.ts::RadioLabelConfig"
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
          "text": "Indicates custom classes to the radio"
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
              "text": "- This prop is controlled by radio group"
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
          "original": "RadioChangeEvent",
          "resolved": "BooleanFormControlEventDetail<RadioValue> & { name?: string | undefined; }",
          "references": {
            "RadioChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-radio/types.ts::RadioChangeEvent"
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
          "text": "Emitted when the radio is in focus."
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
          "text": "Emitted when the radio loses focus."
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
        "method": "wppClickRadio",
        "name": "wppClickRadio",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This event is controlled by container like Radio Group, do not set it manually."
            }],
          "text": "Emitted when the radio button is clicked."
        },
        "complexType": {
          "original": "RadioChangeEvent",
          "resolved": "BooleanFormControlEventDetail<RadioValue> & { name?: string | undefined; }",
          "references": {
            "RadioChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-radio/types.ts::RadioChangeEvent"
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
