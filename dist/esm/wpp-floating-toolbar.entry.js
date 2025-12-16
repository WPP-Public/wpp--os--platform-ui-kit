import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-fb733700.js';
import './consts-5bf9c29f.js';

const wppFloatingToolbarCss = ":host{background-color:var(--wpp-grey-color-000);display:-ms-inline-flexbox;display:inline-flex}.wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;padding:4px;gap:8px;border-radius:8px;-webkit-box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1), 0 0 1px 0 rgba(52, 58, 63, 0.1);box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1), 0 0 1px 0 rgba(52, 58, 63, 0.1)}.wrapper.vertical{-ms-flex-direction:column;flex-direction:column}";

const WppFloatingToolbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.renderActionButton = (data) => (h("wpp-action-button-v3-4-0", { key: `${data.icon}`, ...data }, h(transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' })));
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
  static get registryIs() { return "wpp-floating-toolbar-v3-4-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "actionButtonsConfig": ["onUpdateActionButtonsConfig"]
  }; }
};
WppFloatingToolbar.style = wppFloatingToolbarCss;

export { WppFloatingToolbar as wpp_floating_toolbar };
