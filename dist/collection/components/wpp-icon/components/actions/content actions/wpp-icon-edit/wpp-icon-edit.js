import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconEdit {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-edit", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.0897 3.90964C15.4885 3.30811 14.5115 3.30811 13.9102 3.90964L4.68759 13.1318C4.67696 13.1425 4.67015 13.1545 4.66657 13.1671L3.80039 16.1996L6.83048 15.334C6.84549 15.3297 6.8584 15.3218 6.86777 15.3124L16.0898 6.08995C16.6919 5.48784 16.6918 4.51175 16.0897 3.90964ZM17.1506 2.84923C15.9635 1.66159 14.0364 1.66159 12.8493 2.84923L3.62695 12.0712C3.43686 12.2613 3.29786 12.4966 3.22391 12.7563L1.98736 17.0855C1.91255 17.3474 1.9856 17.6293 2.17819 17.8219C2.37078 18.0144 2.65264 18.0875 2.91452 18.0127L7.24489 16.7757C7.50224 16.7017 7.73786 16.5637 7.92843 16.3731L17.1505 7.1506C18.3384 5.96274 18.3384 4.03713 17.1506 2.84923Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.8403 8.4006L11.5994 5.15976L12.6601 4.0991L15.9009 7.33994L14.8403 8.4006Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-edit"; }
  static get registryIs() { return "wpp-icon-edit-v2-22-0"; }
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
