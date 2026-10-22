import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-a0877c3d.js';
import { y as mergeLocales, k as transformToVersionedTag } from './utils-49ce8daf.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-487838b3.js';
import { r as registerLoadingHaloAngle } from './loading-halo-2a7b93f0.js';
import './consts-744c144f.js';
import './theme-observer-b7886d19.js';

const LOCALES_DEFAULTS = {
  playAction: 'Run',
  stopAction: 'Stop',
  reRunAction: 'Re-run',
  filterAction: 'Settings',
  uploadFileAction: 'Upload',
  /**
   * The `{nodeTitle}` placeholder is replaced with the title of the node internally.
   */
  errorAnnouncement: '{nodeTitle} error:',
  dismissErrorAction: 'Dismiss error message',
};

const wppBasicNodeCss = ".sc-wpp-basic-node-h{--bn-header-padding:22px 24px 22px 22px;--bn-error-message-margin-bottom:16px;display:inline-block;width:100%;height:100%;min-width:280px;min-height:280px;max-width:440px;max-height:600px;position:relative}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node{height:100%;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;--bn-state-border-color:var(--wpp-primary-color-500)}.sc-wpp-basic-node-h .node-container.loading-node.sc-wpp-basic-node::before{content:\"\";position:absolute;z-index:0;inset:calc(-1 * (0px + 2px + 13px));pointer-events:none;background:conic-gradient(from var(--wpp-loading-halo-angle), transparent 0%, color-mix(in srgb, var(--wpp-loading-halo-glow-color, var(--wpp-dataviz-color-seq-brand-400)) 65%, transparent) 16%, transparent 40%);-webkit-filter:blur(10px);filter:blur(10px);-webkit-animation:wpp-loading-halo-rotate 2s linear infinite;animation:wpp-loading-halo-rotate 2s linear infinite;border-radius:calc(var(--wpp-border-radius-l) + 2px + 6px)}.sc-wpp-basic-node-h .node-container.loading-node.sc-wpp-basic-node::after{content:\"\";position:absolute;z-index:0;inset:calc(-1 * (0px + 2px));pointer-events:none;background:conic-gradient(from var(--wpp-loading-halo-angle), transparent 0%, var(--wpp-loading-halo-highlight-color, var(--wpp-dataviz-color-seq-brand-600)) 12%, var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900)) 30%, transparent 46%);-webkit-animation:wpp-loading-halo-rotate 2s linear infinite;animation:wpp-loading-halo-rotate 2s linear infinite;border-radius:calc(var(--wpp-border-radius-l) + 2px)}@media (prefers-reduced-motion: reduce){.sc-wpp-basic-node-h .node-container.loading-node.sc-wpp-basic-node::before{display:none}.sc-wpp-basic-node-h .node-container.loading-node.sc-wpp-basic-node::after{-webkit-animation:none;animation:none;background:var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900))}}@-webkit-keyframes wpp-loading-halo-rotate{to{--wpp-loading-halo-angle:360deg}}@keyframes wpp-loading-halo-rotate{to{--wpp-loading-halo-angle:360deg}}.sc-wpp-basic-node-h .node-container.has-error.sc-wpp-basic-node{--bn-state-border-color:var(--wpp-danger-color-500)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.is-selected.sc-wpp-basic-node::before,.sc-wpp-basic-node-h .node-container.has-error.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node::before{content:\"\";position:absolute;inset:-1px;pointer-events:none;border:var(--wpp-border-width-s) solid var(--bn-state-border-color);border-radius:calc(var(--wpp-border-radius-l) + 1px)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node{position:relative;z-index:1;border-radius:var(--wpp-border-radius-l);background-color:var(--wpp-grey-color-000);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--wpp-box-shadow-s);box-shadow:var(--wpp-box-shadow-s);width:100%;height:100%;max-height:600px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node:hover{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node{padding:var(--bn-header-padding);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;gap:10px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .title-tooltip.sc-wpp-basic-node{width:100%;overflow:hidden}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .title-tooltip.sc-wpp-basic-node::part(anchor){width:100%}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .node-title.sc-wpp-basic-node{margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .error-icon.sc-wpp-basic-node:focus-visible{border-radius:var(--wpp-border-radius-xs);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-header.sc-wpp-basic-node .is-error-dismissed.sc-wpp-basic-node{cursor:pointer}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node{-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;padding:16px 6px 16px 16px;overflow-y:auto;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node::-webkit-scrollbar{width:4px;height:4px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node .error-message.sc-wpp-basic-node{display:block}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-body.sc-wpp-basic-node .error-message.with-content.sc-wpp-basic-node{margin-bottom:var(--bn-error-message-margin-bottom)}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node{padding:16px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node .node-left-actions.sc-wpp-basic-node{display:-ms-flexbox;display:flex;gap:4px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node .play-btn.sc-wpp-basic-node{--button-padding-s:6px}.sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node .node-actions.sc-wpp-basic-node .play-btn.sc-wpp-basic-node::part(icon-start-wrapper){margin:0}.sr-only.sc-wpp-basic-node{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;-webkit-clip-path:inset(50%);clip-path:inset(50%);border:0;white-space:nowrap}.sc-wpp-basic-node-s>[slot=handles]{position:absolute;inset:0;pointer-events:none;-ms-flex:none;flex:none;z-index:2}[data-wpp-theme=dark].sc-wpp-basic-node-h .node-container.sc-wpp-basic-node .node-wrapper.sc-wpp-basic-node{background-color:var(--wpp-grey-color-100)}";

