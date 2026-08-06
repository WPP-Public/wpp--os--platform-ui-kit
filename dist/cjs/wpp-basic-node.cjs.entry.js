'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');
const utils = require('./utils-9529c2fe.js');
const subscribeToTheme = require('./subscribe-to-theme-1879a649.js');
require('./consts-d8f5ef98.js');

const LOCALES_DEFAULTS = {
  playAction: 'Run',
  stopAction: 'Stop',
  reRunAction: 'Re-run',
  filterAction: 'Settings',
  uploadFileAction: 'Upload',
};

const wppBasicNodeCss = ".sc-wpp-basic-node-h{display:inline-block;width:100%;height:100%;min-width:280px;min-height:280px;max-width:440px;max-height:600px;position:relative}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node{height:100%;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.sc-wpp-basic-node-h .node-container.loading-node.sc-wpp-basic-node::before{content:\"\";position:absolute;z-index:0;inset:-2px;pointer-events:none;background:conic-gradient(from var(--loading-angle), var(--wpp-primary-color-500), var(--wpp-primary-color-100), var(--wpp-primary-color-500));-webkit-animation:loading-rotate 2s linear infinite;animation:loading-rotate 2s linear infinite;border-radius:calc(var(--wpp-border-radius-l) + 2px)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node:not(.loading-node) .node-wrapper.is-selected.sc-wpp-basic-node::before{content:\"\";position:absolute;inset:-1px;pointer-events:none;border:var(--wpp-border-width-s) solid var(--wpp-primary-color-500);border-radius:calc(var(--wpp-border-radius-l) + 1px)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node{position:relative;z-index:1;border-radius:var(--wpp-border-radius-l);background-color:var(--wpp-grey-color-000);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--wpp-box-shadow-s);box-shadow:var(--wpp-box-shadow-s);width:100%;height:100%;max-height:600px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node:hover{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node{padding:21px 22px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;gap:10px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .title-tooltip.sc-wpp-basic-node{width:100%;overflow:hidden}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .title-tooltip.sc-wpp-basic-node::part(anchor){width:100%}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .node-title.sc-wpp-basic-node{margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node{-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;padding:16px 6px 16px 16px;overflow-y:auto;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node::-webkit-scrollbar{width:4px;height:4px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node{padding:16px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node .node-left-actions.sc-wpp-basic-node{display:-ms-flexbox;display:flex;gap:4px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node .play-btn.sc-wpp-basic-node{--button-padding-s:6px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node .play-btn.sc-wpp-basic-node::part(icon-start-wrapper){margin:0}.sc-wpp-basic-node-s>[slot=handles]{position:absolute;inset:0;pointer-events:none;-ms-flex:none;flex:none;z-index:2}@property --loading-angle{syntax:\"<angle>\";initial-value:0deg;inherits:false}@-webkit-keyframes loading-rotate{to{--loading-angle:360deg}}@keyframes loading-rotate{to{--loading-angle:360deg}}[data-wpp-theme=dark].sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node{background-color:var(--wpp-grey-color-100)}";

