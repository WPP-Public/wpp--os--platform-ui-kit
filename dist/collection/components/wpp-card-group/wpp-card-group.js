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
      this.setActiveCard(this.value);
    };
    // Normalize values so number 0 and string '0' compare equal
    this.toKey = (v) => {
      if (v === undefined || v === null)
        return undefined;
      return String(v);
    };
    this.isEqualValue = (a, b) => {
      const ka = this.toKey(a), kb = this.toKey(b);
      return ka !== undefined && kb !== undefined && ka === kb;
    };
    this.CARD_SELECTOR = `${transformToVersionedTag('wpp-card')}, wpp-card`;
    this.GROUP_SELECTOR = `${transformToVersionedTag('wpp-card-group')}, wpp-card-group`;
    this.getDirectCardChildren = () => {
      // collect both versioned and unversioned tags
      const cards = Array.from(this.host.querySelectorAll(this.CARD_SELECTOR));
      this.directCardChildren = cards.filter((card) => {
        // Find the nearest ancestor that is either a card or a card-group
        const nearestAncestor = card.parentElement?.closest(`${this.CARD_SELECTOR}, ${this.GROUP_SELECTOR}`);
        // If nearest ancestor is a card, mark as nested and exclude from direct children.
        if (nearestAncestor && nearestAncestor.matches(this.CARD_SELECTOR)) {
          card.setAttribute('nested', 'true');
          return false;
        }
        // If nearest ancestor is a card-group (or none), this card is a direct child of the group.
        card.removeAttribute('nested');
        return true;
      });
    };
    this.setCardsProps = (updates) => {
      this.directCardChildren?.forEach((card) => {
        updates.forEach(update => (card[update[0]] = update[1]));
      });
    };
    this.setActiveCard = (initValue) => {
      const values = Array.isArray(initValue) ? initValue : [initValue];
      const normalized = values.filter(v => v !== undefined && v !== null && v !== '').map(v => String(v));
      this.directCardChildren?.forEach((card) => {
        const cardVal = card.value;
        const isChecked = normalized.includes(String(cardVal));
        card.checked = isChecked; // Stencil will reflect as checked="" when true
        // Do NOT set the attribute manually; reflection will handle removal when false.
      });
    };
    this.getEnabledCards = () => this.directCardChildren.filter(card => !card.disabled);
    this.getCurrentNdx = (enabled) => {
      const checkedNdx = enabled.findIndex(card => card.checked);
      return checkedNdx !== -1 ? checkedNdx : 0;
    };
    this.onKeyDown = (event) => {
      // Only for radiogroup variant (single select)
      if (this.multiple)
        return;
      const enabledItems = this.getEnabledCards();
      if (enabledItems.length === 0)
        return;
      const currentNdx = this.getCurrentNdx(enabledItems);
      let nextNdx = currentNdx;
      const isNextKey = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      const isPrevKey = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
      if (!isNextKey && !isPrevKey)
        return;
      event.preventDefault();
      const onFirst = currentNdx === 0;
      const onLast = currentNdx === enabledItems.length - 1;
      if (onLast && isNextKey) {
        nextNdx = 0;
      }
      else if (onFirst && isPrevKey) {
        nextNdx = enabledItems.length - 1;
      }
      else if (isNextKey) {
        nextNdx = Math.min(currentNdx + 1, enabledItems.length - 1);
      }
      else if (isPrevKey) {
        nextNdx = Math.max(currentNdx - 1, 0);
      }
      const target = enabledItems[nextNdx];
      this.focusAndSelect(target);
    };
    this.focusAndSelect = (target) => {
      if (!target)
        return;
      const nextValue = target.value;
      if (!this.isEqualValue(this.value, nextValue)) {
        this.value = nextValue;
        this.emitChange();
      }
      this.setActiveCard(this.value);
      this.syncTabIndexes();
      target.setFocus();
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
    this.ariaProps = {};
  }
  handleClick(event) {
    if (event.target.getAttribute('nested'))
      return;
    if (this.multiple) {
      const currentValue = Array.isArray(this.value) ? this.value : [];
      this.value = event.detail.checked
        ? [...currentValue, event.detail.value]
        : currentValue.filter(element => !this.isEqualValue(element, event.detail.value));
    }
    else {
      if (this.isEqualValue(this.value, event.detail.value)) {
        if (this.allowEmptySelection) {
          this.value = ''; // empty selection is represented by ''
        }
      }
      else {
        this.value = event.detail.value;
      }
    }
    this.emitChange();
  }
  onValueChange(newValue) {
    this.setActiveCard(newValue);
    this.syncTabIndexes();
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
  emitChange() {
    this.wppChange.emit({
      value: this.value,
      name: this.name,
    });
  }
  componentDidLoad() {
    this.getDirectCardChildren();
    this.updateCardProperties();
    this.updateSlotContent();
    this.syncTabIndexes();
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
    this.syncTabIndexes();
  }
  syncTabIndexes() {
    // Only manage for radiogroup
    if (this.multiple)
      return;
    const enabled = this.getEnabledCards();
    if (enabled.length === 0)
      return;
    let activeIndex = enabled.findIndex(c => c.checked);
    if (activeIndex === -1)
      activeIndex = 0;
    enabled.forEach((c, i) => {
      c.index = i === activeIndex ? 0 : -1;
    });
  }
  render() {
    return (h(Host, { "aria-required": this.required, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onKeyDown, class: this.hostCssClasses(), exportparts: "inner", role: this.multiple ? 'group' : 'radiogroup', "aria-labelledby": this.ariaProps.labelledby }, h("slot", { part: "inner" })));
  }
  static get is() { return "wpp-card-group"; }
  static get registryIs() { return "wpp-card-group-v3-6-0"; }
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
          "text": "Contains the `aria-` props for component"
        },
        "defaultValue": "{}"
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
