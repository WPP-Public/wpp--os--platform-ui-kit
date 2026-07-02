'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-06b46408.js');
const subscribeToTheme = require('./subscribe-to-theme-1879a649.js');
require('./consts-d8f5ef98.js');

const wppFloatingToolbarCss = ":host{background-color:var(--wpp-grey-color-000);display:-ms-inline-flexbox;display:inline-flex}.wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;padding:4px;gap:8px;border-radius:8px;-webkit-box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1), 0 0 1px 0 rgba(52, 58, 63, 0.1);box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1), 0 0 1px 0 rgba(52, 58, 63, 0.1)}.wrapper.vertical{-ms-flex-direction:column;flex-direction:column}.wrapper .is-selected{--wpp-action-button-bg-color:var(--wpp-primary-color-100);--wpp-action-button-secondary-icon-color:var(--wpp-primary-color-500);--wpp-action-button-secondary-icon-color-hover:var(--wpp-primary-color-400);--wpp-action-button-secondary-icon-color-active:var(--wpp-primary-color-600)}:host([data-wpp-theme=dark]){background-color:var(--wpp-grey-color-200)}";

const WppFloatingToolbar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.items = [];
    this._actionButtonsConfig = [];
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    // Used to identify the property we keep track of the selected btn (id or index)
    this.hasIdProp = false;
    this.validateActionButtonConfig = (config) => {
      if (config.length > 7) {
        console.error('The number of action buttons must not exceed 7.');
      }
      this.hasIdProp = this.actionButtonsConfig.every((item) => !!item.id);
      this._actionButtonsConfig = this.actionButtonsConfig.slice(0, 7);
    };
    this.handleBtnClick = (data, index) => {
      data?.onClick && data.onClick();
      if (!this.selectable)
        return;
      this.selectedIdentifier = this.hasIdProp ? data.id : index;
    };
    this.renderActionButton = (data, index$1) => (index.h("wpp-action-button-v4-2-0", { key: `${data.icon}`, ...data, variant: "secondary", class: {
        'is-selected': this.selectable && (this.hasIdProp ? this.selectedIdentifier === data.id : this.selectedIdentifier === index$1),
      }, onClick: () => this.handleBtnClick(data, index$1) }, index.h(utils.transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' })));
    this.setActionButtons = () => {
      this.items = Array.from(this.host.shadowRoot?.querySelectorAll(utils.transformToVersionedTag('wpp-action-button')) || []);
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
    this.selectedIdentifier = undefined;
    this.actionButtonsConfig = undefined;
    this.selectable = false;
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
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), role: "toolbar", "aria-orientation": this.orientation, "aria-label": this.ariaProps?.label, "aria-labelledby": this.ariaProps?.labelledby, onKeyDown: this.onKeyDown }, index.h("div", { class: this.wrapperCssClasses() }, this._actionButtonsConfig.map(this.renderActionButton))));
  }
  static get registryIs() { return "wpp-floating-toolbar-v4-2-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "actionButtonsConfig": ["onUpdateActionButtonsConfig"]
  }; }
};
WppFloatingToolbar.style = wppFloatingToolbarCss;

exports.wpp_floating_toolbar = WppFloatingToolbar;
