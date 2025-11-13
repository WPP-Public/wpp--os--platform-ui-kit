import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconBranchRequest {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-branch-request", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.7928 3.18035C13.0857 2.88745 13.0857 2.41258 12.7928 2.11969C12.4999 1.8268 12.025 1.8268 11.7321 2.1197L9.47064 4.38124C9.17775 4.67413 9.17775 5.149 9.47064 5.44189L11.7321 7.70343C12.025 7.99632 12.4999 7.99633 12.7928 7.70344C13.0857 7.41055 13.0857 6.93567 12.7928 6.64278L11.8116 5.66156H12.8274C13.2283 5.66156 13.6127 5.82081 13.8962 6.1043C14.1797 6.38775 14.3389 6.77221 14.3389 7.1731V12.171C13.0384 12.5042 12.0771 13.6841 12.0771 15.0885C12.0771 16.7517 13.4254 18.1 15.0886 18.1C16.7519 18.1 18.1001 16.7517 18.1001 15.0885C18.1001 13.6843 17.1391 12.5046 15.8389 12.1712V7.1731C15.8389 6.37441 15.5217 5.6084 14.9569 5.04361C14.3921 4.47885 13.6261 4.16156 12.8274 4.16156H11.8116L12.7928 3.18035ZM15.0886 13.5769C14.2539 13.5769 13.5771 14.2537 13.5771 15.0885C13.5771 15.9233 14.2539 16.6 15.0886 16.6C15.9234 16.6 16.6001 15.9233 16.6001 15.0885C16.6001 14.2537 15.9234 13.5769 15.0886 13.5769Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.91189 1.90002C3.24867 1.90002 1.90039 3.24838 1.90039 4.91156C1.90039 6.3159 2.86165 7.49578 4.16211 7.82902V12.171C2.86165 12.5043 1.90039 13.6841 1.90039 15.0885C1.90039 16.7517 3.24867 18.1 4.91189 18.1C6.57511 18.1 7.92338 16.7517 7.92338 15.0885C7.92338 13.6843 6.96234 12.5045 5.66211 12.1711V7.8289C6.96234 7.49551 7.92338 6.31574 7.92338 4.91156C7.92338 3.24838 6.57511 1.90002 4.91189 1.90002ZM3.40039 4.91156C3.40039 4.07677 4.07713 3.40002 4.91189 3.40002C5.74665 3.40002 6.42338 4.07677 6.42338 4.91156C6.42338 5.74636 5.74665 6.4231 4.91189 6.4231C4.07713 6.4231 3.40039 5.74636 3.40039 4.91156ZM3.40039 15.0885C3.40039 14.2537 4.07713 13.5769 4.91189 13.5769C5.74665 13.5769 6.42338 14.2537 6.42338 15.0885C6.42338 15.9233 5.74665 16.6 4.91189 16.6C4.07713 16.6 3.40039 15.9233 3.40039 15.0885Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-branch-request"; }
  static get registryIs() { return "wpp-icon-branch-request-v3-3-1"; }
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
