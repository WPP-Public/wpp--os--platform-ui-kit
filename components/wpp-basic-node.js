import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { k as transformToVersionedTag } from './utils.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';
import { d as defineCustomElement$r } from './wpp-action-button2.js';
import { d as defineCustomElement$q } from './wpp-checkbox2.js';
import { d as defineCustomElement$p } from './wpp-divider2.js';
import { d as defineCustomElement$o } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$n } from './wpp-icon-cross2.js';
import { d as defineCustomElement$m } from './wpp-icon-dash2.js';
import { d as defineCustomElement$l } from './wpp-icon-error2.js';
import { d as defineCustomElement$k } from './wpp-icon-file2.js';
import { d as defineCustomElement$j } from './wpp-icon-gear2.js';
import { d as defineCustomElement$i } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$h } from './wpp-icon-play2.js';
import { d as defineCustomElement$g } from './wpp-icon-plus2.js';
import { d as defineCustomElement$f } from './wpp-icon-service2.js';
import { d as defineCustomElement$e } from './wpp-icon-stop2.js';
import { d as defineCustomElement$d } from './wpp-icon-success2.js';
import { d as defineCustomElement$c } from './wpp-icon-tick2.js';
import { d as defineCustomElement$b } from './wpp-icon-warning2.js';
import { d as defineCustomElement$a } from './wpp-inline-message2.js';
import { d as defineCustomElement$9 } from './wpp-internal-label2.js';
import { d as defineCustomElement$8 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$7 } from './wpp-label2.js';
import { d as defineCustomElement$6 } from './wpp-list-item2.js';
import { d as defineCustomElement$5 } from './wpp-menu-context2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const LOCALES_DEFAULTS = {
  playAction: 'Run',
  stopAction: 'Stop',
  filterAction: 'Settings',
  uploadFileAction: 'Upload',
};

const wppBasicNodeCss = ".sc-wpp-basic-node-h{display:inline-block;width:100%;height:100%;min-width:280px;min-height:280px;max-width:440px;max-height:600px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node{height:100%;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.sc-wpp-basic-node-h .node-container.loading-node.sc-wpp-basic-node{border-radius:calc(var(--wpp-border-radius-l) + 2px)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node:not(.loading-node) .node-wrapper.is-selected.sc-wpp-basic-node{border:1px solid var(--wpp-primary-color-500)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node{border-radius:var(--wpp-border-radius-l);background-color:var(--wpp-grey-color-000);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--wpp-box-shadow-s);box-shadow:var(--wpp-box-shadow-s);width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node:hover{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node{padding:21px 22px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;gap:10px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .title-tooltip.sc-wpp-basic-node{width:100%;overflow:hidden}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .title-tooltip.sc-wpp-basic-node::part(anchor){width:100%}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .node-title.sc-wpp-basic-node{margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node{-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;padding:16px 6px 16px 16px;overflow-y:auto;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node::-webkit-scrollbar{width:4px;height:4px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node{padding:16px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node .node-left-actions.sc-wpp-basic-node{display:-ms-flexbox;display:flex;gap:4px}@property --loading-angle{syntax:\"<angle>\";initial-value:0deg;inherits:false}@-webkit-keyframes loading-rotate{to{--loading-angle:360deg}}@keyframes loading-rotate{to{--loading-angle:360deg}}.loading-node.sc-wpp-basic-node{padding:2px;background:conic-gradient(from var(--loading-angle), var(--wpp-primary-color-500), var(--wpp-primary-color-100), var(--wpp-primary-color-500));-webkit-animation:loading-rotate 2s linear infinite;animation:loading-rotate 2s linear infinite;border-radius:calc(var(--wpp-border-radius-l) + 2px)}[data-wpp-theme=dark].sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node{background-color:var(--wpp-grey-color-100)}";

