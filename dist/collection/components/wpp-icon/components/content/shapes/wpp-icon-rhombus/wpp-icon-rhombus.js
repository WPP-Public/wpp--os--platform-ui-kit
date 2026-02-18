import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconRhombus {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-rhombus", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.93239 4.60189C5.21329 3.90591 5.88864 3.4502 6.63917 3.4502H17.1576C18.4622 3.4502 19.3526 4.76985 18.8644 5.9796L15.0677 15.3869C14.7868 16.0829 14.1114 16.5386 13.3609 16.5386H2.84239C1.53783 16.5386 0.64735 15.2189 1.13561 14.0092L4.93239 4.60189ZM6.63917 4.67723C6.38899 4.67723 6.16388 4.82914 6.07024 5.06113L2.27346 14.4684C2.11071 14.8717 2.40754 15.3115 2.84239 15.3115H13.3609C13.611 15.3115 13.8362 15.1596 13.9298 14.9276L17.7265 5.52037C17.8893 5.11712 17.5925 4.67723 17.1576 4.67723H6.63917Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-rhombus"; }
  static get registryIs() { return "wpp-icon-rhombus-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../../wpp-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../../wpp-icon.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon size, where `s` is **16px** and `m` is **20px**."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "width": {
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
          "text": "Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same."
        },
        "attribute": "width",
        "reflect": false
      },
      "height": {
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
          "text": "Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected."
        },
        "attribute": "height",
        "reflect": false
      },
      "color": {
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
          "text": "Defines the icon color."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'var(--wpp-icon-color)'"
      }
    };
  }
}
