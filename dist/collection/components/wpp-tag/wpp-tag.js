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
    this.updateCategoricalColor = (index) => {
      this.host.style.setProperty('--tag-color', index ? `var(--wpp-dataviz-color-cat-dark-${index})` : '');
      this.host.style.setProperty('--tag-bg-color', index ? `var(--wpp-dataviz-color-cat-neutral-${index})` : '');
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
    this.categoricalColorIndex = undefined;
    this.withIcon = false;
    this.disabled = false;
  }
  componentWillLoad() {
    this.updateCategoricalColor(this.categoricalColorIndex);
    this.updateSlotData();
  }
  updateCategoricalIndex(index) {
    this.updateCategoricalColor(index);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, tooltip, tooltip-text, icon-start, overlay" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("wpp-typography-v2-22-0", { type: "xs-midi", tag: "span", part: "label" }, Number(this.label?.length) > this.maxLabelLength ? (h("wpp-tooltip-v2-22-0", { text: this.label, config: this.tooltipConfig, part: "tooltip" }, h("span", { part: "tooltip-text" }, truncate(this.label, this.maxLabelLength, false)))) : (this.label)), h("div", { class: "overlay", part: "overlay" })));
  }
  static get is() { return "wpp-tag"; }
  static get registryIs() { return "wpp-tag-v2-22-0"; }
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
          "original": "'neutral' | 'warning' | 'positive' | 'negative'",
          "resolved": "\"negative\" | \"neutral\" | \"positive\" | \"warning\" | undefined",
          "references": {}
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
      "categoricalColorIndex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "Exclude<RangeOf<9>, 0>",
          "resolved": "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined",
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
          "text": "Selects the tag color from categorical."
        },
        "attribute": "categorical-color-index",
        "reflect": false
      },
      "withIcon": {
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
              "name": "deprecated",
              "text": "- this prop will be deleted in version ***. If you want tag with icon, you can add slot with some icon inside tag component"
            }],
          "text": "Defines the if the tag icon displayed."
        },
        "attribute": "with-icon",
        "reflect": false,
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
  static get watchers() {
    return [{
        "propName": "categoricalColorIndex",
        "methodName": "updateCategoricalIndex"
      }];
  }
}
