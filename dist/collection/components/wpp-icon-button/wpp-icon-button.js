import { Host, h } from '@stencil/core';
/**
 * @slot - Icon slot. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 */
// @deprecated - This component is deprecated and will be deleted in v4.0.0. Use wpp-action-button instead.
export class WppIconButton {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-icon-button': true,
    });
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
    this.name = undefined;
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-button component is deprecated. Please, use wpp-action-button instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner" }, h("wpp-button-v3-6-0", { variant: "secondary", size: this.size, disabled: this.disabled, loading: this.loading, name: this.name, "data-testid": "wppIconButton", part: "wrapper" }, h("slot", { slot: "icon-start", part: "inner" }))));
  }
  static get is() { return "wpp-icon-button"; }
  static get registryIs() { return "wpp-icon-button-v3-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-icon-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-icon-button.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'m' | 's'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the button size. Setting this attribute changes the button height and padding."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
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
      "loading": {
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
          "text": "If the component is in loading state."
        },
        "attribute": "loading",
        "reflect": true,
        "defaultValue": "false"
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
      }
    };
  }
}
