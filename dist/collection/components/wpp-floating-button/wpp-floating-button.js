import { h, Host } from '@stencil/core';
import { getAriaProps, hasShadowDom } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @slot - Icon slot, contains `wpp-icon-plus` by default. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - spinner wrapper element
 * @part spinner - spinner element
 * @part icon-plus - icon plus element
 */
export class WppFloatingButton {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.onKeyDown = (event) => {
      if (this.disabled || this.loading)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
        this.host.dispatchEvent(clickEvent);
        this.isPressed = true;
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
      this.isPressed = false;
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.handleClick = (ev) => {
      if (this.disabled || this.loading) {
        ev.stopPropagation();
        return;
      }
      if (hasShadowDom(this.host)) {
        const form = this.host.closest('form');
        if (form) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          fakeButton.type = this.type;
          fakeButton.style.display = 'none';
          form.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
    this.hostCssClasses = () => ({
      'wpp-floating-button': true,
      'wpp-disabled': this.disabled,
      'wpp-loading': this.loading,
    });
    this.buttonCssClasses = () => ({
      button: true,
      loading: this.loading,
      disabled: this.disabled,
      primary: true,
      'tab-focus': this.focusType === 'tab-focus',
      pressed: this.isPressed,
    });
    this.loaderCssClasses = () => ({
      loader: true,
    });
    this.contentCssClasses = () => ({
      content: true,
      icon: true,
      hide: this.loading,
    });
    this.focusType = undefined;
    this.isPressed = false;
    this.validAriaProps = {};
    this.disabled = false;
    this.loading = false;
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
  /**
   * Method that sets focus on the native button.
   */
  async setFocus() {
    setTimeout(() => {
      if (this.buttonRef) {
        this.buttonRef.focus();
        this.focusType = FOCUS_TYPE.TAB;
      }
    }, 0);
  }
  onUpdateAriaProps() {
    this.validAriaProps = getAriaProps(this.ariaProps);
  }
  componentWillLoad() {
    this.validAriaProps = getAriaProps(this.ariaProps);
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onClick: this.handleClick, exportparts: "button, spinner-wrapper, spinner, icon-plus, ws-wrapper, ws-inner", onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("button", { ref: el => (this.buttonRef = el), class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, form: this.form, formAction: this.formAction, formEncType: this.formEncType, formMethod: this.formMethod, formNoValidate: this.formNoValidate, formTarget: this.formTarget, value: this.value, name: this.name, type: this.type, "data-testid": "wppFloatingButton", "aria-pressed": this.isPressed ? 'true' : 'false', ...this.validAriaProps, part: "button" }, this.loading && (h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, h("wpp-spinner-v4-1-0", { color: 'var(--wpp-grey-color-000)', part: "spinner" }))), h(WrappedSlot, { wrapperClass: this.contentCssClasses() }, h("wpp-icon-plus-v4-1-0", { class: "icon-plus", part: "icon-plus" })))));
  }
  static get is() { return "wpp-floating-button"; }
  static get registryIs() { return "wpp-floating-button-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-floating-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-floating-button.css"]
    };
  }
  static get properties() {
    return {
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
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the form to which the button belongs."
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
          "text": "Defines the button value."
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
      "focusType": {},
      "isPressed": {},
      "validAriaProps": {}
    };
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that sets focus on the native button.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "ariaProps",
        "methodName": "onUpdateAriaProps"
      }];
  }
}
