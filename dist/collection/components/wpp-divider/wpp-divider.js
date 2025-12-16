import { Host, h } from '@stencil/core';
/**
 * @part body - Main content element
 */
export class WppDivider {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-divider': true,
    });
    this.dividerCssClasses = () => ({
      'wpp-divider-line': true,
      resizable: this.resizable,
      vertical: this.vertical,
    });
    this.vertical = false;
    this.resizable = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: "separator", "aria-orientation": this.vertical ? 'vertical' : 'horizontal', exportparts: "body" }, h("div", { class: this.dividerCssClasses(), part: "body" })));
  }
  static get is() { return "wpp-divider"; }
  static get registryIs() { return "wpp-divider-v3-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-divider.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-divider.css"]
    };
  }
  static get properties() {
    return {
      "vertical": {
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
          "text": "If true, the divider will be vertical. Defaults to false."
        },
        "attribute": "vertical",
        "reflect": false,
        "defaultValue": "false"
      },
      "resizable": {
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
          "text": "If true, the divider will be interactive and can be dragged to resize. Defaults to false."
        },
        "attribute": "resizable",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "host"; }
}
