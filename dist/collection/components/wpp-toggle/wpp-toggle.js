import { h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
/**
 * @part label - Label text element
 * @part input - input element
 */
export class WppToggle {
  constructor() {
    this.onClick = (event) => {
      if (this.disabled)
        return;
      event.preventDefault();
      this.setFocus();
      if (!this.controlled) {
        this.checked = !this.checked;
        this.wppChange.emit({
          value: this.value,
          checked: this.checked,
          name: this.name,
        });
      }
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.hostCssClasses = () => ({
      'wpp-toggle': true,
      'wpp-toggle-wrapper': true,
      'wpp-disabled': this.disabled,
      'wpp-checked': this.checked,
    });
    this.labelCssClasses = () => ({
      label: true,
      'with-text': !!this.labelConfig?.text,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      hide: !this.labelConfig?.text,
    });
    this.onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.onClick(event);
      }
    };
    this.focusType = undefined;
    this.name = undefined;
    this.value = undefined;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.controlled = false;
    this.ariaProps = {};
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  render() {
    const inputId = this.name || 'wpp-toggle';
    const labelId = `${inputId}-label`;
    const hasLabel = !!this.labelConfig?.text;
    const labelText = this.labelConfig?.text || this.ariaProps.label;
    // Only pass aria-label/aria-labelledby if there is NO label
    const ariaProps = !hasLabel && (this.ariaProps?.label || this.ariaProps?.labelledby)
      ? {
        ...(this.ariaProps.label ? { 'aria-label': this.ariaProps.label } : {}),
        ...(this.ariaProps.labelledby ? { 'aria-labelledby': this.ariaProps.labelledby } : {}),
      }
      : {};
    return (h(Host, { onClick: this.onClick, class: this.hostCssClasses(), exportparts: "label, input" }, h("wpp-label-v3-3-1", { class: this.labelCssClasses(), typography: "s-body", optional: !this.required, htmlFor: inputId, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label", labelId: labelId }, h("input", { type: "checkbox", name: this.name, id: inputId, value: this.value, disabled: this.disabled, checked: this.checked, required: this.required, autoFocus: this.autoFocus, ref: inputRef => (this.inputRef = inputRef), class: "toggle-input", part: "input", ...ariaProps, title: labelText, "aria-checked": this.checked ? 'true' : 'false', "aria-hidden": this.disabled ? 'true' : null, role: "switch", tabIndex: this.disabled ? -1 : 0, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown }))));
  }
  static get is() { return "wpp-toggle"; }
  static get registryIs() { return "wpp-toggle-v3-3-1"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-toggle.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-toggle.css"]
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
          "text": "Defines the toggle name."
        },
        "attribute": "name",
        "reflect": false
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "ToggleValue",
          "resolved": "number | string",
          "references": {
            "ToggleValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-toggle/types.ts::ToggleValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the toggle value."
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
          "text": "If the toggle is on."
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
          "text": "If the toggle is required."
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
          "text": "If the toggle is disabled."
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
          "text": "If `true`, the toggle should be focused on page load"
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
          "text": "Defines the toggle size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
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
          "text": "If the toggle works as controlled component."
        },
        "attribute": "controlled",
        "reflect": true,
        "defaultValue": "false"
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
          "text": "Contains the toggle `aria-` props."
        },
        "defaultValue": "{}"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ToggleLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "ToggleLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-toggle/types.ts::ToggleLabelConfig"
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
          "text": "Tooltip config for label, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      }
    };
  }
  static get states() {
    return {
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
          "text": "Emitted when toggle state changes."
        },
        "complexType": {
          "original": "ToggleChangeEvent",
          "resolved": "BooleanFormControlEventDetail<ToggleValue> & { name?: string | undefined; }",
          "references": {
            "ToggleChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-toggle/types.ts::ToggleChangeEvent"
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
          "text": "Emitted when the toggle is in focus."
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
          "text": "Emitted when the toggle loses focus."
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
}
