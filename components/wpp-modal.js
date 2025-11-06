import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { A as ANIMATION_PROPERTY_NAME } from './consts.js';
import { g as getSlotEmptyStates, l as applyBodyStylesIfNeeded } from './utils.js';
import { W as WrappedSlot } from './WrappedSlot.js';

var ModalCloseReason;
(function (ModalCloseReason) {
  ModalCloseReason["outsideClick"] = "outsideClick";
  ModalCloseReason["cancelClick"] = "cancelClick";
  ModalCloseReason["escapePress"] = "escapePress";
})(ModalCloseReason || (ModalCloseReason = {}));

const wppModalCss = ":host{--modal-overlay-bg-color:var(\n    --wpp-modal-overlay-bg-color,\n    color-mix(in srgb, var(--wpp-grey-color-500) 60%, transparent)\n  );--modal-width-s:var(--wpp-modal-width-s, 440px);--modal-width-m:var(--wpp-modal-width-m, 600px);--modal-box-shadow:var(--wpp-modal-box-shadow, var(--wpp-box-shadow-l));--modal-vertical-position-minus-number:var(--wpp-modal-vertical-position-minus-number, 160px);--modal-vertical-position-animation-minus-number:var(--wpp-modal-vertical-position-animation-minus-number, 200px);--modal-body-paddings:var(--wpp-modal-body-paddings, 0 24px);--modal-actions-paddings:var(--wpp-modal-actions-paddings, 24px);--modal-header-padding:var(--wpp-modal-header-padding, 20px 24px 16px 24px);--modal-transition:visibility 0.15s linear 0.2s, opacity 0.2s 0.2s;--modal-z-index:var(--wpp-modal-z-index, 1100);--modal-bg-color:var(--wpp-modal-bg-color, var(--wpp-grey-color-000))}:host(.wpp-modal-wrapper){position:fixed;top:0;right:0;bottom:0;left:0;z-index:var(--modal-z-index);display:block;font-family:var(--wpp-font-family);visibility:hidden;opacity:0;overflow:auto}:host(.wpp-component-ready){-webkit-transition:var(--modal-transition);transition:var(--modal-transition)}:host(.wpp-visible.wpp-component-ready){display:block;visibility:visible;opacity:1}:host(.wpp-hide){visibility:hidden !important;opacity:0}:host(.wpp-visible:target){opacity:1}.header.slot-hidden,.body.slot-hidden,.actions.slot-hidden{display:none}.header{font-size:var(--wpp-typography-xl-heading-font-size, 20px);line-height:var(--wpp-typography-xl-heading-line-height, 32px);font-weight:var(--wpp-typography-xl-heading-font-weight, 400);color:var(--wpp-typography-xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xl-heading-letter-spacing, 0);padding:var(--modal-header-padding)}.body{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);padding:var(--modal-body-paddings)}.actions{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);padding:var(--modal-actions-paddings)}.modal-overlay{position:absolute;width:100%;height:100%}.overlay-color{width:100%;height:100%;background-color:var(--modal-overlay-bg-color);will-change:opacity}.modal{position:absolute;top:50%;left:50%;background-color:var(--modal-bg-color);border-radius:var(--wpp-border-radius-l);-webkit-box-shadow:var(--modal-box-shadow);box-shadow:var(--modal-box-shadow);-webkit-transform:translate(-50%, calc(-50% - var(--modal-vertical-position-minus-number)));transform:translate(-50%, calc(-50% - var(--modal-vertical-position-minus-number)));max-height:90vh;max-width:90vh;overflow-y:auto;overflow-x:hidden}.modal.visible{-webkit-animation:modalAppearAboveCenterAnimations 0.2s linear;animation:modalAppearAboveCenterAnimations 0.2s linear;-webkit-animation-delay:0.15s;animation-delay:0.15s}.modal.size-s{width:var(--modal-width-s)}.modal.size-m{width:var(--modal-width-m)}@media (max-height: 800px){.modal{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.modal.visible{-webkit-animation:modalAppearInCenterAnimations 0.2s linear forwards;animation:modalAppearInCenterAnimations 0.2s linear forwards;-webkit-animation-delay:0.15s;animation-delay:0.15s}}@-webkit-keyframes modalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@keyframes modalAppearInCenterAnimations{0%{-webkit-transform:translate(-50%, -70%);transform:translate(-50%, -70%)}100%{-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}}@-webkit-keyframes modalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, calc(-50% - var(--modal-vertical-position-animation-minus-number)));transform:translate(-50%, calc(-50% - var(--modal-vertical-position-animation-minus-number)))}100%{-webkit-transform:translate(-50%, calc(-50% - var(--modal-vertical-position-minus-number)));transform:translate(-50%, calc(-50% - var(--modal-vertical-position-minus-number)))}}@keyframes modalAppearAboveCenterAnimations{0%{-webkit-transform:translate(-50%, calc(-50% - var(--modal-vertical-position-animation-minus-number)));transform:translate(-50%, calc(-50% - var(--modal-vertical-position-animation-minus-number)))}100%{-webkit-transform:translate(-50%, calc(-50% - var(--modal-vertical-position-minus-number)));transform:translate(-50%, calc(-50% - var(--modal-vertical-position-minus-number)))}}";

