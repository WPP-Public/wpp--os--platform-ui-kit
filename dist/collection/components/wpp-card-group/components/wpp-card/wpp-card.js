import { h, Host, Fragment } from '@stencil/core';
import { getSlotEmptyStates, isEventTargetContained } from '../../../../utils/utils';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { FOCUS_TYPE } from '../../../../types/common';
const getInitFocusInfo = () => ({
  card: FOCUS_TYPE.NONE,
  icon: FOCUS_TYPE.NONE,
});
/**
 * @slot - Content that is placed inside the card. The default slot, without the name attribute.
 * @slot header - Content that is placed inside the header section.
 * @slot actions - Content is placed inside the `.actions` element and add content to actions.
 *
 * @part header-wrapper - card header wrapper
 * @part header - card header
 * @part card - card container
 * @part actions - actions container
 * @part radio - input radio element
 * @part checkbox - Checkbox element
 * @part inner - Content slot element
 */
export class WppCard {
  constructor() {
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
        header: '[slot="header"]',
      });
      this.hasActionsSlot = !emptyStates.actions;
      this.hasHeaderSlot = !emptyStates.header;
    };
    this.onClick = (event) => {
      if (this.disabled)
        return;
      const actionsContainer = this.host.querySelector('[slot="actions"]');
      if (actionsContainer && isEventTargetContained(actionsContainer, event)) {
        return;
      }
      this.wppClick.emit({
        checked: !this.checked,
        value: this.value,
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = this.getUpdatedFocusInfo('card', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('card', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon', FOCUS_TYPE.MOUSE);
      this.updateComponentState({ active: true });
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
      }
    };
    this.checkTabIndex = () => {
      if (this.hasActionsSlot && !this.interactive) {
        return null;
      }
      else if ((this.interactive && !this.hasActionsSlot) || !!this.type) {
        return 0;
      }
    };
    this.updateComponentState = (updateData) => {
      this.componentState = {
        ...this.componentState,
        ...updateData,
      };
    };
    this.cardCssClasses = () => ({
      card: true,
      [`${this.variant}`]: true,
      [`size-${this.size}`]: true,
      choosable: !!this.type,
      disabled: !!this.type && this.disabled,
      checked: this.checked,
      interactive: this.interactive,
      'tab-focus': this.focusType.card === FOCUS_TYPE.TAB && this.focusType.icon !== FOCUS_TYPE.TAB,
      'with-actions': this.hasActionsSlot,
    });
    this.headerCssClasses = () => ({
      header: true,
      'slot-hidden': !this.hasHeaderSlot,
    });
    this.actionsCssClasses = () => ({
      actions: true,
      'slot-hidden': !this.hasActionsSlot,
    });
    this.headerWrapperCssClasses = () => ({
      'header-wrapper': true,
      'with-actions': this.hasActionsSlot,
    });
    this.hostCssClasses = () => ({
      'wpp-card': true,
    });
    this.hasHeaderSlot = false;
    this.hasActionsSlot = false;
    this.componentState = {
      hover: false,
      active: false,
    };
    this.focusType = getInitFocusInfo();
    this.variant = 'primary';
    this.value = undefined;
    this.size = 'm';
    this.type = undefined;
    this.disabled = false;
    this.checked = false;
    this.nested = false;
    this.withRadioOrCheckbox = undefined;
    this.name = undefined;
    this.interactive = false;
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : '';
    return (h(Host, { onMouseEnter: () => this.updateComponentState({ hover: true }), onMouseLeave: () => this.updateComponentState({ hover: false }), onMouseUp: () => this.updateComponentState({ active: false }), onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'card'), onClick: this.onClick, onFocus: this.onFocus, onBlur: this.onBlur, "aria-disabled": this.disabled, "aria-checked": this.checked, "aria-hidden": this.disabled ? 'true' : null, htmlFor: this.name, exportparts: "card, header-outer-wrapper, header-wrapper radio, checkbox, actions-wrapper", class: this.hostCssClasses(), tabIndex: this.disabled ? -1 : this.checkTabIndex() }, h("div", { class: this.cardCssClasses(), part: "card" }, h("div", { class: this.headerWrapperCssClasses(), part: "header-outer-wrapper" }, h(WrappedSlot, { name: "header", wrapperClass: this.headerCssClasses(), onSlotchange: this.updateSlotData, part: "header" }), this.withRadioOrCheckbox && (h(Fragment, null, this.type === 'single' && (h("wpp-radio-v2-22-0", { class: "radio", internalState: displayState, name: this.name, checked: this.checked, disabled: this.disabled, index: -1, part: "radio" })), this.type === 'multiple' && (h("wpp-checkbox-v2-22-0", { class: "checkbox", internalState: displayState, name: this.name, checked: this.checked, disabled: this.disabled, index: -1, part: "checkbox" })))), h(WrappedSlot, { name: "actions", part: "actions", wrapperClass: this.actionsCssClasses(), onSlotchange: this.updateSlotData, onBlur: this.onBlur, tabIndex: 0, onKeyUp: (event) => this.onKeyUp(event, 'icon') })), h("slot", null))));
  }
  static get is() { return "wpp-card"; }
  static get registryIs() { return "wpp-card-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-card.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-card.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'primary' | 'secondary'",
          "resolved": "\"primary\" | \"secondary\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the variant of the card."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'primary'"
      },
      "value": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "CardValue",
          "resolved": "number | string | undefined",
          "references": {
            "CardValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-card-group/components/wpp-card/types.ts::CardValue"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the value of the card"
        },
        "attribute": "value",
        "reflect": true
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "CardSize",
          "resolved": "\"2xl\" | \"l\" | \"m\" | \"s\" | \"xl\"",
          "references": {
            "CardSize": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-card-group/components/wpp-card/types.ts::CardSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the size of the card"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "type": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "CardType",
          "resolved": "\"multiple\" | \"single\" | undefined",
          "references": {
            "CardType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-card-group/components/wpp-card/types.ts::CardType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the type of the card"
        },
        "attribute": "type",
        "reflect": false
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
          "text": "If `true`, the card is disabled"
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "checked": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the card is checked"
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      },
      "nested": {
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
          "tags": [{
              "name": "internal",
              "text": "- This.prop is controlled by card group component, do not set it manually."
            }],
          "text": "If `true`, it means that the card is nested inside another card, and clicking it will prevent\nthe value from card-group to change."
        },
        "attribute": "nested",
        "reflect": true,
        "defaultValue": "false"
      },
      "withRadioOrCheckbox": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by card group component, do not set it manually"
            }],
          "text": "If `true`, the card group has radio or checkbox button on the right-top-side of the card"
        },
        "attribute": "with-radio-or-checkbox",
        "reflect": true
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
          "text": "Indicates the name of the card"
        },
        "attribute": "name",
        "reflect": true
      },
      "interactive": {
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
          "text": "If `true`, then on hover and on pressed card appropriate styles will be applied"
        },
        "attribute": "interactive",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "hasHeaderSlot": {},
      "hasActionsSlot": {},
      "componentState": {},
      "focusType": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClick",
        "name": "wppClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the checked state changes"
        },
        "complexType": {
          "original": "CardChangeEventDetail",
          "resolved": "CardChangeEventDetail",
          "references": {
            "CardChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-card-group/components/wpp-card/types.ts::CardChangeEventDetail"
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
          "text": "Emitted when the card receives focus"
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
          "text": "Emitted when the card loses focus"
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
