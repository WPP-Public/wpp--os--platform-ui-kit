'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');
const utils = require('./utils-9529c2fe.js');
const timeoutManager = require('./timeout-manager-5ad93b8f.js');
const types = require('./types-391abf05.js');
const consts = require('./consts-d8f5ef98.js');
const subscribeToTheme = require('./subscribe-to-theme-1879a649.js');

const LOCALES_DEFAULTS = {
  closeIconLabel: 'Close side panel',
  resizeHandleLabel: 'Resize handle',
};
const SIDE_PANEL_MIN_WIDTH = 280;
const SIDE_PANEL_MAX_WIDTH = 440;
// Width, in pixels, that each Arrow key press adds to or removes from the panel width.
const SIDE_PANEL_KEYBOARD_STEP = 10;

const wppSidePanelCss = ":host{--side-panel-min-width:280px;--side-panel-max-width:440px;--side-panel-box-shadow:var(--wpp-side-panel-box-shadow, var(--wpp-box-shadow-l));--side-panel-header-paddings:var(--wpp-side-panel-header-paddings, 8px 8px 8px 16px);--side-panel-body-padding:var(--wpp-side-panel-body-padding, 16px);--side-panel-actions-paddings:var(--wpp-side-panel-actions-paddings, 16px);--side-panel-scrollbar-width:0px;--side-panel-resize-handle-width:6px;--side-panel-resize-divider-width:2px;--side-panel-close-button-margin-left:var(--wpp-side-panel-close-button-margin-left, 8px);--side-panel-transition:0.2s ease-in-out;--side-panel-bg-color:var(--wpp-side-panel-bg-color, var(--wpp-grey-color-000));--side-panel-resize-handle-color:var(--wpp-side-panel-resize-handle-color, var(--wpp-brand-color));--side-panel-first-border-color-focus:var(--wpp-grey-color-000);--side-panel-second-border-color-focus:var(--wpp-brand-color)}:host(.wpp-side-panel-wrapper){position:fixed;inset:0 0 0 auto;display:block;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;font-family:var(--wpp-font-family, system-ui, sans-serif);visibility:hidden}:host(.wpp-component-ready){-webkit-transition:var(--side-panel-transition);transition:var(--side-panel-transition)}:host(.wpp-component-ready.wpp-visible){display:block;visibility:visible;opacity:1}:host(.wpp-hidden){visibility:hidden;opacity:0}.side-panel{position:absolute;top:0;right:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--wpp-side-panel-current-width, var(--side-panel-min-width));min-width:var(--side-panel-min-width);max-width:var(--side-panel-max-width);height:100%;background-color:var(--side-panel-bg-color);-webkit-box-shadow:var(--side-panel-box-shadow);box-shadow:var(--side-panel-box-shadow)}.side-panel.visible{-webkit-animation:fadeIn 0.2s ease-in-out forwards;animation:fadeIn 0.2s ease-in-out forwards}.side-panel.hide{-webkit-animation:fadeOut 0.2s ease-in-out forwards;animation:fadeOut 0.2s ease-in-out forwards}.resize-handle{position:absolute;top:0;left:0;z-index:1;width:var(--side-panel-resize-handle-width);height:100%;cursor:ew-resize;-ms-touch-action:none;touch-action:none}.resize-handle:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--side-panel-first-border-color-focus), 0 0 0 3px var(--side-panel-second-border-color-focus);box-shadow:0 0 0 1px var(--side-panel-first-border-color-focus), 0 0 0 3px var(--side-panel-second-border-color-focus)}.resize-handle::before{position:absolute;top:0;left:0;width:var(--side-panel-resize-divider-width);height:100%;background-color:transparent;-webkit-transition:background-color 0.15s ease-in-out;transition:background-color 0.15s ease-in-out;content:\"\"}.resize-handle:hover::before,.resize-handle:active::before{background-color:var(--side-panel-resize-handle-color)}.resize-handle:focus-visible:hover::before,.resize-handle:focus-visible:active::before{background-color:transparent}.header-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:var(--side-panel-header-paddings)}.header-container .title-tooltip{min-width:0;overflow:hidden}.header-container .title-tooltip::part(anchor){display:block;overflow:hidden}.header-container .title{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.header-container .close-button{margin-left:var(--side-panel-close-button-margin-left)}.body{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);height:100%;padding:var(--side-panel-body-padding) calc(var(--side-panel-body-padding) - var(--side-panel-scrollbar-width)) var(--side-panel-body-padding) var(--side-panel-body-padding);overflow-y:auto;scrollbar-gutter:stable}.body::-webkit-scrollbar{width:4px;height:4px}.body::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.actions-container{margin-top:auto}.actions{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);display:-ms-flexbox;display:flex;gap:12px;-ms-flex-pack:end;justify-content:flex-end;padding:var(--side-panel-actions-paddings)}.actions .wpp-button{-ms-flex:1;flex:1}.actions .wpp-button::part(button){-ms-flex:1;flex:1}@-webkit-keyframes fadeIn{from{-webkit-transform:translateX(100%);transform:translateX(100%)}to{-webkit-transform:translateX(0%);transform:translateX(0%)}}@keyframes fadeIn{from{-webkit-transform:translateX(100%);transform:translateX(100%)}to{-webkit-transform:translateX(0%);transform:translateX(0%)}}@-webkit-keyframes fadeOut{from{-webkit-transform:translateX(0%);transform:translateX(0%)}to{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes fadeOut{from{-webkit-transform:translateX(0%);transform:translateX(0%)}to{-webkit-transform:translateX(100%);transform:translateX(100%)}}:host([data-wpp-theme=dark]) .side-panel{background-color:var(--wpp-grey-color-100)}";

