import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCampaign {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-campaign", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.25 8C9.25 7.58579 9.58579 7.25 10 7.25H14.5C14.9142 7.25 15.25 7.58579 15.25 8C15.25 8.41421 14.9142 8.75 14.5 8.75H10C9.58579 8.75 9.25 8.41421 9.25 8Z", fill: "currentColor" }), h("path", { d: "M8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967L6 7.43934L5.78033 7.21967C5.48744 6.92678 5.01256 6.92678 4.71967 7.21967C4.42678 7.51256 4.42678 7.98744 4.71967 8.28033L5.46967 9.03033C5.76256 9.32322 6.23744 9.32322 6.53033 9.03033L8.03033 7.53033C8.32322 7.23744 8.32322 6.76256 8.03033 6.46967Z", fill: "currentColor" }), h("path", { d: "M6.96967 10.4697C7.26256 10.1768 7.73744 10.1768 8.03033 10.4697C8.32322 10.7626 8.32322 11.2374 8.03033 11.5303L6.53033 13.0303C6.23744 13.3232 5.76256 13.3232 5.46967 13.0303L4.71967 12.2803C4.42678 11.9874 4.42678 11.5126 4.71967 11.2197C5.01256 10.9268 5.48744 10.9268 5.78033 11.2197L6 11.4393L6.96967 10.4697Z", fill: "currentColor" }), h("path", { d: "M10 11.25C9.58579 11.25 9.25 11.5858 9.25 12C9.25 12.4142 9.58579 12.75 10 12.75H14.5C14.9142 12.75 15.25 12.4142 15.25 12C15.25 11.5858 14.9142 11.25 14.5 11.25H10Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4 3.5C2.89543 3.5 2 4.39543 2 5.5V14.5C2 15.6046 2.89543 16.5 4 16.5H16C17.1046 16.5 18 15.6046 18 14.5V5.5C18 4.39543 17.1046 3.5 16 3.5H4ZM16 5H4C3.72386 5 3.5 5.22386 3.5 5.5V14.5C3.5 14.7761 3.72386 15 4 15H16C16.2761 15 16.5 14.7761 16.5 14.5V5.5C16.5 5.22386 16.2761 5 16 5Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-campaign"; }
  static get registryIs() { return "wpp-icon-campaign-v3-6-0"; }
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
