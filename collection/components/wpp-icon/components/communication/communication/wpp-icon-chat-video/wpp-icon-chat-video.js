import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconChatVideo {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-chat-video", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", fill: "currentColor" }), h("path", { d: "M9.99931 6.79959C10.8829 6.79959 11.5992 7.51587 11.5992 8.39945V11.5992C11.5992 12.4828 10.8829 13.199 9.99931 13.199H7.59952C6.71594 13.199 5.99966 12.4828 5.99966 11.5992V8.39945C5.99966 7.51587 6.71594 6.79959 7.59952 6.79959H9.99931ZM12.3991 10.9287V9.06993L13.7865 7.75653C14.1689 7.3945 14.7989 7.6656 14.7989 8.19221V11.8064C14.7989 12.333 14.1689 12.6042 13.7865 12.2421L12.3991 10.9287ZM17.9986 9.99931C17.9986 5.58141 14.4172 2 9.99931 2C5.58141 2 2 5.58141 2 9.99931C2 11.2954 2.30907 12.5479 2.89161 13.6728L2.03756 16.7308C1.9884 16.9066 1.98837 17.0928 2.03752 17.2688C2.18605 17.8007 2.73763 18.1114 3.26952 17.9629L6.32992 17.1091C7.45379 17.6903 8.70479 17.9986 9.99931 17.9986C14.4172 17.9986 17.9986 14.4172 17.9986 9.99931ZM3.1999 9.99931C3.1999 6.2441 6.2441 3.1999 9.99931 3.1999C13.7545 3.1999 16.7987 6.2441 16.7987 9.99931C16.7987 13.7545 13.7545 16.7987 9.99931 16.7987C8.82516 16.7987 7.69556 16.5013 6.69327 15.9424L6.47766 15.8222L3.28866 16.7118L4.17875 13.5248L4.05825 13.309C3.49809 12.3058 3.1999 11.1749 3.1999 9.99931Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-chat-video"; }
  static get registryIs() { return "wpp-icon-chat-video-v3-3-0"; }
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
