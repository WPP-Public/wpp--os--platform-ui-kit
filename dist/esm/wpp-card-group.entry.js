import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { j as transformToVersionedTag } from './utils-f3870f15.js';
import './consts-4b0f734e.js';

const wppCardGroupCss = ":host{display:-ms-flexbox;display:flex}";

const WppCardGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
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
  static get registryIs() { return "wpp-card-group-v2-22-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"],
    "size": ["onUpdateSize"],
    "withRadioOrCheckbox": ["onUpdateWithRadioOrCheckbox"],
    "multiple": ["onUpdateMultiple"]
  }; }
};
WppCardGroup.style = wppCardGroupCss;

export { WppCardGroup as wpp_card_group };
