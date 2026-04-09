import { Host, h } from '@stencil/core';
import { FOCUS_TYPE } from '../../../../types/common';
import { transformToVersionedTag } from '../../../../utils/utils';
/**
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part counter - counter text element
 */
export class WppTab {
  constructor() {
    this.isMouseClicked = false;
    this.handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && document.activeElement) {
        this.host.blur();
      }
    };
    this.onFocus = (event) => {
      this.focusType = this.isMouseClicked ? FOCUS_TYPE.MOUSE : FOCUS_TYPE.TAB;
      this.isMouseClicked = false;
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.pressed = false;
      this.wppBlur.emit(event);
    };
    this.onKeyDown = (e) => {
      if (this.disabled)
        return;
      if (e.key === ' ' || e.key === 'Enter') {
        this.pressed = true;
      }
    };
    this.onKeyUp = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        this.pressed = false;
      }
    };
    this.onMouseDown = () => {
      if (this.focusType === FOCUS_TYPE.TAB) {
        this.focusType = FOCUS_TYPE.MOUSE;
      }
      else {
        this.isMouseClicked = true;
      }
      if (!this.disabled) {
        this.pressed = true;
        window.addEventListener('mouseup', () => {
          this.pressed = false;
        }, { once: true });
      }
    };
    this.handleClickTab = () => {
      this.focusType = FOCUS_TYPE.NONE;
      if (this.disabled)
        return;
      this.wppChangeTabControlItem.emit({ value: this.value });
    };
    this.cssClasses = () => ({
      'wpp-tab-wrapper': true,
      'wpp-tab': true,
      'tab-focus': this.focusType === 'tab-focus',
      [`size-${this.size}`]: true,
      'wpp-icon-and-counter': !!this.icon && this.counter > 0,
    });
    this.hostCssClasses = () => ({
      'wpp-tab': true,
    });
    this.focusType = undefined;
    this.pressed = false;
    this.active = false;
    this.disabled = false;
    this.value = undefined;
    this.counter = 0;
    this.size = 'm';
    this.icon = undefined;
    this.ariaProps = undefined;
  }
  componentDidLoad() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }
  disconnectedCallback() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }
  // Roving tabindex: only the active, enabled tab is tabbable
  get tabIndex() {
    if (this.disabled)
      return -1;
    return this.active ? 0 : -1;
  }
  render() {
    return (h(Host, { id: this.value, role: "tab", "aria-selected": this.active ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : null, "aria-controls": this.ariaProps?.tab?.controls, "aria-label": this.ariaProps?.tab?.label, "aria-describedby": this.ariaProps?.tab?.describedby, "data-pressed": this.pressed ? 'true' : null, class: this.hostCssClasses(), tabIndex: this.tabIndex, exportparts: "wrapper, inner, counter", onClick: this.handleClickTab, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onBlur: this.onBlur, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("div", { class: this.cssClasses(), part: "wrapper" }, this.icon && h(transformToVersionedTag(this.icon), { className: 'wpp-tab-icon' }), h("slot", { part: "inner" }), this.counter > 0 && h("div", { class: "counter", part: "counter" }, `(${this.counter})`))));
  }
  static get is() { return "wpp-tab"; }
  static get registryIs() { return "wpp-tab-v3-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-tab.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-tab.css"]
    };
  }
  static get properties() {
    return {
      "active": {
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
          "text": "If the component is active."
        },
        "attribute": "active",
        "reflect": true,
        "defaultValue": "false"
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
      "value": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates value of the item (must be unique)"
        },
        "attribute": "value",
        "reflect": true
      },
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
          "text": "Defines the number of elements within a specific item."
        },
        "attribute": "counter",
        "reflect": false,
        "defaultValue": "0"
      },
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
          "text": "Indicates tabs size"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "icon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "`wpp-icon-${string}`",
          "resolved": "`wpp-icon-${string}`",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon that will be displayed in the tab. Must be an icon from the WPP library.\nExample: `wpp-icon-pie-chart`."
        },
        "attribute": "icon",
        "reflect": false
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WppTabAriaProps",
          "resolved": "undefined | { tab?: Pick<AriaProps, \"label\" | \"describedby\" | \"controls\"> | undefined; }",
          "references": {
            "WppTabAriaProps": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tabs/types.ts::WppTabAriaProps"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Grouped ARIA props (explicit picks only).\ntab: { label?, describedby?, controls? }"
        }
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "pressed": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChangeTabControlItem",
        "name": "wppChangeTabControlItem",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when an item is clicked."
        },
        "complexType": {
          "original": "TabChangeEventDetail",
          "resolved": "TabChangeEventDetail",
          "references": {
            "TabChangeEventDetail": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tabs/types.ts::TabChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when an item is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when an item loses focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
}
