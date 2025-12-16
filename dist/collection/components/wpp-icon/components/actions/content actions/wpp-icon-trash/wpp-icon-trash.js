import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconTrash {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-trash", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.99992 3.04169C10.6609 3.04169 11.2246 3.45739 11.4438 4.04169H8.55605C8.77527 3.45739 9.33893 3.04169 9.99992 3.04169ZM15.8227 4.04169H12.9935C12.7381 2.62013 11.4951 1.54169 9.99992 1.54169C8.50475 1.54169 7.26178 2.62013 7.00633 4.04169H4.17703C4.17066 4.04161 4.16426 4.04161 4.15786 4.04169H2.70825C2.29404 4.04169 1.95825 4.37747 1.95825 4.79169C1.95825 5.2059 2.29404 5.54169 2.70825 5.54169H3.48563L4.52421 16.2743C4.64392 17.513 5.68539 18.4583 6.92947 18.4583H13.0699C14.3143 18.4583 15.3554 17.5133 15.4752 16.2742L16.5141 5.54169H17.2916C17.7058 5.54169 18.0416 5.2059 18.0416 4.79169C18.0416 4.37747 17.7058 4.04169 17.2916 4.04169H15.8419C15.8355 4.04161 15.8291 4.04161 15.8227 4.04169ZM15.0071 5.54169H4.99264L6.01724 16.1299C6.06259 16.5995 6.45777 16.9583 6.92947 16.9583H13.0699C13.542 16.9583 13.9367 16.6 13.9821 16.13L15.0071 5.54169ZM9.29175 8.125C9.29175 7.71079 8.95596 7.375 8.54175 7.375C8.12753 7.375 7.79175 7.71079 7.79175 8.125V14.375C7.79175 14.7892 8.12753 15.125 8.54175 15.125C8.95596 15.125 9.29175 14.7892 9.29175 14.375V8.125ZM11.4583 7.375C11.8725 7.375 12.2083 7.71079 12.2083 8.125V14.375C12.2083 14.7892 11.8725 15.125 11.4583 15.125C11.044 15.125 10.7083 14.7892 10.7083 14.375V8.125C10.7083 7.71079 11.044 7.375 11.4583 7.375Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-trash"; }
  static get registryIs() { return "wpp-icon-trash-v3-4-0"; }
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
