import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
/**
 * @internal
 */
export class WppIconPreviousFilled {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-previous-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.8688 3.24061C15.772 2.62173 16.9992 3.26846 16.9992 4.36337V15.6366C16.9992 16.7358 15.7634 17.3816 14.861 16.754L6.69598 11.0753C5.9141 10.5315 5.91814 9.3735 6.70379 8.83518L14.8688 3.24061Z", fill: "currentColor" }), h("path", { d: "M3.5833 3C3.26115 3 3 3.26115 3 3.5833V16.4159C3 16.7381 3.26115 16.9992 3.5833 16.9992C3.90545 16.9992 4.1666 16.7381 4.1666 16.4159V3.5833C4.1666 3.26115 3.90545 3 3.5833 3Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-previous-filled"; }
  static get registryIs() { return "wpp-icon-previous-filled-v3-6-0"; }
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
