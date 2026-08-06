import { h, Host } from '@stencil/core';
import { applyBodyStylesIfNeeded, getOsBarOffsetHeight, getSlotEmptyStates, isEventTargetContained, mergeLocales, transformToVersionedTag, } from '../../utils/utils';
import { TimeoutManager } from '../../utils/timeout-manager';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { SideModalCloseReason, } from './types';
import { LOCALES_DEFAULTS } from './const';
import { Z_INDEX } from '../../common/consts';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @slot header - Content that is displayed within the `.side-modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.side-modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.side-modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.
 *
 * @part content - modal content element
 * @part wrapper - component wrapper element
 * @part overlay - side modal overlay element
 * @part header-container - root header element
 * @part header-wrapper - element for slotted header
 * @part button - Button element
 * @part back-button - Back button element
 * @part icon-cross - icon cross element
 * @part icon-chevron - icon chevron element
 * @part header-with-back-button - wrapper with header and back button elements
 * @part actions - actions slot element
 */
export class WppSideModal {
  constructor() {
    this.topOffset = 0;
    this.ignoreOutsideClicks = false;
    this.timeouts = new TimeoutManager();
    this.themeSubscription = themeSubscriptionController(() => this.host);
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
      this.updateHeaderLabel();
    };
    /**
     * The dialog's accessible name is derived from the slotted header, because an `aria-labelledby`
     * on the host cannot reference an id that lives inside the shadow root – IDREFs do not cross the
     * shadow boundary. Anything the consumer supplies wins, since their ids and labels resolve in
     * their own tree scope.
     */
    this.updateHeaderLabel = () => {
      if (this.ariaProps.labelledby || this.ariaProps.label) {
        this.headerLabel = '';
        return;
      }
      this.headerLabel = Array.from(this.host.querySelectorAll('[slot="header"]'))
        .map(node => node.textContent?.trim() ?? '')
        .filter(Boolean)
        .join(' ');
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
        this.ignoreOutsideClicks = true;
        this.focusDialog();
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
      return (h("div", { class: "left-button-container" }, h("wpp-action-button-v4-3-0", { ...rest }, h(transformToVersionedTag(icon), { slot: 'icon-start' }), label)));
    };
    this.renderRightButtons = () => {
      // Render right buttons based on config.
      if (!this.rightButtonsConfig || this.rightButtonsConfig.length === 0)
        return;
      return (h("div", { class: "right-button-container" }, this.rightButtonsConfig.map((rightButtonConfigItem) => {
        const { label, ...rest } = rightButtonConfigItem;
        return (h("wpp-button-v4-3-0", { size: "m", ...rest }, label));
      })));
    };
    this.focusDialog = () => {
      if (!this.dialogRef)
        return;
      this.dialogRef.focus();
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
    // Add render method for header action buttons
    this.renderHeaderActionButtons = () => (h("div", { class: "header-action-buttons-container" }, this.headerActionsConfig?.map(button => {
      // `ariaLabel` has to be mapped onto `ariaProps`: wpp-action-button has no `ariaLabel`
      // prop, so spreading it left these icon-only buttons with no accessible name.
      const { icon, ariaLabel, ...rest } = button;
      return (h("wpp-action-button-v4-3-0", { variant: "secondary", ariaProps: { label: ariaLabel }, ...rest }, h(transformToVersionedTag(icon), { slot: 'icon-start' })));
    })));
    this.renderBody = () => {
      const Tag = this.formConfig ? 'form' : 'div';
      return (h(Tag, { tabindex: "-1", part: "content", class: this.sideModalCssClasses(), ...this.formConfig, "data-testid": "wpp-side-modal-content", ref: ref => (this.dialogRef = ref) }, h("div", { class: this.headerContainerCssClasses(), part: "header-container" }, this.withBackButton ? (h("div", { class: "header-with-back-button", part: "header-with-back-button" }, h("wpp-action-button-v4-3-0", { ariaProps: { label: this._locales.backHeaderButtonLabel }, variant: "secondary", onClick: this.handleBackButtonClick, class: "back-button", part: "back-button" }, h("wpp-icon-chevron-v4-3-0", { direction: "left", slot: "icon-start", part: "icon-chevron" })), h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData }))) : (h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData })), h("div", { class: "header-action-container" }, this.headerActionsConfig?.length > 0 && this.renderHeaderActionButtons(), h("wpp-action-button-v4-3-0", { ariaProps: { label: this._locales.closeIconLabel }, variant: "secondary", onClick: this.handleCloseModal, class: "close-button", part: "button" }, h("wpp-icon-cross-v4-3-0", { slot: "icon-start", part: "icon-cross" })))), h(WrappedSlot, { wrapperClass: this.bodyCssClasses(), name: "body", onSlotchange: this.updateSlotData }), this.actionsConfig && this.actionsConfig.length > 0 ? (h("div", { class: this.actionsCssClasses(), part: "actions" }, this.renderLeftButton(), this.renderRightButtons())) : (h(WrappedSlot, { wrapperClass: this.hasActionsSlot ? this.actionsCssClasses() : '', name: "actions", onSlotchange: this.updateSlotData }))));
    };
    this.isShowContent = undefined;
    this.isReady = undefined;
    this.isHidden = true;
    this.hasHeaderSlot = false;
    this.hasBodySlot = false;
    this.hasActionsSlot = false;
    this.headerLabel = '';
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
    this.headerActionsConfig = [];
    this.ariaProps = {
      role: 'dialog',
    };
    this.locales = {};
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
      // Use the watcher's argument rather than re-reading `this.open` inside the timeout: reading
      // a @Prop off an instance that was torn down first throws asynchronously, which is uncaught
      // and kills the Node process.
      this.timeouts.schedule(() => {
        applyBodyStylesIfNeeded(openStatus ? 'add' : 'remove');
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
    // TODO: topOffset is calculated once on mount. If the OS bar height becomes dynamic
    //       (e.g., responsive resize), consider recalculating via ResizeObserver or a shared CSS variable on :root.
    this.topOffset = this.osBarCompatible ? getOsBarOffsetHeight() : 0;
    this.updateSlotData();
    this.updateButtons();
  }
  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    // Captured up front for the same reason as above.
    const { host, open } = this;
    this.timeouts.schedule(() => {
      open && host.classList.add('wpp-component-ready');
    });
    const bodySlot = this.host.shadowRoot?.querySelector('.body');
    if (bodySlot) {
      bodySlot.addEventListener('scroll', this.handleScroll);
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.timeouts.clearAll();
    this.closeModal();
    const bodySlot = this.host.shadowRoot?.querySelector('.body');
    if (bodySlot) {
      bodySlot.removeEventListener('scroll', this.handleScroll);
    }
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, side-modal, header-container, button, icon-cross, header, body, actions, header-wrapper, body-wrapper, actions-wrapper, back-button, icon-chevron, header-with-back-button", onTransitionStart: this.handleTransitionStart, onTransitionEnd: this.handleTransitionEnd, style: { zIndex: this.zIndex.toString(), '--wpp-side-modal-top-offset': `${this.topOffset}px` }, role: this.ariaProps.role, "aria-labelledby": this.ariaProps.labelledby, "aria-label": this.ariaProps.label ?? (this.ariaProps.labelledby ? undefined : this.headerLabel || undefined), "aria-modal": "true" }, this.backdropVisible && (h("div", { class: "modal-overlay", part: "wrapper" }, h("wpp-overlay-v4-3-0", { isVisible: this.open, onWppClick: this.onOverlayClick, zIndex: 0 }), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }), this.renderBody(), h("div", { tabindex: "0", class: "focus-sentinel", onFocus: this.focusDialog }))), !this.backdropVisible && this.renderBody()));
  }
  static get is() { return "wpp-side-modal"; }
  static get registryIs() { return "wpp-side-modal-v4-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-side-modal.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-side-modal.css"]
    };
  }
  static get properties() {
    return {
      "actionsConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ActionConfig",
          "resolved": "[FirstActionConfig, SecondActionConfig, ThirdActionConfig] | [FirstActionConfig, SecondActionConfig] | [FirstActionConfig, ThirdActionConfig, SecondActionConfig] | [FirstActionConfig, ThirdActionConfig] | [FirstActionConfig] | [SecondActionConfig, FirstActionConfig, ThirdActionConfig] | [SecondActionConfig, FirstActionConfig] | [SecondActionConfig, ThirdActionConfig, FirstActionConfig] | [SecondActionConfig, ThirdActionConfig] | [SecondActionConfig] | [ThirdActionConfig, FirstActionConfig, SecondActionConfig] | [ThirdActionConfig, FirstActionConfig] | [ThirdActionConfig, SecondActionConfig, FirstActionConfig] | [ThirdActionConfig, SecondActionConfig] | [ThirdActionConfig] | [] | undefined",
          "references": {
            "ActionConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-modal/types.ts::ActionConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Configuration for rendering action buttons.\n\nThe `actionsConfig` property is an array that can contain at most 1 of each:\n- 1 WppButton with variant = \"primary\" / \"destructive\"\n- 1 WppButton with variant = \"secondary\" / \"destructive-secondary\"\n- 1 WppActionButton with variant = \"primary\" / \"destructive\". The button also has to have an icon."
        }
      },
      "open": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the side modal is open."
        },
        "attribute": "open",
        "reflect": true,
        "defaultValue": "false"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm' | 'l' | 'xl' | '2xl'",
          "resolved": "\"2xl\" | \"l\" | \"m\" | \"s\" | \"xl\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the side modal size"
        },
        "attribute": "size",
        "reflect": false
      },
      "disableOutsideClick": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the side modal can be closed by clicking outside of it."
        },
        "attribute": "disable-outside-click",
        "reflect": false,
        "defaultValue": "false"
      },
      "formConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "SideModalFormConfig",
          "resolved": "SideModalFormConfig | undefined",
          "references": {
            "SideModalFormConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-modal/types.ts::SideModalFormConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If you pass this prop wrapper of dialog will be rendered as form."
        }
      },
      "withBackButton": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the side modal has back button in the header."
        },
        "attribute": "with-back-button",
        "reflect": false,
        "defaultValue": "false"
      },
      "backdropVisible": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the side modal backdrop is visible."
        },
        "attribute": "backdrop-visible",
        "reflect": false,
        "defaultValue": "true"
      },
      "zIndex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the z-index of the WppSideModal."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.SIDE_MODAL"
      },
      "osBarCompatible": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true` - the side modal will be rendered below the OS bar."
        },
        "attribute": "os-bar-compatible",
        "reflect": false,
        "defaultValue": "false"
      },
      "headerActionsConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "HeaderActionsConfig",
          "resolved": "[HeaderActionConfig, HeaderActionConfig, HeaderActionConfig, HeaderActionConfig] | [HeaderActionConfig, HeaderActionConfig, HeaderActionConfig] | [HeaderActionConfig, HeaderActionConfig] | [HeaderActionConfig] | []",
          "references": {
            "HeaderActionsConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-modal/types.ts::HeaderActionsConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The list of actions that will be added in the header of the side-modal, on the left of the \"X\" icon. It can have a maximum length of 4 items."
        },
        "defaultValue": "[]"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the modal `aria-` props.\n\n`labelledby` is intentionally not defaulted: it previously pointed at an id rendered inside\nthe shadow root, which an `aria-labelledby` on the host can never resolve, leaving the dialog\nwith no accessible name. When you do supply one it must name an element in your own tree\nscope, and it is used verbatim. Otherwise the name is derived from the `header` slot."
        },
        "defaultValue": "{\n    role: 'dialog',\n  }"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<SideModalLocalesType>",
          "resolved": "{ closeIconLabel?: string | undefined; backHeaderButtonLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "SideModalLocalesType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-modal/types.ts::SideModalLocalesType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "isShowContent": {},
      "isReady": {},
      "isHidden": {},
      "hasHeaderSlot": {},
      "hasBodySlot": {},
      "hasActionsSlot": {},
      "headerLabel": {},
      "isScrolled": {},
      "closeReason": {}
    };
  }
  static get events() {
    return [{
        "method": "wppSideModalClose",
        "name": "wppSideModalClose",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Handles the side modal closing actions."
        },
        "complexType": {
          "original": "SideModalCloseDetails",
          "resolved": "SideModalCloseDetails",
          "references": {
            "SideModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-modal/types.ts::SideModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppSideModalOpenStart",
        "name": "wppSideModalOpenStart",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the open animation starts."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppSideModalOpenComplete",
        "name": "wppSideModalOpenComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the open animation ends."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppSideModalCloseStart",
        "name": "wppSideModalCloseStart",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the close animation starts."
        },
        "complexType": {
          "original": "SideModalCloseDetails",
          "resolved": "SideModalCloseDetails",
          "references": {
            "SideModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-modal/types.ts::SideModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppSideModalCloseComplete",
        "name": "wppSideModalCloseComplete",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Event emitted when the close animation ends."
        },
        "complexType": {
          "original": "SideModalCloseDetails",
          "resolved": "SideModalCloseDetails",
          "references": {
            "SideModalCloseDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-side-modal/types.ts::SideModalCloseDetails"
            }
          }
        }
      }, {
        "method": "wppSideModalBackButtonClick",
        "name": "wppSideModalBackButtonClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Handles the side modal back button click."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "closeModal": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method for closing the modal.",
          "tags": []
        }
      },
      "openModal": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method for opening the modal.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "open",
        "methodName": "handleChangeModalStatus"
      }, {
        "propName": "actionsConfig",
        "methodName": "onUpdateActionsConfig"
      }];
  }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleCloseOnEsc",
        "target": "document",
        "capture": false,
        "passive": false
      }, {
        "name": "click",
        "method": "handleClickOutside",
        "target": "document",
        "capture": false,
        "passive": false
      }];
  }
}
