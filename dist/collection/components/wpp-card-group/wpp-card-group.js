import { h, Host } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
/**
 * @slot - Content is placed inside the card-group component. It can be only <wpp-card>. The default slot, without the name attribute.
 *
 * @part inner - Content slot element
 */
export class WppCardGroup {
  constructor() {
    this.directCardChildren = [];
    this.updateCardProperties = () => {
      this.setCardsProps([
        ['size', this.size],
        ['withRadioOrCheckbox', this.withRadioOrCheckbox],
        ['type', this.multiple ? 'multiple' : 'single'],
      ]);
      if (this.value) {
        this.setActiveCard(this.value);
      }
    };
    this.getDirectCardChildren = () => {
      const cards = Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-card')));
      this.directCardChildren = cards.filter((card) => {
        const closestCardEl = card.parentElement?.closest(`${transformToVersionedTag('wpp-card')}, ${transformToVersionedTag('wpp-card-group')}`);
        if (closestCardEl && closestCardEl.tagName.toLowerCase() === transformToVersionedTag('wpp-card')) {
          card.setAttribute('nested', 'true');
          return false;
        }
        else {
          return card;
        }
      });
    };
    this.setCardsProps = (updates) => {
      this.directCardChildren?.forEach((card) => {
        if (card.tagName === transformToVersionedTag('wpp-card').toUpperCase()) {
          updates.forEach(update => (card[update[0]] = update[1]));
        }
      });
    };
    this.setActiveCard = (initValue) => {
      const value = Array.isArray(initValue) ? initValue : [initValue];
      this.directCardChildren?.forEach((card) => {
        if (card.tagName === transformToVersionedTag('wpp-card').toUpperCase()) {
          card.setAttribute('checked', value.includes(card.value) ? 'true' : 'false');
        }
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.hostCssClasses = () => ({
      'wpp-card-group': true,
    });
    this.name = undefined;
    this.size = 'm';
    this.value = undefined;
    this.multiple = false;
    this.required = false;
    this.withRadioOrCheckbox = true;
    this.allowEmptySelection = false;
  }
  handleClick(event) {
    if (event.target.getAttribute('nested'))
      return;
    if (this.multiple) {
      const currentValue = this.value || [];
      this.value = event.detail.checked
        ? [...currentValue, event.detail.value]
        : currentValue.filter(element => element !== event.detail.value);
    }
    else {
      if (this.value === event.detail.value) {
        if (this.allowEmptySelection)
          this.value = '';
      }
      else {
        this.value = event.detail.value;
      }
    }
    this.wppChange.emit({
      value: this.value,
      name: this.name,
    });
  }
  onValueChange(newValue) {
    this.setActiveCard(newValue);
  }
  onUpdateSize() {
    this.setCardsProps([['size', this.size]]);
  }
  onUpdateWithRadioOrCheckbox() {
    this.setCardsProps([['withRadioOrCheckbox', this.withRadioOrCheckbox]]);
  }
  onUpdateMultiple() {
    this.setCardsProps([['type', this.multiple ? 'multiple' : 'single']]);
  }
  componentDidLoad() {
    this.getDirectCardChildren();
    this.updateCardProperties();
    this.updateSlotContent();
    this.observer = new MutationObserver(() => {
      this.updateSlotContent();
    });
    // Observe the host element
    this.observer.observe(this.host, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
  disconnectedCallback() {
    if (this.observer)
      this.observer.disconnect();
  }
  updateSlotContent() {
    this.getDirectCardChildren();
    this.updateCardProperties();
  }
  render() {
    return (h(Host, { "aria-multiselectable": this.multiple, "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, class: this.hostCssClasses(), exportparts: "inner" }, h("slot", { part: "inner" })));
  }
  static get is() { return "wpp-card-group"; }
  static get registryIs() { return "wpp-card-group-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-card-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-card-group.css"]
    };
  }
  static get properties() {
    return {
      "name": {
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
          "text": "Indicates the card group name"
        },
        "attribute": "name",
        "reflect": false
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
              "path": "./components/wpp-card/types",
              "id": "src/components/wpp-card-group/components/wpp-card/types.ts::CardSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the size of the cards"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "CardGroupValue",
          "resolved": "CardValue[] | number | string | undefined",
          "references": {
            "CardGroupValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-card-group/types.ts::CardGroupValue"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the card group value"
        },
        "attribute": "value",
        "reflect": false
      },
      "multiple": {
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
          "text": "If `true`, the card group will give possibility to select multiple cards"
        },
        "attribute": "multiple",
        "reflect": false,
        "defaultValue": "false"
      },
      "required": {
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
          "text": "If `true`, the card group is required"
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "withRadioOrCheckbox": {
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
          "text": "If `true`, the card group has radio or checkbox button on the right-top-side of the card"
        },
        "attribute": "with-radio-or-checkbox",
        "reflect": true,
        "defaultValue": "true"
      },
      "allowEmptySelection": {
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
          "text": "If `true`, single card group require no card selection and can be empty. Users can deselect a card by clicking it again."
        },
        "attribute": "allow-empty-selection",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the card group value changes"
        },
        "complexType": {
          "original": "CardGroupChangeEventDetail",
          "resolved": "CardGroupChangeEventDetail",
          "references": {
            "CardGroupChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-card-group/types.ts::CardGroupChangeEventDetail"
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
          "text": "Emitted when the card group receives focus"
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
          "text": "Emitted when the card group loses focus"
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
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "onValueChange"
      }, {
        "propName": "size",
        "methodName": "onUpdateSize"
      }, {
        "propName": "withRadioOrCheckbox",
        "methodName": "onUpdateWithRadioOrCheckbox"
      }, {
        "propName": "multiple",
        "methodName": "onUpdateMultiple"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppClick",
        "method": "handleClick",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
