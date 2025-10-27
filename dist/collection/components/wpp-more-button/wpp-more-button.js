import { Host, h } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { getAriaProps } from '../../utils/utils';
export class WppMoreButton {
  constructor() {
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
    this.hostCssClasses = () => ({
      'wpp-more-button': true,
      'wpp-disabled': this.disabled,
    });
    this.buttonCssClasses = () => ({
      button: true,
      disabled: this.disabled,
      loading: this.loading,
      'tab-focus': this.focusType === 'tab-focus',
      [`size-${this.size}`]: true,
      pressed: this.isPressed,
    });
    this.isPressed = false;
    this.focusType = undefined;
    this.validAriaProps = {};
    this.name = undefined;
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
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
  render() {
    return (h(Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("button", { class: this.buttonCssClasses(), disabled: this.disabled || this.loading, name: this.name, type: "button", "data-testid": "wpp-more-button", "aria-pressed": this.isPressed, ...this.validAriaProps }, this.loading && !this.disabled ? (h("wpp-spinner-v3-3-0", { size: "s" })) : (h("wpp-icon-more-v3-3-0", { direction: 'horizontal' })))));
  }
  static get is() { return "wpp-more-button"; }
  static get registryIs() { return "wpp-more-button-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-more-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-more-button.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Indicates the size of the button. Different sizes have different paddings."
        },
        "attribute": "size",
        "reflect": true,
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
          "text": "If the button is disabled."
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
      "isPressed": {},
      "focusType": {},
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
