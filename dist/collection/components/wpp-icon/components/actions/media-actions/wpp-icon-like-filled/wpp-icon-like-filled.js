import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
// @deprecated - this component will be deleted in 4.0.0.
export class WppIconLikeFilled {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-like-filled component is deprecated. Please, use wpp-icon-thumbs-up-filled instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-like-filled", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.7727 4.87006C13.7727 2.91005 12.8576 1.5 11.3596 1.5C10.5359 1.5 10.2533 1.98268 9.95801 3.10495C9.89778 3.3368 9.86812 3.44968 9.83682 3.56093C9.7558 3.84887 9.6147 4.33909 9.41381 5.03058C9.40844 5.04911 9.40052 5.06656 9.39022 5.08268L7.08923 8.68308C6.545 9.53465 5.74197 10.1892 4.79816 10.5506L4.41828 10.696C3.4176 11.0791 2.83662 12.1256 3.04059 13.1775L3.36526 14.8519C3.55904 15.8513 4.31647 16.6466 5.30518 16.889L11.4275 18.3895C13.4592 18.8875 15.5127 17.6555 16.0295 15.6285L17.1652 11.1745C17.5211 9.7785 16.678 8.35824 15.2819 8.00229C15.0713 7.94859 14.8548 7.92142 14.6374 7.92142H13.174C13.5721 6.61079 13.7727 5.59963 13.7727 4.87006Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-like-filled"; }
  static get registryIs() { return "wpp-icon-like-filled-v3-3-1"; }
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
