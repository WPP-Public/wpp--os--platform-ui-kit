import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { A as ANIMATION_PROPERTY_NAME, Z as Z_INDEX } from './consts.js';
import { g as getSlotEmptyStates, m as applyBodyStylesIfNeeded, x as getOsBarOffsetHeight } from './utils.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { d as defineCustomElement$5 } from './wpp-action-button2.js';
import { d as defineCustomElement$4 } from './wpp-icon-cross2.js';
import { d as defineCustomElement$3 } from './wpp-overlay2.js';
import { d as defineCustomElement$2 } from './wpp-spinner2.js';

var FullScreenModalCloseReason;
(function (FullScreenModalCloseReason) {
  FullScreenModalCloseReason["outsideClick"] = "outsideClick";
  FullScreenModalCloseReason["cancelClick"] = "cancelClick";
  FullScreenModalCloseReason["escapePress"] = "escapePress";
})(FullScreenModalCloseReason || (FullScreenModalCloseReason = {}));

const wppFullScreenModalCss = ":host{--full-screen-modal-width:var(--wpp-full-screen-modal-width, 95%);--full-screen-modal-height:var(--wpp-full-screen-modal-height, 90%);--full-screen-modal-box-shadow:var(--wpp-full-screen-modal-box-shadow, var(--wpp-box-shadow-l));--full-screen-modal-body-paddings:var(--wpp-full-screen-modal-body-paddings, 0 32px);--full-screen-modal-actions-paddings:var(--wpp-full-screen-modal-actions-paddings, 32px);--full-screen-modal-header-padding:var(--wpp-full-screen-modal-header-padding, 24px 24px 20px 32px);--full-screen-modal-transition:visibility 0.15s linear 0.2s, opacity 0.2s 0.2s;--full-screen-modal-bg-color:var(--wpp-full-screen-modal-bg-color, var(--wpp-grey-color-000));--full-screen-modal-close-button-margin-left:var(--wpp-full-screen-modal-close-button-margin-left, auto)}:host(.wpp-full-screen-modal-wrapper){position:fixed;top:var(--wpp-full-screen-modal-top-offset, 0);right:0;bottom:0;left:0;display:block;font-family:var(--wpp-font-family);visibility:hidden;opacity:0}:host(.component-ready){-webkit-transition:var(--full-screen-modal-transition);transition:var(--full-screen-modal-transition)}:host(.wpp-visible.component-ready){display:block;visibility:visible;opacity:1}:host(.wpp-hide){visibility:hidden !important;opacity:0}:host(.wpp-visible:target){opacity:1}.header-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--full-screen-modal-header-padding)}.header-container .close-button{margin-left:var(--full-screen-modal-close-button-margin-left)}.header-container .header{width:100%}.header.slot-hidden,.body.slot-hidden,.actions.slot-hidden{display:none}.header{font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);font-weight:var(--wpp-typography-2xl-heading-font-weight, 400);color:var(--wpp-typography-2xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0)}.body{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);height:100%;padding:var(--full-screen-modal-body-paddings);overflow-y:auto}.body::-webkit-scrollbar{width:4px;height:4px}.body::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.actions{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);padding:var(--full-screen-modal-actions-paddings)}.full-screen-modal-overlay{position:absolute;width:100%;height:100%}.full-screen-modal{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:absolute;top:50%;left:50%;background-color:var(--full-screen-modal-bg-color);border-radius:var(--wpp-border-radius-l);-webkit-box-shadow:var(--full-screen-modal-box-shadow);box-shadow:var(--full-screen-modal-box-shadow);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);width:var(--full-screen-modal-width);height:var(--full-screen-modal-height)}.full-screen-modal.visible{-webkit-animation:fullScreenModalAppearAboveCenterAnimations 0.2s linear;animation:fullScreenModalAppearAboveCenterAnimations 0.2s linear;-webkit-animation-delay:0.15s;animation-delay:0.15s}.focus-sentinel{position:fixed;opacity:0;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media (max-height: 800px){.full-screen-modal{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.full-screen-modal.visible{-webkit-animation:fullScreenModalAppearInCenterAnimations 0.2s linear forwards;animation:fullScreenModalAppearInCenterAnimations 0.2s linear forwards;-webkit-animation-delay:0.15s;animation-delay:0.15s}}@-webkit-keyframes fullScreenModalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes fullScreenModalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@-webkit-keyframes fullScreenModalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes fullScreenModalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}";

