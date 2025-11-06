import { h, Host } from '@stencil/core';
/**
 * @slot - Content displayed within the `menu-group` component. The default slot, without the name attribute.
 *
 * @part header - header text element
 * @part divider - divider element
 */
export class WppMenuGroup {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-menu-group': true,
    });
    this.header = undefined;
    this.withDivider = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "header, divider" }, this.header && (h("wpp-typography-v2-22-0", { type: "2xs-strong", part: "header" }, this.header)), h("slot", null), this.withDivider && h("wpp-divider-v2-22-0", { class: "slot-divider", part: "divider" })));
  }
  static get is() { return "wpp-menu-group"; }
  static get registryIs() { return "wpp-menu-group-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-menu-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-menu-group.css"]
    };
  }
  static get properties() {
    return {
      "header": {
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
          "text": "Defines the header message."
        },
        "attribute": "header",
        "reflect": false
      },
      "withDivider": {
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
          "tags": [],
          "text": "If a divider is displayed."
        },
        "attribute": "with-divider",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
}