const WppModal$1 = /*@__PURE__*/ proxyCustomElement(class WppModal extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppModalClose = createEvent(this, "wppModalClose", 1);
    this.wppModalOpenStart = createEvent(this, "wppModalOpenStart", 7);
    this.wppModalOpenComplete = createEvent(this, "wppModalOpenComplete", 7);
    this.wppModalCloseStart = createEvent(this, "wppModalCloseStart", 7);
    this.wppModalCloseComplete = createEvent(this, "wppModalCloseComplete", 7);
    this.wppModalOpen = createEvent(this, "wppModalOpen", 1);
    this.onOverlayClick = () => {
      if (this.disableOutsideClick)
        return;
      this.wppModalClose.emit({ reason: ModalCloseReason.outsideClick });
      this.closeReason = ModalCloseReason.outsideClick;
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
        this.wppModalOpenStart.emit();
      }
      else {
        if (this.closeReason) {
          this.wppModalCloseStart.emit({ reason: this.closeReason });
        }
        else {
          this.wppModalCloseStart.emit();
        }
      }
    };
    this.handleTransitionEnd = (event) => {
      if (event.propertyName !== ANIMATION_PROPERTY_NAME)
        return;
      if (this.open) {
        this.wppModalOpenComplete.emit();
        this.wppModalOpen.emit();
      }
      else {
        if (this.closeReason) {
          this.wppModalCloseComplete.emit({ reason: this.closeReason });
        }
        else {
          this.wppModalCloseComplete.emit();
        }
      }
      this.closeReason = null;
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
      'wpp-modal': true,
      'wpp-modal-wrapper': true,
      'wpp-visible': this.open,
      'wpp-hide': !this.open,
    });
    this.modalCssClasses = () => ({
      modal: true,
      visible: this.open,
      hide: !this.open,
      [`size-${this.size}`]: !!this.size,
    });
    this.hasHeaderSlot = false;
    this.hasBodySlot = false;
    this.hasActionsSlot = false;
    this.closeReason = null;
    this.open = false;
    this.size = 's';
    this.withTransparentOverlay = undefined;
    this.disableOutsideClick = false;
    this.formConfig = undefined;
  }
  handleCloseOnEsc(event) {
    if (event.key === 'Escape' && this.open) {
      this.wppModalClose.emit({ reason: ModalCloseReason.escapePress });
      this.closeReason = ModalCloseReason.escapePress;
    }
  }
  handleChangeModalStatus(openStatus) {
    if (openStatus) {
      this.host.classList.add('wpp-component-ready');
    }
    setTimeout(() => {
      applyBodyStylesIfNeeded(this.open ? 'add' : 'remove');
    });
  }
  /**
   * Method for closing the modal.
   */
  async closeModal() {
    this.open = false;
  }
  /**
   * Method for opening the modal.
   */
  async openModal() {
    this.open = true;
  }
  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    setTimeout(() => {
      this.open && this.host.classList.add('wpp-component-ready');
    }, 0);
  }
  disconnectedCallback() {
    this.closeModal();
  }
  render() {
    const Tag = this.formConfig ? 'form' : 'div';
    return (h(Host, { class: this.hostCssClasses(), "aria-modal": "true", exportparts: "wrapper, overlay, modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd }, h("div", { class: "modal-overlay", part: "wrapper" }, h("div", { class: "overlay-color", ...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {}), onClick: this.onOverlayClick, part: "overlay" }), h(Tag, { role: "dialog", class: this.modalCssClasses(), part: "content", ...this.formConfig }, h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })))));
  }
  static get registryIs() { return "wpp-modal-v2-22-0"; }
  get host() { return this; }
  static get watchers() { return {
    "open": ["handleChangeModalStatus"]
  }; }
  static get style() { return wppModalCss; }
}, [1, "wpp-modal", "wpp-modal-v2-22-0", {
    "open": [1540],
    "size": [1],
    "withTransparentOverlay": [4, "with-transparent-overlay"],
    "disableOutsideClick": [4, "disable-outside-click"],
    "formConfig": [16],
    "hasHeaderSlot": [32],
    "hasBodySlot": [32],
    "hasActionsSlot": [32],
    "closeReason": [32],
    "closeModal": [64],
    "openModal": [64]
  }, [[4, "keydown", "handleCloseOnEsc"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-modal-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-modal-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppModal$1);
      }
      break;
  } });
}

const WppModal = WppModal$1;
const defineCustomElement = defineCustomElement$1;

export { ModalCloseReason as M, WppModal, defineCustomElement };
