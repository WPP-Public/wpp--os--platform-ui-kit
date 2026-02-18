import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDataArea {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-area", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.00011 2.66667C2.00011 2.29848 2.29859 2 2.66678 2C3.03497 2 3.33344 2.29848 3.33344 2.66667V8.22911L6.57853 6.52117C6.78277 6.41367 7.02809 6.41946 7.22704 6.53649L10.6221 8.53356L15.6001 4.8C15.8021 4.64849 16.0724 4.62412 16.2983 4.73705C16.5241 4.84998 16.6668 5.08082 16.6668 5.33333V16.6667H17.3334C17.7016 16.6667 18.0001 16.9651 18.0001 17.3333C18.0001 17.7015 17.7016 18 17.3334 18H2.66678C2.29859 18 2.00011 17.7015 2.00011 17.3333V9.34591C1.99996 9.33789 1.99996 9.32989 2.00011 9.32189V2.66667ZM3.33344 9.73584V16.6667H15.3335V6.66667L11.0668 9.86667C10.8516 10.028 10.5606 10.0443 10.3288 9.90796L6.871 7.87396L3.33344 9.73584Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-data-area"; }
  static get registryIs() { return "wpp-icon-data-area-v3-5-0"; }
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
