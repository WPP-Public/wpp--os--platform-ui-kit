import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
// @deprecated - this component will be deleted in 4.0.0.
export class WppIconNotificationOff {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-notification-off component is deprecated. Please, use wpp-icon-notification instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-notification-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.23555 5.29622L1.96967 3.03034C1.67678 2.73744 1.67678 2.26257 1.96967 1.96968C2.26256 1.67678 2.73744 1.67678 3.03033 1.96968L18.0303 16.9697C18.3232 17.2626 18.3232 17.7374 18.0303 18.0303C17.7374 18.3232 17.2626 18.3232 16.9697 18.0303L14.4805 15.5412H12.6221C12.5569 16.9328 11.4077 18.0413 10 18.0413C8.59225 18.0413 7.44314 16.9328 7.37792 15.5412H3.95894C2.79766 15.5412 2.03291 14.3333 2.52648 13.2837L2.53356 13.2691L3.62478 11.0734V8.07494C3.62478 7.09328 3.8426 6.1481 4.23555 5.29622ZM12.9805 14.0412H3.95894C3.89986 14.0412 3.85926 13.9809 3.88228 13.9257L5.0464 11.5833C5.09795 11.4796 5.12478 11.3654 5.12478 11.2495V8.07494C5.12478 7.50894 5.21741 6.9614 5.38832 6.44899L12.9805 14.0412ZM14.9531 11.5833L15.4881 12.6596L17.469 14.6406C17.6639 14.2347 17.6896 13.7441 17.4731 13.2837L17.466 13.2691L16.3748 11.0734V7.91619C16.3748 4.29349 13.3524 1.37597 9.69242 1.54827C8.23494 1.61692 6.92685 2.18446 5.90169 3.07326L6.96668 4.13825C7.73957 3.49905 8.70505 3.09645 9.76296 3.04662C12.5638 2.91477 14.8748 5.14557 14.8748 7.91619V11.2495C14.8748 11.3654 14.9016 11.4796 14.9531 11.5833ZM8.88186 15.5412C8.94404 16.1036 9.42103 16.5413 10 16.5413C10.579 16.5413 11.056 16.1036 11.1181 15.5412H8.88186Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-notification-off"; }
  static get registryIs() { return "wpp-icon-notification-off-v3-6-0"; }
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
