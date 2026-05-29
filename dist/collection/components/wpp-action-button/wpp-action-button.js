import { h, Host } from '@stencil/core';
import { getSlotEmptyStates, closestElement, getAriaProps } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
/**
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a plus icon.
 * @slot icon-end - Can contain an icon that will be placed after the main content, e.g. a plus icon.
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - Spinner wrapper element
 * @part spinner - Spinner element
 * @part body - Main content wrapper
 * @part icon-start-wrapper - icon-start wrapper element
 * @part icon-start - icon-start element
 * @part icon-end-wrapper - icon-end wrapper element
 * @part icon-end - icon-end element
 * @part inner - Content slot element
 * @part overlay - overlay element
 * @part icon-start-wrapper - icon-start wrapper element
 * @part icon-start - icon-start slot element
 * @part icon-end-wrapper - icon-end wrapper element
 * @part icon-end - icon-end slot element
 */
export class WppActionButton {
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
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
      this.isPressed = false;
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-action-button': true,
      'wpp-disabled': this.disabled,
      'wpp-loading': this.loading,
    });
    this.buttonCssClasses = () => ({
      loading: this.loading,
      disabled: this.disabled,
      [`${this.variant}`]: true,
      'tab-focus': this.focusType === 'tab-focus',
      'with-icon-only': this.isIconOnly,
      'with-icon-start': this.hasIconStartSlot,
      'with-icon-end': this.hasIconEndSlot,
      pressed: this.isPressed,
    });
    this.loadingColor = () => {
      switch (this.variant) {
        case 'secondary': {
          return 'var(--wpp-grey-color-800)';
        }
        case 'inverted': {
          return 'var(--wpp-grey-color-000)';
        }
        case 'destructive': {
          return 'var(--wpp-danger-color-500)';
        }
        default: {
          return 'var(--wpp-primary-color-500)';
        }
      }
    };
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
    this.isPressed = false;
    this.validAriaProps = {};
    this.disabled = false;
    this.loading = false;
    this.variant = 'primary';
    this.autoFocus = false;
    this.name = undefined;
    this.form = undefined;
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
  onDisabledChange(newVal) {
    if (newVal) {
      // Clear pressed state when disabled to avoid lingering “active”
      this.isPressed = false;
    }
  }
  componentWillLoad() {
    this.updateSlotData();
    this.validAriaProps = getAriaProps(this.ariaProps);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onClick: this.handleClick, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, exportparts: "button, spinner-wrapper, spinner, body, icon-start-wrapper, icon-start, icon-end-wrapper, icon-end, inner, overlay" }, h("button", { ref: el => (this.buttonRef = el), class: this.buttonCssClasses(), autoFocus: this.autoFocus, disabled: this.disabled || this.loading, value: this.value, name: this.name, type: this.type, part: "button", "data-testid": "wppActionButton", "aria-pressed": this.isPressed ? 'true' : 'false', tabindex: this.ariaProps?.tabIndex, ...this.validAriaProps }, this.loading && (h("div", { class: this.loaderCssClasses(), part: "spinner-wrapper" }, h("wpp-spinner-v4-1-0", { color: this.loadingColor(), part: "spinner" }))), h("div", { class: this.contentCssClasses(), part: "body" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("slot", { part: "inner", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.iconEndCssClasses(), name: "icon-end", onSlotchange: this.updateSlotData }))), h("div", { class: "overlay", part: "overlay" })));
  }
  static get is() { return "wpp-action-button"; }
  static get registryIs() { return "wpp-action-button-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-action-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-action-button.css"]
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
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'primary' | 'secondary' | 'inverted' | 'destructive'",
          "resolved": "\"destructive\" | \"inverted\" | \"primary\" | \"secondary\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the button style."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
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
      "hasIconStartSlot": {},
      "hasIconEndSlot": {},
      "isIconOnly": {},
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
      }, {
        "propName": "disabled",
        "methodName": "onDisabledChange"
      }];
  }
}