const WppSidePanel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppSidePanelClose = index.createEvent(this, "wppSidePanelClose", 1);
    this.wppSidePanelOpenStart = index.createEvent(this, "wppSidePanelOpenStart", 7);
    this.wppSidePanelOpenComplete = index.createEvent(this, "wppSidePanelOpenComplete", 7);
    this.wppSidePanelCloseStart = index.createEvent(this, "wppSidePanelCloseStart", 7);
    this.wppSidePanelCloseComplete = index.createEvent(this, "wppSidePanelCloseComplete", 7);
    this.wppSidePanelResize = index.createEvent(this, "wppSidePanelResize", 1);
    this.timeouts = new timeoutManager.TimeoutManager();
    // Resize state kept outside of @State to avoid re-renders on every pointer move.
    this.isResizing = false;
    this.resizeStartX = 0;
    this.pendingWidth = 0;
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.setScrollbarWidth = () => {
      if (!this.bodyRef)
        return;
      const scrollbarWidth = this.bodyRef.offsetWidth - this.bodyRef.clientWidth;
      this.host.style.setProperty('--side-panel-scrollbar-width', `${scrollbarWidth}px`);
    };
    this.clampWidth = (value) => Math.min(SIDE_PANEL_MAX_WIDTH, Math.max(SIDE_PANEL_MIN_WIDTH, Math.round(value)));
    this.applyWidthVar = (width) => {
      this.host.style.setProperty('--wpp-side-panel-current-width', `${width}px`);
    };
    this.handleCloseClick = () => {
      this.wppSidePanelClose.emit({ reason: types.SidePanelCloseReason.crossClick });
      this.closeReason = types.SidePanelCloseReason.crossClick;
    };
    this.handleResizeStart = (event) => {
      // Only the primary (left) button starts a resize; ignore right / middle clicks.
      if (event.button !== 0)
        return;
      event.preventDefault();
      this.isResizing = true;
      this.resizeStartX = event.clientX;
      this.pendingWidth = this.currentWidth;
      this.toggleResizeListeners(true);
    };
    this.handleResizeMove = (event) => {
      if (!this.isResizing)
        return;
      this.pendingWidth = this.clampWidth(this.currentWidth + (this.resizeStartX - event.clientX));
      this.applyWidthVar(this.pendingWidth);
    };
    this.handleResizeEnd = () => {
      if (!this.isResizing)
        return;
      const previousWidth = this.currentWidth;
      this.currentWidth = this.pendingWidth;
      this.isResizing = false;
      this.toggleResizeListeners(false);
      if (this.currentWidth !== previousWidth) {
        this.wppSidePanelResize.emit({ width: this.currentWidth });
      }
    };
    this.toggleResizeListeners = (add) => {
      const updateListener = add ? document.addEventListener.bind(document) : document.removeEventListener.bind(document);
      updateListener('pointermove', this.handleResizeMove);
      updateListener('pointerup', this.handleResizeEnd);
      updateListener('pointercancel', this.handleResizeEnd);
    };
    this.handleResizeKeyDown = (event) => {
      let nextWidth;
      switch (event.key) {
        case 'ArrowLeft':
          nextWidth = this.currentWidth + SIDE_PANEL_KEYBOARD_STEP;
          break;
        case 'ArrowRight':
          nextWidth = this.currentWidth - SIDE_PANEL_KEYBOARD_STEP;
          break;
        case 'End':
          nextWidth = SIDE_PANEL_MAX_WIDTH;
          break;
        case 'Home':
          nextWidth = SIDE_PANEL_MIN_WIDTH;
          break;
        default:
          return;
      }
      event.preventDefault();
      const clampedWidth = this.clampWidth(nextWidth);
      if (clampedWidth === this.currentWidth)
        return;
      this.currentWidth = clampedWidth;
      this.applyWidthVar(this.currentWidth);
      this.wppSidePanelResize.emit({ width: this.currentWidth });
    };
    this.handleTransitionStart = (event) => {
      if (event.propertyName !== 'visibility')
        return;
      if (this.open) {
        this.isHidden = false;
        this.wppSidePanelOpenStart.emit();
      }
      else if (this.closeReason) {
        this.wppSidePanelCloseStart.emit({ reason: this.closeReason });
      }
      else {
        this.wppSidePanelCloseStart.emit();
      }
    };
    this.handleTransitionEnd = (event) => {
      if (event.propertyName !== 'visibility')
        return;
      if (this.open) {
        this.wppSidePanelOpenComplete.emit();
        this.focusPanel();
      }
      else {
        this.isHidden = true;
        if (this.closeReason) {
          this.wppSidePanelCloseComplete.emit({ reason: this.closeReason });
        }
        else {
          this.wppSidePanelCloseComplete.emit();
        }
      }
      this.closeReason = null;
    };
    this.focusPanel = () => {
      this.panelRef?.focus();
    };
    this.hostCssClasses = () => ({
      'wpp-side-panel': true,
      'wpp-side-panel-wrapper': true,
      'wpp-visible': this.open,
      'wpp-hidden': this.isHidden,
    });
    this.panelCssClasses = () => ({
      'side-panel': true,
      visible: this.open,
      hide: !this.open,
    });
    this.renderActions = () => {
      if (!this.actionsConfig || this.actionsConfig.length !== 2)
        return null;
      const [secondaryConfig, primaryConfig] = this.actionsConfig;
      const { label: secondaryLabel, ...secondaryRest } = secondaryConfig;
      const { label: primaryLabel, ...primaryRest } = primaryConfig;
      return (index.h("div", { class: "actions-container" }, index.h("wpp-divider-v4-3-0", null), index.h("div", { class: "actions" }, index.h("wpp-button-v4-3-0", { size: "m", variant: "secondary", ...secondaryRest }, secondaryLabel), index.h("wpp-button-v4-3-0", { size: "m", variant: "primary", ...primaryRest }, primaryLabel))));
    };
    this.isHidden = true;
    this.closeReason = null;
    this.currentWidth = SIDE_PANEL_MIN_WIDTH;
    this.panelTitle = '';
    this.open = false;
    this.actionsConfig = undefined;
    this.zIndex = consts.Z_INDEX.SIDE_MODAL;
    this.ariaProps = {
      role: 'complementary',
    };
    this.locales = {};
  }
  /**
   * Method for opening the side panel.
   */
  async openPanel() {
    this.open = true;
  }
  /**
   * Method for closing the side panel.
   */
  async closePanel() {
    this.open = false;
  }
  handleChangeOpenStatus(openStatus) {
    if (openStatus) {
      this.host.classList.add('wpp-component-ready');
    }
  }
  handleCloseOnEsc(event) {
    if (event.key === 'Escape' && this.open && utils.isEventTargetContained(this.host, event)) {
      this.wppSidePanelClose.emit({ reason: types.SidePanelCloseReason.escapePress });
      this.closeReason = types.SidePanelCloseReason.escapePress;
    }
  }
  componentDidLoad() {
    this.setScrollbarWidth();
    this.timeouts.schedule(() => {
      this.open && this.host.classList.add('wpp-component-ready');
    });
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.timeouts.clearAll();
    this.toggleResizeListeners(false);
  }
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: {
        zIndex: this.zIndex.toString(),
      }, role: this.ariaProps.role, "aria-label": this.ariaProps.label || this.panelTitle || undefined }, index.h("div", { class: this.panelCssClasses(), tabindex: "-1", ref: ref => (this.panelRef = ref), "data-testid": "wpp-side-panel-content" }, index.h("div", { class: "resize-handle", role: "separator", tabindex: "0", "aria-orientation": "vertical", "aria-label": this._locales.resizeHandleLabel, "aria-valuenow": this.currentWidth, "aria-valuemin": SIDE_PANEL_MIN_WIDTH, "aria-valuemax": SIDE_PANEL_MAX_WIDTH, "aria-valuetext": `${this.currentWidth}px`, onPointerDown: this.handleResizeStart, onKeyDown: this.handleResizeKeyDown, "data-testid": "wpp-side-panel-resize-handle" }), index.h("div", { class: "header-container" }, index.h("wpp-tooltip-v4-3-0", { class: "title-tooltip", text: this.panelTitle, config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, index.h("wpp-typography-v4-3-0", { ref: el => (this.titleRef = el), type: "s-strong", class: "title" }, this.panelTitle)), index.h("wpp-action-button-v4-3-0", { ariaProps: { label: this._locales.closeIconLabel }, variant: "secondary", onClick: this.handleCloseClick, class: "close-button" }, index.h("wpp-icon-cross-v4-3-0", { slot: "icon-start" }))), index.h("wpp-divider-v4-3-0", null), index.h("div", { class: "body", ref: el => (this.bodyRef = el) }, index.h("slot", null)), this.renderActions())));
  }
  static get registryIs() { return "wpp-side-panel-v4-3-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["handleChangeOpenStatus"]
  }; }
};
WppSidePanel.style = wppSidePanelCss;

exports.wpp_side_panel = WppSidePanel;
