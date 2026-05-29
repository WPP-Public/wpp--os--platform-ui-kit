import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDataScatter {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-scatter", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2 2.66667C2 2.29848 2.29848 2 2.66667 2C3.03486 2 3.33333 2.29848 3.33333 2.66667V16.6667H17.3333C17.7015 16.6667 18 16.9651 18 17.3333C18 17.7015 17.7015 18 17.3333 18H2.66667C2.29848 18 2 17.7015 2 17.3333V2.66667ZM14.4444 2.88889C12.9717 2.88889 11.7778 4.0828 11.7778 5.55556C11.7778 7.02832 12.9717 8.22222 14.4444 8.22222C15.9172 8.22222 17.1111 7.02832 17.1111 5.55556C17.1111 4.0828 15.9172 2.88889 14.4444 2.88889ZM13.1111 5.55556C13.1111 4.81918 13.7081 4.22222 14.4444 4.22222C15.1808 4.22222 15.7778 4.81918 15.7778 5.55556C15.7778 6.29194 15.1808 6.88889 14.4444 6.88889C13.7081 6.88889 13.1111 6.29194 13.1111 5.55556ZM4.66667 7.33333C4.66667 5.86057 5.86057 4.66667 7.33333 4.66667C8.80609 4.66667 10 5.86057 10 7.33333C10 8.80609 8.80609 10 7.33333 10C5.86057 10 4.66667 8.80609 4.66667 7.33333ZM7.33333 6C6.59695 6 6 6.59695 6 7.33333C6 8.06971 6.59695 8.66667 7.33333 8.66667C8.06971 8.66667 8.66667 8.06971 8.66667 7.33333C8.66667 6.59695 8.06971 6 7.33333 6ZM12.6667 10C11.1939 10 10 11.1939 10 12.6667C10 14.1394 11.1939 15.3333 12.6667 15.3333C14.1394 15.3333 15.3333 14.1394 15.3333 12.6667C15.3333 11.1939 14.1394 10 12.6667 10ZM11.3333 12.6667C11.3333 11.9303 11.9303 11.3333 12.6667 11.3333C13.403 11.3333 14 11.9303 14 12.6667C14 13.403 13.403 14 12.6667 14C11.9303 14 11.3333 13.403 11.3333 12.6667Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-data-scatter"; }
  static get registryIs() { return "wpp-icon-data-scatter-v4-1-0"; }
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
