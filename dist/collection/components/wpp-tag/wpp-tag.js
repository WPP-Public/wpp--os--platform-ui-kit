import { Host, h } from '@stencil/core';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { debounce, getSlotEmptyStates, truncate } from '../../utils/utils';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
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
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
    };
    this.setLabelRef = (el) => {
      if (el === this.labelRef)
        return;
      if (this.labelRef && this.resizeObserver) {
        this.resizeObserver.unobserve(this.labelRef);
      }
      this.labelRef = el;
      if (el && this.resizeObserver) {
        this.resizeObserver.observe(el);
      }
    };
    this.checkLabelOverflow = () => {
      if (!this.labelRef)
        return;
      const el = this.labelRef;
      const isTruncated = el.scrollWidth > el.clientWidth;
      if (isTruncated !== this.isOverflowTruncated) {
        this.isOverflowTruncated = isTruncated;
      }
    };
    this.initResizeObserver = () => {
      this.resizeObserverCallback = debounce(() => this.checkLabelOverflow(), 50);
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeObserverCallback?.();
      });
      if (this.labelRef) {
        try {
          this.resizeObserver.observe(this.labelRef);
        }
        catch {
          console.error('Error observing labelRef');
        }
      }
    };
    this.getLabelText = () => {
      // Support deprecated maxLabelLength for backward compatibility
      if (this.maxLabelLength && this.maxLabelLength > 0 && this.label) {
        return truncate(this.label, this.maxLabelLength, false);
      }
      return this.label;
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
    this.renderLabel = () => {
      const displayedText = this.getLabelText();
      const originalLabel = this.label;
      if (originalLabel == null)
        return null;
      // Check if truncation happened via maxLabelLength (deprecated) or CSS overflow
      const wasMaxLengthTruncated = !!this.maxLabelLength && this.maxLabelLength > 0 && displayedText !== originalLabel;
      const shouldShowTooltip = this.isOverflowTruncated || wasMaxLengthTruncated;
      const labelNode = (h("span", { class: "label-text", part: "tooltip-text", ref: this.setLabelRef }, displayedText));
      return shouldShowTooltip ? (h("wpp-tooltip-v4-1-0", { class: "wpp-tooltip", text: originalLabel, config: this.tooltipConfig, part: "tooltip", disabled: this.disabled }, labelNode)) : (labelNode);
    };
    this.hasIconStartSlot = false;
    this.isOverflowTruncated = false;
    this.variant = undefined;
    this.maxLabelLength = 30;
    this.tooltipConfig = {};
    this.label = undefined;
    this.disabled = false;
  }
  onLabelChange() {
    this.checkLabelOverflow();
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  componentDidLoad() {
    this.initResizeObserver();
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.resizeObserver?.disconnect();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, tooltip, tooltip-text, icon-start, overlay" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("wpp-typography-v4-1-0", { class: "wpp-typography", type: "xs-midi", tag: "span", part: "label" }, this.renderLabel()), h("div", { class: `overlay ${this.variant?.includes('Cat-') ? 'categorical-overlay' : ''}`, part: "overlay" })));
  }
  static get is() { return "wpp-tag"; }
  static get registryIs() { return "wpp-tag-v4-1-0"; }
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
          "tags": [{
              "name": "deprecated",
              "text": "- Use CSS width constraints instead. Text will automatically truncate with ellipsis when it overflows. This prop will be removed in version 5.0.0.\n\nNote: The default value is 30 characters for backward compatibility. If you want truncation\nbased purely on the element's width (e.g. via CSS `max-width`), set this prop to `undefined`.\nOtherwise, the character-based truncation will take precedence and the label will be cut off\nat 30 characters before any CSS width constraint is applied."
            }],
          "text": "Maximum label length (in characters) of single item."
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
      "hasIconStartSlot": {},
      "isOverflowTruncated": {}
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "label",
        "methodName": "onLabelChange"
      }, {
        "propName": "maxLabelLength",
        "methodName": "onLabelChange"
      }];
  }
}
