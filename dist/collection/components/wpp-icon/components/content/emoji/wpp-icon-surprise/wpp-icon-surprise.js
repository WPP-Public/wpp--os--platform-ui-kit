import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSurprise {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-surprise", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 2.00488C14.4183 2.00488 18 5.5866 18 10.0049C18 14.4232 14.4183 18.0049 10 18.0049C5.58172 18.0049 2 14.4232 2 10.0049C2 5.5866 5.58172 2.00488 10 2.00488ZM10 3.20488C6.24446 3.20488 3.2 6.24935 3.2 10.0049C3.2 13.7604 6.24446 16.8049 10 16.8049C13.7555 16.8049 16.8 13.7604 16.8 10.0049C16.8 6.24935 13.7555 3.20488 10 3.20488ZM10 10.8012C10.9941 10.8012 11.8 11.6071 11.8 12.6012C11.8 13.5953 10.9941 14.4012 10 14.4012C9.00589 14.4012 8.2 13.5953 8.2 12.6012C8.2 11.6071 9.00589 10.8012 10 10.8012ZM7.60036 7.40211C8.15233 7.40211 8.59979 7.84957 8.59979 8.40154C8.59979 8.95351 8.15233 9.40097 7.60036 9.40097C7.04839 9.40097 6.60093 8.95351 6.60093 8.40154C6.60093 7.84957 7.04839 7.40211 7.60036 7.40211ZM12.4004 7.40211C12.9523 7.40211 13.3998 7.84957 13.3998 8.40154C13.3998 8.95351 12.9523 9.40097 12.4004 9.40097C11.8484 9.40097 11.4009 8.95351 11.4009 8.40154C11.4009 7.84957 11.8484 7.40211 12.4004 7.40211Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-surprise"; }
  static get registryIs() { return "wpp-icon-surprise-v3-5-0"; }
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
