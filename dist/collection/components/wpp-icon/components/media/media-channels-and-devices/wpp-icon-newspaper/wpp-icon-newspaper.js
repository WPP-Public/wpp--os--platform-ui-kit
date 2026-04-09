import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconNewspaper {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-newspaper", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.75 6C4.75 5.58579 5.08579 5.25 5.5 5.25H11C11.4142 5.25 11.75 5.58579 11.75 6C11.75 6.41421 11.4142 6.75 11 6.75H5.5C5.08579 6.75 4.75 6.41421 4.75 6Z", fill: "currentColor" }), h("path", { d: "M5.5 7.75C5.08579 7.75 4.75 8.08579 4.75 8.5C4.75 8.91421 5.08579 9.25 5.5 9.25H9.5C9.91421 9.25 10.25 8.91421 10.25 8.5C10.25 8.08579 9.91421 7.75 9.5 7.75H5.5Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2.72595 2.72595C3.0307 2.42121 3.44402 2.25 3.875 2.25H12.625C13.056 2.25 13.4693 2.42121 13.774 2.72595C14.0788 3.0307 14.25 3.44402 14.25 3.875V4H16.125C16.556 4 16.9693 4.17121 17.274 4.47595C17.5788 4.7807 17.75 5.19402 17.75 5.625V15.25C17.75 15.913 17.4866 16.5489 17.0178 17.0178C16.5489 17.4866 15.913 17.75 15.25 17.75H5.625C4.72989 17.75 3.87145 17.3944 3.23851 16.7615C2.60558 16.1286 2.25 15.2701 2.25 14.375V3.875C2.25 3.44402 2.42121 3.0307 2.72595 2.72595ZM12.9587 16.25H5.625C5.12772 16.25 4.65081 16.0525 4.29917 15.7008C3.94754 15.3492 3.75 14.8723 3.75 14.375V3.875C3.75 3.84185 3.76317 3.81005 3.78661 3.78661C3.81005 3.76317 3.84185 3.75 3.875 3.75H12.625C12.6582 3.75 12.6899 3.76317 12.7134 3.78661C12.7368 3.81005 12.75 3.84185 12.75 3.875V15.25C12.75 15.5975 12.8224 15.9376 12.9587 16.25ZM14.25 5.5V15.25C14.25 15.5152 14.3554 15.7696 14.5429 15.9571C14.7304 16.1446 14.9848 16.25 15.25 16.25C15.5152 16.25 15.7696 16.1446 15.9571 15.9571C16.1446 15.7696 16.25 15.5152 16.25 15.25V5.625C16.25 5.59185 16.2368 5.56005 16.2134 5.53661C16.1899 5.51317 16.1582 5.5 16.125 5.5H14.25Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-newspaper"; }
  static get registryIs() { return "wpp-icon-newspaper-v4-0-0"; }
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
