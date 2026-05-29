import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconEyeOn {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-eye-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("g", { "clip-path": "url(#clip0_876_729)" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.99464 3.625C5.23474 3.625 1.01208 6.94546 -0.101271 11.2714C-0.204512 11.6725 0.0369846 12.0814 0.438126 12.1847C0.839267 12.2879 1.24815 12.0464 1.35139 11.6453C2.29054 7.99621 5.90455 5.125 9.99464 5.125C14.0857 5.125 17.7098 7.99717 18.6487 11.6453C18.752 12.0464 19.1609 12.2879 19.562 12.1847C19.9631 12.0814 20.2046 11.6725 20.1014 11.2714C18.9878 6.9445 14.7535 3.625 9.99464 3.625ZM7.34875 11.1105C7.34875 9.64575 8.53613 8.45837 10.0008 8.45837C11.4655 8.45837 12.6529 9.64575 12.6529 11.1105C12.6529 12.5752 11.4655 13.7625 10.0008 13.7625C8.53613 13.7625 7.34875 12.5752 7.34875 11.1105ZM10.0008 6.95837C7.70771 6.95837 5.84875 8.81733 5.84875 11.1105C5.84875 13.4036 7.70771 15.2625 10.0008 15.2625C12.294 15.2625 14.1529 13.4036 14.1529 11.1105C14.1529 8.81733 12.294 6.95837 10.0008 6.95837Z", fill: "currentColor" })), h("defs", null, h("clipPath", { id: "clip0_876_729" }, h("rect", { width: "20", height: "20", fill: "white" })))));
  }
  static get is() { return "wpp-icon-eye-on"; }
  static get registryIs() { return "wpp-icon-eye-on-v4-1-0"; }
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
