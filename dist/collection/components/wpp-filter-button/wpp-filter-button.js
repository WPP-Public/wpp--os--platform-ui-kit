import { h, Host } from '@stencil/core';
/**
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part icon - Icon element
 * @part text - Main text content
 * @part inner - Content slot element
 * @part counter - counter text element
 */
export class WppFilterButton {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-filter-button': true,
      'wpp-disabled': this.disabled,
    });
    this.buttonCssClasses = () => ({
      button: true,
      disabled: this.disabled,
      primary: true,
    });
    this.counter = 0;
    this.name = undefined;
    this.ariaProps = {};
    this.disabled = false;
    this.autoFocus = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "button, icon, text, inner, counter", "aria-disabled": this.disabled, tabIndex: this.disabled ? -1 : 0 }, h("button", { class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled, name: this.name, type: "button", "data-testid": "wppFilterButton", "aria-label": this.ariaProps.label, tabIndex: -1, part: "button" }, h("wpp-icon-tune-v2-22-0", { class: "icon", part: "icon" }), h("span", { class: "text", part: "text" }, h("slot", { part: "inner" })), this.counter > 0 && (h("wpp-typography-v2-22-0", { class: "counter", type: "s-body", part: "counter" }, `(${this.counter})`)))));
  }
  static get is() { return "wpp-filter-button"; }
  static get registryIs() { return "wpp-filter-button-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-filter-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-filter-button.css"]
    };
  }
  static get properties() {
    return {
      "counter": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the number of elements within a specific section."
        },
        "attribute": "counter",
        "reflect": false,
        "defaultValue": "0"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the button name."
        },
        "attribute": "name",
        "reflect": false
      },
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
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "autoFocus": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the button should be in focus on page load."
        },
        "attribute": "auto-focus",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
}