const WppBasicNode = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppActionClick = index.createEvent(this, "wppActionClick", 7);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.resizeObserver = undefined;
    // Watches the slotted `body` content for added/removed nodes. `slotchange` is not an option here:
    // it only fires for real shadow-DOM slots, and this component is `scoped`, so its slots are emulated.
    this.slotObserver = undefined;
    this.bodyRef = undefined;
    this.titleRef = undefined;
    this.checkBodyForScroll = () => {
      if (this.bodyRef) {
        this.hasScrollbar = this.bodyRef.clientHeight < this.bodyRef.scrollHeight;
      }
    };
    this.handleActionClick = (action) => {
      this.wppActionClick.emit(action);
    };
    /**
     * Reflects whether any content is projected into the `body` slot in the `hasContent` state.
     * Runs on load and whenever the slotted content changes (see `slotObserver`).
     */
    this.updateHasContent = () => {
      const body = this.host.querySelector('[slot="body"]');
      this.hasContent = !!body && (body.children.length > 0 || (body.textContent?.trim().length ?? 0) > 0);
    };
    this.getPrimaryAction = () => {
      if (this.isLoading) {
        return {
          icon: 'wpp-icon-stop',
          label: this._locales.stopAction,
          variant: 'secondary',
          testId: 'wpp-pause-button',
        };
      }
      if (this.isReRun) {
        return {
          icon: 'wpp-icon-refresh',
          label: this._locales.reRunAction,
          variant: 'primary',
          testId: 'wpp-rerun-button',
        };
      }
      return { icon: 'wpp-icon-play', label: this._locales.playAction, variant: 'primary', testId: 'wpp-play-button' };
    };
    this.handlePrimaryActionClick = () => {
      const { icon, label } = this.getPrimaryAction();
      this.handleActionClick({ icon, label });
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
    this.hasContent = false;
    this.nodeTitle = 'Title';
    this.isLoading = false;
    this.isReRun = false;
    this.actions = [];
    this.locales = {};
    this.isSelected = false;
    this.ariaProps = {
      label: 'Open node actions',
    };
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
    this.slotObserver?.disconnect();
    this.slotObserver = undefined;
  }
  componentWillLoad() {
    // Determine the initial content state of the `body` slot.
    this.updateHasContent();
  }
  componentDidLoad() {
    if (!this.bodyRef)
      return;
    // Re-evaluate whenever the slotted `body` content changes.
    this.slotObserver = new MutationObserver(() => {
      this.updateHasContent();
    });
    this.slotObserver.observe(this.bodyRef, { childList: true, subtree: true });
  }
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    const primaryAction = this.getPrimaryAction();
    return (index.h(index.Host, { class: "wpp-basic-node" }, index.h("div", { class: this.getNodeContainerClasses() }, index.h("div", { class: this.getNodeWrapperClasses() }, index.h("div", { class: "node-header" }, index.h("wpp-icon-service-v4-3-0", { color: "var(--wpp-grey-color-700)" }), index.h("wpp-tooltip-v4-3-0", { text: this.nodeTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, index.h("p", { ref: el => (this.titleRef = el), class: "node-title" }, this.nodeTitle))), index.h("wpp-divider-v4-3-0", null), index.h("div", { ref: el => (this.bodyRef = el), class: "node-body" }, index.h("slot", { name: "body" })), this.hasScrollbar && index.h("wpp-divider-v4-3-0", null), index.h("div", { class: "node-actions" }, index.h("div", { class: "node-left-actions" }, index.h("wpp-menu-context-v4-3-0", { appendToListWrapper: true }, index.h("wpp-action-button-v4-3-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this.ariaProps.label } }, index.h("wpp-icon-plus-v4-3-0", { slot: "icon-start" })), index.h("div", null, index.h("wpp-list-item-v4-3-0", { onWppChangeListItem: () => this.handleActionClick({ icon: 'wpp-icon-file', label: this._locales.uploadFileAction }) }, index.h("wpp-icon-file-v4-3-0", { slot: "left" }), index.h("span", { slot: "label" }, this._locales.uploadFileAction)), this.actions.map((action) => (index.h("wpp-list-item-v4-3-0", { key: action.icon, onWppChangeListItem: () => this.handleActionClick(action) }, index.h(utils.transformToVersionedTag(action.icon), { slot: 'left' }), index.h("span", { slot: "label" }, action.label)))))), index.h("wpp-tooltip-v4-3-0", { text: this._locales.filterAction, config: { placement: 'bottom' } }, index.h("wpp-action-button-v4-3-0", { variant: "secondary", "data-testid": "wpp-settings-btn", ariaProps: { label: this._locales.filterAction }, onClick: () => this.handleActionClick({ icon: 'wpp-icon-gear', label: this._locales.filterAction }) }, index.h("wpp-icon-gear-v4-3-0", { slot: "icon-start" })))), (this.isSelected || this.isLoading || this.isReRun) && (index.h("wpp-tooltip-v4-3-0", { text: primaryAction.label, config: { placement: 'bottom' } }, index.h("wpp-button-v4-3-0", { class: "play-btn", size: "s", disabled: !this.hasContent && !this.isLoading && !this.isReRun, variant: primaryAction.variant, "data-testid": primaryAction.testId, ariaProps: { label: primaryAction.label }, onClick: this.handlePrimaryActionClick }, this.isLoading ? (index.h("wpp-icon-stop-v4-3-0", { slot: "icon-start" })) : this.isReRun ? (index.h("wpp-icon-refresh-v4-3-0", { slot: "icon-start" })) : (index.h("wpp-icon-play-v4-3-0", { slot: "icon-start" })))))))), index.h("slot", { name: "handles" })));
  }
  static get registryIs() { return "wpp-basic-node-v4-3-0"; }
  get host() { return index.getElement(this); }
};
WppBasicNode.style = wppBasicNodeCss;

exports.wpp_basic_node = WppBasicNode;
