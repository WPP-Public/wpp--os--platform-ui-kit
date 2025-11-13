import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { k as transformToVersionedTag } from './utils.js';
import { d as defineCustomElement$3 } from './wpp-action-button2.js';
import { d as defineCustomElement$2 } from './wpp-spinner2.js';

const wppFloatingToolbarCss = ":host{background-color:var(--wpp-grey-color-000);display:-ms-inline-flexbox;display:inline-flex}.wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;padding:4px;gap:8px;border-radius:8px;-webkit-box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1), 0 0 1px 0 rgba(52, 58, 63, 0.1);box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1), 0 0 1px 0 rgba(52, 58, 63, 0.1)}.wrapper.vertical{-ms-flex-direction:column;flex-direction:column}";

const WppFloatingToolbar$1 = /*@__PURE__*/ proxyCustomElement(class WppFloatingToolbar extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.items = [];
    this._actionButtonsConfig = [];
    this.validateActionButtonConfig = (config) => {
      if (config.length < 2) {
        console.error('The number of action buttons must be at least 2.');
      }
      else if (config.length > 7) {
        console.error('The number of action buttons must not exceed 7.');
      }
      this._actionButtonsConfig = this.actionButtonsConfig.slice(0, 7).map(item => ({
        ...item,
        variant: 'secondary',
      }));
    };
    this.renderActionButton = (data) => (h("wpp-action-button-v3-3-1", { key: `${data.icon}`, ...data }, h(transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' })));
    this.setActionButtons = () => {
      this.items = Array.from(this.host.shadowRoot?.querySelectorAll(transformToVersionedTag('wpp-action-button')) || []);
      this.syncTabIndexes();
    };
    this.getEnabledButtons = () => this.items.filter(item => !item.disabled);
    this.syncTabIndexes = (ndx = 0) => {
      const items = this.getEnabledButtons();
      if (!items)
        return;
      items.forEach((el, i) => {
        el.ariaProps = { ...(el.ariaProps ?? {}), tabIndex: i === ndx ? 0 : -1 };
      });
    };
    this.onKeyDown = (event) => {
      const horizontal = this.orientation === 'horizontal';
      const prevKeys = horizontal ? ['ArrowLeft'] : ['ArrowUp'];
      const nextKeys = horizontal ? ['ArrowRight'] : ['ArrowDown'];
      if (![...prevKeys, ...nextKeys, 'Home', 'End'].includes(event.key))
        return;
      const items = this.getEnabledButtons();
      if (!items)
        return;
      const active = this.host.shadowRoot?.activeElement;
      let ndx = active ? items.findIndex(el => el === active) : 0;
      if (ndx === -1)
        return;
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') {
        ndx = event.key === 'Home' ? 0 : items.length - 1;
        items[ndx]?.setFocus();
        this.syncTabIndexes(ndx);
        return;
      }
      const dir = prevKeys.includes(event.key) ? -1 : 1;
      const nextNdx = (ndx + dir + items.length) % items.length;
      items[nextNdx]?.setFocus();
      this.syncTabIndexes(nextNdx);
    };
    this.hostCssClasses = () => ({
      'wpp-floating-toolbar': true,
    });
    this.wrapperCssClasses = () => ({
      wrapper: true,
      vertical: this.orientation === 'vertical',
    });
    this.actionButtonsConfig = undefined;
    this.orientation = 'horizontal';
    this.ariaProps = {};
  }
  onUpdateActionButtonsConfig(config) {
    this.validateActionButtonConfig(config);
    this.setActionButtons();
  }
  componentWillLoad() {
    this.validateActionButtonConfig(this.actionButtonsConfig);
  }
  componentDidLoad() {
    this.setActionButtons();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: "toolbar", "aria-orientation": this.orientation, "aria-label": this.ariaProps?.label, "aria-labelledby": this.ariaProps?.labelledby, onKeyDown: this.onKeyDown }, h("div", { class: this.wrapperCssClasses() }, this._actionButtonsConfig.map(this.renderActionButton))));
  }
  static get registryIs() { return "wpp-floating-toolbar-v3-3-1"; }
  get host() { return this; }
  static get watchers() { return {
    "actionButtonsConfig": ["onUpdateActionButtonsConfig"]
  }; }
  static get style() { return wppFloatingToolbarCss; }
}, [1, "wpp-floating-toolbar", "wpp-floating-toolbar-v3-3-1", {
    "actionButtonsConfig": [16],
    "orientation": [1],
    "ariaProps": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-floating-toolbar-v3-3-1", "wpp-action-button-v3-3-1", "wpp-spinner-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-floating-toolbar-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppFloatingToolbar$1);
      }
      break;
    case "wpp-action-button-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-spinner-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppFloatingToolbar = WppFloatingToolbar$1;
const defineCustomElement = defineCustomElement$1;

export { WppFloatingToolbar, defineCustomElement };
