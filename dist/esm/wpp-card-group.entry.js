import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-d423b01f.js';
import './consts-5bf9c29f.js';

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
      if (this.value !== nextValue) {
        this.value = nextValue;
        this.wppChange.emit({ value: this.value, name: this.name });
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
  static get registryIs() { return "wpp-card-group-v3-3-0"; }
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
