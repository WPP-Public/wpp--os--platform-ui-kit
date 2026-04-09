import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as debounce, k as transformToVersionedTag } from './utils.js';

const TAB_MARGIN_RIGHT = 20;

const wppTabsCss = ":host{--tabs-width:var(--wpp-tabs-width, 100%);--tabs-slider-width:var(--wpp-tabs-slider-width, var(--wpp-border-width-m));--tabs-border-radius:var(--wpp-tabs-slider-border-radius, var(--wpp-border-radius-s));--tabs-slider-color:var(--wpp-tabs-slider-color, var(--wpp-grey-color-300));--tab-selected-item-slider-color:var(--wpp-tabs-selected-item-slider-color, var(--wpp-brand-color));--tab-margin-right:var(--wpp-tab-margin-right, 20px);display:block}:host ::slotted(.wpp-tab:not(:last-child)){margin-right:var(--tab-margin-right)}.wpp-tab-control-wrapper{position:relative;display:-ms-inline-flexbox;display:inline-flex;width:var(--tabs-width)}.wpp-tab-control-wrapper::after{position:absolute;bottom:-2px;width:100%;height:2px;background-color:var(--tabs-slider-color);content:\"\"}.slider{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--tab-bar-item-width);background-color:transparent;border-bottom:var(--tabs-slider-width) solid var(--tab-selected-item-slider-color);border-radius:var(--tabs-border-radius);-webkit-transform:translate(var(--tab-bar-item-transform), 0);transform:translate(var(--tab-bar-item-transform), 0);-webkit-transition:all 0.2s;transition:all 0.2s}";

const WppTabs = /*@__PURE__*/ proxyCustomElement(class WppTabs extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.resizeObserver = new ResizeObserver(debounce(() => {
      this.redrawUnderline(this.position);
    }, 50));
    this.hostCssClasses = () => ({
      'wpp-tabs': true,
    });
    this.position = undefined;
    this.previousActiveTab = undefined;
    this._locales = { tablistLabel: 'Tabs' };
    this.value = undefined;
    this.size = 'm';
    this.ariaProps = undefined;
    this.locales = {};
  }
  handleChangeTabControlItemClick(event) {
    this.value = event.detail.value;
  }
  onLocalesChange(newLocales) {
    this._locales = { ...this._locales, ...(newLocales || {}) };
  }
  // Keyboard navigation per WAI-ARIA Tabs pattern (manual activation)
  handleKeydown(event) {
    const target = event.target;
    if (!this.host.contains(target))
      return;
    const tabs = this.getTabs();
    if (tabs.length === 0)
      return;
    const enabledTabs = tabs.filter(t => !t.disabled);
    const index = enabledTabs.findIndex(t => t === target);
    if (index === -1)
      return;
    const key = event.key;
    const lastIdx = enabledTabs.length - 1;
    const focusTab = (i) => {
      enabledTabs[i]?.focus();
    };
    switch (key) {
      case 'ArrowRight':
        event.preventDefault();
        focusTab(index === lastIdx ? 0 : index + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(index === 0 ? lastIdx : index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(lastIdx);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.value = enabledTabs[index].value;
        break;
    }
  }
  sizeChanged(newSize) {
    this.host.querySelectorAll(transformToVersionedTag('wpp-tab')).forEach(tab => {
      tab.setAttribute('size', newSize);
    });
  }
  valueChanged(newValue) {
    this.previousActiveTab?.setAttribute('active', 'false');
    const activeElement = Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-tab'))).find(tab => tab.value === newValue);
    activeElement?.setAttribute('active', 'true');
    this.redrawUnderline(newValue);
    this.previousActiveTab = activeElement ?? null;
    this.wppChange.emit({ value: newValue, itemId: '' });
  }
  getTabs() {
    return Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-tab')));
  }
  redrawUnderline(newPosition) {
    this.position = newPosition;
    let sumWidthOfPreviousElements = 0;
    let currentItemWidth = 0;
    let isToSumWidthOfPreviousElements = true;
    this.getTabs().forEach(tab => {
      if (tab.value === this.position) {
        isToSumWidthOfPreviousElements = false;
      }
      if (isToSumWidthOfPreviousElements) {
        sumWidthOfPreviousElements += tab.clientWidth + TAB_MARGIN_RIGHT;
      }
      if (tab.value === newPosition) {
        currentItemWidth = tab.clientWidth || 0;
      }
    });
    this.host.style.setProperty('--tab-bar-item-transform', `${sumWidthOfPreviousElements}px`);
    this.host.style.setProperty('--tab-bar-item-width', `${currentItemWidth}px`);
    this.host.style.setProperty('--tab-bar-item-position', newPosition.toString());
  }
  lengthChange(newLength) {
    newLength && this.host.style.setProperty('--item-length', newLength.toString());
  }
  // Merge locales once at load and on change
  componentWillLoad() {
    this._locales = { ...this._locales, ...(this.locales || {}) };
  }
  componentDidLoad() {
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.host);
    }
    let amountOfActiveTabs = 0;
    this.lengthChange(this.host.children.length);
    this.getTabs().forEach(tab => {
      if (tab.value === this.value) {
        tab.setAttribute('active', 'true');
      }
      tab.setAttribute('size', this.size);
      if (tab.hasAttribute('active')) {
        amountOfActiveTabs = amountOfActiveTabs + 1;
        if (amountOfActiveTabs > 1) {
          tab.removeAttribute('active');
          return;
        }
        this.previousActiveTab = tab;
        this.redrawUnderline(tab.value);
      }
    });
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    const tablistLabel = this.ariaProps?.tablist?.label ?? (this.ariaProps?.tablist?.labelledby ? undefined : this._locales.tablistLabel);
    const tablistLabelledBy = this.ariaProps?.tablist?.labelledby;
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner, slider" }, h("div", { class: "wpp-tab-control-wrapper", role: "tablist", "aria-orientation": "horizontal", "aria-label": tablistLabel, "aria-labelledby": tablistLabelledBy, part: "wrapper" }, h("slot", { part: "inner" })), h("div", { class: "slider", part: "slider" })));
  }
  static get registryIs() { return "wpp-tabs-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "locales": ["onLocalesChange"],
    "size": ["sizeChanged"],
    "value": ["valueChanged"]
  }; }
  static get style() { return wppTabsCss; }
}, [1, "wpp-tabs", "wpp-tabs-v3-6-0", {
    "value": [1537],
    "size": [1],
    "ariaProps": [16],
    "locales": [16],
    "position": [32],
    "previousActiveTab": [32],
    "_locales": [32]
  }, [[2, "wppChangeTabControlItem", "handleChangeTabControlItemClick"], [2, "keydown", "handleKeydown"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-tabs-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-tabs-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTabs);
      }
      break;
  } });
}

export { WppTabs as W, defineCustomElement as d };
