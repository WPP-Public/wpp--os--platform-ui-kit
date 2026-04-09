import { h, Host } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
/**
 * @part info-wrapper - wrapper around text and optional text
 * @part text - label text
 * @part optional - optional text
 *
 * @part wrapper - component wrapper element
 * @part content - content wrapper element
 * @part icon - Icon element
 */
export class WppLabel {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-label': true,
    });
    this.renderContent = () => (h("wpp-internal-label-v4-0-0", { labelText: this.config?.text, description: this.config?.description, optional: this.optional, typography: this.typography, disabled: this.disabled, locales: this.config?.locales, tooltipConfig: this.tooltipConfig, part: "content", id: this.labelId }, this.config?.icon && h(transformToVersionedTag(this.config?.icon), { slot: 'icon', part: 'icon' })));
    this.description = undefined;
    this.htmlFor = undefined;
    this.optional = false;
    this.typography = 's-strong';
    this.disabled = false;
    this.config = undefined;
    this.tag = 'label';
    this.tooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.labelId = undefined;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, content, icon" }, h(this.tag, { class: "internal-label-wrapper", part: "wrapper", ...(this.tag === 'label' && { htmlFor: this.htmlFor, 'aria-label': this.htmlFor }) }, this.renderContent())));
  }
  static get is() { return "wpp-label"; }
  static get registryIs() { return "wpp-label-v4-0-0"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-label.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-label.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Indicates description in tooltip when hover on icon"
        },
        "attribute": "description",
        "reflect": false
      },
      "htmlFor": {
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
          "text": "Defines which form element the label is bound to."
        },
        "attribute": "html-for",
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
          "text": "If **(Optional)** is displayed after the label."
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
              "path": "../wpp-typography/types",
              "id": "src/components/wpp-typography/types.ts::TypographyType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the label typography style."
        },
        "attribute": "typography",
        "reflect": false,
        "defaultValue": "'s-strong'"
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
          "text": "If the component is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "config": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "LabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "LabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-label/types.ts::LabelConfig"
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
      "tag": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'label' | 'legend' | string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- for group components (wpp-checkbox-group, wpp-radio-group)"
            }],
          "text": "Define html tag for a text"
        },
        "attribute": "tag",
        "reflect": false,
        "defaultValue": "'label'"
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
      "labelId": {
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
          "text": "Optional unique identifier for the label element.\nUseful for associating the label with form controls or for accessibility purposes."
        },
        "attribute": "label-id",
        "reflect": false
      }
    };
  }
}
