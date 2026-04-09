import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconNotificationOn {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-notification-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.3748 7.91619C16.3748 4.29349 13.3524 1.37597 9.69242 1.54827C6.23933 1.71092 3.62478 4.67394 3.62478 8.07494V11.0734L2.53356 13.2691L2.52648 13.2837C2.03291 14.3333 2.79766 15.5412 3.95894 15.5412H7.37792C7.44314 16.9328 8.59225 18.0413 10 18.0413C11.4077 18.0413 12.5569 16.9328 12.6221 15.5412H16.0402C17.2009 15.5412 17.9669 14.3339 17.4731 13.2837L17.466 13.2691L16.3748 11.0734V7.91619ZM11.1181 15.5412H8.88186C8.94404 16.1036 9.42103 16.5413 10 16.5413C10.579 16.5413 11.056 16.1036 11.1181 15.5412ZM5.12478 8.07494C5.12478 5.41845 7.16522 3.16898 9.76296 3.04662C12.5638 2.91477 14.8748 5.14557 14.8748 7.91619V11.2495C14.8748 11.3654 14.9016 11.4796 14.9531 11.5833L16.1173 13.9256C16.14 13.9804 16.0999 14.0412 16.0402 14.0412H3.95894C3.89986 14.0412 3.85926 13.9809 3.88228 13.9257L5.0464 11.5833C5.09795 11.4796 5.12478 11.3654 5.12478 11.2495V8.07494Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-notification-on"; }
  static get registryIs() { return "wpp-icon-notification-on-v3-6-0"; }
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
