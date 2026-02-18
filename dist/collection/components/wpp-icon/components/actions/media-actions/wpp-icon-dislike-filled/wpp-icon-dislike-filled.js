import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
// @deprecated - this component will be deleted in 4.0.0.
export class WppIconDislikeFilled {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-dislike-filled component is deprecated. Please, use wpp-icon-thumbs-down-filled instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-dislike-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.14038 18.5C7.64241 18.5 6.72731 17.09 6.72731 15.1299C6.72731 14.4004 6.92789 13.3892 7.32604 12.0786H5.86257C5.64521 12.0786 5.42869 12.0514 5.21807 11.9977C3.82204 11.6418 2.9789 10.2215 3.33485 8.82547L4.4705 4.37146C4.98732 2.34452 7.0408 1.11251 9.07246 1.61046L15.1948 3.11103C16.1835 3.35337 16.941 4.14871 17.1347 5.14808L17.4594 6.82246C17.6634 7.87439 17.0824 8.92086 16.0817 9.30399L15.7018 9.44943C14.758 9.81079 13.955 10.4653 13.4108 11.3169L11.1098 14.9173C11.0995 14.9334 11.0916 14.9509 11.0862 14.9694C10.8853 15.6609 10.7442 16.1511 10.6632 16.4391L10.4977 17.0586C10.2171 18.0644 9.92288 18.5 9.14038 18.5Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-dislike-filled"; }
  static get registryIs() { return "wpp-icon-dislike-filled-v3-5-0"; }
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