const WppBasicNode$1 = /*@__PURE__*/ proxyCustomElement(class WppBasicNode extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.wppActionClick = createEvent(this, "wppActionClick", 7);
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.resizeObserver = undefined;
    this.bodyRef = undefined;
    this.titleRef = undefined;
    this._locales = LOCALES_DEFAULTS;
    this.checkBodyForScroll = () => {
      if (this.bodyRef) {
        this.hasScrollbar = this.bodyRef.clientHeight < this.bodyRef.scrollHeight;
      }
    };
    this.handleActionClick = (action) => {
      this.wppActionClick.emit(action);
    };
    this.getNodeContainerClasses = () => ({
      'node-container': true,
      'loading-node': this.isLoading,
    });
    this.getNodeWrapperClasses = () => ({
      'node-wrapper': true,
      'is-selected': this.isSelected,
    });
    this.hasScrollbar = false;
    this.nodeTitle = 'Title';
    this.isLoading = false;
    this.actions = [];
    this.locales = {};
    this.isSelected = false;
    this.ariaProps = {
      label: 'Open node actions',
    };
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...LOCALES_DEFAULTS, ...newLocales };
  }
  connectedCallback() {
    this.themeSubscription.start();
    this.resizeObserver = new ResizeObserver(() => {
      this.checkBodyForScroll();
    });
    this.resizeObserver.observe(this.host);
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.resizeObserver = undefined;
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
  }
  render() {
    return (h(Host, { class: "wpp-basic-node" }, h("div", { class: this.getNodeContainerClasses() }, h("div", { class: this.getNodeWrapperClasses() }, h("div", { class: "node-header" }, h("wpp-icon-service-v4-1-0", { color: "var(--wpp-grey-color-700)" }), h("wpp-tooltip-v4-1-0", { text: this.nodeTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("p", { ref: el => (this.titleRef = el), class: "node-title" }, this.nodeTitle))), h("wpp-divider-v4-1-0", null), h("div", { ref: el => (this.bodyRef = el), class: "node-body" }, h("slot", { name: "body" })), this.hasScrollbar && h("wpp-divider-v4-1-0", null), h("div", { class: "node-actions" }, h("div", { class: "node-left-actions" }, h("wpp-menu-context-v4-1-0", { appendToListWrapper: true }, h("wpp-action-button-v4-1-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this.ariaProps.label } }, h("wpp-icon-plus-v4-1-0", { slot: "icon-start" })), h("div", null, h("wpp-list-item-v4-1-0", { onWppChangeListItem: () => this.handleActionClick({ icon: 'wpp-icon-file', label: this._locales.uploadFileAction }) }, h("wpp-icon-file-v4-1-0", { slot: "left" }), h("span", { slot: "label" }, this._locales.uploadFileAction)), this.actions.map((action) => (h("wpp-list-item-v4-1-0", { key: action.icon, onWppChangeListItem: () => this.handleActionClick(action) }, h(transformToVersionedTag(action.icon), { slot: 'left' }), h("span", { slot: "label" }, action.label)))))), h("wpp-tooltip-v4-1-0", { text: this._locales.filterAction, config: { placement: 'bottom' } }, h("wpp-action-button-v4-1-0", { variant: "secondary", "data-testid": "wpp-settings-btn", ariaProps: { label: this._locales.filterAction }, onClick: () => this.handleActionClick({ icon: 'wpp-icon-gear', label: this._locales.filterAction }) }, h("wpp-icon-gear-v4-1-0", { slot: "icon-start" })))), h("wpp-tooltip-v4-1-0", { text: this.isLoading ? this._locales.stopAction : this._locales.playAction, config: { placement: 'bottom' } }, h("wpp-action-button-v4-1-0", { variant: "secondary", "data-testid": "wpp-play-button", ariaProps: { label: this._locales[this.isLoading ? 'stopAction' : 'playAction'] }, onClick: () => this.handleActionClick({
        icon: `wpp-icon-${this.isLoading ? 'stop' : 'play'}`,
        label: this._locales[this.isLoading ? 'stopAction' : 'playAction'],
      }) }, this.isLoading ? h("wpp-icon-stop-v4-1-0", { slot: "icon-start" }) : h("wpp-icon-play-v4-1-0", { slot: "icon-start" })))))), h("slot", { name: "handles" })));
  }
  static get registryIs() { return "wpp-basic-node-v4-1-0"; }
  get host() { return this; }
  static get watchers() { return {
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppBasicNodeCss; }
}, [6, "wpp-basic-node", "wpp-basic-node-v4-1-0", {
    "nodeTitle": [1, "node-title"],
    "isLoading": [4, "is-loading"],
    "actions": [16],
    "locales": [16],
    "isSelected": [4, "is-selected"],
    "ariaProps": [16],
    "hasScrollbar": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-basic-node-v4-1-0", "wpp-action-button-v4-1-0", "wpp-checkbox-v4-1-0", "wpp-divider-v4-1-0", "wpp-icon-chevron-v4-1-0", "wpp-icon-cross-v4-1-0", "wpp-icon-dash-v4-1-0", "wpp-icon-error-v4-1-0", "wpp-icon-file-v4-1-0", "wpp-icon-gear-v4-1-0", "wpp-icon-info-message-v4-1-0", "wpp-icon-play-v4-1-0", "wpp-icon-plus-v4-1-0", "wpp-icon-service-v4-1-0", "wpp-icon-stop-v4-1-0", "wpp-icon-success-v4-1-0", "wpp-icon-tick-v4-1-0", "wpp-icon-warning-v4-1-0", "wpp-inline-message-v4-1-0", "wpp-internal-label-v4-1-0", "wpp-internal-tooltip-v4-1-0", "wpp-label-v4-1-0", "wpp-list-item-v4-1-0", "wpp-menu-context-v4-1-0", "wpp-spinner-v4-1-0", "wpp-tooltip-v4-1-0", "wpp-typography-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-basic-node-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppBasicNode$1);
      }
      break;
    case "wpp-action-button-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "wpp-checkbox-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "wpp-divider-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "wpp-icon-chevron-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "wpp-icon-cross-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-icon-dash-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-icon-error-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-icon-file-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-gear-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-info-message-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-play-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-plus-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-service-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-stop-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-success-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-tick-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-warning-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-inline-message-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-internal-label-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-internal-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-label-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-list-item-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-menu-context-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppBasicNode = WppBasicNode$1;
const defineCustomElement = defineCustomElement$1;

export { WppBasicNode, defineCustomElement };
