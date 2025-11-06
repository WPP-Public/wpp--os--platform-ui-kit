import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { A as ANIMATION_PROPERTY_NAME } from './consts.js';
import { g as getSlotEmptyStates, l as applyBodyStylesIfNeeded } from './utils.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { d as defineCustomElement$4 } from './wpp-action-button2.js';
import { d as defineCustomElement$3 } from './wpp-icon-cross2.js';
import { d as defineCustomElement$2 } from './wpp-spinner2.js';

var FullScreenModalCloseReason;
(function (FullScreenModalCloseReason) {
  FullScreenModalCloseReason["outsideClick"] = "outsideClick";
  FullScreenModalCloseReason["cancelClick"] = "cancelClick";
  FullScreenModalCloseReason["escapePress"] = "escapePress";
})(FullScreenModalCloseReason || (FullScreenModalCloseReason = {}));

const wppFullScreenModalCss = ":host{--full-screen-modal-overlay-bg-color:var(\n    --wpp-full-screen-modal-overlay-bg-color,\n    color-mix(in srgb, var(--wpp-grey-color-500) 60%, transparent)\n  );--full-screen-modal-width:var(--wpp-full-screen-modal-width, 90%);--full-screen-modal-height:var(--wpp-full-screen-modal-height, 90%);--full-screen-modal-box-shadow:var(--wpp-full-screen-modal-box-shadow, var(--wpp-box-shadow-l));--full-screen-modal-body-paddings:var(--wpp-full-screen-modal-body-paddings, 0 32px);--full-screen-modal-actions-paddings:var(--wpp-full-screen-modal-actions-paddings, 32px);--full-screen-modal-header-padding:var(--wpp-full-screen-modal-header-padding, 24px 24px 20px 32px);--full-screen-modal-transition:visibility 0.15s linear 0.2s, opacity 0.2s 0.2s;--full-screen-modal-z-index:var(--wpp-full-screen-modal-z-index, 1100);--full-screen-modal-bg-color:var(--wpp-full-screen-modal-bg-color, var(--wpp-grey-color-000));--full-screen-modal-close-button-margin-left:var(--wpp-full-screen-modal-close-button-margin-left, auto)}:host(.wpp-full-screen-modal-wrapper){position:fixed;top:0;right:0;bottom:0;left:0;z-index:var(--full-screen-modal-z-index);display:block;font-family:var(--wpp-font-family);visibility:hidden;opacity:0}:host(.component-ready){-webkit-transition:var(--full-screen-modal-transition);transition:var(--full-screen-modal-transition)}:host(.wpp-visible.component-ready){display:block;visibility:visible;opacity:1}:host(.wpp-hide){visibility:hidden !important;opacity:0}:host(.wpp-visible:target){opacity:1}.header-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--full-screen-modal-header-padding)}.header-container .close-button{margin-left:var(--full-screen-modal-close-button-margin-left)}.header.slot-hidden,.body.slot-hidden,.actions.slot-hidden{display:none}.header{font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);font-weight:var(--wpp-typography-2xl-heading-font-weight, 400);color:var(--wpp-typography-2xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0)}.body{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);height:100%;padding:var(--full-screen-modal-body-paddings);overflow-y:auto}.actions{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);padding:var(--full-screen-modal-actions-paddings)}.full-screen-modal-overlay{position:absolute;width:100%;height:100%}.overlay-color{width:100%;height:100%;background-color:var(--full-screen-modal-overlay-bg-color);will-change:opacity}.full-screen-modal{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:absolute;top:50%;left:50%;background-color:var(--full-screen-modal-bg-color);border-radius:var(--wpp-border-radius-l);-webkit-box-shadow:var(--full-screen-modal-box-shadow);box-shadow:var(--full-screen-modal-box-shadow);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);width:var(--full-screen-modal-width);height:var(--full-screen-modal-height)}.full-screen-modal.visible{-webkit-animation:fullScreenModalAppearAboveCenterAnimations 0.2s linear;animation:fullScreenModalAppearAboveCenterAnimations 0.2s linear;-webkit-animation-delay:0.15s;animation-delay:0.15s}@media (max-height: 800px){.full-screen-modal{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.full-screen-modal.visible{-webkit-animation:fullScreenModalAppearInCenterAnimations 0.2s linear forwards;animation:fullScreenModalAppearInCenterAnimations 0.2s linear forwards;-webkit-animation-delay:0.15s;animation-delay:0.15s}}@-webkit-keyframes fullScreenModalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes fullScreenModalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@-webkit-keyframes fullScreenModalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes fullScreenModalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}";

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
    setTimeout(() => {
      applyBodyStylesIfNeeded(this.open ? 'add' : 'remove');
    });
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
    setTimeout(() => {
      this.open && this.host.classList.add('component-ready');
    }, 0);
  }
  disconnectedCallback() {
    this.closeFullScreenModal();
  }
  render() {
    const Tag = this.formConfig ? 'form' : 'div';
    return (h(Host, { class: this.hostCssClasses(), "aria-modal": "true", exportparts: "wrapper, overlay,full-screen-modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd }, h("div", { class: "full-screen-modal-overlay", part: "wrapper" }, h("div", { class: "overlay-color", ...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {}), onClick: this.onOverlayClick, part: "overlay" }), h(Tag, { role: "dialog", class: this.fullScreenModalCssClasses(), part: "content", ...this.formConfig }, h("div", { class: this.headerContainerCssClasses() }, h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }), h("wpp-action-button-v2-22-0", { variant: "secondary", onClick: this.handleCloseModal, class: "close-button" }, h("wpp-icon-cross-v2-22-0", { slot: "icon-start" }))), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })))));
  }
  static get registryIs() { return "wpp-full-screen-modal-v2-22-0"; }
  get host() { return this; }
  static get watchers() { return {
    "open": ["handleChangeFullScreenModalStatus"]
  }; }
  static get style() { return wppFullScreenModalCss; }
}, [1, "wpp-full-screen-modal", "wpp-full-screen-modal-v2-22-0", {
    "open": [1540],
    "withTransparentOverlay": [4, "with-transparent-overlay"],
    "disableOutsideClick": [4, "disable-outside-click"],
    "formConfig": [16],
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
  const components = ["wpp-full-screen-modal-v2-22-0", "wpp-action-button-v2-22-0", "wpp-icon-cross-v2-22-0", "wpp-spinner-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-full-screen-modal-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppFullScreenModal$1);
      }
      break;
    case "wpp-action-button-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-icon-cross-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-spinner-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppFullScreenModal = WppFullScreenModal$1;
const defineCustomElement = defineCustomElement$1;

export { FullScreenModalCloseReason as F, WppFullScreenModal, defineCustomElement };
