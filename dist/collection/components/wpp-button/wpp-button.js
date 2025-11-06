import { h, Host } from '@stencil/core';
import { getSlotEmptyStates, closestElement } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
/**
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a plus icon.
 * @slot icon-end - Can contain an icon that will be placed after the main content, e.g. a plus icon. For `wpp-button` with an `aria-expanded="true"` attribute: if you place an arrow icon with the `direction="down"` attribute in this slot, the icon will be rotated.
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - spinner wrapper element
 * @part spinner - spinner element
 * @part text - Main text content
 * @part inner - Content slot element
 */
export class WppButton {
  constructor() {
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        start: '[slot="icon-start"]',
        end: '[slot="icon-end"]',
      });
      this.hasIconStartSlot = !emptyStates.start;
      this.hasIconEndSlot = !emptyStates.end;
      const hasSingleIcon = this.hasIconStartSlot !== this.hasIconEndSlot;
      const hasMainSlot = !emptyStates.main;
      this.isIconOnly = hasSingleIcon && !hasMainSlot;
    };
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.onKeyDown = (event) => {
      if (this.disabled || this.loading)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
        this.host.dispatchEvent(clickEvent);
      }
    };
    this.handleClick = (e) => {
      if (this.disabled || this.loading) {
        e.stopPropagation();
        return;
      }
      if (['submit', 'reset'].includes(this.type)) {
        let formEl;
        if (this.form instanceof HTMLFormElement) {
          formEl = this.form;
        }
        else if (typeof this.form === 'string') {
          formEl = document.getElementById(this.form);
        }
        else {
          formEl = closestElement('form', e.currentTarget);
        }
        if (this.type === 'submit') {
          formEl?.requestSubmit();
        }
        else {
          formEl?.reset();
        }
      }
    };
    this.getSpinnerColor = () => {
      if (this.inverted && (this.variant === 'primary' || this.variant === 'secondary')) {
        return this.variant === 'primary' ? 'var(--wpp-grey-color-1000)' : 'var(--wpp-grey-color-000)';
      }
      switch (this.variant) {
        case 'secondary':
          return 'var(--wpp-primary-color-500)';
        case 'destructive-secondary':
          return 'var(--wpp-danger-color-500)';
        default:
          return 'var(--wpp-grey-color-000)';
      }
    };
    this.hostCssClasses = () => ({
      'wpp-button': true,
      'wpp-disabled': this.disabled,
      'wpp-loading': this.loading,
    });
    this.buttonCssClasses = () => ({
      button: true,
      loading: this.loading,
      disabled: this.disabled,
      inverted: this.inverted && (this.variant === 'primary' || this.variant === 'secondary'),
      [`${this.variant}`]: true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      'with-icon-start': this.hasIconStartSlot,
      'with-icon-end': this.hasIconEndSlot,
      'with-icon-only': this.isIconOnly,
      'size-s': this.size === 's',
      'size-m': this.size === 'm',
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
    });
    this.iconEndCssClasses = () => ({
      'icon-end': true,
      'slot-hidden': !this.hasIconEndSlot,
    });
    this.loaderCssClasses = () => ({
      loader: true,
    });
    this.contentCssClasses = () => ({
      content: true,
      hide: this.loading,
    });
    this.hasIconStartSlot = false;
    this.hasIconEndSlot = false;
    this.isIconOnly = false;
    this.focusType = undefined;
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
    this.variant = 'primary';
    this.inverted = false;
    this.autoFocus = false;
    this.name = undefined;
    this.form = undefined;
    this.formAction = undefined;
    this.formEncType = undefined;
    this.formMethod = undefined;
    this.formNoValidate = false;
    this.formTarget = undefined;
    this.type = 'button';
    this.value = undefined;
    this.ariaProps = {};
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onClick: this.handleClick, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, onBlur: this.onBlur, onMouseDown: this.onMouseDown, exportparts: "button, spinner-wrapper, spinner, text, inner, icon-start, icon-end, icon-start-wrapper, icon-end-wrapper", "aria-disabled": this.disabled || this.loading, tabIndex: this.disabled || this.loading ? -1 : 0 }, h("button", { class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, formAction: this.formAction, formEncType: this.formEncType, formMethod: this.formMethod, formNoValidate: this.formNoValidate, formTarget: this.formTarget, value: this.value, name: this.name, type: this.type, part: "button", "data-testid": "wppButton", "aria-label": this.ariaProps.label, tabIndex: -1 }, this.loading && (h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, h("wpp-spinner-v2-22-0", { color: this.getSpinnerColor(), part: "spinner" }))), h("div", { class: this.contentCssClasses() }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("span", { class: "truncate", part: "text" }, h("slot", { onSlotchange: this.updateSlotData, part: "inner" })), h(WrappedSlot, { wrapperClass: this.iconEndCssClasses(), name: "icon-end", onSlotchange: this.updateSlotData })))));
  }
  static get is() { return "wpp-button"; }
  static get registryIs() { return "wpp-button-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-button.css"]
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
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'primary' | 'secondary' | 'destructive' | 'destructive-secondary'",
          "resolved": "\"destructive\" | \"destructive-secondary\" | \"primary\" | \"secondary\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the button type."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      },
      "inverted": {
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
          "text": "If the component is inverted.\nThis prop can only be used together with the following variants: \"primary\" and \"secondary\"."
        },
        "attribute": "inverted",
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
      "form": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | HTMLFormElement",
          "resolved": "HTMLFormElement | string | undefined",
          "references": {
            "HTMLFormElement": {
              "location": "global",
              "id": "global::HTMLFormElement"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the form to which the button belongs.\nAccepts id of form or FormElement reference"
        },
        "attribute": "form",
        "reflect": false
      },
      "formAction": {
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
          "text": "Defines where to send the form-data when the form is submitted. Only for buttons with `type=\"submit\"`."
        },
        "attribute": "form-action",
        "reflect": false
      },
      "formEncType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'",
          "resolved": "\"application/x-www-form-urlencoded\" | \"multipart/form-data\" | \"text/plain\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines how to encode the form-data before sending it to the server. Only for buttons with `type=\"submit\"`."
        },
        "attribute": "form-enc-type",
        "reflect": false
      },
      "formMethod": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'get' | 'post'",
          "resolved": "\"get\" | \"post\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines which HTTP method to use when sending the form-data. Only for buttons with `type=\"submit\"`."
        },
        "attribute": "form-method",
        "reflect": false
      },
      "formNoValidate": {
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
          "text": "If the form-data is validated after submission. Only for buttons with `type=\"submit\"`."
        },
        "attribute": "form-no-validate",
        "reflect": true,
        "defaultValue": "false"
      },
      "formTarget": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'_self' | '_blank' | '_parent' | '_top'",
          "resolved": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines where to display a response after form submission. Only for buttons with `type=\"submit\"`."
        },
        "attribute": "form-target",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'button' | 'reset' | 'submit'",
          "resolved": "\"button\" | \"reset\" | \"submit\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the button type."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'button'"
      },
      "value": {
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
          "text": "Defines the button value. This property should be used only when the button is placed\ninside a form."
        },
        "attribute": "value",
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
      }
    };
  }
  static get states() {
    return {
      "hasIconStartSlot": {},
      "hasIconEndSlot": {},
      "isIconOnly": {},
      "focusType": {}
    };
  }
  static get elementRef() { return "host"; }
}