const WppBasicNode = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppActionClick = createEvent(this, "wppActionClick", 7);
    this.wppDismissError = createEvent(this, "wppDismissError", 1);
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.resizeObserver = undefined;
    // Watches the slotted `body` content for added/removed nodes. `slotchange` is not an option here:
    // it only fires for real shadow-DOM slots, and this component is `scoped`, so its slots are emulated.
    this.slotObserver = undefined;
    this.bodyRef = undefined;
    this.titleRef = undefined;
    this.errorIconRef = undefined;
    // Set on dismiss, so only the tooltip created by a dismissal moves focus to the error icon
    // (and not one re-created later, e.g. when the node is re-attached to the DOM).
    this.shouldFocusErrorIcon = false;
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
    this.getErrorAnnouncement = () => this._locales.errorAnnouncement.replace('{nodeTitle}', this.nodeTitle);
    this.handleErrorDismiss = () => {
      this.shouldFocusErrorIcon = true;
      this.isErrorDismissed = true;
      this.wppDismissError.emit();
    };
    this.handlePrimaryActionClick = () => {
      const { icon, label } = this.getPrimaryAction();
      this.handleActionClick({ icon, label });
    };
    this.getNodeContainerClasses = () => ({
      'node-container': true,
      'loading-node': this.isLoading,
      'has-error': !!this.errorMessage && !this.isLoading,
    });
    this.getNodeWrapperClasses = () => ({
      'node-wrapper': true,
      'is-selected': this.isSelected && !this.isLoading,
    });
    // The spacing between the error message and the slotted body content is owned by the node, so it is consistent
    // across consumers and follows the message: removed on dismiss and restored with the next error.
    this.getErrorMessageClasses = () => ({
      'error-message': true,
      'with-content': this.hasContent,
    });
    this.getErrorIconClasses = () => ({
      'error-icon': true,
      'is-error-dismissed': this.isErrorDismissed,
    });
    this.hasScrollbar = false;
    this.hasContent = false;
    this.isErrorDismissed = false;
    this.nodeTitle = 'Title';
    this.isLoading = false;
    this.isReRun = false;
    this.errorMessage = undefined;
    this.actions = [];
    this.locales = {};
    this.isSelected = false;
    this.ariaProps = {
      label: 'Open node actions',
    };
  }
  // A new (or cleared) error shows the inline message again.
  onErrorMessageChange() {
    this.isErrorDismissed = false;
  }
  connectedCallback() {
    // Needed for the loading animation to rotate (see `registerLoadingHaloAngle`).
    registerLoadingHaloAngle();
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
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    const primaryAction = this.getPrimaryAction();
    return (h(Host, { class: "wpp-basic-node" }, h("div", { class: this.getNodeContainerClasses() }, h("div", { class: this.getNodeWrapperClasses() }, h("div", { class: "node-header" }, h("wpp-icon-service-v4-6-0", { color: "var(--wpp-grey-color-700)" }), h("wpp-tooltip-v4-6-0", { text: this.nodeTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("p", { ref: el => (this.titleRef = el), class: "node-title" }, this.nodeTitle)), this.errorMessage && (
    // The tooltip and the keyboard stop are only enabled once the inline message is dismissed,
    // as the icon is then the only place where the error message can be read.
    h("wpp-tooltip-v4-6-0", { text: this.errorMessage, disabled: !this.isErrorDismissed, config: {
        // Lets the pointer move onto the tooltip without it closing (WCAG 1.4.13 Content on Hover or Focus).
        interactive: true,
        onCreate: () => {
          if (!this.shouldFocusErrorIcon)
            return;
          this.shouldFocusErrorIcon = false;
          // Focus the error icon after the inline message is dismissed, so screen readers can read the tooltip.
          setTimeout(() => {
            this.errorIconRef?.focus();
          }, 0);
        },
        onShow: instance => {
          const icon = instance.reference;
          if (!icon.matches(':hover') && !icon.matches(':focus-visible'))
            return false;
        },
      } }, h("wpp-icon-error-v4-6-0", { ref: el => (this.errorIconRef = el), class: this.getErrorIconClasses(), tabIndex: this.isErrorDismissed ? 0 : undefined, role: this.isErrorDismissed ? 'img' : undefined, "aria-label": this.isErrorDismissed ? `${this.getErrorAnnouncement()} ${this.errorMessage}` : undefined })))), h("wpp-divider-v4-6-0", null), h("div", { ref: el => (this.bodyRef = el), class: "node-body" }, h("div", { class: "error-region", role: "alert", "aria-atomic": "true" }, this.errorMessage &&
      !this.isErrorDismissed && [
      // Identifies the node in the announcement, as several nodes can be in error on the same canvas.
      h("span", { class: "sr-only" }, this.getErrorAnnouncement()),
      // Removed (not just hidden) on dismiss, so the next error renders a fresh inline message.
      h("wpp-inline-message-v4-6-0", { class: this.getErrorMessageClasses(), size: "l", type: "error", message: this.errorMessage, locales: { close: this._locales.dismissErrorAction }, isCompact: true, onWppClickCloseBtn: this.handleErrorDismiss }),
    ]), h("slot", { name: "body" })), this.hasScrollbar && h("wpp-divider-v4-6-0", null), h("div", { class: "node-actions" }, h("div", { class: "node-left-actions" }, h("wpp-menu-context-v4-6-0", { appendToListWrapper: true }, h("wpp-action-button-v4-6-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this.ariaProps.label } }, h("wpp-icon-plus-v4-6-0", { slot: "icon-start" })), h("div", null, h("wpp-list-item-v4-6-0", { onWppChangeListItem: () => this.handleActionClick({ icon: 'wpp-icon-file', label: this._locales.uploadFileAction }) }, h("wpp-icon-file-v4-6-0", { slot: "left" }), h("span", { slot: "label" }, this._locales.uploadFileAction)), this.actions.map((action) => (h("wpp-list-item-v4-6-0", { key: action.icon, onWppChangeListItem: () => this.handleActionClick(action) }, h(transformToVersionedTag(action.icon), { slot: 'left' }), h("span", { slot: "label" }, action.label)))))), h("wpp-tooltip-v4-6-0", { text: this._locales.filterAction, config: { placement: 'bottom' } }, h("wpp-action-button-v4-6-0", { variant: "secondary", "data-testid": "wpp-settings-btn", ariaProps: { label: this._locales.filterAction }, onClick: () => this.handleActionClick({ icon: 'wpp-icon-gear', label: this._locales.filterAction }) }, h("wpp-icon-gear-v4-6-0", { slot: "icon-start" })))), (this.isSelected || this.isLoading || this.isReRun) && (h("wpp-tooltip-v4-6-0", { text: primaryAction.label, config: { placement: 'bottom' } }, h("wpp-button-v4-6-0", { class: "play-btn", size: "s", disabled: !this.hasContent && !this.isLoading && !this.isReRun, variant: primaryAction.variant, "data-testid": primaryAction.testId, ariaProps: { label: primaryAction.label }, onClick: this.handlePrimaryActionClick }, this.isLoading ? (h("wpp-icon-stop-v4-6-0", { slot: "icon-start" })) : this.isReRun ? (h("wpp-icon-refresh-v4-6-0", { slot: "icon-start" })) : (h("wpp-icon-play-v4-6-0", { slot: "icon-start" })))))))), h("slot", { name: "handles" })));
  }
  static get registryIs() { return "wpp-basic-node-v4-6-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "errorMessage": ["onErrorMessageChange"]
  }; }
};
WppBasicNode.style = wppBasicNodeCss;

export { WppBasicNode as wpp_basic_node };
