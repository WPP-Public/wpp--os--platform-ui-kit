import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { w as getHighestContainerInDOM, g as getSlotEmptyStates, k as transformToVersionedTag, m as applyBodyStylesIfNeeded, b as isEventTargetContained } from './utils-d423b01f.js';
import { W as WrappedSlot } from './WrappedSlot-2ee5325a.js';
import { S as SideModalCloseReason } from './types-945bd5da.js';
import { Z as Z_INDEX } from './consts-5bf9c29f.js';

const wppSideModalCss = ":host{--side-modal-width-s:var(--wpp-side-modal-width-s, 440px);--side-modal-width-m:var(--wpp-side-modal-width-m, 600px);--side-modal-width-l:var(--wpp-side-modal-width-l, 760px);--side-modal-width-xl:var(--wpp-side-modal-width-xl, 920px);--side-modal-width-2xl:var(--wpp-side-modal-width-2xl, 1080px);--side-modal-box-shadow:var(--wpp-side-modal-box-shadow, var(--wpp-box-shadow-l));--side-modal-vertical-position-animation-minus-number:var(\n    --wpp-side-modal-vertical-position-animation-minus-number,\n    200px\n  );--side-modal-header-paddings:var(--wpp-side-modal-header-paddings, 24px 24px 20px 32px);--side-modal-header-with-back-button-paddings:var(\n    --wpp-side-modal-header-with-back-button-paddings,\n    24px 24px 20px 24px\n  );--side-modal-body-paddings:var(--wpp-side-modal-body-paddings, 0 32px);--side-modal-actions-paddings:var(--wpp-side-modal-actions-paddings, 24px 32px 24px 32px);--side-modal-close-button-margin-left:var(--wpp-side-modal-close-button-margin-left, auto);--side-modal-back-button-margin-right:var(--wpp-side-modal-close-button-margin-left, 8px);--side-modal-transition:0.2s ease-in-out;--side-modal-bg-color:var(--wpp-side-modal-bg-color, var(--wpp-grey-color-000));--side-modal-actions-bg-color:var(--wpp-side-modal-actions-bg-color, var(--wpp-grey-color-000));--side-modal-actions-border-color:var(--wpp-side-modal-actions-border-color, var(--wpp-grey-color-300))}:host(.wpp-side-modal-wrapper){position:fixed;top:var(--wpp-side-modal-top-offset);right:0;bottom:0;left:0;display:block;font-family:var(--wpp-font-family);visibility:hidden}:host(.wpp-component-ready){-webkit-transition:var(--side-modal-transition);transition:var(--side-modal-transition)}:host(.wpp-component-ready.wpp-visible){display:block;visibility:visible;opacity:1}:host(.wpp-component-ready.wpp-visible.wpp-overlay-hidden){width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;right:0;left:auto}:host(.wpp-hidden){visibility:hidden;opacity:0}.header.slot-hidden,.body.slot-hidden,.actions.slot-hidden{display:none}.header{font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);font-weight:var(--wpp-typography-2xl-heading-font-weight, 400);color:var(--wpp-typography-2xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0);width:100%}.body{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);height:100%;padding:var(--side-modal-body-paddings);overflow-y:auto}.body::-webkit-scrollbar{width:4px;height:4px}.body::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.actions{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);right:0;bottom:0;left:0;margin-top:auto;padding:var(--side-modal-actions-paddings);background-color:var(--side-modal-actions-bg-color);border-top:1px solid var(--side-modal-actions-border-color)}.actions .right-button-container{display:-ms-flexbox;display:flex;gap:12px}.actions .left-button-container{margin-left:-8px}.actions.with-actions-config{display:-ms-flexbox;display:flex;gap:10px;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}.modal-overlay{position:absolute;width:100%;height:100%}.side-modal{position:absolute;top:0;right:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:auto;height:100%;word-break:break-all;background-color:var(--side-modal-bg-color);-webkit-box-shadow:var(--side-modal-box-shadow);box-shadow:var(--side-modal-box-shadow)}.side-modal.visible{-webkit-animation:fadeIn 0.2s ease-in-out forwards;animation:fadeIn 0.2s ease-in-out forwards}.side-modal.hide{-webkit-animation:fadeOut 0.2s ease-in-out forwards;animation:fadeOut 0.2s ease-in-out forwards}.side-modal.size-s{width:var(--side-modal-width-s)}.side-modal.size-m{width:var(--side-modal-width-m)}.side-modal.size-l{width:var(--side-modal-width-l)}.side-modal.size-xl{width:var(--side-modal-width-xl)}.side-modal.size-2xl{width:var(--side-modal-width-2xl)}.modal-width-1{width:4.1666666667%}.modal-width-2{width:8.3333333333%}.modal-width-3{width:12.5%}.modal-width-4{width:16.6666666667%}.modal-width-5{width:20.8333333333%}.modal-width-6{width:25%}.modal-width-7{width:29.1666666667%}.modal-width-8{width:33.3333333333%}.modal-width-9{width:37.5%}.modal-width-10{width:41.6666666667%}.modal-width-11{width:45.8333333333%}.modal-width-12{width:50%}.modal-width-13{width:54.1666666667%}.modal-width-14{width:58.3333333333%}.modal-width-15{width:62.5%}.modal-width-16{width:66.6666666667%}.modal-width-17{width:70.8333333333%}.modal-width-18{width:75%}.modal-width-19{width:79.1666666667%}.modal-width-20{width:83.3333333333%}.modal-width-21{width:87.5%}.modal-width-22{width:91.6666666667%}.modal-width-23{width:95.8333333333%}.modal-width-24{width:100%}.header-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--side-modal-header-paddings)}.header-container .header-with-back-button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.header-container .close-button{margin-left:var(--side-modal-close-button-margin-left)}.header-container .back-button{margin-right:var(--side-modal-back-button-margin-right)}.header-container.with-back-button{padding:var(--side-modal-header-with-back-button-paddings)}.header-container.with-bottom-border{border-bottom:1px solid var(--side-modal-actions-border-color)}@-webkit-keyframes fadeIn{from{-webkit-transform:translateX(100%);transform:translateX(100%)}to{-webkit-transform:translateX(0%);transform:translateX(0%)}}@keyframes fadeIn{from{-webkit-transform:translateX(100%);transform:translateX(100%)}to{-webkit-transform:translateX(0%);transform:translateX(0%)}}@-webkit-keyframes fadeOut{from{-webkit-transform:translateX(0%);transform:translateX(0%)}to{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes fadeOut{from{-webkit-transform:translateX(0%);transform:translateX(0%)}to{-webkit-transform:translateX(100%);transform:translateX(100%)}}";

const WppSideModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppSideModalClose = createEvent(this, "wppSideModalClose", 1);
    this.wppSideModalOpenStart = createEvent(this, "wppSideModalOpenStart", 7);
    this.wppSideModalOpenComplete = createEvent(this, "wppSideModalOpenComplete", 7);
    this.wppSideModalCloseStart = createEvent(this, "wppSideModalCloseStart", 7);
    this.wppSideModalCloseComplete = createEvent(this, "wppSideModalCloseComplete", 7);
    this.wppSideModalOpen = createEvent(this, "wppSideModalOpen", 1);
    this.wppSideModalBackButtonClick = createEvent(this, "wppSideModalBackButtonClick", 1);
    this.topOffset = 0;
    this.ignoreOutsideClicks = false;
    this.updateButtons = () => {
      // This function is called in componentWillLoad and when actionsConfig changes
      // We first reset button configurations.
      this.leftButtonConfig = undefined;
      this.rightButtonsConfig = [];
      // Set new button configuration
      this.actionsConfig?.forEach((actionConfigItem) => {
        if ('icon' in actionConfigItem) {
          this.leftButtonConfig = actionConfigItem;
        }
        else {
          if (this.rightButtonsConfig.length < 2) {
            this.rightButtonsConfig.push(actionConfigItem);
          }
        }
      });
    };
    this.onOverlayClick = () => {
      if (this.disableOutsideClick)
        return;
      this.wppSideModalClose.emit({ reason: SideModalCloseReason.outsideClick });
      this.closeReason = SideModalCloseReason.outsideClick;
    };
    this.getTopOffset = () => {
      if (!this.osBarCompatible)
        return 0;
      const highestContainer = getHighestContainerInDOM();
      if (!highestContainer)
        return 0;
      // Need to query for the first header in the root element, because the OS bar is the first header element in the root element.
      return highestContainer.querySelector('.wpp > header')?.offsetHeight ?? 0;
    };
    this.handleScroll = (event) => {
      const target = event.target;
      this.isScrolled = target.scrollTop > 0;
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
    this.handleCloseModal = () => {
      this.wppSideModalClose.emit({ reason: SideModalCloseReason.crossClick });
      this.closeReason = SideModalCloseReason.crossClick;
    };
    this.handleBackButtonClick = () => {
      this.wppSideModalBackButtonClick.emit();
    };
    this.handleTransitionStart = (event) => {
      if (event.propertyName !== 'visibility')
        return;
      if (this.open) {
        this.isHidden = false;
        this.wppSideModalOpenStart.emit();
      }
      else {
        if (this.closeReason) {
          this.wppSideModalCloseStart.emit({ reason: this.closeReason });
        }
        else {
          this.wppSideModalCloseStart.emit();
        }
        this.ignoreOutsideClicks = false;
      }
    };
    this.handleTransitionEnd = (event) => {
      if (event.propertyName !== 'visibility')
        return;
      if (this.open) {
        this.wppSideModalOpenComplete.emit();
        this.wppSideModalOpen.emit();
        this.ignoreOutsideClicks = true;
      }
      else {
        this.isHidden = true;
        if (this.closeReason) {
          this.wppSideModalCloseComplete.emit({ reason: this.closeReason });
        }
        else {
          this.wppSideModalCloseComplete.emit();
        }
      }
      this.closeReason = null;
    };
    this.renderLeftButton = () => {
      // Render left button based on config.
      if (!this.leftButtonConfig)
        return h("div", { class: "left-button-container" });
      const { label, icon, ...rest } = this.leftButtonConfig;
      return (h("div", { class: "left-button-container" }, h("wpp-action-button-v3-3-0", { ...rest }, h(transformToVersionedTag(icon), { slot: 'icon-start' }), label)));
    };
    this.renderRightButtons = () => {
      // Render right buttons based on config.
      if (!this.rightButtonsConfig || this.rightButtonsConfig.length === 0)
        return;
      return (h("div", { class: "right-button-container" }, this.rightButtonsConfig.map((rightButtonConfigItem) => {
        const { label, ...rest } = rightButtonConfigItem;
        return (h("wpp-button-v3-3-0", { size: "m", ...rest }, label));
      })));
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
      'slot-hidden': !this.hasActionsSlot && (!this.actionsConfig || this.actionsConfig.length === 0),
      'with-actions-config': !!this.actionsConfig && this.actionsConfig.length > 0,
    });
    this.hostCssClasses = () => ({
      'wpp-side-modal': true,
      'wpp-side-modal-wrapper': true,
      'wpp-visible': this.open,
      'wpp-hidden': this.isHidden,
      'wpp-overlay-hidden': !this.backdropVisible,
      'wpp-os-bar-compatible': this.osBarCompatible,
    });
    this.sideModalCssClasses = () => ({
      'side-modal': true,
      visible: this.open,
      hide: !this.open,
      [`size-${this.size}`]: !!this.size,
    });
    this.headerContainerCssClasses = () => ({
      'header-container': true,
      'with-back-button': this.withBackButton,
      'with-bottom-border': this.isScrolled,
    });
    this.renderBody = () => {
      const Tag = this.formConfig ? 'form' : 'div';
      return (h(Tag, { part: "content", role: "dialog", class: this.sideModalCssClasses(), ...this.formConfig, "data-testid": "wpp-side-modal-content" }, h("div", { class: this.headerContainerCssClasses(), part: "header-container" }, this.withBackButton ? (h("div", { class: "header-with-back-button", part: "header-with-back-button" }, h("wpp-action-button-v3-3-0", { variant: "secondary", onClick: this.handleBackButtonClick, class: "back-button", part: "back-button" }, h("wpp-icon-chevron-v3-3-0", { direction: "left", slot: "icon-start", part: "icon-chevron" })), h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }))) : (h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData })), h("wpp-action-button-v3-3-0", { variant: "secondary", onClick: this.handleCloseModal, class: "close-button", part: "button" }, h("wpp-icon-cross-v3-3-0", { slot: "icon-start", part: "icon-cross" }))), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), this.hasActionsSlot ? (h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })) : (this.actionsConfig &&
        this.actionsConfig.length > 0 && (h("div", { class: this.actionsCssClasses(), part: "actions" }, this.renderLeftButton(), this.renderRightButtons())))));
    };
    this.isShowContent = undefined;
    this.isReady = undefined;
    this.isHidden = true;
    this.hasHeaderSlot = false;
    this.hasBodySlot = false;
    this.hasActionsSlot = false;
    this.isScrolled = false;
    this.closeReason = null;
    this.actionsConfig = undefined;
    this.open = false;
    this.size = undefined;
    this.disableOutsideClick = false;
    this.formConfig = undefined;
    this.withBackButton = false;
    this.backdropVisible = true;
    this.zIndex = Z_INDEX.SIDE_MODAL;
    this.osBarCompatible = false;
  }
  handleCloseOnEsc(event) {
    if (event.key === 'Escape' && this.open) {
      this.wppSideModalClose.emit({ reason: SideModalCloseReason.escapePress });
      this.closeReason = SideModalCloseReason.escapePress;
    }
  }
  handleChangeModalStatus(openStatus) {
    if (openStatus) {
      this.host.classList.add('wpp-component-ready');
    }
    if (this.backdropVisible) {
      setTimeout(() => {
        applyBodyStylesIfNeeded(this.open ? 'add' : 'remove');
      });
    }
  }
  onUpdateActionsConfig() {
    this.updateButtons();
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
  handleClickOutside(event) {
    if (!this.open || this.disableOutsideClick || !this.osBarCompatible || !this.ignoreOutsideClicks)
      return;
    if (event.target === this.host)
      return;
    if (event.target !== this.host && !isEventTargetContained(this.host, event)) {
      const path = (event.composedPath && event.composedPath()) || [];
      const isInPortalInside = path.some(node => node instanceof HTMLElement && node.closest('[data-wpp-portal-inside]') !== null);
      if (isInPortalInside)
        return;
      this.wppSideModalClose.emit({ reason: SideModalCloseReason.outsideClick });
      this.closeReason = SideModalCloseReason.outsideClick;
      this.closeModal();
    }
  }
  componentWillLoad() {
    if (this.host.querySelector('[slot="actions"]')) {
      console.warn('The `actions` slot is deprecated and will be removed in a future release. Please use the `actionsConfig` property instead.');
    }
    this.topOffset = this.getTopOffset();
    this.updateSlotData();
    this.updateButtons();
  }
  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    setTimeout(() => {
      this.open && this.host.classList.add('wpp-component-ready');
    }, 0);
    const bodySlot = this.host.shadowRoot?.querySelector('.body');
    if (bodySlot) {
      bodySlot.addEventListener('scroll', this.handleScroll);
    }
  }
  disconnectedCallback() {
    this.closeModal();
    const bodySlot = this.host.shadowRoot?.querySelector('.body');
    if (bodySlot) {
      bodySlot.removeEventListener('scroll', this.handleScroll);
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), "aria-modal": "true", exportparts: "wrapper, side-modal, header-container, button, icon-cross, header, body, actions, header-wrapper, body-wrapper, actions-wrapper, back-button, icon-chevron, header-with-back-button", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: { zIndex: this.zIndex.toString(), '--wpp-side-modal-top-offset': `${this.topOffset}px` } }, this.backdropVisible && (h("div", { class: "modal-overlay", part: "wrapper" }, h("wpp-overlay-v3-3-0", { isVisible: this.open, onWppClick: this.onOverlayClick, zIndex: 0 }), this.renderBody())), !this.backdropVisible && this.renderBody()));
  }
  static get registryIs() { return "wpp-side-modal-v3-3-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "open": ["handleChangeModalStatus"],
    "actionsConfig": ["onUpdateActionsConfig"]
  }; }
};
WppSideModal.style = wppSideModalCss;

export { WppSideModal as wpp_side_modal };
