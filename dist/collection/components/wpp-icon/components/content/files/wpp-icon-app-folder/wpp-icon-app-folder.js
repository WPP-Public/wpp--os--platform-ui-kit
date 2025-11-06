import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconAppFolder {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-app-folder", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.5556 2C16.9056 2 18 3.09441 18 4.44444V15.5556C18 16.9056 16.9056 18 15.5556 18H4.44444C3.09441 18 2 16.9056 2 15.5556V4.44444C2 3.09441 3.09441 2 4.44444 2H15.5556ZM15.5556 3.33333H4.44444C3.83079 3.33333 3.33333 3.83079 3.33333 4.44444V15.5556C3.33333 16.1692 3.83079 16.6667 4.44444 16.6667H15.5556C16.1692 16.6667 16.6667 16.1692 16.6667 15.5556V4.44444C16.6667 3.83079 16.1692 3.33333 15.5556 3.33333ZM8.00169 10.4444C8.8608 10.4444 9.55724 11.1409 9.55724 12V13.7778C9.55724 14.6369 8.8608 15.3333 8.00169 15.3333H6.22391C5.3648 15.3333 4.66835 14.6369 4.66835 13.7778V12C4.66835 11.1409 5.3648 10.4444 6.22391 10.4444H8.00169ZM13.7772 10.4444C14.6363 10.4444 15.3328 11.1409 15.3328 12V13.7778C15.3328 14.6369 14.6363 15.3333 13.7772 15.3333H11.9994C11.1403 15.3333 10.4439 14.6369 10.4439 13.7778V12C10.4439 11.1409 11.1403 10.4444 11.9994 10.4444H13.7772ZM8.00169 11.7778H6.22391C6.10118 11.7778 6.00169 11.8773 6.00169 12V13.7778C6.00169 13.9005 6.10118 14 6.22391 14H8.00169C8.12441 14 8.22391 13.9005 8.22391 13.7778V12C8.22391 11.8773 8.12441 11.7778 8.00169 11.7778ZM13.7772 11.7778H11.9994C11.8767 11.7778 11.7772 11.8773 11.7772 12V13.7778C11.7772 13.9005 11.8767 14 11.9994 14H13.7772C13.8999 14 13.9994 13.9005 13.9994 13.7778V12C13.9994 11.8773 13.8999 11.7778 13.7772 11.7778ZM8.00056 4.66667C8.85967 4.66667 9.55612 5.36311 9.55612 6.22222V8C9.55612 8.85911 8.85967 9.55556 8.00056 9.55556H6.22278C5.36367 9.55556 4.66723 8.85911 4.66723 8V6.22222C4.66723 5.36311 5.36367 4.66667 6.22278 4.66667H8.00056ZM13.7761 4.66667C14.6352 4.66667 15.3316 5.36311 15.3316 6.22222V8C15.3316 8.85911 14.6352 9.55556 13.7761 9.55556H11.9983C11.1392 9.55556 10.4428 8.85911 10.4428 8V6.22222C10.4428 5.36311 11.1392 4.66667 11.9983 4.66667H13.7761ZM8.00056 6H6.22278C6.10005 6 6.00056 6.09949 6.00056 6.22222V8C6.00056 8.12273 6.10005 8.22222 6.22278 8.22222H8.00056C8.12329 8.22222 8.22278 8.12273 8.22278 8V6.22222C8.22278 6.09949 8.12329 6 8.00056 6ZM13.7761 6H11.9983C11.8756 6 11.7761 6.09949 11.7761 6.22222V8C11.7761 8.12273 11.8756 8.22222 11.9983 8.22222H13.7761C13.8988 8.22222 13.9983 8.12273 13.9983 8V6.22222C13.9983 6.09949 13.8988 6 13.7761 6Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-app-folder"; }
  static get registryIs() { return "wpp-icon-app-folder-v2-22-0"; }
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
