import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
var ObjectAlignmentCenterDirectionIconPath;
(function (ObjectAlignmentCenterDirectionIconPath) {
  ObjectAlignmentCenterDirectionIconPath["horizontal"] = "M3.33333 2.66667C3.33333 2.29848 3.03486 2 2.66667 2C2.29848 2 2 2.29848 2 2.66667V17.3333C2 17.7015 2.29848 18 2.66667 18C3.03486 18 3.33333 17.7015 3.33333 17.3333V2.66667ZM16.6667 2.66667C16.6667 2.29848 16.9651 2 17.3333 2C17.7015 2 18 2.29848 18 2.66667V17.3333C18 17.7015 17.7015 18 17.3333 18C16.9651 18 16.6667 17.7015 16.6667 17.3333V2.66667ZM8.44444 3.77778C7.33988 3.77778 6.44444 4.67321 6.44444 5.77778V14.2222C6.44444 15.3268 7.33987 16.2222 8.44444 16.2222H11.5556C12.6601 16.2222 13.5556 15.3268 13.5556 14.2222V5.77778C13.5556 4.67321 12.6601 3.77778 11.5556 3.77778H8.44444ZM7.77778 5.77778C7.77778 5.40959 8.07625 5.11111 8.44444 5.11111H11.5556C11.9237 5.11111 12.2222 5.40959 12.2222 5.77778V14.2222C12.2222 14.5904 11.9237 14.8889 11.5556 14.8889H8.44444C8.07625 14.8889 7.77778 14.5904 7.77778 14.2222V5.77778Z";
  ObjectAlignmentCenterDirectionIconPath["vertical"] = "M18 2.66667C18 3.03486 17.7015 3.33333 17.3333 3.33333H2.66667C2.29848 3.33333 2 3.03486 2 2.66667C2 2.29848 2.29848 2 2.66667 2H17.3333C17.7015 2 18 2.29848 18 2.66667ZM18 17.3333C18 17.7015 17.7015 18 17.3333 18H2.66667C2.29848 18 2 17.7015 2 17.3333C2 16.9651 2.29848 16.6667 2.66667 16.6667H17.3333C17.7015 16.6667 18 16.9651 18 17.3333ZM5.77778 6.44444C4.67321 6.44444 3.77778 7.33987 3.77778 8.44444V11.5556C3.77778 12.6601 4.67321 13.5556 5.77778 13.5556H14.2222C15.3268 13.5556 16.2222 12.6601 16.2222 11.5556V8.44444C16.2222 7.33988 15.3268 6.44444 14.2222 6.44444H5.77778ZM5.11111 8.44444C5.11111 8.07625 5.40959 7.77778 5.77778 7.77778H14.2222C14.5904 7.77778 14.8889 8.07625 14.8889 8.44444V11.5556C14.8889 11.9237 14.5904 12.2222 14.2222 12.2222H5.77778C5.40959 12.2222 5.11111 11.9237 5.11111 11.5556V8.44444Z";
})(ObjectAlignmentCenterDirectionIconPath || (ObjectAlignmentCenterDirectionIconPath = {}));
export class WppIconObjectAlignmentCenter {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'vertical';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-object-alignment-center", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: ObjectAlignmentCenterDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-object-alignment-center"; }
  static get registryIs() { return "wpp-icon-object-alignment-center-v4-1-0"; }
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
      },
      "direction": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'horizontal' | 'vertical'",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon direction."
        },
        "attribute": "direction",
        "reflect": false,
        "defaultValue": "'vertical'"
      }
    };
  }
}
