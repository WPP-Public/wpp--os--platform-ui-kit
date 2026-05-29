import { Host, h } from '@stencil/core';
import { getSlotEmptyStates } from '../../utils/utils';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { Z_INDEX } from '../../common/consts';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @slot - Contains the main text content. This is the default slot, without the name attribute. Use only plain text or a `<span>` with plain text to maintain consistent styling and functionality.
 * @slot actions - Can contain action buttons.
 *
 * @part left-icon - left-icon element
 * @part wrapper - component wrapper element
 * @part body - Main content wrapper
 * @part content-wrapper - content wrapper element
 * @part message - message element
 * @part actions-wrapper - actions wrapper element
 * @part close-button - close button element
 * @part close-icon - close icon element
 * @part actions-wrapper - actions slot wrapper
 * @part actions-inner - actions slot
 */
export class WppBanner {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host, (theme) => {
      this.isDarkTheme = theme === 'dark';
    });
    this.updateOverflowState = () => {
      requestAnimationFrame(() => {
        const messageSpan = this.host.shadowRoot.querySelector('.message');
        this.isOverflowing = messageSpan.scrollWidth > messageSpan.clientWidth;
      });
    };
    this.updateMessageText = () => {
      this.messageText = '';
      this.host.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          this.messageText += node.textContent.trim() + ' ';
        }
        else if (node.nodeType === Node.ELEMENT_NODE && !node.hasAttribute('slot')) {
          this.messageText += node.textContent.trim() + ' ';
        }
      });
      this.messageText = this.messageText.trim();
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
      });
      this.hasActionsSlot = !emptyStates.actions;
    };
    this.handleCloseIconClick = () => {
      this.show = false;
      this.wppClose.emit({
        show: this.show,
      });
    };
    this.messageWrapperCssClasses = () => ({
      message: true,
    });
    this.tooltipCSSClasses = () => ({
      'with-tooltip': true,
    });
    this.actionsCssClasses = () => ({
      actions: true,
      'slot-hidden': !this.hasActionsSlot,
    });
    this.bannerWrapperCssClasses = () => ({
      'banner-wrapper': true,
      [this.type]: true,
      show: this.show,
    });
    this.hiddenBannerWrapperCssClasses = () => ({
      'hidden-banner-wrapper': true,
      [this.type]: true,
      show: this.show,
    });
    this.hostCssClasses = () => ({
      'wpp-banner': true,
    });
    this.getMessageTypesIcons = () => {
      if (this.type === 'warning')
        return h("wpp-icon-warning-v4-1-0", { class: "left-icon", part: "left-icon" });
      if (this.type === 'information')
        return h("wpp-icon-info-message-v4-1-0", { class: "left-icon", part: "left-icon" });
      return null;
    };
    this.hasActionsSlot = false;
    this.heightBanner = undefined;
    this.isOverflowing = false;
    this.isDarkTheme = false;
    this.ariaProps = {};
    this.role = 'alert';
    this.show = false;
    this.closable = false;
    this.type = undefined;
    this.zIndex = Z_INDEX.BANNER;
  }
  componentWillLoad() {
    this.updateSlotData();
    this.updateMessageText();
    setTimeout(() => {
      this.heightBanner = this.host.shadowRoot.querySelector('.banner-wrapper').clientHeight;
    }, 0);
  }
  componentDidLoad() {
    const contentWrapper = this.host.shadowRoot.querySelector('.content-wrapper');
    this.resizeObserver = new ResizeObserver(() => {
      this.updateOverflowState();
    });
    if (this.resizeObserver) {
      this.resizeObserver.observe(contentWrapper);
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    const style = {
      '--banner-height': this.heightBanner + 'px',
      zIndex: this.zIndex.toString(),
    };
    const messageWrapper = (h(WrappedSlot, { wrapperClass: this.messageWrapperCssClasses(), part: "message", onSlotchange: this.updateMessageText }));
    return (h(Host, { style: style, class: this.hostCssClasses(), role: this.role, "aria-label": this.ariaProps.label || 'banner', exportparts: "left-icon, wrapper, body, content-wrapper, message, actions-wrapper, close-button, close-icon, actions, actions-wrapper" }, h("div", { class: this.hiddenBannerWrapperCssClasses(), part: "wrapper" }, h("div", { class: this.bannerWrapperCssClasses(), part: "body" }, h("div", { class: "content-wrapper", part: "content-wrapper" }, this.getMessageTypesIcons(), !this.isOverflowing ? (messageWrapper) : (h("wpp-tooltip-v4-1-0", { text: this.messageText, class: this.tooltipCSSClasses() }, messageWrapper))), h("div", { class: "actions-wrapper", part: "actions-wrapper" }, h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData, role: "presentation" }), this.closable && (h("wpp-action-button-v4-1-0", { variant: this.type === 'information' || this.isDarkTheme ? 'inverted' : 'secondary', onClick: this.handleCloseIconClick, class: "close-button", part: "close-button", ariaProps: { label: 'close banner' }, role: "presentation" }, h("wpp-icon-cross-v4-1-0", { slot: "icon-start", part: "close-icon", "aria-hidden": "true" }))))))));
  }
  static get is() { return "wpp-banner"; }
  static get registryIs() { return "wpp-banner-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-banner.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-banner.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Contains the button `aria-` props."
        },
        "defaultValue": "{}"
      },
      "role": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Role of the banner component."
        },
        "attribute": "role",
        "reflect": false,
        "defaultValue": "'alert'"
      },
      "show": {
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
          "text": "If the banner is displayed."
        },
        "attribute": "show",
        "reflect": true,
        "defaultValue": "false"
      },
      "closable": {
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
          "text": "If the banner can be closed."
        },
        "attribute": "closable",
        "reflect": false,
        "defaultValue": "false"
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "BannerTypes",
          "resolved": "\"information\" | \"warning\"",
          "references": {
            "BannerTypes": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::BannerTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the banner style based on the available types."
        },
        "attribute": "type",
        "reflect": false
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
          "text": "Defines the z-index of the WppBanner."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.BANNER"
      }
    };
  }
  static get states() {
    return {
      "hasActionsSlot": {},
      "heightBanner": {},
      "isOverflowing": {},
      "isDarkTheme": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClose",
        "name": "wppClose",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the banner state changes."
        },
        "complexType": {
          "original": "BannerChangeEventDetail",
          "resolved": "BannerChangeEventDetail",
          "references": {
            "BannerChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-banner/types.tsx::BannerChangeEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
}
