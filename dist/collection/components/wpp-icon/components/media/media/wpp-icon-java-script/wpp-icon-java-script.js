import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconJavaScript {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-java-script", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11.5556 9.41667C11.5556 8.66495 12.1649 8.05556 12.9167 8.05556H14.0833C14.4055 8.05556 14.6667 8.31672 14.6667 8.63889C14.6667 8.96106 14.4055 9.22222 14.0833 9.22222H12.9167C12.8093 9.22222 12.7222 9.30928 12.7222 9.41667V10.5833C12.7222 10.6907 12.8093 10.7778 12.9167 10.7778H13.3056C14.0573 10.7778 14.6667 11.3872 14.6667 12.1389V13.3056C14.6667 14.0573 14.0573 14.6667 13.3056 14.6667H12.1389C11.8167 14.6667 11.5556 14.4055 11.5556 14.0833C11.5556 13.7612 11.8167 13.5 12.1389 13.5H13.3056C13.4129 13.5 13.5 13.4129 13.5 13.3056V12.1389C13.5 12.0315 13.4129 11.9444 13.3056 11.9444H12.9167C12.1649 11.9444 11.5556 11.3351 11.5556 10.5833V9.41667ZM10.5833 8.63889C10.5833 8.31672 10.3222 8.05556 10 8.05556C9.67783 8.05556 9.41667 8.31672 9.41667 8.63889V13.3056C9.41667 13.4129 9.32961 13.5 9.22222 13.5H8.25C7.92783 13.5 7.66667 13.7612 7.66667 14.0833C7.66667 14.4055 7.92783 14.6667 8.25 14.6667H9.22222C9.97394 14.6667 10.5833 14.0573 10.5833 13.3056V8.63889ZM3 5.52778V14.4722C3 15.8683 4.13172 17 5.52778 17H14.4722C15.8683 17 17 15.8683 17 14.4722V5.52778C17 4.13172 15.8683 3 14.4722 3H5.52778C4.13172 3 3 4.13172 3 5.52778ZM5.52778 4.16667H14.4722C15.2239 4.16667 15.8333 4.77606 15.8333 5.52778V14.4722C15.8333 15.2239 15.2239 15.8333 14.4722 15.8333H5.52778C4.77606 15.8333 4.16667 15.2239 4.16667 14.4722V5.52778C4.16667 4.77606 4.77606 4.16667 5.52778 4.16667Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-java-script"; }
  static get registryIs() { return "wpp-icon-java-script-v3-6-0"; }
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