const WppFullScreenModal$1 = /*@__PURE__*/ proxyCustomElement(class WppFullScreenModal extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppFullScreenModalClose = createEvent(this, "wppFullScreenModalClose", 1);
    this.wppFullScreenModalOpenStart = createEvent(this, "wppFullScreenModalOpenStart", 7);
    this.wppFullScreenModalOpenComplete = createEvent(this, "wppFullScreenModalOpenComplete", 7);
    this.wppFullScreenModalCloseStart = createEvent(this, "wppFullScreenModalCloseStart", 7);
    this.wppFullScreenModalCloseComplete = createEvent(this, "wppFullScreenModalCloseComplete", 7);
    this.wppFullScreenModalOpen = createEvent(this, "wppFullScreenModalOpen", 1);
    this.topOffset = 0;
    this.pendingTimeouts = [];
    this.onOverlayClick = () => {
      if (this.disableOutsideClick)
        return;
      this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.outsideClick });
      this.closeReason = FullScreenModalCloseReason.outsideClick;
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        header: '[slot="header"]',
        body: '[slot="body"]',
        actions: '[slot="actions"]',
      });
      this.hasHeaderSlot = !emptyStates.header;
      this.hasBodySlot = !emptyStates.body;
      this.hasActionsSlot = !emptyStates.actions;
    };
    this.handleTransitionStart = (event) => {
      if (event.propertyName !== ANIMATION_PROPERTY_NAME)
        return;
      if (this.open) {
        this.wppFullScreenModalOpenStart.emit();
      }
      else {
        if (this.closeReason) {
          this.wppFullScreenModalCloseStart.emit({ reason: this.closeReason });
        }
        else {
          this.wppFullScreenModalCloseStart.emit();
        }
      }
    };
    this.handleTransitionEnd = (event) => {
      if (event.propertyName !== ANIMATION_PROPERTY_NAME)
        return;
      if (this.open) {
        this.wppFullScreenModalOpenComplete.emit();
        this.wppFullScreenModalOpen.emit();
        this.focusDialog();
      }
      else {
        if (this.closeReason) {
          this.wppFullScreenModalCloseComplete.emit({ reason: this.closeReason });
        }
        else {
          this.wppFullScreenModalCloseComplete.emit();
        }
      }
      this.closeReason = null;
    };
    this.focusDialog = () => {
      if (!this.dialogRef)
        return;
      this.dialogRef.focus();
    };
    this.handleCloseModal = () => {
      this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.escapePress });
      this.closeReason = FullScreenModalCloseReason.escapePress;
    };
    this.headerCssClasses = () => ({
      header: true,
      'slot-hidden': !this.hasHeaderSlot,
    });
    this.bodyCssClasses = () => ({
      body: true,
      'slot-hidden': !this.hasBodySlot,
    });
    this.actionsCssClasses = () => ({
      actions: true,
      'slot-hidden': !this.hasActionsSlot,
    });
    this.hostCssClasses = () => ({
      'wpp-full-screen-modal': true,
      'wpp-full-screen-modal-wrapper': true,
      'wpp-visible': this.open,
      'wpp-hide': !this.open,
      'wpp-os-bar-compatible': this.osBarCompatible,
    });
    this.fullScreenModalCssClasses = () => ({
      'full-screen-modal': true,
      visible: this.open,
      hide: !this.open,
    });
    this.headerContainerCssClasses = () => ({
      'header-container': true,
    });
    this.hasHeaderSlot = false;
    this.hasBodySlot = false;
    this.hasActionsSlot = false;
    this.closeReason = null;
    this.open = false;
    this.withTransparentOverlay = undefined;
    this.disableOutsideClick = false;
    this.formConfig = undefined;
    this.zIndex = Z_INDEX.MODAL;
    this.osBarCompatible = false;
    this.ariaProps = {
      role: 'dialog',
      labelledby: 'dialog_label',
    };
  }
  handleCloseOnEsc(event) {
    if (event.key === 'Escape' && this.open) {
      this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.escapePress });
      this.closeReason = FullScreenModalCloseReason.escapePress;
    }
  }
  handleChangeFullScreenModalStatus(openStatus) {
    if (openStatus) {
      this.host.classList.add('component-ready');
    }
    this.pendingTimeouts.push(setTimeout(() => {
      applyBodyStylesIfNeeded(this.open ? 'add' : 'remove');
    }));
  }
  /**
   * Method for closing the full screen modal.
   */
  async closeFullScreenModal() {
    this.open = false;
  }
  /**
   * Method for opening the full screen modal.
   */
  async openFullScreenModal() {
    this.open = true;
  }
  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    this.pendingTimeouts.push(setTimeout(() => {
      this.open && this.host.classList.add('component-ready');
    }, 0));
  }
  // TODO: topOffset is calculated once on mount. If the OS bar height becomes dynamic
  //       (e.g., responsive resize), consider recalculating via ResizeObserver or a shared CSS variable on :root.
  componentWillLoad() {
    this.topOffset = this.osBarCompatible ? getOsBarOffsetHeight() : 0;
  }
  disconnectedCallback() {
    this.pendingTimeouts.forEach(id => clearTimeout(id));
    this.pendingTimeouts = [];
    this.closeFullScreenModal();
  }
  render() {
    const Tag = this.formConfig ? 'form' : 'div';
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, full-screen-modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: { zIndex: this.zIndex.toString(), '--wpp-full-screen-modal-top-offset': `${this.topOffset}px` }, role: this.ariaProps.role, "aria-labelledby": this.ariaProps.labelledby, "aria-modal": "true" }, h("div", { class: "full-screen-modal-overlay", part: "wrapper" }, h("wpp-overlay-v3-6-0", { ...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {}), isVisible: this.open, onWppClick: this.onOverlayClick, zIndex: 0 }), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }), h(Tag, { tabindex: "-1", class: this.fullScreenModalCssClasses(), part: "content", ...this.formConfig, "data-testid": "wpp-fullscreen-modal-content", ref: ref => (this.dialogRef = ref) }, h("div", { class: this.headerContainerCssClasses() }, h(WrappedSlot, { id: this.ariaProps.labelledby, wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }), h("wpp-action-button-v3-6-0", { variant: "secondary", onClick: this.handleCloseModal, class: "close-button" }, h("wpp-icon-cross-v3-6-0", { slot: "icon-start" }))), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }))));
  }
  static get registryIs() { return "wpp-full-screen-modal-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "open": ["handleChangeFullScreenModalStatus"]
  }; }
  static get style() { return wppFullScreenModalCss; }
}, [1, "wpp-full-screen-modal", "wpp-full-screen-modal-v3-6-0", {
    "open": [1540],
    "withTransparentOverlay": [4, "with-transparent-overlay"],
    "disableOutsideClick": [4, "disable-outside-click"],
    "formConfig": [16],
    "zIndex": [2, "z-index"],
    "osBarCompatible": [4, "os-bar-compatible"],
    "ariaProps": [16],
    "hasHeaderSlot": [32],
    "hasBodySlot": [32],
    "hasActionsSlot": [32],
    "closeReason": [32],
    "closeFullScreenModal": [64],
    "openFullScreenModal": [64]
  }, [[4, "keydown", "handleCloseOnEsc"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-full-screen-modal-v3-6-0", "wpp-action-button-v3-6-0", "wpp-icon-cross-v3-6-0", "wpp-overlay-v3-6-0", "wpp-spinner-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-full-screen-modal-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppFullScreenModal$1);
      }
      break;
    case "wpp-action-button-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-icon-cross-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-overlay-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-spinner-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppFullScreenModal = WppFullScreenModal$1;
const defineCustomElement = defineCustomElement$1;

export { FullScreenModalCloseReason as F, WppFullScreenModal, defineCustomElement };
