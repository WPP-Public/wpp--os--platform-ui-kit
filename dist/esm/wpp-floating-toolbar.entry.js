import { r as registerInstance, h, H as Host, g as getElement } from './index-a0877c3d.js';
import { k as transformToVersionedTag } from './utils-49ce8daf.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-487838b3.js';
import './consts-744c144f.js';
import './theme-observer-b7886d19.js';

const wppFloatingToolbarCss = ":host{background-color:var(--wpp-grey-color-000);display:-ms-inline-flexbox;display:inline-flex;border-radius:var(--wpp-border-radius-m)}.wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;padding:4px;gap:8px;border-radius:8px;-webkit-box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1), 0 0 1px 0 rgba(52, 58, 63, 0.1);box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1), 0 0 1px 0 rgba(52, 58, 63, 0.1)}.wrapper.vertical{-ms-flex-direction:column;flex-direction:column}.wrapper .is-selected{--wpp-action-button-bg-color:var(--wpp-primary-color-100);--wpp-action-button-secondary-icon-color:var(--wpp-primary-color-500);--wpp-action-button-secondary-icon-color-hover:var(--wpp-primary-color-400);--wpp-action-button-secondary-icon-color-active:var(--wpp-primary-color-600)}:host([data-wpp-theme=dark]){background-color:var(--wpp-grey-color-200)}";

const WppFloatingToolbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.items = [];
    this._actionButtonsConfig = [];
    this.themeSubscription = themeSubscriptionController(() => this.host);
    // Used to identify the property we keep track of the selected btn (id or index)
    this.hasIdProp = false;
    // Action to focus after the next render, set when the focused action becomes disabled
    this.pendingFocusIndex = null;
    // Whether the last interaction with the toolbar was a pointer press, so moved focus keeps the same look
    this.isPointerInput = false;
    this.validateActionButtonConfig = (config) => {
      if (config.length > 7) {
        console.error('The number of action buttons must not exceed 7.');
      }
      const actions = this.actionButtonsConfig.filter(item => {
        if (item.icon || item.label)
          return true;
        console.error('Each action button needs an icon, a label, or both.');
        return false;
      });
      this.hasIdProp = actions.every((item) => !!item.id);
      this._actionButtonsConfig = actions.slice(0, 7);
    };
    this.identifierAt = (index) => this.hasIdProp ? this._actionButtonsConfig[index].id : index;
    this.indexOfIdentifier = (identifier) => {
      if (this.hasIdProp)
        return this._actionButtonsConfig.findIndex(item => item.id === identifier);
      return typeof identifier === 'number' && identifier < this._actionButtonsConfig.length ? identifier : -1;
    };
    this.getFocusedIdentifier = () => {
      const ndx = this.items.findIndex(el => el === this.host.shadowRoot?.activeElement);
      return ndx === -1 ? undefined : this.identifierAt(ndx);
    };
    // Previous enabled action first, else the next one
    this.nearestEnabledIndex = (index) => {
      for (let i = index - 1; i >= 0; i--) {
        if (!this._actionButtonsConfig[i].disabled)
          return i;
      }
      for (let i = index + 1; i < this._actionButtonsConfig.length; i++) {
        if (!this._actionButtonsConfig[i].disabled)
          return i;
      }
      return -1;
    };
    // The tab stop stays on the same action across config changes and moves off it only when it's disabled
    this.getRovingIndex = () => {
      const ndx = this.rovingIdentifier === undefined ? -1 : this.indexOfIdentifier(this.rovingIdentifier);
      if (ndx !== -1 && !this._actionButtonsConfig[ndx].disabled)
        return ndx;
      if (ndx !== -1)
        return this.nearestEnabledIndex(ndx);
      return this._actionButtonsConfig.findIndex(item => !item.disabled);
    };
    this.handleBtnClick = (data, index) => {
      data?.onClick && data.onClick();
      if (!this.selectable)
        return;
      this.selectedIdentifier = this.hasIdProp ? data.id : index;
    };
    this.renderActionButton = (data, index, rovingIndex) => {
      // label renders as the button's text; tooltip is ours; everything else is passed through as before
      const { label, tooltip, ...buttonData } = data;
      const key = `${data.id ?? data.icon ?? label}-${index}`;
      // `action` styles every button from outside; `action-<id>` picks one out, as a toolbar holding a
      // readout of changing width needs
      const part = data.id ? `action action-${data.id}` : 'action';
      const button = (h("wpp-action-button-v4-6-0", { key: key, ...buttonData, part: part, exportparts: "button", ariaProps: { ...data.ariaProps, tabIndex: index === rovingIndex ? 0 : -1 }, variant: "secondary", class: {
          'is-selected': this.selectable &&
            (this.hasIdProp ? this.selectedIdentifier === data.id : this.selectedIdentifier === index),
        }, onClick: () => this.handleBtnClick(data, index) }, data.icon && h(transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' }), label));
      if (!tooltip)
        return button;
      return (h("wpp-tooltip-v4-6-0", { key: `tooltip-${key}`, text: tooltip, part: "action-tooltip" }, button));
    };
    this.getEnabledButtons = () => this.items.filter(item => !item.disabled);
    this.focusItem = (item) => {
      if (!item)
        return;
      item.setFocus();
      this.rovingIdentifier = this.identifierAt(this.items.indexOf(item));
    };
    this.onPointerDown = () => {
      this.isPointerInput = true;
    };
    this.onKeyDown = (event) => {
      this.isPointerInput = false;
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
        this.focusItem(items[ndx]);
        return;
      }
      const dir = prevKeys.includes(event.key) ? -1 : 1;
      const nextNdx = (ndx + dir + items.length) % items.length;
      this.focusItem(items[nextNdx]);
    };
    this.hostCssClasses = () => ({
      'wpp-floating-toolbar': true,
    });
    this.wrapperCssClasses = () => ({
      wrapper: true,
      vertical: this.orientation === 'vertical',
    });
    this.selectedIdentifier = undefined;
    this.rovingIdentifier = undefined;
    this.actionButtonsConfig = undefined;
    this.selectable = false;
    this.orientation = 'horizontal';
    this.ariaProps = {};
  }
  onUpdateActionButtonsConfig(config) {
    // Read before the new config replaces the old one: the focused button still matches it
    const focusedIdentifier = this.getFocusedIdentifier();
    this.validateActionButtonConfig(config);
    if (focusedIdentifier === undefined)
      return;
    const focusedIndex = this.indexOfIdentifier(focusedIdentifier);
    if (focusedIndex === -1 || !this._actionButtonsConfig[focusedIndex].disabled)
      return;
    const rescueIndex = this.nearestEnabledIndex(focusedIndex);
    if (rescueIndex === -1)
      return;
    this.pendingFocusIndex = rescueIndex;
    this.rovingIdentifier = this.identifierAt(rescueIndex);
  }
  componentWillLoad() {
    this.validateActionButtonConfig(this.actionButtonsConfig);
  }
  componentDidRender() {
    this.items = Array.from(this.host.shadowRoot?.querySelectorAll(transformToVersionedTag('wpp-action-button')) || []);
    if (this.pendingFocusIndex !== null) {
      this.items[this.pendingFocusIndex]?.setFocus({ focusVisible: !this.isPointerInput });
      this.pendingFocusIndex = null;
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    const rovingIndex = this.getRovingIndex();
    return (h(Host, { class: this.hostCssClasses(), role: "toolbar", "aria-orientation": this.orientation, "aria-label": this.ariaProps?.label, "aria-labelledby": this.ariaProps?.labelledby, onKeyDown: this.onKeyDown, onPointerDown: this.onPointerDown }, h("div", { class: this.wrapperCssClasses() }, this._actionButtonsConfig.map((data, index) => this.renderActionButton(data, index, rovingIndex)))));
  }
  static get registryIs() { return "wpp-floating-toolbar-v4-6-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "actionButtonsConfig": ["onUpdateActionButtonsConfig"]
  }; }
};
WppFloatingToolbar.style = wppFloatingToolbarCss;

export { WppFloatingToolbar as wpp_floating_toolbar };
