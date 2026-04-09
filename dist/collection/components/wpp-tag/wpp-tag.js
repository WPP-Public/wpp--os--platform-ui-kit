import { Host, h } from '@stencil/core';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { getSlotEmptyStates, truncate } from '../../utils/utils';
/**
 * @part label - Label text element
 * @part tooltip - tag wrapper content
 * @part tooltip-text - tag text component
 * @part overlay - tag overlay
 *
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a user icon.
 */
export class WppTag {
  constructor() {
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
    };
    this.hostCssClasses = () => ({
      'wpp-tag': true,
      ...(this.variant && { [`wpp-${this.variant}`]: true }),
      'wpp-with-icon': Boolean(this.hasIconStartSlot),
      'wpp-disabled': this.disabled,
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
    });
    this.hasIconStartSlot = false;
    this.variant = undefined;
    this.maxLabelLength = 30;
    this.tooltipConfig = {};
    this.label = undefined;
    this.disabled = false;
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, tooltip, tooltip-text, icon-start, overlay" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("wpp-typography-v4-0-0", { type: "xs-midi", tag: "span", part: "label" }, Number(this.label?.length) > this.maxLabelLength ? (h("wpp-tooltip-v4-0-0", { text: this.label, config: this.tooltipConfig, part: "tooltip" }, h("span", { part: "tooltip-text" }, truncate(this.label, this.maxLabelLength, false)))) : (this.label)), h("div", { class: `overlay ${this.variant?.includes('Cat-') ? 'categorical-overlay' : ''}`, part: "overlay" })));
  }
  static get is() { return "wpp-tag"; }
  static get registryIs() { return "wpp-tag-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-tag.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-tag.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'neutral' | 'warning' | 'positive' | 'negative' | `Cat-${Exclude<RangeOf<9>, 0>}`",
          "resolved": "\"Cat-1\" | \"Cat-2\" | \"Cat-3\" | \"Cat-4\" | \"Cat-5\" | \"Cat-6\" | \"Cat-7\" | \"Cat-8\" | \"Cat-9\" | \"negative\" | \"neutral\" | \"positive\" | \"warning\" | undefined",
          "references": {
            "Exclude": {
              "location": "global",
              "id": "global::Exclude"
            },
            "RangeOf": {
              "location": "import",
              "path": "../../types/numberRange",
              "id": "src/types/numberRange.ts::RangeOf"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the tag style."
        },
        "attribute": "variant",
        "reflect": false
      },
      "maxLabelLength": {
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
          "text": "Maximum label length (in characters) of single item"
        },
        "attribute": "max-label-length",
        "reflect": false,
        "defaultValue": "30"
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
        "defaultValue": "{}"
      },
      "label": {
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
          "text": "Defines the tag label."
        },
        "attribute": "label",
        "reflect": false
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
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by Accordion, and Tree components."
            }],
          "text": "Defines the tag disabled state."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "hasIconStartSlot": {}
    };
  }
  static get elementRef() { return "host"; }
}
