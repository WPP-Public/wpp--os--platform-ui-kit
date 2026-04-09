import { h, Host } from '@stencil/core';
import { getSlotEmptyStates } from '../../../../utils/utils';
import { FOCUS_TYPE } from '../../../../types/common';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { LOCALES_DEFAULTS } from './const';
/**
 * @part info-wrapper - wrapper around text and optional text
 * @part text - label text
 * @part optional-text - optional text element
 * @part info-wrapper -
 * @part text - Main text content
 * @part tooltip - tooltip wrapper content
 *
 * @slot icon - may contain an icon that will be placed after text wrapper, e.g. a info icon
 */
export class WppInternalLabel {
  constructor() {
    this._locales = LOCALES_DEFAULTS;
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon"]',
      });
      this.hasIconSlot = !emptyStates.icon;
    };
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.iconCssClasses = () => ({
      icon: true,
      'slot-hidden': !this.hasIconSlot,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.hostCssClasses = () => ({
      'wpp-internal-label': true,
      [this.typography]: true,
      disabled: this.disabled,
    });
    this.infoWrapperCssClasses = () => ({
      'info-wrapper': true,
      'with-icon': this.hasIconSlot,
    });
    this.hasIconSlot = true;
    this.focusType = undefined;
    this.labelText = undefined;
    this.description = undefined;
    this.optional = false;
    this.typography = 's-body';
    this.disabled = false;
    this.locales = {};
    this.tooltipConfig = {};
    this.role = 'presentation';
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    this.updateSlotData();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onBlur: this.onBlur, exportparts: "info-wrapper, text, optional-text, tooltip, icon, icon-wrapper" }, !!this.labelText && (h("div", { class: this.infoWrapperCssClasses(), part: "info-wrapper", role: this.role }, h("wpp-typography-v3-6-0", { type: this.typography, class: "text", part: "text" }, this.labelText), this.optional && (h("wpp-typography-v3-6-0", { type: "s-body", class: "optional", part: "optional-text" }, "(", this._locales.optional, ")")))), !!this.description && this.hasIconSlot ? (h("wpp-tooltip-v3-6-0", { class: "tooltip", text: this.description, config: this.tooltipConfig, part: "tooltip" }, h(WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData, role: this.tooltipConfig.tabIndex === -1 ? 'none' : 'button', tabIndex: this.tooltipConfig.tabIndex ?? 0, "aria-label": this.tooltipConfig.tabIndex !== -1 ? 'Show info' : undefined }))) : (h(WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData, role: "button", tabIndex: 0, "aria-label": "Show info" }))));
  }
  static get is() { return "wpp-internal-label"; }
  static get registryIs() { return "wpp-internal-label-v3-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-internal-label.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-internal-label.css"]
    };
  }
  static get properties() {
    return {
      "labelText": {
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
          "text": "Indicates text of the label"
        },
        "attribute": "label-text",
        "reflect": false
      },
      "description": {
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
          "text": "Indicates description message in tooltip when hover on icon"
        },
        "attribute": "description",
        "reflect": false
      },
      "optional": {
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
          "text": "Indicates optional field to fill with (Optional) text after label"
        },
        "attribute": "optional",
        "reflect": false,
        "defaultValue": "false"
      },
      "typography": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Extract<TypographyType, 's-strong' | 's-body'>",
          "resolved": "\"s-body\" | \"s-strong\"",
          "references": {
            "Extract": {
              "location": "global",
              "id": "global::Extract"
            },
            "TypographyType": {
              "location": "import",
              "path": "../../../wpp-typography/types",
              "id": "src/components/wpp-typography/types.ts::TypographyType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates different typography styles for label"
        },
        "attribute": "typography",
        "reflect": false,
        "defaultValue": "'s-body'"
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
          "text": "If `true`, the component is disabled"
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<LabelLocales>",
          "resolved": "{ optional?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "LabelLocales": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-label/types.ts::LabelLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for label component"
        },
        "defaultValue": "{}"
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../../../types/common",
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
      "role": {
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
          "text": "Indicates the role attribute for the component"
        },
        "attribute": "role",
        "reflect": false,
        "defaultValue": "'presentation'"
      }
    };
  }
  static get states() {
    return {
      "hasIconSlot": {},
      "focusType": {}
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
