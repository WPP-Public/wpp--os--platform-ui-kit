import { h, Host } from '@stencil/core';
/**
 * @part button - Button element
 * @part icon - Icon element
 */
export class WppBackToTopButton {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-back-to-top-button': true,
    });
    this.ariaProps = {};
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "button, icon", tabIndex: 0 }, h("button", { type: "button", part: "button", "data-testid": "wppBackToTopButton", "aria-label": this.ariaProps.label }, h("wpp-icon-arrow-v2-22-0", { direction: "top", class: "icon", part: "icon" }))));
  }
  static get is() { return "wpp-back-to-top-button"; }
  static get registryIs() { return "wpp-back-to-top-button-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-back-to-top-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-back-to-top-button.css"]
    };
  }
  static get properties() {
    return {
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the button `aria-` props."
        },
        "defaultValue": "{}"
      }
    };
  }
}
